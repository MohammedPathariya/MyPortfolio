// src/components/TimelineTabs.js
import React, { useState } from 'react';
import './TimelineTabs.css';

const experienceData = [
  {
    logo: '/images/sparkwoodlogo.png',
    period: 'Feb 2022 – Jul 2022',
    title: 'Data Engineering Intern',
    institution: 'Sparkwood IT Solutions, Pune, India',
    points: [
      'Built Python/SQL pipelines to deliver clean datasets for analytics',
      'Optimized database schemas, cutting query times by 40%',
      'Deployed backend APIs for real-time data access',
      'Collaborated with data & dev teams to prepare data for reporting',
    ],
  },
];

const educationData = [
  {
    logo: '/images/iublogo.png',
    period: 'Aug 2024 – Exp. May 2026',
    title: 'MS, Data Science',
    institution: 'Indiana University Bloomington',
    points: [
      'Specialized in ML coursework: time-series forecasting & NLP',
      'Built LearnLoop: an AI-powered study assistant web app',
      'Developed The Digital Forge: a multi-agent code generation platform',
      'Presented The Digital Forge prototype at the IU Graduate Research Expo',
    ],
  },
  {
    logo: '/images/sppulogo.png',
    period: 'Aug 2020 – May 2024',
    title: 'BE, Artificial Intelligence & Data Science',
    institution: 'Savitribai Phule Pune University',
    points: [
      'Graduated with distinction (Top 5%)',
      'Capstone: AudioGroove – AI music generation web app',
      'Organized 10+ AI hackathons & hands-on workshops',
      'Volunteered teaching coding to underprivileged students',
    ],
  },
  {
    logo: '/images/vincentslogo.png',
    period: 'Jul 2009 – Feb 2020',
    title: 'HSC (12th Grade), Science',
    institution: 'St. Vincent’s High School & Junior College, Pune',
    points: [
      'Scored 95% in Physics, Chemistry & Mathematics',
      'Led debate team and peer coding workshops',
      'Participated in district science fairs & Olympiads',
      'Member of school band and sports teams',
    ],
  },
];

export default function TimelineTabs() {
  const [activeTab, setActiveTab] = useState('education');
  const items = activeTab === 'education' ? educationData : experienceData;

  return (
    <section id="education-experience" className="timeline-section">
      {/* Section heading */}
      <h2 className="section-title">Background</h2>

      {/* Tabs */}
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

      {/* Timeline */}
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