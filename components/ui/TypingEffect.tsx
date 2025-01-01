import React, { useState, useEffect } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number; // Speed in milliseconds per character
  onComplete?: () => void;
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 50, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <span>{displayedText}</span>;
};

export default TypingEffect;
