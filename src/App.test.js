import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  window.IntersectionObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

test('renders the hero headline and primary navigation', () => {
  render(<App />);
  expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
});
