// src/components/TimelineTabs.js
import React, { useState } from 'react';
import portfolio from '../data/portfolio.generated';
import './TimelineTabs.css';

export default function TimelineTabs() {
  const [activeTab, setActiveTab] = useState('education');
  const items = activeTab === 'education' ? portfolio.education : portfolio.experience;

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
        {items.map((item) => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-dot">
              <img
                src={item.logo}
                alt={`${item.institution} logo`}
              />
            </div>
            <div className="timeline-content">
              <h3 className="timeline-item-title">{item.organization || item.institution}</h3>
              <h4 className="timeline-institution">{item.title || item.degree}</h4>
              <span className="timeline-period">{item.period}</span>
              <ul className="timeline-bullets">
                {(item.points || item.details).map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
