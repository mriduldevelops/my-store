"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setAuthUser, setAuthLoading } from "@/redux/slices/authSlice";

export default function AuthProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!mounted) return;

        if (!response.ok) {
          dispatch(setAuthUser(null));
          return;
        }

        const data = await response.json();

        dispatch(setAuthUser(data.user || null));
      } catch (error) {
        console.error("AUTH_INIT_ERROR:", error);

        if (mounted) {
          dispatch(setAuthUser(null));
        }
      } finally {
        if (mounted) {
          dispatch(setAuthLoading(false));
        }
      }
    };

    loadUser();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return children;
}
