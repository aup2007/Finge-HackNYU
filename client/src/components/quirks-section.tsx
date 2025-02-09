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
      <p className="text-gray-600 italic text-lg font-['PP_Radio_Grotesk']">"Looking for investors who understand that..."</p>
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
                  className="w-full flex-shrink-0 px-14 py-5"
                  style={{ backgroundColor: quirk.backgroundColor }}
                >
                  <h3 className="text-xl font-['PP_Pangaia'] mb-1">{quirk.title}</h3>
                  <p className="text-lg font-['PP_Radio_Grotesk']">{quirk.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-1 top-1/2 -translate-y-1/2 hover:bg-transparent p-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none outline-none ring-0 ring-offset-0"
          onClick={previousQuirk}
        >
          <ChevronLeft className="h-5 w-5 text-gray-600" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-1 top-1/2 -translate-y-1/2 hover:bg-transparent p-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none outline-none ring-0 ring-offset-0"
          onClick={nextQuirk}
        >
          <ChevronRight className="h-5 w-5 text-gray-600" />
        </Button>
      </div>
    </div>
  )
}

