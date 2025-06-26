// src/components/Projects.js
import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import { allProjects } from './ProjectsData';
import './Projects.css';

const Projects = () => {
  const [selectedTag, setSelectedTag] = useState('All');

  const handleTagChange = (tag) => setSelectedTag(tag);

  const filteredProjects = selectedTag === 'All'
    ? allProjects
    : allProjects.filter(project => project.tags.includes(selectedTag));

  const tags = ['All', ...Array.from(new Set(allProjects.flatMap(p => p.tags)))]

  // Split projects into rows of 3
  const rows = [];
  for (let i = 0; i < filteredProjects.length; i += 3) {
    const rowProjects = filteredProjects.slice(i, i + 3);
    const isLastRow = i + 3 >= filteredProjects.length;

    rows.push(
      <div
        key={`row-${i}`}
        className={`project-row ${isLastRow ? 'last-row' : ''}`}
      >
        {rowProjects.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    );
  }

  return (
    <section id="projects" className="projects">
      <h2 className="projects-title">Projects</h2>
      <ProjectFilter tags={tags} selectedTag={selectedTag} onTagChange={handleTagChange} />
      <div className="project-wrapper">
        {rows}
      </div>
    </section>
  );
};

export default Projects;