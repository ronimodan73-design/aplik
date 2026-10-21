/*META {"id":"t9_iso","title":"משולש שווה שוקיים · ט׳ א2","short":"שווה שוקיים","topic":"משולש שווה שוקיים","glyph":"△","color":"#ffb020"} */
const APP={key:'t9iso',topic:'משולש שווה שוקיים',sub:'כותבים זוויות, המשפטים והמשפטים ההפוכים, גם עם x.',rc:{'כותבים זווית':0,'שוקיים, בסיס, ראש':1,'האם שווה שוקיים?':4,'מוצאים זווית בסיס':8,'מוצאים זווית ראש':3,'משפט הפוך · צלע':4,'שלושה באחד':5,'משתנים · זוויות בסיס':7,'משתנים · משפט הפוך':4,'משתנים · סכום 180°':2,'שלושה באחד · נימוק':5,'נכון או לא נכון?':2,'משפטים הפוכים · 2 מתוך 3':6,'זווית חיצונית · שני צעדים':3,'בעיה מילולית':7}};
/* ===== geometry: triangle ===== */
const W=400,H=300,CM='ס״מ';
const P2=(x,y)=>({x,y});
const rad=d=>d*Math.PI/180,degOf=r=>r*180/Math.PI;
/* triangle from the two base angles B (left) and C (right); apex on top */
function tri(Bd,Cd,names){let L=P2(70,252),Rr=P2(330,252);const base=Rr.x-L.x,A=180-Bd-Cd;
 const t=base*Math.sin(rad(Cd))/Math.sin(rad(A));let T=P2(L.x+t*Math.cos(rad(Bd)),L.y-t*Math.sin(rad(Bd)));
 const top=40;if(T.y<top){const k=(L.y-top)/(L.y-T.y),cx=(L.x+Rr.x)/2;const sc=p=>P2(cx+(p.x-cx)*k,L.y-(L.y-p.y)*k);T=sc(T);L=sc(L);Rr=sc(Rr);}
 const n=names||shuf(['A','B','C']);return {a:T,l:L,r:Rr,n:{a:n[0],l:n[1],r:n[2]},B:Bd,C:Cd,A};}
const isoT=(h,names)=>tri((180-h)/2,(180-h)/2,names);
const cen=t=>P2((t.a.x+t.l.x+t.r.x)/3,(t.a.y+t.l.y+t.r.y)/3);
function sectorAt(V,P,Q,col,o={}){const r=o.r||26;let a0=degOf(Math.atan2(V.y-P.y,P.x-V.x)),a1=degOf(Math.atan2(V.y-Q.y,Q.x-V.x));let d=((a1-a0)%360+360)%360;if(d>180){[a0,a1]=[a1,a0];d=360-d;}
 const p0=[V.x+r*Math.cos(rad(a0)),V.y-r*Math.sin(rad(a0))],p1=[V.x+r*Math.cos(rad(a0+d)),V.y-r*Math.sin(rad(a0+d))];
 return {path:`<path d="M${f(V.x)} ${f(V.y)} L${f(p0[0])} ${f(p0[1])} A${r} ${r} 0 0 0 ${f(p1[0])} ${f(p1[1])} Z" fill="${col}" fill-opacity="${o.op||.85}"/>`,mid:a0+d/2,span:d};}
const TX=(x,y,t,c,o={})=>`<text x="${f(x)}" y="${f(y)}" text-anchor="middle" font-size="${o.fs||18}" font-weight="800" fill="${c}" stroke="#13233a" stroke-width="5" paint-order="stroke" direction="${o.rtl?'rtl':'ltr'}" class="${o.cls||''}" style="--d:${o.d||0}s;font-family:Rubik">${t}</text>`;
function angleMark(t,v,col,txt,o={}){const V=t[v],others=['a','l','r'].filter(k=>k!==v);const s=sectorAt(V,t[others[0]],t[others[1]],col,o);
 const rr=(o.r||26)+(s.span<45?30:22)+Math.min(14,(txt||'').length*1.6);const lx=V.x+rr*Math.cos(rad(s.mid)),ly=V.y-rr*Math.sin(rad(s.mid));
 return `<g class="${o.cls||''}" style="--d:${o.d||0}s">${s.path}${txt?TX(lx,ly+6,txt,o.tc||col):''}</g>`;}
const SIDE={al:['a','l'],ar:['a','r'],lr:['l','r']};
function ticks(t,s,n,col,o={}){const [p,q]=SIDE[s].map(k=>t[k]);const m=P2((p.x+q.x)/2,(p.y+q.y)/2),L=Math.hypot(q.x-p.x,q.y-p.y),u=P2((q.x-p.x)/L,(q.y-p.y)/L),nn=P2(-u.y,u.x);let g='';
 for(let k=0;k<n;k++){const off=(k-(n-1)/2)*8,c=P2(m.x+u.x*off,m.y+u.y*off);g+=`<line x1="${f(c.x-nn.x*10)}" y1="${f(c.y-nn.y*10)}" x2="${f(c.x+nn.x*10)}" y2="${f(c.y+nn.y*10)}" stroke="${col}" stroke-width="3.5" stroke-linecap="round"/>`;}
 return `<g class="${o.cls||''}" style="--d:${o.d||0}s">${g}</g>`;}
