'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Header from '../../../components/Header'

export default function LectionaryReading({ params }) {
  const [reading, setReading] = useState(null)
  const [expandedSections, setExpandedSections] = useState(new Set([1])) // First section expanded by default

  useEffect(() => {
    // Unwrap params promise if needed
    const loadReading = async () => {
      const resolvedParams = await Promise.resolve(params)
      const slug = resolvedParams.slug

      // Fetch the reading data
      const response = await fetch(`/lectionary/data/${slug}.json`)
      const data = await response.json()
      setReading(data)
    }

    loadReading()
  }, [params])

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
  }

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

  return (
    <>
      <Header title={reading.title} />
      <main className="container mx-auto px-4 py-8 max-w-[65ch]">
        <article>
          {/* Back Link */}
          <Link
            href="/lectionary"
            className="inline-block mb-6 text-[#3B82C8] dark:text-[#60A5FA] hover:underline"
          >
            ← Back to Lectionary
          </Link>

          {/* Hero Image */}
          {reading.heroImage && (
            <div className="w-full mb-8 rounded-lg overflow-hidden">
              <img
                src={reading.heroImage}
                alt={reading.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-3 text-text-light dark:text-text-dark">
              {reading.title}
            </h1>
            <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
              {reading.date}
            </p>
          </header>

          {/* Sections - Collapsible */}
          <div className="space-y-4">
            {reading.sections.map((section) => {
              const isExpanded = expandedSections.has(section.id)

              return (
                <div
                  key={section.id}
                  className="border-2 border-light-border dark:border-dark-border rounded-lg overflow-hidden"
                >
                  {/* Section Header - Clickable */}
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-6 py-4 bg-[#F8F9FA] dark:bg-[#25292F] hover:bg-[#E9ECEF] dark:hover:bg-[#343A42] transition-colors text-left flex items-center justify-between"
                  >
                    <h2 className="text-xl font-semibold text-text-light dark:text-text-dark">
                      {section.title}
                    </h2>
                    <span className="text-2xl text-text-muted-light dark:text-text-muted-dark">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>

                  {/* Section Content - Collapsible */}
                  {isExpanded && (
                    <div className="px-6 py-6 bg-light-bg dark:bg-dark-bg">
                      <div className="prose prose-sm sm:prose-base max-w-none
                        prose-p:text-text-light dark:prose-p:text-text-dark
                        prose-p:leading-relaxed
                        prose-strong:text-text-light dark:prose-strong:text-text-dark
                        prose-strong:font-semibold
                        prose-em:text-text-light dark:prose-em:text-text-dark
                        prose-a:text-[#3B82C8] dark:prose-a:text-[#60A5FA]
                        prose-a:no-underline hover:prose-a:underline
                        prose-blockquote:border-l-4
                        prose-blockquote:border-[#3B82C8] dark:prose-blockquote:border-[#60A5FA]
                        prose-blockquote:pl-4
                        prose-blockquote:bg-[#F8FBFF] dark:prose-blockquote:bg-[#1E2126]
                        prose-blockquote:text-text-muted-light dark:prose-blockquote:text-text-muted-dark
                      ">
                        {section.content.map((paragraph, idx) => (
                          <div
                            key={idx}
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                            className="mb-4 last:mb-0"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </article>
      </main>
    </>
  )
}
