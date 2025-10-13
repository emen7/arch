/**
 * Citation component for superscript citation numbers with TTS accessibility
 * Prevents TTS from reading "squared", "cubed", etc.
 * @param {string|number} num - The citation number (1, 2, 3, etc.)
 */
export default function Citation({ num }) {
  // Unicode superscript characters
  const superscripts = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };

  // Convert number to superscript string
  const numStr = String(num);
  const superscript = numStr.split('').map(digit => superscripts[digit] || digit).join('');

  // Add space before for natural TTS pause
  const ariaLabel = ` citation ${num}`;

  return (
    <span aria-label={ariaLabel}>
      {superscript}
    </span>
  );
}
