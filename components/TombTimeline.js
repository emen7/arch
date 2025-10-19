'use client'

import { useState } from 'react'

export default function TombTimeline() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Timeline data: Friday 3 PM through Sunday 4:30 AM
  const timelineData = {
    // Three phases with vertical span info
    phases: [
      {
        id: 'phase1',
        name: 'The 36 Hours',
        startPos: 0,
        endPos: 4  // Friday 3 PM through Sunday 3:02 AM
      },
      {
        id: 'phase2',
        name: 'Tomb Operations',
        startPos: 4,
        endPos: 5  // Sunday 3:02 AM through 3:10 AM completion
      },
      {
        id: 'phase3',
        name: 'Beyond the Tomb',
        startPos: 6,
        endPos: 8  // Sunday 3:30 AM through 4:30 AM
      }
    ],

    // Major timed events (left side of vertical line)
    majorTimes: [
      { id: 'friday-3pm', time: 'Friday 3 PM', position: 0, phase: 'phase1' },
      { id: 'friday-430pm', time: '4:30 PM', position: 1, phase: 'phase1' },
      { id: 'sunday-midnight', time: 'Shortly after Midnight', position: 2, phase: 'phase1' },
      { id: 'sunday-245am', time: 'Sunday 2:45 AM', position: 3, phase: 'phase1' },
      { id: 'sunday-302am', time: '3:02 AM', position: 4, phase: 'phase1' },
      { id: 'sunday-310am', time: '3:10 AM', position: 5, phase: 'phase2' },
      { id: 'sunday-330am', time: '~3:30 AM', position: 6, phase: 'phase3' },
      { id: 'sunday-430am', time: '4:30 AM', position: 8, phase: 'phase3' },
    ],

    // All events (timed and untimed)
    events: [
      // PHASE 1: THE 36 HOURS
      // Friday 3 PM - Death on Cross
      {
        id: 'death-on-cross',
        timeId: 'friday-3pm',
        label: 'Death on Cross',
        citation: '187:5.5',
        quote: '"It was just before three o\'clock when Jesus, with a loud voice, cried out, "It is finished! Father, into your hands I commend my spirit." And when he had thus spoken, he bowed his head and gave up the life struggle. When the Roman centurion saw how Jesus died, he smote his breast and said: "This was indeed a righteous man; truly he must have been a Son of God."',
        phase: 'phase1',
        isTimed: true
      },
      {
        id: 'joseph-granted-body',
        timeId: 'friday-3pm',
        label: 'Joseph Granted Body',
        citation: '187:6.1',
        quote: '"When Joseph and Nicodemus arrived at Golgotha, they found the soldiers taking Jesus down from the cross and the representatives of the Sanhedrin standing by... When Joseph presented Pilate\'s order for the Master\'s body to the centurion, the Jews raised a tumult and clamored for its possession."',
        phase: 'phase1',
        isTimed: false
      },

      // Friday 4:30 PM - Burial Procession
      {
        id: 'burial-procession',
        timeId: 'friday-430pm',
        label: 'Burial Procession',
        citation: '187:6.2',
        quote: '"At about half past four o\'clock the burial procession of Jesus of Nazareth started from Golgotha for Joseph\'s tomb across the way. The body was wrapped in a linen sheet as the four men carried it, followed by the faithful women watchers from Galilee."',
        phase: 'phase1',
        isTimed: true
      },
      {
        id: 'body-embalmed',
        timeId: 'friday-430pm',
        label: 'Body Embalmed',
        citation: '187:6.3',
        quote: '"They carried the body into the tomb, a chamber about ten feet square, where they hurriedly prepared it for burial. The Jews did not really bury their dead; they actually embalmed them. Joseph and Nicodemus had brought with them large quantities of myrrh and aloes, and they now wrapped the body with bandages saturated with these solutions."',
        phase: 'phase1',
        isTimed: false
      },
      {
        id: 'tomb-sealed',
        timeId: 'friday-430pm',
        label: 'Tomb Sealed',
        citation: '187:6.6',
        quote: '"These men rolled yet another stone before the tomb and set the seal of Pilate on and around these stones, lest they be disturbed without their knowledge. And these twenty men remained on watch up to the hour of the resurrection."',
        phase: 'phase1',
        isTimed: false
      },

      // Shortly after Midnight - Adjuster Declaration
      {
        id: 'the-36-hours',
        timeId: 'sunday-midnight',
        label: 'The 36 Hours',
        citation: '188:0.1',
        quote: '"THE day and a half that Jesus\' mortal body lay in the tomb of Joseph, the period between his death on the cross and his resurrection, is a chapter in the earth career of Michael which is little known to us. We can narrate the burial of the Son of Man and put in this record the events associated with his resurrection, but we cannot supply much information of an authentic nature about what really transpired during this epoch of about thirty-six hours, from three o\'clock Friday afternoon to three o\'clock Sunday morning."',
        phase: 'phase1',
        isTimed: true
      },
      {
        id: 'adjuster-declaration',
        timeId: 'sunday-midnight',
        label: 'Adjuster Declaration',
        citation: '189:0.2',
        quote: '"Not one of you can do aught to assist your Creator-father in the return to life. As a mortal of the realm he has experienced mortal death; as the Sovereign of a universe he still lives. That which you observe is the mortal transit of Jesus of Nazareth from life in the flesh to life in the morontia."',
        phase: 'phase1',
        isTimed: false
      },
      {
        id: 'creator-prerogatives',
        timeId: 'sunday-midnight',
        label: 'Creator Prerogatives',
        citation: '189:0.2',
        quote: '"A Creator Son has within himself the power to bestow himself in the likeness of any of his created sons; he has within himself the power to lay down his observable life and to take it up again; and he has this power because of the direct command of the Paradise Father, and I know whereof I speak."',
        phase: 'phase1',
        isTimed: false
      },

      // Sunday 2:45 AM - Paradise Personalities
      {
        id: 'paradise-personalities',
        timeId: 'sunday-245am',
        label: 'Paradise Personalities Arrive',
        citation: '189:1.1',
        quote: '"At a quarter to three this Sunday morning, the archangel\'s roll call of the resurrection dispensation of Urantia was given on the third mansion world. And the first words of Gabriel were: \'By the mandate of Michael, let the dead of a Urantia dispensation rise!\'"',
        phase: 'phase1',
        isTimed: true
      },
      {
        id: 'deployed',
        timeId: 'sunday-245am',
        label: 'Deployed Around Tomb',
        citation: '189:1.1',
        quote: '"These beings from Paradise took positions around the sepulchre. Their purpose remained undisclosed to all other universe personalities present."',
        phase: 'phase1',
        isTimed: false
      },
      {
        id: 'vibrations',
        timeId: 'sunday-245am',
        label: 'Vibrations Begin',
        citation: '189:1.1',
        quote: '"At two minutes to three o\'clock, intense vibrations of commingled material and morontia activities began to issue from Joseph\'s new tomb."',
        phase: 'phase1',
        isTimed: false
      },

      // Sunday 3:02 AM - Morontia Resurrection (END OF PHASE 1)
      {
        id: 'morontia-resurrection',
        timeId: 'sunday-302am',
        label: 'Morontia Resurrection',
        citation: '189:1.1',
        quote: '"At two minutes past three o\'clock, the resurrected morontia form and personality of Jesus of Nazareth came forth from the tomb."',
        phase: 'phase1',
        isTimed: true
      },

      // PHASE 2: TOMB OPERATIONS
      // Physical Body Remains (START OF PHASE 2)
      {
        id: 'body-remains',
        timeId: 'sunday-302am',
        label: 'Physical Body Remains',
        citation: '189:1.2',
        quote: '"The physical body still lay there in the sepulchre niche, undisturbed and wrapped in the linen sheet, just as it had been laid to rest by Joseph and his associates on Friday afternoon."',
        phase: 'phase2',
        isTimed: false
      },

      // Sunday 3:10 AM - Accelerated Time Operations
      {
        id: 'archangel-request',
        timeId: 'sunday-310am',
        label: 'Archangel\'s Request',
        citation: '189:2.1',
        quote: '"We may not participate in the morontia resurrection of the bestowal experience of Michael our sovereign, but we would have his mortal remains put in our custody for immediate dissolution."',
        phase: 'phase2',
        isTimed: true
      },
      {
        id: 'accelerated-time',
        timeId: 'sunday-310am',
        label: 'Accelerated Time Process',
        citation: '189:2.1',
        quote: '"We do not propose to employ our technique of dematerialization; we merely wish to invoke the process of accelerated time."',
        phase: 'phase2',
        isTimed: false
      },
      {
        id: 'gabriel-authorizes',
        timeId: 'sunday-310am',
        label: 'Gabriel Authorizes',
        citation: '189:2.1',
        quote: '"Gabriel conferred with the senior Most High of Edentia, who was present for these events. After this consultation, Gabriel granted the requested authorization."',
        phase: 'phase2',
        isTimed: false
      },
      {
        id: 'mpc-summoned',
        timeId: 'sunday-310am',
        label: 'Master Physical Controllers Summoned',
        citation: '189:2.3',
        quote: '"The chief of archangels summoned to his assistance many of his fellows, together with a numerous host of the representatives of all orders of celestial personalities, and then, with the aid of the Urantia midwayers, they proceeded to take possession of Jesus\' physical body."',
        phase: 'phase2',
        isTimed: false
      },
      {
        id: 'stone-removed',
        timeId: 'sunday-310am',
        label: 'Stone Removed',
        citation: '189:2.4',
        quote: '"This huge stone began slowly to roll away from the entrance of the tomb without any visible means to account for such motion."',
        phase: 'phase2',
        isTimed: false
      },
      {
        id: 'guards-flee',
        timeId: 'sunday-310am',
        label: 'Guards Flee',
        citation: '189:2.4',
        quote: '"The Jewish guards fled to their homes, later reporting to their captain at the temple. The Roman soldiers fled to the fortress of Antonia, reporting to the centurion as soon as he came on duty."',
        phase: 'phase2',
        isTimed: false
      },
      {
        id: 'dissolution',
        timeId: 'sunday-310am',
        label: 'Instant Dissolution',
        citation: '189:2.8',
        quote: '"The mortal remains of Jesus underwent the same natural process of elemental disintegration as characterizes all human bodies on earth except that, in point of time, this natural mode of dissolution was greatly accelerated, hastened to that point where it became well-nigh instantaneous."',
        phase: 'phase2',
        isTimed: false
      },
      {
        id: 'midwayers-arrange',
        timeId: 'sunday-310am',
        label: 'Midwayers Arrange Tomb Scene',
        citation: '189:4.6',
        quote: '"In the recess of stone where they had laid Jesus, Mary saw only the folded napkin where his head had rested and the bandages wherewith he had been wrapped lying intact and as they had rested on the stone before the celestial hosts removed the body. The grave sheet lay just as it had been placed, near the foot of the burial niche."',
        phase: 'phase2',
        isTimed: false
      },

      // PHASE 3: BEYOND THE TOMB
      // Sunday 3:30 AM - Women Approach
      {
        id: 'women-approach',
        timeId: 'sunday-330am',
        label: 'Women Approach Tomb',
        citation: '189:4.1',
        quote: '"At half past three o\'clock this Sunday morning, five women started out for the tomb of Jesus carrying embalming lotions."',
        phase: 'phase3',
        isTimed: true
      },
      {
        id: 'mary-enters',
        timeId: 'sunday-330am',
        label: 'Mary Enters Empty Tomb',
        citation: '189:4.6',
        quote: '"Mary looked into the empty tomb and saw that the body of Jesus was gone. When Mary stood in the doorway of the tomb, at first she saw nothing; it was dark inside. Then she saw the white linen cloths lying as they had been arranged by the midwayers after the body had been removed."',
        phase: 'phase3',
        isTimed: false
      },

      // Sunday 4:30 AM - Archangel Circuit
      {
        id: 'archangel-circuit',
        timeId: 'sunday-430am',
        label: 'Archangel Circuit Activation',
        citation: '189:3.2',
        quote: '"The circuit of the archangels then operated for the first time from Urantia."',
        phase: 'phase3',
        isTimed: true
      },
      {
        id: 'first-operation',
        timeId: 'sunday-430am',
        label: 'First Universe Communication',
        citation: '189:3.2',
        quote: '"Gabriel and the archangels had been on Urantia since the crucifixion of Jesus for the purpose of supervising the terminal transactions of the bestowal. On this Sunday morning they flashed to the universe rulers the announcement that Jesus had risen from the tomb."',
        phase: 'phase3',
        isTimed: false
      },
    ]
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const handleTimeClick = (timeId) => {
    // Find first event for this time
    const event = timelineData.events.find(e => e.timeId === timeId)
    if (event) setSelectedEvent(event)
  }

  // Get the phase of the currently selected event
  const getActivePhase = () => {
    if (!selectedEvent) return null
    return selectedEvent.phase
  }

  // Get the active time ID
  const getActiveTimeId = () => {
    if (!selectedEvent) return null
    return selectedEvent.timeId
  }

  // Get events for a specific time
  const getEventsForTime = (timeId) => {
    return timelineData.events.filter(e => e.timeId === timeId)
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #020617, #0f172a, #020617)',
      color: '#e2e8f0',
      overflow: 'hidden'
    }}>
      <div className="w-[95vw] h-[95vh] max-w-[1920px] max-h-[1080px] flex gap-12 p-8 relative">

        {/* Left Side - Timeline */}
        <div className="w-[420px] flex flex-col">
          {/* Title - matching Wave-Energy style */}
          <div className="text-gray-400 text-lg font-semibold tracking-wider mb-8 flex-shrink-0">
            TOMB OPERATIONS
          </div>

          {/* Timeline */}
          <div className="relative flex-1">
            {/* Phase Labels - Rotated on far left */}
            {timelineData.phases.map((phase) => {
              const topPercent = (phase.startPos / 8) * 100
              const heightPercent = ((phase.endPos - phase.startPos) / 8) * 100
              const isActive = getActivePhase() === phase.id

              return (
                <div
                  key={phase.id}
                  className="absolute text-slate-500 text-[13px] tracking-wide whitespace-nowrap"
                  style={{
                    left: '2px',
                    top: `${topPercent + heightPercent / 2}%`,
                    transform: 'rotate(-90deg) translateX(-50%)',
                    transformOrigin: 'left center',
                    color: isActive ? '#22c55e' : '#64748b',
                    transition: 'color 0.3s'
                  }}
                >
                  {phase.name}
                </div>
              )
            })}

            {/* Timeline Scale */}
            <div className="relative h-full">
              {/* Vertical line with phase highlighting */}
              <div className="absolute left-12 top-0 bottom-0 w-0.5">
                {timelineData.phases.map((phase) => {
                  const topPercent = (phase.startPos / 8) * 100
                  const heightPercent = ((phase.endPos - phase.startPos) / 8) * 100
                  const isActive = getActivePhase() === phase.id

                  return (
                    <div
                      key={phase.id}
                      className="absolute left-0 w-full transition-all duration-300"
                      style={{
                        top: `${topPercent}%`,
                        height: `${heightPercent}%`,
                        backgroundColor: isActive ? '#22c55e' : '#475569',
                        opacity: isActive ? 0.8 : 1,
                        boxShadow: isActive ? '0 0 8px rgba(34, 197, 94, 0.4)' : 'none'
                      }}
                    />
                  )
                })}
              </div>

              {/* Time points and events */}
              <div>
                {timelineData.majorTimes.map((time) => {
                  const activeTimeId = getActiveTimeId()
                  const isActive = time.id === activeTimeId
                  const events = getEventsForTime(time.id)
                  const topPercent = (time.position / 8) * 100

                  return (
                    <div
                      key={time.id}
                      className="absolute left-0 flex items-start cursor-pointer -translate-y-1/2"
                      style={{ top: `${topPercent}%` }}
                      onClick={() => handleTimeClick(time.id)}
                    >
                      {/* Time label on left */}
                      <div
                        className="w-20 text-right text-xs font-semibold leading-tight pr-2 transition-colors"
                        style={{
                          color: isActive ? '#22c55e' : '#64748b'
                        }}
                      >
                        {time.time}
                      </div>

                      {/* Tick mark - horizontal dash */}
                      <div
                        className="h-0.5 transition-all mt-1.5"
                        style={{
                          width: isActive ? '32px' : '24px',
                          backgroundColor: isActive ? '#22c55e' : '#64748b'
                        }}
                      />

                      {/* Event labels on right */}
                      <div className="ml-3 space-y-1">
                        {events.map((event) => {
                          const isSelected = selectedEvent?.id === event.id

                          return (
                            <button
                              key={event.id}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEventClick(event)
                              }}
                              className="block text-left text-sm transition-colors hover:text-gray-300 leading-tight"
                              style={{
                                color: isSelected ? '#22c55e' : '#64748b',
                                fontWeight: event.isTimed ? 600 : 400
                              }}
                            >
                              {event.label}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1 flex flex-col relative pb-20">
          {selectedEvent ? (
            <div className="absolute left-0 right-[15%] top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 max-w-[600px] w-[90%]">
                {/* Event Title */}
                <div className="text-gray-400 text-2xl font-semibold mb-6">
                  {selectedEvent.label}
                </div>

                {/* Quote */}
                <div className="text-slate-300 text-base leading-relaxed mb-4">
                  <p className="italic">{selectedEvent.quote}</p>
                </div>

                {/* Citation */}
                <div className="text-right text-sm text-slate-500">
                  — The Urantia Book {selectedEvent.citation}
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute left-0 right-[15%] top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="text-center">
                <div className="text-6xl mb-6">⏰</div>
                <div className="text-gray-400 text-2xl font-semibold mb-4">
                  The Tomb Operations Timeline
                </div>
                <div className="text-slate-300 text-base leading-relaxed max-w-md">
                  Click any event to explore the revelators' account from Jesus' death at 3 PM Friday through the archangel circuit activation at 4:30 AM Sunday.
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="absolute bottom-0 right-0 text-right">
            <div className="text-slate-500 text-[0.625rem] tracking-wider mb-2 uppercase">
              CONTROLS
            </div>
            <div className="text-slate-500 text-xs leading-relaxed">
              <div>Click timeline events</div>
              <div>Click time markers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
