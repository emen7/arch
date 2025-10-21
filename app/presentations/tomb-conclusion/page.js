'use client'

import PresentationFooter from '../../../components/PresentationFooter'

export default function TombConclusionPage() {
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
          <div className="text-center max-w-4xl px-8">
            <h1 className="text-5xl font-bold mb-8 text-gray-200">
              Conclusion
            </h1>
            <p className="text-2xl text-gray-400 leading-relaxed">
              Placeholder for conclusion slides
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <PresentationFooter currentPage="conclusion" />
      </div>
    </div>
  )
}
