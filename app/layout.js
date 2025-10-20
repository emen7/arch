import './globals.css'
import AppStateManager from '../components/AppStateManager'

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

              // PWA State Restoration - runs immediately before React hydration
              try {
                const savedRoute = localStorage.getItem('app-last-route');
                const savedScroll = localStorage.getItem('app-scroll-position');

                // Clean up: If saved route is a presentation, clear it (one-time migration)
                if (savedRoute && (savedRoute.startsWith('/presentations/') || savedRoute === '/wave-energy' || savedRoute === '/wave-test')) {
                  localStorage.removeItem('app-last-route');
                  localStorage.removeItem('app-scroll-position');
                  return; // Don't restore
                }

                // Only restore if we're on home page (app just opened)
                if (savedRoute && savedRoute !== '/' && window.location.pathname === '/') {
                  // Navigate to saved route
                  window.location.replace(savedRoute);
                } else if (savedScroll && window.location.pathname !== '/') {
                  // Restore scroll position for current page
                  window.addEventListener('load', function() {
                    setTimeout(function() {
                      window.scrollTo(0, parseInt(savedScroll, 10));
                    }, 100);
                  });
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-light-bg dark:bg-dark-bg text-text-light dark:text-text-dark">
        <AppStateManager />
        {children}
      </body>
    </html>
  )
}