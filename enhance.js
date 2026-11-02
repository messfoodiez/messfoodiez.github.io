/* Mess Meal Manager – UI enhancement layer. Add before </body>:  <script src="enhance.js"></script>  (or paste inside a <script> tag at the very end) */
(()=>{
const css=`
:root[data-theme=dark]{--bg:#0a1020;--surface:#121a30;--ink:#e8eefc;--muted:#8d9bbd;--line:#223055;--line2:#1b2745;--bluewash:#172650;--soft:#0f1730;--shadow:0 10px 30px rgba(0,0,0,.35);color-scheme:dark}
body{transition:background .4s,color .4s}
.aurora{position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none}
.aurora span{position:absolute;border-radius:50%;filter:blur(80px);opacity:.32;animation:drift 18s ease-in-out infinite alternate}
.aurora span:nth-child(1){width:420px;height:420px;background:#3b82f6;top:-120px;left:-80px}
.aurora span:nth-child(2){width:360px;height:360px;background:#818cf8;right:-100px;top:30%;animation-delay:-6s}
.aurora span:nth-child(3){width:320px;height:320px;background:#22d3ee;bottom:-120px;left:35%;animation-delay:-12s}
@keyframes drift{to{transform:translate(80px,60px) scale(1.2)}}
.sprog{position:fixed;top:0;left:0;height:3px;width:100%;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,var(--blue),#22d3ee,#a78bfa);z-index:40}
.panel,.stat,.summarybox,.hero,.heading{animation:rise .65s cubic-bezier(.2,.8,.2,1) var(--d,0s) backwards}
@keyframes rise{from{opacity:0;transform:translateY(22px) scale(.97)}}
.still .panel,.still .stat,.still .summarybox,.still .heading{animation:none}
.hero{background:linear-gradient(120deg,#1d4ed8,#3b82f6,#06b6d4,#6366f1);background-size:300% 300%;animation:rise .65s cubic-bezier(.2,.8,.2,1) var(--d,0s) backwards,flow 12s ease infinite}
.still .hero{animation:flow 12s ease infinite}
@keyframes flow{0%,100%{background-position:0 50%}50%{background-position:100% 50%}}
.hero:before{animation:float 7s ease-in-out infinite alternate}@keyframes float{to{transform:translate(-30px,30px) scale(1.15)}}
.hero .big{text-shadow:0 0 30px rgba(255,255,255,.45)}
.stat,.hero{transition:transform .25s ease-out,box-shadow .3s;will-change:transform}
.stat:hover{box-shadow:0 18px 40px color-mix(in srgb,var(--blue) 22%,transparent)}
.stat,.panel,.summarybox{position:relative}
.stat::after,.panel::after,.summarybox::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .3s;background:radial-gradient(260px circle at var(--mx,50%) var(--my,50%),color-mix(in srgb,var(--blue) 12%,transparent),transparent 70%)}
.stat:hover::after,.panel:hover::after,.summarybox:hover::after{opacity:1}
.btn,.navbtn,.iconbtn{position:relative;overflow:hidden}
.btn::before{content:"";position:absolute;top:0;left:-120%;width:60%;height:100%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.45),transparent);transform:skewX(-20deg);transition:left .6s;pointer-events:none}
.btn:hover::before{left:140%}
.btn.calc{animation:glow 2.4s infinite}
@keyframes glow{0%{box-shadow:0 0 0 0 rgba(23,169,122,.45)}100%{box-shadow:0 0 0 14px rgba(23,169,122,0)}}
.rip{position:absolute;border-radius:50%;background:currentColor;opacity:.3;transform:scale(0);animation:rip .6s ease-out;pointer-events:none}
@keyframes rip{to{transform:scale(4);opacity:0}}
.navbtn i{transition:transform .3s cubic-bezier(.3,1.6,.5,1)}
.navbtn:hover i{transform:translateY(-3px) scale(1.2) rotate(-6deg)}
.navbtn.active i{animation:hop .6s}@keyframes hop{40%{transform:translateY(-6px) scale(1.25)}}
.iconbtn:hover{transform:translateY(-2px) rotate(12deg)}
#app:not(.still) tbody tr{animation:rowin .45s ease calc(var(--i,0)*45ms) backwards}
@keyframes rowin{from{opacity:0;transform:translateX(-14px)}}
tbody tr:hover{box-shadow:inset 3px 0 0 var(--blue)}
.pill::before{content:"";display:inline-block;width:6px;height:6px;border-radius:50%;background:currentColor;margin-right:6px;animation:blink 1.6s infinite}
@keyframes blink{50%{opacity:.25}}
.dot{animation:ping 2s infinite}@keyframes ping{70%,100%{box-shadow:0 0 0 8px transparent}}
.login{animation:rise .8s cubic-bezier(.2,.8,.2,1) backwards}
.login h1{background:linear-gradient(90deg,var(--ink),var(--blue),#06b6d4,var(--ink));background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:flow 8s linear infinite}
input[type=checkbox]:checked{animation:tick .3s}@keyframes tick{50%{transform:scale(1.4)}}
.mrow label:hover{transform:translateY(-2px)}
.announcement{transition:transform .2s}.announcement:hover{transform:translateX(4px)}
.toast{animation:toastin .4s cubic-bezier(.2,1.4,.4,1)}@keyframes toastin{from{opacity:0;transform:translate(-50%,30px) scale(.9)}}
.cf{position:fixed;bottom:70px;left:50%;width:8px;height:12px;border-radius:2px;z-index:50;pointer-events:none;animation:cf 1.2s cubic-bezier(.1,.8,.3,1) forwards}
@keyframes cf{to{transform:translate(var(--x),var(--y)) rotate(var(--r));opacity:0}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const au=document.createElement('div');au.className='aurora';au.innerHTML='<span></span><span></span><span></span>';document.body.prepend(au);
const sp=document.createElement('div');sp.className='sprog';document.body.appendChild(sp);
addEventListener('scroll',()=>{sp.style.transform='scaleX('+(scrollY/((document.documentElement.scrollHeight-innerHeight)||1))+')'},{passive:true});

/* theme */
let th;try{th=localStorage.getItem('mmTheme')}catch(e){}
if(!th)th=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
const setTheme=t=>{th=t;document.documentElement.dataset.theme=t;document.querySelector('meta[name=theme-color]')?.setAttribute('content',t==='dark'?'#0a1020':'#2563eb');try{localStorage.setItem('mmTheme',t)}catch(e){}};
setTheme(th);

/* effects */
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.addEventListener('click',e=>{
  const b=e.target.closest?.('.btn,.navbtn,.iconbtn');if(!b||reduce)return;
  const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),d=document.createElement('span');
  d.className='rip';d.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;
  b.appendChild(d);setTimeout(()=>d.remove(),650);
});
document.addEventListener('pointermove',e=>{
  const c=e.target.closest?.('.hero,.stat,.panel,.summarybox');if(!c)return;
  const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
  c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');
  if(!reduce&&e.pointerType==='mouse'&&c.matches('.hero,.stat'))c.style.transform=`perspective(800px) rotateX(${(.5-y/r.height)*6}deg) rotateY(${(x/r.width-.5)*8}deg) translateY(-2px)`;
});
document.addEventListener('pointerout',e=>{const c=e.target.closest?.('.hero,.stat');if(c&&!c.contains(e.relatedTarget))c.style.transform=''});
const COL=['#2563eb','#20a784','#f1b45c','#60a5fa','#ed8294','#38bdf8','#818cf8'];
function confetti(){if(reduce)return;for(let i=0;i<28;i++){const s=document.createElement('i');s.className='cf';s.style.cssText=`--x:${(Math.random()-.5)*380}px;--y:${-120-Math.random()*240}px;--r:${Math.random()*720}deg;background:${COL[i%COL.length]}`;document.body.appendChild(s);setTimeout(()=>s.remove(),1300)}}

/* per-render enhancement */
const cu={};let lastTab=null;
function enhance(){
  const app=document.getElementById('app');
  app.classList.toggle('still',typeof tab!=='undefined'&&tab===lastTab&&typeof role!=='undefined'&&!!role);
  lastTab=typeof tab!=='undefined'?tab:null;
  const tools=document.querySelector('.tools');
  if(tools&&!tools.querySelector('.themebtn')){const b=document.createElement('button');b.className='iconbtn themebtn';b.title='Toggle theme';b.textContent=th==='dark'?'☀️':'🌙';b.onclick=()=>{setTheme(th==='dark'?'light':'dark');render()};tools.prepend(b)}
  document.querySelectorAll('.heading,.hero,.stat,.summarybox,.panel').forEach((e,i)=>e.style.setProperty('--d',Math.min(i,10)*70+'ms'));
  document.querySelectorAll('tbody tr').forEach((r,i)=>r.style.setProperty('--i',Math.min(i,15)));
  document.querySelectorAll('.hero .big,.hero .mini b,.summarybox strong,.stat strong').forEach((el,i)=>{
    const m=el.textContent.trim().match(/^(-?[\d,]+(?:\.\d+)?)(\s*[a-z]*)$/i);if(!m)return;
    const to=parseFloat(m[1].replace(/,/g,'')),dec=(m[1].split('.')[1]||'').length,k=lastTab+i,from=cu[k]??0;
    cu[k]=to;if(from===to||reduce)return;
    const t0=performance.now(),step=t=>{const p=Math.min(1,(t-t0)/900),q=1-Math.pow(1-p,3);el.textContent=(from+(to-from)*q).toLocaleString(undefined,{minimumFractionDigits:dec,maximumFractionDigits:dec})+m[2];if(p<1)requestAnimationFrame(step)};
    requestAnimationFrame(step);
  });
}
const _r=window.render;window.render=function(){_r();enhance()};
const _f=window.flash;window.flash=function(t){_f(t);if(String(t).startsWith('✓'))confetti()};
render();
})();
