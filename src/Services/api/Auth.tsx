import { ApiBaseService } from "@/Services/api/base";
import { LoginResponse, SignupResponse } from "@/types/responses/authResponses";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest extends LoginRequest {
  name: string;
}

export class AuthService extends ApiBaseService {
  async login(credential: LoginRequest): Promise<LoginResponse> {
    return this.makeRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credential),
    });
  }

  async Signup(credential: SignupRequest): Promise<SignupResponse> {
    return this.makeRequest<SignupResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credential),
    });
  }
}
