import FeedWrapper from '@/components/wrapper/FeedWrapper';
import HeaderTitle from './components/HeaderTitle';
import StickyWrapper from '@/components/wrapper/StickyWrapper';
import UserProgress from '@/components/user/UserProgress';
import {
	getCourseProgress,
	getLessonPercentage,
	getUnits,
	getUserProgress,
} from '@/database/queries';
import { redirect } from 'next/navigation';
import Unit from './components/Unit';

async function LearnPage() {
	const userProgress = await getUserProgress();
	const units = await getUnits();
	const courseProgress = await getCourseProgress();
	const lessonPercentage = await getLessonPercentage();

	if (!userProgress || !userProgress.activeCourse) {
		redirect('/courses');
	}

	if (!courseProgress) {
		redirect('/courses');
	}
	return (
		<div
			className='
			flex 
			gap-12
			px-6'
		>
			<FeedWrapper>
				<HeaderTitle title={userProgress.activeCourse.title} />
				{units.map((unit) => (
					<div key={unit.id} className='mb-10'>
						<Unit
							id={unit.id}
							order={unit.order}
							description={unit.description}
							title={unit.title}
							lessons={unit.lessons}
							activeLesson={courseProgress.activeLesson}
							activeLessonPercentage={lessonPercentage}
						/>
					</div>
				))}
			</FeedWrapper>
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={false}
				/>
			</StickyWrapper>
		</div>
	);
}
export default LearnPage;
