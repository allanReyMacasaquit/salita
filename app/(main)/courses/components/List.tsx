'use client';

import { courses, userProgress } from '@/database/schema';
import Card from './Card';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { UPSERT_USER_PROGRESS } from '@/actions/user_progress';
import { toast } from 'sonner';

type ListProps = {
	courses: (typeof courses.$inferSelect)[];
	activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};
function List({ courses, activeCourseId }: ListProps) {
	const router = useRouter();
	const [pending, startTransition] = useTransition();

	const onClick = (id: number) => {
		if (pending) return;

		if (id === activeCourseId) {
			return router.push('/learn');
		}
		startTransition(() => {
			UPSERT_USER_PROGRESS(id).catch(() => toast.error('Something went wrong'));
		});
	};

	return (
		<div
			className='
            p-4
            grid
            grid-cols-2
            lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]
            gap-4'
		>
			{courses.map((course) => (
				<Card
					key={course.id}
					id={course.id}
					title={course.title}
					imageSrc={course.imageSrc}
					onClick={onClick}
					disabled={pending}
					active={course.id === activeCourseId}
				/>
			))}
		</div>
	);
}
export default List;
