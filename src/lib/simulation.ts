// FIFA 2026 World Cup Match Simulation Engine (TypeScript)

export interface Team {
  id: string;
  name: string;
  shortName: string;
  group: string;
  rating: number; // 50 to 99, used for simulating match results
  flagColors: string[]; // 2 colors representing the flag for CSS rendering
}

export interface MatchEvent {
  id: string;
  type: "goal" | "yellow_card" | "red_card" | "substitution";
  minute: number;
  teamId: string;
  player: string;
  detail?: string;
}

export interface MatchStats {
  possession: [number, number];
  shots: [number, number];
  shotsOnTarget: [number, number];
  fouls: [number, number];
  corners: [number, number];
}

export interface Match {
  id: string;
  group: string;
  homeTeam: Team;
  awayTeam: Team;
  status: "scheduled" | "live" | "finished";
  homeScore: number;
  awayScore: number;
  minute: number;
  events: MatchEvent[];
  stats: MatchStats;
  venue: string;
  date: string;
  time: string;
  ticketSales?: string;
}

export interface GroupStanding {
  teamId: string;
  teamName: string;
  teamShort: string;
  flagColors: string[];
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
}

// 48 Seeded Teams for 2026 FIFA World Cup (Groups A - L)
export const TEAMS_SEED: Team[] = [
  // Group A
  { id: "cze", name: "Czechia", shortName: "CZE", group: "A", rating: 80, flagColors: ["#11457e", "#d7141a"] },
  { id: "mex", name: "Mexico", shortName: "MEX", group: "A", rating: 83, flagColors: ["#006847", "#ce1126"] },
  { id: "rsa", name: "South Africa", shortName: "RSA", group: "A", rating: 80, flagColors: ["#e51b24", "#007a4a"] },
  { id: "kor", name: "South Korea", shortName: "KOR", group: "A", rating: 83, flagColors: ["#ffffff", "#cd2e3a"] },
  // Group B
  { id: "bih", name: "Bosnia and Herzegovina", shortName: "BIH", group: "B", rating: 78, flagColors: ["#002395", "#fecb00"] },
  { id: "can", name: "Canada", shortName: "CAN", group: "B", rating: 81, flagColors: ["#ff0000", "#ffffff"] },
  { id: "qat", name: "Qatar", shortName: "QAT", group: "B", rating: 74, flagColors: ["#8a1538", "#ffffff"] },
  { id: "sui", name: "Switzerland", shortName: "SUI", group: "B", rating: 84, flagColors: ["#d52b1e", "#ffffff"] },
  // Group C
  { id: "bra", name: "Brazil", shortName: "BRA", group: "C", rating: 92, flagColors: ["#009739", "#fedf00"] },
  { id: "hai", name: "Haiti", shortName: "HAI", group: "C", rating: 73, flagColors: ["#00209f", "#d21034"] },
  { id: "mar", name: "Morocco", shortName: "MAR", group: "C", rating: 86, flagColors: ["#c1272d", "#006233"] },
  { id: "sco", name: "Scotland", shortName: "SCO", group: "C", rating: 79, flagColors: ["#005eb8", "#ffffff"] },
  // Group D
  { id: "aus", name: "Australia", shortName: "AUS", group: "D", rating: 79, flagColors: ["#00008b", "#ffffff"] },
  { id: "par", name: "Paraguay", shortName: "PAR", group: "D", rating: 79, flagColors: ["#d52b1e", "#0038a8"] },
  { id: "tur", name: "Turkey", shortName: "TUR", group: "D", rating: 82, flagColors: ["#e30a17", "#ffffff"] },
  { id: "usa", name: "United States", shortName: "USA", group: "D", rating: 85, flagColors: ["#0a3161", "#b22234"] },
  // Group E
  { id: "cur", name: "Curaçao", shortName: "CUW", group: "E", rating: 73, flagColors: ["#002b7f", "#f9e814"] },
  { id: "ecu", name: "Ecuador", shortName: "ECU", group: "E", rating: 82, flagColors: ["#ffdd00", "#001489"] },
  { id: "ger", name: "Germany", shortName: "GER", group: "E", rating: 90, flagColors: ["#000000", "#dd0000"] },
  { id: "civ", name: "Ivory Coast", shortName: "CIV", group: "E", rating: 80, flagColors: ["#f77f00", "#009e60"] },
  // Group F
  { id: "jpn", name: "Japan", shortName: "JPN", group: "F", rating: 85, flagColors: ["#ffffff", "#bc002d"] },
  { id: "ned", name: "Netherlands", shortName: "NED", group: "F", rating: 89, flagColors: ["#21468b", "#ae1c28"] },
  { id: "swe", name: "Sweden", shortName: "SWE", group: "F", rating: 82, flagColors: ["#006aa7", "#fecc00"] },
  { id: "tun", name: "Tunisia", shortName: "TUN", group: "F", rating: 77, flagColors: ["#e70013", "#ffffff"] },
  // Group G
  { id: "bel", name: "Belgium", shortName: "BEL", group: "G", rating: 86, flagColors: ["#000000", "#ffd100"] },
  { id: "egy", name: "Egypt", shortName: "EGY", group: "G", rating: 80, flagColors: ["#ce1126", "#000000"] },
  { id: "irn", name: "Iran", shortName: "IRN", group: "G", rating: 78, flagColors: ["#228b22", "#da291c"] },
  { id: "nzl", name: "New Zealand", shortName: "NZL", group: "G", rating: 72, flagColors: ["#00247d", "#ffffff"] },
  // Group H
  { id: "cpv", name: "Cape Verde", shortName: "CPV", group: "H", rating: 75, flagColors: ["#002a8f", "#d21034"] },
  { id: "ksa", name: "Saudi Arabia", shortName: "KSA", group: "H", rating: 76, flagColors: ["#006c35", "#ffffff"] },
  { id: "esp", name: "Spain", shortName: "ESP", group: "H", rating: 93, flagColors: ["#c60b1e", "#ffc400"] },
  { id: "uru", name: "Uruguay", shortName: "URU", group: "H", rating: 87, flagColors: ["#0081c8", "#ffffff"] },
  // Group I
  { id: "fra", name: "France", shortName: "FRA", group: "I", rating: 93, flagColors: ["#002395", "#ed2939"] },
  { id: "irq", name: "Iraq", shortName: "IRQ", group: "I", rating: 75, flagColors: ["#ce1126", "#007a3d"] },
  { id: "nor", name: "Norway", shortName: "NOR", group: "I", rating: 80, flagColors: ["#ba0c2f", "#00205b"] },
  { id: "sen", name: "Senegal", shortName: "SEN", group: "I", rating: 83, flagColors: ["#00853f", "#e31b23"] },
  // Group J
  { id: "alg", name: "Algeria", shortName: "ALG", group: "J", rating: 78, flagColors: ["#006633", "#d21034"] },
  { id: "arg", name: "Argentina", shortName: "ARG", group: "J", rating: 94, flagColors: ["#75aadb", "#ffffff"] },
  { id: "aut", name: "Austria", shortName: "AUT", group: "J", rating: 83, flagColors: ["#ed2939", "#ffffff"] },
  { id: "jor", name: "Jordan", shortName: "JOR", group: "J", rating: 74, flagColors: ["#ce1126", "#007a3d"] },
  // Group K
  { id: "col", name: "Colombia", shortName: "COL", group: "K", rating: 86, flagColors: ["#fcd116", "#003893"] },
  { id: "cod", name: "DR Congo", shortName: "COD", group: "K", rating: 77, flagColors: ["#007fff", "#ce1126"] },
  { id: "por", name: "Portugal", shortName: "POR", group: "K", rating: 90, flagColors: ["#006600", "#ff0000"] },
  { id: "uzb", name: "Uzbekistan", shortName: "UZB", group: "K", rating: 77, flagColors: ["#0099b8", "#1eb53a"] },
  // Group L
  { id: "cro", name: "Croatia", shortName: "CRO", group: "L", rating: 87, flagColors: ["#ff0000", "#171796"] },
  { id: "eng", name: "England", shortName: "ENG", group: "L", rating: 91, flagColors: ["#ffffff", "#cf081f"] },
  { id: "gha", name: "Ghana", shortName: "GHA", group: "L", rating: 77, flagColors: ["#fcd116", "#006b3f"] },
  { id: "pan", name: "Panama", shortName: "PAN", group: "L", rating: 76, flagColors: ["#da121a", "#072357"] }
];

