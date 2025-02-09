import { ArrowRight } from "lucide-react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Logo } from "../components/ui/logo";
import { useEffect, useRef } from "react";
import AppleLogo from "../assets/apple.png";
import NetflixLogo from "../assets/netflix.png";
import GoldmanLogo from "../assets/gs.png";
import Typed from "typed.js";

type TypedOptions = {
  strings: string[];
  typeSpeed: number;
  backSpeed: number;
  cursorChar?: string;
  showCursor?: boolean;
  loop: boolean;
  smartBackspace: boolean;
  backDelay?: number;
  startDelay?: number;
};

function useTyped(options: TypedOptions) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const typedRef = useRef<Typed | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      typedRef.current = new Typed(elementRef.current, options);
    }

    return () => {
      typedRef.current?.destroy();
    };
  }, [options]);

  return elementRef;
}

export default function LandingPage() {
  const typedElement = useTyped({
    strings: [
      "the app for investors.",
      "the app for beginners.",
      "the app for traders.",
      "the app for risk takers.",
      "the app for trend followers.",
      "the app for anyone.",
    ],
    typeSpeed: 50,
    backSpeed: 30,
    cursorChar: "|",
    showCursor: true,
    loop: true,
    smartBackspace: true,
    backDelay: 1500,
  });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen relative mt-16 flex flex-col items-center justify-center p-4 md:p-8"
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
      <div className="relative z-10 w-full">
        {/* Stock Cards */}
        <div className="w-full max-w-6xl relative h-48 mb-12 mx-auto">
          <Card className="absolute left-4 top-0 transform -rotate-6 w-72 p-4 bg-white/90 backdrop-blur transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg rounded-3xl">
            <div className="flex items-start justify-between">
              <div className="transition-transform duration-500">
                <h3 className="text-[28px] font-['PP_Pangaia']">Apple Inc.</h3>
                <div className="flex items-center gap-2">
                  <span className="font-['PP_Radio_Grotesk']">AAPL</span>
                  <span className="text-red-500 font-['PP_Radio_Grotesk']">
                    -5.59 (2.40%)
                  </span>
                </div>
              </div>
              <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-110">
                <img
                  src={AppleLogo}
                  alt="Apple logo"
                  className="w-10 h-10 object-cover"
                />
              </div>
            </div>
            <p className="text-sm mt-2 text-slate-600 font-['PP_Radio_Grotesk']">
              A tech leader driving innovation with mobile phones, AI, and a
              high-margin services ecosystem, making it a strong long-term
              investment.
            </p>
          </Card>

          <Card className="absolute left-1/2 top-2 -translate-x-1/2 transform rotate-0 w-72 p-4 bg-white/90 backdrop-blur transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg rounded-3xl">
            <div className="flex items-start justify-between">
              <div className="transition-transform duration-500">
                <h3 className="text-[28px] font-['PP_Pangaia']">
                  Goldman Sachs
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-['PP_Radio_Grotesk']">GS</span>
                  <span className="text-green-500 font-['PP_Radio_Grotesk']">
                    +3.21 (0.85%)
                  </span>
                </div>
              </div>
              <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-110">
                <img
                  src={GoldmanLogo}
                  alt="Goldman Sachs logo"
                  className="w-[100%] h-[100%] object-cover object-center"
                />
              </div>
            </div>
            <p className="text-sm mt-2 text-slate-600 font-['PP_Radio_Grotesk']">
              A leading global investment bank known for financial advisory,
              securities, and investment management services with a strong track
              record.
            </p>
          </Card>

          <Card className="absolute right-4 top-4 transform rotate-6 w-72 p-4 bg-white/90 backdrop-blur transition-all duration-500 hover:scale-105 hover:shadow-2xl shadow-lg rounded-3xl">
            <div className="flex items-start justify-between">
              <div className="transition-transform duration-500">
                <h3 className="text-[28px] font-['PP_Pangaia']">
                  Netflix Inc.
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-['PP_Radio_Grotesk']">NFLX</span>
                  <span className="text-green-500 font-['PP_Radio_Grotesk']">
                    +0.98 (0.097%)
                  </span>
                </div>
              </div>
              <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-110">
                <img
                  src={NetflixLogo}
                  alt="Netflix logo"
                  className="w-10 h-10 object-cover"
                />
              </div>
            </div>
            <p className="text-sm mt-2 text-slate-600 font-['PP_Radio_Grotesk']">
              A streaming giant revolutionizing entertainment with original
              content, global expansion, and a strong subscriber base driving
              consistent revenue growth.
            </p>
          </Card>
        </div>

        {/* Main Content */}
        <div className="text-center space-y-6">
          <motion.h1
            className="text-6xl md:text-8xl font-['PP_Pangaia'] italic"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Hinge for stocks.
          </motion.h1>
          <div className="space-y-2">
            <Logo size="lg" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <span
                ref={typedElement}
                className="text-xl text-slate-900 font-['PP_Radio_Grotesk'] inline-block"
              />
              <style>
                {`
                  .typed-cursor {
                    font-size: 1.25rem;
                    line-height: 1.75rem;
                    vertical-align: baseline;
                  }
                `}
              </style>
            </motion.div>
          </div>
          <Link to="/signup">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="text-xl px-8 py-6 mt-8 rounded-xl border-2 bg-white border-black font-['PP_Radio_Grotesk']"
              >
                try it out now
                <ArrowRight className="ml-2 h-6 w-4" />
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <motion.div
        className="w-full bg-white mt-36 py-24 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-['PP_Pangaia'] text-center mb-16">
            Why <span className="italic">Finge</span>?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-['PP_Pangaia']">Simple</h3>
              <p className="text-slate-600 font-['PP_Radio_Grotesk']">
                Find your next investment with an intuitive, swipe-based
                interface. No complex charts or confusing metrics.
              </p>
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-['PP_Pangaia']">Smart</h3>
              <p className="text-slate-600 font-['PP_Radio_Grotesk']">
                AI-powered insights help you understand each company's
                potential. Get personalized stock recommendations.
              </p>
            </div>
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-['PP_Pangaia']">Made for anyone</h3>
              <p className="text-slate-600 font-['PP_Radio_Grotesk']">
                Educate yourself on the stock market with our easy-to-understand
                explanations and news articles.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
}
