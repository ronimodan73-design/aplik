/*META {"id":"h8_lines","title":"הישר והגרף שלו · ערכה: רוני מודן","short":"הישר והגרף","topic":"הישר והגרף שלו: חיתוכים, התאמה, תחומים ושטח","glyph":"y=mx+b","color":"#ffb020"} */
const APP={key:'h8_lines',topic:'הישר והגרף שלו',sub:'מה זה b, חיתוך עם הצירים, התאמת גרף למשוואה, מעל ומתחת, שני ישרים ושטח משולש. צעד אחרי צעד, בצבעים.'};
const FC=PU,GC='#2dd4bf';
const N=v=>v<0?'−'+(-v):''+v;
const C=(t,c)=>`<span style="color:${c}">${t}</span>`;
const nz=(a,b)=>{let v;do v=R(a,b);while(!v);return v;};
const par=v=>v<0?'('+N(v)+')':''+v;
const mx=m=>m===1?'x':m===-1?'−x':N(m)+'x';
const bs=b=>b===0?'':(b<0?' − ':' + ')+Math.abs(b);
const RHS=(m,b)=>mx(m)+bs(b);
const Pt=(x,y)=>'('+N(x)+', '+N(y)+')';
const EQ=(m,b,nm='y')=>M(nm+' = '+C(mx(m),BL)+(b?C(bs(b),OR):''));
const EQf=(m,b,nm,col)=>M(C(nm+' = '+RHS(m,b),col));
function CH(o){const s=shuf(o);return {choice:s.map(x=>x.t),correct:s.findIndex(x=>x.ok),diag:({sel})=>s[sel]&&!s[sel].ok&&s[sel].msg||null};}
/* ===== graph engine ===== */
let GID=0;
function G(o){const [x0,x1]=o.xr||[-6,6],[y0,y1]=o.yr||[-6,6],W=300,P=16,A=o.anim;
 const sx=x=>+(P+(x-x0)/(x1-x0)*(W-2*P)).toFixed(1),sy=y=>+(W-P-(y-y0)/(y1-y0)*(W-2*P)).toFixed(1),X0=sx(0),Y0=sy(0);
 const seg=(L,a,b)=>{const xa=(y0-L.b)/L.m,xb=(y1-L.b)/L.m,lo=Math.max(a,x0,Math.min(xa,xb)),hi=Math.min(b,x1,Math.max(xa,xb));return lo<hi?[lo,L.m*lo+L.b,hi,L.m*hi+L.b]:null;};
 const ln=(g,col,w,ex='')=>g?`<line x1="${sx(g[0])}" y1="${sy(g[1])}" x2="${sx(g[2])}" y2="${sy(g[3])}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" ${ex}/>`:'';
 const bar=(a,b,col)=>{a=Math.max(a,x0);b=Math.min(b,x1);return a<b?`<line x1="${sx(a)}" y1="${Y0}" x2="${sx(b)}" y2="${Y0}" stroke="${col}" stroke-width="8" stroke-opacity=".8" stroke-linecap="round" class="rv" style="--d:${A?1.6:0}s"/>`:'';};
 let s=`<svg viewBox="0 0 ${W} ${W}" style="width:100%;max-width:300px;direction:ltr;font-family:Rubik" role="img" aria-label="גרף">`;
 for(let x=Math.ceil(x0);x<=x1;x++)if(x)s+=`<line x1="${sx(x)}" y1="${P}" x2="${sx(x)}" y2="${W-P}" stroke="#1d3150"/>`;
 const gy=(y1-y0)>16?2:1;for(let y=Math.ceil(y0/gy)*gy;y<=y1;y+=gy)if(y)s+=`<line x1="${P}" y1="${sy(y)}" x2="${W-P}" y2="${sy(y)}" stroke="#1d3150"/>`;
 if(o.tri)s+=`<polygon points="${o.tri.map(([x,y])=>sx(x)+','+sy(y)).join(' ')}" fill="${OR}" fill-opacity=".2" class="rv" style="--d:${A?1.4:0}s"/>`;
 s+=`<line x1="${P-4}" y1="${Y0}" x2="${W-P+6}" y2="${Y0}" stroke="#dfe8f5" stroke-width="2"/><polygon points="${W-4},${Y0} ${W-P+4},${Y0-5} ${W-P+4},${Y0+5}" fill="#dfe8f5"/>
 <line x1="${X0}" y1="${W-P+4}" x2="${X0}" y2="${P-6}" stroke="#dfe8f5" stroke-width="2"/><polygon points="${X0},4 ${X0-5},${P-4} ${X0+5},${P-4}" fill="#dfe8f5"/>
 <text x="${W-P}" y="${Y0-9}" fill="#dfe8f5" font-size="15" font-style="italic" font-weight="700">x</text><text x="${X0+8}" y="${P+4}" fill="#dfe8f5" font-size="15" font-style="italic" font-weight="700">y</text>`;
 const tx=(x1-x0)>14?4:2,ty=(y1-y0)>14?4:2;
 for(let x=Math.ceil(x0/tx)*tx;x<x1;x+=tx)if(x)s+=`<text x="${sx(x)}" y="${Math.min(Y0+15,W-3)}" text-anchor="middle" font-size="11" fill="#8aa0bd">${N(x)}</text>`;
 for(let y=Math.ceil(y0/ty)*ty;y<y1;y+=ty)if(y)s+=`<text x="${X0-5}" y="${sy(y)+4}" text-anchor="end" font-size="11" fill="#8aa0bd">${N(y)}</text>`;
 if(o.O)s+=`<text x="${X0-6}" y="${Y0+15}" text-anchor="end" font-size="13" font-weight="800" fill="#dfe8f5">O</text>`;
 if(o.sign!=null){const L=o.lines[o.sign],r=-L.b/L.m,pos=L.m>0?[r,x1]:[x0,r],neg=L.m>0?[x0,r]:[r,x1];
  s+=bar(pos[0],pos[1],GR)+bar(neg[0],neg[1],RD)+ln(seg(L,pos[0],pos[1]),GR,9,`stroke-opacity=".4" class="rv" style="--d:${A?1.6:0}s"`)+ln(seg(L,neg[0],neg[1]),RD,9,`stroke-opacity=".4" class="rv" style="--d:${A?1.6:0}s"`);}
 if(o.above){const F=o.lines[o.above[0]],H=o.lines[o.above[1]],xm=(H.b-F.b)/(F.m-H.m),rg=F.m>H.m?[xm,x1]:[x0,xm];
  s+=`<line x1="${sx(xm)}" y1="${P}" x2="${sx(xm)}" y2="${W-P}" stroke="#9fb3cc" stroke-dasharray="5 5"/>`+bar(rg[0],rg[1],F.col)+ln(seg(F,rg[0],rg[1]),F.col,9,`stroke-opacity=".4" class="rv" style="--d:${A?1.6:0}s"`);}
 o.lines.forEach((L,i)=>{const g=seg(L,x0,x1);if(!g)return;s+=ln(g,L.col||'#dfe8f5',3.2,A?`class="drawl" style="--d:${.2+i*.5}s"`:'');
  if(L.lab){const top=g[1]>g[3],xt=top?g[0]:g[2],xb=top?g[2]:g[0],xe=xb+(xt-xb)*.8,lx=sx(xe),ly=sy(L.m*xe+L.b),rt=L.m<0;
   s+=`<text x="${rt?lx+9:lx-9}" y="${ly+5}" text-anchor="${rt?'start':'end'}" fill="${L.col||'#dfe8f5'}" font-size="16" font-weight="800">${L.lab}</text>`;}});
 (o.pts||[]).forEach((p,i)=>{const cx=sx(p.x),cy=sy(p.y),R2=cx>W-80;
  s+=`<g ${A||p.anim?`class="rv" style="--d:${p.d!=null?p.d:1.4+i*.5}s"`:''}><circle cx="${cx}" cy="${cy}" r="5.5" fill="${p.col}" stroke="#0f1b2d" stroke-width="2"/>${p.lab?`<text x="${cx+(p.dx!=null?p.dx:R2?-8:8)}" y="${cy+(p.dy!=null?p.dy:-9)}" text-anchor="${p.ta||(R2?'end':'start')}" fill="${p.col}" font-size="14" font-weight="800" direction="ltr" unicode-bidi="bidi-override">${p.lab}</text>`:''}</g>`;});
 return s+'</svg>';}
