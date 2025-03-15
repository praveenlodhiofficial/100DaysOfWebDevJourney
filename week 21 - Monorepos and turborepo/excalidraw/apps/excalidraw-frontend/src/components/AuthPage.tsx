"use client";

import Input from "@repo/ui/Input";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@repo/ui/Button";
export function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const pathname = usePathname();
  const isSignIn = pathname === "/signin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-center text-gray-800">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={setEmail}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={setPassword}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <Button> {isSignIn ? "Sign In" : "Sign Up"} </Button>
            
          </form>

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