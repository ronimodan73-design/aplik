/*META {"id":"t9_pythagoras","title":"משפט פיתגורס · ערכה: רוני מודן","short":"פיתגורס","topic":"משפט פיתגורס","glyph":"a²+b²","color":"#5ec8ff"} */
const APP={key:'pyth8',topic:'משפט פיתגורס',sub:'ניצבים ויתר, a² + b² = c², מוצאים יתר וניצב, בעיות מילוליות ומרחק בין נקודות.'};
const PK='#ff7ab6',CM='ס״מ';
const C=(t,c)=>`<span style="color:${c}">${t}</span>`;
(function(){const s=document.createElement('style');s.textContent='@keyframes pmv{to{transform:translate(var(--dx),var(--dy))}}.pm{animation:pmv .45s ease-in-out forwards;animation-delay:var(--d)}@keyframes pcf{to{opacity:1}}.pc{opacity:0;animation:pcf .05s forwards;animation-delay:var(--d)}';document.head.appendChild(s);})();
/* ===== triples ===== */
const EASY=[[3,4,5],[6,8,10],[5,12,13]];
const ALL=[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[12,16,20],[7,24,25],[15,20,25],[10,24,26],[20,21,29]];
const trip=e=>{const t=pick(e?EASY:ALL);return Math.random()<.5?[t[0],t[1],t[2]]:[t[1],t[0],t[2]];};
/* ===== drawing ===== */
const TX=(x,y,t,c,o={})=>`<text x="${f(x)}" y="${f(y)}" text-anchor="middle" font-size="${o.fs||18}" font-weight="800" fill="${c}" stroke="#13233a" stroke-width="5" paint-order="stroke" direction="${o.rtl?'rtl':'ltr'}" style="font-family:Rubik">${t}</text>`;
/* right triangle: leg a (R→P), leg b (R→Q), hypotenuse PQ. o:{a,b,la,lb,lc,rot,flip,names:[R,P,Q],anim,ex} */
function TRI(o){const W=360,H=250,m=44,rt=(o.rot||0)*Math.PI/180,sg=o.flip?-1:1;
 const raw=[[0,0],[0,o.a],[sg*o.b,0]].map(([x,y])=>[x*Math.cos(rt)-y*Math.sin(rt),x*Math.sin(rt)+y*Math.cos(rt)]);
 const xs=raw.map(p=>p[0]),ys=raw.map(p=>p[1]),x0=Math.min(...xs),y0=Math.min(...ys),w=Math.max(...xs)-x0,h=Math.max(...ys)-y0,s=Math.min((W-2*m)/(w||1),(H-2*m)/(h||1));
 const ox=(W-w*s)/2,oy=(H-h*s)/2,P=raw.map(([x,y])=>({x:ox+(x-x0)*s,y:H-oy-(y-y0)*s}));const [R,A,B]=P,cx=(R.x+A.x+B.x)/3,cy=(R.y+A.y+B.y)/3;
 const un=(p,q)=>{const L=Math.hypot(q.x-p.x,q.y-p.y);return {x:(q.x-p.x)/L,y:(q.y-p.y)/L};},u=un(R,A),v=un(R,B),k=15;
 const ln=(p,q,col,d)=>`<line x1="${f(p.x)}" y1="${f(p.y)}" x2="${f(q.x)}" y2="${f(q.y)}" stroke="${col}" stroke-width="5" stroke-linecap="round" ${o.anim?`class="drawl" style="--d:${d}s"`:''}/>`;
 const lab=(p,q,t,col)=>{if(!t)return '';const mx=(p.x+q.x)/2,my=(p.y+q.y)/2;let nx=-(q.y-p.y),ny=q.x-p.x;const L=Math.hypot(nx,ny);nx/=L;ny/=L;if((mx-cx)*nx+(my-cy)*ny<0){nx=-nx;ny=-ny;}const kk=20+String(t).length*3;return TX(mx+nx*kk,my+ny*kk+6,t,col,{fs:19});};
 let g=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="משולש ישר זווית"><polygon points="${P.map(p=>f(p.x)+','+f(p.y)).join(' ')}" fill="#ffffff08"/>`;
 g+=ln(R,A,o.ca||PK,.1)+ln(R,B,o.cb||GR,.5)+ln(A,B,o.cc||BL,.9);
 g+=`<path d="M${f(R.x+u.x*k)} ${f(R.y+u.y*k)} L${f(R.x+(u.x+v.x)*k)} ${f(R.y+(u.y+v.y)*k)} L${f(R.x+v.x*k)} ${f(R.y+v.y*k)}" fill="none" stroke="#dfe8f5" stroke-width="2.5"/>`;
 g+=lab(R,A,o.la,o.ca||PK)+lab(R,B,o.lb,o.cb||GR)+lab(A,B,o.lc,o.cc||BL);
 if(o.names)P.forEach((p,i)=>{const dx=p.x-cx,dy=p.y-cy,L=Math.hypot(dx,dy);g+=TX(p.x+dx/L*22,p.y+dy/L*22+7,o.names[i],'#dfe8f5',{fs:19});});
 return g+(o.ex||'')+'</svg>';}
/* coordinate grid 0..10 with A, B and the right triangle */
function GRID(A,B,hl){const u=26,O=34,W=O+u*10+16,sx=x=>O+x*u,sy=y=>O-10+u*10-y*u+10;let g=`<svg viewBox="0 0 ${W} ${W}" role="img" aria-label="מערכת צירים">`;
 for(let i=0;i<=10;i++){g+=`<line x1="${sx(i)}" y1="${sy(0)}" x2="${sx(i)}" y2="${sy(10)}" stroke="#1d3150"/><line x1="${sx(0)}" y1="${sy(i)}" x2="${sx(10)}" y2="${sy(i)}" stroke="#1d3150"/>`;
  if(i)g+=`<text x="${sx(i)}" y="${sy(0)+16}" text-anchor="middle" font-size="11" fill="#8aa0bd">${i}</text><text x="${sx(0)-8}" y="${sy(i)+4}" text-anchor="end" font-size="11" fill="#8aa0bd">${i}</text>`;}
 g+=`<line x1="${sx(0)}" y1="${sy(0)}" x2="${sx(10)+10}" y2="${sy(0)}" stroke="#dfe8f5" stroke-width="2"/><line x1="${sx(0)}" y1="${sy(0)}" x2="${sx(0)}" y2="${sy(10)-10}" stroke="#dfe8f5" stroke-width="2"/>`;
 const Cn={x:B.x,y:A.y};
 g+=`<line x1="${sx(A.x)}" y1="${sy(A.y)}" x2="${sx(Cn.x)}" y2="${sy(Cn.y)}" stroke="${PK}" stroke-width="4" stroke-dasharray="7 5"/><line x1="${sx(Cn.x)}" y1="${sy(Cn.y)}" x2="${sx(B.x)}" y2="${sy(B.y)}" stroke="${GR}" stroke-width="4" stroke-dasharray="7 5"/>`;
 g+=`<line x1="${sx(A.x)}" y1="${sy(A.y)}" x2="${sx(B.x)}" y2="${sy(B.y)}" stroke="${BL}" stroke-width="4.5" ${hl?'class="drawl"':''}/>`;
 if(hl){const dx=Math.abs(B.x-A.x),dy=Math.abs(B.y-A.y);g+=TX((sx(A.x)+sx(Cn.x))/2,sy(A.y)+(B.y>A.y?22:-10),dx,PK,{fs:16})+TX(sx(B.x)+(B.x>A.x?16:-16),(sy(Cn.y)+sy(B.y))/2+6,dy,GR,{fs:16});}
 [[A,'A'],[B,'B']].forEach(([p,n])=>{g+=`<circle cx="${sx(p.x)}" cy="${sy(p.y)}" r="5.5" fill="#ffb020" stroke="#0f1b2d" stroke-width="2"/>`+TX(sx(p.x)+(p===A?(p.x<2?30:-14):(p.x>8?-30:14)),sy(p.y)+(p===A?(p.y<1?-12:24):-10),`${n}(${p.x}, ${p.y})`,'#ffb020',{fs:14});});
 return g+'</svg>';}
/* moving unit squares: 9 pink + 16 green fill the 25 blue cells */
function SQA(){const u=20,src=[[24,54,3,PK],[100,34,4,GR]],T={x:232,y:14},t0=.8,dt=.13;let g=`<svg viewBox="0 0 400 270" role="img" aria-label="הריבועים על הניצבים ממלאים את הריבוע על היתר">`;
 src.forEach(([x,y,n,c])=>{for(let i=0;i<n;i++)for(let j=0;j<n;j++)g+=`<rect x="${x+j*u}" y="${y+i*u}" width="${u}" height="${u}" fill="none" stroke="${c}" stroke-opacity=".45" stroke-dasharray="3 3"/>`;});
 for(let i=0;i<5;i++)for(let j=0;j<5;j++)g+=`<rect x="${T.x+j*u}" y="${T.y+i*u}" width="${u}" height="${u}" fill="none" stroke="${BL}" stroke-width="1.5"/>`;
 let k=0;src.forEach(([x,y,n,c])=>{for(let i=0;i<n;i++)for(let j=0;j<n;j++){const tx=T.x+(k%5)*u,ty=T.y+Math.floor(k/5)*u,sx0=x+j*u,sy0=y+i*u;
  g+=`<rect class="pm" x="${sx0+1}" y="${sy0+1}" width="${u-2}" height="${u-2}" rx="3" fill="${c}" style="--dx:${tx-sx0}px;--dy:${ty-sy0}px;--d:${f(t0+k*dt)}s"/>`;k++;}});
 g+=TX(54,142,'a² = 9',PK,{fs:17})+TX(140,142,'b² = 16',GR,{fs:17})+TX(282,142,'c² = 25',BL,{fs:17});
 const cnt=n=>`<rect x="130" y="160" width="140" height="32" rx="10" fill="#13233a" stroke="#2b4466"/><text x="200" y="182" text-anchor="middle" font-size="17" font-weight="800" fill="#dfe8f5" style="font-family:Rubik">${n} / 25 ✓</text>`;
 g+=cnt(0);for(let n=1;n<=25;n++)g+=`<g class="pc" style="--d:${f(t0+(n-1)*dt+.45)}s">${cnt(n)}</g>`;
 const box=(x,t,c)=>`<rect x="${x}" y="212" width="74" height="40" rx="10" fill="${c}" fill-opacity=".2" stroke="${c}" stroke-width="2"/><text x="${x+37}" y="240" text-anchor="middle" font-size="22" font-weight="800" fill="${c}" style="font-family:Rubik">${t}</text>`;
 g+=`<g class="pc" style="--d:${f(t0+25*dt+.5)}s">${box(28,'3²',PK)}<text x="126" y="240" text-anchor="middle" font-size="24" fill="#dfe8f5">+</text>${box(152,'4²',GR)}<text x="250" y="240" text-anchor="middle" font-size="24" fill="#dfe8f5">=</text>${box(276,'5²',BL)}</g>`;
 return g+'</svg>';}
const LADDER=(a,b,c,h)=>TRI({a,b,la:h?a:'?',lb:b,lc:c,ex:''});
/* ===== shared work steps ===== */
const wSq=(n,col,lab)=>({t:`${lab?lab+': ':''}${M(C(n+'²',col)+' = '+n+' · '+n+' = ?')}`,ans:[{label:'',val:n*n}],why:`ריבוע = המספר כפול <b>עצמו</b>: ${M(n+' · '+n)}. לא ${M(n+' · 2')}!`});
const wRoot=(sq,r,nm)=>({t:`${M(nm+' = √'+sq+' = ?')}`,ans:[{label:nm+' =',val:r}],why:`שורש: איזה מספר כפול <b>עצמו</b> נותן ${M(sq)}? נסו: ${M(r+' · '+r)}.`});
const wHyp=(a,b,c)=>[wSq(a,PK),wSq(b,GR),{t:`יתר ← מחברים: ${M(a*a+' + '+b*b+' = ?')}`,ans:[{label:'',val:c*c}],why:'מחפשים <b>יתר</b> (הצלע הארוכה) ← <b>מחברים</b> את שני הריבועים.'},wRoot(c*c,c,'c')];
const wLeg=(c,a,b)=>[wSq(c,BL),wSq(a,PK),{t:`ניצב ← מחסירים: ${M(c*c+' − '+a*a+' = ?')}`,ans:[{label:'',val:b*b}],why:'מחפשים <b>ניצב</b> ← מהריבוע של היתר (הגדול) <b>מחסירים</b>.'},wRoot(b*b,b,'x')];
const CR_HYP=[{lab:'מה נתון?',choice:['שני ניצבים','ניצב ויתר'],correct:0,why:'הצלעות הנתונות יוצאות מהזווית הישרה ← ניצבים.'},{lab:'מה מבקשים?',choice:['את היתר','ניצב'],correct:0,why:'מבקשים את הצלע <b>מול</b> הזווית הישרה ← היתר.'},{lab:'מה עושים?',choice:['מחברים ריבועים','מחסירים ריבועים'],correct:0,why:'יתר ← הגדולה ← <b>מחברים</b>.'}];
const CR_LEG=[{lab:'מה נתון?',choice:['ניצב ויתר','שני ניצבים'],correct:0,why:'אחת הצלעות הנתונות נמצאת <b>מול</b> הזווית הישרה ← זה היתר.'},{lab:'מה מבקשים?',choice:['ניצב','את היתר'],correct:0,why:'הצלע החסרה יוצאת מהזווית הישרה ← ניצב.'},{lab:'מה עושים?',choice:['מחסירים ריבועים','מחברים ריבועים'],correct:0,why:'ניצב קטן מהיתר ← <b>מחסירים</b>.'}];
const shufCr=L=>L.map(s=>{const o=shuf(s.choice.map((t,i)=>[t,i===s.correct]));return {...s,choice:o.map(x=>x[0]),correct:o.findIndex(x=>x[1])};});
const RULE={hyp:'יתר: מחברים את ריבועי הניצבים, ואז שורש.',leg:'ניצב: יתר² פחות ניצב², ואז שורש.',name:'היתר נמצא מול הזווית הישרה, והוא הצלע הארוכה ביותר.',sq:'ריבוע = מספר כפול עצמו. שורש = ההפך של ריבוע.'};
const rnd=()=>({rot:pick([0,0,90,180,270,25,-25,200]),flip:Math.random()<.5});
/* ===== ★ ידע ===== */
function gWhy(){const k=R(0,2);
 if(k===0)return {kind:'למה צריך פיתגורס?',rc:0,text:'מה משפט פיתגורס עוזר למצוא?',...CH([{t:'צלע חסרה במשולש ישר זווית',ok:1},{t:'זווית חסרה במשולש',msg:'זוויות מוצאים עם 180°. פיתגורס מוצא <b>צלע</b>.'},{t:'שטח של עיגול',msg:'פיתגורס מוצא <b>צלע</b> במשולש ישר זווית.'}]),lines:['פיתגורס: יודעים שתי צלעות ← מוצאים את השלישית.'],rule:RULE.hyp};
 if(k===1)return {kind:'למה צריך פיתגורס?',rc:0,text:'באיזה משולש משתמשים בפיתגורס?',...CH([{t:'במשולש ישר זווית',ok:1},{t:'בכל משולש',msg:'רק כשיש <b>זווית ישרה</b> (90°).'},{t:'במשולש שווה צלעות',msg:'פיתגורס עובד רק כשיש זווית של 90°.'}]),dia:()=>TRI({a:3,b:4}),lines:['רק במשולש עם זווית ישרה (90°).'],rule:RULE.name};
 return {kind:'למה צריך פיתגורס?',rc:0,text:'כמה צלעות צריך לדעת כדי למצוא את השלישית?',...CH([{t:'2',ok:1},{t:'1',msg:'צלע אחת לא מספיקה. צריך <b>שתיים</b>.'},{t:'3',msg:'אם יודעים 3, אין מה למצוא! צריך <b>שתיים</b>.'}]),lines:['שתי צלעות ← מוצאים את השלישית.'],rule:RULE.hyp};}
function CH(o){const s=shuf(o);return {choice:s.map(x=>x.t),correct:s.findIndex(x=>x.ok),diag:({sel})=>s[sel]&&!s[sel].ok&&s[sel].msg||null};}
function letTri(){const n=shuf(['A','B','C']),[a,b]=trip(1),r=rnd(),sd=(x,y)=>[x,y].sort().join('');return {n,a,b,r,hyp:sd(n[1],n[2]),l1:sd(n[0],n[1]),l2:sd(n[0],n[2])};}
function gHyp(){const t=letTri();const o=shuf([t.hyp,t.l1,t.l2]);
 return {kind:'מי היתר?',rc:1,text:`במשולש ${M(t.n.join(''))} הזווית ${M('∢'+t.n[1]+t.n[0]+t.n[2]+' = 90°')}. איזו צלע היא <b>היתר</b>?`,dia:h=>TRI({a:t.a,b:t.b,names:t.n,...t.r,ca:h?PK:'#dfe8f5',cb:h?GR:'#dfe8f5',cc:h?BL:'#dfe8f5'}),
  choice:o.map(M),correct:o.indexOf(t.hyp),lines:[`הזווית הישרה ב־${M(t.n[0])}.`,`היתר מול ${M(t.n[0])}: ${M(C(t.hyp,BL))}`],rule:RULE.name,
  diag:({sel})=>o[sel]!==t.hyp?`${M(o[sel])} יוצאת מהזווית הישרה ← ניצב. היתר נמצא <b>מול</b> הזווית הישרה.`:null};}
function gEqFor(){const t=letTri(),good=`${t.l1}² + ${t.l2}² = ${t.hyp}²`,o=shuf([good,`${t.l1}² + ${t.hyp}² = ${t.l2}²`,`${t.hyp}² + ${t.l2}² = ${t.l1}²`,`${t.l1} + ${t.l2} = ${t.hyp}`]);
 return {kind:'כותבים את המשפט',rc:1,text:`במשולש ${M(t.n.join(''))} הזווית ${M('∢'+t.n[1]+t.n[0]+t.n[2]+' = 90°')}. איזה שוויון נכון?`,dia:h=>TRI({a:t.a,b:t.b,names:t.n,...t.r}),
  choice:o.map(M),correct:o.indexOf(good),lines:[`היתר: ${M(C(t.hyp,BL))} (מול הזווית הישרה).`,M(good)],rule:'ניצב² + ניצב² = יתר². היתר לבד בצד אחד.',
  diag:({sel})=>/²/.test(o[sel])?'בצד הלבד צריך להיות <b>היתר</b>: הצלע מול הזווית הישרה.':'שכחתם את הריבועים: '+M('²')+' על כל צלע.'};}
function gSqRoot(){const n=R(2,15),sq=Math.random()<.5;
 if(sq)return {kind:'ריבוע',rc:3,text:`חשבו: ${M(n+'² = ?')}`,ans:[{label:'',col:BL,val:n*n}],work:[{t:M(n+' · '+n+' = ?'),ans:[{label:'',val:n*n}],why:'ריבוע = המספר כפול <b>עצמו</b>.'}],lines:[M(n+'² = '+n+' · '+n+' = '+n*n)],rule:RULE.sq,
  diag:({vals:[v]})=>v===2*n?`כפלתם ב־2. ריבוע = ${M(n)} כפול <b>עצמו</b>: ${M(n+' · '+n)}.`:null};
 return {kind:'שורש',rc:3,text:`חשבו: ${M('√'+n*n+' = ?')}`,ans:[{label:'',col:BL,val:n}],work:[{t:`איזה מספר כפול עצמו נותן ${M(n*n)}?`,ans:[{label:'',val:n}],why:`נסו מספרים: ${M(n+' · '+n+' = '+n*n)}.`}],lines:[M(n+' · '+n+' = '+n*n),M('√'+n*n+' = '+n)],rule:RULE.sq,
  diag:({vals:[v]})=>v===n*n/2?'חילקתם ב־2. שורש: איזה מספר כפול <b>עצמו</b> נותן את המספר?':null};}
function gSqSum(){const [a,b,c]=trip(1);
 return {kind:'כמה משבצות?',rc:2,text:`על הניצבים בנו ריבועים: ריבוע ${C('ורוד',PK)} שצלעו ${M(a)} וריבוע ${C('ירוק',GR)} שצלעו ${M(b)}. כמה משבצות יש ב${C('ריבוע הכחול',BL)} שעל היתר?`,
  dia:h=>TRI({a,b,la:a,lb:b,lc:h?c:'?'}),ans:[{label:'משבצות',col:BL,val:c*c}],work:[wSq(a,PK),wSq(b,GR),{t:`${M(a*a+' + '+b*b+' = ?')}`,ans:[{label:'',val:c*c}],why:'הריבועים הקטנים ממלאים יחד את הגדול ← <b>מחברים</b>.'}],
  lines:[M(C(a+'² = '+a*a,PK)+' , '+C(b+'² = '+b*b,GR)),M(a*a+' + '+b*b+' = '+C(c*c,BL))],rule:'ניצב² + ניצב² = יתר²: הריבועים הקטנים ממלאים את הגדול.',
  diag:({vals:[v]})=>v===c?`${M(c)} זו הצלע. השאלה שואלת כמה <b>משבצות</b>: ${M(c+'²')}.`:v===a+b?'חיברו את <b>הריבועים</b>, לא את הצלעות.':null};}
/* ===== ★★ יישום ===== */
function gFindHyp(e){const [a,b,c]=trip(e),r=e?{}:rnd();
 return {kind:'מוצאים יתר',rc:4,crack:shufCr(CR_HYP),text:`הניצבים: ${M(C(a,PK))} ו־${M(C(b,GR))} ${CM}. מה אורך ${C('היתר',BL)}?`,dia:h=>TRI({a,b,la:a,lb:b,lc:h?c:'?',...r,anim:h}),ans:[{label:'היתר =',col:BL,val:c,unit:CM}],work:wHyp(a,b,c),
  lines:[M(C(a+'²',PK)+' + '+C(b+'²',GR)+' = '+a*a+' + '+b*b+' = '+c*c),M('c = √'+c*c+' = '+c)],rule:RULE.hyp,
  diag:({vals:[v]})=>v===c*c?`זה ${M('c²')}. עוד צעד: ${M('√'+c*c)}.`:v===a+b?'חיברתם צלעות. מחברים <b>ריבועים</b>: '+M(a+'² + '+b+'²')+'.':v===2*a+2*b?'ריבוע זה מספר כפול <b>עצמו</b>, לא כפול 2.':v<Math.max(a,b)?'היתר הוא הצלע <b>הארוכה</b>. התשובה צריכה להיות גדולה מ־'+M(Math.max(a,b))+'.':null};}
function gFindLeg(e){const [a,b,c]=trip(e),r=e?{}:rnd();
 return {kind:'מוצאים ניצב',rc:5,crack:shufCr(CR_LEG),text:`${C('היתר',BL)}: ${M(C(c,BL))} ${CM}, ניצב אחד: ${M(C(a,PK))} ${CM}. מה אורך ${C('הניצב השני',GR)}?`,dia:h=>TRI({a,b,la:a,lb:h?b:'?',lc:c,...r,anim:h}),ans:[{label:'הניצב =',col:GR,val:b,unit:CM}],work:wLeg(c,a,b),
  lines:[M(C(c+'²',BL)+' − '+C(a+'²',PK)+' = '+c*c+' − '+a*a+' = '+b*b),M('b = √'+b*b+' = '+b)],rule:RULE.leg,
  diag:({vals:[v]})=>v===b*b?`זה ${M('b²')}. עוד צעד: ${M('√'+b*b)}.`:v===c-a?'חיסרתם צלעות. מחסירים <b>ריבועים</b>: '+M(c+'² − '+a+'²')+'.':v===c*c+a*a||Math.abs(v-Math.sqrt(c*c+a*a))<.6?'חיברתם! מחפשים <b>ניצב</b> ← <b>מחסירים</b>.':v>=c?'ניצב תמיד <b>קצר</b> מהיתר.':null};}
/* ===== ★★★ הבנה ===== */
function gWhichOp(){const leg=Math.random()<.5,[a,b,c]=trip(1);
 return {kind:'מחברים או מחסירים?',rc:5,text:leg?`נתון היתר ${M(c)} וניצב ${M(a)}. מחפשים את הניצב השני. מה עושים עם הריבועים?`:`נתונים הניצבים ${M(a)} ו־${M(b)}. מחפשים את היתר. מה עושים עם הריבועים?`,
  dia:()=>TRI({a,b,la:a,lb:leg?'?':b,lc:leg?c:'?'}),...CH([{t:'מחברים',ok:!leg,msg:'מחפשים ניצב (קצר) ← <b>מחסירים</b> מהיתר.'},{t:'מחסירים: הגדול פחות הקטן',ok:leg,msg:'מחפשים יתר (ארוך) ← <b>מחברים</b>.'},{t:'כופלים',msg:'בפיתגורס מחברים או מחסירים ריבועים.'}]),
  lines:[leg?`ניצב ← ${M(c+'² − '+a+'²')}`:`יתר ← ${M(a+'² + '+b+'²')}`],rule:'יתר ← מחברים. ניצב ← מחסירים.'};}
const WORDS=[
 ()=>{const [a,b,c]=pick([[12,5,13],[8,6,10],[4,3,5],[24,7,25],[15,8,17]]);return {nm:'סולם',text:`סולם באורך ${M(c)} מ׳ נשען על קיר. רגל הסולם רחוקה ${M(b)} מ׳ מהקיר. לאיזה גובה מגיע הסולם?`,a,b,c,ask:'a',unit:'מ׳',lab:['קיר','רצפה','סולם']};},
 ()=>{const [a,b,c]=pick([[6,8,10],[5,12,13],[9,12,15],[8,15,17]]);return {nm:'אלכסון',text:`למלבן אורך ${M(b)} ס״מ ורוחב ${M(a)} ס״מ. מה אורך האלכסון?`,a,b,c,ask:'c',unit:CM,lab:['רוחב','אורך','אלכסון']};},
 ()=>{const [a,b,c]=pick([[30,40,50],[60,80,100],[36,48,60]]);return {nm:'מסך',text:`רוחב מסך ${M(b)} ס״מ וגובהו ${M(a)} ס״מ. מה אורך האלכסון של המסך?`,a,b,c,ask:'c',unit:CM,lab:['גובה','רוחב','אלכסון']};},
 ()=>{const [a,b,c]=pick([[9,12,15],[6,8,10],[12,5,13],[8,15,17]]);return {nm:'חבל',text:`חבל מתוח מראש עמוד בגובה ${M(a)} מ׳ ליתד באדמה, ${M(b)} מ׳ מהעמוד. מה אורך החבל?`,a,b,c,ask:'c',unit:'מ׳',lab:['עמוד','אדמה','חבל']};},
 ()=>{const [a,b,c]=pick([[5,12,13],[9,12,15],[8,15,17]]);return {nm:'אלכסון',text:`אלכסון של מלבן ${M(c)} ס״מ, ורוחבו ${M(a)} ס״מ. מה אורך המלבן?`,a,b,c,ask:'b',unit:CM,lab:['רוחב','אורך','אלכסון']};}];
function gWord(){const w=pick(WORDS)(),{a,b,c}=w,hy=w.ask==='c',val=w[w.ask];
 const cr=shufCr([{lab:'מה היתר כאן?',choice:[`ה${w.lab[2]}`,`ה${w.lab[0]}`],correct:0,why:`ה${w.lab[2]} נמצא מול הזווית הישרה ← יתר.`},{lab:'מה מבקשים?',choice:hy?['את היתר','ניצב']:['ניצב','את היתר'],correct:0,why:hy?'מבקשים את הצלע מול הזווית הישרה.':'מבקשים צלע שיוצאת מהזווית הישרה ← ניצב.'},{lab:'מה עושים?',choice:hy?['מחברים ריבועים','מחסירים ריבועים']:['מחסירים ריבועים','מחברים ריבועים'],correct:0,why:hy?'יתר ← מחברים.':'ניצב ← מחסירים.'}]);
 return {kind:'בעיה מילולית · '+w.nm,rc:6,crack:cr,text:w.text+' (משרטטים משולש ישר זווית!)',dia:h=>TRI({a,b,la:w.ask==='a'&&!h?'?':a,lb:w.ask==='b'&&!h?'?':b,lc:hy&&!h?'?':c,anim:h,ex:''}),
  ans:[{label:'התשובה =',col:hy?BL:w.ask==='a'?PK:GR,val,unit:w.unit}],work:hy?wHyp(a,b,c):w.ask==='a'?wLeg(c,b,a):wLeg(c,a,b),
  lines:[`ה${w.lab[2]} מול הזווית הישרה ← יתר.`,hy?M(a+'² + '+b+'² = '+c*c+' ← √'+c*c+' = '+c):M(c+'² − '+(w.ask==='a'?b:a)+'² = '+val*val+' ← √'+val*val+' = '+val)],rule:hy?RULE.hyp:RULE.leg,
  diag:({vals:[v]})=>v===val*val?`זה הריבוע. עוד צעד: ${M('√'+val*val)}.`:!hy&&Math.abs(v-Math.sqrt(c*c+(w.ask==='a'?b:a)**2))<.6?`ה${w.lab[2]} הוא היתר, ומחפשים ניצב ← <b>מחסירים</b>.`:null};}
function gCoord(){const [dx,dy,d]=pick([[3,4,5],[4,3,5],[6,8,10],[8,6,10]]);const x1=R(0,10-dx),y1=R(0,10-dy),A={x:x1,y:y1},B={x:x1+dx,y:y1+dy};
 return {kind:'מרחק בין נקודות',rc:7,crack:shufCr([{lab:'מה הניצבים?',choice:['כמה זזים ימינה וכמה למעלה','השיעורים של A'],correct:0,why:'הניצבים הם הקווים המקווקווים: ימינה ולמעלה.'},{lab:'מה מבקשים?',choice:['את היתר: הקו הישר AB','ניצב'],correct:0,why:'AB הוא הקו הישר מול הזווית הישרה ← יתר.'}]),
  text:`מה המרחק בין ${M('A('+x1+', '+y1+')')} ל־${M('B('+B.x+', '+B.y+')')}?`,dia:h=>GRID(A,B,h),ans:[{label:'AB =',col:BL,val:d}],
  work:[{t:`כמה זזים ימינה? ${M(B.x+' − '+x1+' = ?')}`,ans:[{label:'',val:dx}],why:'ימינה = ההפרש בין ה־x.'},{t:`כמה עולים למעלה? ${M(B.y+' − '+y1+' = ?')}`,ans:[{label:'',val:dy}],why:'למעלה = ההפרש בין ה־y.'},{t:`${M(dx+'² + '+dy+'² = ?')}`,ans:[{label:'',val:d*d}],why:'מחפשים יתר ← מחברים ריבועים.'},wRoot(d*d,d,'AB')],
  lines:[`ימינה ${M(C(dx,PK))}, למעלה ${M(C(dy,GR))}.`,M(dx+'² + '+dy+'² = '+d*d+' ← √'+d*d+' = '+d)],rule:'מרחק: ימינה ולמעלה הם ניצבים, AB הוא היתר.',
  diag:({vals:[v]})=>v===dx+dy?'זה הדרך <b>בפינה</b>. המרחק הוא הקו הישר ← פיתגורס.':v===d*d?`זה ${M('AB²')}. עוד צעד: שורש.`:null};}
function gErr(){const k=R(0,2),nm=pick(['נועה','דניאל','איתי','מאיה','יואב']),[a,b,c]=trip(1);let L,bad,why,rc;
 if(k===0){L=[M(c+'² + '+a+'² = '+c*c+' + '+a*a),M('= '+(c*c+a*a)),M('√'+(c*c+a*a))];bad=0;why='מחפשים <b>ניצב</b> ← מחסירים: '+M(c+'² − '+a+'²');rc=8;}
 else if(k===1){L=[M(a+'² + '+b+'² = '+a*a+' + '+b*b),M('= '+c*c),M('היתר = '+c*c)];bad=2;why='שכחו את השורש! '+M('√'+c*c+' = '+c);rc=9;}
 else{L=[M(a+'² + '+b+'² = '+2*a+' + '+2*b),M('= '+(2*a+2*b))];bad=0;why='ריבוע = כפול <b>עצמו</b>: '+M(a+'² = '+a*a)+', לא '+M(2*a);rc=3;}
 const q=k===0?`היתר ${M(c)} וניצב ${M(a)}. ${nm} חיפש/ה את הניצב השני:`:`הניצבים ${M(a)} ו־${M(b)}. ${nm} חיפש/ה את היתר:`;
 const val=k===0?b:c;
 return {kind:'מוצאים את הטעות',rc,text:q+'<br>'+L.map((l,i)=>`שורה ${i+1}: ${l}`).join('<br>')+'<br>באיזו שורה הטעות? ומה התשובה הנכונה?',dia:h=>TRI({a,b,la:a,lb:k===0&&!h?'?':b,lc:k===0||h?c:'?'}),
  choice:L.map((_,i)=>'שורה '+(i+1)),correct:bad,choiceLab:'הטעות בשורה:',ans:[{label:'התשובה הנכונה =',col:BL,val}],work:k===0?wLeg(c,a,b):wHyp(a,b,c),
  lines:[`הטעות בשורה ${bad+1}: ${why}`,`התשובה: ${M(val)}`],rule:k===0?RULE.leg:k===1?'בסוף תמיד מוציאים שורש.':RULE.sq,diag:()=>why};}
/* ===== ★★★★ חשיבה ואוריינות ===== */
function gIsRight(){const [a,b,c]=trip(1),ok=Math.random()<.5,cc=ok?c:c+1,s=shuf([a,b,cc]);
 return {kind:'האם ישר זווית?',rc:2,text:`צלעות משולש: ${M(s.join(', '))}. חשבו ${M(a+'² + '+b+'²')} והחליטו: האם המשולש ישר זווית?`,ans:[{label:'',col:BL,val:a*a+b*b}],choice:['כן, ישר זווית','לא'],correct:ok?0:1,choiceLab:'האם ישר זווית?',
  work:[wSq(a,PK),wSq(b,GR),{t:`${M(a*a+' + '+b*b+' = ?')}`,ans:[{label:'',val:a*a+b*b}],why:'מחברים את ריבועי שתי הצלעות הקצרות.'},{t:`ו־${M(cc+'² = '+cc*cc)}. שווים?`,choice:['שווים ← ישר זווית','לא שווים ← לא ישר זווית'],correct:ok?0:1,why:'ישר זווית <b>רק</b> אם יוצא בדיוק הריבוע של הצלע הארוכה.'}],
  lines:[M(a+'² + '+b+'² = '+(a*a+b*b)),M(cc+'² = '+cc*cc),ok?'שווים ← ישר זווית ✓':'לא שווים ← לא ישר זווית.'],rule:'שתי הקצרות בריבוע, מחברים, ומשווים לריבוע של הארוכה.',
  diag:({vals:[v]})=>v===a+b?'מחברים את <b>הריבועים</b>.':null};}
function gRect2(){const [a,b,c]=pick([[6,8,10],[5,12,13],[9,12,15],[8,15,17]]);
 return {kind:'מלבן: מאלכסון לשטח',rc:6,crack:shufCr([{lab:'מה חסר כדי לחשב שטח?',choice:['האורך','האלכסון'],correct:0,why:'שטח = אורך · רוחב. האורך חסר.'},{lab:'איך מוצאים אותו?',choice:['פיתגורס: מחסירים ריבועים','מחברים ריבועים'],correct:0,why:'האורך הוא ניצב ← מחסירים.'}]),
  text:`אלכסון מלבן ${M(c)} ס״מ, ורוחבו ${M(a)} ס״מ. מה שטח המלבן?`,dia:h=>TRI({a,b,la:a,lb:h?b:'?',lc:c,anim:h}),ans:[{label:'שטח =',col:BL,val:a*b,unit:'סמ״ר'}],
  work:[...wLeg(c,a,b),{t:`שטח = ${M(a+' · '+b+' = ?')}`,ans:[{label:'',val:a*b}],why:'שטח מלבן = אורך · רוחב.'}],
  lines:[`אורך: ${M(c+'² − '+a+'² = '+b*b+' ← '+b)}`,`שטח: ${M(a+' · '+b+' = '+a*b)}`],rule:'קודם פיתגורס למצוא צלע, אחר כך שטח.',
  diag:({vals:[v]})=>v===b?'זה האורך. עכשיו שטח: אורך · רוחב.':v===a*c?'האלכסון הוא לא צלע. קודם מוצאים את האורך.':null};}
function gSave(){const [a,b,c]=pick([[30,40,50],[60,80,100],[9,12,15],[12,16,20],[15,20,25]]);
 return {kind:'כמה חוסכים?',rc:6,crack:shufCr([{lab:'הדרך בפינה היא...',choice:['שני הניצבים','היתר'],correct:0,why:'הולכים לאורך שתי הצלעות שליד הזווית הישרה.'},{lab:'הדרך באלכסון היא...',choice:['היתר','ניצב'],correct:0,why:'האלכסון מול הזווית הישרה.'}]),
  text:`מגרש מלבני ${M(a)} מ׳ על ${M(b)} מ׳. דנה חוצה את המגרש באלכסון, במקום ללכת מסביב לפינה. כמה מטרים היא חוסכת?`,dia:h=>TRI({a,b,la:a,lb:b,lc:h?c:'?',anim:h}),ans:[{label:'חוסכת',col:OR,val:a+b-c,unit:'מ׳'}],
  work:[...wHyp(a,b,c),{t:`בפינה: ${M(a+' + '+b+' = ?')}`,ans:[{label:'',val:a+b}],why:'מסביב = שתי הצלעות.'},{t:`חוסכת: ${M((a+b)+' − '+c+' = ?')}`,ans:[{label:'',val:a+b-c}],why:'ההפרש בין שתי הדרכים.'}],
  lines:[`באלכסון: ${M('√('+a+'² + '+b+'²) = '+c)}`,`בפינה: ${M(a+' + '+b+' = '+(a+b))}`,`חוסכת: ${M((a+b)+' − '+c+' = '+(a+b-c))}`],rule:'מחשבים את שתי הדרכים ומחסירים.',
  diag:({vals:[v]})=>v===c?'זה אורך האלכסון. השאלה: כמה <b>חוסכים</b>?':v===a+b?'זו הדרך בפינה. מחסירים ממנה את האלכסון.':null};}
function gIso(){const [h,hb,s]=pick([[4,3,5],[8,6,10],[12,5,13],[12,9,15],[15,8,17]]);
 const dia=hl=>TRI({a:h,b:hb,la:hl?h:'?',lb:hb,lc:s,anim:hl,ex:''});
 return {kind:'גובה במשולש שווה שוקיים',rc:6,crack:shufCr([{lab:'הגובה חוצה את הבסיס. חצי בסיס =',choice:[String(hb),String(2*hb)],correct:0,why:`הגובה חוצה את הבסיס: ${M(2*hb+' : 2 = '+hb)}.`},{lab:'מה מבקשים?',choice:['ניצב (הגובה)','יתר'],correct:0,why:'השוק היא היתר. הגובה הוא ניצב ← מחסירים.'}]),
  text:`במשולש שווה שוקיים השוק ${M(s)} ס״מ והבסיס ${M(2*hb)} ס״מ. מה אורך הגובה לבסיס? (בציור: חצי מהמשולש)`,dia,ans:[{label:'גובה =',col:PK,val:h,unit:CM}],
  work:[{t:`חצי בסיס: ${M(2*hb+' : 2 = ?')}`,ans:[{label:'',val:hb}],why:'הגובה לבסיס חוצה אותו לשניים.'},...wLeg(s,hb,h)],
  lines:[`חצי בסיס ${M(hb)}.`,M(s+'² − '+hb+'² = '+h*h+' ← √'+h*h+' = '+h)],rule:'גובה בשווה שוקיים: חצי בסיס, ואז פיתגורס (מחסירים).',
  diag:({vals:[v]})=>Math.abs(v-Math.sqrt(s*s-4*hb*hb))<.6&&s>2*hb?'שכחתם לחצות את הבסיס.':v===h*h?'עוד צעד: שורש.':null};}
/* ===== levels ===== */
const LAD=[
 [{g:gHyp,n:4,h:2},{g:gSqRoot,n:5,h:2},{g:gEqFor,n:4,h:1},{g:gSqSum,n:3,h:1},{g:()=>gFindHyp(1),n:4,h:1}],
 [{g:()=>gFindHyp(1),n:4,h:2},{g:()=>gFindLeg(1),n:4,h:2},{g:()=>gFindHyp(),n:6,h:1},{g:()=>gFindLeg(),n:6,h:0}],
 [{g:gWhichOp,n:4,h:1},{g:gWord,n:6,h:1},{g:gCoord,n:5,h:1},{g:gErr,n:5,h:0}],
 [{g:gRect2,n:5,h:1},{g:gSave,n:5,h:1},{g:gIsRight,n:5,h:0},{g:gIso,n:5,h:0}]];
const LEVELS=[
 {n:1,t:'מי היתר? ריבוע ושורש',d:'ניצבים ויתר ← ריבוע ושורש ← המשפט',ladder:LAD[0]},
 {n:2,t:'מוצאים יתר וניצב',d:'יתר ← מחברים · ניצב ← מחסירים',ladder:LAD[1]},
 {n:3,t:'בעיות ומרחק',d:'משרטטים ← מחליטים ← פותרים',ladder:LAD[2]},
 {n:4,t:'חשיבה ואוריינות',d:'שטח, חיסכון בדרך, גובה, ישר זווית?',ladder:LAD[3]}];
LEVELS.forEach(l=>l.g=()=>pick(l.ladder).g());
const TEST=[[gHyp,gSqRoot,gEqFor,gSqSum],[()=>gFindHyp(),()=>gFindLeg(),()=>gFindHyp(),()=>gFindLeg()],[gWhichOp,gWord,gCoord,gErr],[gRect2,gSave,gIsRight,gIso]];
const WARM=[gSqRoot,gHyp,gSqRoot,gHyp,gSqSum,gEqFor,gSqRoot,()=>gFindHyp(1)];
/* ===== explanation cards: short and visual ===== */
const RECAP=[
 {h:'למה צריך את זה?',d:1.2,svg:()=>TRI({a:12,b:5,la:'?',lb:5,lc:13,anim:1}),says:['כמה גבוה מגיע סולם של 13 מ׳?','פיתגורס עונה בלי למדוד!'],what:'מוצאים צלע שלישית בלי סרגל.'},
 {h:'ניצבים ויתר',d:1.4,svg:()=>TRI({a:3,b:4,la:'ניצב',lb:'ניצב',lc:'יתר',anim:1}),says:[`${C('ניצבים',PK)}: יוצאים מהזווית הישרה.`,`${C('יתר',BL)}: מול הזווית הישרה. הכי ארוך!`],what:'יתר = מול הזווית הישרה.'},
 {h:'הסוד של פיתגורס',d:4.6,svg:SQA,says:[`${M(C('9',PK)+' + '+C('16',GR)+' = '+C('25',BL))} משבצות!`],def:M(C('a²',PK)+' + '+C('b²',GR)+' = '+C('c²',BL)),what:'ניצב² + ניצב² = יתר².'},
 {h:'ריבוע ושורש',d:.6,says:[`ריבוע: ${M('5² = 5 · 5 = 25')}`,`שורש: ההפך! ${M('√25 = 5')}`],what:'שורש מבטל ריבוע.'},
 {h:'מוצאים יתר: מחברים',d:1.4,svg:()=>TRI({a:6,b:8,la:6,lb:8,lc:'?',anim:1}),says:[M(C('6²',PK)+' + '+C('8²',GR)+' = 36 + 64 = 100'),M('√100 = '+C('10',BL))],what:'יתר ← מחברים, ואז שורש.'},
 {h:'מוצאים ניצב: מחסירים',d:1.4,svg:()=>TRI({a:5,b:12,la:5,lb:'?',lc:13,anim:1}),says:[M(C('13²',BL)+' − '+C('5²',PK)+' = 169 − 25 = 144'),M('√144 = '+C('12',GR))],what:'ניצב ← מחסירים, ואז שורש.'},
 {h:'בעיה מילולית? משרטטים!',d:1.4,svg:()=>TRI({a:8,b:6,la:'קיר',lb:'רצפה',lc:'סולם',anim:1}),says:['מציירים משולש ישר זווית.','מסמנים: מה ידוע? מה חסר?'],what:'קודם ציור, אחר כך חשבון.'},
 {h:'מרחק בין שתי נקודות',d:1.4,svg:()=>GRID({x:1,y:2},{x:7,y:10},1),says:[`${C('ימינה',PK)} ו${C('למעלה',GR)} = ניצבים.`,`הקו הישר ${C('AB',BL)} = יתר.`],what:'מרחק ← משולש ← פיתגורס.'},
 {h:'טעות נפוצה: ניצב',d:.5,says:[`ניצב? ${M('13² + 5²')} <span class="x">✗</span>`,`מחסירים! ${M('13² − 5²')} <span class="v">✓</span>`],what:'ניצב ← תמיד מחסירים.'},
 {h:'טעות נפוצה: שורש',d:.5,says:[`${M('c² = 100')} ← עוד לא סיימנו!`,`${M('c = √100 = 10')} <span class="v">✓</span>`],what:'בסוף תמיד שורש.'}];
RECAP[3].svg=()=>{const u=18;let g=`<svg viewBox="0 0 300 120" role="img" aria-label="ריבוע 5 על 5">`;for(let i=0;i<5;i++)for(let j=0;j<5;j++)g+=`<rect class="rv" style="--d:${f(.1+(i*5+j)*.03)}s" x="${20+j*u}" y="${10+i*u}" width="${u-2}" height="${u-2}" rx="2" fill="${BL}" fill-opacity=".75"/>`;
 return g+TX(64,112,'5',PK,{fs:15})+TX(205,50,'5² = 25',BL,{fs:22})+TX(205,88,'√25 = 5',PK,{fs:22})+'</svg>';};
RECAP[8].chk=[()=>{let q;for(let i=0;i<30;i++){q=gErr();if(q.rc===8)break;}return q;},()=>gFindLeg(1)];
RECAP[9].chk=[()=>{let q;for(let i=0;i<30;i++){q=gErr();if(q.rc===9)break;}return q;},()=>gFindHyp(1)];
RECAP[0].chk=[gWhy];
