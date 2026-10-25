/*META {"id":"proof","title":"מעבדת ההוכחה: חפיפת משולשים","icon":"🧩"} */
const LAB={hide:true,tip:'🖐 עובדים לפי הסדר: מה נתון? ← מה צריך להוכיח? ← השורה הבאה (שוב ושוב) ← איזה משפט חפיפה? במצב "הכיתה בוחרת" התלמידים בוחרים את הנימוק.',refresh:()=>{table();}};
/* ---------- בנק תרגילים ----------
 row: c=טענה, r=נימוק (טקסט), k=סוג נימוק לבחירה, m=סימון בשרטוט {s:[[P,Q],[P,Q]]|a:[[P,V,Q],[P,V,Q]], n, col, right}, cong=[T1,T2] לשורת חפיפה, parts=[i,j,k] */
const G='נתון',SH='צלע משותפת',VA='זוויות קודקודיות',PA='זוויות מתחלפות בין ישרים מקבילים',CS='צלעות מתאימות במשולשים חופפים',CA='זוויות מתאימות במשולשים חופפים',MID='אמצע קטע',BIS='חוצה זווית',ALT='גובה (מאונך)';
const EX=[
 {lvl:1,name:'צלע משותפת (צ.צ.צ)',P:{A:[380,60],B:[200,230],C:[380,450],D:[560,230]},S:['AB','BC','CD','DA','AC'],
  given:'AB = AD,  BC = DC',prove:'△ABC ≅ △ADC',then:'∢ABC = ∢ADC',
  rows:[{c:'AB = AD',r:G,k:G,m:{s:['AB','AD'],n:1,col:'green'},g:1},{c:'BC = DC',r:G,k:G,m:{s:['BC','DC'],n:2,col:'purple'},g:1},
   {c:'AC = AC',r:SH,k:SH,m:{s:['AC'],n:0,col:'orange'},h:'הצלע AC שייכת לשני המשולשים.'},{c:'△ABC ≅ △ADC',r:'צ.צ.צ',k:'צ.צ.צ',cong:['ABC','ADC'],parts:[0,1,2]},
   {c:'∢ABC = ∢ADC',r:CA,k:CA,m:{a:['ABC','ADC'],n:1,col:'teal'},h:'המשולשים חופפים, ולכן כל החלקים המתאימים שווים.'}]},
 {lvl:1,name:'זוויות קודקודיות (צ.ז.צ)',P:{A:[150,100],B:[150,400],C:[380,250],D:[610,400],E:[610,100]},S:['AD','BE','AB','DE'],
  given:'AC = DC,  BC = EC',prove:'△ABC ≅ △DEC',then:'AB = DE',
  rows:[{c:'AC = DC',r:G,k:G,m:{s:['AC','DC'],n:1,col:'green'},g:1},{c:'∢ACB = ∢DCE',r:VA,k:VA,m:{a:['ACB','DCE'],n:1,col:'teal'},h:'שני ישרים נחתכים ב־C: הזוויות שמול זו את זו שוות.'},
   {c:'BC = EC',r:G,k:G,m:{s:['BC','EC'],n:2,col:'purple'},g:1},{c:'△ABC ≅ △DEC',r:'צ.ז.צ',k:'צ.ז.צ',cong:['ABC','DEC'],parts:[0,1,2]},
   {c:'AB = DE',r:CS,k:CS,m:{s:['AB','DE'],n:3,col:'pink'},h:'המשולשים חופפים, ולכן הצלעות המתאימות שוות.'}]},
 {lvl:2,name:'אמצע קטע (צ.ז.צ)',P:{A:[160,110],M:[380,260],B:[600,410],C:[160,410],D:[600,110]},S:['AB','CD','AC','BD'],
  given:'M אמצע AB,  M אמצע CD',prove:'△AMC ≅ △BMD',then:'AC = BD',
  rows:[{c:'AM = BM',r:'M אמצע AB',k:MID,m:{s:['AM','BM'],n:1,col:'green'},g:1,h:'"אמצע" אומר: שני החלקים שווים.'},{c:'∢AMC = ∢BMD',r:VA,k:VA,m:{a:['AMC','BMD'],n:1,col:'teal'},h:'הקטעים נחתכים ב־M.'},
   {c:'CM = DM',r:'M אמצע CD',k:MID,m:{s:['CM','DM'],n:2,col:'purple'},g:1,h:'"אמצע" אומר: שני החלקים שווים.'},{c:'△AMC ≅ △BMD',r:'צ.ז.צ',k:'צ.ז.צ',cong:['AMC','BMD'],parts:[0,1,2]},
   {c:'AC = BD',r:CS,k:CS,m:{s:['AC','BD'],n:3,col:'pink'}}]},
 {lvl:2,name:'מקבילית עם אלכסון (צ.ז.צ)',P:{A:[160,400],B:[300,100],C:[600,110],D:[460,410]},S:['AB','BC','CD','DA','BD'],
  given:'AB = CD,  ∢ABD = ∢CDB',prove:'△ABD ≅ △CDB',then:'AD = CB',
  rows:[{c:'AB = CD',r:G,k:G,m:{s:['AB','CD'],n:1,col:'green'},g:1},{c:'∢ABD = ∢CDB',r:G,k:G,m:{a:['ABD','CDB'],n:1,col:'teal'},g:1},
   {c:'BD = DB',r:SH,k:SH,m:{s:['BD'],n:0,col:'orange'},h:'האלכסון BD שייך לשני המשולשים.'},{c:'△ABD ≅ △CDB',r:'צ.ז.צ',k:'צ.ז.צ',cong:['ABD','CDB'],parts:[0,1,2]},
   {c:'AD = CB',r:CS,k:CS,m:{s:['AD','CB'],n:2,col:'purple'}}]},
 {lvl:3,name:'ישרים מקבילים (ז.צ.ז)',P:{A:[140,130],B:[330,130],C:[380,270],D:[430,410],E:[620,410]},S:['AB','ED','AE','BD'],
  given:'AB ∥ ED,  C אמצע BD',prove:'△ABC ≅ △EDC',then:'AB = ED',
  rows:[{c:'∢ABC = ∢EDC',r:'זוויות מתחלפות (AB ∥ ED)',k:PA,m:{a:['ABC','EDC'],n:1,col:'teal'},g:1,h:'"מקבילים" אומר: זוויות מתחלפות שוות (צורת Z).'},
   {c:'BC = DC',r:'C אמצע BD',k:MID,m:{s:['BC','DC'],n:1,col:'green'},g:1},{c:'∢ACB = ∢ECD',r:VA,k:VA,m:{a:['ACB','ECD'],n:2,col:'orange'},h:'AE ו־BD נחתכים ב־C.'},
   {c:'△ABC ≅ △EDC',r:'ז.צ.ז',k:'ז.צ.ז',cong:['ABC','EDC'],parts:[0,1,2]},{c:'AB = ED',r:CS,k:CS,m:{s:['AB','ED'],n:2,col:'purple'}}]},
 {lvl:3,name:'חוצה זווית וגובה (ז.צ.ז)',P:{A:[380,70],B:[170,430],C:[590,430],D:[380,430]},S:['AB','AC','BC','AD'],
  given:'AD חוצה את ∢BAC,  AD ⊥ BC',prove:'△ABD ≅ △ACD',then:'AB = AC',
  rows:[{c:'∢BAD = ∢CAD',r:'AD חוצה זווית',k:BIS,m:{a:['BAD','CAD'],n:1,col:'teal'},g:1,h:'"חוצה זווית" אומר: שתי הזוויות שוות.'},
   {c:'AD = AD',r:SH,k:SH,m:{s:['AD'],n:0,col:'orange'}},{c:'∢ADB = ∢ADC = 90°',r:'AD ⊥ BC',k:ALT,m:{a:['ADB','ADC'],right:1,col:'purple'},g:1,h:'"מאונך" אומר: זווית ישרה, 90°.'},
   {c:'△ABD ≅ △ACD',r:'ז.צ.ז',k:'ז.צ.ז',cong:['ABD','ACD'],parts:[0,1,2]},{c:'AB = AC',r:CS,k:CS,m:{s:['AB','AC'],n:1,col:'green'}}]},
 {lvl:4,name:'שווה־שוקיים ותיכון (צ.צ.צ)',P:{A:[380,70],B:[170,430],C:[590,430],D:[380,430]},S:['AB','AC','BC','AD'],
  given:'AB = AC,  D אמצע BC',prove:'△ABD ≅ △ACD',then:'∢BAD = ∢CAD',
  rows:[{c:'AB = AC',r:G,k:G,m:{s:['AB','AC'],n:1,col:'green'},g:1},{c:'BD = CD',r:'D אמצע BC',k:MID,m:{s:['BD','CD'],n:2,col:'purple'},g:1},
   {c:'AD = AD',r:SH,k:SH,m:{s:['AD'],n:0,col:'orange'}},{c:'△ABD ≅ △ACD',r:'צ.צ.צ',k:'צ.צ.צ',cong:['ABD','ACD'],parts:[0,1,2]},
   {c:'∢BAD = ∢CAD',r:CA,k:CA,m:{a:['BAD','CAD'],n:1,col:'teal'},h:'ולכן AD גם חוצה את זווית הראש.'}]},
 {lvl:4,name:'גובה בשווה־שוקיים (צ.צ.ז)',P:{A:[380,70],B:[170,430],C:[590,430],D:[380,430]},S:['AB','AC','BC','AD'],
  given:'AB = AC,  AD ⊥ BC',prove:'△ABD ≅ △ACD',then:'BD = CD',
  rows:[{c:'AB = AC',r:G,k:G,m:{s:['AB','AC'],n:1,col:'green'},g:1},{c:'AD = AD',r:SH,k:SH,m:{s:['AD'],n:0,col:'orange'}},
   {c:'∢ADB = ∢ADC = 90°',r:'AD ⊥ BC',k:ALT,m:{a:['ADB','ADC'],right:1,col:'purple'},g:1,h:'"מאונך" אומר: זווית ישרה, 90°.'},
   {c:'△ABD ≅ △ACD',r:'צ.צ.ז',k:'צ.צ.ז',cong:['ABD','ACD'],parts:[0,1,2],h:'הזווית הישרה נמצאת מול הצלע הגדולה (היתר AB).'},{c:'BD = CD',r:CS,k:CS,m:{s:['BD','CD'],n:2,col:'pink'},h:'ולכן הגובה AD הוא גם תיכון.'}]},
 {lvl:4,name:'דלתון: הוכחה בשני שלבים',P:{A:[380,60],B:[200,230],C:[380,450],D:[560,230],E:[380,230]},S:['AB','BC','CD','DA','AC','BD'],
  given:'AB = AD,  CB = CD',prove:'△ABC ≅ △ADC',then:'BE = DE',
  rows:[{c:'AB = AD',r:G,k:G,m:{s:['AB','AD'],n:1,col:'green'},g:1},{c:'CB = CD',r:G,k:G,m:{s:['CB','CD'],n:2,col:'purple'},g:1},
   {c:'AC = AC',r:SH,k:SH,m:{s:['AC'],n:0,col:'orange'}},{c:'△ABC ≅ △ADC',r:'צ.צ.צ',k:'צ.צ.צ',cong:['ABC','ADC'],parts:[0,1,2]},
   {c:'∢BAE = ∢DAE',r:CA,k:CA,m:{a:['BAE','DAE'],n:1,col:'teal'},h:'שלב 1 נגמר: מהחפיפה קיבלנו זוויות שוות.'},{c:'AE = AE',r:SH,k:SH,m:{s:['AE'],n:0,col:'orange'},h:'שלב 2: משולשים קטנים ABE ו־ADE.'},
   {c:'△ABE ≅ △ADE',r:'צ.ז.צ',k:'צ.ז.צ',cong:['ABE','ADE'],parts:[0,4,5]},{c:'BE = DE',r:CS,k:CS,m:{s:['BE','DE'],n:3,col:'pink'},h:'ולכן האלכסון AC חוצה את האלכסון BD.'}]}];
