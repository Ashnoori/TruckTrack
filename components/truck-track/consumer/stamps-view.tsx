"use client"

import { useState } from "react"
import { User } from "lucide-react"
import { LoyaltyCard, LoyaltyCardSkeleton } from "../loyalty-card"
import { EmptyState } from "../empty-state"

interface LoyaltyCardData {
  id: string
  truckName: string
  stampsCollected: number
  stampsRequired: number
  reward: string
}

interface StampsViewProps {
  locale?: "en" | "fr"
  onFindTrucks?: () => void
  onProfileClick?: () => void
}

// Mock loyalty cards
const mockLoyaltyCards: LoyaltyCardData[] = [
  {
    id: "1",
    truckName: "SMOKE'S POUTINERIE",
    stampsCollected: 8,
    stampsRequired: 10,
    reward: "Free Poutine",
  },
  {
    id: "2",
    truckName: "TACOS EL GORDO",
    stampsCollected: 5,
    stampsRequired: 8,
    reward: "Free Taco Combo",
  },
  {
    id: "3",
    truckName: "BEAVERTAILS",
    stampsCollected: 10,
    stampsRequired: 10,
    reward: "Free BeaverTail",
  },
]

export function StampsView({ locale = "en", onFindTrucks, onProfileClick }: StampsViewProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [cards, setCards] = useState<LoyaltyCardData[]>(mockLoyaltyCards)
  
  const titleLabel = locale === "fr" ? "CARTES FIDÉLITÉ" : "LOYALTY STAMPS"
  const readyLabel = locale === "fr" ? "PRÊT À ÉCHANGER" : "READY TO REDEEM"
  const inProgressLabel = locale === "fr" ? "EN COURS" : "IN PROGRESS"

  const readyCards = cards.filter(c => c.stampsCollected >= c.stampsRequired)
  const inProgressCards = cards.filter(c => c.stampsCollected < c.stampsRequired)

  if (cards.length === 0 && !isLoading) {
    return (
      <div className="h-full flex flex-col bg-app-black">
        <header className="px-4 py-4 flex items-center justify-between">
          <h1 className="font-display text-2xl text-fire-orange">TRUCKTRACK</h1>
          <button 
            onClick={onProfileClick}
            className="w-10 h-10 bg-charcoal border border-border-dark rounded-full flex items-center justify-center"
          >
            <User className="w-5 h-5 text-warm-cream" />
          </button>
        </header>
        <EmptyState type="stamps" locale={locale} onAction={onFindTrucks} />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-app-black">
      <header className="px-4 py-4 flex items-center justify-between">
        <h1 className="font-display text-2xl text-fire-orange">TRUCKTRACK</h1>
        <button 
          onClick={onProfileClick}
          className="w-10 h-10 bg-charcoal border border-border-dark rounded-full flex items-center justify-center"
        >
          <User className="w-5 h-5 text-warm-cream" />
        </button>
      </header>
      
      {/* Section title */}
      <div className="px-4 pb-4">
        <h2 className="font-display text-xl text-warm-cream">{titleLabel}</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto pb-20 hide-scrollbar">
        <div className="p-4">
          {isLoading ? (
            <div className="flex flex-col gap-4">
              <LoyaltyCardSkeleton />
              <LoyaltyCardSkeleton />
              <LoyaltyCardSkeleton />
            </div>
          ) : (
            <>
              {/* Ready to redeem section */}
              {readyCards.length > 0 && (
                <div className="mb-6">
                  <h2 className="font-mono text-[11px] uppercase tracking-wider text-fire-orange mb-3">
                    {readyLabel}
                  </h2>
                  <div className="flex flex-col gap-3">
                    {readyCards.map((card) => (
                      <LoyaltyCard
                        key={card.id}
                        truckName={card.truckName}
                        stampsCollected={card.stampsCollected}
                        stampsRequired={card.stampsRequired}
                        reward={card.reward}
                        locale={locale}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* In progress section */}
              {inProgressCards.length > 0 && (
                <div>
                  <h2 className="font-mono text-[11px] uppercase tracking-wider text-muted-text mb-3">
                    {inProgressLabel}
                  </h2>
                  <div className="flex flex-col gap-3">
                    {inProgressCards.map((card) => (
                      <LoyaltyCard
                        key={card.id}
                        truckName={card.truckName}
                        stampsCollected={card.stampsCollected}
                        stampsRequired={card.stampsRequired}
                        reward={card.reward}
                        locale={locale}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
