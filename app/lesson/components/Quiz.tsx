'use client';
import { useState, useTransition } from 'react';
import { QuizProps } from '@/interfaces/Quiz';
import QuizHeader from './QuizHeader';
import QuestionBubble from './QuestionBubble';
import Challenge from './Challenge';
import Footer from './Footer';
import UPSERT_CHALLENGE_PROGRESS from '@/actions/challenge_progress';
import { toast } from 'sonner';
import { REDUCE_HEARTS } from '@/actions/user_progress';
import { redirect, useRouter } from 'next/navigation'; // Ensure this is available for redirection

function Quiz({
	initialLessonId,
	initialHearts,
	initialPercentage,
	initialLessonChallenges,
	userSubscription,
}: QuizProps) {
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
			toast.error('Oops! No more hearts left to continue.');
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

	const challenge = challenges[activeIndex];
	const options = challenge?.challengeOptions ?? [];
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
					} else {
						setStatus('wrong');
						setHearts((prev) => Math.max(prev - 1, 0));
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
					</div>
				</div>
			</div>
			<Footer disabled={!selectedOption} status={status} onCheck={onContinue} />
		</>
	);
}

export default Quiz;
