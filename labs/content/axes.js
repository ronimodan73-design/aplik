/*META {"id":"axes","title":"מעבדת הציר ומערכת הצירים","icon":"📍"} */
const LAB={hide:true,tip:'🖐 לחצו על הלוח כדי להוסיף נקודה (עד 4), וגררו נקודה כדי להזיז אותה. בחרו בצד: ציר מספרים, רביע ראשון, 2 רביעים או 4 רביעים.',refresh:()=>draw()};
const CFG={line:{xmin:-10,xmax:10,ymin:0,ymax:0,U:34,OX:380,OY:250},
 q1:{xmin:0,xmax:12,ymin:0,ymax:8,U:50,OX:90,OY:460},
 q2:{xmin:-8,xmax:8,ymin:0,ymax:8,U:42,OX:380,OY:450},
 q4:{xmin:-8,xmax:8,ymin:-5,ymax:5,U:42,OX:380,OY:265}};
const MODES=[['line','➖ ציר מספרים'],['q1','⌞ רביע ראשון'],['q2','⊥ 2 רביעים'],['q4','✚ 4 רביעים']];
const DEF={line:[[-3,0],[2,0]],q1:[[2,3],[7,3]],q2:[[-3,2],[4,2]],q4:[[-3,2],[4,2],[-3,-3]]};
const NM='ABCD',PIDS=['pA','pB','pC','pD'];
let mode='q1',nums=true,pts=[],last=0,chal=null;
const g=()=>CFG[mode],X=x=>g().OX+x*g().U,Y=y=>g().OY-y*g().U,LINE=()=>mode==='line';
const f=n=>n<0?'−'+(-n):''+n;
const showV=()=>!(ST.hide&&!ST.revealed);
function setDef(){pts=DEF[mode].map(([x,y],i)=>({n:NM[i],x,y}));last=0;}
function quad(x,y){if(!x&&!y)return 'בראשית הצירים';if(!x)return 'על ציר y';if(!y)return 'על ציר x';return 'ברביע ה'+(x>0?(y>0?'ראשון':'רביעי'):(y>0?'שני':'שלישי'));}
function pairs(){const o=[];for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j];if(LINE()){if(i===0&&j===1)o.push([a,b,Math.abs(a.x-b.x),'h']);}else if(a.y===b.y)o.push([a,b,Math.abs(a.x-b.x),'h']);else if(a.x===b.x)o.push([a,b,Math.abs(a.y-b.y),'v']);}return o;}
function draw(){const c=g();let s='<defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="#1f2937"/></marker></defs>';
 if(!LINE()){for(let x=c.xmin;x<=c.xmax;x++)s+=`<line x1="${X(x)}" y1="${Y(c.ymin)}" x2="${X(x)}" y2="${Y(c.ymax)}" stroke="${COL.grid}" stroke-width="1.5"/>`;
  for(let y=c.ymin;y<=c.ymax;y++)s+=`<line x1="${X(c.xmin)}" y1="${Y(y)}" x2="${X(c.xmax)}" y2="${Y(y)}" stroke="${COL.grid}" stroke-width="1.5"/>`;}
 s+=`<line x1="${X(c.xmin)-(c.xmin<0?18:0)}" y1="${Y(0)}" x2="${X(c.xmax)+26}" y2="${Y(0)}" stroke="${COL.ink}" stroke-width="3" marker-end="url(#ar)"${c.xmin<0?' marker-start="url(#ar)"':''}/>`;
 if(!LINE()){s+=`<line x1="${X(0)}" y1="${Y(c.ymin)+(c.ymin<0?18:0)}" x2="${X(0)}" y2="${Y(c.ymax)-26}" stroke="${COL.ink}" stroke-width="3" marker-end="url(#ar)"${c.ymin<0?' marker-start="url(#ar)"':''}/>`;
  s+=`<text x="${X(c.xmax)+30}" y="${Y(0)+30}" font-size="22" font-weight="800" fill="${COL.green}">x</text><text x="${X(0)+18}" y="${Y(c.ymax)-22}" font-size="22" font-weight="800" fill="${COL.purple}">y</text>`;}
 for(let x=c.xmin;x<=c.xmax;x++){s+=`<line x1="${X(x)}" y1="${Y(0)-7}" x2="${X(x)}" y2="${Y(0)+7}" stroke="${COL.ink}" stroke-width="2"/>`;
  if(nums&&(LINE()||x!==0))s+=`<text x="${X(x)}" y="${Y(0)+(LINE()?34:26)}" text-anchor="middle" font-size="${LINE()?20:17}" font-weight="${x?600:800}" fill="${LINE()?COL.ink:COL.green}">${f(x)}</text>`;}
 if(!LINE())for(let y=c.ymin;y<=c.ymax;y++){s+=`<line x1="${X(0)-7}" y1="${Y(y)}" x2="${X(0)+7}" y2="${Y(y)}" stroke="${COL.ink}" stroke-width="2"/>`;
  if(nums&&y)s+=`<text x="${X(0)-12}" y="${Y(y)+6}" text-anchor="end" font-size="17" font-weight="600" fill="${COL.purple}">${f(y)}</text>`;}
 if(nums&&!LINE())s+=`<text x="${X(0)-10}" y="${Y(0)+24}" text-anchor="end" font-size="17" font-weight="800">0</text>`;
 if(!LINE())pts.forEach(p=>{if(p.y)s+=`<line x1="${X(p.x)}" y1="${Y(p.y)}" x2="${X(p.x)}" y2="${Y(0)}" stroke="${COL.green}" stroke-width="2.5" stroke-dasharray="6 5"/>`;if(p.x)s+=`<line x1="${X(p.x)}" y1="${Y(p.y)}" x2="${X(0)}" y2="${Y(p.y)}" stroke="${COL.purple}" stroke-width="2.5" stroke-dasharray="6 5"/>`;});
 pairs().forEach(([a,b,d,o])=>{if(!d)return;if(LINE()){const y=Y(0)+62,x1=X(Math.min(a.x,b.x)),x2=X(Math.max(a.x,b.x));
   s+=`<path d="M${x1},${y-10}V${y}H${x2}V${y-10}" fill="none" stroke="${COL.orange}" stroke-width="4"/><text x="${(x1+x2)/2}" y="${y+28}" text-anchor="middle" font-size="22" font-weight="800" fill="${COL.orange}">${showV()?d:'?'}</text>`;}
  else{s+=`<line x1="${X(a.x)}" y1="${Y(a.y)}" x2="${X(b.x)}" y2="${Y(b.y)}" stroke="${COL.orange}" stroke-width="6" stroke-linecap="round" opacity=".85"/>`;
   const mx=(X(a.x)+X(b.x))/2,my=(Y(a.y)+Y(b.y))/2;s+=`<text x="${o==='h'?mx:mx+14}" y="${o==='h'?my+30:my+7}" text-anchor="${o==='h'?'middle':'start'}" font-size="21" font-weight="800" fill="${COL.orange}">${showV()?d:'?'}</text>`;}});
 s+='<g id="ani"></g>';
 pts.forEach((p,i)=>{const v=showV();
  if(LINE())s+=`<text x="${X(p.x)}" y="${Y(0)-76}" text-anchor="middle" font-size="22" font-weight="800" fill="${COL.red}">${p.n}${v?' = '+f(p.x):''}</text>`;
  else s+=`<text x="${X(p.x)+13}" y="${Y(p.y)-14}" font-size="21" font-weight="800" fill="${COL.red}" paint-order="stroke" stroke="#fff" stroke-width="5">${p.n}(<tspan fill="${COL.green}">${v?f(p.x):'?'}</tspan>, <tspan fill="${COL.purple}">${v?f(p.y):'?'}</tspan>)</text>`;
  s+=`<circle id="p${p.n}" cx="${X(p.x)}" cy="${Y(p.y)}" r="13" fill="${COL.red}" stroke="#fff" stroke-width="3" style="cursor:grab"/>`;});
 $('#sv').innerHTML=s;out();}
