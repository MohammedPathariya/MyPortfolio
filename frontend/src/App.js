// src/App.js

import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import TimelineTabs from './components/TimelineTabs';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Projects />
      <TimelineTabs />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
