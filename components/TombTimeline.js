'use client'

import { useState } from 'react'

export default function TombTimeline() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Timeline data structure
  const timelineData = {
    title: "Accelerated Time of the Tomb",
    subtitle: "Tomb Operations",

    // Revealed times (bottom ticks)
    times: [
      { id: 'midnight', time: 'Midnight', label: 'Saturday Midnight' },
      { id: '245am', time: '2:45 AM', label: 'Sunday 2:45 AM' },
      { id: '302am', time: '3:02 AM', label: '3:02 AM' },
      { id: '310am', time: '3:10 AM', label: '3:10 AM' },
      { id: '330am', time: '~3:30 AM', label: '~3:30 AM' },
      { id: '430am', time: '4:30 AM', label: '4:30 AM' },
    ],

    // Events (diagonal labels above timeline)
    events: [
      // Midnight events
      {
        id: 'adjuster-declaration',
        timeId: 'midnight',
        diagonal: ['Adjuster', 'Declaration'],
        citation: '189:0.2',
        quote: '"Not one of you can do aught to assist your Creator-father in the return to life. As a mortal of the realm he has experienced mortal death; as the Sovereign of a universe he still lives. That which you observe is the mortal transit of Jesus of Nazareth from life in the flesh to life in the morontia."',
        keepTimeLit: 'midnight'
      },
      {
        id: 'creator-prerogatives',
        timeId: 'midnight',
        diagonal: ['Creator', 'Prerogatives'],
        citation: '189:0.2',
        quote: '"A Creator Son has within himself the power to bestow himself in the likeness of any of his created sons; he has within himself the power to lay down his observable life and to take it up again; and he has this power because of the direct command of the Paradise Father, and I know whereof I speak."',
        keepTimeLit: 'midnight'
      },

      // 2:45 AM events
      {
        id: 'paradise-personalities',
        timeId: '245am',
        diagonal: ['Paradise', 'Personalities'],
        citation: '189:1.1',
        quote: '"Seven unidentified Paradise personalities arrived and immediately deployed themselves about the tomb."',
        keepTimeLit: '245am'
      },
      {
        id: 'deployed',
        timeId: '245am',
        diagonal: ['Deployed'],
        citation: '189:1.1',
        quote: '"These beings from Paradise took positions around the sepulchre. Their purpose remained undisclosed to all other universe personalities present."',
        keepTimeLit: '245am'
      },
      {
        id: 'vibrations',
        timeId: null, // Untimed, after 2:45
        diagonal: ['Vibrations', 'Begin'],
        citation: '189:1.1',
        quote: '"At two minutes to three o\'clock, intense vibrations of commingled material and morontia activities began to issue from Joseph\'s new tomb."',
        keepTimeLit: '245am'
      },

      // 3:02 AM events
      {
        id: 'morontia-resurrection',
        timeId: '302am',
        diagonal: ['Morontia', 'Resurrection'],
        citation: '189:1.1',
        quote: '"At two minutes past three o\'clock, the resurrected morontia form and personality of Jesus of Nazareth came forth from the tomb."',
        keepTimeLit: '302am'
      },
      {
        id: 'body-remains',
        timeId: null,
        diagonal: ['Body', 'Remains'],
        citation: '189:1.2',
        quote: '"The physical body still lay there in the sepulchre niche, undisturbed and wrapped in the linen sheet, just as it had been laid to rest by Joseph and his associates on Friday afternoon."',
        keepTimeLit: '302am'
      },

      // 3:10 AM events (multiple untimed events keep this lit)
      {
        id: 'archangel-request',
        timeId: '310am',
        diagonal: ['Archangel\'s', 'Request'],
        citation: '189:2.1',
        quote: '"We may not participate in the morontia resurrection of the bestowal experience of Michael our sovereign, but we would have his mortal remains put in our custody for immediate dissolution."',
        keepTimeLit: '310am'
      },
      {
        id: 'accelerated-time',
        timeId: null,
        diagonal: ['Accelerated', 'Time'],
        citation: '189:2.1',
        quote: '"We do not propose to employ our technique of dematerialization; we merely wish to invoke the process of accelerated time."',
        keepTimeLit: '310am'
      },
      {
        id: 'gabriel-authorizes',
        timeId: null,
        diagonal: ['Gabriel', 'Authorizes'],
        citation: '189:2.1',
        quote: '"Gabriel conferred with the senior Most High of Edentia, who was present for these events. After this consultation, Gabriel granted the requested authorization."',
        keepTimeLit: '310am'
      },
      {
        id: 'mpc-summoned',
        timeId: null,
        diagonal: ['MPC', 'Summoned'],
        citation: '189:2.3',
        quote: '"The chief of archangels summoned to his assistance many of his fellows, together with a numerous host of the representatives of all orders of celestial personalities, and then, with the aid of the Urantia midwayers, they proceeded to take possession of Jesus\' physical body."',
        keepTimeLit: '310am'
      },
      {
        id: 'stone-removed',
        timeId: null,
        diagonal: ['Stone', 'Removed'],
        citation: '189:2.4',
        quote: '"This huge stone began slowly to roll away from the entrance of the tomb without any visible means to account for such motion."',
        keepTimeLit: '310am'
      },
      {
        id: 'guards-flee',
        timeId: null,
        diagonal: ['Guards', 'Flee'],
        citation: '189:2.4',
        quote: '"The Jewish guards fled to their homes, later reporting to their captain at the temple. The Roman soldiers fled to the fortress of Antonia, reporting to the centurion as soon as he came on duty."',
        keepTimeLit: '310am'
      },
      {
        id: 'dissolution',
        timeId: null,
        diagonal: ['Dissolution'],
        citation: '189:2.8',
        quote: '"The mortal remains of Jesus underwent the same natural process of elemental disintegration as characterizes all human bodies on earth except that, in point of time, this natural mode of dissolution was greatly accelerated, hastened to that point where it became well-nigh instantaneous."',
        keepTimeLit: '310am'
      },

      // 3:30 AM events
      {
        id: 'women-approach',
        timeId: '330am',
        diagonal: ['Women', 'Approach'],
        citation: '189:4.1',
        quote: '"At half past three o\'clock this Sunday morning, five women started out for the tomb of Jesus carrying embalming lotions."',
        keepTimeLit: '330am'
      },
      {
        id: 'mary-enters',
        timeId: null,
        diagonal: ['Mary', 'Enters'],
        citation: '189:4.6',
        quote: '"In the recess of stone where they had laid Jesus, Mary saw only the folded napkin where his head had rested and the bandages wherewith he had been wrapped lying intact and as they had rested on the stone before the celestial hosts removed the body."',
        keepTimeLit: '330am'
      },

      // 4:30 AM events
      {
        id: 'archangel-circuit',
        timeId: '430am',
        diagonal: ['Archangel', 'Circuit'],
        citation: '189:3.2',
        quote: '"The circuit of the archangels then operated for the first time from Urantia."',
        keepTimeLit: '430am'
      },
      {
        id: 'first-operation',
        timeId: null,
        diagonal: ['First', 'Operation'],
        citation: '189:3.2',
        quote: '"This archangel circuit activation established permanent universe communication infrastructure from our isolated world."',
        keepTimeLit: '430am'
      },
    ]
  }

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const handleClose = () => {
    setSelectedEvent(null)
  }

  // Calculate which time should be lit based on selected event
  const getLitTimeId = () => {
    if (!selectedEvent) return null
    return selectedEvent.keepTimeLit
  }

  return (
    <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-text-light dark:text-text-dark">
      {/* Title */}
      <header className="py-8 px-4 border-b border-light-border dark:border-dark-border">
        <h1 className="text-4xl font-bold text-center">{timelineData.title}</h1>
        <p className="text-xl text-center mt-2 text-text-muted-light dark:text-text-muted-dark">
          {timelineData.subtitle}
        </p>
      </header>

      {/* Content Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Visual Content Area (above timeline) */}
        <div className="flex-1 flex items-center justify-center p-8">
          {selectedEvent ? (
            <div className="max-w-3xl w-full">
              {/* Text Box with Quote */}
              <div className="bg-light-card dark:bg-dark-card border-2 border-light-border dark:border-dark-border rounded-lg p-8 shadow-lg relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-2xl text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark"
                  aria-label="Close"
                >
                  ×
                </button>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <blockquote className="border-l-4 border-[#3B82C8] dark:border-[#60A5FA] pl-6 italic text-lg">
                    {selectedEvent.quote}
                  </blockquote>
                  <p className="text-right mt-4 text-[#3B82C8] dark:text-[#60A5FA] font-semibold">
                    — {selectedEvent.citation}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-text-muted-light dark:text-text-muted-dark">
              <p className="text-xl">Click any event on the timeline to explore</p>
            </div>
          )}
        </div>

        {/* Timeline Section */}
        <div className="border-t-2 border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card p-8">
          <div className="max-w-7xl mx-auto">
            {/* Diagonal Event Labels (above timeline) */}
            <div className="relative h-32 mb-8">
              <div className="absolute inset-0 flex justify-between items-end">
                {timelineData.events.map((event, index) => {
                  const isSelected = selectedEvent?.id === event.id
                  const litTimeId = getLitTimeId()
                  const isAssociated = event.keepTimeLit === litTimeId

                  // Calculate position based on associated time or distribute untimed events
                  let position = 0
                  if (event.timeId) {
                    const timeIndex = timelineData.times.findIndex(t => t.id === event.timeId)
                    position = (timeIndex / (timelineData.times.length - 1)) * 100
                  } else {
                    // For untimed events, position near their keepTimeLit time
                    const timeIndex = timelineData.times.findIndex(t => t.id === event.keepTimeLit)
                    position = (timeIndex / (timelineData.times.length - 1)) * 100 + (index * 2) // Slight offset
                  }

                  return (
                    <button
                      key={event.id}
                      onClick={() => handleEventClick(event)}
                      className={`absolute bottom-0 transform -translate-x-1/2 transition-all cursor-pointer group`}
                      style={{ left: `${position}%` }}
                    >
                      <div className="flex flex-col items-center">
                        {event.diagonal.map((text, i) => (
                          <span
                            key={i}
                            className={`text-sm font-semibold whitespace-nowrap transform -rotate-45 origin-bottom-left mb-1 transition-colors ${
                              isSelected || isAssociated
                                ? 'text-[#22c55e] dark:text-[#3B82C8]'
                                : 'text-text-muted-light dark:text-text-muted-dark group-hover:text-text-light dark:group-hover:text-text-dark'
                            }`}
                          >
                            {text}
                          </span>
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Timeline Bar */}
            <div className="relative">
              {/* Main horizontal line */}
              <div className="h-1 bg-light-border dark:bg-dark-border rounded-full" />

              {/* Time ticks */}
              <div className="absolute inset-0 flex justify-between items-center">
                {timelineData.times.map((time) => {
                  const litTimeId = getLitTimeId()
                  const isLit = time.id === litTimeId

                  return (
                    <div key={time.id} className="flex flex-col items-center">
                      {/* Tick mark */}
                      <div
                        className={`w-1 h-6 rounded-full transition-colors ${
                          isLit
                            ? 'bg-[#22c55e] dark:bg-[#3B82C8]'
                            : 'bg-light-border dark:bg-dark-border'
                        }`}
                      />
                      {/* Time label */}
                      <span
                        className={`mt-2 text-sm font-semibold transition-colors ${
                          isLit
                            ? 'text-[#22c55e] dark:text-[#3B82C8]'
                            : 'text-text-muted-light dark:text-text-muted-dark'
                        }`}
                      >
                        {time.time}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
