"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { Container } from "@/components/ui";
import { setAuthUser } from "@/redux/slices/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!form.email || !form.password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed.");
        return;
      }

      dispatch(setAuthUser(data.user));

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("LOGIN:", error);

      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 sm:py-16">
      <Container>
        <div className="mx-auto max-w-md">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Welcome Back
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Login to your account to continue.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Email</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="block text-sm font-medium">Password</label>

                  <Link
                    href="/forgot-password"
                    className="text-xs text-gray-500 hover:text-black"
                  >
                    Forgot password?
                  </Link>
                </div>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                  placeholder="Your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-black hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