const POOL=[G,SH,VA,PA,MID,BIS,ALT,CS,CA];
let ex=0,step=0,classMode=false,shownG=false,shownT=false,pick2=null;
const E=()=>EX[ex],pt=k=>{const [x,y]=E().P[k];return {x,y};};
/* ---------- שרטוט ---------- */
function segMark(a,b,n,col){const p=pt(a),q=pt(b),mx=(p.x+q.x)/2,my=(p.y+q.y)/2,dx=q.x-p.x,dy=q.y-p.y,L=Math.hypot(dx,dy),ux=dx/L,uy=dy/L;let s=`<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" stroke="${COL[col]}" stroke-width="7" stroke-linecap="round" opacity=".85"/>`;
 for(let i=0;i<n;i++){const o=(i-(n-1)/2)*9,cx=mx+ux*o,cy=my+uy*o;s+=`<line x1="${cx-uy*12}" y1="${cy+ux*12}" x2="${cx+uy*12}" y2="${cy-ux*12}" stroke="${COL[col]}" stroke-width="3.5"/>`;}return s;}
function angMark(p,v,q,n,col,right){const P=pt(p),V=pt(v),Q=pt(q),a1=Math.atan2(P.y-V.y,P.x-V.x),a2=Math.atan2(Q.y-V.y,Q.x-V.x);
 if(right){const r=22,u={x:Math.cos(a1),y:Math.sin(a1)},w={x:Math.cos(a2),y:Math.sin(a2)};return `<path d="M${V.x+u.x*r},${V.y+u.y*r}L${V.x+(u.x+w.x)*r},${V.y+(u.y+w.y)*r}L${V.x+w.x*r},${V.y+w.y*r}" fill="${COL[col]}" fill-opacity=".25" stroke="${COL[col]}" stroke-width="3"/>`;}
 let d=a2-a1;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;let s='';
 for(let i=0;i<Math.max(1,n);i++){const r=30+i*8,sx=V.x+r*Math.cos(a1),sy=V.y+r*Math.sin(a1),ex2=V.x+r*Math.cos(a1+d),ey=V.y+r*Math.sin(a1+d);s+=`<path d="M${sx},${sy}A${r},${r} 0 0 ${d>0?1:0} ${ex2},${ey}" fill="none" stroke="${COL[col]}" stroke-width="4"/>`;}
 const r0=30,s0={x:V.x+r0*Math.cos(a1),y:V.y+r0*Math.sin(a1)},e0={x:V.x+r0*Math.cos(a1+d),y:V.y+r0*Math.sin(a1+d)};
 return `<path d="M${V.x},${V.y}L${s0.x},${s0.y}A${r0},${r0} 0 0 ${d>0?1:0} ${e0.x},${e0.y}Z" fill="${COL[col]}" fill-opacity=".22"/>`+s;}
