import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Grid } from "@mui/material";
import { log } from "../logger";

export default function UrlShortener() {
  const [inputs, setInputs] = useState([{ url: "", validity: "", shortcode: "" }]);

  const handleChange = (index, field, value) => {
    const updated = [...inputs];
    updated[index][field] = value;
    setInputs(updated);
  };

  const addInput = () => {
    if (inputs.length < 5) {
      setInputs([...inputs, { url: "", validity: "", shortcode: "" }]);
    }
  };

  const handleSubmit = async () => {
    const results = [];

    for (const input of inputs) {
      if (!input.url.trim()) continue;

      const shortcode = input.shortcode?.trim() || Math.random().toString(36).substring(2, 8);
      const shortenedUrl = `http://localhost:5174/${shortcode}`;

      const result = {
        originalUrl: input.url.trim(),
        shortUrl: shortenedUrl,
        customCode: shortcode,
        validityDays: input.validity || "∞",
        createdAt: new Date().toISOString(),
      };

      results.push(result);

      try {
        await log("frontend", "info", "shortener", `Shortened ${input.url} to ${shortenedUrl}`);
      } catch (err) {
        await log("frontend", "error", "shortener", `Error logging ${input.url}`);
      }
    }

    localStorage.setItem("shortenedUrls", JSON.stringify(results));
    alert("URLs processed and saved to stats.");
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>

      {inputs.map((input, idx) => (
        <Paper key={idx} sx={{ padding: 2, marginBottom: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Original URL"
                value={input.url}
                onChange={(e) => handleChange(idx, "url", e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <TextField
                fullWidth
                label="Validity (days)"
                value={input.validity}
                onChange={(e) => handleChange(idx, "validity", e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                fullWidth
                label="Custom Shortcode"
                value={input.shortcode}
                onChange={(e) => handleChange(idx, "shortcode", e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button variant="outlined" sx={{ mr: 2 }} onClick={addInput} disabled={inputs.length >= 5}>
        Add Another
      </Button>
      <Button variant="contained" onClick={handleSubmit}>
        Shorten All
      </Button>
    </Box>
  );
}