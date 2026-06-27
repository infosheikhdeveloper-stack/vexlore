const SUPABASE_URL = "https://hncukzavozfdzqrqmjuv.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuY3VremF2b3pmZHpxcnFtanV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODE5ODgsImV4cCI6MjA5ODA1Nzk4OH0.eBzwVznT0uDw_vT-PEyd2B-jskjBKMbrVgbwGs93FQU";


const user = JSON.parse(
localStorage.getItem("vexloreUser")
);

if (!user) {

alert("Please Login First");

window.location.href = "login.html";

}

const db = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);

const playersContainer = document.getElementById("playersContainer");
const addPlayerBtn = document.getElementById("addPlayerBtn");
const logoInput = document.getElementById("teamLogo");
const logoPreview = document.getElementById("logoPreview");

let playerCount = 0;

/* TEAM LOGO PREVIEW */

logoInput.addEventListener("change", () => {

const file = logoInput.files[0];

if (!file) return;

logoPreview.src = URL.createObjectURL(file);
logoPreview.style.display = "block";

});

/* ADD PLAYER */

function addPlayer() {

if (playerCount >= 4) {
alert("Maximum 4 Players Allowed");
return;
}

playerCount++;

const box = document.createElement("div");

box.className = "player-box";

box.innerHTML = `

  <h4>Player ${playerCount}</h4><label>Player Name</label>
<input type="text" class="player-name" required>

<label>Free Fire UID</label>
<input type="text" class="player-uid" required>

<label>Username</label>
<input type="text" class="player-username" required>

<label>Level</label>
<input type="text" class="player-level" required>

  <div class="leader-box"><input
type="radio"
name="leader"
class="leader-radio">

<label>Select Leader</label>

  </div>`;

playersContainer.appendChild(box);

}

addPlayerBtn.addEventListener("click", addPlayer);

/* DEFAULT PLAYER */

addPlayer();

// FORM SUBMIT

document
.getElementById("registrationForm")
.addEventListener("submit", async (e) => {

e.preventDefault();

const teamName =
document.getElementById("teamName").value;

const email =
document.getElementById("email").value;

const utr =
document.getElementById("utr").value;

if (utr.length !== 12) {

alert("UTR must be exactly 12 digits");
return;

}

const names =
document.querySelectorAll(".player-name");

const uids =
document.querySelectorAll(".player-uid");

const usernames =
document.querySelectorAll(".player-username");

const levels =
document.querySelectorAll(".player-level");

const leaders =
document.querySelectorAll(".leader-radio");

const players = [];

let leaderName = "";

for (let i = 0; i < names.length; i++) {

const player = {

name: names[i].value,
uid: uids[i].value,
username: usernames[i].value,
level: levels[i].value,
leader: leaders[i].checked

};

if (leaders[i].checked) {
leaderName = names[i].value;
}

players.push(player);

}

if (leaderName === "") {

alert("Please Select Team Leader");
return;

}

try {

let logoUrl = "";

const logoFile =
document.getElementById("teamLogo").files[0];

if (logoFile) {

const fileName =
`team-${Date.now()}-${logoFile.name}`;
const {
error: uploadError
} = await db.storage
.from("team-logos")
.upload(fileName, logoFile);

if (uploadError) {

console.log(uploadError);

alert(
"Logo Upload Error: " +
uploadError.message
);

return;

}

const { data } =
db.storage
.from("team-logos")
.getPublicUrl(fileName);

logoUrl = data.publicUrl;

}

const { error } = await db

.from("tournament_registrations")

.insert([{

team_name: teamName,
email: email,
leader_name: leaderName,
utr: utr,
logo_url: logoUrl,
players: players

}]);

if (error) throw error;

let playerDetails = "";

players.forEach((player,index)=>{

playerDetails +=

`Player ${index + 1}

Name: ${player.name}
UID: ${player.uid}
Username: ${player.username}
Level: ${player.level}

`;

});

const whatsappMessage =

`🏆 VEXLORE TOURNAMENT REGISTRATION

📌 Team Name:
${teamName}

👑 Leader:
${leaderName}

📧 Email:
${email}

🧾 UTR:
${utr}

🖼 Logo:
${logoUrl}

━━━━━━━━━━━━━━

${playerDetails}

━━━━━━━━━━━━━━

✅ Registration Submitted`;

window.open(
"https://wa.me/917051932522?text=${encodeURIComponent(whatsappMessage)}",
"_blank"
);

alert(
"✅ Request Sent Successfully"
);

document
.getElementById("registrationForm")
.reset();

playersContainer.innerHTML = "";

playerCount = 0;

addPlayer();

logoPreview.style.display = "none";

}

catch (error) {

console.log(error);

alert(
"Error: " +
(error.message || JSON.stringify(error))
);

}

});