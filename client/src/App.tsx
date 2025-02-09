import { Route, Routes } from "react-router-dom"
import LandingPage from "./pages/landing.tsx"
import AccountCreation from "./pages/account-creation.tsx"
import AuthProvider from "./hooks/useAuth"
import { useState } from "react"
import LoginPage from "./pages/login.tsx"



export default function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSignup = () => {
    setIsSignedUp(true);
  };

  return (
    <AuthProvider>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/account-creation" 
          element={
            <AccountCreation 
              isSignedUp={isSignedUp} 
              onSignup={handleSignup} 
            />
          } 
        />
      </Routes>
    </AuthProvider>
  )
}

