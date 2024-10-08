import { auth } from '@clerk/nextjs/server';

const allowedIds = ['user_2mreaOLiDfmi8WLjp2UUqpzS5Va'];
export const getIsAdmin = async () => {
	const { userId } = auth();

	if (!userId) return false;

	return allowedIds.indexOf(userId) !== -1;
};
