import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

import * as schema from '../database/schema';
import { lesson_1 } from '@/data/lessons/lesson_1';

import { courses } from '@/data/course/course';
import { units } from '@/data/units/units';

import { challenge_1 } from '@/data/challenge/challenge_1';
import { challenge_option_1 } from '@/data/chalengeOption/challenge_option_1';

import { challenge_2 } from '@/data/challenge/challenge_2';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
	try {
		console.log('Seeding Database');

		await db.delete(schema.courses);
		await db.delete(schema.userProgress);
		await db.delete(schema.units);
		await db.delete(schema.lessons);
		await db.delete(schema.challengeOptions);
		await db.delete(schema.challengeProgress);

		await db.insert(schema.courses).values(courses);
		await db.insert(schema.units).values(units);

		await db.insert(schema.lessons).values(lesson_1);

		await db.insert(schema.challenges).values(challenge_1);
		await db.insert(schema.challenges).values(challenge_2);

		await db.insert(schema.challengeOptions).values(challenge_option_1);

		console.log('Seeding finished');
	} catch (error) {
		console.error(error);
		throw new Error('Failed to seed the database');
	}
};
main();
