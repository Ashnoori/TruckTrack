"use client"

import { useState } from "react"
import { TabBar, consumerTabs, type ConsumerTab } from "../tab-bar"
import { MapView } from "./map-view"
import { FollowingView } from "./following-view"
import { StampsView } from "./stamps-view"
import { AlertsView } from "./alerts-view"
import { TruckProfile } from "./truck-profile"
import { ProfileView } from "./profile-view"
import type { Truck } from "../truck-card"

interface ConsumerAppProps {
  initialLocale?: "en" | "fr"
}

type View = "tabs" | "truck-profile" | "profile"

export function ConsumerApp({ initialLocale = "en" }: ConsumerAppProps) {
  const [activeTab, setActiveTab] = useState<ConsumerTab>("map")
  const [locale, setLocale] = useState<"en" | "fr">(initialLocale)
  const [currentView, setCurrentView] = useState<View>("tabs")
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null)

  const handleTruckSelect = (truck: Truck) => {
    setSelectedTruck(truck)
    setCurrentView("truck-profile")
  }

  const handleProfileClick = () => {
    setCurrentView("profile")
  }

  const handleBack = () => {
    setCurrentView("tabs")
    setSelectedTruck(null)
  }

  const handleExplore = () => {
    setActiveTab("map")
  }

  // Render truck profile view
  if (currentView === "truck-profile" && selectedTruck) {
    return (
      <div className="h-screen w-full max-w-md mx-auto bg-app-black">
        <TruckProfile 
          truck={selectedTruck} 
          locale={locale} 
          onBack={handleBack} 
        />
      </div>
    )
  }

  // Render profile view
  if (currentView === "profile") {
    return (
      <div className="h-screen w-full max-w-md mx-auto bg-app-black">
        <ProfileView 
          locale={locale} 
          onBack={handleBack}
          onLocaleChange={setLocale}
          onLogout={() => console.log("Logout")}
        />
      </div>
    )
  }

  // Render main tabs view
  const renderTabContent = () => {
    switch (activeTab) {
      case "map":
        return (
          <MapView 
            locale={locale} 
            onTruckSelect={handleTruckSelect}
            onProfileClick={handleProfileClick}
          />
        )
      case "following":
        return (
          <FollowingView 
            locale={locale} 
            onTruckSelect={handleTruckSelect}
            onExplore={handleExplore}
            onProfileClick={handleProfileClick}
          />
        )
      case "stamps":
        return (
          <StampsView 
            locale={locale} 
            onFindTrucks={handleExplore}
            onProfileClick={handleProfileClick}
          />
        )
      case "alerts":
        return <AlertsView locale={locale} onProfileClick={handleProfileClick} />
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
        tabs={consumerTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        locale={locale}
      />
    </div>
  )
}
