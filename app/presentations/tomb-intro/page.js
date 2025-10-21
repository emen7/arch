'use client'

import PresentationFooter from '../../../components/PresentationFooter'

export default function TombIntroPage() {
  return (
    <div className="flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #020617, #0f172a, #020617)',
      color: '#e2e8f0',
      height: '100vh',
      width: '100vw',
      overflow: 'hidden'
    }}>
      {/* 16:9 Container - Fixed aspect ratio for Zoom/PowerPoint compatibility */}
      <div className="relative" style={{
        width: '95vw',
        maxWidth: '1920px',
        aspectRatio: '16/9'
      }}>

        {/* Main Content - Centered */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-6 text-gray-200">
              Accelerated Time of the Tomb
            </h1>
            <p className="text-3xl text-gray-400 mb-12">
              Master Physical Controllers and the Tomb Operations
            </p>
            <p className="text-2xl text-gray-500">
              Urantia Science Symposium IV 2025
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <PresentationFooter currentPage="intro" />
      </div>
    </div>
  )
}
