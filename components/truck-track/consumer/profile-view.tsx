"use client"

import { ArrowLeft, Globe, User, LogOut, ChevronRight } from "lucide-react"
import { PrimaryButton } from "../primary-button"

interface ProfileViewProps {
  locale?: "en" | "fr"
  onBack?: () => void
  onLocaleChange?: (locale: "en" | "fr") => void
  onLogout?: () => void
}

export function ProfileView({ locale = "en", onBack, onLocaleChange, onLogout }: ProfileViewProps) {
  const titleLabel = locale === "fr" ? "PROFIL" : "PROFILE"
  const languageLabel = locale === "fr" ? "LANGUE" : "LANGUAGE"
  const englishLabel = "ENGLISH"
  const frenchLabel = "FRANÇAIS"
  const accountLabel = locale === "fr" ? "COMPTE" : "ACCOUNT"
  const logoutLabel = locale === "fr" ? "DÉCONNEXION" : "LOG OUT"
  const versionLabel = locale === "fr" ? "VERSION" : "VERSION"

  return (
    <div className="h-full flex flex-col bg-app-black">
      {/* Header */}
      <header className="px-4 py-4 border-b border-border-dark flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center text-warm-cream hover:text-fire-orange transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-display text-2xl text-fire-orange">TRUCKTRACK</h1>
        </div>
        <div className="w-10 h-10 bg-fire-orange rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-app-black" />
        </div>
      </header>
      
      <div className="flex-1 overflow-y-auto pb-20 hide-scrollbar">
        <div className="p-4">
          {/* User info */}
          <div className="bg-charcoal border border-border-dark p-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-graphite flex items-center justify-center">
                <User className="w-8 h-8 text-muted-text" />
              </div>
              <div>
                <h2 className="font-display text-lg text-warm-cream">JOHN DOE</h2>
                <p className="text-sm text-muted-text">john.doe@email.com</p>
              </div>
            </div>
          </div>

          {/* Language selection */}
          <div className="mb-6">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted-text mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {languageLabel}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => onLocaleChange?.("en")}
                className={`flex-1 py-3 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  locale === "en" 
                    ? "bg-fire-orange text-warm-cream" 
                    : "bg-charcoal text-muted-text border border-border-dark hover:bg-graphite"
                }`}
              >
                {englishLabel}
              </button>
              <button
                onClick={() => onLocaleChange?.("fr")}
                className={`flex-1 py-3 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                  locale === "fr" 
                    ? "bg-fire-orange text-warm-cream" 
                    : "bg-charcoal text-muted-text border border-border-dark hover:bg-graphite"
                }`}
              >
                {frenchLabel}
              </button>
            </div>
          </div>

          {/* Account section */}
          <div className="mb-6">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted-text mb-3">
              {accountLabel}
            </h3>
            <div className="bg-charcoal border border-border-dark">
              <button className="w-full flex items-center justify-between px-4 py-4 text-warm-cream hover:bg-graphite transition-colors border-b border-border-dark">
                <span className="text-sm">{locale === "fr" ? "Modifier le profil" : "Edit Profile"}</span>
                <ChevronRight className="w-4 h-4 text-muted-text" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-4 text-warm-cream hover:bg-graphite transition-colors border-b border-border-dark">
                <span className="text-sm">{locale === "fr" ? "Notifications" : "Notifications"}</span>
                <ChevronRight className="w-4 h-4 text-muted-text" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-4 text-warm-cream hover:bg-graphite transition-colors">
                <span className="text-sm">{locale === "fr" ? "Confidentialité" : "Privacy"}</span>
                <ChevronRight className="w-4 h-4 text-muted-text" />
              </button>
            </div>
          </div>

          {/* Logout */}
          <PrimaryButton 
            onClick={onLogout}
            variant="secondary"
            className="w-full flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            {logoutLabel}
          </PrimaryButton>

          {/* Version */}
          <div className="mt-8 text-center">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text">
              {versionLabel} 1.0.0
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
