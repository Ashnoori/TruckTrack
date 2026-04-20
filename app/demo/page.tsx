"use client"

import { useState } from "react"
import Link from "next/link"
import { Truck, User, ChevronRight } from "lucide-react"
import { PrimaryButton } from "@/components/truck-track/primary-button"
import { StatusBadge } from "@/components/truck-track/status-badge"

export default function DemoPage() {
  const [locale, setLocale] = useState<"en" | "fr">("en")

  const title = locale === "fr" ? "BIENVENUE SUR TRUCKTRACK" : "WELCOME TO TRUCKTRACK"
  const subtitle = locale === "fr" 
    ? "L'application pour les food trucks d'Ottawa"
    : "Ottawa's Food Truck Finder App"
  const consumerTitle = locale === "fr" ? "APPLICATION CONSOMMATEUR" : "CONSUMER APP"
  const consumerDesc = locale === "fr"
    ? "Trouvez des camions, suivez vos favoris, collectez des tampons fidélité."
    : "Find trucks, follow favourites, collect loyalty stamps."
  const operatorTitle = locale === "fr" ? "APPLICATION OPÉRATEUR" : "OPERATOR APP"
  const operatorDesc = locale === "fr"
    ? "Publiez votre emplacement, gérez votre horaire, consultez les statistiques."
    : "Publish your location, manage schedule, view analytics."
  const demoLabel = locale === "fr" ? "DÉMO" : "DEMO"

  return (
    <div className="min-h-screen bg-app-black">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* Language toggle */}
        <div className="flex justify-end mb-8">
          <div className="flex gap-1 bg-charcoal border border-border-dark p-1">
            <button
              onClick={() => setLocale("en")}
              className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                locale === "en" 
                  ? "bg-fire-orange text-warm-cream" 
                  : "text-muted-text hover:text-warm-cream"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("fr")}
              className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                locale === "fr" 
                  ? "bg-fire-orange text-warm-cream" 
                  : "text-muted-text hover:text-warm-cream"
              }`}
            >
              FR
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-fire-orange flex items-center justify-center mx-auto mb-6">
            <Truck className="w-10 h-10 text-warm-cream" />
          </div>
          <h1 className="font-display text-4xl text-warm-cream mb-2">
            {title}
          </h1>
          <p className="text-muted-text">
            {subtitle}
          </p>
        </div>

        {/* App selection */}
        <div className="space-y-4 mb-12">
          {/* Consumer app */}
          <Link 
            href="/consumer"
            className="block bg-charcoal border border-border-dark p-6 hover:bg-graphite transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-graphite flex items-center justify-center flex-shrink-0 group-hover:bg-fire-orange transition-colors">
                <User className="w-6 h-6 text-warm-cream" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-display text-xl text-warm-cream">
                    {consumerTitle}
                  </h2>
                  <ChevronRight className="w-5 h-5 text-muted-text group-hover:text-fire-orange transition-colors" />
                </div>
                <p className="text-sm text-muted-text">
                  {consumerDesc}
                </p>
              </div>
            </div>
          </Link>

          {/* Operator app */}
          <Link 
            href="/operator"
            className="block bg-charcoal border border-border-dark p-6 hover:bg-graphite transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-graphite flex items-center justify-center flex-shrink-0 group-hover:bg-fire-orange transition-colors">
                <Truck className="w-6 h-6 text-warm-cream" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-display text-xl text-warm-cream">
                    {operatorTitle}
                  </h2>
                  <ChevronRight className="w-5 h-5 text-muted-text group-hover:text-fire-orange transition-colors" />
                </div>
                <p className="text-sm text-muted-text">
                  {operatorDesc}
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Design system showcase */}
        <div className="border-t border-border-dark pt-8">
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted-text mb-6">
            {locale === "fr" ? "SYSTÈME DE DESIGN \"STREET FIRE\"" : "\"STREET FIRE\" DESIGN SYSTEM"}
          </h3>

          {/* Colors */}
          <div className="mb-6">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text block mb-3">
              {locale === "fr" ? "COULEURS" : "COLORS"}
            </span>
            <div className="grid grid-cols-5 gap-2">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-fire-orange mb-1" />
                <span className="font-mono text-[8px] text-muted-text">#FF5C00</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-signal-yellow mb-1" />
                <span className="font-mono text-[8px] text-muted-text">#FFD23F</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-success mb-1" />
                <span className="font-mono text-[8px] text-muted-text">#2ECC71</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-error mb-1" />
                <span className="font-mono text-[8px] text-muted-text">#E74C3C</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-charcoal border border-border-dark mb-1" />
                <span className="font-mono text-[8px] text-muted-text">#1A1A1A</span>
              </div>
            </div>
          </div>

          {/* Badges */}
          <div className="mb-6">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text block mb-3">
              {locale === "fr" ? "BADGES" : "BADGES"}
            </span>
            <div className="flex flex-wrap gap-2">
              <StatusBadge variant="open">{locale === "fr" ? "OUVERT" : "OPEN NOW"}</StatusBadge>
              <StatusBadge variant="closed">{locale === "fr" ? "FERMÉ" : "CLOSED"}</StatusBadge>
              <StatusBadge variant="accent">PRO</StatusBadge>
              <StatusBadge variant="muted">$19/MO</StatusBadge>
            </div>
          </div>

          {/* Buttons */}
          <div className="mb-6">
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text block mb-3">
              {locale === "fr" ? "BOUTONS" : "BUTTONS"}
            </span>
            <div className="flex flex-wrap gap-2">
              <PrimaryButton>{locale === "fr" ? "PRIMAIRE" : "PRIMARY"}</PrimaryButton>
              <PrimaryButton variant="secondary">{locale === "fr" ? "SECONDAIRE" : "SECONDARY"}</PrimaryButton>
              <PrimaryButton variant="ghost">{locale === "fr" ? "FANTÔME" : "GHOST"}</PrimaryButton>
            </div>
          </div>

          {/* Typography */}
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text block mb-3">
              {locale === "fr" ? "TYPOGRAPHIE" : "TYPOGRAPHY"}
            </span>
            <div className="space-y-2">
              <h1 className="font-display text-3xl text-warm-cream">BEBAS NEUE — HEADINGS</h1>
              <p className="text-warm-cream">DM Sans — Body text at 14-16px with light weight</p>
              <p className="font-mono text-[11px] uppercase tracking-wider text-muted-text">
                DM MONO — LABELS & BUTTONS
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border-dark text-center">
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text">
            TruckTrack Ottawa — {demoLabel} UI Kit
          </span>
        </footer>
      </div>
    </div>
  )
}
