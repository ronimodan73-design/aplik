/*META {"id":"h8_ratio_type","title":"הרחבה או חלוקה ביחס? · ערכה: רוני מודן","short":"הרחבה/חלוקה","topic":"יחס: הרחבה או חלוקה ביחס","glyph":"a:b","color":"#5ec8ff"} */
const APP={key:'h8rtype',topic:'יחס: הרחבה או חלוקה ביחס',sub:'יחס ואחוזים, אותו רעיון: שלם · שבר. קודם מזהים: נתון צד אחד (הרחבה) או נתון הסה״כ (חלוקה)? אחר כך טבלה אחת קבועה: יחס ← באמת ← פי כמה.'};
document.head.insertAdjacentHTML('beforeend',`<style>
table.at{border-collapse:separate;border-spacing:0;font-family:Rubik;font-weight:700;margin:6px auto;direction:rtl}
.at th,.at td{border:2px solid var(--line);padding:6px 12px;text-align:center;font-size:22px;min-width:70px;height:48px}
.at th{background:var(--chip);font-size:17px}.at td.lab{border:none;font-size:14px;color:var(--muted);min-width:0;font-weight:500}.at th.lab{border:none;background:none}
.at .giv{background:#ffb02040;color:#ffd27a}.at .anc{box-shadow:inset 0 0 0 5px var(--ok)}.at .calc{color:var(--ok)}.at .qm{color:var(--muted)}
.at .vv{direction:ltr;unicode-bidi:isolate;display:inline-block;white-space:nowrap}
.tbw{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:260px}.tbw .say{text-align:center;max-width:340px}
.fac{margin-top:6px;font:900 18px Rubik;color:#ff6b6b;border:2px solid #ff6b6b;border-radius:999px;padding:2px 14px}
mark.sig{background:#ffd27a33;color:inherit;border-bottom:3px solid #ffd27a;border-radius:4px;padding:0 3px}
.sq{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;align-items:flex-end}
.sq .c{width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font:900 20px Rubik;color:#13233a}
.sq.sm .c{width:22px;height:22px;border-radius:6px;font-size:13px}
.grp{display:flex;flex-direction:column;align-items:center;gap:6px;font-weight:700}
.row{display:flex;gap:16px;align-items:flex-end;justify-content:center;flex-wrap:wrap}
.tag{display:inline-block;border-radius:10px;padding:4px 10px;font-weight:800;margin:3px}
.tE{background:#5ec8ff26;color:#5ec8ff;border:2px solid #5ec8ff}.tD{background:#ffb02026;color:#ffb020;border:2px solid #ffb020}
@media (max-width:560px){.at th,.at td{padding:4px 4px;min-width:0;font-size:15px;height:40px}.at th{font-size:13px}.at td.lab{font-size:12px}.sq .c{width:30px;height:30px;font-size:15px}}
</style>`);
const gcd=(a,b)=>b?gcd(b,a%b):a;
const COL=['#ffb020','#5ec8ff','#ff7a8a','#7be08a'];
const C2=(t,i)=>`<b style="color:${COL[i]}">${t}</b>`;
const HL=t=>`<mark class="sig">${t}</mark>`;
const FRr=(a,b)=>`<span class="fr"><span>${a}</span><span>${b}</span></span>`;
const sum=a=>a.reduce((x,y)=>x+y,0);
const RATIOS=[[1,2],[1,3],[2,3],[3,4],[2,5],[3,5],[4,5],[1,4],[5,6],[3,2],[4,3],[5,2]];
const book=()=>Math.random()<.35;
/* ===== פיצוח: הרחבה או חלוקה? ===== */
const TE='🟦 הרחבה: נתון צד אחד, מחפשים צד אחר',TD='🟧 חלוקה ביחס: נתון הסה״כ, מחלקים אותו';
const CK=(lab,opts,ok,why)=>{const o=shuf(opts);return {lab,choice:o,correct:o.indexOf(ok),why};};
const TYPECK=(isE,sig)=>CK('🟦 הרחבה או 🟧 חלוקה?',[TE,TD],isE?TE:TD,isE?`מה נתון? רק <b>צד אחד</b> (${sig}). אין סה״כ ← <b>הרחבה</b>.`:`מה נתון? <b>הסה״כ</b> (${sig}) ← מחלקים אותו ← <b>חלוקה ביחס</b>.`);
/* ===== הטבלה הקבועה: שורת יחס, שורת באמת, ובאדום "פי כמה" ===== */
function TB(cols,rows,anc,fac,hl){const hd=cols.map((c,i)=>`<th class="${i===anc?'anc':''}" style="color:${c.c}">${c.h}</th>`).join('');
 const body=rows.map(r=>`<tr><td class="lab">${r.l}</td>${r.c.map(([v,k,q],ci)=>{const show=k===0||hl;
  return `<td class="${k===0?'giv':''}${ci===anc?' anc':''}">${show&&v!==''?`<span class="vv ${k?'calc':''} ${hl&&k?'rv':''}" style="--d:${.4+k*.9+ci*.25}s">${v}</span>`:(q?'<span class="qm">?</span>':'')}</td>`;}).join('')}</tr>`).join('');
 return `<div class="tbw"><table class="at"><tr><th class="lab"></th>${hd}</tr>${body}</table>${fac&&hl?`<div class="fac rv" style="--d:1.3s">פי ${fac} ⬇ (כל שורת היחס)</div>`:''}</div>`;}
/* הטבלה של רוני (כמו באחוזים): השלם | החלק היחסי (שבר) | החלק המבוקש.
 נתון השלם ← כפל: שלם · שבר.  חסר השלם ← חילוק: חלק : שבר.  הרחבה ← גורם ההרחבה (כופלים מונה ומכנה). */
const FX=(a,b)=>FRr(a,b);
function FT(o,hl){const S=sum(o.r),k=o.k,real=o.r.map(x=>x*k),T=S*k,cell=(v,k0,q)=>[v,k0,q];
 if(!o.isE){const ids=o.ask.filter(i=>i!=='T');const rows=ids.map(i=>({l:`<b style="color:${COL[i]}">${o.names[i]}</b>`,c:[cell(T,0),cell(FX(o.r[i],S),1),cell(`${T} · ${FX(o.r[i],S)} = ${real[i]}`,2,true)]}));
  return TB([{h:o.tName&&o.tName!=='סה״כ'?'השלם ('+o.tName+')':'השלם',c:PU},{h:'החלק היחסי (שבר)',c:'#f3f6fb'},{h:'החלק המבוקש',c:GR}],rows,0,0,hl)+(hl?`<div class="say">${M(T)} ← השלם ידוע ← <b>כופלים</b>: שלם · שבר</div>`:'');}
 const kn=o.known,rows=[];
 o.ask.forEach(i=>{if(i==='T')rows.push({l:'<b>השלם</b>',c:[cell(`${real[kn]} : ${FX(o.r[kn],S)} = ${T}`,2,true),cell(FX(o.r[kn],S),1),cell(real[kn],0)]});});
 const ex=o.ask.filter(i=>i!=='T'&&i!==kn);
 let out=rows.length?TB([{h:'השלם',c:PU},{h:'החלק היחסי (שבר)',c:'#f3f6fb'},{h:'החלק הנתון',c:COL[kn]}],rows,2,0,hl)+(hl?'<div class="say">השלם חסר ← <b>מחלקים</b>: חלק : שבר</div>':''):'';
 if(ex.length){const i=ex[0],top=kn<i,num=top?real[kn]:(hl?real[i]:'?'),den=top?(hl?real[i]:'?'):real[kn],a=top?o.r[kn]:o.r[i],b=top?o.r[i]:o.r[kn];
  out+=TB([{h:'היחס כשבר',c:'#f3f6fb'},{h:'גורם ההרחבה',c:'#ff6b6b'},{h:'אחרי ההרחבה',c:GR}],[{l:`${o.names[top?kn:i]}<br>────<br>${o.names[top?i:kn]}`,c:[cell(FX(a,b),0),cell(`· ${k}`,1),cell(FX(num,den),0)]}],-1,0,hl)+(hl?`<div class="say">${M(real[kn]+' : '+o.r[kn]+' = '+k)} ← גורם ההרחבה. כופלים <b>גם</b> מונה <b>וגם</b> מכנה.</div>`:'');}
 return out;}
/* שאלת יחס כללית.
 o: kind, rc, isE (הרחבה), sig, text, names[], r[] (חלקי היחס), k (פי כמה), known (בהרחבה: איזה צד נתון),
 ask[] (אינדקסים; 'T' = הסה״כ), tName, pre[] (שלבים לפני, למשל חצי היקף), preLine, extra {label,val,step,line} */
