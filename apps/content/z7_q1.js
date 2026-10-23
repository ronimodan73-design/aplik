/*META {"id":"z7_q1","title":"הרביע הראשון · ערכה: רוני מודן","short":"רביע ראשון","topic":"מערכת צירים: הרביע הראשון","glyph":"(x,y)","color":"#5ec8ff"} */
const APP={key:'z7_q1',topic:'מערכת צירים: הרביע הראשון',sub:'ציר אופקי וציר אנכי, קריאת נקודות, אורך קטע, מלבן וריבוע: היקף ושטח. צעד אחרי צעד, בצבעים.'};
const C=(t,c)=>`<span style="color:${c}">${t}</span>`;
const Pt=(x,y)=>`(${x}, ${y})`;
const PC=(x,y)=>M('('+C(x,BL)+', '+C(y,OR)+')');
const LET=['A','B','C','D','E'];
function CH(o){const s=shuf(o);return {choice:s.map(x=>x.t),correct:s.findIndex(x=>x.ok),diag:({sel})=>s[sel]&&!s[sel].ok&&s[sel].msg||null};}
const XY=(col1,col2)=>[{label:'x =',lt:1,col:BL,val:0,unit:''},{label:'y =',lt:1,col:OR,val:0,unit:''}];
const ansXY=(x,y)=>[{label:'x =',lt:1,col:BL,val:x,neg:true,unit:''},{label:'y =',lt:1,col:OR,val:y,neg:true,unit:''}];
/* ===== grid engine (first quadrant) ===== */
function Q(o={}){const xm=o.xm||10,ym=o.ym||10,W=300,L=28,B=26,T=16,Rt=16,A=o.anim;
 const sx=x=>+(L+x*(W-L-Rt)/xm).toFixed(1),sy=y=>+(W-B-y*(W-B-T)/ym).toFixed(1);
 let s=`<svg viewBox="0 0 ${W} ${W}" style="width:100%;max-width:300px;direction:ltr;font-family:Rubik" role="img" aria-label="מערכת צירים">`;
 for(let i=1;i<=xm;i++)s+=`<line x1="${sx(i)}" y1="${sy(0)}" x2="${sx(i)}" y2="${T-4}" stroke="#1d3150"/>`;
 for(let i=1;i<=ym;i++)s+=`<line x1="${sx(0)}" y1="${sy(i)}" x2="${W-Rt+4}" y2="${sy(i)}" stroke="#1d3150"/>`;
 if(o.poly)s+=`<polygon points="${o.poly.map(([x,y])=>sx(x)+','+sy(y)).join(' ')}" fill="${o.pcol||GR}" fill-opacity=".18" stroke="${o.pcol||GR}" stroke-width="2.5" class="${A?'rv':''}" style="--d:${A?1:0}s"/>`;
 if(o.cells){const [x1,y1,x2,y2]=o.cells;for(let i=x1;i<x2;i++)for(let j=y1;j<y2;j++)s+=`<rect x="${sx(i)+2}" y="${sy(j+1)+2}" width="${sx(1)-sx(0)-4}" height="${sy(0)-sy(1)-4}" rx="3" fill="${GR}" fill-opacity=".28" class="rv" style="--d:${A?1.4+(j-y1)*.25:0}s"/>`;}
 const xc=o.hx?OR:'#dfe8f5';
 s+=`<line x1="${sx(0)}" y1="${sy(0)}" x2="${W-6}" y2="${sy(0)}" stroke="${o.axcol?BL:'#dfe8f5'}" stroke-width="2.5"/><polygon points="${W-2},${sy(0)} ${W-10},${sy(0)-5} ${W-10},${sy(0)+5}" fill="${o.axcol?BL:'#dfe8f5'}"/>
 <line x1="${sx(0)}" y1="${sy(0)}" x2="${sx(0)}" y2="6" stroke="${o.axcol?OR:'#dfe8f5'}" stroke-width="2.5"/><polygon points="${sx(0)},2 ${sx(0)-5},10 ${sx(0)+5},10" fill="${o.axcol?OR:'#dfe8f5'}"/>
 <text x="${W-12}" y="${sy(0)-8}" fill="${o.axcol?BL:'#dfe8f5'}" font-size="15" font-style="italic" font-weight="700">x</text><text x="${sx(0)+8}" y="14" fill="${o.axcol?OR:'#dfe8f5'}" font-size="15" font-style="italic" font-weight="700">y</text>`;
 for(let i=1;i<=xm;i+=(xm>12?2:1))s+=`<text x="${sx(i)}" y="${sy(0)+16}" text-anchor="middle" font-size="11" fill="#8aa0bd">${i}</text>`;
 for(let i=1;i<=ym;i+=(ym>12?2:1))s+=`<text x="${sx(0)-7}" y="${sy(i)+4}" text-anchor="end" font-size="11" fill="#8aa0bd">${i}</text>`;
 s+=`<text x="${sx(0)-7}" y="${sy(0)+16}" text-anchor="end" font-size="12" font-weight="800" fill="#dfe8f5">O</text>`;
 (o.segs||[]).forEach((g,i)=>{const [x1,y1]=g.a,[x2,y2]=g.b,d=g.d!=null?g.d:(A?.6+i*.6:0);
  s+=`<line x1="${sx(x1)}" y1="${sy(y1)}" x2="${sx(x2)}" y2="${sy(y2)}" stroke="${g.col}" stroke-width="${g.w||4}" stroke-linecap="round" ${g.dash?'stroke-dasharray="6 5"':''} ${A?`class="drawl" style="--d:${d}s"`:''}/>`;
  if(g.arrow){const ang=Math.atan2(sy(y2)-sy(y1),sx(x2)-sx(x1)),hx=sx(x2),hy=sy(y2),a1=ang+2.6,a2=ang-2.6;s+=`<polygon points="${hx},${hy} ${(hx+10*Math.cos(a1)).toFixed(1)},${(hy+10*Math.sin(a1)).toFixed(1)} ${(hx+10*Math.cos(a2)).toFixed(1)},${(hy+10*Math.sin(a2)).toFixed(1)}" fill="${g.col}" class="${A?'rv':''}" style="--d:${d+.8}s"/>`;}
  if(g.lab){const mx=(sx(x1)+sx(x2))/2,my=(sy(y1)+sy(y2))/2,hor=y1===y2;s+=`<text x="${hor?mx:mx+(g.side||1)*10}" y="${hor?my+(g.side||1)*-9+((g.side||1)>0?0:12):my+5}" text-anchor="${hor?'middle':(g.side||1)>0?'start':'end'}" fill="${g.col}" font-size="14" font-weight="800" class="${A?'rv':''}" style="--d:${d+.7}s">${g.lab}</text>`;}});
 (o.pts||[]).forEach((p,i)=>{const cx=sx(p.x),cy=sy(p.y),rt=cx>W-90,dn=p.dy!=null?p.dy:-9;
  s+=`<g ${A||p.anim?`class="rv" style="--d:${p.d!=null?p.d:1.2+i*.4}s"`:''}><circle cx="${cx}" cy="${cy}" r="5.5" fill="${p.col||PU}" stroke="#0f1b2d" stroke-width="2"/>${p.lab?`<text x="${cx+(p.dx!=null?p.dx:rt?-8:8)}" y="${cy+dn}" text-anchor="${p.ta||(rt?'end':'start')}" fill="${p.col||PU}" font-size="14" font-weight="800" direction="ltr" unicode-bidi="bidi-override">${p.lab}</text>`:''}</g>`;});
 return s+'</svg>';}