function sideLab(t,s,txt,col,o={}){const [p,q]=SIDE[s].map(k=>t[k]),c=cen(t);const m=P2((p.x+q.x)/2,(p.y+q.y)/2);let nn=P2(-(q.y-p.y),q.x-p.x);const L=Math.hypot(nn.x,nn.y);nn=P2(nn.x/L,nn.y/L);
 if((m.x-c.x)*nn.x+(m.y-c.y)*nn.y<0)nn=P2(-nn.x,-nn.y);const k=o.k||24+Math.min(20,txt.length*2);return TX(m.x+nn.x*k,m.y+nn.y*k+6,txt,col,{cls:o.cls,d:o.d});}
function sideCol(t,s,col,o={}){const [p,q]=SIDE[s].map(k=>t[k]);return `<line x1="${f(p.x)}" y1="${f(p.y)}" x2="${f(q.x)}" y2="${f(q.y)}" stroke="${col}" stroke-width="7" stroke-linecap="round" class="${o.cls||''}" style="--d:${o.d||0}s"/>`;}
function vLabels(t){const c=cen(t);return ['a','l','r'].map(k=>{const V=t[k],dx=V.x-c.x,dy=V.y-c.y,L=Math.hypot(dx,dy);return TX(V.x+dx/L*24,V.y+dy/L*24+7,t.n[k],'#dfe8f5',{fs:20});}).join('');}
/* AD from apex to base point D (the base midpoint) with its marks */
function segAD(t,o={}){const D=P2((t.l.x+t.r.x)/2,(t.l.y+t.r.y)/2);let g=`<g class="${o.cls||''}" style="--d:${o.d||0}s"><line x1="${f(t.a.x)}" y1="${f(t.a.y)}" x2="${f(D.x)}" y2="${f(D.y)}" stroke="${o.col||PU}" stroke-width="3.5"/>`+TX(D.x,D.y+26,'D','#dfe8f5',{fs:20})+'</g>';
 if(o.h)g+=`<path class="${o.hc||''}" style="--d:${o.hd||0}s" d="M${f(D.x)} ${f(D.y)} h-13 v-13 h13" fill="none" stroke="${GR}" stroke-width="3"/>`;
 if(o.m)g+=`<g class="${o.mc||''}" style="--d:${o.md||0}s">${[t.l,t.r].map(P=>{const m=P2((P.x+D.x)/2,D.y);return `<line x1="${f(m.x-3)}" y1="${f(m.y-9)}" x2="${f(m.x-3)}" y2="${f(m.y+9)}" stroke="${BL}" stroke-width="3"/><line x1="${f(m.x+3)}" y1="${f(m.y-9)}" x2="${f(m.x+3)}" y2="${f(m.y+9)}" stroke="${BL}" stroke-width="3"/>`}).join('')}</g>`;
 if(o.b){const half=(P)=>sectorAt(t.a,P,D,OR,{r:34,op:.75}).path;g+=`<g class="${o.bc||''}" style="--d:${o.bd||0}s">${half(t.l)}${half(t.r)}</g>`;}
 return g;}
