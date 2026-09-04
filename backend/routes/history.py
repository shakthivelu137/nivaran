from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc

from models.base import get_db
from models.user import User
from models.history import History
from routes.auth import get_current_user
import json

router = APIRouter()


@router.get("/")
async def get_history(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the logged-in user's symptom search history."""
    result = await db.execute(
        select(History)
        .where(History.user_id == current_user.id)
        .order_by(desc(History.created_at))
        .limit(20)
    )
    records = result.scalars().all()

    history = []
    for r in records:
        history.append({
            "id": r.id,
            "symptoms": json.loads(r.symptoms),
            "result": json.loads(r.result),
            "created_at": r.created_at.isoformat() if r.created_at else None,
        })

    return {"history": history}


@router.delete("/{history_id}")
async def delete_history(
    history_id: int,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete a specific history record."""
    result = await db.execute(
        select(History).where(History.id == history_id, History.user_id == current_user.id)
    )
    record = result.scalar_one_or_none()
    if not record:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Record not found")

    await db.delete(record)
    await db.commit()
    return {"message": "Deleted successfully"}