const two=(lo,hi)=>{let a,b;do{a=R(lo,hi);b=R(lo,hi);}while(a===b);return [a,b];};
/* ===== ★ מושגים וזיהוי ===== */
function gAxis(){const t=pick(['h','v','o','first']);
 if(t==='o')return {kind:'מושגים',rc:1,text:`איך נקראת הנקודה ${M('(0, 0)')}, שבה הצירים נפגשים?`,...CH([{t:'ראשית הצירים',ok:1},{t:'ציר x',msg:'ציר x הוא הקו כולו. הנקודה שבה הצירים נפגשים נקראת <b>ראשית הצירים</b>.'},{t:'ציר y',msg:'ציר y הוא הקו כולו. הנקודה שבה הצירים נפגשים נקראת <b>ראשית הצירים</b>.'},{t:'רביע ראשון',msg:'הרביע הוא אזור שלם. הנקודה (0, 0) היא <b>ראשית הצירים</b>.'}]),
  dia:h=>h?Q({pts:[{x:0,y:0,col:GR,lab:'O (0, 0)',dx:8,dy:-8}],anim:1}):'',lines:['שני הצירים נפגשים בנקודה O, שנקראת <b>ראשית הצירים</b>.'],rule:'ראשית הצירים: O = (0, 0).'};
 if(t==='first')return {kind:'מושגים',rc:1,text:'ברביע הראשון, השיעורים של כל נקודה הם:',...CH([{t:'שני המספרים חיוביים (או 0)',ok:1},{t:'שני המספרים שליליים',msg:'הרביע הראשון נמצא <b>ימינה ולמעלה</b> מהראשית ← מספרים חיוביים.'},{t:'x חיובי ו־y שלילי',msg:'y שלילי זה מתחת לציר x. הרביע הראשון כולו מעל ציר x.'},{t:'תמיד מספרים שווים',msg:'אפשר כל מספר חיובי, למשל (7, 2).'}]),
  dia:h=>h?Q({poly:[[0,0],[10,0],[10,10],[0,10]],pcol:GR,anim:1}):'',lines:['הרביע הראשון: ימינה מציר y ולמעלה מציר x ← כל השיעורים חיוביים.'],rule:'ברביע הראשון: x ≥ 0 ו־y ≥ 0.'};
 const h=t==='h';
 return {kind:'מושגים',rc:1,text:`הציר ${h?'<b>האופקי</b> (שוכב)':'<b>האנכי</b> (עומד)'} נקרא:`,...CH([{t:`ציר ${M('x')}`,ok:h,msg:'ציר x הוא הציר ה<b>אופקי</b>, השוכב, כמו קו האופק.'},{t:`ציר ${M('y')}`,ok:!h,msg:'ציר y הוא הציר ה<b>אנכי</b>, העומד, כמו עמוד.'},{t:'ראשית הצירים',msg:'ראשית הצירים היא <b>נקודה</b> אחת, (0, 0). כאן שואלים על ציר שלם.'}]),
  dia:hl=>hl?Q({axcol:1,anim:1}):'',lines:[`${C('ציר x',BL)} = אופקי (שוכב ↔).`,`${C('ציר y',OR)} = אנכי (עומד ↕).`],rule:'ציר x אופקי (↔), ציר y אנכי (↕).'};}
