'use client'

import { useState } from 'react'

export default function TombTimeline() {
  const [selectedSlide, setSelectedSlide] = useState(null)

  // Presentation structure: phases, days, and slides
  const presentationData = {
    title: 'ACCELERATED TIME OF THE TOMB',

    phases: [
      { id: 'phase1', name: 'The Thirty Six Hours', color: '#22c55e' },  // Green
      { id: 'phase2', name: 'Tomb Operations', color: '#f97316' },       // Orange
      { id: 'phase3', name: 'Beyond the Tomb', color: '#22c55e' }        // Green
    ],

    slides: [
      // PHASE 1: THE 36 HOURS
      // Friday
      { id: 'day-friday', type: 'day-header', label: 'Friday', phase: 'phase1' },
      {
        id: 'death-on-cross',
        type: 'slide',
        time: '~3:00\u00A0PM',
        label: 'Death on the Cross',
        phase: 'phase1',
        citation: '187:5.5',
        content: {
          quote: '"It was just before three o\'clock when Jesus, with a loud voice, cried out, "It is finished! Father, into your hands I commend my spirit." And when he had thus spoken, he bowed his head and gave up the life struggle."',
          description: 'The final moments on Golgotha as Jesus yields his life.',
          imageCaption: 'The crucifixion scene'
        }
      },
      {
        id: 'joseph-granted-body',
        type: 'slide',
        time: null,
        label: 'Joseph Granted Body',
        phase: 'phase1',
        citation: '187:6.1',
        content: {
          quote: '"Joseph went before Pilate with a large sum of money, in case it became necessary to pay for permission to remove Jesus\' body to a private burial tomb. But Pilate would not take money for this. When he heard the request, he quickly signed the order which authorized Joseph to proceed to Golgotha and take immediate and full possession of the Master\'s body."',
          description: 'Joseph of Arimathea receives authorization from Pilate.',
          imageCaption: 'Joseph receives the order'
        }
      },
      {
        id: 'burial-procession',
        type: 'slide',
        time: '4:30\u00A0PM',
        label: 'Burial Procession',
        phase: 'phase1',
        citation: '187:6.2',
        content: {
          quote: '"At about half past four o\'clock the burial procession of Jesus of Nazareth started from Golgotha for Joseph\'s tomb across the way. The body was wrapped in a linen sheet as the four men carried it, followed by the faithful women watchers from Galilee."',
          description: 'The solemn procession from Golgotha to the tomb.',
          imageCaption: 'The burial procession'
        }
      },
      {
        id: 'body-embalmed',
        type: 'slide',
        time: null,
        label: 'Body Embalmed',
        phase: 'phase1',
        citation: '187:6.3',
        content: {
          quote: '"Joseph and Nicodemus had brought with them large quantities of myrrh and aloes, and they now wrapped the body with bandages saturated with these solutions. When the embalming was completed, they tied a napkin about the face, wrapped the body in a linen sheet, and reverently placed it on a shelf in the tomb."',
          description: 'The hasty preparation of the body before the Sabbath.',
          imageCaption: 'Embalming the body'
        }
      },
      {
        id: 'tomb-sealed',
        type: 'slide',
        time: null,
        label: 'Tomb Sealed',
        phase: 'phase1',
        citation: '187:6.6',
        content: {
          quote: '"These men rolled yet another stone before the tomb and set the seal of Pilate on and around these stones, lest they be disturbed without their knowledge. And these twenty men remained on watch up to the hour of the resurrection."',
          description: 'The Roman and Jewish guards secure the tomb.',
          imageCaption: 'Sealing the tomb'
        }
      },

      // Saturday
      { id: 'day-saturday', type: 'day-header', label: 'Saturday', phase: 'phase1', dayBreak: true },
      {
        id: 'divine-declaration',
        type: 'slide',
        time: '~12:00\u00A0AM',
        label: 'Divine Declaration',
        phase: 'phase1',
        citation: '189:0.2',
        content: {
          quote: '"Not one of you can do aught to assist your Creator-father in the return to life. As a mortal of the realm he has experienced mortal death; as the Sovereign of a universe he still lives. That which you observe is the mortal transit of Jesus of Nazareth from life in the flesh to life in the morontia."',
          description: 'The Personalized Adjuster speaks to assembled celestial hosts.',
          imageCaption: 'Midnight declaration'
        }
      },

      // Sunday
      { id: 'day-sunday', type: 'day-header', label: 'Sunday', phase: 'phase1', dayBreak: true },
      {
        id: 'paradise-beings',
        type: 'slide',
        time: '2:45\u00A0AM',
        label: 'Paradise Beings',
        phase: 'phase1',
        citation: '189:1.1',
        content: {
          quote: '"Just a little before half past two o\'clock this Sunday morning, the earth began to tremble again, and everything became quiet after the arrival from Paradise of the unidentified Paradise beings who had been summoned to this extraordinary event by Gabriel himself."',
          description: 'Seven Paradise personalities arrive and deploy around the tomb.',
          imageCaption: 'Paradise beings arrive'
        }
      },
      {
        id: 'vibrations-begin',
        type: 'slide',
        time: null,
        label: 'Vibrations Begin',
        phase: 'phase1',
        citation: '189:1.1',
        content: {
          quote: '"At two minutes to three o\'clock, intense vibrations of commingled material and morontia activities began to issue from Joseph\'s new tomb."',
          description: 'The prelude to resurrection - material and morontia energies intermingle.',
          imageCaption: 'Energy vibrations'
        }
      },
      {
        id: 'morontia-resurrection',
        type: 'slide',
        time: '3:02\u00A0AM',
        label: 'Morontia Resurrection',
        phase: 'phase1',
        citation: '189:1.1',
        content: {
          quote: '"At two minutes past three o\'clock, the resurrected morontia form and personality of Jesus of Nazareth came forth from the tomb."',
          description: 'The resurrection moment - Jesus emerges in morontia form.',
          imageCaption: 'The resurrection'
        }
      },
      {
        id: 'physical-body-remains',
        type: 'slide',
        time: null,
        label: 'The Physical Body',
        phase: 'phase1',
        citation: '189:1.2',
        content: {
          quote: '"The physical body still lay there in the sepulchre niche, undisturbed and wrapped in the linen sheet, just as it had been laid to rest by Joseph and his associates on Friday afternoon."',
          description: 'The mortal body remains while the morontia form has departed.',
          imageCaption: 'Body in the tomb'
        }
      },

      // PHASE 2: DISSOLUTION
      {
        id: 'archangel-request',
        type: 'slide',
        time: null,
        label: 'Archangel Request',
        phase: 'phase2',
        phaseBreak: true,
        citation: '189:2.1',
        content: {
          quote: '"We may not participate in the morontia resurrection of the bestowal experience of Michael our sovereign, but we would have his mortal remains put in our custody for immediate dissolution."',
          description: 'The chief of archangels requests custody of the physical body.',
          imageCaption: 'Archangel request'
        }
      },
      {
        id: 'stone-rolling',
        type: 'slide',
        time: null,
        label: 'Stone Rolling',
        phase: 'phase2',
        citation: '189:2.4',
        content: {
          quote: '"This huge stone began slowly to roll away from the entrance of the tomb without any visible means to account for such motion."',
          description: 'Master Physical Controllers manipulate matter to open the tomb.',
          imageCaption: 'Stone rolling away'
        }
      },
      {
        id: 'guards-flee',
        type: 'slide',
        time: null,
        label: 'The Guards Flee',
        phase: 'phase2',
        citation: '189:2.4',
        content: {
          quote: '"The Jewish guards fled to their homes, later reporting to their captain at the temple. The Roman soldiers fled to the fortress of Antonia, reporting to the centurion as soon as he came on duty."',
          description: 'Terrified guards abandon their posts.',
          imageCaption: 'Guards fleeing'
        }
      },
      {
        id: 'wave-energy-manifestations-ig',
        type: 'slide',
        time: null,
        label: 'Wave-Energy Manifestations (IG)',
        phase: 'phase2',
        citation: '42:5.14',
        content: {
          infographic: 'wave-energy',
          description: 'Interactive visualization of the 100 octaves of wave-energy manifestations.',
          quote: '"In Orvonton it has never been possible naturally to assemble over one hundred orbital electrons in one atomic system."',
          link: '/reports/wave-energy-manifestations'
        }
      },
      {
        id: 'accelerated-time-ig',
        type: 'slide',
        time: null,
        label: 'Accelerated Time (IG)',
        phase: 'phase2',
        citation: '189:2.1',
        content: {
          infographic: 'accelerated-time',
          description: 'Interactive visualization of the accelerated time process.',
          quote: '"We do not propose to employ our technique of dematerialization; we merely wish to invoke the process of accelerated time."'
        }
      },
      {
        id: 'dissolution-ig',
        type: 'slide',
        time: null,
        label: 'The Dissolution (IG)',
        phase: 'phase2',
        citation: '189:2.8',
        content: {
          infographic: 'dissolution',
          description: 'Visualization of instantaneous elemental disintegration.',
          quote: '"The mortal remains of Jesus underwent the same natural process of elemental disintegration as characterizes all human bodies on earth except that, in point of time, this natural mode of dissolution was greatly accelerated, hastened to that point where it became well-nigh instantaneous."'
        }
      },
      {
        id: 'midwayer-ig',
        type: 'slide',
        time: null,
        label: 'Midwayer (IG)',
        phase: 'phase2',
        citation: '189:4.6',
        content: {
          infographic: 'midwayer',
          description: 'Interactive visualization of midwayer manipulation of burial cloths.',
          quote: '"In the recess of stone where they had laid Jesus, Mary saw only the folded napkin where his head had rested and the bandages wherewith he had been wrapped lying intact and as they had rested on the stone before the celestial hosts removed the body."'
        }
      },

      // PHASE 3: BEYOND THE TOMB
      {
        id: 'tomb-scene',
        type: 'slide',
        time: null,
        label: 'The Tomb Scene',
        phase: 'phase3',
        phaseBreak: true,
        citation: '189:4.6',
        content: {
          quote: '"In the recess of stone where they had laid Jesus, Mary saw only the folded napkin where his head had rested and the bandages wherewith he had been wrapped lying intact and as they had rested on the stone before the celestial hosts removed the body. The grave sheet lay just as it had been placed, near the foot of the burial niche."',
          description: 'The midwayers carefully arrange the burial cloths for human discovery.',
          imageCaption: 'The arranged tomb scene'
        }
      },
      {
        id: 'the-women',
        type: 'slide',
        time: '3:30\u00A0AM',
        label: 'The Women',
        phase: 'phase3',
        citation: '189:4.1',
        content: {
          quote: '"At half past three o\'clock this Sunday morning, five women started out for the tomb of Jesus carrying embalming lotions."',
          description: 'Mary Magdalene and companions approach the tomb at dawn.',
          imageCaption: 'Women approaching'
        }
      },
      {
        id: 'missing-body',
        type: 'slide',
        time: null,
        label: 'The Missing Body',
        phase: 'phase3',
        citation: '189:4.6',
        content: {
          quote: '"Mary looked into the empty tomb and saw that the body of Jesus was gone. When Mary stood in the doorway of the tomb, at first she saw nothing; it was dark inside. Then she saw the white linen cloths lying as they had been arranged by the midwayers after the body had been removed."',
          description: 'Mary discovers the empty tomb.',
          imageCaption: 'Empty tomb discovery'
        }
      },
      {
        id: 'mary-recognizes',
        type: 'slide',
        time: null,
        label: 'Mary Recognizes Jesus',
        phase: 'phase3',
        citation: '189:4.13',
        content: {
          quote: '"When she heard this familiar voice, she knew it was the voice of the Master, and she rushed to kneel at his feet while she exclaimed, "My Lord, and my Master!" And Jesus said to Mary: "Touch me not, Mary, for I am not as you knew me in the flesh."',
          description: 'The first morontia appearance - Mary encounters the risen Jesus.',
          imageCaption: 'Mary recognizes Jesus'
        }
      },
      {
        id: 'archangel-circuit',
        type: 'slide',
        time: '4:30\u00A0AM',
        label: 'Archangel Circuit',
        phase: 'phase3',
        citation: '189:3.2',
        content: {
          quote: '"The circuit of the archangels then operated for the first time from Urantia. Gabriel and the archangel hosts moved to the place of the spiritual polarity of the planet; and when Gabriel gave the signal, there flashed to the first of the system mansion worlds the voice of Gabriel, saying: \'By the mandate of Michael, let the dead of a Urantia dispensation rise!\'"',
          description: 'The planetary circuit connects - ending Urantia\'s isolation.',
          imageCaption: 'Circuit activation'
        }
      },
      {
        id: 'dispensational-resurrection',
        type: 'slide',
        time: null,
        label: 'Dispensational Resurrection',
        phase: 'phase3',
        citation: '189:3.3',
        content: {
          quote: '"On the mansion worlds these newly segregated beings are known as dispensational survivors. This tremendous adjudication of the realm was the third to occur on Urantia; it was the last and most far-flung of all the \'harvest calls\' of the world, the \'great day of the Lord.\'"',
          description: 'Sleeping survivors from all ages awaken on the mansion worlds.',
          imageCaption: 'Dispensational resurrection'
        }
      },
      {
        id: 'conclusion',
        type: 'slide',
        time: null,
        label: 'Conclusion',
        phase: 'phase3',
        citation: null,
        content: {
          description: 'Summary of the tomb operations and their significance for Urantia.',
          imageCaption: null
        }
      }
    ]
  }

  const handleSlideClick = (slide) => {
    if (slide.type === 'day-header') return // Day headers not clickable
    setSelectedSlide(slide)
  }

  const handlePhaseClick = (phaseId) => {
    // Find first slide of this phase
    const firstSlide = presentationData.slides.find(s => s.phase === phaseId && s.type === 'slide')
    if (firstSlide) setSelectedSlide(firstSlide)
  }

  // Get active phase based on selected slide (default to phase1 if nothing selected)
  const getActivePhase = () => {
    if (!selectedSlide) return 'phase1' // Default: "The 36 Hours"
    return selectedSlide.phase
  }

  // Get phase color for selected event
  const getPhaseColor = (phaseId) => {
    const phase = presentationData.phases.find(p => p.id === phaseId)
    return phase?.color || '#22c55e'
  }

  // Calculate dynamic phase label positions based on event distribution
  // Label START positioned at the FINAL event of each phase
  const calculatePhasePositions = () => {
    const allSlides = presentationData.slides
    const positions = {}

    presentationData.phases.forEach(phase => {
      // Get all slides (not day-headers) for this phase
      const phaseSlides = allSlides.filter(s => s.phase === phase.id && s.type === 'slide')

      if (phaseSlides.length === 0) {
        positions[phase.id] = 50 // Default to middle if no slides
        return
      }

      // Find the LAST event index in the full slides array
      const lastSlide = phaseSlides[phaseSlides.length - 1]
      const lastIndex = allSlides.indexOf(lastSlide)

      // Convert to percentage (label start aligned to final event)
      const totalItems = allSlides.length
      positions[phase.id] = (lastIndex / totalItems) * 100
    })

    return positions
  }

  const phasePositions = calculatePhasePositions()

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #020617, #0f172a, #020617)',
      color: '#e2e8f0',
      overflow: 'hidden'
    }}>
      {/* Fixed 16:9 container */}
      <div className="relative" style={{
        width: '95vw',
        maxWidth: '1920px',
        aspectRatio: '16/9'
      }}>

        {/* Title - Top Right */}
        <div className="absolute top-6 right-8 text-gray-400 text-base font-semibold tracking-wider">
          {presentationData.title}
        </div>

        {/* Site Link - Bottom Right */}
        <div className="absolute bottom-6 right-8 text-gray-500 text-sm" style={{ fontFamily: 'ui-monospace, monospace' }}>
          <a href="https://revelationary.net" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
            revelationary.net
          </a>
        </div>

        {/* Main Content */}
        <div className="absolute inset-0 flex gap-2 p-6 pt-16 pr-8">

          {/* Left Side - Phase Labels (rotated vertical) + Event List */}
          <div className="flex gap-2" style={{ width: '340px' }}>

            {/* Phase Labels - Rotated 90deg counterclockwise, dynamically centered on events */}
            <div className="relative flex-shrink-0" style={{ width: '24px', height: '100%' }}>
              {presentationData.phases.map((phase) => {
                const isActive = getActivePhase() === phase.id
                const basePosition = phasePositions[phase.id]

                // Use base position - aligns label start with final event
                const topPosition = `${basePosition}%`

                // Custom letter spacing for phase1
                const letterSpacing = phase.id === 'phase1' ? '0.13em' : '0.05em'

                // Special rendering for phase3 (two-line label: "BEYOND" / "THE TOMB")
                if (phase.id === 'phase3') {
                  return (
                    <div
                      key={phase.id}
                      onClick={() => handlePhaseClick(phase.id)}
                      className="absolute cursor-pointer transition-all duration-300"
                      style={{
                        top: topPosition,
                        left: '50%',
                        transform: 'translateX(-50%) rotate(-90deg)',
                        transformOrigin: 'left center',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        color: isActive ? phase.color : '#64748b',
                        textTransform: 'uppercase',
                        textShadow: isActive ? `0 0 8px ${phase.color}60` : 'none',
                        lineHeight: '1.4'
                      }}
                    >
                      <div>Beyond</div>
                      <div>The Tomb</div>
                    </div>
                  )
                }

                return (
                  <div
                    key={phase.id}
                    onClick={() => handlePhaseClick(phase.id)}
                    className="absolute cursor-pointer transition-all duration-300"
                    style={{
                      top: topPosition,
                      left: '50%',
                      transform: 'translateX(-50%) rotate(-90deg)',
                      transformOrigin: 'center',
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: letterSpacing,
                      color: isActive ? phase.color : '#64748b',
                      textTransform: 'uppercase',
                      textShadow: isActive ? `0 0 8px ${phase.color}60` : 'none',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {phase.name}
                  </div>
                )
              })}
            </div>

            {/* Event List - Days above events, bullets, times on right */}
            <div className="flex-1 overflow-hidden" style={{ fontFamily: 'ui-monospace, monospace' }}>
              <div className="space-y-0 text-xs">
                {presentationData.slides.map((slide) => {
                  if (slide.type === 'day-header') {
                    const hasDayBreak = slide.dayBreak === true
                    return (
                      <div key={slide.id}>
                        {/* Extra spacing before day header if flagged */}
                        {hasDayBreak && <div className="my-6"></div>}
                        <div className="font-bold mt-4 mb-1.5 text-sm pl-2" style={{ color: '#a78bfa' }}>
                          {slide.label}
                        </div>
                      </div>
                    )
                  }

                  const isSelected = selectedSlide?.id === slide.id
                  const hasTime = slide.time !== null
                  const phaseColor = getPhaseColor(slide.phase)
                  const hasPhaseBreak = slide.phaseBreak === true
                  const hasDayBreak = slide.dayBreak === true

                  return (
                    <div key={slide.id}>
                      {/* Phase break - spacing only */}
                      {hasPhaseBreak && <div className="my-4"></div>}
                      {/* Day break - extra spacing between days */}
                      {hasDayBreak && <div className="my-6"></div>}

                      <div
                        onClick={() => handleSlideClick(slide)}
                        className="cursor-pointer hover:text-gray-300 transition-colors flex items-center gap-2 py-0.5"
                      >
                        {/* Time (if exists) */}
                        {hasTime && (
                          <span
                            className="w-20 text-right transition-colors text-xs"
                            style={{ color: isSelected ? phaseColor : '#64748b' }}
                          >
                            {slide.time}
                          </span>
                        )}
                        {!hasTime && <span className="w-20"></span>}

                        {/* Bullet - small circle that fills when selected */}
                        <div
                          className="transition-all rounded-full flex-shrink-0"
                          style={{
                            width: '6px',
                            height: '6px',
                            backgroundColor: isSelected ? phaseColor : 'transparent',
                            border: `1.5px solid ${isSelected ? phaseColor : '#64748b'}`
                          }}
                        />

                        {/* Label */}
                        <span
                          className="flex-1 transition-colors text-xs"
                          style={{
                            color: isSelected ? phaseColor : '#94a3b8',
                            fontWeight: isSelected ? 600 : 400
                          }}
                        >
                          {slide.label}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Content Area */}
          <div className="flex-1 flex flex-col">
            {selectedSlide ? (
              <div className="flex-1 flex items-center justify-center px-8">
                <div className="max-w-[700px] w-full space-y-6">

                  {/* Slide Title */}
                  <div className="text-gray-400 text-3xl font-semibold mb-8">
                    {selectedSlide.label}
                  </div>

                  {/* Content based on slide type */}
                  {selectedSlide.content.infographic ? (
                    // Infographic placeholder or link
                    selectedSlide.content.link ? (
                      <a href={selectedSlide.content.link} target="_blank" rel="noopener noreferrer" className="block">
                        <div className="bg-slate-800/30 border-2 border-slate-600 rounded-xl p-12 text-center hover:border-slate-500 transition-all cursor-pointer">
                          <div className="text-6xl mb-4">🔗</div>
                          <div className="text-gray-400 text-xl font-semibold mb-2">
                            {selectedSlide.label}
                          </div>
                          <div className="text-slate-400 text-sm mb-4">
                            {selectedSlide.content.description}
                          </div>
                          <div className="text-blue-400 text-sm font-semibold">
                            Click to view interactive infographic →
                          </div>
                          {selectedSlide.content.quote && (
                            <div className="mt-6 text-slate-300 italic text-sm">
                              {selectedSlide.content.quote}
                            </div>
                          )}
                        </div>
                      </a>
                    ) : (
                      <div className="bg-slate-800/30 border-2 border-dashed border-slate-600 rounded-xl p-12 text-center">
                        <div className="text-6xl mb-4">📊</div>
                        <div className="text-gray-400 text-xl font-semibold mb-2">
                          {selectedSlide.label}
                        </div>
                        <div className="text-slate-400 text-sm">
                          {selectedSlide.content.description}
                        </div>
                        {selectedSlide.content.quote && (
                          <div className="mt-6 text-slate-300 italic text-sm">
                            {selectedSlide.content.quote}
                          </div>
                        )}
                      </div>
                    )
                  ) : (
                    <>
                      {/* Quote Box */}
                      {selectedSlide.content.quote && (
                        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                          <div className="text-slate-300 text-base leading-relaxed italic mb-4">
                            {selectedSlide.content.quote}
                          </div>
                          {selectedSlide.citation && (
                            <div className="text-right text-sm text-slate-500">
                              — {selectedSlide.citation}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Description */}
                      {selectedSlide.content.description && (
                        <div className="text-slate-400 text-base leading-relaxed">
                          {selectedSlide.content.description}
                        </div>
                      )}

                      {/* Image Placeholder */}
                      {selectedSlide.content.imageCaption && (
                        <div className="bg-slate-800/30 border-2 border-dashed border-slate-600 rounded-xl p-8 text-center">
                          <div className="text-4xl mb-3">🖼️</div>
                          <div className="text-slate-500 text-sm">
                            Image: {selectedSlide.content.imageCaption}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            ) : (
              // Welcome screen
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="text-6xl mb-6">⏰</div>
                  <div className="text-gray-400 text-2xl font-semibold mb-4">
                    Accelerated Time of the Tomb
                  </div>
                  <div className="text-slate-300 text-base leading-relaxed">
                    Click any event in the timeline to begin the presentation.
                  </div>
                  <div className="mt-6 text-slate-500 text-sm">
                    {presentationData.slides.filter(s => s.type !== 'day-header').length} slides
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
