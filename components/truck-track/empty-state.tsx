"use client"

import { cn } from "@/lib/utils"
import { MapPin, Heart, Gift, Bell, Calendar, BarChart3, MessageSquare } from "lucide-react"
import { PrimaryButton } from "./primary-button"

type EmptyStateType = "trucks" | "following" | "stamps" | "alerts" | "schedule" | "analytics" | "catering"

interface EmptyStateProps {
  type: EmptyStateType
  locale?: "en" | "fr"
  onAction?: () => void
  className?: string
}

const emptyStates: Record<EmptyStateType, {
  icon: React.ReactNode
  titleEn: string
  titleFr: string
  descriptionEn: string
  descriptionFr: string
  actionEn?: string
  actionFr?: string
}> = {
  trucks: {
    icon: <MapPin className="w-12 h-12" />,
    titleEn: "NO TRUCKS NEARBY",
    titleFr: "AUCUN CAMION À PROXIMITÉ",
    descriptionEn: "There are no food trucks in your area right now. Check back later!",
    descriptionFr: "Il n'y a pas de food trucks dans votre région en ce moment. Revenez plus tard!",
  },
  following: {
    icon: <Heart className="w-12 h-12" />,
    titleEn: "NO TRUCKS FOLLOWED",
    titleFr: "AUCUN CAMION SUIVI",
    descriptionEn: "Follow your favourite trucks to see them here and get notified when they're nearby.",
    descriptionFr: "Suivez vos camions préférés pour les voir ici et être notifié quand ils sont proches.",
    actionEn: "EXPLORE TRUCKS",
    actionFr: "EXPLORER LES CAMIONS",
  },
  stamps: {
    icon: <Gift className="w-12 h-12" />,
    titleEn: "NO LOYALTY CARDS",
    titleFr: "AUCUNE CARTE FIDÉLITÉ",
    descriptionEn: "Start collecting stamps at participating trucks to earn free rewards!",
    descriptionFr: "Commencez à collecter des tampons chez les camions participants pour gagner des récompenses!",
    actionEn: "FIND TRUCKS",
    actionFr: "TROUVER DES CAMIONS",
  },
  alerts: {
    icon: <Bell className="w-12 h-12" />,
    titleEn: "NO NOTIFICATIONS",
    titleFr: "AUCUNE NOTIFICATION",
    descriptionEn: "Follow trucks to receive alerts about their locations, specials, and more.",
    descriptionFr: "Suivez des camions pour recevoir des alertes sur leurs emplacements, spéciaux, et plus.",
  },
  schedule: {
    icon: <Calendar className="w-12 h-12" />,
    titleEn: "NO SCHEDULE SET",
    titleFr: "AUCUN HORAIRE DÉFINI",
    descriptionEn: "Set up your weekly schedule to let customers know when and where to find you.",
    descriptionFr: "Configurez votre horaire hebdomadaire pour que les clients sachent où vous trouver.",
    actionEn: "ADD SCHEDULE",
    actionFr: "AJOUTER UN HORAIRE",
  },
  analytics: {
    icon: <BarChart3 className="w-12 h-12" />,
    titleEn: "NO DATA YET",
    titleFr: "PAS ENCORE DE DONNÉES",
    descriptionEn: "Analytics will appear here once you start publishing locations and gaining followers.",
    descriptionFr: "Les statistiques apparaîtront ici une fois que vous commencerez à publier des emplacements.",
  },
  catering: {
    icon: <MessageSquare className="w-12 h-12" />,
    titleEn: "NO CATERING REQUESTS",
    titleFr: "AUCUNE DEMANDE DE TRAITEUR",
    descriptionEn: "Catering requests from customers will appear here.",
    descriptionFr: "Les demandes de traiteur des clients apparaîtront ici.",
  },
}

export function EmptyState({ type, locale = "en", onAction, className }: EmptyStateProps) {
  const state = emptyStates[type]
  const title = locale === "fr" ? state.titleFr : state.titleEn
  const description = locale === "fr" ? state.descriptionFr : state.descriptionEn
  const action = locale === "fr" ? state.actionFr : state.actionEn

  return (
    <div className={cn("flex flex-col items-center justify-center text-center px-8 py-12", className)}>
      <div className="text-muted-text mb-4">
        {state.icon}
      </div>
      <h3 className="font-display text-xl text-warm-cream mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-text max-w-xs mb-6">
        {description}
      </p>
      {action && onAction && (
        <PrimaryButton onClick={onAction}>
          {action}
        </PrimaryButton>
      )}
    </div>
  )
}
