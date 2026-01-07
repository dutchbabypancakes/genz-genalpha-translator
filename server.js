import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["POST"]
}));
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // your Groq API key in env
    baseURL: "https://api.groq.com/openai/v1",
});

app.post("/translate", async (req, res) => {
    const { text } = req.body.text;
    if (!text) return res.status(400).json({ error: "No text provided" });

    try {
        const response = await client.responses.create({
            model: "openai/gpt-oss-20b",
            input: `
Translate this phrase with Gen Z slang into proper english, without changing the meaning of the phrase:

"${text}"
`,
        });

        // Groq Responses API returns `output_text` for simple use
        const translated = response.output_text || "No translation returned";
        res.json({ translated });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error when translating text" });
    }
});

app.listen(3001, () =>
    console.log(`Server running on http://localhost:${3001}`)
);//backend port = 3001
