import { Button } from '@/components/ui/button';
import { TbSquareLetterS } from 'react-icons/tb';
import {
	ClerkLoaded,
	ClerkLoading,
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import Image from 'next/image';

function Header() {
	return (
		<header
			className='
			h-20
			w-full
			shadow-lg
			drop-shadow-lg
			px-4'
		>
			<div
				className='
					lg:max-w-screen-2xl 
					mx-auto
					flex
					items-center
					justify-between
					h-full'
			>
				<div
					className='
						pt-8
						pl-4
						pb-8
						flex
						items-center
						'
				>
					<Image
						className='object-cover p-6 rounded-full'
						src='/logo-salita.svg'
						width={100}
						height={100}
						priority
						alt='image'
					/>

					<Image
						src='/text-logo.svg'
						width={100}
						height={100}
						priority
						alt='logo-text
						'
					/>
				</div>
				<ClerkLoading>
					<Loader className='h-8 w-8 text-muted-foreground animate-spin' />
				</ClerkLoading>
				<ClerkLoaded>
					<SignedIn>
						<UserButton afterSwitchSessionUrl='/' />
					</SignedIn>
					<SignedOut>
						<SignInButton mode='modal' fallbackRedirectUrl='/learn'>
							<Button size='sm'>
								<TbSquareLetterS size='30' className='mx-2 rounded-full' />{' '}
								<span className='hidden md:block'>Login</span>
							</Button>
						</SignInButton>
					</SignedOut>
				</ClerkLoaded>
			</div>
		</header>
	);
}
export default Header;