const yrFor=(...v)=>[Math.min(-6,...v.map(x=>x-2)),Math.max(6,...v.map(x=>x+2))];
/* ===== "what is the question asking?" pre-steps ===== */
const ASK_Y=()=>({text:`על ציר ${M('y')} (הקו העומד), מה תמיד נכון?`,...CH([{t:M('x = 0'),ok:1},{t:M('y = 0'),msg:`${M('y = 0')} זה על ציר <b>x</b>. על ציר y לא זזים ימינה בכלל ← ${M('x = 0')}.`},{t:`${M('x')} ו־${M('y')} שווים`,msg:`על ציר y לא זזים ימינה ← ${M('x = 0')}, וה־y יכול להיות כל מספר.`}])});
const ASK_X=()=>({text:`על ציר ${M('x')} (הקו השוכב), מה תמיד נכון?`,...CH([{t:M('y = 0'),ok:1},{t:M('x = 0'),msg:`${M('x = 0')} זה על ציר <b>y</b>. על ציר x הגובה הוא 0 ← ${M('y = 0')}.`},{t:`${M('x')} ו־${M('y')} שווים`,msg:`על ציר x הגובה תמיד 0 ← ${M('y = 0')}.`}])});
const ASK_F0=()=>({text:`מה פירוש ${M('f(x) = 0')}?`,...CH([{t:'איפה הגרף חותך את ציר x',ok:1},{t:'איפה הגרף חותך את ציר y',msg:`${M('f(x)')} הוא הגובה. גובה 0 ← <b>על ציר x</b>.`},{t:`כמה זה ${M('b')}`,msg:`${M('f(x)')} הוא הגובה (ה־y). ${M('f(x) = 0')} ← הגובה 0 ← על ציר x.`}])});
const ASK_SIGN=pos=>({text:`מה פירוש ${pos?'«ערכים חיוביים» / '+M('f(x) > 0'):'«ערכים שליליים» / '+M('f(x) < 0')}?`,...CH([{t:'איפה הגרף מעל ציר x',ok:pos,msg:'שלילי = גובה מתחת ל־0 ← <b>מתחת</b> לציר x.'},{t:'איפה הגרף מתחת לציר x',ok:!pos,msg:'חיובי = גובה מעל 0 ← <b>מעל</b> ציר x.'},{t:'איפה הגרף חותך את ציר y',msg:`${M('f(x)')} הוא הגובה. ${pos?'חיובי':'שלילי'} ← ${pos?'מעל ציר x':'מתחת לציר x'}.`}])});
const ASK_EQ=()=>({text:`מה פירוש ${M('f(x) = g(x)')}?`,...CH([{t:'איפה שני הגרפים נפגשים',ok:1},{t:'איפה f גבוה מ־g',msg:'= פירושו <b>אותו גובה</b> ← הקווים נפגשים.'},{t:'איפה f חותך את ציר x',msg:'זה היה f(x) = 0. כאן משווים את f ל־g ← נקודת המפגש.'}])});
const ASK_GT=gt=>({text:`מה פירוש ${M('f(x) '+(gt?'>':'<')+' g(x)')}?`,...CH([{t:gt?'איפה הקו של f גבוה מהקו של g':'איפה הקו של f נמוך מהקו של g',ok:1},{t:'איפה הקווים נפגשים',msg:'מפגש זה "=". כאן יש סימן אי־שוויון ← מי למעלה.'},{t:gt?'איפה f מעל ציר x':'איפה f מתחת לציר x',msg:'משווים את f ל־<b>g</b>, לא לציר x.'}])});
const ASK_MATCH=slope=>({text:'מה יעזור לנו להחליט כאן איזה גרף שייך לאיזו משוואה?',...CH([{t:`הסימן של ${M('m')}: עולה או יורד`,ok:slope,msg:'כאן ל־2 המשוואות אותו m (מקבילים). מה שונה ביניהן? b.'},{t:`${M('b')}: איפה הקו חותך את ציר y`,ok:!slope,msg:'כאן ל־2 המשוואות אותו b: הן נפגשות על ציר y. מה שונה? הסימן של m.'},{t:'האורך של הקו',msg:'ישר הוא אינסופי, אין לו אורך. מסתכלים על מה ששונה במשוואות: m או b.'}])});
/* ===== ★ ידע ===== */
function gB(e){const m=e?R(1,4):nz(-4,4),b=e?R(1,7):nz(-7,7);
 return {kind:'חיתוך עם ציר y',rc:2,ask:ASK_Y(),text:`באיזו נקודה הישר ${EQ(m,b)} חותך את ציר ${M('y')}?`,tpl:'( [] , [] )',
  ans:[{label:'x =',lt:1,col:'#9fb3cc',val:0,neg:true,unit:''},{label:'y =',lt:1,col:OR,val:b,neg:true,unit:''}],
  dia:h=>h?G({lines:[{m,b,col:BL}],pts:[{x:0,y:b,col:OR,lab:Pt(0,b)}],yr:yrFor(b),anim:1}):'',
  lines:[`על ציר ${M('y')} תמיד ${M('x = 0')}.`,`מציבים ${M('x = 0')}: ${M('y = '+N(m)+' · 0'+bs(b)+' = '+N(b))}`,`הנקודה ${M(Pt(0,b))}. זה בדיוק ${C('b',OR)}!`],
  work:[{t:`על ציר ${M('y')}, מה תמיד ה־${M('x')}?`,ans:[{label:'x =',val:0}],why:`על ציר y לא זזים ימינה או שמאלה ← ${M('x = 0')}.`},
   {t:`מציבים ${M('x = 0')}: ${M('y = '+N(m)+' · 0'+bs(b)+' = ?')}`,ans:[{label:'y =',val:b}],why:`${M(N(m)+' · 0 = 0')}, אז נשאר רק ${C('b',OR)}: המספר שעומד לבד, עם הסימן שלו.`},
   {t:`אז הנקודה היא ${M('(x, y)')}. מה כותבים קודם?`,choice:[`קודם x ← ${M(Pt(0,b))}`,`קודם y ← ${M(Pt(b,0))}`],correct:0,why:'בנקודה תמיד כותבים <b>קודם x, אחר כך y</b>.'}],
  rule:'ישר חותך את ציר y בנקודה <span class="m">(0, b)</span>: ה־x הוא 0, וה־y הוא b.',
  diag:({vals:[vx,vy]})=>vx===b&&vy===0?'<b>הפכתם את הסדר!</b> על ציר y ה־x תמיד 0. כותבים קודם x ואחר כך y: <span class="m">(0, b)</span>.':vx!==0?'כל נקודה על ציר y: <b>ה־x שלה 0</b>.':vy===m?`זה ${C('m',BL)}, השיפוע. החיתוך עם ציר y הוא ${C('b',OR)}: המספר שעומד לבד, בלי x.`:vy===-b?`שימו לב לסימן של ${C('b',OR)}: הוא ${M(N(b))}.`:null};}
function gReadB(){const m=pick([1,2,3,-1,-2,-3]);let b;do b=nz(-5,5);while(b===m);const b3=b>0?b+2:b-2;
 const c=CH([{t:EQ(m,b),ok:1},{t:EQ(m,-b),msg:`בדקו את הסימן של b: הגרף חותך את ציר y ${b>0?'<b>מעל</b>':'<b>מתחת</b>'} לראשית, ב־${M(N(b))}.`},
  {t:EQ(b,m),msg:`החלפתם בין ${C('m',BL)} ל־${C('b',OR)}. ${C('b',OR)} הוא המספר שעומד לבד, בלי x, והוא מראה איפה הגרף חותך את ציר y.`},
  {t:EQ(m,b3),msg:`ספרו משבצות על ציר y: הגרף חותך אותו ב־${M(N(b))}, לא ב־${M(N(b3))}.`}]);
 return {kind:'קוראים את b מהגרף',rc:2,text:'איזו משוואה מתאימה לגרף? רמז: איפה הוא חותך את ציר y?',...c,
  dia:h=>G({lines:[{m,b,col:BL}],pts:h?[{x:0,y:b,col:OR,lab:Pt(0,b)}]:[],yr:[-7,7],anim:h}),
  lines:[`הגרף חותך את ציר y ב־${M(Pt(0,b))} ← ${M(C('b = '+N(b),OR))}`,`הגרף ${m>0?'עולה ↗ ← '+C('m',BL)+' חיובי':'יורד ↘ ← '+C('m',BL)+' שלילי'}`,`לכן: ${EQ(m,b)}`],
  rule:'b = הגובה שבו הישר חותך את ציר y.'};}
function gUpDown(){const m=nz(-5,5),b=nz(-6,6),tr=Math.sign(b)!==Math.sign(m);
 const c=CH([{t:'עולה ↗',ok:m>0,msg:`מסתכלים רק על ${C('m',BL)}, המספר שצמוד ל־x${tr?' (לא על b)':''}. כאן ${M(C('m = '+N(m),BL))} שלילי ← <b>יורד</b>.`},{t:'יורד ↘',ok:m<0,msg:`מסתכלים רק על ${C('m',BL)}, המספר שצמוד ל־x${tr?' (לא על b)':''}. כאן ${M(C('m = '+N(m),BL))} חיובי ← <b>עולה</b>.`}]);
 return {kind:'עולה או יורד',rc:3,text:`הישר ${EQ(m,b)}: עולה או יורד? (קוראים משמאל לימין)`,...c,
  dia:h=>h?G({lines:[{m,b,col:BL}],yr:yrFor(b),anim:1}):'',
  lines:[`${M(C('m = '+N(m),BL))} ← ${m>0?'חיובי ← הישר עולה ↗':'שלילי ← הישר יורד ↘'}`],rule:'m חיובי ← עולה. m שלילי ← יורד.'};}