function RQ(o){const n=o.r.length,S=sum(o.r),k=o.k,real=o.r.map(x=>x*k),T=S*k,isE=o.isE,showT=!isE||o.ask.includes('T');
 o.dia=hl=>`<div class="tbw">${FT(o,hl)}</div>`;
 const ans=o.ask.map(i=>i==='T'?{label:o.tName||'סה״כ',col:PU,val:T,unit:o.unit}:{label:o.names[i],col:COL[i],val:real[i],unit:o.unit});
 const W=[...(o.pre||[])],L=[];if(o.preLine)L.push(o.preLine);
 if(isE){const kn=o.known;
  W.push({t:`גורם ההרחבה: ${M(real[kn]+' : '+o.r[kn]+' = ?')}`,ans:[{label:'',val:k}],why:`בעמודת ${o.names[kn]} ידועים גם החלקים (${M(o.r[kn])}) וגם מה שיש באמת (${M(real[kn])}). מחלקים ← פי כמה הגדילו.`});
  L.push(`🟦 נתון ${o.names[kn]} ← גורם ההרחבה ${M(real[kn]+' : '+o.r[kn]+' = '+k)} ← כופלים מונה ומכנה ב־<b style="color:#ff6b6b">${k}</b>`);}
 else{if(n>1){W.push({t:`המכנה של השבר = כל החלקים: ${M(o.r.join(' + ')+' = ?')}`,ans:[{label:'חלקים',val:S}],why:'את החלקים של היחס <b>מחברים</b>. זה המכנה (השלם). לא כופלים, ולא סופרים אנשים.'});}
  W.push({t:`${M(T)} · ${FRr('?',S)}: קודם ${M(T+' : '+S+' = ?')}`,ans:[{label:'',val:k}],why:`כופלים בשבר = מחלקים במכנה (${M(S)} חלקים), ואז כופלים במונה. לא מחלקים במספר האנשים!`});
  L.push(`🟧 חלוקה: ${M(o.r.join(' + ')+' = '+S)} חלקים (המכנה). השלם ידוע ← <b>כפל</b>: שלם · שבר`);}
 o.ask.forEach(i=>{if(i==='T'){W.push({t:`השלם: ${M(S+' · '+k+' = ?')}`,ans:[{label:'',val:T}],why:`השלם חסר ← <b>חילוק</b>: ${M(real[o.known])} : ${FRr(o.r[o.known],S)}. כלומר חלק אחד (${M(k)}) · כל החלקים (${M(S)}).`});return;}
  if(isE&&i===o.known)return;W.push({t:isE?`${o.names[i]}: ${M(o.r[i]+' · '+k+' = ?')}`:`${o.names[i]}: ${M(T)} · ${FRr(o.r[i],S)} ← ${M(o.r[i]+' · '+k+' = ?')}`,ans:[{label:'',val:real[i]}],why:isE?`גורם ההרחבה ${M(k)}: כופלים גם את ${o.names[i]}.`:`שלם · שבר: ${M(T+' : '+S+' = '+k)}, ואז ${M(k+' · '+o.r[i])}.`});});
 L.push(o.ask.filter(i=>i!=='T'&&!(isE&&i===o.known)).map(i=>isE?`${o.names[i]}: ${M(o.r[i]+' · '+k+' = '+real[i])}`:`${o.names[i]}: ${M(T)} · ${FRr(o.r[i],S)} = ${M(real[i])}`).join(' · ')+(o.ask.includes('T')?` · השלם (חסר ← חילוק): ${M(real[o.known])} : ${FRr(o.r[o.known],S)} = ${M(T)}`:''));
 if(o.extra){ans.push({label:o.extra.label,col:GR,val:o.extra.val,unit:o.extra.unit});W.push(o.extra.step);L.push(o.extra.line);}
 if(!isE)L.push(`בדיקה: ${M(real.join(' + ')+' = '+T)} ✓`);
 const q={kind:o.kind,rc:o.rc,text:o.text,dia:o.dia,ans,work:W,lines:L,crack:[TYPECK(isE,o.sig),...(o.crack||[])],
  rule:isE?(o.ask.includes('T')?'השלם חסר ← חילוק: חלק : שבר.':'הרחבה: גורם ההרחבה ← כופלים מונה וגם מכנה.'):'השלם ידוע ← כפל: שלם · שבר (המכנה = כל החלקים).',
  trick:isE?'בהרחבה לא מוסיפים! כופלים פי אותו מספר.':'מחלקים במספר החלקים, לא במספר האנשים!'};
 q.diag=({vals})=>{if(o.diag){const m=o.diag(vals);if(m)return m;}
  const v=vals.slice(0,o.ask.length);
  if(isE){const kn=o.known;for(let j=0;j<o.ask.length;j++){const i=o.ask[j];if(i==='T')continue;const x=v[j];
    if(x===real[kn]+(o.r[i]-o.r[kn])&&x!==real[i])return `<b>הוספתם</b> ${M(o.r[i]-o.r[kn])} במקום לכפול. ביחס כופלים: פי ${M(k)} ← ${M(o.r[i]+' · '+k)}.`;
    if(x===real[kn]*o.r[i]&&x!==real[i])return `כפלתם את ${M(real[kn])} ב־${M(o.r[i])}. קודם בודקים <b>פי כמה</b>: ${M(real[kn]+' : '+o.r[kn]+' = '+k)}.`;
    if(x===k&&k!==real[i])return `${M(k)} זה <b>פי כמה</b>, לא התשובה. עכשיו כופלים: ${M(o.r[i]+' · '+k)}.`;}
   return null;}
  if(v.length>1&&v.every(x=>x===v[0])&&v[0]*n===T)return `חילקתם <b>שווה בשווה</b>. אבל היחס ${M(o.r.join(' : '))} ← יש ${M(S)} חלקים: ${M(T+' : '+S+' = '+k)}.`;
  if(v.every((x,j)=>o.ask[j]!=='T'&&x===o.r[o.ask[j]]))return 'כתבתם את <b>מספרי היחס</b>, לא את הכמויות. מוצאים חלק אחד וכופלים.';
  if(v.length===2&&o.ask.length===2&&v[0]===real[o.ask[1]]&&v[1]===real[o.ask[0]])return 'החשבון נכון, אבל <b>הסדר הפוך</b>! הראשון ביחס שייך לראשון בשאלה.';
  if(v.length===1&&v[0]===k)return `${M(k)} זה <b>חלק אחד</b>. עכשיו כופלים במספר החלקים.`;
  if(v.length===1&&v[0]===T/n&&n>1)return `חילקתם ל־${M(n)}. מחלקים ב<b>מספר החלקים</b>: ${M(S)}.`;
  return null;};
 return q;}
/* ===== 🟦 הרחבה ===== */
const CTXE=[['כפיות סוכר','כפיות קקאו','אדיר מכין עוגיות','בעוגייה בינונית','עוגייה'],['כוסות מים','כוסות מיץ','נועה מכינה מיץ','בקנקן גדול','קנקן'],['ביצים','כוסות קמח','דנה אופה עוגות','בעוגה גדולה','עוגה'],['כפות שמן','כפות חומץ','רון מכין רוטב לסלט','בקערה גדולה','קערה']];
function eSimple(rev){const [n1,n2,who,where]=pick(CTXE);let a=1,b=R(2,6),k=R(2,9);if(book()&&n1==='כפיות סוכר'&&!rev){b=5;k=4;}else if(Math.random()<.4){[a,b]=pick(RATIOS);}
 const kn=rev?1:0,kv=(rev?b:a)*k,other=rev?0:1;
 return RQ({kind:'🟦 הרחבה',rc:1,isE:true,sig:`רק ${rev?n2:n1}`,names:[n1,n2],r:[a,b],k,known:kn,ask:[other],
  text:`${who}. היחס בין ${C2(n1,0)} ל${C2(n2,1)} הוא ${M(a+' : '+b)}. ${where} יש ${HL(M(kv)+' '+(rev?n2:n1))}. כמה ${rev?n1:n2} יש שם?`});}
function eBig(){const [n1,n2,who]=pick(CTXE);let [a,b]=pick([[1,5],[1,4],[2,3],[1,3],[3,4]]);let k=R(3,10);if(book()){a=1;b=5;k=20;}
 return RQ({kind:'🟦 הרחבה · כמות גדולה',rc:1,isE:true,sig:`רק ${n1}`,names:[n1,n2],r:[a,b],k,known:0,ask:[1,'T'],tName:'ביחד',
  text:`${who}. היחס בין ${C2(n1,0)} ל${C2(n2,1)} הוא ${M(a+' : '+b)}. בגרסה הגדולה יש ${HL(M(a*k)+' '+n1)}. כמה ${n2} יש שם? וכמה כפיות/כוסות ביחד?`});}
