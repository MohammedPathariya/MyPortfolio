// src/components/TimelineTabs.js
import React, { useState } from 'react';
import './TimelineTabs.css';

const experienceData = [
  {
    logo: '/images/sparkwoodlogo.png',
    period: 'Jan 2023 – Jul 2023',
    title: 'Data Engineering Intern',
    institution: 'Sparkwood IT Solutions',
    points: [
      'Built and automated Python/SQL data pipelines handling 5M+ records/day',
      'Optimized ETL jobs, reducing run time by 30%',
      'Collaborated with data scientists to deploy real-time APIs',
    ],
  },
  // …add more experience entries here
];

const educationData = [
  {
    logo: '/images/iublogo.png',
    period: 'Aug 2024 – May 2026',
    title: 'Master of Science in Data Science',
    institution: 'Indiana University Bloomington',
    points: [
      'Specialized in Machine Learning & Applied AI',
      'Research on time-series forecasting published in ICML 2025',
      'Teaching assistant for Data Engineering course',
    ],
  },
  {
    logo: '/images/sppulogo.png',
    period: 'Aug 2020 – May 2024',
    title: 'Bachelor of Engineering in AI & Data Science',
    institution: 'Savitribai Phule Pune University',
    points: [
      'Graduated with Distinction (Top 5%)',
      'Capstone: Predictive maintenance dashboard using Flask & React',
      'President of the AI Club, organized 10+ hackathons',
    ],
  },
  {
    logo: '/images/vincentslogo.png',
    period: 'Aug 2018 – May 2020',
    title: 'HSC (12th Grade)',
    institution: 'St. Vincents High School & Junior College, Pune',
    points: [
      'Scored 95% in Physics, Chemistry & Mathematics',
      'Led coding workshops for junior students',
      'Captain of the debate team',
    ],
  },
];

export default function TimelineTabs() {
  const [activeTab, setActiveTab] = useState('education');
  const items = activeTab === 'education' ? educationData : experienceData;

  return (
    <section id="education-experience" className="timeline-section">
      {/* Section heading */}
      <h2 className="section-title">Education &amp; Experience</h2>

      {/* ── Tabs ─────────────────────────────────────────────────────────── */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          Education
        </button>
        <button
          className={`tab ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
        >
          Experience
        </button>
      </div>

      {/* ── Timeline content ─────────────────────────────────────────────── */}
      <div className="timeline-container">
        {items.map((item, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-dot">
              <img
                src={item.logo}
                alt={`${item.institution} logo`}
              />
            </div>
            <div className="timeline-content">
              <h3 className="timeline-item-title">{item.institution}</h3>
              <h4 className="timeline-institution">{item.title}</h4>
              <span className="timeline-period">{item.period}</span>
              <ul className="timeline-bullets">
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
