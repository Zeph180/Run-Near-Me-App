import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const API_URL = "http://localhost:5133";

export class ApiBaseService {
  private baseUrl = API_URL;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    try {
      const token = await AsyncStorage.getItem("auth-key");

      const config: RequestInit = {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer",
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
      };

      const response = await fetch(`${this.baseUrl}${endpoint}`, config);

      if (response.status === 401) {
        console.log("unauthorized");
        await AsyncStorage.removeItem("auth-key");
        router.replace("/auth/login");
        throw new Error("Session expired. Please log in again.");
      }
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.log("error data: ", errorData);
        throw new Error(errorData?.message || "Failed to fetch data");
      }

      return response.json();
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  }
}
