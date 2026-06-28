import { NextResponse } from "next/server";
import { TEAMS_SEED } from "@/lib/simulation";

interface ApiGame {
  id: string;
  home_team_id: string;
  away_team_id: string;
  home_score: string;
  away_score: string;
  home_scorers: string;
  away_scorers: string;
  group: string;
  matchday: string;
  local_date: string;
  finished: string;
  time_elapsed: string;
  home_team_name_en?: string;
  away_team_name_en?: string;
  home_team_label?: string;
  away_team_label?: string;
  stadium_id?: string;
  type: string;
}

function normalizeTeamName(name: string): string {
  if (!name) return "tbd";
  const mapping: Record<string, string> = {
    "czech republic": "czechia",
    "czechia": "czechia",
    "korea republic": "south korea",
    "south korea": "south korea",
    "cote d'ivoire": "ivory coast",
    "ivory coast": "ivory coast",
    "ir iran": "iran",
    "iran": "iran",
    "cabo verde": "cape verde",
    "cape verde": "cape verde",
    "united states": "united states",
    "usa": "united states",
    "democratic republic of the congo": "dr congo",
    "congo dr": "dr congo",
    "republic of ireland": "ireland",
  };
  return mapping[name.toLowerCase()] || name.toLowerCase();
}

function getStableColorsForTeam(name: string): string[] {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color1 = `hsl(${Math.abs(hash % 360)}, 65%, 45%)`;
  const color2 = `hsl(${Math.abs((hash * 13) % 360)}, 65%, 45%)`;
  return [color1, color2];
}

const getTeamByApiName = (apiName: string): any => {
  const normalized = normalizeTeamName(apiName);
  const found = TEAMS_SEED.find(
    (t) =>
      normalizeTeamName(t.name) === normalized ||
      normalizeTeamName(t.shortName) === normalized
  );
  if (found) return found;

  const cleanName = apiName.trim();
  const shortName = cleanName.substring(0, 3).toUpperCase();
  return {
    id: cleanName.toLowerCase().replace(/\s+/g, "-"),
    name: cleanName,
    shortName,
    group: "N/A",
    rating: 80,
    flagColors: getStableColorsForTeam(cleanName),
  };
};