function eWhole(){let [T,u,n1,n2,a,b]=pick(CTXD),k;[a,b]=pick(RATIOS);k=R(2,9);const kn=pick([0,1]);
 return RQ({kind:'🟦 חסר השלם ← חילוק',rc:2,isE:true,sig:`רק ${kn?n2:n1}`,names:[n1,n2],r:[a,b],k,known:kn,ask:['T'],
  text:`חילקו ${u} בין ${C2(n1,0)} ל${C2(n2,1)} ביחס ${M(a+' : '+b)}. ${HL((kn?n2:n1)+' קיבלה '+M((kn?b:a)*k)+' '+u)}. כמה ${u} היו בסך הכול (השלם)?`});}
/* משולשים ישרי זווית (מהספר) */
function triSVG(L1,S1,S2,hl,x){const s=Math.min(9,150/L1),w1=S1*s,h1=L1*s,w2=S2*s,h2=L1/S1*S2*s,bx=200,by=175;
 const tri=(xr,w,h,lv,sv,lc)=>`<polygon points="${xr},${by} ${xr-w},${by} ${xr},${by-h}" fill="none" stroke="${GR}" stroke-width="3"/><rect x="${xr-12}" y="${by-12}" width="12" height="12" fill="none" stroke="${GR}" stroke-width="2"/>
  <text x="${xr+8}" y="${by-h/2}" fill="${COL[0]}" font-size="17" font-weight="800" font-family="Rubik">${lv}</text><text x="${xr-w/2}" y="${by+20}" fill="${COL[1]}" font-size="17" font-weight="800" text-anchor="middle" font-family="Rubik">${sv}</text>`;
 return `<svg viewBox="0 0 330 200" style="width:300px;max-width:100%" role="img" aria-label="שני משולשים ישרי זווית">${tri(130,w1,h1,L1,S1)}${tri(300,w2,h2,hl?x:'x',S2)}</svg>`;}
function eTri(){let c=pick([2,3]),w=R(3,8),s2=R(2,7);if(book()){c=2;w=8;s2=6;}if(s2===w)s2++;const L1=c*w,x=c*s2;
 const q=RQ({kind:'🟦 הרחבה · משולשים',rc:1,isE:true,sig:'ניצב אחד במשולש הקטן',names:['ניצב ארוך','ניצב קצר'],r:[c,1],k:s2,known:1,ask:[0],unit:'ס״מ',
  pre:[{t:`היחס במשולש הגדול: ${M(L1+' : '+w+' = ? : 1')}`,ans:[{label:'',val:c}],why:`מצמצמים: מחלקים את שני הניצבים ב־${M(w)}. זה גם <b>מקדם הפרופורציה</b>.`}],
  preLine:`במשולש הגדול ${M(L1+' : '+w+' = '+c+' : 1')} ← מקדם הפרופורציה ${M(c)}`,
  text:`לפניכם שני משולשים ישרי זווית. היחס בין ${C2('הניצב הארוך',0)} ל${C2('ניצב הקצר',1)} זהה בשני המשולשים. במשולש הגדול הניצבים ${M(L1)} ס״מ ו־${M(w)} ס״מ. במשולש הקטן ${HL('הניצב הקצר '+M(s2)+' ס״מ')}. מצאו את x.`,
  diag:([v])=>v===L1-w+s2?`<b>הוספתם</b> את ההפרש (${M(L1-w)}). ביחס לא מוסיפים: הארוך גדול <b>פי ${c}</b> מהקצר.`:v===L1/w*s2&&false?null:null});
 const d=q.dia;q.dia=hl=>`<div class="tbw"><div class="row">${triSVG(L1,w,s2,hl,x)}</div>${d(hl)}</div>`;return q;}
function eCoef(){const c=pick([2,3,4]),ws=shuf([2,3,4,5,6,8,10]).slice(0,3).sort((a,b)=>a-b);
 return {kind:'מקדם הפרופורציה',rc:1,text:`בבית דפוס מדפיסים כרטיסים בגדלים שונים: ${ws.map(w=>M(c*w+' × '+w).replace('×','על')).join(', ')} (אורך על רוחב, בס״מ). מהו <b>מקדם הפרופורציה</b> בין האורך לרוחב?`,
  ans:[{label:'מקדם',col:COL[0],val:c}],
  work:[{t:`כרטיס ראשון: ${M(c*ws[0]+' : '+ws[0]+' = ?')}`,ans:[{label:'',val:c}],why:'מקדם הפרופורציה = הערך של היחס: אורך <b>מחולק</b> ברוחב.'},{t:`בודקים בכרטיס שני: ${M(c*ws[1]+' : '+ws[1]+' = ?')}`,ans:[{label:'',val:c}],why:'בפרופורציה הערך יוצא <b>זהה</b> בכל הכרטיסים.'}],
  lines:[ws.map(w=>M(c*w+' : '+w+' = '+c)).join(' · '),`בכל הכרטיסים האורך גדול <b>פי ${c}</b> ← מקדם הפרופורציה ${M(c)}.`],rule:'מקדם הפרופורציה = האורך : הרוחב (אותו מספר בכל הכרטיסים).',
  diag:({vals:[v]})=>v===c*ws[0]-ws[0]?'חיסרתם. מקדם = <b>פי כמה</b> ← מחלקים: '+M(c*ws[0]+' : '+ws[0])+'.':v===c*ws[0]?'זה אורך של כרטיס. המקדם = אורך : רוחב.':null};}
/* ===== 🟧 חלוקה ביחס ===== */
const CTXD=[[28,'עוגיות','קבוצה א׳','קבוצה ב׳',3,4,'נתונות 28 עוגיות. מחלקים אותן לשתי קבוצות'],[54,'חוברות','כיתה א׳','כיתה ב׳',4,5,'נתונות 54 חוברות. מחלקים אותן לשתי כיתות'],[33,'עציצים','קומה א׳','קומה ב׳',5,6,'מחלקים 33 עציצים בין שתי קומות'],[90,'ש״ח טיפים','מלצר חדש','מלצר ותיק',4,5,'מחלקים 90 ש״ח טיפים בין שני מלצרים']];
function dTwo(){let [T,u,n1,n2,a,b,s]=pick(CTXD),k;
 if(!book()){[a,b]=pick(RATIOS);k=R(2,9);T=(a+b)*k;s=null;}else k=T/(a+b);
 return RQ({kind:'🟧 חלוקה ביחס',rc:2,isE:false,sig:`הסה״כ ${T}`,names:[n1,n2],r:[a,b],k,ask:[0,1],tName:'סה״כ',
  text:s?`${s.replace(T,HL(M(T)))} ביחס ${M(a+' : '+b)} (${n1} : ${n2}). כמה מקבל כל צד?`:`מחלקים ${HL(M(T)+' '+u)} בין ${C2(n1,0)} ל${C2(n2,1)} ביחס ${M(a+' : '+b)}. כמה מקבל כל צד?`});}
function dFloor(){let [a,b]=pick([[5,6],[3,4],[2,3],[4,5],[7,5],[5,3]]);if(book()){a=5;b=6;}const more=b>a?1:0,k=R(2,6),T=(a+b)*k;
 return {kind:'🟧 הבנה · מי מקבל יותר?',rc:2,text:`מחלקים ${HL(M(T)+' עציצים')} בין ${C2('קומה א׳',0)} ל${C2('קומה ב׳',1)} ביחס ${M(a+' : '+b)}. איזו קומה מקבלת יותר עציצים, ולמה?`,
  choice:[`קומה ${more?'ב׳':'א׳'}, כי יש לה ${M(Math.max(a,b))} חלקים מתוך ${M(a+b)}`,`קומה ${more?'א׳':'ב׳'}, כי היא כתובה ראשונה`,'אותו דבר, כי מחלקים בין שתיים',`אי אפשר לדעת בלי לחשב`],correct:0,
  work:[{t:`חלק אחד: ${M(T+' : '+(a+b)+' = ?')}`,ans:[{label:'',val:k}],why:'סה״כ : מספר החלקים.'},{t:`קומה ${more?'ב׳':'א׳'}: ${M(Math.max(a,b)+' · '+k+' = ?')}`,ans:[{label:'',val:Math.max(a,b)*k}],why:'יותר חלקים ← יותר עציצים.'}],
  lines:[`לקומה ${more?'ב׳':'א׳'} יש ${M(Math.max(a,b))} חלקים, ולשנייה רק ${M(Math.min(a,b))}.`,`בדיקה: ${M(a*k)} ו־${M(b*k)}.`],rule:'מי שיש לו יותר חלקים ביחס, מקבל יותר.',
  diag:({sel})=>sel===3?'אפשר לדעת גם בלי לחשב! כל החלקים שווים, ולכן מי שיש לו יותר חלקים מקבל יותר.':sel===2?'לא שווה בשווה! היחס אומר כמה חלקים לכל צד.':sel===1?'הסדר לא קובע. קובע <b>מספר החלקים</b> של כל קומה.':null};}
