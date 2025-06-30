import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors({
  origin: ['https://news-monkey-amber-chi.vercel.app']
}));
 // Enable CORS

const NEWS_API_KEY = "672ec8f404774ace8d4976c0b9e2bb43";

app.get("/news", async (req, res) => {
  const { country, category, page, pageSize } = req.query;
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});