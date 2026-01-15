"use client";

import React from "react";
import Link from "next/link";
import { Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Staff } from "@/types";
import { formatSalary, formatDate, capitalize } from "@/utils";
import { Button } from "@/components/ui";

interface StaffTableProps {
  staff: Staff[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  onSort: (field: string) => void;
  onDelete: (staff: Staff) => void;
}

export function StaffTable({
  staff,
  sortBy,
  sortOrder,
  onSort,
  onDelete,
}: StaffTableProps) {
  const columns = [
    { key: "staff_id", label: "Staff ID", sortable: true },
    { key: "name", label: "Name", sortable: true },
    { key: "dob", label: "Date of Birth", sortable: false },
    { key: "salary", label: "Salary", sortable: true },
    { key: "status", label: "Status", sortable: true },
    { key: "actions", label: "Actions", sortable: false },
  ];

  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUp className="w-4 h-4 inline ml-1" />
    ) : (
      <ChevronDown className="w-4 h-4 inline ml-1" />
    );
  };

  const getStatusBadge = (status: string) => {
    const styles =
      status === "active"
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-800";

    return (
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${styles}`}
      >
        {capitalize(status)}
      </span>
    );
  };

  if (staff.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <p className="text-gray-500 text-lg">No staff found</p>
        <Link href="/staff/create">
          <Button className="mt-4">Add First Staff</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`
                  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${column.sortable ? "cursor-pointer hover:bg-gray-100" : ""}
                `}
                onClick={() => column.sortable && onSort(column.key)}
              >
                {column.label}
                {column.sortable && <SortIcon field={column.key} />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {staff.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.staff_id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(item.dob)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatSalary(item.salary)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getStatusBadge(item.status)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex items-center space-x-3">
                  <Link
                    href={`/staff/${item.staff_id}/edit`}
                    className="text-primary-600 hover:text-primary-800 transition-colors"
                    title="Edit"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => onDelete(item)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
