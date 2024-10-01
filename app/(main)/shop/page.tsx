import UserProgress from '@/components/user/UserProgress';
import FeedWrapper from '@/components/wrapper/FeedWrapper';
import StickyWrapper from '@/components/wrapper/StickyWrapper';
import { getUserProgress } from '@/database/queries';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import ShopItems from './ShopItems';

const ShopPage = async () => {
	const userProgress = await getUserProgress();

	if (!userProgress || !userProgress.activeCourse) {
		redirect('/courses');
	}
	return (
		<div
			className='
		flex 
		flex-row
		gap-12
		px-6'
		>
			<FeedWrapper>
				<div
					className='
				w-full
				flex	
				flex-col
				items-center'
				>
					<Image
						src='/images/sidebar/shop_1.svg'
						alt='shop'
						height={100}
						width={100}
						priority
					/>
					<h1
						className='
					text-center
					font-bold
					text-3xl'
					>
						Shop Now
					</h1>
					<h2 className='text-center'>
						Shop here for exclusive items and exciting rewards!
					</h2>
					<p className='text-muted-foreground text-center text-lg my-3 mb-6'>
						Transform your points into valuable learning experiences! Spend them
						on courses, workshops, and resources that will enhance your skills,
						broaden your knowledge, and empower you to achieve your goals
					</p>
					<ShopItems
						hearts={userProgress.hearts}
						points={userProgress.points}
						hasActiveSubscription={false}
					/>
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
};
export default ShopPage;
