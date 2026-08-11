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
    >
      <svg
        className="hero-character-svg"
        viewBox="0 0 520 360"
        role="img"
        aria-label={alt}
      >
        <g className="hero-character-ink" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path className="hero-chair" d="M382 173 C430 180 443 222 430 306 L398 306 C411 229 399 199 369 197" fill="var(--bg-color)" />

          <g className="hero-head">
            <ellipse cx="300" cy="104" rx="53" ry="60" fill="var(--bg-color)" />
            <path d="M250 100 C247 55 273 29 309 34 C343 26 367 53 354 91 C347 72 334 58 314 57 C290 64 276 76 250 100 Z" fill="currentColor" />
            <path d="M257 73 C272 48 299 39 326 44" fill="none" stroke="var(--bg-color)" strokeWidth="3" />
            <path d="M267 66 C285 51 307 47 335 54" fill="none" stroke="var(--bg-color)" strokeWidth="3" />
            <path d="M279 59 C299 49 318 51 342 63" fill="none" stroke="var(--bg-color)" strokeWidth="3" />
            <g className="hero-eyes" fill="currentColor" stroke="none">
              <ellipse cx="281" cy="105" rx="6" ry="8" />
              <ellipse cx="322" cy="105" rx="6" ry="8" />
            </g>
            <path d="M299 111 Q295 121 302 122" fill="none" />
            <path d="M282 135 Q301 150 321 134" fill="none" />
          </g>

          <path d="M255 155 C230 164 215 189 209 247 L219 306 L383 306 L390 235 C388 190 366 163 346 155 C328 170 277 170 255 155 Z" fill="var(--bg-color)" />
          <path d="M274 158 Q300 181 328 158" fill="none" />
          <path d="M287 168 L287 222 L313 222 L313 168" fill="none" />
          <circle cx="300" cy="185" r="3" fill="currentColor" stroke="none" />
          <circle cx="300" cy="202" r="3" fill="currentColor" stroke="none" />

          <g className="hero-left-working-arm">
            <path d="M244 181 C221 213 219 257 252 286" fill="none" />
            <path d="M252 286 C268 297 289 297 305 292" fill="none" />
            <path className="hero-left-working-hand" d="M252 286 Q263 279 276 286 Q288 278 304 290" fill="none" />
          </g>

          <g className="hero-wave-arm">
            <path d="M241 183 C213 169 191 146 176 118" fill="none" />
            <path d="M225 202 C196 190 174 160 164 127" fill="none" />
            <path d="M164 127 C151 112 143 92 144 73" fill="none" />
            <path d="M176 118 C168 99 166 83 169 65" fill="none" />
            <path d="M145 74 L135 54 M151 71 L148 46 M159 71 L162 45 M167 76 L176 52 M169 88 L188 72" fill="none" />
            <path d="M135 54 Q139 47 148 46 Q154 39 162 45 Q171 42 176 52 Q185 56 188 72 Q188 91 176 118" fill="var(--bg-color)" />
          </g>

          <g className="hero-right-arm">
            <path d="M357 180 C380 214 376 260 343 286" fill="none" />
            <path d="M343 286 C330 297 314 298 301 292" fill="none" />
            <path className="hero-right-working-hand" d="M301 292 Q314 282 327 290 Q335 283 344 286" fill="none" />
          </g>

          <g className="hero-laptop">
            <path d="M92 224 L276 224 L302 314 L112 314 Z" fill="var(--bg-color)" />
            <path d="M112 314 L323 314 L305 323 L119 323 Z" fill="var(--bg-color)" />
            <circle cx="192" cy="270" r="7" fill="currentColor" stroke="none" />
          </g>

          <g className="hero-mug">
            <path d="M389 269 L389 319 Q389 329 400 329 L429 329 Q440 329 440 319 L440 269 Z" fill="#b7835a" />
            <path d="M440 280 Q460 278 460 296 Q460 313 440 312" fill="none" />
            <path d="M391 271 Q414 278 438 271" fill="none" />
          </g>

          <path d="M40 329 H480" fill="none" />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedHeroIllustration;
