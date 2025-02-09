"use client"

import { useState, useRef } from "react"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Link } from "react-router-dom"
import { ArrowLeft, UserPlus } from "lucide-react"
import { Logo } from "../components/ui/logo"
import { motion } from "framer-motion"
import { SignupPageProps } from "../Interfaces.ts";
import useCreateUser from "../hooks/useCreateUser";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AccountCreation({ isSignedUp, onSignup }: SignupPageProps) {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { mutate: createUser, error } = useCreateUser();
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    console.log("Form submitted:", { username, password });
    
    createUser(
      { username, password },
      {
        onSuccess: (data) => {
          console.log("Signup successful:", data);
          onSignup();
          auth.logOut();
          navigate("/LoginPage");
        },
        onError: (error) => {
          console.error("Signup failed:", error);
        },
      }
    );
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
                  let's get started.
                </p>
              </div>
  
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <Label htmlFor="username" className="font-['PP_Radio_Grotesk'] text-lg font-bold">
                      What would you like your username to be?
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
                      Please set a strong password.
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
                {error && (
                  <p className="text-red-500 text-sm">
                    {error instanceof Error ? error.message : "An error occurred during signup"}
                  </p>
                )}
                <div className="flex justify-center">
                  <Button 
                    variant="outline" 
                    className="text-xl px-8 py-4 rounded-xl border-0 text-white font-bold font-['PP_Radio_Grotesk'] w-auto bg-gradient-to-r from-[#AAD8E5] to-[#7ED7CB] hover:opacity-60 transition-opacity"
                  >
                    create my account!
                    <UserPlus className="ml-2 h-6 w-6" />
                  </Button>
                </div>
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

