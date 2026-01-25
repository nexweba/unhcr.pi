import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/fix", async (req, res) => {
  const paymentId = "WcJGtWP8joFyy5jGJArsNkw6MZfz"; // stuck payment

  try {
    const response = await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Key ${process.env.PI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      success: true,
      message: "✅ Payment cancelled successfully",
      data: response.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ Failed to cancel payment",
      error: error.response?.data || error.message,
    });
  }
});

export default router;