function markSVG(m){if(m.s)return m.s.map(s=>segMark(s[0],s[1],m.n,m.col)).join('');return m.a.map(a=>angMark(a[0],a[1],a[2],m.n||1,m.col,m.right)).join('');}
function triPath(t){return t.split('').map((k,i)=>{const p=pt(k);return (i?'L':'M')+p.x+','+p.y;}).join('')+'Z';}
function draw(){const e=E();let s='';
 if(shownT){const c=e.rows.find(r=>r.cong).cong;s+=`<path d="${triPath(c[0])}" fill="${COL.teal}" fill-opacity=".14"/><path d="${triPath(c[1])}" fill="${COL.pink}" fill-opacity=".14"/>`;}
 e.S.forEach(sg=>{const p=pt(sg[0]),q=pt(sg[1]);s+=`<line x1="${p.x}" y1="${p.y}" x2="${q.x}" y2="${q.y}" stroke="${COL.ink}" stroke-width="3.5" stroke-linecap="round"/>`;});
 e.rows.forEach((r,i)=>{if(r.m&&((shownG&&r.g)||i<step))s+=markSVG(r.m);});
 s+='<g id="hl"></g><g id="ani"></g>';
 const cx=Object.values(e.P).reduce((a,p)=>a+p[0],0)/Object.keys(e.P).length,cy=Object.values(e.P).reduce((a,p)=>a+p[1],0)/Object.keys(e.P).length;
 Object.keys(e.P).forEach(k=>{const p=pt(k);let dx=p.x-cx,dy=p.y-cy,L=Math.hypot(dx,dy);if(L<45){dx=.8;dy=-.6;L=1;}s+=`<circle cx="${p.x}" cy="${p.y}" r="5" fill="${COL.ink}"/><text x="${p.x+dx/L*28}" y="${p.y+dy/L*28+9}" text-anchor="middle" font-size="27" font-weight="800" fill="${COL.ink}">${k}</text>`;});
 $('#sv').innerHTML=s;}
