import React from 'react';
import './Projects.css';

const ProjectCard = ({ project }) => (
  <div className="project-card">
    <img src={project.thumbnail} alt={project.title} className="project-thumbnail" />
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <div className="project-tags">
      {project.tags.map((tag, idx) => (
        <span key={idx} className="project-tag">{tag}</span>
      ))}
    </div>
    <div className="project-links">
      <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href={project.demo} target="_blank" rel="noopener noreferrer">Live Demo</a>
    </div>
  </div>
);

export default ProjectCard;