function gRead(){const x=R(1,9),y=R(1,9),l=pick(LET);
 return {kind:'קוראים נקודה',rc:2,text:`מהם שיעורי הנקודה ${M(l)}?`,tpl:'( [] , [] )',ans:ansXY(x,y),
  dia:h=>Q({pts:[{x,y,col:PU,lab:h?l+' '+Pt(x,y):l}],segs:h?[{a:[0,0],b:[x,0],col:BL,arrow:1,lab:x,side:1},{a:[x,0],b:[x,y],col:OR,arrow:1,lab:y}]:[],anim:h}),
  lines:[`מהראשית הולכים <b>ימינה</b> ${C(x,BL)} משבצות ← ${M(C('x = '+x,BL))}`,`ואז <b>למעלה</b> ${C(y,OR)} משבצות ← ${M(C('y = '+y,OR))}`,`${M(l)} = ${PC(x,y)}`],rule:'קוראים נקודה: קודם ימינה (x), אחר כך למעלה (y).',
  diag:({vals:[a,b]})=>a===y&&b===x&&x!==y?'<b>הפכתם את הסדר!</b> קודם הולכים ימינה (x), ורק אחר כך עולים למעלה (y).':null};}
function gWhich(){let x,y;do{x=R(1,9);y=R(1,9);}while(x===y);let d1,d2;do{d1=[x,R(1,9)];}while(d1[1]===y||(d1[0]===y&&d1[1]===x));do{d2=[R(1,9),y];}while(d2[0]===x||(d2[0]===y&&d2[1]===x)||(d2[0]===d1[0]&&d2[1]===d1[1]));
 const P=shuf([{p:[x,y],ok:1},{p:[y,x],msg:'זו הנקודה ההפוכה! קודם x (ימינה), אחר כך y (למעלה).'},{p:d1,msg:`ה־x נכון (${x}), אבל בדקו את הגובה: y = ${y}.`},{p:d2,msg:`הגובה נכון (${y}), אבל בדקו כמה ימינה: x = ${x}.`}]).map((o,i)=>({...o,l:LET[i]}));
 return {kind:'מוצאים נקודה',rc:2,text:`איזו נקודה בשרטוט היא ${PC(x,y)}?`,choice:P.map(o=>M(o.l)),correct:P.findIndex(o=>o.ok),diag:({sel})=>P[sel]&&!P[sel].ok?P[sel].msg:null,
  dia:h=>Q({pts:P.map(o=>({x:o.p[0],y:o.p[1],col:h&&o.ok?GR:PU,lab:o.l})),segs:h?[{a:[0,0],b:[x,0],col:BL,arrow:1},{a:[x,0],b:[x,y],col:OR,arrow:1}]:[],anim:h}),
  lines:[`${C(x,BL)} ימינה, ואז ${C(y,OR)} למעלה ← הנקודה ${M(P.find(o=>o.ok).l)}.`],rule:'קודם ימינה (x), אחר כך למעלה (y).'};}
function gOn(){const t=pick(['x','y','n']),k=R(1,9),j=R(1,9),[x,y]=t==='x'?[k,0]:t==='y'?[0,k]:[k,j];
 return {kind:'נקודה על ציר',rc:3,text:`איפה נמצאת הנקודה ${PC(x,y)}?`,...CH([{t:'על ציר x',ok:t==='x',msg:t==='y'?`כאן ${M('x = 0')}: לא זזים ימינה בכלל ← על ציר <b>y</b>.`:`על ציר x חייב להיות ${M('y = 0')}.`},{t:'על ציר y',ok:t==='y',msg:t==='x'?`כאן ${M('y = 0')}: לא עולים בכלל ← על ציר <b>x</b>.`:`על ציר y חייב להיות ${M('x = 0')}.`},{t:'לא על אף ציר',ok:t==='n',msg:'יש כאן 0! מספר 0 אומר שהנקודה יושבת על ציר.'}]),
  dia:h=>h?Q({pts:[{x,y,col:GR,lab:Pt(x,y)}],anim:1}):'',lines:[t==='x'?`${M('y = 0')} ← לא עולים ← על ציר x.`:t==='y'?`${M('x = 0')} ← לא זזים ימינה ← על ציר y.`:'אין 0 ← הנקודה לא על ציר.'],rule:'y = 0 ← על ציר x.  x = 0 ← על ציר y.'};}
