import api from "./api";
import { LoginResponse, RefreshTokenResponse } from "@/types";

export const authService = {
  /**
   * Login with username and password
   * Uses OAuth2 form format as required by the backend
   */
  async login(username: string, password: string): Promise<LoginResponse> {
    // OAuth2PasswordRequestForm expects form data, not JSON
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const response = await api.post<LoginResponse>("/api/v1/auth/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data;
  },

  /**
   * Store access token in localStorage
   */
  setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
  },

  /**
   * Get access token from localStorage
   */
  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  },

  /**
   * Remove access token from localStorage
   */
  removeToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
  },

  /**
   * Store refresh token in localStorage
   */
  setRefreshToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("refresh_token", token);
    }
  },

  /**
   * Get refresh token from localStorage
   */
  getRefreshToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("refresh_token");
    }
    return null;
  },

  /**
   * Remove refresh token from localStorage
   */
  removeRefreshToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("refresh_token");
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(): Promise<string> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await api.post<RefreshTokenResponse>(
      "/api/v1/auth/refresh",
      { refresh_token: refreshToken }
    );

    const newAccessToken = response.data.access_token;
    this.setToken(newAccessToken);

    return newAccessToken;
  },

  /**
   * Logout - call backend logout endpoint and clear tokens
   */
  async logout(): Promise<void> {
    try {
      // Call backend logout endpoint
      await api.post("/api/v1/auth/logout");
    } catch (error) {
      // Continue with logout even if API call fails
      console.error("Logout API call failed:", error);
    } finally {
      // Always clear both tokens
      this.removeToken();
      this.removeRefreshToken();
    }
  },
};
