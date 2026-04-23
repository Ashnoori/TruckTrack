"use client"

import { cn } from "@/lib/utils"
import { useEffect, useState, useRef } from "react"

interface BottomSheetProps {
  isOpen: boolean
  onClose?: () => void
  children: React.ReactNode
  snapPoints?: ("peek" | "quarter" | "half" | "full")[]
  initialSnap?: "peek" | "quarter" | "half" | "full"
  className?: string
}

const snapHeights = {
  peek: "h-[200px]",
  quarter: "h-[25vh]",
  half: "h-[50vh]",
  full: "h-[85vh]",
}

export function BottomSheet({ 
  isOpen, 
  onClose, 
  children,
  snapPoints = ["peek", "half", "full"],
  initialSnap = "peek",
  className 
}: BottomSheetProps) {
  const [currentSnap, setCurrentSnap] = useState(initialSnap)
  const [isDragging, setIsDragging] = useState(false)
  const startY = useRef(0)
  const currentY = useRef(0)

  useEffect(() => {
    if (isOpen) {
      setCurrentSnap(initialSnap)
    }
  }, [isOpen, initialSnap])

  const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true)
    startY.current = 'touches' in e ? e.touches[0].clientY : e.clientY
  }

  const handleDragEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    
    const delta = currentY.current - startY.current
    const currentIndex = snapPoints.indexOf(currentSnap)
    
    if (delta > 50 && currentIndex > 0) {
      // Dragged down - go to smaller snap
      setCurrentSnap(snapPoints[currentIndex - 1])
    } else if (delta < -50 && currentIndex < snapPoints.length - 1) {
      // Dragged up - go to larger snap
      setCurrentSnap(snapPoints[currentIndex + 1])
    }
  }

  const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return
    currentY.current = 'touches' in e ? e.touches[0].clientY : e.clientY
  }

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "fixed bottom-16 left-0 right-0 bg-charcoal border-t border-border-dark modal-radius z-40 transition-all duration-300 ease-out",
        snapHeights[currentSnap],
        className
      )}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
    >
      {/* Drag handle */}
      <div className="flex justify-center py-3 cursor-grab active:cursor-grabbing">
        <div className="w-10 h-1 bg-border-dark rounded-full" />
      </div>
      
      {/* Content */}
      <div className="overflow-y-auto h-[calc(100%-40px)] px-4 pb-4 hide-scrollbar">
        {children}
      </div>
    </div>
  )
}
