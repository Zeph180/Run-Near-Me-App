import { BaseResponse } from "@/types/responses/BaseResponse";
import { Account } from "@/types/responses/Account";
import { Profile } from "@/types/responses/Profile";

export interface LoginResponse extends BaseResponse {
  data: {
    token: string;
    account: Account;
    profile: Profile;
  };
}

export interface SignupResponse extends BaseResponse {
  data: {
    runnerId: string;
    email: string;
    name: string;
  };
}
