'use client'

import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

export default function LectionaryHeader({ title }) {
  return (
    <header className="sticky top-0 z-50 bg-light-bg dark:bg-dark-bg border-b-2 border-light-border dark:border-dark-border">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Branding */}
          <Link
            href="/lectionary"
            className="text-xl font-semibold text-[#1e2f48] dark:text-[#e8dcc9] hover:text-[#b56d62] dark:hover:text-[#b56d62] transition-colors"
          >
            Urantia Lectionary
          </Link>

          {/* Page Title (if different from main) */}
          {title && title !== 'Urantia Lectionary' && (
            <span className="text-sm text-text-muted-light dark:text-text-muted-dark hidden sm:block">
              • {title}
            </span>
          )}
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  )
}
