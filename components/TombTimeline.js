'use client'

import { useState } from 'react'

export default function TombTimeline() {
  const [selectedEvent, setSelectedEvent] = useState(null)

  // Timeline data: Friday 3 PM through Sunday 4:30 AM
  const timelineData = {
    title: "Tomb Operations",
    subtitle: "Friday - Sunday",

    // Major timed events (left side of vertical line)
    majorTimes: [
      { id: 'friday-3pm', time: 'Friday 3 PM', position: 0, citation: '188:0.1' },
      { id: 'friday-430pm', time: '4:30 PM', position: 1, citation: '187:6.1' },
      { id: 'saturday-midnight', time: 'Saturday Midnight', position: 2, citation: '189:0.2' },
      { id: 'sunday-245am', time: 'Sunday 2:45 AM', position: 3, citation: '189:1.1' },
      { id: 'sunday-302am', time: '3:02 AM', position: 4, citation: '189:1.1' },
      { id: 'sunday-310am', time: '3:10 AM', position: 5, citation: '189:2.1' },
      { id: 'sunday-330am', time: '~3:30 AM', position: 6, citation: '189:4.1' },
      { id: 'sunday-430am', time: '4:30 AM', position: 7, citation: '189:3.2' },
    ],

    // All events (timed and untimed)
    events: [
      // Friday 3 PM - Death on Cross
      {
        id: 'death-on-cross',
        timeId: 'friday-3pm',
        label: 'Death on Cross',
        citation: '187:5.5',
        quote: '"It was just before three o\'clock when Jesus, with a loud voice, cried out, "It is finished! Father, into your hands I commend my spirit." And when he had thus spoken, he bowed his head and gave up the life struggle. When the Roman centurion saw how Jesus died, he smote his breast and said: "This was indeed a righteous man; truly he must have been a Son of God."',
        keepTimeLit: 'friday-3pm',
        isTimed: true
      },
      // Untimed Friday events
      {
        id: 'joseph-granted-body',
        timeId: null,
        label: 'Joseph Granted Body',
        citation: '187:6.1',
        quote: '"When Joseph and Nicodemus arrived at Golgotha, they found the soldiers taking Jesus down from the cross and the representatives of the Sanhedrin standing by... When Joseph presented Pilate\'s order for the Master\'s body to the centurion, the Jews raised a tumult and clamored for its possession."',
        keepTimeLit: 'friday-3pm',
        isTimed: false
      },
      // Friday 4:30 PM - Burial Procession
      {
        id: 'burial-procession',
        timeId: 'friday-430pm',
        label: 'Burial Procession',
        citation: '187:6.2',
        quote: '"At about half past four o\'clock the burial procession of Jesus of Nazareth started from Golgotha for Joseph\'s tomb across the way. The body was wrapped in a linen sheet as the four men carried it, followed by the faithful women watchers from Galilee."',
        keepTimeLit: 'friday-430pm',
        isTimed: true
      },
      {
        id: 'body-embalmed',
        timeId: null,
        label: 'Body Embalmed',
        citation: '187:6.3',
        quote: '"They carried the body into the tomb, a chamber about ten feet square, where they hurriedly prepared it for burial. The Jews did not really bury their dead; they actually embalmed them. Joseph and Nicodemus had brought with them large quantities of myrrh and aloes, and they now wrapped the body with bandages saturated with these solutions."',
        keepTimeLit: 'friday-430pm',
        isTimed: false
      },
      {
        id: 'tomb-sealed',
        timeId: null,
        label: 'Tomb Sealed',
        citation: '187:6.6',
        quote: '"These men rolled yet another stone before the tomb and set the seal of Pilate on and around these stones, lest they be disturbed without their knowledge. And these twenty men remained on watch up to the hour of the resurrection."',
        keepTimeLit: 'friday-430pm',
        isTimed: false
      },

      // Saturday Midnight - Adjuster Declaration
      {
        id: 'the-36-hours',
        timeId: 'saturday-midnight',
        label: 'The 36 Hours',
        citation: '188:0.1',
        quote: '"THE day and a half that Jesus\' mortal body lay in the tomb of Joseph, the period between his death on the cross and his resurrection, is a chapter in the earth career of Michael which is little known to us. We can narrate the burial of the Son of Man and put in this record the events associated with his resurrection, but we cannot supply much information of an authentic nature about what really transpired during this epoch of about thirty-six hours, from three o\'clock Friday afternoon to three o\'clock Sunday morning."',
        keepTimeLit: 'saturday-midnight',
        isTimed: true
      },
      {
        id: 'adjuster-declaration',
        timeId: null,
        label: 'Adjuster Declaration',
        citation: '189:0.2',
        quote: '"Not one of you can do aught to assist your Creator-father in the return to life. As a mortal of the realm he has experienced mortal death; as the Sovereign of a universe he still lives. That which you observe is the mortal transit of Jesus of Nazareth from life in the flesh to life in the morontia."',
        keepTimeLit: 'saturday-midnight',
        isTimed: false
      },
      {
        id: 'creator-prerogatives',
        timeId: null,
        label: 'Creator Prerogatives',
        citation: '189:0.2',
        quote: '"A Creator Son has within himself the power to bestow himself in the likeness of any of his created sons; he has within himself the power to lay down his observable life and to take it up again; and he has this power because of the direct command of the Paradise Father, and I know whereof I speak."',
        keepTimeLit: 'saturday-midnight',
        isTimed: false
      },

      // Sunday 2:45 AM - Paradise Personalities
      {
        id: 'paradise-personalities',
        timeId: 'sunday-245am',
        label: 'Paradise Personalities Arrive',
        citation: '189:1.1',
        quote: '"Just before a quarter to three this Sunday morning, as the first streaks of day began to appear in the east, five of the women started out for the tomb of Jesus. They had prepared an abundance of special embalming lotions, and they carried many linen bandages with them. It was their purpose more thoroughly to give the body of Jesus its death anointing and more carefully to wrap it up with the new bandages. The women who went on this mission of anointing Jesus\' body were: Mary Magdalene, Mary the mother of the Alpheus twins, Salome the mother of the Zebedee brothers, Joanna the wife of Chuza, and Susanna the daughter of Ezra of Alexandria. It was about half past three o\'clock when the five women, laden with their ointments, arrived before the empty tomb."',
        keepTimeLit: 'sunday-245am',
        isTimed: true
      },
      {
        id: 'deployed',
        timeId: null,
        label: 'Deployed Around Tomb',
        citation: '189:1.1',
        quote: '"These beings from Paradise took positions around the sepulchre. Their purpose remained undisclosed to all other universe personalities present."',
        keepTimeLit: 'sunday-245am',
        isTimed: false
      },
      {
        id: 'vibrations',
        timeId: null,
        label: 'Vibrations Begin (~2:47)',
        citation: '189:1.1',
        quote: '"At two minutes to three o\'clock, intense vibrations of commingled material and morontia activities began to issue from Joseph\'s new tomb."',
        keepTimeLit: 'sunday-245am',
        isTimed: false
      },

      // Sunday 3:02 AM - Morontia Resurrection
      {
        id: 'morontia-resurrection',
        timeId: 'sunday-302am',
        label: 'Morontia Resurrection',
        citation: '189:1.1',
        quote: '"At two minutes past three o\'clock, the resurrected morontia form and personality of Jesus of Nazareth came forth from the tomb."',
        keepTimeLit: 'sunday-302am',
        isTimed: true
      },
      {
        id: 'body-remains',
        timeId: null,
        label: 'Physical Body Remains',
        citation: '189:1.2',
        quote: '"The physical body still lay there in the sepulchre niche, undisturbed and wrapped in the linen sheet, just as it had been laid to rest by Joseph and his associates on Friday afternoon."',
        keepTimeLit: 'sunday-302am',
        isTimed: false
      },

      // Sunday 3:10 AM - Accelerated Time Operations
      {
        id: 'archangel-request',
        timeId: 'sunday-310am',
        label: 'Archangel\'s Request',
        citation: '189:2.1',
        quote: '"We may not participate in the morontia resurrection of the bestowal experience of Michael our sovereign, but we would have his mortal remains put in our custody for immediate dissolution."',
        keepTimeLit: 'sunday-310am',
        isTimed: true
      },
      {
        id: 'accelerated-time',
        timeId: null,
        label: 'Accelerated Time Process',
        citation: '189:2.1',
        quote: '"We do not propose to employ our technique of dematerialization; we merely wish to invoke the process of accelerated time."',
        keepTimeLit: 'sunday-310am',
        isTimed: false
      },
      {
        id: 'gabriel-authorizes',
        timeId: null,
        label: 'Gabriel Authorizes',
        citation: '189:2.1',
        quote: '"Gabriel conferred with the senior Most High of Edentia, who was present for these events. After this consultation, Gabriel granted the requested authorization."',
        keepTimeLit: 'sunday-310am',
        isTimed: false
      },
      {
        id: 'mpc-summoned',
        timeId: null,
        label: 'Master Physical Controllers Summoned',
        citation: '189:2.3',
        quote: '"The chief of archangels summoned to his assistance many of his fellows, together with a numerous host of the representatives of all orders of celestial personalities, and then, with the aid of the Urantia midwayers, they proceeded to take possession of Jesus\' physical body."',
        keepTimeLit: 'sunday-310am',
        isTimed: false
      },
      {
        id: 'stone-removed',
        timeId: null,
        label: 'Stone Removed',
        citation: '189:2.4',
        quote: '"This huge stone began slowly to roll away from the entrance of the tomb without any visible means to account for such motion."',
        keepTimeLit: 'sunday-310am',
        isTimed: false
      },
      {
        id: 'guards-flee',
        timeId: null,
        label: 'Guards Flee',
        citation: '189:2.4',
        quote: '"The Jewish guards fled to their homes, later reporting to their captain at the temple. The Roman soldiers fled to the fortress of Antonia, reporting to the centurion as soon as he came on duty."',
        keepTimeLit: 'sunday-310am',
        isTimed: false
      },
      {
        id: 'dissolution',
        timeId: null,
        label: 'Instant Dissolution',
        citation: '189:2.8',
        quote: '"The mortal remains of Jesus underwent the same natural process of elemental disintegration as characterizes all human bodies on earth except that, in point of time, this natural mode of dissolution was greatly accelerated, hastened to that point where it became well-nigh instantaneous."',
        keepTimeLit: 'sunday-310am',
        isTimed: false
      },

      // Sunday 3:30 AM - Women Approach
      {
        id: 'women-approach',
        timeId: 'sunday-330am',
        label: 'Women Approach Tomb',
        citation: '189:4.1',
        quote: '"At half past three o\'clock this Sunday morning, five women started out for the tomb of Jesus carrying embalming lotions."',
        keepTimeLit: 'sunday-330am',
        isTimed: true
      },
      {
        id: 'mary-enters',
        timeId: null,
        label: 'Mary Enters Empty Tomb',
        citation: '189:4.6',
        quote: '"In the recess of stone where they had laid Jesus, Mary saw only the folded napkin where his head had rested and the bandages wherewith he had been wrapped lying intact and as they had rested on the stone before the celestial hosts removed the body."',
        keepTimeLit: 'sunday-330am',
        isTimed: false
      },

      // Sunday 4:30 AM - Archangel Circuit
      {
        id: 'archangel-circuit',
        timeId: 'sunday-430am',
        label: 'Archangel Circuit Activation',
        citation: '189:3.2',
        quote: '"The circuit of the archangels then operated for the first time from Urantia."',
        keepTimeLit: 'sunday-430am',
        isTimed: true
      },
      {
        id: 'first-operation',
        timeId: null,
        label: 'First Universe Communication',
        citation: '189:3.2',
        quote: '"Gabriel and the archangels had been on Urantia since the crucifixion of Jesus for the purpose of supervising the terminal transactions of the bestowal. On this Sunday morning they flashed to the universe rulers the announcement that Jesus had risen from the tomb."',
        keepTimeLit: 'sunday-430am',
        isTimed: false
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

  // Get events for a specific time position (for spacing)
  const getEventsForTimePosition = (timeId) => {
    return timelineData.events.filter(event =>
      event.timeId === timeId || event.keepTimeLit === timeId
    )
  }

  return (
    <div className="min-h-screen flex bg-light-bg dark:bg-dark-bg text-text-light dark:text-text-dark"
         style={{ aspectRatio: '16/9' }}>

      {/* Left Side - Vertical Timeline (25% width) */}
      <div className="w-1/4 flex flex-col border-r border-light-border dark:border-dark-border">
        {/* Timeline Title */}
        <header className="py-6 px-4 border-b border-light-border dark:border-dark-border">
          <h1 className="text-xl font-bold">{timelineData.title}</h1>
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
            {timelineData.subtitle}
          </p>
        </header>

        {/* Vertical Timeline */}
        <div className="flex-1 p-6 relative overflow-y-auto">
          {/* Vertical timeline line */}
          <div className="absolute left-24 top-6 bottom-6 w-0.5 bg-light-border dark:bg-dark-border"></div>

          {/* Timeline scale and events */}
          <div className="relative" style={{ minHeight: '600px' }}>
            {timelineData.majorTimes.map((time) => {
              const litTimeId = getLitTimeId()
              const isLit = time.id === litTimeId
              const events = getEventsForTimePosition(time.id)
              const position = (time.position / 7) * 100 // 7 is max position

              return (
                <div
                  key={time.id}
                  className="absolute left-0 flex items-start"
                  style={{ top: `${position}%` }}
                >
                  {/* Time label on left */}
                  <div className="w-20 text-right pr-2 text-xs font-semibold leading-tight"
                       style={{
                         color: isLit ? '#22c55e' : '#64748b',
                         transition: 'color 0.2s'
                       }}>
                    {time.time}
                  </div>

                  {/* Tick mark on vertical line */}
                  <div
                    className="w-3 h-0.5 mt-1.5"
                    style={{
                      backgroundColor: isLit ? '#22c55e' : '#64748b',
                      transition: 'background-color 0.2s'
                    }}
                  />

                  {/* Event labels on right of line */}
                  <div className="ml-4 space-y-0.5">
                    {events.map((event) => {
                      const isSelected = selectedEvent?.id === event.id
                      const isAssociated = event.keepTimeLit === litTimeId

                      return (
                        <button
                          key={event.id}
                          onClick={() => handleEventClick(event)}
                          className="block text-left text-xs transition-colors hover:underline cursor-pointer leading-tight"
                          style={{
                            color: isSelected || isAssociated ? '#22c55e' : '#64748b',
                            fontWeight: isSelected ? 600 : event.isTimed ? 600 : 400
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

        {/* Instructions */}
        <div className="p-4 border-t border-light-border dark:border-dark-border text-xs text-text-muted-light dark:text-text-muted-dark">
          Click events to view quotes
        </div>
      </div>

      {/* Right Side - Content Area (75% width) */}
      <div className="flex-1 flex flex-col">
        {selectedEvent ? (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="max-w-4xl w-full">
              {/* Quote Display */}
              <div className="bg-light-card dark:bg-dark-card border-2 border-light-border dark:border-dark-border rounded-lg p-8 shadow-lg relative">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-2xl text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark"
                  aria-label="Close"
                >
                  ×
                </button>

                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <h3 className="text-xl font-semibold mb-4 text-text-light dark:text-text-dark">
                    {selectedEvent.label}
                  </h3>
                  <blockquote className="border-l-4 border-[#3B82C8] dark:border-[#60A5FA] pl-6 italic text-lg text-text-light dark:text-text-dark leading-relaxed">
                    {selectedEvent.quote}
                  </blockquote>
                  <p className="text-right mt-4 text-[#3B82C8] dark:text-[#60A5FA] font-semibold">
                    — The Urantia Book {selectedEvent.citation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center text-text-muted-light dark:text-text-muted-dark p-8">
            <div>
              <div className="text-6xl mb-6">⏰</div>
              <h2 className="text-3xl font-semibold mb-4">Tomb Operations Timeline</h2>
              <p className="text-xl max-w-2xl mx-auto leading-relaxed">
                Click any event on the timeline to explore the revelators' account
              </p>
              <p className="text-lg mt-4 max-w-2xl mx-auto">
                From Jesus' death at 3 PM Friday through the archangel circuit activation at 4:30 AM Sunday
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
