import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import SidebarItem from './SidebarItem';
import { sidebarItems } from '@/data/sidebarItems';

type Props = {
	className?: string;
};

function Sidebar({ className }: Props) {
	return (
		<div
			className={cn(
				'h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col',
				className
			)}
		>
			<Link href='/learn' className='flex items-center'>
				<Image
					className='object-cover p-6 rounded-full'
					src='/logo-salita.svg'
					width={100}
					height={100}
					priority
					alt='Salita Logo'
				/>
				<Image
					src='/text-logo.svg'
					width={100}
					height={100}
					priority
					alt='Text Logo'
				/>
			</Link>

			<div className='flex flex-col gap-y-2 flex-1'>
				{sidebarItems.map((item, index) => (
					<SidebarItem
						key={index}
						label={item.label}
						href={item.href}
						iconSrc={item.iconSrc}
					/>
				))}
			</div>
		</div>
	);
}

export default Sidebar;
