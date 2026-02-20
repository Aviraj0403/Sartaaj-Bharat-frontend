import { useState, useEffect, useMemo } from 'react';

/**
 * Custom hook to track viewport dimensions and breakpoints
 * @returns {Object} Viewport dimensions and breakpoint booleans
 */
function useViewport() {
  const [dimensions, setDimensions] = useState(() => {
    // SSR safety check
    if (typeof window === 'undefined') {
      return {
        width: 1024,
        height: 768,
      };
    }
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  useEffect(() => {
    // SSR safety check
    if (typeof window === 'undefined') return;

    let timeoutId = null;

    const handleResize = () => {
      // Debounce resize events (150ms delay)
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 150);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Memoize the return object to prevent unnecessary re-renders
  const viewport = useMemo(() => ({
    width: dimensions.width,
    height: dimensions.height,
    isMobile: dimensions.width < 768,
    isTablet: dimensions.width >= 768 && dimensions.width < 1024,
    isDesktop: dimensions.width >= 1024,
  }), [dimensions.width, dimensions.height]);

  return viewport;
}

export default useViewport;
