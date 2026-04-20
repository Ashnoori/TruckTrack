"use client"

import { cn } from "@/lib/utils"
import { Map, Heart, Gift, Bell, Calendar, BarChart3, MessageSquare, Settings } from "lucide-react"

export type ConsumerTab = "map" | "following" | "stamps" | "alerts"
export type OperatorTab = "today" | "schedule" | "analytics" | "catering"

interface TabBarProps<T extends string> {
  tabs: { id: T; labelEn: string; labelFr: string; icon: React.ReactNode }[]
  activeTab: T
  onTabChange: (tab: T) => void
  locale?: "en" | "fr"
}

export const consumerTabs: { id: ConsumerTab; labelEn: string; labelFr: string; icon: React.ReactNode }[] = [
  { id: "map", labelEn: "MAP", labelFr: "CARTE", icon: <Map className="w-5 h-5" /> },
  { id: "following", labelEn: "FOLLOWING", labelFr: "SUIVIS", icon: <Heart className="w-5 h-5" /> },
  { id: "stamps", labelEn: "STAMPS", labelFr: "TAMPONS", icon: <Gift className="w-5 h-5" /> },
  { id: "alerts", labelEn: "ALERTS", labelFr: "ALERTES", icon: <Bell className="w-5 h-5" /> },
]

export const operatorTabs: { id: OperatorTab; labelEn: string; labelFr: string; icon: React.ReactNode }[] = [
  { id: "today", labelEn: "TODAY", labelFr: "AUJOURD'HUI", icon: <Map className="w-5 h-5" /> },
  { id: "schedule", labelEn: "SCHEDULE", labelFr: "HORAIRE", icon: <Calendar className="w-5 h-5" /> },
  { id: "analytics", labelEn: "ANALYTICS", labelFr: "STATS", icon: <BarChart3 className="w-5 h-5" /> },
  { id: "catering", labelEn: "CATERING", labelFr: "TRAITEUR", icon: <MessageSquare className="w-5 h-5" /> },
]

export function TabBar<T extends string>({ 
  tabs, 
  activeTab, 
  onTabChange,
  locale = "en" 
}: TabBarProps<T>) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-charcoal border-t border-border-dark z-50">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const label = locale === "fr" ? tab.labelFr : tab.labelEn
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive ? "text-fire-orange" : "text-muted-text hover:text-warm-cream"
              )}
            >
              {tab.icon}
              <span className="tab-label">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export function SettingsButton({ onClick, locale = "en" }: { onClick: () => void; locale?: "en" | "fr" }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center w-10 h-10 text-muted-text hover:text-warm-cream transition-colors"
      aria-label={locale === "fr" ? "Paramètres" : "Settings"}
    >
      <Settings className="w-5 h-5" />
    </button>
  )
}
