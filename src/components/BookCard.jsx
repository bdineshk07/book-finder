// src/components/BookCard.jsx
import React from 'react';

export default function BookCard({ book }) {
  // OpenLibrary docs: cover_i can be used with covers.openlibrary.org
  // e.g. https://covers.openlibrary.org/b/id/<cover_i>-M.jpg
  const coverId = book.cover_i;
  const isbn = book.isbn && book.isbn[0];
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : isbn
    ? `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`
    : null;

  const authors = book.author_name ? book.author_name.join(', ') : 'Unknown author';
  const title = book.title || 'Untitled';
  const year = book.first_publish_year || '';

  return (
    <article className="bg-white rounded-lg shadow p-3 flex flex-col">
      <div className="flex items-start gap-3">
        {coverUrl ? (
          <img src={coverUrl} alt={`${title} cover`} className="w-24 h-36 object-cover rounded" />
        ) : (
          <div className="w-24 h-36 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
            No cover
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{authors}</p>
          {year && <p className="text-xs text-gray-500 mt-1">First published: {year}</p>}
          {book.key && (
            <a
              className="mt-3 inline-block text-sm text-indigo-600 hover:underline"
              href={`https://openlibrary.org${book.key}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on OpenLibrary
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
