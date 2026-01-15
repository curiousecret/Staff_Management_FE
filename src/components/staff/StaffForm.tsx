"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button, Input, Select, Alert } from "@/components/ui";
import { staffService } from "@/services";
import { Staff, StaffCreate, StaffUpdate, StaffStatus } from "@/types";
import { validateStaffForm, StaffFormErrors } from "@/utils";
import { formatDateForInput } from "@/utils";

interface StaffFormProps {
  mode: "create" | "edit";
  initialData?: Staff;
  staffId?: string;
}

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export function StaffForm({ mode, initialData, staffId }: StaffFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<StaffFormErrors>({});

  const [formData, setFormData] = useState({
    staff_id: "",
    name: "",
    dob: "",
    salary: "",
    status: "active" as StaffStatus,
  });

  // Populate form with initial data for edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        staff_id: initialData.staff_id,
        name: initialData.name,
        dob: formatDateForInput(initialData.dob),
        salary: initialData.salary.toString(),
        status: initialData.status,
      });
    }
  }, [mode, initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name as keyof StaffFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate form
    const validationErrors = validateStaffForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    try {
      if (mode === "create") {
        const createData: StaffCreate = {
          staff_id: formData.staff_id.trim(),
          name: formData.name.trim(),
          dob: formData.dob,
          salary: parseFloat(formData.salary),
          status: formData.status,
        };

        await staffService.create(createData);
        setSuccess("Staff created successfully!");
        
        // Redirect after short delay
        setTimeout(() => {
          router.push("/staff");
        }, 1500);
      } else {
        const updateData: StaffUpdate = {
          staff_id: formData.staff_id.trim(),
          name: formData.name.trim(),
          dob: formData.dob,
          salary: parseFloat(formData.salary),
          status: formData.status,
        };

        await staffService.update(staffId!, updateData);
        setSuccess("Staff updated successfully!");
        
        // Redirect after short delay
        setTimeout(() => {
          router.push("/staff");
        }, 1500);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "An error occurred";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/staff");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      {success && (
        <Alert type="success" message={success} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Staff ID"
          name="staff_id"
          value={formData.staff_id}
          onChange={handleChange}
          error={errors.staff_id}
          placeholder="Enter staff ID"
          disabled={isLoading}
          required
        />

        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter full name (letters and spaces only)"
          disabled={isLoading}
          required
        />

        <Input
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          error={errors.dob}
          disabled={isLoading}
          required
        />

        <Input
          label="Salary"
          name="salary"
          type="number"
          step="0.01"
          min="0"
          value={formData.salary}
          onChange={handleChange}
          error={errors.salary}
          placeholder="Enter salary"
          disabled={isLoading}
          required
        />

        <Select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          options={statusOptions}
          disabled={isLoading}
        />
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={handleCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" isLoading={isLoading}>
          {mode === "create" ? "Create Staff" : "Update Staff"}
        </Button>
      </div>
    </form>
  );
}
