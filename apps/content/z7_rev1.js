/*META {"id":"z7_rev1","title":"חזרה ותרגול ז׳ · זוויות ומספרים מכוונים · ערכה: רוני מודן","short":"חזרה ז׳","topic":"חזרה ותרגול: זוויות ומספרים מכוונים","glyph":"−|−3|","color":"#c084fc"} */
const APP={key:'z7rev1',topic:'חזרה ותרגול: זוויות ומספרים מכוונים',sub:'זוויות, חוצה זווית, משולשים, משולש שווה שוקיים, נגדיים, ערך מוחלט, חיבור וחיסור. מתחילים ב"מתחילים כאן".',
 rc:{'סוג הזווית':0,'זוויות צמודות':1,'צמודות עם x':1,'חוצה זווית':2,'חוצה + צמודות':2,'משולש שווה שוקיים':5,'האם זה אפשרי?':5,'המספר הנגדי':6,'ערך מוחלט':7,'מינוס לפני ערך מוחלט':11,'חיבור מספרים מכוונים':8,'חיסור עם סוגריים':9,'בלי סוגריים':10,'תרגיל משולב':11,'מוצאים את הטעות':10,'נכון או לא נכון?':7,'בעיה מילולית':8,'סכום הזוויות במשולש':3,'זוויות המשולש עם x':3,'האם יש משולש כזה?':3,'סוג המשולש לפי זוויות':4,'סוג המשולש לפי צלעות':4,'משולש שווה צלעות':4,'יחסי הכלה':4}};
APP.total=35;APP.topicsMenu=true;
const INK='#dfe8f5';
const N=v=>v<0?'−'+(-v):''+v;
const NP=v=>v<0?'('+N(v)+')':''+v;
const SC=v=>v<0?RD:v>0?GR:INK;
const C=(t,c)=>`<b style="color:${c}">${t}</b>`;
const CK=(lab,opts,ok,why)=>{const o=shuf(opts);return {lab,choice:o,correct:o.indexOf(ok),why};};
const nz=(lo,hi)=>{let v;do{v=R(lo,hi);}while(v===0);return v;};
const sgnR=(lo,hi)=>(Math.random()<.5?-1:1)*R(lo,hi);

/* ================= שרטוטי זוויות ================= */
const OX=200,OY=232,RL=165;
const rd=d=>d*Math.PI/180;
const PT=(a,r)=>[OX+r*Math.cos(rd(a)),OY-r*Math.sin(rd(a))];
const ray=(a,o={})=>{const p=PT(a,o.r||RL);return `<line x1="${OX}" y1="${OY}" x2="${f(p[0])}" y2="${f(p[1])}" stroke="${o.c||INK}" stroke-width="${o.w||3.2}" stroke-linecap="round" class="${o.cls||''}" style="--d:${o.d||0}s"/>`;};
function sec(a0,a1,col,o={}){const r=o.r||(a1-a0<40?58:44),s=PT(a0,r),e=PT(a1,r),big=a1-a0>180?1:0;
 return `<path d="M${OX} ${OY} L${f(s[0])} ${f(s[1])} A${r} ${r} 0 ${big} 0 ${f(e[0])} ${f(e[1])} Z" fill="${col}" fill-opacity="${o.op||.8}" class="${o.cls||''}" style="--d:${o.d||0}s"/>`;}
function aLab(a0,a1,t,col,o={}){const m=(a0+a1)/2,rr=o.rr||((a1-a0<40?58:44)+22+Math.min(18,t.length*2.2)),p=PT(m,rr);
 return `<text x="${f(p[0])}" y="${f(p[1]+7)}" text-anchor="middle" font-size="${o.fs||19}" font-weight="800" fill="${col}" stroke="#13233a" stroke-width="5" paint-order="stroke" class="${o.cls||''}" style="--d:${o.d||0}s;font-family:Rubik" direction="ltr">${t}</text>`;}
const ptN=(a,t,o={})=>{const p=PT(a,(o.r||RL)+16);return `<text x="${f(p[0])}" y="${f(p[1]+7)}" text-anchor="middle" font-size="19" font-weight="800" fill="#9fb3cc" style="font-family:Rubik">${t}</text>`;};
const oN=`<circle cx="${OX}" cy="${OY}" r="4.5" fill="${OR}"/><text x="${OX}" y="${OY+28}" text-anchor="middle" font-size="19" font-weight="800" fill="${OR}" style="font-family:Rubik">O</text>`;
const tick=(a,o={})=>{const p=PT(a,o.r||52),q=PT(a,(o.r||52)-12);return `<line x1="${f(p[0])}" y1="${f(p[1])}" x2="${f(q[0])}" y2="${f(q[1])}" stroke="#fff" stroke-width="3" class="${o.cls||''}" style="--d:${o.d||0}s"/>`;};
const svgA=(inner,lbl)=>`<svg viewBox="0 0 400 270" role="img" aria-label="${lbl||'זווית'}">${inner}</svg>`;
/* זווית אחת: מקרן ימינה לזווית v */
function angOne(v,col,o={}){const a0=v>150?0:12,a1=a0+v;return svgA(sec(a0,a1,col,{cls:o.cls,d:o.d})+ray(a0)+ray(a1,{cls:o.cls2||'',d:o.d2||0})+(v===90?`<path d="M${f(PT(a0,26)[0])} ${f(PT(a0,26)[1])} L${f(PT(a0+45,36.8)[0])} ${f(PT(a0+45,36.8)[1])} L${f(PT(a1,26)[0])} ${f(PT(a1,26)[1])}" fill="none" stroke="#fff" stroke-width="3"/>`:'')+(o.t?aLab(a0,a1,o.t,col):'')+oN);}
/* צמודות: ישר AOC וקרן OB. ∠AOB = th משמאל */
function adjDia(th,tA,tB,o={}){const b=180-th;return svgA(sec(b,180,OR,{cls:o.c1,d:o.d1})+sec(0,b,BL,{cls:o.c2,d:o.d2})+ray(0)+ray(180)+ray(b)+aLab(b,180,tA,OR,{cls:o.c1,d:o.d1})+aLab(0,b,tB,BL,{cls:o.c2,d:o.d2})+ptN(180,'A')+ptN(0,'C')+ptN(b,'B')+oN+(o.post||''),'זוויות צמודות');}
/* חוצה זווית: ∠AOB = 2h, OD באמצע */
function bisDia(h,tA,tH,o={}){const a0=h*2>150?8:22,a1=a0+2*h,m=a0+h;
 return svgA(sec(a0,m,GR,{cls:o.c1,d:o.d1})+sec(m,a1,GR,{op:.55,cls:o.c1,d:o.d1})+ray(a0)+ray(a1)+ray(m,{c:PU,w:4,cls:o.cr||'',d:o.dr||0})+tick((a0+m)/2,{cls:o.c1,d:o.d1})+tick((m+a1)/2,{cls:o.c1,d:o.d1})
  +(tH?aLab(a0,m,tH,GR,{rr:96,cls:o.c3,d:o.d3}):'')+(tA?`<text x="12" y="28" text-anchor="start" font-size="19" font-weight="800" fill="${OR}" stroke="#13233a" stroke-width="5" paint-order="stroke" style="font-family:Rubik" direction="ltr">∢AOB = ${tA}</text>`:'')
  +ptN(a0,'A')+ptN(a1,'B')+ptN(m,'D')+oN,'חוצה זווית');}
/* חוצה + צמודות: ישר AOC, ∠AOB = th, OD חוצה את ∠BOC */
function bisAdjDia(th,o={}){const b=180-th,m=b/2;return svgA(sec(b,180,OR)+sec(0,m,BL,{op:.55,cls:o.c,d:o.d})+sec(m,b,BL,{cls:o.c,d:o.d})+ray(0)+ray(180)+ray(b)+ray(m,{c:PU,w:4})+tick(m/2,{cls:o.c,d:o.d})+tick((m+b)/2,{cls:o.c,d:o.d})
 +aLab(b,180,th+deg,OR)+aLab(m,b,o.q||'?',BL,{rr:92})+ptN(180,'A')+ptN(0,'C')+ptN(b,'B')+ptN(m,'D')+oN,'חוצה זווית וזוויות צמודות');}
/* משולש שווה שוקיים: זווית ראש h */
function isoDia(h,tTop,tBase,o={}){const b=(180-h)/2,L=[70,240],Rr=[330,240],half=130,ht=Math.min(185,half*Math.tan(rd(b))),T=[200,240-ht];
 const s=(V,P,Q,col,cls,d)=>{const a=Math.atan2(V[1]-P[1],P[0]-V[0])*180/Math.PI,c=Math.atan2(V[1]-Q[1],Q[0]-V[0])*180/Math.PI;let a0=a,a1=c;let dd=((a1-a0)%360+360)%360;if(dd>180){[a0,a1]=[a1,a0];dd=360-dd;}const r=30,p0=[V[0]+r*Math.cos(rd(a0)),V[1]-r*Math.sin(rd(a0))],p1=[V[0]+r*Math.cos(rd(a0+dd)),V[1]-r*Math.sin(rd(a0+dd))];
  return {p:`<path class="${cls||''}" style="--d:${d||0}s" d="M${f(V[0])} ${f(V[1])} L${f(p0[0])} ${f(p0[1])} A${r} ${r} 0 0 0 ${f(p1[0])} ${f(p1[1])} Z" fill="${col}" fill-opacity=".85"/>`,m:a0+dd/2};};
 const tx=(V,m,t,col,cls,d)=>`<text class="${cls||''}" style="--d:${d||0}s;font-family:Rubik" x="${f(V[0]+62*Math.cos(rd(m)))}" y="${f(V[1]-62*Math.sin(rd(m))+7)}" text-anchor="middle" font-size="19" font-weight="800" fill="${col}" stroke="#13233a" stroke-width="5" paint-order="stroke" direction="ltr">${t}</text>`;
 const sT=s(T,L,Rr,PU),sL=s(L,T,Rr,BL,o.cb,o.db),sR=s(Rr,T,L,BL,o.cb,o.db);
 const mk=(P)=>{const mx=(P[0]+T[0])/2,my=(P[1]+T[1])/2,dx=T[0]-P[0],dy=T[1]-P[1],l=Math.hypot(dx,dy),nx=-dy/l*9,ny=dx/l*9;return `<line x1="${f(mx-nx)}" y1="${f(my-ny)}" x2="${f(mx+nx)}" y2="${f(my+ny)}" stroke="${OR}" stroke-width="4"/>`;};
 return `<svg viewBox="0 0 400 290" role="img" aria-label="משולש שווה שוקיים"><polygon points="${T.join(',')} ${L.join(',')} ${Rr.join(',')}" fill="#ffffff08" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>${sT.p}${sL.p}${sR.p}${mk(L)}${mk(Rr)}
 ${tTop?tx(T,sT.m,tTop,PU):''}${tBase?tx(L,sL.m,tBase,BL,o.cb,o.db)+tx(Rr,sR.m,o.tBase2||tBase,BL,o.cb,o.db):''}
 <text x="${T[0]}" y="${T[1]-12}" text-anchor="middle" font-size="19" font-weight="800" fill="#9fb3cc" style="font-family:Rubik">A</text><text x="${L[0]-16}" y="${L[1]+8}" font-size="19" font-weight="800" fill="#9fb3cc" style="font-family:Rubik">B</text><text x="${Rr[0]+6}" y="${Rr[1]+8}" font-size="19" font-weight="800" fill="#9fb3cc" style="font-family:Rubik">C</text>
 <text x="392" y="282" text-anchor="end" font-size="14" fill="#9fb3cc" direction="rtl">AB = AC · השרטוט אינו מדויק</text></svg>`;}

