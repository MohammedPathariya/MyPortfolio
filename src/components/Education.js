import React from 'react';
import './Timeline.css';
import { FaGraduationCap } from 'react-icons/fa';

const educationData = [
  {
    title: 'Master of Science in Data Science',
    institution: 'Indiana University Bloomington',
    period: 'Aug 2024 – May 2026',
    description: 'Specialized in Machine Learning, Data Engineering, and Applied AI. Academic projects focused on real-world data problems.',
  },
  {
    title: 'Bachelor of Engineering in Artificial Intelligence & Data Science',
    institution: 'Savitribai Phule Pune University',
    period: 'Aug 2020 – May 2024',
    description: 'Gained strong foundations in AI, Statistics, and Full-Stack Development. Graduated with distinction.',
  },
  {
    title: 'HSC (12th Grade)',
    institution: 'St. Vincents High School & Junior College, Pune',
    period: '2018 – 2020',
    description: 'Completed Higher Secondary Education with focus on Physics, Chemistry, and Mathematics.',
  }
];

const Education = () => {
  return (
    <section id="education" className="timeline-section">
      <h2 className="timeline-title">Education</h2>
      <div className="timeline-container">
        {educationData.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <h3 className="timeline-item-title">{item.title}</h3>
              <h4 className="timeline-institution">{item.institution}</h4>
              <span className="timeline-period">{item.period}</span>
              <p className="timeline-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Education;