function angSVG(a,b,T,hl,small){const s=Math.PI/180,A=[50,170],len=150,t0=12,p=th=>[A[0]+len*Math.cos(th*s),A[1]-len*Math.sin(th*s)];
 const D=p(t0),C=p(t0+(small?a:b)*T/(a+b)),B=p(t0+T),arc=(r,f,t,c)=>{const x1=A[0]+r*Math.cos(f*s),y1=A[1]-r*Math.sin(f*s),x2=A[0]+r*Math.cos(t*s),y2=A[1]-r*Math.sin(t*s);return `<path d="M${x1},${y1} A${r},${r} 0 0,0 ${x2},${y2}" fill="none" stroke="${c}" stroke-width="5"/>`;};
 const cad=T*a/(a+b),bac=T*b/(a+b),mid=t0+cad;
 return `<svg viewBox="0 0 260 190" style="width:240px;max-width:100%" role="img" aria-label="זווית BAD מחולקת ע״י AC">${arc(40,t0,mid,COL[0])}${arc(52,mid,t0+T,COL[1])}
 ${[B,C,D].map(P=>`<line x1="${A[0]}" y1="${A[1]}" x2="${P[0]}" y2="${P[1]}" stroke="${GR}" stroke-width="3"/>`).join('')}
 ${[['A',A,-14,14],['B',B,-6,-8],['C',C,0,-8],['D',D,8,0]].map(([l,P,dx,dy])=>`<text x="${P[0]+dx}" y="${P[1]+dy}" fill="currentColor" font-size="17" font-weight="800" font-family="Rubik">${l}</text>`).join('')}
 ${hl?`<text x="${A[0]+70}" y="${A[1]-8}" fill="${COL[0]}" font-size="15" font-weight="800" font-family="Rubik">${cad}°</text>`:''}</svg>`;}
function dAngle(){let T=pick([60,80,90,100,120,150]),a=1,b=3;const ok=RATIOS.filter(([x,y])=>x<y&&T%(x+y)===0);[a,b]=pick(ok.length?ok:[[1,3]]);if(book()){T=80;a=1;b=3;}if(T%(a+b)){T=80;a=1;b=3;}
 const k=T/(a+b);
 const q=RQ({kind:'🟧 חלוקה ביחס · זווית',rc:2,isE:false,sig:`כל הזווית ${T}°`,names:['∢CAD (הקטנה)','∢BAC (הגדולה)'],r:[a,b],k,ask:[0],tName:'∢BAD',unit:'°',
  text:`נתונה הזווית ${HL(M('∢BAD = '+T+'°'))}. הקטע ${M('AC')} מחלק אותה לשתי זוויות ביחס ${M(a+' : '+b)}. נתון: ${M('∢CAD < ∢BAC')}. מצאו את ${M('∢CAD')}.`,
  diag:([v])=>v===b*k?'זו הזווית <b>הגדולה</b>. נתון ש־∢CAD קטנה יותר ← היא מקבלת '+M(a)+' חלקים.':v===T/2?'חילקתם לשתיים שווה. היחס '+M(a+' : '+b)+' ← '+M(a+b)+' חלקים.':null});
 const d=q.dia;q.dia=hl=>`<div class="tbw"><div class="row">${angSVG(a,b,T,hl,true)}</div>${d(hl)}</div>`;return q;}
function dPrice(){let a=pick([2,3,4,5]),k=R(4,12);if(book()){a=4;k=8;}const T=(a+1)*k;
 return RQ({kind:'🟧 חלוקה ביחס · משוואה',rc:2,isE:false,sig:`המחיר ביחד ${T}`,names:['סלט','כריך'],r:[a,1],k,ask:[1,0],tName:'ביחד',unit:'ש״ח',
  text:`המחיר של סלט וכריך ${HL('ביחד '+M(T)+' ש״ח')}. היחס בין מחיר ${C2('הסלט',0)} למחיר ${C2('הכריך',1)} הוא ${M(a+' : 1')}. מה מחיר הכריך? ומה מחיר הסלט?`,
  crack:[CK('אם x = מחיר הכריך, מה x בטבלה?',['חלק אחד','הסה״כ','מספר החלקים'],'חלק אחד','לכריך יש <b>חלק אחד</b> ביחס. ולכן x = חלק אחד, והמשוואה: x + '+a+'x = '+T+'.')]});}
/* סה״כ מוסתר: היקף, משולש, מרובע */
function dRect(){let [a,b]=pick([[2,1],[3,1],[3,2],[4,1],[5,3],[4,3],[8,1]]),k=R(2,6);if(book()){[a,b,k]=pick([[2,1,7],[8,1,2]]);}const P=2*(a+b)*k,h=P/2,Lg=a*k,Wd=b*k;
 const q=RQ({kind:'🟧 סה״כ מוסתר · היקף מלבן',rc:6,isE:false,sig:`ההיקף ${P}`,names:['אורך','רוחב'],r:[a,b],k,ask:[0,1],tName:'חצי היקף',unit:'ס״מ',
  pre:[{t:`אורך + רוחב = חצי היקף: ${M(P+' : 2 = ?')}`,ans:[{label:'',val:h}],why:'בהיקף יש <b>שני</b> אורכים ו<b>שני</b> רוחבים. אורך + רוחב = חצי ההיקף. זה הסה״כ שלנו!'}],
  preLine:`⚠️ הסה״כ הוא חצי היקף: ${M(P+' : 2 = '+h)}`,
  crack:[CK('מה הסה״כ בטבלה?',['חצי היקף (אורך + רוחב)','כל ההיקף','השטח'],'חצי היקף (אורך + רוחב)','בהיקף יש 2 אורכים ו־2 רוחבים. אורך + רוחב = חצי היקף.')],
  extra:{label:'שטח',val:Lg*Wd,unit:'סמ״ר',step:{t:`שטח: ${M(Lg+' · '+Wd+' = ?')}`,ans:[{label:'',val:Lg*Wd}],why:'שטח מלבן = אורך · רוחב.'},line:`שטח: ${M(Lg+' · '+Wd+' = '+Lg*Wd)} סמ״ר`},
  text:`נתון מלבן ${HL('שהיקפו '+M(P)+' ס״מ')}. היחס בין ${C2('אורך',0)} המלבן ל${C2('רוחב',1)} הוא ${M(a+' : '+b)}. חשבו את אורך הצלעות ואת השטח.`,
  diag:([x,y])=>x+y===P?'השתמשתם בכל ההיקף. אבל <b>אורך + רוחב = חצי היקף</b> = '+M(h)+'.':x*2===Lg&&y*2===Wd?'חילקתם פעמיים ב־2. הסה״כ הוא '+M(h)+'.':null});
 const d=q.dia;q.dia=hl=>`<div class="tbw"><div class="row"><svg viewBox="0 0 220 110" style="width:220px;max-width:100%" role="img" aria-label="מלבן"><rect x="20" y="15" width="${Math.min(180,40+a*20)}" height="${Math.max(18,70*b/a)}" fill="#5ec8ff22" stroke="${GR}" stroke-width="3"/><text x="${20+Math.min(180,40+a*20)/2}" y="12" fill="${COL[0]}" font-size="15" font-weight="800" text-anchor="middle" font-family="Rubik">${hl?Lg:'?'}</text><text x="${28+Math.min(180,40+a*20)}" y="${15+Math.max(18,70*b/a)/2+5}" fill="${COL[1]}" font-size="15" font-weight="800" font-family="Rubik">${hl?Wd:'?'}</text></svg></div>${d(hl)}</div>`;return q;}
function dThree(){let [a,b,c]=pick([[3,4,5],[2,3,5],[1,2,3],[2,3,4],[1,2,5]]),k=R(3,10);if(book()){[a,b,c]=[3,4,5];k=10;}const T=(a+b+c)*k,w=pick([0,1,2]);
 return RQ({kind:'🟧 חלוקה ל־3 חלקים',rc:2,isE:false,sig:`הסה״כ ${T}`,names:['ח׳1','ח׳2','ח׳3'],r:[a,b,c],k,ask:[w],
  text:`מחלקים ${HL(M(T)+' סופגניות')} בין הכיתות ${C2('ח׳1',0)}, ${C2('ח׳2',1)} ו${C2('ח׳3',2)} ביחס ${M(a+' : '+b+' : '+c)}. כמה סופגניות מקבלת כיתה ${['ח׳1','ח׳2','ח׳3'][w]}?`});}
