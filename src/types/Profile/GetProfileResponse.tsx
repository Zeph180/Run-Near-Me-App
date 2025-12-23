import { BaseResponse } from "@/types/responses/BaseResponse";
import { Profile } from "@/types/Profile/Profile";

export interface ProfileResponse extends BaseResponse {
  data: Profile;
}
