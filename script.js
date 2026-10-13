/* ====== DATOS EDITABLES ====== */
const CFG = {
  whatsapp: '5493795383101',               // +54 9 3795 38-3101 (código de país, sin + ni espacios)
  instagram: 'https://instagram.com/lopezzzz___lopez__?xtok=MWl2ZHl2ZmQ5ZHR6aQ%3D%3D',                   // usuario sin @
  address: 'Calle 620, Barrio Perichón (frente a la Quiniela)',
  mapsQuery: 'Calle 620, Barrio Perichón, Corrientes, Argentina',  // confirma la ciudad
  hours: 'Clases de lunes a viernes',
  howto: 'Estamos justo frente a la Quiniela, en Barrio Perichón.',
};
const CLASSES = [
  {id:'funcional', name:'Funcional', dur:'60 min', desc:'Entrenamiento de cuerpo completo con movimientos de todos los días: sentadillas, empujes, tirones y saltos. Trabajas fuerza, equilibrio, coordinación y resistencia, y mejoras cómo te mueves en la vida diaria.'},
  {id:'fuerza',    name:'Fuerza',    dur:'60 min', desc:'Ejercicios con mancuernas, barras y discos para fortalecer piernas, glúteos, espalda, pecho y brazos. Ganas músculo y fuerza con la técnica correcta y una profe que te corrige.'},
  {id:'pilates',   name:'Cardio',   dur:'90 min', desc:'Ejercicios controlados sobre colchoneta que fortalecen el abdomen profundo, la espalda y los glúteos. Mejoras postura, flexibilidad y control del cuerpo, con poco impacto en las articulaciones.'},
  {id:'baile',     name:'Baile fitness', dur:'60 min', desc:'Coreografías simples con música que activan todo el cuerpo. Trabajas el corazón, la resistencia y la coordinación, quemas energía y te diviertes sin darte cuenta.'},
  {id:'yoga',      name:'Yoga',      dur:'60 min', desc:'Posturas y respiración para soltar tensión, ganar flexibilidad y equilibrio, y fortalecer suavemente el core y las piernas. Bájale el estrés a tu semana.'},
  {id:'hiit',      name:'HIIT',      dur:'60 min', desc:'Intervalos cortos de esfuerzo intenso con pausas breves. Trabajas el corazón, la resistencia y todo el cuerpo en poco tiempo, y aceleras el gasto de energía.'},
];
const DAYS = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
const SCHEDULE = {
  Lun:[['07:00','funcional'],['09:30','pilates'],['19:00','hiit'],['20:00','baile']],
  Mar:[['07:00','fuerza'],['10:00','yoga'],['19:00','funcional'],['20:00','pilates']],
  'Mié':[['07:00','funcional'],['09:30','baile'],['19:00','fuerza'],['20:00','hiit']],
  Jue:[['07:00','Cardio'],['10:00','funcional'],['19:00','baile'],['20:00','yoga']],
  Vie:[['07:00','hiit'],['09:30','fuerza'],['18:30','funcional'],['19:30','baile']],
  'Sáb':[],
  Dom:[],
};
/* ============================== */

const $ = (s, r=document) => r.querySelector(s);
const el = (tag, attrs={}, ...kids) => { const e=document.createElement(tag); for(const [k,v] of Object.entries(attrs)){ if(k==='class')e.className=v; else if(k==='text')e.textContent=v; else e.setAttribute(k,v);} kids.forEach(k=>e.append(k)); return e; };
/* ====== TUS FOTOS Y VIDEOS ======
   1) Pon los archivos en las carpetas fotos/ y videos/ junto a este index.html
   2) Escribe aquí sus nombres. Ejemplo:
      photos: [{src:'fotos/clase1.jpg'}, {src:'fotos/clase2.jpg'}],
      videos: [{src:'videos/rutina1.mp4', title:'Rutina de piernas'}]  */
const state = {
  photos: [],
  videos: [],
};

const waLink = (msg='Hola, me interesa comenzar con gym. ¿Me puedes ayudar?') => `https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(msg)}`;
const igLink = `${CFG.instagram}`;
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CFG.mapsQuery)}`;
const wazeLink = `https://waze.com/ul?q=${encodeURIComponent(CFG.mapsQuery)}&navigate=yes`;

