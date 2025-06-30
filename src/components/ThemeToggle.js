import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { BsMoonStars } from "react-icons/bs";
import { LuSunMedium } from "react-icons/lu";


import './ThemeToggle.css';

const ThemeToggle = () => {
  // start in whatever mode was last saved (or default to light)
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  // whenever `theme` changes, update <html>’s class and save
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      {theme === 'light' ? <BsMoonStars /> : <LuSunMedium />}
    </button>
  );
};

export default ThemeToggle;