/* ================= ציר מספרים ================= */
function nl(a,b,o={}){const pts=[0,a,a+b].concat(o.extra||[]);let lo=Math.min(-6,...pts)-1,hi=Math.max(6,...pts)+1;while(hi-lo>24){lo++;hi--;}
 const W=400,X0=18,X1=382,u=(X1-X0)/(hi-lo),X=v=>X0+(v-lo)*u,Y=150;let s=`<svg viewBox="0 0 ${W} 200" role="img" aria-label="ציר מספרים" style="direction:ltr">`;
 s+=`<line x1="${X0-6}" y1="${Y}" x2="${X1+6}" y2="${Y}" stroke="${INK}" stroke-width="3"/>`;
 for(let v=lo;v<=hi;v++){s+=`<line x1="${f(X(v))}" y1="${Y-7}" x2="${f(X(v))}" y2="${Y+7}" stroke="${v===0?OR:'#9fb3cc'}" stroke-width="${v===0?4:2}"/>`;if((hi-lo<=16)||v%2===0||v===0)s+=`<text x="${f(X(v))}" y="${Y+30}" text-anchor="middle" font-size="${hi-lo>16?13:16}" font-weight="700" fill="${v===0?OR:v<0?RD:GR}" style="font-family:Rubik">${N(v)}</text>`;}
 const arw=(p,q,y,col,d,t)=>{if(p===q)return '';const x1=X(p),x2=X(q),dir=q>p?1:-1;return `<g class="rv" style="--d:${d}s"><path d="M${f(x1)} ${y} Q${f((x1+x2)/2)} ${y-46} ${f(x2)} ${y}" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round"/><path d="M${f(x2)} ${y} l${-dir*11} -9 M${f(x2)} ${y} l${-dir*3} -13" stroke="${col}" stroke-width="4" stroke-linecap="round"/><text x="${f((x1+x2)/2)}" y="${y-48}" text-anchor="middle" font-size="18" font-weight="800" fill="${col}" style="font-family:Rubik">${t}</text></g>`;};
 if(o.mode==='abs'){s+=arw(0,a,Y-8,OR,.3,'מרחק '+Math.abs(a));if(o.extra)s+=arw(0,o.extra[0],Y-8,OR,.9,'מרחק '+Math.abs(o.extra[0]));}
 else if(o.mode==='opp'){s+=arw(0,a,Y-8,SC(a),.3,N(a))+arw(0,-a,Y-8,SC(-a),1.1,N(-a));}
 else{s+=arw(0,a,Y-8,SC(a),.3,N(a));s+=arw(a,a+b,Y-62,SC(b),1.1,(b<0?'':'+')+N(b));s+=`<circle class="rv" style="--d:1.9s" cx="${f(X(a+b))}" cy="${Y}" r="8" fill="${PU}"/>`;}
 return s+'</svg>';}
/* שורות מונפשות של תרגיל */
function rows(R2,o={}){let y=46,s='';R2.forEach((r,i)=>{s+=`<text class="rv" style="--d:${(o.d||.3)+i*(o.gap||1.1)}s;font-family:Rubik" x="200" y="${y}" text-anchor="middle" font-size="${r.fs||32}" font-weight="800" direction="ltr">${r.p.map(([t,c])=>`<tspan fill="${c||INK}">${t}</tspan>`).join('')}</text>`;y+=r.fs?r.fs+22:56;});
 return `<svg viewBox="0 0 400 ${y-10}" role="img" aria-label="תרגיל" style="max-width:380px">${s}</svg>`;}

/* ================= מחוללים: זוויות ================= */
const TYPES=['חדה','ישרה','קהה','שטוחה'];
const typeOf=v=>v<90?0:v===90?1:v<180?2:3;
function gType(){const k=R(0,3),v=[R(3,17)*5,90,R(19,34)*5,180][k];
 return {kind:'סוג הזווית',text:`הזווית היא ${M(v+deg)}. איזו זווית היא?`,dia:()=>angOne(v,[OR,GR,BL,PU][k],{t:v+deg}),choice:TYPES.slice(),correct:k,
  lines:[`${M(v+deg)} ${k===0?'קטנה מ־'+M('90°'):k===1?'שווה בדיוק '+M('90°'):k===2?'בין '+M('90°')+' ל־'+M('180°'):'שווה '+M('180°')+': קו ישר'}.`,`ולכן היא <b>${TYPES[k]}</b>.`],
  rule:'חדה – קטנה מ־'+M('90°')+'. ישרה – בדיוק '+M('90°')+'. קהה – בין '+M('90°')+' ל־'+M('180°')+'. שטוחה – '+M('180°')+'.',trick:'משווים ל־90°: קטנה ← חדה, גדולה ← קהה.',
  diag:({sel})=>sel===0&&v>90?M(v+deg)+' <b>גדולה</b> מ־'+M('90°')+', ולכן היא לא חדה.':sel===2&&v<90?M(v+deg)+' <b>קטנה</b> מ־'+M('90°')+', ולכן היא לא קהה.':'בודקים: קטנה, שווה או גדולה מ־'+M('90°')+'?'};}
function gAdj(hard){const th=hard?R(21,79)*2+1-1+R(0,1):R(4,16)*10,v=180-th;
 return {kind:'זוויות צמודות',text:`הזוויות ${C(M('∢AOB'),OR)} ו־${C(M('∢BOC'),BL)} צמודות. ${C(M('∢AOB'),OR)} = ${M(th+deg)}. כמה מעלות ${C(M('∢BOC'),BL)}?`,
  dia:h=>adjDia(th,th+deg,h?v+deg:'?',{post:h?`<text class="rv" style="--d:.8s;font-family:Rubik" x="200" y="30" text-anchor="middle" font-size="19" font-weight="800" fill="${GR}" direction="ltr">${th}° + ${v}° = 180°</text>`:''}),
  ans:[{label:'\u200e∢BOC',col:BL,val:v}],work:[{t:'זוויות צמודות. כמה הסכום שלהן?',choice:['180°','90°','360°'],correct:0,why:'שתי זוויות צמודות יחד הן <b>קו ישר</b>: '+M('180°')+'.'},{t:M('180° − '+th+'° = ?'),ans:[{label:'',val:v}],why:'מחסירים את הזווית הידועה מ־'+M('180°')+'.'}],
  lines:['צמודות ← יחד קו ישר ← '+M('180°'),M('180° − '+th+'° = '+v+'°')],rule:'סכום זוויות צמודות הוא 180°.',trick:'צמודות ← מ־180° מחסירים.',
  diag:({vals:[x]})=>x===th?'זוויות צמודות <b>לא שוות</b>! יחד הן '+M('180°')+'.':x===90-th||x===Math.abs(90-th)?'צמודות משלימות ל־'+M('180°')+', לא ל־'+M('90°')+'.':x===360-th?'צמודות משלימות ל־'+M('180°')+', לא ל־'+M('360°')+'.':x+th!==180?'בדקו את החיסור: '+M(th+'° + ? = 180°')+'.':null};}
function gAdjX(){const kind=R(0,1);let x0,eq,exB,big,ws;
 if(kind===0){const k=pick([2,3,4,5]);x0=180/(k+1);if(!Number.isInteger(x0))return gAdjX();exB=k+'x';big=k*x0;eq=`x + ${k}x = 180`;ws=[{t:`כונסים: ${M('x + '+k+'x = ?x')}`,ans:[{label:'',val:k+1}],why:M('x')+' הוא '+M('1x')+': '+M('1 + '+k+' = '+(k+1))+'.'},{t:M((k+1)+'x = 180')+' ← '+M('x = ?'),ans:[{label:'x =',val:x0}],why:'מחלקים את 180 ב־'+M(k+1)+'.'},{t:`הזווית ${C(M('∢BOC'),BL)} = ${M(k+' · '+x0+' = ?')}`,ans:[{label:'',val:big}],why:'מציבים את x בביטוי.'}];}
 else{const d=pick([20,30,40,50,60,70,80]);x0=(180-d)/2;exB='x + '+d;big=x0+d;eq=`x + x + ${d} = 180`;ws=[{t:`${M(eq)}. מעבירים: ${M('2x = ?')}`,ans:[{label:'',val:180-d}],why:'מספר שעובר לצד השני <b>מחליף סימן</b>: '+M('180 − '+d)+'.'},{t:M('2x = '+(180-d))+' ← '+M('x = ?'),ans:[{label:'x =',val:x0}],why:'מחלקים ב־2.'},{t:`${C(M('∢BOC'),BL)} = ${M(x0+' + '+d+' = ?')}`,ans:[{label:'',val:big}],why:'מציבים את x בביטוי.'}];}
 return {kind:'צמודות עם x',text:`${C(M('∢AOB'),OR)} ו־${C(M('∢BOC'),BL)} צמודות. ${C(M('∢AOB'),OR)} = ${M('x')}, ${C(M('∢BOC'),BL)} = ${M(exB)}. מצאו את x ואת ${C(M('∢BOC'),BL)}.`,
  dia:()=>adjDia(x0,'x',exB),ans:[{label:'x =',col:PU,val:x0},{label:'\u200e∢BOC',col:BL,val:big}],work:[{t:'מה המשוואה?',choice:[`x + ${exB} = 180`,`x = ${exB}`,`x + ${exB} = 90`],correct:0,why:'צמודות ← מחברים ומשווים ל־180.'},...ws],
  crack:[CK('מה נתון?',['שתי זוויות צמודות','שתי זוויות שוות','משולש'],'שתי זוויות צמודות','הזוויות צמודות: יחד קו ישר.'),CK('מה עושים?',['מחברים ומשווים ל־180','משווים את הביטויים','מחברים ל־360'],'מחברים ומשווים ל־180','צמודות ← סכומן 180°.')],
  lines:[M(eq),M('x = '+x0),`${C(M('∢BOC'),BL)} = ${M(big+deg)}`],rule:'צמודות ← מחברים את הביטויים ומשווים ל־180, ואז מציבים.',trick:'מצאתם x? עוד לא סיימתם: מציבים!',
  diag:({vals:[x,y]})=>x===x0&&y!==big?'את x מצאתם! עכשיו <b>מציבים</b> את x ב־'+M(exB)+'.':y===x0?'x הוא לא '+C(M('∢BOC'),BL)+'. מציבים אותו בביטוי.':null};}
