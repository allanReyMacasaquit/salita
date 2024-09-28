import { challengeOptions, challenges } from '@/database/schema';
import { cn } from '@/lib/utils';
import Card from './Card';

type Props = {
	options: (typeof challengeOptions.$inferSelect)[];
	onSelect: (id: number) => void;
	status: 'correct' | 'wrong' | 'none';
	selectedOption: number | undefined;
	disabled?: boolean;
	type: (typeof challenges.$inferSelect)['type'];
};

function Challenge({
	type,
	options,
	selectedOption,
	disabled,
	status,
	onSelect,
}: Props) {
	return (
		<div
			className={cn(
				'grid gap-2',
				type === 'ASSIST' && 'grid-cols-1',
				type === 'SELECT' &&
					'grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]'
			)}
		>
			{options.map((option, i) => (
				<Card
					key={option.id}
					id={option.id}
					text={option.text}
					type='SELECT'
					shortcut={`${i + 1}`}
					selected={selectedOption === option.id}
					onClick={() => onSelect(option.id)}
					status={status}
					disabled={disabled}
					imageSrc={option.imageSrc}
					audioSrc={option.audioSrc}
				/>
			))}
		</div>
	);
}
export default Challenge;