function parseScorers(scorersStr: string): string[] {
  if (!scorersStr || scorersStr === "null" || scorersStr === "undefined") return [];
  try {
    if (scorersStr.startsWith("{") && scorersStr.endsWith("}")) {
      const content = scorersStr.slice(1, -1);
      const parsed: string[] = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < content.length; i++) {
        const char = content[i];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === "," && !inQuotes) {
          parsed.push(current.replace(/\\"/g, '"').trim());
          current = "";
        } else {
          current += char;
        }
      }
      if (current) parsed.push(current.replace(/\\"/g, '"').trim());
      return parsed.filter(Boolean);
    }
    const parsed = JSON.parse(scorersStr);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    // Fallback split
  }
  return [];
}

const STADIUMS_MAP: Record<string, string> = {
  "1": "Estadio Azteca, Mexico City",
  "2": "Estadio Akron, Guadalajara",
  "3": "BMO Field, Toronto",
  "4": "SoFi Stadium, Los Angeles (CA)",
  "5": "Levi's Stadium, Santa Clara (CA)",
  "6": "Arrowhead Stadium, Kansas City (MO)",
  "7": "MetLife Stadium, East Rutherford (NJ)",
  "8": "Hard Rock Stadium, Miami (FL)",
  "9": "Gillette Stadium, Foxborough (MA)",
  "10": "Lincoln Financial Field, Philadelphia (PA)",
  "11": "Estadio BBVA, Monterrey",
  "12": "BMO Field, Toronto",
  "13": "BC Place, Vancouver",
  "14": "Lumen Field, Seattle (WA)",
  "15": "NRG Stadium, Houston (TX)",
  "16": "SoFi Stadium, Los Angeles (CA)",
};

export async function GET() {
  try {
    // Fetch live matches from worldcup26.ir with API key authentication
    const token = process.env.WORLD_CUP_API_KEY || "";
    const response = await fetch("https://worldcup26.ir/get/games", {
      headers: {
        "Authorization": `Bearer ${token}`,
        "apikey": token,
        "x-api-key": token
      },
      next: { revalidate: 60 }, // Cache on CDN for 60 seconds
    });
    if (!response.ok) throw new Error("HTTP error fetching games");
    const data = await response.json();

    if (data && data.games && Array.isArray(data.games)) {
      const apiGames: ApiGame[] = data.games;

      const mappedMatches = apiGames.map((game) => {
        const homeName = game.home_team_name_en || game.home_team_label || "TBD";
        const awayName = game.away_team_name_en || game.away_team_label || "TBD";
        const homeTeam = getTeamByApiName(homeName);
        const awayTeam = getTeamByApiName(awayName);

        const isFinished = game.finished === "TRUE";
        const isLive = game.finished === "FALSE" && game.time_elapsed !== "notstarted";
        const status = isFinished ? "finished" : isLive ? "live" : "scheduled";

        // Parse scorers to goals
        const events: any[] = [];
        const homeGoals = parseScorers(game.home_scorers);
        homeGoals.forEach((goal, idx) => {
          const minMatch = goal.match(/(\d+)/);
          const min = minMatch ? parseInt(minMatch[1]) : 45;
          const player = goal.replace(/\s*\d+'?.*$/, "").trim();
          events.push({
            id: `e-${game.id}-h-${idx}`,
            type: "goal",
            minute: min,
            teamId: "home",
            player: player,
          });
        });

        const awayGoals = parseScorers(game.away_scorers);
        awayGoals.forEach((goal, idx) => {
          const minMatch = goal.match(/(\d+)/);
          const min = minMatch ? parseInt(minMatch[1]) : 45;
          const player = goal.replace(/\s*\d+'?.*$/, "").trim();
          events.push({
            id: `e-${game.id}-a-${idx}`,
            type: "goal",
            minute: min,
            teamId: "away",
            player: player,
          });
        });
        events.sort((a, b) => a.minute - b.minute);

        // Date & Time conversion to UAE timings
        const dateParts = game.local_date.split(" ");
        const dPart = dateParts[0];
        const tPart = dateParts[1] || "12:00";
        const [mStr, dStr, yStr] = dPart.split("/");
        
        let month = parseInt(mStr);
        let day = parseInt(dStr);
        let year = parseInt(yStr);
        let hours = parseInt(tPart.split(":")[0]);
        let minutes = parseInt(tPart.split(":")[1]);

        // Get offset based on stadium_id
        const stadiumId = game.stadium_id || "1";
        let offset = 9; // Default (CDT, UTC-5 -> GST, UTC+4)
        if (["3", "7", "9", "10", "12", "14"].includes(stadiumId)) {
          offset = 8; // EDT (UTC-4 -> GST, UTC+4)
        } else if (["4", "13", "16"].includes(stadiumId)) {
          offset = 11; // PDT (UTC-7 -> GST, UTC+4)
        }

        let uaeHours = hours + offset;
        if (uaeHours >= 24) {
          uaeHours -= 24;
          day += 1;
        }

        const timeStr = `${String(uaeHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} GST`;
        const months = [
          "June", // The tournament starts in June
          "June",
          "June",
          "June",
          "June",
          "June",
          "July",
        ];
        // We know World Cup 2026 runs in June and July. local_date is format MM/DD/YYYY
        const monthsList = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const dateStr = `${monthsList[month - 1]} ${day}, ${year}`;

        // Standard stats estimation
        const homeScore = parseInt(game.home_score) || 0;
        const awayScore = parseInt(game.away_score) || 0;

        const ratingDiff = homeTeam.rating - awayTeam.rating;
        const totalShotsHome = 8 + homeScore * 2 + (parseInt(game.id) % 5);
        const totalShotsAway = 7 + awayScore * 2 + (parseInt(game.id) % 7);
        const targetHome = Math.min(totalShotsHome, homeScore + 2);
        const targetAway = Math.min(totalShotsAway, awayScore + 2);
        const possessionHome = Math.min(70, Math.max(30, 50 + Math.round(ratingDiff * 0.1)));

        return {
          id: `m-${game.id}`,
          group: game.type === "group" ? `Group ${game.group}` : game.type.toUpperCase().replace("R32", "Round of 32").replace("R16", "Round of 16").replace("QF", "Quarter-finals").replace("SF", "Semi-finals").replace("FINAL", "FINAL"),
          homeTeam,
          awayTeam,
          status,
          homeScore,
          awayScore,
          minute: status === "finished" ? 90 : isLive ? parseInt(game.time_elapsed) || 45 : 0,
          events,
          stats: {
            possession: [possessionHome, 100 - possessionHome],
            shots: [totalShotsHome, totalShotsAway],
            shotsOnTarget: [targetHome, targetAway],
            fouls: [10 + (parseInt(game.id) % 4), 11 + (parseInt(game.id) % 6)],
            corners: [4 + homeScore, 3 + awayScore],
          },
          venue: STADIUMS_MAP[stadiumId] || "World Cup Stadium",
          date: dateStr,
          time: timeStr,
        };
      });

      return NextResponse.json({ success: true, games: mappedMatches });
    }
    throw new Error("Invalid structure from games API");
  } catch (err: any) {
    console.error("API proxy fetch error:", err);
    return NextResponse.json({ 
      success: false, 
      error: err.message, 
      cause: err.cause?.message || err.cause || null 
    }, { status: 500 });
  }
}
