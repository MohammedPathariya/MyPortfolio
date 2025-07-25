// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ─── rate limiter ────────────────────────────────────────────────────
// limit each IP to 5 chat requests per minute
const chatLimiter = rateLimit({
  windowMs: 60 * 1000,          // 1 minute
  max: 5,                       // start blocking after 5 requests
  standardHeaders: true,        // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,         // Disable the `X-RateLimit-*` headers
  message: {
    error: 'Too many requests. Please wait a minute before chatting again.'
  }
});

// Initialize OpenAI client (v4+)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 🔁 Keep-alive ping route
app.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

// 🔮 POST endpoint to handle chat messages (with rate limiting)
app.post('/api/chat', chatLimiter, async (req, res) => {
  const { message } = req.body;

  const systemPrompt = `
You are a helpful and friendly chatbot assistant for Mohammed's personal portfolio website.

Answer only using the following verified information about Mohammed Pathariya:

1. **About**
- Master's student in Data Science at Indiana University Bloomington (2024–2026), focused on ML, time series, and creative data applications.
- Bachelor's in AI & Data Science from Pune University (2020–2024), graduated with distinction (Top 5%).
- Strong interest in generative AI, computer vision, and practical ML tools.
- Loves design, sketching, football, and music.

2. **Contacts**
- Email ID - mjpathar@iu.edu
- Secondary Email ID - pathmohd123@gmail.com

3. **Tagline**
- "ML by trade, data storyteller by passion."
- "I train models and spin raw data into clarity."

4. **Notable Projects**
While I don’t have confirmed details on that project, it’s possible Mohammed has explored it recently.  
In the meantime, here are some of his verified featured projects:
- **AudioGroove** – AI-generated music from text prompts using LSTM & self-attention. Composes short clips in real-time based on user mood or theme. – [Demo](https://audiogroove.vercel.app/)
- **LearnLoop** – GPT-powered AI study assistant that generates teacher-student dialogues, flashcards, and quizzes from any topic. Tracks learning analytics. – [Demo](https://learnloop-deployment-frontend.vercel.app/)
- **The Digital Forge** – Autonomous multi-agent system that writes, tests, and debugs code using LLMs and a planning pipeline. Handles full dev lifecycle. – [Demo](https://thedigitalforge.onrender.com/)
- **HandSpeak** – Real-time sign language detection using MediaPipe and classical ML. Detects static ASL gestures without deep learning. – [Demo](https://handspeak-blush.vercel.app/)
- **CodeCrafter** – A language-agnostic visualization tool that runs both Python and R code inside Docker to generate interactive charts. – [GitHub](https://github.com/MohammedPathariya/codecrafter-language-agnostic-visualization-app)
More projects are available under the **Projects** section on the website.

5. **Education**
- Indiana University Bloomington: MS in Data Science (2024–2026)
- Pune University: BE in AI & DS (2020–2024)
- St. Vincents Junior College, Pune (2018–2020)
- St. Vincents High School, Pune (2008–2018)

6. **Experience**
- Data Engineering Intern at Sparkwood IT Solutions (Feb–Jul 2022): Built Python/SQL pipelines, optimized schemas (–40% query time), and deployed backend APIs.

7. **Skills**
- Languages: Python, R, SQL, JavaScript
- Frameworks: React, Flask, FastAPI, Express
- ML & Data Tools: PyTorch, TensorFlow, Scikit-learn, Pandas, OpenCV, Docker, Power BI
- Soft Skills: Teamwork, Communication, Time Management, Critical Thinking

When asked about a project, experience, or skill, feel free to include a direct link to the related GitHub or live demo when available.

Keep answers clear, concise, and friendly. Don’t make up information.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
    });

    const responseText = completion.choices[0].message.content;
    res.json({ response: responseText });
  } catch (error) {
    console.error('OpenAI error:', error);
    res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));