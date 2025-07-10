// lib/tmdb.js
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function searchMovies(query) {
  const res = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );
  if (!res.ok) throw new Error('Failed to fetch movies');
  const data = await res.json();
  return data.results;
}

export async function getMovieDetails(id) {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits,similar`
  );
  if (!res.ok) throw new Error('Failed to fetch movie details');
  return res.json();
}

// 🆕 New movie category endpoints
export async function getPopularMovies() {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
  if (!res.ok) throw new Error('Failed to fetch popular movies');
  return res.json().then(d => d.results);
}

export async function getTopRatedMovies() {
  const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
  if (!res.ok) throw new Error('Failed to fetch top rated movies');
  return res.json().then(d => d.results);
}

export async function getNowPlayingMovies() {
  const res = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);
  if (!res.ok) throw new Error('Failed to fetch now playing movies');
  return res.json().then(d => d.results);
}
