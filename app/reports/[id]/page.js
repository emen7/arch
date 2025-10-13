import { notFound } from 'next/navigation'
import Link from 'next/link'
import JosephsTombContent from './content/josephs-tomb'
import AcceleratedTimeContent from './content/accelerated-time'

// Report data structure
const reports = {
  'josephs-tomb-location': {
    title: "Joseph's Tomb: Evidence of Location",
    subtitle: 'A Forensic Reconstruction Through Revelatory Documentation',
    date: 'November 2025',
    readTime: '30 min read',
    ContentComponent: JosephsTombContent,
  },
  'accelerated-time-tomb': {
    title: 'Accelerated Time of the Tomb',
    subtitle: 'A Case Study of Mind and Matter',
    date: 'November 2025',
    readTime: '45 min read',
    ContentComponent: AcceleratedTimeContent,
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

  return (
    <article className="max-w-[65ch] mx-auto">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center text-text-light dark:text-text-dark hover:text-black dark:hover:text-white mb-8 transition-colors"
      >
        ← Back to Reports
      </Link>

      {/* Report Header */}
      <header className="mb-12 pb-8 border-b border-light-border dark:border-dark-border">
        <h1 className="text-3xl font-bold mb-3 text-text-light dark:text-text-dark">
          {report.title}
        </h1>
        <p className="text-2xl text-text-muted-light dark:text-text-muted-dark italic mb-4">
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
        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
          For the Urantia Science Symposium 2025
        </p>
      </header>

      {/* Report Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none
                      prose-headings:text-text-light dark:prose-headings:text-text-dark
                      prose-p:text-text-light dark:prose-p:text-text-dark
                      prose-a:text-text-light dark:prose-a:text-text-dark prose-a:underline hover:prose-a:text-black dark:hover:prose-a:text-white
                      prose-strong:text-text-light dark:prose-strong:text-text-dark
                      prose-li:text-text-light dark:prose-li:text-text-dark
                      prose-blockquote:text-text-muted-light dark:prose-blockquote:text-text-muted-dark
                      prose-code:text-text-light dark:prose-code:text-text-dark
                      [&_p]:mb-4 [&_p]:leading-relaxed
                      [&_h3]:ml-6">
        <ContentComponent />
      </div>

      {/* Footer Navigation */}
      <footer className="mt-16 pt-8 border-t border-light-border dark:border-dark-border">
        <Link
          href="/"
          className="inline-flex items-center text-text-light dark:text-text-dark hover:text-black dark:hover:text-white transition-colors"
        >
          ← Back to All Reports
        </Link>
      </footer>
    </article>
  )
}
