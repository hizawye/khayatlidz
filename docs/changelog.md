# Changelog

All notable changes to this project will be documented in this file.

## [2026-01-31] - Major Architecture Refactor: Component Consolidation

### Changed
- **Complete Route Structure Overhaul**: Consolidated language-specific routes into shared components
  - Deleted 21 duplicate page files (`app/{ar,en,fr}/**/page.tsx`)
  - Created `app/[locale]/` dynamic route structure
  - All pages now use shared components from `app/components/pages/`
  - Single layout in `app/[locale]/layout.tsx` replaces 3 duplicate layouts

- **Component Architecture**: Moved to feature-based organization
  - `app/components/layout/Navbar.tsx` - Shared navigation component
  - `app/components/features/SearchInput.tsx` - Search functionality
  - `app/components/features/PostsGrid.tsx` - Post display grid
  - `app/components/pages/*` - 7 shared page components

- **Convex Schema Updates**:
  - Added `category` field to posts table
  - Added `tags` array field to posts table
  - Created `by_category` index for efficient filtering
  - New queries: `searchPosts()`, `getPostsByCategory()`

- **Translation System**: Enhanced i18n integration
  - 20+ new translation keys across all languages
  - Proper NextIntlClientProvider setup in locale layout
  - Dynamic locale detection and validation

### Removed
- **Eliminated Massive Code Duplication** (90% reduction):
  - 21 language-specific page files deleted
  - 3 old component files removed (Navbar.tsx, Input.tsx, GigsGallery.tsx)
  - Total: 3,136 lines of duplicate code eliminated

### Fixed
- **Multiple ClerkProvider Error**: Removed duplicate provider nesting
- **Undefined Locale Error**: Added fallback logic in i18n configuration
- **Category Images**: Replaced broken placeholders with SVG gradients
- **Translation Loading**: Explicit locale parameter passing

### Technical Details
- **Code Reduction**: -3,136 deletions, +304 insertions (-90% net)
- **Files Changed**: 48 files modified
- **Build Status**: ✅ All languages functional
- **Architecture**: Single source of truth for all page components

---

## [2026-01-30] - Navigation UX Improvements & Final Polish

### Added
- **Improved Language Switcher**: Complete UX overhaul for better clarity
  - Larger, more visible globe icon (w-5 h-5)
  - Clear border to make button more obvious
  - English language names for international clarity (Arabic/English/French)
  - Checkmark icon to indicate current active language
  - Animated chevron that rotates when dropdown opens
  - Dual labels showing both native and English names
  - Better visual hierarchy and spacing in dropdown

- **Category Placeholder Images**: Created images for all 6 categories
  - `/public/categories/kaftan.jpg`
  - `/public/categories/djebba.jpg`
  - `/public/categories/gandoura.jpg`
  - `/public/categories/traditional-suit.jpg`
  - `/public/categories/karakou.jpg`
  - `/public/categories/fetla.jpg`

- **Dynamic Category Detail Pages**: Fixed 404 errors on category routes
  - Created `[slug]` dynamic routes for ar, en, fr
  - Placeholder pages with proper translations
  - Maps category slugs to display names in each language

### Fixed
- **Profile Page Translations**: Complete English and French localization
  - English: "My Designs", "Add New Design", "Sign Out", "No designs yet"
  - French: "Mes Designs", "Ajouter un nouveau design", "Se déconnecter"
  - Fixed text direction (removed RTL alignment for LTR languages)
  - Fixed sign-out redirects to use correct language
  - Fixed post links to maintain language context

- **Language Switcher Confusion**: Resolved major UX issues
  - Previously: Looked like text, unclear it was clickable
  - Now: Clear button appearance with border and hover states
  - Current language clearly indicated with checkmark
  - Better accessibility with aria-label

- **Category Navigation**: No more 404 errors
  - All category links now route to proper pages
  - `/ar/categories/kaftan`, `/en/categories/kaftan`, etc. all work
  - Consistent experience across all three languages

