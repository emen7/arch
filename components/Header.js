'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import AppSettings from './AppSettings'

export default function Header({ title, ttsControls }) {
  return (
    <header className="sticky top-0 z-50 bg-light-bg dark:bg-dark-bg">
      <nav className="container mx-auto px-4 py-3 max-w-[65ch] border-b border-light-border dark:border-dark-border">
        {/* First Line: Home + Icons */}
        <div className="flex items-center justify-between">
          {/* Left: Home Button */}
          <Link
            href="/"
            className="text-xl font-semibold text-text-light dark:text-text-dark hover:text-black dark:hover:text-white no-underline"
          >
            Home
          </Link>

          {/* Right: Theme + Settings Icons */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AppSettings />
          </div>
        </div>

        {/* Second Line: Title + TTS Controls (only on report pages) */}
        {ttsControls && (
          <div className="mt-2 pt-2 border-t border-light-border dark:border-dark-border flex items-center justify-between gap-4">
            <h1 className="text-lg font-semibold text-text-light dark:text-text-dark truncate" title={title}>
              {title}
            </h1>
            <div className="flex-shrink-0">
              {ttsControls}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}