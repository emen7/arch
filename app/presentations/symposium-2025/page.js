'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import SlideDeck from '../../../components/SlideDeck'
import TitleSlide from '../../../components/slides/TitleSlide'
import TextSlide from '../../../components/slides/TextSlide'
import BeingInfoSlide from '../../../components/slides/BeingInfoSlide'

function PresentationContent() {
  const searchParams = useSearchParams()
  const autoPlay = searchParams.get('autoplay') === 'true'
  const [timingData, setTimingData] = useState(null)

  // Load timing data
  useEffect(() => {
    if (autoPlay) {
      fetch('/presentations/symposium-2025/timing.json')
        .then(res => res.json())
        .then(data => setTimingData(data))
        .catch(err => console.error('Failed to load timing data:', err))
    }
  }, [autoPlay])

  // Define slides
  const slides = [
    // Slide 1: Title
    () => (
      <TitleSlide
        title="Accelerated Time of the Tomb"
        subtitle="Master Physical Controllers and the Tomb Operations"
        event="Urantia Science Symposium IV 2025"
        date="David Neufer"
      />
    ),

    // Slide 2: Introduction
    () => (
      <TextSlide
        title="What We Will Present"
        content="Today we present an exploration of Master Physical Controllers and a case study examining how they use thought to control matter. This exploration draws from the Urantia Book as a revelation database, using the revelators' own words to tell the story."
      />
    ),

    // Slide 3: MPC Title (with pause)
    () => (
      <TextSlide
        title="Master Physical Controllers"
      />
    ),

    // Slide 4: MPC Overview
    () => (
      <TextSlide
        title="Master Physical Controllers"
        content={`"The Master Physical Controllers are the direct offspring of the Supreme Power Centers, and their numbers include the following:"`}
        citation="29:4.4"
      />
    ),

    // Slide 5: MPC Nature
    () => (
      <TextSlide
        title="Physical Controllers"
        content={`"These beings are the mobile subordinates of the Supreme Power Centers. The physical controllers are endowed with capabilities of energy metamorphosis which enable them to engage in a remarkable variety of physical activities."`}
        citation="29:4.1"
      />
    ),

    // Slide 6: Mechanical Controllers
    () => (
      <BeingInfoSlide
        name="Mechanical Controllers"
        classification="Master Physical Controllers - Class 1"
        characteristics={[
          'Direct offspring of Supreme Power Centers',
          'Mobile subordinates with autonomy',
          'Stationed throughout superuniverses',
          'Work in liaison with Power Centers'
        ]}
        capabilities={[
          'Directionize flow of energy',
          'Facilitate energy concentration',
          'Create specialized circuits',
          'Equalize interplanetary pressures',
          'Segregate and intensify physical energies'
        ]}
        note={`"The mechanical controllers are competent to directionize the flow of energy and to facilitate its concentration into the specialized currents or circuits. These mighty beings have much to do with the segregation, directionization, and intensification of the physical energies and with the equalization of the pressures of the interplanetary circuits."`}
        citation="29:4.20"
      />
    ),

    // Slide 7: Frandalanks
    () => (
      <TextSlide
        title="The Frandalanks"
        content={`"7. <i>The Frandalanks.</i> These beings are the joint creation of all three orders of energy-control beings: the primary and secondary force organizers and the power directors."`}
        citation="29:4.36"
      />
    ),

    // Slide 8: Chronoldeks
    () => (
      <TextSlide
        title="Chronoldeks"
        content={`"The frandalanks that register time in addition to quantitative and qualitative energy presence are called <i>chronoldeks.</i>"`}
        citation="29:4.37"
      />
    ),

    // Slide 9: Transition to Tomb
    () => (
      <TextSlide
        title="A Case Study"
        content="Having learned the nature and capabilities of the Master Physical Controllers, we now turn to a specific application: the tomb operations following the crucifixion of Jesus."
      />
    ),

    // Slide 10: Tomb Commission
    () => (
      <TextSlide
        title="The Tomb Operations"
        content={`"At two forty-five Sunday morning, the Paradise incarnation commission, consisting of seven unidentified Paradise personalities, arrived on the scene and deployed themselves about the tomb. At ten minutes before three, intense vibrations of commingled material and morontia activities began to issue from Joseph's new tomb."`}
        citation="189:1.1"
      />
    ),

    // Slide 11: Sample - More slides to be added
    () => (
      <TextSlide
        title="Work in Progress"
        content="This is a sample presentation framework. Additional slides for the Shroud sequence and interactive infographics will be added as content is developed."
        bullets={[
          'Interactive MPC infographic',
          'Tomb operations narrative',
          'Shroud image sequence',
          'Conclusion'
        ]}
      />
    ),
  ]

  return (
    <SlideDeck
      slides={slides}
      autoPlay={autoPlay}
      timingData={autoPlay ? timingData : null}
    />
  )
}

export default function SymposiumPresentation() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading presentation...</div>}>
      <PresentationContent />
    </Suspense>
  )
}
