/* מנוע סרטונים – רוני מודן · שחקים
   פרק = קובץ תסריט שמשתמש ב-V.* (רכיבים) ומגדיר V.run({chapters, beats, end}).
   מצבים: רגיל (כפתורים, למורה, השתקה) · ?rec=1 (הקלטה ל-MP4 עם פסקול) */
(function(){
const $=id=>document.getElementById(id), F=$('f');
const REC=/rec=1/.test(location.search), FRAMES=/frames=1/.test(location.search); if(REC)document.body.classList.add('rec');
const V=window.V={REC,$};
const on=V.on=(...a)=>a.forEach(i=>$(i)&&$(i).classList.add('on'));
const off=V.off=(...a)=>a.forEach(i=>$(i)&&$(i).classList.remove('on'));
V.L=s=>`<span dir="ltr">${s}</span>`;
function anim(el){el.classList.remove('in');void el.offsetWidth;el.classList.add('in')}
V.cap=h=>{const c=$('cap');c.innerHTML=h;anim(c)};
V.mth=h=>{const c=$('mth');c.innerHTML=h;anim(c)};
V.chip=t=>{$('chip').textContent=t};
V.splash=(b,s)=>{$('spB').innerHTML=b;$('spS').innerHTML=s||'';on('sp')};
V.ratio=(a,b)=>`<span dir="ltr"><b class="n">${a}</b>:<b class="i">${b}</b></span>`;

/* ---------- כוסות (חלקים) ---------- */
const CP=[[22,182],[38,182],[54,182],[30,165],[46,165]];
V.cups=function(groups){ // [{name,cls,color,tint,count}] – הקבוצה הראשונה בצד ימין
  const W=76,G=14,GG=30; let tot=-GG; groups.forEach(g=>tot+=g.count*W+(g.count-1)*G+GG);
  let x=(540+tot)/2, s='', cx=[], k=0; const gc=[];
  groups.forEach(g=>{const st=x; for(let j=0;j<g.count;j++){x-=W;
      s+=`<rect id="h${k}" class="hl o" x="${x-6}" y="70" width="88" height="140" rx="12"/>`;
      s+=`<g id="c${k}" class="cup o" style="transition-delay:${k*.12}s"><path d="M${x} 80 H${x+W} L${x+W-10} 200 H${x+10} Z" fill="${g.tint}" stroke="${g.color}" stroke-width="4" stroke-linejoin="round"/>`;
      CP.forEach(p=>{s+=`<circle class="cd o" data-c="${k}" cx="${x+p[0]}" cy="${p[1]}" r="8" fill="${g.color}" stroke="#fff" stroke-width="2"/>`});
      s+='</g>'; cx.push(x+W/2); k++; if(j<g.count-1)x-=G;}
    gc.push((st+x)/2); s+=`<text class="lbl o" id="lbl${gc.length-1}" x="${(st+x)/2}" y="60" text-anchor="middle" fill="${g.color}">${g.name}</text>`; x-=GG;});
  const L=cx[cx.length-1]-38, R=cx[0]+38, M=(L+R)/2;
  s+=`<path id="brace" class="o" d="M${L} 216 q0 14 14 14 H${M-14} q14 0 14 14 q0 -14 14 -14 H${R-14} q14 0 14 -14" fill="none" stroke="#ca8a04" stroke-width="4"/>`;
  $('stage').innerHTML=s; V.N=k; V.cx=cx; V.gc=gc; V.mid=M;
};
V.cupsOn=()=>{for(let k=0;k<V.N;k++)on('c'+k);V.gc.forEach((_,i)=>on('lbl'+i))};
V.fill=(list,counts)=>{let d=0;list.forEach((k,ii)=>{const n=counts?counts[ii]:5;
  document.querySelectorAll(`.cd[data-c="${k}"]`).forEach((e,j)=>{if(j<n){e.style.transitionDelay=(d+j*.12)+'s';e.classList.add('on')}});d+=.4});
  V.sfx('pop',0);V.sfx('pop',.4);if(list.length>2)V.sfx('pop',.8)};
V.empty=()=>document.querySelectorAll('.cd.on').forEach(e=>e.classList.remove('on'));
V.hl=list=>{for(let k=0;k<V.N;k++)$('h'+k).classList.toggle('on',list.includes(k))};
V.pulse=()=>{for(let k=0;k<V.N;k++){const c=$('c'+k);c.classList.remove('pulse');void c.offsetWidth;c.classList.add('pulse')}};
V.pairs=(prs)=>{let p='';prs.forEach(([a,b])=>{const xa=V.cx[a],xb=V.cx[b],dep=Math.abs(xa-xb)*.35;p+=`<path d="M${xa} 208 Q${(xa+xb)/2} ${208+dep} ${xb} 208"/>`});
  let g=$('pairs');if(!g){g=document.createElementNS('http://www.w3.org/2000/svg','g');g.id='pairs';g.setAttribute('class','o');g.setAttribute('fill','none');g.setAttribute('stroke','#64748b');g.setAttribute('stroke-width','3');g.setAttribute('stroke-dasharray','7 6');$('stage').appendChild(g)}g.innerHTML=p;on('pairs')};
V.badge=(id,t,x,y)=>{const b=$(id);b.innerHTML=t;b.style.right=(540-x)+'px';b.style.top=(180+y)+'px';on(id)};

/* ---------- טבלת העוגן ---------- */
V.table=function(cols,rows){ // cols:[{h,cls,hidden}] rows:['יחס (חלקים)','כמות']
  let s='<table><tr><th class="rl"></th>';cols.forEach((c,j)=>s+=`<th id="th${j}" class="${c.cls||''} ${c.hidden?'hc':''}">${c.h}</th>`);s+='<th class="facc"></th></tr>';
  rows.forEach((r,i)=>{s+=`<tr><td class="rl">${r}</td>`;cols.forEach((c,j)=>s+=`<td id="t${i}${j}" class="${c.cls||''} ${c.hidden?'hc':''}"></td>`);
    s+=i==0?`<td class="facc" rowspan="${rows.length}"><div id="facarr" class="facarr"><span class="val" id="facv"></span><div style="font-size:30px">↓</div><div style="font-size:13px;color:#dc2626">גורם<br>ההכפלה</div></div></td>`:'';s+='</tr>'});
  $('tbl').innerHTML=s+'</table>';V.cols=cols.length;V.rows=rows.length};
V.tset=(r,c,v,cls)=>{const td=$('t'+r+c);td.innerHTML=v===''?'':`<span class="val pop">${v}</span>`;if(cls)td.classList.add(cls)};
V.tcol=(c,show)=>{['th'+c].concat([...Array(V.rows).keys()].map(r=>'t'+r+c)).forEach(id=>{$(id).style.display=show?'table-cell':''})};
V.anchor=c=>{document.querySelectorAll('#tbl .anc').forEach(e=>e.classList.remove('anc'));if(c>=0)for(let r=0;r<V.rows;r++)$('t'+r+c).classList.add('anc')};
V.tclear=(row)=>{for(let r=0;r<V.rows;r++){if(row!==undefined&&r!==row)continue;for(let c=0;c<V.cols;c++){const td=$('t'+r+c);td.innerHTML='';td.classList.remove('giv','anc')}}};
V.fac=v=>{if(v){$('facv').innerHTML='<bdi dir="ltr">'+v+'</bdi>';on('facarr')}else off('facarr')};

/* ---------- שבר עם גורם הכפלה (קשתות) ---------- */
V.fracScale=function(a,b,k){const A=String(a),B=String(b),C=String(a*k),D=String(b*k),w=s=>s.length*31;
  const c1=70,c2=255,c3=440, nb=w(A)+47, db=w(B)+47, fxN=c2-nb/2+w(A)+24, fxD=c2-db/2+w(B)+24;
  const fr=(x,t,u,id,col1,col2)=>`<g id="${id}" class="o"><text x="${x}" y="110" fill="${col1}">${t}</text><line x1="${x-45}" y1="126" x2="${x+45}" y2="126" stroke="#1e293b" stroke-width="5"/><text x="${x}" y="182" fill="${col2}">${u}</text></g>`;
  $('frac').innerHTML=`<svg viewBox="0 0 500 290" width="500" height="290" font-weight="800" font-size="56" text-anchor="middle">
  ${fr(c1,A,B,'fA','#db2777','#2563eb')}<text id="e1" class="o" x="147" y="146">=</text>
  <g id="fB" class="o"><text x="${c2}" y="110"><tspan fill="#db2777">${A}</tspan><tspan fill="#dc2626">·${k}</tspan></text><line x1="${c2-55}" y1="126" x2="${c2+55}" y2="126" stroke="#1e293b" stroke-width="5"/><text x="${c2}" y="182"><tspan fill="#2563eb">${B}</tspan><tspan fill="#dc2626">·${k}</tspan></text></g>
  <g id="fbadge" class="o"><rect x="${c2-33}" y="0" width="66" height="40" rx="12" fill="#dc2626"/><text x="${c2}" y="32" font-size="30" fill="#fff">·${k}</text></g>
  <g id="farcs" class="o" fill="none" stroke="#dc2626" stroke-width="4"><path d="M${c2+14} 40 Q${fxN+8} 48 ${fxN} 66"/><path d="M${c2+33} 30 C${c2+76} 55 ${c2+76} 165 ${fxD+22} 165"/></g>
  <text id="e2" class="o" x="352" y="146">=</text>${fr(c3,C,D,'fC','#db2777','#2563eb')}
  <g id="one" class="o" transform="translate(40,52) scale(.8)"><text x="200" y="232" fill="#dc2626">${k}</text><line x1="175" y1="246" x2="225" y2="246" stroke="#dc2626" stroke-width="5"/><text x="200" y="290" fill="#dc2626">${k}</text><text x="262" y="262">=</text><text x="315" y="262" fill="#16a34a">1</text></g></svg>`};

/* ---------- פעולות: + − · : ---------- */
V.ops=()=>{$('ops').innerHTML=['+','−','·',':'].map((o,i)=>`<div class="op" id="op${i}">${o}</div>`).join('')};
V.opsMark=()=>{$('op0').classList.add('bad');$('op1').classList.add('bad')};
V.opsGood=()=>{$('op2').classList.add('good');$('op3').classList.add('good')};
V.opsReset=()=>{document.querySelectorAll('.op').forEach(e=>e.classList.remove('bad','good'))};

/* ---------- דלתות (מעקב) ---------- */
V.tracker=labels=>{$('trk').innerHTML=labels.map((l,i)=>`<div class="door" id="d${i+1}"><b>${l[0]}</b>${l[1]}</div>`).join('');V.ND=labels.length};
V.door=n=>{for(let k=1;k<=V.ND;k++){$('d'+k).classList.toggle('cur',k==n);$('d'+k).classList.toggle('done',k<n||n>V.ND)}};

/* ---------- שעון עצר ---------- */
V.clock=n=>{const c=$('clk');c.style.display=n===''?'none':'';c.textContent=n;if(n>0)V.sfx('tick')};

/* ---------- צלילים ומוזיקה (מולחן בקוד – בלי זכויות יוצרים) ---------- */
let AC=null,MG=null,SG=null,muted=false,musicUntil=0;
function synth(ctx,dest,name,t){const o=(type,f,a,d,g=.3,f2)=>{const os=ctx.createOscillator(),gn=ctx.createGain();os.type=type;os.frequency.setValueAtTime(f,t+a);if(f2)os.frequency.exponentialRampToValueAtTime(f2,t+a+d);gn.gain.setValueAtTime(0,t+a);gn.gain.linearRampToValueAtTime(g,t+a+.01);gn.gain.exponentialRampToValueAtTime(.001,t+a+d);os.connect(gn);gn.connect(dest);os.start(t+a);os.stop(t+a+d+.05)};
 const noise=(a,d,g,fq)=>{const len=Math.floor(ctx.sampleRate*d),bf=ctx.createBuffer(1,len,ctx.sampleRate),ch=bf.getChannelData(0);for(let i=0;i<len;i++)ch[i]=Math.random()*2-1;const s=ctx.createBufferSource();s.buffer=bf;const fl=ctx.createBiquadFilter();fl.type='bandpass';fl.frequency.setValueAtTime(fq,t+a);fl.frequency.exponentialRampToValueAtTime(fq*4,t+a+d);const gn=ctx.createGain();gn.gain.setValueAtTime(g,t+a);gn.gain.exponentialRampToValueAtTime(.001,t+a+d);s.connect(fl);fl.connect(gn);gn.connect(dest);s.start(t+a)};
 if(name==='pop')o('sine',520,0,.12,.35,980);
 if(name==='wrong'){o('square',220,0,.18,.12);o('square',165,.17,.3,.12)}
 if(name==='right'){o('triangle',523,0,.15,.3);o('triangle',659,.09,.15,.3);o('triangle',784,.18,.35,.3)}
 if(name==='whoosh')noise(0,.45,.35,300);
 if(name==='tick')o('square',1400,0,.04,.08);
 if(name==='ding'){o('sine',1047,0,.9,.3);o('sine',1568,0,.6,.12)}
 if(name==='go'){o('triangle',392,0,.12,.25);o('triangle',523,.1,.12,.25);o('triangle',659,.2,.12,.25);o('triangle',1047,.3,.5,.3)}}
// מוזיקת רקע: 96 BPM, C–G–Am–F, ארפג׳ רך + בס + היי-האט
const BPM=96,BEAT=60/BPM,CH=[[48,55,60,64],[43,50,59,62],[45,52,57,60],[41,48,57,60]];
const hz=m=>440*Math.pow(2,(m-69)/12);
function musicNotes(t0,t1){const out=[];let b=Math.floor(t0/(BEAT/2));for(;b*(BEAT/2)<t1;b++){const t=b*BEAT/2;if(t<t0)continue;const bar=Math.floor(b/8)%4,ch=CH[bar],e=b%8;
  out.push({t,k:'arp',f:hz(ch[[1,2,3,2,1,3,2,3][e]]+12)});if(e%4==0)out.push({t,k:'bass',f:hz(ch[0]-12)});if(e%2==1)out.push({t,k:'hat'});if(e%4==0)out.push({t,k:'kick'})}return out}
function playNote(ctx,dest,n,at){const o=(type,f,d,g)=>{const os=ctx.createOscillator(),gn=ctx.createGain();os.type=type;os.frequency.value=f;gn.gain.setValueAtTime(0,at);gn.gain.linearRampToValueAtTime(g,at+.01);gn.gain.exponentialRampToValueAtTime(.001,at+d);os.connect(gn);gn.connect(dest);os.start(at);os.stop(at+d+.05)};
 if(n.k==='arp')o('triangle',n.f,.28,.16);if(n.k==='bass')o('sine',n.f,.55,.3);
 if(n.k==='kick'){const os=ctx.createOscillator(),gn=ctx.createGain();os.frequency.setValueAtTime(140,at);os.frequency.exponentialRampToValueAtTime(45,at+.15);gn.gain.setValueAtTime(.35,at);gn.gain.exponentialRampToValueAtTime(.001,at+.18);os.connect(gn);gn.connect(dest);os.start(at);os.stop(at+.2)}
 if(n.k==='hat'){const len=Math.floor(ctx.sampleRate*.04),bf=ctx.createBuffer(1,len,ctx.sampleRate),c=bf.getChannelData(0);for(let i=0;i<len;i++)c[i]=(Math.random()*2-1)*(1-i/len);const s=ctx.createBufferSource();s.buffer=bf;const hp=ctx.createBiquadFilter();hp.type='highpass';hp.frequency.value=7000;const gn=ctx.createGain();gn.gain.value=.12;s.connect(hp);hp.connect(gn);gn.connect(dest);s.start(at)}}
function audioInit(){if(AC||REC)return;try{AC=new (window.AudioContext||window.webkitAudioContext)();MG=AC.createGain();MG.gain.value=.22;MG.connect(AC.destination);SG=AC.createGain();SG.gain.value=.9;SG.connect(AC.destination)}catch(e){AC=null}}
const LOG=[];let wall0=0;
V.sfx=(name,delay=0)=>{if(REC){LOG.push({t:(FRAMES?T:performance.now()/1000)+delay,name});return}
  if(!AC||muted||!playing||F.classList.contains('noanim'))return;synth(AC,SG,name,AC.currentTime+delay)};
function musicPump(){if(!AC||muted||!playing)return;const ahead=T+.6;if(musicUntil<T)musicUntil=T;
  musicNotes(musicUntil,ahead).forEach(n=>playNote(AC,MG,n,AC.currentTime+(n.t-T)));musicUntil=ahead}
V.toggleMute=()=>{muted=!muted;$('mute').textContent=muted?'🔇':'🔊';musicUntil=T};
// עיבוד פסקול להקלטה (WAV) – אותם צלילים בדיוק
V.renderAudio=async(dur)=>{const sr=22050,ctx=new OfflineAudioContext(1,Math.ceil(sr*dur),sr);const mg=ctx.createGain();mg.gain.value=.22;mg.connect(ctx.destination);const sg=ctx.createGain();sg.gain.value=.9;sg.connect(ctx.destination);
  const m0=FRAMES?0:wall0/1000;musicNotes(0,dur-m0-1.5).forEach(n=>playNote(ctx,mg,n,n.t+m0));LOG.forEach(e=>synth(ctx,sg,e.name,Math.max(0,e.t)));
  const buf=await ctx.startRendering(),d=buf.getChannelData(0),N=d.length,ab=new ArrayBuffer(44+N*2),v=new DataView(ab);
  const ws=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))};ws(0,'RIFF');v.setUint32(4,36+N*2,true);ws(8,'WAVEfmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,1,true);v.setUint32(24,sr,true);v.setUint32(28,sr*2,true);v.setUint16(32,2,true);v.setUint16(34,16,true);ws(36,'data');v.setUint32(40,N*2,true);
  for(let i=0;i<N;i++)v.setInt16(44+i*2,Math.max(-1,Math.min(1,d[i]))*32767,true);
  let bin='';const u=new Uint8Array(ab);for(let i=0;i<u.length;i+=32768)bin+=String.fromCharCode.apply(null,u.subarray(i,i+32768));return btoa(bin)};

