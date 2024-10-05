'use server';

import { getUserSubscription } from '@/database/queries';
import { stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { auth, currentUser } from '@clerk/nextjs/server';

const returnUrl = absoluteUrl('/shop');

export const createStripeUrl = async () => {
	const { userId } = auth();
	const user = await currentUser();

	if (!user || !userId) {
		throw new Error('Unauthorized');
	}

	const userSubscription = await getUserSubscription();

	if (userSubscription && userSubscription.stripeCustomerId) {
		const stripeSession = await stripe.billingPortal.sessions.create({
			customer: userSubscription.stripeCustomerId,
			return_url: returnUrl,
		});

		return { data: stripeSession.url };
	}
	try {
		const stripeSession = await stripe.checkout.sessions.create({
			metadata: {
				userId: userId,
			},
			mode: 'subscription',
			payment_method_types: ['card'],
			customer_email: user.emailAddresses[0].emailAddress,
			line_items: [
				{
					quantity: 1,
					price_data: {
						currency: 'USD',
						product_data: {
							name: 'SALITA PRO',
							description: 'Unlimited Hearts',
						},
						unit_amount: 1000, // $10 dollars
						recurring: {
							interval: 'month',
						},
					},
				},
			],

			success_url: returnUrl,
			cancel_url: returnUrl,
		});

		console.log('Checkout session created, URL:', stripeSession.url); // Add logging here
		return { data: stripeSession.url };
	} catch (error) {
		console.error('Error creating Stripe session:', error); // Add error logging
		throw new Error('Failed to create Stripe session');
	}
};
