
(() => {
 const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const portrait=$('#portraitSource'); if(portrait) $$('.portrait-copy').forEach(i=>i.src=portrait.src);
 const loader=$('#preloader'), hide=()=>setTimeout(()=>loader&&loader.classList.add('done'),450);
 if(document.readyState==='complete') hide(); else window.addEventListener('load',hide,{once:true}); setTimeout(hide,2600);
 const year=$('#year'); if(year) year.textContent=new Date().getFullYear();
 const toggle=$('#menuToggle'), nav=$('#mainNav');
 toggle&&toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav&&nav.classList.toggle('open',open)});
 $$('#mainNav a').forEach(a=>a.addEventListener('click',()=>{toggle&&toggle.setAttribute('aria-expanded','false');nav&&nav.classList.remove('open')}));
 const reveals=$$('.reveal');
 if('IntersectionObserver'in window&&!reduced){const io=new IntersectionObserver((entries,obs)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -35px 0px'});reveals.forEach(e=>io.observe(e))}else reveals.forEach(e=>e.classList.add('visible'));
 $$('.screen-shot').forEach(img=>img.addEventListener('error',()=>{const f=img.dataset.fallback;if(f&&img.src!==f)img.src=f;else img.classList.add('image-unavailable')},{once:true}));
 const progress=$('#progress');let ticking=false;const scroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=(max>0?scrollY/max*100:0)+'%';ticking=false};addEventListener('scroll',()=>{if(!ticking){requestAnimationFrame(scroll);ticking=true}},{passive:true});scroll();
 if(matchMedia('(pointer:fine)').matches&&!reduced){
  const dot=$('#cursorDot'),ring=$('#cursorRing');let x=0,y=0,rx=0,ry=0;
  addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;if(dot){dot.style.opacity=1;dot.style.left=x+'px';dot.style.top=y+'px'}},{passive:true});
  const cursor=()=>{rx+=(x-rx)*.16;ry+=(y-ry)*.16;if(ring){ring.style.opacity=1;ring.style.left=rx+'px';ring.style.top=ry+'px'}requestAnimationFrame(cursor)};cursor();
  $$('a,button,.project-card').forEach(e=>{e.addEventListener('mouseenter',()=>ring&&ring.classList.add('hover'));e.addEventListener('mouseleave',()=>ring&&ring.classList.remove('hover'))});
  $$('.project-card[data-tilt]').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;c.style.transform='perspective(1100px) rotateY('+(px*3.5)+'deg) rotateX('+(-py*3.5)+'deg) translateY(-3px)'});c.addEventListener('mouseleave',()=>c.style.transform='')});
  const hv=$('#heroVisual'),stage=$('.portrait-stage');hv&&hv.addEventListener('mousemove',e=>{const r=hv.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;if(stage)stage.style.transform='rotateY('+(px*7)+'deg) rotateX('+(-py*5)+'deg)'});hv&&hv.addEventListener('mouseleave',()=>{if(stage)stage.style.transform=''});
  $$('.magnetic').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform='translate('+((e.clientX-r.left-r.width/2)*.08)+'px,'+((e.clientY-r.top-r.height/2)*.12)+'px)'});b.addEventListener('mouseleave',()=>b.style.transform='')});
 }
 const canvas=$('#particles'),ctx=canvas&&canvas.getContext('2d');
 if(canvas&&ctx&&!reduced){let w=0,h=0,pts=[];const resize=()=>{const hero=$('.hero');if(!hero)return;const r=hero.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,1.5);w=canvas.width=Math.floor(r.width*d);h=canvas.height=Math.floor(r.height*d);canvas.style.width=r.width+'px';canvas.style.height=r.height+'px';ctx.setTransform(d,0,0,d,0,0);pts=Array.from({length:Math.min(46,Math.max(18,Math.floor(r.width/24)))},()=>({x:Math.random()*r.width,y:Math.random()*r.height,r:Math.random()*1.6+.35,vy:Math.random()*.22+.08,vx:(Math.random()-.5)*.14,a:Math.random()*.35+.12,p:Math.random()*6.28}))};const draw=()=>{const hero=$('.hero');if(hero&&hero.getBoundingClientRect().bottom>0){ctx.clearRect(0,0,w,h);pts.forEach(p=>{p.x+=p.vx;p.y-=p.vy;p.p+=.012;if(p.y<-8){p.y=hero.clientHeight+8;p.x=Math.random()*hero.clientWidth}if(p.x<-8)p.x=hero.clientWidth+8;if(p.x>hero.clientWidth+8)p.x=-8;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(184,155,104,'+(p.a*(.7+Math.sin(p.p)*.3))+')';ctx.fill()})}requestAnimationFrame(draw)};resize();addEventListener('resize',resize,{passive:true});draw()}
})();
