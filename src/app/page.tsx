"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Match,
  generateFixtures,
  calculateStandings,
  GroupStanding
} from "../lib/simulation";
import Header from "../components/Header";
import MatchCard from "../components/MatchCard";
import MatchDetailModal from "../components/MatchDetailModal";
import StandingsTable from "../components/StandingsTable";

export default function Home() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState<string | null>(null);
  
  // Standings state
  const [standings, setStandings] = useState<Record<string, GroupStanding[]>>({});
  
  // Track if we loaded state from localStorage to prevent SSR mismatch
  const [isLoaded, setIsLoaded] = useState(false);

  // 1. Initial State Loading & Live API Fetch
  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        const res = await fetch("/api/matches");
        if (!res.ok) throw new Error("Backend response error");
        const data = await res.json();
        if (data.success && Array.isArray(data.games)) {
          setMatches(data.games);
          setStandings(calculateStandings(data.games));
          localStorage.setItem("fifa_2026_scorecard_matches_v2", JSON.stringify(data.games));
          setIsLoaded(true);
          return;
        }
      } catch (err) {
        console.warn("Could not fetch live matches from API proxy, trying local storage:", err);
      }

      // Fallback: load from local storage
      const saved = localStorage.getItem("fifa_2026_scorecard_matches_v2");
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as Match[];
          setMatches(parsed);
          setStandings(calculateStandings(parsed));
        } catch (e) {
          const fresh = generateFixtures();
          setMatches(fresh);
          setStandings(calculateStandings(fresh));
        }
      } else {
        const fresh = generateFixtures();
        setMatches(fresh);
        setStandings(calculateStandings(fresh));
      }
      setIsLoaded(true);
    };

    fetchLiveMatches();
  }, []);

  // 2. Save local changes (fallback sync)
  useEffect(() => {
    if (isLoaded && matches.length > 0) {
      localStorage.setItem("fifa_2026_scorecard_matches_v2", JSON.stringify(matches));
      setStandings(calculateStandings(matches));
    }
  }, [matches, isLoaded]);



  if (!isLoaded) {
    return (
      <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", background: "var(--bg-main)", color: "var(--primary-neon)" }}>
        <div style={{ textAlign: "center" }}>
          <div className="live-dot" style={{ width: "24px", height: "24px", margin: "0 auto 1rem" }} />
          <h2 style={{ letterSpacing: "0.1em" }}>LOADING TOURNAMENT ENGINE...</h2>
        </div>
      </div>
    );
  }

  // Statistics summaries
  const liveMatches = matches.filter((m) => m.status === "live");
  const finishedMatches = matches.filter((m) => m.status === "finished");
  const totalGoals = matches.reduce((acc, m) => acc + m.homeScore + m.awayScore, 0);

  // Split matches for the two-box layout
  const upcomingMatches = [...matches].sort((a, b) => {
    const monthMap: Record<string, number> = { "June": 6, "July": 7 };
    const partsA = a.date.split(" ");
    const partsB = b.date.split(" ");
    const monthA = monthMap[partsA[0]] || 6;
    const monthB = monthMap[partsB[0]] || 6;
    const dayA = parseInt(partsA[1]);
    const dayB = parseInt(partsB[1]);
    
    if (monthA !== monthB) return monthA - monthB;
    if (dayA !== dayB) return dayA - dayB;
    return a.time.localeCompare(b.time);
  });

  const completedMatches = matches
    .filter((m) => m.status === "finished" || m.status === "live")
    .sort((a, b) => {
      // Sort live matches to the top
      if (a.status === "live" && b.status !== "live") return -1;
      if (b.status === "live" && a.status !== "live") return 1;
      // Sort finished matches by date descending (latest first)
      const dayA = parseInt(a.date.split(" ")[1]);
      const dayB = parseInt(b.date.split(" ")[1]);
      return dayB - dayA;
    });

  const selectedMatch = matches.find((m) => m.id === selectedMatchId) || null;

  return (
    <div className="app-container">
      <Header
        totalMatches={matches.length}
        liveMatches={liveMatches.length}
        totalGoals={totalGoals}
      />


      {/* Main Grid Dashboard */}
      <main className="dashboard-grid">
        
        {/* Box 1: Upcoming Matches */}
        <section className="matches-section">
          <h2 className="section-title">
            📅 Full Match Schedule
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxHeight: "75vh", overflowY: "auto", paddingRight: "0.35rem" }}>
            {upcomingMatches.length === 0 ? (
              <div style={{ background: "var(--bg-card)", border: "1px dashed var(--border-color)", padding: "3rem 1.5rem", borderRadius: "16px", textAlign: "center", color: "var(--text-muted)" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>📅</span>
                No schedule matches found.
              </div>
            ) : (
              upcomingMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onClick={() => setSelectedMatchId(match.id)}
                />
              ))
            )}
          </div>
        </section>

        {/* Box 2: Completed Matches */}
        <section className="matches-section">
          <h2 className="section-title">
            🏁 Completed Results
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxHeight: "75vh", overflowY: "auto", paddingRight: "0.35rem" }}>
            {completedMatches.length === 0 ? (
              <div style={{ background: "var(--bg-card)", border: "1px dashed var(--border-color)", padding: "3rem 1.5rem", borderRadius: "16px", textAlign: "center", color: "var(--text-muted)" }}>
                <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>🏟️</span>
                No completed matches found.
              </div>
            ) : (
              completedMatches.map((match) => (
                <MatchCard
                  key={match.id}
                  match={match}
                  onClick={() => setSelectedMatchId(match.id)}
                />
              ))
            )}
          </div>
        </section>

        {/* Group Standings Sidebar */}
        <aside>
          <StandingsTable standings={standings} />
        </aside>
      </main>



      {/* Match Details Overlay Modal */}
      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          onClose={() => setSelectedMatchId(null)}
        />
      )}
    </div>
  );
}
