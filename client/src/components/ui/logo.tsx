import { cn } from "@/lib/utils"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  slashColor?: string
  className?: string
}

const sizeClasses = {
  sm: "text-2xl md:text-3xl",
  md: "text-4xl md:text-5xl",
  lg: "text-5xl md:text-7xl",
  xl: "text-6xl md:text-8xl"
}

export function Logo({ size = "md", slashColor = "text-sky-400", className }: LogoProps) {
  return (
    <h2 className={cn(sizeClasses[size], "font-['PP_Pangaia']", className)}>
      Fin<span className={slashColor}>/</span>ge
    </h2>
  )
} 