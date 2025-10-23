# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 site for publishing Urantia Book research reports. The site features:
- Research reports with academic-style citations and formatting
- Interactive presentations and infographics (timeline navigators, visualizations)
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

### Interactive Presentations & Infographics

Interactive presentation components (like TombTimeline, Wave-Energy Manifestations) require different considerations than static reports:

**Standard Requirements:**
- **16:9 aspect ratio** - Fixed container for Zoom/PowerPoint compatibility
  - Use: `aspectRatio: '16/9'` with `width: '95vw'` and `maxWidth: '1920px'`
- **No scrollbars** - All content must fit within fixed dimensions
- **No copyright notices or footers** - Infographics must be pure 16:9 content only
  - Do NOT include "revelationary.net" links, copyright notices, or footer elements
  - Use `height: '100vh'` instead of `min-h-screen` to prevent extra gray space
  - Remove any bottom padding that creates space below the 16:9 container
- **Presentation pages** accessed via `/presentations/[name]` route or standalone routes

**Component Structure Pattern:**
- Left side: Navigation/Timeline (25-30% width)
  - Phase indicators (vertical bars, colored segments)
  - Event/slide lists (clickable, with active state highlighting)
  - Day/section headers for organization
- Right side: Content display (70-75% width)
  - Slide content, quotes, infographics
  - Image placeholders initially
  - Clean, centered layout

**Phase-Based Navigation:**
- Multiple phases with distinct colors (see Wave-Energy as template)
- Phase bar indicates current position
- Clickable segments jump to first event of phase
- Active phase changes color, inactive stays neutral gray
- Black dividers between phase segments for clarity

**Event/Slide Lists:**
- Times on left or right of indicators (maintain consistency)
- Bullet indicators: small circles (6px) that fill when selected
- Selected items glow in phase color (cyan, orange, etc.)
- Hard spaces (`\u00A0`) to prevent time/AM-PM wrapping
- Day headers positioned above their events, not inline

**Color Coding:**
- Use phase-specific colors for active elements
- Default/inactive: gray tones
- Selected: bright phase color (azure blue, orange, etc.)
- Maintain readability: black text on colored backgrounds

**Placeholder Content:**
- Image placeholders: dashed border boxes with emoji + caption
- Infographic placeholders: indicate special content type
- Quote boxes: semi-transparent backgrounds
- All placeholders should be clear about what will be added

**Template Components:**
- Wave-Energy Manifestations (`app/wave-energy/page.js`) - vertical scale pattern
- TombTimeline (`components/TombTimeline.js`) - phase-based presentation navigator
- Use these as structural reference for new interactive components

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

