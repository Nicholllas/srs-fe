"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register, loginUser } from "@/lib/api";

const SignupPage = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  const [errors, setErrors] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);

    if (!form.terms) {
      setErrors("You must agree to the terms and conditions.");
      return;
    }

    try {
      await register(form.name, form.email, form.password);
      const response = await loginUser(form.email, form.password);
      localStorage.setItem("token", response.token);
      window.dispatchEvent(new Event("login")); // Update state di navbar
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setErrors(err.message ?? "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-4 pt-24">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white">
            Join Small Room Soul
          </h1>
          <p className="text-red-200">
            Create an account to access concert tickets and favorites
          </p>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-lg">
          <div className="p-8">
            {errors && (
              <div className="mb-4 rounded bg-red-100 px-4 py-2 text-sm text-red-700">
                {errors}
              </div>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="text-gray-900 w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="text-gray-900  w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="text-gray-900  w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-red-600"
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the{" "}
                  <Link href="/terms" className="text-red-600 hover:underline">
                    Terms and Conditions
                  </Link>
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-red-600 px-4 py-3 text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
              >
                Sign Up
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="font-medium text-red-600 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
