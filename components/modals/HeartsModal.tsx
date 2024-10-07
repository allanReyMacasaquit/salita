'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { useHeartsModal } from '@/store/use-hearts-modal';

function HeartsModal() {
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);
	const { isOpen, close } = useHeartsModal();

	// This ensures that the component is rendered only on the client
	useEffect(() => {
		setIsClient(true);
	}, []);

	const onClick = () => {
		close();
		router.push('/shop');
	};

	// Return null to avoid server-side rendering
	if (!isClient) return null;

	return (
		<Dialog open={isOpen} onOpenChange={close}>
			<DialogContent className='max-w-md'>
				<DialogHeader>
					<div
						className='
						flex 
						items-center
						w-full
						justify-center
						mb-5'
					>
						<Image
							src='/upgrade.svg'
							alt='upgrade modal'
							width={100}
							height={100}
							priority
							className='mx-2 w-20'
						/>
					</div>
					<DialogTitle
						className='
						text-center font-bold text-2xl text-gray-500'
					>
						You ran out of hearts!
					</DialogTitle>
				</DialogHeader>
				<DialogDescription className='text-center text-gray-400'>
					Get Pro for unlimited hearts, or purchase them in the store.
				</DialogDescription>
				<DialogFooter>
					<div className=' flex flex-col gap-4 w-full'>
						<Button
							onClick={onClick}
							size='lg'
							variant='primary'
							className='w-full text-white'
						>
							Get unlimited hearts
						</Button>
						<Button
							onClick={close}
							size='lg'
							variant='danger'
							className='w-full text-white'
						>
							Exit
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default HeartsModal;
