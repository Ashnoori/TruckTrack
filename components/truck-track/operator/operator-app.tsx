"use client"

import { useState } from "react"
import { TabBar, operatorTabs, type OperatorTab } from "../tab-bar"
import { TodayView } from "./today-view"
import { ScheduleView } from "./schedule-view"
import { AnalyticsView } from "./analytics-view"
import { CateringView } from "./catering-view"
import { SettingsView } from "./settings-view"

interface OperatorAppProps {
  initialLocale?: "en" | "fr"
}

type View = "tabs" | "settings"

export function OperatorApp({ initialLocale = "en" }: OperatorAppProps) {
  const [activeTab, setActiveTab] = useState<OperatorTab>("today")
  const [locale, setLocale] = useState<"en" | "fr">(initialLocale)
  const [currentView, setCurrentView] = useState<View>("tabs")

  const handleSettingsClick = () => {
    setCurrentView("settings")
  }

  const handleBack = () => {
    setCurrentView("tabs")
  }

  // Render settings view
  if (currentView === "settings") {
    return (
      <div className="h-screen w-full max-w-md mx-auto bg-app-black">
        <SettingsView 
          locale={locale} 
          currentPlan="pro"
          onBack={handleBack}
          onLocaleChange={setLocale}
        />
      </div>
    )
  }

  // Render main tabs view
  const renderTabContent = () => {
    switch (activeTab) {
      case "today":
        return (
          <TodayView 
            locale={locale}
            onSettingsClick={handleSettingsClick}
          />
        )
      case "schedule":
        return <ScheduleView locale={locale} />
      case "analytics":
        return <AnalyticsView locale={locale} isPro={true} />
      case "catering":
        return <CateringView locale={locale} />
      default:
        return null
    }
  }

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-app-black flex flex-col">
      <main className="flex-1 overflow-hidden">
        {renderTabContent()}
      </main>
      <TabBar
        tabs={operatorTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        locale={locale}
      />
    </div>
  )
}
