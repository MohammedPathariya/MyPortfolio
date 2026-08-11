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
        <g className="hero-character-ink" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
          <path className="hero-chair" d="M365 174 C420 170 444 204 438 302 L402 302 C409 226 397 198 367 198 Z" fill="var(--bg-color)" />
          <path d="M410 188 C429 204 432 235 427 287" fill="none" opacity="0.4" />

          <g className="hero-wave-arm">
            <path d="M261 177 C235 178 215 169 197 147 L176 118 L154 130 L166 172 C176 203 211 217 249 207 Z" fill="var(--bg-color)" />
            <path d="M160 125 L178 113 L184 127 L166 139 Z" fill="var(--bg-color)" />
            <path d="M160 127 C155 107 154 92 159 76 L179 78 C183 96 182 111 177 121 Z" fill="var(--bg-color)" />
            <g className="hero-wave-hand">
              <path d="M160 82 C153 76 147 68 146 62 C145 57 148 54 152 56 L161 66 L158 49 C157 44 160 41 164 44 L169 61 L169 41 C169 36 173 34 176 39 L180 60 L184 43 C185 38 189 38 192 42 L190 64 L197 52 C200 47 204 49 204 54 C202 65 198 75 193 83 C188 93 183 99 177 102 L179 116 L160 120 L158 101 C155 94 156 88 160 82 Z" fill="var(--bg-color)" />
              <path d="M161 66 L164 78 M169 61 L171 76 M180 60 L179 77 M190 64 L186 80" fill="none" strokeWidth="2.2" />
            </g>
            <path d="M190 155 C205 176 224 188 247 190" fill="none" opacity="0.45" />
          </g>

          <path d="M259 153 C236 158 220 178 214 214 L211 298 L394 298 L391 216 C387 181 369 159 345 153 C327 167 278 168 259 153 Z" fill="var(--bg-color)" />
          <path d="M231 195 C224 224 225 262 236 286 M374 194 C383 225 380 260 368 286" fill="none" opacity="0.4" />
          <path d="M261 154 C269 172 283 181 301 181 C319 181 336 172 344 154" fill="none" />
          <path d="M276 158 L286 176 M327 176 L338 158" fill="none" />
          <path d="M286 176 L286 222 Q299 228 313 222 L313 176" fill="none" />
          <circle cx="299.5" cy="190" r="2.7" fill="currentColor" stroke="none" />
          <circle cx="299.5" cy="207" r="2.7" fill="currentColor" stroke="none" />
          <path d="M248 219 Q263 227 274 224 M351 221 Q339 228 327 225" fill="none" opacity="0.35" />

          <g className="hero-head">
            <path d="M265 88 C261 54 277 31 307 28 C340 24 361 47 357 87 L354 119 C350 144 332 160 307 161 C283 161 265 143 260 119 Z" fill="var(--bg-color)" />
            <path d="M261 96 C251 89 247 100 251 112 C253 121 258 126 264 126 M356 96 C366 89 369 101 365 113 C362 121 358 126 353 126" fill="var(--bg-color)" />
            <path d="M263 93 C255 78 255 59 262 46 L270 47 C267 35 276 25 289 24 L295 16 L307 21 C318 12 330 17 336 24 C348 21 357 30 358 40 C369 49 367 72 357 95 C352 77 344 64 332 56 C320 65 306 70 290 73 L302 57 C291 68 280 73 268 73 C269 82 267 88 263 93 Z" fill="currentColor" />
            <path d="M268 61 C282 43 300 31 321 28 M278 64 C294 43 316 35 339 42 M294 62 C312 45 332 45 352 57 M268 72 C282 69 294 61 304 50 M286 72 C305 68 321 60 333 49" fill="none" stroke="var(--bg-color)" strokeWidth="2.4" opacity="0.85" />
            <path d="M258 108 Q260 113 264 114 M357 108 Q361 112 365 108" fill="none" strokeWidth="1.8" opacity="0.45" />
            <path d="M272 94 Q282 87 292 94 M318 94 Q329 87 339 95" fill="none" strokeWidth="3" />
            <g className="hero-eyes">
              <ellipse cx="283" cy="107" rx="10" ry="13" fill="var(--bg-color)" />
              <ellipse cx="329" cy="107" rx="10" ry="13" fill="var(--bg-color)" />
              <ellipse cx="284" cy="109" rx="6.5" ry="9" fill="currentColor" stroke="none" />
              <ellipse cx="328" cy="109" rx="6.5" ry="9" fill="currentColor" stroke="none" />
              <circle cx="286" cy="105" r="2" fill="var(--bg-color)" stroke="none" />
              <circle cx="330" cy="105" r="2" fill="var(--bg-color)" stroke="none" />
            </g>
            <path d="M305 111 Q301 123 307 125" fill="none" strokeWidth="2.4" />
            <path d="M286 137 Q306 151 327 136" fill="none" strokeWidth="2.8" />
            <path d="M289 145 Q306 152 323 144" fill="none" strokeWidth="1.8" opacity="0.35" />
          </g>

          <g className="hero-left-working-arm">
            <path d="M242 181 C219 211 218 254 246 284 C260 298 282 300 306 292" fill="var(--bg-color)" />
            <path d="M224 247 Q236 252 248 247 L252 272 Q242 281 231 276" fill="var(--bg-color)" />
            <path d="M229 251 L247 247 M232 260 L250 256" fill="none" opacity="0.45" />
            <path className="hero-left-working-hand" d="M246 284 Q258 276 270 284 Q282 276 306 291 Q292 303 270 302 Q254 301 246 292 Z" fill="var(--bg-color)" />
          </g>

          <g className="hero-right-arm">
            <path d="M360 179 C385 210 382 254 352 283 C338 297 320 299 301 292" fill="var(--bg-color)" />
            <path d="M375 247 Q363 252 352 247 L347 272 Q356 281 367 276" fill="var(--bg-color)" />
            <path d="M354 247 L373 251 M351 256 L370 260" fill="none" opacity="0.45" />
            <path className="hero-right-working-hand" d="M301 292 Q313 282 327 289 Q338 280 352 283 L348 293 Q334 302 317 301 Z" fill="var(--bg-color)" />
          </g>

          <g className="hero-laptop">
            <path d="M76 221 L272 221 L300 311 L101 311 Z" fill="var(--bg-color)" />
            <path d="M101 311 L323 311 L305 321 L109 321 Z" fill="var(--bg-color)" />
            <circle cx="187" cy="266" r="7" fill="currentColor" stroke="none" />
            <path d="M111 304 L283 304" fill="none" opacity="0.25" />
          </g>

          <g className="hero-mug">
            <path d="M390 268 L390 316 Q390 327 402 328 L429 328 Q440 327 440 316 L440 268 Z" fill="#b7835a" />
            <path d="M440 279 Q461 277 461 296 Q461 313 440 311" fill="none" />
            <path d="M392 270 Q415 277 438 270" fill="none" />
            <path d="M403 284 Q416 288 429 283" fill="none" opacity="0.3" />
          </g>

          <path d="M40 329 H480" fill="none" />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedHeroIllustration;
