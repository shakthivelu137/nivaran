import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, symptomTranslations } from "../translations";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("nv_lang") || "en";
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("nv_lang", lang);
  };

  const t = (key) => {
    return translations[language]?.[key] || translations["en"]?.[key] || key;
  };

  const translateSymptom = (symptomName) => {
    return symptomTranslations[language]?.[symptomName] || symptomName;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, translateSymptom }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
