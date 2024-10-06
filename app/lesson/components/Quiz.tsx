'use client';

import { useEffect, useState, useTransition } from 'react';
import { useAudio, useWindowSize } from 'react-use';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';
import Confetti from 'react-confetti';

import { REDUCE_HEARTS } from '@/actions/user_progress';
import UPSERT_CHALLENGE_PROGRESS from '@/actions/challenge_progress';

import { QuizProps } from '@/interfaces/Quiz';

import QuizHeader from './QuizHeader';
import QuestionBubble from './QuestionBubble';
import Challenge from './Challenge';
import Footer from './Footer';
import FinishCard from './FinishCard';
import { useHeartsModal } from '@/store/use-hearts-modal';
import { usePracticeModal } from '@/store/practice-modal';

function Quiz({
	initialLessonId,
	initialHearts,
	initialPercentage,
	initialLessonChallenges,
	userSubscription,
}: QuizProps) {
	const { width, height } = useWindowSize();
	const [lessonId] = useState(initialLessonId);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [correctSoundfx, _c, correctControls] = useAudio({
		src: '/mp3/correct.mp3',
	});
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [incorrectSoundfx, _i, incorrectControls] = useAudio({
		src: '/mp3/incorrect.mp3',
	});
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [finish, _a] = useAudio({
		src: '/mp3/finish.mp3',
		autoPlay: true,
	});

	const router = useRouter();
	const [pending, startTransition] = useTransition();
	const [selectedOption, setSelectedOption] = useState<number | undefined>();
	const [hearts, setHearts] = useState(initialHearts);
	const [percentage, setPercentage] = useState(() => {
		return initialPercentage === 100 ? 0 : initialPercentage;
	});
	const [challenges] = useState(initialLessonChallenges);
	const { open: openHeartsModal } = useHeartsModal();
	const { open: openPracticeModal } = usePracticeModal();
	const [practiceMode, setPracticeMode] = useState(false);

	useEffect(() => {
		if (initialPercentage === 100) {
			setPracticeMode(true);
			openPracticeModal();
		}
	}, [initialPercentage, openPracticeModal]);
	const [status, setStatus] = useState<
		'correct' | 'wrong' | 'none' | 'completed'
	>('none');
	const [activeIndex, setActiveIndex] = useState(() => {
		const uncompletedIndex = challenges.findIndex(
			(challenge) => !challenge.completed
		);
		return uncompletedIndex === -1 ? 0 : uncompletedIndex;
	});

	// Check if hearts are 0 and handle redirection (only if not in practice mode)
	const checkHearts = () => {
		if (hearts === 0) {
			openHeartsModal();
		}
	};

	const onSelect = (id: number) => {
		if (status !== 'none') return;
		setSelectedOption(id);
	};

	// Get the current challenge or handle when undefined
	const challenge = challenges[activeIndex];

	if (!challenge) {
		// Return early if challenge is undefined or finished
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
						className='relative w-48 lg:w-52 shadow-2xl drop-shadow-2xl border-2 rounded-full'
					/>
					<h1 className='text-4xl text-center'>
						Great job!
						<br /> You&apos;ve completed the lesson
					</h1>
					<div className='flex items-center gap-x-4 w-full'>
						<FinishCard variant='points' value={challenges.length * 10} />
						{userSubscription ? (
							''
						) : (
							<FinishCard variant='hearts' value={hearts} />
						)}
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
		startTransition(() => {
			const action = isCorrect
				? UPSERT_CHALLENGE_PROGRESS(challenge.id)
				: REDUCE_HEARTS(challenge.id);

			action
				.then((response) => {
					if (response?.error === 'hearts') {
						checkHearts();
						return;
					}

					if (isCorrect) {
						setStatus('correct');
						setPercentage((prev) => prev + 100 / challenges.length);
						correctControls.play(); // Play correct sound
						// Increment hearts if in practice mode and less than max hearts
						if (practiceMode && hearts < 5) {
							setHearts((prev) => Math.min(prev + 1, 5)); // Increment hearts for practice
						}
					} else {
						setStatus('wrong');
						// Only reduce hearts if not in practice mode
						if (!practiceMode) {
							setHearts((prev) => Math.max(prev - 1, 0));
						}
						checkHearts();
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
			{/* Render audio elements */}
			{correctSoundfx}
			{incorrectSoundfx}
			{finish}

			<QuizHeader
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={userSubscription}
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
							disabled={pending}
							type={challenge.type}
						/>
					</div>
				</div>
			</div>
			<Footer disabled={!selectedOption} status={status} onCheck={onContinue} />
		</>
	);
}

export default Quiz;
