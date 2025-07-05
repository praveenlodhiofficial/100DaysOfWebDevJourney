"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        alert("Password and confirm password do not match");
        return;
      }

      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Registration failed");
        return;
      }

      console.log(data);
      alert("Registration successful! Please login.");
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("An error occurred during registration");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center justify-center border rounded-2xl p-5 gap-5">
        <h1 className="text-2xl font-bold uppercase">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-2 py-1 rounded-md border-dashed text-sm "
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 rounded-md border-dashed text-sm "
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border px-2 py-1 rounded-md border-dashed text-sm "
          />
          <button
            type="submit"
            className="bg-white/10 text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-white/5 transition-all duration-150"
          >
            Register
          </button>
          <p className="text-xs text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
