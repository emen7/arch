'use client'

import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function GlossaryPage() {
  const [content, setContent] = useState('')
  const [activeLetters, setActiveLetters] = useState([])
  const [isNavExpanded, setIsNavExpanded] = useState(true)

  useEffect(() => {
    // Fetch the markdown content
    fetch('/docs/glossary-formatted.md')
      .then(res => res.text())
      .then(text => {
        setContent(text)
        // Extract active letters from markdown headings
        const letters = text.match(/^## [A-Z]$/gm)?.map(h => h.slice(3)) || []
        setActiveLetters(letters)
      })
  }, [])

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const scrollToLetter = (letter) => {
    const element = document.getElementById(letter)
    if (!element) return

    // If navigation is expanded, collapse it first
    if (isNavExpanded) {
      setIsNavExpanded(false)
      // Wait for collapse to complete before scrolling
      setTimeout(() => {
        performScroll(letter)
      }, 100)
    } else {
      // Already collapsed, scroll immediately
      performScroll(letter)
    }
  }

  const performScroll = (letter) => {
    const element = document.getElementById(letter)
    if (!element) return

    const stickyBar = document.querySelector('[data-alphabet-sticky]')
    const stickyBarHeight = stickyBar ? stickyBar.offsetHeight : 60

    // Header height (57px) + collapsed nav height + buffer
    const headerHeight = 57
    const offset = headerHeight + stickyBarHeight + 10

    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }


  return (
    <>
      <Header />

      <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
        {/* Alphabet Navigation - positioned right below header */}
        <div data-alphabet-sticky className="sticky top-[57px] z-40 bg-light-bg dark:bg-dark-bg pb-1">
          <div className="container mx-auto px-4 max-w-[65ch] border-b border-light-border dark:border-dark-border">
          {isNavExpanded ? (
            // Expanded view - full alphabet
            <div className="py-3">
              <div className="flex flex-wrap gap-2 justify-start">
                {alphabet.map(letter => (
                  <button
                    key={letter}
                    onClick={() => scrollToLetter(letter)}
                    disabled={!activeLetters.includes(letter)}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${
                      activeLetters.includes(letter)
                        ? 'text-text-light dark:text-text-dark hover:bg-light-card dark:hover:bg-dark-card cursor-pointer'
                        : 'text-text-muted-light dark:text-text-muted-dark opacity-40 cursor-not-allowed'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            // Collapsed view - A B C toggle
            <button
              onClick={() => setIsNavExpanded(true)}
              className="w-full py-3 text-sm text-text-light dark:text-text-dark hover:text-black dark:hover:text-white transition-colors text-left flex gap-2 items-center"
            >
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 py-8 max-w-[65ch]">
        <header className="mb-12 pb-8 border-b border-light-border dark:border-dark-border">
          <h1 className="text-3xl font-bold mb-2 text-text-light dark:text-text-dark">
            Glossary & Concept Guide
          </h1>
          <p className="text-xl font-semibold text-text-light dark:text-text-dark mb-3">
            For: Accelerated Time of the Tomb
          </p>
          <p className="text-base text-text-muted-light dark:text-text-muted-dark">
            This reference tool describes technical terms and processes from the Urantia Papers relevant to the hypothesized tomb dissolution operations.
          </p>
          <p className="mt-3">
            <a
              href="#revision-history"
              className="inline-block px-3 py-1 text-sm font-semibold bg-light-border dark:bg-dark-border text-text-light dark:text-text-dark rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Change Log
            </a>
          </p>
        </header>

        <div className="glossary-content prose prose-lg dark:prose-invert max-w-none
                        prose-headings:text-text-light dark:prose-headings:text-text-dark
                        prose-p:text-text-light dark:prose-p:text-text-dark
                        prose-a:text-text-light dark:prose-a:text-text-dark prose-a:underline hover:prose-a:text-black dark:hover:prose-a:text-white
                        prose-strong:text-text-light dark:prose-strong:text-text-dark
                        prose-li:text-text-light dark:prose-li:text-text-dark
                        prose-blockquote:text-text-muted-light dark:prose-blockquote:text-text-muted-dark
                        prose-blockquote:border-l-4 prose-blockquote:border-[#3B82C8] dark:prose-blockquote:border-[#60A5FA]
                        prose-blockquote:pl-4 prose-blockquote:my-4 prose-blockquote:italic prose-blockquote:bg-[#F8FBFF] dark:prose-blockquote:bg-[#1E2126]
                        prose-code:text-text-light dark:prose-code:text-text-dark
                        [&_p]:mb-4 [&_p]:leading-relaxed
                        prose-h2:scroll-mt-[120px]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ node, children, ...props }) => {
                // Extract the letter for ID
                const letter = children?.toString().trim()
                return (
                  <h2 id={letter} {...props}>
                    {children}
                  </h2>
                )
              },
              strong: ({ node, children, ...props }) => {
                // Check if this strong element contains (H)
                const text = children?.toString() || ''
                if (text.startsWith('(H) ')) {
                  return (
                    <strong {...props}>
                      <span className="text-green-700 dark:text-green-400">(H)</span> {text.slice(4)}
                    </strong>
                  )
                }
                return <strong {...props}>{children}</strong>
              },
              blockquote: ({ node, children, ...props }) => {
                return (
                  <blockquote
                    className="border-l-4 border-[#3B82C8] dark:border-[#60A5FA] pl-4 my-4 italic bg-[#F8FBFF] dark:bg-[#1E2126] text-text-muted-light dark:text-text-muted-dark"
                    {...props}
                  >
                    {children}
                  </blockquote>
                )
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>

        {/* Scroll to Top Link */}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="text-sm text-[#3B82C8] dark:text-[#60A5FA] hover:underline"
          >
            Scroll Top
          </a>
        </div>

        {/* Document Changelog */}
        <div id="revision-history" className="mt-12 pt-8 border-t-2 border-light-border dark:border-dark-border text-sm text-text-muted-light dark:text-text-muted-dark">
          <p className="font-semibold mb-3">Document Revision History</p>
          <ol className="list-decimal ml-6 space-y-2">
            <li>
              <strong>October 23, 2025:</strong> Content refinement and format alterations.
            </li>
            <li>
              <strong>October 21, 2025 at 10:50 PM:</strong> Complete revision. Removed hypothetical elements and refined concept descriptions.
            </li>
          </ol>
        </div>
      </article>
      <Footer />
      </div>
    </>
  )
}