function gOnAxis(){const t=pick(['y','x','n']),k=nz(-6,6),j=nz(-6,6),[x,y]=t==='y'?[0,k]:t==='x'?[k,0]:[k,j];
 const c=CH([{t:'על ציר x',ok:t==='x',msg:t==='y'?'כאן <b><span class="m">x = 0</span></b> ← הנקודה על ציר <b>y</b>.':'על ציר x חייב להיות <b><span class="m">y = 0</span></b>. כאן y לא 0.'},{t:'על ציר y',ok:t==='y',msg:t==='x'?'כאן <b><span class="m">y = 0</span></b> ← הנקודה על ציר <b>x</b>.':'על ציר y חייב להיות <b><span class="m">x = 0</span></b>. כאן x לא 0.'},{t:'לא על אף ציר',ok:t==='n',msg:'יש כאן 0! מספר 0 אומר שהנקודה יושבת על ציר.'}]);
 return {kind:'על איזה ציר?',rc:1,text:`איפה נמצאת הנקודה ${M(Pt(x,y))}?`,...c,dia:h=>h?G({lines:[],pts:[{x,y,col:OR,lab:Pt(x,y)}],anim:1}):'',
  lines:[t==='y'?`${M('x = 0')} ← על ציר y.`:t==='x'?`${M('y = 0')} ← על ציר x.`:'אין 0 ← הנקודה לא על ציר.'],rule:'<span class="m">x = 0</span> ← על ציר y.  <span class="m">y = 0</span> ← על ציר x.'};}
/* ===== ★★ יישום ===== */
function gXint(ph,e){let r,m;do{r=nz(-5,5);m=e?pick([1,2]):pick([1,2,3,-1,-2,-3]);}while(Math.abs(m*r)>12);const b=-m*r;ph=ph!=null?ph:R(0,1);
 const st=[`${M(RHS(m,b)+' = 0')}`,`${M(mx(m)+' = '+N(-b))}`];if(m!==1)st.push(`${M('x = '+N(-b)+' : '+par(m)+' = '+N(r))}`);
 return {kind:'חיתוך עם ציר x',rc:5,ask:ph?ASK_F0():ASK_X(),text:ph?`מצאו את הנקודה שבה ${M('f(x) = 0')}, עבור ${EQ(m,b,'f(x)')}.`:`באיזו נקודה הישר ${EQ(m,b)} חותך את ציר ${M('x')}?`,tpl:'( [] , [] )',
  ans:[{label:'x =',lt:1,col:GR,val:r,neg:true,unit:''},{label:'y =',lt:1,col:'#9fb3cc',val:0,neg:true,unit:''}],
  dia:h=>h?G({lines:[{m,b,col:BL}],pts:[{x:r,y:0,col:GR,lab:Pt(r,0),dy:-10},{x:0,y:b,col:OR,d:2.4}],yr:yrFor(b),anim:1}):'',
  work:[{t:`על ציר ${M('x')}, מה תמיד ה־${M('y')}?`,ans:[{label:'y =',val:0}],why:`על ציר x הגובה הוא 0 ← ${M('y = 0')}.`},
   {t:`מציבים ${M('y = 0')}: ${M(RHS(m,b)+' = 0')}. מעבירים את ${M(N(b))} לצד השני: ${M(mx(m)+' = ?')}`,ans:[{label:mx(m)+' =',val:-b}],why:`כשמעבירים מספר לצד השני, <b>הסימן שלו מתהפך</b>: ${M(N(b))} ← ${M(N(-b))}.`},
   ...(m!==1?[{t:`מחלקים ב־${M(par(m))}: ${M('x = '+N(-b)+' : '+par(m)+' = ?')}`,ans:[{label:'x =',val:r}],why:`בחילוק: סימנים שווים ← פלוס, סימנים שונים ← מינוס.`}]:[]),
   ...(()=>{const o=shuf([[M(Pt(r,0)),1],[M(Pt(0,r)),0]]);return [{t:`הנקודה: קודם x, אחר כך y. מה היא?`,choice:o.map(x=>x[0]),correct:o.findIndex(x=>x[1]),why:`על ציר x הנקודה נראית כך: ${M('(x, 0)')}.`}];})()],
  lines:[`על ציר x תמיד ${M('y = 0')}${ph?` (וזה בדיוק ${M('f(x) = 0')})`:''}. מציבים:`,...st,`הנקודה: ${M(C(Pt(r,0),GR))}`],rule:'ציר x ← מציבים <span class="m">y = 0</span> ופותרים. התשובה: <span class="m">(x, 0)</span>.',
  diag:({vals:[vx,vy]})=>vx===0&&vy===b?'זו נקודת החיתוך עם ציר <b>y</b>. כאן מחפשים את ציר <b>x</b>: מציבים 0 במקום y.':vx===0&&vy===r?'הסדר הפוך: קודם x ואחר כך y.':vy!==0?'על ציר x <b>ה־y תמיד 0</b>: התשובה נראית כך <span class="m">(?, 0)</span>.':vx===b?`${M(N(b))} זה b, החיתוך עם ציר y. כאן פותרים משוואה: ${M(RHS(m,b)+' = 0')}.`:vx===-r?'כמעט! בדקו את הסימן כשמעבירים את b לצד השני.':null};}
function gMatch(){const L=shuf(['א','ב']),slope=Math.random()<.6;let I,II,rc,rw,dw;
 if(slope){const a=pick([1,2,3]),b=pick([2,3,4,5,6]),s=pick([1,-1]);I={m:s*a,b};II={m:-s*a,b};rc=s>0?'השיפוע חיובי ← הישר עולה':'השיפוע שלילי ← הישר יורד';rw=s>0?'השיפוע חיובי ← הישר יורד':'השיפוע שלילי ← הישר עולה';dw={t:'כי הוא חותך את ציר y גבוה יותר',msg:'לשני הישרים <b>אותו b</b>, הם נפגשים על ציר y. כאן מחליטים לפי <b>m</b>: עולה או יורד.'};}
 else{const m=pick([1,2,-1,-2]),b1=pick([2,3,4,5]),b2=-pick([2,3,4]),s=pick([1,-1]);I={m,b:s>0?b1:b2};II={m,b:s>0?b2:b1};rc=s>0?'b חיובי ← חותך את ציר y מעל הראשית':'b שלילי ← חותך את ציר y מתחת לראשית';rw=s>0?'b חיובי ← חותך את ציר y מתחת לראשית':'b שלילי ← חותך את ציר y מעל הראשית';dw={t:'כי הוא עולה',msg:'שני הישרים <b>מקבילים</b> (אותו m), שניהם עולים או שניהם יורדים. כאן מחליטים לפי <b>b</b>.'};}
 const lines=[{...I,lab:L[0]},{...II,lab:L[1]}],ok=L[0],no=L[1];
 const c=CH([{t:`גרף ${ok}: ${rc}`,ok:1},{t:`גרף ${no}: ${rw}`,msg:'ההסבר הפוך. '+(slope?'m חיובי ← עולה, m שלילי ← יורד.':'b חיובי ← מעל הראשית, b שלילי ← מתחת.')},{t:`גרף ${ok}: ${rw}`,msg:'הגרף נכון, אבל ההסבר הפוך. '+(slope?'m חיובי ← עולה.':'b חיובי ← מעל הראשית.')},{t:`גרף ${no}: ${dw.t}`,msg:dw.msg}]);
 return {kind:'התאמת גרף למשוואה',rc:4,ask:ASK_MATCH(slope),text:`בשרטוט שני ישרים:<br>${M('I')}: ${EQ(I.m,I.b)}<br>${M('II')}: ${EQ(II.m,II.b)}<br>איזה גרף מתאים למשוואה ${M('I')}, ולמה?`,...c,
  dia:h=>G({lines:lines.map((x,i)=>({...x,col:h?(i?PU:BL):'#dfe8f5'})),yr:[-7,8],anim:h}),
  lines:slope?[`לשני הישרים אותו b ← מחליטים לפי ${C('m',BL)}.`,`ב־${M('I')}: ${M(C('m = '+N(I.m),BL))} ← ${I.m>0?'עולה ↗':'יורד ↘'} ← גרף ${ok}.`]:[`לשני הישרים אותו m (מקבילים) ← מחליטים לפי ${C('b',OR)}.`,`ב־${M('I')}: ${M(C('b = '+N(I.b),OR))} ← ${I.b>0?'מעל הראשית':'מתחת לראשית'} ← גרף ${ok}.`],
  rule:'התאמה: <span class="m">(1)</span> עולה או יורד? לפי הסימן של m. <span class="m">(2)</span> איפה חותך את ציר y? לפי b.'};}
