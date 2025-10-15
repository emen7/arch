'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * ReadAloud component provides text-to-speech functionality for reports
 * Features:
 * - Sticky controls in report header
 * - Reads from current scroll position
 * - Visual highlight of currently reading paragraph
 * - Compact UI with expandable settings
 *
 * @param {string} contentId - ID of the content element to read
 */
export default function ReadAloud({ contentId = 'report-content' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1.0);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSupported, setIsSupported] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [currentParagraphIndex, setCurrentParagraphIndex] = useState(0);
  const [paragraphs, setParagraphs] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const utteranceRef = useRef(null);
  const currentUtteranceIndexRef = useRef(0);
  const paragraphsRef = useRef([]);
  const wakeLockRef = useRef(null);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent.toLowerCase());
    };
    setIsMobile(checkMobile());

    // Check if Web Speech API is supported
    if (!window.speechSynthesis) {
      setIsSupported(false);
      return;
    }

    // Load available voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();

      // Android workaround: Sometimes voices aren't loaded yet
      // If we get an empty array, retry after a short delay
      if (availableVoices.length === 0) {
        setTimeout(() => {
          const retryVoices = window.speechSynthesis.getVoices();
          if (retryVoices.length > 0) {
            setVoices(retryVoices);
            selectDefaultVoice(retryVoices);
          }
        }, 100);
        return;
      }

      setVoices(availableVoices);
      selectDefaultVoice(availableVoices);
    };

    const selectDefaultVoice = (availableVoices) => {
      // Check for saved voice preference
      const savedVoiceName = localStorage.getItem('tts-voice-preference');
      let voiceToUse = null;

      if (savedVoiceName) {
        // Try to find the saved voice
        voiceToUse = availableVoices.find(v => v.name === savedVoiceName);
      }

      // If no saved voice or saved voice not found, use default priority:
      // 1. Mark - English (United States)
      // 2. Any other English voice
      if (!voiceToUse) {
        const markVoice = availableVoices.find(v =>
          v.name.includes('Mark') && v.lang.startsWith('en-US')
        );
        const anyEnglishVoice = availableVoices.find(v => v.lang.startsWith('en-'));

        if (markVoice) {
          voiceToUse = markVoice;
        } else if (anyEnglishVoice) {
          voiceToUse = anyEnglishVoice;
        } else if (availableVoices.length > 0) {
          voiceToUse = availableVoices[0];
        }
      }

      if (voiceToUse) {
        setSelectedVoice(voiceToUse);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
      releaseWakeLock();
    };
  }, []);

  // Wake Lock API functions to keep screen on during reading
  const requestWakeLock = async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await navigator.wakeLock.request('screen');
        console.log('Wake Lock activated');

        // Listen for wake lock release (e.g., if user switches tabs)
        wakeLockRef.current.addEventListener('release', () => {
          console.log('Wake Lock released');
        });
      }
    } catch (err) {
      console.log('Wake Lock request failed:', err.message);
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release();
        wakeLockRef.current = null;
        console.log('Wake Lock manually released');
      } catch (err) {
        console.log('Wake Lock release failed:', err.message);
      }
    }
  };

  // Extract paragraphs from content
  const extractParagraphs = () => {
    const contentElement = document.getElementById(contentId);
    if (!contentElement) return [];

    // Get all paragraph elements, headings, and blockquotes
    const elements = contentElement.querySelectorAll('p, h2, h3, li, blockquote');
    const paragraphsData = [];

    elements.forEach((element, index) => {
      // Skip elements that are inside aria-hidden containers
      let parent = element.parentElement;
      while (parent && parent !== contentElement) {
        if (parent.getAttribute('aria-hidden') === 'true') {
          return; // Skip this element
        }
        parent = parent.parentElement;
      }

      // Get text, respecting aria-labels
      const getText = (el) => {
        let text = '';
        for (const node of el.childNodes) {
          if (node.nodeType === Node.TEXT_NODE) {
            text += node.textContent;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            if (node.hasAttribute('aria-label')) {
              text += node.getAttribute('aria-label');
            } else {
              text += getText(node);
            }
          }
        }
        return text;
      };

      const text = getText(element).trim();
      if (text) {
        paragraphsData.push({ text, element, index });
      }
    });

    return paragraphsData;
  };

  // Find first visible paragraph at top of viewport
  const findParagraphAtScrollPosition = () => {
    if (paragraphs.length === 0) return 0;

    // Find first paragraph that's visible in the viewport
    // Account for sticky header: ~93px + buffer (35px) = 128px from top
    const topOffset = 128;

    for (let i = 0; i < paragraphs.length; i++) {
      const rect = paragraphs[i].element.getBoundingClientRect();

      // If paragraph top is visible (below the header offset)
      if (rect.top >= topOffset && rect.top < window.innerHeight) {
        return i;
      }

      // If paragraph contains the top offset (we're in the middle of it)
      if (rect.top < topOffset && rect.bottom > topOffset) {
        return i;
      }
    }

    return 0;
  };

  // Highlight current paragraph
  const highlightParagraph = (index) => {
    // Remove previous highlights
    paragraphs.forEach(para => {
      para.element.style.backgroundColor = '';
    });

    // Add highlight to current
    if (paragraphs[index]) {
      const bgColor = document.documentElement.classList.contains('dark')
        ? 'rgba(96, 165, 250, 0.2)'  // blue-400 with opacity
        : 'rgba(252, 231, 243, 0.8)'; // pink-100

      paragraphs[index].element.style.backgroundColor = bgColor;
      paragraphs[index].element.style.transition = 'background-color 0.3s ease';

      // Scroll to paragraph ONLY if it's actually out of view
      const rect = paragraphs[index].element.getBoundingClientRect();
      const headerHeight = 128; // Account for sticky header (~93px) + buffer
      const bottomMargin = 100;

      // Only scroll if element is:
      // 1. Above the viewport (hidden by header) - top < headerHeight
      // 2. Below the viewport (off screen) - bottom > window height
      const isAboveView = rect.top < headerHeight;
      const isBelowView = rect.bottom > window.innerHeight - bottomMargin;
      const isCompletelyAbove = rect.bottom < headerHeight;

      if (isCompletelyAbove || isBelowView) {
        // Element is completely hidden, scroll to center
        paragraphs[index].element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else if (isAboveView && rect.top < headerHeight - 50) {
        // Element is partially hidden by header (but more than 50px above)
        // Scroll just enough to show it
        paragraphs[index].element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // If element is already visible, don't scroll at all
    }
  };

  // Speak a paragraph
  const speakParagraph = (index) => {
    const currentParagraphs = paragraphsRef.current;

    if (index >= currentParagraphs.length) {
      // Finished reading
      handleStop();
      return;
    }

    const para = currentParagraphs[index];
    const utterance = new SpeechSynthesisUtterance(para.text);
    utterance.rate = rate;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setCurrentParagraphIndex(index);
      highlightParagraph(index);
    };

    utterance.onend = () => {
      currentUtteranceIndexRef.current = index + 1;
      speakParagraph(currentUtteranceIndexRef.current);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      handleStop();
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    // Request wake lock to keep screen on during reading
    requestWakeLock();

    if (isPaused) {
      // Resume from pause
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      // Start fresh
      const extractedParagraphs = extractParagraphs();

      if (extractedParagraphs.length === 0) {
        console.log('No paragraphs found');
        return;
      }

      // Start from current scroll position - use extractedParagraphs directly
      // since state update is asynchronous
      const findStartIndex = () => {
        const topOffset = 128;

        // Look for elements that are visible or just above the viewport
        // This helps catch section titles (h2, h3) that may be just above
        for (let i = 0; i < extractedParagraphs.length; i++) {
          const rect = extractedParagraphs[i].element.getBoundingClientRect();
          const element = extractedParagraphs[i].element;
          const isHeading = element.tagName === 'H2' || element.tagName === 'H3';

          // If this is a heading just above the fold, include it
          if (isHeading && rect.bottom > topOffset - 100 && rect.top < topOffset) {
            return i;
          }

          // If paragraph is visible below header
          if (rect.top >= topOffset && rect.top < window.innerHeight) {
            return i;
          }

          // If we're in the middle of reading this paragraph
          if (rect.top < topOffset && rect.bottom > topOffset) {
            return i;
          }
        }
        return 0;
      };

      const startIndex = findStartIndex();

      // Update both state and ref immediately
      paragraphsRef.current = extractedParagraphs;
      setParagraphs(extractedParagraphs);
      currentUtteranceIndexRef.current = startIndex;
      setCurrentParagraphIndex(startIndex);
      setIsPlaying(true);

      // Highlight immediately
      if (extractedParagraphs[startIndex]) {
        const bgColor = document.documentElement.classList.contains('dark')
          ? 'rgba(96, 165, 250, 0.2)'
          : 'rgba(252, 231, 243, 0.8)';
        extractedParagraphs[startIndex].element.style.backgroundColor = bgColor;
        extractedParagraphs[startIndex].element.style.transition = 'background-color 0.3s ease';
      }

      // Start speaking (will use paragraphsRef.current)
      speakParagraph(startIndex);
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
    // Release wake lock when paused
    releaseWakeLock();
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);

    // Clear highlight
    paragraphs.forEach(para => {
      para.element.style.backgroundColor = '';
    });

    // Release wake lock when stopped
    releaseWakeLock();
  };

  const handleRateChange = (newRate) => {
    setRate(newRate);
    if (isPlaying) {
      // Continue from current position with new rate
      const currentIndex = currentUtteranceIndexRef.current;
      handleStop();
      setTimeout(() => {
        currentUtteranceIndexRef.current = currentIndex;
        setIsPlaying(true);
        speakParagraph(currentIndex);
      }, 100);
    }
  };

  if (!isSupported) {
    return (
      <div className="text-xs text-gray-500 dark:text-gray-400">
        TTS not supported
      </div>
    );
  }

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Reading Status */}
      {(isPlaying || isPaused) && paragraphs.length > 0 && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {currentParagraphIndex + 1} / {paragraphs.length}
        </span>
      )}

      {/* Compact Play/Pause/Stop Controls - Smaller icons */}
      <div className="flex gap-1">
        {!isPlaying && !isPaused && (
          <button
            onClick={handlePlay}
            className="p-1 text-sm leading-none bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
            aria-label="Read Aloud"
            title="Read from here"
          >
            ▶
          </button>
        )}

        {isPlaying && (
          <button
            onClick={handlePause}
            className="p-1 text-sm leading-none bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
            aria-label="Pause"
            title="Pause reading"
          >
            ⏸
          </button>
        )}

        {isPaused && (
          <button
            onClick={handlePlay}
            className="p-1 text-sm leading-none bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
            aria-label="Resume"
            title="Resume reading"
          >
            ▶
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            className="p-1 text-sm leading-none border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Stop"
            title="Stop reading"
          >
            ⏹
          </button>
        )}
      </div>

      {/* Settings Toggle */}
      <div className="relative">
        <button
          onClick={() => {
            setShowSettings(!showSettings);
            // Android workaround: Try loading voices on user interaction
            if (!showSettings && voices.length === 0) {
              setTimeout(() => {
                const availableVoices = window.speechSynthesis.getVoices();
                if (availableVoices.length > 0) {
                  setVoices(availableVoices);
                  // Set default voice if none selected
                  if (!selectedVoice) {
                    const anyEnglishVoice = availableVoices.find(v => v.lang.startsWith('en-'));
                    if (anyEnglishVoice) {
                      setSelectedVoice(anyEnglishVoice);
                    } else if (availableVoices.length > 0) {
                      setSelectedVoice(availableVoices[0]);
                    }
                  }
                }
              }, 50);
            }
          }}
          className="p-1 text-sm leading-none border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          aria-label="TTS Settings"
          title="Reading settings"
        >
          ⚙
        </button>

        {/* Settings Panel */}
        {showSettings && (
          <div className="absolute top-full right-0 mt-2 p-4 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg z-50 w-[250px] max-w-[calc(100vw-2rem)]">
            <h3 className="text-sm font-semibold mb-3">Reading Settings</h3>

            {isMobile ? (
              // Mobile: Show informational message
              <>
                <div className="mb-3">
                  <label className="text-xs block mb-1">Voice:</label>
                  <div className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    System
                  </div>
                </div>
                <div className="mb-3 p-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded">
                  Voice and speed settings are controlled by your device's text-to-speech settings. To modify these options, please adjust them in your phone's system settings.
                </div>
              </>
            ) : (
              // Desktop: Show functional controls
              <>
                {/* Speed Control */}
                <div className="mb-3">
                  <label htmlFor="speed" className="text-xs block mb-1">
                    Speed: {rate}x
                  </label>
                  <select
                    id="speed"
                    value={rate}
                    onChange={(e) => handleRateChange(parseFloat(e.target.value))}
                    className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
                  >
                    <option value="0.8">0.8x</option>
                    <option value="0.9">0.9x</option>
                    <option value="1">1.0x (Normal)</option>
                    <option value="1.1">1.1x</option>
                    <option value="1.2">1.2x</option>
                    <option value="1.3">1.3x</option>
                    <option value="1.5">1.5x</option>
                    <option value="2">2.0x</option>
                  </select>
                </div>

                {/* Voice Selection */}
                {voices.length > 0 ? (
                  <div className="mb-3">
                    <label htmlFor="voice" className="text-xs block mb-1">
                      Voice:
                    </label>
                    <select
                      id="voice"
                      value={selectedVoice?.name || ''}
                      onChange={(e) => {
                        const voice = voices.find(v => v.name === e.target.value);
                        setSelectedVoice(voice);
                        // Save user's voice preference
                        if (voice) {
                          localStorage.setItem('tts-voice-preference', voice.name);
                        }
                      }}
                      className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
                    >
                      {voices
                        .filter(v => v.lang.startsWith('en-'))
                        .map((voice) => (
                          <option key={voice.name} value={voice.name}>
                            {voice.name}
                          </option>
                        ))}
                    </select>
                  </div>
                ) : (
                  <div className="mb-3 p-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded">
                    Loading voices... If voices don't appear, try closing and reopening this panel.
                  </div>
                )}
              </>
            )}

            {/* Close Button */}
            <button
              onClick={() => setShowSettings(false)}
              className="w-full mt-2 px-2 py-1 text-xs bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