/* ---------- טבלה ---------- */
const reasonHTML=r=>r.replace(/(∢?[A-Z]{1,3} = ∢?[A-Z]{1,3}|∢[A-Z]{3}|[A-Z]{1,3}(?: ∥ [A-Z]{2}| ⊥ [A-Z]{2})?)/g,m=>M(m));
function W(h){card('walk',h);const w=$('#walk'),ref=$('#corr')||$('#tbl');if(ref)$('#side').insertBefore(w,ref);}
function table(){const e=E(),H=hidCls();let t=`<div class="big" style="font-size:19px">${'★'.repeat(e.lvl)} ${e.name}</div>`;
 t+=`<div class="tip"><b>נתון:</b> ${reasonHTML(e.given)}<br><b>צריך להוכיח:</b> ${M(e.prove)}${e.then?` ומכאן ${M(e.then)}`:''}</div>`;
 t+=`<div class="tip" style="margin:4px 0">💬 בכל שורה: <b>אני יודע/ת ש…</b> (טענה) <b>כי…</b> (נימוק)</div>`;
 t+='<table style="width:100%;border-collapse:collapse;font-size:19px"><tr style="background:#eef2ff"><th style="padding:6px;border:1px solid #cbd5e1;width:8%">#</th><th style="padding:6px;border:1px solid #cbd5e1">טענה</th><th style="padding:6px;border:1px solid #cbd5e1">נימוק</th></tr>';
 e.rows.forEach((r,i)=>{if(i>=step&&!(i===step&&pick2!==null))return;const col=r.m?COL[r.m.col]:COL.ink,cg=r.cong?'background:#fef9c3;font-weight:800':'';
  const rs=i===step?'<span class="tip">בחרו נימוק…</span>':`<span class="${classMode?'':H}">${reasonHTML(r.r)}</span>`;
  t+=`<tr style="${cg}"><td style="padding:6px;border:1px solid #cbd5e1;text-align:center">${i+1}</td><td style="padding:6px;border:1px solid #cbd5e1;color:${col};font-weight:800">${M(r.c)}</td><td style="padding:6px;border:1px solid #cbd5e1">${rs}</td></tr>`;});
 t+='</table>';
 if(step>=e.rows.length)t+=`<div class="okbox">🏁 <b>סיימנו את ההוכחה!</b> ${M(e.then||e.prove)}</div>`;
 if(H&&!classMode&&step)t+=`<button class="noprint" id="bReveal" style="margin-top:8px">👀 גלו את הנימוקים</button>`;
 card('tbl',t);if($('#bReveal'))$('#bReveal').onclick=()=>{ST.revealed=true;table();};
 if(pick2!==null)choices();}
