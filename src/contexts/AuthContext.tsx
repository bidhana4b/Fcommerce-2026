import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "trader";
  phone?: string;
  storeName?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  phone: string;
  storeName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Check if admin login
      const isAdmin = email === "admin@example.com";

      // Mock user data
      const mockUser: User = isAdmin
        ? {
            id: "admin-1",
            email,
            name: "অ্যাডমিন",
            role: "admin",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
          }
        : {
            id: "1",
            email,
            name: "সেলার অ্যাকাউন্ট",
            role: "trader",
            phone: "০১৭১২৩৪৫৬৭৮",
            storeName: "রহিম ট্রেডার্স",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=seller",
          };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      navigate(isAdmin ? "/admin" : "/dashboard");
    } catch (error) {
      throw new Error("লগইন ব্যর্থ হয়েছে");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const newUser: User = {
        id: Date.now().toString(),
        email: data.email,
        name: data.name,
        role: "trader",
        phone: data.phone,
        storeName: data.storeName,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/dashboard");
    } catch (error) {
      throw new Error("রেজিস্ট্রেশন ব্যর্থ হয়েছে");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