export const STADIUMS = [
  "MetLife Stadium, East Rutherford (NJ)",
  "Estadio Azteca, Mexico City",
  "SoFi Stadium, Los Angeles (CA)",
  "BC Place, Vancouver",
  "AT&T Stadium, Arlington (TX)",
  "Mercedes-Benz Stadium, Atlanta (GA)",
  "Hard Rock Stadium, Miami (FL)",
  "Lincoln Financial Field, Philadelphia (PA)",
  "Lumen Field, Seattle (WA)",
  "Gillette Stadium, Foxborough (MA)",
  "NRG Stadium, Houston (TX)",
  "Levi's Stadium, Santa Clara (CA)",
  "Arrowhead Stadium, Kansas City (MO)",
  "Estadio BBVA, Monterrey",
  "Estadio Akron, Guadalajara",
  "BMO Field, Toronto"
];

// Generate fixtures chronologically from June 11 to June 27, 2026
export function generateFixtures(): Match[] {
  const matches: Match[] = [];
  let matchId = 1;
  
  const groups = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
  
  groups.forEach((groupChar, groupIndex) => {
    const groupTeams = TEAMS_SEED.filter(t => t.group === groupChar);
    
    // Standard round-robin pairings for 4 teams [0, 1, 2, 3]
    const pairings = [
      { homeIdx: 0, awayIdx: 1, dayOffset: 0, time: "15:00" },
      { homeIdx: 2, awayIdx: 3, dayOffset: 0, time: "18:00" },
      { homeIdx: 0, awayIdx: 2, dayOffset: 4, time: "15:00" },
      { homeIdx: 1, awayIdx: 3, dayOffset: 4, time: "20:00" },
      { homeIdx: 3, awayIdx: 0, dayOffset: 8, time: "16:00" },
      { homeIdx: 1, awayIdx: 2, dayOffset: 8, time: "16:00" }
    ];
    
    pairings.forEach((pair) => {
      const home = groupTeams[pair.homeIdx];
      const away = groupTeams[pair.awayIdx];
      
      let day = 11 + pair.dayOffset + Math.floor(groupIndex / 3); // USA base date
      const [hours, minutes] = pair.time.split(":").map(Number);
      
      // Shift from US Eastern Time (UTC-5) to UAE GST (UTC+4) (+9 hours)
      let uaeHours = hours + 9;
      if (uaeHours >= 24) {
        uaeHours -= 24;
        day += 1;
      }
      
      const timeStr = `${String(uaeHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} GST`;
      const dateStr = `June ${day}, 2026`;
      const stadiumIdx = (matchId - 1) % STADIUMS.length;
      
      // Deterministic scoring calculation based on team ratings
      const ratingDiff = home.rating - away.rating;
      const isHomeHost = ["USA", "MEX", "CAN"].includes(home.shortName);
      const isAwayHost = ["USA", "MEX", "CAN"].includes(away.shortName);
      const homeAdv = isHomeHost ? 0.35 : 0;
      const awayAdv = isAwayHost ? 0.35 : 0;
      
      const homeExpected = 1.35 + (ratingDiff / 75) + homeAdv - awayAdv;
      const awayExpected = 1.25 - (ratingDiff / 75) + awayAdv - homeAdv;
      
      // Pseudo-random variance using matchId
      const varianceHome = ((matchId * 17) % 5) - 2; 
      const varianceAway = ((matchId * 31) % 5) - 2;
      
      let homeScore = Math.max(0, Math.round(homeExpected + varianceHome * 0.45));
      let awayScore = Math.max(0, Math.round(awayExpected + varianceAway * 0.45));
      
      homeScore = Math.min(6, homeScore);
      awayScore = Math.min(6, awayScore);
      
      // Stats
      const totalShotsHome = 8 + (homeScore * 2) + ((matchId * 7) % 5);
      const totalShotsAway = 7 + (awayScore * 2) + ((matchId * 9) % 5);
      const targetHome = Math.min(totalShotsHome, homeScore + 2 + ((matchId * 3) % 3));
      const targetAway = Math.min(totalShotsAway, awayScore + 2 + ((matchId * 5) % 3));
      const possessionHome = Math.min(75, Math.max(25, Math.round(50 + (ratingDiff * 0.15) + ((matchId * 13) % 11) - 5)));
      const possessionAway = 100 - possessionHome;
      const foulsHome = 8 + ((matchId * 11) % 7);
      const foulsAway = 9 + ((matchId * 13) % 7);
      const cornersHome = 3 + homeScore + ((matchId * 2) % 4);
      const cornersAway = 2 + awayScore + ((matchId * 3) % 4);
      
      // Events (Goals)
      const events: MatchEvent[] = [];
      for (let i = 0; i < homeScore; i++) {
        const min = 5 + (i * 20) + ((matchId * (i + 1) * 7) % 15);
        events.push({
          id: `e-${matchId}-gh-${i}`,
          type: "goal",
          minute: min,
          teamId: "home",
          player: LAST_NAMES[(matchId * (i + 1) * 3) % LAST_NAMES.length]
        });
      }
      for (let i = 0; i < awayScore; i++) {
        const min = 8 + (i * 20) + ((matchId * (i + 2) * 11) % 15);
        events.push({
          id: `e-${matchId}-ga-${i}`,
          type: "goal",
          minute: min,
          teamId: "away",
          player: LAST_NAMES[(matchId * (i + 2) * 5) % LAST_NAMES.length]
        });
      }
      events.sort((a, b) => a.minute - b.minute);
      
      matches.push({
        id: `m-${matchId++}`,
        group: `Group ${groupChar}`,
        homeTeam: home,
        awayTeam: away,
        status: "finished",
        homeScore,
        awayScore,
        minute: 90,
        events,
        stats: {
          possession: [possessionHome, possessionAway],
          shots: [totalShotsHome, totalShotsAway],
          shotsOnTarget: [targetHome, targetAway],
          fouls: [foulsHome, foulsAway],
          corners: [cornersHome, cornersAway]
        },
        venue: STADIUMS[stadiumIdx],
        date: dateStr,
        time: timeStr
      });
    });
  });
  
  // Seed the 16 upcoming Round of 32 knockout matches
  const r32Pairings = [
    { homeShort: "RSA", awayShort: "CAN", date: "June 28, 2026", time: "23:00 GST" },
    { homeShort: "MEX", awayShort: "COL", date: "June 28, 2026", time: "23:00 GST" },
    { homeShort: "CAN", awayShort: "JPN", date: "June 29, 2026", time: "20:00 GST" },
    { homeShort: "ARG", awayShort: "DEN", date: "June 29, 2026", time: "23:00 GST" },
    { homeShort: "FRA", awayShort: "SUI", date: "June 30, 2026", time: "20:00 GST" },
    { homeShort: "BRA", awayShort: "CRO", date: "June 30, 2026", time: "23:00 GST" },
    { homeShort: "ENG", awayShort: "URU", date: "July 1, 2026", time: "20:00 GST" },
    { homeShort: "ESP", awayShort: "BEL", date: "July 1, 2026", time: "23:00 GST" },
    { homeShort: "GER", awayShort: "UKR", date: "July 2, 2026", time: "20:00 GST" },
    { homeShort: "POR", awayShort: "AUT", date: "July 2, 2026", time: "23:00 GST" },
    { homeShort: "ITA", awayShort: "SWE", date: "July 3, 2026", time: "20:00 GST" },
    { homeShort: "NED", awayShort: "MAR", date: "July 3, 2026", time: "23:00 GST" },
    { homeShort: "WAL", awayShort: "ECU", date: "July 4, 2026", time: "20:00 GST" },
    { homeShort: "NOR", awayShort: "TUR", date: "July 4, 2026", time: "23:00 GST" },
    { homeShort: "NGA", awayShort: "KOR", date: "July 5, 2026", time: "20:00 GST" },
    { homeShort: "SEN", awayShort: "CIV", date: "July 5, 2026", time: "23:00 GST" }
  ];
  
  r32Pairings.forEach((pair) => {
    const home = TEAMS_SEED.find(t => t.shortName === pair.homeShort)!;
    const away = TEAMS_SEED.find(t => t.shortName === pair.awayShort)!;
    const stadiumIdx = (matchId - 1) % STADIUMS.length;
    
    matches.push({
      id: `m-${matchId++}`,
      group: "Round of 32",
      homeTeam: home,
      awayTeam: away,
      status: "scheduled",
      homeScore: 0,
      awayScore: 0,
      minute: 0,
      events: [],
      stats: {
        possession: [50, 50],
        shots: [0, 0],
        shotsOnTarget: [0, 0],
        fouls: [0, 0],
        corners: [0, 0]
      },
      venue: STADIUMS[stadiumIdx],
      date: pair.date,
      time: pair.time
    });
  });
  
  return matches;
}

