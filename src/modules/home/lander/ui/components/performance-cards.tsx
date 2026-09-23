import React from "react";
import { LedDots } from "./led-dots";

// Generate gauge ticks mathematically as specified:
// i=0..22; angle=(190 + i*5)*PI/180; outer=142; inner = i%5===0 ? 129 : 133; center 163,163; stroke-width 1.5 vs 1
const renderGaugeTicks = () => {
  const ticks = [];
  for (let i = 0; i <= 22; i++) {
    const angle = ((190 + i * 5) * Math.PI) / 180;
    const outer = 142;
    const inner = i % 5 === 0 ? 129 : 133;
    const strokeWidth = i % 5 === 0 ? 1.5 : 1;
    const x1 = 163 + inner * Math.cos(angle);
    const y1 = 163 + inner * Math.sin(angle);
    const x2 = 163 + outer * Math.cos(angle);
    const y2 = 163 + outer * Math.sin(angle);
    ticks.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="rgba(255,188,210,.34)"
        strokeWidth={strokeWidth}
      />,
    );
  }
  return ticks;
};

/* ==================================================
   CARD 1 — SPEED
   ================================================== */
export const SpeedCard: React.FC = () => {
  return (
    <article
      className="card card--speed"
      aria-label="Inference Speed capability"
    >
      {/* Background Video */}
      <video
        className="card__media"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/167977c6-8539-46b1-9a15-8dba566f50b8.png"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_130045_1a612b69-4854-4b34-8043-ccb91f2c60af.mp4"
      />

      {/* Card Grain */}
      <svg
        className="card__grain"
        viewBox="0 0 429 554"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect width="100%" height="100%" filter="url(#cardNoise)" />
      </svg>

      {/* Card Title */}
      <h2 className="card__title">
        Live Agent Voice
        <br />
        In-Call Speech Duplex
      </h2>

      {/* Gauge SVG */}
      <svg className="gauge" viewBox="0 0 326 326" aria-hidden="true">
        <defs>
          <linearGradient
            id="gaugeArc"
            gradientUnits="userSpaceOnUse"
            x1="7"
            y1="136"
            x2="312"
            y2="109"
          >
            <stop offset="0" stopColor="#ff9ab7" stopOpacity="0.06" />
            <stop offset="0.08" stopColor="#ff8caf" stopOpacity="0.44" />
            <stop offset="0.34" stopColor="#ff6796" stopOpacity="0.94" />
            <stop offset="0.58" stopColor="#ff6796" stopOpacity="1" />
            <stop offset="0.82" stopColor="#ffe7ed" stopOpacity="0.74" />
            <stop offset="0.94" stopColor="#fff8fa" stopOpacity="0.28" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient
            id="gaugeShadow"
            gradientUnits="userSpaceOnUse"
            x1="11"
            y1="136"
            x2="308"
            y2="110"
          >
            <stop offset="0" stopColor="#6e1639" stopOpacity="0.04" />
            <stop offset="0.09" stopColor="#6e1639" stopOpacity="0.17" />
            <stop offset="0.52" stopColor="#72163d" stopOpacity="0.18" />
            <stop offset="0.78" stopColor="#7b1a43" stopOpacity="0.1" />
            <stop offset="1" stopColor="#7b1a43" stopOpacity="0" />
          </linearGradient>

          <radialGradient
            id="radarBeam"
            cx="163"
            cy="163"
            r="145"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.3" stopColor="#650f35" stopOpacity="0" />
            <stop offset="0.45" stopColor="#650f35" stopOpacity="0.025" />
            <stop offset="0.7" stopColor="#650f35" stopOpacity="0.065" />
            <stop offset="0.9" stopColor="#650f35" stopOpacity="0.08" />
            <stop offset="1" stopColor="#650f35" stopOpacity="0.05" />
          </radialGradient>

          <linearGradient
            id="radarBeamEdge"
            gradientUnits="userSpaceOnUse"
            x1="238"
            y1="33"
            x2="190.5"
            y2="115.4"
          >
            <stop offset="0" stopColor="#ffe7ef" stopOpacity="0.19" />
            <stop offset="0.48" stopColor="#ffd1df" stopOpacity="0.11" />
            <stop offset="0.82" stopColor="#ffc6d7" stopOpacity="0.045" />
            <stop offset="1" stopColor="#ffc6d7" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Arc Shadow */}
        <path
          d="M11.34 136.26A154 154 0 0 1 307.71 110.33"
          fill="none"
          strokeWidth="3.2"
          strokeLinecap="round"
          stroke="url(#gaugeShadow)"
        />

        {/* Outer Ring */}
        <path
          d="M6.91 135.48A158.5 158.5 0 0 1 311.94 108.79"
          fill="none"
          strokeWidth="2.2"
          strokeLinecap="round"
          stroke="url(#gaugeArc)"
        />

        {/* Fine Ring */}
        <path
          d="M19.22 137.65A146 146 0 0 1 236 36.56"
          fill="none"
          strokeWidth="1.15"
          stroke="rgba(255,166,194,.31)"
        />

        {/* Halo Wedge */}
        <path
          d="M238 33.1A150 150 0 0 1 277.9 66.6L199.8 119.5A55 55 0 0 0 190.5 115.4Z"
          fill="#6a1238"
          opacity="0.022"
          filter="url(#radarHalo)"
        />

        {/* Radar Sweep */}
        <path
          d="M238 33.1A150 150 0 0 1 277.9 66.6L199.8 119.5A55 55 0 0 0 190.5 115.4Z"
          fill="url(#radarBeam)"
          filter="url(#radarSoft)"
        />

        {/* Edge Line */}
        <path
          d="M238 33.1L190.5 115.4"
          stroke="url(#radarBeamEdge)"
          strokeWidth="1.25"
          strokeLinecap="round"
          filter="url(#radarSoft)"
        />

        {/* Gauge Ticks */}
        <g id="gaugeTicks">{renderGaugeTicks()}</g>

        {/* Center Ellipse Blur */}
        <ellipse
          cx="225"
          cy="166"
          rx="92"
          ry="76"
          fill="#fff"
          opacity="0.055"
          filter="url(#gaugeBlur)"
        />
      </svg>

      {/* Metric 184 ms */}
      <div className="metric metric--speed">
        <div className="dot-number">
          <LedDots value="184" />
        </div>
        <span className="metric__unit">ms</span>
      </div>

      {/* Caption */}
      <p className="caption">
        Turnaround voice
        <br />
        cadence
      </p>

      {/* Button */}
      <a href="#voice-engine" className="learn-more">
        Learn More
      </a>
    </article>
  );
};