/* ===== ★★ קטעים ===== */
function segQ(){const hor=Math.random()<.5,[a,b]=two(1,9),c=R(1,9);return hor?{hor,A:[Math.min(a,b),c],B:[Math.max(a,b),c],len:Math.abs(a-b)}:{hor,A:[c,Math.min(a,b)],B:[c,Math.max(a,b)],len:Math.abs(a-b)};}
function gLen(){const s=segQ(),{hor,A,B,len}=s,[p,q]=shuf([A,B]),i=hor?0:1;
 return {kind:'אורך קטע',rc:hor?4:5,text:`${M('A'+Pt(...p))} , ${M('B'+Pt(...q))}. מה אורך הקטע ${M('AB')}?`,ans:[{label:'אורך =',col:GR,val:len,unit:''}],
  dia:h=>Q({pts:[{x:p[0],y:p[1],col:PU,lab:'A'},{x:q[0],y:q[1],col:PU,lab:'B'}],segs:[{a:A,b:B,col:h?GR:'#9fb3cc',lab:h?len:'',side:hor?1:1}],anim:h}),
  lines:[hor?`ה־${C('y',OR)} שווה (${C(A[1],OR)}) ← הקטע <b>אופקי</b> (שוכב).`:`ה־${C('x',BL)} שווה (${C(A[0],BL)}) ← הקטע <b>אנכי</b> (עומד).`,`האורך = ההפרש בין ה־${hor?C('x',BL):C('y',OR)}: ${M(B[i]+' − '+A[i]+' = '+len)}`],
  rule:'קטע אופקי: אורך = הפרש ה־x. קטע אנכי: אורך = הפרש ה־y. (גדול פחות קטן)',
  diag:({vals:[v]})=>v===A[i]+B[i]?'<b>חיברתם</b>. אורך הוא ההפרש: מחסרים את הקטן מהגדול.':v===B[i]||v===A[i]?'זה שיעור של נקודה, לא אורך. מחסרים: גדול פחות קטן.':v===Math.abs(A[1-i]-B[1-i])+0&&v===0?null:null};}
function gType(){const t=pick(['h','v','n']);let A,B;if(t==='n'){A=[R(1,4),R(1,4)];B=[R(5,9),R(5,9)];}else{const s=segQ();while(s.hor!==(t==='h')){Object.assign(s,segQ());}A=s.A;B=s.B;}
 return {kind:'אופקי או אנכי?',rc:t==='v'?5:4,text:`הקטע בין ${M('A'+Pt(...A))} ל־${M('B'+Pt(...B))} הוא:`,...CH([{t:'אופקי (שוכב)',ok:t==='h',msg:'קטע אופקי ← ה־<b>y</b> של שתי הנקודות שווה (אותו גובה).'},{t:'אנכי (עומד)',ok:t==='v',msg:'קטע אנכי ← ה־<b>x</b> של שתי הנקודות שווה (אותו מקום ימינה).'},{t:'לא אופקי ולא אנכי (אלכסוני)',ok:t==='n',msg:'יש כאן שיעור שווה, אז הקטע לא אלכסוני.'}]),
  dia:h=>h?Q({pts:[{x:A[0],y:A[1],lab:'A'},{x:B[0],y:B[1],lab:'B'}],segs:[{a:A,b:B,col:GR}],anim:1}):'',
  lines:[t==='h'?`ה־y שווה (${A[1]}) ← אותו גובה ← <b>אופקי</b>.`:t==='v'?`ה־x שווה (${A[0]}) ← <b>אנכי</b>.`:'אין שיעור שווה ← הקטע <b>אלכסוני</b>.'],rule:'y שווה ← אופקי. x שווה ← אנכי.'};}
function gEnd(){const dir=pick(['r','u']),n=R(2,5),x=R(1,9-n),y=R(1,9-n),B=dir==='r'?[x+n,y]:[x,y+n];
 return {kind:'מוצאים קצה של קטע',rc:dir==='r'?4:5,text:`הקטע ${M('AB')} ${dir==='r'?'אופקי':'אנכי'}, אורכו ${M(n)}, והוא יוצא מ־${M('A'+Pt(x,y))} ${dir==='r'?'<b>ימינה</b>':'<b>למעלה</b>'}. מהם שיעורי ${M('B')}?`,tpl:'( [] , [] )',ans:ansXY(...B),
  dia:h=>h?Q({pts:[{x,y,lab:'A'},{x:B[0],y:B[1],col:GR,lab:'B '+Pt(...B)}],segs:[{a:[x,y],b:B,col:GR,arrow:1,lab:n}],anim:1}):'',
  lines:[dir==='r'?`ימינה ← רק ה־${C('x',BL)} גדל: ${M(x+' + '+n+' = '+B[0])}. ה־y נשאר ${y}.`:`למעלה ← רק ה־${C('y',OR)} גדל: ${M(y+' + '+n+' = '+B[1])}. ה־x נשאר ${x}.`,`${M('B')} = ${PC(...B)}`],
  rule:'ימינה ← מוסיפים ל־x. למעלה ← מוסיפים ל־y. השיעור השני לא משתנה.',
  diag:({vals:[a,b]})=>dir==='r'&&a===x&&b===y+n?'ימינה זה ציר <b>x</b>. מוסיפים ל־x, לא ל־y.':dir==='u'&&a===x+n&&b===y?'למעלה זה ציר <b>y</b>. מוסיפים ל־y, לא ל־x.':null};}
