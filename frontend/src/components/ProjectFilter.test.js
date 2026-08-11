import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectFilter from './ProjectFilter';

test('selects and reports a project filter', () => {
  const onTagChange = jest.fn();

  render(
    <ProjectFilter
      tags={['Python', 'React']}
      selectedTags={['All']}
      onTagChange={onTagChange}
    />
  );

  const pythonButton = screen.getByRole('button', { name: 'Python' });
  expect(pythonButton).toHaveAttribute('aria-pressed', 'false');

  fireEvent.click(pythonButton);

  expect(onTagChange).toHaveBeenCalledWith(['Python']);
});
