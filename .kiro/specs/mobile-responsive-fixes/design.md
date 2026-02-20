# Design Document: Mobile Responsive Layout Fixes

## Overview

This design addresses critical mobile responsive layout issues in a React e-commerce application built with React Router, Tailwind CSS, Framer Motion, and Redux. The current implementation displays desktop layouts on mobile devices, uses hardcoded spacing that causes content overlap, and lacks proper responsive breakpoints.

The solution implements a mobile-first responsive design approach with:
- Conditional header rendering based on viewport width
- Dynamic spacing calculations to prevent content overlap
- Responsive typography, grids, and component sizing
- Touch-friendly interactive elements (44x44px minimum)
- Proper container constraints and overflow prevention

## Architecture

### Component Structure

```
Layout.jsx (Root)
├── Conditional Header Rendering
│   ├── MobileHeader.jsx (< 768px)
│   │   ├── Fixed top header with logo, profile, cart
│   │   ├── Search bar (full-width)
│   │   ├── Bottom navigation bar
│   │   └── Slide-in sidebar menu
│   └── DesktopHeader.jsx (>= 768px)
│       ├── Top bar (contact info)
│       ├── Search + sign in bar
│       └── Category navigation menu
├── Dynamic Content Wrapper
│   └── Outlet (React Router)
└── Footer.jsx
```

### Responsive Breakpoint Strategy

Following Tailwind CSS conventions:
- **Mobile**: < 640px (sm breakpoint)
- **Tablet**: 640px - 1024px (sm to lg)
- **Desktop**: >= 1024px (lg and above)

Header switching occurs at 768px (md breakpoint) to align with typical mobile/desktop distinction.

### State Management

- **Viewport Detection**: Custom React hook `useViewport()` to track window width
- **Header Height Tracking**: CSS custom properties or React state to store current header height
- **Menu State**: Existing Redux/Context for mobile menu open/close state

## Components and Interfaces

### 1. useViewport Hook

```typescript
interface ViewportDimensions {
  width: number;
  height: number;
  isMobile: boolean;    // < 768px
  isTablet: boolean;    // 768px - 1024px
  isDesktop: boolean;   // >= 1024px
}

function useViewport(): ViewportDimensions
```

**Purpose**: Provides reactive viewport dimensions and breakpoint booleans.

**Implementation**:
- Uses `window.innerWidth` and `window.innerHeight`
- Debounced resize listener (150ms) to prevent excessive re-renders
- Returns memoized object to prevent unnecessary re-renders

### 2. useHeaderHeight Hook

```typescript
interface HeaderHeight {
  height: number;
  ref: RefObject<HTMLElement>;
}

function useHeaderHeight(): HeaderHeight
```

**Purpose**: Tracks the current header's height dynamically.

**Implementation**:
- Uses `useRef` to reference header element
- Uses `ResizeObserver` to detect height changes
- Returns current height in pixels

### 3. Layout Component (Modified)

```typescript
interface LayoutProps {
  children?: ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element
```

**Changes**:
- Conditionally renders MobileHeader or DesktopHeader based on viewport
- Applies dynamic padding-top to content wrapper based on header height
- Removes hardcoded `pt-[130px]` spacing

**Implementation**:
```jsx
const { isMobile } = useViewport();
const { height: headerHeight } = useHeaderHeight();

return (
  <div className="flex flex-col min-h-screen">
    {isMobile ? <MobileHeader /> : <DesktopHeader />}
    <div 
      className="flex-1 overflow-auto" 
      style={{ paddingTop: `${headerHeight}px` }}
    >
      <Outlet />
    </div>
    <Footer />
  </div>
);
```

### 4. MobileHeader Component (Modified)

**Changes**:
- Remove conditional rendering logic (handled by Layout)
- Ensure fixed positioning with proper z-index
- Optimize search bar for mobile (full-width, appropriate sizing)
- Ensure all interactive elements meet 44x44px minimum

**Responsive Classes**:
```jsx
// Top header
className="fixed top-0 left-0 w-full z-[90] bg-white shadow-md"

// Search bar container
className="px-4 py-2 border-b border-gray-200 bg-white"

// Search input
className="w-full bg-transparent outline-none text-sm min-h-[44px] px-3 py-2"

// Bottom navigation
className="fixed bottom-0 left-0 w-full bg-white border-t z-50 py-2"

// Navigation buttons (ensure 44x44px minimum)
className="flex flex-col items-center min-w-[44px] min-h-[44px] p-2"
```

### 5. DesktopHeader Component (Modified)

**Changes**:
- Remove conditional rendering logic (handled by Layout)
- Ensure proper spacing calculations
- Optimize for tablet and desktop viewports

### 6. ProductCard Component (Modified)

**Responsive Changes**:

```jsx
// Container
className="rounded-[2.5rem] p-3 sm:p-6 md:p-8 lg:p-10"

// Image container
className="aspect-[1/1] p-4 sm:p-6 md:p-8 lg:p-10"

// Brand text
className="text-[9px] sm:text-[10px]"

// Product title
className="text-base sm:text-lg md:text-xl lg:text-2xl"

// Price
className="text-xl sm:text-2xl md:text-3xl"

// Interactive buttons (ensure 44x44px minimum)
className="min-w-[44px] min-h-[44px] p-3"
```

