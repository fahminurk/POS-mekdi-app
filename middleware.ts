import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // console.log(req.nextauth.token);
  },
  {
    pages: {
      signIn: "/auth",
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};
