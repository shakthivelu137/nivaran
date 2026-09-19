import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCommonSymptoms, analyzeSymptoms } from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import "./SymptomChecker.css";

export default function SymptomChecker() {
  const [commonSymptoms, setCommonSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { t, translateSymptom } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    getCommonSymptoms()
      .then((res) => setCommonSymptoms(res.data.symptoms))
      .catch(() => {});
  }, []);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const addCustom = () => {
    const trimmed = customInput.trim();
    if (trimmed && !selectedSymptoms.includes(trimmed)) {
      setSelectedSymptoms((prev) => [...prev, trimmed]);
    }
    setCustomInput("");
  };

  const removeSymptom = (symptom) => {
    setSelectedSymptoms((prev) => prev.filter((s) => s !== symptom));
  };

  const handleSubmit = async () => {
    if (selectedSymptoms.length === 0) {
      setError("Please select or add at least one symptom.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await analyzeSymptoms(selectedSymptoms);
      navigate("/results", { state: { result: res.data } });
    } catch (err) {
      setError("Failed to analyze symptoms. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checker-page container">
      <div className="page-header">
        <h1>{t("symptomCheckerTitle")}</h1>
        <p>{t("symptomCheckerSub")}</p>
      </div>

      {/* Selected symptoms tags */}
      {selectedSymptoms.length > 0 && (
        <div className="card selected-section">
          <h3>✅ {t("selectedSymptoms")} ({selectedSymptoms.length})</h3>
          <div className="symptom-tags">
            {selectedSymptoms.map((s) => (
              <span key={s} className="symptom-tag selected">
                {translateSymptom(s)}
                <button onClick={() => removeSymptom(s)} className="tag-remove">✕</button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Custom input */}
      <div className="card custom-input-section">
        <h3>✏️ {t("typeSymptom")}</h3>
        <div className="custom-input-row">
          <input
            type="text"
            placeholder={t("typePlaceholder")}
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustom()}
          />
          <button onClick={addCustom} className="btn btn-primary">
            {t("add")}
          </button>
        </div>
      </div>

      {/* Common symptoms list */}
      <div className="card common-section">
        <h3>📋 {t("commonSymptoms")}</h3>
        <div className="symptom-chips">
          {commonSymptoms.map((symptom) => {
            const isSelected = selectedSymptoms.includes(symptom);
            return (
              <button
                key={symptom}
                onClick={() => toggleSymptom(symptom)}
                className={`chip ${isSelected ? "active" : ""}`}
              >
                {isSelected ? "✓ " : "+ "}
                {translateSymptom(symptom)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error alert */}
      {error && <div className="alert alert-error">{error}</div>}

      {/* Submit button */}
      <div className="action-row">
        <button
          onClick={handleSubmit}
          className="btn btn-primary btn-lg analyze-btn"
          disabled={loading || selectedSymptoms.length === 0}
        >
          {loading ? t("analyzingBtn") : t("analyzeBtn")}
        </button>
      </div>

      {/* Disclaimer */}
      <div className="disclaimer-box">
        <p>
          ⚠️ {t("disclaimerNotice")}
        </p>
      </div>
    </div>
  );
}
