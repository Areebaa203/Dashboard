"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DEMO_USERS = [
  { email: "user@gmail.com", password: "demo1234", role: "user", name: "User Demo" },
  { email: "seller@gmail.com", password: "demo1234", role: "seller", name: "Seller Demo" },
  { email: "admin@gmail.com", password: "demo1234", role: "admin", name: "Admin Demo" },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dashboard_user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    const match = DEMO_USERS.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password
    );
    if (match) {
      const userData = { email: match.email, role: match.role, name: match.name };
      setUser(userData);
      localStorage.setItem("dashboard_user", JSON.stringify(userData));
      return { success: true, role: match.role };
    }
    return { success: false, error: "Invalid email or password. Please try the demo credentials." };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dashboard_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
