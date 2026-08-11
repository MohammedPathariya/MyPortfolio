import React from 'react';
import portfolio from '../data/portfolio.generated';
import './Skills.css';

const Skills = () => (
  <section id="skills" className="skills-section">
    <h2 className="skills-title">Skills</h2>
    <p className="skills-subtext">
      A quick overview of the languages, frameworks, and tools I work with.
    </p>
    <div className="skills-grid">
      {portfolio.skills.map((group) => (
        <article className="skills-card" key={group.id}>
          <h3 className="skills-category">{group.category}</h3>
          <ul className="skills-list">
            {group.items.map((skill) => (
              <li key={skill.id} title={skill.description}>{skill.name}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);

export default Skills;
