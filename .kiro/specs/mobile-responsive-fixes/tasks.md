# Implementation Plan: Mobile Responsive Layout Fixes

## Overview

This implementation plan systematically addresses mobile responsive layout issues in the React e-commerce application. The approach follows a mobile-first strategy, starting with foundational utilities (viewport detection, header height tracking), then updating core layout components, and finally applying responsive patterns across all UI components.

## Tasks

- [x] 1. Create viewport detection and header height tracking utilities
  - [x] 1.1 Create useViewport custom hook
    - Implement hook with window.innerWidth/innerHeight tracking
    - Add debounced resize listener (150ms delay)
    - Return memoized object with width, height, isMobile, isTablet, isDesktop
    - Add SSR safety check (typeof window !== 'undefined')
    - _Requirements: 1.1, 1.2_
  
  - [x] 1.2 Create useHeaderHeight custom hook
    - Implement hook with useRef for header element
    - Add ResizeObserver to track height changes
    - Return height value and ref object
    - Add fallback for browsers without ResizeObserver support
    - _Requirements: 2.1, 2.2, 2.4_
  
  - [x] 1.3 Write property test for useViewport hook
    - **Property 2: Header Breakpoint Consistency**
    - **Validates: Requirements 1.1, 1.2**
    - Test that viewport widths < 768px return isMobile: true
    - Test that viewport widths >= 768px return isMobile: false
    - Generate random viewport widths from 320px to 2560px

- [x] 2. Update Layout component with conditional header rendering
  - [x] 2.1 Modify Layout.jsx to use viewport detection
    - Import and use useViewport hook
    - Import and use useHeaderHeight hook
    - Add conditional rendering: {isMobile ? <MobileHeader /> : <DesktopHeader />}
    - Remove hardcoded pt-[130px] spacing
    - Apply dynamic paddingTop style based on headerHeight
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3_
  
  - [x] 2.2 Write property test for Layout header rendering
    - **Property 1: Header Conditional Rendering**
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4**
    - Test that exactly one header is rendered at any viewport width
    - Generate random viewport widths and verify single header presence
  
  - [x] 2.3 Write property test for dynamic spacing
    - **Property 3: Dynamic Spacing Calculation**
    - **Validates: Requirements 2.1, 2.2, 2.4**
    - Test that content wrapper padding-top equals header height
    - Generate random header heights and verify padding matches

- [x] 3. Update MobileHeader component for mobile optimization
  - [x] 3.1 Optimize MobileHeader.jsx responsive classes
    - Ensure fixed positioning with z-[90]
    - Make search bar full-width with min-h-[44px]
    - Update bottom navigation buttons to min-w-[44px] min-h-[44px]
    - Ensure all interactive elements meet 44x44px minimum
    - Add data-testid="mobile-header" for testing
    - _Requirements: 10.1, 10.3, 10.5, 12.1, 12.2_
  
  - [x] 3.2 Add body scroll lock when mobile menu is open
    - Add useEffect to set document.body.style.overflow = 'hidden' when menu opens
    - Clean up by resetting overflow when menu closes
    - _Requirements: 11.3_
  
  - [x] 3.3 Write property test for touch target sizes
    - **Property 6: Touch Target Minimum Size**
    - **Validates: Requirements 5.4, 12.1, 12.2**
    - Test all interactive elements in MobileHeader are >= 44x44px
    - Query all buttons, links, and interactive elements
    - Verify dimensions meet minimum requirements

- [x] 4. Update DesktopHeader component
  - [x] 4.1 Optimize DesktopHeader.jsx responsive classes
    - Ensure proper z-index layering
    - Add data-testid="desktop-header" for testing
    - Verify spacing calculations work with dynamic padding
    - _Requirements: 1.2, 1.4_

- [x] 5. Checkpoint - Verify header switching and spacing
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Update ProductCard component for mobile responsiveness
  - [x] 6.1 Add responsive padding classes to ProductCard
    - Update container: p-3 sm:p-6 md:p-8 lg:p-10
    - Update image container: p-4 sm:p-6 md:p-8 lg:p-10
    - Update brand text: text-[9px] sm:text-[10px]
    - Update product title: text-base sm:text-lg md:text-xl lg:text-2xl
    - Update price: text-xl sm:text-2xl md:text-3xl
    - _Requirements: 5.1, 5.3_
  
  - [x] 6.2 Ensure ProductCard images maintain aspect ratio
    - Verify aspect-[1/1] class is applied
    - Add object-contain or object-cover class
    - _Requirements: 5.2, 13.3_
  
  - [x] 6.3 Ensure ProductCard interactive elements meet touch targets
    - Update all buttons: min-w-[44px] min-h-[44px]
    - Add appropriate padding to icon buttons
    - _Requirements: 5.4, 12.1_
  
  - [x] 6.4 Write property test for ProductCard padding
    - **Property 7: Product Card Padding Reduction**
    - **Validates: Requirements 5.1**
    - Test that ProductCard padding is reduced on mobile viewports
    - Verify computed padding values at different breakpoints

