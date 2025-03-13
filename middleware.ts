import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define routes to ignore
const isIgnoredRoute = createRouteMatcher(['/api/webhook', '/api/ai-answer']);

export default clerkMiddleware((auth, req) => {
  // Skip Clerk middleware for ignored routes
  if (isIgnoredRoute(req)) {
    return NextResponse.next();
  }

  // Optional: Protect other routes
  // Example: auth().protect();
});

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', // Exclude static files and Next.js internals
    '/',
    '/(api|trpc)(.*)',
  ],
};

