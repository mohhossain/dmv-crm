import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();

const postNewNote = async (req, res) => {
  try {
    const note = await prisma.note.create({
      data: {
        note: req.body.note,
        userId: req.body.userId,
        jobId: req.body.jobId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.status(200).json(note);
  } catch (error) {
    res.status(404).json(error);
  }
};

router.post("/", postNewNote);

export default router;
