
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Quirk {
  title: string
  description: string
  backgroundColor: string
}

interface QuirksSectionProps {
  quirks: Quirk[]
}

export default function QuirksSection({ quirks }: QuirksSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextQuirk = () => {
    setCurrentIndex((prev) => (prev + 1) % quirks.length)
  }

  const previousQuirk = () => {
    setCurrentIndex((prev) => (prev - 1 + quirks.length) % quirks.length)
  }

  return (
    <div className="space-y-3">
      <p className="text-gray-600 italic text-lg">"Looking for investors who understand that..."</p>
      <div className="relative">
        <div className="overflow-hidden rounded-2xl">
          <div
            className="transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            <div className="flex">
              {quirks.map((quirk, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 p-5"
                  style={{ backgroundColor: quirk.backgroundColor }}
                >
                  <h3 className="text-xl font-semibold mb-1">{quirk.title}</h3>
                  <p className="text-lg">{quirk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button
          variant="secondary"
          size="icon"
          className="absolute -left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-lg hover:bg-white"
          onClick={previousQuirk}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="absolute -right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 shadow-lg hover:bg-white"
          onClick={nextQuirk}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  )
}