function dTriAng(){let r=pick([[1,2,3],[2,4,3],[1,13,4],[2,3,4],[1,4,7],[3,4,5],[2,5,8],[1,1,2]]);const S=sum(r),k=180/S;
 return RQ({kind:'🟧 סה״כ מוסתר · זוויות במשולש',rc:6,isE:false,sig:'משולש = 180°',names:['זווית 1','זווית 2','זווית 3'],r,k,ask:[0,1,2],tName:'סכום הזוויות',unit:'°',
  pre:[{t:'מה סכום הזוויות במשולש?',ans:[{label:'°',val:180}],why:'בכל משולש סכום הזוויות הוא <b>180°</b>. זה הסה״כ, גם אם לא כתוב בשאלה!'}],
  preLine:'⚠️ הסה״כ לא כתוב: במשולש סכום הזוויות 180°',
  text:`היחס בין הגדלים של ${HL('3 הזוויות במשולש')} הוא ${M(r.join(' : '))}. חשבו את גודל כל זווית.`});}
function dQuad(){let r=pick([[3,4,5,6],[1,2,3,4],[2,3,3,4],[1,2,4,5],[3,5,5,7]]);if(book())r=[3,4,5,6];const S=sum(r),k=360/S;
 return RQ({kind:'🟧 סה״כ מוסתר · זוויות במרובע',rc:6,isE:false,sig:'מרובע = 360°',names:['∢1','∢2','∢3','∢4'],r,k,ask:[0,1,2,3],tName:'סכום הזוויות',unit:'°',
  pre:[{t:'מה סכום הזוויות במרובע?',ans:[{label:'°',val:360}],why:'מרובע = שני משולשים ← '+M('2 · 180 = 360')+'°.'}],
  preLine:'⚠️ הסה״כ לא כתוב: במרובע סכום הזוויות 360°',
  text:`היחס בין הגדלים של ${HL('ארבע הזוויות במרובע')} הוא ${M(r.join(' : '))}. מצאו את הגודל של כל זווית.`});}
/* ===== חשיבה ואוריינות ===== */
function dClaim(){let [a,b,c]=pick([[3,4,5],[2,3,4],[1,2,3],[2,3,5]]);if(book())[a,b,c]=[3,4,5];const S=a+b+c,w=pick([0,2]),p=[a,b,c][w],ok=Math.random()<.5,den=ok?S:S-p,nm=['ח׳1','ח׳2','ח׳3'][w];
 return {kind:'נכון או לא? · שבר מתוך הסה״כ',rc:3,text:`מחלקים סופגניות בין ח׳1, ח׳2 ו־ח׳3 ביחס ${M(a+' : '+b+' : '+c)}. נועה טוענת: "כיתה ${nm} תקבל ${FRr(p,den)} מכל הסופגניות". האם היא צודקת?`,
  choice:[`כן, כי יש ${M(S)} חלקים, ול${nm} ${M(p)} מהם`,`לא, כי יש ${M(S)} חלקים בסה״כ, ולכן ${nm} מקבלת ${FRr(p,S)}`,`כן, כי ${M(p)} הוא המספר של ${nm} ביחס`,'אי אפשר לדעת בלי מספר הסופגניות'],correct:ok?0:1,
  work:[{t:`כמה חלקים בסה״כ? ${M(a+' + '+b+' + '+c+' = ?')}`,ans:[{label:'',val:S}],why:'השלם = כל החלקים יחד.'},{t:`החלק של ${nm} מתוך הכול:`,choice:[FRr(p,S),FRr(p,S-p)],correct:0,why:'המכנה = <b>כל</b> החלקים, גם של הכיתה עצמה.'}],
  lines:[`סה״כ ${M(S)} חלקים ← ${nm} מקבלת ${FRr(p,S)}.`,ok?'הטענה נכונה ✓':`${FRr(p,den)} שגוי: ${M(den)} הם החלקים של <b>שאר</b> הכיתות בלבד.`],rule:'שבר מתוך הכול: המכנה = כל החלקים של היחס.',
  diag:({sel})=>sel===3?'אפשר! היחס מספיק כדי לדעת איזה חלק מהכול.':(!ok&&sel===0)?`${M(den)} הם רק החלקים של שאר הכיתות. המכנה צריך להיות <b>כל</b> החלקים: ${M(S)}.`:(ok&&sel===1)?`בדקו שוב: ${M(a+' + '+b+' + '+c+' = '+S)}, וזה בדיוק המכנה.`:null};}
function dTF(){const [a,b]=pick([[1,2],[1,3],[2,3],[1,4]]),S=a+b,t=pick([0,1,2,3]);let claim,ok,why;
 if(t===0){ok=false;claim='יוחאי יקבל חצי מהלחמניות';why=`ליוחאי ${M(a)} חלקים מתוך ${M(S)} ← ${FRr(a,S)}, לא חצי.`;}
 else if(t===1){ok=true;claim=`דניאל יקבל ${FRr(b,S)} מהלחמניות`;why=`לדניאל ${M(b)} חלקים מתוך ${M(S)} ← ${FRr(b,S)} ✓`;}
 else if(t===2){ok=false;claim=`היחס בין הלחמניות של דניאל ליוחאי הוא ${M(a+' : '+b)}`;why=`הסדר התהפך! דניאל ראשון ← ${M(b+' : '+a)}.`;}
 else{ok=true;claim=`היחס בין כל הלחמניות ללחמניות של יוחאי הוא ${M(S+' : '+a)}`;why=`כל החלקים ${M(S)}, ליוחאי ${M(a)} ← ${M(S+' : '+a)} ✓`;}
 return {kind:'נכון או לא נכון?',rc:3,text:`מחלקים לחמניות בין ${C2('יוחאי',0)} ל${C2('דניאל',1)} ביחס ${M(a+' : '+b)}. הטענה: "${claim}". האם היא נכונה?`,choice:['נכונה','שגויה'],correct:ok?0:1,
  work:[{t:`כמה חלקים בסה״כ? ${M(a+' + '+b+' = ?')}`,ans:[{label:'',val:S}],why:'מחברים את חלקי היחס.'},{t:'הטענה:',choice:['נכונה','שגויה'],correct:ok?0:1,why}],
  lines:[`יוחאי ${M(a)} חלקים, דניאל ${M(b)}, יחד ${M(S)}.`,why],rule:'בודקים: מי ראשון ביחס? ומה המכנה (כל החלקים)?',diag:()=>why};}
function dPW(){const [a,b]=pick([[4,5],[2,3],[3,4],[1,2],[3,5]]),S=a+b,inv=Math.random()<.5,g=gcd(a,S);
 const x=inv?S/g:a/g,y=inv?a/g:S/g;
 return {kind:'יחס בין חלק לסה״כ',rc:3,text:`מחלקים טיפים בין ${C2('מלצר חדש',0)} ל${C2('מלצר ותיק',1)} ביחס ${M(a+' : '+b)}. מה היחס בין ${inv?'<b>הסכום הכולל</b> לסכום של המלצר החדש':'הסכום של המלצר החדש ל<b>סכום הכולל</b>'}? (יחס מצומצם)`,tpl:'[] : []',
  ans:[{label:inv?'כולל':'חדש',col:inv?PU:COL[0],val:x},{label:inv?'חדש':'כולל',col:inv?COL[0]:PU,val:y}],
  work:[{t:`כמה חלקים בסכום הכולל? ${M(a+' + '+b+' = ?')}`,ans:[{label:'',val:S}],why:'הכולל = כל החלקים יחד.'},{t:`כתבו את היחס: ${inv?M(S+' : '+a):M(a+' : '+S)} ← מצומצם, המספר הראשון = ?`,ans:[{label:'',val:x}],why:g>1?`מחלקים את שני המספרים ב־${M(g)}.`:'אין מחלק משותף, היחס כבר מצומצם.'},{t:'המספר השני = ?',ans:[{label:'',val:y}],why:'אותו צמצום גם למספר השני.'}],
  lines:[`הכולל: ${M(a+' + '+b+' = '+S)} חלקים.`,`${inv?M(S+' : '+a):M(a+' : '+S)}${g>1?' = '+M(x+' : '+y):''}`],rule:'יחס חלק : כולל ← הכולל = סכום החלקים.',
  diag:({vals:[p,r]})=>(p===a&&r===b)||(p===b&&r===a)?'זה היחס בין שני המלצרים. ביקשו מול <b>הסכום הכולל</b>: '+M(a+' + '+b+' = '+S)+'.':(p===y&&r===x)?'הסדר הפוך! קוראים שוב מי ראשון בשאלה.':null};}
