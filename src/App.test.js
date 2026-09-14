import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import tailwindConfig from '../tailwind.config.js';

test('tailwind uses class-driven dark mode for the theme icon toggle', () => {
  expect(tailwindConfig.darkMode).toBe('class');
});

test('theme icon toggles the document root class and persisted app-theme value', () => {
  localStorage.setItem('app-theme', 'dark');

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  const toggleButton = screen.getByTitle(/switch to light mode/i);
  expect(document.documentElement.classList.contains('dark')).toBe(true);

  fireEvent.click(toggleButton);

  expect(document.documentElement.classList.contains('dark')).toBe(false);
  expect(localStorage.getItem('app-theme')).toBe('light');
  expect(screen.getByTitle(/switch to dark mode/i)).toBeInTheDocument();
});
