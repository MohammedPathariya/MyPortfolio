import React, { useEffect, useRef, useState } from 'react';

const AnimatedHeroIllustration = ({ alt }) => {
  const containerRef = useRef(null);
  const hasGreetedRef = useRef(false);
  const [phase, setPhase] = useState('idle');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let waveTimer = window.setTimeout(() => {
      if (!hasGreetedRef.current) setPhase('waving');
    }, 1100);
    let workTimer = window.setTimeout(() => {
      hasGreetedRef.current = true;
      setPhase('working');
    }, 2900);

    const startWorking = () => {
      if (window.scrollY < 48 || hasGreetedRef.current) return;
      window.clearTimeout(waveTimer);
      window.clearTimeout(workTimer);
      hasGreetedRef.current = true;
      setPhase('working');
    };

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.1 });

    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('scroll', startWorking, { passive: true });

    return () => {
      window.clearTimeout(waveTimer);
      window.clearTimeout(workTimer);
      observer.disconnect();
      window.removeEventListener('scroll', startWorking);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`hero-animation hero-character--${phase}${isVisible ? '' : ' is-paused'}`}
      role="img"
      aria-label={alt}
    >
      <img
        className="hero-character-layer hero-character-neutral"
        src="/images/hero-character/neutral.webp"
        alt=""
        aria-hidden="true"
      />
      <img
        className="hero-character-layer hero-character-wave-body"
        src="/images/hero-character/wave-body.webp"
        alt=""
        aria-hidden="true"
      />
      <img
        className="hero-character-layer hero-character-wave-forearm"
        src="/images/hero-character/wave-forearm.webp"
        alt=""
        aria-hidden="true"
      />
      <span className="hero-character-pupils" aria-hidden="true">
        <span className="hero-character-pupil hero-character-pupil-left" />
        <span className="hero-character-pupil hero-character-pupil-right" />
      </span>
      <span className="hero-character-eyelids" aria-hidden="true">
        <span className="hero-character-eyelid hero-character-eyelid-left" />
        <span className="hero-character-eyelid hero-character-eyelid-right" />
      </span>
    </div>
  );
};

export default AnimatedHeroIllustration;