function flash(r){const h=$('#hl');if(!h||!r.m)return;h.innerHTML=markSVG(r.m);h.style.transition='none';h.style.opacity=1;let k=0;const iv=setInterval(()=>{h.style.opacity=k%2?1:.15;if(++k>5){clearInterval(iv);h.style.opacity=1;}},260);}
function next(){const e=E();if(step>=e.rows.length){W('<div class="okbox">🏁 ההוכחה הושלמה. בחרו תרגיל חדש בבנק.</div>');return;}
 const r=e.rows[step];if(!shownG){shownG=true;}
 if(classMode){pick2=step;table();return;}
 accept(r);}
function accept(r){step++;pick2=null;draw();table();flash(r);if(r.cong)overlay(r.cong);
 W(r.cong?`<div class="big">🔑 ${M(r.c)}</div><div class="tip">לפי משפט <b>${r.r}</b>. לחצו "איזה משפט חפיפה?" לראות למה.</div>`:`<div class="big">✅ ${M(r.c)}</div><div class="tip">כי ${reasonHTML(r.r)}.${r.h?' '+reasonHTML(r.h):''}</div>`);}
function choices(){const e=E(),r=e.rows[pick2];let opts;
 if(r.cong)opts=['צ.ז.צ','ז.צ.ז','צ.צ.צ','צ.צ.ז'];else{const d=POOL.filter(x=>x!==r.k&&!(r.g&&x===G));opts=[r.k];while(opts.length<3){const x=pick(d);if(!opts.includes(x))opts.push(x);}opts.sort(()=>Math.random()-.5);}
 W(`<div class="big">🙋 שורה ${pick2+1}: ${M(r.c)}</div><div class="tip">מה הנימוק?</div><div id="opts">${opts.map(o=>`<button class="bigb" style="background:#334155" data-o="${o}">${o}</button>`).join('')}</div><div id="fb"></div>`);
 $$('#opts [data-o]').forEach(b=>b.onclick=()=>{if(b.dataset.o===r.k){accept(r);}else{b.style.background=COL.red;$('#fb').innerHTML=`<div class="badbox">💡 לא בדיוק. ${r.cong?'בדקו בטבלה: אילו חלקים כבר מצאנו? צלע = צ, זווית = ז, לפי הסדר.':r.h?reasonHTML(r.h):r.k===G?'בדקו שוב מה כתוב בנתונים.':'הסתכלו על החלק המהבהב בשרטוט.'}</div>`;flash(r);}});}
