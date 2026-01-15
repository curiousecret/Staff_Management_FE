"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StaffForm } from "@/components/staff";

export default function CreateStaffPage() {
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
      <h1 className="page-title">Add New Staff</h1>

      {/* Form Card */}
      <div className="card">
        <StaffForm mode="create" />
      </div>
    </div>
  );
}
