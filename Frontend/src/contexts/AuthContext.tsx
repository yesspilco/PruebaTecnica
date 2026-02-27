import { createContext, useContext, useState } from "react";
import { User, AuthContextType } from "../types/user.type";
import * as authService from "../services/auth.service";
import { updateUser } from "../services/user.service";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
    setUser(data.user);
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const fetchUser = async () => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
  };

  const updateProfile = async (data: { name?: string; email?: string }) => {
    const updatedUser = await updateUser(data);
    setUser(prev => ({
      ...prev!,
      name: updatedUser.name || prev!.name,
      email: updatedUser.email || prev!.email,
    }));
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...user,
        name: updatedUser.name || user?.name,
        email: updatedUser.email || user?.email,
      })
    );
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchUser, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);