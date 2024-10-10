'use client';
import { Button } from '@/components/ui/button';
import { LessonButtonProps } from '@/interfaces/lessonButton';
import { cn } from '@/lib/utils';
import { Check, Crown, Star } from 'lucide-react';
import Link from 'next/link';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function LessonButton({
	id,
	index,
	totalCount,
	locked,
	current,
	percentage,
}: LessonButtonProps) {
	const cycleLength = 10;
	const cycleIndex = index % cycleLength;

	let indentationLevel;
	if (cycleIndex <= 2) {
		indentationLevel = cycleIndex;
	} else if (cycleIndex <= 4) {
		indentationLevel = 4 - cycleIndex;
	} else if (cycleIndex <= 6) {
		indentationLevel = 6 - cycleIndex;
	} else if (cycleIndex <= 8) {
		indentationLevel = 8 - cycleIndex;
	} else {
		indentationLevel = cycleIndex - 8;
	}

	const rightPosition = indentationLevel * 40;
	const isFirst = index === 0;
	const isLast = index === totalCount - 1; // Ensure this marks the last button
	const isCompleted = !current && !locked; // Check if the lesson is completed (but not the current or locked one)

	const Icon = isLast ? (
		// Crown only for the last lesson
		<Crown className='bg-yellow-500 p-2 rounded-full w-10 h-10' />
	) : isCompleted ? (
		// Check icon for completed lessons
		<Check className='text-green-500' />
	) : (
		// Star for others (both current or pending lessons)
		<Star className='bg-yellow-200 text-black p-2 rounded-full size-10' />
	);
	console.log({ index, totalCount, isLast, isCompleted, current });

	const href = isCompleted ? `/lesson/${id}` : '/lesson';

	return (
		<Link
			href={href}
			aria-disabled={locked}
			style={{ pointerEvents: locked ? 'none' : 'auto' }}
		>
			<div
				className='
                    relative
                    '
				style={{
					right: `${rightPosition}px`,
					marginTop: isFirst && !isCompleted ? 60 : 24,
				}}
			>
				{current ? (
					<div
						className='
                        h-[102px]
                        w-[102px]
                        relative'
					>
						<div
							className='
                                absolute
                                -top-6
                                left-[12.5px]
                                px-3
                                py-2
                                border-2
                                font-bold
                                uppercase
                                bg-white
                                text-green-600
                                rounded-br-2xl
								rounded-tl-2xl
                                animate-bounce
                                tracking-wide
                                drop-shadow-md
                                z-10'
						>
							Start
							{/* chevron */}
							<div
								className='
                                absolute
                                left-1/2
                                -bottom-2
                                w-0
                                h-0
								border-y-slate-950
                                border-x-8
                                border-x-transparent
                                border-t-8
                                transform
								shadow
								rounded-b-full
								drop-shadow-2xl
								shadow-slate-950
                                -translate-x-1/2'
							></div>
						</div>
						<div style={{ width: '102px', height: '102px' }}>
							<CircularProgressbarWithChildren
								value={Number.isNaN(percentage) ? 0 : percentage}
								text={`${percentage}%`}
								styles={{
									path: {
										stroke: '#4ade80',
									},
									trail: {
										stroke: 'rgb(156 163 175',
									},
								}}
							>
								<Button
									size='rounded'
									variant={locked ? 'locked' : 'secondary'}
									className='
										h-[70px]
										w-[70px]
										border-b-8'
								>
									<div
										className={cn(
											`
											h-10
											w-10`,
											locked
												? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
												: 'fill-primary-foreground text-primary-foreground',
											isCompleted && 'fill-none stroke-[4]'
										)}
									>
										{Icon}
									</div>
								</Button>
							</CircularProgressbarWithChildren>
						</div>
					</div>
				) : (
					<Button
						size='rounded'
						variant={locked ? 'locked' : 'secondary'}
						className='
										h-[70px]
										w-[70px]
										border-b-8'
					>
						<div
							className={cn(
								`
											h-10
											w-10`,
								locked
									? 'fill-neutral-400 text-neutral-400 stroke-neutral-400'
									: 'fill-primary-foreground bg-yellow-400 rounded-full p-2',
								isCompleted && 'fill-none stroke-[4]'
							)}
						>
							{Icon}
						</div>
					</Button>
				)}
			</div>
		</Link>
	);
}
export default LessonButton;
