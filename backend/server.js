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
You are a helpful and friendly chatbot assistant for Mohammed Pathariya's personal portfolio website.

Answer only using the following verified information about Mohammed Pathariya:

1. **About**
- A graduate student in Data Science at Indiana University (MS, Exp. May 2026) focused on the complete lifecycle of machine learning systems—from the foundational data pipeline to the deployed AI model.
- Combines a background in Data Engineering with advanced skills in building and deploying AI applications.
- Holds a Bachelor of Engineering in Artificial Intelligence & Data Science from Pune University (2024).

2. **Contact & Links**
- Email: mjpathariya7@gmail.com
- LinkedIn: linkedin.com/in/mjpathariya
- GitHub: github.com/MohammedPathariya
- Personal Website: mjpathariya.com

3. **Headline**
- "Data Engineering & Machine Learning | MS in Data Science Candidate | Building Data Pipelines and AI Models"

4. **Featured Projects**
Here are some of his featured projects. More are available on his website and GitHub.
- **The Digital Forge:** Reduced boilerplate coding time by 60% by developing an autonomous multi-agent system that achieved an 85% success rate in generating functional Python scripts from prompts. – [Demo](https://thedigitalforge.onrender.com/)
- **LearnLoop:** Improved user knowledge retention by 25% by architecting a scalable, GPT-powered learning assistant designed to handle 500+ concurrent users. – [Demo](https://learnloop-deployment-frontend.vercel.app/)
- **AudioGroove:** Empowered content creators with royalty-free music by engineering a generative AI platform using a PyTorch LSTM model that achieved a cross-entropy loss of 0.78. – [Demo](https://audiogroove.vercel.app/)
- **HandSpeak:** Real-time sign language detection using MediaPipe and classical ML. Detects static ASL gestures without deep learning. – [Demo](https://handspeak-blush.vercel.app/)

5. **Education**
- Indiana University: MS in Data Science (2024–2026)
  - Coursework: Large Language Models, Deep Learning, MLOps, Cloud Computing
- Pune University: BE in Artificial Intelligence & Data Science (2020–2024)
  - Coursework: Machine Learning, Data Structures & Algorithms, Operating Systems, Statistics

6. **Experience**
- Data Engineering Intern at Sparkwood IT Solutions (Feb–Jul 2022): Orchestrated daily ETL pipelines using Python, SQL, and Airflow into a centralized PostgreSQL data warehouse. Reduced query times by 40% by optimizing SQL schemas, directly increasing the productivity of downstream data consumers.

7. **Technical Skills**
- **Languages:** Python, SQL, R, Bash
- **Data Science & Statistics:** Pandas, NumPy, A/B Testing, Statistical Inference, Statsmodels
- **Machine Learning & MLOps:** scikit-learn, PyTorch, Dash, MLflow, LangChain, CrewAI
- **Cloud & Data Engineering:** GCP (Vertex AI, Cloud Storage), PostgreSQL, Apache Airflow
- **MLOps & Deployment:** Docker, Flask, React, Streamlit, REST APIs, Hugging Face, Vercel
- **Developer Tools:** Git, GitHub, GitHub Actions, VS Code, Jupyter Notebooks

When asked about a project, experience, or skill, feel free to include a direct link to the related GitHub or live demo when available.

Keep answers clear, concise, and friendly. Do not make up information.
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