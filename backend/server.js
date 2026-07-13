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
- An AI Engineer and MS in Data Science candidate at Indiana University Bloomington (Exp. May 2026) specializing in agentic AI systems, LLM pipelines, and HPC-scale NLP.
- Builds production-grade multi-agent systems, RAG pipelines, and transformer-based predictive models.
- Holds a Bachelor of Engineering in Artificial Intelligence & Data Science from Savitribai Phule Pune University (2020-2024), graduated with Distinction.

2. **Contact & Links**
- Email: mjpathariya7@gmail.com
- LinkedIn: linkedin.com/in/mjpathariya
- GitHub: github.com/MohammedPathariya
- Personal Website: mjpathariya.com

3. **Headline**
- "AI Engineer building agentic AI systems and LLM pipelines — from multi-agent orchestration to HPC-scale NLP."

4. **Experience**

- **Graduate Research Assistant — Indiana University Luddy School (Jan 2026 – May 2026)**
  Built a complete alignment-free HIV diagnostic pipeline on NVIDIA Jetson AGX Orin, replacing Minimap2 alignment with a custom k-mer voting classifier achieving under 1 second per sample on CPU vs. 10-20 minutes with traditional tools. Validated against 43,000+ clinical sequences from Stanford HIVdb across 10+ HIV subtypes, achieving 97.5-99.7% recall with all per-mutation Fisher exact tests significant at p < 0.001.

- **Graduate Research Assistant — Indiana University Kelley School of Business (Jun 2025 – Jan 2026)**
  Built an end-to-end NBA press conference pipeline processing 700+ games, parallelizing WhisperX transcription across 5 Slurm-managed HPC nodes with SQLite file-locking, achieving a 30x speedup (3.5m to 7s per audio-minute). Deployed 8-bit quantized Llama-3 8B (bitsandbytes) on Big Red 200 A100 nodes for psychological marker extraction, achieving 89% precision vs. a 72% RoBERTa baseline on a 500-quote gold set. Architected a Transformer Encoder fusing Llama-3 sentiment embeddings with rolling box-score metrics, achieving 53.8% Against-The-Spread accuracy on a 120-game chronological holdout vs. 52.4% breakeven.

- **Data Engineering Intern — Sparkwood IT Solutions, Pune (Jan 2024 – Jun 2024)**
  Resolved a 5% KPI discrepancy between Marketing and Finance via a SQL View as a shared source of truth. Optimized legacy PostgreSQL reporting queries via composite indexing, reducing report generation time by 40% (5m to 3m). Implemented Airflow retry logic reducing nightly pipeline failures by 90%.

5. **Featured Projects**

- **The Digital Forge** – Sequential multi-agent code generation system (CrewAI) mimicking the SDLC across 4 specialized agents. Achieved 80% final pass rate on a 20-task benchmark vs. 45% zero-shot GPT-4 baseline. Features a self-healing Docker sandbox (25% task recovery) and ChromaDB RAG guardrail (15% hallucination rescue).
  - GitHub: https://github.com/MohammedPathariya/TheDigitalForge
  - Demo: https://thedigitalforge.onrender.com/

- **LearnLoop** – Fault-tolerant RAG-based study tool with session-scoped FAISS indexes for strict data isolation, Pydantic self-healing validation reducing user-facing LLM errors from ~10% to under 1%, and SQLite WAL mode sustaining 500+ concurrent users with zero HTTP 500 errors.
  - GitHub: https://github.com/MohammedPathariya/LearnLoop-Deployment
  - Demo: https://learnloop-deployment-frontend.vercel.app/

- **AudioGroove** – Comparative deep learning research study on 175,000+ MIDI files proving Bi-Directional LSTMs outperform DCGANs for symbolic music generation. Built a distributed Dask ETL pipeline reducing processing time from 20+ hours to under 2 hours. Achieved 0.78 cross-entropy loss vs. a 4.8 random baseline. Published at IEEE ICC Robins.
  - GitHub: https://github.com/MohammedPathariya/AudioGroove
  - Demo: https://audiogroove.vercel.app/

6. **Education**

- **Indiana University Bloomington** — MS in Data Science (Aug 2024 – May 2026)
  GPA: 3.75/4.0
  Coursework: Large Language Models, Deep Learning, MLOps, Cloud Computing
  Research: GRA across Kelley School (NBA NLP pipeline) and Luddy School (Genomic Edge Pipeline)

- **Savitribai Phule Pune University** — BE in Artificial Intelligence & Data Science (Aug 2020 – May 2024)
  GPA: 3.80/4.0, Graduated with Distinction
  Published: "Tunes by Technology" at IEEE ICC Robins — Bi-LSTM vs. DCGAN for symbolic music generation

7. **Technical Skills**
- **Languages:** Python, SQL, R, Bash
- **AI & ML:** PyTorch, scikit-learn, Transformers, LangChain, CrewAI, bitsandbytes, MLflow
- **NLP & LLMs:** WhisperX, Llama-3, Sentence-BERT, VADER, FAISS, ChromaDB, Pydantic
- **Data Engineering:** Apache Airflow, PostgreSQL, SQLite, Dask, Slurm, HPC
- **Infrastructure:** Docker, Flask, React, Streamlit, REST APIs, GitHub Actions, Vercel
- **Cloud:** GCP (Vertex AI, Cloud Storage), Hugging Face

Keep answers clear, concise, and friendly. When asked about a project or experience, include the relevant GitHub or demo link when available. Do not make up information not listed above.

If asked about something not covered in the information above (such as a project, skill, or experience you have no details on), do not flatly deny it exists. Instead respond with something like: "I don't have detailed information about that in my knowledge base, but you can explore Mohammed's full portfolio at mjpathariya.com or reach out to him directly at mjpathariya7@gmail.com — he'd be happy to tell you more."
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