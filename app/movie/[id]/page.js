// Improved: app/movie/[id]/page.js
import Image from 'next/image';
import Link from 'next/link';
import { getMovieDetails } from '@/lib/tmdb';
import MovieCard from '@/components/MovieCard';

export default async function MoviePage({ params }) {
  const movie = await getMovieDetails(params.id);
  const trailer = movie.videos.results.find((v) => v.type === 'Trailer');

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="rounded w-full md:w-auto"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-700 mb-4">{movie.overview}</p>
          <p className="font-semibold">Release Date: {movie.release_date}</p>
          <p className="font-semibold">Rating: {movie.vote_average}</p>

          {movie.genres?.length > 0 && (
            <div className="flex flex-wrap gap-2 my-4">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-gray-200 text-sm px-3 py-1 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          <h2 className="text-xl font-bold mt-6 mb-2">Cast</h2>
          <ul className="list-disc ml-5 space-y-1">
            {movie.credits.cast.slice(0, 5).map((actor) => (
              <li key={actor.id}>
                <Link
                  href={`/actor/${actor.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {actor.name}
                </Link>{' '}
                as {actor.character}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {trailer && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Watch Trailer</h2>
          <iframe
            className="w-full aspect-video rounded"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={movie.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <h2 className="text-2xl font-bold mt-10 mb-4">Similar Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movie.similar.results.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </main>
  );
}