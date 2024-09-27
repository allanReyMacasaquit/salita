'use client';

import { Progress } from '@/components/ui/progress';
import { InfinityIcon, X } from 'lucide-react';
import Image from 'next/image';

type QuizHeaderProps = {
	hearts: number;
	percentage: number; // This can be the initial percentage
	hasActiveSubscription: boolean;
};

function QuizHeader({
	hearts,
	percentage, // Initial percentage
	hasActiveSubscription,
}: QuizHeaderProps) {
	return (
		<header
			className='
            py-5
            p-2
            lg:py-10
            px-5
            flex    
            gap-x-7
            items-center
            justify-between
            max-w-7xl
            mx-auto
            w-full
            bg-green-500
            md:bg-white'
		>
			<X
				onClick={() => {
					// TODO: Implement functionality, like navigating back or closing the quiz
					console.log('Close button clicked');
				}}
				className='hover:opacity-75 cursor-pointer transition w-10'
			/>
			<Progress value={percentage} />{' '}
			{/* Use percentages for the progress bar */}
			<div
				className='
                text-rose-500
                flex
                items-center
                font-extrabold'
			>
				<Image
					src='/images/user/hearts.png' // Fixed image path
					alt='heart'
					height={100}
					width={100}
					priority
					className='mr-2 w-12'
				/>
				{hasActiveSubscription ? (
					<InfinityIcon className='h-10 w-10 stroke-[3]' /> // Adjusted stroke width syntax
				) : (
					hearts
				)}
			</div>
		</header>
	);
}

export default QuizHeader;
