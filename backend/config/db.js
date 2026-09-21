import prisma from "./prisma.js";

const testDatabaseConnection = async () => {
  try {
    await prisma.$connect();

    console.log("MySQL database connected successfully");
  } catch (error) {
    console.error("MySQL connection failed:", error.message);
    process.exit(1);
  }
};

export { testDatabaseConnection };