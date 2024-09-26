import { lessons, units } from '@/database/schema';

export interface UnitProps {
	id: number;
	order: number;
	description: string;
	title: string;
	lessons: (typeof lessons.$inferSelect & { completed: boolean })[];
	activeLesson:
		| (typeof lessons.$inferSelect & {
				unit: typeof units.$inferSelect;
		  })
		| undefined;
	activeLessonPercentage: number;
}
