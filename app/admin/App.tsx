'use client';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { CourseList } from './course/CourseList';
import { CourseCreate } from './course/CourseCreate';
import CourseEdit from './course/CourseEdit';

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
		</Admin>
	);
};
export default App;
