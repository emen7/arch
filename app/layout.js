import './globals.css'
import Header from '../components/Header'

export const metadata = {
  title: 'Architecture of the Master Universe | Revelationary Research',
  description: 'Research reports exploring Urantia Book revelations through scientific and forensic analysis.',
  keywords: 'Urantia Book, research, science, archaeology',
  manifest: '/manifest.json',
  themeColor: '#1A1D23',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Rev Research',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const isDark = theme === 'dark' || (!theme && systemDark);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-light-bg dark:bg-dark-bg text-text-light dark:text-text-dark">
        <Header />
        <main className="container mx-auto px-4 py-4 max-w-[65ch]">
          {children}
        </main>
        <footer className="mt-16 py-8 border-t border-light-border dark:border-dark-border">
          <div className="container mx-auto px-4 text-center text-text-muted-light dark:text-text-muted-dark max-w-[65ch]">
            <p>&copy; {new Date().getFullYear()} David Neufer</p>
            <p className="mt-2 text-sm italic">
              "There is an artistry in the intelligent assembly and co-ordination of related data..." (48:6.30)
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}