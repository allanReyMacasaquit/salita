import { getLesson, getUserProgress } from '@/database/queries';
import { redirect } from 'next/navigation';
import Quiz from './components/Quiz';

async function LessonPage() {
	try {
		// Fetch lesson and user progress concurrently
		const [lesson, userProgress] = await Promise.all([
			getLesson(),
			getUserProgress(),
		]);

		// Redirect if either the lesson or user progress is missing
		if (!lesson || !userProgress) {
			redirect('/learn');
		}

		// Calculate the initial percentage based on completed challenges
		const totalChallenges = lesson.challenges.length;
		const completedChallenges = lesson.challenges.filter(
			(challenge) => challenge.completed
		).length;

		const initialPercentage = totalChallenges
			? (completedChallenges / totalChallenges) * 100
			: 0;

		// Render the Quiz component
		return (
			<Quiz
				initialLessonId={lesson.id}
				initialHearts={5}
				initialPercentage={initialPercentage}
				initialLessonChallenges={lesson.challenges} // Corrected prop name
				userSubscription={true} // TODO: Update this when ready
			/>
		);
	} catch (error) {
		console.error('Error loading lesson or user progress:', error);
		redirect('/learn'); // Redirect on error as well
		return null; // Ensures no further rendering
	}
}

export default LessonPage;
