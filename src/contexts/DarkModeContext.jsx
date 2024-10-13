import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkMode = createContext();

const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useLocalStorageState(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "darkMode"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.classList.remove("light-mode");
    } else {
      document.documentElement.classList.add("light-mode");
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((darkMode) => !darkMode);
  };
  return (
    <DarkMode.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkMode.Provider>
  );
};

const useDarkMode = () => {
  const context = useContext(DarkMode);
  if (context === undefined)
    throw new Error("Context has been used outside of provider");
  return context;
};

export { DarkModeProvider, useDarkMode };
