import { NotificationResponse } from "@/types/responses/notification";

export type Profile = {
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
