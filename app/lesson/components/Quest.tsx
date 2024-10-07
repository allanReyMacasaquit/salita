import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { quests } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
	points: number;
};
function Quest({ points }: Props) {
	return (
		<div
			className='
                border-2 
                rounded-xl 
                p-4 
                space-y-4'
		>
			<div
				className='
                    space-y-2'
			>
				<div
					className='
                        flex 
                        items-center 
                        gap-x-2'
				>
					<Image
						src='/images/sidebar/Quest.svg'
						alt='unlimited heart'
						width={60}
						height={60}
						priority
					/>
					<h3 className='font-bold text-lg'>Unlock new adventures</h3>
				</div>
				<p className='text-muted-foreground text-center'>
					Complete tasks and earn more rewards!
				</p>
				<Link href='/quest'>
					<Button variant='super' size='lg' className='w-full'>
						View all
					</Button>
				</Link>
			</div>
			<ul className='w-full'>
				{quests.map((quest) => {
					const progress = (points / quest.value) * 100;
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
	);
}
export default Quest;
