"use client"

import { useState } from "react"
import { Globe, MapPin, Bell, Check, Truck } from "lucide-react"
import { PrimaryButton } from "../primary-button"

interface OnboardingProps {
  onComplete: (locale: "en" | "fr") => void
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [selectedLocale, setSelectedLocale] = useState<"en" | "fr">("en")
  const [locationEnabled, setLocationEnabled] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  const handleLocationAllow = () => {
    // In a real app, request location permission here
    setLocationEnabled(true)
  }

  const handleNotificationsAllow = () => {
    // In a real app, request notification permission here
    setNotificationsEnabled(true)
  }

  const handleContinue = () => {
    onComplete(selectedLocale)
  }

  // Labels based on selected locale
  const labels = {
    tagline: selectedLocale === "fr" ? "Trouveur de Food Trucks d'Ottawa" : "Ottawa's Food Truck Finder",
    language: selectedLocale === "fr" ? "LANGUE" : "LANGUAGE",
    permissions: selectedLocale === "fr" ? "PERMISSIONS" : "PERMISSIONS",
    location: selectedLocale === "fr" ? "Localisation" : "Location",
    locationDesc: selectedLocale === "fr" 
      ? "Trouvez les camions près de vous" 
      : "Find trucks near you",
    notifications: selectedLocale === "fr" ? "Notifications" : "Notifications",
    notificationsDesc: selectedLocale === "fr" 
      ? "Alertes pour vos camions favoris" 
      : "Alerts for your favourite trucks",
    allow: selectedLocale === "fr" ? "AUTORISER" : "ALLOW",
    enabled: selectedLocale === "fr" ? "ACTIVÉ" : "ENABLED",
    continue: selectedLocale === "fr" ? "CONTINUER" : "CONTINUE",
  }

  return (
    <div className="h-screen w-full max-w-md mx-auto bg-app-black flex flex-col">
      <div className="flex-1 flex flex-col p-6 pt-12">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-fire-orange flex items-center justify-center mb-6">
            <Truck className="w-10 h-10 text-warm-cream" />
          </div>
          <h1 className="font-display text-4xl text-fire-orange text-center">
            TRUCKTRACK
          </h1>
          <p className="text-muted-text text-center mt-2">
            {labels.tagline}
          </p>
        </div>

        {/* Language Selection */}
        <div className="mb-8">
          <span className="font-mono text-[10px] uppercase tracking-wider text-fire-orange block mb-3">
            {labels.language}
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setSelectedLocale("en")}
              className={`p-4 flex items-center justify-center gap-3 transition-colors ${
                selectedLocale === "en"
                  ? "bg-fire-orange text-app-black"
                  : "bg-charcoal border border-border-dark text-warm-cream hover:bg-graphite"
              }`}
            >
              <Globe className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-wider">English</span>
            </button>
            <button
              onClick={() => setSelectedLocale("fr")}
              className={`p-4 flex items-center justify-center gap-3 transition-colors ${
                selectedLocale === "fr"
                  ? "bg-fire-orange text-app-black"
                  : "bg-charcoal border border-border-dark text-warm-cream hover:bg-graphite"
              }`}
            >
              <Globe className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-wider">Français</span>
            </button>
          </div>
        </div>

        {/* Permissions */}
        <div className="flex-1">
          <span className="font-mono text-[10px] uppercase tracking-wider text-fire-orange block mb-3">
            {labels.permissions}
          </span>
          
          <div className="space-y-3">
            {/* Location Permission */}
            <div className="bg-charcoal border border-border-dark p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 flex items-center justify-center ${
                  locationEnabled ? "bg-fire-orange" : "bg-graphite"
                }`}>
                  <MapPin className={`w-5 h-5 ${locationEnabled ? "text-app-black" : "text-warm-cream"}`} />
                </div>
                <div>
                  <span className="text-warm-cream font-medium block">{labels.location}</span>
                  <span className="text-muted-text text-sm">{labels.locationDesc}</span>
                </div>
              </div>
              <button
                onClick={handleLocationAllow}
                disabled={locationEnabled}
                className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                  locationEnabled
                    ? "bg-fire-orange text-app-black flex items-center gap-2"
                    : "bg-graphite text-warm-cream hover:bg-border-dark"
                }`}
              >
                {locationEnabled ? (
                  <>
                    <Check className="w-4 h-4" />
                    {labels.enabled}
                  </>
                ) : (
                  labels.allow
                )}
              </button>
            </div>

            {/* Notifications Permission */}
            <div className="bg-charcoal border border-border-dark p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 flex items-center justify-center ${
                  notificationsEnabled ? "bg-fire-orange" : "bg-graphite"
                }`}>
                  <Bell className={`w-5 h-5 ${notificationsEnabled ? "text-app-black" : "text-warm-cream"}`} />
                </div>
                <div>
                  <span className="text-warm-cream font-medium block">{labels.notifications}</span>
                  <span className="text-muted-text text-sm">{labels.notificationsDesc}</span>
                </div>
              </div>
              <button
                onClick={handleNotificationsAllow}
                disabled={notificationsEnabled}
                className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                  notificationsEnabled
                    ? "bg-fire-orange text-app-black flex items-center gap-2"
                    : "bg-graphite text-warm-cream hover:bg-border-dark"
                }`}
              >
                {notificationsEnabled ? (
                  <>
                    <Check className="w-4 h-4" />
                    {labels.enabled}
                  </>
                ) : (
                  labels.allow
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="pt-6">
          <PrimaryButton onClick={handleContinue} className="w-full">
            {labels.continue}
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
