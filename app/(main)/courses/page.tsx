import { getCourses, getUserProgress } from '@/database/queries';
import List from './components/List';

export default async function CoursesPage() {
	const courses = await getCourses();
	const userProgress = await getUserProgress();
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
			<List courses={courses} activeCourseId={userProgress?.activeCourseId} />
		</div>
	);
}
