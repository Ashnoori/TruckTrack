"use client"

import { cn } from "@/lib/utils"

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary" | "ghost"
  size?: "default" | "lg"
  className?: string
}

export function PrimaryButton({ 
  children, 
  variant = "primary",
  size = "default",
  className,
  ...props 
}: PrimaryButtonProps) {
  const baseStyles = "font-mono text-[11px] uppercase tracking-[0.1em] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  
  const variantStyles = {
    primary: "bg-fire-orange text-warm-cream hover:bg-fire-orange-hover active:bg-fire-orange",
    secondary: "bg-charcoal text-warm-cream border border-border-dark hover:bg-graphite",
    ghost: "bg-transparent text-warm-cream hover:bg-graphite",
  }
  
  const sizeStyles = {
    default: "px-6 py-3",
    lg: "px-8 py-4 text-xs",
  }

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        "rounded-none", // Sharp corners - brand rule
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
