// Improved: app/actor/[id]/page.js
import Image from 'next/image';
import { getPersonDetails } from '@/lib/tmdb';

export default async function ActorPage({ params }) {
  const actor = await getPersonDetails(params.id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {actor.profile_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
            alt={actor.name}
            width={300}
            height={450}
            className="rounded shadow"
          />
        )}
        <div>
          <h1 className="text-3xl font-bold mb-4">{actor.name}</h1>
          <p className="text-gray-700 whitespace-pre-wrap">{actor.biography || 'No biography available.'}</p>
        </div>
      </div>
    </div>
  );
}