// Substantial player databases to pick random scorers
const LAST_NAMES = [
  "Smith", "Johnson", "Rodriguez", "Hernandez", "Mbappe", "Griezmann", "Messi", "Alvarez",
  "Müller", "Sane", "Kane", "Bellingham", "Pulisic", "Reyna", "Lozano", "Jimenez",
  "Davies", "David", "Modric", "Kramaric", "Neymar", "Vinicius", "Mitrovic", "Tadic",
  "Salah", "Elneny", "Son", "Hwang", "Ziyech", "Hakimi", "Endo", "Mitoma", "Osimhen",
  "Lookman", "De Bruyne", "Lukaku", "Pedri", "Morata", "Ronaldo", "Fernandes", "Depay",
  "Gakpo", "Arnautovic", "Calhanoglu", "Yilmaz", "McTominay", "Adams", "Traore", "Mina"
];

const FIRST_NAMES = [
  "Christian", "Weston", "Santiago", "Edson", "Alphonso", "Jonathan", "Lionel", "Julian",
  "Kylian", "Antoine", "Thomas", "Leroy", "Harry", "Jude", "Luka", "Andrej",
  "Mohamed", "Heung-min", "Hakim", "Achraf", "Wataru", "Kaoru", "Victor", "Ademola",
  "Kevin", "Romelu", "Alvaro", "Cristiano", "Bruno", "Memphis", "Cody", "Marko",
  "Hakan", "Burak", "Scott", "Che", "Hamari", "Yerry", "Robert", "Alexis", "Luis"
];

