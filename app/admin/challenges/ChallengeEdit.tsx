import {
	Edit,
	NumberInput,
	ReferenceInput,
	required,
	SelectInput,
	SimpleForm,
	TextInput,
} from 'react-admin';

const ChallengeEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<TextInput source='question' validate={[required()]} label='Question' />
				<SelectInput
					choices={[
						{ id: 'SELECT', name: 'SELECT' },

						{ id: 'ASSIST', name: 'ASSIST' },
					]}
				/>
				<ReferenceInput source='lessonId' reference='lessons' />
				<NumberInput source='order' validate={[required()]} label='Order' />
			</SimpleForm>
		</Edit>
	);
};
export default ChallengeEdit;
