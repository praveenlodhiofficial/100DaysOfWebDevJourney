import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Authentication in Next.js",
  description: "Learning Authentication in Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
