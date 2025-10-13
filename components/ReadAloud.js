'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * ReadAloud component provides text-to-speech functionality for reports
 * Uses browser's Web Speech API (speechSynthesis)
 * Designed to be easily upgraded to support ElevenLabs audio files
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
  const utteranceRef = useRef(null);
  const chunksRef = useRef([]);
  const currentChunkRef = useRef(0);

  useEffect(() => {
    // Check if Web Speech API is supported
    if (!window.speechSynthesis) {
      setIsSupported(false);
      return;
    }

    // Load available voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Prefer English voices
      const englishVoice = availableVoices.find(v => v.lang.startsWith('en-'));
      if (englishVoice) {
        setSelectedVoice(englishVoice);
      } else if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const extractTextContent = () => {
    const contentElement = document.getElementById(contentId);
    if (!contentElement) return '';

    // Get all text nodes, respecting aria-labels for pronunciation
    const getText = (element) => {
      let text = '';

      for (const node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          text += node.textContent;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          // Use aria-label if present for proper pronunciation
          if (node.hasAttribute('aria-label')) {
            text += node.getAttribute('aria-label');
          } else {
            text += getText(node);
          }

          // Add spacing after block elements
          if (window.getComputedStyle(node).display === 'block') {
            text += ' ';
          }
        }
      }

      return text;
    };

    return getText(contentElement).trim();
  };

  const splitTextIntoChunks = (text) => {
    // Split by sentences for more natural pauses
    // speechSynthesis has character limits, so we chunk the text
    const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    const chunks = [];
    let currentChunk = '';

    for (const sentence of sentences) {
      if (currentChunk.length + sentence.length > 200) {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += ' ' + sentence;
      }
    }

    if (currentChunk) chunks.push(currentChunk.trim());
    return chunks;
  };

  const speakChunk = (chunkIndex) => {
    if (chunkIndex >= chunksRef.current.length) {
      setIsPlaying(false);
      setIsPaused(false);
      currentChunkRef.current = 0;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(chunksRef.current[chunkIndex]);
    utterance.rate = rate;
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => {
      currentChunkRef.current = chunkIndex + 1;
      speakChunk(currentChunkRef.current);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      const text = extractTextContent();
      if (!text) return;

      chunksRef.current = splitTextIntoChunks(text);
      currentChunkRef.current = 0;
      setIsPlaying(true);
      speakChunk(0);
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    currentChunkRef.current = 0;
  };

  const handleRateChange = (newRate) => {
    setRate(newRate);
    if (isPlaying) {
      // Restart with new rate
      handleStop();
      setTimeout(() => handlePlay(), 100);
    }
  };

  if (!isSupported) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Text-to-speech not supported in this browser
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
      {/* Play/Pause/Stop Controls */}
      <div className="flex gap-2">
        {!isPlaying && !isPaused && (
          <button
            onClick={handlePlay}
            className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
            aria-label="Play"
          >
            ▶ Play
          </button>
        )}

        {isPlaying && (
          <button
            onClick={handlePause}
            className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
            aria-label="Pause"
          >
            ⏸ Pause
          </button>
        )}

        {isPaused && (
          <button
            onClick={handlePlay}
            className="px-4 py-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors"
            aria-label="Resume"
          >
            ▶ Resume
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button
            onClick={handleStop}
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Stop"
          >
            ⏹ Stop
          </button>
        )}
      </div>

      {/* Speed Control */}
      <div className="flex items-center gap-2">
        <label htmlFor="speed" className="text-sm">
          Speed:
        </label>
        <select
          id="speed"
          value={rate}
          onChange={(e) => handleRateChange(parseFloat(e.target.value))}
          className="px-2 py-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800"
        >
          <option value="0.5">0.5x</option>
          <option value="0.75">0.75x</option>
          <option value="1">1x</option>
          <option value="1.25">1.25x</option>
          <option value="1.5">1.5x</option>
          <option value="2">2x</option>
        </select>
      </div>

      {/* Voice Selection */}
      {voices.length > 0 && (
        <div className="flex items-center gap-2">
          <label htmlFor="voice" className="text-sm">
            Voice:
          </label>
          <select
            id="voice"
            value={selectedVoice?.name || ''}
            onChange={(e) => {
              const voice = voices.find(v => v.name === e.target.value);
              setSelectedVoice(voice);
            }}
            className="px-2 py-1 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 max-w-[200px]"
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
      )}
    </div>
  );
}
