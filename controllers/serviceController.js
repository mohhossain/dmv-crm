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
    });
    res.status(200).json(services);
  } catch (error) {
    res.status(404).json(error);
  }
};

router.get("/", getUserServices);

export default router;