function gBis(dir){const h=R(5,40)*2,w=2*h,up=dir??Math.random()<.5;
 if(up)return {kind:'חוצה זווית',text:`${C('OD',PU)} חוצה את ${M('∢AOB')}. ${M('∢AOB = '+w+'°')}. כמה מעלות ${C(M('∢AOD'),GR)}?`,dia:hl=>bisDia(h,w+deg,hl?h+deg:'?'),ans:[{label:'\u200e∢AOD',col:GR,val:h}],
  work:[{t:'חוצה זווית מחלק את הזווית ל…',choice:['שני חלקים שווים','שלושה חלקים','שני חלקים לא שווים'],correct:0,why:'חוצה = חוצה <b>לשני חלקים שווים</b>.'},{t:M(w+' : 2 = ?'),ans:[{label:'',val:h}],why:'חצי מהזווית: מחלקים ב־2.'}],
  lines:['חוצה ← שני חצאים שווים',M(w+'° : 2 = '+h+'°')],rule:'חוצה זווית מחלק אותה לשתי זוויות שוות: כל חצי = הזווית : 2.',trick:'חוצה ← מחלקים ב־2.',
  diag:({vals:[x]})=>x===w*2?'כפלתם ב־2. החוצה <b>מחלק</b>: '+M(w+' : 2')+'.':x===180-w?'זו לא שאלה על צמודות. החוצה מחלק את '+M('∢AOB')+' לשניים.':null};
 return {kind:'חוצה זווית',text:`${C('OD',PU)} חוצה את ${M('∢AOB')}. ${C(M('∢AOD'),GR)} = ${M(h+deg)}. כמה מעלות ${M('∢AOB')}?`,dia:hl=>bisDia(h,hl?w+deg:'?',h+deg),ans:[{label:'\u200e∢AOB',col:OR,val:w}],
  work:[{t:`${C(M('∢AOD'),GR)} היא…`,choice:['חצי מ־\u200e∢AOB','כל \u200e∢AOB','פי 2 מ־\u200e∢AOB'],correct:0,why:'החוצה יוצר שני חצאים: '+M('∢AOD')+' הוא חצי אחד.'},{t:M(h+' · 2 = ?'),ans:[{label:'',val:w}],why:'שני חצאים = הזווית כולה.'}],
  lines:['חצי + חצי = הזווית כולה',M(h+'° · 2 = '+w+'°')],rule:'חוצה זווית: הזווית כולה = חצי · 2.',trick:'נתון החצי? כופלים ב־2.',
  diag:({vals:[x]})=>x===h/2?''+M('∢AOD')+' הוא כבר החצי. את הזווית כולה מקבלים ב<b>כפל</b> ב־2.':x===h?'זה רק החצי. הזווית כולה גדולה פי 2.':null};}
function gBisAdj(){const th=R(5,15)*10+pick([0,0,20]),b=180-th,m=b/2;if(!Number.isInteger(m)||th>=170)return gBisAdj();
 return {kind:'חוצה + צמודות',text:`${M('A, O, C')} על ישר אחד. ${C(M('∢AOB'),OR)} = ${M(th+deg)}. ${C('OD',PU)} חוצה את ${C(M('∢BOC'),BL)}. כמה מעלות ${C(M('∢BOD'),BL)}?`,dia:hl=>bisAdjDia(th,{q:hl?m+deg:'?'}),ans:[{label:'\u200e∢BOD',col:BL,val:m}],
  crack:[CK('מה נתון?',['\u200e∢AOB וחוצה של \u200e∢BOC','רק \u200e∢BOC','משולש'],'\u200e∢AOB וחוצה של \u200e∢BOC','נתונים '+M('∢AOB')+' ו־'+M('OD')+' שחוצה את '+M('∢BOC')+'.'),CK('מה עושים קודם?',['מוצאים את \u200e∢BOC','מחלקים את \u200e∢AOB ב־2','מחברים ל־360'],'מוצאים את \u200e∢BOC','קודם הזווית הצמודה, אחר כך החצי.')],
  work:[{t:`קודם ${C(M('∢BOC'),BL)} (צמודה): ${M('180° − '+th+'° = ?')}`,ans:[{label:'',val:b}],why:'צמודות ← '+M('180°')+'.'},{t:`חצי: ${M(b+' : 2 = ?')}`,ans:[{label:'',val:m}],why:'החוצה מחלק את '+M('∢BOC')+' לשני חלקים שווים.'}],
  lines:[`צמודות: ${C(M('∢BOC'),BL)} = ${M('180° − '+th+'° = '+b+'°')}`,`חוצה: ${M(b+'° : 2 = '+m+'°')}`],rule:'שני צעדים: צמודות (180°) ← ואז חוצה (: 2).',trick:'קודם הזווית כולה, אחר כך החצי.',
  diag:({vals:[x]})=>x===b?'זו כל '+M('∢BOC')+'. החוצה מחלק אותה לשניים.':x===th/2?'חילקתם את '+M('∢AOB')+'. החוצה חוצה את '+M('∢BOC')+' – קודם מוצאים אותה.':x===180-m?'בדקו: מבקשים רק את החצי '+M('∢BOD')+'.':null};}
function gIso(dir){const up=dir??Math.random()<.5;
 if(up){const top=R(5,34)*4+pick([0,2]),b=(180-top)/2;
  return {kind:'משולש שווה שוקיים',text:`במשולש שווה שוקיים ${M('AB = AC')}. זווית הראש ${C(M('∢A'),PU)} = ${M(top+deg)}. כמה מעלות כל ${C('זווית בסיס',BL)}?`,dia:h=>isoDia(top,top+deg,h?b+deg:'?'),ans:[{label:'\u200e∢B',col:BL,val:b}],
   work:[{t:'שתי זוויות הבסיס יחד: '+M('180° − '+top+'° = ?'),ans:[{label:'',val:180-top}],why:'סכום הזוויות במשולש '+M('180°')+'.'},{t:'זוויות הבסיס שוות. כל אחת: '+M((180-top)+' : 2 = ?'),ans:[{label:'',val:b}],why:'שתי זוויות <b>שוות</b> ← מחלקים ב־2.'}],
   lines:['במשולש: '+M('180°')+'. שתי זוויות הבסיס שוות.',M('180° − '+top+'° = '+(180-top)+'°'),M((180-top)+'° : 2 = '+b+'°')],rule:'במשולש שווה שוקיים זוויות הבסיס שוות. סכום הזוויות במשולש 180°.',trick:'מ־180 מורידים את הראש, ומחלקים ב־2.',
   diag:({vals:[x]})=>x===180-top?'זה הסכום של <b>שתי</b> זוויות הבסיס. מחלקים ב־2.':x===top?'זוויות הבסיס שוות זו לזו, לא לזווית הראש.':x===(180-top/2)?'קודם מחסירים מ־180, אחר כך מחלקים.':null};}
 const b=R(16,43)*2+pick([0,1]),top=180-2*b;
 return {kind:'משולש שווה שוקיים',text:`במשולש שווה שוקיים ${M('AB = AC')}. ${C(M('∢B'),BL)} = ${M(b+deg)}. כמה מעלות זווית הראש ${C(M('∢A'),PU)}?`,dia:h=>isoDia(top,h?top+deg:'?',b+deg),ans:[{label:'\u200e∢A',col:PU,val:top}],
  work:[{t:`${C(M('∢C'),BL)} שווה ל־${C(M('∢B'),BL)}. ${M('∢C = ?')}`,ans:[{label:'',val:b}],why:'זוויות הבסיס שוות.'},{t:M(b+' + '+b+' = ?'),ans:[{label:'',val:2*b}],why:'שתי זוויות הבסיס יחד.'},{t:M('180 − '+2*b+' = ?'),ans:[{label:'',val:top}],why:'מה שנשאר מ־'+M('180°')+'.'}],
  lines:[`${M('∢C = \u200e∢B = '+b+'°')}`,M('180° − '+b+'° − '+b+'° = '+top+'°')],rule:'זוויות הבסיס שוות. זווית הראש = 180° פחות שתיהן.',trick:'שתי זוויות בסיס! מורידים פעמיים.',
  diag:({vals:[x]})=>x===180-b?'הורדתם רק זווית בסיס אחת. יש <b>שתיים</b>: '+M('180 − '+b+' − '+b)+'.':x===b?'זווית הראש לא שווה לזוויות הבסיס (רק שתי זוויות הבסיס שוות).':null};}
function gIsoCan(){const c=R(0,3);let v,role,ok,why;
 if(c===0){v=pick([90,95,100,110,120]);role='זווית בסיס';ok=false;why=`שתי זוויות בסיס: ${M(v+' + '+v+' = '+2*v+'°')}. זה כבר ${v===90?'180°, ולא נשאר מקום לזווית הראש':'יותר מ־180°'}.`;}
 else if(c===1){v=pick([100,120,140,150]);role='זווית ראש';ok=true;why=`${M('180 − '+v+' = '+(180-v))}, ולכל זווית בסיס ${M((180-v)/2+'°')}. אפשר.`;}
 else if(c===2){v=pick([80,85,70,89]);role='זווית בסיס';ok=true;why=`${M(v+' + '+v+' = '+2*v+'°')}, ולזווית הראש נשאר ${M(180-2*v+'°')}. אפשר.`;}
 else{v=180;role='זווית ראש';ok=false;why=`אם זווית הראש ${M('180°')}, לזוויות הבסיס לא נשאר כלום. אין משולש כזה.`;}
 return {kind:'האם זה אפשרי?',text:`האם יכול להיות משולש שווה שוקיים שבו <b>${role}</b> היא ${M(v+deg)}?`,choice:['כן, אפשר','לא, אי אפשר'],correct:ok?0:1,
  crack:[CK('מה ידוע על זוויות הבסיס?',['הן שוות','הן משלימות ל־90°','אין קשר'],'הן שוות','במשולש שווה שוקיים זוויות הבסיס שוות.')],
  lines:[why,ok?'ולכן <b>אפשר</b>.':'ולכן <b>אי אפשר</b>.'],rule:'בודקים: האם שלוש הזוויות יכולות להיות ביחד 180°, וכל אחת גדולה מ־0?',trick:'זווית בסיס תמיד חדה!',
  diag:()=>why};}

/* ================= משולשים: סכום זוויות, סוגים, יחסי הכלה ================= */
/* משולש לפי שתי זוויות הבסיס B (שמאל) ו־C (ימין); ראש למעלה */
function triPts(Bd,Cd){let L=[60,236],Rr=[340,236];const A=180-Bd-Cd,base=280,t=base*Math.sin(rd(Cd))/Math.sin(rd(A));let T=[L[0]+t*Math.cos(rd(Bd)),L[1]-t*Math.sin(rd(Bd))];
 if(T[1]<34){const k=(L[1]-34)/(L[1]-T[1]),cx=200,sc=p=>[cx+(p[0]-cx)*k,L[1]-(L[1]-p[1])*k];T=sc(T);L=sc(L);Rr=sc(Rr);}return {T,L,R:Rr};}
function cornerAt(V,P,Q,col,o={}){const a=Math.atan2(V[1]-P[1],P[0]-V[0])*180/Math.PI,c=Math.atan2(V[1]-Q[1],Q[0]-V[0])*180/Math.PI;let a0=a,dd=((c-a)%360+360)%360;if(dd>180){a0=c;dd=360-dd;}
 const r=o.r||30,p0=[V[0]+r*Math.cos(rd(a0)),V[1]-r*Math.sin(rd(a0))],p1=[V[0]+r*Math.cos(rd(a0+dd)),V[1]-r*Math.sin(rd(a0+dd))],m=a0+dd/2,rr=r+(dd<40?32:24);
 return `<g class="${o.cls||''}" style="--d:${o.d||0}s"><path d="M${f(V[0])} ${f(V[1])} L${f(p0[0])} ${f(p0[1])} A${r} ${r} 0 0 0 ${f(p1[0])} ${f(p1[1])} Z" fill="${col}" fill-opacity=".85"/>${o.t?`<text x="${f(V[0]+rr*Math.cos(rd(m)))}" y="${f(V[1]-rr*Math.sin(rd(m))+7)}" text-anchor="middle" font-size="19" font-weight="800" fill="${col}" stroke="#13233a" stroke-width="5" paint-order="stroke" style="font-family:Rubik" direction="ltr">${o.t}</text>`:''}</g>`;}