### Changed
- **LanguageSwitcher Component**: Complete redesign
  - Added `Check` icon from lucide-react for current language indicator
  - Added `englishName` property to language objects
  - Improved button styling with border and better padding
  - Enhanced dropdown with better visual feedback
  - Added rotation animation to chevron icon

### Impact
- **User Confusion Eliminated**: Language switching is now intuitive and clear
- **Professional Appearance**: No more broken images or 404 errors
- **Complete Localization**: All pages properly translated across all languages
- **Better Accessibility**: Clear visual indicators and ARIA labels

---

## [2026-01-30] - Complete Multi-Language Platform Implementation

### Added
- **Full French Translation**: Complete homepage localization with professional French translations
  - Hero: "Plateforme numérique pour la mode traditionnelle algérienne"
  - Features: Recherche Facile, Designs Exclusifs, Couturiers Professionnels, Garantie Qualité
  - Sections: Pourquoi Khayatlidz?, Parcourir par Catégorie, Couturiers en Vedette
  - CTA: "Êtes-vous couturier ou créateur ?"
  - Category names: Caftan, Djebba, Gandoura, Costume Traditionnel, Karakou, Fetla

- **Full English Translation**: Complete homepage localization
  - Hero: "Digital Platform for Algerian Traditional Fashion"
  - Features: Easy Search, Exclusive Designs, Professional Tailors, Quality Guarantee
  - All sections translated with culturally appropriate English

### Fixed
- **Language Switching Issue**: Complete resolution of navigation persistence
  - Navbar now dynamically detects current locale from URL pathname
  - All navigation links use `/${currentLocale}` instead of hardcoded `/ar`
  - Language switcher now works seamlessly across all pages

- **Locale-Aware Navigation**:
  - Desktop navigation menu with translated labels per language
  - Mobile drawer menu with language-specific text
  - Profile links, sign-out redirects respect current language
  - Create post buttons link to correct language route

- **Text Direction**:
  - English pages: `dir="rtl"` → `dir="ltr"`
  - French pages: `dir="rtl"` → `dir="ltr"`
  - Arabic pages: `dir="rtl"` (maintained)

### Changed
- **app/Navbar.tsx**: Made fully locale-aware
  - Extracts current locale dynamically: `const currentLocale = pathname?.split('/')[1] || 'ar'`
  - All links now use template literals: `/${currentLocale}/designs`
  - Added conditional translations for menu items (ar/en/fr)
  - Sign-out redirects to current language homepage

- **app/en/page.tsx**: Complete English localization
  - Component renamed: `ArHomePage` → `EnHomePage`
  - Fixed all links: `/ar/` → `/en/`
  - Translated all content from Arabic to English
  - Updated features, categories, and tailor data

- **app/fr/page.tsx**: Complete French localization
  - Component renamed: `ArHomePage` → `FrHomePage`
  - Fixed all links: `/ar/` → `/fr/`
  - Translated all content from Arabic to French
  - Professional French translations for all sections

- **Profile pages** (`app/en/profile/page.tsx`, `app/fr/profile/page.tsx`):
  - Fixed create post button links to use correct locale

### Technical Details
- **Files Modified**: 5 files across 3 commits
- **Total Changes**: 203 insertions, 195 deletions
- **Languages Supported**: 3 (Arabic, English, French)
- **Translation Coverage**: 100% for homepage and navigation
- **RTL/LTR Support**: Proper text direction for all languages

### Impact
- Users can now seamlessly switch between Arabic, English, and French
- All navigation persists in the selected language
- Professional, culturally appropriate translations
- Fully functional multi-language platform

---

## [2026-01-30] - Multi-Language Upload Design Feature

### Fixed
- **Upload Design Functionality**: Implemented complete upload flow across all languages
  - Image upload to Convex storage via `generateUploadUrl`
  - Storage ID collection and post creation
  - User creation fallback for new users
  - Proper error handling with console logging
