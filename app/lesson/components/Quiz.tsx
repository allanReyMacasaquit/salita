'use client';

import { QuizProps } from '@/interfaces/Quiz';

import QuizHeader from './QuizHeader';
import QuestionBubble from './QuestionBubble';
import { useState } from 'react';
import Challenge from './Challenge';
import Footer from './Footer';

function Quiz({
	initialLessonId,
	initialHearts,
	initialPercentage,
	initialLessonChallenges,
	userSubscription,
}: QuizProps) {
	const [hearts, setHearts] = useState(initialHearts);
	const [percentage, setPercentage] = useState(initialPercentage); // Set to initialPercentage or 0 if undefined
	const [challenges] = useState(initialLessonChallenges);
	const [status, setStatus] = useState<
		'correct' | 'wrong' | 'none' | 'completed'
	>('completed');
	const [activeIndex, setActiveIndex] = useState(() => {
		const uncompletedIndex = challenges.findIndex(
			(challenge) => !challenge.completed
		);
		return uncompletedIndex === -1 ? 0 : uncompletedIndex;
	});

	const [selectedOption, setSelectedOption] = useState<number | undefined>(
		undefined
	);

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

	return (
		<>
			<QuizHeader
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={!!userSubscription.isActive} // Ensure active subscription is properly checked
			/>
			<div className='flex-1'>
				<div
					className='
					h-full
					flex
					items-center
					justify-center'
				>
					<div
						className='
						border
						lg:rounded-3xl
						shadow-lg
						drop-shadow-lg
						w-full
						lg:w-6/12
						flex
						flex-col
						p-6
						gap-y-6
						lg:min-h-80'
					>
						<h1
							className='
							text-lg 
							lg:text-3xl
							text-center
							lg:text-start
							font-bold
							text-neutral-700'
						>
							{title}
						</h1>
						<div>
							{challenge.type === 'ASSIST' && (
								<QuestionBubble question={challenge.question} />
							)}
						</div>
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
			<Footer disabled={!selectedOption} status={status} onCheck={() => {}} />
		</>
	);
}

export default Quiz;
