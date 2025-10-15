# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 site for publishing Urantia Book research reports. The site features:
- Research reports with academic-style citations and formatting
- A glossary system for terms and concepts
- Monochrome design with light/dark theme support
- Static content with markdown rendering
- Deployed to Vercel with automatic deploys from main branch

## Development Commands

```bash
npm run dev        # Start development server on port 3000
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run Next.js linting
```

## Architecture

### Report System

Reports are dynamically routed through `/app/reports/[id]/page.js`:
- Report metadata and components are defined in the `reports` object at `app/reports/[id]/page.js:7-22`
- Each report has its own content component in `app/reports/[id]/content/[name].js`
- Content components are pure JSX with no props - they render complete report content including citations, figures, and formatting

**Adding a new report:**
1. Create content component in `app/reports/[id]/content/your-report.js`
2. Add metadata entry to the `reports` object in `app/reports/[id]/page.js`
3. Add card to home page report list in `app/page.js`

### Glossary System

The glossary (`/app/glossary/page.js`) renders markdown from `public/docs/glossary-formatted.md`:
- Client-side markdown rendering with `react-markdown` and `remark-gfm`
- Alphabet navigation automatically detects active letters from `## [A-Z]` headings
- Sticky navigation bar positioned below header (`top-[57px]` to account for header height)
- Update the markdown file to add new terms - navigation updates automatically

### Theme System

Dark mode implementation uses Tailwind's `dark:` modifier with class-based toggling:
- Theme state stored in `localStorage` with key `theme` (values: 'dark' or 'light')
- Script in `app/layout.js:16-29` prevents flash of unstyled content by applying `dark` class before React hydration
- `ThemeToggle` component (`components/ThemeToggle.js`) handles user preference and system preference fallback
- All theme colors are defined in `tailwind.config.js` with semantic naming

### Styling Conventions

**Monochrome design principle:**
- Light theme: 3 shades of light gray (#F8F9FA, #E9ECEF, #DEE2E6)
- Dark theme: 3 shades of dark gray (#1A1D23, #25292F, #343A42)
- Text colors: Standard and muted variants for each theme
- No color accents - use only grayscale

**Typography:**
- Max width constraint: `max-w-[65ch]` (65 characters) for optimal readability
- Report prose uses Tailwind's `prose` classes with extensive theme overrides
- All headings, paragraphs, links, and lists have explicit light/dark color classes
- Citations use superscript Unicode characters (¹, ², ³, etc.) not `<sup>` tags

**Common patterns:**
- Report cards: solid border with hover transition
- Resource cards (like Glossary): dashed border for visual distinction
- Sticky elements: Account for header height:
  - Home/Glossary pages (single-line header): `top-[57px]`
  - Report pages (two-line header with title + TTS): ~93px total
  - Scroll offsets for navigation: Use 128-140px for reports
- Section indentation: `ml-12` for sections, `ml-6` for cards within sections

### Image Management

Report images are stored in `public/images/[report-name]/`:
- Reference images with `/images/[report-name]/filename.jpg` in content components
- Next.js Image component with `unoptimized: false` in `next.config.js`
- Figures include captions with semantic formatting

### Content Format

**Citations:**
- Urantia Book citations use format: `187:1.4` (Paper:Section.Paragraph)
- Superscript numbers in text (¹, ², ³) link to citation blocks
- Citation blocks appear at section ends with format: `¹187:1.4 | ²188:2.3 | ³189:4.6`
- Scientific references can use collapsible `<details>` elements for long lists

**Table of Contents (for long reports):**
- IMPORTANT: Do NOT use CSS `scroll-mt` alone - it doesn't work reliably across browsers
- Use JavaScript onClick handlers to control scroll positioning
- Report content component must include `'use client'` directive at top
- Add scrollToSection helper function with proper header offset calculation
- Pattern to follow (see accelerated-time.js as reference):
```javascript
'use client'

const scrollToSection = (e, sectionId) => {
  e.preventDefault()
  const element = document.getElementById(sectionId)
  if (!element) return

  const headerOffset = 140  // Header (~93px) + buffer (~47px)
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - headerOffset

  window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
}

// Then in TOC links:
<a href="#section-id" onClick={(e) => scrollToSection(e, 'section-id')}
   className="...cursor-pointer">Link Text</a>
```
- Keep href attribute for accessibility/SEO
- Add `cursor-pointer` to className
- This matches the proven glossary alphabet navigation pattern

**Lists:**
- Use explicit Tailwind classes: `list-disc ml-8 space-y-2 mt-4 pl-5`
- Do not rely on default prose styles for lists

**Layout:**
- Reports use article semantic tag with header, content, and footer sections
- Headers include title, subtitle, date, read time, and researcher attribution
- Prose styling applied to content div - maintain the extensive color overrides

## Deployment

- GitHub repository: https://github.com/emen7/arch
- Vercel project name: "Arch"
- Framework preset: Next.js
- Automatic deploys on push to main branch
- Large files (PDFs, DOCX) are excluded via `.gitignore`

## File Locations

- Report content components: `app/reports/[id]/content/`
- Shared components: `components/`
- Public markdown files: `public/docs/`
- Report images: `public/images/[report-name]/`
- Source documents (not deployed): `docs/`

## Notes

- The `/about` page exists but is not linked in navigation (not yet written)
- The `/test` page is for development only
- All pages maintain consistent 65ch width and monochrome theme
- New reports should follow the established citation and formatting patterns