/* ---------- נגן ---------- */
let EP,T=0,playing=false,last=0,next=0;
function chAt(t){let c=0;EP.chapters.forEach((x,i)=>{if(x.t<=t)c=i});return c}
function resetAll(){document.querySelectorAll('.o.on').forEach(e=>{if(e.id!=='chip')e.classList.remove('on')});
  $('stage').classList.remove('dim');$('cap').innerHTML='';$('mth').innerHTML='';if(V.ND)V.door(0);if(EP.reset)EP.reset()}
function enter(ci){resetAll();V.chip(EP.chapters[ci].name);EP.chapters[ci].setup()}
V.seekT=t=>{F.classList.add('noanim');const ci=chAt(t);enter(ci);const c=EP.chapters[ci];
  next=0;while(next<EP.beats.length&&EP.beats[next][0]<c.t)next++;
  while(next<EP.beats.length&&EP.beats[next][0]<=t){EP.beats[next][1]();next++}
  T=t;musicUntil=t;void F.offsetWidth;requestAnimationFrame(()=>F.classList.remove('noanim'));upd()};
function upd(){$('prog').style.width=Math.min(100,T/EP.end*100)+'%';$('pp').textContent=playing?'⏸':'▶'}
function tick(ts){if(playing&&!FRAMES){T+=REC?(ts-last)/1000:Math.min(.1,(ts-last)/1000);
   while(next<EP.beats.length&&EP.beats[next][0]<=T){const bt=EP.beats[next][0],ci=chAt(bt);if(EP.chapters[ci].t===bt&&bt>0)enter(ci);EP.beats[next][1]();next++}
   musicPump();if(T>=EP.end){T=EP.end;playing=false;window.DONE=true}upd()}
  last=ts;requestAnimationFrame(tick)}
