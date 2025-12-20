import { ApiBaseService } from "@/Services/api/base";

export class ProfileService extends ApiBaseService {
  async completeProfile(data: any): Promise<void> {
    console.log("profile.complete called with :", JSON.stringify(data));
    return this.makeRequest("/Profile/complete", {
      method: "POST",
      data: JSON.stringify(data),
    });
  }
}

export const profileService = new ProfileService();
