// ================= SUPABASE =================
const SUPABASE_URL = "https://YOUR_PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuY3VremF2b3pmZHpxcnFtanV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODE5ODgsImV4cCI6MjA5ODA1Nzk4OH0.eBzwVznT0uDw_vT-PEyd2B-jskjBKMbrVgbwGs93FQU";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ================= LOAD DATA =================
async function loadDashboard() {

    // 🔹 TEAMS
    const { data: teams } = await client.from("teams").select("*");
    document.getElementById("totalTeams").innerText = teams?.length || 0;

    // 🔹 PLAYERS
    const { data: players } = await client.from("players").select("*");
    document.getElementById("totalPlayers").innerText = players?.length || 0;

    // 🔹 USERS
    const { data: users } = await client.from("users").select("*");
    document.getElementById("totalUsers").innerText = users?.length || 0;
}

// ================= AUTO REFRESH =================
document.addEventListener("DOMContentLoaded", () => {
    loadDashboard();

    // auto refresh every 10 sec (LIVE FEEL)
    setInterval(loadDashboard, 10000);
});