import express from "express";

const app = express();
const API_KEY = "10837082db8eeff18facc970f9e775f7";
const URL = "https://api.jotform.com/";
const FORM_ID = "232915479006156";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5555, () => {
  console.log("Listening on port 5555");
});
