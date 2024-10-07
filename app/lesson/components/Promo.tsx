import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

function Promo() {
	return (
		<div
			className='
                border-2 
                rounded-xl 
                p-4 '
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
						src='/images/user/unlimited_heart.svg'
						alt='unlimited heart'
						width={60}
						height={60}
						priority
					/>
					<h3 className='font-bold text-lg'>Upgrade to Pro</h3>
				</div>
				<p className='text-muted-foreground text-center'>
					Get umlimited hearts and more!
				</p>
				<Link href='/shop'>
					<Button variant='super' size='lg' className='w-full'>
						Upgrade Today
					</Button>
				</Link>
			</div>
		</div>
	);
}
export default Promo;
