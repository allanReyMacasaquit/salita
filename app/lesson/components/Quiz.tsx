'use client';

import { QuizProps } from '@/interfaces/Quiz';

import QuizHeader from './QuizHeader';
import QuestionBubble from './QuestionBubble';
import { useState } from 'react';
import Challenge from './Challenge';

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
	const [activeIndex, setActiveIndex] = useState(() => {
		const uncompletedIndex = challenges.findIndex(
			(challenge) => !challenge.completed
		);
		return uncompletedIndex === -1 ? 0 : uncompletedIndex;
	});

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
							onSelect={() => {}}
							status='none'
							selectedOption={undefined}
							disabled={false}
							type={challenge.type}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default Quiz;
