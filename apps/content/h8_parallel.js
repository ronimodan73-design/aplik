/*META {"id":"h8_parallel","title":"זוויות בין ישרים מקבילים · ח׳ א2","short":"זוויות","topic":"זוויות בין ישרים מקבילים","glyph":"∥","color":"#ffb020"} */
const APP={key:'h8par',topic:'זוויות בין ישרים מקבילים',sub:'מתאימות, מתחלפות, צמודות וקודקודיות, גם עם x.',rcFn:q=>({corr:4,alt:5,vert:3,adj:2})[q.t]??(/משתנ|ביטוי/.test(q.kind)?6:q.kind==='בעיה מילולית'?7:1)};
/* ===== geometry ===== */
const NAME={corr:'מתאימות',alt:'מתחלפות',vert:'קודקודיות',adj:'צמודות'};
const HOW={corr:'באותו מקום בשתי הצמתים (צורת F)',alt:'בין הישרים, משני צדי החותך (צורת Z)',vert:'באותה צומת, אחת מול השנייה (צורת X)',adj:'באותה צומת, עם צלע משותפת, ויחד הן קו ישר'};
const EQ=t=>t!=='adj';
const REASON={corr:'זוויות מתאימות בין ישרים מקבילים שוות',alt:'זוויות מתחלפות בין ישרים מקבילים שוות',vert:'זוויות קודקודיות שוות',adj:'סכום זוויות צמודות הוא 180°'};
const RULE={corr:'מתאימות (F) בין ישרים מקבילים ← שוות.',alt:'מתחלפות (Z) בין ישרים מקבילים ← שוות.',vert:'קודקודיות (X) ← שוות.',adj:'צמודות ← סכומן 180°. הן לא שוות!'};
const PAIRS={corr:[],alt:[[[0,'BL'],[1,'TR']],[[0,'BR'],[1,'TL']]],vert:[],adj:[]};
['TR','TL','BL','BR'].forEach(p=>PAIRS.corr.push([[0,p],[1,p]]));
[0,1].forEach(i=>{PAIRS.vert.push([[i,'TR'],[i,'BL']],[[i,'TL'],[i,'BR']]);PAIRS.adj.push([[i,'TR'],[i,'TL']],[[i,'TL'],[i,'BL']],[[i,'BL'],[i,'BR']],[[i,'BR'],[i,'TR']]);});
const val=(u,p)=>(p==='TR'||p==='BL')?u:180-u;
const RANGE={TR:u=>[0,u],TL:u=>[u,180],BL:u=>[180,180+u],BR:u=>[180+u,360]};
const Y0=95,Y1=215,CX=200,W=400,H=300;
function geo(u){const r=u*Math.PI/180,dx=60/Math.tan(r),d=[Math.cos(r),-Math.sin(r)];
 const P=[CX+dx,Y0],Q=[CX-dx,Y1];const L1=(Y0-14)/Math.sin(r),L2=(H-14-Y1)/Math.sin(r);
 return {u,d,P,Q,top:[P[0]+d[0]*L1,P[1]+d[1]*L1],bot:[Q[0]-d[0]*L2,Q[1]-d[1]*L2],Vx:i=>i?Q:P};}
const pt=(V,a,r)=>[V[0]+r*Math.cos(a*Math.PI/180),V[1]-r*Math.sin(a*Math.PI/180)];
function sector(g,i,p,col,o={}){const V=g.Vx(i),[a0,a1]=RANGE[p](g.u),r=o.r||27;const s=pt(V,a0,r),e=pt(V,a1,r);
 return `<path d="M${f(V[0])} ${f(V[1])} L${f(s[0])} ${f(s[1])} A${r} ${r} 0 0 0 ${f(e[0])} ${f(e[1])} Z" fill="${col}" fill-opacity="${o.op||.85}" stroke="${o.stroke||'none'}" stroke-width="3"/>`;}
function label(g,i,p,t,col){const V=g.Vx(i),[a0,a1]=RANGE[p](g.u),span=a1-a0,mid=(a0+a1)/2,rr=span<55?62:50+Math.min(18,t.length*2);const q=pt(V,mid,rr);
 return `<text x="${f(q[0])}" y="${f(q[1]+6)}" text-anchor="middle" font-size="18" font-weight="800" fill="${col}" stroke="#13233a" stroke-width="5" paint-order="stroke" style="font-family:Rubik">${t}</text>`;}