- **TypeScript Errors**: Fixed type mismatch for userId in createPost mutation
  - Correctly uses Convex ID (`Id<"users">`) instead of Clerk user ID string
  - Proper handling of newly created user IDs
- **Localization Issues**: Fixed Arabic text appearing in French and English versions
  - Proper French translations for all UI elements
  - Proper English translations for all UI elements
  - Language-specific redirects (fr → /fr, en → /en)

### Changed
- **Arabic Version** (`app/ar/posts/create/page.tsx:47`):
  - Complete `handleSubmit` implementation
  - Convex storage integration with proper error handling

- **French Version** (`app/fr/posts/create/page.tsx`):
  - Complete `handleSubmit` implementation
  - Full French localization: "Créer un nouveau design", "Titre", "Description", "Images"
  - Error messages in French
  - Redirects to `/fr` after successful upload

- **English Version** (`app/en/posts/create/page.tsx`):
  - Complete `handleSubmit` implementation
  - Full English localization: "Create New Design", "Title", "Description", "Images"
  - Error messages in English
  - Redirects to `/en` after successful upload

### Technical Details
- **Files Changed**: 3 files (ar, en, fr versions)
- **Total Lines Added**: +105 lines
- **Translations**: Complete UI localization for French and English
- **Bug Fixed**: Upload button was non-functional (placeholder implementation) across all languages

---

## [2026-01-30] - Complete MUI Removal & Build Fixes

### Fixed
- **Build Errors**: Resolved all module-not-found errors blocking production builds
- **MUI Dependencies**: Successfully removed all Material-UI imports causing build failures
- **TypeScript Errors**: Fixed i18n locale type validation issues
- **Import Cleanup**: Removed unused imports and stub files

### Changed
- **Complete MUI Migration (11 files)**
  - `ErrorFallback.tsx`: Converted to Tailwind + lucide-react (AlertCircle, Home icons)
  - `ErrorBoundary.tsx`: Converted to Tailwind + lucide-react (AlertCircle, RefreshCw icons)
  - `LoadingSkeleton.tsx`: Pure Tailwind skeleton animations
  - `Navbar.tsx`: Complete rewrite with native drawer implementation (Menu, Home, Palette, User, LogOut icons)
  - `GigsGallery.tsx`: Removed unused price field reference
  - `app/ar/posts/create/page.tsx`: Full implementation with Tailwind form components
  - `app/ar/posts/[postId]/page.tsx`: Complete detail page with image carousel
  - `app/en/posts/*`: Synced with Arabic implementations
  - `app/fr/posts/*`: Synced with Arabic implementations

- **Component Replacements**
  - MUI Container → Tailwind `max-w-*` containers
  - MUI Typography → Semantic HTML with Tailwind classes
  - MUI Box → Native `div` elements
  - MUI Grid → Tailwind Grid system
  - MUI Button → Native `button` with Tailwind
  - MUI TextField → Native `input/textarea`
  - MUI Skeleton → Custom Tailwind animations
  - MUI Drawer → Custom slide-in panel
  - MUI Icons → lucide-react icons

### Removed
- **Stub Files Deleted**
  - `app/ar/Navbar.tsx`
  - `app/en/Navbar.tsx`
  - `app/fr/Navbar.tsx`

- **Unused Dependencies**
  - No new packages removed (MUI already removed in previous commit)

### Technical Details
- **Build Status**: ✅ Successful compilation
- **Routes Generated**: 20 routes across 3 languages
- **Bundle Size**: Maintained at ~87.6 kB (First Load JS)
- **Files Changed**: 15 modified, 3 deleted
- **TypeScript**: Zero type errors
- **ESLint**: Non-blocking warning from Next.js internals (eslint-config-next v16 compatibility)

