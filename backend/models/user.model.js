import { db } from "../config/db.js";

// Find user by email
export const findUserByEmail = async (email) => {
  const [users] = await db.query(
    `SELECT *
     FROM users
     WHERE email = ?`,
    [email]
  );

  return users[0];
};

// Find user by ID
export const findUserById = async (id) => {
  const [users] = await db.query(
    `SELECT id, name, email, created_at
     FROM users
     WHERE id = ?`,
    [id]
  );

  return users[0];
};

// Create new user
export const createUser = async (name, email, password) => {
  const [result] = await db.query(
    `INSERT INTO users
     (name, email, password)
     VALUES (?, ?, ?)`,
    [name, email, password]
  );

  return result.insertId;
};