function out(){const H=hidCls();
 card('mode','<div class="tip" style="margin:0 0 6px">בחרו לוח:</div><div style="display:flex;flex-wrap:wrap;gap:6px">'+MODES.map(([k,t])=>`<button class="lt noprint${k===mode?' on':''}" data-m="${k}">${t}</button>`).join('')+'</div>');
 $$('[data-m]').forEach(b=>b.onclick=()=>{if(ST.busy)return;mode=b.dataset.m;chal=null;const ch=$('#chal');if(ch)ch.remove();setDef();ST.revealed=false;draw();});
 let t='';
 if(LINE()){pts.forEach(p=>t+=`<div class="big"><span class="red">${p.n}</span>: <span class="${H}">${M(f(p.x))}</span></div><div class="tip">מרחק מ־0 (ערך מוחלט): <span class="${H}">${M(`<span class="blue">|${f(p.x)}| = ${Math.abs(p.x)}</span>`)}</span></div>`);
  const pr=pairs()[0];if(pr)t+=`<div class="big" style="margin-top:6px"><span class="orange">מרחק בין A ל־B</span>: <span class="${H}">${M(pr[2])} יחידות</span></div>`;
  if(pts.length>1&&pts[0].x===-pts[1].x&&pts[0].x)t+='<div class="okbox">⭐ A ו־B <b>מספרים נגדיים</b>: אותו מרחק מ־0, בצדדים שונים.</div>';}
 else{t+=`<div class="tip" style="margin-top:0">קודם ${C('x','green')} (ימינה/שמאלה), אחר כך ${C('y','purple')} (למעלה/למטה).</div>`;
  pts.forEach(p=>t+=`<div class="big"><span class="red">${p.n}</span>: <span class="${H}">${M(`(${C(f(p.x),'green')}, ${C(f(p.y),'purple')})`)}</span></div><div class="tip ${H}">${quad(p.x,p.y)}</div>`);
  pairs().forEach(([a,b,d,o])=>{if(d)t+=`<div class="big" style="margin-top:6px"><span class="orange">אורך ${a.n}${b.n}</span>: <span class="${H}">${M(d)} יחידות</span></div><div class="tip">ל־${a.n} ול־${b.n} אותו ${o==='h'?C('y','purple'):C('x','green')}, ולכן הקטע ${o==='h'?'מקביל לציר x':'מקביל לציר y'}.</div>`;});}
 if(!pts.length)t='<div class="tip">לחצו על הלוח כדי לשים נקודה.</div>';
 if(H)t+=`<button class="noprint" id="bReveal" style="margin-top:8px">👀 גלו את התשובה</button>`;
 card('out',t);if($('#bReveal'))$('#bReveal').onclick=()=>{ST.revealed=true;draw();};
 if(chal)checkChal();}
