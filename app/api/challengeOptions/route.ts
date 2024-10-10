import { db } from '@/database/drizzle';
import { challengeOptions } from '@/database/schema';
import { isAdmin } from '@/lib/admin';
import { NextResponse } from 'next/server';

export const GET = async () => {
	try {
		if (!isAdmin()) {
			return new NextResponse('Unauthorized', { status: 403 });
		}

		const data = await db.query.challengeOptions.findMany();
		return NextResponse.json(data);
	} catch (error) {
		console.error('Error fetching courses:', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
};

export const POST = async (req: Request) => {
	try {
		if (!isAdmin()) {
			return new NextResponse('Unauthorized', { status: 403 });
		}

		const body = await req.json();

		const data = await db
			.insert(challengeOptions)
			.values({
				...body,
			})
			.returning();

		return NextResponse.json(data[0]);
	} catch (error) {
		console.error('Error creating course:', error);
		return new NextResponse('Internal Server Error', { status: 500 });
	}
};
