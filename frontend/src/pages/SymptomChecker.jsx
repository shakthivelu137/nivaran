import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCommonSymptoms, analyzeSymptoms } from "../services/api";
import "./SymptomChecker.css";

export default function SymptomChecker() {
  const [commonSymptoms, setCommonSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
        <h1>🔍 Symptom Checker</h1>
        <p>Select your symptoms below or type them in. We'll analyze and give you health guidance.</p>
      </div>

      {/* Selected symptoms tags */}
      {selectedSymptoms.length > 0 && (
        <div className="card selected-section">
          <h3>✅ Selected Symptoms ({selectedSymptoms.length})</h3>
          <div className="symptom-tags">
            {selectedSymptoms.map((s) => (
              <span key={s} className="symptom-tag selected">
                {s}
                <button onClick={() => removeSymptom(s)} className="tag-remove">✕</button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Custom input */}
      <div className="card">
        <h3>✏️ Type a Symptom</h3>
        <div className="custom-input-row">
          <input
            type="text"
            placeholder="e.g. burning eyes, stiff neck..."
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addCustom()}
          />
          <button className="btn btn-primary" onClick={addCustom}>Add</button>
        </div>
      </div>

      {/* Common symptoms selector */}
      <div className="card">
        <h3>📋 Common Symptoms — Click to Select</h3>
        <div className="symptom-chips">
          {commonSymptoms.map((s) => (
            <button
              key={s}
              onClick={() => toggleSymptom(s)}
              className={`symptom-chip ${selectedSymptoms.includes(s) ? "chip-selected" : ""}`}
            >
              {selectedSymptoms.includes(s) ? "✓ " : ""}{s}
            </button>
          ))}
        </div>
      </div>

      {/* Analyze button */}
      {error && <div className="alert alert-error">{error}</div>}
      <div className="analyze-btn-row">
        <button
          className="btn btn-primary btn-lg analyze-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "🔄 Analyzing..." : "🧠 Analyze Symptoms →"}
        </button>
      </div>

      <div className="disclaimer">
        ⚠️ This tool is for informational purposes only. It does not replace professional medical advice.
        Always consult a qualified healthcare provider for any health concerns.
      </div>
    </div>
  );
}