function triDia(Bd,Cd,tA,tB,tC,o={}){const {T,L,R:Rr}=triPts(Bd,Cd);
 return `<svg viewBox="0 0 400 ${o.h||280}" role="img" aria-label="משולש"><polygon points="${T.map(f).join(',')} ${L.map(f).join(',')} ${Rr.map(f).join(',')}" fill="#ffffff08" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
 ${cornerAt(T,L,Rr,PU,{t:tA,cls:o.ca,d:o.da})}${cornerAt(L,T,Rr,OR,{t:tB})}${cornerAt(Rr,T,L,BL,{t:tC})}
 <text x="${f(T[0])}" y="${f(T[1]-12)}" text-anchor="middle" font-size="19" font-weight="800" fill="#9fb3cc" style="font-family:Rubik">A</text><text x="${f(L[0]-18)}" y="${f(L[1]+8)}" font-size="19" font-weight="800" fill="#9fb3cc" style="font-family:Rubik">B</text><text x="${f(Rr[0]+6)}" y="${f(Rr[1]+8)}" font-size="19" font-weight="800" fill="#9fb3cc" style="font-family:Rubik">C</text>
 ${o.post||''}<text x="392" y="${(o.h||280)-6}" text-anchor="end" font-size="14" fill="#9fb3cc" direction="rtl">השרטוט אינו מדויק</text></svg>`;}
function tri3(){let a,b;do{a=R(3,16)*5;b=R(3,16)*5;}while(a+b>=170||a+b<=40);return [a,b,180-a-b];}
const ANG_T=['חד־זווית','ישר־זווית','קהה־זווית'],SIDE_T=['שונה צלעות','שווה שוקיים','שווה צלעות'];
function gTriSum(hard){let [a,b,c]=hard?[R(21,79),R(21,79),0]:tri3();if(hard){if(a+b>=175)return gTriSum(true);c=180-a-b;}
 return {kind:'סכום הזוויות במשולש',text:`במשולש ${M('ABC')}: ${C(M('∢B'),OR)} = ${M(a+deg)}, ${C(M('∢C'),BL)} = ${M(b+deg)}. כמה מעלות ${C(M('∢A'),PU)}?`,dia:h=>triDia(a,b,h?c+deg:'?',a+deg,b+deg),ans:[{label:'‎∢A',col:PU,val:c}],
  work:[{t:'סכום הזוויות במשולש הוא…',choice:['180°','360°','90°'],correct:0,why:'שלוש הזוויות של <b>כל</b> משולש ביחד: '+M('180°')+'.'},{t:M(a+' + '+b+' = ?'),ans:[{label:'',val:a+b}],why:'מחברים את שתי הזוויות הידועות.'},{t:M('180 − '+(a+b)+' = ?'),ans:[{label:'',val:c}],why:'מה שנשאר מ־'+M('180°')+'.'}],
  lines:[M(a+'° + '+b+'° = '+(a+b)+'°'),M('180° − '+(a+b)+'° = '+c+'°')],rule:'סכום הזוויות בכל משולש הוא 180°.',trick:'מחברים את הידועות, ומורידים מ־180.',
  diag:({vals:[x]})=>x===360-a-b?'במשולש '+M('180°')+', לא '+M('360°')+'.':x===a+b?'זה הסכום של שתי הזוויות. מה <b>נשאר</b> מ־'+M('180°')+'?':x===180-a||x===180-b?'הורדתם רק זווית אחת. מורידים את <b>שתיהן</b>.':null};}
function gTriType(){let k=R(0,2),a,b,c;if(k===1){a=R(4,13)*5;b=90-a;c=90;}else if(k===2){c=R(19,30)*5;a=R(3,(180-c)/5-3)*5;b=180-c-a;}else{do{[a,b,c]=tri3();}while(Math.max(a,b,c)>=90);}
 const ang=shuf([a,b,c]);return {kind:'סוג המשולש לפי זוויות',text:`הזוויות של משולש הן ${M(ang.join('°, ')+'°')}. איזה משולש זה?`,dia:()=>triDia(ang[1],ang[2],ang[0]+deg,ang[1]+deg,ang[2]+deg),choice:ANG_T.slice(),correct:k,
  lines:[`הזווית הגדולה: ${M(Math.max(a,b,c)+'°')} ← ${k===0?'חדה':k===1?'ישרה':'קהה'}.`,`ולכן המשולש <b>${ANG_T[k]}</b>.`],rule:'מסתכלים על הזווית הגדולה: חדה ← חד־זווית, ישרה ← ישר־זווית, קהה ← קהה־זווית.',trick:'מספיקה זווית אחת ישרה או קהה כדי לתת שם למשולש.',
  diag:({sel})=>'בודקים רק את הזווית הגדולה: '+M(Math.max(a,b,c)+'°')+'.'};}
function gTriSides(){const k=R(0,2);let s;if(k===2){const x=R(3,12);s=[x,x,x];}else if(k===1){const x=R(4,12);let y;do{y=R(3,15);}while(y===x||y>=2*x);s=shuf([x,x,y]);}else{do{s=[R(3,12),R(3,12),R(3,12)].sort((a,b)=>a-b);}while(new Set(s).size<3||s[0]+s[1]<=s[2]);s=shuf(s);}
 return {kind:'סוג המשולש לפי צלעות',text:`אורכי הצלעות של משולש: ${M(s.join(', '))} ס״מ. איזה משולש זה? (בחרו את השם <b>המדויק</b> ביותר)`,choice:SIDE_T.slice(),correct:k,
  lines:[k===2?'שלוש הצלעות שוות.':k===1?'בדיוק שתי צלעות שוות (השוקיים).':'אין שתי צלעות שוות.',`ולכן <b>${SIDE_T[k]}</b>.`],rule:'שונה צלעות – אין צלעות שוות. שווה שוקיים – לפחות 2 שוות. שווה צלעות – 3 שוות.',trick:'סופרים כמה צלעות שוות.',
  diag:({sel})=>sel===1&&k===2?'נכון שהוא גם שווה שוקיים, אבל השם <b>המדויק</b> הוא שווה צלעות.':'סופרים: כמה צלעות שוות?'};}
function gEqui(){const c=R(0,1);if(c===0)return {kind:'משולש שווה צלעות',text:`במשולש שווה צלעות, כמה מעלות כל זווית?`,dia:h=>triDia(60,60,h?'60°':'?',h?'60°':'?',h?'60°':'?'),ans:[{label:'כל זווית',val:60}],
  work:[{t:'במשולש שווה צלעות הזוויות…',choice:['כולן שוות','שתיים שוות','שונות'],correct:0,why:'שלוש צלעות שוות ← שלוש זוויות שוות.'},{t:M('180 : 3 = ?'),ans:[{label:'',val:60}],why:'מחלקים את '+M('180°')+' לשלושה חלקים שווים.'}],
  lines:['שלוש זוויות שוות',M('180° : 3 = 60°')],rule:'במשולש שווה צלעות כל זווית היא 60°.',trick:'שווה צלעות ← 60°, 60°, 60°.',diag:({vals:[x]})=>x===180?'זה הסכום של שלוש הזוויות. מחלקים ב־3.':x===90?'אין כאן זווית ישרה. '+M('180 : 3')+'.':null};
 const a=R(3,15);return {kind:'משולש שווה צלעות',text:`היקף משולש שווה צלעות הוא ${M(3*a)} ס״מ. מה אורך כל צלע?`,ans:[{label:'צלע',val:a,unit:'ס״מ'}],work:[{t:'כמה צלעות שוות יש?',ans:[{label:'',val:3}],why:'שווה צלעות: 3 צלעות שוות.'},{t:M(3*a+' : 3 = ?'),ans:[{label:'',val:a}],why:'מחלקים את ההיקף ב־3.'}],
  lines:['3 צלעות שוות',M(3*a+' : 3 = '+a)+' ס״מ'],rule:'היקף = סכום הצלעות. בשווה צלעות: צלע = היקף : 3.',trick:'שווה צלעות ← מחלקים ב־3.',diag:({vals:[x]})=>x===3*a*3?'כפלתם. מהיקף לצלע <b>מחלקים</b> ב־3.':null};}
const INCL=[['כל משולש שווה צלעות הוא גם שווה שוקיים.',1,'יש לו 3 צלעות שוות, ולכן בוודאי שתיים שוות.'],['כל משולש שווה שוקיים הוא גם שווה צלעות.',0,'לדוגמה צלעות 5, 5, 8: שווה שוקיים, אבל לא שווה צלעות.'],['יש משולש ישר־זווית שהוא גם שווה שוקיים.',1,'למשל זוויות '+M('90°, 45°, 45°')+'.'],['יש משולש שווה צלעות שהוא קהה־זווית.',0,'בשווה צלעות כל הזוויות '+M('60°')+': הוא תמיד חד־זווית.'],['יש משולש עם שתי זוויות ישרות.',0,M('90° + 90° = 180°')+', ולזווית השלישית לא נשאר כלום.'],['במשולש קהה־זווית שתי הזוויות האחרות חדות.',1,'קהה גדולה מ־'+M('90°')+', ולשתיים האחרות נשאר פחות מ־'+M('90°')+'.'],['יש משולש שונה צלעות שהוא ישר־זווית.',1,'למשל צלעות 3, 4, 5.'],['משולש שווה צלעות הוא סוג מיוחד של שווה שוקיים.',1,'שווה צלעות "נמצא בתוך" משפחת השווי שוקיים.'],['יש משולש שווה שוקיים שבו זוויות הבסיס קהות.',0,'שתי זוויות קהות הן כבר יותר מ־'+M('180°')+'.']];
function gIncl(){const [s,ok,why]=pick(INCL);return {kind:'יחסי הכלה',text:s,choice:['נכון','לא נכון'],correct:ok?0:1,dia:h=>h?inclSvg():'',
  crack:[CK('מה בודקים?',['האם זה נכון תמיד, או שיש דוגמה נגדית','רק את המשולש בשרטוט','את ההיקף'],'האם זה נכון תמיד, או שיש דוגמה נגדית','מחפשים דוגמה שמראה שזה לא נכון.')],
  lines:[why,ok?'ולכן <b>נכון</b>.':'ולכן <b>לא נכון</b>.'],rule:'שווה צלעות ⊂ שווה שוקיים ⊂ משולשים. "כל" ← בודקים אם יש דוגמה נגדית.',trick:'כל שווה צלעות הוא שווה שוקיים, אבל לא להפך.',diag:()=>why};}
