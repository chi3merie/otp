"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  clearSession,
  getSession,
  login as authLogin,
  logout as authLogout,
  signup as authSignup,
  type CustomerSession,
} from "./auth";

type AuthContextValue = {
  customer: CustomerSession | null;
  loading: boolean;
  signup: (data: {
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
  }) => { success: boolean; error?: string };
  login: (data: {
    email: string;
    password: string;
  }) => { success: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<CustomerSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (session) {
      setCustomer(session);
    }
    setLoading(false);
  }, []);

  const signup = useCallback(
    (data: {
      name: string;
      email: string;
      phone: string;
      address: string;
      password: string;
    }) => {
      const result = authSignup(data);
      if (result.success && result.session) {
        setCustomer(result.session);
      }
      return { success: result.success, error: result.error };
    },
    []
  );

  const login = useCallback((data: { email: string; password: string }) => {
    const result = authLogin(data);
    if (result.success && result.session) {
      setCustomer(result.session);
    }
    return { success: result.success, error: result.error };
  }, []);

  const logout = useCallback(() => {
    authLogout();
    setCustomer(null);
  }, []);

  return (
    <AuthContext.Provider value={{ customer, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
