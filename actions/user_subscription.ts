'use server';

import { getUserSubscription } from '@/database/queries';
import { SubscriptionError, UserSubscription } from '@/interfaces/Stripe';
import { absoluteUrl } from '@/lib/utils';
import { stripe } from '@/stripe/stripe';
import { auth, currentUser } from '@clerk/nextjs/server';

const returnUrl = absoluteUrl('/shop');

// Type guard to check if userSubscription is a UserSubscription object
function isUserSubscription(
	subscription: UserSubscription | SubscriptionError
): subscription is UserSubscription {
	return (subscription as UserSubscription).stripeCustomerId !== undefined;
}

export const createStripeUrl = async () => {
	const { userId } = auth();
	const user = await currentUser();

	// Ensure user is authenticated
	if (!userId || !user) throw new Error('Unauthorized');

	// Fetch the user subscription from your database
	const userSubscription = await getUserSubscription();

	// Check if the user has an active subscription
	if (
		isUserSubscription(userSubscription!) &&
		userSubscription.stripeCustomerId
	) {
		// If user already has a subscription, create a billing portal session
		const stripeSession = await stripe.billingPortal.sessions.create({
			customer: userSubscription.stripeCustomerId,
			return_url: returnUrl,
		});

		// Return the billing portal URL
		return { data: stripeSession.url };
	}

	// If no subscription found, create a checkout session for new subscription
	const stripeSession = await stripe.checkout.sessions.create({
		mode: 'subscription', // Indicates subscription mode
		payment_method_types: ['card'], // Only card payments allowed
		customer_email: user.emailAddresses[0].emailAddress, // Use the user's email from Clerk
		line_items: [
			{
				quantity: 1,
				price_data: {
					currency: 'USD', // Payment currency
					product_data: {
						name: 'Salita Pro', // Name of the product or plan
						description: 'Unlimited', // Description of the plan
					},
					unit_amount: 1000,
					recurring: {
						interval: 'month',
					},
				},
			},
		],
		metadata: {
			userId,
		},
		success_url: returnUrl, // Redirect to return URL on success
		cancel_url: returnUrl, // Redirect on cancel
	});

	// Return the checkout session URL for the subscription
	return { data: stripeSession.url };
};
