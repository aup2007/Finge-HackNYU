"use client";

import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, LogIn, UserPlus } from "lucide-react";
import { Logo } from "../components/ui/logo";
import { motion } from "framer-motion";

export default function AuthGateway() {
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
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="relative z-10 w-full max-w-2xl mx-auto flex-1">
        <Card className="w-full bg-white/95 backdrop-blur shadow-xl rounded-t-[50px] h-[calc(100vh-1rem)] mt-4">
          <CardContent className="p-12 space-y-10">
            {/* Back Button */}
            <Link to="/" className="block mb-4">
              <Button
                variant="ghost"
                size="sm"
                className="pl-0 font-['PP_Radio_Grotesk']"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>

            <div className="text-center space-y-2">
              <Logo size="sm" className="text-3xl md:text-4xl" />
            </div>

            {/* Greeting */}
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-4">
                <img
                  src="/illustration2.svg"
                  alt="Person working at desk with laptop"
                  className="w-72 h-72 scale-150"
                />
              </div>
              <p className="text-5xl font-['PP_Pangaia'] italic">
                welcome.
              </p>
            </div>

            {/* Auth Options */}
            <div className="w-96 mx-auto">
              <Link to="/signup" className="block mb-4">
                <Button
                  variant="outline"
                  className="w-full text-xl px-8 py-6 rounded-xl border-2 bg-white border-black font-['PP_Radio_Grotesk'] hover:bg-gray-50"
                >
                  create an account
                  <UserPlus className="ml-2 h-6 w-6" />
                </Button>
              </Link>

              <Link to="/login">
                <Button
                  variant="outline"
                  className="w-full text-xl px-8 py-6 rounded-xl border-0 text-white font-bold font-['PP_Radio_Grotesk'] bg-gradient-to-r from-[#AAD8E5] to-[#7ED7CB] hover:opacity-60 transition-opacity"
                >
                  log in
                  <LogIn className="ml-2 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.main>
  );
}