/* ===== ★★★ מרובעים ===== */
function rect(sq){let x1,y1,w,h;do{x1=R(1,5);y1=R(1,5);w=R(2,5);h=sq?w:R(2,5);}while(x1+w>9||y1+h>9||(!sq&&w===h));return {x1,y1,w,h,V:[[x1,y1],[x1+w,y1],[x1+w,y1+h],[x1,y1+h]]};}
const rDia=(r,h,ex={})=>Q({poly:h?r.V:null,pts:r.V.map((p,i)=>({x:p[0],y:p[1],lab:LET[i],dx:i===1||i===2?8:-8,ta:i===1||i===2?'start':'end',dy:i<2?16:-6})),segs:h?[{a:r.V[0],b:r.V[1],col:BL,lab:r.w,side:-1},{a:r.V[1],b:r.V[2],col:OR,lab:r.h}]:[],anim:h,...ex});
function gFourth(){const sq=Math.random()<.4,r=rect(sq),k=R(0,3),V=r.V,D=V[k];
 const txt=V.map((p,i)=>i===k?null:M(LET[i]+Pt(...p))).filter(Boolean).join(' , ');
 return {kind:'הקדקוד החסר',rc:6,text:`ל${sq?'ריבוע':'מלבן'} ${M('ABCD')} נתונים שלושה קדקודים: ${txt}. מהם שיעורי ${M(LET[k])}?`,tpl:'( [] , [] )',ans:ansXY(...D),
  dia:h=>Q({poly:h?V:null,pts:V.map((p,i)=>i===k&&!h?null:{x:p[0],y:p[1],col:i===k?GR:PU,lab:LET[i]+(i===k?' '+Pt(...p):''),dx:i===1||i===2?8:-8,ta:i===1||i===2?'start':'end',dy:i<2?16:-6}).filter(Boolean),anim:h}),
  lines:[`צלעות המלבן אופקיות ואנכיות.`,`${M(LET[k])} באותו <b>גובה</b> (y) כמו ${M(LET[k^1])}: ${C(D[1],OR)}.`,`${M(LET[k])} באותו מקום <b>ימינה</b> (x) כמו ${M(LET[3-k])}: ${C(D[0],BL)}.`,`${M(LET[k])} = ${PC(...D)}`],
  rule:'במלבן הצלעות אופקיות ואנכיות: כל קדקוד חולק x עם שכן אחד ו־y עם השכן השני.'};}
function gPA(sq){sq=sq!=null?sq:Math.random()<.35;const r=rect(sq),ask=pick(['P','S']),P=2*(r.w+r.h),S=r.w*r.h,sh=sq?'הריבוע':'המלבן';
 return {kind:ask==='P'?'היקף':'שטח',rc:sq?7:6,text:`חשבו את ${ask==='P'?'<b>ההיקף</b>':'<b>השטח</b>'} של ${sh} ${M('ABCD')} (כל משבצת = 1).`,ans:[{label:ask==='P'?'היקף =':'שטח =',col:GR,val:ask==='P'?P:S,unit:''}],
  dia:h=>rDia(r,h,h&&ask==='S'?{cells:[r.x1,r.y1,r.x1+r.w,r.y1+r.h]}:{}),
  lines:[`רוחב ${M('AB = '+(r.x1+r.w)+' − '+r.x1+' = '+r.w)} , גובה ${M('BC = '+(r.y1+r.h)+' − '+r.y1+' = '+r.h)}`,ask==='P'?`היקף = סכום כל הצלעות: ${M(r.w+' + '+r.h+' + '+r.w+' + '+r.h+' = '+P)}`:`שטח = רוחב · גובה: ${M(r.w+' · '+r.h+' = '+S)} משבצות`],
  rule:'היקף = סכום הצלעות (הגבול). שטח = רוחב · גובה (המשבצות בפנים).',
  diag:({vals:[v]})=>ask==='P'&&v===S?'זה השטח (משבצות בפנים). היקף = <b>סכום הצלעות</b> מסביב.':ask==='S'&&v===P?'זה ההיקף (מסביב). שטח = <b>רוחב · גובה</b>.':ask==='P'&&v===r.w+r.h?'ספרתם רק שתי צלעות. למלבן יש <b>4</b> צלעות.':null};}
/* ===== ★★★★ חשיבה ואוריינות ===== */
function gIsSq(){const sq=Math.random()<.5,r=rect(sq);
 return {kind:'האם זה ריבוע?',rc:7,text:`${r.V.map((p,i)=>M(LET[i]+Pt(...p))).join(' , ')}. האם ${M('ABCD')} ריבוע?`,...CH([{t:'כן: כל הצלעות שוות',ok:sq,msg:`חשבו: רוחב ${r.w}, גובה ${r.h}. הם לא שווים ← מלבן, לא ריבוע.`},{t:'לא: הרוחב והגובה שונים, זה מלבן',ok:!sq,msg:`חשבו: רוחב ${r.w}, גובה ${r.h}. הם שווים ← ריבוע!`},{t:'כן: יש לו 4 זוויות ישרות',msg:'גם למלבן יש 4 זוויות ישרות. ריבוע צריך גם <b>צלעות שוות</b>.'},{t:'אי אפשר לדעת בלי לשרטט',msg:'אפשר לחשב: הפרש ה־x נותן את הרוחב, הפרש ה־y את הגובה.'}]),
  dia:h=>h?rDia(r,1):'',lines:[`רוחב: ${M((r.x1+r.w)+' − '+r.x1+' = '+r.w)} , גובה: ${M((r.y1+r.h)+' − '+r.y1+' = '+r.h)}`,sq?'שווים ← <b>ריבוע</b>.':'שונים ← <b>מלבן</b>, לא ריבוע.'],rule:'ריבוע = מלבן שכל צלעותיו שוות. בודקים: רוחב = גובה?'};}