V.play=()=>{audioInit();if(AC&&AC.state==='suspended')AC.resume();playing=true;musicUntil=T;upd()};
V.toggle=()=>playing?(playing=false,upd()):V.play();
V.go=d=>{const c=Math.max(0,Math.min(EP.chapters.length-1,chAt(T)+d));V.seekT(EP.chapters[c].t);V.play()};
V.start=()=>{$('cover').style.display='none';V.seekT(0);V.play()};
V.teacher=s=>{$('teacher').classList.toggle('show',s);if(s)playing=false;upd()};
V.fs=()=>{const e=document.documentElement;document.fullscreenElement?document.exitFullscreen():(e.requestFullscreen||e.webkitRequestFullscreen||(()=>{})).call(e)};
V.run=ep=>{EP=ep;function fit(){F.style.transform=`scale(${Math.min(innerWidth/540,innerHeight/960)})`}addEventListener('resize',fit);fit();
  document.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();V.toggle()}if(e.key==='ArrowLeft')V.go(1);if(e.key==='ArrowRight')V.go(-1)});
  requestAnimationFrame(t=>{last=t;tick(t)});
  if(REC){$('cover').style.display='none';wall0=performance.now();V.seekT(0);playing=true}};
Object.defineProperty(V,'T',{get:()=>T});
/* הקלטה מדויקת פריים-אחר-פריים: זמן וירטואלי לכל האנימציות */
V.step=dt=>{T+=dt;while(next<EP.beats.length&&EP.beats[next][0]<=T){const bt=EP.beats[next][0],ci=chAt(bt);if(EP.chapters[ci].t===bt&&bt>0)enter(ci);EP.beats[next][1]();next++}
  document.getAnimations().forEach(a=>{if(a._b===undefined){a._b=T;a.pause()}a.currentTime=(T-a._b)*1000});upd();return T>=EP.end};
})();
/* תוספות וואו */
V.doorOpen=(label,big,sm)=>{const w=V.$('dw');w.classList.remove('on');V.$('dwP').textContent=label;V.$('dwB').innerHTML=big;V.$('dwS').innerHTML=sm||'';void w.offsetWidth;w.classList.add('on');V.sfx('whoosh',.5)};
V.wobble=list=>list.forEach(k=>{const c=V.$('c'+k);c.classList.remove('wob');void c.getBBox;setTimeout(()=>c.classList.add('wob'),10)});
