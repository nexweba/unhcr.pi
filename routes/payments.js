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

  if (!paymentId) return res.status(400).json({ error: "Missing paymentId" });

  try {
    // ✅ Check current payment status first
    const { data: paymentStatus } = await axios.get(`${PI_API}/v2/payments/${paymentId}`, { headers });

    // Approve only if not yet approved
    if (!paymentStatus.status.developer_approved) {
      await axios.post(`${PI_API}/v2/payments/${paymentId}/approve`, {}, { headers });
    }

    // Complete payment (txid optional on testnet)
    if (!paymentStatus.status.developer_completed) {
      await axios.post(`${PI_API}/v2/payments/${paymentId}/complete`, { txid: txid || "testnet-tx" }, { headers });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Payment processing error:", err.response?.data || err.message);
    res.status(500).json({ error: "Payment processing failed" });
  }
});

export default router;