function dSalad(){const a=pick([4,3,2,5]),k=R(4,9),n=4,sal=a*k,tot=a*k+n*k,g=gcd(a,a+n);
 const opts=shuf([{t:M(a/g+' : '+(a+n)/g),ok:1},{t:M((a+n)/g+' : '+a/g),msg:'הסדר הפוך: שואלים סלט : סכום כולל.'},{t:M(a+' : 1'),msg:'זה היחס בין סלט לכריך <b>אחד</b>. קנו '+n+' כריכים!'},{t:M(a+' : '+n),msg:'זה סלט מול הכריכים בלבד. הסכום הכולל כולל גם את הסלט.'}]);
 return {kind:'אוריינות · קנייה',rc:3,text:`סלט וכריך עולים ביחד ${M((a+1)*k)} ש״ח, והיחס בין מחיר הסלט למחיר הכריך הוא ${M(a+' : 1')}. ישי קנה ${HL(M(n)+' כריכים וסלט אחד')}. מה היחס בין מחיר הסלט לסכום הכולל ששילם?`,
  choice:opts.map(o=>o.t),correct:opts.findIndex(o=>o.ok),
  work:[{t:`כריך אחד: ${M((a+1)*k+' : '+(a+1)+' = ?')}`,ans:[{label:'ש״ח',val:k}],why:'חלוקה: סה״כ : חלקים.'},{t:`סלט: ${M(a+' · '+k+' = ?')}`,ans:[{label:'ש״ח',val:sal}],why:'לסלט '+a+' חלקים.'},{t:`הכול: ${M(sal+' + '+n+' · '+k+' = ?')}`,ans:[{label:'ש״ח',val:tot}],why:'סלט אחד ועוד '+n+' כריכים.'}],
  lines:[`כריך ${M(k)}, סלט ${M(sal)} ← שילם ${M(sal+' + '+n*k+' = '+tot)}`,`${M(sal+' : '+tot+' = '+a/g+' : '+(a+n)/g)}`],rule:'קוראים לאט: מה בדיוק קנו? רק אז כותבים יחס.',
  diag:({sel})=>opts[sel]&&!opts[sel].ok?opts[sel].msg:null};}
/* ===== זיהוי סוג השאלה ===== */
const SCN=[[1,()=>`בעוגייה קטנה ${M('1')} כפית סוכר ו־${M('5')} כפיות קקאו. בעוגייה גדולה ${HL(M(R(3,9))+' כפיות סוכר')}. כמה קקאו?`],
 [0,()=>`מחלקים ${HL(M(R(3,9)*7)+' עוגיות')} לשתי קבוצות ביחס ${M('3 : 4')}. כמה בכל קבוצה?`],
 [1,()=>`היחס בין בנים לבנות ${M('2 : 3')}. ${HL('יש '+M(R(3,9)*2)+' בנים')}. כמה בנות?`],
 [0,()=>`מלבן ${HL('שהיקפו '+M(R(2,6)*6)+' ס״מ')}, היחס בין האורך לרוחב ${M('2 : 1')}. מה הצלעות?`],
 [0,()=>`היחס בין זוויות ${HL('המשולש')} ${M('1 : 2 : 3')}. מה הזוויות?`],
 [1,()=>`בשני משולשים אותו יחס בין הניצבים. בגדול ${M('16')} ו־${M('8')}, ${HL('בקטן ניצב '+M('6'))}. מצאו את x.`],
 [0,()=>`סלט וכריך עולים ${HL('ביחד '+M(R(4,9)*5)+' ש״ח')}, ביחס ${M('4 : 1')}. כמה הכריך?`],
 [1,()=>`לימונדה: ${M('2')} כוסות מים על כל כוס סירופ. ${HL('שמנו '+M(R(3,8))+' כוסות סירופ')}. כמה מים?`],
 [0,()=>`מחלקים ${HL(M('120')+' סופגניות')} בין 3 כיתות ביחס ${M('3 : 4 : 5')}. כמה מקבלת כל כיתה?`]];
function gType(){const [e,f]=pick(SCN),isE=!!e;
 return {kind:'🟦 הרחבה או 🟧 חלוקה?',rc:3,text:`איזה סוג שאלה זו? (לא פותרים, רק מזהים)<br>${f()}`,choice:[TE,TD],correct:isE?0:1,
  work:[{t:'מה המספר המסומן? צד אחד, או הסה״כ?',choice:['צד אחד','הסה״כ (כל הכמות)'],correct:isE?0:1,why:isE?'המספר שייך לצד <b>אחד</b> בלבד ← הרחבה.':'המספר הוא <b>כל</b> הכמות (גם "היקף", "ביחד", "משולש" = סה״כ) ← חלוקה.'},{t:'ולכן הסוג:',choice:[TE,TD],correct:isE?0:1,why:'נתון צד אחד ← הרחבה. נתון הסה״כ ← חלוקה.'}],
  lines:[isE?'נתון רק <b>צד אחד</b> ← 🟦 הרחבה: פי כמה? וכופלים.':'נתון <b>הסה״כ</b> ← 🟧 חלוקה: מחברים חלקים ומחלקים.'],rule:'צד אחד ← הרחבה. סה״כ ← חלוקה.',
  diag:()=>isE?'המספר המסומן שייך ל<b>צד אחד</b> בלבד, ואין סה״כ ← הרחבה.':'המספר המסומן הוא <b>הכול</b> (ביחד / היקף / סכום הזוויות) ← חלוקה ביחס.'};}
/* ===== חימום ===== */
function genWarm(t){
 if(t==='c'){const [a,b]=pick([[1,2],[2,3],[3,4],[2,5],[1,3],[3,5],[4,5]]);
  return {kind:'חימום · כמה חלקים?',rc:2,text:`היחס הוא ${M(a+' : '+b)}. כמה חלקים יש בסך הכול?`,ans:[{label:'חלקים',col:PU,val:a+b}],lines:[`${M(a+' + '+b+' = '+(a+b))} חלקים`],rule:'מספר החלקים = מחברים את מספרי היחס.',
   work:[{t:M(a+' + '+b+' = ?'),ans:[{label:'',val:a+b}],why:'את החלקים <b>מחברים</b>.'}],diag:({vals:[x]})=>x===a*b?'<b>כפלתם</b>. את החלקים <b>מחברים</b>.':null};}
 if(t==='a'){const n=R(3,7),k=R(2,8),T=n*k;
  return {kind:'חימום · חלק אחד',rc:2,text:`${M(T)} עוגיות מתחלקות ל־${M(n)} חלקים שווים. כמה עוגיות בחלק אחד?`,ans:[{label:'בחלק אחד',col:COL[1],val:k}],lines:[M(T+' : '+n+' = '+k)],rule:'חלק אחד = סה״כ : מספר החלקים.',
   work:[{t:M(T+' : '+n+' = ?'),ans:[{label:'',val:k}],why:`${M(n)} כפול כמה נותן ${M(T)}?`}],diag:({vals:[x]})=>x===T*n?'<b>כפלתם</b>. מחלקים.':null};}
 const a=R(1,4),k=R(2,8);
 return {kind:'חימום · פי כמה?',rc:1,text:`ביחס כתוב ${M(a)} חלקים, ובאמת יש ${M(a*k)}. פי כמה זה גדל?`,ans:[{label:'פי',col:'#ff6b6b',val:k}],lines:[M(a*k+' : '+a+' = '+k)],rule:'פי כמה = באמת : חלקים.',
  work:[{t:M(a*k+' : '+a+' = ?'),ans:[{label:'פי',val:k}],why:'"פי כמה" ← מחלקים.'}],diag:({vals:[x]})=>x===a*k-a?'<b>חיסרתם</b>. "פי כמה" ← מחלקים.':null};}
