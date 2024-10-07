import Promo from '@/app/lesson/components/Promo';
import { Progress } from '@/components/ui/progress';
import UserProgress from '@/components/user/UserProgress';
import FeedWrapper from '@/components/wrapper/FeedWrapper';
import StickyWrapper from '@/components/wrapper/StickyWrapper';
import { quests } from '@/constants';
import { getUserProgress, getUserSubscription } from '@/database/queries';
import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';
import { redirect } from 'next/navigation';

async function QuestPage() {
	const userProgress = await getUserProgress();
	const userSubscription = await getUserSubscription();

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
						src='/images/sidebar/Quest.svg'
						alt='Quest'
						height={100}
						width={100}
						priority
						className='w-40'
					/>
					<h1
						className='
					text-center
					font-bold
					text-3xl'
					>
						Quest
					</h1>

					<p className='text-center text-neutral-500 text-sm lg:text-lg my-3 mb-6'>
						Embark on your journey! Complete tasks, earn rewards, and unlock new
						adventures!
					</p>
					<Separator className='mb-4 h-0.5 rounded-full' />

					<ul className='w-full'>
						{quests.map((quest) => {
							const progress = (userProgress.points / quest.value) * 100;
							return (
								<div
									key={quest.title}
									className='
										flex 
										items-center 
										w-full 
										gap-x-4 
										border-t-2
										p-4'
								>
									<Image
										src='/images/user/points_1.svg'
										alt='Points'
										width={60}
										height={60}
										priority
									/>
									<div
										className='
											flex 
											flex-col
											gap-y-2
											w-full'
									>
										<p className='text-neutral-700 font-bold'>{quest.title}</p>
										<Progress value={progress} className='h-3' />
									</div>
								</div>
							);
						})}
					</ul>
				</div>
			</FeedWrapper>
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={isPro}
				/>
				{!isPro && <Promo />}
			</StickyWrapper>
		</div>
	);
}
export default QuestPage;
