---
name: Industrial Excellence
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#3d4945'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#6d7a74'
  outline-variant: '#bccac3'
  surface-tint: '#006b56'
  primary: '#006954'
  on-primary: '#ffffff'
  primary-container: '#00846b'
  on-primary-container: '#f5fff9'
  inverse-primary: '#68daba'
  secondary: '#2b6959'
  on-secondary: '#ffffff'
  secondary-container: '#aeecd9'
  on-secondary-container: '#306d5d'
  tertiary: '#974233'
  on-tertiary: '#ffffff'
  tertiary-container: '#b65949'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#86f7d6'
  primary-fixed-dim: '#68daba'
  on-primary-fixed: '#002018'
  on-primary-fixed-variant: '#005140'
  secondary-fixed: '#b1efdb'
  secondary-fixed-dim: '#95d3c0'
  on-secondary-fixed: '#002019'
  on-secondary-fixed-variant: '#0b5042'
  tertiary-fixed: '#ffdad4'
  tertiary-fixed-dim: '#ffb4a6'
  on-tertiary-fixed: '#3f0300'
  on-tertiary-fixed-variant: '#7b2d21'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
  surface-gray: '#F3F4F6'
  white: '#FFFFFF'
  success-teal: '#009478'
  deep-forest: '#004A3C'
typography:
  headline-xl:
    fontFamily: Cairo
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
  headline-lg:
    fontFamily: Cairo
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 44px
  headline-md:
    fontFamily: Cairo
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Cairo
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Cairo
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Cairo
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Cairo
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  headline-xl-mobile:
    fontFamily: Cairo
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Cairo
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 1.5rem
  margin-mobile: 1rem
  margin-desktop: 2rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

The design system is engineered for a leading industrial and electrical distribution firm. The aesthetic is **Corporate / Modern**, emphasizing reliability, scale, and technical authority. It utilizes a professional palette of deep teals and greens, accented by high-visibility interactive elements. 

The visual language is structured and dependable, featuring clean lines, intentional whitespace, and a clear information hierarchy. It is designed specifically for an RTL (Right-to-Left) first experience, ensuring that the flow of information, iconography, and navigation feels natural and authoritative for Arabic-speaking professionals. The goal is to evoke a sense of heritage combined with modern logistical efficiency.

## Colors

The palette is anchored by a sophisticated range of greens and teals, moving away from standard corporate blues to create a distinctive industrial identity.

- **Primary (#009478):** Used for primary actions, active states, and key brand highlights. It represents energy and growth.
- **Secondary (#004A3C):** A deep, foundational green used for headers, footers, and high-contrast backgrounds to establish authority.
- **Neutral (#111827):** A near-black navy used for primary text and iconography to ensure maximum legibility.
- **Surface (#F3F4F6):** A light gray used for section backgrounds to provide subtle contrast against white cards and containers.

## Typography

This design system utilizes **Cairo** as its primary typeface. Cairo is a modern Arabic and Latin multi-script typeface that balances geometric precision with calligraphic roots, making it exceptionally readable for technical and industrial content.

- **Headlines:** Use heavy weights (700) for clear hierarchy.
- **Body Text:** Use regular weights (400) with generous line heights to ensure legibility in technical specifications.
- **RTL Considerations:** Text alignment is right-aligned by default. Tracking (letter-spacing) is kept to a minimum for Arabic characters to maintain script integrity.

## Layout & Spacing

The layout follows a **Fixed Grid** philosophy for desktop screens, centering content within a 1280px container to maintain focus.

- **Grid System:** A 12-column grid is used for desktop, collapsing to 4 columns on mobile.
- **RTL Flow:** The grid starts from the right. Sidebars, navigation icons, and form labels are positioned to accommodate the right-to-left reading pattern.
- **Rhythm:** Spacing follows a 4px/8px base unit. Component internal padding should favor horizontal breathing room (RTL-aware) to prevent cramped text.
- **Breakpoints:**
  - Mobile: < 768px (Single column layouts)
  - Tablet: 768px - 1024px (2-3 column layouts)
  - Desktop: > 1024px (Full 12-column layouts)

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and extremely subtle **Ambient Shadows**.

- **Surface Tiers:** The main background uses the `surface-gray` (#F3F4F6). Primary content cards use `white` (#FFFFFF) to "lift" off the page without requiring heavy shadows.
- **Shadows:** Use low-opacity, large-blur shadows (e.g., `rgba(17, 24, 39, 0.05)`) for interactive elements like cards and dropdowns.
- **Interactive Depth:** On hover, cards should slightly increase their shadow spread or provide a subtle 1px border in the `primary` color to indicate interactivity.

## Shapes

The design system uses a **Soft** shape language. This maintains a professional, industrial feel that is "precision-engineered" rather than "playful."

- **Standard Radius:** 4px (0.25rem) for buttons, input fields, and small UI widgets.
- **Large Radius:** 8px (0.5rem) for cards and decorative containers.
- **RTL Mirroring:** Corner treatments are symmetrical, but directional elements (like carousels or progress bars) must be mirrored to flow right-to-left.

## Components

### Buttons
- **Primary:** Solid `primary` color with white text. 4px border radius.
- **Secondary:** Solid `secondary` (deep green) for high-importance alternative actions.
- **Ghost:** Transparent background with `primary` border and text.
- **Icon Placement:** In RTL, icons should be placed on the left of the label if they are "trailing" icons, and on the right if they are "leading."

### Cards
- White background with an 8px border radius and a subtle 1px gray border or light ambient shadow.
- Used for product categories, service listings, and news items.
- Images within cards should be top-aligned with no top radius to sit flush with the card edge.

### Input Fields
- White background, 1px border (#D1D5DB).
- Labels are positioned above the field, right-aligned.
- Focus state: 2px solid `primary` color.

### Lists & Navigation
- Navigation menus should flow from right (Logo) to left (Actions/Search).
- List items use a leading icon (on the right) and text (aligned right).

### Product Chips
- Small, `surface-gray` backgrounds with `neutral` text for categories or status indicators.