/* ===== אחוזים: אותו רעיון! שבר מתוך 100 ===== */
const PW=[[400,20],[300,10],[500,20],[200,25],[800,25],[600,30],[1000,40],[120,25],[80,25],[250,20],[60,50],[150,20],[900,10],[700,30],[400,75]];
const pTB=(rows,hl,note)=>`<div class="tbw">${TB([{h:'השלם',c:PU},{h:'החלק היחסי (שבר)',c:'#f3f6fb'},{h:'החלק המבוקש',c:GR}],rows,0,0,hl)}${hl&&note?`<div class="say">${note}</div>`:''}</div>`;
function pPart(){const [W,p]=pick(PW),v=W*p/100,it=pick(['תלמידים','ש״ח','עמודים','עציצים']);
 return {kind:'💯 אחוזים · השלם ידוע',rc:7,text:`${HL('בסך הכול '+M(W)+' '+it)}. כמה הם ${M(p+'%')} מהם?`,ans:[{label:it,col:GR,val:v}],
  dia:hl=>pTB([{l:M(p+'%'),c:[[W,0],[FRr(p,100),1],[`${W} · ${FRr(p,100)} = ${v}`,2,true]]}],hl,'השלם ידוע ← <b>כפל</b>: שלם · שבר. בדיוק כמו ביחס!'),
  crack:[CK('🟦 הרחבה או 🟧 חלוקה?',[TE,TD],TD,`נתון <b>השלם</b> (${M(W)}) ← כמו חלוקה ביחס: שלם · שבר.`),CK(`איך כותבים ${M(p+'%')} כשבר?`,[FRr(p,100),FRr(p,10),FRr(1,p)],FRr(p,100),'אחוז = חלק מתוך <b>100</b> ← המכנה תמיד 100.')],
  work:[{t:`${M(p+'%')} כשבר: המכנה = ?`,ans:[{label:'',val:100}],why:'אחוז = מתוך <b>100</b>. ביחס המכנה = כל החלקים, באחוזים = 100.'},{t:`${M(W+' : 100 = ?')} (אחוז אחד)`,ans:[{label:'',val:W/100}],why:'כופלים בשבר = מחלקים במכנה, ואז כופלים במונה.'},{t:M(W/100+' · '+p+' = ?'),ans:[{label:'',val:v}],why:`אחוז אחד · ${p}.`}],
  lines:[`${M(p+'%')} = ${FRr(p,100)} ← השלם ידוע ← כפל`,`${M(W)} · ${FRr(p,100)} = ${M(v)}`],rule:'אחוז = שבר מתוך 100. השלם ידוע ← שלם · שבר.',trick:'אחוז זה שבר שהמכנה שלו 100.',
  diag:({vals:[x]})=>x===W-p?'<b>חיסרתם</b>. אחוז הוא שבר ← כופלים: '+M(W)+' · '+FRr(p,100)+'.':x===W*p?'שכחתם לחלק ב־100 (המכנה).':x===W/100?'זה אחוז <b>אחד</b>. עכשיו · '+M(p)+'.':null};}
function pRemain(){const [W,p]=pick(PW),q=100-p,v=W*q/100;
 return {kind:'💯 אחוזים · מה נשאר?',rc:7,text:`מחיר מעיל ${HL(M(W)+' ש״ח')}. יש הנחה של ${M(p+'%')}. כמה משלמים?`,ans:[{label:'ש״ח',col:GR,val:v}],
  dia:hl=>pTB([{l:'משלמים',c:[[W,0],[FRr(`100 − ${p} = ${q}`,100),1],[`${W} · ${FRr(q,100)} = ${v}`,2,true]]}],hl,`הנחה ${p}% ← משלמים מה שנשאר: ${q}%`),
  crack:[CK('כמה אחוזים משלמים?',[M(q+'%'),M(p+'%'),M('100%')],M(q+'%'),`ההנחה ${M(p+'%')} יורדת ← נשאר ${M('100 − '+p+' = '+q)}%.`)],
  work:[{t:`נשאר: ${M('100 − '+p+' = ?')} %`,ans:[{label:'%',val:q}],why:'השלם = 100%. מורידים את ההנחה.'},{t:M(W+' : 100 = ?'),ans:[{label:'',val:W/100}],why:'אחוז אחד = השלם : 100.'},{t:M(W/100+' · '+q+' = ?'),ans:[{label:'',val:v}],why:`אחוז אחד · ${q}.`}],
  lines:[`משלמים ${M('100% − '+p+'% = '+q+'%')}`,`${M(W)} · ${FRr(q,100)} = ${M(v)} ש״ח`],rule:'מה נשאר? 100% פחות ההנחה ← שלם · שבר.',trick:'ההנחה היא לא מה שמשלמים!',
  diag:({vals:[x]})=>x===W*p/100?`זו <b>ההנחה</b> (${M(p+'%')}). משלמים את מה שנשאר: ${M(q+'%')}.`:x===W-p?`הורדתם ${M(p)} ש״ח. ההנחה היא ${M(p)} <b>אחוז</b>, לא שקלים.`:null};}
function pWhole(){const [W,p]=pick(PW),v=W*p/100;
 return {kind:'💯 אחוזים · השלם חסר',rc:7,text:`${HL(M(v)+' תלמידים')} הם ${M(p+'%')} מכל תלמידי השכבה. כמה תלמידים בשכבה (השלם)?`,ans:[{label:'תלמידים',col:PU,val:W}],
  dia:hl=>pTB([{l:'שכבה',c:[[`${v} : ${FRr(p,100)} = ${W}`,2,true],[FRr(p,100),1],[v,0]]}],hl,'השלם חסר ← <b>חילוק</b>: חלק : שבר. כמו ביחס!'),
  work:[{t:`אחוז אחד: ${M(v+' : '+p+' = ?')}`,ans:[{label:'',val:W/100}],why:`${M(v)} הם ${M(p)} אחוזים ← מחלקים ב־${M(p)} ← אחוז אחד.`},{t:`השלם = 100%: ${M(W/100+' · 100 = ?')}`,ans:[{label:'',val:W}],why:'השלם הוא 100 אחוזים.'}],
  lines:[`השלם חסר ← חילוק: ${M(v)} : ${FRr(p,100)}`,`${M(v+' : '+p+' = '+W/100)} (אחוז אחד) ← ${M(W/100+' · 100 = '+W)}`],rule:'השלם חסר ← חלק : שבר.',trick:'כאן לא כופלים! השלם חסר ← מחלקים.',
  diag:({vals:[x]})=>x===v*p/100?'כפלתם. אבל כאן <b>השלם חסר</b> ← מחלקים: '+M(v)+' : '+FRr(p,100)+'.':x===v/100*p?'הפוך! השלם חסר ← חלק : שבר.':null};}
function pLink(){const [a,b]=pick([[1,4],[1,3],[1,1],[3,1],[2,3],[3,2],[1,9],[3,7],[2,8]].filter(([a,b])=>100%(a+b)===0||(a+b)===4)),S=a+b,pc=a*100/S;
 return {kind:'💯 יחס ← אחוזים',rc:7,text:`מחלקים ממתקים בין ${C2('דנה',0)} ל${C2('נועם',1)} ביחס ${M(a+' : '+b)}. כמה <b>אחוזים</b> מהממתקים מקבלת דנה?`,ans:[{label:'%',col:COL[0],val:pc}],
  dia:hl=>pTB([{l:C2('דנה',0),c:[[M('100%'),0],[FRr(a,S),1],[`${FRr(a,S)} = ${FRr(pc,100)} = ${pc}%`,2,true]]}],hl,'שבר של יחס ← מרחיבים למכנה 100 ← אחוז!'),
  work:[{t:`החלק של דנה כשבר: המכנה = ${M(a+' + '+b+' = ?')}`,ans:[{label:'',val:S}],why:'המכנה = כל החלקים של היחס.'},{t:`גורם ההרחבה ל־100: ${M('100 : '+S+' = ?')}`,ans:[{label:'',val:100/S}],why:'אחוז = שבר שהמכנה שלו 100. בכמה כופלים את המכנה כדי לקבל 100?'},{t:M(a+' · '+100/S+' = ?')+' %',ans:[{label:'%',val:pc}],why:'כופלים גם את המונה באותו גורם.'}],
  lines:[`דנה: ${FRr(a,S)} מהממתקים`,`מרחיבים פי ${M(100/S)}: ${FRr(a,S)} = ${FRr(pc,100)} = ${M(pc+'%')}`],rule:'יחס ← שבר (המכנה = כל החלקים) ← מרחיבים ל־100 ← אחוז.',trick:'יחס ואחוז הם אותו רעיון: חלק מתוך השלם.',
  diag:({vals:[x]})=>x===a*100/b?'השוויתם את דנה ל<b>נועם</b>. אחוז הוא מתוך <b>כל</b> הממתקים: '+FRr(a,S)+'.':x===a?'זה מספר החלקים. אחוז = מתוך 100: מרחיבים את '+FRr(a,S)+'.':null};}
