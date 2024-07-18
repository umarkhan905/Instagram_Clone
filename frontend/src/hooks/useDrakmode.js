import { useState, useEffect } from "react";

const useDarkmode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);
    // Add dark mode class to html when dark mode is enabled
    if (mediaQuery.matches) {
      document.querySelector("html").classList.add("dark");
    }
    const handleChange = (event) => {
      setIsDarkMode(event.matches);
      if (event.matches) {
        document.querySelector("html").classList.add("dark");
      } else {
        document.querySelector("html").classList.remove("dark");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  return isDarkMode;
};

export default useDarkmode;
