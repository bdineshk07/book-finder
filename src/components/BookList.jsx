// src/components/BookList.jsx
import React from "react";
import BookCard from "./BookCard";

export default function BookList({ books }) {
  if (!books || books.length === 0) {
    return <p className="text-center text-gray-600">No results found.</p>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {books.map((b) => (
        <BookCard key={`${b.key}-${b.cover_i || ""}`} book={b} />
      ))}
    </div>
  );
}