function gTriX(){const c=R(0,2);let ex,x0,eq,ang;
 if(c===0){const k=pick([[1,2,3],[1,1,2],[2,3,4],[1,2,2],[1,3,5],[2,3,7]]),s=k[0]+k[1]+k[2];if(180%s)return gTriX();x0=180/s;ex=k.map(v=>v===1?'x':v+'x');ang=k.map(v=>v*x0);eq=ex.join(' + ')+' = 180';}
 else{const d=pick([10,20,30,40]);x0=60-d;ex=['x','x + '+d,'x + '+2*d];ang=[x0,x0+d,x0+2*d];eq='3x + '+3*d+' = 180';}
 const big=Math.max(...ang);return {kind:'זוויות המשולש עם x',text:`זוויות המשולש: ${M(ex.join(', '))}. מצאו את x ואת הזווית <b>הגדולה</b>.`,dia:()=>triDia(ang[1],ang[2],ex[0],ex[1],ex[2]),ans:[{label:'x =',col:PU,val:x0},{label:'הזווית הגדולה',col:BL,val:big}],
  crack:[CK('מה המשוואה?',[ex.join(' + ')+' = 180',ex.join(' + ')+' = 360',ex.join(' + ')+' = 90'],ex.join(' + ')+' = 180','סכום הזוויות במשולש 180°.')],
  work:[{t:'כונסים: '+M(eq.replace(/ = 180$/,''))+' = ?',choice:[M(eq),M(eq.replace('180','360'))],correct:0,why:'x עם x, מספר עם מספר.'},{t:M(eq)+' ← '+M('x = ?'),ans:[{label:'x =',val:x0}],why:'מעבירים את המספרים ומחלקים.'},{t:'מציבים בזווית הגדולה: ?',ans:[{label:'',val:big}],why:'מציבים את x בביטוי של הזווית הגדולה.'}],
  lines:[M(ex.join(' + ')+' = 180'),M(eq)+' ← '+M('x = '+x0),'הזוויות: '+M(ang.join('°, ')+'°')],rule:'סכום הזוויות 180° ← משוואה ← x ← מציבים.',trick:'בדיקה: שלוש הזוויות ביחד חייבות לצאת 180°.',
  diag:({vals:[x,y]})=>x===x0&&y!==big?'את x מצאתם! עכשיו מציבים בזווית הגדולה.':y===x0?'x הוא לא הזווית. מציבים אותו.':null};}
function gTriCan(){const opts=[[[90,90,0],'לא','שתי זוויות ישרות כבר 180°.'],[[100,85,0],'לא',M('100° + 85° = 185°')+', יותר מ־'+M('180°')+'.'],[[60,60,60],'כן',M('60 + 60 + 60 = 180')+'.'],[[90,45,45],'כן',M('90 + 45 + 45 = 180')+'.'],[[120,40,30],'לא',M('120 + 40 + 30 = 190')+', לא 180.'],[[30,70,80],'כן',M('30 + 70 + 80 = 180')+'.'],[[95,95,0],'לא','שתי זוויות קהות יותר מ־'+M('180°')+'.']];
 const [a,ok,why]=pick(opts);const txt=a[2]?`עם הזוויות ${M(a.join('°, ')+'°')}`:`עם שתי זוויות של ${M(a[0]+'°')} ו־${M(a[1]+'°')}`;
 return {kind:'האם יש משולש כזה?',text:`האם יכול להיות משולש ${txt}?`,choice:['כן','לא'],correct:ok==='כן'?0:1,lines:[why,ok==='כן'?'ולכן <b>יש</b> משולש כזה.':'ולכן <b>אין</b> משולש כזה.'],rule:'במשולש: שלוש זוויות, כל אחת יותר מ־0, וביחד בדיוק 180°.',trick:'מחברים ובודקים: יוצא 180?',diag:()=>why};}
function inclSvg(){const box=(x,y,w,h,c,t,d)=>`<g class="rv" style="--d:${d}s"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${c}" fill-opacity=".14" stroke="${c}" stroke-width="3"/><text x="${x+w-14}" y="${y+28}" text-anchor="start" font-size="18" font-weight="800" fill="${c}" direction="rtl" style="font-family:Rubik">${t}</text></g>`;
 const tri=(x,y,s,c,d,w)=>`<polygon class="rv" style="--d:${d}s" points="${x},${y} ${x-s*(w||.55)},${y+s} ${x+s*(w||.55)},${y+s}" fill="${c}" fill-opacity=".5" stroke="${c}" stroke-width="2.5"/>`;
 return `<svg viewBox="0 0 400 250" role="img" aria-label="יחסי הכלה">${box(10,10,380,230,INK,'כל המשולשים',.2)}${tri(70,16,28,INK,.4,1.1)}${box(30,52,340,178,OR,'שווה שוקיים',1)}${tri(78,100,72,OR,1.2,.38)}${box(140,96,210,120,GR,'שווה צלעות',1.9)}${tri(205,140,56,GR,2.1,.577)}</svg>`;}
function triSumSvg(){const {T,L,R:Rr}=triPts(70,50);const y=262,X=110,r=44,seg=(a0,a1,col,d)=>{const s=[X+60+r*Math.cos(rd(a0)),y-r*Math.sin(rd(a0))],e=[X+60+r*Math.cos(rd(a1)),y-r*Math.sin(rd(a1))];return `<path class="rv" style="--d:${d}s" d="M${X+60} ${y} L${f(s[0])} ${f(s[1])} A${r} ${r} 0 0 0 ${f(e[0])} ${f(e[1])} Z" fill="${col}" fill-opacity=".85"/>`;};
 return `<svg viewBox="0 0 400 300" role="img" aria-label="סכום הזוויות במשולש"><g transform="translate(0,-28) scale(1)">${triDia(70,50,'60°','70°','50°').replace(/^<svg[^>]*>|<\/svg>$/g,'').replace(/<text x="392"[^<]*<\/text>/,'')}</g>
 <line x1="${X-10}" y1="${y}" x2="${X+130}" y2="${y}" stroke="${INK}" stroke-width="3" class="rv" style="--d:1s"/>${seg(0,50,BL,1.4)}${seg(50,110,PU,2)}${seg(110,180,OR,2.6)}
 <text class="rv" style="--d:3.2s;font-family:Rubik" x="305" y="${y-6}" text-anchor="middle" font-size="20" font-weight="800" fill="${GR}" direction="ltr">= 180°</text></svg>`;}

/* ================= מחוללים: מספרים מכוונים ================= */
const RULES={opp:'הנגדי: אותו מרחק מ־0, בצד השני. '+M('−(−a) = a')+'.',abs:'ערך מוחלט = המרחק מ־0. אף פעם לא שלילי.',add:'אותו כיוון ← מחברים את המרחקים. כיוונים הפוכים ← מחסירים, ומנצח הרחוק מ־0.',sub:'"פחות" = ועוד הנגדי: '+M('a − b = a + (−b)')+'.',nob:'כל מספר יחד עם הסימן שלפניו. '+M('−3 − 5 = (−3) + (−5) = −8')+'.',mabs:'קודם מה שבתוך הקווים, ורק בסוף המינוס שבחוץ ("הנגדי של").'};
function gOpp(){const c=R(0,2),a=nz(-15,15);
 if(c<2){const twice=c===1;return {kind:'המספר הנגדי',text:twice?`מה התוצאה? ${M('−('+N(a)+')')}`:`מהו המספר הנגדי ל־${M(N(a))}?`,dia:h=>h?nl(a,0,{mode:'opp'}):'',ans:[{label:twice?'':'הנגדי',val:-a,neg:true,unit:''}],
  work:[{t:`${M(N(a))} נמצא ${a>0?'מימין':'משמאל'} ל־0. הנגדי נמצא…`,choice:['באותו מרחק, בצד השני','באותו צד','תמיד שלילי'],correct:0,why:'נגדי = <b>שיקוף</b> סביב 0.'},{t:'הנגדי של '+M(NP(a))+' = ?',ans:[{label:'',val:-a,neg:true,unit:''}],why:RULES.opp}],
  lines:[twice?'המינוס שבחוץ אומר "<b>הנגדי של</b>".':'',`הנגדי של ${M(NP(a))} הוא ${M(N(-a))}`].filter(Boolean),rule:RULES.opp,trick:'מינוס לפני מספר = "הנגדי של". הנגדי של שלילי ← חיובי.',
  diag:({vals:[x]})=>x===a?'זה אותו מספר. הנגדי נמצא <b>בצד השני</b> של 0.':x===0?'מספר ונגדו ביחד נותנים 0, אבל הנגדי עצמו הוא '+M(N(-a))+'.':null};}
 const b=Math.abs(a);return {kind:'המספר הנגדי',text:`${M(N(b))} ו־${M('?')} נגדיים. מה הסכום שלהם?`,ans:[{label:'הסכום',val:0,neg:true,unit:''}],work:[{t:'הנגדי של '+M(N(b))+' = ?',ans:[{label:'',val:-b,neg:true,unit:''}],why:RULES.opp},{t:M(b+' + ('+N(-b)+') = ?'),ans:[{label:'',val:0,neg:true,unit:''}],why:'זוג נגדיים = זוג אפס.'}],
  lines:['הנגדי של '+M(b)+' הוא '+M(N(-b)),M(b+' + ('+N(-b)+') = 0')],rule:'סכום של מספר והנגדי שלו הוא 0.',trick:'נגדיים ← 0.',diag:()=>'מספר ונגדו מבטלים זה את זה: הסכום תמיד 0.'};}
function gAbs(){const a=nz(-20,20),c=R(0,1);
 if(c===0)return {kind:'ערך מוחלט',text:`${M('|'+N(a)+'| = ?')}`,dia:h=>h?nl(a,0,{mode:'abs'}):'',ans:[{label:'',val:Math.abs(a),neg:true,unit:''}],
  work:[{t:'ערך מוחלט שואל…',choice:['כמה רחוק מ־0?','לאיזה כיוון?','מה הנגדי?'],correct:0,why:RULES.abs},{t:'המרחק של '+M(N(a))+' מ־0 = ?',ans:[{label:'',val:Math.abs(a),neg:true,unit:''}],why:'מרחק הוא תמיד חיובי.'}],
  lines:['ערך מוחלט = המרחק מ־0',M('|'+N(a)+'| = '+Math.abs(a))],rule:RULES.abs,trick:'קווי ערך מוחלט שואלים "כמה רחוק?", לא "לאיזה כיוון".',
  diag:({vals:[x]})=>x===-Math.abs(a)?'מרחק אף פעם לא שלילי! '+M('|'+N(a)+'| = '+Math.abs(a))+'.':null};
 const b=nz(-12,12),A=Math.abs(a),B=Math.abs(b);
 return {kind:'ערך מוחלט',text:`מה התוצאה? ${M('|'+N(a)+'| + |'+N(b)+'|')}`,ans:[{label:'',val:A+B,neg:true,unit:''}],work:[{t:M('|'+N(a)+'| = ?'),ans:[{label:'',val:A,neg:true,unit:''}],why:RULES.abs},{t:M('|'+N(b)+'| = ?'),ans:[{label:'',val:B,neg:true,unit:''}],why:RULES.abs},{t:M(A+' + '+B+' = ?'),ans:[{label:'',val:A+B,neg:true,unit:''}],why:'עכשיו מחברים שני מספרים חיוביים.'}],
  lines:[M('|'+N(a)+'| = '+A)+' · '+M('|'+N(b)+'| = '+B),M(A+' + '+B+' = '+(A+B))],rule:'קודם כל ערך מוחלט לבד, ואז מחברים.',trick:'כל קווים ← מספר חיובי.',
  diag:({vals:[x]})=>x===a+b?'חישבתם '+M(NP(a)+' + '+NP(b))+'. קודם ערך מוחלט לכל מספר: כולם חיוביים.':null};}
