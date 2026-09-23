import prisma from "./prisma.js";

const testDatabaseConnection = async () => {
  try {
    await prisma.$connect();

    console.log("PostgreSQL database connected successfully");
  } catch (error) {
    console.error("PostgreSQL connection failed:", error.message);
    process.exit(1);
  }
};

export { testDatabaseConnection };