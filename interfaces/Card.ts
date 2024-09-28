import { challenges } from '@/database/schema';

export interface CardProps {
	id: number;
	text: string;
	shortcut: string;
	imageSrc?: string | null;
	audioSrc?: string | null;
	selected?: boolean;
	status?: 'correct' | 'wrong' | 'none';
	disabled?: boolean;
	type: (typeof challenges.$inferSelect)['type'];
	onClick: () => void;
}
