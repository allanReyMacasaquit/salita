import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';

import * as schema from '../database/schema';

config({ path: '.env.local' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
	try {
		console.log('Seeding Database');

		await db.delete(schema.courses);
		await db.delete(schema.userProgress);

		await db.insert(schema.courses).values([
			{
				id: 1,
				title: 'Filipino',
				imageSrc: './images/flags/PH.svg',
			},
			{
				id: 2,
				title: 'Dutch',
				imageSrc: './images/flags/CH.svg',
			},
			{
				id: 3,
				title: 'German',
				imageSrc: './images/flags/DE.svg',
			},
			{
				id: 4,
				title: 'Italian',
				imageSrc: './images/flags/IE.svg',
			},
			{
				id: 5,
				title: 'Jewish',
				imageSrc: './images/flags/IL.svg',
			},
			{
				id: 6,
				title: 'Arabic',
				imageSrc: './images/flags/UAE.svg',
			},
			{
				id: 7,
				title: 'English',
				imageSrc: './images/flags/US.svg',
			},
		]);

		console.log('Seeding finished');
	} catch (error) {
		console.error(error);
		throw new Error('Failed to seed the database');
	}
};
main();
