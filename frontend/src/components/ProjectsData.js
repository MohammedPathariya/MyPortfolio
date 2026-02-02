export const allProjects = [
  {
    title: 'The Digital Forge',
    // Narrative: Focus on "Self-Healing" and "Sandboxing"
    description: 'An autonomous multi-agent coding system that achieved an 85% Pass@1 rate on algorithmic tasks. Features a "Self-Healing" reflection loop where agents execute code in a Dockerized sandbox, capture stderr, and iteratively debug their own errors.',
    featured: true,
    tags: ['Multi-Agent Systems', 'Docker', 'CrewAI', 'CI/CD', 'Python'],
    github: 'https://github.com/MohammedPathariya/TheDigitalForge',
    demo: 'https://thedigitalforge.onrender.com/',
    thumbnail: '/images/digitalforge.png',
  },
  {
    title: 'LearnLoop',
    // Narrative: Focus on "Reliability" and "Concurrency"
    description: 'A fault-tolerant RAG architecture designed for reliability. Engineered with Session-Based FAISS indexes for strict data isolation and a Pydantic-powered validation layer that autonomously corrects 90% of LLM JSON schema hallucinations.',
    featured: true,
    tags: ['RAG', 'Pydantic', 'SQLite WAL', 'Locust', 'React'],
    github: 'https://github.com/MohammedPathariya/LearnLoop-Deployment',
    demo: 'https://learnloop-deployment-frontend.vercel.app/',
    thumbnail: '/images/learnloop.png',
  },
  {
    title: 'AudioGroove',
    // Narrative: Focus on "Scale" and "Research"
    description: 'A comparative research study scaling Deep Learning to 175,000+ MIDI files. Built a distributed Dask ETL pipeline to handle the massive dataset and proved that Bi-Directional LSTMs statistically outperform DCGANs for symbolic music generation.',
    featured: true,
    tags: ['Deep Learning', 'Dask', 'MLflow', 'PyTorch', 'Research'],
    github: 'https://github.com/MohammedPathariya/AudioGroove',
    demo: 'https://audiogroove.vercel.app/',
    thumbnail: '/images/audiogroove2.png',
  },
  {
    title: 'HandSpeak',
    // Narrative: "Efficiency" & "Edge Computing"
    description: 'Engineered a low-latency sign language recognition system. By extracting vector landmarks via MediaPipe and classifying with Scikit-Learn (RF), achieved 30+ FPS CPU inference, eliminating the need for heavy GPUs.',
    featured: false,
    tags: ['MediaPipe', 'Edge AI', 'Scikit-Learn', 'Real-Time'],
    github: 'https://github.com/MohammedPathariya/HandSpeak',
    demo: 'https://handspeak-blush.vercel.app/',
    thumbnail: '/images/handspeak2.png',
  },
  {
    title: 'CodeCrafter',
    // Narrative: "Security" & "Isolation" (Great precursor to Digital Forge)
    description: 'Architected a secure Remote Code Execution (RCE) engine. User-submitted Python/R code is executed inside ephemeral, network-isolated Docker containers to prevent host compromise while rendering visualizations.',
    featured: false,
    tags: ['Docker Security', 'Flask', 'React', 'RCE'],
    github: 'https://github.com/MohammedPathariya/CodeCrafter',
    demo: '#',
    thumbnail: '/images/codecrafter2.png',
  },
  {
    title: 'Automated Snake Game',
    // Narrative: "Reinforcement Learning" theory
    description: 'Trained a Deep Q-Network (DQN) agent to master Snake from pixel inputs. Implemented Experience Replay and Epsilon-Greedy exploration strategies in PyTorch to stabilize convergence on optimal pathfinding policies.',
    featured: false,
    tags: ['Deep Q-Learning', 'PyTorch', 'RL', 'Pygame'],
    github: 'https://github.com/MohammedPathariya/Automated-Snake-Game',
    demo: '#',
    thumbnail: '/images/automatedsnakegame2.png',
  },
  {
    title: 'VAYU – Air Quality Forecasting',
    // Narrative: "End-to-End ML Pipeline"
    description: 'Developed a time-series forecasting pipeline for PM2.5 levels. Managed the full lifecycle from cleaning OpenAQ sensor data to training LSTM sequence models for temporal predictive accuracy.',
    featured: false,
    tags: ['Time Series', 'LSTM', 'Pandas', 'End-to-End ML'],
    github: 'https://github.com/MohammedPathariya/LSTM-Air-Quality-Forecasting--VAYU',
    demo: '#',
    thumbnail: '/images/vayu2.png',
  },
  {
    title: 'BloomMap',
    // Narrative: "Geospatial Data"
    description: 'Built an interactive geospatial dashboard for public facilities. Integrated GeoPandas for coordinate clustering and deployed a React/Flask container to visualize service coverage heatmaps.',
    featured: false,
    tags: ['GeoPandas', 'React', 'GIS', 'Docker'],
    github: 'https://github.com/MohammedPathariya/BloomMap',
    demo: '#',
    thumbnail: '/images/bloommap2.png',
  },
  {
    title: 'Content Detection',
    // Narrative: "NLP Architecture Comparison"
    description: 'Benchmarked spam classification architectures, comparing Sequential LSTMs vs. Feed-Forward Networks. Implemented a robust NLP preprocessing pipeline (Lemmatization, Vectorization) to maximize signal retention.',
    featured: false,
    tags: ['NLP', 'LSTM', 'TensorFlow', 'Benchmarking'],
    github: 'https://github.com/MohammedPathariya/Content-Detection',
    demo: '#',
    thumbnail: '/images/contentdetection.png',
  },
  {
    title: 'Yudishthir Desktop Assistant',
    // Narrative: "System Automation"
    description: 'Developed a voice-controlled OS automation agent. Integrated SpeechRecognition APIs with system-level scripting to automate file management, surveillance, and information retrieval tasks.',
    featured: false,
    tags: ['Automation', 'Speech Recognition', 'Scripting', 'OpenCV'],
    github: 'https://github.com/MohammedPathariya/Desktop-Assistant-Yudhishthar',
    demo: '#',
    thumbnail: '/images/yudhisthir.png',
  },
];