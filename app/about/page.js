export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About This Project</h1>
      <p className="text-gray-700 leading-relaxed">
        Movie Explorer is a simple and elegant web app built with Next.js that allows users to:
      </p>
      <ul className="list-disc ml-6 my-4 space-y-2 text-gray-700">
        <li>🔍 Search for movies using the TMDB API</li>
        <li>🎬 View detailed movie info, trailers, cast, and similar titles</li>
        <li>⭐ Explore latest trending movies</li>
      </ul>
      <p className="text-gray-700">
        This project demonstrates client-side and server-side rendering, API integration, and responsive UI using TailwindCSS.
      </p>
    </main>
  );
}
