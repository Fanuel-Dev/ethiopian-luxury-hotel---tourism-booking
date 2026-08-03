import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// In-memory simple store to simulate real-time bookings & wishlist
const bookings: any[] = [];
const wishlist: string[] = [];

// Initialize Gemini Client with correct User-Agent for AI Studio
const apiKey = process.env.GEMINI_API_KEY;

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

// AI Travel Assistant endpoint
app.post("/api/ai-assistant", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!ai) {
      // Graceful fallback if API key is missing
      return res.json({
        text: "Selam! I am 'Buna', your Ethiopian Luxury Travel Assistant. (Note: The GEMINI_API_KEY is not configured in the Secrets panel, so I am running in local offline concierge mode). Ethiopia is the land of origins, featuring Lalibela's 12th-century stone churches, Simien mountains peaks, and rich cultural coffee ceremonies. How may I assist you with your luxury booking today?"
      });
    }

    // System instruction for Buna
    const systemInstruction = `You are 'Buna' (named after the sacred Ethiopian Coffee Ceremony), a world-class luxury Ethiopian hospitality and travel assistant. 
You speak with warm, authentic, and premium Ethiopian poise, representing the prestigious 'Land of Origins' luxury hotel and tour group.
Your goals are:
- Welcoming guests with the authentic greetings (e.g. "Selam", "Tena Yistilign") and guiding them to create custom, luxurious itineraries in Ethiopia.
- Elaborate poetically and professionally about featured destinations like Lalibela (spiritual stone-carvings), Gondar (castles), Bahir Dar (Lake Tana and Blue Nile), Axum (Stelae), Simien Mountains (trekking and rare Gelada baboons), Harar (medieval Jugol walls and hyena feeding), and the Danakil Depression.
- Suggest premium local experiences: authentic Coffee Ceremonies, traditional music (Azmari), and gourmet Habesha cuisine (Doro Wat, Injera, Kitfo, Tibs, Shiro, and Tej honey wine).
- Highlight the luxury accommodations: the Entoto Presidential Suite, the Traditional Habesha Royal Suite, and Rift Valley Family Villas.
- Tailor your replies to the user's preferred language (English, Amharic, French, Arabic, etc.). Be respectful, highly informative, and luxurious in your phrasing. Avoid any dry or generic responses. Keep answers structured and clean.`;

    // Format chat history for Gemini API
    // Gemini chat API uses role: 'user' or 'model'
    const formattedHistory = (history || []).map((msg: any) => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    // Generate content using gemini-3.5-flash
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      history: formattedHistory,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const response = await chat.sendMessage({ message });
    res.json({ text: response.text });

  } catch (error: any) {
    console.error("AI Assistant Error:", error);
    res.status(500).json({ error: "Failed to generate AI response: " + error.message });
  }
});

// Bookings API
app.post("/api/bookings", (req, res) => {
  const { bookingType, details } = req.body;
  const newBooking = {
    id: "BK-" + Math.floor(100000 + Math.random() * 900000),
    bookingType,
    details,
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };
  bookings.push(newBooking);
  res.status(201).json(newBooking);
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

// Wishlist API
app.post("/api/wishlist", (req, res) => {
  const { id } = req.body;
  if (!wishlist.includes(id)) {
    wishlist.push(id);
  }
  res.json({ wishlist });
});

app.get("/api/wishlist", (req, res) => {
  res.json(wishlist);
});

// Setup Vite Dev Server / Static files production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Ethiopian Luxury Booking Server running on http://localhost:${PORT}`);
  });
}

startServer();
