"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import {
  selectAuthLoading,
  selectIsAuthenticated,
} from "@/redux/slices/authSlice";

export default function ProtectedRoute({ children }) {
  const router = useRouter();

  const loading = useSelector(selectAuthLoading);

  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login?redirect=/orders");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-500">Loading...</div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
