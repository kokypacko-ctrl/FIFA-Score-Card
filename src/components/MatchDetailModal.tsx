import React, { useState, useEffect } from "react";
import { Match, generateLineup } from "../lib/simulation";
import TeamFlag from "./TeamFlag";

interface MatchDetailModalProps {
  match: Match;
  onClose: () => void;
}

interface Player {
  number: number;
  name: string;
  pos: string;
}

export default function MatchDetailModal({ match, onClose }: MatchDetailModalProps) {
  const [activeTab, setActiveTab] = useState<"timeline" | "stats" | "lineups">("timeline");
  const [homeLineup, setHomeLineup] = useState<Player[]>([]);
  const [awayLineup, setAwayLineup] = useState<Player[]>([]);

  // Generate lineups once on load
  useEffect(() => {
    setHomeLineup(generateLineup(match.homeTeam));
    setAwayLineup(generateLineup(match.awayTeam));
  }, [match.id]);

  const isLive = match.status === "live";
  const isFinished = match.status === "finished";


  // Calculate percentage stats for display bars
  const getStatPercent = (homeVal: number, awayVal: number) => {
    const total = homeVal + awayVal;
    if (total === 0) return 50;
    return Math.round((homeVal / total) * 100);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* Hero Section */}
        <div className="modal-match-hero">
          <span className="group-badge" style={{ marginBottom: "1rem", display: "inline-block" }}>
            {match.group} &bull; {match.venue}
          </span>
          
          <div className="modal-hero-layout">
            <div className="modal-hero-team">
              <div className="modal-hero-flag">
                <TeamFlag 
                  colors={match.homeTeam.flagColors} 
                  short={match.homeTeam.shortName} 
                  width="100%" 
                  height="100%" 
                />
              </div>
              <span className="modal-hero-name">{match.homeTeam.name}</span>
            </div>

            <div className="modal-hero-score-wrap">
              {isLive || isFinished ? (
                <div className={`modal-hero-score ${isLive ? "live" : ""}`}>
                  {match.homeScore} - {match.awayScore}
                </div>
              ) : (
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--accent-gold)" }}>
                  {match.time}
                </div>
              )}
              <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                {isLive ? (
                  <span className="live-indicator" style={{ justifyContent: "center" }}>
                    <span className="live-dot" />
                    Live {match.minute}' &bull; {match.date}
                  </span>
                ) : isFinished ? (
                  `FULL TIME • ${match.date}`
                ) : (
                  match.date
                )}
              </div>
            </div>

            <div className="modal-hero-team">
              <div className="modal-hero-flag">
                <TeamFlag 
                  colors={match.awayTeam.flagColors} 
                  short={match.awayTeam.shortName} 
                  width="100%" 
                  height="100%" 
                />
              </div>
              <span className="modal-hero-name">{match.awayTeam.name}</span>
            </div>
          </div>


        </div>

        {/* Navigation Tabs */}
        <div className="modal-tabs">
          <button
            className={`modal-tab-btn ${activeTab === "timeline" ? "active" : ""}`}
            onClick={() => setActiveTab("timeline")}
          >
            Timeline
          </button>
          <button
            className={`modal-tab-btn ${activeTab === "stats" ? "active" : ""}`}
            onClick={() => setActiveTab("stats")}
          >
            Match Stats
          </button>
          <button
            className={`modal-tab-btn ${activeTab === "lineups" ? "active" : ""}`}
            onClick={() => setActiveTab("lineups")}
          >
            Lineups
          </button>
        </div>

        {/* Modal Details Pane */}
        <div className="modal-body">
          {/* Timeline Tab */}
          {activeTab === "timeline" && (
            <div className="timeline-container">
              {match.events.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "var(--text-muted)" }}>
                  <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>⏱️</span>
                  No events have occurred in this match yet.
                  {match.status === "scheduled" && " Game has not kicked off."}
                  {match.status === "live" && " Waiting for updates from match simulation..."}
                </div>
              ) : (
                match.events.map((event) => {
                  const isHome = event.teamId === match.homeTeam.id;
                  const bulletClass = 
                    event.type === "goal" ? "goal" :
                    event.type.includes("card") ? "card" : "sub";

                  return (
                    <div key={event.id} className="timeline-item">
                      <div className={`timeline-bullet ${bulletClass}`} />
                      <div className="timeline-meta">
                        <span className="timeline-time">{event.minute}'</span>
                        <span style={{ 
                          fontWeight: 700, 
                          color: isHome ? "var(--primary-neon)" : "var(--accent-gold)" 
                        }}>
                          {isHome ? match.homeTeam.shortName : match.awayTeam.shortName}
                        </span>
                      </div>
                      <div className="timeline-detail">
                        {event.type === "goal" && "⚽ "}
                        {event.type === "yellow_card" && "🟨 "}
                        {event.type === "red_card" && "🟥 "}
                        {event.type === "substitution" && "🔄 "}
                        {event.player}
                      </div>
                      {event.detail && (
                        <div className="timeline-subtext">{event.detail}</div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Stats Tab */}
          {activeTab === "stats" && (
            <div className="stats-container">
              {/* Possession */}
              <div className="stat-row">
                <div className="stat-row-header">
                  <span>{match.stats.possession[0]}%</span>
                  <span className="stat-title">Possession</span>
                  <span>{match.stats.possession[1]}%</span>
                </div>
                <div className="stat-bar-outer">
                  <div 
                    className="stat-bar-fill home" 
                    style={{ width: `${match.stats.possession[0]}%` }}
                  />
                  <div 
                    className="stat-bar-fill away" 
                    style={{ width: `${match.stats.possession[1]}%` }}
                  />
                </div>
              </div>

              {/* Shots */}
              <div className="stat-row">
                <div className="stat-row-header">
                  <span>{match.stats.shots[0]}</span>
                  <span className="stat-title">Total Shots</span>
                  <span>{match.stats.shots[1]}</span>
                </div>
                <div className="stat-bar-outer">
                  <div 
                    className="stat-bar-fill home" 
                    style={{ width: `${getStatPercent(match.stats.shots[0], match.stats.shots[1])}%` }}
                  />
                  <div 
                    className="stat-bar-fill away" 
                    style={{ width: `${getStatPercent(match.stats.shots[1], match.stats.shots[0])}%` }}
                  />
                </div>
              </div>

              {/* Shots on Target */}
              <div className="stat-row">
                <div className="stat-row-header">
                  <span>{match.stats.shotsOnTarget[0]}</span>
                  <span className="stat-title">Shots on Target</span>
                  <span>{match.stats.shotsOnTarget[1]}</span>
                </div>
                <div className="stat-bar-outer">
                  <div 
                    className="stat-bar-fill home" 
                    style={{ width: `${getStatPercent(match.stats.shotsOnTarget[0], match.stats.shotsOnTarget[1])}%` }}
                  />
                  <div 
                    className="stat-bar-fill away" 
                    style={{ width: `${getStatPercent(match.stats.shotsOnTarget[1], match.stats.shotsOnTarget[0])}%` }}
                  />
                </div>
              </div>

              {/* Corners */}
              <div className="stat-row">
                <div className="stat-row-header">
                  <span>{match.stats.corners[0]}</span>
                  <span className="stat-title">Corners</span>
                  <span>{match.stats.corners[1]}</span>
                </div>
                <div className="stat-bar-outer">
                  <div 
                    className="stat-bar-fill home" 
                    style={{ width: `${getStatPercent(match.stats.corners[0], match.stats.corners[1])}%` }}
                  />
                  <div 
                    className="stat-bar-fill away" 
                    style={{ width: `${getStatPercent(match.stats.corners[1], match.stats.corners[0])}%` }}
                  />
                </div>
              </div>

              {/* Fouls */}
              <div className="stat-row">
                <div className="stat-row-header">
                  <span>{match.stats.fouls[0]}</span>
                  <span className="stat-title">Fouls</span>
                  <span>{match.stats.fouls[1]}</span>
                </div>
                <div className="stat-bar-outer">
                  <div 
                    className="stat-bar-fill home" 
                    style={{ width: `${getStatPercent(match.stats.fouls[0], match.stats.fouls[1])}%` }}
                  />
                  <div 
                    className="stat-bar-fill away" 
                    style={{ width: `${getStatPercent(match.stats.fouls[1], match.stats.fouls[0])}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Lineups Tab */}
          {activeTab === "lineups" && (
            <div className="lineup-grid">
              <div className="lineup-team">
                <h4>{match.homeTeam.name}</h4>
                <ul className="lineup-list">
                  {homeLineup.map((p, i) => (
                    <li key={i} className="lineup-player">
                      <span>
                        <span className="player-num">{p.number}</span>
                        {p.name}
                      </span>
                      <span className="player-pos">{p.pos}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lineup-team">
                <h4>{match.awayTeam.name}</h4>
                <ul className="lineup-list">
                  {awayLineup.map((p, i) => (
                    <li key={i} className="lineup-player">
                      <span>
                        <span className="player-num">{p.number}</span>
                        {p.name}
                      </span>
                      <span className="player-pos">{p.pos}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
