"use client";

import React from "react";
import { Search, X } from "lucide-react";
import { Input, Select, Button } from "@/components/ui";
import { StaffStatus } from "@/types";

interface StaffFiltersProps {
  nameFilter: string;
  statusFilter: StaffStatus | "";
  onNameChange: (value: string) => void;
  onStatusChange: (value: StaffStatus | "") => void;
  onClear: () => void;
}

const statusOptions = [
  { value: "", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export function StaffFilters({
  nameFilter,
  statusFilter,
  onNameChange,
  onStatusChange,
  onClear,
}: StaffFiltersProps) {
  const hasFilters = nameFilter || statusFilter;

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
      <div className="flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by name..."
              value={nameFilter}
              onChange={(e) => onNameChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="w-full md:w-48">
          <Select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value as StaffStatus | "")}
            options={statusOptions}
          />
        </div>

        {hasFilters && (
          <Button variant="ghost" onClick={onClear} className="flex items-center">
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
