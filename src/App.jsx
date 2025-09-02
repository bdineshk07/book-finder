// src/App.jsx
import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import Pagination from "./components/Pagination";
import useDebounce from "./hooks/useDebounce";
import { searchBooks } from "./api/openLibrary";

export default function App() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 600);
  const [books, setBooks] = useState([]);
  const [numFound, setNumFound] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 20; // page size; OpenLibrary defaults to 20 if omitted. :contentReference[oaicite:4]{index=4}

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // When query changes, reset page
  useEffect(() => setPage(1), [debouncedQuery]);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setBooks([]);
      setNumFound(0);
      setError(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);

    searchBooks(debouncedQuery, page, limit)
      .then((data) => {
        if (cancelled) return;
        setBooks(data.docs || []);
        setNumFound(data.numFound || 0);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message || "Failed to fetch results");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, page]);

  const totalPages = Math.max(1, Math.ceil(numFound / limit));

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Book Finder</h1>
        <p className="text-sm text-gray-600 mb-4">
          Search books by title (Open Library)
        </p>
        <SearchBar
          value={query}
          onChange={setQuery}
          onSubmit={(q) => setQuery(q)}
        />
      </header>

      <main className="max-w-4xl mx-auto mt-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">
            <div>Error: {error}</div>
            <button
              onClick={() => {
                // simple retry: re-run current page
                setPage((p) => p);
              }}
              className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-800 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              {numFound > 0 && (
                <span>
                  Showing {(page - 1) * limit + 1} -{" "}
                  {Math.min(page * limit, numFound)} of {numFound} results.
                </span>
              )}
            </div>

            <BookList books={books} />

            {numFound > limit && (
              <Pagination
                page={page}
                totalPages={totalPages}
                onPrev={() => setPage((p) => Math.max(1, p - 1))}
                onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}
