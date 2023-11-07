import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();

const prisma = new PrismaClient();

// GET /api/clients

const getUserClients = async (req, res) => {
  try {
    console.log("fething clients");
    const clients = await prisma.client.findMany({
      where: {
        userId: req.body.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        userId: true,
        // also return the last job for each client
        Job: {
          select: {
            id: true,
            createdAt: true,
            service: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(clients);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

router.get("/", getUserClients);

const addNewClient = async (req, res) => {
  try {
    const client = await prisma.client.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        userId: req.body.userId,
      },
    });
    res.status(201).json(client);
  } catch (error) {
    // res.json(error);
    console.log(error);
    res.status(400).json(error);
  }
};

router.post("/", addNewClient);
export default router;
