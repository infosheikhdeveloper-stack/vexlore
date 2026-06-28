const SUPABASE_URL =
"https://hncukzavozfdzqrqmjuv.supabase.co";

const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuY3VremF2b3pmZHpxcnFtanV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODE5ODgsImV4cCI6MjA5ODA1Nzk4OH0.eBzwVznT0uDw_vT-PEyd2B-jskjBKMbrVgbwGs93FQU";

const db =
supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);

let teams = [];
let currentTeam = 0;

async function loadTeams(){

const { data, error } =
await db
.from("tournament_registrations")
.select("*");

if(error){
console.log(error);
return;
}

teams = data;

showTeam();

setInterval(() => {

currentTeam++;

if(currentTeam >= teams.length){
currentTeam = 0;
}

showTeam();

}, 5000);

}

function showTeam() {
  if (!teams.length) return;

  const team = teams[currentTeam];

  document.getElementById("teamName").innerText =
    team.team_name || "No Team";

  let html = "";

  try {
    const players = Array.isArray(team.players)
      ? team.players
      : JSON.parse(team.players || "[]");

    players.forEach(player => {
      html += `
        <div class="player-item">
          <h4>${player?.name || "N/A"}</h4>
          <p>UID: ${player?.uid || "N/A"}</p>
          <p>Username: ${player?.username || "N/A"}</p>
          <p>Level: ${player?.level || "N/A"}</p>
        </div>
      `;
    });

  } catch (e) {
    html = `<p>Error loading players</p>`;
    console.log("Player parse error:", e);
  }

  document.getElementById("playersList").innerHTML = html;
}

loadTeams();





const currentUser =
JSON.parse(localStorage.getItem("vexloreUser"));

loadMyTeam();

async function loadMyTeam(){

if(!currentUser) return;

const { data,error } = await db
.from("tournament_registrations")
.select("*")
.eq("email", currentUser.email)
.single();

if(error || !data) return;

const hero =
document.getElementById("heroSection");

let statusText = "";

if(data.status === "accepted"){
statusText = "✅ TEAM ACCEPTED";
}
else if(data.status === "waiting"){
statusText = "⏳ REQUEST PENDING";
}
else{
statusText = "❌ REQUEST REJECTED";
}

hero.innerHTML = `

<div class="my-team-card">

<img
src="${data.logo_url}"
class="my-team-logo">

<h2>${data.team_name}</h2>

<p>
Leader:
${data.leader_name}
</p>

<div class="status-badge">
${statusText}
</div>

</div>

`;

}
