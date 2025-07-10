// components/GenreFilter.js
'use client';
import { useEffect, useState } from 'react';

export default function GenreFilter({ onChange }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function fetchGenres() {
      const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`);
      const data = await res.json();
      setGenres(data.genres);
    }
    fetchGenres();
  }, []);

  return (
    <div className="my-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">Filter by Genre</label>
      <select
        className="w-full md:w-64 border p-2 rounded"
        onChange={(e) => onChange(e.target.value)}
        defaultValue=""
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
}