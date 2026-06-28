import React from "react";
import { Match } from "../lib/simulation";
import TeamFlag from "./TeamFlag";

interface MatchCardProps {
  match: Match;
  onClick: () => void;
}

export default function MatchCard({ match, onClick }: MatchCardProps) {
  const isLive = match.status === "live";
  const isFinished = match.status === "finished";
  
  // Find latest goal event for quick ticker info
  const latestGoal = [...match.events]
    .reverse()
    .find(e => e.type === "goal");


  return (
    <div 
      className={`match-card ${isLive ? "is-live" : ""}`} 
      onClick={onClick}
    >
      <div className="match-header-info">
        <span className="group-badge">{match.group}</span>
        {isLive ? (
          <span className="live-indicator">
            <span className="live-dot" />
            Live {match.minute}' &bull; {match.date}
          </span>
        ) : isFinished ? (
          <span style={{ fontWeight: 600, color: "var(--text-muted)", textTransform: "uppercase" }}>
            Full Time &bull; {match.date}
          </span>
        ) : (
          <span className="time-or-date scheduled">{match.date}</span>
        )}
      </div>

      <div className="match-teams-layout">
        {/* Home Team */}
        <div className="team-container home">
          <span className="team-name" title={match.homeTeam.name}>
            {match.homeTeam.name}
          </span>
          <TeamFlag colors={match.homeTeam.flagColors} short={match.homeTeam.shortName} />
        </div>

        {/* Score Display */}
        <div className="score-display">
          {isLive || isFinished ? (
            <>
              <span className={`score-num ${isLive ? "live" : ""}`}>{match.homeScore}</span>
              <span className="score-divider">:</span>
              <span className={`score-num ${isLive ? "live" : ""}`}>{match.awayScore}</span>
            </>
          ) : (
            <span className="time-or-date" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
              {match.time}
            </span>
          )}
        </div>

        {/* Away Team */}
        <div className="team-container away">
          <TeamFlag colors={match.awayTeam.flagColors} short={match.awayTeam.shortName} />
          <span className="team-name" title={match.awayTeam.name}>
            {match.awayTeam.name}
          </span>
        </div>
      </div>


      {/* Goal ticker details for ongoing micro-interaction */}
      {isLive && latestGoal && (
        <div className="card-ticker">
          ⚽ GOAL! {latestGoal.minute}' - {latestGoal.player} ({latestGoal.teamId.toUpperCase()})
        </div>
      )}

      <div className="match-footer">
        <span className="venue-info">
          📍 {match.venue}
        </span>
        {!isLive && !isFinished && (
          <span style={{ color: "var(--primary-neon-dim)", fontWeight: 600 }}>Preview Match</span>
        )}
        {isFinished && (
          <span style={{ color: "var(--text-muted)" }}>View Stats</span>
        )}
        {isLive && !latestGoal && (
          <span style={{ color: "var(--primary-neon)" }}>Match in progress...</span>
        )}
      </div>
    </div>
  );
}
