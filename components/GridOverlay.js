'use client'

import { useEffect, useState } from 'react'

export default function GridOverlay() {
  // 0: hidden, 1: grid only, 2: grid + rulers
  const [overlayState, setOverlayState] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080, scale: 1 })

  // Grid configuration
  const COLUMNS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
  const ROWS = [1, 2, 3, 4, 5, 6]
  const COL_WIDTH = 160 // 1920px / 12 columns
  const ROW_HEIGHT = 180 // 1080px / 6 rows

  // Calculate container dimensions to maintain 16:9 ratio
  useEffect(() => {
    const updateDimensions = () => {
      const baseWidth = 1920
      const baseHeight = 1080
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      // Calculate scale to fit viewport while maintaining 16:9
      const scaleX = viewportWidth / baseWidth
      const scaleY = viewportHeight / baseHeight
      const scale = Math.min(scaleX, scaleY, 1) // Never scale up beyond 100%

      // Calculate actual dimensions after scaling
      const width = baseWidth * scale
      const height = baseHeight * scale

      setDimensions({ width, height, scale })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  // Toggle with G key
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'g' || e.key === 'G') {
        setOverlayState((prev) => (prev + 1) % 3)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  if (overlayState === 0) {
    // Show only the diamond toggle when hidden
    return (
      <div
        className="fixed bottom-10 left-10 pointer-events-auto"
        style={{ zIndex: 9999, cursor: 'pointer' }}
        onClick={() => setOverlayState(1)}
      >
        {/* Diamond icon */}
        <div
          style={{
            width: '16px',
            height: '16px',
            background: 'rgba(128, 128, 128, 0.2)',
            border: '1px solid rgba(128, 128, 128, 0.3)',
            transform: 'rotate(45deg)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(128, 128, 128, 0.4)'
            e.currentTarget.style.borderColor = 'rgba(128, 128, 128, 0.6)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(128, 128, 128, 0.2)'
            e.currentTarget.style.borderColor = 'rgba(128, 128, 128, 0.3)'
          }}
        />
      </div>
    )
  }

  const showRulers = overlayState === 2

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999 }}>
      {/* Two-layer 16:9 wrapper for proper scaling */}
      <div
        className="relative"
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            width: '1920px',
            height: '1080px',
            transform: `scale(${dimensions.scale})`,
            transformOrigin: 'top left'
          }}
        >
          {/* Pixel Rulers */}
          {showRulers && (
            <>
              {/* Top Horizontal Ruler */}
              <div
                className="absolute top-0 left-0 right-0 flex items-end"
                style={{
                  height: '20px',
                  borderBottom: '1px solid rgba(128, 128, 128, 0.3)'
                }}
              >
                {Array.from({ length: 20 }, (_, i) => i * 100).map((x) => (
                  <div
                    key={`h-${x}`}
                    className="absolute flex flex-col items-center"
                    style={{ left: `${x}px`, bottom: 0 }}
                  >
                    {/* Tick mark */}
                    <div
                      style={{
                        width: '1px',
                        height: x % 200 === 0 ? '8px' : '5px',
                        background: 'rgba(128, 128, 128, 0.4)'
                      }}
                    />
                    {/* Label every 200px */}
                    {x % 200 === 0 && (
                      <div
                        style={{
                          fontSize: '16px',
                          color: 'rgba(128, 128, 128, 0.5)',
                          marginTop: '1px',
                          fontFamily: 'monospace'
                        }}
                      >
                        {x}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Left Vertical Ruler */}
              <div
                className="absolute top-0 left-0 bottom-0 flex flex-col justify-end"
                style={{
                  width: '20px',
                  borderRight: '1px solid rgba(128, 128, 128, 0.3)'
                }}
              >
                {Array.from({ length: 11 }, (_, i) => i * 100).map((y) => (
                  <div
                    key={`v-${y}`}
                    className="absolute flex items-center"
                    style={{ top: `${y}px`, left: 0 }}
                  >
                    {/* Tick mark */}
                    <div
                      style={{
                        height: '1px',
                        width: y % 200 === 0 ? '8px' : '5px',
                        background: 'rgba(128, 128, 128, 0.4)'
                      }}
                    />
                    {/* Label every 200px */}
                    {y % 200 === 0 && (
                      <div
                        style={{
                          fontSize: '16px',
                          color: 'rgba(128, 128, 128, 0.5)',
                          marginLeft: '1px',
                          transform: 'rotate(-90deg)',
                          transformOrigin: 'left center',
                          whiteSpace: 'nowrap',
                          fontFamily: 'monospace'
                        }}
                      >
                        {y}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* 12×6 Grid with Cell Labels */}
          <div className="absolute inset-0">
            {/* Vertical grid lines */}
            {COLUMNS.map((col, i) => (
              <div
                key={`col-${col}`}
                className="absolute top-0 bottom-0"
                style={{
                  left: `${i * COL_WIDTH}px`,
                  width: '1px',
                  background: 'rgba(0, 200, 255, 0.2)'
                }}
              />
            ))}
            {/* Final right edge line */}
            <div
              className="absolute top-0 bottom-0"
              style={{
                left: '1920px',
                width: '1px',
                background: 'rgba(0, 200, 255, 0.2)'
              }}
            />

            {/* Horizontal grid lines */}
            {ROWS.map((row, i) => (
              <div
                key={`row-${row}`}
                className="absolute left-0 right-0"
                style={{
                  top: `${i * ROW_HEIGHT}px`,
                  height: '1px',
                  background: 'rgba(0, 200, 255, 0.2)'
                }}
              />
            ))}
            {/* Final bottom edge line */}
            <div
              className="absolute left-0 right-0"
              style={{
                top: '1080px',
                height: '1px',
                background: 'rgba(0, 200, 255, 0.2)'
              }}
            />

            {/* Cell Labels (Chess Notation) */}
            {COLUMNS.map((col, colIndex) =>
              ROWS.map((row, rowIndex) => (
                <div
                  key={`label-${col}${row}`}
                  className="absolute"
                  style={{
                    left: `${colIndex * COL_WIDTH + COL_WIDTH / 2}px`,
                    top: `${rowIndex * ROW_HEIGHT + ROW_HEIGHT / 2}px`,
                    transform: 'translate(-50%, -50%)',
                    fontSize: '36px',
                    color: 'rgba(128, 128, 128, 0.5)',
                    fontWeight: '600',
                    fontFamily: 'monospace',
                    textShadow: '0 0 4px rgba(0, 0, 0, 0.8)'
                  }}
                >
                  {col}{row}
                </div>
              ))
            )}
          </div>

          {/* Diamond Toggle Icon */}
          <div
            className="absolute pointer-events-auto"
            style={{
              bottom: '40px',
              left: '40px',
              zIndex: 10000,
              cursor: 'pointer'
            }}
            onClick={() => setOverlayState((prev) => (prev + 1) % 3)}
          >
            {/* Diamond icon */}
            <div
              style={{
                width: '16px',
                height: '16px',
                background: 'rgba(128, 128, 128, 0.4)',
                border: '1px solid rgba(128, 128, 128, 0.6)',
                transform: 'rotate(45deg)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(128, 128, 128, 0.6)'
                e.currentTarget.style.borderColor = 'rgba(128, 128, 128, 0.8)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(128, 128, 128, 0.4)'
                e.currentTarget.style.borderColor = 'rgba(128, 128, 128, 0.6)'
              }}
            />
          </div>

          {/* Status Indicator */}
          <div
            className="absolute"
            style={{
              bottom: '45px',
              left: '70px',
              fontSize: '10px',
              color: 'rgba(128, 128, 128, 0.6)',
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '4px 8px',
              borderRadius: '4px',
              fontFamily: 'monospace'
            }}
          >
            Grid: {overlayState === 1 ? 'ON' : 'ON + Rulers'} • Press G to toggle
          </div>
        </div>
      </div>
    </div>
  )
}
