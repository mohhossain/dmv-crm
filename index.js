import express from "express";
import authroutes from "./controllers/authController.js";
import cors from "cors";
import verify from "./controllers/verifyToken.js";
import clientRoutes from "./controllers/clientController.js";
import { getLoggedInUser } from "./controllers/verifyToken.js";
import jobRoutes from "./controllers/jobController.js";
import serviceRoutes from "./controllers/serviceController.js";
import trasactionRoutes from "./controllers/transactionController.js";
import noteRoutes from "./controllers/noteController.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authroutes);
app.use(verify);
app.use("/api/user", getLoggedInUser);
app.use("/api/clients", clientRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/transactions", trasactionRoutes);
app.use("/api/notes", noteRoutes);

app.listen(5555, () => {
  console.log("Listening on port 5555");
});
