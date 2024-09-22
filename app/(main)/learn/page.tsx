import FeedWrapper from '@/components/wrapper/FeedWrapper';
import HeaderTitle from './components/HeaderTitle';
import StickyWrapper from '@/components/wrapper/StickyWrapper';
import UserProgress from '@/components/user/UserProgress';

function LearnPage() {
	return (
		<div
			className='
			flex 
			gap-12
			px-6'
		>
			<FeedWrapper>
				<HeaderTitle title='Genesis' />
				<div className='space-y-4'>
					<div className='h-[700px] w-full rounded-xl border shadow-2xl drop-shadow-2xl shadow-slate-200'></div>
					<div className='h-[700px] w-full rounded-xl border shadow-2xl drop-shadow-2xl shadow-slate-200'></div>
				</div>
			</FeedWrapper>
			<StickyWrapper>
				<UserProgress
					activeCourse={{ title: 'Genesis', imageSrc: '/images/flags/US.svg' }}
					hearts={5}
					points={100}
					hasActiveSubscription={false}
				/>
			</StickyWrapper>
		</div>
	);
}
export default LearnPage;
