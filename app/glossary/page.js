'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      // Collapse navigation after selecting a letter
      setIsNavExpanded(false)
    }
  }

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Alphabet Navigation - positioned right below header with proper spacing */}
      <div className="sticky top-0 z-40 bg-light-bg dark:bg-dark-bg pt-[65px]">
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
              className="w-full py-2 text-sm text-text-light dark:text-text-dark hover:text-black dark:hover:text-white transition-colors text-left flex gap-2"
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
          <h1 className="text-3xl font-bold mb-3 text-text-light dark:text-text-dark">
            Glossary
          </h1>
          <p className="text-xl text-text-muted-light dark:text-text-muted-dark italic">
            Definitions and Concept Guide
          </p>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none
                        prose-headings:text-text-light dark:prose-headings:text-text-dark
                        prose-p:text-text-light dark:prose-p:text-text-dark
                        prose-a:text-text-light dark:prose-a:text-text-dark prose-a:underline hover:prose-a:text-black dark:hover:prose-a:text-white
                        prose-strong:text-text-light dark:prose-strong:text-text-dark
                        prose-li:text-text-light dark:prose-li:text-text-dark
                        prose-blockquote:text-text-muted-light dark:prose-blockquote:text-text-muted-dark
                        prose-blockquote:border-l-4 prose-blockquote:border-light-border dark:prose-blockquote:border-dark-border
                        prose-code:text-text-light dark:prose-code:text-text-dark
                        [&_p]:mb-4 [&_p]:leading-relaxed
                        prose-h2:scroll-mt-[105px]">
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
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  )
}