function gSqC(){const n=R(2,5),x=R(1,9-n),y=R(1,9-n),A=[x,y],B=[x+n,y],Cc=[x+n,y+n],D=[x,y+n],ask=pick(['C','D']),T=ask==='C'?Cc:D;
 return {kind:'בונים ריבוע',rc:7,text:`${M('A'+Pt(...A))} ו־${M('B'+Pt(...B))} הם קדקודים של הריבוע ${M('ABCD')}. הריבוע נמצא <b>מעל</b> הצלע ${M('AB')}. מהם שיעורי ${M(ask)}?`,tpl:'( [] , [] )',ans:ansXY(...T),
  dia:h=>Q({poly:h?[A,B,Cc,D]:null,pcol:PU,pts:[{x:A[0],y:A[1],lab:'A',dx:-8,ta:'end',dy:16},{x:B[0],y:B[1],lab:'B',dy:16},...(h?[{x:T[0],y:T[1],col:GR,lab:ask+' '+Pt(...T)}]:[])],segs:[{a:A,b:B,col:BL,lab:h?n:'',side:-1},...(h?[{a:B,b:Cc,col:OR,lab:n}]:[])],anim:h}),
  lines:[`צלע הריבוע: ${M('AB = '+(x+n)+' − '+x+' = '+n)}`,`בריבוע כל הצלעות שוות ← עולים ${C(n,OR)} למעלה: ${M('y = '+y+' + '+n+' = '+(y+n))}`,`${M(ask)} נמצא מעל ${M(ask==='C'?'B':'A')} ← ${M('x = '+T[0])}`,`${M(ask)} = ${PC(...T)}`],
  rule:'בריבוע כל הצלעות שוות: מוצאים את אורך הצלע ועולים בדיוק באותו אורך.',
  diag:({vals:[u,v]})=>u===T[0]&&v===n?`${n} הוא אורך הצלע. ה־y של ${ask} הוא ${y} + ${n}.`:u===T[1]&&v===T[0]?'הסדר הפוך: קודם x, אחר כך y.':null};}
function gErr(){const [x,y]=two(1,9),nm=pick(['נועה','דניאל','איתי','מאיה','יואב']);
 return {kind:'מוצאים את הטעות',rc:8,text:`${nm} סימן/ה את הנקודה ${PC(x,y)}: הלך/ה ${y} משבצות ימינה ו־${x} משבצות למעלה. מה הטעות?`,...CH([{t:`הסדר הפוך: קודם ${x} ימינה, אחר כך ${y} למעלה`,ok:1},{t:'אין טעות',msg:`ה־x הוא ${x} ← הולכים ${x} ימינה. ${nm} הפך/ה את הסדר.`},{t:'צריך להתחיל מהנקודה (1, 1)',msg:'תמיד מתחילים מראשית הצירים (0, 0). הטעות היא בסדר.'},{t:`צריך ללכת ${x+y} משבצות ימינה`,msg:'לא מחברים. x אומר כמה ימינה, y כמה למעלה.'}]),
  dia:h=>h?Q({pts:[{x,y,col:GR,lab:Pt(x,y)+' ✓'},{x:y,y:x,col:RD,lab:Pt(y,x)+' ✗'}],anim:1}):'',lines:[`${PC(x,y)}: ${C(x,BL)} ימינה, ${C(y,OR)} למעלה.`,`${nm} הגיע/ה ל־${M(Pt(y,x))}: נקודה אחרת לגמרי!`],rule:'(x, y): קודם ימינה (x), אחר כך למעלה (y).'};}
const PLACES=[['הבית','בית הספר'],['הגן','הספרייה'],['הקיוסק','המגרש'],['תחנת האוטובוס','הבריכה']];
function gMap(){const [p1,p2]=pick(PLACES),t=pick(['move','dist']);
 if(t==='move'){const x=R(1,5),y=R(1,5),a=R(1,4),b=R(1,4),T=[x+a,y+b];
  return {kind:'בעיה מילולית',rc:2,text:`במפת השכונה, ${p1} נמצא ב־${PC(x,y)}. רון יצא מ${p1}, הלך ${M(a)} משבצות ימינה ו־${M(b)} משבצות למעלה, והגיע ל${p2}. מהם שיעורי ${p2}?`,tpl:'( [] , [] )',ans:ansXY(...T),
   dia:h=>h?Q({pts:[{x,y,lab:Pt(x,y)},{x:T[0],y:T[1],col:GR,lab:Pt(...T)}],segs:[{a:[x,y],b:[x+a,y],col:BL,arrow:1,lab:a,side:-1},{a:[x+a,y],b:T,col:OR,arrow:1,lab:b}],anim:1}):'',
   lines:[`ימינה ← ${M(C('x',BL)+': '+x+' + '+a+' = '+T[0])}`,`למעלה ← ${M(C('y',OR)+': '+y+' + '+b+' = '+T[1])}`,`${p2}: ${PC(...T)}`],rule:'ימינה ← מוסיפים ל־x. למעלה ← מוסיפים ל־y.',
   diag:({vals:[u,v]})=>u===x+b&&v===y+a?'ימינה משנה את <b>x</b>, למעלה משנה את <b>y</b>.':null};}
 const s=segQ();return {kind:'בעיה מילולית',rc:s.hor?4:5,text:`במפת השכונה, ${p1} ב־${PC(...s.A)} ו${p2} ב־${PC(...s.B)}. כל משבצת היא 100 מטר. כמה מטרים צריך ללכת ביניהם בקו ישר?`,ans:[{label:'מטרים =',col:GR,val:s.len*100,unit:''}],
  dia:h=>h?Q({pts:[{x:s.A[0],y:s.A[1],lab:Pt(...s.A)},{x:s.B[0],y:s.B[1],lab:Pt(...s.B)}],segs:[{a:s.A,b:s.B,col:GR,lab:s.len}],anim:1}):'',
  lines:[`${s.hor?'אותו y ← קטע אופקי ← מחסרים את ה־x':'אותו x ← קטע אנכי ← מחסרים את ה־y'}: ${M(s.len+' משבצות')}`,`${M(s.len+' · 100 = '+s.len*100)} מטר`],rule:'אורך במשבצות · גודל משבצת = המרחק האמיתי.',
  diag:({vals:[v]})=>v===s.len?`זה מספר המשבצות. כל משבצת היא 100 מטר: כופלים ב־100.`:null};}
