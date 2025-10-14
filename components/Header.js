'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Header({ title, ttsControls }) {
  return (
    <header className="sticky top-0 z-50 bg-light-bg dark:bg-dark-bg">
      <nav className="container mx-auto px-4 py-3 max-w-[65ch] border-b border-light-border dark:border-dark-border">
        {/* First Line: Title/Home + Icons */}
        <div className="flex items-center justify-between">
          {/* Left: Title or Home Button */}
          {title ? (
            <h1 className="text-lg font-semibold text-text-light dark:text-text-dark truncate max-w-[70%]" title={title}>
              {title}
            </h1>
          ) : (
            <Link
              href="/"
              className="text-xl font-semibold text-text-light dark:text-text-dark hover:text-black dark:hover:text-white no-underline"
            >
              Home
            </Link>
          )}

          {/* Right: Theme + Settings Icons */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              title="Settings"
              className="p-2 text-text-light dark:text-text-dark hover:text-black dark:hover:text-white transition-colors"
              aria-label="Global Settings"
            >
              ⚙
            </button>
          </div>
        </div>

        {/* Second Line: TTS Controls (only on report pages) */}
        {ttsControls && (
          <div className="mt-2 pt-2 border-t border-light-border dark:border-dark-border">
            {ttsControls}
          </div>
        )}
      </nav>
    </header>
  )
}