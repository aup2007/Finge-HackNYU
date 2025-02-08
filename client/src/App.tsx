import { ArrowRight } from "lucide-react"
import { Card } from "./components/ui/card"
import { Button } from "./components/ui/button"

export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4 md:p-8">
      {/* Stock Cards */}
      <div className="w-full max-w-6xl relative h-48 mb-12">
        <Card className="absolute left-4 top-0 transform -rotate-6 w-72 p-4 bg-white/90 backdrop-blur">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-['PP_Pangaia']">Apple Inc.</h3>
              <div className="flex items-center gap-2">
                <span className="font-['PP_Pangaia']">AAPL</span>
                <span className="text-red-500 font-['PP_Pangaia']">-5.59 (2.40%)</span>
              </div>
            </div>
            <div className="bg-black rounded-full p-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-02-08%20at%2014.05.27@2x-rTlFRDCejANpKsAPBYCIopLdE1k03N.png"
                alt="Apple logo"
                className="w-6 h-6 invert"
              />
            </div>
          </div>
          <p className="text-sm mt-2 text-slate-600 font-['PP_Pangaia']">
            A tech leader driving innovation with mobile phones, AI, and a high-margin services ecosystem, making it a
            strong long-term investment.
          </p>
        </Card>

        <Card className="absolute right-4 top-4 transform rotate-6 w-72 p-4 bg-white/90 backdrop-blur">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-2xl font-['PP_Pangaia']">Netflix Inc.</h3>
              <div className="flex items-center gap-2">
                <span className="font-['PP_Pangaia']">NFLX</span>
                <span className="text-green-500 font-['PP_Pangaia']">+0.98 (0.097%)</span>
              </div>
            </div>
            <div className="bg-black rounded-full p-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CleanShot%202025-02-08%20at%2014.05.27@2x-rTlFRDCejANpKsAPBYCIopLdE1k03N.png"
                alt="Netflix logo"
                className="w-6 h-6"
              />
            </div>
          </div>
          <p className="text-sm mt-2 text-slate-600 font-['PP_Pangaia']">
            A streaming giant revolutionizing entertainment with original content, global expansion, and a strong
            subscriber base driving consistent revenue growth.
          </p>
        </Card>
      </div>

      {/* Main Content */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-['PP_Pangaia'] italic">Hinge for stocks.</h1>
        <div className="space-y-2">
          <h2 className="text-4xl md:text-6xl font-['PP_Pangaia']">
            Fin<span className="text-slate-400">/</span>ge
          </h2>
          <p className="text-xl text-slate-600 font-['PP_Pangaia']">the app for investors.</p>
        </div>
        <Button variant="outline" size="lg" className="text-xl px-8 py-6 mt-8 rounded-full border-2 font-['PP_Pangaia']">
          try it out now
          <ArrowRight className="ml-2 h-6 w-6" />
        </Button>
      </div>
    </main>
  )
}

