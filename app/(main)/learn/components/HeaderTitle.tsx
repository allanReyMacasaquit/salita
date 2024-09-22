import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Props = {
	title: string;
};

function HeaderTitle({ title }: Props) {
	return (
		<div
			className='
				sticky
				top-12	
				lg:top-0
				pt-2
				lg:pt-6
				bg-white
				bg-opacity-80
				backdrop-blur-md
				pb-2
				lg:pb-6
				flex
				items-center
				justify-between
				lg:mb-4
				lg:shadow-sky-500
				text-neutral-400
				rounded-b-2xl
				lg:z-50'
		>
			<Link href='/courses'>
				<Button size='sm' variant='aside' className='rounded-full'>
					<ArrowLeft className='h-5 w-5 stroke-2 text-neutral-400' />
				</Button>
			</Link>
			<h1 className='font-bold text-lg'>{title}</h1>
			<div></div>
		</div>
	);
}

export default HeaderTitle;