function svgT(t,inner,o={}){return `<svg viewBox="0 0 ${W} ${H+10}" role="img" aria-label="משולש">${o.pre||''}<polygon points="${f(t.a.x)},${f(t.a.y)} ${f(t.l.x)},${f(t.l.y)} ${f(t.r.x)},${f(t.r.y)}" fill="#ffffff08" stroke="#dfe8f5" stroke-width="3" stroke-linejoin="round" class="${o.tc||''}" style="--d:0s"/>${inner}${o.noV?'':vLabels(t)}${o.note?`<text x="${W-8}" y="${H+4}" text-anchor="end" font-size="13" fill="#9fb3cc" direction="rtl">${o.note}</text>`:''}</svg>`;}
/* names */
const ang=(t,v)=>v==='a'?`∢${t.n.l}${t.n.a}${t.n.r}`:v==='l'?`∢${t.n.a}${t.n.l}${t.n.r}`:`∢${t.n.a}${t.n.r}${t.n.l}`;
const sd=(t,s)=>t.n[SIDE[s][0]]+t.n[SIDE[s][1]];
const OPP={l:'ar',r:'al',a:'lr'};
/* ===== question helpers ===== */
const ex=(a,b)=>(a===1?'':a)+'x'+(b>0?' + '+b:b<0?' − '+(-b):'');
function mkExpr(v,x0,avoid){let a,b,n=0;do{a=R(2,5);b=v-a*x0;n++;}while((a===avoid||b===0||Math.abs(b)>90)&&n<40);return [a,b];}
const sub=(a,b,x0)=>M(`${a} · ${x0} ${b<0?'−':'+'} ${Math.abs(b)} = ${a*x0+b}`);
const REASONS=['במשולש שווה שוקיים זוויות הבסיס שוות','אם במשולש שתי זוויות שוות, הצלעות שמולן שוות','סכום הזוויות במשולש הוא 180°','במשולש שווה שוקיים, הגובה לבסיס הוא גם תיכון וגם חוצה זווית'];
const RULE={th:'שוקיים שוות ← זוויות הבסיס שוות.',conv:'משפט הפוך: שתי זוויות שוות ← הצלעות <b>שמולן</b> שוות.',sum:'סכום הזוויות במשולש 180°. זוויות הבסיס שוות.',three:'במשולש שווה שוקיים הקטע מזווית הראש לבסיס: גובה = תיכון = חוצה זווית.',name:'כותבים זווית ב־3 אותיות, <b>הקודקוד תמיד באמצע</b>.'};
const withReason=(q,k)=>{q.choice=REASONS.slice();q.correct=k;q.choiceLab='הנימוק:';return q;};
const bEasy=()=>pick([35,40,45,50,55,60,65,70,75]);
const legsT=(t,o={})=>ticks(t,'al',1,o.c||'#dfe8f5',o)+ticks(t,'ar',1,o.c||'#dfe8f5',o);
/* ★ */
function gName(){const t=tri(...pick([[60,60],[70,50],[55,75],[65,65]]));const v=pick(['a','l','r']);const others=['a','l','r'].filter(k=>k!==v);
 const N=k=>t.n[k],good=Math.random()<.5?N(others[0])+N(v)+N(others[1]):N(others[1])+N(v)+N(others[0]);
 const opts=shuf(['∢'+good,'∢'+N(v)+N(others[0])+N(others[1]),'∢'+N(others[0])+N(others[1])+N(v),'∢'+N(others[1])+N(others[0])+N(v)]);
 return {kind:'כותבים זווית',dia:()=>svgT(t,angleMark(t,v,OR,'')),text:'איך כותבים את <b style="color:#ffb020">הזווית הכתומה</b>?',choice:opts.map(o=>M(o)),correct:opts.indexOf('∢'+good),
  lines:[`הקודקוד של הזווית הוא ${M(N(v))}.`,`הקודקוד תמיד <b>באמצע</b>: ${M('∢'+good)}`],rule:RULE.name,diag:()=>`בדקו: איזו אות היא <b>הקודקוד</b>? היא חייבת להיות באמצע.`};}
function gParts(){const t=isoT(pick([40,50,60,70,80,100]));const k=pick(['head','base','bases']);
 const opts=k==='base'?[sd(t,'lr'),sd(t,'al'),sd(t,'ar')]:k==='head'?[ang(t,'a'),ang(t,'l'),ang(t,'r')]:[`${ang(t,'l')} ו־${ang(t,'r')}`,`${ang(t,'a')} ו־${ang(t,'l')}`,`${ang(t,'a')} ו־${ang(t,'r')}`];
 const o2=shuf(opts);const Q={head:'מהי <b>זווית הראש</b>?',base:'מהו <b>הבסיס</b>?',bases:'מהן <b>זוויות הבסיס</b>?'}[k];
 return {kind:'שוקיים, בסיס, ראש',dia:()=>svgT(t,legsT(t)),text:`הקווים הקטנים מסמנים צלעות שוות. ${Q}`,choice:o2.map(x=>M(x)),correct:o2.indexOf(opts[0]),
  lines:[`השוקיים (המסומנות): ${M(sd(t,'al'))} ו־${M(sd(t,'ar'))}. הבסיס: ${M(sd(t,'lr'))}.`,`זווית הראש בין השוקיים: ${M(ang(t,'a'))}. זוויות הבסיס על הבסיס: ${M(ang(t,'l'))}, ${M(ang(t,'r'))}.`],
  rule:'השוקיים = הצלעות השוות. זווית הראש בין השוקיים. זוויות הבסיס יושבות על הבסיס.',diag:()=>'מוצאים קודם את <b>השוקיים</b> (הקווים הקטנים). הצלע השלישית היא הבסיס.'};}
function gIsIso(){const iso=Math.random()<.5;let B,C;if(iso){B=C=bEasy();}else{do{B=R(7,16)*5;C=R(7,16)*5;}while(B===C||B+C>=165||180-B-C===B||180-B-C===C);}
 const t=tri(B,C),A=180-B-C;const show=iso?pick([['l','a'],['r','a'],['l','r']]):pick([['l','a'],['l','r']]);const V={a:A,l:B,r:C};
 return {kind:'האם שווה שוקיים?',dia:()=>svgT(t,show.map((v,i)=>angleMark(t,v,i?BL:OR,V[v]+'°')).join(''),{note:'השרטוט אינו מדויק'}),
  text:`במשולש ${M(t.n.a+t.n.l+t.n.r)}: ${M(ang(t,show[0])+' = '+V[show[0]]+'°')}, ${M(ang(t,show[1])+' = '+V[show[1]]+'°')}. האם המשולש שווה שוקיים?`,
  choice:['כן, כי יש בו שתי זוויות שוות','לא, כי כל הזוויות שונות','כן, כי לכל משולש יש בסיס','אי אפשר לדעת'],correct:iso?0:1,
  lines:[`הזווית השלישית: ${M(`180° − ${V[show[0]]}° − ${V[show[1]]}° = ${180-V[show[0]]-V[show[1]]}°`)}`,`הזוויות: ${M(A+'°, '+B+'°, '+C+'°')} ← ${iso?'יש שתי זוויות שוות ← <b>שווה שוקיים</b>':'כולן שונות ← <b>לא</b> שווה שוקיים'}`],
  rule:'קודם מוצאים את הזווית השלישית (180°). שתי זוויות שוות ← שווה שוקיים (משפט הפוך).',diag:()=>'קודם מחשבים את <b>הזווית השלישית</b>: 180° פחות שתי הזוויות.'};}
