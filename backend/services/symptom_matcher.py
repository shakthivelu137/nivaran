import json
import os
from typing import List, Dict, Any

# Load symptom database once at startup
_db_path = os.path.join(os.path.dirname(__file__), "..", "db", "symptom_data.json")
with open(_db_path, "r", encoding="utf-8") as f:
    _symptom_db = json.load(f)


def get_common_symptoms() -> List[str]:
    """Return the list of common selectable symptoms."""
    return _symptom_db.get("common_symptoms_list", [])


def match_symptoms(symptoms: List[str]) -> List[Dict[str, Any]]:
    """
    Match user-provided symptoms against local database.
    Returns a list of matched conditions (de-duplicated by name).
    """
    symptoms_lower = [s.lower().strip() for s in symptoms]
    seen_conditions = set()
    matched = []

    for symptom in symptoms_lower:
        # Try exact key match
        db_entry = _symptom_db["symptoms"].get(symptom)

        # Try partial match if exact not found
        if not db_entry:
            for key in _symptom_db["symptoms"]:
                if key in symptom or symptom in key:
                    db_entry = _symptom_db["symptoms"][key]
                    break

        if db_entry:
            for condition in db_entry["conditions"]:
                if condition["name"] not in seen_conditions:
                    seen_conditions.add(condition["name"])
                    matched.append({**condition, "matched_symptom": symptom})

    return matched
