import Link from 'next/link'
import Header from '../../components/Header'

export const metadata = {
  title: 'Urantia Lectionary | Revelationary Research',
  description: 'Lectionary readings harmonizing Urantia Book revelations with liturgical seasons.',
}

export default async function LectionaryIndex() {
  // Read the index file
  const fs = require('fs')
  const path = require('path')
  const indexPath = path.join(process.cwd(), 'public/lectionary/data/index.json')
  const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))

  return (
    <>
      <Header title="Urantia Lectionary" />
      <main className="container mx-auto px-4 py-8 max-w-[65ch]">
        <article>
          {/* Page Header */}
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4 text-text-light dark:text-text-dark">
              Urantia Lectionary
            </h1>
            <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-2">
              Lectionary readings harmonizing Urantia Book revelations with liturgical seasons.
            </p>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Compiled and presented for contemplative reading.
            </p>
          </header>

          {/* Readings List */}
          <div className="space-y-8">
            {indexData.map((reading) => (
              <Link
                key={reading.slug}
                href={`/lectionary/${reading.slug}`}
                className="block group"
              >
                <article className="border-2 border-light-border dark:border-dark-border rounded-lg overflow-hidden transition-all hover:border-[#3B82C8] dark:hover:border-[#60A5FA]">
                  {/* Hero Image */}
                  {reading.heroImage && (
                    <div className="w-full h-64 overflow-hidden bg-[#E9ECEF] dark:bg-[#25292F]">
                      <img
                        src={reading.heroImage}
                        alt={reading.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-2 text-text-light dark:text-text-dark group-hover:text-[#3B82C8] dark:group-hover:text-[#60A5FA] transition-colors">
                      {reading.title}
                    </h2>
                    <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                      {reading.date}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </article>
      </main>
    </>
  )
}