/* ★★ */
function gBase(){const b=bEasy(),h=180-2*b,t=isoT(h);
 return {kind:'מוצאים זווית בסיס',dia:()=>svgT(t,legsT(t)+angleMark(t,'a',PU,h+'°')+angleMark(t,'l',OR,'?')),text:`${M(sd(t,'al')+' = '+sd(t,'ar'))}, ${M(ang(t,'a')+' = '+h+'°')}. מצאו את ${M(ang(t,'l'))}.`,
  ans:[{label:ang(t,'l'),col:OR,val:b,lt:1}],lines:[`לשתי זוויות הבסיס יחד: ${M(`180° − ${h}° = ${180-h}°`)}`,`הן שוות ← מחלקים לשתיים: ${M(`${180-h} : 2 = ${b}°`)}`],rule:RULE.sum,
  diag:({vals:[x]})=>x===180-h?'זה <b>שתי</b> זוויות הבסיס יחד. מחלקים ב־2.':x===h?'זווית הבסיס לא שווה לזווית הראש. ':x===180-2*h?'חיסרתם את זווית הראש פעמיים. רק זוויות הבסיס שוות.':null};}
function gHead(){const b=bEasy(),h=180-2*b,t=isoT(h);
 return {kind:'מוצאים זווית ראש',dia:()=>svgT(t,legsT(t)+angleMark(t,'r',OR,b+'°')+angleMark(t,'a',PU,'?')),text:`${M(sd(t,'al')+' = '+sd(t,'ar'))}, ${M(ang(t,'r')+' = '+b+'°')}. מצאו את ${M(ang(t,'a'))}.`,
  ans:[{label:ang(t,'a'),col:PU,val:h,lt:1}],lines:[`זוויות הבסיס שוות: ${M(ang(t,'l')+' = '+b+'°')}`,`זווית הראש: ${M(`180° − ${b}° − ${b}° = ${h}°`)}`],rule:RULE.th,
  diag:({vals:[x]})=>x===180-b?'חיסרתם רק זווית בסיס אחת. יש <b>שתיים</b>, והן שוות.':x===b?'זווית הראש לא חייבת להיות שווה לזווית הבסיס.':null};}
function gConvSide(){const b=bEasy(),t=isoT(180-2*b),s=R(4,15);
 return {kind:'משפט הפוך · צלע',dia:()=>svgT(t,sideCol(t,'al',OR)+sideCol(t,'ar',BL)+angleMark(t,'r',OR,b+'°')+angleMark(t,'l',BL,b+'°')+sideLab(t,'al',s+'',OR)+sideLab(t,'ar','?',BL)),
  text:`${M(`${ang(t,'l')} = ${ang(t,'r')} = ${b}°`)}, ${M(sd(t,'al')+' = '+s)} ${CM}. מצאו את ${M(sd(t,'ar'))}.`,ans:[{label:sd(t,'ar'),col:BL,val:s,unit:CM,lt:1}],
  lines:[`<b style="color:${BL}">${M(ang(t,'l'))}</b> מול <b style="color:${BL}">${M(sd(t,'ar'))}</b>. <b style="color:${OR}">${M(ang(t,'r'))}</b> מול <b style="color:${OR}">${M(sd(t,'al'))}</b>.`,`הזוויות שוות ← הצלעות שמולן שוות: ${M(sd(t,'ar')+' = '+s)} ${CM}`],rule:RULE.conv,
  diag:()=>'מחפשים את הצלע <b>שמול</b> כל זווית (באותו צבע). זוויות שוות ← הצלעות שמולן שוות.'};}
function gMedian(){const h=pick([40,50,60,70,80,100]),t=isoT(h),k=R(3,12);
 return {kind:'שלושה באחד',dia:()=>svgT(t,legsT(t)+segAD(t,{h:1})+sideLab(t,'lr',2*k+'',BL,{k:40})),text:`${M(sd(t,'al')+' = '+sd(t,'ar'))}, ${M('AD'.replace('A',t.n.a))} הוא <b>גובה</b> לבסיס, ${M(sd(t,'lr')+' = '+2*k)} ${CM}. מצאו את ${M(t.n.l+'D')}.`,
  ans:[{label:t.n.l+'D',col:BL,val:k,unit:CM,lt:1}],lines:[`במשולש שווה שוקיים הגובה לבסיס הוא גם <b>תיכון</b> ← D אמצע הבסיס.`,`${M(`${2*k} : 2 = ${k}`)} ${CM}`],rule:RULE.three,
  diag:({vals:[x]})=>x===2*k?'זה כל הבסיס. התיכון מגיע ל<b>אמצע</b>: מחלקים ב־2.':null};}