function getRandomPlayer(team: Team): string {
  // Use team-specific initials or styling to make it feel somewhat realistic
  const f = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const l = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
  return `${f.charAt(0)}. ${l}`;
}

// Simulates a single tick of action for a live match (runs every second or speed multiplier)
export function simulateLiveTick(match: Match): { updatedMatch: Match; newGoal: boolean; goalEvent?: MatchEvent } {
  if (match.status !== "live") return { updatedMatch: match, newGoal: false };
  
  const updatedMatch = { ...match };
  updatedMatch.minute += 1;
  
  let newGoal = false;
  let goalEvent: MatchEvent | undefined;
  
  // Calculate relative ratings weights
  const totalRating = match.homeTeam.rating + match.awayTeam.rating;
  const homeProb = match.homeTeam.rating / totalRating;
  
  // 1. Stat accumulation ticks
  // Randomly increment shots, possession updates, fouls
  const actionChance = Math.random();
  const updatedStats = { ...updatedMatch.stats };
  
  // Update possession dynamically around team strengths
  const basePossession = Math.floor(homeProb * 100) + Math.floor(Math.random() * 11) - 5;
  const cappedPoss = Math.max(25, Math.min(75, basePossession));
  updatedStats.possession = [cappedPoss, 100 - cappedPoss];
  
  if (actionChance < 0.2) { // 20% chance of stat action
    const side = Math.random() < homeProb ? 0 : 1; // home vs away
    const eventRoll = Math.random();
    
    if (eventRoll < 0.4) {
      updatedStats.shots[side] += 1;
      if (Math.random() < 0.4) {
        updatedStats.shotsOnTarget[side] += 1;
      }
    } else if (eventRoll < 0.7) {
      updatedStats.fouls[side] += 1;
    } else {
      updatedStats.corners[side] += 1;
    }
  }
  updatedMatch.stats = updatedStats;
  
  // 2. Goal check: 1.5% chance per minute of a goal event total
  const goalRoll = Math.random();
  if (goalRoll < 0.015) {
    const isHomeScoring = Math.random() < homeProb;
    const scoringTeam = isHomeScoring ? match.homeTeam : match.awayTeam;
    
    if (isHomeScoring) {
      updatedMatch.homeScore += 1;
    } else {
      updatedMatch.awayScore += 1;
    }
    
    const goalScorer = getRandomPlayer(scoringTeam);
    const assistPlayer = getRandomPlayer(scoringTeam);
    const assistDetail = Math.random() < 0.7 ? `Assist: ${assistPlayer}` : "Solo Run";
    
    const newEvent: MatchEvent = {
      id: `e-${match.id}-${updatedMatch.minute}-${Date.now()}`,
      type: "goal",
      minute: updatedMatch.minute,
      teamId: scoringTeam.id,
      player: goalScorer,
      detail: assistDetail
    };
    
    updatedMatch.events = [...updatedMatch.events, newEvent];
    // Increase shots on target for the scorer
    const side = isHomeScoring ? 0 : 1;
    updatedMatch.stats.shots[side] += 1;
    updatedMatch.stats.shotsOnTarget[side] += 1;
    
    newGoal = true;
    goalEvent = newEvent;
  }
  
  // 3. Card Check: 1% chance per minute of a card
  else if (goalRoll < 0.025) {
    const side = Math.random() < 0.5 ? 0 : 1;
    const bookingTeam = side === 0 ? match.homeTeam : match.awayTeam;
    const player = getRandomPlayer(bookingTeam);
    const isRed = Math.random() < 0.1; // 10% chance of red card
    
    const newEvent: MatchEvent = {
      id: `e-${match.id}-${updatedMatch.minute}-${Date.now()}`,
      type: isRed ? "red_card" : "yellow_card",
      minute: updatedMatch.minute,
      teamId: bookingTeam.id,
      player: player,
      detail: isRed ? "Straight Red" : "Foul"
    };
    updatedMatch.events = [...updatedMatch.events, newEvent];
  }
  
  // 4. Substitution check (Happens mostly in second half, minute > 55)
  else if (updatedMatch.minute > 55 && goalRoll < 0.04) {
    const side = Math.random() < 0.5 ? 0 : 1;
    const subTeam = side === 0 ? match.homeTeam : match.awayTeam;
    const playerOut = getRandomPlayer(subTeam);
    const playerIn = getRandomPlayer(subTeam);
    
    const newEvent: MatchEvent = {
      id: `e-${match.id}-${updatedMatch.minute}-${Date.now()}`,
      type: "substitution",
      minute: updatedMatch.minute,
      teamId: subTeam.id,
      player: `${playerIn} ↔ ${playerOut}`,
      detail: "Tactical change"
    };
    updatedMatch.events = [...updatedMatch.events, newEvent];
  }
  
  // End of match or half-time management
  if (updatedMatch.minute >= 90) {
    updatedMatch.status = "finished";
  }
  
  return { updatedMatch, newGoal, goalEvent };
}

