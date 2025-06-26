import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id= 'about' className="about">
      <div className="about-container">
        <h2>About Me</h2>
        <p>
          I’m Mohammed, a Master’s student in Data Science at Indiana University Bloomington, where I focus on machine learning, time series, and creative data applications.
        </p>
        <p>
          My work explores how data can drive real-world change — from AI-generated music to real-time sign language translation, I enjoy building tools that are both thoughtful and impactful.
        </p>
        <p>
          I have a strong interest in generative AI, computer vision, and turning abstract concepts into practical ML solutions. My goal is always to bridge technical depth with creative execution.
        </p>
        <p>
          Outside of academics, I find inspiration in design, sketching, football, and music — each of which feeds into the way I think about systems, structure, and problem-solving.
        </p>
      </div>
    </section>
  );
};

export default About;