/* ★★★ with variables */
function gVarAng(){const b=pick([R(35,75)]),h=180-2*b,t=isoT(h),x0=R(5,20),[a1,b1]=mkExpr(b,x0),[a2,b2]=mkExpr(b,x0,a1);
 const ca=Math.abs(a1-a2),cb=a1>a2?b2-b1:b1-b2;
 return withReason({kind:'משתנים · זוויות בסיס',dia:()=>svgT(t,legsT(t)+angleMark(t,'l',OR,ex(a1,b1))+angleMark(t,'r',BL,ex(a2,b2))),
  text:`${M(sd(t,'al')+' = '+sd(t,'ar'))}. מצאו את x ואת ${M(ang(t,'l'))}.`,ans:[{label:'x =',col:PU,val:x0,unit:''},{label:ang(t,'l'),col:OR,val:b,lt:1}],
  lines:['זוויות הבסיס שוות ←',M(`${ex(a1,b1)} = ${ex(a2,b2)}`),M(`${ca}x = ${cb}`)+' ← '+M('x = '+x0),`מציבים: ${sub(a1,b1,x0)}°`],rule:RULE.th,
  diag:({vals:[x,y]})=>x===x0&&y!==b?'את x מצאתם! עכשיו <b>מציבים</b> בביטוי '+M(ex(a1,b1))+'.':y===x0?'x הוא לא הזווית. מציבים את x בביטוי.':null},0);}
function gVarSide(){const b=bEasy(),t=isoT(180-2*b),x0=R(2,9),s=R(9,30),[a1,b1]=mkExpr(s,x0),[a2,b2]=mkExpr(s,x0,a1);const ca=Math.abs(a1-a2),cb=a1>a2?b2-b1:b1-b2;
 return withReason({kind:'משתנים · משפט הפוך',dia:()=>svgT(t,sideCol(t,'al',OR)+sideCol(t,'ar',BL)+angleMark(t,'r',OR,b+'°')+angleMark(t,'l',BL,b+'°')+sideLab(t,'al',ex(a1,b1),OR)+sideLab(t,'ar',ex(a2,b2),BL)),
  text:`${M(`${ang(t,'l')} = ${ang(t,'r')}`)}. מצאו את x ואת אורך ${M(sd(t,'al'))}.`,ans:[{label:'x =',col:PU,val:x0,unit:''},{label:sd(t,'al'),col:OR,val:s,unit:CM,lt:1}],
  lines:['שתי זוויות שוות ← הצלעות <b>שמולן</b> שוות ←',M(`${ex(a1,b1)} = ${ex(a2,b2)}`),M(`${ca}x = ${cb}`)+' ← '+M('x = '+x0),`מציבים: ${sub(a1,b1,x0)} ${CM}`],rule:RULE.conv,
  diag:({vals:[x,y]})=>x===x0&&y!==s?'את x מצאתם! מציבים בביטוי '+M(ex(a1,b1))+'.':null},1);}
function gVarSum(){const b=R(30,70),h=180-2*b,t=isoT(h),x0=R(5,20),[a1,b1]=mkExpr(h,x0);
 return withReason({kind:'משתנים · סכום 180°',dia:()=>svgT(t,legsT(t)+angleMark(t,'a',PU,ex(a1,b1))+angleMark(t,'l',OR,b+'°')),
  text:`${M(sd(t,'al')+' = '+sd(t,'ar'))}, ${M(ang(t,'l')+' = '+b+'°')}. מצאו את x.`,ans:[{label:'x =',col:PU,val:x0,unit:''}],
  lines:[`זוויות הבסיס שוות: ${M(ang(t,'r')+' = '+b+'°')}`,M(`${ex(a1,b1)} + ${b} + ${b} = 180`),M(`${a1}x = ${180-2*b-b1}`)+' ← '+M('x = '+x0)],rule:RULE.sum,
  diag:({vals:[x]})=>Math.abs(x-(180-b-b1)/a1)<1e-9?'חיברתם רק זווית בסיס אחת. יש <b>שתיים</b> שוות.':null},2);}
function gThreeR(){const h=pick([40,50,60,70,80,100,110]),t=isoT(h);
 return withReason({kind:'שלושה באחד · נימוק',dia:()=>svgT(t,legsT(t)+segAD(t,{h:1})+angleMark(t,'a',PU,h+'°',{r:22})),text:`${M(sd(t,'al')+' = '+sd(t,'ar'))}, ${M(t.n.a+'D')} גובה לבסיס, ${M(ang(t,'a')+' = '+h+'°')}. מצאו את ${M('∢'+t.n.l+t.n.a+'D')}.`,
  ans:[{label:'∢'+t.n.l+t.n.a+'D',col:OR,val:h/2,lt:1}],lines:['הגובה לבסיס הוא גם <b>חוצה זווית</b>.',M(`${h} : 2 = ${h/2}°`)],rule:RULE.three,
  diag:({vals:[x]})=>x===h?'הגובה <b>חוצה</b> את זווית הראש לשני חלקים שווים: מחלקים ב־2.':x===90?'90° היא הזווית ליד D. שואלים על הזווית ליד הקודקוד '+t.n.a+'.':null},3);}