/* ---------- אנימציה: משולש מתלבש על משולש ---------- */
function overlay(c){const a=$('#ani'),T1=c[0].split('').map(pt),T2=c[1].split('').map(pt);ST.busy=true;
 const t0=performance.now(),ms=1800,mk=(P)=>'M'+P.map(p=>p.x+','+p.y).join('L')+'Z';
 a.innerHTML=`<path id="ov" d="${mk(T1)}" fill="${COL.teal}" fill-opacity=".45" stroke="${COL.teal}" stroke-width="4"/>`+c[0].split('').map((k,i)=>`<text id="ol${i}" font-size="22" font-weight="800" fill="${COL.teal}" text-anchor="middle">${k}</text>`).join('');
 const st=now=>{const k=Math.min(1,(now-t0)/ms),e2=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2,P=T1.map((p,i)=>({x:p.x+(T2[i].x-p.x)*e2,y:p.y+(T2[i].y-p.y)*e2}));
  $('#ov').setAttribute('d',mk(P));P.forEach((p,i)=>{const t=$('#ol'+i);t.setAttribute('x',p.x);t.setAttribute('y',p.y-12);});
  if(k<1)requestAnimationFrame(st);else{ST.busy=false;$('#ov').setAttribute('fill',COL.pink);setTimeout(()=>{if($('#ani'))$('#ani').innerHTML='';},1500);}};requestAnimationFrame(st);
 const corr=c[0].split('').map((k,i)=>`${C(k,'teal')}↔${C(c[1][i],'pink')}`).join(' · ');
 card('corr',`<div class="tip"><b>קודקודים מתאימים:</b> ${M(corr)}</div>`);$('#side').insertBefore($('#corr'),$('#tbl'));}