/* ===== שלבים ===== */
const eOrD=()=>Math.random()<.5?eSimple(false):dTwo();
const LEVELS=[
 {n:1,t:'מזהים: הרחבה או חלוקה?',d:'מזהים סוג ← הרחבה פשוטה ← חלוקה לשניים',ladder:[{g:gType,n:5,h:2},{g:()=>eSimple(false),n:5,h:2},{g:dTwo,n:5,h:2},{g:eOrD,n:2,h:1},{g:pPart,n:3,h:2}]},
 {n:2,t:'משולשים, זווית ומשוואה',d:'משולשים (x) ← זווית מחולקת ← x = חלק אחד',ladder:[{g:eTri,n:5,h:1},{g:dAngle,n:4,h:1},{g:dPrice,n:4,h:1},{g:()=>eSimple(true),n:2,h:1},{g:eWhole,n:3,h:0},{g:pRemain,n:2,h:1}]},
 {n:3,t:'הסה״כ מוסתר',d:'היקף מלבן ← 3 חלקים ← זוויות במשולש ← נימוק',ladder:[{g:dRect,n:5,h:1},{g:dThree,n:4,h:1},{g:dTriAng,n:4,h:1},{g:dFloor,n:3,h:0},{g:eCoef,n:1,h:0},{g:eBig,n:1,h:0},{g:pWhole,n:2,h:0}]},
 {n:4,t:'חשיבה ואוריינות',d:'מרובע ← נכון או לא? ← חלק מול כולל ← קנייה',ladder:[{g:dQuad,n:4,h:1},{g:dClaim,n:4,h:0},{g:dTF,n:4,h:0},{g:dPW,n:3,h:0},{g:dSalad,n:2,h:0},{g:pLink,n:3,h:0}]}];
LEVELS.forEach(l=>l.g=()=>pick(l.ladder).g());
const TEST=[[gType,()=>eSimple(false),dTwo,pPart],[eTri,dAngle,eWhole,pRemain],[dRect,dThree,dTriAng,pWhole],[dQuad,dClaim,dSalad,pLink]];
const WARM=['c','a','b','c','a','b','a','b'].map(t=>()=>genWarm(t));
/* ===== הסבר מונפש: למה זה נכון ===== */
const sq=(n,col,o={})=>Array.from({length:n},(_,i)=>`<span class="c rv" style="background:${col};--d:${(o.d||0)+i*(o.st||.2)}s">${o.t!=null?o.t:''}</span>`).join('');
const grpE=(i)=>`<div class="grp rv" style="--d:${.4+i*.7}s"><div class="sq sm">${sq(1,COL[0],{d:.4+i*.7})}<span style="width:6px"></span>${sq(5,COL[1],{d:.5+i*.7,st:.05})}</div></div>`;
const RECAP=[
 {h:'למה צריך את זה?',d:1.6,svg:()=>`<div class="row"><div class="grp" style="color:${COL[0]}">סוכר<div class="sq">${sq(1,COL[0])}</div></div><div class="grp rv" style="--d:.5s;font:900 34px Rubik">:</div><div class="grp" style="color:${COL[1]}">קקאו<div class="sq">${sq(5,COL[1],{d:.7})}</div></div></div>`,
  says:['אדיר רוצה עוגייה <b>גדולה</b>, באותו טעם.','כמה קקאו לשים? ← יחס!'],what:'יחס שומר על אותו טעם.'},
 {h:'🟦 הרחבה: פי כמה?',d:3.4,svg:()=>`<div class="row" style="gap:10px">${[0,1,2,3].map(grpE).join('')}</div>`,
  says:[`${M('1 : 5')} ← ${C2('4 כפיות סוכר',0)} = פי ${M('4')}`,`קקאו: ${C2(M('5 · 4 = 20'),1)}`],def:'נתון צד אחד ← מוצאים פי כמה ← כופלים.',what:'הרחבה: כל הקבוצה משוכפלת.'},
 {h:'🟧 חלוקה ביחס',d:3,svg:()=>`<div class="say rv">${M('28')} עוגיות ← ${M('3 + 4 = 7')} קופסאות</div><div class="sq">${sq(3,COL[0],{d:.6,t:'4',st:.3})}<span style="width:12px"></span>${sq(4,COL[1],{d:1.6,t:'4',st:.3})}</div>`,
  says:[`${M('28 : 7 = 4')} בכל קופסה`,`${C2(M('3 · 4 = 12'),0)} · ${C2(M('4 · 4 = 16'),1)}`],def:'נתון הסה״כ ← מחברים חלקים ← מחלקים ← כופלים.',what:'חלוקה: הסה״כ נכנס לקופסאות.'},
 {h:'איך יודעים איזו?',d:.8,svg:()=>`<div class="row"><div class="tag tE rv" style="--d:.2s">🟦 נתון צד אחד ← הרחבה</div><div class="tag tD rv" style="--d:.7s">🟧 נתון הסה״כ ← חלוקה</div></div>`,
  says:[`מילים של סה״כ: ${HL('ביחד')} ${HL('מחלקים')} ${HL('היקף')} ${HL('משולש')}`],what:'שואלים: מה המספר הנתון?'},
 {h:'הטבלה: שלם · שבר',d:2,svg:()=>TB([{h:'השלם',c:PU},{h:'החלק היחסי (שבר)',c:'#f3f6fb'},{h:'החלק המבוקש',c:GR}],[{l:C2('א׳',0),c:[[28,0],[FRr(3,7),1],[`28 · ${FRr(3,7)} = 12`,2]]},{l:C2('ב׳',1),c:[[28,0],[FRr(4,7),1],[`28 · ${FRr(4,7)} = 16`,2]]}],0,0,true),
  says:['השלם ידוע ← <b>כפל</b>. השלם חסר ← <b>חילוק</b>.'],def:'המכנה = כל החלקים: 3 + 4 = 7',what:'שלם · שבר = החלק.'},
 {h:'🟦 גורם ההרחבה',d:1.6,svg:()=>TB([{h:'היחס כשבר',c:'#f3f6fb'},{h:'גורם ההרחבה',c:'#ff6b6b'},{h:'אחרי ההרחבה',c:GR}],[{l:'סוכר<br>────<br>קקאו',c:[[FRr(1,5),0],['· 4',1],[FRr(4,20),2]]}],-1,0,true),
  says:[`${M('4 : 1 = 4')} ← כופלים <b>גם</b> את ה־${M('5')}`],what:'מונה ומכנה ← אותו מספר.'},
 {h:'⚠️ הסה״כ מוסתר',d:.6,svg:()=>`<div class="row"><div class="tag tD rv" style="--d:.1s">היקף ← חצי היקף</div><div class="tag tD rv" style="--d:.5s">משולש ← 180°</div><div class="tag tD rv" style="--d:.9s">מרובע ← 360°</div></div>`,
  says:['לפעמים הסה״כ לא כתוב במספר.'],what:'קודם מוצאים את הסה״כ.'},
 {h:'💯 אחוז = אותו רעיון!',d:2.4,svg:()=>TB([{h:'השלם',c:PU},{h:'החלק היחסי (שבר)',c:'#f3f6fb'},{h:'החלק המבוקש',c:GR}],[{l:'יחס',c:[[28,0],[FRr(3,7),1],[`28 · ${FRr(3,7)} = 12`,2]]},{l:'אחוז',c:[[400,0],[FRr(20,100),1],[`400 · ${FRr(20,100)} = 80`,2]]}],0,0,true),
  says:['ביחס המכנה = כל החלקים. באחוזים = 100.'],def:'אותה טבלה, אותו כלל: שלם · שבר = החלק.',what:'אחוז = שבר מתוך 100.'},
 {h:'הטעויות הנפוצות',d:.4,says:[`${M('28')} ביחס ${M('3 : 4')} ← ${M('14')} ו־${M('14')} <span class="x">✗</span> נכון: ${M('12')} ו־${M('16')} <span class="v">✓</span>`,`${M('1 : 5')}, סוכר ${M('4')} ← קקאו ${M('8')} <span class="x">✗</span> נכון: ${M('20')} <span class="v">✓</span>`],what:'חלוקה: לא שווה. הרחבה: לא מוסיפים.'}];
RECAP[0].chk=[()=>eSimple(false),gType];RECAP[1].chk=[()=>eSimple(false),()=>genWarm('b')];RECAP[2].chk=[dTwo,()=>genWarm('a')];RECAP[3].chk=[gType];
RECAP[4].chk=[dTwo,eWhole];RECAP[5].chk=[()=>eSimple(false),()=>eSimple(true)];RECAP[6].chk=[dRect,dTriAng];RECAP[7].chk=[pPart,pRemain];RECAP[8].chk=[dTwo,()=>eSimple(false)];
