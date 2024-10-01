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
import { usePracticeModal } from '@/store/practice-modal';

function PracticeModal() {
	const [isClient, setIsClient] = useState(false);
	const { isOpen, close } = usePracticeModal();

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
							src='/upgrade.svg'
							alt='practice modal'
							width={100}
							height={100}
							priority
							className='mx-2 w-30'
						/>
					</div>
					<DialogTitle
						className='
						text-center font-bold text-2xl text-gray-500'
					>
						Practice Lessons
					</DialogTitle>
				</DialogHeader>
				<DialogDescription className='text-center text-gray-400 text-xl'>
					`Use practice lessons to regain hearts and points at your own pace.
					These sessions are designed to help you improve without any
					pressure—you won’t lose hearts or points, no matter how many mistakes
					you make. It&apos;s the perfect opportunity to sharpen your skills and
					build confidence!`
				</DialogDescription>
				<DialogFooter>
					<div className=' flex flex-col gap-4 w-full'>
						<Button
							onClick={close}
							size='lg'
							variant='primary'
							className='w-full text-white'
						>
							I understand
						</Button>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default PracticeModal;
