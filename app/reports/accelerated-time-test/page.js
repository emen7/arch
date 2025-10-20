import Header from '@/components/Header'
import ReadAloud from '@/components/ReadAloud'
// Temporarily using original to test if timeout is content-specific
import AcceleratedTimeRevised from '../[id]/content/accelerated-time'

export const metadata = {
  title: 'Accelerated Time (REVISED TEST) - Revelationary',
  description: 'Test preview of revised Accelerated Time report'
}

export default function AcceleratedTimeTestPage() {
  // TTS Controls Component for Header
  const ttsControls = (
    <ReadAloud contentId="report-content" />
  )

  return (
    <>
      <Header title="Accelerated Time of the Tomb (REVISED)" ttsControls={ttsControls} />

      <main className="container mx-auto px-4 py-4 max-w-[65ch]">
        <article>
          {/* Report Metadata */}
          <header className="mb-12 pb-8 border-b border-light-border dark:border-dark-border">
            <h1 className="text-3xl font-bold mb-3 mt-0 text-text-light dark:text-text-dark">
              Accelerated Time of the Tomb
            </h1>
            <p className="text-2xl mb-4 text-text-muted-light dark:text-text-muted-dark italic">
              A Case Study of Mind and Matter
            </p>
            <div className="flex items-center gap-4 text-sm text-text-muted-light dark:text-text-muted-dark">
              <span>November 2025</span>
              <span>•</span>
              <span>45 min read</span>
            </div>
            <p className="mt-4 text-text-light dark:text-text-dark">
              Researcher: <strong>David Neufer</strong>
            </p>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              For the Urantia Science Symposium 2025
            </p>
            <p className="mt-2 text-sm font-bold text-red-600 dark:text-red-400">
              TEST VERSION - REVISED CONTENT
            </p>
          </header>

          {/* Report Content */}
          <div id="report-content" className="prose prose-lg dark:prose-invert max-w-none
                          prose-headings:text-text-light dark:prose-headings:text-text-dark
                          prose-h2:scroll-mt-[180px] prose-h3:scroll-mt-[180px]
                          prose-h3:text-[#3B82C8] dark:prose-h3:text-[#60A5FA]
                          prose-p:text-text-light dark:prose-p:text-text-dark
                          prose-a:text-text-light dark:prose-a:text-text-dark prose-a:underline hover:prose-a:text-black dark:hover:prose-a:text-white
                          prose-strong:text-text-light dark:prose-strong:text-text-dark
                          prose-li:text-text-light dark:prose-li:text-text-dark
                          prose-blockquote:text-text-muted-light dark:prose-blockquote:text-text-muted-dark
                          prose-code:text-text-light dark:prose-code:text-text-dark
                          [&_p]:mb-4 [&_p]:leading-relaxed">
            <AcceleratedTimeRevised />
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-light-border dark:border-dark-border">
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              End of Report
            </p>
          </footer>
        </article>
      </main>
    </>
  )
}
