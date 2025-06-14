"use client";

import Container from "@/components/ui/container";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Home() {
  const [show, setShow] = useState<boolean>(false);
  const router = useRouter();

  const handleNavigation = () => {
    router.push("/projects")
  }

  return (
    <Container classname="flex gap-10 flex-col justify-center items-center">
      <button
        className="bg-white/5 px-8 py-2 rounded-lg w-fit cursor-pointer"
        onClick={() => setShow(!show)}
      > Click
      </button>

      <div className={`${show ? "block" : "hidden"}`} > Content Visible </div>

      <button
        className="bg-white/5 px-8 py-2 rounded-lg w-fit cursor-pointer"
        onClick={() => handleNavigation()}
      > Go to Project Page
      </button>

    </Container>
  );
}

