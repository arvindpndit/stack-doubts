import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

/*
ignoredRoutes: ['/api/webhook', '/api/ai-answer'],
Todo: add ignore routes in the clerk middleware
**/

