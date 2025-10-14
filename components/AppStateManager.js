'use client';

import { useAppState } from '../hooks/useAppState';

/**
 * AppStateManager component
 * Manages global PWA state persistence
 * Must be included in root layout as a client component
 *
 * Note: State restoration happens in layout.js script (before React hydration)
 * This component only handles state saving during navigation
 */
export default function AppStateManager() {
  // This hook will handle saving state as user navigates and scrolls
  useAppState();

  // This component doesn't render anything
  return null;
}
