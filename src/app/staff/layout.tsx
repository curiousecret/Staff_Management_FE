"use client";

import React from "react";
import { Header, ProtectedRoute } from "@/components/layout";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}
