import Link from 'next/link'

export default function PresentationFooter({ currentPage = 'timeline' }) {
  const linkStyle = "text-gray-400 hover:text-gray-200 transition-colors"
  const activeLinkStyle = "text-gray-200 font-semibold"

  return (
    <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-8">
      {/* Left side - placeholder for balance */}
      <div style={{ width: '200px' }}></div>

      {/* Center - Main navigation */}
      <div className="flex items-center gap-6 text-sm">
        <Link
          href="/presentations/tomb-intro"
          className={currentPage === 'intro' ? activeLinkStyle : linkStyle}
        >
          Intro
        </Link>
        <span className="text-gray-600">–</span>
        <Link
          href="/presentations/tomb-timeline"
          className={currentPage === 'timeline' ? activeLinkStyle : linkStyle}
        >
          Timeline
        </Link>
        <span className="text-gray-600">–</span>
        <Link
          href="/presentations/tomb-conclusion"
          className={currentPage === 'conclusion' ? activeLinkStyle : linkStyle}
        >
          Conclusion
        </Link>
      </div>

      {/* Right side - Home link */}
      <div style={{ width: '200px' }} className="text-right">
        <a
          href="https://revelationary.net"
          className="text-sm text-gray-400 hover:text-gray-200 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          revelationary.net
        </a>
      </div>
    </div>
  )
}
