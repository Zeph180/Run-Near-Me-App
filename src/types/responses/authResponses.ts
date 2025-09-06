import { BaseResponse } from "@/types/responses/BaseResponse";
import { NotificationResponse } from "@/types/responses/notification";

export interface LoginResponse extends BaseResponse {
  data: {
    token: string;
    account: {
      runnerId: string;
      email: string;
      name: string;
    };
    profile: {
      runnerId: string;
      nickName: string;
      phoneNumber: string;
      address: string;
      city: string;
      state: string;
      age: number;
      height: number;
      weight: number;
      goal: string;
      activityLevel: string;
      goalDate: string;
      notifications: [NotificationResponse];
    };
  };
}

export interface SignupResponse extends BaseResponse {
  data: {
    runnerId: string;
    email: string;
    name: string;
  };
}