function gPointOn(){const m=nz(-3,3),b=nz(-6,6),p=nz(-4,4),yv=m*p+b,on=Math.random()<.5,q=on?yv:yv+pick([-2,-1,1,2]);
 return {kind:'האם הנקודה על הישר?',rc:0,text:`האם הנקודה ${M(Pt(p,q))} נמצאת על הישר ${EQ(m,b)}?<br>הציבו ${M('x = '+N(p))}: כמה יוצא y?`,
  ans:[{label:'y =',lt:1,col:OR,val:yv,neg:true,unit:''}],choice:['כן, היא על הישר','לא, היא לא על הישר'],correct:on?0:1,choiceLab:'האם הנקודה על הישר?',
  dia:h=>h?G({lines:[{m,b,col:BL}],pts:[{x:p,y:q,col:on?GR:RD,lab:Pt(p,q)}],yr:yrFor(q,b),anim:1}):'',
  lines:[`${M('y = '+N(m)+' · '+par(p)+bs(b)+' = '+N(yv))}`,on?`יצא ${M(N(yv))}, בדיוק כמו בנקודה ← <b>על הישר</b> ✓`:`יצא ${M(N(yv))}, אבל בנקודה ${M('y = '+N(q))} ← <b>לא על הישר</b>.`],
  work:[{t:`קודם כפל: ${M(N(m)+' · '+par(p)+' = ?')}`,ans:[{label:'',val:m*p}],why:'כפל סימנים: <b>מינוס כפול מינוס = פלוס</b>, מינוס כפול פלוס = מינוס.'},
   {t:`עכשיו מוסיפים את b: ${M(N(m*p)+bs(b)+' = ?')}`,ans:[{label:'y =',val:yv}],why:`חושבים על ציר המספרים: מתחילים ב־${M(N(m*p))} וזזים ${b>0?'ימינה':'שמאלה'} ${Math.abs(b)}.`},
   {t:`יצא ${M('y = '+N(yv))}. בנקודה ${M('y = '+N(q))}. מה המסקנה?`,choice:['שווים ← הנקודה על הישר','לא שווים ← הנקודה לא על הישר'],correct:on?0:1,why:'נקודה על הישר <b>רק</b> אם יוצא בדיוק ה־y שלה.'}],
  rule:'נקודה על הישר ← כשמציבים את ה־x שלה, יוצא בדיוק ה־y שלה.',
  diag:({vals:[v]})=>v!==yv?`מציבים: ${M(N(m)+' · '+par(p)+bs(b))}. זהירות: מינוס כפול מינוס זה פלוס.`:null};}
/* ===== ★★★ הבנה ===== */
const DICT=[{k:'z',p:M('f(x) = 0'),m:'איפה הגרף של f חותך את ציר x'},{k:'p',p:M('f(x) > 0'),m:'איפה הגרף של f נמצא מעל ציר x'},{k:'n',p:M('f(x) < 0'),m:'איפה הגרף של f נמצא מתחת לציר x'},
 {k:'e',p:M('f(x) = g(x)'),m:'איפה הגרפים של f ושל g נפגשים'},{k:'a',p:M('f(x) > g(x)'),m:'איפה הגרף של f גבוה יותר מהגרף של g'},{k:'0',p:M('f(0)'),m:'איפה הגרף של f חותך את ציר y'},
 {k:'p',p:'«הפונקציה f מקבלת ערכים חיוביים»',m:'איפה הגרף של f נמצא מעל ציר x'},{k:'n',p:'«הפונקציה f מקבלת ערכים שליליים»',m:'איפה הגרף של f נמצא מתחת לציר x'}];
const FF={m:-2,b:3,col:FC,lab:'f'},GG={m:3,b:-7,col:GC,lab:'g'};
function gDict(){const d=pick(DICT),oth=shuf([...new Set(DICT.filter(x=>x.k!==d.k).map(x=>x.m))]).slice(0,3);
 const ex={z:'<span class="m">f(x)</span> הוא הגובה (ה־y). גובה 0 ← על ציר x.',p:'<span class="m">f(x)</span> הוא הגובה. גובה חיובי ← מעל ציר x.',n:'<span class="m">f(x)</span> הוא הגובה. גובה שלילי ← מתחת לציר x.',e:'אותו x, אותו גובה ← נקודת המפגש.',a:'בכל x בודקים: איזה קו למעלה?','0':'<span class="m">f(0)</span> = הגובה כש־<span class="m">x = 0</span> ← על ציר y. זה b!'}[d.k];
 const c=CH([{t:d.m,ok:1},...oth.map(t=>({t,msg:`לא. ${ex}`}))]);
 const pts={z:[{x:1.5,y:0,col:GR,lab:'(1.5, 0)'}],e:[{x:2,y:-1,col:OR,lab:'(2, −1)'}],'0':[{x:0,y:3,col:OR,lab:'(0, 3)'}]}[d.k]||[];
 return {kind:'מילון השאלות',rc:d.k==='e'||d.k==='a'?7:6,text:`מה פירוש ${d.p} בשאלה?`,...c,
  dia:h=>h?G({lines:[FF,GG],pts,sign:d.k==='p'||d.k==='n'?0:null,above:d.k==='a'?[0,1]:null,yr:[-7,7],anim:1}):'',
  lines:[`${d.p} ← ${d.m}.`,ex],rule:'<span class="m">f(x)</span> = הגובה של הגרף. = 0 ← על ציר x. > 0 ← מעל. < 0 ← מתחת.'};}
function gSign(){let r,m;do{r=nz(-5,5);m=pick([1,2,3,-1,-2,-3]);}while(Math.abs(m*r)>12);const b=-m*r,pos=Math.random()<.5,w=Math.random()<.5;
 const big=(m>0)===pos,T=v=>M('x > '+N(v)),S=v=>M('x < '+N(v)),d=b!==r?b:-r;
 const c=CH([{t:T(r),ok:big,msg:`הפוך! הישר ${m>0?'עולה':'יורד'}. בדקו בציור: איפה הוא ${pos?'מעל ציר x':'מתחת לציר x'}?`},{t:S(r),ok:!big,msg:`הפוך! הישר ${m>0?'עולה':'יורד'}. בדקו בציור: איפה הוא ${pos?'מעל ציר x':'מתחת לציר x'}?`},
  {t:T(d),msg:`${M(N(d))} זה לא החיתוך עם ציר x. התחום מתחיל במקום שבו ${M('f(x) = 0')}: ${M('x = '+N(r))}.`},{t:S(d),msg:`${M(N(d))} זה לא החיתוך עם ציר x. התחום מתחיל במקום שבו ${M('f(x) = 0')}: ${M('x = '+N(r))}.`}]);
 return {kind:'חיובי ושלילי',rc:6,ask:ASK_SIGN(pos),text:w?`עבור אילו ערכי x הפונקציה ${EQ(m,b,'f(x)')} מקבלת ערכים ${pos?'חיוביים':'שליליים'}?`:`מצאו את התחום שבו ${M('f(x) '+(pos?'>':'<')+' 0')}, עבור ${EQ(m,b,'f(x)')}.`,...c,
  dia:h=>G({lines:[{m,b,col:BL}],pts:h?[{x:r,y:0,col:'#dfe8f5',lab:Pt(r,0)}]:[],sign:h?0:null,yr:yrFor(b),anim:h}),
  lines:[`שלב 1: איפה ${M('f(x) = 0')}? ${M(RHS(m,b)+' = 0')} ← ${M('x = '+N(r))}`,`שלב 2: הישר ${m>0?'עולה ↗':'יורד ↘'}. ${C('ירוק',GR)} = מעל ציר x, ${C('אדום',RD)} = מתחת.`,`${pos?'מעל ציר x':'מתחת לציר x'} ← ${big?T(r):S(r)}`],
  rule:'חיובי = מעל ציר x, שלילי = מתחת. מוצאים איפה <span class="m">f(x) = 0</span>, ובודקים לאיזה צד הגרף עולה.'};}
function meetPair(){let a1,a2,x0,y0,b1,b2;do{a1=pick([-3,-2,-1,1,2,3]);a2=pick([-3,-2,-1,1,2,3]);x0=nz(-3,3);y0=R(-4,4);b1=y0-a1*x0;b2=y0-a2*x0;}while(a1===a2||Math.abs(b1)>9||Math.abs(b2)>9);return {a1,a2,x0,y0,b1,b2};}
const twoDia=(o,h,ex)=>G({lines:[{m:o.a1,b:o.b1,col:FC,lab:'f'},{m:o.a2,b:o.b2,col:GC,lab:'g'}],yr:[-9,9],anim:h,...ex});
function gMeet(){const o=meetPair(),{a1,a2,x0,y0,b1,b2}=o,d=a1-a2;
 return {kind:'נקודת מפגש',rc:7,ask:ASK_EQ(),text:`${EQf(a1,b1,'f(x)',FC)}<br>${EQf(a2,b2,'g(x)',GC)}<br>מצאו את x שעבורו ${M('f(x) = g(x)')}.`,ans:[{label:'x =',col:PU,val:x0,neg:true,unit:''}],
  dia:h=>h?twoDia(o,1,{pts:[{x:x0,y:y0,col:OR,lab:Pt(x0,y0)}]}):'',
  lines:[`${M('f(x) = g(x)')} ← שני הגרפים באותו גובה ← נקודת המפגש.`,M(C(RHS(a1,b1),FC)+' = '+C(RHS(a2,b2),GC)),M(mx(d)+' = '+N(b2-b1)),...(d!==1?[M('x = '+N(b2-b1)+' : '+par(d)+' = '+N(x0))]:[])],
  work:[{t:`משווים: ${M(C(RHS(a1,b1),FC)+' = '+C(RHS(a2,b2),GC))}. מעבירים את ה־x לצד שמאל: ${M(N(a1)+' − '+par(a2)+' = ?')}`,ans:[{label:'',val:d}],why:`מעבירים ${M(mx(a2))} לצד שמאל ← <b>הסימן מתהפך</b> ← מחסירים: ${M(N(a1)+' − '+par(a2))}.`},
   {t:`מעבירים את המספרים לצד ימין: ${M(N(b2)+' − '+par(b1)+' = ?')}`,ans:[{label:'',val:b2-b1}],why:`מעבירים ${M(N(b1))} לצד ימין ← הסימן מתהפך.`},
   ...(d!==1?[{t:`${M(mx(d)+' = '+N(b2-b1))}. מחלקים: ${M('x = '+N(b2-b1)+' : '+par(d)+' = ?')}`,ans:[{label:'x =',val:x0}],why:'בחילוק: סימנים שווים ← פלוס, סימנים שונים ← מינוס.'}]:[])],
  rule:'<span class="m">f(x) = g(x)</span> ← משווים את שני הביטויים ופותרים. זה ה־x של נקודת המפגש.',
  diag:({vals:[v]})=>v===y0&&y0!==x0?'זה ה־<b>y</b> של נקודת המפגש. השאלה שואלת על <b>x</b>.':v===-x0?'בדקו את הסימן בחילוק.':null};}
