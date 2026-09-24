"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Container } from "@/components/ui";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
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

    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed.");
        return;
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("REGISTER:", error);

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
                Create Account
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Create your account to continue.
              </p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    First Name
                  </label>

                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                    placeholder="First name"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Last Name
                  </label>

                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                    placeholder="Last name"
                  />
                </div>
              </div>

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
                <label className="mb-2 block text-sm font-medium">Phone</label>

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                  placeholder="Phone number"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                  placeholder="Minimum 8 characters"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Confirm Password
                </label>

                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none focus:border-black"
                  placeholder="Confirm password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-black px-5 py-3.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-black hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
