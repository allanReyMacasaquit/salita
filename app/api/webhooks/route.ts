'use server';

import { db } from '@/database/drizzle';
import { userSubscription } from '@/database/schema';
import { stripe } from '@/lib/stripe';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
	const body = await req.text();
	const signature = headers().get('Stripe-Signature') as string;

	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET!
		);
		// console.log('Webhook received:', event.type);
	} catch (error: unknown) {
		if (error instanceof Error) {
			return new NextResponse(`Webhook error: ${error.message}`, {
				status: 400,
			});
		} else {
			return new NextResponse('Unknown webhook error', { status: 400 });
		}
	}

	const session = event.data.object as Stripe.Checkout.Session;
	// console.log('Session:', session); // Log the entire session object

	if (event.type === 'checkout.session.completed') {
		// console.log('Checkout session completed:', session.id);

		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string
		);
		// console.log('Subscription retrieved:', subscription);
		// console.log('Session metadata:', session.metadata); // Check if metadata is correctly set

		if (!session?.metadata?.userId) {
			return new NextResponse('User ID is required', { status: 400 });
		}

		try {
			await db.insert(userSubscription).values({
				userId: session.metadata.userId,
				stripeSubscriptionId: subscription.id,
				stripeCustomerId: subscription.customer as string,
				stripePriceId: subscription.items.data[0].price.id,
				stripeCurrentPeriodEnd: new Date(
					subscription.current_period_end * 1000
				),
			});
			// console.log('Insert successful');
		} catch (error) {
			console.error('Database insert error:', error);
		}
	}

	if (event.type === 'invoice.payment_succeeded') {
		// console.log('Invoice payment succeeded for session:', session.id);

		const subscription = await stripe.subscriptions.retrieve(
			session.subscription as string
		);
		// console.log('Subscription for update retrieved:', subscription);

		try {
			await db
				.update(userSubscription)
				.set({
					stripePriceId: subscription.items.data[0].price.id,
					stripeCurrentPeriodEnd: new Date(
						subscription.current_period_end * 1000
					),
				})
				.where(eq(userSubscription.stripeSubscriptionId, subscription.id));
			// console.log('Update successful');
		} catch (error) {
			console.error('Database update error:', error);
		}
	}

	return new NextResponse(null, { status: 200 });
}
