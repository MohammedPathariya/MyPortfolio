import React, { useEffect, useMemo, useRef } from 'react';

const greetingSequence = [0, 1, 2, 3, 4, 5, 6, 7];
const greetingFrameDuration = 180;
const typingFrameDuration = 520;

const AnimatedHeroIllustration = ({ frames, workFrames, alt }) => {
  const canvasRef = useRef(null);
  const hasGreetedRef = useRef(false);
  const fallbackFrame = frames[0];
  const allFrames = useMemo(() => [...frames, ...workFrames], [frames, workFrames]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canvas || prefersReducedMotion || allFrames.length < 2) return undefined;

    const context = canvas.getContext('2d');
    const typingSequence = workFrames.map((_, index) => frames.length + index);
    const images = allFrames.map((source) => {
      const image = new Image();
      image.src = source;
      return image;
    });
    let animationFrame;
    let lastTimestamp = 0;
    let elapsed = 0;
    let sequencePosition = 0;
    let phase = hasGreetedRef.current ? 'typing' : 'greeting';
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
          hasGreetedRef.current = true;
        } else {
          sequencePosition %= sequence.length;
        }
      }
      drawFrame(sequence[sequencePosition]);
      animationFrame = window.requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      if (phase !== 'greeting' || window.scrollY < 48) return;
      phase = 'typing';
      sequencePosition = 0;
      elapsed = 0;
      hasGreetedRef.current = true;
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      if (!hasDrawn) context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [allFrames, frames, workFrames]);

  return (
    <div className="hero-animation" aria-label={alt}>
      <img src={fallbackFrame} alt={alt} className="hero-photo" fetchPriority="high" />
      <canvas ref={canvasRef} className="hero-animation-canvas" aria-hidden="true" />
    </div>
  );
};

export default AnimatedHeroIllustration;
