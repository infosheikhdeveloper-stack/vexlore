const SUPABASE_URL = "https://hncukzavozfdzqrqmjuv.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuY3VremF2b3pmZHpxcnFtanV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODE5ODgsImV4cCI6MjA5ODA1Nzk4OH0.eBzwVznT0uDw_vT-PEyd2B-jskjBKMbrVgbwGs93FQU";

const db = supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);

const user = JSON.parse(
localStorage.getItem("vexloreUser")
);

if (!user) {

window.location.href = "login.html";

}

async function loadTeam() {


const { data, error } = await db
.from("tournament_registrations")
.select("*")
.eq("email", user.email)
.single();

console.log("DATA:", data);
console.log("PLAYERS:", data?.players);

if (error || !data) {

document.getElementById("playersList").innerHTML =
"<h2 style='text-align:center'>No Team Found</h2>";

return;

}

document.getElementById("teamLogo").src =
data.logo_url || "logo2.png";

document.getElementById("teamName").innerText =
data.team_name;

document.getElementById("leaderName").innerText =
data.leader_name;

document.getElementById("email").innerText =
data.email;

document.getElementById("utr").innerText =
data.utr;

document.getElementById("totalPlayers").innerText =
data.players.length;

let players = data.players || [];

if (!Array.isArray(players)) {
players = JSON.parse(players);
}

let html = "";

players.forEach((player, index) => {

html += `
<div class="player-card">

<h3>PLAYER ${index + 1}</h3>

<p><strong>Name:</strong> ${player.name}</p>

<p><strong>UID:</strong> ${player.uid}</p>

<p><strong>Username:</strong> ${player.username}</p>

<p><strong>Level:</strong> ${player.level}</p>

${player.leader ? "<p class='leader-tag'>👑 TEAM LEADER</p>" : ""}

</div>
`;

});

document.getElementById("playersList").innerHTML = html;

} // loadTeam function close

loadTeam();