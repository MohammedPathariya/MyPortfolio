import React, { useEffect, useRef } from 'react';

const greetingSequence = [0, 1, 2, 1, 0, 1, 2, 1, 2, 3];
const typingSequence = [2, 3, 2, 3];
const greetingFrameDuration = 150;
const typingFrameDuration = 520;

const AnimatedHeroIllustration = ({ frames, alt }) => {
  const canvasRef = useRef(null);
  const fallbackFrame = frames[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canvas || prefersReducedMotion || frames.length < 2) return undefined;

    const context = canvas.getContext('2d');
    const images = frames.map((source) => {
      const image = new Image();
      image.src = source;
      return image;
    });
    let animationFrame;
    let lastTimestamp = 0;
    let elapsed = 0;
    let sequencePosition = 0;
    let phase = 'greeting';
    let isVisible = true;
    let hasDrawn = false;

    const drawFrame = (frameIndex) => {
      const image = images[frameIndex];
      if (!image.complete || image.naturalWidth === 0) return;
      if (canvas.width !== image.naturalWidth || canvas.height !== image.naturalHeight) {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
      canvas.classList.add('is-ready');
      hasDrawn = true;
    };

    images[0].onload = () => drawFrame(0);

    const animate = (timestamp) => {
      if (!isVisible) return;
      if (!lastTimestamp) lastTimestamp = timestamp;
      elapsed += timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      const sequence = phase === 'greeting' ? greetingSequence : typingSequence;
      const duration = phase === 'greeting'
        ? greetingFrameDuration
        : typingFrameDuration;

      if (elapsed >= duration) {
        elapsed = 0;
        sequencePosition += 1;
        if (phase === 'greeting' && sequencePosition >= greetingSequence.length) {
          phase = 'typing';
          sequencePosition = 0;
        } else {
          sequencePosition %= sequence.length;
        }
      }
      drawFrame(sequence[sequencePosition]);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animationFrame) {
        lastTimestamp = 0;
        animationFrame = window.requestAnimationFrame(animate);
      }
      if (!isVisible && animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = undefined;
      }
    }, { threshold: 0.1 });

    observer.observe(canvas);
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (!hasDrawn) context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [frames]);

  return (
    <div className="hero-animation" aria-label={alt}>
      <img src={fallbackFrame} alt={alt} className="hero-photo" fetchPriority="high" />
      <canvas ref={canvasRef} className="hero-animation-canvas" aria-hidden="true" />
    </div>
  );
};

export default AnimatedHeroIllustration;