- [x] 7. Update grid layouts across the application
  - [x] 7.1 Find and update product grid layouts
    - Search for grid layouts in pages/home, pages/category, pages/search
    - Replace with: grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
    - Update gap spacing: gap-3 sm:gap-4 md:gap-6
    - _Requirements: 4.1, 4.2, 4.3, 5.5_
  
  - [x] 7.2 Find and update category grid layouts
    - Search for grid-cols-8 patterns
    - Replace with: grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6
    - Update gap spacing: gap-2 sm:gap-3 md:gap-4
    - _Requirements: 4.5_
  
  - [x] 7.3 Write property test for grid responsiveness
    - **Property 5: Grid Column Responsiveness**
    - **Validates: Requirements 4.1**
    - Test that grids display single column on mobile (< 640px)
    - Verify grid-template-columns computed value

- [x] 8. Update typography scaling across the application
  - [x] 8.1 Find and update large heading elements
    - Search for text-6xl and text-7xl classes
    - Replace with: text-3xl sm:text-4xl md:text-5xl lg:text-6xl
    - Check home page hero sections, product detail pages
    - _Requirements: 3.1, 3.2_
  
  - [x] 8.2 Find and update medium heading elements
    - Search for text-4xl and text-5xl classes
    - Replace with: text-2xl sm:text-3xl md:text-4xl lg:text-5xl
    - _Requirements: 3.3, 3.4_
  
  - [x] 8.3 Find and update body text elements
    - Search for text-lg and text-xl classes
    - Replace with: text-sm sm:text-base md:text-lg
    - _Requirements: 3.3_
  
  - [x] 8.4 Write property test for typography scaling
    - **Property 4: Responsive Typography Scaling**
    - **Validates: Requirements 3.1, 3.2**
    - Test that large text classes are reduced on mobile
    - Verify computed font sizes at mobile viewport

- [x] 9. Update section padding across the application
  - [x] 9.1 Find and update hero section padding
    - Search for py-32 and py-48 classes
    - Replace with: py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32
    - Check home page, category pages, about page
    - _Requirements: 6.1, 6.2, 6.4_
  
  - [x] 9.2 Find and update content section padding
    - Search for py-16 and py-20 classes
    - Replace with: py-6 sm:py-8 md:py-12 lg:py-16
    - _Requirements: 6.1, 6.2, 6.4_
  
  - [x] 9.3 Write property test for section padding
    - **Property 8: Section Padding Responsiveness**
    - **Validates: Requirements 6.1**
    - Test that large padding is reduced on mobile
    - Verify computed padding values at different breakpoints

- [x] 10. Checkpoint - Verify responsive layouts and typography
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Update container-custom utility class
  - [x] 11.1 Update container-custom in index.css
    - Add responsive max-width constraints
    - Mobile (< 640px): full width with px-4
    - Tablet (640px - 1024px): max-width 768px with px-6
    - Desktop (>= 1024px): max-width 1280px with px-8
    - Add mx-auto for centering
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [x] 11.2 Write property test for container constraints
    - **Property 9: Container Width Constraints**
    - **Validates: Requirements 7.2, 7.3, 7.4**
    - Test that containers have appropriate max-width at each breakpoint
    - Verify computed max-width values

- [x] 12. Update Footer component for mobile responsiveness
  - [x] 12.1 Add responsive grid classes to Footer
    - Update footer columns: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
    - Update footer padding: py-8 sm:py-12 md:py-16
    - Update gap spacing: gap-8 sm:gap-6
    - _Requirements: 9.1, 9.3_
  
  - [x] 12.2 Ensure footer links meet touch target requirements
    - Add classes: py-2 sm:py-3 min-h-[44px] flex items-center
    - _Requirements: 9.2_
  
  - [x] 12.3 Ensure footer social icons meet touch target requirements
    - Update icon containers: w-11 h-11 sm:w-12 sm:h-12
    - _Requirements: 9.5_
  
  - [x] 12.4 Write property test for footer layout
    - **Property 11: Footer Column Stacking**
    - **Validates: Requirements 9.1**
    - Test that footer columns stack vertically on mobile
    - Verify grid-template-columns or flex-direction

