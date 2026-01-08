// src/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const slides = [
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=1600&h=900&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=900&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&h=900&fit=crop',
];

export default function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-slate-950 to-black text-white">
      {/* Background slideshow */}
      <div className="absolute inset-0 -z-10">
        {slides.map((src, index) => (
          <div
            key={src + index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-out
              ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${src})`, filter: 'brightness(0.35) saturate(1.3)' }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-slate-950/90" />
      </div>

      {/* Hero content */}
      <section className="max-w-6xl mx-auto px-4 pt-24 pb-16 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <p className="text-xs uppercase tracking-[0.3em] text-cyan-400/70">
            BabaGallery • Portfolio Hub
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            A modern home for your{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              photos, projects & ideas
            </span>
          </h1>
          <p className="text-sm md:text-base text-gray-300 max-w-xl">
            Curated gallery, featured projects, and blog posts in a single professional, techy
            experience. Designed and developed by Babamosie for BCA-level real-world practice.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/gallery"
              className="px-5 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-sm font-medium text-black shadow-lg shadow-cyan-500/40 transition-transform hover:-translate-y-0.5"
            >
              View Photo Gallery
            </Link>
            <Link
              href="/projects"
              className="px-5 py-2.5 rounded-full border border-gray-600/70 bg-black/40 hover:border-cyan-400 text-sm font-medium text-gray-100"
            >
              Explore Projects
            </Link>
            <Link
              href="/blog"
              className="px-5 py-2.5 rounded-full border border-gray-700 bg-gradient-to-r from-slate-900/70 to-slate-950/70 hover:border-blue-500 text-sm font-medium text-gray-200"
            >
              Read Blog Posts
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <div className="relative rounded-3xl border border-cyan-500/40 bg-slate-950/60 p-4 shadow-[0_0_80px_-30px_rgba(34,211,238,0.7)]">
            <div className="grid grid-cols-3 gap-2">
              <div className="h-28 md:h-32 bg-gradient-to-br from-cyan-500/40 to-blue-600/30 rounded-xl" />
              <div className="h-28 md:h-32 bg-gradient-to-br from-purple-500/40 to-pink-600/30 rounded-xl" />
              <div className="h-28 md:h-32 bg-gradient-to-br from-sky-500/40 to-indigo-600/30 rounded-xl" />
              <div className="col-span-3 h-28 md:h-40 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl border border-white/5 flex items-center justify-between px-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-gray-400">Dashboard</p>
                  <p className="text-lg font-semibold mt-1">Photos • Projects • Blog</p>
                  <p className="text-xs text-gray-400 mt-1">Central control panel of BabaGallery</p>
                </div>
                <span className="inline-flex h-10 w-10 rounded-full bg-cyan-500/20 border border-cyan-400/60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sections preview */}
      <section className="max-w-6xl mx-auto px-4 pb-16 grid md:grid-cols-3 gap-6">
        <Link
          href="/gallery"
          className="group rounded-2xl border border-white/5 bg-slate-950/70 p-5 hover:border-cyan-400/60 hover:bg-slate-900/80 transition-colors"
        >
          <h2 className="text-lg font-semibold mb-1">Photo Gallery</h2>
          <p className="text-xs text-gray-400 mb-3">
            High-quality images with fullscreen lightbox and smooth animations.
          </p>
          <span className="text-xs text-cyan-400 group-hover:underline">Open gallery →</span>
        </Link>

        <Link
          href="/projects"
          className="group rounded-2xl border border-white/5 bg-slate-950/70 p-5 hover:border-blue-400/60 hover:bg-slate-900/80 transition-colors"
        >
          <h2 className="text-lg font-semibold mb-1">Projects</h2>
          <p className="text-xs text-gray-400 mb-3">
            Showcase Babazon, AI tools site, Baba_Quotes_Gen and more with thumbnails.
          </p>
          <span className="text-xs text-blue-400 group-hover:underline">View projects →</span>
        </Link>

        <Link
          href="/blog"
          className="group rounded-2xl border border-white/5 bg-slate-950/70 p-5 hover:border-purple-400/60 hover:bg-slate-900/80 transition-colors"
        >
          <h2 className="text-lg font-semibold mb-1">Blog</h2>
          <p className="text-xs text-gray-400 mb-3">
            Share notes, tutorials and BCA learning journeys with your readers.
          </p>
          <span className="text-xs text-purple-400 group-hover:underline">Go to blog →</span>
        </Link>
      </section>
    </div>
  );
}
