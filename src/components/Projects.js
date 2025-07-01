// src/components/Projects.js
import React, { useState, useRef } from 'react';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import { allProjects } from './ProjectsData';
import './Projects.css';

const Projects = () => {
  const [selectedTags, setSelectedTags] = useState(['All']);
  const [showAll, setShowAll] = useState(false);
  const projectsRef = useRef(null);

  // Split featured vs. other projects
  const featuredProjects = allProjects.filter(p => p.featured);
  const otherProjects    = allProjects.filter(p => !p.featured);

  // Build tag sets
  const allTags      = Array.from(new Set(allProjects.flatMap(p => p.tags)));
  const featuredTags = Array.from(new Set(featuredProjects.flatMap(p => p.tags)));

  // Filter featured and full lists by tags
  const filteredFeatured = selectedTags.includes('All')
    ? featuredProjects
    : featuredProjects.filter(p =>
        p.tags.some(tag => selectedTags.includes(tag))
      );

  const filteredFull = selectedTags.includes('All')
    ? [...featuredProjects, ...otherProjects]
    : [...featuredProjects, ...otherProjects].filter(p =>
        p.tags.some(tag => selectedTags.includes(tag))
      );

  // Decide which list to render
  const projectsToShow = showAll ? filteredFull : filteredFeatured;

  // Chunk into rows of 3
  const chunk = arr => {
    const rows = [];
    for (let i = 0; i < arr.length; i += 3) {
      rows.push(arr.slice(i, i + 3));
    }
    return rows;
  };

  const handleToggle = () => {
    const newShowAll = !showAll;
    setShowAll(newShowAll);
    if (showAll) {
      // Reset filters when collapsing
      setSelectedTags(['All']);
    }
    // Smooth scroll with offset for navbar
    const nav = document.querySelector('nav');
    const navHeight = nav ? nav.offsetHeight : 0;
    const top =
      projectsRef.current.getBoundingClientRect().top +
      window.scrollY -
      navHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      <div className="projects-header">
        <h2 className="projects-title">
          {showAll ? 'All Projects' : 'Featured Projects'}
        </h2>
        <a className="toggle-link" onClick={handleToggle}>
          {showAll ? 'Show Less' : 'See More Projects'}
        </a>
      </div>

      {/* Show only featuredTags initially, then allTags */}
      <ProjectFilter
        tags={showAll ? allTags : featuredTags}
        selectedTags={selectedTags}
        onTagChange={setSelectedTags}
      />

      <div className="project-wrapper">
        {chunk(projectsToShow).map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`project-row ${
              rowIndex === chunk(projectsToShow).length - 1 ? 'last-row' : ''
            }`}
          >
            {row.map(project => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