function gAbove(){const o=meetPair(),{a1,a2,x0,y0,b1,b2}=o,d=a1-a2,gt=Math.random()<.6,s=gt?'>':'<',big=(d>0)===gt,T=v=>M('x > '+N(v)),S=v=>M('x < '+N(v)),dv=y0!==x0?y0:-x0;
 const flip=d<0?'שכחתם להפוך את הסימן! חילקנו במספר שלילי.':'הפוך. בדקו בציור: איזה קו למעלה?';
 const c=CH([{t:T(x0),ok:big,msg:flip},{t:S(x0),ok:!big,msg:flip},{t:T(dv),msg:`התחום מתחיל ב־x של נקודת המפגש: ${M('x = '+N(x0))}.`},{t:S(dv),msg:`התחום מתחיל ב־x של נקודת המפגש: ${M('x = '+N(x0))}.`}]);
 const fs=(d<0?(gt?'<':'>'):s);
 return {kind:'מי גבוה יותר?',rc:7,ask:ASK_GT(gt),text:`${EQf(a1,b1,'f(x)',FC)}<br>${EQf(a2,b2,'g(x)',GC)}<br>באיזה תחום ${M('f(x) '+s+' g(x)')}?`,...c,
  dia:h=>twoDia(o,h,h?{above:gt?[0,1]:[1,0],pts:[{x:x0,y:y0,col:OR,lab:Pt(x0,y0)}]}:{}),
  lines:[M(C(RHS(a1,b1),FC)+' '+s+' '+C(RHS(a2,b2),GC)),M(mx(d)+' '+s+' '+N(b2-b1)),...(d!==1?[`מחלקים ב־${M(par(d))}${d<0?' ← <b>מספר שלילי: הסימן מתהפך!</b>':''}`]:[]),M('x '+fs+' '+N(x0)),`בציור: ${gt?C('f',FC)+' מעל '+C('g',GC):C('g',GC)+' מעל '+C('f',FC)} ← ${big?T(x0):S(x0)}`],
  rule:'<span class="m">f(x) > g(x)</span> ← איפה הקו של f למעלה. פותרים אי־שוויון; בחילוק במספר שלילי הסימן מתהפך.'};}
/* ===== ★★★★ חשיבה ואוריינות ===== */
function triSet(even){let a,k,b;do{a=pick([1,2,3]);k=pick([2,3,4]);b=a*k;}while(b>12||(even&&(k*b)%2));const L=shuf(['א','ב']);
 return {a,k,b,up:L[0],dn:L[1],I:{m:-a,b},II:{m:a,b}};}
const triDia=(t,h,ex={})=>G({lines:[{m:t.a,b:t.b,lab:t.up,col:h?BL:'#dfe8f5'},{m:-t.a,b:t.b,lab:t.dn,col:h?PU:'#dfe8f5'}],pts:[{x:-t.k,y:0,col:'#dfe8f5',lab:'A',dy:16,dx:-12},{x:t.k,y:0,col:'#dfe8f5',lab:'B',dy:16,dx:6},{x:0,y:t.b,col:'#dfe8f5',lab:'C',dx:8,dy:4}],xr:[-6,6],yr:[-2,t.b+3],O:1,anim:h,...ex});
const triTxt=t=>`בשרטוט הישרים:<br>${M('I')}: ${EQ(t.I.m,t.I.b)}<br>${M('II')}: ${EQ(t.II.m,t.II.b)}<br>`;
function gTri(ask){ask=ask||pick(['A','C','ABC','AOC']);const t=triSet(ask==='AOC'),{a,k,b}=t;
 const base={kind:ask.length>1?'שטח משולש':'שיעורי נקודה בשרטוט',rc:8,dia:h=>triDia(t,h,h?{tri:[[-k,0],[k,0],[0,b]]}:{})};
 if(ask==='A')return {...base,text:triTxt(t)+'מצאו את שיעורי הנקודה A.',tpl:'( [] , [] )',ans:[{label:'x =',lt:1,col:GR,val:-k,neg:true,unit:''},{label:'y =',lt:1,col:'#9fb3cc',val:0,neg:true,unit:''}],
  lines:['A על ציר x ← מציבים <span class="m">y = 0</span> בישר שעובר דרכה (העולה, II).',M('0 = '+a+'x + '+b)+' ← '+M('x = '+N(-k)),`${M('A'+Pt(-k,0))}`],rule:'נקודה על ציר x: מציבים <span class="m">y = 0</span>. נקודה על ציר y: היא <span class="m">(0, b)</span>.',
  diag:({vals:[vx,vy]})=>vx===k?'A נמצאת <b>משמאל</b> לראשית ← ה־x שלה שלילי.':vx===0?'זו C. הנקודה A נמצאת על ציר <b>x</b>: מציבים <span class="m">y = 0</span>.':vy!==0?'A על ציר x ← ה־y שלה 0.':null};
 if(ask==='C')return {...base,text:triTxt(t)+'מצאו את שיעורי הנקודה C.',tpl:'( [] , [] )',ans:[{label:'x =',lt:1,col:'#9fb3cc',val:0,neg:true,unit:''},{label:'y =',lt:1,col:OR,val:b,neg:true,unit:''}],
  lines:['C על ציר y ← <span class="m">x = 0</span>, וה־y הוא b (בשני הישרים b זהה).',M('C'+Pt(0,b))],rule:'נקודה על ציר y: היא <span class="m">(0, b)</span>.',diag:({vals:[vx,vy]})=>vx===b&&vy===0?'הסדר הפוך: <span class="m">(0, b)</span>.':vx!==0?'C על ציר y ← <span class="m">x = 0</span>.':null};
 const S2=k*b,full=ask==='ABC';
 return {...base,text:triTxt(t)+`חשבו את שטח המשולש ${M(full?'ABC':'AOC')}.`,ans:[{label:'שטח =',col:OR,val:full?S2:S2/2,unit:''}],
  lines:[`${M('C'+Pt(0,b))} ← גובה ${M('OC = '+b)}`,`${M('A'+Pt(-k,0))}, ${M('B'+Pt(k,0))} (מציבים y = 0)`,full?`בסיס ${M('AB = '+2*k)} (מ־${M(N(-k))} עד ${M(k)})`:`בסיס ${M('AO = '+k)}`,`שטח = ${M('('+(full?2*k:k)+' · '+b+') : 2 = '+(full?S2:S2/2))}`],
  rule:'שטח משולש = (בסיס · גובה) : 2. הבסיס על ציר x, הגובה = b.',
  diag:({vals:[v]})=>v===(full?2*S2:S2)?'שכחתם לחלק ב־2: שטח משולש = (בסיס · גובה) : 2.':full&&v===S2/2?`זה רק חצי מהמשולש (AOC). הבסיס הוא כל AB = ${2*k}.`:!full&&v===S2?`זה כל המשולש ABC. הבסיס של AOC הוא רק AO = ${k}.`:null};}
function gTriSign(){const t=triSet(),{k}=t,up=Math.random()<.5,L=up?t.up:t.dn,pos=Math.random()<.5,T=v=>M('x > '+N(v)),S=v=>M('x < '+N(v));
 const r=up?-k:k,big=up===pos;const msgO=`הגרף ${L} חותך את ציר x ב־${M(N(r))}, לא ב־${M(N(-r))}.`,msgF='הפוך! '+(pos?'חיובי = מעל ציר x.':'שלילי = מתחת לציר x.')+' בדקו לאיזה צד.';
 const c=CH([{t:T(r),ok:big,msg:msgF},{t:S(r),ok:!big,msg:msgF},{t:T(-r),msg:msgO},{t:S(-r),msg:msgO}]);
 return {kind:'חיובי ושלילי בשרטוט',rc:6,text:triTxt(t)+`עבור אילו ערכי x הפונקציה שבגרף ${L} מקבלת ערכים ${pos?'חיוביים':'שליליים'}?`,...c,
  dia:h=>triDia(t,h,h?{sign:up?0:1}:{}),
  lines:[`גרף ${L} ${up?'עולה':'יורד'} וחותך את ציר x ב־${M(up?'A':'B')} ← ${M('x = '+N(r))}`,`${pos?'מעל ציר x ('+C('ירוק',GR)+')':'מתחת לציר x ('+C('אדום',RD)+')'} ← ${big?T(r):S(r)}`],
  rule:'חיובי = מעל ציר x, שלילי = מתחת. מתחילים מנקודת החיתוך עם ציר x.'};}