const seg=(a,b,col,w,cls='',d=0)=>`<line x1="${f(a[0])}" y1="${f(a[1])}" x2="${f(b[0])}" y2="${f(b[1])}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" class="${cls}" style="--d:${d}s"/>`;
const side=p=>(p==='TR'||p==='BR')?1:-1;
function shape(g,t,A,B){const S=[],h=(V,s,l=78)=>[V,[V[0]+s*l,V[1]]],tr=(V,l)=>[[V[0]-g.d[0]*l,V[1]-g.d[1]*l],[V[0]+g.d[0]*l,V[1]+g.d[1]*l]];
 const P=g.P,Q=g.Q;
 if(t==='corr'){const s=side(A[1]);S.push([[P[0]+g.d[0]*30,P[1]+g.d[1]*30],[Q[0]-g.d[0]*30,Q[1]-g.d[1]*30]],h(P,s),h(Q,s));}
 if(t==='alt'){const top=A[0]===0?A:B,bot=A[0]===0?B:A;S.push(h(P,side(top[1])),[P,Q],h(Q,side(bot[1])));}
 if(t==='vert'){const V=g.Vx(A[0]);S.push([[V[0]-58,V[1]],[V[0]+58,V[1]]],tr(V,58));}
 if(t==='adj'){const V=g.Vx(A[0]);const bothTop=A[1][0]===B[1][0];S.push(bothTop?[[V[0]-70,V[1]],[V[0]+70,V[1]]]:tr(V,70));}
 return S.map((s,k)=>seg(s[0],s[1],GR,11,'drawl',k*.35)).join('');}
