'use client';
import { useState, useEffect, useTransition } from 'react';
import { QuizProps } from '@/interfaces/Quiz';
import QuizHeader from './QuizHeader';
import QuestionBubble from './QuestionBubble';
import Challenge from './Challenge';
import Footer from './Footer';
import UPSERT_CHALLENGE_PROGRESS from '@/actions/challenge_progress';
import { toast } from 'sonner';
import { REDUCE_HEARTS } from '@/actions/user_progress';
import { useRouter } from 'next/navigation'; // Ensure this is available for redirection
import { useAudio, useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import Image from 'next/image';
import FinishCard from './FinishCard';

function Quiz({
	initialLessonId,
	initialHearts,
	initialPercentage,
	initialLessonChallenges,
	userSubscription,
}: QuizProps) {
	const { width, height } = useWindowSize();
	const [lessonId] = useState(initialLessonId);
	// Audio effects
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [correctSoundfx, _c, correctControls] = useAudio({
		src: '/mp3/correct.mp3',
	});
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [incorrectSoundfx, _i, incorrectControls] = useAudio({
		src: '/mp3/incorrect.mp3',
	});
	const [finish, _a] = useAudio({
		src: '/mp3/finish.mp3',
		autoPlay: true,
	});

	const router = useRouter();
	const [pending, startTransition] = useTransition();
	const [hearts, setHearts] = useState(initialHearts);
	const [percentage, setPercentage] = useState(initialPercentage);
	const [challenges] = useState(initialLessonChallenges);
	const [status, setStatus] = useState<
		'correct' | 'wrong' | 'none' | 'completed'
	>('none');
	const [activeIndex, setActiveIndex] = useState(() => {
		const uncompletedIndex = challenges.findIndex(
			(challenge) => !challenge.completed
		);
		return uncompletedIndex === -1 ? 0 : uncompletedIndex;
	});
	const [selectedOption, setSelectedOption] = useState<number | undefined>();

	// Check if hearts are 0 and handle redirection
	const checkHearts = () => {
		if (hearts === 0) {
			toast.error('Opps! No more hearts to try.');
			setTimeout(() => {
				router.push('/learn'); // Redirect after a brief delay
			}, 2000);
			return true;
		}
		return false;
	};

	const onSelect = (id: number) => {
		if (status !== 'none') return;
		setSelectedOption(id);
	};

	// Get the current challenge or handle when undefined
	const challenge = challenges[activeIndex];

	// Use useEffect to handle undefined challenge and redirection
	// useEffect(() => {
	// 	if (!challenge) {
	// 		router.push('/learn');
	// 	}
	// }, [challenge, router]);

	if (!challenge) {
		// Early return to avoid further rendering if the challenge is undefined
		return (
			<>
				<div className='flex flex-col max-w-7xl mx-auto gap-y-4 px-6 items-center justify-center h-screen text-lg text-gray-500'>
					{finish}
					<Confetti
						width={width}
						height={height}
						recycle={false}
						numberOfPieces={500}
						tweenDuration={10000}
					/>
					<Image
						src='/winner.svg'
						alt='winner'
						height={100}
						width={100}
						priority
						className=' relative w-48 lg:w-52  shadow-2xl drop-shadow-2xl border-2 rounded-full'
					/>
					<h1 className='text-4xl text-center'>
						Great job!
						<br /> You&apos;ve completed the lesson
					</h1>
					<div
						className='
						flex
						items-center
						gap-x-4
						w-full'
					>
						<FinishCard variant='points' value={challenges.length * 10} />
						<FinishCard variant='hearts' value={hearts} />
					</div>
				</div>
				<Footer
					lessonId={lessonId}
					onCheck={() => router.push('/learn')}
					status='completed'
				/>
			</>
		);
	}

	const options = challenge.challengeOptions ?? [];
	const title =
		challenge.type === 'ASSIST'
			? 'Select the correct meaning'
			: challenge.question;

	const handleChallengeProgress = (isCorrect: boolean) => {
		if (checkHearts()) return; // Check if user is out of hearts

		startTransition(() => {
			const action = isCorrect
				? UPSERT_CHALLENGE_PROGRESS(challenge.id)
				: REDUCE_HEARTS(challenge.id);

			action
				.then((response) => {
					if (response?.error === 'hearts') {
						console.error('Missing hearts');
						return;
					}

					if (isCorrect) {
						setStatus('correct');
						setPercentage((prev) => prev + 100 / challenges.length);
						if (initialPercentage === 100) {
							setHearts((prev) => Math.min(prev + 1, 5));
						}
						correctControls.play(); // Play correct sound
					} else {
						setStatus('wrong');
						setHearts((prev) => Math.max(prev - 1, 0));
						incorrectControls.play(); // Play incorrect sound
					}
				})
				.catch(() => toast.error('Something went wrong! Please try again.'));
		});
	};

	const onNext = () => {
		setActiveIndex((current) => current + 1);
	};

	const onContinue = () => {
		if (!selectedOption) return;

		if (status === 'wrong' || status === 'correct') {
			setStatus('none');
			setSelectedOption(undefined);
			if (status === 'correct') onNext();
			return;
		}

		const correctOption = options.find((option) => option.correct);
		if (!correctOption) return;

		handleChallengeProgress(correctOption.id === selectedOption);
	};

	return (
		<>
			<QuizHeader
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={!!userSubscription.isActive}
			/>
			<div className='flex-1'>
				<div className='h-full flex items-center justify-center'>
					<div className='border lg:rounded-3xl shadow-lg drop-shadow-lg w-full lg:w-6/12 flex flex-col p-6 gap-y-6 lg:min-h-80'>
						<h1 className='text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700'>
							{title}
						</h1>
						{challenge.type === 'ASSIST' && (
							<QuestionBubble question={challenge.question} />
						)}
						<Challenge
							options={options}
							onSelect={onSelect}
							status={status}
							selectedOption={selectedOption}
							disabled={false}
							type={challenge.type}
						/>
						{correctSoundfx}
						{incorrectSoundfx}
					</div>
				</div>
			</div>
			<Footer disabled={!selectedOption} status={status} onCheck={onContinue} />
		</>
	);
}

export default Quiz;
