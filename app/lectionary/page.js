import Link from 'next/link'
import LectionaryHeader from '../../components/LectionaryHeader'

export const metadata = {
  title: 'Urantia Lectionary',
  description: 'Sunday readings from The Urantia Book following the liturgical calendar.',
}

export default async function LectionaryIndex() {
  const fs = require('fs')
  const path = require('path')
  const indexPath = path.join(process.cwd(), 'public/lectionary/data/index.json')
  const indexData = JSON.parse(fs.readFileSync(indexPath, 'utf-8'))

  // Group by month for better organization
  const byMonth = indexData.reduce((acc, reading) => {
    const date = new Date(reading.date)
    const monthYear = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    if (!acc[monthYear]) acc[monthYear] = []
    acc[monthYear].push(reading)
    return acc
  }, {})

  return (
    <>
      <LectionaryHeader />
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <article>
          {/* Page Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-text-light dark:text-text-dark">
              Urantia Book Lectionary
            </h1>
            <p className="text-lg text-text-muted-light dark:text-text-muted-dark mb-2">
              Sunday readings from <em>The Urantia Book</em> following the liturgical calendar
            </p>
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              Year C Cycle • 2025
            </p>
          </header>

          {/* Readings by Month */}
          <div className="space-y-12">
            {Object.entries(byMonth).map(([monthYear, readings]) => (
              <section key={monthYear}>
                {/* Month Header */}
                <h2 className="text-2xl font-semibold mb-6 pb-2 border-b-2 border-light-border dark:border-dark-border text-text-light dark:text-text-dark">
                  {monthYear}
                </h2>

                {/* Readings Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {readings.map((reading) => {
                    const date = new Date(reading.date)
                    const dayOfMonth = date.getDate()
                    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' })

                    return (
                      <Link
                        key={reading.slug}
                        href={`/lectionary/${reading.slug}`}
                        className="group block"
                      >
                        <article className="border-2 border-light-border dark:border-dark-border rounded-lg overflow-hidden transition-all hover:border-[#4A90E2] dark:hover:border-[#4A90E2] hover:shadow-lg h-full">
                          {/* Date Badge */}
                          <div className="bg-[#F5F7FA] dark:bg-[#2D3748] border-b-2 border-light-border dark:border-dark-border px-4 py-3 flex items-center gap-4">
                            <div className="text-center min-w-[60px]">
                              <div className="text-3xl font-bold text-[#4A90E2]">
                                {dayOfMonth}
                              </div>
                              <div className="text-xs uppercase tracking-wide text-text-muted-light dark:text-text-muted-dark">
                                {dayOfWeek}
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-text-light dark:text-text-dark group-hover:text-[#4A90E2] transition-colors leading-tight">
                                {reading.title}
                              </h3>
                            </div>
                          </div>

                          {/* Theme */}
                          {reading.theme && (
                            <div className="px-4 py-3 bg-light-bg dark:bg-dark-bg">
                              <p className="text-sm italic text-text-muted-light dark:text-text-muted-dark">
                                {reading.theme}
                              </p>
                            </div>
                          )}
                        </article>
                      </Link>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          {/* Footer Note */}
          <footer className="mt-16 pt-8 border-t-2 border-light-border dark:border-dark-border text-center">
            <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
              <em>The Urantia Book</em> passages are used with permission.<br />
              Visit <a href="https://masteruniverse.org" className="text-[#2C5F8D] hover:underline">masteruniverse.org</a> for more resources.
            </p>
          </footer>
        </article>
      </main>
    </>
  )
}
