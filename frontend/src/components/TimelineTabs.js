// src/components/TimelineTabs.js
import React, { useState } from 'react';
import './TimelineTabs.css';

const experienceData = [
  {
    logo: '/images/iublogo.png',
    period: 'Aug 2025 – Present',
    title: 'Research Assistant, AI in Sports Analytics',
    institution: 'Indiana University, Kelley School of Business, Bloomington, IN',
    points: [
      'Developed a fault-tolerant data pipeline in Python (WhisperX, yt-dlp) to automate the extraction, transcription, and diarization of unstructured audio from YouTube.',
      'Implemented an NLP module using Sentence-BERT to semantically link jumbled Q&A transcripts, creating a structured, analysis-ready dataset.',
      'Conducted a data integrity audit of NBA playoff transcripts, identifying and resolving critical data gaps to ensure dataset completeness for predictive modeling.',
      'Built a text enhancement pipeline to restore punctuation and perform sentiment analysis (VADER), creating a rich feature set for predictive modeling.',
    ],
  },
  {
    logo: '/images/sparkwoodlogo.png',
    period: 'Feb 2022 – Jul 2022',
    title: 'Data Engineering Intern',
    institution: 'Sparkwood IT Solutions, Pune, India',
    points: [
      'Orchestrated daily ETL pipelines using Python, SQL, and Airflow into a centralized PostgreSQL data warehouse.',
      'Reduced query times by 40% by optimizing SQL schemas, directly increasing the productivity of downstream data consumers.',
      'Built pandas transformation jobs to reliably process over 10 GB of data weekly for analytics and modeling.',
      'Collaborated with data and engineering teams to align data products with cross-functional requirements.',
    ],
  },
];

const educationData = [
  {
    logo: '/images/iublogo.png',
    period: 'Aug 2024 – Exp. May 2026',
    title: 'Master of Science in Data Science',
    institution: 'Indiana University Bloomington',
    points: [
      'GPA: 3.6/4.0',
      'Relevant Coursework: LLMs, Deep Learning, MLOps, Cloud Computing',
      'Key Projects: The Digital Forge (AI Agents), LearnLoop (AI Tutor)',
      'Presented research on multi-agent systems at the IU Graduate Research Expo',
    ],
  },
  {
    logo: '/images/sppulogo.png',
    period: 'Aug 2020 – May 2024',
    title: 'Bachelor of Engineering, AI & Data Science',
    institution: 'Savitribai Phule Pune University',
    points: [
      'GPA: 3.8/4.0 | Graduated with distinction (Top 5%)',
      'Relevant Coursework: ML, DSA, Operating Systems, Statistics',
      'Capstone Project: AudioGroove (AI Music Generation)',
      'Organized 10+ AI hackathons and hands-on workshops for students',
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