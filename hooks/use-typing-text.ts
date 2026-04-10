"use client";

import { useEffect, useState } from "react";

export function useTypingText(words: string[], speed = 90, pause = 1200) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[wordIndex % words.length];

    const timer = setTimeout(
      () => {
        if (!deleting) {
          const nextText = current.slice(0, text.length + 1);
          setText(nextText);
          if (nextText === current) {
            setTimeout(() => setDeleting(true), pause);
          }
        } else {
          const nextText = current.slice(0, Math.max(text.length - 1, 0));
          setText(nextText);
          if (nextText.length === 0) {
            setDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      deleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timer);
  }, [deleting, pause, speed, text, wordIndex, words]);

  return text;
}
