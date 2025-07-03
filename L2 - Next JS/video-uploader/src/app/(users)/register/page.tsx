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
    try {
      // if password and confirm password are not the same, show an error
      e.preventDefault();

      if (password !== confirmPassword) {
        return alert("Password and confirm password do not match");
      }

        // try react-query later
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
        throw new Error(data.error || "Registration failed");
      }

      console.log(data);
      router.push("/login");
    } catch (error) {
      console.error(error);
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
        <button type="submit" className="bg-white/10 text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-white/5 transition-all duration-150">
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