/* ===== levels ===== */
const LAD=[
 [{g:gAxis,n:4,h:2},{g:gOn,n:4,h:2},{g:gRead,n:4,h:1},{g:gWhich,n:4,h:1},{g:gRead,n:4,h:0}],
 [{g:gType,n:5,h:2},{g:gLen,n:5,h:1},{g:gEnd,n:5,h:1},{g:gLen,n:5,h:0}],
 [{g:gFourth,n:5,h:2},{g:()=>gPA(false),n:5,h:2},{g:()=>gPA(false),n:5,h:1},{g:()=>gPA(true),n:5,h:0}],
 [{g:gIsSq,n:5,h:1},{g:gSqC,n:5,h:1},{g:gMap,n:5,h:0},{g:gErr,n:5,h:0}]];
const LEVELS=[
 {n:1,t:'מושגים וזיהוי נקודות',d:'הצירים ← נקודה על ציר ← קוראים נקודה ← מוצאים נקודה',ladder:LAD[0]},
 {n:2,t:'קטעים',d:'אופקי או אנכי ← אורך קטע ← קצה של קטע',ladder:LAD[1]},
 {n:3,t:'מלבן וריבוע',d:'קדקוד חסר ← היקף ושטח ← ריבוע',ladder:LAD[2]},
 {n:4,t:'חשיבה ואוריינות',d:'האם זה ריבוע ← בונים ריבוע ← מפה ← טעויות',ladder:LAD[3]}];
