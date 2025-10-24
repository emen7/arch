'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import LectionaryHeader from '../../../components/LectionaryHeader'
import ReadAloud from '../../../components/ReadAloud'

export default function LectionaryReading({ params }) {
  const [reading, setReading] = useState(null)
  const [index, setIndex] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const resolvedParams = await Promise.resolve(params)
      const slug = resolvedParams.slug

      // Fetch reading data and index
      const [readingResponse, indexResponse] = await Promise.all([
        fetch(`/lectionary/data/${slug}.json`),
        fetch(`/lectionary/data/index.json`)
      ])

      const readingData = await readingResponse.json()
      const indexData = await indexResponse.json()

      setReading(readingData)
      setIndex(indexData)
    }

    loadData()
  }, [params])

  if (!reading) {
    return (
      <>
        <LectionaryHeader />
        <main className="container mx-auto px-4 py-8 max-w-[65ch]">
          <p className="text-text-muted-light dark:text-text-muted-dark">Loading...</p>
        </main>
      </>
    )
  }

  // Find prev/next readings
  const currentIndex = index.findIndex(r => r.slug === reading.slug)
  const prevReading = currentIndex > 0 ? index[currentIndex - 1] : null
  const nextReading = currentIndex < index.length - 1 ? index[currentIndex + 1] : null

  return (
    <>
      {/* Fixed Header + Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <LectionaryHeader title={reading.title} />

        {/* Navigation Bar */}
        <nav className="bg-[#F5F7FA] dark:bg-[#2D3748] border-b-2 border-[#E2E8F0] dark:border-[#4A5568] shadow-sm">
        <div className="container mx-auto px-4 py-3 max-w-5xl">
          <div className="flex items-center justify-between flex-wrap gap-3">
            {/* Prev/Next Navigation */}
            <div className="flex items-center gap-4 text-sm">
              {prevReading ? (
                <Link
                  href={`/lectionary/${prevReading.slug}`}
                  className="text-[#4A90E2] hover:text-[#6CB4E8] hover:underline font-medium"
                >
                  ← Previous
                </Link>
              ) : (
                <span className="text-text-muted-light dark:text-text-muted-dark opacity-50">
                  ← Previous
                </span>
              )}

              {nextReading ? (
                <Link
                  href={`/lectionary/${nextReading.slug}`}
                  className="text-[#4A90E2] hover:text-[#6CB4E8] hover:underline font-medium"
                >
                  Next →
                </Link>
              ) : (
                <span className="text-text-muted-light dark:text-text-muted-dark opacity-50">
                  Next →
                </span>
              )}
            </div>

            {/* Quick Jump Links & TTS */}
            <div className="flex items-center gap-4 text-sm">
              <a href="#" className="text-[#4A90E2] hover:text-[#6CB4E8] hover:underline font-medium">
                Top
              </a>
              <a href="#first-reading" className="text-[#4A90E2] hover:text-[#6CB4E8] hover:underline font-medium hidden sm:inline">
                Reading 1
              </a>
              <a href="#psalm" className="text-[#4A90E2] hover:text-[#6CB4E8] hover:underline font-medium hidden sm:inline">
                Psalm
              </a>
              <a href="#second-reading" className="text-[#4A90E2] hover:text-[#6CB4E8] hover:underline font-medium hidden sm:inline">
                Reading 2
              </a>
              <a href="#gospel" className="text-[#4A90E2] hover:text-[#6CB4E8] hover:underline font-medium hidden sm:inline">
                Gospel
              </a>

              {/* TTS - Always visible */}
              <div className="ml-auto sm:ml-0">
                <ReadAloud />
              </div>
            </div>
          </div>
        </div>
        </nav>
      </div>

      <main className="container mx-auto px-4 pt-40 pb-8 max-w-[65ch]">
        <article className="font-serif">
          {/* Hero Image - Show placeholder or actual image */}
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg bg-[#F5F7FA] dark:bg-[#2D3748] border-2 border-[#E2E8F0] dark:border-[#4A5568]">
            {reading.heroImage && reading.heroImage.src ? (
              <img
                src={reading.heroImage.src}
                alt={reading.title}
                className="w-full h-auto"
              />
            ) : (
              <div className="w-full aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-[#E2E8F0] to-[#E2E8F0] dark:from-[#2D3748] dark:to-[#1e1a15]">
                <div className="text-center px-6">
                  <svg className="w-24 h-24 mx-auto mb-4 text-[#4A90E2] dark:text-[#8b4513] opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark italic">
                    Artwork placeholder
                  </p>
                </div>
              </div>
            )}

            {/* Caption - shown for both placeholder and actual image */}
            {(reading.theme || reading.heroImage?.caption) && (
              <div className="bg-[#F5F7FA] dark:bg-[#2D3748] px-6 py-4 text-center border-t-2 border-[#E2E8F0] dark:border-[#4A5568]">
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark italic">
                  {reading.heroImage?.caption || reading.theme}
                </p>
              </div>
            )}
          </div>

          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-3 text-[#1e2f48] dark:text-[#E2E8F0]">
              {reading.title}
            </h1>
            <p className="text-lg text-[#4A90E2] mb-2">
              {reading.date}
            </p>
            {reading.theme && (
              <p className="text-xl italic text-text-muted-light dark:text-text-muted-dark mt-4">
                {reading.theme}
              </p>
            )}
          </header>

          {/* Sections */}
          <div id="report-content" className="space-y-8 lectionary-content">
            {reading.sections.map((section, idx) => {
              // Skip "Replaced" sections
              if (section.heading && /^Replaced/i.test(section.heading)) {
                return null
              }

              const sectionId =
                section.type === 'first-reading' ? 'first-reading' :
                section.type === 'psalm' ? 'psalm' :
                section.type === 'second-reading' ? 'second-reading' :
                section.type === 'gospel' ? 'gospel' :
                null

              return (
                <section
                  key={idx}
                  id={sectionId}
                  className="scroll-mt-32 bg-white dark:bg-[#1e2126] rounded-lg p-8 shadow-md border-2 border-[#E2E8F0] dark:border-[#4A5568]"
                >
                  {/* Section Heading */}
                  <h2 className="text-2xl font-bold mb-2 text-[#4A90E2] border-b-2 border-[#E2E8F0] dark:border-[#4A5568] pb-2">
                    {section.heading || (section.type === 'intro-reflection' ? 'Introductory Reflection' : '')}
                  </h2>

                  {/* Citation */}
                  {section.citation && (
                    <p className="text-sm italic text-text-muted-light dark:text-text-muted-dark mb-4">
                      {section.citation}
                    </p>
                  )}

                  {/* Psalm Response */}
                  {section.type === 'psalm' && section.response && (
                    <div className="bg-[#F5F7FA] dark:bg-[#2D3748] border-l-4 border-[#4A90E2] px-4 py-3 mb-4 rounded">
                      <p className="font-bold text-[#4A90E2]">
                        R. {section.response}
                      </p>
                    </div>
                  )}

                  {/* Content */}
                  <div className="space-y-4">
                    {section.type === 'psalm' ? (
                      // Psalm verses
                      section.verses.map((verse, vIdx) => (
                        <div
                          key={vIdx}
                          dangerouslySetInnerHTML={{ __html: verse }}
                          className="text-text-light dark:text-text-dark [&_strong]:text-[#4A90E2] [&_strong]:font-bold"
                        />
                      ))
                    ) : (
                      // Regular content
                      section.content.map((paragraph, pIdx) => (
                        <div
                          key={pIdx}
                          dangerouslySetInnerHTML={{ __html: paragraph }}
                          className="text-text-light dark:text-text-dark [&_strong]:font-semibold [&_em]:italic [&_a]:text-[#2C5F8D] [&_a]:hover:underline"
                        />
                      ))
                    )}
                  </div>

                  {/* Reflection */}
                  {section.reflection && (
                    <div className="mt-6 bg-[#f0f4f8] dark:bg-[#1a1d23] border-l-4 border-[#2C5F8D] px-6 py-4 rounded">
                      <h3 className="text-lg font-semibold text-[#2C5F8D] mb-2">
                        Reflection
                      </h3>
                      <div
                        dangerouslySetInnerHTML={{ __html: section.reflection }}
                        className="text-text-light dark:text-text-dark italic [&_p]:mb-2"
                      />
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        </article>
      </main>
    </>
  )
}
