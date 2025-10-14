'use client';

import { useEffect } from 'react';
import { useAppState } from '../hooks/useAppState';

/**
 * AppStateManager component
 * Manages global PWA state persistence
 * Must be included in root layout as a client component
 */
export default function AppStateManager() {
  const { restoreSavedState } = useAppState();

  useEffect(() => {
    // Restore saved state on mount (only runs once on app startup)
    restoreSavedState();
  }, [restoreSavedState]);

  // This component doesn't render anything
  return null;
}
