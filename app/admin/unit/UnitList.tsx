import { List, Datagrid, TextField, ReferenceField } from 'react-admin';

export const UnitList = () => (
	<List>
		<Datagrid rowClick='edit'>
			<TextField source='id' />
			<TextField source='title' />
			<TextField source='description' />
			<ReferenceField source='courseId' reference='courses' />
			<TextField source='order' />
		</Datagrid>
	</List>
);
