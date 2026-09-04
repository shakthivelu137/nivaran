import os
import json
from typing import List, Any, Dict
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

_api_key = os.getenv("GEMINI_API_KEY", "")
_client = None

if _api_key and _api_key != "YOUR_GEMINI_API_KEY_HERE":
    _client = genai.Client(api_key=_api_key)


async def analyze_with_ai(symptoms: List[str], local_results: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Use Google Gemini to analyze symptoms and return structured health guidance.
    Falls back gracefully if API key is missing.
    """
    if not _client:
        return {
            "ai_summary": "AI analysis unavailable. Please add your Gemini API key to backend/.env file.",
            "ai_conditions": [],
            "general_advice": "Please consult a healthcare professional for accurate diagnosis.",
            "ai_available": False,
        }

    local_summary = ""
    if local_results:
        names = [r["name"] for r in local_results]
        local_summary = f"Our local database found these possible conditions: {', '.join(names)}. "

    prompt = f"""
You are a medical information assistant. A user reports the following symptoms: {', '.join(symptoms)}.

{local_summary}

Please analyze these symptoms and respond ONLY with a valid JSON object in this exact format:
{{
  "ai_summary": "Brief 2-3 sentence plain English summary of what these symptoms might indicate",
  "ai_conditions": [
    {{
      "name": "Condition Name",
      "severity": "low|medium|high",
      "description": "Brief description",
      "remedies": ["remedy1", "remedy2"],
      "medicines": ["medicine1", "medicine2"],
      "see_doctor": true
    }}
  ],
  "general_advice": "One key piece of general advice",
  "ai_available": true
}}

Important rules:
- Severity: low = manageable at home, medium = monitor closely, high = see doctor urgently
- Always recommend professional medical advice for high severity
- Do NOT diagnose — provide informational guidance only
- Keep remedies and medicines practical and safe
- Respond ONLY with the JSON object, no other text
"""

    try:
        response = _client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt,
        )
        text = response.text.strip()

        # Extract JSON from response
        if "```json" in text:
            text = text.split("```json")[1].split("```")[0].strip()
        elif "```" in text:
            text = text.split("```")[1].split("```")[0].strip()

        result = json.loads(text)
        result["ai_available"] = True
        return result

    except Exception as e:
        return {
            "ai_summary": f"AI analysis encountered an error: {str(e)}",
            "ai_conditions": [],
            "general_advice": "Please consult a healthcare professional.",
            "ai_available": False,
        }
