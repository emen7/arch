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
        content="A study of Master Physical Controllers and a case study examining how they use thought to control matter. This investigation draws from the Urantia Book as a revelation database, using the revelators' own words to tell the story."
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
        content="The Master Physical Controllers are the direct offspring of the Supreme Power Centers, and their numbers include the following: Mechanical Controllers, Energy Controllers, Energy Transformers, Energy Transmitters, Primary Associators, Secondary Dissociators, and the Frandalanks."
        citation="29:4.13"
      />
    ),

    // Slide 4: MPC Nature
    () => (
      <TextSlide
        title="Physical Controllers"
        content="These beings are the mobile subordinates of the Supreme Power Centers. The physical controllers are endowed with capabilities of energy metamorphosis which enable them to engage in a remarkable variety of physical activities."
        citation="29:4.14"
      />
    ),

    // Slide 5: Mechanical Controllers
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
        note="From Paper 29:4.19 - These mighty beings have much to do with the segregation, directionization, and intensification of the physical energies."
      />
    ),

    // Slide 6: Sample - More slides to be added
    () => (
      <TextSlide
        title="Work in Progress"
        content="This is a sample presentation framework. Additional slides for Frandalanks, Chronoldeks, tomb operations, and the Shroud sequence will be added as content is developed."
        bullets={[
          'Interactive MPC infographic',
          'Tomb operations narrative',
          'Being profile slides',
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
