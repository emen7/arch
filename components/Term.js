import pronunciationGuide from '@/data/pronunciation-guide.json';

/**
 * Term component for Urantia Book terminology with pronunciation guidance for TTS
 * @param {string} children - The term to display
 * @param {string} aria - Optional override for aria-label pronunciation
 */
export default function Term({ children, aria }) {
  const term = children;
  const termData = pronunciationGuide.terms[term];

  // Use provided aria-label, lookup from dictionary, or fall back to term itself
  const ariaLabel = aria || termData?.ariaLabel || term;

  return (
    <span aria-label={ariaLabel}>
      {children}
    </span>
  );
}
