import express from "express";
import authroutes from "./controllers/authController.js";
import cors from "cors";
import verify from "./controllers/verifyToken.js";
import clientRoutes from "./controllers/clientController.js";
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

app.use("/api/clients", clientRoutes);

app.listen(5555, () => {
  console.log("Listening on port 5555");
});
