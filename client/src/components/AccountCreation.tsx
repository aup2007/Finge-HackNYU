"use client"

import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import type React from "react" // Added import for React

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
      className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4"
    >
      <Card className="w-full max-w-md p-8">
        <CardContent className="space-y-8">
          {/* Back Button */}
          <Link to="/" className="block mb-4">
            <Button variant="ghost" size="sm" className="pl-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>

          {/* Logo */}
          <div className="text-center space-y-6">
            <motion.h1
              className="font-serif text-4xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Fin<span className="text-slate-400">/</span>ge
            </motion.h1>
            <motion.p
              className="text-2xl italic font-serif"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              let&apos;s get started.
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">What is your email?</Label>
              <Input
                id="email"
                type="email"
                placeholder="john.appleseed@nyu.edu"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="rounded-full border-slate-200"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">What is your password?</Label>
              <Input
                id="password"
                type="password"
                placeholder="MyPassword123!"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="rounded-full border-slate-200"
                required
              />
            </div>

            <Button type="submit" className="w-full rounded-full bg-sky-200 hover:bg-sky-300 text-slate-800">
              Next
            </Button>
          </motion.form>

          {/* Login Link */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a href="/login" className="text-slate-900 hover:underline underline-offset-4">
              Log in
            </a>
          </motion.div>
        </CardContent>
      </Card>
    </motion.main>
  )
}

