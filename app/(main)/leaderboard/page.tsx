import UserProgress from '@/components/user/UserProgress';
import Image from 'next/image';
import FeedWrapper from '@/components/wrapper/FeedWrapper';
import {
	getTopTenUsers,
	getUserProgress,
	getUserSubscription,
} from '@/database/queries';
import { redirect } from 'next/navigation';
import StickyWrapper from '@/components/wrapper/StickyWrapper';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import Promo from '@/app/lesson/components/Promo';

async function LeaderboardPage() {
	const userProgress = await getUserProgress();
	const userSubscription = await getUserSubscription();
	const leaderboard = await getTopTenUsers();
	if (!userProgress || !userProgress.activeCourse) {
		redirect('/courses');
	}
	const isPro = !!userSubscription?.isActive;

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
				<div
					className='
						w-full
						flex	
						flex-col
						items-center'
				>
					<Image
						src='/images/sidebar/Leaderboard.svg'
						alt='Leaderboard'
						height={100}
						width={100}
						priority
						className='w-56'
					/>
					<h1
						className='
					text-center
					font-bold
					text-3xl'
					>
						Top 10 Billboard
					</h1>

					<p className='text-center text-neutral-500 text-sm lg:text-lg my-3 mb-6'>
						Climb to the top and showcase your skills! Will you make it to #1?
					</p>
					<Separator className='mb-4 h-0.5 rounded-full' />
					{leaderboard.map((userProgress, index) => (
						<div
							className='
							flex 
							items-center
							w-full
							p-4
							rounded-2xl
							hover:bg-gray-200/50'
							key={userProgress.userId}
						>
							<p className='font-bold text-lime-700 mr-4'>{index + 1}</p>
							<Avatar className='border bg-green-500 h-12 w-12 mr-6'>
								<AvatarImage
									className='object-cover'
									src={userProgress.userImageSrc}
								/>
							</Avatar>
							<p className='font-bold text-neutral-800 flex-1'>
								{userProgress.userName}
							</p>
							<p className='text-muted-foreground'>{userProgress.points} XP</p>
						</div>
					))}
				</div>
			</FeedWrapper>
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={isPro}
				/>
				{!userSubscription?.isActive && <Promo />}
			</StickyWrapper>
		</div>
	);
}
export default LeaderboardPage;
