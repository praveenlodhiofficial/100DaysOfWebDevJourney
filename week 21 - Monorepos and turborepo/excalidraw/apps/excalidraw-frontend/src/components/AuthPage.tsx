"use client";

import Input from "@repo/ui/Input";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

export function AuthPage() {

  const pathname = usePathname(); // Get current pathname
  const isSignIn = pathname === "/signin"; // Determine if we're on signin page

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          {/* Header */}
          <h1 className="text-3xl uppercase font-semibold text-center text-gray-800">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          {/* Form */}
          <form className="space-y-4">

            {/* Email Input */}
              <Input
                placeholder="Email"
                type="email"
              />

            {/* Password Input */}
              <Input
                placeholder="Password"
                type="password"
              />

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>

          </form>

          {/* Switch Auth Type with Next.js Link */}
          <p className="text-center text-sm text-gray-600">
            {isSignIn ? "Need an account?" : "Already have an account?"}
            <Link
              href={isSignIn ? "/signup" : "/signin"}
              className="text-blue-500 hover:underline ml-1"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}