const STORIES=[{t:'מחיר נסיעה במונית',x:'מספר הקילומטרים',y:'המחיר בשקלים',m:[3,4,5],b:[8,10,12,15],mm:'המחיר לכל קילומטר',bm:'תשלום קבוע, גם לפני שנוסעים'},
 {t:'מים בבריכה',x:'מספר הדקות',y:'כמות המים בליטרים',m:[20,30,50],b:[100,200,300],mm:'כמה ליטרים נכנסים בכל דקה',bm:'כמות המים שהייתה בבריכה בהתחלה'},
 {t:'מנוי לחדר כושר',x:'מספר האימונים',y:'המחיר בשקלים',m:[15,20,25],b:[50,80,100],mm:'המחיר לכל אימון',bm:'דמי הרשמה קבועים'}];
function gStory(){const s=pick(STORIES),m=pick(s.m),b=pick(s.b),ask=pick(['b','m','v']),n=R(2,6);const head=`${s.t}: ${M('y = '+C(m+'x',BL)+C(' + '+b,OR))}<br>x = ${s.x}, y = ${s.y}.<br>`;
 if(ask==='v')return {kind:'בעיה מילולית',rc:2,text:head+`מה הערך של y כאשר ${M('x = '+n)}?`,ans:[{label:'y =',lt:1,col:OR,val:m*n+b,unit:''}],
  lines:[M('y = '+m+' · '+n+' + '+b+' = '+(m*n)+' + '+b+' = '+(m*n+b))],rule:'מציבים את x בנוסחה ומחשבים.',diag:({vals:[v]})=>v===m*n?`שכחתם להוסיף את ${C(b,OR)}, הסכום הקבוע.`:v===(m+b)*n?'קודם כפל, אחר כך חיבור.':null};
 const num=ask==='b'?b:m,col=ask==='b'?OR:BL;
 const c=CH([{t:s.bm,ok:ask==='b',msg:`${C(m,BL)} צמוד ל־x ← הוא משתנה בכל יחידה: ${s.mm}.`},{t:s.mm,ok:ask==='m',msg:`${C(b,OR)} עומד לבד (בלי x) ← הוא קיים גם כש־x = 0: ${s.bm}.`},{t:'הסכום הכולל בסוף',msg:'הסכום הכולל הוא y, והוא משתנה לפי x.'},{t:s.x,msg:'זה x, הנעלם. המספר שבשאלה קבוע.'}]);
 return {kind:'בעיה מילולית',rc:2,text:head+`מה המשמעות של המספר ${M(C(num,col))}?`,...c,
  lines:[`${C(b,OR)} = b ← עומד לבד ← ההתחלה, כש־${M('x = 0')}: ${s.bm}.`,`${C(m,BL)} = m ← צמוד ל־x ← ${s.mm}.`],rule:'בסיפור: b = ההתחלה (כש־<span class="m">x = 0</span>). m = כמה מוסיפים בכל יחידה.'};}
function gErr(){const nm=pick(['נועה','דניאל','איתי','מאיה','יואב']);
 if(Math.random()<.5){let m,b;do{m=nz(-4,4);b=nz(-8,8);}while(m===b||m===-b);
  const c=CH([{t:`הסדר הפוך. הנקודה היא ${M(Pt(0,b))}`,ok:1},{t:`הנקודה היא ${M(Pt(0,m))}`,msg:`${M(N(m))} זה m, השיפוע. החיתוך עם ציר y הוא b.`},{t:`הנקודה היא ${M(Pt(m,0))}`,msg:'על ציר y ה־x תמיד 0.'},{t:'אין טעות',msg:`בנקודה ${M(Pt(b,0))} ה־y הוא 0 ← היא על ציר <b>x</b>, לא על ציר y.`}]);
  return {kind:'מוצאים את הטעות',rc:9,text:`${nm} כתב/ה: «הישר ${EQ(m,b)} חותך את ציר y בנקודה ${M(Pt(b,0))}». מה הטעות?`,...c,
   dia:h=>h?G({lines:[{m,b,col:BL}],pts:[{x:0,y:b,col:GR,lab:Pt(0,b)}],yr:yrFor(b),anim:1}):'',lines:[`על ציר y: ${M('x = 0')} ← כותבים ${M(Pt(0,b))}.`],rule:'<span class="m">(x, y)</span>: קודם x ואחר כך y. על ציר y, <span class="m">x = 0</span>.'};}
 let r,m;do{r=nz(-5,5);m=pick([1,2,3,-1,-2,-3]);}while(Math.abs(m*r)>12||-m*r===r);const b=-m*r;
 const c=CH([{t:`הסדר הפוך. הנקודה היא ${M(Pt(r,0))}`,ok:1},{t:`הנקודה היא ${M(Pt(0,b))}`,msg:'זה החיתוך עם ציר <b>y</b>. כאן שואלים על ציר x.'},{t:`הנקודה היא ${M(Pt(b,0))}`,msg:`b לא עוזר כאן. פותרים ${M(RHS(m,b)+' = 0')}.`},{t:'אין טעות',msg:`בנקודה ${M(Pt(0,r))} ה־x הוא 0 ← היא על ציר <b>y</b>.`}]);
 return {kind:'מוצאים את הטעות',rc:9,text:`${nm} פתר/ה ${M(RHS(m,b)+' = 0')}, קיבל/ה ${M('x = '+N(r))} וכתב/ה: «הישר חותך את ציר x בנקודה ${M(Pt(0,r))}». מה הטעות?`,...c,
  dia:h=>h?G({lines:[{m,b,col:BL}],pts:[{x:r,y:0,col:GR,lab:Pt(r,0)}],yr:yrFor(b),anim:1}):'',lines:[`על ציר x: ${M('y = 0')} ← כותבים ${M(Pt(r,0))}.`],rule:'<span class="m">(x, y)</span>: קודם x ואחר כך y. על ציר x, <span class="m">y = 0</span>.'};}
/* ===== exam-style chains (one graph, several steps) ===== */
function chain7(){const t=triSet(),{a,k,b}=t,upL=Math.random()<.5,Lq=upL?t.up:t.dn,r=upL?-k:k,pos=Math.random()<.5,big=upL===pos,T=v=>M('x > '+N(v)),S=v=>M('x < '+N(v));
 const steps=[
  {text:`איזה גרף מתאים למשוואה ${M('I')}: ${EQ(-a,b)}?`,short:`הגרף של ${M('I')}`,...CH([{t:`גרף ${t.dn}`,ok:1},{t:`גרף ${t.up}`,msg:`ב־${M('I')} ${M(C('m = '+N(-a),BL))}: שלילי ← הקו <b>יורד</b> ↘.`}]),hint:'לשני הישרים אותו b. מסתכלים על m: עולה או יורד?',lines:[`${M(C('m = '+N(-a),BL))} שלילי ← יורד ← גרף ${t.dn}.`],rule:'התאמה: הסימן של m (עולה/יורד), ואם צריך גם b.'},
  {text:`מהם שיעורי הנקודה ${M('C')}?`,short:M('C'),tpl:'( [] , [] )',ans:[{label:'x =',lt:1,col:'#9fb3cc',val:0,neg:true,unit:''},{label:'y =',lt:1,col:OR,val:b,neg:true,unit:''}],hint:'C על ציר y ← x = 0, וה־y הוא b.',lines:[`C על ציר y ← ${M('C'+Pt(0,b))} (זה b!).`],rule:'נקודה על ציר y: (0, b).',diag:({vals:[u,v]})=>u===b&&v===0?'הסדר הפוך: (0, b).':u!==0?'C על ציר y ← x = 0.':null},
  {text:`מהם שיעורי הנקודה ${M('A')}? (A על הישר העולה, ${M('II')})`,short:M('A'),tpl:'( [] , [] )',ans:[{label:'x =',lt:1,col:GR,val:-k,neg:true,unit:''},{label:'y =',lt:1,col:'#9fb3cc',val:0,neg:true,unit:''}],hint:`A על ציר x ← מציבים y = 0 ב־${M('II')} ופותרים.`,lines:[M('0 = '+a+'x + '+b),M(a+'x = '+N(-b)),M('x = '+N(-k)),M('A'+Pt(-k,0))],rule:'נקודה על ציר x: מציבים y = 0.',diag:({vals:[u,v]})=>u===k?'A <b>משמאל</b> לראשית ← x שלילי.':v!==0?'A על ציר x ← y = 0.':null},
  {text:`מהם שיעורי הנקודה ${M('B')}? (B על הישר היורד, ${M('I')})`,short:M('B'),tpl:'( [] , [] )',ans:[{label:'x =',lt:1,col:GR,val:k,neg:true,unit:''},{label:'y =',lt:1,col:'#9fb3cc',val:0,neg:true,unit:''}],hint:`מציבים y = 0 ב־${M('I')}.`,lines:[M('0 = '+N(-a)+'x + '+b),M(N(-a)+'x = '+N(-b)),M('x = '+k),M('B'+Pt(k,0))],rule:'נקודה על ציר x: מציבים y = 0.',diag:({vals:[u,v]})=>u===-k?'B <b>מימין</b> לראשית ← x חיובי. בדקו את הסימן בחילוק.':v!==0?'B על ציר x ← y = 0.':null},
  {text:`חשבו את שטח המשולש ${M('ABC')}.`,short:'שטח',ans:[{label:'שטח =',col:OR,val:k*b,unit:''}],hint:`בסיס = AB (מ־${M(N(-k))} עד ${M(k)}), גובה = OC = b. שטח = (בסיס · גובה) : 2.`,lines:[`בסיס ${M('AB = '+2*k)}, גובה ${M('OC = '+b)}`,M('('+2*k+' · '+b+') : 2 = '+k*b)],rule:'שטח משולש = (בסיס · גובה) : 2.',diag:({vals:[v]})=>v===2*k*b?'שכחתם לחלק ב־2.':v===k*b/2?`הבסיס הוא כל AB = ${2*k}, לא רק AO.`:null},
  {text:`עבור אילו ערכי x הפונקציה שבגרף ${Lq} מקבלת ערכים ${pos?'חיוביים':'שליליים'}?`,short:`${pos?'חיובי':'שלילי'} בגרף ${Lq}`,...CH([{t:T(r),ok:big,msg:'הפוך. '+(pos?'חיובי = מעל ציר x.':'שלילי = מתחת לציר x.')},{t:S(r),ok:!big,msg:'הפוך. '+(pos?'חיובי = מעל ציר x.':'שלילי = מתחת לציר x.')},{t:T(-r),msg:`הגרף ${Lq} חותך את ציר x ב־${M(N(r))}.`},{t:S(-r),msg:`הגרף ${Lq} חותך את ציר x ב־${M(N(r))}.`}]),dia:h=>h?triDia(t,1,{sign:upL?0:1}):'',hint:`${pos?'חיובי = מעל ציר x':'שלילי = מתחת לציר x'}. גרף ${Lq} חותך את ציר x ב־${M(upL?'A':'B')}. לאיזה צד הוא ${pos?'מעל':'מתחת'}?`,lines:[`גרף ${Lq} ${upL?'עולה':'יורד'} ←  ${big?T(r):S(r)}`],rule:'חיובי = מעל ציר x, שלילי = מתחת.'}];
 return {kind:'שאלת מבחן בצעדים',rc:8,text:triTxt(t)+'פותרים צעד אחרי צעד:',dia:h=>triDia(t,h,h?{tri:[[-k,0],[k,0],[0,b]]}:{}),steps,lines:['ראו את הצעדים.'],rule:'שאלה ארוכה = כמה שאלות קצרות. פותרים אחת אחרי השנייה.'};}
