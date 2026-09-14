import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CreateNote from './components/CreateNote';
import ViewNote from './components/ViewNote';
import NotFound from './components/NotFound'; // <-- Import component
import { Sun, Moon } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app-theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <Link to="/" className="inline-block group">
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                QuickBin
              </h1>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">
              Share rich text & code anonymously via unique links
            </p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<CreateNote theme={theme} />} />
            <Route path="/:id" element={<ViewNote theme={theme} />} />
            {/* Handles all undefined URLs */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}