/* ---------- כפתורים ---------- */
function given(){shownG=true;draw();table();const e=E();
 W(`<div class="big">👀 מה נתון?</div><div class="tip">${reasonHTML(e.given)}</div><div class="tip">כל נתון סומן בשרטוט בצבע: אותו צבע ואותו מספר קווים = שווים.</div>`);
 const h=$('#hl');h.innerHTML=e.rows.filter(r=>r.g&&r.m).map(r=>markSVG(r.m)).join('');}
function target(){shownT=true;draw();const c=E().rows.find(r=>r.cong).cong;overlay(c);
 W(`<div class="big">🎯 צריך להוכיח: ${M(E().prove)}</div><div class="tip">המשולש ${C(M('△'+c[0]),'teal')} "מתלבש" על ${C(M('△'+c[1]),'pink')}. הסדר של האותיות אומר מי מתאים למי.</div>`);}
function theorem(){const e=E(),cg=e.rows.filter(x=>x.cong),done=cg.filter(x=>e.rows.indexOf(x)<step),R=done.length?done[done.length-1]:cg[0];
 const ps=R.parts.map(j=>e.rows[j]),code=ps.map(p=>p.m&&p.m.a?'ז':'צ');
 const desc={'צ.ז.צ':'שתי צלעות והזווית <b>שביניהן</b>','ז.צ.ז':'שתי זוויות והצלע <b>שביניהן</b>','צ.צ.צ':'שלוש צלעות','צ.צ.ז':'שתי צלעות והזווית שמול <b>הגדולה</b> מביניהן'}[R.r];
 W(`<div class="big">🔑 משפט החפיפה: <span style="font-size:30px">${R.r}</span></div><div class="tip">${desc}.</div>
 <div style="display:flex;gap:8px;margin:8px 0;flex-wrap:wrap">${ps.map((p,j)=>`<div style="flex:1;min-width:110px;border:3px solid ${COL[p.m.col]};border-radius:12px;padding:6px 4px;text-align:center;font-size:13px;overflow:hidden"><div style="font-size:26px;font-weight:800;color:${COL[p.m.col]}">${code[j]}</div>${M(p.c)}</div>`).join('')}</div>
 ${{'צ.ז.צ':'<div class="badbox">⚠️ <b>הטעות הנפוצה:</b> הזווית חייבת להיות <b>בין</b> שתי הצלעות. אם היא לא ביניהן, זה לא צ.ז.צ (בודקים צ.צ.ז).</div>','ז.צ.ז':'<div class="badbox">⚠️ <b>הטעות הנפוצה:</b> הצלע חייבת להיות <b>בין</b> שתי הזוויות.</div>','צ.צ.ז':'<div class="badbox">⚠️ <b>שימו לב:</b> בצ.צ.ז הזווית חייבת להיות <b>מול הצלע הגדולה</b> מבין השתיים. כאן הזווית הישרה מול היתר '+M('AB')+'.</div>','צ.צ.צ':'<div class="tip">💡 בצ.צ.צ לא צריך אף זווית.</div>'}[R.r]}`);
 const h=$('#hl');h.innerHTML=ps.map(p=>markSVG(p.m)).join('');h.style.opacity=1;}
