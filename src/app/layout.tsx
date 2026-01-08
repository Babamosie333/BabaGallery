import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';

export const meta:Metadata = {
  title: 'BabaGallery | Babamosie',
  description: 'Professional techy gallery & portfolio by Babamosie333',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body className="bg-black text-gray-100 antialiased">
        <header className="sticky top-0 z-40 border-b border-white/5 bg-gradient-to-r from-black via-slate-950/80 to-black backdrop-blur-sm">
          <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                BabaGallery
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/gallery" className="hover:text-cyan-400 transition-colors">
                Gallery
              </Link>
              <Link href="/projects" className="hover:text-cyan-400 transition-colors">
                Projects
              </Link>
              <Link href="/blog" className="hover:text-cyan-400 transition-colors">
                Blog
              </Link>
              <a
                href="https://github.com/babamosie333"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-xs transition-colors"
              >
                GitHub
              </a>
            </div>
          </nav>
        </header>

        <main className="min-h-screen">{children}</main>

        <footer className="border-t border-white/5 bg-gradient-to-b from-black to-slate-950 py-8">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                BabaGallery
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                <Link href="/gallery" className="hover:text-cyan-400 transition-colors">
                  Gallery
                </Link>
                <Link href="/projects" className="hover:text-cyan-400 transition-colors">
                  Projects
                </Link>
                <Link href="/blog" className="hover:text-cyan-400 transition-colors">
                  Blog
                </Link>
                <a href="https://github.com/babamosie333" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  GitHub
                </a>
                <a href="https://youtube.com/@babamosie333" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
                  YouTube
                </a>
              </div>
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
              <p className="text-sm text-gray-500">
                Made with <span className="text-red-500">❤️</span> by{' '}
                <a href="https://github.com/babamosie333" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline font-semibold">
                  Babamosie333
                </a>
              </p>
              <p className="text-xs text-gray-600">BCA Student • Full-Stack Developer • Kanpur, India 🇮🇳</p>
              <p className="text-xs text-gray-700">© {new Date().getFullYear()} BabaGallery. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
