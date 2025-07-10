// components/Footer.js
'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h2 className="text-lg font-semibold mb-2">🎬 MoviesHub</h2>
        <p className="text-sm mb-4">
          Built with ❤️ using Next.js and TMDB API. For learning and exploration purposes.
        </p>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} MoviesHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
