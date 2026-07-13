// src/components/TimelineTabs.js
import React, { useState } from 'react';
import './TimelineTabs.css';

const experienceData = [
  {
    logo: '/images/luddylogo.png',
    period: 'Jan 2026 – May 2026',
    title: 'Graduate Research Assistant',
    institution: 'Indiana University Luddy School of Informatics, Computing, and Engineering',
    points: [
      'Built a complete alignment-free diagnostic pipeline on NVIDIA Jetson AGX Orin, replacing Minimap2 alignment with a custom k-mer voting classifier achieving under 1 second per sample on CPU vs. 10-20 minutes with traditional tools.',
      'Validated against 43,000+ clinical sequences from Stanford HIVdb across 10+ HIV subtypes globally, achieving 97.5-99.7% recall with all per-mutation Fisher exact tests significant at p < 0.001.',
      'Engineered a six-component Python preprocessing suite handling FASTQ/FASTA parsing, codon frame resolution via stop-codon counting, and gene region localization across PR/RT/IN with automated quality filtering.',
      'Designing a CNN-Transformer architecture for resistance classification targeting TensorRT quantization for Jetson deployment, with training data prepared across 16 ACTG clinical trials and 8,000+ sequences.',
    ],
  },
  {
    logo: '/images/kellylogo.png',
    period: 'Jun 2025 – Jan 2026',
    title: 'Graduate Research Assistant',
    institution: 'Indiana University Kelley School of Business',
    points: [
      'Built an end-to-end NBA press conference pipeline processing 700+ games, parallelizing WhisperX transcription across 5 Slurm-managed HPC nodes with SQLite file-locking for distributed state, achieving a 30x speedup (3.5m to 7s per audio-minute).',
      'Deployed 8-bit quantized Llama-3 8B (bitsandbytes) on Big Red 200 A100 nodes for psychological marker extraction, achieving 89% precision — a 17-point improvement over a 72% RoBERTa baseline on a 500-quote gold set.',
      'Architected a Transformer Encoder fusing Llama-3 sentiment embeddings with rolling box-score metrics, chosen over XGBoost to allow direct feature interaction, achieving 53.8% Against-The-Spread accuracy on a 120-game chronological holdout vs. 52.4% breakeven.',
    ],
  },
  {
    logo: '/images/sparkwoodlogo.png',
    period: 'Jan 2024 – Jun 2024',
    title: 'Data Engineering Intern',
    institution: 'Sparkwood IT Solutions, Pune, India',
    points: [
      'Collaborated with a senior engineer to conduct root-cause analysis on a 5% KPI discrepancy between Marketing and Finance, resolving it via a SQL View as a shared source of truth — an architectural fix rather than a query patch.',
      'Diagnosed a legacy PostgreSQL sales report taking 5 minutes to generate, identified the root cause via execution plan analysis, and implemented composite indexing reducing report generation latency by 40% (5m to 3m).',
      'Diagnosed recurring database lock contention in production Airflow ETL pipelines, implementing automated retry logic that reduced nightly pipeline failures by 90%, from near-daily incidents to under one manual intervention per month.',
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