'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

export default function WaveEnergyPage() {
  const canvasRef = useRef(null)
  const textAreaRef = useRef(null)
  const titleRef = useRef(null)
  const sphereContainerRef = useRef(null)
  const [step, setStep] = useState(4)
  const [textPage, setTextPage] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)
  const rotRef = useRef(0)
  const animationRef = useRef(null)

  const texts = {
    p0: [
      'This is the powerful-directional, mass-movemented, mighty-tensioned, and forcible-reacting energy—gigantic energy systems set in motion by the activities of the primary force organizers. (42:2.11)|Ultimatons are capable of accelerating revolutionary velocity to the point of partial antigravity behavior, but they cannot, independent of force organizers or power directors, attain the critical escape velocity of deindividuation, return to the puissant-energy stage. In nature, ultimatons escape the status of physical existence only when participating in the terminal disruption of a cooled-off and dying sun. (42:6.3)',
      'This primary or puissant energy is not at first definitely responsive to the Paradise-gravity pull. (42:2.11)|Puissant and gravity energies, when regarded collectively, are spoken of on Uversa as ULTIMATA. (42:2.13)'
    ],
    p1: [
      'Infraultimatonic rays—the borderland revolutions of ultimatons as they begin to assume definite form. This is the first stage of emergent energy in which wavelike phenomena can be detected and measured. (42:5.3)'
    ],
    p2: [
      'The assembly of energy into the minute spheres of the ultimatons occasions vibrations in the content of space which are discernible and measurable. And long before physicists ever discover the ultimaton, they will undoubtedly detect the phenomena of these rays as they shower in upon Urantia. (42:5.4)',
      'These short and powerful rays represent the initial activity of the ultimatons as they are slowed down to that point where they veer towards the electronic organization of matter. As the ultimatons aggregate into electrons, condensation occurs with a consequent storage of energy. (42:5.4)'
    ],
    p3: [
      'These are the shortest of all purely electronic vibrations and represent the preatomic stage of this form of matter. These rays require extraordinarily high or low temperatures for their production. (42:5.5)',
      'There are two sorts of these space rays: one attendant upon the birth of atoms and the other indicative of atomic disruption. They emanate in the largest quantities from the densest plane of the superuniverse, the Milky Way, which is also the densest plane of the outer universes. (42:5.5)'
    ],
    p4: [
      'This stage of energy is the basis of all materialization in the seven superuniverses. When electrons pass from higher to lower energy levels of orbital revolution, quanta are always given off. (42:5.6)',
      'Orbital shifting of electrons results in the ejection or the absorption of very definite and uniform measurable particles of light-energy, while the individual electron always gives up a particle of light-energy when subjected to collision. Wavelike energy manifestations also attend upon the performances of the positive bodies and the other members of the electronic stage. (42:5.6)',
      'Mutual attraction holds one hundred ultimatons together in the constitution of the electron; and there are never more nor less than one hundred ultimatons in a typical electron. (42:6.5)',
      'Ultimatons do not describe orbits or whirl about in circuits within the electrons, but they do spread or cluster in accordance with their axial revolutionary velocities, thus determining the differential electronic dimensions. This same ultimatonic velocity of axial revolution also determines the negative or positive reactions of the several types of electronic units. (42:6.6)',
      'The power centers and their associates are much concerned in the work of transmuting the ultimaton into the circuits and revolutions of the electron. These unique beings control and compound power by their skillful manipulation of the basic units of materialized energy, the ultimatons. (42:4.3)',
      'Heat is the measurement of electronic activity, while cold merely signifies absence of heat—comparative energy rest—the status of the universal force-charge of space provided neither emergent energy nor organized matter were present and responding to gravity. (42:4.5)'
    ],
    p5: [
      'Gamma rays—those emanations which characterize the spontaneous dissociation of atomic matter. The best illustration of this form of electronic activity is in the phenomena associated with radium disintegration. (42:5.7)'
    ],
    p6: [
      'The next step in the slowing down of the electron yields the various forms of solar X rays together with artificially generated X rays. The electronic charge creates an electric field; movement gives rise to an electric current; the current produces a magnetic field. (42:5.8)',
      'When an electron is suddenly stopped, the resultant electromagnetic commotion produces the X ray; the X ray is that disturbance. The solar X rays are identical with those which are mechanically generated for exploring the interior of the human body except that they are a trifle longer. (42:5.8)'
    ],
    p7: [
      'The ultraviolet or chemical rays of sunlight and the various mechanical productions. (42:5.9)',
      'The earth\'s atmosphere is all but opaque to much of the solar radiation at the extreme ultraviolet end of the spectrum. Most of these short wave lengths are absorbed by a layer of ozone which exists throughout a level about ten miles above the surface of the earth, and which extends spaceward for another ten miles. This relatively small and apparently insignificant amount of ozone protects Urantia inhabitants from the excess of these dangerous and destructive ultraviolet radiations present in sunlight. (58:2.2)'
    ],
    p8: [
      'The white light—the whole visible light of the suns. (42:5.10)',
      'Of all these ten phases of wavelike energy activity, the human eye can react to just one octave, the whole light of ordinary sunlight. (42:5.13)',
      'Light and all other forms of recognizable energy manifestations consist of a succession of definite energy particles which proceed in direct lines except as modified by gravity and other intervening forces. (42:5.14)',
      'Light is real. As you value energy and power on your world, sunlight would be economical at a million dollars a pound. (41:5.2)'
    ],
    p9: [
      'Infrared rays—the slowing down of electronic activity still nearer the stage of appreciable heat. (42:5.11)',
      'Temperature—heat and cold—is secondary only to gravity in the realms of energy and matter evolution. Ultimatons are humbly obedient to temperature extremes. Low temperatures favor certain forms of electronic construction and atomic assembly, while high temperatures facilitate all sorts of atomic breakup and material disintegration. (42:4.7)'
    ],
    p10: [
      'Hertzian waves—those energies utilized on Urantia for broadcasting. (42:5.12)',
      'On Urantia it is this same gas shield which prevents the escape of the terrestrial broadcast waves, reflecting them earthward when they strike this gas belt in their direct outward flight. In this way broadcasts are held near the surface as they journey through the air around your world. (46:1.6)'
    ]
  }

  const humanUse = {
    p4: 'The human body and the materials of the world.',
    p5: 'Used in cancer treatment, medical sterilization, and food preservation through controlled high-energy radiation.',
    p6: 'Creates images of internal body structures (bones, teeth, organs) and inspects hidden defects in materials.',
    p7: 'Sterilizes water and surfaces, produces vitamin D in skin, and can damage tissue through overexposure.',
    p8: 'The only octave humans can see directly - enabling all visual perception, from reading to recognizing faces.',
    p9: 'Perceived as heat - used in therapeutic heat lamps, night vision equipment, and remote controls.',
    p10: 'Powers all wireless communication - radio, television, cell phones, WiFi, and radar systems.'
  }

  const data = [
    {n:0, name:"Puissant Energy", col:"#ffffff", sphereCol:"transparent", op:0, spd:0},
    {n:1, name:"Infraultimatonic Rays", col:"#3b82f6", sphereCol:"#3b82f6", op:0.3, spd:0.9},
    {n:2, name:"Ultimatonic Rays", col:"#3b82f6", sphereCol:"#3b82f6", op:0.6, spd:0.7},
    {n:3, name:"Short Space Rays", col:"#3b82f6", sphereCol:"#3b82f6", op:1, spd:0.5},
    {n:4, name:"The Electronic Stage", col:"#22c55e", sphereCol:"#22c55e", op:1, spd:0.35},
    {n:5, name:"Gamma Rays", col:"#eab308", sphereCol:"#eab308", op:1, spd:0.25},
    {n:6, name:"X-rays", col:"#f97316", sphereCol:"#f97316", op:1, spd:0.15},
    {n:7, name:"Ultraviolet", col:"#8b5cf6", sphereCol:"#8b5cf6", op:1, spd:0.08},
    {n:8, name:"White Light", col:"#ffffff", sphereCol:"#ffffff", op:1, spd:0.04},
    {n:9, name:"Infrared Rays", col:"#ef4444", sphereCol:"#ef4444", op:0.7, spd:0.02},
    {n:10, name:"Hertzian Waves", col:"#d946ef", sphereCol:"#d946ef", op:0.6, spd:0.01}
  ]

  const currentData = data[step]
  const txtKey = `p${currentData.n}`
  const pages = texts[txtKey]
  const currentHumanUse = humanUse[txtKey]

  // Detect small screens and mobile devices
  useEffect(() => {
    const checkScreenSize = () => {
      // Screen width less than 1024px is considered too small
      setIsSmallScreen(window.innerWidth < 1024)

      // Detect if on a mobile device (phone/tablet) vs desktop
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      setIsMobileDevice(isMobile)
    }

    // Initial check
    checkScreenSize()

    // Listen for resize events
    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  // Center text box vertically between title and sphere canvas
  useEffect(() => {
    const positionTextBox = () => {
      if (!textAreaRef.current || !titleRef.current || !canvasRef.current) return

      const titleRect = titleRef.current.getBoundingClientRect()
      const canvasRect = canvasRef.current.getBoundingClientRect()
      const textAreaRect = textAreaRef.current.getBoundingClientRect()

      // Calculate available vertical space
      const availableTop = titleRect.bottom + 32 // Title bottom + margin
      const availableBottom = canvasRect.top - 20 // Canvas top - margin (not sphere container)
      const availableHeight = availableBottom - availableTop
      const textBoxHeight = textAreaRect.height

      // Center the text box in available space, then raise by 10%
      const centerPosition = availableTop + (availableHeight - textBoxHeight) / 2
      const raiseAmount = availableHeight * 0.10 // Raise by 10% of available space
      const finalPosition = centerPosition - raiseAmount

      // Apply the position (ensure it doesn't go above minimum)
      textAreaRef.current.style.top = `${Math.max(availableTop, finalPosition)}px`
    }

    // Position on mount and when content changes
    positionTextBox()

    // Re-position on window resize
    window.addEventListener('resize', positionTextBox)

    // Multiple delays to ensure DOM is fully rendered (especially after orientation change)
    const timeoutId1 = setTimeout(positionTextBox, 100)
    const timeoutId2 = setTimeout(positionTextBox, 300)

    return () => {
      window.removeEventListener('resize', positionTextBox)
      clearTimeout(timeoutId1)
      clearTimeout(timeoutId2)
    }
  }, [step, textPage]) // Re-position when content changes

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const centerX = 80
    const centerY = 80
    const radius = 55

    const draw = () => {
      ctx.clearRect(0, 0, 160, 160)

      // Grid - more visible but still dimmed compared to text
      ctx.strokeStyle = '#64748b'
      ctx.lineWidth = 0.5
      for (let i = 0; i < 160; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, 160)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(160, i)
        ctx.stroke()
      }

      const d = data[step]

      if (d.sphereCol === 'transparent') {
        ctx.strokeStyle = '#64748b'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.stroke()
      } else {
        const g = ctx.createRadialGradient(centerX - 15, centerY - 15, 10, centerX, centerY, radius)
        const alpha = Math.floor(d.op * 255).toString(16).padStart(2, '0')
        g.addColorStop(0, d.sphereCol + alpha)
        g.addColorStop(1, d.sphereCol + '40')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.fill()

        const crossSize = radius / 3
        const angle = rotRef.current
        const cosAngle = Math.cos(angle)
        const sinAngle = Math.sin(angle)

        if (cosAngle >= 0) {
          const xOffset = sinAngle * radius * 0.85
          const scale = cosAngle

          if (d.spd > 0.3) {
            const blurWidth = Math.min(d.spd * 50, crossSize * 1.2)
            const grad = ctx.createLinearGradient(centerX + xOffset - blurWidth, centerY, centerX + xOffset + blurWidth, centerY)
            grad.addColorStop(0, 'rgba(0,0,0,0)')
            grad.addColorStop(0.3, 'rgba(0,0,0,0.2)')
            grad.addColorStop(0.5, 'rgba(0,0,0,0.6)')
            grad.addColorStop(0.7, 'rgba(0,0,0,0.2)')
            grad.addColorStop(1, 'rgba(0,0,0,0)')
            ctx.fillStyle = grad
            ctx.fillRect(centerX + xOffset - blurWidth, centerY - crossSize * 0.8, blurWidth * 2, crossSize * 1.6)
          }

          ctx.save()
          ctx.translate(centerX + xOffset, centerY)
          ctx.scale(scale, 1)

          ctx.strokeStyle = `rgba(0,0,0,${d.op * 0.9})`
          ctx.lineWidth = 2.5

          ctx.beginPath()
          ctx.moveTo(-crossSize, 0)
          ctx.lineTo(crossSize, 0)
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(0, -crossSize)
          ctx.lineTo(0, crossSize)
          ctx.stroke()

          ctx.restore()
        }

        if (!isPaused) rotRef.current += d.spd
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [step, isPaused])

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && step > 0) {
        setStepAndReset(step - 1)
      } else if (e.key === 'ArrowDown' && step < 10) {
        setStepAndReset(step + 1)
      } else if (e.key >= '0' && e.key <= '9') {
        setStepAndReset(parseInt(e.key))
      } else if (e.key === ' ') {
        e.preventDefault()
        setIsPaused(p => !p)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [step])

  const setStepAndReset = (n) => {
    setStep(n)
    setTextPage(0)
  }

  const handlePrevPage = () => {
    if (textPage > 0) setTextPage(textPage - 1)
  }

  const handleNextPage = () => {
    if (textPage < pages.length - 1) setTextPage(textPage + 1)
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4" style={{
      background: 'linear-gradient(135deg, #020617, #0f172a, #020617)',
      color: '#e2e8f0'
    }}>
      {/* Small Screen Overlay */}
      {isSmallScreen && (
        <div className="fixed inset-0 bg-slate-900/95 flex flex-col items-center justify-center z-50 p-8 text-center">
          <div className="text-6xl mb-6">{isMobileDevice ? '💻' : '↔️'}</div>
          <div className="text-2xl font-semibold mb-6 text-gray-200">
            {isMobileDevice ? 'Desktop or Tablet Required' : 'Please Widen Your Window'}
          </div>
          <div className="text-lg text-gray-300 max-w-md mb-4">
            {isMobileDevice ? (
              'This interactive visualization is designed for larger screens.'
            ) : (
              'This visualization requires a minimum width of 1024 pixels.'
            )}
          </div>
          {isMobileDevice ? (
            <>
              <div className="text-base text-gray-400 max-w-md mb-8">
                Please view on:
              </div>
              <div className="text-lg text-gray-300 space-y-2 mb-8">
                <div>• Desktop or laptop computer</div>
                <div>• iPad or tablet (landscape mode)</div>
              </div>
            </>
          ) : (
            <div className="text-base text-gray-400 max-w-md mb-8">
              Expand your browser window to view this content.
            </div>
          )}
          <Link
            href="/"
            className="px-6 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors"
          >
            ← Return to Home
          </Link>
        </div>
      )}

      {/* Header Navigation */}
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between px-6 py-4 z-10">
        {/* Project Title */}
        <div className="text-slate-400 text-sm tracking-wider font-light">
          ACCELERATED TIME OF THE TOMB
        </div>

        {/* Horizontal Links */}
        <div className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-slate-500 hover:text-slate-300 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/wave-energy"
            className="text-slate-400 font-medium"
          >
            Wave-Energy
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-slate-600 text-xs tracking-wide">PRESENTATIONS</span>
        </div>
      </div>

      {/* 16:9 Card - scales as a unit, maintains ratio like an image */}
      <div className="relative w-full max-w-full max-h-full flex gap-12 p-8 pt-16" style={{
        aspectRatio: '16/9'
      }}>
        {/* Left Side */}
        <div className="w-[420px] flex flex-col">
          <div ref={titleRef} className="text-gray-300 text-xl font-semibold tracking-wider mb-8 flex-shrink-0">
            WAVE-ENERGY MANIFESTATIONS
          </div>

          <div className="relative flex-1">
            {/* Logarithmic Scale Label - Rotated */}
            <div
              className="absolute text-slate-500 text-[13px] tracking-wide whitespace-nowrap"
              style={{
                left: '2px',
                top: '50%',
                transform: 'rotate(-90deg) translateX(-50%)',
                transformOrigin: 'left center'
              }}
            >
              Logarithmic Scale
            </div>

            {/* Scale */}
            <div className="relative h-full">
              <div className="absolute left-12 top-0 bottom-0 w-0.5 bg-slate-600"></div>
              <div>
                {data.map((d, i) => (
                  <div
                    key={d.n}
                    className="absolute left-0 flex items-center cursor-pointer -translate-y-1/2 hover:opacity-80 transition-opacity"
                    style={{ top: `${(d.n / 10) * 100}%` }}
                    onClick={() => setStepAndReset(d.n)}
                  >
                    <div
                      className="w-8 text-right text-lg font-mono transition-colors font-semibold"
                      style={{ color: step === d.n ? d.col : '#64748b' }}
                    >
                      {d.n}
                    </div>
                    <div
                      className="h-0.5 mx-2 transition-all"
                      style={{
                        width: step === d.n ? '32px' : '24px',
                        backgroundColor: step === d.n ? d.col : '#64748b'
                      }}
                    ></div>
                    <div
                      className="text-sm whitespace-nowrap transition-colors"
                      style={{
                        color: step === d.n ? d.col : '#94a3b8',
                        fontWeight: step === d.n ? 600 : 400
                      }}
                    >
                      {d.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Relative Spin Rates Label - Rotated */}
            <div
              className="absolute text-slate-500 text-[11px] tracking-wide whitespace-nowrap"
              style={{
                left: '220px',
                top: '80%',
                transform: 'rotate(-90deg) translateX(-50%)',
                transformOrigin: 'left center'
              }}
            >
              Relative Spin Rates
            </div>

            {/* Sphere */}
            <div ref={sphereContainerRef} className="absolute left-[250px] top-[80%] -translate-y-1/2 flex flex-col items-center gap-2">
              <canvas ref={canvasRef} width="160" height="160" className="rounded-lg"></canvas>
              <div className="text-slate-300 text-sm tracking-wider text-center leading-tight font-medium">
                {step === 0 ? (
                  <>PRE OR POST<br />ULTIMATON</>
                ) : (
                  'ULTIMATON'
                )}
              </div>
            </div>

            {/* Pause Button */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="absolute left-[410px] top-[80%] translate-y-[90px] bg-slate-800/80 border border-slate-600/70 rounded-lg text-slate-300 px-4 py-2 text-xs cursor-pointer hover:bg-slate-700 hover:border-slate-500 transition-all shadow-lg"
            >
              {isPaused ? '▶ Resume' : '⏸ Pause'}
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col relative">
          <div ref={textAreaRef} className="absolute -left-[15%] right-[15%] flex flex-col items-center">
            <div className="bg-slate-800/60 border border-slate-600/70 rounded-xl p-8 max-w-[600px] w-[90%] shadow-2xl">
              {/* Navigation Links */}
              {pages.length > 1 && (
                <div className="flex justify-between mb-4 text-xs tracking-wider">
                  {textPage > 0 && (
                    <span
                      onClick={handlePrevPage}
                      className="text-slate-500 cursor-pointer hover:text-gray-400 transition-colors uppercase"
                    >
                      Prev
                    </span>
                  )}
                  {textPage < pages.length - 1 && (
                    <span
                      onClick={handleNextPage}
                      className="text-slate-500 cursor-pointer hover:text-gray-400 transition-colors uppercase ml-auto"
                    >
                      Next
                    </span>
                  )}
                </div>
              )}

              {/* Title */}
              <div className="text-gray-300 text-2xl font-semibold mb-6 tracking-wide">
                {currentData.name}
              </div>

              {/* Text */}
              <div className="text-slate-200 text-base leading-relaxed">
                <p>{pages[textPage]}</p>
              </div>

              {/* Dot Indicators */}
              {pages.length > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {pages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setTextPage(index)}
                      className="transition-all"
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: index === textPage ? '#94a3b8' : '#475569',
                        opacity: index === textPage ? 1 : 0.5,
                        cursor: 'pointer',
                        border: 'none',
                        padding: 0
                      }}
                      aria-label={`Go to page ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Human Application */}
            {currentHumanUse && textPage === 0 && (
              <div className="mt-4 text-slate-400 text-sm leading-relaxed max-w-[536px] bg-slate-900/40 border border-slate-700/50 rounded-lg px-4 py-3">
                <span className="font-semibold text-emerald-400">Human Application: </span>
                <span className="italic text-slate-300">{currentHumanUse}</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="absolute bottom-0 right-0 text-right bg-slate-900/30 border border-slate-700/40 rounded-lg px-4 py-3">
            <div className="text-slate-500 text-[0.625rem] tracking-wider mb-2 uppercase font-semibold">
              CONTROLS
            </div>
            <div className="text-slate-400 text-xs leading-relaxed space-y-1">
              <div>↑↓ Arrow keys - Navigate</div>
              <div>0-9 Number keys - Jump</div>
              <div>SPACE - Pause/Resume</div>
              <div>Click scale numbers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
