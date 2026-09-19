import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { language, changeLanguage, t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🩺</span>
          <span className="brand-text">{t("appName")}</span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">{t("home")}</Link>
          <Link to="/check" className="nav-link">{t("checkSymptoms")}</Link>
          {user && <Link to="/history" className="nav-link">{t("myHistory")}</Link>}
        </div>

        <div className="navbar-actions">
          {/* Language Selector Dropdown */}
          <div className="lang-select-wrapper">
            <select
              value={language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="lang-select"
              title="Select Language"
            >
              <option value="en">EN</option>
              <option value="ta">தமிழ்</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>

          {user ? (
            <div className="user-menu">
              <span className="user-greeting">Hi, {user.name.split(" ")[0]} 👋</span>
              <button onClick={handleLogout} className="btn btn-outline btn-sm">
                {t("logout")}
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="btn btn-outline btn-sm">{t("login")}</Link>
              <Link to="/register" className="btn btn-primary btn-sm">{t("signUp")}</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
