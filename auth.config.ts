import type { NextAuthConfig } from "next-auth"
import Google from "next-auth/providers/google"

const authConfig = {
  providers: [Google],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const protectedRoute = nextUrl.pathname.startsWith("/dashboard")

      if (protectedRoute && !isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl.origin))
      }

      if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
        return Response.redirect(new URL("/dashboard", nextUrl.origin))
      }

      return true
    },
  },
} satisfies NextAuthConfig

export default authConfig