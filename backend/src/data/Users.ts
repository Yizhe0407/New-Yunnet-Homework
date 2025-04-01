// src/data/users.ts
import { PrismaClient } from '../../prisma/generated/client'

const prisma = new PrismaClient();

export const findUser = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const findUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
  })
};

export const createUser = async (name: string, email: string, password: string) => {
  return await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
};