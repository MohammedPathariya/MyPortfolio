import React from 'react';
import { act, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnimatedHeroIllustration from './AnimatedHeroIllustration';

beforeEach(() => {
  jest.useFakeTimers();
  window.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
  Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test('rests before waving once and then starts working', () => {
  const { container } = render(<AnimatedHeroIllustration alt="Animated character" />);
  const illustration = container.querySelector('.hero-animation');

  expect(illustration).toHaveClass('hero-character--idle');

  act(() => jest.advanceTimersByTime(1100));
  expect(illustration).toHaveClass('hero-character--waving');

  act(() => jest.advanceTimersByTime(1800));
  expect(illustration).toHaveClass('hero-character--working');
  expect(container.querySelector('.hero-character-neutral')).toHaveAttribute(
    'src',
    '/images/hero-character/neutral.webp'
  );
  expect(container.querySelectorAll('.hero-character-pupil')).toHaveLength(2);
  expect(container.querySelectorAll('.hero-character-eyelid')).toHaveLength(2);
  expect(container.querySelector('.hero-character-wave-body')).toHaveAttribute(
    'src',
    '/images/hero-character/wave-body.webp'
  );
  expect(container.querySelector('.hero-character-wave-forearm')).toHaveAttribute(
    'src',
    '/images/hero-character/wave-forearm.webp'
  );
});

test('scrolling down skips the greeting and does not restart it', () => {
  const { container } = render(<AnimatedHeroIllustration alt="Animated character" />);
  const illustration = container.querySelector('.hero-animation');

  Object.defineProperty(window, 'scrollY', { configurable: true, value: 80 });
  fireEvent.scroll(window);
  expect(illustration).toHaveClass('hero-character--working');

  Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 });
  fireEvent.scroll(window);
  act(() => jest.advanceTimersByTime(3000));
  expect(illustration).toHaveClass('hero-character--working');
});
