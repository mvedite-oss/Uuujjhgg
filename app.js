import{draw}from'./engine.js';import{STORIES}from'./stories.js';
const $=id=>document.getElementById(id),esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const PROV={groq:{n:'Groq',url:'https://api.groq.com/openai/v1',m:'llama-3.3-70b-versatile'},openrouter:{n:'OpenRouter',url:'https://openrouter.ai/api/v1',m:'meta-llama/llama-3.3-70b-instruct:free'},aihubmix:{n:'AiHubMix',url:'https://aihubmix.com/v1',m:'gpt-4o-mini'},ollama:{n:'Ollama',url:'https://ollama.com',m:'gpt-oss:120b',nat:1},kiro:{n:'Kiro / outro (URL própria)',url:'',m:''}};
const S=Object.assign({prov:'groq',k:{}},JSON.parse(localStorage.getItem('mvs')||'{}'));
let mine=JSON.parse(localStorage.getItem('mymv')||'{}'),H=[],busy=false,stopFn=()=>{};
const save=()=>localStorage.setItem('mvs',JSON.stringify(S));
const opts=Object.entries(PROV).map(([k,v])=>`<option value="${k}">${v.n}</option>`).join('');
$('prov').innerHTML=$('cp').innerHTML=opts;$('prov').value=S.prov;
const SYS='Você é um roteirista de animações 2D curtas. Responda SOMENTE com um JSON válido, sem texto antes ou depois, no formato: {"name":"Título","scenes":[{"text":"narração curta em português","bg":"street|shop|park|night","chars":[{"x":0.5,"color":"#d9455f","hair":"#8b4a2b","walk":"in","wave":1,"talk":1,"mustache":1}],"props":[{"type":"house","x":60,"color":"#ff9aa2"},{"type":"bike","x":290,"color":"#e8433a"},{"type":"box","x":60,"color":"#c58b4a"},{"type":"truck","color":"#3a7bd5"},{"type":"sign","text":"LINHA 1|LINHA 2"},{"type":"star","x":60,"y":200},{"type":"bikeinfo","labels":["pedal","corrente","roda","guidao","freio"]}],"cam":"zoom|pan|null","dur":5}]}. Use de 4 a 7 cenas, até 40 segundos no total. x dos personagens vai de 0 a 1. Use só esses tipos de objetos e cenários. Se o usuário pedir uma mudança, devolva o JSON completo atualizado.';
async function ask(msgs){const id=S.prov,p=PROV[id],c=S.k[id]||{},key=c.key,url=(c.url||p.url).replace(/\/$/,''),model=c.model||p.m;
if(!key&&!(p.nat&&/localhost/.test(url)))throw Error('Cole a chave de '+p.n+' em ⚙ Configurações da IA.');
if(!url||!model)throw Error('Informe a URL e o modelo de '+p.n+' em ⚙ Configurações da IA.');
const r=await fetch(url+(p.nat?'/api/chat':'/chat/completions'),{method:'POST',headers:{'Content-Type':'application/json',...(key?{Authorization:'Bearer '+key}:{})},body:JSON.stringify(p.nat?{model,messages:msgs,stream:false}:{model,messages:msgs,temperature:.7})}).catch(()=>{throw Error('Não consegui conectar a '+p.n+' (internet ou bloqueio do navegador).')});
if(!r.ok)throw Error(p.n+' respondeu '+r.status+': '+(await r.text()).slice(0,160));
const j=await r.json();return(p.nat?j.message?.content:j.choices?.[0]?.message?.content)||''}
function entry(kind,html){const d=document.createElement('div');d.className='entry '+kind;d.innerHTML=html;$('output').append(d);$('content').scrollTop=1e9;return d}
function player(cv,story,st){const c=cv.getContext('2d');let raf,ac,mus,rr,run=false;const Sc=story.scenes;
function stop(){run=false;cancelAnimationFrame(raf);clearInterval(mus);speechSynthesis.cancel();try{ac&&ac.close()}catch{}}
function play(rec){stopFn();stopFn=stop;const tot=Sc.reduce((a,s)=>a+s.dur,0);run=true;ac=new AudioContext();const dest=ac.createMediaStreamDestination(),n=[261.6,329.6,392,523.3,392,329.6,440,349.2];let k=0;
mus=setInterval(()=>{const o=ac.createOscillator(),g=ac.createGain();o.type='triangle';o.frequency.value=n[k++%8];g.gain.setValueAtTime(.05,ac.currentTime);g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+.22);o.connect(g);g.connect(ac.destination);g.connect(dest);o.start();o.stop(ac.currentTime+.24)},240);
if(rec){const ch=[];rr=new MediaRecorder(new MediaStream([...cv.captureStream(30).getTracks(),...dest.stream.getTracks()]));rr.ondataavailable=e=>ch.push(e.data);rr.onstop=()=>{const a=document.createElement('a');a.href=URL.createObjectURL(new Blob(ch,{type:'video/webm'}));a.download='animacao.webm';a.click();st.textContent='Vídeo exportado. A narração toca ao vivo, mas não fica gravada no arquivo.'};rr.start();st.textContent='Gravando…'}
const t0=performance.now();let last=-1;
const f=()=>{if(!run)return;const e=(performance.now()-t0)/1000;if(e>=tot){stop();if(rr&&rr.state!=='inactive')rr.stop();rr=null;return}
let a=0,i=0;while(i<Sc.length-1&&e>=a+Sc[i].dur){a+=Sc[i].dur;i++}
if(i!==last){last=i;try{const u=new SpeechSynthesisUtterance(Sc[i].text);u.lang='pt-BR';u.pitch=1.2;speechSynthesis.speak(u)}catch{}}
draw(c,Sc[i],e-a);raf=requestAnimationFrame(f)};f()}
return play}
function show(story){const d=entry('assistant',`<div class="ai-label">● ${esc(story.name)} · ${story.scenes.length} cenas</div><canvas class="cv" width="360" height="640"></canvas><div class="acts"><button class="big pl">▶ Assistir</button><button class="big">⏺ Exportar vídeo</button></div><div class="st"></div>`);
const cv=d.querySelector('canvas'),st=d.querySelector('.st'),pl=player(cv,story,st),b=d.querySelectorAll('button');draw(cv.getContext('2d'),story.scenes[0],0);
b[0].onclick=()=>pl(false);b[1].onclick=()=>window.MediaRecorder?pl(true):st.textContent='Este navegador não exporta vídeo.'}
function valid(j){if(!j||!Array.isArray(j.scenes)||!j.scenes.length)throw 0;j.name=j.name||'Minha história';j.scenes.forEach(s=>{s.dur=Math.min(12,Math.max(1,+s.dur||4));s.text=String(s.text||'')});return j}
async function send(text){text=(text||$('prompt').value).trim();if(!text||busy)return;$('welcome').style.display=$('quick').style.display='none';$('prompt').value='';
entry('user',`<span class="prompt-symbol">❯</span><span>${esc(text)}</span>`);busy=true;$('state').innerHTML='<span class="status-dot" style="background:#e58b62"></span>gerando…';
H.push({role:'user',content:text});
try{const raw=await ask([{role:'system',content:SYS},...H.slice(-6)]);const m=raw.match(/\{[\s\S]*\}/);let j;try{j=valid(JSON.parse(m[0]))}catch{throw Error('A IA não devolveu uma história válida. Tente de novo ou use outro modelo. Resposta: '+raw.slice(0,120))}
H.push({role:'assistant',content:JSON.stringify(j)});const k='h'+Date.now();mine[k]=j;localStorage.setItem('mymv',JSON.stringify(mine));lists();show(j)}
catch(e){H.pop();entry('assistant',`<div class="ai-label" style="color:#e58b62">● ERRO</div>${esc(e.message)}`)}
busy=false;$('state').innerHTML='<span class="status-dot"></span>pronto'}
function lists(){const mk=(box,o)=>{$(box).innerHTML='';Object.values(o).forEach(s=>{const b=document.createElement('div');b.className='side-item';b.textContent='▶ '+s.name;b.onclick=()=>{$('welcome').style.display=$('quick').style.display='none';document.body.classList.remove('menu-open');show(s)};$(box).append(b)})};mk('ready',STORIES);mk('mine',mine)}
$('sendBtn').onclick=()=>send();$('prompt').onkeydown=e=>{if(e.key==='Enter'&&!e.shiftKey&&matchMedia('(min-width:700px)').matches){e.preventDefault();send()}};
document.querySelectorAll('.quick button').forEach(b=>b.onclick=()=>{$('prompt').value=b.dataset.prompt;$('prompt').focus()});
const reset=()=>{stopFn();$('output').innerHTML='';H=[];$('welcome').style.display='block';$('quick').style.display='grid'};
$('newChat').onclick=()=>{reset();document.body.classList.remove('menu-open')};$('clearBtn').onclick=reset;
$('menuBtn').onclick=()=>document.body.classList.toggle('menu-open');$('scrim').onclick=()=>document.body.classList.remove('menu-open');
$('prov').onchange=()=>{S.prov=$('prov').value;save()};
const fill=()=>{const c=S.k[$('cp').value]||{},p=PROV[$('cp').value];$('ck').value=c.key||'';$('cu').value=c.url||'';$('cu').placeholder=p.url||'https://…/v1';$('cm').value=c.model||'';$('cm').placeholder=p.m||'nome do modelo'};
$('cfgBtn').onclick=()=>{$('cp').value=S.prov;fill();$('cfg').showModal();document.body.classList.remove('menu-open')};$('cp').onchange=fill;$('cclose').onclick=()=>$('cfg').close();
$('csave').onclick=()=>{S.prov=$('cp').value;S.k[S.prov]={key:$('ck').value.trim(),url:$('cu').value.trim(),model:$('cm').value.trim()};$('prov').value=S.prov;save();$('cfg').close()};
lists();
