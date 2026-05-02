import { createContext, useContext, useState, ReactNode } from "react";

export type Role = "Employee" | "Mentor" | "Team Lead" | "Project Manager" | "Admin";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: string;
  role: Role;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default mock user for development
const mockUser: AuthUser = {
  id: "u1",
  name: "Jatin",
  email: "jatin@plan-it.com",
  avatar: "https://images.unsplash.com/photo-1740252117013-4fb21771e7ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwcm9mZXNzaW9uYWwlMjBhdmF0YXJ8ZW58MXx8fHwxNzc3NjMzMDY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  department: "Product",
  role: "Project Manager",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize with null to force login screen, or mockUser for immediate access
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (newUser: AuthUser) => setUser(newUser);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
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