document.querySelectorAll('[data-wa]').forEach(a=>a.href=waLink());
document.querySelectorAll('[data-ig]').forEach(a=>a.href=igLink);
document.querySelectorAll('[data-fill]').forEach(n=>n.textContent=CFG[n.dataset.fill]);
$('#gmaps').href=mapsLink; $('#waze').href=wazeLink;
$('#copy').addEventListener('click', async e=>{ const b=e.currentTarget; try{ await navigator.clipboard.writeText(CFG.address); b.textContent='¡Copiada!'; }catch(_){ b.textContent='Copia a mano: '+CFG.address; } setTimeout(()=>b.textContent='Copiar dirección',2500); });

/* ---- clases ---- */
const clsById = Object.fromEntries(CLASSES.map(c=>[c.id,c]));
/* ---- horarios ---- */
const tabs = $('#tabs'), slots = $('#slots'); tabs.innerHTML=''; slots.innerHTML='';
const todayIdx = (new Date().getDay()+6)%7;
function showDay(i){
  [...tabs.children].forEach((t,j)=>t.setAttribute('aria-selected', String(i===j)));
  slots.innerHTML='';
  const d = DAYS[i], list = SCHEDULE[d]||[];
  if(!list.length){ slots.append(el('div',{class:'empty',text:'Este día no hay clases. Nos vemos el lunes.'})); return; }
  list.forEach(([t,id])=>{
    const c = clsById[id];
    const a = el('a',{class:'btn btn-wa btn-sm',target:'_blank',rel:'noopener',text:'Reservar'});
    a.href = waLink(`Hola! Quiero reservar ${c.name} el ${d} a las ${t}.`);
    const nm = el('div',{class:'name',text:c.name}); nm.append(el('small',{text:c.dur}));
    slots.append(el('div',{class:'slot'}, el('span',{class:'time',text:t}), nm, a));
  });
}
DAYS.forEach((d,i)=>{
  const b = el('button',{class:'tab',role:'tab',type:'button',text:d});
  if(i===todayIdx) b.append(el('span',{class:'today',text:'hoy'}));
  b.addEventListener('click',()=>showDay(i));
  tabs.append(b);
});
showDay(todayIdx);

/* ---- ilustraciones de clases (se usan hasta que subas fotos reales) ---- */
const POSES={
 up:{h:[0,-64],l:[[0,-54,0,0],[0,-48,-20,-78],[0,-48,20,-78],[0,0,-12,46],[0,0,12,46]]},
 squat:{h:[8,-46],l:[[6,-36,0,-2],[6,-32,30,-30],[0,0,26,6,12,44],[0,0,30,8,24,44]]},
 lunge:{h:[0,-60],l:[[0,-50,0,0],[0,-44,-16,-16],[0,-44,16,-16],[0,0,26,10,26,46],[0,0,-24,22,-42,46]]},
 jump:{h:[0,-72],l:[[0,-62,0,-12],[0,-56,-26,-84],[0,-56,26,-84],[0,-12,-18,16,-10,36],[0,-12,18,16,10,36]]},
 dance:{h:[0,-62],l:[[0,-52,4,0],[0,-46,-26,-62],[0,-46,24,-26],[4,0,-10,46],[4,0,24,40]]},
 plank:{h:[-52,-14],l:[[-44,-8,34,14],[-30,-4,-30,28],[34,14,56,30]]},
 sit:{h:[0,-54],l:[[0,-44,0,0],[0,-38,-24,-18],[0,-38,24,-18],[0,0,32,4],[0,0,-32,4]]},
};
function person(p,x,y,s=1){const P=POSES[p];const ls=P.l.map(a=>{const pts=[];for(let i=0;i<a.length;i+=2)pts.push(a[i]+','+a[i+1]);return `<polyline points="${pts.join(' ')}"/>`}).join('');return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="${P.h[0]}" cy="${P.h[1]}" r="10" fill="currentColor"/><g fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-linejoin="round">${ls}</g></g>`;}
const SCENES={
  funcional:{c:['#1f6b45','#154d32','#8fd3a4'],f:[['jump',100,186],['lunge',200,186],['squat',300,186]],d:'<circle cx="320" cy="64" r="36" class="s-deco"/>'},
  fuerza:{c:['#17553a','#103d2a','#b8e04a'],f:[['squat',110,186],['lunge',215,186],['up',310,186]],d:'<rect x="60" y="60" width="280" height="10" rx="5" class="s-deco"/><rect x="48" y="44" width="14" height="42" rx="5" class="s-deco"/><rect x="338" y="44" width="14" height="42" rx="5" class="s-deco"/>'},
  pilates:{c:['#3b8f67','#2b7050','#e1f2c2'],f:[['plank',90,200],['plank',200,200],['plank',310,200]],d:'<rect x="40" y="232" width="100" height="8" rx="4" class="s-deco"/><rect x="150" y="232" width="100" height="8" rx="4" class="s-deco"/><rect x="262" y="232" width="100" height="8" rx="4" class="s-deco"/>'},
  baile:{c:['#1a5c3d','#12432d','#d9f27a'],f:[['dance',90,186],['jump',200,186],['dance',310,186]],d:'<circle cx="80" cy="60" r="24" class="s-deco"/><circle cx="200" cy="40" r="30" class="s-deco"/><circle cx="330" cy="62" r="22" class="s-deco"/>'},
  yoga:{c:['#4a9b73','#357a58','#f0f7d6'],f:[['up',100,186],['sit',210,222],['up',310,186]],d:'<circle cx="200" cy="90" r="54" class="s-deco"/>'},
  hiit:{c:['#14513a','#0d3a29','#8fd3a4'],f:[['jump',110,186],['plank',215,200],['jump',320,186]],d:'<path d="M40 70h80M80 90h60M280 66h70" class="s-line"/>'},
};
function scene(id){
  const s=SCENES[id]; const [c1,c2,c3]=s.c; const name=clsById[id].name;
  const figs=s.f.map(([p,x,y])=>person(p,x,y)).join('');
  return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Ilustración de clase de ${name}" style="--c1:${c1};--c2:${c2};--c3:${c3}"><rect class="s-bg" width="400" height="300"/><g>${s.d}</g><rect class="s-floor" y="234" width="400" height="66"/><g class="s-fig">${figs}</g></svg>`;
}

