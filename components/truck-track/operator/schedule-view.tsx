"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, MapPin, Clock, Plus } from "lucide-react"
import { PrimaryButton } from "../primary-button"

interface ScheduleViewProps {
  locale?: "en" | "fr"
}

interface DaySchedule {
  location: string | null
  hours: string | null
}

const daysEn = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
const daysFr = ["DIM", "LUN", "MAR", "MER", "JEU", "VEN", "SAM"]
const daysFullEn = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const daysFullFr = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"]

// Mock schedule data
const mockSchedule: Record<string, DaySchedule> = {
  "0": { location: null, hours: null }, // Sunday closed
  "1": { location: "ByWard Market", hours: "11:00 - 19:00" },
  "2": { location: "Lansdowne Park", hours: "11:00 - 20:00" },
  "3": { location: "Preston Street", hours: "11:30 - 19:00" },
  "4": { location: "ByWard Market", hours: "11:00 - 21:00" },
  "5": { location: "Sparks Street", hours: "11:00 - 22:00" },
  "6": { location: "Lansdowne Park", hours: "10:00 - 22:00" },
}

export function ScheduleView({ locale = "en" }: ScheduleViewProps) {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0)
  
  const days = locale === "fr" ? daysFr : daysEn
  const daysFull = locale === "fr" ? daysFullFr : daysFullEn
  const titleLabel = locale === "fr" ? "HORAIRE" : "SCHEDULE"
  const weekLabel = locale === "fr" ? "CETTE SEMAINE" : "THIS WEEK"
  const noScheduleLabel = locale === "fr" ? "AUCUN HORAIRE" : "NOT SCHEDULED"
  const editLabel = locale === "fr" ? "MODIFIER" : "EDIT DAY"
  const addLabel = locale === "fr" ? "AJOUTER" : "ADD SCHEDULE"

  // Get current week dates
  const getWeekDates = () => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + (currentWeekOffset * 7))
    
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      return date
    })
  }

  const weekDates = getWeekDates()
  const today = new Date().getDay()

  return (
    <div className="h-full flex flex-col bg-app-black">
      {/* Header */}
      <header className="px-4 py-4 border-b border-border-dark">
        <h1 className="font-display text-2xl text-warm-cream">{titleLabel}</h1>
      </header>
      
      <div className="flex-1 overflow-y-auto pb-20 hide-scrollbar">
        <div className="p-4">
          {/* Week navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => setCurrentWeekOffset(prev => prev - 1)}
              className="w-10 h-10 flex items-center justify-center text-muted-text hover:text-warm-cream transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-[11px] uppercase tracking-wider text-warm-cream">
              {currentWeekOffset === 0 
                ? weekLabel 
                : `${weekDates[0].toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA", { month: 'short', day: 'numeric' })} - ${weekDates[6].toLocaleDateString(locale === "fr" ? "fr-CA" : "en-CA", { month: 'short', day: 'numeric' })}`
              }
            </span>
            <button
              onClick={() => setCurrentWeekOffset(prev => prev + 1)}
              className="w-10 h-10 flex items-center justify-center text-muted-text hover:text-warm-cream transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Week grid */}
          <div className="grid grid-cols-7 gap-1 mb-6">
            {weekDates.map((date, i) => {
              const schedule = mockSchedule[String(i)]
              const isToday = currentWeekOffset === 0 && i === today
              const hasSchedule = schedule?.location !== null
              
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDay(selectedDay === i ? null : i)}
                  className={`aspect-square flex flex-col items-center justify-center p-1 transition-colors ${
                    selectedDay === i
                      ? "bg-fire-orange text-warm-cream"
                      : isToday
                        ? "bg-graphite text-warm-cream border border-fire-orange"
                        : hasSchedule
                          ? "bg-charcoal text-warm-cream border border-border-dark hover:bg-graphite"
                          : "bg-charcoal/50 text-muted-text border border-border-dark/50 hover:bg-charcoal"
                  }`}
                >
                  <span className="font-mono text-[9px] uppercase tracking-wider">
                    {days[i]}
                  </span>
                  <span className="text-lg font-display">
                    {date.getDate()}
                  </span>
                  {hasSchedule && (
                    <div className={`w-1.5 h-1.5 rounded-full mt-0.5 ${selectedDay === i ? 'bg-warm-cream' : 'bg-success'}`} />
                  )}
                </button>
              )
            })}
          </div>

          {/* Selected day details */}
          {selectedDay !== null && (
            <div className="bg-charcoal border border-border-dark p-4 mb-4">
              <h3 className="font-display text-lg text-warm-cream mb-4">
                {daysFull[selectedDay]}
              </h3>
              
              {mockSchedule[String(selectedDay)]?.location ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-fire-orange" />
                    <span className="text-warm-cream">
                      {mockSchedule[String(selectedDay)].location}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-muted-text" />
                    <span className="text-muted-text">
                      {mockSchedule[String(selectedDay)].hours}
                    </span>
                  </div>
                  <PrimaryButton variant="secondary" className="w-full mt-4">
                    {editLabel}
                  </PrimaryButton>
                </div>
              ) : (
                <div className="text-center py-4">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-text block mb-4">
                    {noScheduleLabel}
                  </span>
                  <PrimaryButton className="inline-flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    {addLabel}
                  </PrimaryButton>
                </div>
              )}
            </div>
          )}

          {/* Quick view list */}
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-text mb-3 block">
              {locale === "fr" ? "APERÇU DE LA SEMAINE" : "WEEK OVERVIEW"}
            </span>
            <div className="bg-charcoal border border-border-dark divide-y divide-border-dark">
              {weekDates.map((date, i) => {
                const schedule = mockSchedule[String(i)]
                return (
                  <div key={i} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text w-8">
                        {days[i]}
                      </span>
                      <span className="text-sm text-warm-cream">
                        {schedule?.location || (locale === "fr" ? "Fermé" : "Closed")}
                      </span>
                    </div>
                    {schedule?.hours && (
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-text">
                        {schedule.hours}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
