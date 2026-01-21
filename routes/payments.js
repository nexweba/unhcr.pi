import express from "express";
import axios from "axios";

const router = express.Router();

const PI_API = "https://api.minepi.com";
const PI_API_KEY = process.env.PI_API_KEY;

const headers = {
  Authorization: `Key ${PI_API_KEY}`,
  "Content-Type": "application/json",
};

// ONE endpoint that Pi payments actually need
router.post("/process", async (req, res) => {
  const { paymentId, txid } = req.body;

  if (!paymentId) {
    return res.status(400).json({ error: "Missing paymentId" });
  }

  try {
    // 1️⃣ APPROVE
    await axios.post(
      `${PI_API}/v2/payments/${paymentId}/approve`,
      {},
      { headers }
    );

    // 2️⃣ COMPLETE (txid is optional on testnet)
    await axios.post(
      `${PI_API}/v2/payments/${paymentId}/complete`,
      { txid: txid || "testnet-tx" },
      { headers }
    );

    res.json({ success: true });
  } catch (err) {
    console.error(
      "Payment processing error:",
      err.response?.data || err.message
    );
    res.status(500).json({ error: "Payment processing failed" });
  }
});

export default router;
