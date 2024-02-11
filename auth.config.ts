import type { NextAuthConfig } from 'next-auth';
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // Verifies if the request is authorized to access a page.  It is called before a request is completed
    // "auth" contains user's session
    // "request" contains the incoming request
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
  },
  providers: [Credentials({})],
} satisfies NextAuthConfig;
