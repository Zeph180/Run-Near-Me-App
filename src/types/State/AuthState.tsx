import { LoginResponse } from "@/types/responses/authResponses";
import { Profile } from "@/types/responses/Profile";
import { User } from "@/types/responses/User";

export type AuthState = {
  isLoggedIn: boolean;
  isFirstTime: boolean;
  isReady: boolean;
  user?: User | null;
  profile?: Profile | null;
  account?: User | null;
  token?: string;
  login: (user: LoginResponse) => void;
  logout: () => void;
};
