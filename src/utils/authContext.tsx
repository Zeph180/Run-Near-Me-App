import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { SplashScreen, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

type AuthState = {
  isLoggedIn: boolean;
  isFirstTime: boolean;
  isReady: boolean;
  login: () => void;
  logout: () => void;
};

const authStorageKey = "auth-key";

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isFirstTime: false,
  isReady: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  const storeAuthState = (newState: { isLoggedIn: boolean }) => {
    try {
      const jsonValue = JSON.stringify(newState);
      AsyncStorage.setItem(authStorageKey, jsonValue);
    } catch (error) {
      console.error("Error storing auth state:", error);
    }
  };

  const login = () => {
    setIsLoggedIn(true);
    storeAuthState({ isLoggedIn: true });
    router.replace("/");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsFirstTime(false);
    storeAuthState({ isLoggedIn: false });
    router.replace("/auth/login");
  };

  useEffect(() => {
    const fetchAuthState = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(authStorageKey);
        if (jsonValue !== null) {
          const state = JSON.parse(jsonValue);
          setIsLoggedIn(state.isLoggedIn);
          setIsFirstTime(false);
        } else {
          setIsFirstTime(true);
        }
      } catch (error) {
        console.error("Error fetching auth state:", error);
      }
      setIsReady(true);
    };
    fetchAuthState();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isFirstTime, login, logout, isReady }}
    >
      {children}
    </AuthContext.Provider>
  );
}
