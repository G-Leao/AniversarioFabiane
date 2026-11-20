/* ===== EDITE AQUI ===== */
const CONFIG = {
  nome: "Fabiane",
  mes: 11, dia: 23,            // data do aniversário
  assinatura: "Gustavo",
  carta: [
    "Fabiane, minha Ursa hibernadora, hoje o dia é todo seu. O mundo ganhou uma pessoa especial no dia em que você nasceu.",
    "Eu ainda lembro: um dia de chuva, um ponto de ônibus, e eu sem imaginar que ali começava a melhor história da minha vida.",
    "Eu admiro tudo em você: a sua força, a sua fé, o jeito como você ama as coisas e o jeito como você ama a gente.",
    "Obrigado por cada dia em que está tudo bem. Pate de atum 🤙 pra você, hoje e sempre.",
    "Que este novo ano venha com paz, saúde e tudo o que você merece. Eu te amo."
  ],
  motivos: [
    ["🌧️","Foi num dia de chuva, num ponto de ônibus, que a minha vida mudou."],
    ["💪","A sua força me inspira todos os dias."],
    ["🙏","A sua fé me ensina a acreditar, mesmo quando o caminho é difícil."],
    ["🐻","Até quando você hiberna, você é a minha pessoa favorita."],
    ["💞","O amor que você tem pelas coisas faz tudo ficar mais bonito."],
    ["🤙","Pate de atum 🤙: do seu lado, está tudo bem."]
  ],
  surpresas: [
    "Pate de atum 🤙",
    "Feliz aniversário, Ursa! 🐻🎂",
    "Eu escolheria aquele ponto de ônibus de novo 🌧️",
    "Sua fé e sua força me inspiram 🙏💪",
    "Que este novo ano seja lindo como você 🥰",
    "Te amo, Fabiane ❤️💙💜"
  ]
};
/* ======================= */
const $=s=>document.querySelector(s);
const nome=CONFIG.nome;

// Typewriter
(function(){const t=`Feliz aniversário, ${nome}!`;let i=0;const el=$("#tw");
  (function n(){el.textContent=t.slice(0,i++);if(i<=t.length)setTimeout(n,85);else $("#heroSub").textContent="Ursa hibernadora, acorda: preparei umas coisinhas pra você. Desce com calma. 🐻💕"})()})();

// Hearts
const H=["❤️","💙","💜","🖤","✨","💖"];
function heart(){const h=document.createElement("span");h.className="heart";h.textContent=H[Math.random()*H.length|0];
  h.style.left=Math.random()*100+"vw";h.style.fontSize=12+Math.random()*22+"px";
  const d=6+Math.random()*7;h.style.animationDuration=d+"s";h.style.setProperty("--dx",(Math.random()*120-60)+"px");h.style.setProperty("--r",(Math.random()*80-40)+"deg");
  $("#hearts").appendChild(h);setTimeout(()=>h.remove(),d*1000)}
setInterval(heart,550);

// Countdown
function alvo(){const n=new Date();let t=new Date(n.getFullYear(),CONFIG.mes-1,CONFIG.dia);
  const hoje=n.getMonth()===CONFIG.mes-1&&n.getDate()===CONFIG.dia;
  if(!hoje&&t<n)t=new Date(n.getFullYear()+1,CONFIG.mes-1,CONFIG.dia);return{t,hoje}}
function tick(){const{t,hoje}=alvo();
  if(hoje){$("#cd").innerHTML='<div style="padding:24px 32px"><b>HOJE! 🎉</b></div>';$("#cdNote").textContent="É o seu dia. Aproveite cada segundo.";return}
  let s=Math.max(0,(t-new Date())/1000|0);const v=[["dias",s/86400|0],["horas",s%86400/3600|0],["min",s%3600/60|0],["seg",s%60]];
  $("#cd").innerHTML=v.map(([l,n])=>`<div><b>${String(n).padStart(2,"0")}</b><span>${l}</span></div>`).join("");
  $("#cdNote").textContent="Cada segundo me deixa mais ansioso pra comemorar com você."}
tick();setInterval(tick,1000);

// Letter
const letter=$("#letter");
letter.innerHTML=CONFIG.carta.map((p,i)=>`<p style="animation-delay:${.5+i*1.1}s">${p}</p>`).join("")+`<p class="sig script" style="animation-delay:${.5+CONFIG.carta.length*1.1}s">Com amor, ${CONFIG.assinatura}</p>`;
function abrir(){if(letter.classList.contains("open"))return;letter.classList.add("open");$("#envHint").textContent="";$("#env").style.animation="none";boom(window.innerWidth/2,window.innerHeight/2,60)}
$("#env").onclick=abrir;$("#env").onkeydown=e=>{if(e.key==="Enter"||e.key===" ")abrir()};

// Cards
const anim=["l","r","u","z","rot","u"];
$("#grid").innerHTML=CONFIG.motivos.map(([e,t],i)=>`<div class="flip rv ${anim[i%anim.length]}" style="transition-delay:${(i%3)*.12}s"><div class="fi"><div class="fa">${e}</div><div class="fb">${t}</div></div></div>`).join("");
document.querySelectorAll(".flip").forEach(f=>f.onclick=()=>f.classList.toggle("on"));

// Reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.2});
document.querySelectorAll(".rv").forEach(el=>io.observe(el));

// Confetti
const cv=$("#fx"),cx=cv.getContext("2d");let P=[];
function rs(){cv.width=innerWidth;cv.height=innerHeight}rs();addEventListener("resize",rs);
const C=["#ff2d55","#3a86ff","#9d4edd","#fff","#e5383b","#4cc9f0"];
function boom(x,y,n=90){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,v=4+Math.random()*9;
  P.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v-5,g:.25,s:5+Math.random()*7,c:C[Math.random()*C.length|0],r:Math.random()*6,vr:Math.random()*.4-.2,l:130})}
  if(P.length===n)loop()}
function loop(){cx.clearRect(0,0,cv.width,cv.height);
  P=P.filter(p=>p.l>0);P.forEach(p=>{p.vy+=p.g;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.r+=p.vr;p.l--;
    cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.globalAlpha=Math.min(1,p.l/40);cx.fillStyle=p.c;cx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6);cx.restore()});
  if(P.length)requestAnimationFrame(loop)}

// Surprise
let k=0;const cls=["a-pop","a-spin","a-shake","a-slide"];
$("#btn").onclick=e=>{const m=$("#msg");m.className="script";void m.offsetWidth;
  m.textContent=CONFIG.surpresas[k%CONFIG.surpresas.length];m.classList.add(cls[k%cls.length]);k++;
  const r=e.target.getBoundingClientRect();boom(r.left+r.width/2,r.top,80);boom(innerWidth*.2,innerHeight*.8,40);boom(innerWidth*.8,innerHeight*.8,40)};

// Sparkle trail
let last=0;addEventListener("pointermove",e=>{const n=Date.now();if(n-last<70)return;last=n;
  const s=document.createElement("span");s.className="spark";s.textContent="✨";s.style.left=e.clientX+"px";s.style.top=e.clientY+"px";document.body.appendChild(s);setTimeout(()=>s.remove(),800)});

$("#foot").textContent=`Pate de atum 🤙 Feito com amor para ${nome} 💖`;
if(alvo().hoje)setTimeout(()=>boom(innerWidth/2,innerHeight/3,120),1500);