import { getCourses } from '@/database/queries';
import List from './components/List';

export default async function CoursesPage() {
	const courses = await getCourses();
	return (
		<div
			className='
            h-full
            max-w-screen-lg
            px-3 mx-auto'
		>
			<h1
				className='
                    text-2xl
                    font-bold
                    text-neutral-700'
			>
				Language Courses
			</h1>
			<List courses={courses} activeCourseId={1} />
		</div>
	);
}
