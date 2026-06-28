import React from "react";

interface SimulatePanelProps {
  speed: number;
  onChangeSpeed: (speed: number) => void;
  onKickoffNext: () => void;
  onForceGoal: () => void;
  onReset: () => void;
  completedMatches: number;
  totalMatches: number;
  liveMatchesCount: number;
}

export default function SimulatePanel({
  speed,
  onChangeSpeed,
  onKickoffNext,
  onForceGoal,
  onReset,
  completedMatches,
  totalMatches,
  liveMatchesCount
}: SimulatePanelProps) {
  const speeds = [
    { value: 0, label: "⏸️ Pause" },
    { value: 1, label: "1x" },
    { value: 5, label: "5x" },
    { value: 15, label: "15x" }
  ];

  const progressPercent = Math.round((completedMatches / totalMatches) * 100);

  return (
    <div className="simulation-bar">
      <div className="sim-info">
        <span style={{ fontSize: "1.25rem" }}>⚡</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
            Live Match Simulator
          </div>
          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", gap: "0.5rem" }}>
            <span>Progress: {completedMatches}/{totalMatches} Games ({progressPercent}%)</span>
            {liveMatchesCount > 0 && <span style={{ color: "var(--primary-neon)", fontWeight: 600 }}>&bull; {liveMatchesCount} Live</span>}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Speed Controls */}
        <div className="sim-speed-controls">
          {speeds.map((s) => (
            <button
              key={s.value}
              className={`sim-speed-btn ${speed === s.value ? "active" : ""}`}
              onClick={() => onChangeSpeed(s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {liveMatchesCount === 0 && completedMatches < totalMatches && (
            <button className="action-btn" onClick={onKickoffNext}>
              ⚽ Kickoff Matches
            </button>
          )}

          {liveMatchesCount > 0 && (
            <button className="action-btn" onClick={onForceGoal} style={{ borderColor: "var(--accent-gold)", color: "var(--accent-gold)", background: "hsla(45, 100%, 50%, 0.1)" }}>
              ⚡ Force Goal
            </button>
          )}

          <button className="action-btn reset-btn" onClick={onReset}>
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
}
