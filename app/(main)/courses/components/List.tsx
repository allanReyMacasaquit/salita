'use client';

import { courses } from '@/database/schema';
import Card from './Card';

type ListProps = {
	courses: (typeof courses.$inferSelect)[];
	activeCourseId: number;
};
function List({ courses, activeCourseId }: ListProps) {
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
					onClick={() => {}}
					disabled={false}
					active={course.id === activeCourseId}
				/>
			))}
		</div>
	);
}
export default List;
