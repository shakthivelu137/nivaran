import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

const features = [
  { icon: "🔍", title: "Symptom Analysis", desc: "Type or select your symptoms for instant analysis" },
  { icon: "🧠", title: "AI-Powered", desc: "Google Gemini AI combined with a local medical database" },
  { icon: "💊", title: "Medicine & Remedies", desc: "Get OTC medicine suggestions and home remedies" },
  { icon: "🚨", title: "Severity Alerts", desc: "Know when to see a doctor vs manage at home" },
  { icon: "📅", title: "History Tracking", desc: "Save and review your past symptom checks" },
  { icon: "🔐", title: "Private & Secure", desc: "Your health data stays safe with JWT authentication" },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🩺 Nivāran — AI Health Assistant</div>
          <h1 className="hero-title">
            Understand Your <span className="highlight">Symptoms</span>
            <br />
            Get <span className="highlight">Instant Guidance</span>
          </h1>
          <p className="hero-subtitle">
            Enter your symptoms and Nivāran's AI-powered system will analyze
            them, identify possible conditions, and suggest remedies and
            medicines — all with professional medical guidance.
          </p>
          <div className="hero-actions">
            <Link to="/check" className="btn btn-primary btn-lg">
              🔍 Check My Symptoms
            </Link>
            {!user && (
              <Link to="/register" className="btn btn-outline btn-lg">
                Create Free Account
              </Link>
            )}
          </div>
          <p className="hero-disclaimer">
            ⚠️ For informational purposes only. Not a substitute for professional medical advice.
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

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Use Nivāran?</h2>
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
        <div className="container">
          <div className="cta-box">
            <h2>Ready to check your symptoms?</h2>
            <p>It takes less than 60 seconds. Free and instant.</p>
            <Link to="/check" className="btn btn-primary btn-lg">
              Get Started →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
