import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Image from 'next/image';

type CardProps = {
	id: number;
	title: string;
	imageSrc: string;
	onClick: (id: number) => void;
	disabled?: boolean;
	active?: boolean;
};

function Card({ id, title, imageSrc, onClick, disabled, active }: CardProps) {
	return (
		<div
			onClick={() => {
				onClick(id);
			}}
			className={cn(
				`w-full 
                border-2
                border-b-4 
                active:border-b-2
                rounded-2xl
                hover:bg-black/5
                cursor-pointer
                flex
                flex-col
                items-center
                justify-between
                p-3
                aspect-square 
                min-w-[150px]  
                `,
				disabled && 'pointer-events-none opacity-50'
			)}
		>
			<div className='w-full flex items-center justify-end relative'>
				{active && (
					<div className='absolute z-10 -right-2 -top-6 sm:top-0 sm:right-0 bg-green-600 flex items-center justify-center p-1.5 rounded-full'>
						<Check className='text-white stroke-[4] h-4 w-4' />
					</div>
				)}
			</div>
			<Image
				src={imageSrc}
				alt={title}
				height={100}
				width={100}
				className='
                    shadow-xl
                    drop-shadow-xl
                    border-b-2
                    pt-2
                    object-cover
                    '
			/>
			<p
				className='
                    text-neutral-700
                    text-center
                    font-bold
                    m-3'
			>
				{title}
			</p>
		</div>
	);
}
export default Card;
