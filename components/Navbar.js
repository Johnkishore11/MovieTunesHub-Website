'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600 flex items-center gap-2">
  <img src="/clapper.png" alt="Logo" className="w-6 h-6" />
  <span>CineCore</span>
</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
          <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
        </div>

        {/* Mobile Icon */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-xl text-gray-700">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
