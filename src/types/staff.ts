// Staff types

export type StaffStatus = "active" | "inactive";

export interface Staff {
  id: number;
  staff_id: string;
  name: string;
  dob: string;
  salary: number;
  status: StaffStatus;
  created_at: string;
  updated_at: string;
}

export interface StaffCreate {
  staff_id: string;
  name: string;
  dob: string;
  salary: number;
  status?: StaffStatus;
}

export interface StaffUpdate {
  staff_id?: string;
  name?: string;
  dob?: string;
  salary?: number;
  status?: StaffStatus;
}

export interface StaffListResponse {
  items: Staff[];
  total: number;
  page: number;
  limit: number;
  total_pages: number;
}

export interface StaffFilterParams {
  page?: number;
  limit?: number;
  status?: StaffStatus;
  name?: string;
  salary_min?: number;
  salary_max?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}
