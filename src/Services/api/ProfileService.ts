import { ApiBaseService } from "@/Services/api/base";
import { CompleteProfileResponse } from "@/types/Profile/ProfileResponses";

export class ProfileService extends ApiBaseService {
  async completeProfile(data: any): Promise<CompleteProfileResponse> {
    console.log("profile.complete called with :", JSON.stringify(data));
    return this.makeRequest("/Profile/complete", {
      method: "POST",
      data: JSON.stringify(data),
    });
  }

  async getProfile(profileId: string): Promise<CompleteProfileResponse> {
    console.log("profile.complete called with :", profileId);
    return this.makeRequest(`/Profile/${profileId}`, {
      method: "GET",
      data: JSON.stringify({}),
    });
  }
}

export const profileService = new ProfileService();
