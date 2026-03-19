let players = JSON.parse(localStorage.getItem("players")) || [];
let round = Number(localStorage.getItem("round")) || 1;

function startGame(){
window.location.href="setup.html";
}

function generatePlayers(){

let num = document.getElementById("numPlayers").value;
let container = document.getElementById("playerInputs");

container.innerHTML="";

for(let i=1;i<=num;i++){
container.innerHTML +=
`<p>Player ${i}: <input type="text" id="player${i}" required></p>`;
}
}

function savePlayers(){

let num = document.getElementById("numPlayers").value;

players=[];
round=1;

for(let i=1;i<=num;i++){

let name=document.getElementById("player"+i).value;

players.push({
name:name,
score:0,
eliminated:false
});
}

localStorage.setItem("players",JSON.stringify(players));
localStorage.setItem("round",round);

window.location.href="dashboard.html";
}

function loadTable(){

let table=document.getElementById("scoreTable");

table.innerHTML = `
<tr>
<th>Player</th>
<th>Round Score</th>
<th>Total Score</th>
<th>Status</th>
</tr>
`;

players.forEach((p,index)=>{

let row=table.insertRow();

if(p.eliminated) row.classList.add("eliminated");

row.insertCell(0).innerText=p.name;

row.insertCell(1).innerHTML=
`<input type="number" id="score${index}" ${p.eliminated?"disabled":""}>`;

row.insertCell(2).innerText=p.score;

row.insertCell(3).innerText=p.eliminated?"Eliminated ❌":"Playing";
});

document.getElementById("round").innerText="Round "+round;
}

function submitRound(){

players.forEach((p,index)=>{

if(!p.eliminated){

let val=Number(document.getElementById("score"+index).value)||0;

p.score+=val;

if(p.score>=100){
p.eliminated=true;
}
}
});

round++;

localStorage.setItem("players",JSON.stringify(players));
localStorage.setItem("round",round);

checkWinner();

location.reload();
}

function checkWinner(){

let active=players.filter(p=>!p.eliminated);

if(active.length===1){

document.getElementById("winner").innerText=
"🎉 Congratulations "+active[0].name+"! You are the Winner!";

// ✅ Show reset buttons
document.getElementById("controls").style.display="block";

// ✅ Disable submit button
document.getElementById("submitBtn").disabled = true;
}
}

/* ✅ Reset only scores */
function resetScores(){

if(confirm("Reset all scores?")){

players.forEach(p=>{
p.score = 0;
p.eliminated = false;
});

round = 1;

localStorage.setItem("players", JSON.stringify(players));
localStorage.setItem("round", round);

location.reload();
}
}

/* ✅ Full reset */
function resetGame(){
localStorage.clear();
window.location.href="index.html";
}

/* ✅ Load on dashboard */
if(window.location.pathname.includes("dashboard.html")){
loadTable();
checkWinner(); // VERY IMPORTANT
}