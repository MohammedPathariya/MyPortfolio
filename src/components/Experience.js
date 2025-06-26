import React from 'react';
import './Timeline.css';
import { FaBriefcase } from 'react-icons/fa';

const experienceData = [
  {
    title: 'Data Engineering Intern',
    institution: 'Sparkwood IT Solutions',
    period: 'Jan 2023 – Jul 2023',
    description: 'Built and automated data pipelines using Python and SQL for large-scale product and sales data. Designed relational schemas that improved query performance by 40%. Developed ETL workflows for structured data ingestion and transformation. Collaborated with full-stack teams to deliver real-time data services across platforms.',
  }
];

const Experience = () => {
  return (
    <section id="experience" className="timeline-section">
      <h2 className="timeline-title">Experience</h2>
      <div className="timeline-container">
        {experienceData.map((item, index) => (
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

export default Experience;
