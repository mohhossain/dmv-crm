import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

const getUserServices = async (req, res) => {
  console.log("Getting user services");
  try {
    const services = await prisma.service.findMany({
      where: {
        userId: req.body.userId,
      },
      include: {
        // count of jobs for each service
        Job: {
          select: {
            id: true,
          },
        },
      },
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(404).json(error);
  }
};

const addNewService = async (req, res) => {
  try {
    console.log(req.body);
    console.log("Posting new service");
    const service = await prisma.service.create({
      data: {
        name: req.body.name,
        userId: req.body.userId,
        price: req.body.price,
      },
    });
    res.status(201).json(service);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

router.get("/", getUserServices);
router.post("/", addNewService);

export default router;
