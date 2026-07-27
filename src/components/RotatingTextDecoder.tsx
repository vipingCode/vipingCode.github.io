import React, { useState } from 'react';
import { TextDecoder } from './TextDecoder';

interface RotatingTextDecoderProps {
  roles: string[];
  holdDuration?: number;
  scrambleSpeed?: number;
  iterationsPerChar?: number;
  className?: string;
}

export const RotatingTextDecoder: React.FC<RotatingTextDecoderProps> = ({
  roles,
  holdDuration = 2000,
  scrambleSpeed = 20,
  iterationsPerChar = 2,
  className = '',
}) => {
  const [index, setIndex] = useState(0);

  const handleComplete = () => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, holdDuration);
    return () => clearTimeout(timer);
  };

  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      <TextDecoder
        key={index}
        text={roles[index]}
        scrambleSpeed={scrambleSpeed}
        iterationsPerChar={iterationsPerChar}
        autoStart={true}
        triggerOnHover={false}
        onComplete={handleComplete}
        className="whitespace-nowrap"
      />
    </span>
  );
};
