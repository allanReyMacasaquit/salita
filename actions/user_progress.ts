'use server';

import { db } from '@/database/drizzle';
import { getCourseById, getUserProgress } from '@/database/queries';
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

	// if (!course.units.length || !course.units[0].lessons.length) {
	// 	throw new Error('Course is Empty');
	// }

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

	// Return early if it's a practice attempt
	if (existingChallengeProgress) {
		return { error: 'practice' };
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
		revalidatePath('/query'),
		revalidatePath('/leaderboard'),
		revalidatePath(`/lesson/${lessonId}`),
	]);

	return { success: true };
};
