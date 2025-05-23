"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-slate-950 transition-bg w-full",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              `
            [--white-gradient:linear-gradient(45deg,var(--white)_0%,var(--transparent)_50%,var(--white)_100%)]
            [--dark-gradient:linear-gradient(45deg,var(--black)_0%,var(--transparent)_50%,var(--black)_100%)]
            [--aurora:linear-gradient(120deg,var(--blue-500)_0%,var(--indigo-300)_25%,var(--blue-300)_50%,var(--violet-200)_75%,var(--blue-400)_100%)]
            [background-image:var(--white-gradient),var(--aurora)]
            dark:[background-image:var(--dark-gradient),var(--aurora)]
            [background-size:200%,_150%]
            [background-position:0%_0%,50%_50%]
            will-change-auto
            pointer-events-none
            absolute -inset-[5px] opacity-30`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_20%,var(--transparent)_80%)]`
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