function walk(){const p=pts[last]||pts[0];if(!p)return;ST.revealed=true;draw();const a=$('#ani');
 if(LINE()){const n=Math.abs(p.x),sx=Math.sign(p.x);if(!n)return;
  seq(n,Math.max(2400,n*380),i=>{const x1=X(i*sx),x2=X((i+1)*sx);a.insertAdjacentHTML('beforeend',`<path d="M${x1},${Y(0)} Q${(x1+x2)/2},${Y(0)-58} ${x2},${Y(0)}" fill="none" stroke="${COL.blue}" stroke-width="3.5"/><text x="${(x1+x2)/2}" y="${Y(0)-34}" text-anchor="middle" font-size="17" font-weight="800" fill="${COL.blue}">${i+1}</text>`);
   card('walk',`<div class="big blue">קפיצות מ־0 אל ${p.n}: ${i+1} מתוך ${n}</div>`);},()=>card('walk',`<div class="big"><span class="blue">${n} קפיצות</span> ⟵ ${M(`<span class="blue">|${f(p.x)}| = ${n}</span>`)}</div><div class="tip">ערך מוחלט = כמה קפיצות מ־0, בלי לשים לב לכיוון.</div>`));return;}
 const nx=Math.abs(p.x),ny=Math.abs(p.y),sx=Math.sign(p.x),sy=Math.sign(p.y),n=nx+ny;if(!n)return;
 seq(n,Math.max(2600,n*360),i=>{if(i<nx){a.insertAdjacentHTML('beforeend',`<line x1="${X(i*sx)}" y1="${Y(0)}" x2="${X((i+1)*sx)}" y2="${Y(0)}" stroke="${COL.green}" stroke-width="9" stroke-linecap="round"/>`);card('walk',`<div class="big green">${sx>0?'ימינה':'שמאלה'}: ${i+1}</div>`);}
  else{const k=i-nx;a.insertAdjacentHTML('beforeend',`<line x1="${X(p.x)}" y1="${Y(k*sy)}" x2="${X(p.x)}" y2="${Y((k+1)*sy)}" stroke="${COL.purple}" stroke-width="9" stroke-linecap="round"/>`);card('walk',`<div class="big"><span class="green">${sx>0?'ימינה':sx<0?'שמאלה':''} ${nx||''}</span> <span class="purple">${sy>0?'למעלה':'למטה'}: ${k+1}</span></div>`);}},
  ()=>card('walk',`<div class="big">${p.n}${M(`(${C(f(p.x),'green')}, ${C(f(p.y),'purple')})`)}</div><div class="tip">${nx?C((sx>0?'ימינה ':'שמאלה ')+nx,'green'):'לא זזים בציר x'}, ואז ${ny?C((sy>0?'למעלה ':'למטה ')+ny,'purple'):'לא זזים בציר y'}.</div>`));}
