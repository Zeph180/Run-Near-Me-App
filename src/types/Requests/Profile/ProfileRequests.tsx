import { RNFile } from "@/types/Requests/Post/PostRequests";

interface BaseProfileRequest {
  UserId: string;
}

export interface UpdateProfilePicRequest extends BaseProfileRequest {
  ProfilePicture: RNFile;
}
