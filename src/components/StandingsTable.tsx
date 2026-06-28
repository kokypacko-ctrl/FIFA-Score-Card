import React, { useState } from "react";
import { GroupStanding } from "../lib/simulation";
import TeamFlag from "./TeamFlag";

interface StandingsTableProps {
  standings: Record<string, GroupStanding[]>;
}

export default function StandingsTable({ standings }: StandingsTableProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>("Group A");
  
  const groupsList = [
    "Group A", "Group B", "Group C", "Group D", "Group E", "Group F",
    "Group G", "Group H", "Group I", "Group J", "Group K", "Group L"
  ];

  const currentStandings = standings[selectedGroup.replace("Group ", "")] || [];

  return (
    <div className="standings-panel">
      <h3 className="section-title" style={{ marginBottom: "1rem" }}>
        🏆 Group Standings
      </h3>

      {/* Group Pills Selector */}
      <div className="group-select-grid">
        {groupsList.map((grp) => (
          <button
            key={grp}
            className={`group-pill-btn ${selectedGroup === grp ? "active" : ""}`}
            onClick={() => setSelectedGroup(grp)}
          >
            {grp.replace("Group ", "")}
          </button>
        ))}
      </div>

      {/* Standings Table */}
      <table className="standings-table">
        <thead>
          <tr>
            <th style={{ width: "25px", textAlign: "center" }}>#</th>
            <th>Team</th>
            <th style={{ textAlign: "center", width: "30px" }}>PL</th>
            <th style={{ textAlign: "center", width: "40px" }}>GD</th>
            <th style={{ textAlign: "center", width: "45px" }}>PTS</th>
          </tr>
        </thead>
        <tbody>
          {currentStandings.map((teamStanding, index) => {
            // Under World Cup 2026, top 2 from each of the 12 groups + 8 best 3rd place teams advance
            const isQualifyingZone = index < 2; 

            return (
              <tr key={teamStanding.teamId}>
                <td style={{ textAlign: "center", fontWeight: 700, color: "var(--text-muted)" }}>
                  {index + 1}
                </td>
                <td>
                  <div className="table-team">
                    <TeamFlag 
                      colors={teamStanding.flagColors} 
                      short={teamStanding.teamShort} 
                      width="32px" 
                      height="20px" 
                    />
                    <span 
                      style={{ 
                        color: isQualifyingZone ? "var(--text-primary)" : "var(--text-secondary)",
                        fontWeight: isQualifyingZone ? 600 : 400 
                      }}
                      title={teamStanding.teamName}
                    >
                      {teamStanding.teamShort}
                    </span>
                  </div>
                </td>
                <td style={{ textAlign: "center", fontFamily: "monospace" }}>
                  {teamStanding.played}
                </td>
                <td 
                  style={{ 
                    textAlign: "center", 
                    fontFamily: "monospace",
                    color: teamStanding.goalDifference > 0 ? "var(--primary-neon)" : teamStanding.goalDifference < 0 ? "var(--live-red)" : "inherit"
                  }}
                >
                  {teamStanding.goalDifference > 0 ? `+${teamStanding.goalDifference}` : teamStanding.goalDifference}
                </td>
                <td className="points-col" style={{ textAlign: "center", fontFamily: "monospace" }}>
                  {teamStanding.points}
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
      
      <div style={{ marginTop: "1rem", fontSize: "0.7rem", color: "var(--text-muted)", textAlign: "center" }}>
        💚 Highlighted teams are in the qualifying positions.
      </div>
    </div>
  );
}
