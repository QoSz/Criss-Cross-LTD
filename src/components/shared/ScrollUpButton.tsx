"use client";

import { useState, useEffect, type JSX } from "react";
import { FloatingTooltip } from "@/components/ui/floating-tooltip";

export const ScrollUpButton = (): JSX.Element | null => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-16 right-4 sm:bottom-28 sm:right-6 z-[60] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
      aria-label="Scroll to top"
      aria-describedby="scroll-top-tooltip"
    >
      {/* Up Arrow Icon */}
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>

      <FloatingTooltip id="scroll-top-tooltip" text="Scroll to top" />
    </button>
  );
};