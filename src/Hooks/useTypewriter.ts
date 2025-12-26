import { useEffect, useState } from 'react';

export function useTypewriter(words: string[]) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, 100);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentWord.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, 150);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1000);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentWordIndex, words]);

  return displayedText;
}