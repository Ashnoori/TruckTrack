"use client"

import { useState } from "react"
import { Onboarding } from "@/components/truck-track/onboarding/onboarding"
import { Auth } from "@/components/truck-track/auth/auth"
import { ConsumerApp } from "@/components/truck-track/consumer/consumer-app"
import { OperatorApp } from "@/components/truck-track/operator/operator-app"

type AppState = "onboarding" | "auth" | "consumer" | "operator"
type UserRole = "consumer" | "operator"

export default function Home() {
  const [appState, setAppState] = useState<AppState>("onboarding")
  const [locale, setLocale] = useState<"en" | "fr">("en")

  const handleOnboardingComplete = (selectedLocale: "en" | "fr") => {
    setLocale(selectedLocale)
    setAppState("auth")
  }

  const handleAuthSuccess = (role: UserRole) => {
    setAppState(role)
  }

  // Render based on app state
  switch (appState) {
    case "onboarding":
      return <Onboarding onComplete={handleOnboardingComplete} />
    
    case "auth":
      return <Auth locale={locale} onSuccess={handleAuthSuccess} />
    
    case "consumer":
      return <ConsumerApp initialLocale={locale} />
    
    case "operator":
      return <OperatorApp initialLocale={locale} />
    
    default:
      return null
  }
}
