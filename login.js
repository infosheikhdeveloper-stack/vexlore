// login.js

const SUPABASE_URL =
"https://hncukzavozfdzqrqmjuv.supabase.co";

const SUPABASE_ANON_KEY =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuY3VremF2b3pmZHpxcnFtanV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0ODE5ODgsImV4cCI6MjA5ODA1Nzk4OH0.eBzwVznT0uDw_vT-PEyd2B-jskjBKMbrVgbwGs93FQU";

const db =
window.supabase.createClient(
SUPABASE_URL,
SUPABASE_ANON_KEY
);

const signupTab =
document.getElementById("signupTab");

const loginTab =
document.getElementById("loginTab");

const signupForm =
document.getElementById("signupForm");

const loginForm =
document.getElementById("loginForm");

function toast(msg){

const t =
document.getElementById("toast");

t.innerText = msg;

t.classList.add("show");

setTimeout(()=>{
t.classList.remove("show");
},3000);

}

signupTab.onclick=()=>{

signupForm.style.display="flex";
loginForm.style.display="none";

signupTab.classList.add("active");
loginTab.classList.remove("active");

};

loginTab.onclick=()=>{

signupForm.style.display="none";
loginForm.style.display="flex";

loginTab.classList.add("active");
signupTab.classList.remove("active");

};

/* SIGNUP */

signupForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const name =
document.getElementById("name").value;

const phone =
document.getElementById("phone").value;

const email =
document.getElementById("signupEmail").value;

const password =
document.getElementById("signupPassword").value;

const {error} =
await db
.from("users")
.insert([{
name,
phone,
email,
password
}]);

if(error){

toast("Account Already Exists");

return;

}

toast("Account Created");

setTimeout(()=>{
loginTab.click();
},1000);

});

/* LOGIN */

loginForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const email =
document.getElementById("loginEmail").value;

const password =
document.getElementById("loginPassword").value;

const {data,error} =
await db
.from("users")
.select("*")
.eq("email",email)
.eq("password",password)
.single();

if(error || !data){

toast("Invalid Login");

return;

}

localStorage.setItem(
"vexloreUser",
JSON.stringify(data)
);

toast("Login Success");

setTimeout(()=>{

window.location.href =
"index.html";

},1500);

});