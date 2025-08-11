import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { type DecodedToken } from "../types/tokenType"; 
import { getToken, setToken as saveToken, clearToken } from "../utils/authTokenUtil"; 

interface AuthContextType {
  token: string | null;
  role: string | null;
  userId: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        setToken(storedToken);
        setRole(decoded.role);
        setUserId(decoded.id); 
      } catch (err) {
        console.error("Invalid token", err);
        setToken(null);
        setRole(null);
        setUserId(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (jwt: string) => {
    saveToken(jwt);
    try {
      const decoded = jwtDecode<DecodedToken>(jwt);
      setToken(jwt);
      setRole(decoded.role);
      setUserId(decoded.id);
    } catch (err) {
      console.error("Invalid token at login", err);
      setToken(null);
      setRole(null);
      setUserId(null);
    }
  };

  const logout = () => {
    clearToken();
    setToken(null);
    setRole(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, userId, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
