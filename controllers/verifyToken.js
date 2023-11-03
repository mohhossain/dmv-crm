import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, "supersecret");
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
}

export default verifyToken;
