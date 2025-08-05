require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
cors({ origin: "http://localhost:5174", methods: "POST" });
app.post("/log", async (req, res) => {
  const payload = req.body;

  try {
    const fetch = (await import("node-fetch")).default;
    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + process.env.TOKEN
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.error("Server log error:", err.message);
    return res.status(500).json({ error: "Failed to log" });
  }
});

app.listen(4000, () => {
  console.log("Logger middleware running on http://localhost:4000");
});
