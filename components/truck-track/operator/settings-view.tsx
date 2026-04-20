"use client"

import { ArrowLeft, CreditCard, Snowflake, Globe, ChevronRight, ExternalLink } from "lucide-react"
import { StatusBadge } from "../status-badge"
import { PrimaryButton } from "../primary-button"

interface SettingsViewProps {
  locale?: "en" | "fr"
  currentPlan?: "free" | "starter" | "pro" | "festival"
  onBack?: () => void
  onLocaleChange?: (locale: "en" | "fr") => void
}

const planDetails = {
  free: { name: "FREE", price: "$0", color: "bg-muted-text" },
  starter: { name: "STARTER", price: "$19/mo", color: "bg-fire-orange" },
  pro: { name: "PRO", price: "$39/mo", color: "bg-signal-yellow" },
  festival: { name: "FESTIVAL", price: "$79/mo", color: "bg-success" },
}

export function SettingsView({ 
  locale = "en", 
  currentPlan = "pro",
  onBack, 
  onLocaleChange 
}: SettingsViewProps) {
  const titleLabel = locale === "fr" ? "PARAMÈTRES" : "SETTINGS"
  const planLabel = locale === "fr" ? "PLAN ACTUEL" : "CURRENT PLAN"
  const manageLabel = locale === "fr" ? "GÉRER L'ABONNEMENT" : "MANAGE SUBSCRIPTION"
  const winterPauseLabel = locale === "fr" ? "PAUSE HIVERNALE" : "WINTER PAUSE"
  const winterPauseDescLabel = locale === "fr" 
    ? "Mettez votre compte en pause pendant l'hiver sans perdre vos données."
    : "Pause your account during winter without losing your data."
  const languageLabel = locale === "fr" ? "LANGUE" : "LANGUAGE"
  const englishLabel = "ENGLISH"
  const frenchLabel = "FRANÇAIS"

  const plan = planDetails[currentPlan]

  return (
    <div className="h-full flex flex-col bg-app-black">
      {/* Header */}
      <header className="px-4 py-4 border-b border-border-dark flex items-center gap-4">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center text-warm-cream hover:text-fire-orange transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-display text-2xl text-warm-cream">{titleLabel}</h1>
      </header>
      
      <div className="flex-1 overflow-y-auto pb-20 hide-scrollbar">
        <div className="p-4">
          {/* Current plan */}
          <div className="bg-charcoal border border-border-dark p-4 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-text">
                {planLabel}
              </span>
              <StatusBadge variant="accent">{plan.name}</StatusBadge>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-fire-orange" />
                <span className="text-warm-cream">{plan.name}</span>
              </div>
              <span className="font-display text-xl text-warm-cream">{plan.price}</span>
            </div>

            {/* Plan features */}
            <div className="border-t border-border-dark pt-4 mb-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-text">
                  <div className="w-1.5 h-1.5 bg-success rounded-full" />
                  {locale === "fr" ? "Notifications push" : "Push notifications"}
                </div>
                <div className="flex items-center gap-2 text-muted-text">
                  <div className="w-1.5 h-1.5 bg-success rounded-full" />
                  {locale === "fr" ? "Horaire hebdomadaire" : "Weekly schedule"}
                </div>
                {(currentPlan === "pro" || currentPlan === "festival") && (
                  <>
                    <div className="flex items-center gap-2 text-muted-text">
                      <div className="w-1.5 h-1.5 bg-success rounded-full" />
                      {locale === "fr" ? "Statistiques" : "Analytics"}
                    </div>
                    <div className="flex items-center gap-2 text-muted-text">
                      <div className="w-1.5 h-1.5 bg-success rounded-full" />
                      {locale === "fr" ? "Cartes fidélité" : "Loyalty stamps"}
                    </div>
                  </>
                )}
                {currentPlan === "festival" && (
                  <div className="flex items-center gap-2 text-muted-text">
                    <div className="w-1.5 h-1.5 bg-success rounded-full" />
                    {locale === "fr" ? "Mode festival" : "Festival mode"}
                  </div>
                )}
              </div>
            </div>

            <a 
              href="https://trucktrack.ca/account"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-fire-orange text-warm-cream py-3 font-mono text-[11px] uppercase tracking-wider hover:bg-fire-orange-hover transition-colors"
            >
              {manageLabel}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Winter pause */}
          <div className="bg-charcoal border border-border-dark p-4 mb-6">
            <div className="flex items-start gap-4">
              <Snowflake className="w-6 h-6 text-fire-orange flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-display text-base text-warm-cream mb-1">
                  {winterPauseLabel}
                </h3>
                <p className="text-sm text-muted-text mb-4">
                  {winterPauseDescLabel}
                </p>
                <PrimaryButton variant="secondary" className="w-full">
                  {locale === "fr" ? "ACTIVER LA PAUSE" : "ENABLE PAUSE"}
                </PrimaryButton>
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

          {/* Other settings */}
          <div className="bg-charcoal border border-border-dark">
            <button className="w-full flex items-center justify-between px-4 py-4 text-warm-cream hover:bg-graphite transition-colors border-b border-border-dark">
              <span className="text-sm">{locale === "fr" ? "Profil du camion" : "Truck Profile"}</span>
              <ChevronRight className="w-4 h-4 text-muted-text" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-4 text-warm-cream hover:bg-graphite transition-colors border-b border-border-dark">
              <span className="text-sm">{locale === "fr" ? "Notifications" : "Notifications"}</span>
              <ChevronRight className="w-4 h-4 text-muted-text" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-4 text-warm-cream hover:bg-graphite transition-colors border-b border-border-dark">
              <span className="text-sm">{locale === "fr" ? "Intégrations" : "Integrations"}</span>
              <ChevronRight className="w-4 h-4 text-muted-text" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-4 text-error hover:bg-graphite transition-colors">
              <span className="text-sm">{locale === "fr" ? "Déconnexion" : "Log Out"}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
