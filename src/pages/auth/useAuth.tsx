import { createContext, useContext, useState } from "react";
import useLocalStorageState from "../../hooks/useLocalStorageState";
import makeRequest from "../../api/makeRequest";
import type { AuthResponse, MessageResponse } from "../../api/makeRequest";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<MessageResponse>;
  logout: () => void;
  register: (email: string, password: string) => Promise<MessageResponse>;
  token?: string;
}

const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useLocalStorageState<string>("token", "");

  const login = async (email: string, password: string) => {
    const data = await makeRequest<AuthResponse>("/auth/login", {
      method: "POST",
      data: {
        email,
        password,
      },
    });

    if (data.token) {
      setToken(data.token);
    }

    return data;
  };

  const logout = () => {
    setToken("");
  };

  const register = async (email: string, password: string) => {
    const data = await makeRequest<MessageResponse>("/auth/register", {
      method: "POST",
      data: {
        email,
        password,
      },
    });

    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        login,
        logout,
        register,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
