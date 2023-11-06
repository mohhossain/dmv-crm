import express from "express";
import { PrismaClient } from "@prisma/client";
import e from "express";

const router = express.Router();
const prisma = new PrismaClient();

const getUserJobs = async (req, res) => {
  console.log("Getting user jobs");
  try {
    const jobs = await prisma.job.findMany({
      where: {
        userId: req.body.userId,
      },
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
        isPending: true,
        Payment: true,
        createdAt: true,
      },
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(404).json(error);
  }
};
router.get("/", getUserJobs);

const addNewJob = async (req, res) => {
  try {
    console.log(req.body);
    // find client
    const client = await prisma.client.findUnique({
      where: {
        id: parseInt(req.body.clientId),
      },
    });

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    console.log("Posting new job");
    const job = await prisma.job.create({
      data: {
        clientId: client.id,
        serviceId: parseInt(req.body.serviceId),
        isPending: true,
        userId: req.body.userId,
        // create payment and add paymentId to job
        Payment: {
          create: {
            amount: parseFloat(req.body.amount),
            isPaid: false,
          },
        },
      },
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
        isPending: true,
        Payment: true,
        createdAt: true,
      },
    });
    res.status(201).json(job);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

router.post("/", addNewJob);

export default router;
