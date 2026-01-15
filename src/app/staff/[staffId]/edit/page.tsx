"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { StaffForm } from "@/components/staff";
import { Loading, Alert } from "@/components/ui";
import { staffService } from "@/services";
import { Staff } from "@/types";

export default function EditStaffPage() {
  const params = useParams();
  const router = useRouter();
  const staffId = params.staffId as string;

  const [staff, setStaff] = useState<Staff | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await staffService.getByStaffId(staffId);
        setStaff(data);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to load staff";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    if (staffId) {
      fetchStaff();
    }
  }, [staffId]);

  if (isLoading) {
    return (
      <div className="page-container">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-container">
        <Alert type="error" message={error} />
        <Link
          href="/staff"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mt-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Staff List
        </Link>
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="page-container">
        <Alert type="error" message="Staff not found" />
        <Link
          href="/staff"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mt-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Staff List
        </Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Back Link */}
      <Link
        href="/staff"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Staff List
      </Link>

      {/* Page Header */}
      <h1 className="page-title">Edit Staff: {staff.name}</h1>

      {/* Form Card */}
      <div className="card">
        <StaffForm mode="edit" initialData={staff} staffId={staffId} />
      </div>
    </div>
  );
}
