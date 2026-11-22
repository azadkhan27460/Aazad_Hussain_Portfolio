const progress=document.getElementById('progress');
const year=document.getElementById('year');
const nav=document.getElementById('nav');
const menuToggle=document.getElementById('menuToggle');
const glow=document.getElementById('pointerGlow');
if(year)year.textContent=new Date().getFullYear();
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let scrollTick=false;
function onScroll(){if(scrollTick)return;scrollTick=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;const p=max>0?scrollY/max*100:0;if(progress)progress.style.width=p+'%';document.documentElement.style.setProperty('--scroll-progress',p+'%');scrollTick=false;});}
addEventListener('scroll',onScroll,{passive:true});onScroll();
if(menuToggle&&nav){menuToggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.setAttribute('aria-label',open?'Close menu':'Open menu');});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}));}
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const target=document.querySelector(a.getAttribute('href'));if(target){e.preventDefault();target.scrollIntoView({behavior:reduceMotion?'auto':'smooth'});}}));
if(!reduceMotion&&matchMedia('(hover:hover) and (pointer:fine)').matches){
 addEventListener('pointermove',e=>{if(glow){glow.style.opacity='.85';glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px';}},{passive:true});
 document.querySelectorAll('[data-tilt]').forEach(card=>{card.addEventListener('pointermove',e=>{const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform='perspective(1000px) rotateX('+(-y*3.5)+'deg) rotateY('+(x*4)+'deg) translateY(-4px)';});card.addEventListener('pointerleave',()=>{card.style.transform='';});});
}
const canvas=document.getElementById('universe');
if(canvas&&!reduceMotion){const ctx=canvas.getContext('2d');let w=0,h=0,dpr=1,points=[],raf=0;const pointer={x:-1000,y:-1000};
function resize(){const r=canvas.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,1.6);w=r.width;h=r.height;canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);const count=Math.min(85,Math.max(35,Math.round(w/13)));points=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.5+.5}));}
function draw(){ctx.clearRect(0,0,w,h);for(let i=0;i<points.length;i++){const p=points[i];p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;const dx=p.x-pointer.x,dy=p.y-pointer.y,dist=Math.hypot(dx,dy);if(dist<130){p.x+=dx/dist*-.12;p.y+=dy/dist*-.12;}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(205,195,255,.62)';ctx.fill();for(let j=i+1;j<points.length;j++){const q=points[j],dd=Math.hypot(p.x-q.x,p.y-q.y);if(dd<115){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle='rgba(167,139,250,'+(1-dd/115)*.16+')';ctx.lineWidth=.7;ctx.stroke();}}}raf=requestAnimationFrame(draw);}
canvas.addEventListener('pointermove',e=>{const r=canvas.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;},{passive:true});canvas.addEventListener('pointerleave',()=>{pointer.x=-1000;pointer.y=-1000;});const ro=new ResizeObserver(resize);ro.observe(canvas);resize();draw();document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else draw();});}