### Migration Notes
- All post creation/detail pages now functional across all languages
- Native HTML drawer implementation replaces MUI Drawer component
- Image carousel uses lucide-react ChevronLeft/ChevronRight icons
- Loading states use custom Tailwind pulse animations

---

## [2026-01-30] - Security Updates

### Security
- **Fixed 20 out of 21 security vulnerabilities** (95% reduction)
  - Critical: 1 → 0 (all fixed)
  - High: 6 → 1 (83% fixed)
  - Moderate: 11 → 0 (all fixed)
  - Low: 3 → 0 (all fixed)

### Package Updates
- **Next.js**: 14.2.3 → 14.2.35 (critical security patches)
  - Fixed cache poisoning vulnerabilities
  - Resolved DoS attacks on Server Actions
  - Patched authorization bypass issues
  - Fixed SSRF vulnerabilities
  - Resolved content injection vulnerabilities

- **ESLint**: 8.57.1 → 9.39.2 (major version upgrade)
  - Fixed stack overflow with circular references

- **eslint-config-next**: 14.2.3 → 16.1.6
  - Updated for ESLint 9 compatibility

### Security Patches Applied
- **@babel/runtime** → 7.26.10 (RegExp inefficiency fix)
- **cross-spawn** → 7.0.5 (ReDoS fix)
- **path-to-regexp** → 8.2.0 (backtracking regex fix)
- **brace-expansion** → 2.0.4 (ReDoS fix)
- **cookie** → 1.0.2 (out of bounds characters fix)
- **esbuild** → 0.24.3 (dev server vulnerability fix)
- **micromatch** → 4.0.8 (ReDoS fix)
- **nanoid** → 3.3.8 (predictability fix)
- **glob** - Command injection fix
- **@clerk/nextjs** - Security updates
- **convex** - Security updates

### Dependencies
- **Added**: 84 packages (security updates and dependencies)
- **Removed**: 40 packages (obsolete dependencies)
- **Changed**: 143 packages (security patches)
- **Total**: 476 packages

### Remaining Vulnerabilities
- **1 High Severity**: Next.js DoS vulnerabilities (self-hosted only)
  - Would require Next.js 16.x upgrade (breaking change)
  - Low practical risk for Vercel-hosted deployments
  - Can be addressed in future release

### TypeScript Improvements
- Installed missing type definitions for better IDE support
- Cleared build cache for clean state

---

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

---

## [2026-01-31] - Complete UI/UX Redesign - 90% Code Reduction

### Added
- **Shared Component Architecture**: Created single-source-of-truth components
  - `app/components/pages/HomePage.tsx` - Shared homepage (replaces 3 duplicate files)
  - `app/components/pages/DesignsPage.tsx` - Shared designs page
  - `app/components/pages/CategoriesPage.tsx` - Shared categories page
  - `app/components/pages/ProfilePage.tsx` - Shared profile page
  - `app/components/pages/CategoryDetailPage.tsx` - Dynamic category filtering
  - `app/components/pages/PostDetailPage.tsx` - Shared post detail view
  - `app/components/pages/CreatePostPage.tsx` - Shared post creation

- **Dynamic Locale Layout**: `app/[locale]/layout.tsx`
  - NextIntlClientProvider integration for proper i18n
  - Replaces 3 duplicate layouts (ar/en/fr)
  - Proper locale validation and message loading

- **Reorganized Components**:
  - `app/components/layout/Navbar.tsx` - Fully translated navigation
  - `app/components/features/SearchInput.tsx` - Functional search with state
  - `app/components/features/PostsGrid.tsx` - Locale-aware post grid

- **Convex Backend Functions**:
  - `searchPosts()` query - Full-text search by title/description
  - `getPostsByCategory()` query - Filter posts by category with indexing
  - Database index: `posts.by_category` for efficient filtering