/* ---- galeria ---- */
let filter='all';
const chips=$('#chips'), gallery=$('#gallery'); chips.innerHTML='';
[['all','Todas'],...CLASSES.map(c=>[c.id,c.name])].forEach(([id,label])=>{
  const b=el('button',{class:'chip',type:'button','aria-pressed':String(id===filter),text:label});
  b.addEventListener('click',()=>{filter=id;[...chips.children].forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');renderGallery();});
  chips.append(b);
});
function renderGallery(){
  gallery.innerHTML='';
  const items=[];
  if(filter==='all') state.photos.forEach(p=>items.push({type:'photo',src:p.src,cap:'House Gym'}));
  CLASSES.filter(c=>filter==='all'||c.id===filter).forEach(c=>{ items.push({type:'scene',id:c.id,cap:c.name}); if(filter!=='all'){ items.push({type:'scene',id:c.id,cap:c.name}); } });
  items.forEach(it=>{
    const f=el('figure',{class:'tile',tabindex:'0',role:'button','aria-label':'Ver '+it.cap+' en grande'});
    if(it.type==='photo'){ const im=el('img',{src:it.src,alt:'Foto de una clase en House Gym',loading:'lazy'}); f.append(im);
      if(isOwner){ const d=el('button',{class:'del',type:'button',text:'Quitar'}); armDelete(d,'photos',it.id); f.append(d); } }
    else f.insertAdjacentHTML('beforeend',scene(it.id));
    f.append(el('figcaption',{text:it.cap}));
    const open=()=>openLb(it);
    f.addEventListener('click',e=>{ if(e.target.closest('.del'))return; open(); });
    f.addEventListener('keydown',e=>{ if((e.key==='Enter'||e.key===' ')&&!e.target.closest('.del')){e.preventDefault();open();} });
    gallery.append(f);
  });
}
const lb=$('#lb');
function openLb(it){
  const st=$('#lbStage'); st.innerHTML='';
  if(it.type==='photo') st.append(el('img',{src:it.src,alt:'Foto de una clase en House Gym'})); else st.innerHTML=scene(it.id);
  $('#lbCap').textContent=it.cap;
  if(lb.showModal) lb.showModal(); else lb.setAttribute('open','');
}
$('#lbClose').addEventListener('click',()=>lb.close());
lb.addEventListener('click',e=>{ if(e.target===lb) lb.close(); });

/* ---- videos ---- */
function renderVideos(){
  const v=$('#videos'); v.innerHTML='';
  if(!state.videos.length){
    const box=el('div',{class:'vempty'},
      el('p',{text:'Pronto subimos aquí las rutinas. Mientras tanto, mira las clases y los videos en Instagram.'}));
    const a=el('a',{class:'btn btn-wa',target:'_blank',rel:'noopener',text:'Ver rutinas en Instagram'}); a.href=igLink; box.append(a); v.append(box); return;
  }
  state.videos.forEach(x=>{
    const vid=el('video',{controls:'',preload:'metadata',playsinline:'','aria-label':x.title||'Rutina'}); vid.src=x.src;
    const cap=el('div',{class:'cap'},el('span',{text:x.title||'Rutina'}));
    if(isOwner){ const d=el('button',{type:'button',text:'Quitar'}); armDelete(d,'videos',x.id); cap.append(d); }
    v.append(el('div',{class:'vcard'},vid,cap));
  });
}

/* ---- mapa ilustrativo ---- */
const mapWrap=$('#mapSvgWrap'), mapEl=$('#map'), tip=$('#tip');
mapWrap.innerHTML=`
<svg id="msvg" viewBox="0 0 800 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Mapa ilustrativo con House Gym en el centro">
 <rect width="800" height="520" fill="var(--map-land)"/>
 <g id="mg">
  <rect x="-200" y="-200" width="1200" height="920" fill="var(--map-land)"/>
  <path d="M-200 430 C 100 360, 250 470, 480 400 S 800 330, 1000 380 L1000 520 L-200 520Z" fill="var(--map-water)"/>
  <rect x="520" y="70" width="190" height="130" rx="22" fill="var(--map-park)"/>
  <rect x="70" y="300" width="130" height="70" rx="18" fill="var(--map-park)"/>
  <g fill="var(--map-block)">
   <rect x="60" y="60" width="150" height="90" rx="10"/><rect x="250" y="60" width="130" height="90" rx="10"/><rect x="60" y="190" width="150" height="80" rx="10"/>
   <rect x="250" y="190" width="130" height="80" rx="10"/><rect x="420" y="190" width="150" height="80" rx="10"/><rect x="610" y="230" width="150" height="80" rx="10"/>
   <rect x="250" y="310" width="130" height="50" rx="10"/><rect x="420" y="310" width="150" height="50" rx="10"/><rect x="420" y="60" width="70" height="90" rx="10"/>
  </g>
  <g stroke="var(--map-road)" stroke-linecap="round" fill="none">
   <path d="M-100 170H900" stroke-width="22"/><path d="M230-100V620" stroke-width="22"/><path d="M-100 290H900" stroke-width="14"/>
   <path d="M400-100V620" stroke-width="14"/><path d="M590-100V620" stroke-width="14"/><path d="M-100 40H900" stroke-width="10"/><path d="M-100 380H900" stroke-width="10"/>
   <path d="M60 520 560 -20" stroke-width="10"/>
  </g>
  <g font-family="DM Sans,system-ui,sans-serif" font-size="13" font-weight="700" fill="var(--map-text)">
   <text x="290" y="164">Calle 620</text>
   
  </g>
  <g class="poi" tabindex="0" role="button" aria-label="La Quiniela" data-tip="La Quiniela: estamos justo enfrente.">
   <circle cx="300" cy="290" r="16" fill="#e9f5ec" stroke="var(--brand)" stroke-width="3"/><text x="300" y="295" text-anchor="middle" font-size="14" font-weight="800" font-family="DM Sans,sans-serif" fill="var(--brand)">Q</text></g>
  <g class="poi" id="pin" tabindex="0" role="button" aria-label="House Gym" data-tip="House Gym: Calle 620, frente a la Quiniela.">
   <circle class="pulse" cx="400" cy="170" r="22" fill="var(--brand)"/>
   <path d="M400 214c-26-26-38-42-38-62a38 38 0 0 1 76 0c0 20-12 36-38 62z" fill="var(--brand)" stroke="#fff" stroke-width="3"/>
   <path d="M386 156l14-12 14 12v14h-28z" fill="none" stroke="var(--on-brand)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
  </g>
 </g>
</svg>`;
const mg=$('#mg'); let sc=1,tx=0,ty=0; const MIN=1,MAX=3;
function applyMap(){ const lx=(sc-1)*300+60, ly=(sc-1)*200+40; tx=Math.max(-lx,Math.min(lx,tx)); ty=Math.max(-ly,Math.min(ly,ty)); mg.setAttribute('transform',`translate(${400-400*sc+tx} ${170-170*sc+ty}) scale(${sc})`); }
function zoom(d){ sc=Math.max(MIN,Math.min(MAX,sc+d)); applyMap(); }
$('#zin').addEventListener('click',()=>zoom(.5)); $('#zout').addEventListener('click',()=>zoom(-.5)); $('#zhome').addEventListener('click',()=>{sc=1;tx=0;ty=0;applyMap();tip.textContent='House Gym está en el pin verde.';});
let drag=null;
mapEl.addEventListener('pointerdown',e=>{ if(e.target.closest('.zoom')||e.target.closest('.poi')||e.target.closest('.tip'))return; drag={x:e.clientX,y:e.clientY,tx,ty}; mapEl.setPointerCapture(e.pointerId); });
mapEl.addEventListener('pointermove',e=>{ if(!drag)return; const r=mapEl.getBoundingClientRect(); const k=800/r.width; tx=drag.tx+(e.clientX-drag.x)*k; ty=drag.ty+(e.clientY-drag.y)*k; applyMap(); });
mapEl.addEventListener('pointerup',()=>drag=null); mapEl.addEventListener('pointercancel',()=>drag=null);
mapEl.addEventListener('dblclick',e=>{ if(!e.target.closest('.poi')) zoom(.5); });
mapWrap.querySelectorAll('.poi').forEach(p=>{ const show=()=>tip.textContent=p.dataset.tip; p.addEventListener('click',show); p.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show();}}); });
applyMap();