LEVELS.forEach(l=>l.g=()=>pick(l.ladder).g());
const TEST=[[gAxis,gRead,gWhich,gOn],[gType,gLen,gLen,gEnd],[gFourth,()=>gPA(false),()=>gPA(true),gFourth],[gIsSq,gSqC,gErr,gMap]];
const WARM=[gAxis,gRead,gOn,gRead,gWhich,gAxis,gRead,gOn];
/* ===== animated explanation ===== */
const RECAP=[
 {h:'למה צריך את זה?',d:1.4,svg:()=>Q({pts:[{x:6,y:4,col:OR,lab:'💎 (6, 4)'}],segs:[{a:[0,0],b:[6,0],col:BL,arrow:1},{a:[6,0],b:[6,4],col:OR,arrow:1}],anim:1}),
  says:['איך מסבירים לחבר בדיוק איפה מוחבא אוצר?','נותנים לו <b>כתובת</b>: שני מספרים.',`${PC(6,4)} ← ${C('6 ימינה',BL)}, ${C('4 למעלה',OR)}. מוצאים מיד!`],def:'בעזרת מערכת צירים מסמנים מקומות במפות, במשחקי מחשב, ב־GPS ובמסך הטלפון.',what:'כל נקודה מקבלת כתובת של שני מספרים.'},
 {h:'שני הצירים והראשית',d:1.2,svg:()=>Q({axcol:1,pts:[{x:0,y:0,col:GR,lab:'O (0, 0)',dx:8,dy:-8}],anim:1}),
  says:[`${C('ציר x',BL)} = הציר ה<b>אופקי</b>, שוכב ↔`,`${C('ציר y',OR)} = הציר ה<b>אנכי</b>, עומד ↕`,`${C('O',GR)} = <b>ראשית הצירים</b>, ${M('(0, 0)')}: משם יוצאים תמיד.`],def:'<b>הרביע הראשון:</b> האזור שמימין לציר y ומעל ציר x. שם כל המספרים חיוביים.',what:'שני צירים, נקודת התחלה אחת.'},
 {h:'קוראים נקודה: ימינה, ואז למעלה',d:2.2,svg:()=>Q({pts:[{x:5,y:3,col:PU,lab:'A (5, 3)'}],segs:[{a:[0,0],b:[5,0],col:BL,arrow:1,lab:5,side:1},{a:[5,0],b:[5,3],col:OR,arrow:1,lab:3}],anim:1}),
  says:[`יוצאים מ־O והולכים <b>ימינה</b> ${C('5',BL)} ← ${M(C('x = 5',BL))}`,`ואז <b>עולים</b> ${C('3',OR)} ← ${M(C('y = 3',OR))}`,`${M('A')} = ${PC(5,3)}`],def:'<b>שיעורי הנקודה:</b> הזוג (x, y). המספר הראשון תמיד x.',what:'קודם הולכים (x), אחר כך מטפסים (y). כמו לעלות במדרגות: קודם מגיעים אליהן.'},
 {h:'נקודה שיושבת על ציר',d:1.4,svg:()=>Q({pts:[{x:6,y:0,col:BL,lab:'(6, 0)',dy:-10},{x:0,y:7,col:OR,lab:'(0, 7)',dx:10}],anim:1}),
  says:[`${M('(6, 0)')}: הולכים 6 ימינה ו<b>לא עולים</b> ← על ${C('ציר x',BL)}.`,`${M('(0, 7)')}: <b>לא זזים</b> ימינה, עולים 7 ← על ${C('ציר y',OR)}.`],what:'יש 0 בשיעורים? הנקודה יושבת על ציר.'},
 {h:'קטע אופקי: אורך = הפרש ה־x',d:1.6,svg:()=>Q({pts:[{x:2,y:3,lab:'A (2, 3)',dy:-10},{x:7,y:3,lab:'B (7, 3)',dy:-10}],segs:[{a:[2,3],b:[7,3],col:GR,lab:'5',side:-1}],anim:1}),
  says:[`ל־${M('A')} ול־${M('B')} אותו ${C('y',OR)} (3) ← אותו גובה ← הקטע <b>אופקי</b>.`,`האורך: ${M(C('7 − 2',BL)+' = 5')}`,'אפשר גם לספור משבצות: 5 ✓'],what:'אותו y ← אופקי ← מחסרים את ה־x (גדול פחות קטן).'},
 {h:'קטע אנכי: אורך = הפרש ה־y',d:1.6,svg:()=>Q({pts:[{x:4,y:2,lab:'C (4, 2)'},{x:4,y:8,lab:'D (4, 8)'}],segs:[{a:[4,2],b:[4,8],col:GR,lab:'6'}],anim:1}),
  says:[`ל־${M('C')} ול־${M('D')} אותו ${C('x',BL)} (4) ← הקטע <b>אנכי</b>.`,`האורך: ${M(C('8 − 2',OR)+' = 6')}`],what:'אותו x ← אנכי ← מחסרים את ה־y.'},
 {h:'מלבן: היקף ושטח',d:1.6,svg:()=>Q({poly:[[1,1],[6,1],[6,4],[1,4]],cells:[1,1,6,4],pts:[{x:1,y:1,lab:'A',dx:-8,ta:'end',dy:16},{x:6,y:1,lab:'B',dy:16},{x:6,y:4,lab:'C'},{x:1,y:4,lab:'D',dx:-8,ta:'end'}],segs:[{a:[1,1],b:[6,1],col:BL,lab:'5',side:-1},{a:[6,1],b:[6,4],col:OR,lab:'3'}],anim:1}),
  says:[`רוחב ${M('AB = 6 − 1 = 5')}, גובה ${M('BC = 4 − 1 = 3')}`,`<b>היקף</b> (הגבול מסביב): ${M('5 + 3 + 5 + 3 = 16')}`,`<b>שטח</b> (המשבצות בפנים): ${M('5 · 3 = 15')}`],def:'<b>היקף</b> = סכום הצלעות.  <b>שטח</b> = רוחב · גובה.',what:'קודם מוצאים אורכי צלעות מההפרשים, ואז היקף ושטח.'},
 {h:'ריבוע: כל הצלעות שוות',d:1.4,svg:()=>Q({poly:[[2,2],[6,2],[6,6],[2,6]],pcol:PU,pts:[{x:2,y:2,lab:'A',dx:-8,ta:'end',dy:16},{x:6,y:2,lab:'B',dy:16},{x:6,y:6,lab:'C'},{x:2,y:6,lab:'D',dx:-8,ta:'end'}],segs:[{a:[2,2],b:[6,2],col:BL,lab:'4',side:-1},{a:[6,2],b:[6,6],col:OR,lab:'4'}],anim:1}),
  says:[`רוחב ${M('6 − 2 = 4')}, גובה ${M('6 − 2 = 4')} ← שווים ← <b>ריבוע</b>.`,`היקף ${M('4 · 4 = 16')}, שטח ${M('4 · 4 = 16')}`],def:'<b>ריבוע:</b> מלבן שכל ארבע צלעותיו שוות.',what:'בודקים: רוחב = גובה? כן ← ריבוע.'},
 {h:'הטעות הנפוצה',d:1.4,svg:()=>Q({pts:[{x:2,y:6,col:GR,lab:'(2, 6) ✓'},{x:6,y:2,col:RD,lab:'(6, 2) ✗'}],anim:1}),
  says:[`${PC(2,6)}: ${C('2 ימינה',BL)}, ${C('6 למעלה',OR)} <span class="v">✓</span>`,`מי שהולך 6 ימינה ו־2 למעלה מגיע ל־${M('(6, 2)')} <span class="x">✗</span>: מקום אחר לגמרי!`],what:'הסדר חשוב: (x, y). קודם ימינה, אחר כך למעלה.'}];
