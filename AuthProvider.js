import React, { createContext, useState, useEffect } from "react";
import api from "./api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On app load, try to refresh tokens and get user
  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await api.get("/refresh");
        setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    tryRefresh();
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/login", { email, password });
    setUser(res.data.user);
    return res;
  };

  const signup = async (name, email, password) => {
    const res = await api.post("/signup", { name, email, password });
    return res;
  };

  const logout = async () => {
    await api.post("/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
