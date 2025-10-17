'use client'

import { useState, useEffect, useRef } from 'react'

export default function AppSettings() {
  const [isOpen, setIsOpen] = useState(false)
  const [shareSupported, setShareSupported] = useState(false)
  const modalRef = useRef(null)

  useEffect(() => {
    // Check if Web Share API is supported
    setShareSupported(typeof navigator !== 'undefined' && !!navigator.share)
  }, [])

  useEffect(() => {
    // Close modal when clicking outside
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    // Close modal on escape key
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleShare = async () => {
    if (!navigator.share) {
      // Fallback for browsers without Web Share API
      // Copy current URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      } catch (err) {
        console.error('Failed to copy:', err)
      }
      return
    }

    try {
      await navigator.share({
        title: document.title,
        text: 'Check out this research report',
        url: window.location.href,
      })
    } catch (err) {
      // User cancelled or share failed
      if (err.name !== 'AbortError') {
        console.error('Share failed:', err)
      }
    }
  }

  return (
    <div className="relative">
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="App Settings"
        className="p-2 text-text-light dark:text-text-dark hover:text-black dark:hover:text-white transition-colors"
        aria-label="App Settings"
        aria-expanded={isOpen}
      >
        ⚙
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div
            ref={modalRef}
            className="w-full max-w-sm bg-light-card dark:bg-dark-card border-2 border-light-border dark:border-dark-border rounded-lg shadow-lg"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
              <h2 className="text-lg font-semibold text-text-light dark:text-text-dark">
                App Settings
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl leading-none text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
                aria-label="Close settings"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-2">
              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-light-bg dark:bg-dark-bg hover:bg-light-border dark:hover:bg-dark-border transition-colors text-left"
              >
                <span className="text-2xl">🔄</span>
                <div>
                  <div className="font-medium text-text-light dark:text-text-dark">
                    Refresh Page
                  </div>
                  <div className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    Reload the current page
                  </div>
                </div>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="w-full flex items-center gap-3 p-3 rounded-lg bg-light-bg dark:bg-dark-bg hover:bg-light-border dark:hover:bg-dark-border transition-colors text-left"
              >
                <span className="text-2xl">📤</span>
                <div>
                  <div className="font-medium text-text-light dark:text-text-dark">
                    Share
                  </div>
                  <div className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    {shareSupported ? 'Share this page' : 'Copy link to clipboard'}
                  </div>
                </div>
              </button>
            </div>

            {/* Modal Footer (optional - for future use) */}
            <div className="p-4 border-t border-light-border dark:border-dark-border">
              <p className="text-xs text-center text-text-muted-light dark:text-text-muted-dark">
                Revelationary Research v1.0
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
