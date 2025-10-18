'use client'

import { useState, useEffect, useRef } from 'react'

export default function SlideDeck({ slides, autoPlay = false, timingData = null }) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const audioRef = useRef(null)
  const timeoutRef = useRef(null)

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (autoPlay && isPlaying) return // Don't allow manual nav during auto-play

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault()
          nextSlide()
          break
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault()
          previousSlide()
          break
        case 'Home':
          e.preventDefault()
          setCurrentSlide(0)
          break
        case 'End':
          e.preventDefault()
          setCurrentSlide(slides.length - 1)
          break
        case 'Escape':
          if (isPlaying) {
            e.preventDefault()
            setIsPlaying(false)
          }
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentSlide, slides.length, isPlaying, autoPlay])

  // Auto-play logic
  useEffect(() => {
    if (!isPlaying || !timingData) return

    const currentTiming = timingData.slides[currentSlide]
    if (!currentTiming) return

    // Play audio if available
    if (currentTiming.hasAudio && currentTiming.audioPath) {
      const audio = new Audio(currentTiming.audioPath)
      audioRef.current = audio

      audio.play().catch(err => {
        console.error('Audio playback failed:', err)
      })

      audio.onended = () => {
        // Move to next slide when audio ends
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1)
        } else {
          setIsPlaying(false) // End of presentation
        }
      }
    } else {
      // No audio, use duration timeout
      const duration = currentTiming.duration * 1000 || 3000
      timeoutRef.current = setTimeout(() => {
        if (currentSlide < slides.length - 1) {
          setCurrentSlide(prev => prev + 1)
        } else {
          setIsPlaying(false)
        }
      }, duration)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentSlide, isPlaying, timingData, slides.length])

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1)
    }
  }

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1)
    }
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const CurrentSlideComponent = slides[currentSlide]

  return (
    <div className="fixed inset-0 bg-light-bg dark:bg-dark-bg flex flex-col">
      {/* Slide Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-6xl">
          <CurrentSlideComponent />
        </div>
      </div>

      {/* Controls */}
      <div className="border-t border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={previousSlide}
              disabled={currentSlide === 0}
              className="px-4 py-2 rounded bg-light-bg dark:bg-dark-bg hover:bg-light-border dark:hover:bg-dark-border disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-text-light dark:text-text-dark"
              aria-label="Previous slide"
            >
              ← Previous
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className="px-4 py-2 rounded bg-light-bg dark:bg-dark-bg hover:bg-light-border dark:hover:bg-dark-border disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-text-light dark:text-text-dark"
              aria-label="Next slide"
            >
              Next →
            </button>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Slide {currentSlide + 1} / {slides.length}
            </span>

            {/* Auto-play control */}
            {autoPlay && timingData && (
              <button
                onClick={togglePlayPause}
                className="px-4 py-2 rounded bg-light-bg dark:bg-dark-bg hover:bg-light-border dark:hover:bg-dark-border transition-colors text-text-light dark:text-text-dark"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? '⏸ Pause' : '▶ Play'}
              </button>
            )}
          </div>

          {/* Keyboard hints */}
          <div className="text-xs text-text-muted-light dark:text-text-muted-dark">
            Arrow keys or Space to navigate {autoPlay && '• Esc to pause'}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-light-border dark:bg-dark-border">
        <div
          className="h-full bg-text-light dark:bg-text-dark transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
