import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { AuthUser } from "../types/user";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  // ✅ Run once on mount to read from localStorage
  useEffect(() => {
    const authData = localStorage.getItem("auth");
    const flag = localStorage.getItem("isAuthenticated");

    if (authData && flag === "true") {
      setUser(JSON.parse(authData));
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // ✅ Sync auth status across tabs
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "isAuthenticated") {
        const flag = event.newValue === "true";
        setIsAuthenticated(flag);

        if (!flag) {
          setUser(null);
        } else {
          const stored = localStorage.getItem("auth");
          if (stored) {
            setUser(JSON.parse(stored));
          }
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = (userData: AuthUser) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem("auth", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
  };

  const logout = () => {
    setUser(null); // ✅ ensure user is cleared
    setIsAuthenticated(false);
    localStorage.removeItem("auth");
    localStorage.setItem("isAuthenticated", "false");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
