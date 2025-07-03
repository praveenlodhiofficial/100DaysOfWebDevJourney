import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's postal address. */
      address: string;
      id: string;
    } & DefaultSession["user"];
  }
}
