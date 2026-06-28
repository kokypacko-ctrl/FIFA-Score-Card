import React from "react";

interface TeamFlagProps {
  colors: string[];
  short: string;
  width?: string;
  height?: string;
}

export default function TeamFlag({ colors, short, width, height }: TeamFlagProps) {
  const safeColors = colors && colors.length >= 2 ? colors : ["#333", "#666"];
  const containerStyle: React.CSSProperties = {};
  if (width) containerStyle.width = width;
  if (height) containerStyle.height = height;

  return (
    <div className="team-flag-wrap" style={containerStyle}>
      <svg
        viewBox="0 0 48 32"
        className="flag-svg-mock"
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <defs>
          <linearGradient id={`grad-${short}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={safeColors[0]} />
            <stop offset="50%" stopColor={safeColors[0]} />
            <stop offset="50%" stopColor={safeColors[1]} />
            <stop offset="100%" stopColor={safeColors[1]} />
          </linearGradient>
        </defs>
        <rect width="48" height="32" fill={`url(#grad-${short})`} />
        {/* Subtle grid/border filter */}
        <rect width="48" height="32" fill="black" fillOpacity="0.06" />
        <rect width="48" height="32" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <text
          x="50%"
          y="62%"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="9"
          fontWeight="900"
          fontFamily="monospace"
          style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
        >
          {short}
        </text>
      </svg>
    </div>
  );
}