function measure(){const pr=pairs().find(q=>q[2]);if(!pr){card('walk','<div class="badbox">כדי למדוד, שימו שתי נקודות באותה שורה או באותה עמודה.</div>');return;}
 const [a,b,d,o]=pr;ST.revealed=true;draw();const an=$('#ani'),s1=Math.sign(o==='h'?b.x-a.x:b.y-a.y);
 seq(d,Math.max(2200,d*380),i=>{let x1,y1,x2,y2;if(o==='h'){x1=X(a.x+i*s1);x2=X(a.x+(i+1)*s1);y1=y2=Y(a.y);}else{x1=x2=X(a.x);y1=Y(a.y+i*s1);y2=Y(a.y+(i+1)*s1);}
  an.insertAdjacentHTML('beforeend',`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${COL.orange}" stroke-width="12" stroke-linecap="round" opacity=".55"/><text x="${(x1+x2)/2+(o==='v'?-20:0)}" y="${(y1+y2)/2+(o==='h'?-14:6)}" text-anchor="middle" font-size="17" font-weight="800" fill="${COL.orange}">${i+1}</text>`);
  card('walk',`<div class="big orange">סופרים יחידות: ${i+1} מתוך ${d}</div>`);},()=>card('walk',`<div class="big"><span class="orange">אורך ${a.n}${b.n}</span>: ${M(d)} יחידות</div>`));}
function addAt(x,y){const c=g();x=Math.max(c.xmin,Math.min(c.xmax,x));y=LINE()?0:Math.max(c.ymin,Math.min(c.ymax,y));return [x,y];}
const CHL={line:[()=>{const k=R(2,8);return {t:`שימו את A על מספר שהמרחק שלו מ־0 הוא ${M(k)}.`,ok:()=>Math.abs(pts[0].x)===k,all:[M(f(k)),M(f(-k))]}},
  ()=>{const d=R(4,9);return {t:`שימו את A על מספר שלילי ואת B על מספר חיובי, במרחק ${M(d)} זה מזה.`,ok:()=>pts[0].x<0&&pts[1].x>0&&pts[1].x-pts[0].x===d,all:Array.from({length:d-1},(_,i)=>`${M(f(-(i+1)))} ו־${M(d-i-1)}`)}},
  ()=>({t:'שימו את A ואת B על שני מספרים <b>נגדיים</b>.',ok:()=>pts[0].x===-pts[1].x&&pts[0].x!==0,all:[1,2,3].map(k=>`${M(k)} ו־${M('−'+k)}`)})],
 plane:[()=>{const c=g(),x=R(c.xmin,c.xmax)||1,y=R(Math.max(c.ymin,mode==='q1'?1:c.ymin),c.ymax)||2;return {t:`שימו את A בנקודה ${M(`(${C(f(x),'green')}, ${C(f(y),'purple')})`)}.`,ok:()=>pts[0].x===x&&pts[0].y===y,all:[`${M(`(${f(x)}, ${f(y)})`)}: קודם ${x>=0?'ימינה':'שמאלה'} ${Math.abs(x)}, אחר כך ${y>=0?'למעלה':'למטה'} ${Math.abs(y)}`]}},
  ()=>{const d=R(3,6);return {t:`בנו קטע AB באורך ${M(d)} יחידות, שמקביל לציר ${C('x','green')}.`,ok:()=>pts[0].y===pts[1].y&&Math.abs(pts[0].x-pts[1].x)===d,all:[`ל־A ול־B אותו y, וההפרש בין ה־x הוא ${d}. למשל ${M('(1, 2)')} ו־${M(`(${1+d}, 2)`)}`]}},
  ()=>{const d=R(2,4);return {t:`בנו קטע AB באורך ${M(d)} יחידות, שמקביל לציר ${C('y','purple')}.`,ok:()=>pts[0].x===pts[1].x&&Math.abs(pts[0].y-pts[1].y)===d,all:[`ל־A ול־B אותו x, וההפרש בין ה־y הוא ${d}. למשל ${M('(3, 1)')} ו־${M(`(3, ${1+d})`)}`]}},
  ()=>{const Q=mode==='q2'?pick(['ראשון','שני']):mode==='q4'?pick(['ראשון','שני','שלישי','רביעי']):'ראשון';return {t:`שימו את A <b>ברביע ה${Q}</b>.`,ok:()=>quad(pts[0].x,pts[0].y)==='ברביע ה'+Q,all:[{ראשון:'x חיובי, y חיובי',שני:'x שלילי, y חיובי',שלישי:'x שלילי, y שלילי',רביעי:'x חיובי, y שלילי'}[Q]]}}]};
