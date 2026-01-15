import api from "./api";
import {
  Staff,
  StaffCreate,
  StaffUpdate,
  StaffListResponse,
  StaffFilterParams,
} from "@/types";

export const staffService = {
  /**
   * Get paginated list of staff with filters
   */
  async getList(params?: StaffFilterParams): Promise<StaffListResponse> {
    const response = await api.get<StaffListResponse>("/api/v1/staff", {
      params,
    });
    return response.data;
  },

  /**
   * Get single staff by staff_id
   */
  async getByStaffId(staffId: string): Promise<Staff> {
    const response = await api.get<Staff>(`/api/v1/staff/${staffId}`);
    return response.data;
  },

  /**
   * Create new staff
   */
  async create(data: StaffCreate): Promise<Staff> {
    const response = await api.post<Staff>("/api/v1/staff", data);
    return response.data;
  },

  /**
   * Update existing staff
   */
  async update(staffId: string, data: StaffUpdate): Promise<Staff> {
    const response = await api.put<Staff>(`/api/v1/staff/${staffId}`, data);
    return response.data;
  },

  /**
   * Delete staff
   */
  async delete(staffId: string): Promise<void> {
    await api.delete(`/api/v1/staff/${staffId}`);
  },
};