function dia(u,marks,o={}){const g=geo(u);let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="שני ישרים מקבילים וחותך">`;
 s+=`<g opacity=".5">${o.hl||''}</g>`;
 s+=seg([12,Y0],[W-12,Y0],'#dfe8f5',3)+seg([12,Y1],[W-12,Y1],'#dfe8f5',3);
 if(o.arrows!==false)[Y0,Y1].forEach(y=>{s+=`<path d="M40 ${y-7} L49 ${y} L40 ${y+7} M50 ${y-7} L59 ${y} L50 ${y+7}" stroke="#dfe8f5" stroke-width="2.5" fill="none"/>`;});
 s+=seg(g.top,g.bot,'#dfe8f5',3,o.drawT?'drawl':'',o.drawT||0);
 s+=(o.pre||'');
 marks.forEach(m=>{s+=`<g class="${m.cls||''}" style="--d:${m.d||0}s">${sector(g,m.i,m.p,m.c,m)}${m.t?label(g,m.i,m.p,m.t,m.tc||m.c):''}</g>`;});
 [g.P,g.Q].forEach(V=>s+=`<circle cx="${f(V[0])}" cy="${f(V[1])}" r="3.5" fill="#dfe8f5"/>`);
 s+=(o.post||'');
 if(o.note)s+=`<text x="${W-10}" y="${H-6}" text-anchor="end" font-size="13" fill="#9fb3cc" direction="rtl">${o.note}</text>`;
 return s+'</svg>';}
/* ===== question helpers ===== */
const uEasy=()=>pick([50,55,60,65,70,75,105,110,115,120,125,130]);
const uAny=()=>pick([R(46,80),R(100,134)]);
const ex=(a,b)=>(a===1?'':a)+'x'+(b>0?' + '+b:b<0?' − '+(-b):'');
const sw=pr=>Math.random()<.5?pr:[pr[1],pr[0]];
function mkExpr(v,x0,avoid){let a,b,n=0;do{a=R(2,6);b=v-a*x0;n++;}while((a===avoid||b===0||Math.abs(b)>120)&&n<40);return [a,b];}
const TYPES=['corr','alt','vert','adj'];
function genType(tt){const t=tt||pick(TYPES),[A,B]=sw(pick(PAIRS[t])),u=uEasy();
 const opts=['מתאימות (F)','מתחלפות (Z)','צמודות','קודקודיות (X)'],keys=['corr','alt','adj','vert'];
 return {kind:'מזהים זוג זוויות',u,A,B,t,text:`איזה זוג זוויות הן <b style="color:${OR}">זווית א</b> ו<b style="color:${BL}">זווית ב</b>?`,
  marks:[{i:A[0],p:A[1],c:OR,t:'א'},{i:B[0],p:B[1],c:BL,t:'ב'}],choice:opts,correct:keys.indexOf(t),
  lines:[`הן ${HOW[t]}.`,`ולכן הן <b>${NAME[t]}</b>: ${EQ(t)?'שוות':'סכומן 180°'}.`],rule:RULE[t],
  diag:({sel})=>`זוויות ${NAME[keys[sel]]} הן ${HOW[keys[sel]]}. כאן הזוויות ${HOW[t]}.`};}
function genEqOrSum(){const t=pick(TYPES),[A,B]=sw(pick(PAIRS[t])),u=uEasy();
 return {kind:'שוות או 180°?',u,A,B,t,text:`<b style="color:${OR}">זווית א</b> ו<b style="color:${BL}">זווית ב</b>:`,marks:[{i:A[0],p:A[1],c:OR,t:'א'},{i:B[0],p:B[1],c:BL,t:'ב'}],
  choice:['שוות זו לזו','סכומן 180°'],correct:EQ(t)?0:1,lines:[`הן ${NAME[t]}: ${HOW[t]}.`,EQ(t)?'ולכן <b>שוות</b>.':'ולכן <b>סכומן 180°</b>.'],rule:'שתי חדות או שתי קהות ← שוות. חדה + קהה ← 180°.',
  diag:()=>`זאת זוג <b>${NAME[t]}</b> (${HOW[t]}). ${EQ(t)?'הן שוות.':'יחד הן קו ישר: 180°.'}`};}
function genFind(tt){const t=tt||pick(TYPES),[A,B]=sw(pick(PAIRS[t])),u=uEasy(),vA=val(u,A[1]),vB=val(u,B[1]);
 return {kind:'מוצאים זווית',u,A,B,t,text:`<b style="color:${OR}">הזווית הכתומה</b> היא ${M(vA+deg)}. כמה מעלות <b style="color:${BL}">הזווית הכחולה</b>?`,
  marks:[{i:A[0],p:A[1],c:OR,t:vA+deg},{i:B[0],p:B[1],c:BL,t:'?'}],ans:[{label:'הזווית הכחולה',col:BL,val:vB}],
  lines:[`הזוויות ${NAME[t]}: ${HOW[t]}.`,EQ(t)?`ולכן שוות: ${M(vB+deg)}`:`ולכן ${M('180° − '+vA+'° = '+vB+'°')}`],rule:RULE[t],
  diag:({vals:[x]})=>EQ(t)&&x===180-vA?`הזוויות ${NAME[t]} <b>שוות</b>. לא מחסירים מ־180.`:(!EQ(t)&&x===vA?'זוויות צמודות <b>אינן שוות</b>. יחד הן קו ישר: '+M('180° − '+vA):null)};}
function reasonQ(q,t){q.choice=[REASON.corr,REASON.alt,REASON.vert,REASON.adj];q.correct=['corr','alt','vert','adj'].indexOf(t);q.choiceLab='הנימוק:';return q;}
function genVar1(withR){const t=pick(TYPES),[A,B]=sw(pick(PAIRS[t])),u=uAny(),vA=val(u,A[1]),vB=val(u,B[1]),x0=R(6,25),[a,b]=mkExpr(vA,x0);
 const eqs=EQ(t)?`${ex(a,b)} = ${vB}`:`${ex(a,b)} + ${vB} = 180`;
 const q={kind:'משתנה אחד',u,A,B,t,text:`מצאו את x ואת <b style="color:${OR}">הזווית הכתומה</b>.`,
  marks:[{i:A[0],p:A[1],c:OR,t:ex(a,b)},{i:B[0],p:B[1],c:BL,t:vB+deg}],ans:[{label:'x =',col:PU,val:x0},{label:'הזווית הכתומה',col:OR,val:vA}],
  lines:[`הזוויות ${NAME[t]} ← ${EQ(t)?'שוות':'סכומן 180°'}`,M(eqs),M(`${a}x = ${EQ(t)?vB-b:180-vB-b}`)+' ← '+M('x = '+x0),`מציבים: ${M(`${a} · ${x0} ${b<0?'−':'+'} ${Math.abs(b)} = ${vA}°`)}`],rule:RULE[t],
  diag:({vals:[x,y]})=>{if(x===x0&&y!==vA)return 'את x מצאתם! עכשיו <b>מציבים</b> את x בביטוי '+M(ex(a,b))+'.';
   const xw=EQ(t)?(180-vB-b)/a:(vB-b)/a;if(Math.abs(x-xw)<1e-9)return EQ(t)?'בניתם משוואה של 180, אבל הזוויות <b>'+NAME[t]+'</b> ← <b>שוות</b>.':'השוויתם, אבל הזוויות <b>צמודות</b> ← מחברים ומשווים ל־180.';
   if(y===x0)return 'כתבתם את x כגודל הזווית. הזווית היא '+M(ex(a,b))+', לא x.';return null;}};
 return withR?reasonQ(q,t):q;}
function genVar(withR){const t=pick(TYPES),[A,B]=sw(pick(PAIRS[t])),u=uAny(),vA=val(u,A[1]),vB=val(u,B[1]),x0=R(6,22);
 const [a1,b1]=mkExpr(vA,x0),[a2,b2]=mkExpr(vB,x0,EQ(t)?a1:0);
 let l2,l3;if(EQ(t)){const big=a1>a2,ca=Math.abs(a1-a2),cb=big?b2-b1:b1-b2;l2=M(`${ex(a1,b1)} = ${ex(a2,b2)}`);l3=M(`${ca}x = ${cb}`)+' ← '+M('x = '+x0);}
 else{l2=M(`${ex(a1,b1)} + ${ex(a2,b2)} = 180`);l3=M(`${a1+a2}x ${b1+b2<0?'−':'+'} ${Math.abs(b1+b2)} = 180`)+' ← '+M(`${a1+a2}x = ${180-b1-b2}`)+' ← '+M('x = '+x0);}
 const q={kind:'שני ביטויים',u,A,B,t,text:`מצאו את x ואת <b style="color:${OR}">הזווית הכתומה</b>.`,
  marks:[{i:A[0],p:A[1],c:OR,t:ex(a1,b1)},{i:B[0],p:B[1],c:BL,t:ex(a2,b2)}],ans:[{label:'x =',col:PU,val:x0},{label:'הזווית הכתומה',col:OR,val:vA}],
  lines:[`הזוויות ${NAME[t]} ← ${EQ(t)?'שוות':'סכומן 180°'}`,l2,l3,`מציבים: ${M(`${a1} · ${x0} ${b1<0?'−':'+'} ${Math.abs(b1)} = ${vA}°`)}`],rule:RULE[t],
  diag:({vals:[x,y]})=>{if(x===x0&&y!==vA)return 'את x מצאתם! עכשיו <b>מציבים</b> אותו בביטוי הכתום '+M(ex(a1,b1))+'.';
   if(y===x0)return 'x הוא לא גודל הזווית. מציבים את x בביטוי '+M(ex(a1,b1))+'.';
   const xw=EQ(t)?(180-b1-b2)/(a1+a2):(b2-b1)/(a1-a2);if(isFinite(xw)&&Math.abs(x-xw)<1e-9)return EQ(t)?'חיברתם ל־180, אבל הזוויות <b>'+NAME[t]+'</b> ← <b>משווים</b> את הביטויים.':'השוויתם, אבל הזוויות <b>צמודות</b> ← מחברים את הביטויים ומשווים ל־180.';return null;}};
 return withR?reasonQ(q,t):q;}
function twoStepPair(){let A,B;do{A=[R(0,1),pick(['TR','TL','BL','BR'])];B=[1-A[0],pick(['TR','TL','BL','BR'])];}
 while(B[1]===A[1]||PAIRS.alt.some(([x,y])=>(x[0]===A[0]&&x[1]===A[1]&&y[1]===B[1])||(y[0]===A[0]&&y[1]===A[1]&&x[1]===B[1])));
 const I=[B[0],A[1]],opp={TR:'BL',BL:'TR',TL:'BR',BR:'TL'},r2=opp[A[1]]===B[1]?'vert':'adj';return {A,B,I,r2};}
function genTwoStep(){const {A,B,I,r2}=twoStepPair(),u=uEasy(),vA=val(u,A[1]),vB=val(u,B[1]);
 return {kind:'שני צעדים',u,A,B,t:'two',text:`<b style="color:${OR}">הזווית הכתומה</b> היא ${M(vA+deg)}. כמה מעלות <b style="color:${BL}">הזווית הכחולה</b>? (אין ביניהן קשר ישיר: חפשו זווית "מתווכת")`,
  marks:[{i:A[0],p:A[1],c:OR,t:vA+deg},{i:B[0],p:B[1],c:BL,t:'?'}],ans:[{label:'הזווית הכחולה',col:BL,val:vB}],I,
  lines:[`צעד 1: הזווית <b style="color:${GR}">הירוקה</b> מתאימה לכתומה ← ${M(vA+deg)}`,`צעד 2: הירוקה והכחולה ${NAME[r2]} ← ${r2==='vert'?M(vB+deg):M('180° − '+vA+'° = '+vB+'°')}`],rule:'אין קשר ישיר? מוצאים זווית מתווכת: קודם מתאימה, ואז קודקודית או צמודה.',
  diag:({vals:[x]})=>x===180-vB?'בדקו את הצעד השני: האם הזוויות שוות או משלימות ל־180°? רמז: חדה = חדה, חדה + קהה = 180°.':null};}
function genParallel(){const t=pick(['corr','alt']),[A,B]=sw(pick(PAIRS[t])),u=uEasy(),vA=val(u,A[1]),par=Math.random()<.5,vB=par?vA:vA+pick([-4,-3,-2,2,3,4]);
 return {kind:'האם הישרים מקבילים?',u,A,B,t,arrows:false,note:'השרטוט אינו מדויק',text:`בשרטוט שני ישרים וחותך. <b style="color:${OR}">זווית א</b> = ${M(vA+deg)}, <b style="color:${BL}">זווית ב</b> = ${M(vB+deg)}. האם הישרים מקבילים?`,
  marks:[{i:A[0],p:A[1],c:OR,t:vA+deg},{i:B[0],p:B[1],c:BL,t:vB+deg}],
  choice:[`כן, כי הזוויות ה${NAME[t]} שוות`,`לא, כי הזוויות ה${NAME[t]} לא שוות`,'כן, כי יש חותך','אי אפשר לדעת'],correct:par?0:1,
  lines:[`הזוויות ${NAME[t]} (${HOW[t]}).`,par?`${M(vA+'° = '+vB+'°')} ← שוות ← הישרים <b>מקבילים</b>.`:`${M(vA+'° ≠ '+vB+'°')} ← לא שוות ← הישרים <b>לא מקבילים</b>.`],
  rule:'זוויות מתאימות או מתחלפות שוות ← הישרים מקבילים. לא שוות ← לא מקבילים.',diag:()=>'משווים את שתי הזוויות: אם הן שוות, הישרים מקבילים.'};}
function genWord(){const t='adj',[A,B]=sw(pick(PAIRS.adj));let x0,lb,ex2,lineEq;
 if(Math.random()<.5){const k=pick([2,3]);x0=180/(k+1);lb=k+'x';ex2=`גדולה <b>פי ${k}</b>`;lineEq=M(`x + ${k}x = 180`)+' ← '+M(`${k+1}x = 180`)+' ← '+M('x = '+x0);}
 else{const d=pick([20,30,40,50,60]);x0=(180-d)/2;lb='x + '+d;ex2=`גדולה ב־${M(d+'°')}`;lineEq=M(`x + x + ${d} = 180`)+' ← '+M(`2x = ${180-d}`)+' ← '+M('x = '+x0);}
 const u=(A[1]==='TR'||A[1]==='BL')?x0:180-x0,vB=180-x0;
 return {kind:'בעיה מילולית',u,A,B,t,text:`<b style="color:${BL}">הזווית הכחולה</b> ${ex2} מ<b style="color:${OR}">הזווית הכתומה</b>. מצאו את שתי הזוויות.`,
  marks:[{i:A[0],p:A[1],c:OR,t:'x'},{i:B[0],p:B[1],c:BL,t:lb}],ans:[{label:'הזווית הכתומה',col:OR,val:x0},{label:'הזווית הכחולה',col:BL,val:vB}],
  lines:['הזוויות צמודות ← סכומן 180°.',lineEq,`הכתומה ${M(x0+deg)}, הכחולה ${M('180 − '+x0+' = '+vB+deg)}`],rule:'"פי" ← כופלים את x. "ב־" ← מוסיפים ל־x. צמודות ← 180°.',
  diag:({vals:[x,y]})=>x===y?'זוויות צמודות לא שוות! הכחולה '+ex2+'.':(x+y!==180?'בדקו: סכום שתי הזוויות חייב להיות 180°.':null)};}
function genVarAll(){const {A,B,I,r2}=twoStepPair(),u=uAny(),vA=val(u,A[1]),vB=val(u,B[1]),x0=R(6,20),eq=vA===vB;
 const [a1,b1]=mkExpr(vA,x0),[a2,b2]=mkExpr(vB,x0,eq?a1:0);
 return {kind:'שני צעדים עם משתנים',u,A,B,t:'two',I,text:`מצאו את x ואת <b style="color:${BL}">הזווית הכחולה</b>. (רמז: זווית מתווכת)`,
  marks:[{i:A[0],p:A[1],c:OR,t:ex(a1,b1)},{i:B[0],p:B[1],c:BL,t:ex(a2,b2)}],ans:[{label:'x =',col:PU,val:x0},{label:'הזווית הכחולה',col:BL,val:vB}],
  lines:[`הזווית <b style="color:${GR}">הירוקה</b> מתאימה לכתומה, והירוקה והכחולה ${NAME[r2]}.`,eq?`ולכן הכתומה והכחולה <b>שוות</b>: ${M(ex(a1,b1)+' = '+ex(a2,b2))}`:`ולכן הכתומה והכחולה <b>משלימות ל־180°</b>: ${M(ex(a1,b1)+' + '+ex(a2,b2)+' = 180')}`,M('x = '+x0),`הכחולה: ${M(`${a2} · ${x0} ${b2<0?'−':'+'} ${Math.abs(b2)} = ${vB}°`)}`],
  rule:'אין קשר ישיר? זווית מתווכת. חדה = חדה, חדה + קהה = 180°.',diag:({vals:[x,y]})=>x===x0&&y!==vB?'את x מצאתם! מציבים בביטוי הכחול '+M(ex(a2,b2))+'.':null};}
/* ===== levels & test ===== */
const LEVELS=[
 {n:1,t:'מזהים זוגות זוויות',d:'F, Z, X, קו ישר',g:()=>Math.random()<.7?genType():genEqOrSum()},
 {n:2,t:'מוצאים זווית',d:'מספרים, ומשתנה אחד',g:()=>Math.random()<.7?genFind():genVar1(false)},
 {n:3,t:'משתנים + נימוק',d:'משוואה, x, ולמה',g:()=>Math.random()<.6?genVar(true):genVar1(true)},
 {n:4,t:'חשיבה ואוריינות',d:'שני צעדים, מקבילים?, מילולי',g:()=>pick([genTwoStep,genParallel,genWord,genVarAll])()}];
const TEST=[[()=>genType('corr'),()=>genType('alt'),genEqOrSum,()=>genType(pick(['vert','adj']))],
 [()=>genFind('corr'),()=>genFind('adj'),()=>genFind(pick(['alt','vert'])),()=>genVar1(false)],
 [()=>genVar(true),()=>genVar(true),()=>genVar1(true),()=>genVar(true)],
 [genTwoStep,genParallel,genWord,genVarAll]];
const WARM=[()=>genFind('vert'),()=>genFind('adj'),()=>genType('vert'),genEqOrSum,()=>genFind('corr'),()=>genType('corr'),()=>genFind('alt'),()=>genType('alt')];
function QDIA(q,hl){const o={arrows:q.arrows,note:q.note};const mk=q.marks.slice();
 if(hl){if(q.t==='two'){const g=geo(q.u);o.pre=`<g class="rv" style="--d:.2s">${sector(g,q.I[0],q.I[1],GR,{op:.9})}${label(g,q.I[0],q.I[1],val(q.u,q.I[1])+deg,GR)}</g>`;}
  else o.hl=shape(geo(q.u),q.t,q.A,q.B);}
 return dia(q.u,mk.map(m=>({...m})),o);}
function allMarks(u,o={}){const out=[];let k=0;[0,1].forEach(i=>['TR','TL','BL','BR'].forEach(p=>{const v=val(u,p);out.push({i,p,c:v<90?OR:BL,t:v+deg,cls:'rv',d:(o.d||1)+k*.22});k++;}));return out;}
function recapSvg(n){const u=65,g=geo(u);
 if(n===0){const T=(x,y,t,c,d)=>`<text class="rv" style="--d:${d}s;font-family:Rubik" x="${x}" y="${y}" font-size="16" font-weight="800" fill="${c}" text-anchor="middle" direction="rtl" stroke="#13233a" stroke-width="5" paint-order="stroke">${t}</text>`;
  return dia(u,[],{drawT:1.2,pre:`<rect class="rv" style="--d:2.6s" x="12" y="${Y0}" width="${W-24}" height="${Y1-Y0}" fill="${GR}" fill-opacity=".10"/>`,
   post:T(340,Y0-10,'ישר 1','#dfe8f5',.3)+T(340,Y1-10,'ישר 2','#dfe8f5',.6)+T(f(g.top[0]-36),30,'חותך',OR,1.8)+`<circle class="rv" style="--d:2.2s" cx="${f(g.P[0])}" cy="${f(g.P[1])}" r="9" fill="none" stroke="${BL}" stroke-width="3"/>`+T(f(g.P[0]+44),Y0+24,'קודקוד',BL,2.2)+T(100,(Y0+Y1)/2+6,'בין הישרים',GR,2.8)});}
 n--;
 if(n===0)return dia(u,allMarks(u),{drawT:.1});
 if(n===1)return dia(u,[{i:0,p:'TR',c:OR,t:'65°',cls:'rv',d:.3},{i:0,p:'TL',c:BL,t:'115°',cls:'rv',d:.8}],{hl:shape(g,'adj',[0,'TR'],[0,'TL'])});
 if(n===2)return dia(u,[{i:0,p:'TR',c:OR,t:'65°',cls:'rv',d:.3},{i:0,p:'BL',c:OR,t:'65°',cls:'rv',d:.9}],{hl:shape(g,'vert',[0,'TR'],[0,'BL'])});
 if(n===3){const tx=f(g.Q[0]-g.P[0]),ty=f(g.Q[1]-g.P[1]);
  return dia(u,[{i:0,p:'TR',c:OR,t:'65°',cls:'rv',d:.3},{i:1,p:'TR',c:OR,t:'65°',cls:'rv',d:3.2}],{hl:shape(g,'corr',[0,'TR'],[1,'TR']),
   post:`<g class="slide" style="--tx:${tx}px;--ty:${ty}px;--d:1.2s">${sector(g,0,'TR','#ffffff',{op:.35,stroke:'#fff'})}</g>`});}
 if(n===4)return dia(u,[{i:0,p:'BR',c:BL,t:'115°',cls:'rv',d:.3},{i:1,p:'TL',c:BL,t:'115°',cls:'rv',d:1}],{hl:shape(g,'alt',[0,'BR'],[1,'TL'])});
 if(n===5)return dia(70,[{i:0,p:'TR',c:OR,t:'3x + 10',cls:'rv',d:.3},{i:1,p:'TR',c:BL,t:'5x − 30',cls:'rv',d:.7}],{hl:shape(geo(70),'corr',[0,'TR'],[1,'TR'])});
 if(n===6)return dia(60,[{i:0,p:'TR',c:OR,t:'2x',cls:'rv',d:.3},{i:0,p:'TL',c:BL,t:'4x',cls:'rv',d:.7}],{hl:shape(geo(60),'adj',[0,'TR'],[0,'TL'])});
 return dia(u,[{i:0,p:'TR',c:OR,t:'65°',cls:'rv',d:.3},{i:0,p:'TL',c:BL,t:'?',cls:'rv',d:.6}],{});}
const SAYS=[
 [`שני <b>ישרים מקבילים</b> (סימן ${M('∥')}, החצים ››) לא נפגשים אף פעם.`,`<b style="color:${OR}">חותך</b> הוא ישר שחוצה את שניהם. כל נקודת חיתוך היא <b style="color:${BL}">קודקוד</b> (צומת).`],
 [`חותך חוצה שני ישרים מקבילים ← נוצרות <b>8 זוויות</b>.`,`אבל יש רק <b>שני גדלים</b>: <b style="color:${OR}">חדה</b> ו<b style="color:${BL}">קהה</b>!`],
 [`<b>צמודות</b>: באותה צומת, יש להן צלע משותפת, ויחד הן <b style="color:${GR}">קו ישר</b>.`,M('65° + 115° = 180°')],
 [`<b>קודקודיות</b>: באותה צומת, אחת <b>מול</b> השנייה (צורת X).`,`הן שוות: ${M('65° = 65°')}`],
 [`<b>מתאימות</b>: באותו מקום בשתי הצמתים (צורת <b style="color:${GR}">F</b>).`,`מזיזים את הזווית לאורך החותך, והיא נוחתת בדיוק על השנייה ← <b>שוות</b>.`],
 [`<b>מתחלפות</b>: בין הישרים, משני צדי החותך (צורת <b style="color:${GR}">Z</b>).`,`הן שוות: ${M('115° = 115°')}`],
 [`מתאימות ← שוות ← ${M('3x + 10 = 5x − 30')}`,`${M('40 = 2x')} ← ${M('x = 20')}`,`הזווית: ${M('3 · 20 + 10 = 70°')} · בדיקה: ${M('5 · 20 − 30 = 70')} <span class="v">✓</span>`],
 [`צמודות ← סכומן 180° ← ${M('2x + 4x = 180')}`,`${M('6x = 180')} ← ${M('x = 30')}`,`הזוויות: ${M('60°')} ו־${M('120°')} <span class="v">✓</span>`],
 [`מישהו כתב: <b style="color:${BL}">?</b> = ${M('65°')} <span class="x">✗</span>`,`אבל הן <b>צמודות</b>, לא שוות!`,`${M('180° − 65° = 115°')} <span class="v">✓</span>`]];
const DEFS={2:'<b>הגדרה:</b> זוויות צמודות הן זוויות עם קודקוד משותף וצלע משותפת, ששתי הצלעות האחרות שלהן יוצרות ישר.',3:'<b>הגדרה:</b> זוויות קודקודיות הן זוויות עם קודקוד משותף, שהצלעות של אחת הן ההמשכים של הצלעות של השנייה.',4:'<b>הגדרה:</b> זוויות מתאימות הן זוויות בשני קודקודים שונים, באותו צד של החותך ובאותו צד של כל ישר.',5:'<b>הגדרה:</b> זוויות מתחלפות הן זוויות בשני קודקודים שונים, בין הישרים, משני צדי החותך.',1:'<b>זווית חדה</b> קטנה מ־90°. <b>זווית קהה</b> גדולה מ־90° וקטנה מ־180°.'};
const TITLES=['המושגים','8 זוויות, רק 2 גדלים','זוויות צמודות','זוויות קודקודיות','זוויות מתאימות','זוויות מתחלפות','עם משתנים: שוות','עם משתנים: צמודות','הטעות הנפוצה'];
const WHATS=['ישרים מקבילים, חותך, קודקוד, <b>בין הישרים</b> (פנים) ו<b>מחוץ לישרים</b> (חוץ). אלה המילים של כל הנושא.','<b>הסוד:</b> חדה = חדה, קהה = קהה, חדה + קהה = 180°.','צמודות <b>משלימות ל־180°</b>. הן לא שוות!','קודקודיות <b>שוות</b>.','מתאימות בין ישרים מקבילים <b>שוות</b>.','מתחלפות בין ישרים מקבילים <b>שוות</b>.','זוויות שוות ← <b>משווים</b> את הביטויים, מוצאים x, <b>ומציבים</b>.','צמודות ← <b>מחברים</b> ומשווים ל־180, מוצאים x, ומציבים.','תמיד שואלים: <b>שוות או 180°?</b> ובודקים: חדה וקהה?'];
const DL=n=>n===0?3:n===1?3.2:n===4?3.6:1.4;
const RECAP=TITLES.map((h,n)=>({h,svg:()=>recapSvg(n),says:SAYS[n],def:DEFS[n],what:WHATS[n],d:DL(n)}));

/* בדיקת הבנה אחרי הסבר (לכרטיסים בלי שאלה משויכת) */
RECAP[0].chk=[()=>genType(pick(["corr","alt","vert","adj"]))];RECAP[7].chk=[genVar,genVar1];RECAP[8].chk=[genEqOrSum];