function dict(){W(`<div class="big">📖 מילון מילים: מה כתוב ← מה מסמנים</div><table style="width:100%;border-collapse:collapse;font-size:18px">${[
 ['"אמצע"','שני חלקים <b>שווים</b> (קו אחד על כל חצי)'],['"חוצה זווית"','שתי זוויות <b>שוות</b>'],['"גובה" / "מאונך" '+M('⊥'),'זווית <b>ישרה</b> '+M('90°')],
 ['"מקבילים" '+M('∥'),'זוויות <b>מתחלפות</b> שוות (צורת Z)'],['שני ישרים נחתכים','זוויות <b>קודקודיות</b> שוות (צורת X)'],['צלע ששייכת לשני המשולשים','<b>צלע משותפת</b>'],['"שווה־שוקיים"','שתי <b>שוקיים</b> שוות'],['4 משפטי החפיפה','<b>צ.ז.צ</b> · <b>ז.צ.ז</b> · <b>צ.צ.צ</b> · <b>צ.צ.ז</b> (הזווית מול הצלע הגדולה)']
 ].map(([a,b])=>`<tr><td style="padding:5px;border:1px solid #cbd5e1;font-weight:800">${a}</td><td style="padding:5px;border:1px solid #cbd5e1">${b}</td></tr>`).join('')}</table>`);}
function load(i){ex=i;step=0;shownG=false;shownT=false;pick2=null;ST.revealed=false;['walk','corr'].forEach(id=>{const e=$('#'+id);if(e)e.remove();});draw();table();bank();}
function bank(){card('bank','<div class="big" style="font-size:19px">📚 בנק תרגילים</div>'+EX.map((e,i)=>`<button class="lt noprint" data-x="${i}" style="display:block;width:100%;text-align:start;margin:4px 0;font-size:17px${i===ex?';outline:3px solid #f5b301':''}">${'★'.repeat(e.lvl)} ${i+1}. ${e.name}</button>`).join(''));
 $$('[data-x]').forEach(b=>b.onclick=()=>{if(!ST.busy)load(+b.dataset.x);});}
function challenge(){const pool=EX.map((e,i)=>i).filter(i=>EX[i].lvl>=2&&i!==ex);classMode=true;$('#bM').innerHTML='🙋 הכיתה בוחרת';$('#bM').classList.add('on');load(pick(pool));given();
 W('<div class="big">🎯 אתגר לכיתה</div><div class="tip">הכיתה בונה את ההוכחה לבד: לוחצים "השורה הבאה", והתלמידים בוחרים את הנימוק. הטבלה בודקת.</div>');}
function start(){svgSize(760,500);
 document.head.insertAdjacentHTML('beforeend','<style>.bigb{display:block;width:100%;font-size:20px;font-weight:800;padding:12px 14px;margin:6px 0;border-radius:14px;text-align:start;color:#fff}#acts .bigb:nth-child(1){background:#0f766e}#acts .bigb:nth-child(2){background:#db2777}#acts .bigb:nth-child(3){background:#2563eb}#acts .bigb:nth-child(4){background:#b45309}#acts .bigb:nth-child(5){background:#7c3aed}#acts .bigb:nth-child(6){background:#ea580c}</style>');
 tool('bM','👩‍🏫 מצב מורה',b=>{classMode=!classMode;b.innerHTML=classMode?'🙋 הכיתה בוחרת':'👩‍🏫 מצב מורה';b.classList.toggle('on',classMode);pick2=null;table();},{lt:1});
 tool('bR','🔁 מהתחלה',()=>load(ex));
 card('acts','<div class="noprint">'+[['aG','👀 מה נתון?'],['aT','🎯 מה צריך להוכיח?'],['aN','➕ השורה הבאה'],['aK','🔑 איזה משפט חפיפה?'],['aD','📖 מילון מילים'],['aC','🎯 אתגר לכיתה']].map(([i,t])=>`<button class="bigb" id="${i}">${t}</button>`).join('')+'</div>');
 const F={aG:given,aT:target,aN:next,aK:theorem,aD:dict,aC:challenge};Object.entries(F).forEach(([i,fn])=>$('#'+i).onclick=()=>{if(!ST.busy)fn();});
 card('tbl','');bank();load(0);}
