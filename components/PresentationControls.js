'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function PresentationControls({
  bottom = '80px',
  right = '80px',
  controls = [
    '↑↓ Arrow keys - Navigate',
    '0-9 Number keys - Jump',
    'SPACE - Pause/Resume',
    'Click scale numbers'
  ]
}) {
  const [showControls, setShowControls] = useState(false)

  return (
    <div className="absolute flex flex-col items-end" style={{ bottom, right }}>
      {/* Controls content - toggleable */}
      {showControls && (
        <div className="mb-4 text-right bg-neutral-900/40 border border-neutral-700/50 rounded-lg px-6 py-5">
          <div className="text-gray-300 text-base leading-relaxed space-y-2">
            {controls.map((control, index) => (
              <div key={index}>{control}</div>
            ))}
          </div>
        </div>
      )}

      {/* Controls toggle with info icon */}
      <div
        onClick={() => setShowControls(!showControls)}
        className="text-gray-500 text-2xl tracking-wide mb-2 cursor-pointer hover:text-gray-300 transition-colors flex items-center gap-2"
      >
        <span>CONTROLS</span>
        <div
          className="flex items-center justify-center rounded-full border-2 border-gray-500"
          style={{ width: '24px', height: '24px', fontSize: '16px' }}
        >
          i
        </div>
      </div>

      {/* Bottom link bar */}
      <div className="flex items-center gap-8 text-3xl">
        <Link
          href="/"
          className="text-blue-400 hover:text-blue-300 transition-colors"
        >
          revelationary.net
        </Link>
      </div>
    </div>
  )
}