### 7. Grid Layouts (Global Pattern)

**Product Grids**:
```jsx
className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
```

**Category Grids**:
```jsx
// Replace grid-cols-8 with:
className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4"
```

### 8. Section Padding (Global Pattern)

**Hero Sections**:
```jsx
// Replace py-32 or py-48 with:
className="py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32"
```

**Content Sections**:
```jsx
// Replace py-16 or py-20 with:
className="py-6 sm:py-8 md:py-12 lg:py-16"
```

### 9. Typography Scaling (Global Pattern)

**Large Headings**:
```jsx
// Replace text-6xl or text-7xl with:
className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
```

**Medium Headings**:
```jsx
// Replace text-4xl or text-5xl with:
className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
```

**Body Text**:
```jsx
// Replace text-lg or text-xl with:
className="text-sm sm:text-base md:text-lg"
```

### 10. Container Utility (Updated)

**Tailwind Config or CSS**:
```css
.container-custom {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;  /* 16px */
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container-custom {
    max-width: 640px;
    padding-left: 1.5rem;  /* 24px */
    padding-right: 1.5rem;
  }
}

@media (min-width: 768px) {
  .container-custom {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container-custom {
    max-width: 1024px;
    padding-left: 2rem;  /* 32px */
    padding-right: 2rem;
  }
}

@media (min-width: 1280px) {
  .container-custom {
    max-width: 1280px;
  }
}

@media (min-width: 1536px) {
  .container-custom {
    max-width: 1440px;
  }
}
```

### 11. Footer Component (Modified)

**Responsive Layout**:
```jsx
// Footer container
className="bg-white border-t border-gray-100 py-8 sm:py-12 md:py-16"

// Footer columns
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6"

// Footer links
className="py-2 sm:py-3 text-sm sm:text-base min-h-[44px] flex items-center"

// Social media icons
className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center"
```

### 12. Banner/Slider Components (Modified)

**Image Handling**:
```jsx
// Banner image
className="w-full h-auto object-cover"
style={{ maxHeight: '400px' }}

// Slider navigation arrows
className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center"

// Banner text overlay
className="text-xl sm:text-2xl md:text-3xl lg:text-4xl"
```

## Data Models

### ViewportState

```typescript
interface ViewportState {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
```

### HeaderState

```typescript
interface HeaderState {
  type: 'mobile' | 'desktop';
  height: number;
  isScrolled: boolean;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Header Conditional Rendering

*For any* viewport width, exactly one header component (Mobile_Header or Desktop_Header) should be rendered in the DOM, never both simultaneously.

**Validates: Requirements 1.1, 1.2, 1.3, 1.4**

### Property 2: Header Breakpoint Consistency

*For any* viewport width less than 768px, the Mobile_Header should be rendered and Desktop_Header should not be in the DOM; for any viewport width >= 768px, the Desktop_Header should be rendered and Mobile_Header should not be in the DOM.

**Validates: Requirements 1.1, 1.2**

### Property 3: Dynamic Spacing Calculation

*For any* header height value, the Layout component's content wrapper should have padding-top equal to that header height, ensuring no content overlap.

**Validates: Requirements 2.1, 2.2, 2.4**

### Property 4: Responsive Typography Scaling

*For any* heading element with large text classes (text-6xl, text-7xl), when viewport width is less than 640px, the computed font size should be reduced to text-3xl or text-4xl equivalent or smaller.

**Validates: Requirements 3.1, 3.2**

### Property 5: Grid Column Responsiveness

*For any* grid layout, when viewport width is less than 640px, the grid should display in a single column (grid-template-columns: repeat(1, minmax(0, 1fr))).

**Validates: Requirements 4.1**

### Property 6: Touch Target Minimum Size

*For any* interactive element (button, link, icon button), the element should have minimum dimensions of 44x44 pixels to ensure touch accessibility.

**Validates: Requirements 5.4, 12.1, 12.2**

### Property 7: Product Card Padding Reduction

*For any* Product_Card component, when viewport width is less than 640px, the padding should be reduced to p-2 or p-3 (8px or 12px) instead of larger values like p-6 or p-10.

**Validates: Requirements 5.1**

### Property 8: Section Padding Responsiveness

*For any* major page section, when viewport width is less than 640px, sections with large padding (py-32, py-48) should use reduced padding (py-8, py-12).

**Validates: Requirements 6.1**

### Property 9: Container Width Constraints

*For any* container element with container-custom class, the element should have appropriate max-width for the current viewport: full width with padding on mobile (< 640px), constrained width on tablet and desktop.

**Validates: Requirements 7.2, 7.3, 7.4**

### Property 10: Horizontal Overflow Prevention

*For any* page element, when viewport width is between 320px and 768px, no element should cause horizontal scrolling (document.body.scrollWidth should equal window.innerWidth).

**Validates: Requirements 14.1, 14.2**

### Property 11: Footer Column Stacking

*For any* footer component, when viewport width is less than 640px, footer columns should stack vertically (flex-direction: column or grid with 1 column).

**Validates: Requirements 9.1**

### Property 12: Search Bar Mobile Optimization

*For any* search input element on mobile (viewport < 768px), the input should have minimum height of 44px and be full-width or trigger a full-screen overlay.

**Validates: Requirements 10.1, 10.5**

### Property 13: Mobile Menu Body Scroll Lock

*For any* state where the mobile menu is open, the body element should have overflow: hidden to prevent background scrolling.

**Validates: Requirements 10.4, 11.3**

### Property 14: Image Aspect Ratio Preservation

*For any* product image, the image should maintain its aspect ratio across all viewport sizes without distortion.

**Validates: Requirements 5.2, 13.3**

### Property 15: Interactive Element Spacing

*For any* pair of adjacent interactive elements, there should be at least 8px of spacing between them to prevent accidental taps.

**Validates: Requirements 12.3**

## Error Handling

### Viewport Detection Errors

**Issue**: `window` object not available (SSR scenarios)
**Solution**: Check for `typeof window !== 'undefined'` before accessing window properties
**Fallback**: Default to desktop viewport (isMobile: false) during SSR

### ResizeObserver Errors

**Issue**: ResizeObserver not supported in older browsers
**Solution**: Feature detection and polyfill
**Fallback**: Use window.resize event with debouncing

### Header Height Calculation Errors

**Issue**: Header ref not yet mounted
**Solution**: Use useEffect to wait for component mount
**Fallback**: Use default height values (mobile: 130px, desktop: 170px)

### Image Loading Errors

**Issue**: Images fail to load or cause layout shift
**Solution**: Use placeholder with fixed aspect ratio
**Implementation**: 
```jsx
<div className="aspect-[1/1] bg-gray-100">
  <img 
    src={imageSrc} 
    alt={alt}
    onError={(e) => e.target.src = fallbackImage}
    className="w-full h-full object-cover"
  />
