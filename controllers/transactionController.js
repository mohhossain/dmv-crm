import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

const getUserTransactions = async (req, res) => {
  console.log("Getting user transactions");
  //   find all the transactions from the jobs that belong to the user and send it as one array
  try {
    const jobs = await prisma.job.findMany({
      where: { userId: req.body.userId },
      select: {
        id: true,
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        service: {
          select: {
            id: true,
            name: true,
          },
        },
        Payment: true,

        
      },
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(404).json(error);
  }
};

router.get("/", getUserTransactions);

export default router;