function chain6(){let r,m1,b1,m2,x0,y0,b2;do{r=nz(-4,4);m1=pick([-3,-2,-1,1,2,3]);b1=-m1*r;m2=pick([-3,-2,-1,1,2,3]);x0=nz(-3,3);y0=m1*x0+b1;b2=y0-m2*x0;}while(m1===m2||Math.abs(b1)>10||Math.abs(b2)>9||b1===0||x0===r||Math.abs(y0)>8);
 const o={a1:m1,b1,a2:m2,b2},pos=Math.random()<.5,bigS=(m1>0)===pos,d=m1-m2,bigG=d>0,T=v=>M('x > '+N(v)),S=v=>M('x < '+N(v)),dz=b1!==r&&b1!==x0?b1:(-r!==x0?-r:r+7);
 const steps=[
  {text:`מצאו את הנקודה שבה ${M('f(x) = 0')}.`,short:M('f(x) = 0'),tpl:'( [] , [] )',ans:[{label:'x =',lt:1,col:GR,val:r,neg:true,unit:''},{label:'y =',lt:1,col:'#9fb3cc',val:0,neg:true,unit:''}],hint:`${M('f(x) = 0')} ← על ציר x. פותרים ${M(RHS(m1,b1)+' = 0')}.`,lines:[M(RHS(m1,b1)+' = 0'),M(mx(m1)+' = '+N(-b1)),M('x = '+N(r)),M(Pt(r,0))],rule:'f(x) = 0 ← חיתוך עם ציר x: פותרים משוואה.',diag:({vals:[u,v]})=>u===0&&v===b1?'זו נקודת החיתוך עם ציר <b>y</b>.':v!==0?'על ציר x ה־y הוא 0.':u===-r?'בדקו את הסימן.':null},
  {text:`באיזה תחום ${M('f(x) '+(pos?'>':'<')+' 0')}?`,short:M('f(x) '+(pos?'>':'<')+' 0'),...CH([{t:T(r),ok:bigS,msg:`הפוך. f ${m1>0?'עולה':'יורד'}: בדקו בציור לאיזה צד הוא ${pos?'מעל ציר x':'מתחת לציר x'}.`},{t:S(r),ok:!bigS,msg:`הפוך. f ${m1>0?'עולה':'יורד'}: בדקו בציור לאיזה צד הוא ${pos?'מעל ציר x':'מתחת לציר x'}.`},{t:T(dz),msg:`התחום מתחיל בחיתוך עם ציר x שמצאתם בצעד 1: ${M('x = '+N(r))}.`},{t:S(dz),msg:`התחום מתחיל בחיתוך עם ציר x שמצאתם בצעד 1: ${M('x = '+N(r))}.`}]),hint:`${pos?'> 0 ← מעל ציר x':'< 0 ← מתחת לציר x'}. משתמשים בנקודה מצעד 1.`,lines:[`f ${m1>0?'עולה':'יורד'}, חותך את ציר x ב־${M(N(r))} ← ${bigS?T(r):S(r)}`],rule:'חיובי = מעל ציר x, שלילי = מתחת.'},
  {text:`מהו x שעבורו ${M('f(x) = g(x)')}?`,short:M('f(x) = g(x)'),ans:[{label:'x =',col:PU,val:x0,neg:true,unit:''}],hint:'משווים את שני הביטויים ופותרים.',lines:[M(C(RHS(m1,b1),FC)+' = '+C(RHS(m2,b2),GC)),M(mx(d)+' = '+N(b2-b1)),M('x = '+N(x0))],rule:'f(x) = g(x) ← נקודת המפגש.',diag:({vals:[v]})=>v===y0&&y0!==x0?'זה ה־y של המפגש. שואלים על x.':v===-x0?'בדקו את הסימן בחילוק.':null},
  {text:`באיזה תחום ${M('f(x) > g(x)')}?`,short:M('f(x) > g(x)'),...CH([{t:T(x0),ok:bigG,msg:d<0?'חילקנו במספר שלילי ← הסימן מתהפך!':'הפוך. בדקו בציור: איזה קו למעלה?'},{t:S(x0),ok:!bigG,msg:d<0?'חילקנו במספר שלילי ← הסימן מתהפך!':'הפוך. בדקו בציור: איזה קו למעלה?'},{t:T(r),msg:`התחום מתחיל בנקודת המפגש מצעד 3: ${M('x = '+N(x0))}.`},{t:S(r),msg:`התחום מתחיל בנקודת המפגש מצעד 3: ${M('x = '+N(x0))}.`}]),hint:`> ← איפה הקו של f למעלה. מתחילים מנקודת המפגש (צעד 3). זהירות: חילוק במספר שלילי הופך את הסימן.`,lines:[M(C(RHS(m1,b1),FC)+' > '+C(RHS(m2,b2),GC)),M(mx(d)+' > '+N(b2-b1)),...(d<0?['חילוק במספר שלילי ← הסימן מתהפך!']:[]),bigG?T(x0):S(x0)],rule:'f(x) > g(x) ← איפה f למעלה.'}];
 return {kind:'שאלת מבחן בצעדים',rc:7,text:`${EQf(m1,b1,'f(x)',FC)}<br>${EQf(m2,b2,'g(x)',GC)}<br>פותרים צעד אחרי צעד:`,dia:h=>twoDia(o,h,h?{pts:[{x:r,y:0,col:GR,lab:Pt(r,0)},{x:x0,y:y0,col:OR,lab:Pt(x0,y0)}]}:{}),steps,lines:['ראו את הצעדים.'],rule:'שאלה ארוכה = כמה שאלות קצרות. פותרים אחת אחרי השנייה.'};}
/* ===== levels: a fixed ladder, easy → hard; hints fade (h: 2 shown, 1 on tap, 0 none) ===== */
const LAD=[
 [{g:gOnAxis,n:4,h:2},{g:()=>gB(1),n:4,h:2},{g:()=>gB(),n:4,h:1},{g:gUpDown,n:4,h:1},{g:gReadB,n:4,h:0}],
 [{g:()=>gXint(0,1),n:4,h:2},{g:()=>gXint(0),n:4,h:1},{g:()=>gXint(1),n:4,h:1},{g:gPointOn,n:4,h:1},{g:gMatch,n:4,h:0}],
 [{g:gDict,n:5,h:2},{g:gSign,n:5,h:1},{g:gMeet,n:5,h:1},{g:gAbove,n:5,h:0}],
 [{g:chain7,n:4,h:1},{g:chain6,n:4,h:1},{g:chain7,n:3,h:0},{g:chain6,n:3,h:0},{g:gStory,n:3,h:0},{g:gErr,n:3,h:0}]];
