import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

const prisma = new PrismaClient();

// GET /api/clients

const getUserClients = async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      where: {
        userId: req.userId,
      },
    });
    res.json(clients);
  } catch (error) {
    res.json(error);
  }
};

router.get("/", getUserClients);

export default router;
