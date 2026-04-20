"use client"

import { cn } from "@/lib/utils"

type BadgeVariant = "open" | "closed" | "accent" | "muted" | "moving"

interface StatusBadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  open: "bg-success text-app-black",
  closed: "bg-error text-warm-cream",
  accent: "bg-signal-yellow text-app-black",
  muted: "bg-graphite text-muted-text border border-border-dark",
  moving: "bg-fire-orange text-app-black",
}

export function StatusBadge({ variant, children, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "badge-pill inline-flex items-center justify-center font-mono",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
