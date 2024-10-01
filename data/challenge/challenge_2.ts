export const challenge_2 = [
	{
		id: 5,
		lessonId: 2, // references 'Lesson 2: Hebrew Vowels and Pronunciation'
		type: 'SELECT' as const, // Use one of the enum values ('SELECT' or 'ASSIST')
		question: 'Which vowel is represented by the "Patach"?',
		order: 1,
	},
	{
		id: 6,
		lessonId: 2, // references 'Lesson 2: Hebrew Vowels and Pronunciation'
		type: 'SELECT' as const, // Use one of the enum values ('SELECT' or 'ASSIST')
		question: 'What is the pronunciation of "Kamatz"?',
		order: 2,
	},
	{
		id: 7,
		lessonId: 2, // references 'Lesson 2: Hebrew Vowels and Pronunciation'
		type: 'ASSIST' as const, // Use one of the enum values ('SELECT' or 'ASSIST')
		question: 'Which vowel is used in the word "Shalom"?',
		order: 3,
	},
	{
		id: 8,
		lessonId: 2, // references 'Lesson 2: Hebrew Vowels and Pronunciation'
		type: 'SELECT' as const, // Use one of the enum values ('SELECT' or 'ASSIST')
		question: 'Select the vowel that produces a long "e" sound.',
		order: 4,
	},
];
