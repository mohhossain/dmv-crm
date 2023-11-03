// In your Prisma seed file (e.g., seed.ts)
import { PrismaClient } from "@prisma/client";
import clients from "./clientData.js";
const prisma = new PrismaClient();

async function seed() {
  try {

    for (const client of clients) {
      await prisma.client.create({
        data: client,
      });
    }

    console.log("Seed data for clients has been inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
