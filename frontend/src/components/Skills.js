// Skills.js
import React from 'react';
import './Skills.css';
import { FaPython, FaJs, FaReact, FaGit, FaDocker, FaChartBar, FaUsers, FaClock, FaComments, FaQuestionCircle, FaTasks } from 'react-icons/fa';
import { SiTypescript, SiPostgresql, SiFlask, SiMongodb, SiTensorflow, SiScikitlearn, SiPandas, SiNumpy, SiOpencv, SiR, SiExpress, SiSqlite, SiFastapi} from 'react-icons/si';
import { TbBrandNodejs } from 'react-icons/tb';

const skillsData = [
    {
      category: 'Languages',
      skills: [
        { icon: <FaPython style={{ color: '#3572A5' }} />, name: 'Python', desc: 'Scripting, ML, and Automation' },
        { icon: <SiSqlite style={{ color: '#003B57' }} />, name: 'SQL', desc: 'Data Querying and Aggregation' },
        { icon: <SiR style={{ color: '#276DC3' }} />, name: 'R', desc: 'Statistical Computing' },
        { icon: <FaJs style={{ color: '#F7DF1E' }} />, name: 'JavaScript', desc: 'Frontend Logic, Interactivity' },
        { icon: <SiTypescript style={{ color: '#3178C6' }} />, name: 'TypeScript', desc: 'Typed JavaScript Superset' },
      ],
    },
    {
      category: 'Data Stack',
      skills: [
        { icon: <SiTensorflow style={{ color: '#FF6F00' }} />, name: 'TensorFlow', desc: 'Deep Learning Framework' },
        { icon: <SiScikitlearn style={{ color: '#F7931E' }} />, name: 'Scikit-learn', desc: 'Classical ML Models' },
        { icon: <SiPandas style={{ color: '#130754' }} />, name: 'Pandas', desc: 'Data Analysis & Cleaning' },
        { icon: <SiNumpy style={{ color: '#013243' }} />, name: 'NumPy', desc: 'Numerical Computation' },
        { icon: <SiOpencv style={{ color: '#5C3EE8' }} />, name: 'OpenCV', desc: 'Computer Vision Toolkit' },
      ],
    },
    {
      category: 'Tools',
      skills: [
        { icon: <FaGit style={{ color: '#F1502F' }} />, name: 'Git', desc: 'Version Control System' },
        { icon: <FaDocker style={{ color: '#0db7ed' }} />, name: 'Docker', desc: 'Containerization Platform' },
        { icon: <SiPostgresql style={{ color: '#336791' }} />, name: 'PostgreSQL', desc: 'Relational Database' },
        { icon: <SiMongodb style={{ color: '#4DB33D' }} />, name: 'MongoDB', desc: 'Document Database' },
        { icon: <FaChartBar style={{ color: '#f2c811' }} />, name: 'Power BI', desc: 'Data Visualization Tool' },
      ],
    },
    {
      category: 'Frameworks',
      skills: [
        { icon: <SiFlask style={{ color: '#000000' }} />, name: 'Flask', desc: 'Python Web Framework' },
        { icon: <SiFastapi style={{ color: '#009688' }} />, name: 'FastAPI', desc: 'High-performance API Framework' },
        { icon: <FaReact style={{ color: '#61DAFB' }} />, name: 'React', desc: 'Frontend UI Library' },
        { icon: <TbBrandNodejs style={{ color: '#3C873A' }} />, name: 'Node.js', desc: 'Backend JavaScript Runtime' },
        { icon: <SiExpress style={{ color: '#999999' }} />, name: 'Express', desc: 'Minimal Node.js Backend' },
      ],
    },
    {
      category: 'Soft Skills',
      skills: [
        { icon: <FaUsers style={{ color: '#6f42c1' }} />, name: 'Teamwork', desc: 'Collaboration and support' },
        { icon: <FaClock style={{ color: '#2ecc71' }} />, name: 'Time Management', desc: 'Effective task prioritization' },
        { icon: <FaComments style={{ color: '#3498db' }} />, name: 'Communication', desc: 'Clear, impactful messaging' },
        { icon: <FaQuestionCircle style={{ color: '#9b59b6' }} />, name: 'Critical Thinking', desc: 'Analytical problem-solving' },
        { icon: <FaTasks style={{ color: '#e91e63' }} />, name: 'Attention to Detail', desc: 'Precise, accurate execution' },
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