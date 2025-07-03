import Container from "@/components/container";
import Link from "next/link";

export default function Login() {
  return (
    <Container>
      <div className="tracking-wide font-roboto flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-semibold uppercase">Login</h1>
        <Link href="/sign-up">Go to signup page</Link>

      </div>
    </Container>
  );
}