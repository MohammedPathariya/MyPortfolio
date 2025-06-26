import React from 'react';
import './Projects.css';

const ProjectFilter = ({ tags, selectedTag, onTagChange }) => (
  <div className="project-filter">
    {tags.map(tag => (
      <button
        key={tag}
        onClick={() => onTagChange(tag)}
        className={tag === selectedTag ? 'tag-button active' : 'tag-button'}
      >
        {tag}
      </button>
    ))}
  </div>
);

export default ProjectFilter;
