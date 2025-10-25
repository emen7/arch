# Grid Overlay System Specification

## Purpose
A toggleable semi-transparent grid overlay system for 16×9 (1920×1080px) slide presentations that enables precise element positioning and clear communication between human designers and AI assistants.

## Use Cases
- Communicate element placement to AI designers using chess-style notation (e.g., "Place logo in A1", "Hero spans B1-H2")
- Verify precise pixel positioning during slide development
- Maintain consistent layout structure across multiple slides
- Enable rapid visual reference during design iterations

---

## Core Requirements

### 1. Grid System (Chess Notation)

**Horizontal Division:**
- 12 equal columns labeled **A through L** (left to right)
- Each column = 160px wide (1920px ÷ 12)

**Vertical Division:**
- 3 equal rows numbered **1, 2, 3** (top to bottom)
- Each row = 360px tall (1080px ÷ 3)

**Result:** 36 named grid cells (A1, A2, A3, B1, B2, B3... K3, L3)

**Cell Labels:**
- Display coordinate notation inside each cell (e.g., "A1", "F2", "L3")
- Position labels in top-left corner of each cell
- Font size: 10-12px
- Label opacity: 40-50%
- Labels should be legible but unobtrusive

**Grid Lines:**
- Draw lines to divide the 12×3 grid
- Line opacity: 15-20%
- Line thickness: 1px
- Color: Adapt to slide background (light grid on dark slides, dark grid on light slides)

---

### 2. Pixel Rulers

**Top Edge (Horizontal Ruler):**
- Range: 0px to 1920px
- Small tick marks every 50px
- Larger tick marks every 100px or 200px
- Display numeric labels at major intervals (100px or 200px)
- Labels positioned above or below ruler line

**Left Edge (Vertical Ruler):**
- Range: 0px to 1080px
- Small tick marks every 50px
- Larger tick marks every 100px or 200px
- Display numeric labels at major intervals
- Labels positioned to the left of ruler line

**Ruler Styling:**
- Tick mark opacity: 30-40%
- Numeric label opacity: 60-70%
- Font size: 9-11px
- Ruler should sit along the edges without obscuring main grid

---

### 3. Toggle Functionality

**Toggle Mechanism:**
- Keyboard shortcut: **G key** (for "Grid")
- Optional: Small visual toggle button in bottom-left corner (A3 region, ~20px from edges)
  - If included: Make it minimal and low opacity (20%) until hovered
  - Shape: Small circle, grid icon, or simple dot
  - Note: User does not prioritize discoverability

**Toggle States:**
Option A (3-state toggle):
1. **Hidden** (default) - No overlay visible
2. **Grid only** - Show grid cells with labels, hide pixel rulers
3. **Full overlay** - Show grid + pixel rulers

Option B (2-state toggle):
1. **Hidden** (default)
2. **Full overlay** - Show everything (grid + rulers)

*Recommendation: Let implementation determine which approach fits best*

**Default State:** Hidden (overlay off when slide loads)

---

### 4. Visual Design

**Overlay Container:**
- Position: Absolute, covers entire 1920×1080 viewport
- Pointer events: Should not interfere with slide interaction when visible
- Z-index: High enough to appear above slide content

**Transparency:**
- Overall overlay opacity: 10-30% (adjustable)
- Grid lines: 15-20%
- Cell labels: 40-50%
- Ruler elements: 30-70% (varies by element)

**Color Adaptation:**
- Detect slide background color (light vs. dark)
- Light backgrounds: Use dark overlay (black/gray)
- Dark backgrounds: Use light overlay (white/light gray)
- OR: Provide manual light/dark mode toggle

**Responsive Behavior:**
- System is designed specifically for 1920×1080 fixed dimensions
- No responsive scaling needed (presentation slides are fixed size)

---

## Usage Examples

### Example 1: Simple Placement
**Instruction to AI:** "Place the company logo in cell A1"
- AI knows to position logo in top-left grid cell
- Covers approximately 0-160px horizontal, 0-360px vertical

### Example 2: Spanning Regions
**Instruction to AI:** "Hero image spans B1 to H2"
- Columns B through H (160px to 1280px horizontal)
- Rows 1 through 2 (0px to 720px vertical)
- Results in large hero section covering left 2/3 width, top 2/3 height

### Example 3: Precise Positioning
**Instruction to AI:** "Center the CTA button at 960px from left, 900px from top"
- Use pixel rulers to verify exact positioning
- Button sits in middle columns (F-G), bottom row (3)

### Example 4: Combined Reference
**Instruction to AI:** "Place sidebar in columns J-L, spanning all rows. Make it exactly 480px wide."
- Grid shows general region (right quarter)
- Pixel ruler confirms exact 480px width (1440px to 1920px)

---

## Technical Considerations

### Implementation Flexibility
- **File structure:** Implement as standalone HTML, CSS+JS modules, or inline code - choose what fits repository structure best
- **Styling approach:** CSS variables, classes, or inline styles - use what maintains consistency with existing codebase
- **Grid generation:** SVG, CSS Grid, positioned divs, or canvas - optimize for performance and maintainability

### Performance
- Overlay should render instantly when toggled
- No performance impact on slide content
- Lightweight implementation (minimal DOM elements)

### Accessibility
- Keyboard-accessible toggle (G key)
- Does not interfere with screen readers (presentation mode has overlay hidden)
- Visual-only aid (not for end-user accessibility)

### Browser Compatibility
- Target modern browsers (Chrome, Firefox, Safari, Edge)
- No legacy browser support required
- Assume ES6+ JavaScript support

---

## Future Enhancements (Optional)

These are NOT required for initial implementation but may be considered:

1. **Cursor Position Readout:** Show current mouse X,Y coordinates in corner
2. **Multi-state Toggle:** Cycle through hidden → grid only → grid + rulers
3. **Snap-to-Grid:** Provide helper functions to snap element coordinates to grid boundaries
4. **Export Coordinates:** Copy element positions to clipboard in standardized format
5. **Custom Grid Presets:** Allow 8-column, 16-column, or custom grid configurations
6. **Overlay Opacity Control:** Slider to adjust transparency level
7. **Screenshot Mode:** Capture slide with overlay visible for design documentation

---

## Success Criteria

The implementation is successful when:

1. ✅ Toggle shows/hides overlay with G key press
2. ✅ 12×3 grid is clearly visible with A-L, 1-3 labels in each cell
3. ✅ Pixel rulers show measurements along top and left edges
4. ✅ Overlay is semi-transparent and doesn't completely obscure slide content
5. ✅ Designer can reference any grid cell by coordinate (e.g., "D2")
6. ✅ Overlay integrates cleanly into existing slide repository
7. ✅ Default state is hidden (overlay off)
8. ✅ AI assistant (Claude Code) understands coordinate references when building slides

---

## Design Philosophy

This overlay is a **communication tool**, not a presentation element. It exists to:
- Bridge human spatial thinking and AI coordinate understanding
- Provide both **conceptual regions** (chess notation) and **precise measurements** (pixel rulers)
- Enable fast, unambiguous design instructions
- Remain invisible to end users (toggle off for presentations)

The implementation should prioritize **clarity over beauty** and **functionality over features**. Keep it simple, keep it useful.