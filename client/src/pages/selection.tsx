"use client"

import { useState } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Logo } from "../components/ui/logo"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const INDUSTRIES = [
  { id: "energy", label: "Energy" },
  { id: "consumer", label: "Consumer" },
  { id: "financial", label: "Financial Services" },
  { id: "technology", label: "Technology" },
]

export default function SelectionPage() {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([])
  const navigate = useNavigate()

  const toggleIndustry = (industryId: string) => {
    setSelectedIndustries(prev => {
      if (prev.includes(industryId)) {
        return prev.filter(id => id !== industryId)
      }
      return [...prev, industryId]
    })
  }

  const handleNext = () => {
    if (selectedIndustries.length > 0) {
      // TODO: Save selected industries and navigate to matches
      navigate("/matches")
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative flex flex-col"
    >
      <div 
        className="fixed inset-0" 
        style={{ 
          backgroundImage: 'url("https://andrewma.b-cdn.net/images/bg.png")',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }} 
      />
      <div className="relative z-10 w-full max-w-md mx-auto flex-1">
        <Card className="w-full bg-white/95 backdrop-blur shadow-xl rounded-t-[50px] h-[calc(100vh-2rem)] mt-8">
          <CardContent className="h-full flex flex-col p-8 space-y-8">
            <div className="text-center mb-4">
              <Logo size="sm" className="text-3xl md:text-4xl" />
            </div>
            
            <div className="text-center mb-4">
              <p className="text-5xl font-['PP_Pangaia'] italic">
                what's your type?
              </p>
            </div>

            <div className="flex justify-center mb-4">
              <img 
                src="/illustration.svg" 
                alt="Person working at desk with laptop" 
                className="w-52 h-52"
              />
            </div>

            <div className="flex-1 flex flex-col">
              <h2 className="text-[22px] font-['PP_Radio_Grotesk'] text-center font-[700] mb-4">
                What industries are you interested in?
              </h2>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                {INDUSTRIES.map(industry => (
                  <Button
                    key={industry.id}
                    variant={selectedIndustries.includes(industry.id) ? "default" : "outline"}
                    onClick={() => toggleIndustry(industry.id)}
                    className={`
                      rounded-xl py-4 font-['PP_Radio_Grotesk'] border-2 border-black font-[700] text-lg
                      ${selectedIndustries.includes(industry.id) 
                        ? 'bg-gradient-to-r from-[#AAD8E5] to-[#7ED7CB] text-white hover:opacity-90 border-0'
                        : 'hover:bg-gray-50'
                      }
                    `}
                  >
                    {industry.label}
                  </Button>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleNext}
                  disabled={selectedIndustries.length === 0}
                  className="w-32 rounded-xl py-4 font-['PP_Radio_Grotesk'] text-lg font-bold bg-gradient-to-r from-[#AAD8E5] to-[#7ED7CB] text-white hover:opacity-90"
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.main>
  )
}
