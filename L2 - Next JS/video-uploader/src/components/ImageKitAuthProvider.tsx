"use client";

import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";

const urlEndPoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

interface ProviderProps {
  children: React.ReactNode;
}

export default function ImageKitAuthProvider({ children }: ProviderProps) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
          <ImageKitProvider urlEndpoint={urlEndPoint}>
              {children}
          </ImageKitProvider>
    </SessionProvider>
  );
}
