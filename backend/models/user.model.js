import prisma from "../config/prisma.js";

// Find user by email
export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// Find user by ID
export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
};

// Create new user
export const createUser = async (name, email, password) => {
  return await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
};