function gMAbs(lvl){const c=lvl===3?R(2,3):R(0,1);let ex,val,ws,ln,dg;
 if(c===0){const a=R(2,15);ex='−|'+a+'|';val=-a;ws=[{t:M('|'+a+'| = ?'),ans:[{label:'',val:a,neg:true,unit:''}],why:'קודם מה שבתוך הקווים.'},{t:'המינוס שבחוץ = "הנגדי של": הנגדי של '+M(a)+' = ?',ans:[{label:'',val:-a,neg:true,unit:''}],why:RULES.mabs}];ln=[M('|'+a+'| = '+a),'הנגדי של '+M(a)+' ← '+M(N(-a))];dg=x=>x===a?'המינוס <b>מחוץ</b> לקווים נשאר: הנגדי של '+M(a)+'.':null;}
 else if(c===1){const a=R(2,15);ex='−|−'+a+'|';val=-a;ws=[{t:M('|−'+a+'| = ?'),ans:[{label:'',val:a,neg:true,unit:''}],why:'הקווים "בולעים" רק את המינוס <b>שבפנים</b>.'},{t:'הנגדי של '+M(a)+' = ?',ans:[{label:'',val:-a,neg:true,unit:''}],why:RULES.mabs}];ln=[M('|−'+a+'| = '+a),'הנגדי של '+M(a)+' ← '+M(N(-a))];dg=x=>x===a?'רק המינוס <b>שבפנים</b> נעלם. המינוס שבחוץ פועל בסוף ← '+M(N(-a))+'.':null;}
 else{let a,b;do{a=sgnR(2,12);b=sgnR(2,12);}while(a+b===0||Math.sign(a)===Math.sign(b));const s=a+b,out=c===3;ex=(out?'−':'')+'|'+N(a)+' + '+NP(b)+'|';val=out?-Math.abs(s):Math.abs(s);
  ws=[{t:'קודם בפנים: '+M(N(a)+' + '+NP(b)+' = ?'),ans:[{label:'',val:s,neg:true,unit:''}],why:'הקווים הם כמו סוגריים: <b>קודם מחשבים בפנים</b>. '+RULES.add},{t:M('|'+N(s)+'| = ?'),ans:[{label:'',val:Math.abs(s),neg:true,unit:''}],why:RULES.abs},...(out?[{t:'הנגדי של '+M(Math.abs(s))+' = ?',ans:[{label:'',val:-Math.abs(s),neg:true,unit:''}],why:RULES.mabs}]:[])];
  ln=[M(N(a)+' + '+NP(b)+' = '+N(s)),M('|'+N(s)+'| = '+Math.abs(s)),...(out?['הנגדי ← '+M(N(-Math.abs(s)))]:[])];const wrong=Math.abs(a)+Math.abs(b);dg=x=>Math.abs(x)===wrong?'"מחקתם" את המינוסים בפנים. קודם <b>מחשבים בפנים</b>: '+M(N(a)+' + '+NP(b)+' = '+N(s))+'.':(out&&x===Math.abs(s))?'המינוס שבחוץ פועל בסוף: הנגדי של '+M(Math.abs(s))+'.':null;}
 return {kind:'מינוס לפני ערך מוחלט',text:`מה התוצאה? ${M(ex)}`,ans:[{label:'',val:val,neg:true,unit:''}],work:ws,lines:ln,rule:RULES.mabs,trick:'קודם בתוך הקווים. המינוס שבחוץ – בסוף.',diag:({vals:[x]})=>dg(x)};}
function gAdd(three){let t=three?[sgnR(1,12),sgnR(1,12),sgnR(1,12)]:[sgnR(1,15),sgnR(1,15)];if(!three&&Math.sign(t[0])===Math.sign(t[1])&&Math.random()<.6)t[1]=-t[1];const s=t.reduce((a,b)=>a+b,0);
 const ex=t.map((v,i)=>i?NP(v):N(v)).join(' + ');const pos=t.filter(v=>v>0).reduce((a,b)=>a+b,0),neg=t.filter(v=>v<0).reduce((a,b)=>a+b,0);
 const ws=three?[{t:'מחברים את החיוביים: ?',ans:[{label:'',val:pos,neg:true,unit:''}],why:'קודם כל החיוביים ביחד.'},{t:'מחברים את השליליים: ?',ans:[{label:'',val:neg,neg:true,unit:''}],why:'שליליים ביחד ← שלילי גדול יותר.'},{t:M(N(pos)+' + '+NP(neg)+' = ?'),ans:[{label:'',val:s,neg:true,unit:''}],why:RULES.add}]
  :[{t:'הכיוונים…',choice:['אותו כיוון','כיוונים הפוכים'],correct:Math.sign(t[0])===Math.sign(t[1])?0:1,why:'בודקים את הסימנים של שני המספרים.'},{t:M(ex+' = ?'),ans:[{label:'',val:s,neg:true,unit:''}],why:RULES.add}];
 return {kind:three?'חיבור מספרים מכוונים':'חיבור מספרים מכוונים',text:`מה התוצאה? ${M(ex)}`,dia:h=>h&&!three?nl(t[0],t[1]):'',ans:[{label:'',val:s,neg:true,unit:''}],work:ws,
  lines:three?['חיוביים: '+M(N(pos))+' · שליליים: '+M(N(neg)),M(N(pos)+' + '+NP(neg)+' = '+N(s))]:[Math.sign(t[0])===Math.sign(t[1])?'אותו כיוון ← מחברים מרחקים, הכיוון נשאר':'כיוונים הפוכים ← '+M(Math.max(Math.abs(t[0]),Math.abs(t[1]))+' − '+Math.min(Math.abs(t[0]),Math.abs(t[1])))+', והסימן של הרחוק מ־0',M(ex+' = '+N(s))],
  rule:RULES.add,trick:'שני חובות ← חוב גדול יותר. חוב ורווח ← מי גדול יותר מנצח.',
  diag:({vals:[x]})=>x===-s?'בדקו את <b>הסימן</b>: מי רחוק יותר מ־0?':x===t.reduce((a,b)=>a+Math.abs(b),0)?'מחקתם את המינוסים. '+RULES.add:null};}
function gSubBr(){const a=sgnR(1,12),b=sgnR(1,12),s=a-b;
 return {kind:'חיסור עם סוגריים',text:`מה התוצאה? ${M(N(a)+' − '+NP(b))}`,ans:[{label:'',val:s,neg:true,unit:''}],dia:h=>h?rows([{p:[[N(a),SC(a)],[' − ',PU],[NP(b),SC(b)]]},{p:[[N(a),SC(a)],[' + ',PU],[NP(-b),SC(-b)]]},{p:[['= '+N(s),SC(s)]]}]):'',
  work:[{t:`"פחות" = ועוד הנגדי. הנגדי של ${M(NP(b))} = ?`,ans:[{label:'',val:-b,neg:true,unit:''}],why:RULES.sub},{t:M(N(a)+' + '+NP(-b)+' = ?'),ans:[{label:'',val:s,neg:true,unit:''}],why:RULES.add}],
  lines:['מתרגמים: '+M(N(a)+' − '+NP(b)+' = '+N(a)+' + '+NP(-b)),M('= '+N(s))],rule:RULES.sub,trick:b<0?'מינוס שפועל על מינוס ← פלוס.':'פחות מספר חיובי ← ועוד שלילי.',
  diag:({vals:[x]})=>x===a+b?'חיברתם במקום לחסר. "פחות" = ועוד <b>הנגדי</b>: '+M(N(a)+' + '+NP(-b))+'.':x===-s?'בדקו את הסימן של התוצאה.':null};}
function gNoBr(n){const k=n||R(2,3);let t;do{t=[sgnR(1,12)];for(let i=1;i<k;i++)t.push(sgnR(1,12));}while(!t.slice(1).some(v=>v<0)||t.reduce((a,b)=>a+b,0)===0&&Math.random()<.7);
 const s=t.reduce((a,b)=>a+b,0),ex=N(t[0])+t.slice(1).map(v=>v<0?' − '+(-v):' + '+v).join(''),tr=t.map((v,i)=>i?NP(v):N(v)).join(' + ');
 const pos=t.filter(v=>v>0).reduce((a,b)=>a+b,0),neg=t.filter(v=>v<0).reduce((a,b)=>a+b,0);
 const wrong=t[0]+t.slice(1).reduce((a,b)=>a+Math.abs(b),0)*(t[0]<0?1:1);
 return {kind:'בלי סוגריים',text:`מה התוצאה? ${M(ex)}`,ans:[{label:'',val:s,neg:true,unit:''}],dia:h=>h?rows([{p:[[ex,INK]],fs:30},{p:t.map((v,i)=>[(i?' + ':'')+(i?NP(v):N(v)),SC(v)]),fs:28},{p:[['= '+N(s),SC(s)]]}]):'',
  work:[{t:'כל מספר עם הסימן שלפניו. כמה מספרים <b>שליליים</b> יש?',ans:[{label:'',val:t.filter(v=>v<0).length,neg:true,unit:''}],why:RULES.nob},{t:'סכום החיוביים: ?',ans:[{label:'',val:pos,neg:true,unit:''}],why:'מחברים את כל החיוביים.'},{t:'סכום השליליים: ?',ans:[{label:'',val:neg,neg:true,unit:''}],why:'מחברים את כל השליליים.'},{t:M(N(pos)+' + '+NP(neg)+' = ?'),ans:[{label:'',val:s,neg:true,unit:''}],why:RULES.add}],
  lines:['מתרגמים לחיבור: '+M(tr),'חיוביים '+M(N(pos))+' · שליליים '+M(N(neg)),M('= '+N(s))],rule:RULES.nob,trick:'אין כאן "מינוס מינוס"! כל מינוס שייך למספר שאחריו.',
  diag:({vals:[x]})=>t[0]<0&&x===-t[0]+t.slice(1).reduce((a,b)=>a-b,0)?'"מינוס מינוס = פלוס" <b>לא</b> מתאים כאן. '+RULES.nob:x===-s?'בדקו את הסימן: מי גדול יותר, החיוביים או השליליים?':null};}