// Compute group standings based on all matches
export function calculateStandings(matches: Match[]): Record<string, GroupStanding[]> {
  const standingsMap: Record<string, Record<string, GroupStanding>> = {};
  
  // Setup empty standing rows for all teams
  TEAMS_SEED.forEach(team => {
    if (!standingsMap[team.group]) {
      standingsMap[team.group] = {};
    }
    standingsMap[team.group][team.id] = {
      teamId: team.id,
      teamName: team.name,
      teamShort: team.shortName,
      flagColors: team.flagColors,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0
    };
  });
  
  // Update standings based on finished and live match scores
  matches.forEach(match => {
    // Only calculate for active/finished matches
    if (match.status === "scheduled") return;
    
    const homeGrp = match.homeTeam.group;
    const awayGrp = match.awayTeam.group;
    
    const homeStand = standingsMap[homeGrp]?.[match.homeTeam.id];
    const awayStand = standingsMap[awayGrp]?.[match.awayTeam.id];
    
    if (homeStand && awayStand) {
      homeStand.played += 1;
      awayStand.played += 1;
      
      homeStand.goalsFor += match.homeScore;
      homeStand.goalsAgainst += match.awayScore;
      
      awayStand.goalsFor += match.awayScore;
      awayStand.goalsAgainst += match.homeScore;
      
      if (match.homeScore > match.awayScore) {
        homeStand.won += 1;
        homeStand.points += 3;
        awayStand.lost += 1;
      } else if (match.homeScore < match.awayScore) {
        awayStand.won += 1;
        awayStand.points += 3;
        homeStand.lost += 1;
      } else {
        homeStand.drawn += 1;
        homeStand.points += 1;
        awayStand.drawn += 1;
        awayStand.points += 1;
      }
      
      homeStand.goalDifference = homeStand.goalsFor - homeStand.goalsAgainst;
      awayStand.goalDifference = awayStand.goalsFor - awayStand.goalsAgainst;
    }
  });
  
  // Format to sorted array lists per group
  const finalStandings: Record<string, GroupStanding[]> = {};
  
  Object.keys(standingsMap).sort().forEach(group => {
    finalStandings[group] = Object.values(standingsMap[group]).sort((a, b) => {
      // Primary: Points
      if (b.points !== a.points) return b.points - a.points;
      // Secondary: Goal Difference
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      // Tertiary: Goals For
      return b.goalsFor - a.goalsFor;
    });
  });
  
  return finalStandings;
}

