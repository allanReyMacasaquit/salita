import FeedWrapper from '@/components/wrapper/FeedWrapper';
import HeaderTitle from './components/HeaderTitle';
import StickyWrapper from '@/components/wrapper/StickyWrapper';
import UserProgress from '@/components/user/UserProgress';
import { getUserProgress } from '@/database/queries';
import { redirect } from 'next/navigation';

async function LearnPage() {
	const userProgress = await getUserProgress();

	if (!userProgress || !userProgress.activeCourse) {
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
				<div className='space-y-4'>
					<div className='h-[700px] w-full rounded-xl border shadow-lg drop-shadow-lg shadow-slate-500'></div>
					<div className='h-[700px] w-full rounded-xl border shadow-lg drop-shadow-lg shadow-slate-500'></div>
				</div>
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
