import {
  createTaskModel,
  getTasksByUserId,
  getTaskByIdModel,
  updateTaskModel,
  deleteTaskModel,
} from "../models/task.model.js";

// Create Task
export const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      status,
      priority,
      due_date,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const taskStatus = status || "pending";
    const taskPriority = priority || "medium";
    const taskDueDate = due_date || null;
    const taskDescription = description || null;

    const task = await createTaskModel({
      title,
      description: taskDescription,
      status: taskStatus,
      priority: taskPriority,
      due_date: taskDueDate,
      user_id: req.userId,
    });

    res.status(201).json({
      message: "Task created successfully",
      task: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        due_date: task.dueDate,
        user_id: task.userId,
        created_at: task.createdAt,
      },
    });
  } catch (error) {
    console.error("Create task error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get All Tasks
export const getTasks = async (req, res) => {
  try {
    const tasks = await getTasksByUserId(req.userId);

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    console.error("Get tasks error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Get Single Task
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await getTaskByIdModel(
      id,
      req.userId
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      task,
    });
  } catch (error) {
    console.error("Get task error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Update Task
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      status,
      priority,
      due_date,
    } = req.body;

    // Check whether task belongs to logged-in user
    const existingTask = await getTaskByIdModel(
      id,
      req.userId
    );

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await updateTaskModel(
      id,
      req.userId,
      {
        title,
        description: description || null,
        status,
        priority,
        due_date: due_date || null,
      }
    );

    res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error("Update task error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// Delete Task
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await deleteTaskModel(
      id,
      req.userId
    );

    // Prisma returns `count`, not `affectedRows`
    if (result.count === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};