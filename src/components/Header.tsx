import React from "react";

interface HeaderProps {
  totalMatches: number;
  liveMatches: number;
  totalGoals: number;
}

export default function Header({ totalMatches, liveMatches, totalGoals }: HeaderProps) {
  return (
    <header className="header">
      <div className="brand-section" style={{ gap: "1rem" }}>
        {/* Official FIFA 2026 Brand Logo SVG */}
        <svg
          className="trophy-icon"
          width="44"
          height="55"
          viewBox="0 0 60 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animation: "none", overflow: "visible" }}
        >
          {/* Background vertical "26" */}
          <text
            x="30"
            y="32"
            textAnchor="middle"
            fontSize="36"
            fontWeight="950"
            fontFamily="'Arial Black', Impact, sans-serif"
            fill="var(--text-primary)"
            style={{ letterSpacing: "-1.5px" }}
          >
            2
          </text>
          <text
            x="30"
            y="64"
            textAnchor="middle"
            fontSize="36"
            fontWeight="950"
            fontFamily="'Arial Black', Impact, sans-serif"
            fill="var(--text-primary)"
            style={{ letterSpacing: "-1.5px" }}
          >
            6
          </text>

          {/* Trophy Overlay Center */}
          <g style={{ filter: "drop-shadow(0 0 5px var(--accent-gold-glow))" }}>
            {/* Base plate */}
            <path d="M22 57 h16 v2 h-16 z" fill="var(--accent-gold)" />
            <path d="M24 53 h12 v4 h-12 z" fill="var(--accent-gold)" />
            {/* Stem base ring */}
            <path d="M27 49 h6 v4 h-6 z" fill="var(--accent-gold)" />
            {/* Curves and Cup */}
            <path d="M26 31 c-2 3 -2 12 -1 18 h10 c1 -6 1 -15 -1 -18 z" fill="var(--accent-gold)" />
            <path d="M22 33 c-2 -2 -3 1 -3 4 s2 8 5 11 c-1.5 -4 -2.5 -10 -2 -15 z" fill="var(--accent-gold)" opacity="0.85" />
            <path d="M38 33 c2 -2 3 1 3 4 s-2 8 -5 11 c1.5 -4 2.5 -10 2 -15 z" fill="var(--accent-gold)" opacity="0.85" />
            {/* Globe */}
            <circle cx="30" cy="26" r="7.5" fill="var(--accent-gold)" />
            <circle cx="28" cy="24" r="2.5" fill="#FFF" opacity="0.4" />
          </g>
        </svg>

        <div className="brand-title">
          <span>FIFA WORLD CUP</span>
          <span className="brand-subtitle">United 2026 Scoreboard</span>
        </div>
      </div>

      <div className="global-stats">
        <div className="stat-box">
          <span className="stat-label">Total Matches</span>
          <span className="stat-value">{totalMatches}</span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Live Now</span>
          <span className={`stat-value ${liveMatches > 0 ? "live" : ""}`}>
            {liveMatches > 0 && <span className="live-dot" />}
            {liveMatches}
          </span>
        </div>
        <div className="stat-box">
          <span className="stat-label">Goals Scored</span>
          <span className="stat-value" style={{ color: "var(--accent-gold)" }}>{totalGoals}</span>
        </div>
      </div>
    </header>
  );
}
