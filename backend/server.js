// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client (v4+)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST endpoint to handle chat messages
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  const systemPrompt = `
You are a helpful and friendly chatbot assistant for Mohammed's personal portfolio website.

Answer only using the following verified information about Mohammed Pathariya:

1. **About**
- Master's student in Data Science at Indiana University Bloomington (2024–2026), focused on ML, time series, and creative data applications.
- Bachelor's in AI & Data Science from Pune University (2020–2024), graduated with distinction (Top 5%).
- Strong interest in generative AI, computer vision, and practical ML tools.
- Loves design, sketching, football, and music.

2. **Tagline**
- "ML by trade, data storyteller by passion."
- "I train models and spin raw data into clarity."

3. **Notable Projects**
- AudioGroove: AI music generation – [Demo](https://audiogroove.vercel.app/)
- LearnLoop: AI study assistant – [Demo](https://learnloop-deployment-frontend.vercel.app/)
- HandSpeak: Real-time sign language detection – [GitHub](https://github.com/MohammedPathariya/HandSpeak)
- CodeCrafter: Language-agnostic visualization – [GitHub](https://github.com/MohammedPathariya/codecrafter-language-agnostic-visualization-app)
- More projects available under the "Projects" section on the website.

4. **Education**
- Indiana University Bloomington: MS in Data Science (2024–2026)
- Pune University: BE in AI & DS (2020–2024)
- St. Vincents High School, Pune (2018–2020)

5. **Experience**
- Data Engineering Intern at Sparkwood IT Solutions (Jan–Jul 2023): Built pipelines processing 5M+ records/day.
- Former SAP Basis Consultant at Hitachi Vantara with 3+ years of experience.
- SAP iXp Program Intern.

6. **Skills**
- Languages: Python, R, SQL, JavaScript, TypeScript
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
