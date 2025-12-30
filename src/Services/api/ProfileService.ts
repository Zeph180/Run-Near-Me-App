import { ApiBaseService } from "@/Services/api/base";
import { CompleteProfileResponse } from "@/types/Profile/ProfileResponses";
import { UpdateProfilePicRequest } from "@/types/Requests/Profile/ProfileRequests";

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

  async updateProfilePicture(data: UpdateProfilePicRequest): Promise<any> {
    try {
      const formData = new FormData();
      const picture = data.ProfilePicture;

      console.log("Uploading image:", {
        uri: picture.uri,
        name: picture.name,
        type: picture.type,
      });

      formData.append("UserId", data.UserId);
      formData.append("ProfilePicture", {
        uri: picture.uri,
        name: picture.name,
        type: picture.type,
      } as any);

      const response = this.makeRequest("/Profile/profile-picture", {
        method: "PUT",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "text/plain",
        },
      });

      console.log("Upload successful:", response);
      return response;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  }
}

export const profileService = new ProfileService();
