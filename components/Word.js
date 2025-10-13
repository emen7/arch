import pronunciationGuide from '@/data/pronunciation-guide.json';

/**
 * Word component for homographs and context-specific pronunciation
 * @param {string} children - The word to display
 * @param {string} homograph - The base word (e.g., "wound", "lead", "read")
 * @param {string} meaning - The specific meaning (e.g., "injury", "past-wind", "metal", "guide")
 * @param {string} aria - Optional direct aria-label override
 */
export default function Word({ children, homograph, meaning, aria }) {
  let ariaLabel = children;

  if (aria) {
    ariaLabel = aria;
  } else if (homograph && meaning) {
    const homographData = pronunciationGuide.homographs[homograph];
    if (homographData && homographData[meaning]) {
      ariaLabel = homographData[meaning].ariaLabel;
    }
  }

  return (
    <span aria-label={ariaLabel}>
      {children}
    </span>
  );
}
