import React, { useState } from 'react';
import portfolio from '../data/portfolio.generated';
import './Projects.css';

const ProjectLinks = ({ project }) => (
  <span className="project-links">
    <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">&rarr;</span></a>
    {project.demo && (
      <a href={project.demo} target="_blank" rel="noopener noreferrer">Demo <span aria-hidden="true">&rarr;</span></a>
    )}
  </span>
);

const ProjectRow = ({ project, index }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const hasDetails = project.metrics.length > 1 || project.tags.length > 0;

  return (
    <article className="project-row">
      <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        {project.metrics[0] && (
          <p className="project-evidence"><strong>{project.metrics[0]}</strong></p>
        )}
        {hasDetails && (
          <>
            <div className="project-actions">
              <ProjectLinks project={project} />
              <button
                type="button"
                className="project-details-toggle"
                onClick={() => setDetailsOpen((open) => !open)}
                aria-expanded={detailsOpen}
              >
                {detailsOpen ? 'Hide details' : 'More details'} <span aria-hidden="true">{detailsOpen ? '−' : '+'}</span>
              </button>
            </div>
            {detailsOpen && (
              <div className="project-details">
                {project.metrics.slice(1).map((metric) => <p key={metric}>{metric}</p>)}
                <p className="project-tags">{project.tags.join(' · ')}</p>
              </div>
            )}
          </>
        )}
        {!hasDetails && <div className="project-actions"><ProjectLinks project={project} /></div>}
      </div>
    </article>
  );
};

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const featured = portfolio.projects.filter((project) => project.featured);
  const visibleProjects = showAll ? portfolio.projects : featured;

  return (
    <section id="projects" className="projects">
      <div className="section-heading">
        <h2>Projects</h2>
        <span>systems / research / product</span>
      </div>
      <div>
        {visibleProjects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
      </div>
      <button
        type="button"
        className="all-projects-toggle"
        onClick={() => setShowAll((open) => !open)}
        aria-expanded={showAll}
      >
        {showAll ? 'Show selected work only' : 'View all projects'} <span aria-hidden="true">&rarr;</span>
      </button>
    </section>
  );
};

export default Projects;
