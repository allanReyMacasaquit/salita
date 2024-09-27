'use client';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { useExitModal } from '@/store/use-exit-modal';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

function ExitModal() {
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);
	const { isOpen, close } = useExitModal();

	// This ensures that the component is rendered only on the client
	useEffect(() => {
		setIsClient(true);
	}, []);

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
							src='exit_modal_1.svg'
							alt='exit modal'
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
						Leaving your Lesson!
					</DialogTitle>
				</DialogHeader>
				<DialogDescription className='text-center text-gray-400'>
					Are you sure you want to exit?
				</DialogDescription>
				<DialogFooter>
					<div className=' flex flex-col gap-4 w-full'>
						<Button
							onClick={close}
							size='lg'
							variant='primary'
							className='w-full text-white'
						>
							Keep Learning
						</Button>
						<Button
							onClick={() => {
								close();
								router.push('/learn');
							}}
							size='lg'
							variant='danger'
							className='w-full text-white'
						>
							End Session
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default ExitModal;