// Generate a default lineup structure for teams
export function generateLineup(team: Team): { number: number; name: string; pos: string }[] {
  const line: { number: number; name: string; pos: string }[] = [];
  const positions = ["GK", "DF", "DF", "DF", "DF", "MF", "MF", "MF", "FW", "FW", "FW"];
  
  positions.forEach((pos, idx) => {
    line.push({
      number: idx === 0 ? 1 : idx + 2 + Math.floor(Math.random() * 4),
      name: getRandomPlayer(team),
      pos
    });
  });
  
  return line;
}

export interface TeamForecast {
  status: "qualified" | "eliminated" | "active";
  qualifyProb: number;
  winnerProb: number;
}

// Elo-based W/D/L probabilities calculation
export function calculateMatchForecast(homeTeam: Team, awayTeam: Team): { homeWin: number; draw: number; awayWin: number } {
  const ratingDiff = homeTeam.rating - awayTeam.rating;
  // Small rating boost for host nations (USA, Mexico, Canada)
  const homeAdv = ["usa", "mex", "can"].includes(homeTeam.id) ? 2 : 0;
  const awayAdv = ["usa", "mex", "can"].includes(awayTeam.id) ? 2 : 0;
  const effDiff = ratingDiff + homeAdv - awayAdv;

  const wHome = Math.pow(10, effDiff / 30);
  const wAway = 1.0;
  const wDraw = 0.45 * (wHome + wAway) / (1 + Math.abs(effDiff) / 45);

  const total = wHome + wAway + wDraw;
  const homeWin = Math.round((wHome / total) * 100);
  const awayWin = Math.round((wAway / total) * 100);
  const draw = 100 - homeWin - awayWin;

  return { homeWin, draw, awayWin };
}

