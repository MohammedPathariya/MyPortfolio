// src/components/TimelineTabs.js
import React, { useState } from 'react';
import './TimelineTabs.css';

const experienceData = [
  {
    logo: '/images/iublogo.png',
    period: 'Aug 2025 – Present',
    title: 'Graduate Research Assistant, AI in Sports Analytics',
    institution: 'Indiana University, Kelley School of Business',
    points: [
      // The "Scale" Story
      'Orchestrated High-Performance Computing (HPC) workflows using Slurm to parallelize WhisperX transcription across 5 nodes, reducing processing time for 450+ hours of audio by 30x.',
      // The "Hybrid Model" Story
      'Designed a hybrid NLP architecture that fuses high-dimensional Sentence-BERT embeddings with rule-based VADER lexicons, solving the "smoothing" problem to capture granular emotional spikes in press conferences.',
      // The "Data Integrity" Story
      'Engineered a fault-tolerant scraping pipeline using SQLite in WAL (Write-Ahead Logging) mode to handle concurrent writes without locking, ensuring zero data loss during live game ingestion.',
      // The "Impact" Story
      'Built automated drift detection scripts to monitor sentiment distribution over time, creating a longitudinal dataset now used for causal inference studies on player performance.',
    ],
  },
  {
    logo: '/images/sparkwoodlogo.png',
    period: 'Jan 2024 – Jun 2024',
    title: 'Data Engineering Intern',
    institution: 'Sparkwood IT Solutions, Pune, India',
    points: [
      // The "Root Cause" Story
      'Led the root-cause analysis of a 5% KPI discrepancy between Marketing and Finance, tracing it to inconsistent "Cancelled Order" logic and standardizing it via a validated SQL View.',
      // The "Optimization" Story
      'Optimized legacy PostgreSQL reporting queries by analyzing `EXPLAIN ANALYZE` execution plans and implementing composite indices, cutting dashboard load times by 40% (5m → 3m).',
      // The "Reliability" Story
      'Hardened daily ETL pipelines in Apache Airflow by implementing "Smart Retries" and data quality gates, preventing bad data from polluting the central warehouse during peak load.',
      // The "Collaboration" Story
      'Collaborated with the Data Science team to engineer features for inventory forecasting, translating raw transactional logs into time-series aggregates.',
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
      'Focus: Generative AI Systems, Scalable ML Infrastructure, & LLM Evaluation',
      'GPA: 3.7/4.0',
      'Relevant Coursework: Large Language Models, Deep Learning Systems, MLOps, Cloud Computing',
      'Capstone: "The Digital Forge" – A Multi-Agent System for Autonomous Code Generation',
    ],
  },
  {
    logo: '/images/sppulogo.png',
    period: 'Aug 2020 – May 2024',
    title: 'Bachelor of Engineering, AI & Data Science',
    institution: 'Savitribai Phule Pune University',
    points: [
      'Graduated with Distinction (Top 5% of Class) | GPA: 3.8/4.0',
      'Relevant Coursework: Distributed Systems, Operating Systems, Algorithms, Statistical Inference',
      'Research: Published "Tunes by Technology" (IEEE ICC Robins) on GAN vs. LSTM architectures',
      'Leadership: Organized 10+ technical workshops, mentoring 200+ students in Python & ML basics',
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