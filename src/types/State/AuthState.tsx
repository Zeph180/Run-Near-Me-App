import { LoginResponse } from "@/types/responses/authResponses";
import { User } from "@/types/responses/Account";
import { Profile } from "@/types/responses/Profile";

export type AuthState = {
  isLoggedIn: boolean;
  isFirstTime: boolean;
  isReady: boolean;
  user?: LoginResponse | null;
  profile?: Profile | null;
  account?: User | null;
  token?: string;
  login: (user: LoginResponse) => void;
  logout: () => void;
};
