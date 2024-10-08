import FeedWrapper from '@/components/wrapper/FeedWrapper';
import HeaderTitle from './components/HeaderTitle';
import StickyWrapper from '@/components/wrapper/StickyWrapper';
import UserProgress from '@/components/user/UserProgress';
import {
	getCourseProgress,
	getLessonPercentage,
	getUnits,
	getUserProgress,
	getUserSubscription,
} from '@/database/queries';
import { redirect } from 'next/navigation';
import Unit from './components/Unit';
import Promo from '@/app/lesson/components/Promo';
import Quest from '@/app/lesson/components/Quest';

async function LearnPage() {
	const userProgress = await getUserProgress();
	const units = await getUnits();
	const courseProgress = await getCourseProgress();
	const lessonPercentage = await getLessonPercentage();
	const userSubscription = await getUserSubscription();
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
			flex-row
			gap-12
			px-6
			max-w-7xl'
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
					hasActiveSubscription={!!userSubscription?.isActive}
				/>
				{!userSubscription?.isActive && <Promo />}
				<Quest points={userProgress.points} />
			</StickyWrapper>
		</div>
	);
}
export default LearnPage;
