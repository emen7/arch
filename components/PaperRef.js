/**
 * PaperRef component for Urantia Book paper citations (e.g., "187:1.4")
 * Makes TTS read "Paper 187, section 1, paragraph 4" instead of "187 colon 1 point 4"
 * @param {string} children - The paper reference (e.g., "187:1.4")
 * @param {boolean} short - Use short form "one eighty-seven, one, four" (default: false)
 */
export default function PaperRef({ children, short = false }) {
  const ref = String(children);
  const parts = ref.split(':');

  let ariaLabel;
  if (parts.length === 2 && !short) {
    const [paper, section] = parts;
    const [sec, para] = section.split('.');

    if (para) {
      ariaLabel = `Paper ${paper}, section ${sec}, paragraph ${para}`;
    } else {
      ariaLabel = `Paper ${paper}, section ${sec}`;
    }
  } else if (parts.length === 2 && short) {
    const [paper, section] = parts;
    const [sec, para] = section.split('.');

    if (para) {
      ariaLabel = `${paper}, ${sec}, ${para}`;
    } else {
      ariaLabel = `${paper}, ${sec}`;
    }
  } else {
    ariaLabel = ref;
  }

  return (
    <span aria-label={ariaLabel}>
      {children}
    </span>
  );
}
