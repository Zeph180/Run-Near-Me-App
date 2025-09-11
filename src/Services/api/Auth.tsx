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
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    console.log("Auth.login called with :", JSON.stringify(credentials));
    return this.makeRequest<LoginResponse>("/auth/login", {
      method: "POST",
      data: JSON.stringify(credentials),
    });
  }

  async signup(credential: SignupRequest): Promise<SignupResponse> {
    return this.makeRequest<SignupResponse>("/auth/login", {
      method: "POST",
      data: JSON.stringify(credential),
    });
  }
}

export const authService = new AuthService();