/* ★★★★ */
const TFS=[['זווית בסיס במשולש שווה שוקיים יכולה להיות 90°.',0,'שתי זוויות בסיס של 90° הן כבר 180°, ולזווית הראש לא נשאר כלום.'],['זווית הראש במשולש שווה שוקיים יכולה להיות קהה.',1,'למשל 120°, 30°, 30°.'],['כל משולש שווה צלעות הוא גם שווה שוקיים.',1,'יש בו (לפחות) שתי צלעות שוות.'],['כל משולש שווה שוקיים הוא גם שווה צלעות.',0,'למשל 5, 5, 8: רק שתי צלעות שוות.'],['אם במשולש יש שתי זוויות של 50°, הוא שווה שוקיים.',1,'משפט הפוך: שתי זוויות שוות ← הצלעות שמולן שוות.'],['במשולש שווה שוקיים אפשר שזווית הבסיס תהיה 100°.',0,'שתי זוויות בסיס של 100° הן כבר יותר מ־180°.']];
function gTF(){const [s,ok,why]=pick(TFS),t=isoT(70);return {kind:'נכון או לא נכון?',dia:()=>svgT(t,legsT(t)),text:s,choice:['נכון','לא נכון'],correct:ok?0:1,lines:[`<b>${ok?'נכון':'לא נכון'}</b>: ${why}`],rule:'בודקים עם 180° ועם דוגמה.',diag:()=>'נסו עם מספרים: האם הזוויות מסתכמות ב־180°?'};}
function gConv3(){const t=isoT(pick([50,60,70,80])),k=pick([['h','m'],['b','h'],['b','m']]),nm={h:'גובה',m:'תיכון',b:'חוצה זווית'};const o={};k.forEach(z=>o[z]=1);
 const opts=[`${sd(t,'al')} = ${sd(t,'ar')}`,`${ang(t,'a')} = 90°`,`${sd(t,'lr')} = ${sd(t,'al')}`,'אי אפשר לדעת'];const o2=shuf(opts);
 return {kind:'משפטים הפוכים · 2 מתוך 3',dia:()=>svgT(t,segAD(t,o)),text:`במשולש ${M(t.n.a+t.n.l+t.n.r)}, הקטע ${M(t.n.a+'D')} הוא גם <b>${nm[k[0]]}</b> וגם <b>${nm[k[1]]}</b>. מה נובע מזה?`,
  choice:o2.map(x=>x==='אי אפשר לדעת'?x:M(x)),correct:o2.indexOf(opts[0]),lines:[`הקטע הוא ${nm[k[0]]} וגם ${nm[k[1]]} ← המשולש <b>שווה שוקיים</b>.`,`ולכן ${M(opts[0])}`],
  rule:'משפטים הפוכים: אם קטע מהקודקוד הוא 2 מתוך 3 (גובה, תיכון, חוצה זווית) ← המשולש שווה שוקיים.',diag:()=>'זכרו: 2 מתוך 3 (גובה, תיכון, חוצה זווית) ← שווה שוקיים.'};}
function gExt(){const b=pick([40,45,50,55,60,65,70,75]),h=180-2*b,t=isoT(h),e=180-b;
 const E=P2(t.r.x+70,t.r.y);const out=sectorAt(t.r,t.a,E,OR,{}).path;
 return {kind:'זווית חיצונית · שני צעדים',dia:()=>svgT(t,legsT(t)+`<line x1="${f(t.r.x)}" y1="${f(t.r.y)}" x2="${f(E.x)}" y2="${f(E.y)}" stroke="#dfe8f5" stroke-width="3"/>`+out+TX(t.r.x+44,t.r.y-30,e+'°',OR)+TX(E.x+4,E.y+24,'E','#dfe8f5',{fs:18})+angleMark(t,'a',PU,'?')),
  text:`${M(sd(t,'al')+' = '+sd(t,'ar'))}. הבסיס הוארך עד E, ${M('∢'+t.n.a+t.n.r+'E = '+e+'°')}. מצאו את ${M(ang(t,'a'))}.`,ans:[{label:ang(t,'a'),col:PU,val:h,lt:1}],
  lines:[`צעד 1: צמודות ← ${M(ang(t,'r')+' = 180° − '+e+'° = '+b+'°')}`,`צעד 2: זוויות הבסיס שוות ← ${M(ang(t,'l')+' = '+b+'°')}`,`צעד 3: ${M(`180° − ${b}° − ${b}° = ${h}°`)}`],rule:'זווית חיצונית ← קודם הצמודה שלה (180°), ואז זוויות הבסיס.',
  diag:({vals:[x]})=>x===b?'זאת זווית הבסיס. עכשיו מוצאים את זווית הראש: 180° פחות שתי זוויות הבסיס.':x===180-e*2?'הזווית החיצונית היא לא זווית בתוך המשולש. קודם 180° − '+e+'°.':null};}
