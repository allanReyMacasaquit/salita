'use client';

import { QuizProps } from '@/interfaces/Quiz';
import { useEffect, useState } from 'react';
import QuizHeader from './QuizHeader';

function Quiz({
	initialLessonId,
	initialHearts,
	initialPercentage,
	initialLessonChallenges,
	userSubscription,
}: QuizProps) {
	const [hearts, setHearts] = useState(initialHearts);
	const [percentage, setPercentage] = useState(initialPercentage); // Set to initialPercentage or 0 if undefined

	console.log('Current Percentage:', percentage); // Better log message for clarity

	return (
		<>
			<QuizHeader
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={!!userSubscription.isActive} // Ensure active subscription is properly checked
			/>
		</>
	);
}

export default Quiz;
