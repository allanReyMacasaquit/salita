'use client';

import ExitModal from '@/components/modals/ExitModal';
import { Progress } from '@/components/ui/progress';
import { useExitModal } from '@/store/use-exit-modal';
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
	const { open } = useExitModal();
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
            w-full'
		>
			<X
				onClick={open}
				className='hover:opacity-75 cursor-pointer transition w-10'
			/>
			{/* Use percentages for the progress bar */}
			<Progress value={percentage} />
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
			<div className='mt-2 flex items-center pb-2 font-bold text-lg mx-2 lg:text-2xl'>
				Progress: {percentage}%
			</div>
		</header>
	);
}

export default QuizHeader;
