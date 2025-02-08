import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import LandingPage from "./components/landing"
import AccountCreation from "./components/account-creation"


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/account-creation" element={<AccountCreation />} />
      </Routes>
    </Router>
  )
}