/* ==================================================
   CARD 2 — CONTEXT
   ================================================== */
export const ContextCard: React.FC = () => {
  return (
    <article
      className="card card--context"
      aria-label="Context Window capability"
    >
      {/* Background Video */}
      <video
        className="card__media"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/0446d1d5-e65e-4db5-8090-3e30d09afc43.png"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_130054_dd005674-d693-4d81-80a5-357f7f10b3a3.mp4"
      />

      {/* Card Grain */}
      <svg
        className="card__grain"
        viewBox="0 0 429 554"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect width="100%" height="100%" filter="url(#cardNoise)" />
      </svg>

      {/* Card Title */}
      <h2 className="card__title">
        Automated Synthesis
        <br />
        Executive Summaries
      </h2>

      {/* Glass Context Window */}
      <div className="context-window">
        <svg
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: 0.24,
            mixBlendMode: "soft-light",
          }}
          viewBox="0 0 252 166"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect width="100%" height="100%" filter="url(#panelNoiseF)" />
        </svg>
        <div className="window-lines">
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Metric 100 % */}
      <div className="metric metric--context">
        <div className="dot-number">
          <LedDots value="100" />
        </div>
        <span className="metric__unit">%</span>
      </div>

      {/* Caption */}
      <p className="caption">
        Structured overview
        <br />& action notes
      </p>

      {/* Button */}
      <a href="#synthesis" className="learn-more">
        Learn More
      </a>
    </article>
  );
};

