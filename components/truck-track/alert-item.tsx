"use client"

import { cn } from "@/lib/utils"
import { MapPin, Flame, Clock, Gift } from "lucide-react"

export type AlertType = "location" | "opened" | "special" | "stamp"

export interface Alert {
  id: string
  type: AlertType
  truckName: string
  message: string
  timestamp: string
  isRead: boolean
}

interface AlertItemProps {
  alert: Alert
  locale?: "en" | "fr"
  onClick?: () => void
  className?: string
}

const alertIcons: Record<AlertType, React.ReactNode> = {
  location: <MapPin className="w-5 h-5" />,
  opened: <Flame className="w-5 h-5" />,
  special: <Clock className="w-5 h-5" />,
  stamp: <Gift className="w-5 h-5" />,
}

const alertColors: Record<AlertType, string> = {
  location: "text-fire-orange",
  opened: "text-success",
  special: "text-signal-yellow",
  stamp: "text-fire-orange",
}

export function AlertItem({ alert, locale = "en", onClick, className }: AlertItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-3 p-4 bg-charcoal border border-border-dark text-left transition-colors hover:bg-graphite",
        !alert.isRead && "border-l-2 border-l-fire-orange",
        className
      )}
    >
      <div className={cn("flex-shrink-0 mt-0.5", alertColors[alert.type])}>
        {alertIcons[alert.type]}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-display text-base text-warm-cream">
            {alert.truckName}
          </h4>
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text flex-shrink-0">
            {alert.timestamp}
          </span>
        </div>
        <p className="text-sm text-muted-text line-clamp-2">
          {alert.message}
        </p>
      </div>
    </button>
  )
}

export function AlertItemSkeleton() {
  return (
    <div className="flex items-start gap-3 p-4 bg-charcoal border border-border-dark">
      <div className="w-5 h-5 skeleton rounded-full flex-shrink-0" />
      <div className="flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="h-4 w-24 skeleton" />
          <div className="h-3 w-12 skeleton" />
        </div>
        <div className="h-4 w-full skeleton" />
      </div>
    </div>
  )
}