const LEVELS=[
 {n:1,t:'מה זה b? עולה או יורד?',d:'על איזה ציר ← חיתוך עם ציר y ← עולה/יורד ← קוראים מהגרף',ladder:LAD[0]},
 {n:2,t:'חיתוך עם ציר x והתאמת גרף',d:'y = 0 ← f(x) = 0 ← נקודה על ישר ← איזה גרף',ladder:LAD[1]},
 {n:3,t:'מה השאלה שואלת?',d:'מילון השאלות ← חיובי/שלילי ← מפגש ← מי גבוה',ladder:LAD[2]},
 {n:4,t:'שאלות מבחן בצעדים',d:'כמו שאלות 6 ו־7: גרף אחד, צעד אחרי צעד',ladder:LAD[3]}];
LEVELS.forEach(l=>l.g=()=>pick(l.ladder).g());
const TEST=[[gOnAxis,gB,gReadB,gUpDown],[()=>gXint(0),()=>gXint(1),gMatch,gPointOn],[gDict,gSign,gMeet,gAbove],[()=>gTri('C'),()=>gTri('ABC'),gTriSign,gStory]];
const WARM=[gOnAxis,gB,gOnAxis,gB,gUpDown,gB,gUpDown,gReadB];
/* ===== animated explanation ===== */
const RECAP=[
 {h:'למה צריך את זה?',d:1.1,svg:()=>G({lines:[{m:2,b:1,col:BL}],pts:[{x:1,y:3,col:OR,lab:'(1, 3)'},{x:2,y:5,col:OR,lab:'(2, 5)',d:2.2}],yr:[-4,8],anim:1}),
  says:[`המשוואה ${EQ(2,1)} היא <b>הוראה</b>: קחו x, כפלו ב־2, הוסיפו 1.`,`${M('x = 1')} ← ${M('y = 2 · 1 + 1 = 3')} ← הנקודה ${M('(1, 3)')} על הקו ✓`,'הגרף הוא <b>הציור</b> של כל הנקודות האלה.'],
  def:'כל שאלה במבחן היא בעצם שאלה על הציור: איפה הקו חותך, עולה או יורד, מעל או מתחת, איפה נפגש עם קו אחר.',what:'משוואה = הוראות. גרף = הציור שלהן.'},
 {h:'ציר y: שם <span class="m">x = 0</span>',d:1.2,svg:()=>G({lines:[],pts:[{x:0,y:4,col:OR,lab:'(0, 4)'},{x:0,y:1,col:OR,lab:'(0, 1)'},{x:0,y:-3,col:OR,lab:'(0, −3)'}],anim:1}),
  says:['ציר y הוא הקו <b>האנכי</b> (עומד).','לכל הנקודות עליו יש <b><span class="m">x = 0</span></b>: הן לא זזות ימינה או שמאלה.'],def:`<b>ציר y:</b> ${M('x = 0')}.  <b>ציר x:</b> ${M('y = 0')}.`,what:'נקודה על ציר y תמיד: <span class="m">x = 0</span>, וה־y משתנה.'},
 {h:'b = החיתוך עם ציר y',d:1.1,svg:()=>G({lines:[{m:2,b:3,col:BL}],pts:[{x:0,y:3,col:OR,lab:'(0, 3)'}],yr:[-4,8],anim:1}),
  says:[`הישר ${EQ(2,3)}. איפה הוא חותך את ציר y?`,`על ציר y ${M('x = 0')}, אז מציבים: ${M('y = 2 · 0 + 3 = 3')}`,`ה־${C('2x',BL)} נעלם, ונשאר רק ${C('b',OR)}! הנקודה ${M(C('(0, 3)',OR))}.`],
  def:`<b>${C('b',OR)}</b> = המספר שעומד לבד, בלי x. הישר חותך את ציר y בנקודה ${M('(0, b)')}.`,what:`מסתכלים על המשוואה ורואים מיד: ${C('b',OR)} הוא הגובה שבו הקו חוצה את ציר y.`},
 {h:'m = השיפוע: עולה או יורד',d:1.1,svg:()=>G({lines:[{m:2,b:1,col:BL},{m:-2,b:1,col:PU}],yr:[-6,6],anim:1}),
  says:[`${C('m',BL)} = המספר שצמוד ל־x.`,`${C('m',BL)} חיובי ← הקו <b>עולה</b> ↗`,`${C('m',PU)} שלילי ← הקו <b>יורד</b> ↘`,'קוראים תמיד <b>משמאל לימין</b>, כמו באנגלית.'],what:'הסימן של m אומר לאן הקו הולך.'},
 {h:'מתאימים גרף למשוואה',d:1.1,svg:()=>G({lines:[{m:2,b:4,col:BL,lab:'א'},{m:-2,b:4,col:PU,lab:'ב'}],yr:[-2,10],anim:1}),
  says:[`${M('I')}: ${EQ(-2,4)}   ${M('II')}: ${EQ(2,4)}`,'שאלה 1: עולה או יורד? (הסימן של m)',`ב־${M('I')} ${M('m = −2')} ← יורד ← גרף ${C('ב',PU)}.`,'אם m שווה בשניהם, שואלים: איפה חותך את ציר y? (b)'],what:'קודם m (עולה/יורד), ואם לא מספיק, b (גבוה/נמוך).'},
 {h:'חיתוך עם ציר x: שם <span class="m">y = 0</span>',d:1.1,svg:()=>G({lines:[{m:2,b:-4,col:BL}],pts:[{x:2,y:0,col:GR,lab:'(2, 0)'},{x:0,y:-4,col:OR,lab:'(0, −4)',d:2.6}],anim:1}),
  says:[`הישר ${EQ(2,-4)}. על ציר x ${M('y = 0')}:`,M('2x − 4 = 0 ← 2x = 4 ← x = 2'),`הנקודה ${M(C('(2, 0)',GR))}.`],what:`ציר x ← מציבים ${M('y = 0')} ופותרים.  ציר y ← ${M('x = 0')}, והתשובה היא b.`},
 {h:'מילון: <span class="m">f(x) = 0, f(x) > 0, f(x) < 0</span>',d:1.1,svg:()=>G({lines:[{m:2,b:-4,col:BL}],pts:[{x:2,y:0,col:'#dfe8f5',lab:'(2, 0)'}],sign:0,anim:1}),
  says:[`${M('f(x)')} זה פשוט ה־y: <b>הגובה</b> של הגרף.`,`${M('f(x) = 0')} ← גובה 0 ← <b>על ציר x</b>: ${M('x = 2')}`,`${M('f(x) > 0')} ← ${C('מעל ציר x',GR)} ← ${M('x > 2')}`,`${M('f(x) < 0')} ← ${C('מתחת לציר x',RD)} ← ${M('x < 2')}`],
  def:'<b>ערכים חיוביים</b> = מעל ציר x.  <b>ערכים שליליים</b> = מתחת לציר x.',what:'עונים תמיד בתחום של x, שמתחיל בנקודת החיתוך עם ציר x.'},
 {h:'שני ישרים: איפה נפגשים? מי גבוה?',d:1.1,svg:()=>G({lines:[FF,GG],pts:[{x:2,y:-1,col:OR,lab:'(2, −1)',dx:10,dy:16}],above:[0,1],yr:[-7,7],anim:1}),
  says:[`${EQf(-2,3,'f(x)',FC)} , ${EQf(3,-7,'g(x)',GC)}`,`${M('f(x) = g(x)')} ← <b>נפגשים</b>: ${M('−2x + 3 = 3x − 7 ← −5x = −10 ← x = 2')}`,`${M('f(x) > g(x)')} ← איפה ${C('f',FC)} <b>למעלה</b>: ${M('−5x > −10 ← x < 2')}`,'חילקנו ב־<span class="m">(−5)</span>, מספר שלילי ← <b>הסימן התהפך!</b>'],
  what:'= ← נקודת המפגש.  > ← מי מעל מי (משמאל או מימין למפגש).'},
 {h:'שטח משולש מהגרף',d:1.1,svg:()=>G({lines:[{m:2,b:8,col:BL},{m:-2,b:8,col:PU}],pts:[{x:-4,y:0,col:'#dfe8f5',lab:'A',dy:16,dx:-12},{x:4,y:0,col:'#dfe8f5',lab:'B',dy:16,dx:6},{x:0,y:8,col:OR,lab:'C',dx:8,dy:4}],tri:[[-4,0],[4,0],[0,8]],xr:[-6,6],yr:[-2,11],O:1,anim:1}),
  says:[`${EQ(-2,8)} , ${EQ(2,8)} ← ${M('C = (0, 8)')}: זה ${C('b',OR)}!`,`A ו־B על ציר x ← מציבים ${M('y = 0')}: ${M('x = −4')} ו־${M('x = 4')}`,`בסיס ${M('AB = 8')}, גובה ${M('OC = 8')}`,`שטח = ${M('(8 · 8) : 2 = 32')}`],
  what:'בסיס על ציר x, גובה = b. שטח = (בסיס · גובה) : 2.'},
 {h:'הטעות הנפוצה',d:.4,says:[`«${EQ(3,-6)} חותך את ציר y ב־${M('(−6, 0)')}» <span class="x">✗</span>`,'הסדר הפוך! בנקודה כותבים <b>קודם x, אחר כך y</b>.',`נכון: ${M('(0, −6)')} <span class="v">✓</span>`],what:`ציר y ← ${M('(0, b)')}.  ציר x ← ${M('(?, 0)')}.`}];
