export interface LessonButtonProps {
	id: number;
	index: number;
	totalCount: number;
	locked?: boolean;
	current?: boolean;
	percentage: number;
}
