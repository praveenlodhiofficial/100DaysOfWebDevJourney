"use client";

import { toast } from "react-hot-toast";
import axios from "axios";
import Container from "@/components/container";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="flex flex-col items-center justify-center border h-screen gap-5">
      <h1 className="text-2xl uppercase">Signup Page</h1>
      <div className="flex flex-col gap-3 border p-5 border-dashed rounded-2xl bg-white/3 min-w-1/3">
        <input
          type="text"
          id="username"
          value={user.username}
          placeholder="username"
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="border px-3 py-2 rounded-lg bg-black focus:outline-none"
        />
        <input
          type="text"
          id="email"
          value={user.email}
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border px-3 py-2 rounded-lg bg-black focus:outline-none"
        />
        <input
          type="password"
          id="password"
          value={user.password}
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="border px-3 py-2 rounded-lg bg-black focus:outline-none"
        />

        <h1 className="text-xs text-center">{loading ? "processing..." : ""}</h1>

        <button
          className=" text-center uppercase"
          onClick={onSignup}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? (
            <div className="bg-white/10  p-1.5 rounded-lg cursor-none">
              Fill all Details
            </div>
          ) : (
            <div className="bg-blue-500  p-1.5 rounded-lg cursor-pointer">
              Signup
            </div>
          )}
        </button>
        <Link href="/login" className="text-center">
          Go to login page
        </Link>
      </div>
    </Container>
  );
}
