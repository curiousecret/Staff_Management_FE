"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import {
  Button,
  Loading,
  Alert,
  StaffTable,
  StaffFilters,
  Pagination,
  DeleteConfirmModal,
} from "@/components";
import { staffService } from "@/services";
import { Staff, StaffStatus, StaffListResponse } from "@/types";

export default function StaffListingPage() {
  // Data state
  const [data, setData] = useState<StaffListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [nameFilter, setNameFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<StaffStatus | "">("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<Staff | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Debounce timer for search
  const [searchTimer, setSearchTimer] = useState<NodeJS.Timeout | null>(null);

  // Fetch staff data
  const fetchStaff = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await staffService.getList({
        page: currentPage,
        limit: 10,
        name: nameFilter || undefined,
        status: statusFilter || undefined,
        sort_by: sortBy,
        sort_order: sortOrder,
      });
      setData(response);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load staff";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, nameFilter, statusFilter, sortBy, sortOrder]);

  // Initial load and refetch on filter changes
  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

  // Handle name filter with debounce
  const handleNameChange = (value: string) => {
    setNameFilter(value);
    setCurrentPage(1);

    // Debounce search
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    const timer = setTimeout(() => {
      // fetchStaff will be triggered by useEffect
    }, 300);
    setSearchTimer(timer);
  };

  // Handle status filter
  const handleStatusChange = (value: StaffStatus | "") => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  // Clear filters
  const handleClearFilters = () => {
    setNameFilter("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  // Handle sorting
  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle delete click
  const handleDeleteClick = (staff: Staff) => {
    setDeleteTarget(staff);
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);

    try {
      await staffService.delete(deleteTarget.staff_id);
      setSuccessMessage(`Staff "${deleteTarget.name}" deleted successfully`);
      setDeleteTarget(null);
      fetchStaff(); // Refresh list
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete staff";
      setError(message);
    } finally {
      setIsDeleting(false);
    }
  };

  // Handle delete cancel
  const handleDeleteCancel = () => {
    setDeleteTarget(null);
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="page-title mb-4 sm:mb-0">Staff List</h1>
        <Link href="/staff/create">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Staff
          </Button>
        </Link>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6">
          <Alert
            type="success"
            message={successMessage}
            onClose={() => setSuccessMessage(null)}
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-6">
          <Alert type="error" message={error} onClose={() => setError(null)} />
        </div>
      )}

      {/* Filters */}
      <StaffFilters
        nameFilter={nameFilter}
        statusFilter={statusFilter}
        onNameChange={handleNameChange}
        onStatusChange={handleStatusChange}
        onClear={handleClearFilters}
      />

      {/* Content */}
      {isLoading ? (
        <Loading />
      ) : data ? (
        <>
          {/* Results info */}
          <div className="text-sm text-gray-500 mb-4">
            Showing {data.items.length} of {data.total} staff members
          </div>

          {/* Table */}
          <StaffTable
            staff={data.items}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={handleSort}
            onDelete={handleDeleteClick}
          />

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={data.total_pages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      ) : null}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={!!deleteTarget}
        staff={deleteTarget}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
}
