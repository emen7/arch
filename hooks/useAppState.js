'use client';

import { useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';

/**
 * Global PWA state management hook
 * Persists current route and scroll position across app restarts
 *
 * Features:
 * - Saves current pathname and scroll position to localStorage
 * - Restores last position on app startup
 * - Clears state when user explicitly navigates to home
 * - Throttled scroll saving for performance
 */
export function useAppState() {
  const pathname = usePathname();
  const router = useRouter();

  // Save current route to localStorage
  const saveRoute = useCallback((path) => {
    try {
      localStorage.setItem('app-last-route', path);
    } catch (e) {
      console.error('Failed to save route:', e);
    }
  }, []);

  // Save scroll position to localStorage
  const saveScrollPosition = useCallback((position) => {
    try {
      localStorage.setItem('app-scroll-position', position.toString());
    } catch (e) {
      console.error('Failed to save scroll position:', e);
    }
  }, []);

  // Clear saved state
  const clearSavedState = useCallback(() => {
    try {
      localStorage.removeItem('app-last-route');
      localStorage.removeItem('app-scroll-position');
    } catch (e) {
      console.error('Failed to clear state:', e);
    }
  }, []);

  // Restore saved state on mount (call this only from root layout)
  const restoreSavedState = useCallback(() => {
    try {
      const savedRoute = localStorage.getItem('app-last-route');
      const savedScroll = localStorage.getItem('app-scroll-position');

      if (savedRoute && savedRoute !== '/' && pathname === '/') {
        // Only restore if we're on home page (app just opened)
        router.replace(savedRoute);

        // Restore scroll after navigation
        if (savedScroll) {
          setTimeout(() => {
            window.scrollTo(0, parseInt(savedScroll, 10));
          }, 100);
        }

        return true; // State was restored
      }
    } catch (e) {
      console.error('Failed to restore state:', e);
    }
    return false; // No state to restore
  }, [pathname, router]);

  // Save route when pathname changes
  useEffect(() => {
    saveRoute(pathname);

    // Clear state if user is on home page
    // (they navigated here explicitly, so don't restore this)
    if (pathname === '/') {
      clearSavedState();
    }
  }, [pathname, saveRoute, clearSavedState]);

  // Track scroll position with throttling
  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Throttle: save scroll position 500ms after user stops scrolling
      timeoutId = setTimeout(() => {
        const scrollPosition = window.scrollY;
        saveScrollPosition(scrollPosition);
      }, 500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [saveScrollPosition]);

  return {
    saveRoute,
    saveScrollPosition,
    clearSavedState,
    restoreSavedState,
  };
}
