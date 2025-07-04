import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ req, token }) => {
        const { pathname } = req.nextUrl;
        if (
          pathname.startsWith("/api/auth") ||
          pathname === "/login" ||
          pathname === "/register"
        ) {
          return true;
        }

        if (pathname === "/" || pathname.startsWith("/api/videos")) {
          return true;
        }

        // !!token -> It means it is converted to boolean mean if token is true then it will return true else false
        return !!token;
      },
    },
  }
);

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
            - Match all routes except:
                - _next/static (static files)
                - _next/image (image optimization files)
                - favicon.ico (favicon file)
                - public folder
        */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
