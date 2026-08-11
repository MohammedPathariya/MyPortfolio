import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThemeToggle from './ThemeToggle';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = '';
});

test('persists the selected theme and exposes pressed state', () => {
  render(<ThemeToggle />);
  const toggle = screen.getByRole('button');

  expect(toggle).toHaveAttribute('aria-pressed', 'false');
  fireEvent.click(toggle);

  expect(toggle).toHaveAttribute('aria-pressed', 'true');
  expect(localStorage.getItem('theme')).toBe('dark');
  expect(document.documentElement).toHaveClass('dark');
});
