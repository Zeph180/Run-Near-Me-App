import { createContext, PropsWithChildren, useState } from "react";
import { useRouter } from "expo-router";

type AuthState = {
  isLoggedIn: boolean;
  isFirstTime: boolean;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isFirstTime: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const router = useRouter();

  const login = () => {
    setIsLoggedIn(true);
    router.replace("/");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsFirstTime(false);
    router.replace("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isFirstTime, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
