'use strict';
// Organismo espacial procedural: fibras en 3D proyectadas a Canvas 2D.
// El scroll controla cámara/escala; el cursor responde con inercia.
const canvas=document.querySelector('#organism'),ctx=canvas.getContext('2d');
const scenes=[...document.querySelectorAll('[data-scene]')];
const menu=document.querySelector('#menu-toggle'),nav=document.querySelector('#index-panel');
const panel=document.querySelector('#detail-panel'),shade=document.querySelector('#panel-backdrop');
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
const colors=['#ff4865','#ff8d25','#e4ff3c','#87ff65','#31f2df','#6e7dff','#e78aff'];
const palettes={
 hero:['#e78aff','#31f2df','#ff4865','#e4ff3c'],
 origin:['#eb75ff','#31f2df','#ffaf38'],
 observe:['#31f2df','#a98aff','#e4ff3c','#fd5eaa'],
 traces:['#ff5395','#e78aff','#e4ff3c'],
 pause:['#b19bd2'],threshold:['#ff4865','#ff8d25','#e4ff3c'],
 chakras:colors,integrate:colors
};
const chakras=[
 ['Mūlādhāra','01 / RAÍZ','Antes de avanzar, necesito reconocer aquello que me sostiene.','¿Qué necesito para sentir que puedo sostenerme?'],
 ['Svādhiṣṭhāna','02 / SACRO','Hay emociones que llegan antes que las palabras.','¿Qué parte de mí aprendió a pedir permiso para sentir?'],
 ['Maṇipūra','03 / PLEXO SOLAR','No toda fuerza necesita convertirse en una demostración.','¿Qué haría si no necesitara demostrar constantemente mi valor?'],
 ['Anāhata','04 / CORAZÓN','Hay vínculos que nos enseñan a abrirnos. Y otros que nos enseñan a protegernos.','¿Qué parte de mí sigo protegiendo incluso cuando deseo acercarme?'],
 ['Viśuddha','05 / GARGANTA','No todas las palabras que callamos desaparecen.','¿Qué dejo de decir cuando temo incomodar?'],
 ['Ājñā','06 / TERCER OJO','No vemos solamente lo que ocurre. También miramos desde lo que hemos vivido.','¿Qué historia sobre mí sigo tratando como verdad definitiva?'],
 ['Sahasrāra','07 / CORONA','No todo necesita convertirse en respuesta.','¿Y si comprenderme no fuera encontrar una sola definición?']
];
const detail={
 origen:['ORIGEN / CONVERSACIÓN','El comienzo de una pregunta','Este proyecto nació de conversaciones frecuentes con inteligencia artificial: un espacio para exteriorizar pensamientos, volver sobre preguntas y observar diferentes maneras de narrarme.','¿Cuándo una conversación se convierte en una forma de mirarse?'],
 observacion:['OBSERVACIÓN / ARCHIVO','Un espejo, no una certeza','Reuní conversaciones con Gemini y empecé a observar ideas, preguntas y relatos que reaparecían. Las interpretaciones de una IA son propuestas para pensar, no definiciones objetivas. Los extractos originales se incorporarán cuando estén revisados para su publicación.','¿Qué ocurre entre una pregunta y la siguiente?']
};
let W=0,H=0,dpr=1,t=0,scrollY=0,scene='hero',sceneProgress=0,zoom=1,targetZoom=1,focusBefore=null;
const mouse={x:0,y:0,tx:0,ty:0};
const lerp=(a,b,k)=>a+(b-a)*k;
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function resize(){
 dpr=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;
 canvas.width=Math.round(W*dpr);canvas.height=Math.round(H*dpr);
 ctx.setTransform(dpr,0,0,dpr,0,0);
}
function updateScroll(){
 scrollY=window.scrollY;
 const middle=scrollY+innerHeight*.53;
 let chosen=scenes[0];
 for(const el of scenes){if(el.offsetTop<=middle)chosen=el;}
 scene=chosen.dataset.scene;
 sceneProgress=clamp((middle-chosen.offsetTop)/Math.max(1,chosen.offsetHeight),0,1);
 // La cámara se aproxima, atraviesa y vuelve a abrirse entre capítulos.
 const profiles={hero:1.0,origin:2.7,observe:2.15,traces:1.6,pause:.4,threshold:1.1,chakras:1.45,integrate:.9};
 targetZoom=(profiles[scene]||1)+Math.sin(sceneProgress*Math.PI)*.24;
 const max=document.documentElement.scrollHeight-innerHeight;
 document.querySelector('#progress span').style.height=(max>0?scrollY/max*100:0)+'%';
 document.body.classList.toggle('in-pause',scene==='pause');
 document.querySelectorAll('.reveal').forEach(el=>{
   if(el.getBoundingClientRect().top<innerHeight*.82)el.classList.add('is-visible');
 });
}
function rgba(hex,a){
 const n=parseInt(hex.slice(1),16);
 return 'rgba('+((n>>16)&255)+','+((n>>8)&255)+','+(n&255)+','+a+')';
}
function project(x,y,z,scale,rx,ry){
 const a=x*Math.cos(ry)-z*Math.sin(ry),zz=x*Math.sin(ry)+z*Math.cos(ry);
 const yy=y*Math.cos(rx)-zz*Math.sin(rx),depth=y*Math.sin(rx)+zz*Math.cos(rx);
 const f=2.8/(2.8+depth*.3);
 return [W/2+a*scale*f,H*.50+yy*scale*f,f];
}
function draw(now){
 const dt=Math.min(.05,(now-(draw.last||now))/1000);draw.last=now;
 if(!reduce.matches)t+=dt;
 mouse.x=lerp(mouse.x,mouse.tx,.035);mouse.y=lerp(mouse.y,mouse.ty,.035);
 zoom=lerp(zoom,targetZoom,.045);
 ctx.clearRect(0,0,W,H);
 if(scene!=='pause'){
  const p=palettes[scene]||palettes.hero;
  const s=Math.min(W,H)*.235*zoom;
  const ry=t*.055+mouse.x*.18+scrollY*.00008,rx=.17+mouse.y*.15;
  const breath=1+.045*Math.sin(t*1.3);
  ctx.save();ctx.globalCompositeOperation='screen';
  // Membranas semitransparentes: varios anillos orgánicos, no círculos perfectos.
  for(let layer=7;layer>=0;layer--){
   const r=(.36+layer*.102)*breath;
   ctx.beginPath();
   for(let j=0;j<=140;j++){
    const u=j/140*Math.PI*2;
    const wave=.08*Math.sin(u*5+layer*.7+t*.36)+.044*Math.cos(u*9-t*.48+layer);
    const X=Math.cos(u)*(r+wave),Y=Math.sin(u)*(r+wave)*.81;
    const Z=.35*Math.sin(u*3+layer*.6+t*.24);
    const q=project(X,Y,Z,s,rx,ry);
    j?ctx.lineTo(q[0],q[1]):ctx.moveTo(q[0],q[1]);
   }
   ctx.closePath();ctx.fillStyle=rgba(p[layer%p.length],.024);ctx.fill();
   ctx.strokeStyle=rgba(p[layer%p.length],.09);ctx.lineWidth=.8;ctx.stroke();
  }
  // Filamentos en tres dimensiones: capas que se cruzan y reaccionan al cursor.
  const count=W<650?95:170;
  for(let i=0;i<count;i++){
   const hue=p[(i*7+Math.floor(i/9))%p.length];
   const phase=i*2.39996323,lat=-1+(i+.5)/count*2;
   const circle=Math.sqrt(1-lat*lat),rr=(.5+(i%9)*.055)*breath;
   ctx.beginPath();
   let last;
   for(let j=0;j<34;j++){
    const v=j/33*Math.PI*1.68+phase;
    const ripple=Math.sin(v*4+i*.37+t*.6)*.065;
    const x=(Math.cos(v)*circle*rr+ripple)*Math.cos(phase)+Math.sin(v*.6+phase)*.13;
    const y=(lat*.72+Math.sin(v+phase)*circle*.48)*rr;
    const z=(Math.sin(v)*circle*rr+ripple)*Math.sin(phase)+Math.cos(v*.5+phase)*.17;
    const q=project(x,y,z,s,rx,ry);
    if(j===0)ctx.moveTo(q[0],q[1]);else ctx.lineTo(q[0],q[1]);
    last=q;
   }
   ctx.lineWidth=i%8===0?1.45:.55;
   ctx.strokeStyle=rgba(hue,.18+(i%7)*.055);
   ctx.stroke();
   if(i%5===0&&last){
    ctx.beginPath();ctx.arc(last[0],last[1],1.1+(i%3)*.7,0,Math.PI*2);
    ctx.fillStyle=rgba(hue,.58);ctx.fill();
   }
  }
  const core=project(0,0,0,s,rx,ry);
  const glow=ctx.createRadialGradient(core[0],core[1],0,core[0],core[1],s*.64);
  glow.addColorStop(0,rgba(p[1%p.length],.27));
  glow.addColorStop(.38,rgba(p[0],.08));glow.addColorStop(1,rgba(p[0],0));
  ctx.fillStyle=glow;ctx.beginPath();ctx.arc(core[0],core[1],s*.64,0,Math.PI*2);ctx.fill();
  ctx.restore();
 }
 requestAnimationFrame(draw);
}
function openDetail(data){
 if(!data)return;
 focusBefore=document.activeElement;
 document.querySelector('#detail-kicker').textContent=data[0];
 document.querySelector('#detail-title').textContent=data[1];
 document.querySelector('#detail-description').textContent=data[2];
 document.querySelector('#detail-question').textContent=data[3];
 panel.inert=false;panel.setAttribute('aria-hidden','false');
 panel.classList.add('is-open');shade.hidden=false;document.body.classList.add('panel-open');
 document.querySelector('#detail-close').focus();
}
function closeDetail(){
 panel.classList.remove('is-open');panel.setAttribute('aria-hidden','true');
 panel.inert=true;shade.hidden=true;document.body.classList.remove('panel-open');
 if(focusBefore&&focusBefore.isConnected)focusBefore.focus();
}
function toggleMenu(show){
 nav.classList.toggle('is-open',show);nav.inert=!show;
 menu.setAttribute('aria-expanded',String(show));
 if(show)nav.querySelector('a').focus();else menu.focus();
}
menu.addEventListener('click',()=>toggleMenu(!nav.classList.contains('is-open')));
document.querySelector('#index-close').addEventListener('click',()=>toggleMenu(false));
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
document.querySelectorAll('[data-detail]').forEach(b=>b.addEventListener('click',()=>openDetail(detail[b.dataset.detail])));
document.querySelectorAll('[data-chakra]').forEach(b=>b.addEventListener('click',()=>{
 const c=chakras[Number(b.dataset.chakra)];
 openDetail([c[1],c[0],c[2],c[3]]);
}));
document.querySelector('#detail-close').addEventListener('click',closeDetail);
shade.addEventListener('click',closeDetail);
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'){if(panel.classList.contains('is-open'))closeDetail();else if(nav.classList.contains('is-open'))toggleMenu(false);}
});
let menuTimer;
function showMenu(){
 menu.classList.add('is-visible');clearTimeout(menuTimer);
 if(!nav.classList.contains('is-open'))menuTimer=setTimeout(()=>{
  if(document.activeElement!==menu)menu.classList.remove('is-visible');
 },3300);
}
document.addEventListener('pointermove',e=>{
 mouse.tx=(e.clientX/innerWidth-.5)*2;
 mouse.ty=(e.clientY/innerHeight-.5)*2;
 showMenu();
},{passive:true});
document.addEventListener('touchstart',showMenu,{passive:true});
window.addEventListener('scroll',updateScroll,{passive:true});
window.addEventListener('resize',()=>{resize();updateScroll()});
resize();updateScroll();requestAnimationFrame(draw);
// Capa documental e imágenes reales se añadirán solo con fuentes autorizadas.
