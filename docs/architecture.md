# Project Architecture

## Overview
Khayatlidz is a multilingual (Arabic, English, French) Next.js 14 application for connecting Algerian traditional fashion tailors with customers. Built with TypeScript, Tailwind CSS, and real-time backend via Convex.

## Tech Stack

### Frontend
- **Framework**: Next.js 14.2.3 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4.1
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: lucide-react
- **Internationalization**: next-intl

### Backend & Auth
- **Database**: Convex (real-time)
- **Authentication**: Clerk
- **Image Hosting**: Multiple sources (ibb.co, Convex cloud, Clerk)

### Key Dependencies
- React 18
- Convex 1.11.3
- Clerk/Next.js 5.1.2
- class-variance-authority (component variants)
- embla-carousel-react (carousels)

## Application Structure

```
khayatlidz/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Language-based routing (coming soon)
│   ├── ar/                       # Arabic routes (primary)
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Arabic layout wrapper
│   │   ├── Navbar.tsx            # Navigation component
│   │   ├── designs/              # Designs listing
│   │   ├── categories/           # Categories browser
│   │   ├── profile/              # User profile
│   │   └── posts/                # Post CRUD
│   │       ├── [postId]/         # Post detail view
│   │       └── create/           # Create new post
│   ├── en/                       # English routes (structure mirrors /ar)
│   ├── fr/                       # French routes (structure mirrors /ar)
│   ├── components/               # Shared React components
│   │   ├── ErrorBoundary.tsx     # Error boundary for crash handling
│   │   ├── ErrorFallback.tsx     # User-friendly error UI
│   │   ├── LoadingSkeleton.tsx   # Loading state skeletons
│   │   ├── LanguageSwitcher.tsx  # Language selection dropdown
│   │   └── ProfileImage.tsx      # Reusable avatar component
│   ├── Navbar.tsx                # Main navigation bar
│   ├── Input.tsx                 # Search input component
│   ├── GigsGallery.tsx           # Posts grid display
│   ├── ConvexClientProvider.tsx  # Convex + Clerk integration
│   ├── providers.tsx             # React context providers
│   ├── layout.tsx                # Root layout (RTL support)
│   ├── page.tsx                  # Root redirect to /ar
│   └── globals.css               # Global styles
│
├── components/ui/                # shadcn/ui components
│   ├── button.tsx                # Button component (brand colors)
│   ├── card.tsx                  # Card container
│   ├── carousel.tsx              # Carousel wrapper
│   ├── input.tsx                 # Form input
│   ├── drawer.tsx                # Mobile drawer/sidebar
│   └── skeleton.tsx              # Loading skeleton
│
├── convex/                       # Backend (Convex)
│   ├── posts.ts                  # Post queries/mutations
│   ├── users.ts                  # User management
│   ├── schema.ts                 # Database schema
│   └── auth.config.ts            # Clerk integration
│
├── lib/
│   └── utils.ts                  # Tailwind utility helpers
│
├── messages/                     # i18n translation files
│   ├── ar.json                   # Arabic translations
│   ├── en.json                   # English translations
│   └── fr.json                   # French translations
│
├── public/                       # Static assets
│   ├── categories/               # Category images
│   ├── tailors/                  # Tailor profile images
│   ├── videos/                   # Marketing videos
│   └── default-avatar.svg        # Fallback avatar
│
├── i18n.ts                       # next-intl configuration
├── middleware.ts                 # next-intl locale routing
├── tailwind.config.ts            # Tailwind config + brand colors
└── next.config.mjs               # Next.js config + next-intl plugin
```

## Data Models (Convex Schema)

### Posts
```typescript
{
  _id: Id<"posts">,
  title: string,
  description?: string,
  imageUrls: string[],
  userId: Id<"users">,
  category?: string,
  createdAt: number,
  authorName: string,
  authorImage: string
}
```

### Users
```typescript
{
  _id: Id<"users">,
  clerkId: string,
  email: string,
  name?: string,
  imageUrl?: string
}
```

## Routing Architecture

### Language-Based Routing
- **Pattern**: `/{locale}/{page}`
- **Supported Locales**: `ar` (Arabic - default), `en` (English), `fr` (French)
- **Root Redirect**: `/` → `/ar`
- **Implementation**: next-intl middleware with locale detection

