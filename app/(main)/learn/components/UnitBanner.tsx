'use client';
import { Button } from '@/components/ui/button';
import { UnitBannerProps } from '@/interfaces/UnitBanner';
import { NotebookText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function UnitBanner({ title, description }: UnitBannerProps) {
	const router = useRouter();
	return (
		<Link
			href='/lesson'
			className='
                        relative
                        w-full
                        rounded-2xl
                        bg-green-500
                        p-5
                        text-white
                        flex
                        items-center
                        justify-between
                        group' // Add group class to enable hover targeting
		>
			<div className='space-y-2.5'>
				<h3 className='text-2xl font-bold m-2'>{title}</h3>
				<p className='text-lg'>{description}</p>
			</div>
			<div className='relative'>
				<Button
					onClick={() => router.push('/lesson')}
					size='lg'
					variant='secondaryOutline'
					className='
                        opacity-0
                        lg:flex
                        border-2
                        border-b-4
                        hidden
                        active:border-b-2
                        hover:shadow-lg
                        bg-transparent
                        text-neutral-200
                        hover:text-white
                        hover:bg-green-600/50
                        transition-all
                        duration-300
                        group-hover:opacity-100' // Show button on parent hover
				>
					<NotebookText className='mr-2' />
					Continue
				</Button>
			</div>
		</Link>
	);
}

export default UnitBanner;
