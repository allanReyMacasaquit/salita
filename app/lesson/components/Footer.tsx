import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckCircle, ThumbsUp, XCircle } from 'lucide-react';
import { useKey, useMedia } from 'react-use';

type Props = {
	status: 'correct' | 'wrong' | 'none' | 'completed';
	disabled?: boolean;
	lessonId?: boolean;
	onCheck: () => void;
};
function Footer({ status, disabled, onCheck, lessonId }: Props) {
	const isMobile = useMedia('(max-width:1024px)');

	useKey('Enter', onCheck, {}, [onCheck]);
	const correctPhrases = [
		'Nicely done!',
		'Great job!',
		'Fantastic!',
		"You're on fire!",
		'Awesome work!',
		'Keep it up!',
		'Brilliant!',
		'Well played!',
		'Incredible!',
		'That was sharp!',
		"You're crushing it!",
		'Spot on!',
		'You nailed it!',
		'Keep rocking!',
		"That's how it's done!",
	];

	const incorrectPhrases = [
		'You can do it!',
		"Don't give up!",
		'Keep trying!',
		'Almost there!',
		'Stay focused!',
		'Keep pushing!',
		"Don't worry, you'll get it!",
		'Give it another shot!',
		'Keep your head up!',
		"You're learning!",
		'Stay positive!',
		"It's all part of the process!",
		"You're closer than you think!",
		'Every mistake is progress!',
		'Hang in there!',
	];

	const getRandomPhrase = (phrases: string[]) => {
		return phrases[Math.floor(Math.random() * phrases.length)];
	};

	return (
		<div
			className={cn(
				'h-20 lg:h-40 py-10',
				status === 'correct' &&
					'border-transparent bg-gradient-to-t from-green-300',
				status === 'wrong' &&
					'border-transparent bg-gradient-to-t from-rose-300'
			)}
		>
			<div className='max-w-7xl h-full mx-auto flex items-center justify-between px-6 lg:px-10 '>
				{status === 'correct' && (
					<div className='text-green-500 font-bold text-base lg:text-2xl flex items-center'>
						<CheckCircle className='h-6 w-6 lg:h-10 lg:w-10 mr-4 ' />
						{getRandomPhrase(correctPhrases)}
					</div>
				)}
				{status === 'wrong' && (
					<div className='text-rose-500 font-bold text-base lg:text-2xl flex items-center'>
						<ThumbsUp className='h-6 w-6 lg:h-10 lg:w-10 mr-4 ' />
						{getRandomPhrase(incorrectPhrases)}
					</div>
				)}
				{status === 'completed' && (
					<div className='font-bold text-base lg:text-2xl flex items-center'>
						<Button
							variant='secondaryOutline'
							className='cursor-pointer'
							size={isMobile ? 'sm' : 'lg'}
							onClick={() => (window.location.href = `/lesson${lessonId}`)}
						>
							Practice Again
						</Button>
					</div>
				)}

				<Button
					disabled={disabled}
					className='ml-auto text-2xl text-white'
					onClick={onCheck}
					size={isMobile ? 'sm' : 'lg'}
					variant={status === 'wrong' ? 'danger' : 'secondary'}
				>
					{status === 'none' && 'Check'}
					{status === 'correct' && 'Next'}
					{status === 'wrong' && 'Retry'}
					{status === 'completed' && 'Continue'}
				</Button>
			</div>
		</div>
	);
}
export default Footer;
