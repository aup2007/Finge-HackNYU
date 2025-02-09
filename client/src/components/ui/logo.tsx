import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const sizeClasses = {
  sm: "text-2xl md:text-3xl",
  md: "text-4xl md:text-5xl",
  lg: "text-5xl md:text-7xl",
  xl: "text-6xl md:text-8xl"
}

export function Logo({ size = "md", className }: LogoProps) {
  return (
    <h2 className={cn(sizeClasses[size], "font-['PP_Pangaia'] relative inline-block", className)}>
      Fin<span className="relative inline-flex items-center mx-[-0.1em]">
        <svg 
          viewBox="0 0 24 36" 
          className="h-[1.1em] w-[0.7em] overflow-visible"
          style={{ filter: "url(#glow)" }}
        >
          <defs>
            <linearGradient id="slashGradient" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(15)">
              <stop offset="0%" className="animate-gradient" style={{ stopColor: "#38bdf8" }} />
              <stop offset="50%" style={{ stopColor: "#7ED1DE" }} />
              <stop offset="100%" style={{ stopColor: "#C3F0EA" }} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path 
            d="M22 8 L8 36" 
            stroke="url(#slashGradient)"
            strokeWidth="3"
            strokeLinecap="square"
            fill="none"
            className="animate-gradient"
          />
        </svg>
      </span>ge
    </h2>
  )
} 