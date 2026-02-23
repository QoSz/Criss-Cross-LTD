"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

interface Logo {
  id: number;
  name: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  style?: React.CSSProperties;
  className?: string;
}

interface LogoColumnProps {
  logos: Logo[];
  columnIndex: number;
  currentTime: number;
}

interface ResponsiveColumns {
  default: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
}

function LogoColumn({ logos, columnIndex, currentTime }: LogoColumnProps) {
  const CYCLE_DURATION = 2000;
  const columnDelay = columnIndex * 200;
  const adjustedTime = (currentTime + columnDelay) % (CYCLE_DURATION * logos.length);
  const currentIndex = Math.floor(adjustedTime / CYCLE_DURATION);
  const currentLogo = logos[currentIndex];

  return (
    <motion.div
      className="relative h-24 w-48 overflow-hidden md:h-36 md:w-64"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: columnIndex * 0.1,
        duration: 0.5,
        ease: "easeOut",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentLogo.id}-${currentIndex}`}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ y: "10%", opacity: 0 }}
          animate={{
            y: "0%",
            opacity: 1,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 20,
            },
          }}
          exit={{
            y: "-20%",
            opacity: 0,
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src={currentLogo.src}
            alt={currentLogo.alt}
            width={currentLogo.width}
            height={currentLogo.height}
            sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, 300px"
            className={`h-auto w-auto max-h-[90%] max-w-[90%] object-contain ${currentLogo.className || ''}`}
            style={currentLogo.style}
            priority={false}
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function useResponsiveColumns(responsiveColumns?: ResponsiveColumns, staticColumns?: number): number {
  const [columns, setColumns] = useState(() => {
    // Default to static columns or responsive default
    if (staticColumns !== undefined) return staticColumns;
    return responsiveColumns?.default ?? 2;
  });

  useEffect(() => {
    // If using static columns, no responsive behavior needed
    if (staticColumns !== undefined || !responsiveColumns) return;

    const updateColumns = () => {
      const width = window.innerWidth;
      if (responsiveColumns.xl !== undefined && width >= 1280) {
        setColumns(responsiveColumns.xl);
      } else if (responsiveColumns.lg !== undefined && width >= 1024) {
        setColumns(responsiveColumns.lg);
      } else if (responsiveColumns.md !== undefined && width >= 768) {
        setColumns(responsiveColumns.md);
      } else if (responsiveColumns.sm !== undefined && width >= 640) {
        setColumns(responsiveColumns.sm);
      } else {
        setColumns(responsiveColumns.default);
      }
    };

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [responsiveColumns, staticColumns]);

  return columns;
}

interface LogoCarouselProps {
  columns?: number;
  responsiveColumns?: ResponsiveColumns;
  logos: Logo[];
}

export function LogoCarousel({ columns: staticColumns, responsiveColumns, logos }: LogoCarouselProps) {
  const columns = useResponsiveColumns(responsiveColumns, staticColumns);
  const [time, setTime] = useState(0);

  // Seeded random shuffle for deterministic behavior
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const logoColumns = useMemo(() => {
    // Create a deterministic shuffle based on logo IDs
    const seed = logos.reduce((acc, logo) => acc + logo.id, 0);

    // Fisher-Yates shuffle - O(n) instead of O(n log n) sort
    const shuffled = [...logos];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(seededRandom(seed + i) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const result: Logo[][] = Array.from({ length: columns }, () => []);

    // Distribute and track max length in single pass - O(n) with no extra array allocation
    let maxLength = 0;
    shuffled.forEach((logo, index) => {
      const colIndex = index % columns;
      result[colIndex].push(logo);
      maxLength = Math.max(maxLength, result[colIndex].length);
    });

    // Fill columns to equal length
    result.forEach((col, colIndex) => {
      while (col.length < maxLength) {
        const fillIndex = Math.floor(seededRandom(seed + colIndex + col.length) * shuffled.length);
        col.push(shuffled[fillIndex]);
      }
    });

    return result;
  }, [logos, columns]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 500);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div role="region" aria-label="Partner company logos" className="flex justify-center gap-4 py-8">
      {logoColumns.map((columnLogos, index) => (
        <LogoColumn
          key={index}
          logos={columnLogos}
          columnIndex={index}
          currentTime={time}
        />
      ))}
    </div>
  );
}
