import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

const getInitialMode = () => {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme:dark"
  ).matches;
  const localDarkMode = localStorage.getItem("darkTheme") === "true";
  return prefersDarkMode || localDarkMode;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialMode());
  const [search, setSearch] = useState("batman");

  const toggleDarkTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem("darkTheme", newTheme);
  };

  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, search, setSearch }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
