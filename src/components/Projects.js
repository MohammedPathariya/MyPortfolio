// src/components/Projects.js
import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectFilter from './ProjectFilter';
import { allProjects } from './ProjectsData';
import './Projects.css';

const Projects = () => {
  // Multi-tag selection from before
  const [selectedTags, setSelectedTags] = useState(['All']);
  // New: toggle to show all or only featured
  const [showAll, setShowAll] = useState(false);

  // 1) Split out featured vs. rest
  const featuredProjects = allProjects.filter(p => p.featured);
  const otherProjects = allProjects.filter(p => !p.featured);

  // 2) Filtering logic (only applies when showing the “other” section)
  const filteredOthers = selectedTags.includes('All')
    ? otherProjects
    : otherProjects.filter(proj =>
        proj.tags.some(tag => selectedTags.includes(tag))
      );

  // 3) Tag list (don’t include “All” here—ProjectFilter will prepend it)
  const tags = Array.from(
    new Set(allProjects.flatMap(p => p.tags))
  );

  // 4) Helper to split into rows of 3
  const chunk = (arr) => {
    const rows = [];
    for (let i = 0; i < arr.length; i += 3) {
      rows.push(arr.slice(i, i + 3));
    }
    return rows;
  };

  return (
    <section id="projects" className="projects">
      <h2 className="projects-title">Featured Projects</h2>
      <div className="project-wrapper">
        {chunk(featuredProjects).map((row, i) => (
          <div key={i} className="project-row">
            {row.map((project, idx) => (
              <ProjectCard key={idx} project={project} />
            ))}
          </div>
        ))}
      </div>

      {/* See More toggle */}
      {!showAll && (
        <div className="see-more-wrapper">
          <button
            className="see-more-button"
            onClick={() => setShowAll(true)}
          >
            See More Projects
          </button>
        </div>
      )}

      {showAll && (
        <>
          <h2 className="projects-title">All Projects</h2>
          <ProjectFilter
            tags={tags}
            selectedTags={selectedTags}
            onTagChange={setSelectedTags}
          />
          <div className="project-wrapper">
            {chunk(filteredOthers).map((row, i) => (
              <div
                key={i}
                className={`project-row ${
                  i === chunk(filteredOthers).length - 1 ? 'last-row' : ''
                }`}
              >
                {row.map((project, idx) => (
                  <ProjectCard key={idx} project={project} />
                ))}
              </div>
            ))}
          </div>
          <div className="see-more-wrapper">
            <button
              className="see-more-button"
              onClick={() => setShowAll(false)}
            >
              Show Less
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Projects;