export const metadata = {
  title: 'Urantia Lectionary',
  description: 'Sunday readings from The Urantia Book following the liturgical calendar',
  manifest: '/lectionary/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'UB Lectionary',
  },
  icons: {
    icon: '/lectionary/icon-192.png',
    apple: '/lectionary/icon-192.png',
  },
  themeColor: '#4A90E2',
}

export default function LectionaryLayout({ children }) {
  return children
}
