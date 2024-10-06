'use server';

import { db } from '@/database/drizzle';
import {
	getCourseById,
	getUserProgress,
	getUserSubscription,
} from '@/database/queries';
import { challengeProgress, challenges, userProgress } from '@/database/schema';
import { auth, currentUser } from '@clerk/nextjs/server';
import { and, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function UPSERT_USER_PROGRESS(courseId: number) {
	const { userId } = auth();
	const user = await currentUser();

	if (!userId || !user) {
		throw new Error('Unauthorized');
	}

	const course = await getCourseById(courseId);

	if (!course) {
		throw new Error('Course not found!');
	}

	if (!course.units.length || !course.units[0].lessons.length) {
		throw new Error('Course is Empty');
	}

	const existingUserProgress = await getUserProgress();

	if (existingUserProgress) {
		await db.update(userProgress).set({
			activeCourseId: courseId,
			userName: user.firstName || 'User',
			userImageSrc: user.imageUrl || '/images/user/hearts.png',
		});
		revalidatePath('/courses');
		revalidatePath('/learn');
		redirect('/learn');
	}

	await db.insert(userProgress).values({
		userId,
		activeCourseId: courseId,
		userName: user.firstName || 'User',
		userImageSrc: user.imageUrl || '/images/user/hearts.png',
	});
	revalidatePath('/courses');
	revalidatePath('/learn');
	redirect('/learn');
}

export const REDUCE_HEARTS = async (challengeId: number) => {
	const userSubscription = await getUserSubscription();

	const { userId } = auth();
	if (!userId) {
		throw new Error('UnAuthorized');
	}

	// Fetch both the challenge and user progress in parallel
	const [challenge, currentUserProgress] = await Promise.all([
		db.query.challenges.findFirst({ where: eq(challenges.id, challengeId) }),
		getUserProgress(),
	]);

	if (!challenge) {
		throw new Error('Challenge not Found!');
	}
	if (!currentUserProgress) {
		throw new Error('User Progress not Found!');
	}

	const lessonId = challenge.lessonId;

	// Check if the user has already practiced this challenge
	const existingChallengeProgress = await db.query.challengeProgress.findFirst({
		where: and(
			eq(challengeProgress.userId, userId),
			eq(challengeProgress.challengeId, challengeId)
		),
	});

	const isPractice = !!existingChallengeProgress;

	if (isPractice) {
		return { error: 'practice' };
	}
	if (existingChallengeProgress) {
		// Return early if it's a practice attempt
		return { error: 'practice' };
	}

	if (userSubscription?.isActive) {
		return { error: 'subscription' };
	}

	// Return if the user has no hearts left
	if (currentUserProgress.hearts === 0) {
		return;
	}

	// Deduct one heart
	await db
		.update(userProgress)
		.set({
			hearts: currentUserProgress.hearts - 1,
		})
		.where(eq(userProgress.userId, userId));

	// Batch revalidate multiple paths
	await Promise.all([
		revalidatePath('/shop'),
		revalidatePath('/learn'),
		revalidatePath('/lesson'),
		revalidatePath('/leaderboard'),
		revalidatePath(`/lesson/${lessonId}`),
	]);

	return { success: true };
};

export const refillHearts = async () => {
	const POINTS_TO_REFILL = 10;
	const currentUserProgress = await getUserProgress();

	if (!currentUserProgress) throw new Error('User progress not found');
	if (currentUserProgress.hearts === 5)
		throw new Error('Hearts are already full');
	if (currentUserProgress.points < POINTS_TO_REFILL)
		throw new Error('Not enough points');

	await db
		.update(userProgress)
		.set({
			hearts: 5,
			points: currentUserProgress.points - POINTS_TO_REFILL,
		})
		.where(eq(userProgress.userId, currentUserProgress.userId));

	revalidatePath('/shop');
	revalidatePath('/learn');
	revalidatePath('/lesson');
	revalidatePath('/leaderboard');
};
