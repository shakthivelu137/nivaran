import React from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./Results.css";

function ConditionCard({ condition, t }) {
  const sev = condition.severity || "low";
  const severityBadgeLabel = {
    low: t("severityLow"),
    medium: t("severityMed"),
    high: t("severityHigh"),
  };

  return (
    <div className={`condition-card severity-${sev}`}>
      <div className="condition-header">
        <h3>{condition.name}</h3>
        <span className={`badge badge-${sev}`}>{severityBadgeLabel[sev] || sev}</span>
      </div>
      <p className="condition-desc">{condition.description}</p>

      <div className="condition-sections">
        <div className="cond-section">
          <h4>{t("homeRemedies")}</h4>
          <ul>
            {condition.remedies?.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
        <div className="cond-section">
          <h4>{t("medicines")}</h4>
          <ul>
            {condition.medicines?.map((m, i) => <li key={i}>{m}</li>)}
          </ul>
        </div>
      </div>

      {condition.see_doctor && (
        <div className="see-doctor-alert">
          🚨 <strong>{t("seeDoctorAlert")}</strong>
        </div>
      )}
    </div>
  );
}

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, translateSymptom } = useLanguage();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="container" style={{ textAlign: "center", padding: "4rem 1rem" }}>
        <h2>No results found.</h2>
        <p style={{ color: "var(--text-light)", margin: "1rem 0" }}>
          Please go back and check your symptoms first.
        </p>
        <Link to="/check" className="btn btn-primary">{t("backToChecker")}</Link>
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
        <h1>📊 {t("resultsTitle")}</h1>
        <p>{t("symptomsAnalyzed")}: <strong>{symptoms_analyzed?.map(s => translateSymptom(s)).join(", ")}</strong></p>
      </div>

      {/* Emergency alert */}
      {hasHigh && (
        <div className="alert alert-error emergency-alert">
          🚨 <strong>Emergency Alert:</strong> One or more conditions detected require immediate medical attention.
          Please contact a doctor or emergency services right away (Ambulance: 108).
        </div>
      )}

      {/* AI Summary */}
      {ai_analysis?.ai_available && ai_analysis?.ai_summary && (
        <div className="card ai-summary-card">
          <div className="ai-badge">🧠 {t("aiSummary")} (Gemini)</div>
          <p>{ai_analysis.ai_summary}</p>
          {ai_analysis.general_advice && (
            <div className="general-advice">
              💡 <strong>{t("generalAdvice")}:</strong> {ai_analysis.general_advice}
            </div>
          )}
        </div>
      )}

      {/* Conditions */}
      <div className="conditions-section">
        <h2 className="section-heading">{t("possibleConditions")} ({uniqueConditions.length})</h2>
        {uniqueConditions.length === 0 ? (
          <div className="card" style={{ textAlign: "center", color: "var(--text-light)" }}>
            No specific conditions matched. Please consult a doctor for personalized advice.
          </div>
        ) : (
          uniqueConditions.map((c, i) => <ConditionCard key={i} condition={c} t={t} />)
        )}
      </div>

      {/* Disclaimer */}
      <div className="disclaimer">{disclaimer}</div>

      {/* Actions */}
      <div className="results-actions">
        <button onClick={() => navigate("/check")} className="btn btn-outline">
          {t("backToChecker")}
        </button>
        <Link to="/history" className="btn btn-secondary">
          📅 {t("viewHistory")}
        </Link>
      </div>
    </div>
  );
}
