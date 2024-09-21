import { Button } from '@/components/ui/button';
import { flags } from '@/public/images/flags';

import Image from 'next/image';

function Footer() {
	return (
		<footer className='hidden lg:block h-20 w-full border-t-2 border-slate-200 px-4'>
			<div className='max-w-screen-2xl mx-auto flex items-center justify-evenly h-full'>
				{flags.map((flag, index) => (
					<Button key={index} size='lg' variant='default'>
						<Image
							src={flag.src}
							alt={flag.alt}
							height={32}
							width={40}
							className='mr-4'
						/>
						{flag.country}
					</Button>
				))}
			</div>
		</footer>
	);
}

export default Footer;
