import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { SplashScreen, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginResponse } from "@/types/responses/authResponses";
import { Profile } from "@/types/responses/Profile";
import { Account } from "@/types/responses/Account";

SplashScreen.preventAutoHideAsync();

type AuthState = {
  isLoggedIn: boolean;
  isFirstTime: boolean;
  isReady: boolean;
  user?: LoginResponse | null;
  profile?: Profile | null;
  account?: Account | null;
  token?: string;
  login: (user: LoginResponse) => void;
  logout: () => void;
};

const authStorageKey = "auth-key";
const firstTimeStorageKey = "first-time";
const profileStorageKey = "profile";
const accountStorageKey = "account";
const userStorageKey = "user-data";

export const AuthContext = createContext<AuthState>({
  isLoggedIn: false,
  isFirstTime: false,
  isReady: false,
  user: null,
  profile: null,
  account: null,
  token: "",
  login: (user: LoginResponse) => {},
  logout: () => {},
});

export function AuthProvider({ children }: PropsWithChildren) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [account, setAccount] = useState<any>(null);
  const [token, setToken] = useState<string>("");
  const router = useRouter();

  const storeAuthState = async (loginResponse: LoginResponse) => {
    try {
      console.log("storing auth state: ", loginResponse);

      const tokenValue = JSON.stringify(loginResponse.data.token);
      const profileData = loginResponse?.data?.profile;
      const accountData = loginResponse?.data?.account;

      await Promise.all([
        AsyncStorage.setItem(authStorageKey, tokenValue),
        AsyncStorage.setItem(userStorageKey, JSON.stringify(loginResponse)),
        AsyncStorage.setItem(profileStorageKey, JSON.stringify(profileData)),
        AsyncStorage.setItem(accountStorageKey, JSON.stringify(accountData)),
        AsyncStorage.setItem(firstTimeStorageKey, "false"),
      ]);
    } catch (error) {
      console.error("Error storing auth state:", error);
    }
  };

  const login = async (userResponse: LoginResponse) => {
    try {
      console.log("login response: ", userResponse);
      setIsLoggedIn(true);
      setUser(userResponse.data.profile);
      setProfile(userResponse.data.profile);
      setAccount(userResponse.data.account);
      setToken(userResponse.data.token);
      setIsFirstTime(false);

      await storeAuthState(userResponse);

      router.replace("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      console.log("logging out");

      setIsLoggedIn(false);
      setIsFirstTime(false);
      setUser(null);
      setProfile(null);
      setAccount(null);
      setToken("");

      const keys = [
        authStorageKey,
        firstTimeStorageKey,
        profileStorageKey,
        accountStorageKey,
      ];

      await AsyncStorage.multiRemove(keys);
      router.replace("/auth/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const loadStoredAuthData = async () => {
    try {
      const firstTimeValue = await AsyncStorage.getItem(firstTimeStorageKey);

      if (firstTimeValue === null) {
        console.log("first time value is null");
        setIsFirstTime(true);
        return;
      }

      const storedTokenValue = await AsyncStorage.getItem(authStorageKey);

      if (!storedTokenValue) {
        console.log("stored token value is null");
        setIsLoggedIn(false);
        setIsFirstTime(false);
        return;
      }

      const [storedUser, storedProfile, storedAccount] = await Promise.all([
        AsyncStorage.getItem(userStorageKey),
        AsyncStorage.getItem(profileStorageKey),
        AsyncStorage.getItem(accountStorageKey),
      ]);

      if (storedUser && storedProfile && storedAccount) {
        console.log("stored user, profile, and account");
        const user = JSON.parse(storedUser);
        const profile = JSON.parse(storedProfile);
        const account = JSON.parse(storedAccount);

        setUser(user);
        setProfile(profile);
        setAccount(account);
        setToken(storedTokenValue);
        setIsLoggedIn(true);
        setIsFirstTime(false);
        console.log("stored data loaded successfully");
      } else {
        console.log("one or more stored data is null");
        setIsLoggedIn(false);
        setIsFirstTime(true);
        await logout();
      }
    } catch (error) {
      console.error("Error loading stored data:", error);
      setIsLoggedIn(false);
      setIsFirstTime(false);
      await logout();
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      await loadStoredAuthData();
      setIsReady(true);
    };

    initializeAuth();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isFirstTime,
        isReady,
        user,
        profile,
        account,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
