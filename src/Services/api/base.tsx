import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

const API_URL = "http://10.0.2.2:5133/api";

export class ApiBaseService {
  protected baseUrl = API_URL;
  protected api: AxiosInstance;

  constructor(baseUrl: string = API_URL) {
    this.api = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.api.interceptors.request.use(
      async (config) => {
        const token = AsyncStorage.getItem("auth-key");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.api.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          console.log("unauthorized");
          await AsyncStorage.removeItem("auth-key");
          router.replace("/auth/login");
          throw new Error("Session expired. Please log in again.");
        }

        const message =
          (error.response?.data as any)?.message ||
          error.message ||
          "Failed to fetch data";
        throw new Error(message);
      },
    );
  }

  protected async makeRequest<T>(
    endpoint: string,
    options: AxiosRequestConfig = {},
  ): Promise<T> {
    try {
      console.log("making request to url: ", `${this.baseUrl}${endpoint}`);
      const response = await this.api.request<T>({
        url: endpoint,
        ...options,
      });
      return response.data;
    } catch (error) {
      console.log("error: ", error);
      throw error;
    }
  }
}