### Route Structure
```
/ar                     → Arabic homepage
/ar/designs             → All designs
/ar/categories          → Category browser
/ar/categories/{slug}   → Category detail
/ar/profile             → User profile
/ar/posts/{id}          → Post detail
/ar/posts/create        → Create post

/en/*                   → English equivalents
/fr/*                   → French equivalents
```

## Component Architecture

### Layout Hierarchy
```
RootLayout (app/layout.tsx)
├── ConvexClientProvider (Convex + Clerk)
│   └── Providers (React context)
│       └── Language-specific Layout (app/{locale}/layout.tsx)
│           └── Page Components
```

### Key Design Patterns

1. **Error Boundaries**
   - App-wide error catching via ErrorBoundary component
   - Graceful degradation with user-friendly fallback UI
   - Query-level error handling with QueryErrorFallback

2. **Loading States**
   - Skeleton loaders for async content
   - Convex query loading states (`!data` check)
   - Progressive enhancement

3. **Responsive Design**
   - Mobile-first approach with Tailwind breakpoints
   - Drawer navigation for mobile (`<Drawer>` component)
   - Desktop navbar with full navigation

4. **RTL Support**
   - Arabic layout uses `dir="rtl"` attribute
   - Tailwind RTL-aware spacing utilities
   - Language switcher updates document direction

5. **Type Safety**
   - TypeScript interfaces for all data structures
   - Strict typing for Convex queries/mutations
   - Component prop validation

## Styling System

### Tailwind CSS + shadcn/ui
- **Utility-First**: Tailwind classes for all styling
- **Component Variants**: class-variance-authority for button/card variants
- **Brand Colors**: Centralized purple palette (`brand-50` to `brand-950`)
- **Responsive**: Mobile-first breakpoints (sm, md, lg, xl, 2xl)
- **Dark Mode**: Configured but not yet implemented

### Color Palette
```
brand-50:  #faf5ff  (lightest purple)
brand-100: #f3e8ff
brand-500: #a855f7  (main brand color)
brand-700: #7e22ce  (primary purple)
brand-900: #581c87  (dark purple)
brand-950: #3b0764  (darkest)
```

## Authentication Flow (Clerk)

1. User signs in via Clerk modal (`<SignInButton>`)
2. Clerk creates session and user object
3. Convex webhook syncs user to database
4. User data available via `useUser()` hook
5. Protected routes check auth state (`<Authenticated>` wrapper)

## Internationalization (i18n)

### Implementation: next-intl
- **Config**: `i18n.ts` with locale validation
- **Messages**: JSON files in `messages/{locale}.json`
- **Middleware**: Automatic locale detection and routing
- **Usage**: Translation keys organized by feature (nav, home, profile, errors, etc.)

### Translation Structure
```typescript
{
  "nav": { "home": "...", "designs": "..." },
  "home": { "hero": {...}, "features": {...} },
  "profile": { "title": "...", "myDesigns": "..." },
  "errors": { "unexpected": "...", "retry": "..." }
}
```

## State Management

### Convex Reactive Queries
- Real-time data sync via `useQuery()`
- Optimistic updates with `useMutation()`
- Automatic cache invalidation
- No Redux/Zustand needed

### React State
- Local UI state via `useState()` (modals, dropdowns)
- Form state managed locally
- Navigation state in URL (Next.js router)

## Performance Optimizations

1. **Bundle Size**
   - Removed Material-UI (300KB reduction)
   - Tree-shaking with Tailwind CSS
   - Dynamic imports for heavy components

2. **Image Optimization**
   - Next.js Image component with automatic optimization
   - Remote image patterns configured
   - Lazy loading for below-fold content

3. **Code Splitting**
   - App Router automatic code splitting
   - Route-based chunking
   - Component-level lazy loading where needed

## Security Considerations

1. **Authentication**: Clerk handles auth security
2. **Database**: Convex enforces auth rules server-side
3. **Input Validation**: Client-side validation + server-side in Convex mutations
4. **XSS Prevention**: React escapes by default
5. **Image Upload**: Convex signed upload URLs

## Deployment

- **Platform**: Vercel (recommended)
- **Environment Variables**:
  - `NEXT_PUBLIC_CONVEX_URL`
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - `CLERK_SECRET_KEY`

## Future Architectural Considerations

1. **Search**: Implement full-text search (Convex or Algolia)
2. **Caching**: Add Redis for frequently accessed data
3. **CDN**: CloudFlare for static assets
4. **Analytics**: Add Vercel Analytics or Plausible
5. **Testing**: Jest + React Testing Library + Playwright
