import { createContext, useContext, useState } from "react";
import useLogin from "./useLogin";
import { AxiosError } from "axios";
import {
  AuthContextType,
  AuthProviderProps,
  User,
  LoginData,
} from "../Interfaces";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(
    localStorage.getItem("site") || ""
  );
  const [error, setError] = useState<Error | AxiosError | null>(null);
  const { mutateAsync: login } = useLogin();

  const loginAction = async (data: LoginData): Promise<void> => {
    try {
      const response = await login(data);
      setUser({ id: response.user_id });
      setToken(response.access_token);
      localStorage.setItem("site", response.access_token);
    } catch (error: unknown) {
      console.error("Login failed:", error);
      setError(error as Error);
      throw error; // propagate the error so the login page can handle it
    }
  };

  const logOut = (): void => {
    setUser(null);
    setToken("");
    setError(null);
    localStorage.removeItem("site");
    // Removed navigation call here
  };

  const clearError = (): void => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, loginAction, logOut, error, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
