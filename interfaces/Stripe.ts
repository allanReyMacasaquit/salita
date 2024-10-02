// Define types for the subscription result
export interface UserSubscription {
	isActive: boolean | '';
	id: number;
	userId: string;
	stripeCustomerId: string;
	stripeSubscriptionId: string;
	stripePriceId: string;
	stripeCurrentPeriodEnd: Date;
}

export interface SubscriptionError {
	error: string;
}
