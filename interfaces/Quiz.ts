import { challengeOptions, challenges } from '@/database/schema';

export interface QuizProps {
	initialLessonId: number;
	initialHearts: number;
	initialPercentage: number;
	initialLessonChallenges: (typeof challenges.$inferSelect & {
		completed: boolean;
		challengeOptions: (typeof challengeOptions.$inferSelect)[];
	})[];
	userSubscription: boolean;
}
