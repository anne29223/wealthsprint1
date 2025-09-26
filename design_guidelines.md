# Design Guidelines: 20 Ways to Make $100k App

## Design Approach
**Reference-Based Approach** - Drawing inspiration from productivity platforms like Notion and Linear, combined with motivational finance apps. This balances professional credibility with inspirational energy to drive user engagement and action.

## Core Design Elements

### Color Palette
**Primary Colors:**
- Dark mode: 240 15% 8% (deep navy background)
- Light mode: 240 20% 98% (soft white)
- Brand accent: 142 76% 36% (success green for income/growth)

**Supporting Colors:**
- Text primary: 240 10% 95% (dark mode) / 240 15% 15% (light mode)
- Text secondary: 240 5% 65% (dark mode) / 240 8% 45% (light mode)
- Card backgrounds: 240 10% 12% (dark mode) / 240 30% 97% (light mode)
- Border subtle: 240 15% 20% (dark mode) / 240 20% 90% (light mode)

### Typography
- **Primary Font:** Inter (Google Fonts) - clean, professional readability
- **Display Font:** Poppins (Google Fonts) - for headers and CTAs
- **Hierarchy:** Display text (32-48px), Headings (24-32px), Body (16px), Caption (14px)

### Layout System
**Tailwind Spacing Units:** Consistently use 2, 4, 6, 8, and 12 for spacing (p-4, m-6, gap-8, etc.)
- Container max-width: 7xl (1280px)
- Card padding: 6-8 units
- Section spacing: 12-16 units vertically

### Component Library

**Navigation:**
- Clean top navigation with logo, search, and category filters
- Sticky positioning with subtle backdrop blur

**Strategy Cards:**
- Card-based layout with category badges
- Income potential prominently displayed with green accent
- Time investment and difficulty indicators
- Expandable details with smooth transitions

**Filtering System:**
- Horizontal pill-style category filters
- Search bar with subtle focus states
- Quick filter tags for skills/investment level

**Data Display:**
- Progress indicators for timeline/difficulty
- Income potential displayed with currency formatting
- Clean typography hierarchy within cards

**Forms & Interactions:**
- Minimal form styling with focus on usability
- Subtle hover states on interactive elements
- No distracting animations - focus on smooth transitions

## Visual Treatment

**Gradients:**
Subtle gradients on hero section and card hover states using brand colors (240 15% 8% to 240 20% 12% for depth)

**Background:**
Clean, minimal backgrounds with subtle texture through careful use of opacity and layering

**Contrast:**
High contrast for accessibility while maintaining visual hierarchy through color and typography weight

## Images
**Hero Section:** Large inspirational image showing success/growth (charts, upward trends, or professional workspace) with overlay gradient for text readability
**Strategy Cards:** Small category icons using Heroicons library
**No additional imagery needed** - focus on clean typography and data visualization

This design emphasizes credibility and actionability while maintaining motivational energy to encourage users to pursue their income goals.