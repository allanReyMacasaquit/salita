import { UnitProps } from '@/interfaces/Unit';
import UnitBanner from './UnitBanner';
import LessonButton from './LessonButton';

function Unit({
	title,
	description,
	lessons,
	activeLesson,
	activeLessonPercentage,
}: UnitProps) {
	return (
		<>
			<UnitBanner title={title} description={description} />
			<div className='flex items-center flex-col relative'>
				{lessons.map((lesson, index) => {
					const isCurrent = lesson.id === activeLesson?.id;
					const isLocked = !lesson.completed && !isCurrent;
					return (
						<LessonButton
							key={lesson.id}
							id={lesson.id}
							index={index}
							totalCount={lessons.length - 1}
							current={isCurrent}
							locked={isLocked}
							percentage={activeLessonPercentage}
						/>
					);
				})}
			</div>
		</>
	);
}
export default Unit;
