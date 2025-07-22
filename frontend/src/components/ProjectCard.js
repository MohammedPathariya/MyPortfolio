// src/components/ProjectCard.js
import React from 'react';
import './Projects.css';

const ProjectCard = ({ project }) => {
  const hasLiveDemo = project.demo && project.demo !== '#';

  return (
    <div className="project-card">
      <img src={project.thumbnail} alt={`${project.title} Thumbnail`} className="project-thumbnail" />
      <h3 className="project-title">{project.title}</h3>
      <p className="project-description">{project.description}</p>
      <div className="project-tags">
        {project.tags.map(tag => (
          <span key={tag} className="project-tag">{tag}</span>
        ))}
      </div>

      <div className={`project-links ${!hasLiveDemo ? 'centered' : ''}`}>
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-button">
          GitHub
        </a>
        {hasLiveDemo && (
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-button">
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;