function gMix(){let a,b,c;do{a=R(2,9);b=sgnR(2,9);c=sgnR(1,9);}while(-a-b+c===0);const form=R(0,1);
 const ex=form?`−|−${a}| − ${NP(b)} ${c<0?'− '+(-c):'+ '+c}`:`${N(c)} − ${NP(b)} − |${N(-a)}|`;const s=form?-a-b+c:c-b-a;
 return {kind:'תרגיל משולב',text:`מה התוצאה? ${M(ex)}`,ans:[{label:'',val:s,neg:true,unit:''}],
  crack:[CK('מה עושים קודם?',['ערך מוחלט','מחשבים משמאל לימין בלי לבדוק','מוחקים את כל המינוסים'],'ערך מוחלט','קודם מה שבתוך הקווים.'),CK(M('− '+NP(b))+' הופך ל…',[M('+ '+NP(-b)),M('− '+NP(-b)),M('+ '+NP(b))],M('+ '+NP(-b)),'"פחות" = ועוד הנגדי.')],
  work:[{t:form?M('−|−'+a+'| = ?'):M('−|'+N(-a)+'| = ?'),ans:[{label:'',val:-a,neg:true,unit:''}],why:RULES.mabs},{t:M('− '+NP(b))+' = ועוד הנגדי: ?',ans:[{label:'',val:-b,neg:true,unit:''}],why:RULES.sub},{t:'עכשיו מחברים הכול: ?',ans:[{label:'',val:s,neg:true,unit:''}],why:RULES.add}],
  lines:[`${M(form?'−|−'+a+'|':'−|'+N(-a)+'|')} = ${M(N(-a))}`,`${M('− '+NP(b))} = ${M('+ '+NP(-b))}`,M((form?N(-a)+' + '+NP(-b)+' + '+NP(c):N(c)+' + '+NP(-b)+' + '+NP(-a))+' = '+N(s))],rule:'סדר קבוע: ערך מוחלט ← כל "פחות" הופך ל"ועוד הנגדי" ← מחברים.',trick:'מתרגמים לפני שמחשבים.',
  diag:({vals:[x]})=>x===s+2*a?''+M('−|−'+a+'|')+' הוא '+M(N(-a))+': המינוס שבחוץ נשאר.':x===s+2*b?'בדקו את '+M('− '+NP(b))+': ועוד <b>הנגדי</b> ← '+M(NP(-b))+'.':null};}
const ERRS=[
 ()=>{const a=R(2,9),b=R(2,9);return {e:`−${a} − ${b} = ${a+b}`,ok:`ב־${M('−'+a+' − '+b)} אין "מינוס מינוס": ${M('(−'+a+') + (−'+b+') = −'+(a+b))}`,w:[`צריך להיות ${M(N(a-b))}: מחסירים את המספרים`,'אין טעות']};},
 ()=>{const a=R(3,9),b=R(1,a-1);return {e:`|−${a} + ${b}| = ${a+b}`,ok:`קודם מחשבים בפנים: ${M('−'+a+' + '+b+' = −'+(a-b))}, ולכן ${M('|−'+(a-b)+'| = '+(a-b))}`,w:['ערך מוחלט יכול להיות שלילי','אין טעות']};},
 ()=>{const a=R(2,9);return {e:`−|−${a}| = ${a}`,ok:`הקווים בולעים רק את המינוס שבפנים. המינוס שבחוץ נשאר: ${M('−'+a)}`,w:[`צריך להיות ${M('−(−'+a+')')}`,'אין טעות']};},
 ()=>{const a=R(2,9),b=R(2,9);return {e:`${a} − (−${b}) = ${N(a-b)}`,ok:`פחות מינוס = ועוד הנגדי: ${M(a+' + '+b+' = '+(a+b))}`,w:['צריך להיות '+M('−'+(a+b)),'אין טעות']};},
 ()=>{const a=R(2,9);return {e:`−(−${a}) = −${a}`,ok:`הנגדי של הנגדי חוזר לעצמו: ${M('−(−'+a+') = '+a)}`,w:['צריך להיות 0','אין טעות']};}];
function gErr(){const E=pick(ERRS)();const opts=[E.ok,...E.w];const o=shuf(opts);
 return {kind:'מוצאים את הטעות',text:`דנה כתבה: ${M(E.e)}. מה נכון?`,choice:o,correct:o.indexOf(E.ok),lines:[E.ok],rule:'קוראים כל מינוס בקול: "פחות"? "הנגדי של"? "מספר שלילי"?',trick:'מתרגמים לחיבור לפני שמחשבים.',diag:()=>E.ok};}
const TF=[['ערך מוחלט של מספר יכול להיות שלילי.',0,'ערך מוחלט הוא מרחק, ומרחק לא שלילי.'],['אם '+M('|x| = 5')+', אז x יכול להיות '+M('5')+' או '+M('−5')+'.',1,'שני המספרים במרחק 5 מ־0.'],['הנגדי של מספר שלילי הוא מספר חיובי.',1,'שיקוף סביב 0 מעביר לצד השני.'],[M('−x')+' הוא תמיד מספר שלילי.',0,'אם '+M('x = −4')+', אז '+M('−x = 4')+'.'],['סכום של שני מספרים שליליים הוא שלילי.',1,'שני חובות ← חוב גדול יותר.'],[M('−|a|')+' אף פעם לא חיובי.',1,'הערך המוחלט לא שלילי, והנגדי שלו לא חיובי.'],['חיסור מספר שלילי מגדיל את התוצאה.',1,M('a − (−b) = a + b')+'.'],['למספרים נגדיים יש אותו ערך מוחלט.',1,'הם באותו מרחק מ־0.'],[M('|a + b|')+' תמיד שווה ל־'+M('|a| + |b|')+'.',0,M('|−5 + 2| = 3')+', אבל '+M('|−5| + |2| = 7')+'.']];
function gTF(){const [s,ok,why]=pick(TF);return {kind:'נכון או לא נכון?',text:s,choice:['נכון','לא נכון'],correct:ok?0:1,lines:[why,ok?'ולכן <b>נכון</b>.':'ולכן <b>לא נכון</b>.'],rule:'בודקים עם דוגמה: מציבים מספר חיובי ומספר שלילי.',trick:'לא בטוחים? מנסים דוגמה עם מינוס.',diag:()=>why};}
function gWord(){const c=R(0,1);
 if(c===0){const t0=-R(2,9),up=R(5,14),dn=R(3,12),s=t0+up-dn;
  return {kind:'בעיה מילולית',text:`בבוקר הטמפרטורה בחרמון הייתה ${M(N(t0)+'°')}. עד הצהריים היא עלתה ב־${M(up+'°')}, ועד הערב ירדה ב־${M(dn+'°')}. מה הטמפרטורה בערב?`,ans:[{label:'בערב',val:s,neg:true,unit:''}],
   crack:[CK('"עלתה"…',['ועוד','פחות','כפול'],'ועוד','עלייה ← מוסיפים.'),CK('"ירדה"…',['פחות','ועוד','חילוק'],'פחות','ירידה ← מחסירים.'),CK('התרגיל',[M(N(t0)+' + '+up+' − '+dn),M(N(-t0)+' + '+up+' − '+dn),M(N(t0)+' − '+up+' + '+dn)],M(N(t0)+' + '+up+' − '+dn),'מתחילים מ־'+M(N(t0))+'.')],
   work:[{t:'בצהריים: '+M(N(t0)+' + '+up+' = ?'),ans:[{label:'',val:t0+up,neg:true,unit:''}],why:RULES.add},{t:'בערב: '+M(N(t0+up)+' − '+dn+' = ?'),ans:[{label:'',val:s,neg:true,unit:''}],why:RULES.nob}],
   lines:[M(N(t0)+' + '+up+' = '+N(t0+up)),M(N(t0+up)+' − '+dn+' = '+N(s)+'°')],rule:'עלייה ← ועוד. ירידה ← פחות. מתחילים מהמספר של הבוקר, עם הסימן שלו.',trick:'מציירים מדחום: למעלה ועוד, למטה פחות.',
   diag:({vals:[x]})=>x===-t0+up-dn?'הטמפרטורה בבוקר הייתה <b>מתחת</b> לאפס: '+M(N(t0))+'.':null};}
 const f0=R(1,6),dn=R(4,10),up=R(1,5),s=f0-dn+up;
 return {kind:'בעיה מילולית',text:`נועה נכנסה למעלית בקומה ${M(f0)}. היא ירדה ${M(dn)} קומות, ואז עלתה ${M(up)} קומות. באיזו קומה היא עכשיו? (קומות מתחת לקרקע הן שליליות)`,ans:[{label:'הקומה',val:s,neg:true,unit:''}],
  crack:[CK('"ירדה"…',['פחות','ועוד'],'פחות','ירידה ← מחסירים.'),CK('התרגיל',[M(f0+' − '+dn+' + '+up),M(f0+' + '+dn+' − '+up),M(dn+' − '+f0+' + '+up)],M(f0+' − '+dn+' + '+up),'מתחילים בקומה '+M(f0)+'.')],
  work:[{t:'אחרי הירידה: '+M(f0+' − '+dn+' = ?'),ans:[{label:'',val:f0-dn,neg:true,unit:''}],why:'מתחת ל־0 ← מספר שלילי.'},{t:M(N(f0-dn)+' + '+up+' = ?'),ans:[{label:'',val:s,neg:true,unit:''}],why:RULES.add}],
  lines:[M(f0+' − '+dn+' = '+N(f0-dn)),M(N(f0-dn)+' + '+up+' = '+N(s))],rule:'ירידה ← פחות. עלייה ← ועוד. קומה מתחת לקרקע ← שלילית.',trick:'מדמיינים את המעלית על ציר אנכי.',diag:({vals:[x]})=>x===f0+dn-up?'ירידה ← <b>פחות</b>, עלייה ← <b>ועוד</b>.':null};}

/* ================= שלבים ומבחן ================= */
const LEVELS=[
 {n:1,t:'ידע',d:'סוגי זוויות ומשולשים, צמודות, נגדי, ערך מוחלט, חיבור',ladder:[{g:gType,n:5,h:2},{g:()=>gAdj(false),n:5,h:2},{g:()=>gBis(true),n:4,h:2},{g:gOpp,n:6,h:2},{g:gAbs,n:5,h:2},{g:()=>gAdd(false),n:5,h:2},{g:gTriType,n:3,h:2},{g:gTriSides,n:2,h:2}]},
 {n:2,t:'יישום',d:'חוצה, שווה שוקיים, חיסור עם סוגריים, מינוס לפני |  |',ladder:[{g:()=>gAdj(true),n:4,h:1},{g:()=>gBis(),n:5,h:1},{g:()=>gIso(),n:6,h:1},{g:gSubBr,n:8,h:1},{g:()=>gMAbs(2),n:4,h:1},{g:()=>gAdd(true),n:3,h:1},{g:()=>gTriSum(),n:3,h:1},{g:gEqui,n:2,h:1}]},
 {n:3,t:'הבנה ונימוק',d:'צמודות עם x, בלי סוגריים, |  | עם תרגיל, מוצאים טעות',ladder:[{g:gAdjX,n:6,h:1},{g:()=>gIso(),n:4,h:1},{g:()=>gNoBr(),n:9,h:1},{g:()=>gMAbs(3),n:6,h:1},{g:gErr,n:5,h:1},{g:gIncl,n:3,h:1},{g:gTriX,n:2,h:1}]},
 {n:4,t:'חשיבה ואוריינות',d:'שני צעדים, האם אפשרי?, משולב, בעיות מילוליות',ladder:[{g:gBisAdj,n:7,h:1},{g:gIsoCan,n:5,h:1},{g:gMix,n:9,h:1},{g:gWord,n:6,h:1},{g:gTF,n:5,h:1},{g:gTriCan,n:3,h:1}]}];
const TEST=[[gType,()=>gAdj(false),gOpp,gAbs,()=>gAdd(false),()=>gBis(true),gTriType,gTriSides],
 [()=>gIso(),gSubBr,()=>gMAbs(2),()=>gBis(false),()=>gAdd(true),()=>gTriSum(),gEqui],
 [gAdjX,()=>gNoBr(),()=>gMAbs(3),gErr,gIncl,gTriX],
 [gBisAdj,gIsoCan,gMix,gWord,gTF,gTriCan]];