- [ ] 13. Update banner and slider components
  - [ ] 13.1 Find and update HeroSlider component
    - Add responsive classes to banner images: w-full h-auto object-cover
    - Add max-height constraint: style={{ maxHeight: '400px' }}
    - Update slider controls: w-11 h-11 sm:w-12 sm:h-12
    - _Requirements: 8.1, 8.2, 8.4_
  
  - [ ] 13.2 Add object-fit classes to banner images
    - Add object-cover or object-contain to prevent distortion
    - _Requirements: 8.3_
  
  - [ ] 13.3 Update banner text overlays for mobile
    - Add responsive text classes: text-xl sm:text-2xl md:text-3xl lg:text-4xl
    - _Requirements: 8.5_

- [ ] 14. Add horizontal overflow prevention
  - [ ] 14.1 Add overflow-x: hidden to body if needed
    - Check if any elements cause horizontal scroll
    - Add overflow-x-hidden class to body in index.css if necessary
    - _Requirements: 14.3_
  
  - [ ] 14.2 Add max-w-full to potentially wide elements
    - Search for images, tables, code blocks
    - Add max-w-full or w-full classes
    - _Requirements: 14.4_
  
  - [ ] 14.3 Write property test for horizontal overflow
    - **Property 10: Horizontal Overflow Prevention**
    - **Validates: Requirements 14.1, 14.2**
    - Test that no elements cause horizontal scrolling
    - Verify document.body.scrollWidth equals window.innerWidth
    - Test at viewport widths from 320px to 768px

- [ ] 15. Add body scroll lock for search overlay
  - [ ] 15.1 Update header.jsx search overlay
    - Add useEffect to lock body scroll when isSearchOpen is true
    - Set document.body.style.overflow = 'hidden'
    - Clean up by resetting overflow when overlay closes
    - _Requirements: 10.4_
  
  - [ ] 15.2 Write property test for scroll lock
    - **Property 13: Mobile Menu Body Scroll Lock**
    - **Validates: Requirements 10.4, 11.3**
    - Test that body has overflow: hidden when menu/overlay is open
    - Verify body overflow style property

- [ ] 16. Add image optimization and lazy loading
  - [ ] 16.1 Add loading="lazy" to product images
    - Update ProductCard image elements
    - Add loading="lazy" attribute
    - _Requirements: 13.5, 15.4_
  
  - [ ] 16.2 Add placeholder elements for images
    - Wrap images in aspect-ratio containers
    - Add bg-gray-100 placeholder background
    - _Requirements: 13.4_
  
  - [ ] 16.3 Add error handling for image loading
    - Add onError handler to set fallback image
    - _Requirements: 13.3_
  
  - [ ] 16.4 Write property test for image aspect ratio
    - **Property 14: Image Aspect Ratio Preservation**
    - **Validates: Requirements 5.2, 13.3**
    - Test that images maintain aspect ratio across viewports
    - Verify image dimensions and aspect ratio

- [ ] 17. Add spacing between interactive elements
  - [ ] 17.1 Audit interactive element spacing
    - Check button groups, navigation menus, icon arrays
    - Ensure minimum 8px gap between elements
    - Add gap-2 or space-x-2 classes where needed
    - _Requirements: 12.3_
  
  - [ ] 17.2 Write property test for interactive element spacing
    - **Property 15: Interactive Element Spacing**
    - **Validates: Requirements 12.3**
    - Test that adjacent interactive elements have >= 8px spacing
    - Measure distances between interactive elements

- [ ] 18. Final checkpoint and testing
  - [ ] 18.1 Run all property-based tests
    - Execute test suite with minimum 100 iterations per property
    - Verify all 15 correctness properties pass
  
  - [ ] 18.2 Manual testing on real devices
    - Test on iOS device (iPhone)
    - Test on Android device
    - Test landscape and portrait orientations
    - Verify no horizontal scrolling on any page
    - Verify all interactive elements are tappable
  
  - [ ] 18.3 Visual regression testing
    - Capture screenshots at 320px, 375px, 768px, 1024px, 1440px
    - Compare with baseline screenshots
    - Verify layouts match design specifications

- [ ] 19. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties
- Unit tests validate specific examples and edge cases
- The implementation follows a mobile-first approach, starting with utilities and core components before applying patterns globally
