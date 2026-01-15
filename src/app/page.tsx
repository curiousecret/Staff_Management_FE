"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services";
import { Loading } from "@/components/ui";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect based on auth status
    if (authService.isAuthenticated()) {
      router.replace("/staff");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return <Loading fullScreen />;
}
