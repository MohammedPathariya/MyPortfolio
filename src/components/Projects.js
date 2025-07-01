// src/components/Projects.js
import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import { allProjects } from './ProjectsData';
import './Projects.css';

const Projects = () => {
  // 1) State is now an array of tags
  const [selectedTags, setSelectedTags] = useState(['All']);

  // 2) When tags change, we get an array back
  const handleTagChange = (newTags) => {
    setSelectedTags(newTags);
  };

  // 3) If 'All' is selected, show everything, otherwise any overlap
  const filteredProjects = selectedTags.includes('All')
    ? allProjects
    : allProjects.filter(project =>
        project.tags.some(tag => selectedTags.includes(tag))
      );

  // 4) Pass only the raw tag list (no 'All'); ProjectFilter will insert & sort it
  const tags = Array.from(new Set(allProjects.flatMap(p => p.tags)));

  // 5) Build rows of 3 as before
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
      <ProjectFilter
        tags={tags}
        selectedTags={selectedTags}
        onTagChange={handleTagChange}
      />
      <div className="project-wrapper">
        {rows}
      </div>
    </section>
  );
};

export default Projects;