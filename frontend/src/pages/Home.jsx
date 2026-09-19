import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "./Home.css";

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();

  const features = [
    { icon: "🔍", title: "Symptom Analysis", desc: "Type or select your symptoms for instant analysis" },
    { icon: "🧠", title: "AI-Powered", desc: "Google Gemini AI combined with a local medical database" },
    { icon: "💊", title: "Medicine & Remedies", desc: "Get OTC medicine suggestions and home remedies" },
    { icon: "🚨", title: "Severity Alerts", desc: "Know when to see a doctor vs manage at home" },
    { icon: "📅", title: "History Tracking", desc: "Save and review your past symptom checks" },
    { icon: "🔐", title: "Private & Secure", desc: "Your health data stays safe with JWT authentication" },
  ];

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🩺 {t("appName")} — AI Health Assistant</div>
          <h1 className="hero-title">
            {t("heroTitle1")} <span className="highlight">{t("heroSymptoms")}</span>
            <br />
            {t("heroTitle2")} <span className="highlight">{t("heroGuidance")}</span>
          </h1>
          <p className="hero-subtitle">
            {t("heroSubtitle")}
          </p>
          <div className="hero-actions">
            <Link to="/check" className="btn btn-primary btn-lg">
              🔍 {t("checkSymptomsNow")}
            </Link>
            {!user && (
              <Link to="/register" className="btn btn-outline btn-lg">
                {t("signUp")}
              </Link>
            )}
          </div>
          <p className="hero-disclaimer">
            {t("disclaimerNotice")}
          </p>
        </div>
        <div className="hero-visual">
          <div className="hero-card-stack">
            <div className="float-card fc1">🌡️ Fever · Headache</div>
            <div className="float-card fc2">✅ Common Cold detected</div>
            <div className="float-card fc3">💊 Paracetamol + Rest</div>
          </div>
        </div>
      </section>

      {/* Quick Helpline Strip */}
      <div style={{ background: "rgba(15, 123, 94, 0.1)", borderBottom: "1px solid rgba(15, 123, 94, 0.2)", padding: "0.75rem 1rem", textAlign: "center", fontSize: "0.9rem", fontWeight: "600", color: "#0f7b5e" }}>
        🚑 {t("quickHelpline")}
      </div>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">{t("whyUseNivaran")}</h2>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container cta-box">
          <h2>Ready to check your symptoms?</h2>
          <p>Get instant health insights powered by AI. Free, private, and easy to use.</p>
          <Link to="/check" className="btn btn-primary btn-lg">
            {t("checkSymptomsNow")}
          </Link>
        </div>
      </section>
    </div>
  );
}