/* ==================================================
   CARD 3 — CONNECTIONS
   ================================================== */
export const ConnectionsCard: React.FC = () => {
  return (
    <article
      className="card card--connections"
      aria-label="Intelligent Connections capability"
    >
      {/* Background Video */}
      <video
        className="card__media"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        poster="https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/da8d0242-4dee-4f6d-813f-a5887e86ad77.png"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_130103_7550f407-f14b-40a6-9616-7a26d7a8bd9f.mp4"
      />

      {/* Card Grain */}
      <svg
        className="card__grain"
        viewBox="0 0 429 554"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <rect width="100%" height="100%" filter="url(#cardNoise)" />
      </svg>

      {/* Card Title */}
      <h2 className="card__title">
        Meeting Memory
        <br />
        Interactive Ask AI
      </h2>

      {/* Connections Map SVG */}
      <svg
        className="connections-map"
        viewBox="0 0 429 238"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* White Strokes */}
        <path
          opacity="0.20"
          d="M0 5H128c27 0 36 7 39 26 2 16 9 22 24 22h106c16 0 23-8 25-25 2-16 10-23 31-23h76"
          stroke="#fff"
          strokeWidth="1"
          fill="none"
        />
        <path
          opacity="0.30"
          d="M0 117h46c15 0 22 8 26 25 5 23 12 31 31 31h174c18 0 25-8 30-31 4-17 11-25 26-25h96"
          stroke="#fff"
          strokeWidth="1"
          fill="none"
        />
        <path
          opacity="0.34"
          d="M0 173h87c15 0 22 7 27 25 4 15 11 22 28 22h140c17 0 25-7 29-22 5-18 12-25 28-25h90"
          stroke="#fff"
          strokeWidth="1"
          fill="none"
        />
        <path
          opacity="0.16"
          d="M0 228h120c17 0 25-5 28-18 4-15 10-20 28-20h81c18 0 25 6 28 20 4 13 11 18 28 18h116"
          stroke="#fff"
          strokeWidth="1"
          fill="none"
        />
        <path
          opacity="0.26"
          d="M0 5H429M0 61H429M0 117H429"
          stroke="#fff"
          strokeWidth="1"
          fill="none"
        />
        <path
          opacity="0.09"
          d="M0 173H429"
          stroke="#fff"
          strokeWidth="1"
          fill="none"
        />

        {/* Warm Strokes */}
        <path
          opacity="0.52"
          d="M0 61h95c14 0 22-6 27-20 4-13 12-20 27-20h115c15 0 23 6 27 20 5 14 13 20 28 20h110"
          stroke="#fff8dd"
          strokeWidth="1.15"
          fill="none"
        />
        <path
          opacity="0.94"
          d="M0 117h88c15 0 22-8 25-25 4-24 12-31 31-31h129c20 0 27 7 31 31 3 17 10 25 26 25h99"
          stroke="#fff8dd"
          strokeWidth="1.15"
          fill="none"
        />

        {/* Nodes */}
        <circle cx="45" cy="117" r="6.5" fill="#fff" />
        <circle cx="133" cy="61" r="6.5" fill="#fff4a7" />
        <circle cx="189" cy="61" r="6.5" fill="#fff1a4" />
        <circle cx="319" cy="61" r="6.5" fill="#fff4a6" />
        <circle cx="319" cy="117" r="6.5" fill="#fff2a0" />
      </svg>

      {/* Metric 1080 p */}
      <div className="metric metric--connections">
        <div className="dot-number">
          <LedDots value="1080" />
        </div>
        <span className="metric__unit">p</span>
      </div>

      {/* Caption */}
      <p className="caption">
        Full recording,
        <br />
        transcript & chat
      </p>

      {/* Button */}
      <a href="#memory" className="learn-more">
        Learn More
      </a>
    </article>
  );
};
