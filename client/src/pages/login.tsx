"use client"

import { useRef } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Link } from "react-router-dom"
import { ArrowLeft, LogIn } from "lucide-react"
import { Logo } from "../components/ui/logo"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"




export default function LoginPage() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const auth = useAuth();
  const navigate = useNavigate();
  console.log(auth.token);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //need to get the email and password printed
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    console.log("Form submitted:", { username, password });
    auth.loginAction({ username, password });
    console.log("ERROR:", auth.error);
  };



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
          <CardContent className="p-8 space-y-8">
            {/* Back Button */}
            <Link to="/" className="block mb-4">
              <Button variant="ghost" size="sm" className="pl-0 font-['PP_Radio_Grotesk']">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="text-center space-y-2">
              <Logo size="sm" className="text-3xl md:text-4xl" />
            </div>
            {/* Logo */}
            <div className="text-center space-y-6">
              <p className="text-5xl font-['PP_Pangaia'] italic">
                welcome back.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Label htmlFor="username" className="font-['PP_Radio_Grotesk'] text-lg font-bold">
                    Username
                  </Label>
                </div>
                <Input
                  id="username"
                  ref={usernameRef}
                  type="text"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-center">
                  <Label htmlFor="password" className="font-['PP_Radio_Grotesk'] text-lg font-bold">
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  ref={passwordRef}
                  type="password"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  className="text-xl px-8 py-4 rounded-xl border-0 text-white font-bold font-['PP_Radio_Grotesk'] w-auto bg-gradient-to-r from-[#AAD8E5] to-[#7ED7CB] hover:opacity-60 transition-opacity"
                >
                  log in
                  <LogIn className="ml-2 h-6 w-6" />
                </Button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-center">
              <Link 
                to="/signup" 
                className="text-slate-900 hover:text-slate-600 font-['PP_Radio_Grotesk'] hover:underline underline-offset-4"
              >
                Create an account
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.main>
  )
}
