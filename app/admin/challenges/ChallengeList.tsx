import {
	List,
	Datagrid,
	TextField,
	ReferenceField,
	NumberField,
	SelectField,
} from 'react-admin';

export const ChallengeList = () => (
	<List>
		<Datagrid rowClick='edit'>
			<TextField source='id' />
			<TextField source='question' />
			<SelectField
				source='type'
				choices={[
					{ id: 'SELECT', name: 'SELECT' },

					{ id: 'ASSIST', name: 'ASSIST' },
				]}
			/>
			<ReferenceField source='lessonId' reference='lessons' />
			<NumberField source='order' />
		</Datagrid>
	</List>
);
