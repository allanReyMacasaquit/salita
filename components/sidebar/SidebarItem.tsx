'use client';

import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import Link from 'next/link';
import Image from 'next/image';

interface SidebarItemProps {
	label: string;
	href: string;
	iconSrc: string;
}
function SidebarItem({ label, href, iconSrc }: SidebarItemProps) {
	const pathname = usePathname();
	const active = pathname === href;
	return (
		<Button
			variant={active ? 'asideOutline' : 'aside'}
			className='
                justify-start h-[52px]'
			asChild
		>
			<Link href={href}>
				<Image src={iconSrc} alt={label} height={32} width={32} />
				<span className={active ? 'font-bold mx-4' : 'mx-2'}>{label}</span>
			</Link>
		</Button>
	);
}
export default SidebarItem;
