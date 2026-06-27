const SUPABASE_URL =
"https://hncukzavozfdzqrqmjuv.supabase.co";

const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuY3VremF2b3pmZHpxcnFtanV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODE5ODgsImV4cCI6MjA5ODA1Nzk4OH0.eBzwVznT0uDw_vT-PEyd2B-jskjBKMbrVgbwGs93FQU";

const db =
window.supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);

/* LOGIN CHECK */

const user =
JSON.parse(
localStorage.getItem("vexloreUser")
);

if(!user){

window.location.href =
"login.html";

}

/* PROFILE */

document.getElementById(
"userName"
).innerText =
user.name || "Player";

document.getElementById(
"userPhone"
).innerText =
user.phone || "";

document.getElementById(
"userEmail"
).innerText =
user.email || "";

/* YOUR TEAM */

document.getElementById(
"teamBtn"
).onclick = async ()=>{

document
.getElementById("teamSheet")
.classList.add("active");

const { data,error } =
await db

.from("tournament_registrations")

.select("*")

.eq(
"email",
user.email
)

.order(
"id",
{ascending:false}
)

.limit(1);

if(error){

console.log(error);

return;

}

if(data.length===0){

document
.getElementById("teamData")
.innerHTML =
"No Team Found";

return;

}

const team = data[0];

let html = `

<h3>${team.team_name}</h3>

<p><b>Leader:</b>
${team.leader_name}</p>

<p><b>UTR:</b>
${team.utr}</p>

`;

team.players.forEach((p)=>{

html += `

<div class="player">

<p>${p.name}</p>

<p>UID : ${p.uid}</p>

<p>${p.username}</p>

<p>Level : ${p.level}</p>

</div>

`;

});

document
.getElementById("teamData")
.innerHTML = html;

};

/* CONTACT */

document.getElementById(
"contactBtn"
).onclick = ()=>{

document
.getElementById("contactSheet")
.classList.add("active");

};

function closeSheet(id){

document
.getElementById(id)
.classList.remove("active");

}

window.closeSheet =
closeSheet;

/* LOGOUT */

document.getElementById(
"logoutBtn"
).onclick = ()=>{

localStorage.removeItem(
"vexloreUser"
);

window.location.href =
"login.html";

};

document
.getElementById("teamBtn")
.onclick = () => {

window.location.href =
"yourteam.html";

};