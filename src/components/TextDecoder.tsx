import React, { useEffect, useState, useRef, useCallback } from 'react';

interface TextDecoderProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  iterationsPerChar?: number;
  triggerOnHover?: boolean;
  autoStart?: boolean;
  triggerSignal?: boolean | number;
  onComplete?: () => void;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&@$_//-+=<>[]{}';

export const TextDecoder: React.FC<TextDecoderProps> = ({
  text,
  className = '',
  scrambleSpeed = 25,
  iterationsPerChar = 3,
  triggerOnHover = true,
  autoStart = true,
  triggerSignal,
  onComplete,
  as: Component = 'span',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startDecoder = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsDecoding(true);

    let iteration = 0;
    const maxIterations = text.length * iterationsPerChar;

    intervalRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '\n') return char;
            if (index < Math.floor(iteration / iterationsPerChar)) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');
      });

      iteration += 1;

      if (iteration > maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsDecoding(false);
        if (onComplete) onComplete();
      }
    }, scrambleSpeed);
  }, [text, scrambleSpeed, iterationsPerChar, onComplete]);

  useEffect(() => {
    if (autoStart) {
      startDecoder();
    } else {
      setDisplayText(text);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, autoStart, startDecoder]);

  useEffect(() => {
    if (triggerSignal) {
      startDecoder();
    }
  }, [triggerSignal, startDecoder]);

  return (
    <Component
      className={`inline-block transition-colors cursor-pointer select-none ${
        isDecoding ? 'text-primary' : ''
      } ${className}`}
      onMouseEnter={() => {
        if (triggerOnHover && !isDecoding) {
          startDecoder();
        }
      }}
      onClick={() => {
        if (!isDecoding) {
          startDecoder();
        }
      }}
      title="Click or hover to decode again"
    >
      {displayText || text}
      {isDecoding && (
        <span className="inline-block w-2 h-5 ml-1 bg-primary animate-pulse align-middle" />
      )}
    </Component>
  );
};
