import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Solidify Posture',
  description: 'Desktop-first posture coaching with privacy-first local inference.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-700">
                Solidify Posture
              </p>
              <h1 className="text-2xl font-semibold">Sit Better. Focus Longer. Ship Faster.</h1>
            </div>
            <nav className="flex gap-4 text-sm text-slate-600">
              <a className="hover:text-slate-900" href="/">
                Dashboard
              </a>
              <a className="hover:text-slate-900" href="/">
                Sessions
              </a>
              <a className="hover:text-slate-900" href="/">
                Leaderboard
              </a>
              <a className="hover:text-slate-900" href="/">
                Settings
              </a>
            </nav>
          </header>
          <main className="mt-8 flex-1">{children}</main>
          <footer className="mt-12 text-xs text-slate-400">Built for indie hackers. Signal over noise.</footer>
        </div>
      </body>
    </html>
  );
}
