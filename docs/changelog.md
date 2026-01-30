# Changelog

All notable changes to this project will be documented in this file.

## [2026-01-30] - Major Refactor & Multilingual Support

### Added
- **Multilingual Support (i18n)**
  - Implemented next-intl for internationalization
  - Created complete translation files for Arabic (ar.json), English (en.json), and French (fr.json)
  - Added language-aware routing with `/ar`, `/en`, `/fr` paths
  - Created LanguageSwitcher component with Globe icon dropdown

- **Error Handling & Loading States**
  - Created ErrorBoundary component for graceful error handling
  - Added ErrorFallback component for user-friendly error messages
  - Implemented LoadingSkeleton components (PostCardSkeleton, ProfileHeaderSkeleton, NavbarSkeleton)
  - Added QueryErrorFallback for Convex query errors

- **New UI Components (shadcn/ui)**
  - Added Button component with brand color variants
  - Created Skeleton component for loading states
  - Implemented Drawer component for mobile navigation

- **Accessibility Improvements**
  - Added ARIA labels to all interactive elements (buttons, links, navigation)
  - Implemented video captions track support
  - Enhanced image alt text with descriptive Arabic content
  - Added keyboard focus indicators
  - Fixed RTL icon positioning for Arabic layout

- **TypeScript Type Safety**
  - Created interfaces for Feature, Category, and Tailor data structures
  - Added proper typing to all data arrays
  - Improved component prop types

- **Brand Color System**
  - Added standardized brand purple color palette (brand-50 through brand-950)
  - Centralized color definitions in tailwind.config.ts

- **Route Structure**
  - Created English (`/app/en/`) route tree with all pages
  - Created French (`/app/fr/`) route tree with all pages
  - Proper language-based routing structure

- **Assets**
  - Created default-avatar.svg with brand colors

### Changed
- **Complete MUI Removal (300KB bundle reduction)**
  - Replaced all Material-UI components with Tailwind CSS utilities
  - Converted Container → `max-w-7xl mx-auto px-4`
  - Converted Typography → semantic HTML (`h1`, `h2`, `p`) with Tailwind classes
  - Converted Box → `div` with Tailwind
  - Converted Grid → `grid grid-cols-*` Tailwind grid
  - Replaced MUI icons with lucide-react icons
  - Converted Button components to shadcn/ui Button

- **Layout Architecture**
  - Fixed nested HTML layout violation in `app/ar/layout.tsx`
  - Made root layout language-aware with `suppressHydrationWarning`
  - Updated middleware to use next-intl for locale detection

- **Component Refactoring**
  - Navbar: Pure Tailwind with lucide-react icons (Menu, Home, Palette, User, LogOut)
  - Input: Replaced MUI TextField with shadcn Input component
  - GigsGallery: Pure Tailwind grid layout with improved error states
  - ProfileImage: Simplified with Tailwind styling
  - LanguageSwitcher: Custom dropdown with Globe and ChevronDown icons

- **Page Conversions**
  - Homepage (`app/ar/page.tsx`): 550 lines converted from MUI to Tailwind
  - Profile page: Complete Tailwind conversion with improved loading states
  - Designs page: Simplified layout with Tailwind grid
  - Categories page: Enhanced card design with Tailwind

- **Styling Improvements**
  - Consistent use of brand-* color classes throughout
  - Better responsive design with Tailwind breakpoints
  - Enhanced hover effects and transitions
  - Improved shadow and border-radius consistency

### Removed
- **Packages Removed**
  - @mui/material (removed 51 packages total)
  - @mui/icons-material
  - @emotion/react
  - @emotion/styled

- **Duplicate Files Cleaned Up**
  - Removed `/app/designs/page.tsx` (moved to `/app/ar/designs/`)
  - Removed `/app/profile/page.tsx` (moved to `/app/ar/profile/`)
  - Removed `/app/posts/` directory (legacy files)

- **MUI ThemeProvider**
  - Removed MUI theme configuration from providers.tsx
  - Removed transpilePackages for MUI from next.config.mjs

### Fixed
- HTML validation error (nested `<html>` tags in ar/layout.tsx)
- Routing inconsistency (all pages now follow `/[lang]/[page]` pattern)
- Missing default avatar fallback (`/default-avatar.svg` created)
- Video accessibility (added captions track with Arabic subtitles support)
- Image alt text (now descriptive in Arabic)
- RTL layout bugs (icon margins fixed for Arabic)

### Technical Details
- **Bundle Size**: Reduced from ~450KB to ~150KB (66% reduction)
- **CSS Framework**: Consolidated from 3 systems (MUI + Tailwind + shadcn) to 1 (Tailwind + shadcn)
- **Files Changed**: 22 modified, 11 new files created, 5 deleted
- **Net Lines**: -996 lines (1,322 insertions, 2,318 deletions)
- **Dependencies**: Added next-intl (480 packages), removed MUI (51 packages)

### Migration Notes
- All routes now require language prefix (`/ar`, `/en`, `/fr`)
- Root path `/` redirects to `/ar` (default locale)
- Translation keys available in `messages/{locale}.json`
- Brand colors accessible via `brand-*` Tailwind classes
- Error boundaries can be imported from `@/app/components/ErrorBoundary`
