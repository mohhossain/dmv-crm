import jwt from "jsonwebtoken";
import express from "express";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const router = express.Router();
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, "supersecret");
    req.body.userId = decoded.id;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
}

export const getLoggedInUser = async (req, res) => {
  try {
    console.log("fething user");
    const user = await prisma.user.findUnique({
      where: {
        id: req.body.userId,
      },
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

router.get("/me", getLoggedInUser);

export default verifyToken;