function checkChal(){const el=$('#chs');if(el)el.innerHTML=pts.length>1||chal.one?(chal.ok()?'<div class="okbox">✅ <b>מצוין!</b> המשימה מתקיימת. יש עוד אפשרות?</div>':'הזיזו את הנקודות עד שהמשימה מתקיימת.'):'';}
function start(){svgSize(760,520);
 tool('bN','🔢 מספרים על הצירים',b=>{nums=!nums;b.classList.toggle('on',nums);draw();},{lt:1}).classList.add('on');
 tool('bW','🚶 הליכה לנקודה',()=>walk(),{lt:1});
 tool('bD','📏 מודדים מרחק',()=>measure(),{lt:1});
 tool('bR','🎲 נקודה לניחוש',()=>{const c=g(),[x,y]=addAt(R(c.xmin,c.xmax),R(c.ymin,c.ymax));pts=[{n:'A',x,y}];last=0;ST.revealed=false;draw();});
 tool('bX','🧹 ניקוי',()=>{pts=[];chal=null;const ch=$('#chal');if(ch)ch.remove();draw();});
 tool('bC','🎯 אתגר',()=>{setDef();chal=pick(CHL[LINE()?'line':'plane'])();
  card('chal',`<div class="big" style="font-size:24px">🎯 ${chal.t}</div><div id="chs" class="tip"></div><button class="lt noprint" id="bAll" style="margin-top:8px">כל האפשרויות</button><div id="allx"></div>`,'chal');
  $('#bAll').onclick=()=>{$('#allx').innerHTML='<div class="tip">'+chal.all.join(' · ')+'</div>';};
  pts=pts.map((p,i)=>{const c=g();return {...p,x:LINE()?(i?c.xmax-1:c.xmin+1):(i?c.xmax:c.xmin),y:LINE()?0:c.ymax-i}});draw();});
 $('#sv').addEventListener('click',e=>{if(ST.busy||/^p[A-D]$/.test(e.target.id))return;if(pts.length>=4){card('walk','<div class="tip">יש כבר 4 נקודות. גררו נקודה קיימת או לחצו "ניקוי".</div>');return;}
  const c=g(),p=svgPt(e),[x,y]=addAt(Math.round((p.x-c.OX)/c.U),Math.round((c.OY-p.y)/c.U));if(pts.some(q=>q.x===x&&q.y===y))return;
  const n=[...NM].find(k=>!pts.some(q=>q.n===k));pts.push({n,x,y});pts.sort((a,b)=>a.n<b.n?-1:1);last=pts.findIndex(q=>q.n===n);draw();});
 draggable(PIDS,(id,p)=>{const i=pts.findIndex(q=>'p'+q.n===id);if(i<0)return;const c=g(),[x,y]=addAt(Math.round((p.x-c.OX)/c.U),Math.round((c.OY-p.y)/c.U));
  if((x!==pts[i].x||y!==pts[i].y)&&!pts.some(q=>q.x===x&&q.y===y)){pts[i].x=x;pts[i].y=y;last=i;draw();}});
 setDef();draw();}
