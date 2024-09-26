// This is a module exporting an array of challenge objects
export const challenge_1 = [
	{
		id: 1,
		lessonId: 1, // references 'Lesson 1: Introduction to Biblical Hebrew Alphabet'
		type: 'SELECT' as const, // Use one of the enum values ('SELECT' or 'ASSIST')
		question:
			'What is the correct pronunciation for the Hebrew letter "א" (Aleph)?',
		order: 1,
	},
	// You can add more challenges here
];
