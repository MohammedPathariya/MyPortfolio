import React from 'react';

const FeaturedProjects = ({ projects }) => (
  <div className="featured-projects">
    {projects.map(project => (
      <div key={project.title} className="featured-card">
        <img src={project.thumbnail} alt={project.title} />
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
        </div>
        <div className="links">
          <a href={project.github}>GitHub</a>
          <a href={project.demo}>Live Demo</a>
        </div>
      </div>
    ))}
  </div>
);

export default FeaturedProjects;