</div>
```

### Touch Target Size Violations

**Issue**: Interactive elements smaller than 44x44px
**Solution**: Use padding to increase touch area without changing visual size
**Implementation**:
```jsx
<button className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center">
  <Icon size={20} />
</button>
```

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests for comprehensive coverage:

- **Unit tests**: Verify specific examples, edge cases, and error conditions
- **Property tests**: Verify universal properties across all inputs

### Unit Testing Focus

Unit tests should cover:
- Specific viewport breakpoint transitions (767px → 768px)
- Header component mounting and unmounting
- Edge cases: very small viewports (320px), very large viewports (2560px)
- Error conditions: missing refs, undefined window object
- Integration: Layout component with different header types

### Property-Based Testing Configuration

- **Library**: Use `@fast-check/jest` for JavaScript/TypeScript property-based testing
- **Iterations**: Minimum 100 iterations per property test
- **Tag Format**: Each test must include comment: `// Feature: mobile-responsive-fixes, Property {number}: {property_text}`

### Property Test Examples

**Property 1 Test**:
```javascript
// Feature: mobile-responsive-fixes, Property 1: Header Conditional Rendering
test('exactly one header component should be rendered', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 320, max: 2560 }), // viewport width
      (viewportWidth) => {
        const { container } = render(<Layout />, { 
          viewport: { width: viewportWidth } 
        });
        
        const mobileHeaders = container.querySelectorAll('[data-testid="mobile-header"]');
        const desktopHeaders = container.querySelectorAll('[data-testid="desktop-header"]');
        
        const totalHeaders = mobileHeaders.length + desktopHeaders.length;
        return totalHeaders === 1;
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property 6 Test**:
```javascript
// Feature: mobile-responsive-fixes, Property 6: Touch Target Minimum Size
test('all interactive elements should meet 44x44px minimum', () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 320, max: 768 }), // mobile viewport widths
      (viewportWidth) => {
        const { container } = render(<App />, { 
          viewport: { width: viewportWidth } 
        });
        
        const interactiveElements = container.querySelectorAll('button, a, [role="button"]');
        
        return Array.from(interactiveElements).every(el => {
          const rect = el.getBoundingClientRect();
          return rect.width >= 44 && rect.height >= 44;
        });
      }
    ),
    { numRuns: 100 }
  );
});
```

### Visual Regression Testing

Use tools like Percy or Chromatic to capture screenshots at key breakpoints:
- 320px (small mobile)
- 375px (iPhone)
- 768px (tablet)
- 1024px (desktop)
- 1440px (large desktop)

### Manual Testing Checklist

- [ ] Test on real devices (iOS, Android)
- [ ] Test with touch interactions
- [ ] Test with different font sizes (accessibility)
- [ ] Test with slow 3G network throttling
- [ ] Test landscape and portrait orientations
- [ ] Verify no horizontal scrolling on any page
- [ ] Verify all interactive elements are tappable
- [ ] Verify header doesn't overlap content during scroll
