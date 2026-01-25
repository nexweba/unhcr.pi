import express from "express";
import axios from "axios";

const router = express.Router();

const PI_API = "https://api.minepi.com";
const PI_API_KEY = process.env.PI_API_KEY;

const headers = {
  Authorization: `Key ${PI_API_KEY}`,
  "Content-Type": "application/json",
};

// 🔥 OFFICIAL Pi payment processor
router.post("/process", async (req, res) => {
  const { paymentId, txid } = req.body;

  if (!paymentId) {
    return res.status(400).json({ error: "Missing paymentId" });
  }

  try {
    // 1️⃣ Get payment status
    const { data: payment } = await axios.get(
      `${PI_API}/v2/payments/${paymentId}`,
      { headers }
    );

    // 2️⃣ Approve ONLY if not approved
    if (!payment.status.developer_approved) {
      await axios.post(
        `${PI_API}/v2/payments/${paymentId}/approve`,
        {},
        { headers }
      );
    }

    // 3️⃣ Complete ONLY if not completed
    if (!payment.status.developer_completed) {
      await axios.post(
        `${PI_API}/v2/payments/${paymentId}/complete`,
        { txid: txid || "testnet-tx" },
        { headers }
      );
    }

    return res.json({ success: true });

  } catch (err) {
    console.error("Pi payment error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Payment processing failed" });
  }
});

export default router;
