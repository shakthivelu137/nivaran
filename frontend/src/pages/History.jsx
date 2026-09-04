import React, { useEffect, useState } from "react";
import { getHistory, deleteHistory } from "../services/api";
import { Link } from "react-router-dom";
import "./History.css";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    try {
      const res = await getHistory();
      setHistory(res.data.history);
    } catch {
      setError("Failed to load history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteHistory(id);
      setHistory((prev) => prev.filter((h) => h.id !== id));
    } catch {
      alert("Failed to delete.");
    }
  };

  const formatDate = (isoStr) => {
    if (!isoStr) return "";
    return new Date(isoStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) return <div className="loading-screen">Loading history...</div>;

  return (
    <div className="history-page container">
      <div className="page-header">
        <h1>📅 My Symptom History</h1>
        <p>Your past {history.length} symptom check(s)</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {history.length === 0 ? (
        <div className="card empty-history">
          <span>🔍</span>
          <h3>No history yet</h3>
          <p>Your symptom checks will appear here after you're logged in.</p>
          <Link to="/check" className="btn btn-primary">Check Symptoms Now</Link>
        </div>
      ) : (
        <div className="history-list">
          {history.map((h) => {
            const conditions = [
              ...(h.result?.local_conditions || []),
              ...(h.result?.ai_analysis?.ai_conditions || []),
            ];
            const unique = [...new Set(conditions.map((c) => c.name))];
            const hasHigh = conditions.some((c) => c.severity === "high");

            return (
              <div key={h.id} className="history-card card">
                <div className="history-header">
                  <div>
                    <div className="history-date">{formatDate(h.created_at)}</div>
                    <div className="history-symptoms">
                      {h.symptoms.map((s) => (
                        <span key={s} className="symptom-tag-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(h.id)}
                  >
                    🗑
                  </button>
                </div>

                {hasHigh && (
                  <div className="alert alert-error" style={{ margin: "0.75rem 0 0" }}>
                    🚨 High severity condition detected
                  </div>
                )}

                {unique.length > 0 && (
                  <div className="history-conditions">
                    <strong>Possible conditions:</strong>{" "}
                    {unique.join(", ")}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
