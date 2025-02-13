import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage.tsx";
import AccountCreation from "./pages/AccountCreation.tsx";
import AuthProvider from "./hooks/useAuth";
import LoginPage from "./pages/LoginPage.tsx";
import StockTracker from "./pages/StockTracker.tsx";
import SelectionPage from "./pages/SelectionPage.tsx";
import PrivateRoute from "./pages/PrivateRoute.tsx";
import AuthGateway from "./pages/AuthGateway.tsx";
export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth-gateway" element={<AuthGateway />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<AccountCreation />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/selection" element={<SelectionPage />} />
          <Route path="/matches" element={<StockTracker />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
