"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Logo } from "./ui/logo"
import { motion } from "framer-motion"

export default function AccountCreation() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen relative flex items-center justify-center p-4"
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
      <div className="relative z-10 w-full max-w-md">
        <Card className="w-full bg-white/95 backdrop-blur shadow-xl">
          <CardContent className="p-8 space-y-8">
            {/* Back Button */}
            <Link to="/" className="block mb-4">
              <Button variant="ghost" size="sm" className="pl-0 font-['PP_Radio_Grotesk']">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>

            {/* Logo */}
            <div className="text-center space-y-6">
              <Logo size="md" />
              <p className="text-2xl font-['PP_Pangaia'] italic">
                let's get started.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-['PP_Radio_Grotesk']">What is your email?</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.appleseed@nyu.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-full border-2 border-slate-200 h-12 px-4 font-['PP_Radio_Grotesk']"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-base font-['PP_Radio_Grotesk']">What is your password?</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="MyPassword123!"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="rounded-full border-2 border-slate-200 h-12 px-4 font-['PP_Radio_Grotesk']"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full rounded-full bg-sky-200 hover:bg-sky-300 text-slate-800 h-12 font-['PP_Radio_Grotesk']"
              >
                Next
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center">
              <Link 
                to="/login" 
                className="text-slate-900 hover:text-slate-600 font-['PP_Radio_Grotesk'] hover:underline underline-offset-4"
              >
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.main>
  )
}

