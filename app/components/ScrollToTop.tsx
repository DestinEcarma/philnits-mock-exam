"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(true) // Always visible for testing
  const [scrollPercentage, setScrollPercentage] = useState(0)

  useEffect(() => {
    const toggleVisibility = () => {
      const winScroll = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = (winScroll / height) * 100
      setScrollPercentage(scrolled)
      setIsVisible(winScroll > 300)
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Button
      className="fixed bottom-4 right-4 size-10 rounded-full shadow-lg transition-all duration-300 bg-primary hover:bg-primary/90"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        opacity: isVisible ? 1 : 0.5,
        transform: `scale(${isVisible ? 1 : 0.8})`,
      }}
    >
      <ChevronUp className="h-6 w-6" />
      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
        {scrollPercentage.toFixed(0)}%
      </span>
    </Button>
  )
}

export default ScrollToTop