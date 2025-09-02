// src/api/openLibrary.js
export async function searchBooks(title, page = 1, limit = 20) {
    const q = encodeURIComponent(title.trim());
    const url = `https://openlibrary.org/search.json?title=${q}&page=${page}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`OpenLibrary API error (${res.status})`);
    }
    // returns an object containing { docs: [...], numFound, start, ... }
    return res.json();
  }
  