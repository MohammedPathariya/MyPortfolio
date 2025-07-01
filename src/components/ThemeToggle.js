// src/components/ThemeToggle.js
import React, { useState, useEffect } from 'react';
import { BsMoonStars } from 'react-icons/bs';
import { LuSunMedium } from 'react-icons/lu';

import './ThemeToggle.css';

const ThemeToggle = () => {
  // Initialize theme from localStorage or default to light
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  // On mount, apply the stored theme class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  const toggle = () => {
    // Determine the new theme
    const newTheme = theme === 'light' ? 'dark' : 'light';
    // Toggle the .dark class on <html>
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    // Persist the choice
    localStorage.setItem('theme', newTheme);
    // Update state to re-render icon
    setTheme(newTheme);
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggle}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <BsMoonStars /> : <LuSunMedium />}
    </button>
  );
};

export default ThemeToggle;