- **Enhanced Translations**: 20+ new translation keys across all languages
  - `home.hero.searchButton`
  - `home.whyUs.videoAria`, `videoFallback`
  - `home.whyUs.authenticity`, `highQuality`, `variety`, `service`
  - `home.categories.exploreMore`
  - `home.featuredTailors.viewAll`
  - `home.cta.title`, `subtitle`, `button`

- **Design System Utilities** (`app/globals.css`):
  - `.gradient-primary` - Brand gradient utility
  - `.gradient-hero` - Hero section gradient
  - `.gradient-overlay` - Image overlay gradients
  - Centralized brand color system

- **Category Placeholder Images**: Beautiful SVG gradients for all 6 categories
  - Purple brand gradients (800x600px)
  - Professional "Traditional Algerian Design" text overlay

### Changed
- **Schema Updates** (`convex/schema.ts`):
  - Added `category: v.optional(v.string())` to posts table
  - Added `tags: v.optional(v.array(v.string()))` to posts table
  - Created `by_category` index for efficient filtering

- **i18n Configuration** (`i18n.ts`):
  - Added fallback logic for undefined locales
  - Explicit locale return to prevent errors
  - Simplified configuration without notFound()

- **Middleware** (`middleware.ts`):
  - Enhanced matcher pattern for better route handling
  - Proper handling of API routes and static files

- **Root Layout** (`app/layout.tsx`):
  - Removed duplicate ClerkProvider (moved to ConvexClientProvider)
  - Clean HTML structure without hardcoded lang/dir
  - Added suppressHydrationWarning for client-side hydration

### Removed
- **21 Duplicate Page Files** (84% code reduction):
  - `app/ar/page.tsx`, `app/en/page.tsx`, `app/fr/page.tsx`
  - `app/ar/layout.tsx`, `app/en/layout.tsx`, `app/fr/layout.tsx`
  - `app/ar/designs/page.tsx` (×3 languages)
  - `app/ar/categories/page.tsx` (×3 languages)
  - `app/ar/categories/[slug]/page.tsx` (×3 languages)
  - `app/ar/profile/page.tsx` (×3 languages)
  - `app/ar/posts/[postId]/page.tsx` (×3 languages)
  - `app/ar/posts/create/page.tsx` (×3 languages)

- **3 Old Component Files**:
  - `app/Navbar.tsx` → moved to components/layout/
  - `app/Input.tsx` → replaced with SearchInput
  - `app/GigsGallery.tsx` → replaced with PostsGrid

### Fixed
- **Multiple ClerkProvider Error**: Eliminated duplicate provider nesting
- **Language Switching**: All 3 languages (ar/en/fr) now fully functional
- **Undefined Locale Error**: Added fallback logic in i18n.ts
- **Category Images**: Replaced broken placeholders with SVG gradients
- **Convex Function Deployment**: Synced new functions (searchPosts, getPostsByCategory)
- **Translation Loading**: Explicit locale parameter passing to getMessages()
- **RTL/LTR Layouts**: Dynamic text direction based on selected language

### Technical Details
- **Files Changed**: 48 files
- **Code Reduction**: 3,136 deletions, 304 insertions (-90%)
- **Net Change**: -2,832 lines eliminated
- **Build Status**: ✅ Successful compilation
- **Convex Deployment**: ✅ Functions deployed with indexes
- **Languages**: 3 (Arabic, English, French) - all 100% functional

### Architecture Impact
**Before:**
- 957+ lines of duplicate code per page type
- 21 duplicate page files across 3 languages
- Hardcoded translations in components
- No proper i18n integration

**After:**
- Single shared component per page type
- 7 shared page components + dynamic routing
- Proper next-intl with translation keys
- 90% code reduction (3,136 lines eliminated)

### Migration Notes
- All language-specific routes now use shared components from `app/components/pages/`
- Locale-specific route files are now minimal wrappers (10-15 lines)
- Single source of truth for all page logic and UI
- Convex queries require deployment via `npx convex dev`

