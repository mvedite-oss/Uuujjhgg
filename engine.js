const K='#2b1b1b',W=360,H=640,ease=t=>1-Math.pow(1-Math.min(1,Math.max(0,t)),3);
const BG={street:['#8fd3ff','#7fcf74'],shop:['#fff4d6','#b89a7a'],park:['#9ad8ff','#6fcf74'],night:['#1b2a4a','#2f4f3a']};
const PART={pedal:['Pedal',0,-12],corrente:['Corrente',-17,-18],roda:['Roda',-52,-24],guidao:['Guidão',30,-70],freio:['Freio',34,-46]};
const ln=(c,a)=>{c.beginPath();for(let i=0;i<a.length;i+=2)i?c.lineTo(a[i],a[i+1]):c.moveTo(a[i],a[i+1]);c.stroke()};
function wheel(c,x,y,t){c.save();c.translate(x,y);c.fillStyle='rgba(255,255,255,.35)';c.beginPath();c.arc(0,0,24,0,7);c.fill();c.stroke();c.lineWidth=1.5;for(let i=0;i<6;i++){const a=t*5+i*Math.PI/3;ln(c,[0,0,Math.cos(a)*24,Math.sin(a)*24])}c.restore()}
function bike(c,x,y,s,col,t){c.save();c.translate(x,y);c.scale(s,s);c.lineWidth=4;c.strokeStyle=K;c.lineCap='round';
wheel(c,-34,-24,t);wheel(c,34,-24,t);c.strokeStyle=col;ln(c,[-34,-24,-8,-56,0,-24,-34,-24]);ln(c,[-8,-56,24,-58,0,-24]);ln(c,[24,-58,34,-24]);ln(c,[24,-58,20,-72,32,-72]);ln(c,[-16,-60,0,-60]);
c.strokeStyle=K;c.lineWidth=2;ln(c,[0,-30,-34,-30]);ln(c,[0,-18,-34,-18]);c.lineWidth=4;const a=t*5;ln(c,[0,-24,Math.cos(a)*14,-24+Math.sin(a)*14]);c.fillStyle=K;c.beginPath();c.arc(Math.cos(a)*14,-24+Math.sin(a)*14,4,0,7);c.fill();c.restore()}
function person(c,x,y,o,t){c.save();c.translate(x,y+Math.sin(t*8+x)*3);c.lineWidth=4;c.strokeStyle=K;c.lineJoin=c.lineCap='round';
const col=o.color||'#d9455f';c.fillStyle=col;c.beginPath();c.roundRect(-20,0,40,60,8);c.fill();c.stroke();
ln(c,[-20,10,-28,46]);ln(c,o.wave?[20,10,34+Math.sin(t*10)*4,-12]:[20,10,28,46]);ln(c,[-9,62,-9,88]);ln(c,[9,62,9,88]);
c.fillStyle='#f1c9a0';c.beginPath();c.arc(0,-30,30,0,7);c.fill();c.stroke();c.fillStyle=o.hair||'#333';c.beginPath();c.arc(0,-34,30,Math.PI,0);c.fill();c.stroke();
c.fillStyle=K;c.beginPath();c.arc(-11,-24,3.5,0,7);c.fill();c.beginPath();c.arc(11,-24,3.5,0,7);c.fill();
c.beginPath();if(o.talk&&Math.sin(t*14)>0)c.ellipse(0,-12,6,5,0,0,7);else c.arc(0,-15,8,.2,Math.PI-.2);c.stroke();
if(o.mustache)ln(c,[-12,-17,0,-20,12,-17]);c.restore()}
function prop(c,p,t){const x=p.x||0;c.save();c.lineWidth=4;c.strokeStyle=K;c.lineJoin='round';
if(p.type==='house'){const w=p.w||110,h=p.w?300:150;c.fillStyle=p.color||'#ff9aa2';c.fillRect(x,470-h,w,h);c.strokeRect(x,470-h,w,h);c.fillStyle='#ffe08a';c.fillRect(x+w/2-12,470-h+24,24,28);c.strokeRect(x+w/2-12,470-h+24,24,28);if(p.w){c.fillStyle='#bfe6ff';c.fillRect(x+30,300,70,170);c.strokeRect(x+30,300,70,170);c.fillStyle='#e8433a';c.beginPath();c.moveTo(x-8,200);c.lineTo(x+w+8,200);c.lineTo(x+w-12,160);c.lineTo(x+12,160);c.fill();c.stroke()}}
else if(p.type==='bike')bike(c,x,470,1.1,p.color||'#e8433a',t);
else if(p.type==='box'){c.fillStyle=p.color||'#c58b4a';c.fillRect(x,420,50,50);c.strokeRect(x,420,50,50);ln(c,[x,445,x+50,445])}
else if(p.type==='truck'){c.translate((1-ease(t/2.5))*420,0);c.fillStyle=p.color||'#3a7bd5';c.fillRect(150,380,150,70);c.strokeRect(150,380,150,70);c.fillRect(300,400,50,50);c.strokeRect(300,400,50,50);c.fillStyle='#333';[[190,455],[320,455]].forEach(q=>{c.beginPath();c.arc(q[0],q[1],20,0,7);c.fill();c.stroke()});c.fillStyle='#fff';[175,215,255].forEach(q=>{c.beginPath();c.arc(q,365+Math.sin(t*3+q)*2,14,0,7);c.fill();c.stroke()})}
else if(p.type==='sign'){const L=(p.text||'').split('|');c.fillStyle='#fff';c.beginPath();c.roundRect(40,90,280,70,8);c.fill();c.stroke();c.fillStyle=K;c.font='900 22px "Arial Black",Arial,sans-serif';c.textAlign='center';c.textBaseline='middle';L.forEach((s,i)=>c.fillText(s,180,L.length>1?113+i*26:125))}
else if(p.type==='star'){c.fillStyle='#ffd23a';c.translate(x,p.y||200);c.rotate(t);c.scale(1+Math.sin(t*4)*.15,1+Math.sin(t*4)*.15);c.beginPath();for(let i=0;i<10;i++){const r=i%2?7:16,a=i*Math.PI/5;c.lineTo(Math.sin(a)*r,-Math.cos(a)*r)}c.fill()}
else if(p.type==='bikeinfo'){bike(c,180,400,2.2,'#e8433a',t);c.font='900 18px Arial,sans-serif';c.textAlign='center';c.textBaseline='middle';
 (p.labels||[]).forEach((k,i)=>{if(t<i*1.2)return;const q=PART[k];if(!q)return;const px=180+q[1]*2.2,py=400+q[2]*2.2,side=i%2?1:-1,lx=side>0?285:75,ly=250+i*70;c.lineWidth=3;c.strokeStyle='#ffd23a';ln(c,[lx,ly,px,py]);c.fillStyle='#ffd23a';c.beginPath();c.arc(px,py,6,0,7);c.fill();c.fillStyle='#fff';c.strokeStyle=K;c.lineWidth=4;c.beginPath();c.roundRect(lx-50,ly-16,100,32,16);c.fill();c.stroke();c.fillStyle=K;c.fillText(q[0],lx,ly)})}
c.restore()}
function draw(c,s,t){const p=Math.min(1,t/s.dur),b=BG[s.bg]||BG.street;c.save();const z=s.cam==='zoom'?1+.12*p:1;c.translate(W/2+(s.cam==='pan'?-35*p:0),H/2);c.scale(z,z);c.translate(-W/2,-H/2);
c.fillStyle=b[0];c.fillRect(-80,-80,W+160,H+160);
if(s.bg==='night'){c.fillStyle='#fff';for(let i=0;i<14;i++)c.fillRect((i*83)%360,(i*47)%250,2,2);c.fillStyle='#f4f1c9';c.beginPath();c.arc(290,90,28,0,7);c.fill()}
else if(s.bg==='shop'){c.strokeStyle=K;c.lineWidth=4;c.fillStyle='#bfe6ff';c.fillRect(40,110,90,100);c.strokeRect(40,110,90,100);c.fillStyle='#d9b27c';c.fillRect(200,150,130,12);['#e8433a','#3a7bd5','#ffd23a','#7bd96a'].forEach((q,i)=>{c.fillStyle=q;c.fillRect(208+i*30,126,22,24)})}
else{c.fillStyle='#ffd23a';c.beginPath();c.arc(290,90,32,0,7);c.fill();c.strokeStyle=K;c.lineWidth=4;c.stroke()}
c.fillStyle=b[1];c.fillRect(-80,470,W+160,H);c.strokeStyle=K;c.lineWidth=4;ln(c,[-80,470,W+80,470]);
(s.props||[]).forEach(q=>prop(c,q,t));
(s.chars||[]).forEach(h=>{const dx=h.walk==='in'?-(1-ease(t/1.5))*260:0;person(c,h.x*W+dx,382,h,t)});c.restore();
c.font='900 28px "Arial Black",Arial,sans-serif';c.textBaseline='middle';c.textAlign='left';c.lineJoin='round';c.lineWidth=8;
const w=String(s.text||'').toUpperCase().split(' '),i=Math.min(w.length-1,Math.floor(t/(s.dur*.88)*w.length)),G=[];let cur=[];
w.forEach(x=>{if(cur.length&&c.measureText([...cur,x].join(' ')).width>300){G.push(cur);cur=[]}cur.push(x)});G.push(cur);
let n=0,gi=0;for(;gi<G.length-1;gi++){if(i<n+G[gi].length)break;n+=G[gi].length}const g=G[gi],sp=c.measureText(' ').width;
let x=(W-(g.reduce((a,q)=>a+c.measureText(q).width,0)+sp*(g.length-1)))/2;
g.forEach((q,j)=>{c.strokeStyle='#000';c.strokeText(q,x,540);c.fillStyle=n+j===i?'#ffd23a':'#fff';c.fillText(q,x,540);x+=c.measureText(q).width+sp})}
export{draw};
