import express from "express";
import routes from "./routes/tasks.js";
import { db_connection } from "./cofig/db/dbConnection.js";

const app = express();
const PORT = 5000;
await db_connection();

app.use(express.json());
app.use("/api/v1/tasks", routes);
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
