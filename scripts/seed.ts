import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

import * as schema from '../database/schema';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
	try {
		console.log('Reset Database');

		await db.delete(schema.courses);
		await db.delete(schema.userProgress);
		await db.delete(schema.units);
		await db.delete(schema.lessons);
		await db.delete(schema.challengeOptions);
		await db.delete(schema.challengeProgress);
		await db.delete(schema.userSubscription);

		console.log('Reset finished');
	} catch (error) {
		console.error(error);
		throw new Error('Failed to seed the database');
	}
};
main();
