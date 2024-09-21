import { Button } from '@/components/ui/button';
import {
	ClerkLoaded,
	ClerkLoading,
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
} from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	return (
		<div
			className='
				max-w-4xl
				mx-auto
				w-full
				flex
				flex-col
				md:flex-row
				items-center
				justify-center
				p-2
				gap-2
				rounded-xl'
		>
			<div
				className='
					relative
					w-[340px]
					lg:w-full
					lg:h-full'
			>
				<Image
					src='/hero_creation.svg'
					height={100}
					width={100}
					priority
					alt='hero image'
					className='
					w-full
					rounded-2xl
					pb-2
					'
				/>
			</div>
			<div
				className='
					flex
					flex-col
					items-center
					py-4
					'
			>
				<h1 className='text-center font-bold text-neutral-600 max-4-[480px] text-lg lg:text-3xl py-2'>
					Learn, practice and master the words of the Bible
				</h1>
				<div className='mt-4 '>
					<ClerkLoading>
						<Loader className='h-8 w-8 text-muted-foreground animate-spin' />
					</ClerkLoading>
					<ClerkLoaded>
						<SignedOut>
							<SignUpButton mode='modal' fallbackRedirectUrl='/learn'>
								<Button size='lg' variant='secondary' className='w-full mb-2'>
									Get Started!
								</Button>
							</SignUpButton>
							<SignInButton mode='modal' fallbackRedirectUrl='/learn'>
								<Button size='lg' variant='primaryOutline' className='w-full'>
									I Already have an account
								</Button>
							</SignInButton>
						</SignedOut>

						<SignedIn>
							<Button size='lg' variant='secondary' className='w-full' asChild>
								<Link href='/learn'>Contine Learning</Link>
							</Button>
						</SignedIn>
					</ClerkLoaded>
				</div>
			</div>
		</div>
	);
}
