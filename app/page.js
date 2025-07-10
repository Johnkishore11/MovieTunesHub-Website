// Enhanced: app/page.js with light Netflix/Prime-like theme
'use client';
import { useState, useEffect } from 'react';
import {
  searchMovies,
  getPopularMovies,
  getTopRatedMovies,
  getNowPlayingMovies,
} from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';
import { FaSearch } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import GenreFilter from '@/components/GenreFilter';
// import Carousel from '@/components/Carousel';

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    async function load() {
      setPopular(await getPopularMovies());
      setTopRated(await getTopRatedMovies());
      setNowPlaying(await getNowPlayingMovies());
    }
    load();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const movies = await searchMovies(query);
      setResults(movies);
    } catch {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const filterByGenre = (movies) => {
    if (!selectedGenre) return movies;
    return movies.filter((movie) => movie.genre_ids?.includes(Number(selectedGenre)));
  };

  return (
    <>
      <Navbar />
      <main className=" text-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          <form onSubmit={handleSearch} className="my-6 flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a movie..."
              className="w-full p-3 rounded bg-white border border-gray-300 text-gray-900 placeholder-gray-500 shadow-sm"
            />
            <button type="submit" className="p-3 bg-blue-600 text-white rounded hover:bg-blue-500">
              <FaSearch />
            </button>
          </form>

          {loading && <p className="text-gray-600">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {results.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-10">
                {results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </>
          )}

          <GenreFilter onChange={setSelectedGenre} />

          <Section title="Now Playing" movies={filterByGenre(nowPlaying)} />
          <Section title="Popular" movies={filterByGenre(popular)} />
          <Section title="Top Rated" movies={filterByGenre(topRated)} />
        </div>
      </main>
    </>
  );
}

function Section({ title, movies }) {
  return (
    <>
      <h2 className="text-2xl font-bold mt-10 mb-4 border-l-4 border-blue-600 pl-2">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
}