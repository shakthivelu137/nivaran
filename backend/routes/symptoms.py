from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.ext.asyncio import AsyncSession
from pydantic import BaseModel
from typing import List, Optional

from models.base import get_db
from models.user import User
from models.history import History
from services.symptom_matcher import match_symptoms, get_common_symptoms
from services.ai_service import analyze_with_ai
from services.auth_utils import decode_token
from sqlalchemy import select

import json

router = APIRouter()
_oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/login", auto_error=False)


async def get_optional_user(
    token: Optional[str] = Depends(_oauth2),
    db: AsyncSession = Depends(get_db),
) -> Optional[User]:
    """Return user if authenticated, None if not (guest allowed)."""
    if not token:
        return None
    payload = decode_token(token)
    if not payload:
        return None
    user_id = payload.get("sub")
    result = await db.execute(select(User).where(User.id == int(user_id)))
    return result.scalar_one_or_none()


# --- Schemas ---
class SymptomRequest(BaseModel):
    symptoms: List[str]


# --- Routes ---
@router.get("/common")
async def common_symptoms():
    """Return the list of common symptoms for the selector UI."""
    return {"symptoms": get_common_symptoms()}


@router.post("/analyze")
async def analyze(
    data: SymptomRequest,
    db: AsyncSession = Depends(get_db),
    current_user: Optional[User] = Depends(get_optional_user),
):
    if not data.symptoms:
        raise HTTPException(status_code=400, detail="Please provide at least one symptom.")

    # Step 1: Match against local database
    local_results = match_symptoms(data.symptoms)

    # Step 2: AI analysis
    ai_result = await analyze_with_ai(data.symptoms, local_results)

    # Step 3: Merge results
    response = {
        "symptoms_analyzed": data.symptoms,
        "local_conditions": local_results,
        "ai_analysis": ai_result,
        "disclaimer": (
            "⚠️ DISCLAIMER: This information is for educational purposes only and does NOT replace "
            "professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare "
            "provider for any medical concerns. In case of emergency, call your local emergency number immediately."
        ),
    }

    # Step 4: Save to history if logged in
    if current_user:
        history_entry = History(
            user_id=current_user.id,
            symptoms=json.dumps(data.symptoms),
            result=json.dumps({
                "local_conditions": local_results,
                "ai_analysis": ai_result,
            }),
        )
        db.add(history_entry)
        await db.commit()

    return response
