import express from "express";
import axios from "axios";

const router = express.Router();

const PI_API = "https://api.minepi.com";
const PI_API_KEY = process.env.PI_API_KEY;

const headers = {
  Authorization: `Key ${PI_API_KEY}`,
  "Content-Type": "application/json"
};

// STEP 8b — approve payment
router.post("/approve", async (req, res) => {
  const { paymentId } = req.body;

  try {
    await axios.post(
      `${PI_API}/v2/payments/${paymentId}/approve`,
      {},
      { headers }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Approve error:", err.response?.data || err.message);
    res.status(500).json({ error: "Approval failed" });
  }
});

// STEP 8d — complete payment
router.post("/complete", async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    await axios.post(
      `${PI_API}/v2/payments/${paymentId}/complete`,
      { txid },
      { headers }
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Complete error:", err.response?.data || err.message);
    res.status(500).json({ error: "Completion failed" });
  }
});

export default router;
