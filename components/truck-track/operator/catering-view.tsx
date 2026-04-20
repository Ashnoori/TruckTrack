"use client"

import { useState } from "react"
import { Calendar, Users, MapPin, DollarSign, Check, X } from "lucide-react"
import { StatusBadge } from "../status-badge"
import { PrimaryButton } from "../primary-button"
import { EmptyState } from "../empty-state"

interface CateringRequest {
  id: string
  name: string
  email: string
  date: string
  guestCount: number
  location: string
  budget: string
  message: string
  status: "pending" | "accepted" | "declined"
}

interface CateringViewProps {
  locale?: "en" | "fr"
}

// Mock catering requests
const mockRequests: CateringRequest[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@company.com",
    date: "2024-02-15",
    guestCount: 50,
    location: "123 Business Ave",
    budget: "$1,500 - $2,000",
    message: "We're hosting a company event and would love to have your food truck!",
    status: "pending",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike@events.ca",
    date: "2024-02-20",
    guestCount: 100,
    location: "Ottawa City Hall",
    budget: "$3,000+",
    message: "Annual festival catering opportunity. Looking for 3-4 trucks.",
    status: "pending",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily@wedding.com",
    date: "2024-03-01",
    guestCount: 75,
    location: "Rideau Hall",
    budget: "$2,000 - $2,500",
    message: "Wedding reception food truck catering.",
    status: "accepted",
  },
]

export function CateringView({ locale = "en" }: CateringViewProps) {
  const [requests, setRequests] = useState<CateringRequest[]>(mockRequests)
  const [selectedRequest, setSelectedRequest] = useState<CateringRequest | null>(null)
  
  const titleLabel = locale === "fr" ? "TRAITEUR" : "CATERING"
  const pendingLabel = locale === "fr" ? "EN ATTENTE" : "PENDING"
  const acceptedLabel = locale === "fr" ? "ACCEPTÉ" : "ACCEPTED"
  const declinedLabel = locale === "fr" ? "REFUSÉ" : "DECLINED"
  const guestsLabel = locale === "fr" ? "INVITÉS" : "GUESTS"
  const budgetLabel = locale === "fr" ? "BUDGET" : "BUDGET"
  const acceptLabel = locale === "fr" ? "ACCEPTER" : "ACCEPT"
  const declineLabel = locale === "fr" ? "REFUSER" : "DECLINE"

  const pendingRequests = requests.filter(r => r.status === "pending")
  const otherRequests = requests.filter(r => r.status !== "pending")

  const handleAccept = (id: string) => {
    setRequests(prev => 
      prev.map(r => r.id === id ? { ...r, status: "accepted" as const } : r)
    )
    setSelectedRequest(null)
  }

  const handleDecline = (id: string) => {
    setRequests(prev => 
      prev.map(r => r.id === id ? { ...r, status: "declined" as const } : r)
    )
    setSelectedRequest(null)
  }

  if (requests.length === 0) {
    return (
      <div className="h-full flex flex-col bg-app-black">
        <header className="px-4 py-4 border-b border-border-dark">
          <h1 className="font-display text-2xl text-warm-cream">{titleLabel}</h1>
        </header>
        <EmptyState type="catering" locale={locale} />
      </div>
    )
  }

  // Request detail view
  if (selectedRequest) {
    return (
      <div className="h-full flex flex-col bg-app-black">
        <header className="px-4 py-4 border-b border-border-dark flex items-center gap-4">
          <button 
            onClick={() => setSelectedRequest(null)}
            className="text-warm-cream hover:text-fire-orange transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h1 className="font-display text-xl text-warm-cream">{locale === "fr" ? "DEMANDE" : "REQUEST"}</h1>
        </header>
        
        <div className="flex-1 overflow-y-auto pb-20 hide-scrollbar p-4">
          <div className="bg-charcoal border border-border-dark p-4 mb-4">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-display text-lg text-warm-cream">{selectedRequest.name}</h2>
                <p className="text-sm text-muted-text">{selectedRequest.email}</p>
              </div>
              <StatusBadge 
                variant={selectedRequest.status === "pending" ? "accent" : selectedRequest.status === "accepted" ? "open" : "closed"}
              >
                {selectedRequest.status === "pending" ? pendingLabel : selectedRequest.status === "accepted" ? acceptedLabel : declinedLabel}
              </StatusBadge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-fire-orange" />
                <span className="text-sm text-warm-cream">{selectedRequest.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-fire-orange" />
                <span className="text-sm text-warm-cream">{selectedRequest.guestCount} {guestsLabel}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-fire-orange" />
                <span className="text-sm text-warm-cream">{selectedRequest.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-fire-orange" />
                <span className="text-sm text-warm-cream">{selectedRequest.budget}</span>
              </div>
            </div>

            <div className="border-t border-border-dark pt-4">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text block mb-2">
                {locale === "fr" ? "MESSAGE" : "MESSAGE"}
              </span>
              <p className="text-sm text-warm-cream">{selectedRequest.message}</p>
            </div>
          </div>

          {selectedRequest.status === "pending" && (
            <div className="flex gap-3">
              <PrimaryButton 
                variant="secondary" 
                onClick={() => handleDecline(selectedRequest.id)}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <X className="w-4 h-4" />
                {declineLabel}
              </PrimaryButton>
              <PrimaryButton 
                onClick={() => handleAccept(selectedRequest.id)}
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                {acceptLabel}
              </PrimaryButton>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-app-black">
      <header className="px-4 py-4 border-b border-border-dark flex items-center justify-between">
        <h1 className="font-display text-2xl text-warm-cream">{titleLabel}</h1>
        {pendingRequests.length > 0 && (
          <StatusBadge variant="accent">
            {pendingRequests.length} {pendingLabel}
          </StatusBadge>
        )}
      </header>
      
      <div className="flex-1 overflow-y-auto pb-20 hide-scrollbar">
        {/* Pending requests */}
        {pendingRequests.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-graphite">
              <span className="font-mono text-[10px] uppercase tracking-wider text-fire-orange">
                {pendingLabel}
              </span>
            </div>
            {pendingRequests.map((request) => (
              <button
                key={request.id}
                onClick={() => setSelectedRequest(request)}
                className="w-full bg-charcoal border-b border-border-dark p-4 text-left hover:bg-graphite transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-base text-warm-cream">{request.name}</h3>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text">
                    {request.date}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-text">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {request.guestCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    {request.budget}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Other requests */}
        {otherRequests.length > 0 && (
          <div>
            <div className="px-4 py-2 bg-graphite">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text">
                {locale === "fr" ? "HISTORIQUE" : "HISTORY"}
              </span>
            </div>
            {otherRequests.map((request) => (
              <button
                key={request.id}
                onClick={() => setSelectedRequest(request)}
                className="w-full bg-charcoal border-b border-border-dark p-4 text-left hover:bg-graphite transition-colors opacity-60"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-display text-base text-warm-cream">{request.name}</h3>
                  <StatusBadge variant={request.status === "accepted" ? "open" : "closed"}>
                    {request.status === "accepted" ? acceptedLabel : declinedLabel}
                  </StatusBadge>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text">
                  {request.date}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