const WARM=[gType,()=>gAdj(false),gOpp,gAbs,()=>gAdd(false),()=>gBis(true),()=>gIso(true),gSubBr];

/* ================= כרטיסי הסבר מונפשים ================= */
function recapSvg(n){
 if(n===3)return triSumSvg();
 if(n===4)return inclSvg();
 if(n>4)n-=2;
 if(n===0){const mini=(x,y,v,col,t,d)=>{const a1=v,P=(a,r)=>[x+r*Math.cos(rd(a)),y-r*Math.sin(rd(a))],s=P(0,30),e=P(a1,30),big=a1>180?1:0;
   return `<g class="rv" style="--d:${d}s"><path d="M${x} ${y} L${f(s[0])} ${f(s[1])} A30 30 0 ${big} 0 ${f(e[0])} ${f(e[1])} Z" fill="${col}" fill-opacity=".8"/><line x1="${x}" y1="${y}" x2="${f(P(0,70)[0])}" y2="${f(P(0,70)[1])}" stroke="${INK}" stroke-width="3"/><line x1="${x}" y1="${y}" x2="${f(P(a1,70)[0])}" y2="${f(P(a1,70)[1])}" stroke="${INK}" stroke-width="3"/><text x="${x}" y="${y+26}" text-anchor="middle" font-size="18" font-weight="800" fill="${col}" style="font-family:Rubik" direction="rtl">${t}</text><text x="${x}" y="${y+46}" text-anchor="middle" font-size="16" font-weight="700" fill="${col}" style="font-family:Rubik" direction="ltr">${v}°</text></g>`;};
  return `<svg viewBox="0 0 400 270" role="img" aria-label="סוגי זוויות">${mini(270,95,50,OR,'חדה',.2)+mini(80,95,90,GR,'ישרה',.9)+mini(275,205,130,BL,'קהה',1.6)+mini(115,205,180,PU,'שטוחה',2.3)}</svg>`;}
 if(n===1)return adjDia(130,'130°','50°',{c2:'rv',d2:1,post:`<text class="rv" style="--d:1.8s;font-family:Rubik" x="200" y="30" text-anchor="middle" font-size="19" font-weight="800" fill="${GR}" direction="ltr">130° + 50° = 180°</text>`});
 if(n===2)return bisDia(40,'80°','40°',{cr:'drawl',dr:.4,c1:'rv',d1:1.3,c3:'rv',d3:2});
 if(n===3)return isoDia(40,'40°','70°',{cb:'rv',db:1});
 if(n===4)return nl(4,0,{mode:'opp'});
 if(n===5)return nl(-4,0,{mode:'abs',extra:[4]});
 if(n===6)return nl(2,-5);
 if(n===7)return rows([{p:[['3',GR],[' − ',PU],['(−2)',RD]]},{p:[['3',GR],[' + ',PU],['2',GR]]},{p:[['= 5',GR]]}]);
 if(n===8)return rows([{p:[['−3',RD],[' − 5',RD]]},{p:[['(−3)',RD],[' + ',INK],['(−5)',RD]]},{p:[['= −8 ',RD],['✓',GR]]}]);
 return rows([{p:[['−',PU],['|',OR],['−4',RD],['|',OR]]},{p:[['−',PU],['(',INK],['4',OR],[')',INK]]},{p:[['= −4',RD]]}]);}
const TITLES=['סוגי זוויות','זוויות צמודות','חוצה זווית','סכום הזוויות במשולש','סוגי משולשים ויחסי הכלה','משולש שווה שוקיים','מספרים נגדיים','ערך מוחלט','חיבור על הציר','חיסור = ועוד הנגדי','בלי סוגריים','מינוס לפני ערך מוחלט'];
const SAYS=[
 [`משווים ל־${M('90°')}: קטנה ← <b style="color:${OR}">חדה</b>, גדולה ← <b style="color:${BL}">קהה</b>.`],
 [`צמודות: צלע משותפת, ויחד <b style="color:${GR}">קו ישר</b>.`,M('130° + 50° = 180°')],
 [`<b style="color:${PU}">החוצה</b> מחלק לשני חלקים <b>שווים</b>.`,M('80° : 2 = 40°')],
 [`שלוש הזוויות של <b>כל</b> משולש יוצרות <b style="color:${GR}">קו ישר</b>.`,M('60° + 70° + 50° = 180°')],
 [`<b style="color:${GR}">שווה צלעות</b> הוא גם <b style="color:${OR}">שווה שוקיים</b>.`,'אבל לא כל שווה שוקיים הוא שווה צלעות.'],
 [`<b style="color:${OR}">שתי שוקיים</b> שוות ← <b style="color:${BL}">זוויות הבסיס</b> שוות.`,M('180° − 40° = 140°')+' ← '+M('140° : 2 = 70°')],
 [`נגדי = <b>שיקוף</b> סביב 0.`,M('4 + (−4) = 0')],
 [`ערך מוחלט = <b style="color:${OR}">המרחק</b> מ־0.`,M('|−4| = |4| = 4')],
 [`${M('2 + (−5)')}: מתחילים ב־2, הולכים 5 שמאלה.`,M('= −3')],
 [`"פחות" = <b>ועוד הנגדי</b>.`,M('3 − (−2) = 3 + 2 = 5')],
 [`כל מספר עם <b>הסימן שלפניו</b>.`,`${M('−3 − 5 = 8')} <span class="x">✗</span>`],
 [`<b>קודם</b> בתוך הקווים, <b style="color:${PU}">המינוס שבחוץ</b> בסוף.`,M('−|−4| = −4')]];
const WHATS=['משווים ל־'+M('90°')+'.','צמודות ← 180°. לא שוות!','חוצה ← מחלקים ב־2.','בכל משולש: '+M('180°')+'.','שווה צלעות ⊂ שווה שוקיים.','זוויות הבסיס שוות.','מספר ונגדו ← 0.','מרחק אף פעם לא שלילי.','שני חובות ← חוב גדול יותר.','פחות מינוס ← פלוס.','אין כאן "מינוס מינוס"!','קודם בפנים, מינוס בחוץ בסוף.'];
const DL=n=>n===0?3:n<3?2.4:n<5?3.6:n<6?2.4:n<9?2.2:3.4;
const RECAP=TITLES.map((h,n)=>({h,svg:()=>recapSvg(n),says:SAYS[n],what:WHATS[n],d:DL(n)}));
RECAP[9].chk=[gSubBr];RECAP[10].chk=[()=>gNoBr(2)];

/* ⚡ שאלות ותשובות בזק (שאלה, תשובה, כרטיס הסבר) */
const QUICK=[
['מה ההבדל בין זווית חדה לזווית קהה?','חדה קטנה מ־'+M('90°')+'. קהה בין '+M('90°')+' ל־'+M('180°'),0],
['כמה מעלות יש בזווית שטוחה?',M('180°')+': קו ישר',0],
['מה הסכום של שתי זוויות צמודות?',M('180°'),1],
['זווית אחת היא '+M('70°')+'. מה הצמודה לה?',M('180° − 70° = 110°'),1],
['מה עושה חוצה זווית?','מחלק את הזווית לשני חלקים שווים',2],
[M('∢AOB = 90°')+', ו־'+M('OD')+' חוצה אותה. כמה '+M('∢AOD')+'?',M('90° : 2 = 45°'),2],
['מה הסכום של שלוש הזוויות במשולש?',M('180°'),3],
['במשולש שתי זוויות: '+M('50°')+' ו־'+M('60°')+'. מה השלישית?',M('180° − 110° = 70°'),3],
['האם כל משולש שווה צלעות הוא שווה שוקיים?','כן! יש לו 3 צלעות שוות, אז בוודאי 2',4],
['האם כל משולש שווה שוקיים הוא שווה צלעות?','לא. למשל צלעות 5, 5, 8',4],
['כמה מעלות כל זווית במשולש שווה צלעות?',M('180° : 3 = 60°'),4],
['במשולש יש זווית של '+M('100°')+'. איזה משולש זה?','קהה־זווית',4],
['במשולש שווה שוקיים, אילו זוויות שוות?','שתי זוויות הבסיס',5],
['זווית הראש '+M('40°')+'. מה כל זווית בסיס?',M('(180° − 40°) : 2 = 70°'),5],
['מה הנגדי של '+M('−7')+'?',M('7'),6],
['מה הסכום של מספר והנגדי שלו?',M('0'),6],
[M('|−9| = ?'),M('9')+': המרחק מ־0',7],
['האם ערך מוחלט יכול להיות שלילי?','לא! מרחק אף פעם לא שלילי',7],
[M('(−3) + (−4) = ?'),M('−7')+': שני חובות',8],
[M('5 − (−3) = ?'),M('5 + 3 = 8'),9],
[M('−2 − 6 = ?'),M('(−2) + (−6) = −8'),10],
[M('−|−5| = ?'),M('−5')+': המינוס שבחוץ נשאר',11],
[M('|−6 + 2| = ?'),M('|−4| = 4')+': קודם בפנים',11]];

/* 🎯 מבדק לכל נושא: [מחולל, משקל, רמה 0-3] */
const TOPICS=[
 {t:'סוגי זוויות וזוויות צמודות',d:'חדה, ישרה, קהה, שטוחה · 180°',rc:1,g:[[gType,4,0],[()=>gAdj(false),5,0],[()=>gAdj(true),5,1],[gAdjX,6,2]]},
 {t:'חוצה זווית',d:'חצי, הזווית כולה, ועם צמודות',rc:2,g:[[()=>gBis(true),6,0],[()=>gBis(false),6,1],[gBisAdj,8,3]]},
 {t:'משולשים: סוגים, יחסי הכלה וסכום הזוויות',d:'חד, ישר, קהה · שונה צלעות, שווה שוקיים, שווה צלעות · 180°',rc:3,g:[[gTriType,3,0],[gTriSides,3,0],[()=>gTriSum(false),4,0],[gEqui,3,1],[()=>gTriSum(true),2,1],[gIncl,3,2],[gTriX,1,2],[gTriCan,1,3]]},
 {t:'משולש שווה שוקיים',d:'זוויות הבסיס וזווית הראש',rc:5,g:[[()=>gIso(true),7,1],[()=>gIso(false),7,1],[gIsoCan,6,3]]},
 {t:'מספרים נגדיים וערך מוחלט',d:'נגדי, מרחק מ־0, נכון או לא',rc:7,g:[[gOpp,6,0],[gAbs,6,0],[()=>gMAbs(2),4,1],[gTF,4,3]]},
 {t:'חיבור מספרים מכוונים',d:'שניים, שלושה, ובעיות מילוליות',rc:8,g:[[()=>gAdd(false),10,0],[()=>gAdd(true),6,1],[gWord,4,3]]},
 {t:'חיסור: עם סוגריים ובלי סוגריים',d:'ועוד הנגדי · כל מספר עם הסימן שלו',rc:9,g:[[gSubBr,8,1],[()=>gNoBr(),8,2],[gErr,4,2]]},
 {t:'מינוס לפני ערך מוחלט ותרגילים משולבים',d:'קודם בפנים, המינוס שבחוץ בסוף',rc:11,g:[[()=>gMAbs(2),5,1],[()=>gMAbs(3),7,2],[gMix,8,3]]}];
