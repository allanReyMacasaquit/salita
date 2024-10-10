'use client';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import { CourseList } from './course/CourseList';
import { CourseCreate } from './course/CourseCreate';
import CourseEdit from './course/CourseEdit';

import { UnitList } from './unit/UnitList';
import { UnitCreate } from './unit/UnitCreate';
import UnitEdit from './unit/UnitEdit';

import { LessonList } from './lessons/LessonList';
import { LessonCreate } from './lessons/LessonCreate';
import LessonEdit from './lessons/LessonEdit';
import { ChallengeList } from './challenges/ChallengeList';
import { ChallengeCreate } from './challenges/ChallengeCreate';
import ChallengeEdit from './challenges/ChallengeEdit';
import { ChallengeOptionList } from './challengeOptions/ChallengeOptionList';
import { ChallengeOptionCreate } from './challengeOptions/ChallengeOptionCreate';
import ChallengeOptionEdit from './challengeOptions/ChallengeOptionEdit';

const dataProvider = simpleRestProvider('api');
const App = () => {
	return (
		<Admin dataProvider={dataProvider}>
			<Resource
				name='courses'
				list={CourseList}
				create={CourseCreate}
				edit={CourseEdit}
				recordRepresentation='title'
			/>
			<Resource
				name='units'
				list={UnitList}
				create={UnitCreate}
				edit={UnitEdit}
				recordRepresentation='title'
			/>
			<Resource
				name='lessons'
				list={LessonList}
				create={LessonCreate}
				edit={LessonEdit}
				recordRepresentation='title'
			/>
			<Resource
				name='challenges'
				list={ChallengeList}
				create={ChallengeCreate}
				edit={ChallengeEdit}
				recordRepresentation='question'
			/>
			<Resource
				name='challengeOptions'
				list={ChallengeOptionList}
				create={ChallengeOptionCreate}
				edit={ChallengeOptionEdit}
				recordRepresentation='text'
			/>
		</Admin>
	);
};
export default App;
