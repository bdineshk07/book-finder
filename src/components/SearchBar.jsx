// src/components/SearchBar.jsx
import React from 'react';

export default function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
      className="w-full max-w-2xl mx-auto flex gap-2"
    >
      <input
        aria-label="Search books by title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search books by title (e.g., 'Pride and Prejudice')"
        className="flex-1 px-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
      >
        Search
      </button>
    </form>
  );
}
