/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light theme - 3 shades of light gray
        light: {
          bg: '#F8F9FA',      // Lightest - main background
          card: '#E9ECEF',    // Medium - cards/sections
          border: '#DEE2E6',  // Darker - borders/lines
        },
        // Dark theme - 3 shades of dark gray
        dark: {
          bg: '#1A1D23',      // Darkest - main background
          card: '#25292F',    // Medium - cards/sections
          border: '#343A42',  // Lighter - borders/lines
        },
        // Text colors
        text: {
          light: '#212529',   // Dark text for light mode
          dark: '#F8F9FA',    // Light text for dark mode
          muted: {
            light: '#495057', // Muted text light mode - WCAG AA compliant
            dark: '#ADB5BD',  // Muted text dark mode
          }
        },
        // Accent colors - monochrome
        accent: {
          primary: '#212529',   // Dark for light mode
          'primary-dark': '#F8F9FA',  // Light for dark mode
          hover: '#000000',     // Pure black for light mode hover
          'hover-dark': '#FFFFFF',    // Pure white for dark mode hover
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}