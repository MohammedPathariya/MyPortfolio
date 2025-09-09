// Skills.js
import React from 'react';
import './Skills.css';
import { FaPython, FaReact, FaGit, FaDocker, FaTerminal, FaLink, FaUsersCog, FaPlug, FaGithub, FaBalanceScale, FaBrain } from 'react-icons/fa';
import { SiPostgresql, SiFlask, SiTensorflow, SiScikitlearn, SiPandas, SiNumpy, SiR, SiPytorch, SiMlflow, SiLangchain, SiGooglecloud, SiApacheairflow, SiStreamlit, SiHuggingface, SiVercel, SiGithubactions, SiVisualstudiocode, SiJupyter } from 'react-icons/si';

// This data is now synchronized with the resume for a consistent professional brand.
const skillsData = [
  {
    category: 'Languages',
    skills: [
      { icon: <FaPython style={{ color: '#3572A5' }} />, name: 'Python', desc: 'Core language for DS & ML' },
      { icon: <SiPostgresql style={{ color: '#336791' }} />, name: 'SQL', desc: 'Data querying & manipulation' },
      { icon: <SiR style={{ color: '#276DC3' }} />, name: 'R', desc: 'Statistical analysis' },
      { icon: <FaTerminal style={{ color: '#4d4d4d' }} />, name: 'Bash', desc: 'Command-line scripting' },
    ],
  },
  {
    category: 'Data Science & Statistics',
    skills: [
      { icon: <SiPandas style={{ color: '#130754' }} />, name: 'Pandas', desc: 'Data analysis & cleaning' },
      { icon: <SiNumpy style={{ color: '#013243' }} />, name: 'NumPy', desc: 'Numerical computation' },
      { icon: <FaBalanceScale style={{ color: '#555' }} />, name: 'A/B Testing', desc: 'Experimental design' },
      { icon: <FaBrain style={{ color: '#e91e63' }} />, name: 'Statistical Inference', desc: 'Hypothesis testing & analysis' },
      { icon: <SiScikitlearn style={{ color: '#F7931E' }} />, name: 'Scikit-learn', desc: 'Classical ML models' },
    ],
  },
  {
    category: 'Machine Learning & MLOps',
    skills: [
      { icon: <SiPytorch style={{ color: '#EE4C2C' }} />, name: 'PyTorch', desc: 'Deep learning framework' },
      { icon: <SiMlflow style={{ color: '#0194E2' }} />, name: 'MLflow', desc: 'ML experiment tracking' },
      { icon: <SiLangchain style={{ color: '#555' }} />, name: 'LangChain', desc: 'LLM application framework' },
      { icon: <FaUsersCog style={{ color: '#4CAF50' }} />, name: 'CrewAI', desc: 'Multi-agent AI systems' },
    ],
  },
  {
    category: 'Cloud & Data Engineering',
    skills: [
      { icon: <SiGooglecloud style={{ color: '#4285F4' }} />, name: 'GCP', desc: 'Google Cloud Platform' },
      { icon: <SiPostgresql style={{ color: '#336791' }} />, name: 'PostgreSQL', desc: 'Relational databases' },
      { icon: <SiApacheairflow style={{ color: '#017CEE' }} />, name: 'Apache Airflow', desc: 'ETL orchestration' },
    ],
  },
  {
    category: 'MLOps & Deployment',
    skills: [
      { icon: <FaDocker style={{ color: '#0db7ed' }} />, name: 'Docker', desc: 'Containerization platform' },
      { icon: <SiFlask style={{ color: '#000000' }} />, name: 'Flask', desc: 'Python web framework' },
      { icon: <FaReact style={{ color: '#61DAFB' }} />, name: 'React', desc: 'Frontend UI library' },
      { icon: <SiStreamlit style={{ color: '#FF4B4B' }} />, name: 'Streamlit', desc: 'Data application framework' },
      { icon: <FaPlug style={{ color: '#999' }} />, name: 'REST APIs', desc: 'API design & development' },
    ],
  },
  {
    category: 'Developer Tools',
    skills: [
      { icon: <FaGit style={{ color: '#F1502F' }} />, name: 'Git', desc: 'Version control' },
      { icon: <FaGithub style={{ color: '#181717' }} />, name: 'GitHub', desc: 'Code hosting & collaboration' },
      { icon: <SiGithubactions style={{ color: '#2088FF' }} />, name: 'GitHub Actions', desc: 'CI/CD automation' },
      { icon: <SiVisualstudiocode style={{ color: '#007ACC' }} />, name: 'VS Code', desc: 'Code editor' },
      { icon: <SiJupyter style={{ color: '#F37626' }} />, name: 'Jupyter', desc: 'Notebooks for analysis' },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <h2 className="skills-title">Skills</h2>
      <p className="skills-subtext">A quick overview of the languages, frameworks, and tools I’ve developed strong proficiency in.</p>
      <div className="skills-grid">
        {skillsData.map((group) => (
          <div className="skills-card" key={group.category}>
            <h3 className="skills-category">{group.category}</h3>
            <div className="skills-icons">
              {group.skills.map((skill) => (
                <div className="skill-item" key={skill.name}>
                  <div className="skill-tooltip" data-tooltip={skill.desc}>
                    <div className="skill-icon">{skill.icon}</div>
                    <p className="skill-name">{skill.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;