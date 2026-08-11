import React from 'react';
import './Projects.css';

const ProjectFilter = ({ tags, selectedTags, onTagChange }) => {
  // Ensure "All" is first, then the rest sorted A→Z (excluding "All")
  const sortedTags = [
    'All',
    ...tags
      .filter(t => t !== 'All')
      .sort((a, b) => a.localeCompare(b))
  ];

  const handleClick = tag => {
    let newSelected;

    if (tag === 'All') {
      // selecting "All" resets everything
      newSelected = ['All'];
    } else {
      if (selectedTags.includes(tag)) {
        // un-selecting a tag
        newSelected = selectedTags.filter(t => t !== tag);
      } else {
        // selecting a new tag: drop "All" if present
        newSelected = selectedTags
          .filter(t => t !== 'All')
          .concat(tag);
      }
      // if nothing left, fall back to All
      if (newSelected.length === 0) {
        newSelected = ['All'];
      }
    }

    onTagChange(newSelected);
  };

  return (
    <div className="project-filter" role="group" aria-label="Filter projects by technology">
      {sortedTags.map(tag => (
        <button
          key={tag}
          onClick={() => handleClick(tag)}
          className={
            selectedTags.includes(tag)
              ? 'tag-button active'
              : 'tag-button'
          }
          aria-pressed={selectedTags.includes(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;
