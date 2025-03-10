"use client";

import React, { useState, useEffect } from 'react';

const ComingSoonPage = () => {
  const [displayText, setDisplayText] = useState('');
  const [fullText, setFullText] = useState('Coming Soon...');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  // Memoize messages array to prevent unnecessary re-renders
  const messages = React.useMemo(() => [
    'Coming Soon...',
    'Stay Tuned!',
    'Cooking Up Something Special!',
    'Almost There...'
  ], []);

  useEffect(() => {
    const tick = () => {
      const fullTxt = fullText;
      const updatedText = isDeleting 
        ? fullTxt.substring(0, displayText.length - 1)
        : fullTxt.substring(0, displayText.length + 1);

      setDisplayText(updatedText);

      if (!isDeleting && updatedText === fullTxt) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        setLoopNum(prev => {
          const nextLoop = prev + 1;
          setFullText(messages[nextLoop % messages.length]);
          return nextLoop;
        });
      }
    };

    // Changed from let to const since timer is only assigned once
    const baseSpeed = isDeleting ? 50 : 100;
    const variance = isDeleting ? 30 : 50;
    const timer = setTimeout(tick, baseSpeed + Math.random() * variance);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, fullText, messages]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100/70 to-gray-100/30 dark:from-gray-900/70 dark:to-gray-900/30">
      <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text dark:from-blue-400 dark:to-purple-400 pb-8">
        {displayText}
        <span className="inline-block ml-0.5 w-[2px] h-[1.2em] bg-current opacity-70 animate-[blink_1s_ease-in-out_infinite] dark:bg-white" />
      </h1>
      <p className="text-lg text-center text-gray-600 dark:text-gray-400">
        We&apos;re working hard to bring you something amazing!
      </p>
    </div>
  );
};

export default ComingSoonPage; 