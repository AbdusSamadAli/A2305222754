import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from "@mui/material";
import { log } from "../logger";

const UrlStatsPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("shortenedUrls");
      if (stored) {
        setData(JSON.parse(stored));
        log("frontend", "info", "url-stats", "Loaded stats from localStorage");
      } else {
        log("frontend", "warn", "url-stats", "No data found in localStorage");
      }
    } catch (err) {
      log("frontend", "error", "url-stats", "Failed to parse localStorage stats");
    }
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom>
          Shortened URLs Stats
        </Typography>

        {data.length === 0 ? (
          <Typography>No shortened URLs found in localStorage.</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Original URL</TableCell>
                  <TableCell>Short URL</TableCell>
                  <TableCell>Custom Code</TableCell>
                  <TableCell>Validity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{item.originalUrl}</TableCell>
                    <TableCell>
                      <a href={item.shortUrl} target="_blank" rel="noopener noreferrer">
                        {item.shortUrl}
                      </a>
                    </TableCell>
                    <TableCell>{item.customCode || "-"}</TableCell>
                    <TableCell>{item.validityDays || "Default"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default UrlStatsPage;