import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to track header height dynamically
 * @returns {Object} Header height and ref to attach to header element
 */
function useHeaderHeight() {
  const [height, setHeight] = useState(0);
  const headerRef = useRef(null);
  const resizeObserverRef = useRef(null);

  const updateHeight = useCallback(() => {
    if (headerRef.current) {
      const newHeight = headerRef.current.offsetHeight;
      setHeight(newHeight);
    }
  }, []);

  useEffect(() => {
    // Initial height calculation
    updateHeight();

    // Check if ResizeObserver is supported
    if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
      // Use ResizeObserver for efficient height tracking
      resizeObserverRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const newHeight = entry.target.offsetHeight;
          setHeight(newHeight);
        }
      });

      if (headerRef.current) {
        resizeObserverRef.current.observe(headerRef.current);
      }

      return () => {
        if (resizeObserverRef.current) {
          resizeObserverRef.current.disconnect();
        }
      };
    } else {
      // Fallback: use window resize event with debouncing
      let timeoutId = null;

      const handleResize = () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
          updateHeight();
        }, 150);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [updateHeight]);

  return {
    height,
    ref: headerRef,
  };
}

export default useHeaderHeight;
