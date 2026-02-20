import { useState, useEffect } from 'react';

/**
 * Custom hook to track viewport width and determine if it's mobile.
 * Default breakpoint for mobile is < 1024px (LG in Tailwind).
 */
export const useViewport = (breakpoint = 1024) => {
    const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1440);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);

        // Initial check
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return {
        width,
        isMobile: width < breakpoint,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
    };
};