// Monte Carlo simulator running 100 tournament trials to estimate qualify and win chances
export function calculateTournamentForecasts(matches: Match[]): Record<string, TeamForecast> {
  const qualifyCounts: Record<string, number> = {};
  const winnerCounts: Record<string, number> = {};
  
  TEAMS_SEED.forEach(t => {
    qualifyCounts[t.id] = 0;
    winnerCounts[t.id] = 0;
  });

  const trials = 100;
  
  for (let t = 0; t < trials; t++) {
    // 1. Simulate remaining group matches
    const simMatches = matches.map(m => {
      if (m.status === "finished") {
        return { ...m };
      }
      
      const minRem = m.status === "live" ? Math.max(0, 90 - m.minute) : 90;
      
      // Calculate expected goals per team scaled by ratings
      const homeLambda = (minRem / 90) * (1.3 + (m.homeTeam.rating - m.awayTeam.rating) / 25);
      const awayLambda = (minRem / 90) * (1.3 - (m.homeTeam.rating - m.awayTeam.rating) / 25);
      
      const homeSimGoals = poisson(Math.max(0.1, homeLambda));
      const awaySimGoals = poisson(Math.max(0.1, awayLambda));
      
      return {
        ...m,
        status: "finished" as const,
        homeScore: m.homeScore + homeSimGoals,
        awayScore: m.awayScore + awaySimGoals
      };
    });

    // 2. Compute Standings for this trial
    const standingsMap: Record<string, Record<string, GroupStanding>> = {};
    TEAMS_SEED.forEach(team => {
      if (!standingsMap[team.group]) standingsMap[team.group] = {};
      standingsMap[team.group][team.id] = {
        teamId: team.id, teamName: team.name, teamShort: team.shortName, flagColors: team.flagColors,
        played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 0
      };
    });

    simMatches.forEach(match => {
      const homeGrp = match.homeTeam.group;
      const awayGrp = match.awayTeam.group;
      const homeStand = standingsMap[homeGrp]?.[match.homeTeam.id];
      const awayStand = standingsMap[awayGrp]?.[match.awayTeam.id];
      
      if (homeStand && awayStand) {
        homeStand.played += 1;
        awayStand.played += 1;
        homeStand.goalsFor += match.homeScore;
        homeStand.goalsAgainst += match.awayScore;
        awayStand.goalsFor += match.awayScore;
        awayStand.goalsAgainst += match.homeScore;
        
        if (match.homeScore > match.awayScore) {
          homeStand.won += 1; homeStand.points += 3; awayStand.lost += 1;
        } else if (match.homeScore < match.awayScore) {
          awayStand.won += 1; awayStand.points += 3; homeStand.lost += 1;
        } else {
          homeStand.drawn += 1; homeStand.points += 1; awayStand.drawn += 1; awayStand.points += 1;
        }
        homeStand.goalDifference = homeStand.goalsFor - homeStand.goalsAgainst;
        awayStand.goalDifference = awayStand.goalsFor - awayStand.goalsAgainst;
      }
    });

    // Sort group tables
    const sortedGroups: Record<string, GroupStanding[]> = {};
    Object.keys(standingsMap).forEach(g => {
      sortedGroups[g] = Object.values(standingsMap[g]).sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
        return b.goalsFor - a.goalsFor;
      });
    });

    // 3. Qualified teams selection (Top 2 from each of 12 groups + 8 best 3rd)
    const qualifiedTeams: Team[] = [];
    const thirdPlaceTeams: GroupStanding[] = [];

    Object.keys(sortedGroups).forEach(g => {
      const grp = sortedGroups[g];
      qualifiedTeams.push(TEAMS_SEED.find(team => team.id === grp[0].teamId)!);
      qualifiedTeams.push(TEAMS_SEED.find(team => team.id === grp[1].teamId)!);
      thirdPlaceTeams.push(grp[2]);
    });

    // Compare third place teams
    const sortedThirds = thirdPlaceTeams.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });

    for (let i = 0; i < 8; i++) {
      qualifiedTeams.push(TEAMS_SEED.find(team => team.id === sortedThirds[i].teamId)!);
    }

    qualifiedTeams.forEach(t => {
      qualifyCounts[t.id] += 1;
    });

    // 4. Knockout Bracket Simulation (R32 -> R16 -> R8 -> R4 -> R2 -> Champion)
    let currentRound = [...qualifiedTeams];
    while (currentRound.length > 1) {
      const nextRound: Team[] = [];
      for (let i = 0; i < currentRound.length; i += 2) {
        if (i + 1 < currentRound.length) {
          nextRound.push(simulateKnockoutMatch(currentRound[i], currentRound[i + 1]));
        } else {
          nextRound.push(currentRound[i]);
        }
      }
      currentRound = nextRound;
    }

    if (currentRound.length === 1) {
      winnerCounts[currentRound[0].id] += 1;
    }
  }

  // Compute final forecast ratings
  const forecasts: Record<string, TeamForecast> = {};
  
  // Real mathematical check for absolute qualification/elimination
  // If remaining matches for group is 0, we use final rankings
  TEAMS_SEED.forEach(team => {
    const qCount = qualifyCounts[team.id];
    const qualifyProb = Math.round((qCount / trials) * 100);
    const winnerProb = Math.round((winnerCounts[team.id] / trials) * 100);
    
    let status: "qualified" | "eliminated" | "active" = "active";
    if (qualifyProb === 100) {
      status = "qualified";
    } else if (qualifyProb === 0) {
      status = "eliminated";
    }

    forecasts[team.id] = {
      status,
      qualifyProb,
      winnerProb
    };
  });

  return forecasts;
}

// Knuth Poisson algorithm for goals frequency
function poisson(lambda: number): number {
  const L = Math.exp(-lambda);
  let k = 0;
  let p = 1;
  do {
    k++;
    p *= Math.random();
  } while (p > L);
  return k - 1;
}

// Knockout matches resolution based on relative strengths
function simulateKnockoutMatch(teamA: Team, teamB: Team): Team {
  const diff = teamA.rating - teamB.rating;
  const probA = 1 / (1 + Math.pow(10, -diff / 30));
  return Math.random() < probA ? teamA : teamB;
}
