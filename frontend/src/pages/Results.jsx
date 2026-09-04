import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./Results.css";

const severityLabel = { low: "🟢 Low", medium: "🟡 Medium", high: "🔴 High" };

function ConditionCard({ condition }) {
  const sev = condition.severity || "low";
  return (
    <div className={`condition-card severity-${sev}`}>
      <div className="condition-header">
        <h3>{condition.name}</h3>
        <span className={`badge badge-${sev}`}>{severityLabel[sev]}</span>
      </div>
      <p className="condition-desc">{condition.description}</p>

      <div className="condition-sections">
        <div className="cond-section">
          <h4>🌿 Home Remedies</h4>
          <ul>
            {condition.remedies?.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
        <div className="cond-section">
          <h4>💊 Medicines</h4>
          <ul>
            {condition.medicines?.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </div>
      </div>

      {condition.see_doctor && (
        <div className="see-doctor-alert">
          🚨 <strong>See a Doctor:</strong> This condition requires professional medical evaluation.
        </div>
      )}
    </div>
  );
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <h2>No results found.</h2>
        <p style={{ color: "var(--text-light)", margin: "1rem 0" }}>
          Please go back and check your symptoms first.
        </p>
        <Link to="/check" className="btn btn-primary">← Back to Checker</Link>
      </div>
    );
  }

  const { symptoms_analyzed, local_conditions, ai_analysis, disclaimer } = result;
  const allConditions = [
    ...(local_conditions || []),
    ...(ai_analysis?.ai_conditions || []),
  ];

  // De-duplicate by name
  const seen = new Set();
  const uniqueConditions = allConditions.filter((c) => {
    if (seen.has(c.name)) return false;
    seen.add(c.name);
    return true;
  });

  // Check if any high severity
  const hasHigh = uniqueConditions.some((c) => c.severity === "high");

  return (
    <div className="results-page container">
      <div className="page-header">
        <h1>📊 Analysis Results</h1>
        <p>Based on your symptoms: <strong>{symptoms_analyzed?.join(", ")}</strong></p>
      </div>

      {/* Emergency alert */}
      {hasHigh && (
        <div className="alert alert-error emergency-alert">
          🚨 <strong>Emergency Alert:</strong> One or more conditions detected require immediate medical attention.
          Please contact a doctor or emergency services right away.
        </div>
      )}

      {/* AI Summary */}
      {ai_analysis?.ai_available && ai_analysis?.ai_summary && (
        <div className="card ai-summary-card">
          <div className="ai-badge">🧠 AI Analysis (Gemini)</div>
          <p>{ai_analysis.ai_summary}</p>
          {ai_analysis.general_advice && (
            <div className="general-advice">
              💡 <strong>General Advice:</strong> {ai_analysis.general_advice}
            </div>
          )}
        </div>
      )}

      {/* Conditions */}
      <div className="conditions-section">
        <h2 className="section-heading">Possible Conditions ({uniqueConditions.length})</h2>
        {uniqueConditions.length === 0 ? (
          <div className="card" style={{ textAlign: "center", color: "var(--text-light)" }}>
            No specific conditions matched. Please consult a doctor for personalized advice.
          </div>
        ) : (
          uniqueConditions.map((c, i) => <ConditionCard key={i} condition={c} />)
        )}
      </div>

      {/* Disclaimer */}
      <div className="disclaimer">{disclaimer}</div>

      {/* Actions */}
      <div className="results-actions">
        <button onClick={() => navigate("/check")} className="btn btn-outline">
          ← Check Again
        </button>
        <Link to="/history" className="btn btn-secondary">
          📅 View History
        </Link>
      </div>
    </div>
  );
}
