import api from "./api";
import { LoginResponse } from "@/types";

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
   * Store token in localStorage
   */
  setToken(token: string): void {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
    }
  },

  /**
   * Get token from localStorage
   */
  getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  },

  /**
   * Remove token from localStorage
   */
  removeToken(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  /**
   * Logout - clear token
   */
  logout(): void {
    this.removeToken();
  },
};
