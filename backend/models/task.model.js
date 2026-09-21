import prisma from "../config/prisma.js";

// Create task
export const createTaskModel = async ({
  title,
  description,
  status,
  priority,
  due_date,
  user_id,
}) => {
  return await prisma.task.create({
    data: {
      title,
      description,
      status,
      priority,
      dueDate: due_date,
      userId: Number(user_id),
    },
  });
};

// Get all tasks for a user
export const getTasksByUserId = async (userId) => {
  return await prisma.task.findMany({
    where: {
      userId: Number(userId),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get one task by ID
export const getTaskByIdModel = async (taskId, userId) => {
  return await prisma.task.findFirst({
    where: {
      id: Number(taskId),
      userId: Number(userId),
    },
  });
};

// Update task
export const updateTaskModel = async (
  taskId,
  userId,
  {
    title,
    description,
    status,
    priority,
    due_date,
  }
) => {
  return await prisma.task.updateMany({
    where: {
      id: Number(taskId),
      userId: Number(userId),
    },
    data: {
      title,
      description,
      status,
      priority,
      dueDate: due_date,
    },
  });
};

// Delete task
export const deleteTaskModel = async (taskId, userId) => {
  return await prisma.task.deleteMany({
    where: {
      id: Number(taskId),
      userId: Number(userId),
    },
  });
};