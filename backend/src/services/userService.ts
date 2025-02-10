import { PrismaClient } from '@prisma/client';
import { User } from '../../../shared/types/user';

const prisma = new PrismaClient();

export async function getAllUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany({
      include: {
        color: true,
      },
    });
    return users.map((user) => ({
      ...user,
      created_at: user.created_at.toISOString(),
      updated_at: user.updated_at.toISOString(),
      hashed_password: undefined,
      color: user.color,
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}
