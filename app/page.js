import Link from 'next/link'
import Header from '../components/Header'

export default function Home() {

  const tombReports = [
    {
      id: 'accelerated-time-tomb',
      title: 'Accelerated Time of the Tomb',
      subtitle: 'A Case Study of Mind and Matter',
      description: 'This case study examines the matter-energy transformation of Jesus\' physical body through "accelerated time." The report works across three domains: the revealed timeline and administrative sequence, the ultimatonic physics underlying temporal acceleration, and forensic correspondence with the Shroud of Turin.',
      date: 'November 2025',
      readTime: '45 min read',
    },
  ]

  const revelationReports = [
    {
      id: 'circuit-architecture',
      title: 'Complete Circuit Architecture',
      subtitle: 'The Revealed Cosmology',
      date: 'November 2025',
      readTime: '20 min read',
    },
    {
      id: 'josephs-tomb-location',
      title: 'Joseph\'s Tomb: Evidence of Location',
      subtitle: 'A Forensic Reconstruction Through Revelatory Documentation',
      description: 'A study of revealed information to help identify the place of resurrection. (In Progress)',
      date: 'November 2025',
      readTime: '30 min read',
    },
    {
      id: 'nuclear-isle',
      title: 'The Nuclear Isle',
      subtitle: 'Understanding Paradise as Nucleus',
      date: 'April 2025',
      readTime: '5 min read',
    },
    {
      id: 'havona-chairs',
      title: 'Havona and the Twenty Chairs',
      subtitle: 'An Allegory',
      date: 'April 2025',
      readTime: '8 min read',
    },
  ]

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-4 max-w-[65ch]">
        <div className="space-y-8">
          {/* Main Title */}
      <div>
        <h1 className="text-2xl font-bold mb-1 mt-0 text-text-light dark:text-text-dark">
          Architecture of the Master&nbsp;Universe
        </h1>
        <p className="text-text-muted-light dark:text-text-muted-dark mb-1">
          Living documentation of deep study into Urantia Book revelations. This will change as more is known and more reports are added.
        </p>
        <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
          Researcher: David Neufer
        </p>
      </div>

      {/* Tomb Operations Section */}
      <section className="ml-12">
        <h2 className="text-2xl font-bold mb-2 mt-0 text-text-light dark:text-text-dark">
          Tomb Operations
        </h2>
        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-4">
          Reports for the Urantia Science Symposium IV 2025
        </p>

        <div className="ml-6 space-y-3 flex flex-col items-start">
          {tombReports.map((report) => (
            <Link
              key={report.id}
              href={`/reports/${report.id}`}
              className="inline-block px-3 py-2 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-text-light dark:hover:border-text-dark transition-all group"
            >
              <h3 className="text-xl font-semibold mb-0.5 mt-0 text-text-light dark:text-text-dark group-hover:text-black dark:group-hover:text-white transition-colors">
                {report.title}
              </h3>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark italic mb-1">
                {report.subtitle}
              </p>
              <div className="flex items-center gap-3 text-xs text-text-muted-light dark:text-text-muted-dark">
                <span>{report.date}</span>
                <span>•</span>
                <span>{report.readTime}</span>
              </div>
            </Link>
          ))}

          {/* Glossary - grouped with Tomb Operations */}
          <Link
            href="/glossary"
            className="inline-block px-3 py-2 rounded-lg bg-light-card dark:bg-dark-card border-2 border-dashed border-light-border dark:border-dark-border hover:border-text-muted-light dark:hover:border-text-muted-dark transition-all group"
          >
            <h3 className="text-xl font-semibold mb-0.5 mt-0 text-text-light dark:text-text-dark group-hover:text-black dark:group-hover:text-white transition-colors">
              Report Glossary
            </h3>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Definitions and Concept Guide
            </p>
          </Link>
        </div>
      </section>

      {/* Revelation Research Section */}
      <section className="ml-12">
        <h2 className="text-2xl font-bold mb-4 mt-0 text-text-light dark:text-text-dark">
          Revelation Research
        </h2>

        <div className="ml-6 space-y-3 flex flex-col items-start">
          {/* Wave-Energy Manifestations - Interactive */}
          <Link
            href="/wave-energy"
            className="inline-block px-3 py-2 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-text-light dark:hover:border-text-dark transition-all group"
          >
            <h3 className="text-xl font-semibold mb-0.5 mt-0 text-text-light dark:text-text-dark group-hover:text-black dark:group-hover:text-white transition-colors">
              Wave-Energy Manifestations
            </h3>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Interactive visualization of energy manifestations from puissant energy to radio waves
            </p>
          </Link>

          {revelationReports.map((report) => (
            <Link
              key={report.id}
              href={`/reports/${report.id}`}
              className="inline-block px-3 py-2 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border hover:border-text-light dark:hover:border-text-dark transition-all group"
            >
              <h3 className="text-xl font-semibold mb-0.5 mt-0 text-text-light dark:text-text-dark group-hover:text-black dark:group-hover:text-white transition-colors">
                {report.title}
              </h3>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark italic mb-1">
                {report.subtitle}
              </p>
              {report.description && (
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-2">
                  {report.description}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs text-text-muted-light dark:text-text-muted-dark">
                <span>{report.date}</span>
                <span>•</span>
                <span>{report.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

        </div>

        {/* Tagline - Home page only */}
        <div className="mt-12 pt-6 border-t border-light-border dark:border-dark-border text-center">
          <p className="text-sm italic text-text-muted-light dark:text-text-muted-dark">
            "There is an artistry in the intelligent assembly and co-ordination of related data..." (48:6.30)
          </p>
        </div>
      </main>
    </>
  )
}