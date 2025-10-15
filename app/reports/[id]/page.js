import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import ReadAloud from '@/components/ReadAloud'
import JosephsTombContent from './content/josephs-tomb'
import JosephsTombAccessibleContent from './content/josephs-tomb-accessible'
import AcceleratedTimeContent from './content/accelerated-time'
import NuclearIsleContent from './content/nuclear-isle'
import CircuitArchitectureContent from './content/circuit-architecture'
import HavonaChairsContent from './content/havona-chairs'

// Report data structure
const reports = {
  'josephs-tomb-location': {
    title: "Joseph's Tomb: Evidence of Location",
    subtitle: 'A Forensic Reconstruction Through Revelatory Documentation',
    date: 'November 2025',
    readTime: '30 min read',
    ContentComponent: JosephsTombContent,
  },
  'josephs-tomb-accessible': {
    title: "Joseph's Tomb: Evidence of Location (Accessible)",
    subtitle: 'A Forensic Reconstruction Through Revelatory Documentation',
    date: 'November 2025',
    readTime: '30 min read',
    ContentComponent: JosephsTombAccessibleContent,
  },
  'accelerated-time-tomb': {
    title: 'Accelerated Time of the Tomb',
    subtitle: 'A Case Study of Mind and Matter',
    date: 'November 2025',
    readTime: '45 min read',
    ContentComponent: AcceleratedTimeContent,
  },
  'nuclear-isle': {
    title: 'The Nuclear Isle',
    subtitle: 'Understanding Paradise as Nucleus',
    date: 'November 2025',
    readTime: '5 min read',
    ContentComponent: NuclearIsleContent,
    publication: 'Published in the Urantia Fellowship Mini-Messenger, April 16, 2025',
  },
  'circuit-architecture': {
    title: 'Complete Circuit Architecture',
    subtitle: 'The Revealed Cosmology',
    date: 'November 2025',
    readTime: '20 min read',
    ContentComponent: CircuitArchitectureContent,
  },
  'havona-chairs': {
    title: 'Havona and the Twenty Chairs',
    subtitle: 'An Allegory',
    date: 'April 2025',
    readTime: '8 min read',
    ContentComponent: HavonaChairsContent,
    publication: 'Originally published in the Urantia Fellowship\'s Mini-Messenger, April 1, 2025',
  },
}

export async function generateStaticParams() {
  return Object.keys(reports).map((id) => ({
    id,
  }))
}

export async function generateMetadata({ params }) {
  const report = reports[params.id]
  if (!report) return {}

  return {
    title: `${report.title} | Revelationary Research`,
    description: report.subtitle,
  }
}

export default function ReportPage({ params }) {
  const report = reports[params.id]

  if (!report) {
    notFound()
  }

  const ContentComponent = report.ContentComponent

  // TTS Controls Component for Header
  const ttsControls = (
    <ReadAloud contentId="report-content" />
  )

  return (
    <>
      <Header title={report.title} ttsControls={ttsControls} />

      <main className="container mx-auto px-4 py-4 max-w-[65ch]">
        <article>
          {/* Report Metadata */}
          <header className="mb-12 pb-8 border-b border-light-border dark:border-dark-border">
            <h1 className="text-3xl font-bold mb-3 mt-0 text-text-light dark:text-text-dark">
              {report.title}
            </h1>
            <p className={`text-2xl mb-4 ${params.id === 'havona-chairs' ? 'font-bold text-text-light dark:text-text-dark' : 'text-text-muted-light dark:text-text-muted-dark italic'}`}>
              {report.subtitle}
            </p>
            <div className="flex items-center gap-4 text-sm text-text-muted-light dark:text-text-muted-dark">
              <span>{report.date}</span>
              <span>•</span>
              <span>{report.readTime}</span>
            </div>
            <p className="mt-4 text-text-light dark:text-text-dark">
              Researcher: <strong>David Neufer</strong>
            </p>
            {report.publication && (
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark italic">
                {report.publication}
              </p>
            )}
            {!report.publication && params.id !== 'nuclear-isle' && params.id !== 'circuit-architecture' && params.id !== 'havona-chairs' && (
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                For the Urantia Science Symposium 2025
              </p>
            )}
          </header>

      {/* Report Content */}
      <div id="report-content" className="prose prose-lg dark:prose-invert max-w-none
                      prose-headings:text-text-light dark:prose-headings:text-text-dark
                      prose-h2:scroll-mt-[128px] prose-h3:scroll-mt-[128px]
                      prose-h3:text-[#3B82C8] dark:prose-h3:text-[#60A5FA]
                      prose-p:text-text-light dark:prose-p:text-text-dark
                      prose-a:text-text-light dark:prose-a:text-text-dark prose-a:underline hover:prose-a:text-black dark:hover:prose-a:text-white
                      prose-strong:text-text-light dark:prose-strong:text-text-dark
                      prose-li:text-text-light dark:prose-li:text-text-dark
                      prose-blockquote:text-text-muted-light dark:prose-blockquote:text-text-muted-dark
                      prose-code:text-text-light dark:prose-code:text-text-dark
                      [&_p]:mb-4 [&_p]:leading-relaxed">
        <ContentComponent />
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
