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

  // Whenever `theme` changes, apply the class and persist it
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
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