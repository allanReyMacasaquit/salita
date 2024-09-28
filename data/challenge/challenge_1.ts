export const challenge_1 = [
	{
		id: 1,
		lessonId: 1, // references 'Lesson 1: Introduction to Biblical Hebrew Alphabet'
		type: 'SELECT' as const, // Use one of the enum values ('SELECT' or 'ASSIST')
		question:
			'What is the correct pronunciation for the Hebrew letter "א" (Aleph)?',
		order: 1,
	},
	{
		id: 2,
		lessonId: 1, // references 'Lesson 1: Introduction to Biblical Hebrew Alphabet'
		type: 'ASSIST' as const, // Use one of the enum values ('SELECT' or 'ASSIST')
		question: 'Which Hebrew letter corresponds to the sound "b"?',
		order: 2,
	},
	{
		id: 3,
		lessonId: 1, // references 'Lesson 1: Introduction to Biblical Hebrew Alphabet'
		type: 'SELECT' as const, // Use one of the enum values ('SELECT' or 'ASSIST')
		question: 'Select all the letters that make the sound "k".',
		order: 3,
	},
	{
		id: 4,
		lessonId: 1, // references 'Lesson 1: Introduction to Biblical Hebrew Alphabet'
		type: 'ASSIST' as const, // Use one of the enum values ('SELECT' or 'ASSIST')
		question: 'Which letter represents the sound "sh"?',
		order: 4,
	},
];
