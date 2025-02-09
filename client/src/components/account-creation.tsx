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
import { SignupPageProps } from "../Interfaces.ts";
import { useRef } from "react";
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  ref={usernameRef}
                  type="text"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
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
              <Button type="submit" className="w-full">
                Create Account
              </Button>
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/LoginPage" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </motion.main>
  );
}



