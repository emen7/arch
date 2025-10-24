'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../../components/Header'
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
        <Header />
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
      <Header title={reading.title} />

      {/* Sticky Navigation Bar */}
      <nav className="sticky top-[57px] z-40 bg-[#f5ebdf] dark:bg-[#2a2520] border-b-2 border-[#d4c5b9] dark:border-[#4a3f35] shadow-sm">
        <div className="container mx-auto px-4 py-3 max-w-5xl">
          <div className="flex items-center justify-between flex-wrap gap-3">
            {/* Prev/Next Navigation */}
            <div className="flex items-center gap-3">
              {prevReading ? (
                <Link
                  href={`/lectionary/${prevReading.slug}`}
                  className="px-4 py-2 bg-[#87b4c8] hover:bg-[#6a9bb3] text-white rounded transition-colors text-sm font-medium"
                >
                  ← Previous Week
                </Link>
              ) : (
                <div className="px-4 py-2 bg-[#d4c5b9] dark:bg-[#4a3f35] text-text-muted-light dark:text-text-muted-dark rounded text-sm font-medium opacity-50">
                  ← Previous Week
                </div>
              )}

              {nextReading ? (
                <Link
                  href={`/lectionary/${nextReading.slug}`}
                  className="px-4 py-2 bg-[#87b4c8] hover:bg-[#6a9bb3] text-white rounded transition-colors text-sm font-medium"
                >
                  Next Week →
                </Link>
              ) : (
                <div className="px-4 py-2 bg-[#d4c5b9] dark:bg-[#4a3f35] text-text-muted-light dark:text-text-muted-dark rounded text-sm font-medium opacity-50">
                  Next Week →
                </div>
              )}
            </div>

            {/* Quick Jump Links */}
            <div className="flex items-center gap-4 text-sm">
              <a href="#first-reading" className="text-[#87b4c8] hover:text-[#6a9bb3] hover:underline font-medium">
                Reading 1
              </a>
              <a href="#psalm" className="text-[#87b4c8] hover:text-[#6a9bb3] hover:underline font-medium">
                Psalm
              </a>
              <a href="#second-reading" className="text-[#87b4c8] hover:text-[#6a9bb3] hover:underline font-medium">
                Reading 2
              </a>
              <a href="#gospel" className="text-[#87b4c8] hover:text-[#6a9bb3] hover:underline font-medium">
                Gospel
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <article className="font-serif">
          {/* Back Link */}
          <Link
            href="/lectionary"
            className="inline-block mb-6 text-[#87b4c8] hover:text-[#6a9bb3] hover:underline"
          >
            ← Back to Lectionary
          </Link>

          {/* Hero Image */}
          {reading.heroImage && reading.heroImage.src && (
            <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
              <img
                src={reading.heroImage.src}
                alt={reading.title}
                className="w-full h-auto"
              />
              {reading.heroImage.caption && (
                <div className="bg-[#f5ebdf] dark:bg-[#2a2520] px-6 py-4 text-center border-t-2 border-[#d4c5b9] dark:border-[#4a3f35]">
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark italic">
                    {reading.heroImage.caption}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-3 text-[#1e2f48] dark:text-[#e8dcc9]">
              {reading.title}
            </h1>
            <p className="text-lg text-[#b56d62] mb-2">
              {reading.date}
            </p>
            {reading.theme && (
              <p className="text-xl italic text-text-muted-light dark:text-text-muted-dark mt-4">
                {reading.theme}
              </p>
            )}

            {/* Read Aloud */}
            <div className="mt-6 flex justify-center">
              <ReadAloud />
            </div>
          </header>

          {/* Sections */}
          <div className="space-y-8 lectionary-content">
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
                  className="scroll-mt-32 bg-white dark:bg-[#1e2126] rounded-lg p-8 shadow-md border-2 border-[#d4c5b9] dark:border-[#4a3f35]"
                >
                  {/* Section Heading */}
                  <h2 className="text-2xl font-bold mb-2 text-[#b56d62] border-b-2 border-[#d4c5b9] dark:border-[#4a3f35] pb-2">
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
                    <div className="bg-[#f5ebdf] dark:bg-[#2a2520] border-l-4 border-[#b56d62] px-4 py-3 mb-4 rounded">
                      <p className="font-bold text-[#b56d62]">
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
                          className="text-text-light dark:text-text-dark [&_strong]:text-[#b56d62] [&_strong]:font-bold"
                        />
                      ))
                    ) : (
                      // Regular content
                      section.content.map((paragraph, pIdx) => (
                        <div
                          key={pIdx}
                          dangerouslySetInnerHTML={{ __html: paragraph }}
                          className="text-text-light dark:text-text-dark [&_strong]:font-semibold [&_em]:italic [&_a]:text-[#87b4c8] [&_a]:hover:underline"
                        />
                      ))
                    )}
                  </div>

                  {/* Reflection */}
                  {section.reflection && (
                    <div className="mt-6 bg-[#f0f4f8] dark:bg-[#1a1d23] border-l-4 border-[#87b4c8] px-6 py-4 rounded">
                      <h3 className="text-lg font-semibold text-[#87b4c8] mb-2">
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

          {/* Back to Top */}
          <div className="mt-12 text-center">
            <a
              href="#"
              className="inline-block px-6 py-3 bg-[#87b4c8] hover:bg-[#6a9bb3] text-white rounded transition-colors font-medium"
            >
              ↑ Back to Top
            </a>
          </div>
        </article>
      </main>
    </>
  )
}
