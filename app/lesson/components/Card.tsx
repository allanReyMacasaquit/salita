import { CardProps } from '@/interfaces/Card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useCallback } from 'react';

import { useAudio, useKey } from 'react-use';

function Card({
	text,
	shortcut,
	imageSrc,
	audioSrc,
	selected,
	status,
	disabled,
	type,
	onClick,
}: CardProps) {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [audio, _, controls] = useAudio({ src: audioSrc || '' });

	const handleClick = useCallback(() => {
		if (disabled) return;

		controls.play();
		onClick();
	}, [controls, disabled, onClick]);

	useKey(shortcut, handleClick, {}, [handleClick]);

	return (
		<div
			onClick={handleClick}
			className={cn(
				'h-full border-2 rounded-xl border-b-4 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2',
				selected && 'border-sky-300 bg-sky-100 hover:bg-sky-100',
				selected &&
					status === 'correct' &&
					'border-green-300 bg-green-100 hover:bg-green-100',
				selected &&
					status === 'wrong' &&
					'border-rose-300 bg-rose-100 hover:bg-rose-100',
				disabled && 'pointer-events-none hover:bg-white',
				type === 'ASSIST' && 'lg:p-3 w-full'
			)}
		>
			<div
				className={cn(
					'lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 flex items-center justify-center rounded-full',
					'text-neutral-400 lg:text-[15px] text-xs font-semibold',
					selected && 'text-sky-500 border-sky-500',
					selected && status === 'correct' && 'text-green-500 border-green-500',
					selected && status === 'wrong' && 'text-rose-500 border-rose-500'
				)}
			>
				{shortcut}
			</div>
			{audio}
			{imageSrc && (
				<div
					className='
                        relative
                        aspect-square
                        flex
                        items-center
                        justify-center
                        max-h-24
                        lg:max-h-28
                        w-full'
				>
					<Image
						src={imageSrc}
						alt={text}
						height={100}
						width={100}
						priority
						className='w-28'
					/>
				</div>
			)}
			<div
				className={cn(
					'flex items-center justify-between',
					type === 'ASSIST' && 'flex-row-reverse'
				)}
			>
				{type === 'ASSIST' && <div />}
				<p
					className={cn(
						'text-neutral-600 text-lg lg:text-xl',
						selected && 'text-sky-500',
						selected && status === 'correct' && 'text-green-500',
						selected && status === 'wrong' && 'text-rose-500'
					)}
				>
					{text}
				</p>
			</div>
		</div>
	);
}
export default Card;
