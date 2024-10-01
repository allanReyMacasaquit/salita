'use client';

import { refillHearts } from '@/actions/user_progress';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useTransition } from 'react';
import { useAudio } from 'react-use';
import { toast } from 'sonner';

type Props = {
	hearts: number;
	points: number;
	hasActiveSubscription: boolean;
};
const ShopItems = ({ hearts, points }: Props) => {
	const [pending, startTransition] = useTransition();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [refillAudio, _r, refillControl] = useAudio({ src: '/mp3/finish.mp3' });

	const onRefillHearts = () => {
		if (hearts === 5 || points < POINTS_TO_REFILL) return;

		startTransition(() => {
			refillHearts()
				.then(() => {
					refillControl.play();
				})
				.catch(() => {
					toast.error('Something went wrong');
				});
		});
	};

	const POINTS_TO_REFILL = 10;

	return (
		<ul className='w-full'>
			<div
				className='
					flex
					items-center
					w-full
					p-4
					gap-x-4
					border-t-2'
			>
				<Image
					src='/images/user/heart_2.svg'
					alt='hearts'
					width={60}
					height={60}
				/>
				<div
					className='
				flex-1'
				>
					<p
						className='
					text-neutral-700
					text-base
					lg:text-xl
					font-bold'
					>
						Refill hearts
					</p>
				</div>
				{refillAudio}
				<Button
					onClick={onRefillHearts}
					variant='secondary'
					disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
				>
					{hearts === 5 ? (
						'full'
					) : (
						<div
							className='
									flex
									items-center'
						>
							<Image
								src='/images/user/points_1.svg'
								alt='points'
								height={30}
								width={30}
								priority
								className='mr-2'
							/>
							<p>{POINTS_TO_REFILL}</p>
						</div>
					)}
				</Button>
			</div>
		</ul>
	);
};
export default ShopItems;