function gWord(){let b,txt,line;if(Math.random()<.5){const k=pick([2,3]);b=180/(k+2);txt=`גדולה <b>פי ${k}</b> מכל זווית בסיס`;line=M(`x + x + ${k}x = 180`)+' ← '+M(`${k+2}x = 180`)+' ← '+M('x = '+b);}
 else{const d=pick([15,30,45,60]);b=(180-d)/3;txt=`גדולה ב־${M(d+'°')} מכל זווית בסיס`;line=M(`x + x + x + ${d} = 180`)+' ← '+M(`3x = ${180-d}`)+' ← '+M('x = '+b);}
 const h=180-2*b,t=isoT(h);return {kind:'בעיה מילולית',dia:()=>svgT(t,legsT(t)+angleMark(t,'l',OR,'x')+angleMark(t,'r',OR,'x')+angleMark(t,'a',PU,'?')),text:`במשולש שווה שוקיים, זווית הראש ${txt}. מצאו את זווית הבסיס ואת זווית הראש.`,
  ans:[{label:'זווית בסיס',col:OR,val:b},{label:'זווית הראש',col:PU,val:h}],lines:['זוויות הבסיס: x ו־x.',line,`זווית הראש: ${M(`180° − 2 · ${b}° = ${h}°`)}`],rule:'"פי" ← כופלים את x. "ב־" ← מוסיפים ל־x. ואז: סכום 180°.',
  diag:({vals:[x,y]})=>x+x+y!==180?'בדקו: זווית בסיס + זווית בסיס + זווית ראש = 180°.':null};}
const QDIA=(q,hl)=>q.dia(hl);
/* ===== levels ===== */
const LEVELS=[
 {n:1,t:'כותבים זווית, שוקיים ובסיס',d:'3 אותיות, הקודקוד באמצע',g:()=>pick([gName,gParts,gIsIso])()},
 {n:2,t:'מוצאים זוויות וצלעות',d:'180°, משפט ומשפט הפוך',g:()=>pick([gBase,gHead,gConvSide,gMedian])()},
 {n:3,t:'משתנים + נימוק',d:'משוואה, x, ולמה',g:()=>pick([gVarAng,gVarSide,gVarSum,gThreeR])()},
 {n:4,t:'חשיבה ואוריינות',d:'נכון/לא נכון, 2 מתוך 3, זווית חיצונית',g:()=>pick([gTF,gConv3,gExt,gWord])()}];
