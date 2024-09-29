import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
	variant: 'points' | 'hearts';
	value: number;
};
function FinishCard({ value, variant }: Props) {
	const imageSrc =
		variant === 'hearts'
			? '/images/user/hearts.png'
			: '/images/user/points.png';
	return (
		<div
			className={cn(
				`border-2
                rounded-2xl
                w-full`,
				variant === 'points' && 'bg-orange-400' && 'border-orange-400',
				variant === 'hearts' && 'bg-rose-500' && 'border-rose-500'
			)}
		>
			<div
				className={cn(
					'p-2 rounded-t-xl lg:text-xl text-white font-bold text-center text-xs',
					variant === 'points' && 'bg-orange-400',
					variant === 'hearts' && 'bg-rose-500'
				)}
			>
				{variant === 'hearts' ? 'Hearts Left' : 'Total XP'}
			</div>
			<div
				className={cn(
					'bg-white rounded-2xl items-center flex justify-center p-6 font-bold text-lg',
					variant === 'points' && 'text-orange-400',
					variant === 'hearts' && 'text-rose-500'
				)}
			>
				<Image
					src={imageSrc}
					alt='Icon'
					height={30}
					width={30}
					priority
					className='mr-2'
				/>
				{value}
			</div>
		</div>
	);
}
export default FinishCard;
