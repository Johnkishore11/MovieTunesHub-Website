'use client';
export default function MovieCard({ movie }) {
  return (
    <a href={`/movie/${movie.id}`} className="block hover:opacity-80">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded shadow"
      />
      <p className="mt-2 text-center">{movie.title}</p>
    </a>
  );
}