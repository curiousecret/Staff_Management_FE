"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";
import { Modal, Button } from "@/components/ui";
import { Staff } from "@/types";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  staff: Staff | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  staff,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  if (!staff) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel} title="Confirm Delete" size="sm">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>

        <p className="text-gray-700 mb-2">
          Are you sure you want to delete this staff member?
        </p>

        <p className="text-sm text-gray-500 mb-6">
          <strong>{staff.name}</strong> ({staff.staff_id})
          <br />
          This action cannot be undone.
        </p>

        <div className="flex justify-center space-x-4">
          <Button variant="secondary" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={isDeleting}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
