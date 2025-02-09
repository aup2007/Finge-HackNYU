import { ReactNode, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLogin from "./useLogin";
import { AxiosError } from "axios";
interface User {
  id: string;
}

interface AuthContextType {
  user: User | null;
  token: string;
  loginAction: (data: LoginData) => Promise<void>;
  logOut: () => void;
  error: Error | AxiosError | null;
}

interface LoginData {
  username: string;
  password: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string>(
    localStorage.getItem("site") || ""
  );
  const [error, setError] = useState<Error | AxiosError | null>(null);
  const navigate = useNavigate();
  const { mutate: login } = useLogin();

  const loginAction = async (data: LoginData): Promise<void> => {
    login(data, {
      onSuccess: (response) => {
        setUser({ id: response.user_id });
        setToken(response.access_token);
        localStorage.setItem("site", response.access_token);
        navigate("/HomePage");
      },
      onError: (error) => {
        console.error("Login failed:", error);
        setError(error);
        throw error;
      },
    });
  };

  const logOut = (): void => {
    setUser(null);
    setToken("");
    setError(null);
    localStorage.removeItem("site");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ token, user, loginAction, logOut, error }}>
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
