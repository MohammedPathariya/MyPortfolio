// src/components/TimelineTabs.js
import React, { useState } from 'react';
import portfolio from '../data/portfolio.generated';
import './TimelineTabs.css';

export default function TimelineTabs() {
  const [activeTab, setActiveTab] = useState('education');
  const items = activeTab === 'education' ? portfolio.education : portfolio.experience;

  const handleTabKeyDown = (event) => {
    const tabOrder = ['education', 'experience'];
    const currentIndex = tabOrder.indexOf(activeTab);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (currentIndex + 1) % tabOrder.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (currentIndex - 1 + tabOrder.length) % tabOrder.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabOrder.length - 1;
    if (nextIndex === currentIndex) return;

    event.preventDefault();
    const nextTab = tabOrder[nextIndex];
    setActiveTab(nextTab);
    window.requestAnimationFrame(() => document.getElementById(`${nextTab}-tab`)?.focus());
  };

  return (
    <section id="education-experience" className="timeline-section">
      {/* Section heading */}
      <h2 className="section-title">Background</h2>

      {/* Tabs */}
      <div className="tabs" role="tablist" aria-label="Background sections">
        <button
          id="education-tab"
          role="tab"
          className={`tab ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
          aria-selected={activeTab === 'education'}
          aria-controls="education-panel"
          tabIndex={activeTab === 'education' ? 0 : -1}
          onKeyDown={handleTabKeyDown}
        >
          Education
        </button>
        <button
          id="experience-tab"
          role="tab"
          className={`tab ${activeTab === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveTab('experience')}
          aria-selected={activeTab === 'experience'}
          aria-controls="experience-panel"
          tabIndex={activeTab === 'experience' ? 0 : -1}
          onKeyDown={handleTabKeyDown}
        >
          Experience
        </button>
      </div>

      {/* Timeline */}
      <div
        id={`${activeTab}-panel`}
        className="timeline-container"
        role="tabpanel"
        aria-labelledby={`${activeTab}-tab`}
        tabIndex="0"
      >
        {items.map((item) => (
          <div key={item.id} className="timeline-item">
            <div className="timeline-dot">
              <img
                src={item.logo}
                alt={`${item.organization || item.institution} logo`}
                loading="lazy"
                decoding="async"
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
