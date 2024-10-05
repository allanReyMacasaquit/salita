import { clerkMiddleware } from '@clerk/nextjs/server';

// Use Clerk's middleware to handle authentication
export default clerkMiddleware();

export const config = {
	matcher: [
		// Skip Clerk authentication for Next.js internals and static files
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
		// Add your public route for Stripe webhook here
		'/api/webhooks', // Allow this route to bypass authentication
	],
};
