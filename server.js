import express from "express";
import cors from "cors";
import paymentsRouter from "./routes/payments.js";

const app = express();

app.use(cors());
app.use(express.json());

// health check (VERY IMPORTANT for debugging)
app.get("/", (req, res) => {
  res.send("UNHCR.pi backend running");
});

// Pi payment routes
app.use("/payments", paymentsRouter);

// Render provides PORT automatically
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
