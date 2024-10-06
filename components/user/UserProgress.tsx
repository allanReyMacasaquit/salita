import Link from 'next/link';
import Image from 'next/image';
import { InfinityIcon } from 'lucide-react';

import { courses } from '@/database/schema';
import { Button } from '@/components/ui/button';

type UserProgressProps = {
	activeCourse: typeof courses.$inferSelect;
	hearts: number;
	points: number;
	hasActiveSubscription: boolean;
};
async function UserProgress({
	activeCourse,
	hearts,
	points,
	hasActiveSubscription,
}: UserProgressProps) {
	return (
		<div
			className='
				sticky
				
               
                justify-between
              
			
				border
				rounded-t-2xl
				'
		>
			<Link href='/courses'>
				<Button size='sm' variant='default'>
					<Image
						src={activeCourse.imageSrc}
						alt={activeCourse.title}
						width={22}
						height={22}
						className='h-auto w-auto'
					/>
					<span
						className='
							mx-2 
							text-neutral-400 
							hover:text-neutral-500'
					>
						Available Courses
					</span>
				</Button>
			</Link>
			<Link href='/shop'>
				<Button size='sm' variant='default' className='text-orange-500'>
					<Image
						src='/images/user/points.png'
						alt='points'
						width={22}
						height={22}
					/>
					<span
						className='
							mx-2 
							text-neutral-400 
							hover:text-neutral-500'
					>
						{points}
					</span>
				</Button>
			</Link>
			<Link href='/shop'>
				<Button size='sm' variant='default' className='text-rose-500'>
					<Image
						src='/images/user/hearts.png'
						alt='hearts'
						width={22}
						height={22}
					/>
					<span
						className='
							mx-2 
							text-neutral-400 
							hover:text-neutral-500'
					>
						{hasActiveSubscription ? (
							<InfinityIcon className='h-4 w-4 stroke-[3]' />
						) : (
							hearts
						)}
					</span>
				</Button>
			</Link>
			=
		</div>
	);
}
export default UserProgress;
