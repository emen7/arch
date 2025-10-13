'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-light-bg dark:bg-dark-bg border-b border-light-border dark:border-dark-border">
      <nav className="container mx-auto px-4 py-4 max-w-[65ch]">
        <div className="flex items-center justify-between">
          {/* Home Button */}
          <Link
            href="/"
            className="text-xl font-semibold text-text-light dark:text-text-dark hover:text-black dark:hover:text-white no-underline"
          >
            Home
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}