const TEST=[[gName,gParts,gIsIso,gName],[gBase,gHead,gConvSide,gMedian],[gVarAng,gVarSide,gVarSum,gThreeR],[gTF,gConv3,gExt,gWord]];
const WARM=[gName,gParts,gName,gParts,gBase,gHead,gIsIso,gBase];
/* ===== animated explanation ===== */
const T0=()=>isoT(40,['A','B','C']);
const RECAP=[
 {h:'איך כותבים זווית?',d:1.2,svg:()=>{const t=T0();return svgT(t,angleMark(t,'l',OR,'',{cls:'rv',d:.4})+`<circle class="rv" style="--d:.9s" cx="${f(t.l.x)}" cy="${f(t.l.y)}" r="10" fill="none" stroke="${OR}" stroke-width="3"/>`);},
  says:[`זווית כותבים עם הסימן ${M('∢')} ו־<b>3 אותיות</b>.`,`<b>הקודקוד תמיד באמצע</b>: ${M('∢ABC')} או ${M('∢CBA')} <span class="v">✓</span>`,`${M('∢BAC')} <span class="x">✗</span> זו זווית אחרת: הקודקוד שלה A.`],what:'קודם מוצאים את הקודקוד, ושמים אותו <b>באמצע</b>.'},
 {h:'המושגים',d:1.6,svg:()=>{const t=T0();return svgT(t,legsT(t,{c:OR,cls:'rv',d:.3})+sideLab(t,'al','שוק',OR,{cls:'rv',d:.5,k:30})+sideLab(t,'ar','שוק',OR,{cls:'rv',d:.7,k:30})+sideLab(t,'lr','בסיס',BL,{cls:'rv',d:1})+angleMark(t,'a',PU,'',{cls:'rv',d:1.2})+angleMark(t,'l',GR,'',{cls:'rv',d:1.4})+angleMark(t,'r',GR,'',{cls:'rv',d:1.4}));},
  says:[`<b style="color:${OR}">השוקיים</b>: ${M('AB = AC')} (הקווים הקטנים). <b style="color:${BL}">הבסיס</b>: ${M('BC')}.`,`<b style="color:${PU}">זווית הראש</b> בין השוקיים: ${M('∢BAC')}. <b style="color:${GR}">זוויות הבסיס</b>: ${M('∢ABC')}, ${M('∢ACB')}.`],
  def:'<b>הגדרה:</b> משולש שווה שוקיים הוא משולש שיש בו <b>שתי צלעות שוות</b>.',what:'שוקיים, בסיס, זווית ראש, זוויות בסיס: המילים של כל הנושא.'},
 {h:'סכום הזוויות במשולש',d:1.8,svg:()=>{const t=T0();return svgT(t,angleMark(t,'a',PU,'40°',{cls:'rv',d:.3})+angleMark(t,'l',OR,'70°',{cls:'rv',d:.8})+angleMark(t,'r',OR,'70°',{cls:'rv',d:1.3}));},
  says:[M('40° + 70° + 70° = 180°'),'בכל משולש, בלי יוצא מן הכלל.'],what:'סכום הזוויות בכל משולש הוא <b>180°</b>.'},
 {h:'המשפט: זוויות הבסיס שוות',d:2.4,svg:()=>{const t=T0();return svgT(t,legsT(t,{cls:'rv',d:.2})+sideCol(t,'al',OR,{cls:'rv',d:.8})+sideCol(t,'ar',BL,{cls:'rv',d:1.1})+angleMark(t,'r',OR,'',{cls:'rv',d:1.7})+angleMark(t,'l',BL,'',{cls:'rv',d:2}));},
  says:[`נתון: ${M('AB = AC')}`,`כל זווית יושבת <b>מול</b> צלע באותו צבע.`,`מסקנה: ${M('∢ABC = ∢ACB')}`],def:'<b>משפט:</b> במשולש שווה שוקיים זוויות הבסיס שוות.',what:'שוקיים שוות ← <b>זוויות הבסיס שוות</b>.'},
 {h:'המשפט ההפוך',d:2.4,svg:()=>{const t=T0();return svgT(t,angleMark(t,'l',BL,'',{cls:'rv',d:.2})+angleMark(t,'r',OR,'',{cls:'rv',d:.5})+sideCol(t,'ar',BL,{cls:'rv',d:1.1})+sideCol(t,'al',OR,{cls:'rv',d:1.4})+legsT(t,{cls:'rv',d:2}));},
  says:[`נתון: ${M('∢ABC = ∢ACB')}`,`הצלעות <b>שמולן</b> שוות: ${M('AC = AB')}`,'← המשולש <b>שווה שוקיים</b>!'],def:'<b>משפט הפוך:</b> אם במשולש שתי זוויות שוות, הצלעות שמולן שוות. (מחליפים בין הנתון למסקנה.)',what:'שתי זוויות שוות ← <b>הצלעות שמולן שוות</b>.'},
 {h:'שלושה באחד',d:2.6,svg:()=>{const t=T0();return svgT(t,legsT(t)+segAD(t,{h:1,m:1,b:1,cls:'rv',d:.2,hc:'rv',hd:.9,mc:'rv',md:1.5,bc:'rv',bd:2.1}));},
  says:[`${M('AD')} יוצא מזווית הראש אל הבסיס.`,'<b>גובה</b> (ריבוע) = <b>תיכון</b> (D באמצע) = <b>חוצה זווית</b> (שתי קשתות).'],def:'<b>משפט:</b> במשולש שווה שוקיים, הגובה לבסיס הוא גם התיכון לבסיס וגם חוצה זווית הראש.',what:'מספיק לדעת אחד מהשלושה, ומקבלים את שלושתם.'},
 {h:'המשפטים ההפוכים: 2 מתוך 3',d:2.6,svg:()=>{const t=T0();return svgT(t,segAD(t,{h:1,m:1,cls:'rv',d:.2,hc:'rv',hd:.7,mc:'rv',md:1.2})+legsT(t,{c:GR,cls:'rv',d:2.2}));},
  says:['אם הקטע מהקודקוד הוא <b>2 מתוך 3</b>: גובה, תיכון, חוצה זווית',`← המשולש שווה שוקיים: ${M('AB = AC')}`],def:'<b>משפטים הפוכים:</b> גובה + תיכון, גובה + חוצה זווית, או תיכון + חוצה זווית ← המשולש שווה שוקיים.',what:'רואים 2 מתוך 3? ← <b>שווה שוקיים</b>.'},
 {h:'עם משתנים',d:1.4,svg:()=>{const t=T0();return svgT(t,legsT(t)+angleMark(t,'l',OR,'2x + 20',{cls:'rv',d:.3})+angleMark(t,'r',BL,'3x − 5',{cls:'rv',d:.7}));},
  says:[`זוויות הבסיס שוות ← ${M('2x + 20 = 3x − 5')}`,`${M('25 = x')}`,`${M('∢ABC = 2 · 25 + 20 = 70°')} · בדיקה: ${M('3 · 25 − 5 = 70')} <span class="v">✓</span>`],what:'משפט ← <b>משוואה</b> ← x ← <b>מציבים</b> ← בודקים.'},
 {h:'הטעות הנפוצה',d:1.4,svg:()=>{const t=T0();return svgT(t,legsT(t)+angleMark(t,'a',PU,'40°')+angleMark(t,'l',OR,'?'));},
  says:[`זווית הראש ${M('40°')}. מישהו כתב: זווית בסיס ${M('40°')} <span class="x">✗</span>`,'זווית הראש <b>לא</b> שווה לזווית הבסיס!',`${M('(180° − 40°) : 2 = 70°')} <span class="v">✓</span>`],what:'רק <b>זוויות הבסיס</b> שוות זו לזו.'}];
