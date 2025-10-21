import express from "express";
import fetch from "node-fetch";

const app = express();

/* 🟩🟩🟩 PASTE YOUR GOOGLE CREDENTIALS BELOW 🟩🟩🟩
 * Example:
 * const API_KEY = "AIzaSyYourRealApiKeyHere";
 * const CX = "yourcxidhere:abc123";
 */
const API_KEY = "AIzaSyBlihkkesV-hLaUGrXUYpCFQHf9I3BQNZ8";
const CX = "90ab4d068d51749af";
/* 🟩🟩🟩 END OF CREDENTIALS 🟩🟩🟩 */

app.get("/Gsearch", async (req, res) => {
  const q = req.query.q;
  try {
    const r = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX}&searchType=image&q=${encodeURIComponent(q)}`
    );
    const data = await r.json();

    if (data.items && data.items.length > 0) {
      // ✅ Return only the first image URL
      res.send(data.items[0].link);
    } else {
      // 🖼️ fallback image if nothing found
      res.send("https://source.unsplash.com/800x600/?notfound");
    }
  } catch (err) {
    console.error(err);
    // 🛑 fallback image if API error
    res.send("https://source.unsplash.com/800x600/?error");
  }
});

// ✅ Listen on Render's assigned port
app.listen(process.env.PORT || 3000, () => console.log("API running"));