/* ---- carrusel de clases ---- */
function initCarousel(){
  const track=$('#ctrack'), dots=$('#cdots'), view=$('#cview');
  track.innerHTML='';
  CLASSES.forEach(c=>{
    const card=el('article',{class:'ccard'});
    const art=el('div',{class:'art'}); art.innerHTML=scene(c.id);
    const body=el('div',{class:'body'}, el('h3',{text:c.name}), el('span',{class:'meta',text:c.dur}), el('p',{text:c.desc}));
    const a=el('a',{class:'btn btn-brand btn-sm',target:'_blank',rel:'noopener',text:'Reservar'}); a.href=waLink(`Hola! Quiero reservar una clase de ${c.name} en House Gym.`);
    body.append(a); card.append(art,body); track.append(card);
  });
  const GAP=18, reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mq1=matchMedia('(max-width:620px)'), mq2=matchMedia('(max-width:980px)');
  let i=0, per=3, timer=null, paused=reduce;
  const maxI=()=>CLASSES.length-per;
  function buildDots(){ dots.innerHTML=''; for(let k=0;k<=maxI();k++){ const d=el('button',{class:'cdot',type:'button','aria-label':'Ir a la posición '+(k+1)}); d.addEventListener('click',()=>{go(k);restart();}); dots.append(d);} }
  function go(n){
    const m=maxI(); i=n>m?0:n<0?m:n;
    const step=track.children[0].getBoundingClientRect().width+GAP;
    track.style.transform=`translateX(${-i*step}px)`;
    [...dots.children].forEach((d,k)=>d.setAttribute('aria-current',String(k===i)));
    [...track.children].forEach((c,k)=>{ const vis=k>=i&&k<i+per; c.inert=!vis; c.setAttribute('aria-hidden',String(!vis)); });
  }
  function calc(){ per=mq1.matches?1:mq2.matches?2:3; buildDots(); go(Math.min(i,maxI())); }
  function stop(){ clearInterval(timer); timer=null; }
  function start(){ stop(); if(!paused) timer=setInterval(()=>go(i+1),4500); }
  function restart(){ if(!paused) start(); }
  $('#cprev').addEventListener('click',()=>{go(i-1);restart();});
  $('#cnext').addEventListener('click',()=>{go(i+1);restart();});
  const pb=$('#cpause');
  const label=()=>{ pb.textContent=paused?'▶':'❚❚'; pb.setAttribute('aria-label',paused?'Reanudar carrusel':'Pausar carrusel'); };
  pb.addEventListener('click',()=>{ paused=!paused; label(); paused?stop():start(); });
  const car=view.parentElement;
  car.addEventListener('mouseenter',stop); car.addEventListener('mouseleave',()=>{ if(!paused) start(); });
  car.addEventListener('focusin',stop); car.addEventListener('focusout',()=>{ if(!paused) start(); });
  let x0=null;
  view.addEventListener('pointerdown',e=>{ x0=e.clientX; });
  view.addEventListener('pointerup',e=>{ if(x0===null)return; const dx=e.clientX-x0; x0=null; if(Math.abs(dx)>45){ go(i+(dx<0?1:-1)); restart(); } });
  view.addEventListener('pointercancel',()=>x0=null);
  mq1.addEventListener('change',calc); mq2.addEventListener('change',calc); addEventListener('resize',()=>go(i));
  label(); calc(); start();
}
const isOwner=false;
renderGallery(); renderVideos(); initCarousel();