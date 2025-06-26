import React from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './components/Contact';
import Skills from './components/Skills';
import Education from './components/Education.js';
import Experience from './components/Experience.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Projects /> {/* ✅ Add this line to render the projects section */}
      <Skills />
      <Education />
      <Experience />
      <Contact />
      <Footer />
      {/* Add Contact, Resume, etc. here later */}
    </div>
  );
}

export default App;
