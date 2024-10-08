import { List, Datagrid, TextField } from 'react-admin';

export const CourseList = () => (
	<List>
		<Datagrid rowClick='edit'>
			<TextField source='id' />
			<TextField source='title' />
			<TextField source='imageSrc' />
		</Datagrid>
	</List>
);
