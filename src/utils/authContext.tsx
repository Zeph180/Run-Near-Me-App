import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { SplashScreen, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginResponse } from "@/types/responses/authResponses";

SplashScreen.preventAutoHideAsync();

type AuthState = {
  isLoggedIn: boolean;
  isFirstTime: boolean;
  isReady: boolean;
  login: (user: LoginResponse) => void;
  logout: () => void;
};

const authStorageKey = "auth-key";
const firstTimeStorageKey = "first-time";
const profileStorageKey = "profile";
const accountStorageKey = "account";

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isFirstTime: false,
  isReady: false,
  login: (user: LoginResponse) => {},
  logout: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const router = useRouter();

  const storeAuthState = async (newState: LoginResponse) => {
    try {
      console.log("storing auth state: ", newState);

      const tokenValue = JSON.stringify(newState.data.token);
      const userValue = JSON.stringify(newState);
      const profile = newState?.data?.profile;
      const account = newState?.data?.account;

      await Promise.all([
        AsyncStorage.setItem(authStorageKey, tokenValue),
        AsyncStorage.setItem(profileStorageKey, JSON.stringify(profile)),
        AsyncStorage.setItem(accountStorageKey, JSON.stringify(account)),
        AsyncStorage.setItem(firstTimeStorageKey, "false"),
      ]);
    } catch (error) {
      console.error("Error storing auth state:", error);
    }
  };

  const login = async (user: LoginResponse) => {
    setIsLoggedIn(true);
    await storeAuthState(user);
    router.replace("/");
  };

  const logout = async () => {
    setIsLoggedIn(false);
    setIsFirstTime(false);
    const keys = [
      authStorageKey,
      firstTimeStorageKey,
      profileStorageKey,
      accountStorageKey,
    ];
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error("Error logging out:", error);
    }
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
