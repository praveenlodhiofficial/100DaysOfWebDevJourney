"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      // if password and confirm password are not the same, show an error
      e.preventDefault();

      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (response?.error) {
        alert(response.error);
      }

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <div className="flex flex-col items-center justify-center border rounded-2xl p-5 gap-5">
        <h1 className="text-2xl font-bold uppercase">Login</h1>
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

          <button
            type="submit"
            className="bg-white/10 text-white px-2 py-1 rounded-lg cursor-pointer hover:bg-white/5 transition-all duration-150"
          >
            Login
          </button>
          <p className="text-xs text-gray-500">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </form>

        {/* google login & github login */}
        <div className="flex gap-2 w-full">

          {/* Google Login */}
          <div className="bg-white/10 w-full text-white px-2 py-1 rounded-md cursor-pointer hover:bg-white/5 transition-all duration-150 text-sm flex items-center justify-center gap-2">
            <FaGoogle className="text-white" size={14} />
            <button onClick={() => signIn("google")}>Google</button>
          </div>

          {/* Github Login */}
          <div className="bg-white/10 w-full text-white px-2 py-1 rounded-md cursor-pointer hover:bg-white/5 transition-all duration-150 text-sm flex items-center justify-center gap-2">
            <FaGithub className="text-white" size={16} />
            <button onClick={() => signIn("github")}>Github</button>
          </div>
        </div>
      </div>
    </div>
  );
}