**Monochrome design principle (for reports/static content):**
- Light theme: 3 shades of light gray (#F8F9FA, #E9ECEF, #DEE2E6)
- Dark theme: 3 shades of dark gray (#1A1D23, #25292F, #343A42)
- Text colors: Standard and muted variants for each theme
- No color accents - use only grayscale

**Interactive presentations use color:**
- Phase-specific colors (azure blue, orange) for navigation and emphasis
- Dark gradient backgrounds for presentation mode
- Colored highlights for selected/active states
- This is an exception to the monochrome rule for static content

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

**Change Logs:**
- Use heading "Change Log" (not "Document Revision History")
- Use bulleted list (`<ul>` with `list-disc`), not numbered list
- List changes in reverse chronological order (newest first)
- Format: `**Date:** Description of change.`
- Pattern:
```jsx
{/* Change Log */}
<div id="revision-history" className="mt-12 pt-8 border-t-2 border-light-border dark:border-dark-border text-sm text-text-muted-light dark:text-text-muted-dark">
  <p className="font-semibold mb-3">Change Log</p>
  <ul className="list-disc ml-6 space-y-2">
    <li>
      <strong>October 23, 2025:</strong> Content refinement and format alterations.
    </li>
    <li>
      <strong>October 21, 2025:</strong> Initial publication.
    </li>
  </ul>
</div>
```

**TTS/ARIA Accessibility for Citations and Notations:**
- IMPORTANT: Citation lists must be hidden from TTS using `aria-hidden="true"`
- Explanatory notations should be kept readable by TTS (do NOT hide with aria-hidden)
- Pattern:
```jsx
{/* Citations - hidden from TTS */}
<div aria-hidden="true" className="mt-12 pt-6 border-t...">
  <p className="mb-2 font-semibold">Citations:</p>
  <p className="leading-relaxed">
    <Citation num={1} /><PaperRef>12:3.6</PaperRef> | ...
  </p>
</div>

{/* Notations - readable by TTS */}
<div className="mt-4 text-sm text-text-muted-light dark:text-text-muted-dark">
  <p className="mb-2"><strong>Notations:</strong></p>
  <p className="mt-2">a. Explanatory note text...</p>
  <p className="mt-2">b. Another explanatory note...</p>
</div>
```
- In-text citations (superscript numbers) are read as "citation 1", "citation 2" by the Citation component
- Citation lists at section/report ends are tedious when read aloud - use aria-hidden to skip them
- Notations provide valuable context - keep these readable for TTS users
- The ReadAloud component (`components/ReadAloud.js`) automatically skips any content inside `aria-hidden="true"` containers

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

**Development Workflow:**
- IMPORTANT: Our practice is to commit and push changes, not test on localhost
- Testing is done via Vercel automatic deployment at revelationary.net
- After pushing to main branch, Vercel automatically deploys within 1-2 minutes
- Test new features at revelationary.net after deployment completes

**Iterative Development Process:**
- Make incremental commits for each logical improvement
- Commit messages should explain the "why" behind changes, not just "what" changed
- Push after each refinement for live testing
- Pattern: implement → commit → push → review → refine
- User feedback drives iteration - embrace complete redesigns when user indicates structural changes
- Preserve commit history documenting the evolution of components

**Component Iteration Philosophy:**
- User-driven iteration is expected and valuable, not a sign of initial failure
- When user feedback indicates major changes, embrace complete redesigns
- Template components (Wave-Energy, TombTimeline) serve as architectural patterns
- User preferences override initial implementation decisions
- Document major design decisions in commit messages for future reference
- Each iteration should solve a specific user-identified issue

## File Locations

- Report content components: `app/reports/[id]/content/`
- Presentation components: `app/presentations/[name]/` or standalone in `components/`
- Shared components: `components/`
- Public markdown files: `public/docs/`
- Report images: `public/images/[report-name]/`
- Source documents (not deployed): `docs/`
- Urantia Book database: `public/data/ub-database.json`

## Troubleshooting

### Localhost Development Server Issues

If `npm run dev` hangs at "Starting..." or becomes unresponsive:

1. **Check for stale Node processes:**
   ```bash
   tasklist | findstr "node"
   netstat -ano | findstr "3000"
   ```

2. **Clean restart process:**
   - Close all terminal windows running `npm run dev` (this kills Node processes without requiring admin privileges)
   - Delete the build cache: `rm -rf .next`
   - Delete node_modules if there's a version mismatch: `rm -rf node_modules && npm install`
   - Start fresh: `npm run dev`

3. **Version conflicts:**
   - If you see "Mismatching @next/swc version" errors, the `.next` cache has old version data
   - Solution: Delete `.next` folder and restart dev server
   - This happens after updating Next.js versions

4. **File naming issues:**
   - IMPORTANT: Avoid spaces and parentheses in filenames, especially for content components
   - Bad: `accelerated-time-REVISED (3).js`
   - Good: `accelerated-time-REVISED3.js`
   - JavaScript imports don't handle special characters in filenames well

### Common Hydration Warnings

Browser extensions (Grammarly, etc.) can cause harmless hydration warnings:
```
A tree hydrated but some attributes of the server rendered HTML didn't match
```
These warnings about `data-gr-ext-installed` or similar attributes are safe to ignore - they're caused by browser extensions modifying the DOM, not our code.

### Vercel Deployment

- If Vercel deploys are queued longer than usual, check https://www.vercel-status.com/
- Vercel performs clean builds, so local cache issues won't affect deployment
- Test routes at https://revelationary.net after deployment completes

## Notes

- The `/about` page exists but is not linked in navigation (not yet written)
- The `/test` page is for development only
- All pages maintain consistent 65ch width and monochrome theme (except interactive presentations)
- New reports should follow the established citation and formatting patterns
- Interactive presentations prioritize functionality and user experience over strict monochrome adherence
- The UB database (`public/data/ub-database.json`) contains full text for quote verification and citation lookup
