const photos = [
  "assets/images/photo1.jpg","assets/images/photo2.jpg","assets/images/photo3.jpg",
  "assets/images/photo4.jpg","assets/images/photo5.jpg","assets/images/photo6.jpg",
  "assets/images/photo7.jpg","assets/images/photo8.jpg","assets/images/photo9.jpg",
  "assets/images/photo10.jpg","assets/images/photo11.jpg","assets/images/photo12.jpg"
];

const screens = {
  start: document.getElementById("start"),
  globe: document.getElementById("globeScreen"),
  wall: document.getElementById("wallScreen"),
  letter: document.getElementById("letterScreen")
};

function show(name){
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[name].classList.add("active");
}

function buildWall(){
  const wall = document.getElementById("wall");
  wall.innerHTML = "";
  for(let i=0;i<40;i++){
    const img = document.createElement("img");
    img.src = photos[i % photos.length];
    wall.appendChild(img);
  }
}
buildWall();

let started = false;
let step = 0;

function startGift(){
  if(started) return;
  started = true;
  const m = document.getElementById("music");
  m.volume = 0.65;
  m.play().catch(()=>{});
  show("globe");
}

document.getElementById("openBtn").addEventListener("click", startGift);
screens.start.addEventListener("click", e => {
  if(e.target.id !== "openBtn") startGift();
});

document.body.addEventListener("click", () => {
  if(!started) return;
  if(screens.globe.classList.contains("active")){
    step++;
    if(step >= 2){
      show("wall");
      setTimeout(()=>show("letter"), 7000);
    }
  }else if(screens.wall.classList.contains("active")){
    show("letter");
  }
});

document.getElementById("mail").addEventListener("click", e => {
  e.stopPropagation();
  document.getElementById("mail").classList.add("open");
});

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];
function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  stars = Array.from({length:210},()=>({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    r:Math.random()*1.8+.35,
    s:Math.random()*0.55+.18
  }));
}
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#fff";
  stars.forEach(st=>{
    ctx.globalAlpha = Math.random()*0.8+0.2;
    ctx.beginPath();
    ctx.arc(st.x,st.y,st.r,0,Math.PI*2);
    ctx.fill();
    st.y += st.s;
    if(st.y > canvas.height){ st.y = 0; st.x = Math.random()*canvas.width; }
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(draw);
}
resize(); draw();
window.addEventListener("resize", resize);
