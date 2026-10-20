// TITLE: ח׳ א2 · יחס | פרופורציה | קנה מידה
// BAR: ח׳ א2 · שבוע יחס, פרופורציה וקנה מידה · משבצת ח׳ חלק א׳
const AC=t=>`<span style="color:${C.acc};font-weight:700">${t}</span>`;   // דנה / חלק ראשון
const BL=t=>`<span style="color:${C.ray};font-weight:700">${t}</span>`;   // נועם / חלק שני
const PU=t=>`<span style="color:#c084fc;font-weight:700">${t}</span>`;    // שלם
const GR=t=>`<span style="color:${C.ok};font-weight:700">${t}</span>`;    // מה שחישבנו
const RD=t=>`<span style="color:${C.ray2};font-weight:700">${t}</span>`;  // טעות
const RULE=t=>`<div class="rule step"><b>זוכרים:</b> ${t}</div>`;
const W=(n,t,o)=>`<div class="card what step" data-o="${o}"><b>מה עשינו? שלב ${n}:</b> ${t}</div>`;
const RULE0=t=>`<div class="rule"><b>זוכרים:</b> ${t}</div>`;
const RCSS=`<style>
.rule{background:#ffb020;color:#1b1300;border-radius:1.2cqw;padding:1.1cqw 1.8cqw;font-size:2.15cqw;font-weight:700;line-height:1.4}
.rule b{font-family:var(--display);font-weight:900}
.q{background:var(--chip);border:1px solid var(--line);border-radius:1.2cqw;padding:1.2cqw 1.8cqw;font-size:2.4cqw;line-height:1.5}
.hl{background:#ffb02033;border-bottom:.3cqw solid var(--accent);padding:0 .3cqw;border-radius:.3cqw}
.at{border-collapse:separate;border-spacing:0;font-family:var(--display);font-weight:700;margin-inline:auto}
.at th,.at td{border:.18cqw solid var(--line);padding:.7cqw 2cqw;text-align:center;font-size:2.9cqw;min-width:9cqw;height:4.6cqw}
.at th{background:var(--chip);font-size:2.3cqw}
.at td.lab{font-size:1.9cqw;color:var(--muted);min-width:0;font-weight:500}
.at .giv{background:#ffb02040;color:#ffd27a}
.at .anc{box-shadow:inset 0 0 0 .45cqw var(--ok)}
.at .calc{color:var(--ok)}
.pair{display:flex;gap:2cqw;align-items:center}
.ex{display:flex;flex-direction:column;gap:1.3cqw;flex:1;min-height:0}
.small{font-size:1.8cqw}
.pair{align-items:flex-start}.pair .what{font-size:1.55cqw;padding:.7cqw 1.2cqw}.pair .ex{gap:1cqw}
.at.sm th,.at.sm td{font-size:2.3cqw;padding:.5cqw 1.2cqw;min-width:6.5cqw;height:3.8cqw}.at.sm th{font-size:1.9cqw}
span[dir=ltr]{white-space:nowrap}
</style>`;
// טבלת עוגן. cols: [{h,col}] ; r,q: מערכי תאים. תא = '' | 'טקסט' | {v,g:נתון,c:מחושב(שלב)} ; anc = אינדקס עמודת העוגן
function TBL(cols,r,q,anc=-1,cls=''){
  const L=v=>`<span dir="ltr" style="unicode-bidi:isolate;white-space:nowrap">${v}</span>`;
  const cell=(x,i)=>{const a=i===anc?' anc':'';
    if(x==null||x==='')return `<td class="${a}"></td>`;
    if(typeof x==='string')return `<td class="${a}">${x}</td>`;
    if(x.g)return `<td class="giv${a}">${L(x.v)}</td>`;
    return `<td class="${a}"><span class="step calc"${x.o?` data-o="${x.o}"`:''}>${L(x.v)}</span></td>`;};
  return `<table class="at ${cls}" dir="rtl"><tr><th style="background:none;border:none"></th>${cols.map((c,i)=>`<th class="${i===anc?'anc':''}" style="color:${c.col}">${c.h}</th>`).join('')}</tr>
  <tr><td class="lab">יחס (חלקים)</td>${r.map(cell).join('')}</tr>
  <tr><td class="lab">כמות</td>${q.map(cell).join('')}</tr></table>`;}
// פסים: חלקים של דנה (מימין) ונועם (משמאל). o.inner = מספר בתוך כל ריבוע, o.step = כל קבוצה בשלב
function bars(nd,nn,o={}){const u=o.u||74,h=70,gap=46,W=(nd+nn)*u+gap+20;let g='';
  const grp=(n,x0,col,name,cls)=>{let s=`<g class="${cls}">`;for(let i=0;i<n;i++){s+=`<rect x="${x0+i*u}" y="40" width="${u-8}" height="${h}" rx="10" fill="${col}" fill-opacity=".9"/>`;
    if(o.inner)s+=`<text x="${x0+i*u+(u-8)/2}" y="${40+h/2+11}" font-size="30" text-anchor="middle" style="fill:#13233a;font-weight:900">${o.inner}</text>`;}
    s+=`<text x="${x0+(n*u-8)/2}" y="26" font-size="26" text-anchor="middle" style="fill:${col};font-weight:700">${name}</text>`;
    if(o.tot)s+=`<text x="${x0+(n*u-8)/2}" y="${40+h+40}" font-size="30" text-anchor="middle" style="fill:${col};font-weight:900" direction="ltr">${o.tot[name]}</text>`;
    return s+'</g>';};
  g+=grp(nn,10,C.ray,o.n2||'נועם',o.step?'step':'');
  g+=grp(nd,10+nn*u+gap,C.acc,o.n1||'דנה',o.step?'step':'');
  return svg(`0 0 ${W} ${o.tot?170:130}`,g);}
// מדבקות: 7 קופסאות, בכל אחת 5 עיגולים
function stickers(){const u=96,gap=40;let g='';
  const box=(x,col)=>{let s=`<rect x="${x}" y="50" width="${u-12}" height="104" rx="12" fill="none" stroke="${col}" stroke-width="4"/>`;return s;};
  const dots=(x,col)=>{let s='';const P=[[22,30],[42,30],[62,30],[32,62],[52,62]];P.forEach(([dx,dy])=>s+=`<circle cx="${x+dx}" cy="${50+dy+6}" r="10" fill="${col}"/>`);return s;};
  let bx='',dt='';
  for(let i=0;i<4;i++){bx+=box(10+i*u,C.ray);dt+=dots(10+i*u,C.ray);}
  for(let i=0;i<3;i++){const x=10+4*u+gap+i*u;bx+=box(x,C.acc);dt+=dots(x,C.acc);}
  g+=`<text x="${10+2*u-6}" y="32" font-size="26" text-anchor="middle" style="fill:${C.ray};font-weight:700">נועם · 4 חלקים</text>`;
  g+=`<text x="${10+4*u+gap+1.5*u-6}" y="32" font-size="26" text-anchor="middle" style="fill:${C.acc};font-weight:700">דנה · 3 חלקים</text>`;
  g+=`<g>${bx}</g><g class="step">${dt}</g>`;
  g+=`<g class="step"><text x="${10+2*u-6}" y="200" font-size="34" text-anchor="middle" direction="ltr" style="fill:${C.ray};font-weight:900">4 · 5 = 20</text><text x="${10+4*u+gap+1.5*u-6}" y="200" font-size="34" text-anchor="middle" direction="ltr" style="fill:${C.acc};font-weight:900">3 · 5 = 15</text></g>`;
  return svg(`0 0 ${10+7*u+gap+10} 215`,g);}
const rect=svg('0 0 560 260',`<g class="step"><rect x="110" y="60" width="360" height="120" fill="none" stroke="${C.ink}" stroke-width="3"/>
<line x1="110" y1="60" x2="470" y2="60" stroke="${C.acc}" stroke-width="8"/><line x1="470" y1="60" x2="470" y2="180" stroke="${C.ray}" stroke-width="8"/>
<text x="290" y="42" font-size="26" text-anchor="middle" style="fill:${C.acc};font-weight:700">אורך · 3 חלקים</text>
<text x="520" y="128" font-size="26" text-anchor="middle" style="fill:${C.ray};font-weight:700">רוחב</text><text x="520" y="158" font-size="22" text-anchor="middle" style="fill:${C.ray}">חלק 1</text></g>
<g class="step"><text x="290" y="230" font-size="26" text-anchor="middle" style="fill:#c084fc;font-weight:700">אורך + רוחב = חצי היקף = 20</text></g>`);

const SLIDES=[
menu('ח׳ א2 · השבוע',[{id:'l1',n:1,t:'יחס: חלקים שווים וטבלת העוגן',d:'שיעור 45 דק׳'},{id:'l2',n:2,t:'פרופורציה: שני יחסים שווים',d:'שיעור 45 דק׳'},{id:'l3',n:3,t:'קנה מידה: שרטוט ומציאות',d:'שיעור 45 דק׳'}]),

cover('l1',1,'יחס = חלקים שווים','משבצת ח׳ · חלק א׳','טבלה אחת שפותרת כל שאלת יחס: <b>טבלת העוגן</b>'),

{html:RCSS+`<div class="eyebrow">כרטיס כניסה · 5 דקות</div><h2>מחממים את המוח</h2>
<ol>
<li>${eq('35 : 7 =')} <span class="ans step">${eq('5')}</span></li>
<li>${eq('5 · 3 =')} <span class="ans step">${eq('15')}</span></li>
<li>צמצמו את השבר ${eq('12/18')} <span class="ans step">${eq('2/3')}</span> (מחלקים מונה ומכנה ב־6)</li>
<li>בחוג 3 בנים ו־4 בנות. כמה ילדים בסך הכול? <span class="ans step">7</span></li>
</ol>`},

{html:RCSS+`<div class="eyebrow">למה צריך את זה?</div><h2>הלימונדה של סבתא</h2>
<div class="row"><div class="col">
<p class="q">במתכון: לכל ${AC('כוס סירופ')} שמים ${BL('4 כוסות מים')}.</p>
<p class="step">אם נשים יותר מים, הלימונדה תהיה תפלה. אם נשים פחות מים, היא תהיה מתוקה מדי.</p>
<p class="step"><b>היחס שומר על הטעם.</b> הוא אומר כמה חלקים מכל דבר.</p>
<p class="step q">רוצים 15 כוסות לימונדה. כמה כוסות סירופ צריך? <span class="muted">בסוף השיעור תדעו!</span></p>
</div><div class="vis">${bars(1,4,{n1:'סירופ',n2:'מים'})}</div></div>`},

{html:`<div class="eyebrow">מטרות השיעור</div><h1>היום נדע…</h1>
<ol>
<li class="step">לקרוא יחס כמו ${eq('3 : 4')} בתור <b>חלקים שווים</b></li>
<li class="step">לבנות <b>טבלת עוגן</b> ולמצוא את <b>חלק אחד</b></li>
<li class="step">למצוא <b>חלק</b>, <b>שלם</b> ו<b>יחס</b>, בכל המצבים</li>
<li class="step">לבדוק את התשובה בשתי דרכים</li>
</ol>`},

{html:`<div class="eyebrow">מסלול השיעור</div><h2>מה עושים היום בכיתה</h2>
<div class="grid2">
<div class="card">כרטיס כניסה · 5 דק׳</div><div class="card">פותרים יחד שאלה אחת לאט · 12 דק׳</div>
<div class="card">כל המצבים בדוגמאות ★ עד ★★★★ · 10 דק׳</div><div class="card">דף עבודה: שאלות תאומות · 13 דק׳</div>
<div class="card">כרטיס יציאה · 5 דק׳</div>
</div>`},

{html:RCSS+`<div class="eyebrow">הרעיון המרכזי</div><h2>מה אומר היחס ${eq('3 : 4')}?</h2>
<div class="vis" style="flex:0">${bars(3,4,{step:true})}</div>
<p class="step">לכל ${AC('3 חלקים')} של דנה יש ${BL('4 חלקים')} של נועם. <b>כל החלקים שווים בגודלם.</b></p>
${RULE('יחס אומר <b>כמה חלקים</b> יש לכל אחד, ולא כמה דברים. 3 זה לא 3 מדבקות!')}`},

{html:RCSS+`<div class="eyebrow">פותרים יחד · שלב 1 מתוך 5</div><h2>קוראים ומסמנים</h2>
<p class="q">דנה ונועם מתחלקים ב־<span class="hl">${PU('35')} מדבקות</span> <span class="hl">ביחס ${eq(AC('3')+' : '+BL('4'))}</span> (דנה : נועם). כמה מדבקות מקבל כל אחד?</p>
<p class="step">${PU('35')} = <b>השלם</b>, כל המדבקות ביחד.</p>
<p class="step">${eq(AC('3')+' : '+BL('4'))} = <b>היחס</b>. הסדר חשוב: ${AC('דנה')} ראשונה, ${BL('נועם')} שני.</p>
${RULE('בכל שאלת יחס מחפשים שני דברים: <b>את היחס</b>, ו<b>כמות אחת שידועה</b>.')}`},

{html:RCSS+`<div class="eyebrow">פותרים יחד · שלב 2 מתוך 5</div><h2>כמה חלקים יש בסך הכול?</h2>
<div class="vis" style="flex:0">${bars(3,4,{step:true})}</div>
<p class="step" style="text-align:center;font-size:3cqw">${eq(AC('3')+' + '+BL('4')+' = '+PU('7'))} חלקים = ${PU('35')} מדבקות</p>
${RULE('<b>השלם = סכום כל החלקים.</b>')}`},

{html:RCSS+`<div class="eyebrow">פותרים יחד · שלב 3 מתוך 5</div><h2>בונים את טבלת העוגן</h2>
${TBL([{h:'דנה',col:C.acc},{h:'נועם',col:C.ray},{h:'שלם',col:'#c084fc'}],[{v:'3',g:1},{v:'4',g:1},{v:'7',c:1}],['','',{v:'35',g:1}],2)}
<p class="step">בצהוב: מה שנתון בשאלה. בעמודת ה${PU('שלם')} ידועים <b>גם החלקים וגם הכמות</b>.</p>
${RULE('<b>עמודת העוגן</b> = העמודה שבה ידועים גם היחס וגם הכמות. מסמנים אותה במסגרת ירוקה.')}`},

{html:RCSS+`<div class="eyebrow">פותרים יחד · שלב 4 מתוך 5</div><h2>מוצאים חלק אחד</h2>
<p style="text-align:center;font-size:3.2cqw;font-family:var(--display);font-weight:900">${eq(PU('35')+' : '+PU('7')+' = '+GR('5'))}</p>
<div class="vis" style="flex:0">${stickers()}</div>
${RULE('<b>חלק אחד</b> = הכמות בעוגן חלקי מספר החלקים בעוגן.')}`},

{html:RCSS+`<div class="eyebrow">פותרים יחד · שלב 5 מתוך 5</div><h2>ממלאים את הטבלה ובודקים</h2>
${TBL([{h:'דנה',col:C.acc},{h:'נועם',col:C.ray},{h:'שלם',col:'#c084fc'}],[{v:'3',g:1},{v:'4',g:1},'7'],[{v:'3 · 5 = 15',c:1},{v:'4 · 5 = 20',c:1},{v:'35',g:1}],2)}
<p class="step"><b>בדיקה 1:</b> ${eq('15 + 20 = 35')} ${GR('✓')} &nbsp; <b>בדיקה 2:</b> ${eq('15 : 20 = 3 : 4')} (מצמצמים ב־5) ${GR('✓')}</p>
<p class="step"><b>תשובה:</b> דנה מקבלת ${AC('15')} מדבקות, ונועם מקבל ${BL('20')} מדבקות.</p>
${RULE('בודקים תמיד: הסכום שווה לשלם, והצמצום מחזיר ליחס.')}`},

{html:RCSS+`<div class="eyebrow">הטעות הנפוצה</div><h2>חילקו לשני אנשים, לא ל־7 חלקים</h2>
<p class="q">${RD('✗')} ${eq('35 : 2 = 17.5')}, ולכן כל אחד מקבל 17.5</p>
<p class="step">אבל אז היחס הוא ${eq('1 : 1')}, ולא ${eq('3 : 4')}! מחלקים ב<b>מספר החלקים</b> (7), לא במספר האנשים (2).</p>
<p class="q step">${RD('✗')} דנה מקבלת 3 מדבקות ונועם מקבל 4.</p>
<p class="step">3 ו־4 הם <b>חלקים</b>, לא מדבקות. ${eq('3 + 4 = 7')}, ולא 35.</p>
${RULE('כמות ≠ חלקים. תמיד בונים טבלה עם שתי שורות: <b>יחס</b> ו<b>כמות</b>.')}`},

{html:RCSS+`<div class="eyebrow">כל המצבים</div><h2>הטבלה מצילה תמיד: מה נתון? שם העוגן</h2>
<div class="grid2">
<div class="card step"><b>נתון השלם</b> ← העוגן בעמודת ה${PU('שלם')}<br><span class="small muted">35 מדבקות ביחס 3:4</span></div>
<div class="card step"><b>נתון חלק אחד</b> ← העוגן בעמודה של אותו חלק<br><span class="small muted">12 בנים, היחס 2:3</span></div>
<div class="card step"><b>נתון ההפרש</b> ← מוסיפים עמודת <b>הפרש</b>, והיא העוגן<br><span class="small muted">יש 10 אדומים יותר מכחולים</span></div>
<div class="card step"><b>נתונות שתי כמויות</b> ← מוצאים את <b>היחס</b>: מצמצמים<br><span class="small muted">12 בנים ו־18 בנות</span></div>
</div>
${RULE('שואלים: איפה ידועים <b>גם היחס וגם הכמות</b>? זה העוגן.')}`},

{html:RCSS+`<div class="lvl">${stars(1)} ידע · מוצאים את היחס</div><h2>בכיתה 12 בנים ו־18 בנות. מה היחס בין מספר הבנים למספר הבנות?</h2>
<div class="pair"><div class="ex">
${TBL([{h:'בנים',col:C.acc},{h:'בנות',col:C.ray}],[{v:'2',c:1,o:3},{v:'3',c:1,o:3}],[{v:'12',g:1},{v:'18',g:1}])}
<p class="step" data-o="3" style="text-align:center;font-size:2.8cqw">${eq('12 : 18 = '+GR('2 : 3'))}</p></div>
<div class="ex">${W(1,'כותבים את הכמויות לפי הסדר: קודם בנים, אחר כך בנות.',1)}${W(2,'מחלקים את שתיהן באותו מספר, 6, כדי לצמצם.',2)}${W(3,'היחס הוא '+eq('2 : 3')+': לכל 2 בנים יש 3 בנות.',4)}</div></div>`},

{html:RCSS+`<div class="lvl">${stars(2)} יישום · נתון חלק אחד</div><h2>היחס בין בנים לבנות בכיתה הוא ${eq('2 : 3')}. בכיתה 12 בנים. כמה בנות? כמה תלמידים בכיתה?</h2>
<div class="pair"><div class="ex">
${TBL([{h:'בנים',col:C.acc},{h:'בנות',col:C.ray},{h:'שלם',col:'#c084fc'}],[{v:'2',g:1},{v:'3',g:1},{v:'5',c:1,o:4}],[{v:'12',g:1},{v:'3 · 6 = 18',c:1,o:3},{v:'5 · 6 = 30',c:1,o:4}],0,'sm')}
</div>
<div class="ex">${W(1,'העוגן הוא עמודת ה'+AC('בנים')+': ידועים 2 חלקים וגם 12 בנים.',1)}${W(2,'חלק אחד: '+eq('12 : 2 = 6')+'. בנות: '+eq('3 · 6 = 18')+'.',2)}${W(3,'שלם: '+eq('2 + 3 = 5')+' חלקים, '+eq('5 · 6 = 30')+' תלמידים. בדיקה: '+eq('12 + 18 = 30')+' ✓',5)}</div></div>`},

{html:RCSS+`<div class="lvl">${stars(3)} הבנה · נתון ההפרש</div><h2>בקופסה כדורים אדומים וכחולים ביחס ${eq('5 : 3')}. יש 10 אדומים יותר מכחולים. כמה כדורים בקופסה?</h2>
<div class="pair"><div class="ex">
${TBL([{h:'אדומים',col:C.ray2},{h:'כחולים',col:C.ray},{h:'הפרש',col:C.acc},{h:'שלם',col:'#c084fc'}],[{v:'5',g:1},{v:'3',g:1},{v:'2',c:1,o:2},{v:'8',c:1,o:6}],[{v:'25',c:1,o:4},{v:'15',c:1,o:4},{v:'10',g:1},{v:'40',c:1,o:6}],2,'sm')}
</div>
<div class="ex">${W(1,'ההפרש בחלקים: '+eq('5 − 3 = 2')+'. ההפרש בכמות: 10. זה העוגן.',1)}${W(2,'חלק אחד: '+eq('10 : 2 = 5')+'. אדומים '+eq('5 · 5 = 25')+', כחולים '+eq('3 · 5 = 15')+'.',3)}${W(3,'בסך הכול '+eq('25 + 15 = 40')+'. בדיקה: '+eq('25 − 15 = 10')+' ✓',5)}</div></div>`},

{html:RCSS+`<div class="lvl">${stars(4)} חשיבה ואוריינות · מה השלם?</div><h2>היקף מלבן 40 ס״מ. היחס בין האורך לרוחב הוא ${eq('3 : 1')}. מה אורכי הצלעות?</h2>
<div class="pair"><div class="vis" style="flex:1">${rect}</div>
<div class="ex">${what(1,'במלבן יש 2 אורכים ו־2 רוחבים. <b>אורך + רוחב = חצי היקף</b> = '+eq('40 : 2 = 20')+'. זה השלם!')}${what(2,'חלקים: '+eq('3 + 1 = 4')+'. חלק אחד: '+eq('20 : 4 = 5')+'.')}${what(3,'אורך '+eq('3 · 5 = 15')+' ס״מ, רוחב 5 ס״מ. בדיקה: '+eq('15 + 5 + 15 + 5 = 40')+' ✓')}</div></div>`},

{html:RCSS+`<div class="eyebrow">הכלל · 4 צעדים</div><h2>טבלת העוגן</h2>
<ol>
<li class="step">בונים טבלה: שורת <b>יחס</b> ושורת <b>כמות</b>. ממלאים את הנתונים (בצהוב).</li>
<li class="step">מוצאים את <b>העוגן</b>: עמודה שבה ידועים גם היחס וגם הכמות.</li>
<li class="step"><b>חלק אחד</b> = כמות העוגן : חלקי העוגן.</li>
<li class="step">כופלים את החלק האחד בכל עמודה, ו<b>בודקים</b>.</li>
</ol>
<p class="step q">חוזרים ללימונדה: ${eq('1 + 4 = 5')} חלקים = 15 כוסות. חלק אחד = ${eq('15 : 5 = 3')}. כלומר ${AC('3 כוסות סירופ')} ו־${BL('12 כוסות מים')}.</p>`},

{html:RCSS+`<div class="eyebrow">עכשיו אתם · שאלה תאומה</div><h2>אותה שאלה, מספרים אחרים</h2>
<p class="q">מיכל ויונתן מתחלקים ב־48 קלפים ביחס ${eq('5 : 3')} (מיכל : יונתן). כמה קלפים מקבל כל אחד?</p>
${TBL([{h:'מיכל',col:C.acc},{h:'יונתן',col:C.ray},{h:'שלם',col:'#c084fc'}],['','',''],['','',''])}
<p class="muted">דף העבודה, שאלה 1. בונים טבלה, מוצאים עוגן וחלק אחד, ובודקים.</p>`},

{html:`<div class="eyebrow">עבודה בכיתה · 13 דקות</div><h2>דף העבודה: חלק א׳</h2>
<ul>
<li>שאלה 1: השאלה התאומה (נתון השלם)</li>
<li>שאלות 2–5: התאומות של ${stars(1)} עד ${stars(4)}</li>
<li>מי שסיים: משבצת ח׳ חלק א׳, עמ׳ 30, תרגיל 14, סעיפים א–ב</li>
</ul>
<p class="muted">תקועים? חוזרים לשקופית "הטבלה מצילה תמיד" ושואלים: איפה העוגן?</p>`},

{html:`<div class="eyebrow">כרטיס יציאה</div><h2>3 שאלות, 3 מצבים</h2>
<ol>
<li>בחוג 10 בנים ו־15 בנות. מה היחס בין הבנים לבנות? <span class="ans step">${eq('2 : 3')}</span></li>
<li>מחלקים 24 סוכריות ביחס ${eq('1 : 2')}. כמה מקבל כל אחד? <span class="ans step">8 ו־16</span></li>
<li>היחס בין בנים לבנות הוא ${eq('2 : 5')}. יש 10 בנים. כמה בנות? <span class="ans step">25</span></li>
</ol>`},

{html:`<div class="eyebrow">שיעורי בית</div><h2>לפעם הבאה</h2>
<ul>
<li>דף העבודה, חלק ב׳: 10 תרגילים, בכל המצבים</li>
<li>משבצת ח׳ חלק א׳, עמ׳ 30, תרגיל 14, סעיפים א–ב</li>
<li>בסוף הדף יש תשובות. בדקו את עצמכם!</li>
</ul>`}
];

// ===== שיעור 2: פרופורציה =====
function TBLG(rl,cols,rows,anc=-1,cls=''){
  const L=v=>`<span dir="ltr" style="unicode-bidi:isolate;white-space:nowrap">${v}</span>`;
  const cell=(x,i)=>{const a=i===anc?' anc':'';
    if(x==null||x==='')return `<td class="${a}"></td>`;
    if(typeof x==='string')return `<td class="${a}">${L(x)}</td>`;
    if(x.g)return `<td class="giv${a}">${L(x.v)}</td>`;
    return `<td class="${a}"><span class="step calc"${x.o?` data-o="${x.o}"`:''}>${L(x.v)}</span></td>`;};
  return `<table class="at ${cls}" dir="rtl"><tr><th style="background:none;border:none"></th>${cols.map((c,i)=>`<th class="${i===anc?'anc':''}" style="color:${c.col}">${c.h}</th>`).join('')}</tr>
  ${rows.map((r,k)=>`<tr><td class="lab" style="color:${rl[k].col}">${rl[k].h}</td>${r.map(cell).join('')}</tr>`).join('')}</table>`;}
const NB=[{h:'מחברות',col:C.acc},{h:'מחיר (ש״ח)',col:C.ray}];
const SIT=[{h:'מה שידוע',col:C.ink},{h:'מה ששואלים',col:C.ink},{h:'מחברת אחת',col:C.ok}];
// מכפלה בהצלבה: שני שברים עם קווים אלכסוניים
const cross=svg('0 0 520 250',`<g direction="ltr" font-size="46" text-anchor="middle" font-weight="900">
<text x="120" y="80" style="fill:${C.acc}">3</text><line x1="85" y1="100" x2="155" y2="100" stroke="${C.ink}" stroke-width="4"/><text x="120" y="150" style="fill:${C.ray}">18</text>
<text x="205" y="118">=</text>
<text x="290" y="80" style="fill:${C.acc}">5</text><line x1="255" y1="100" x2="325" y2="100" stroke="${C.ink}" stroke-width="4"/><text x="290" y="150" style="fill:${C.ray}">x</text>
<g class="step"><line x1="145" y1="62" x2="270" y2="135" stroke="${C.ok}" stroke-width="5"/><line x1="145" y1="138" x2="270" y2="62" stroke="#c084fc" stroke-width="5"/></g>
<g class="step"><text x="430" y="70" font-size="34" style="fill:${C.ok}">3 · x</text><text x="430" y="118" font-size="34">=</text><text x="430" y="166" font-size="34" style="fill:#c084fc">18 · 5</text></g>
<g class="step"><text x="300" y="228" font-size="38" style="fill:${C.ok}">3x = 90 → x = 30</text></g></g>`);
const dots=(n,col)=>Array.from({length:n},(_,i)=>`<circle cx="${20+i*36}" cy="20" r="13" fill="${col}"/>`).join('');
const nbSvg=svg('0 0 560 200',`<g class="step"><text x="550" y="28" font-size="24" text-anchor="start" style="fill:${C.acc};font-weight:700">3 מחברות</text>
${[0,1,2].map(i=>`<rect x="${330+i*70}" y="45" width="56" height="70" rx="6" fill="${C.acc}"/><text x="${358+i*70}" y="92" font-size="26" text-anchor="middle" style="fill:#13233a;font-weight:900">6</text>`).join('')}
<text x="320" y="92" font-size="26" text-anchor="end" style="fill:${C.ray};font-weight:700" direction="ltr">= 18 ש״ח</text></g>
<g class="step"><text x="550" y="150" font-size="24" text-anchor="start" style="fill:${C.acc};font-weight:700">5 מחברות</text>
${[0,1,2,3,4].map(i=>`<rect x="${190+i*70}" y="160" width="56" height="34" rx="6" fill="${C.acc}" fill-opacity=".9"/><text x="${218+i*70}" y="186" font-size="22" text-anchor="middle" style="fill:#13233a;font-weight:900">6</text>`).join('')}
<text x="180" y="186" font-size="26" text-anchor="end" style="fill:${C.ok};font-weight:700" direction="ltr">= 30 ש״ח</text></g>`);

SLIDES.push(
cover('l2',2,'פרופורציה = שני יחסים שווים','משבצת ח׳ · חלק א׳','אותה טבלת עוגן, שני מצבים: מוצאים <b>חלק אחד</b> ומשלימים'),

{html:RCSS+`<div class="eyebrow">כרטיס כניסה · 5 דקות</div><h2>נזכרים בשיעור הקודם</h2>
<ol>
<li>צמצמו את היחס ${eq('6 : 9')} <span class="ans step">${eq('2 : 3')}</span></li>
<li>מחלקים 30 ביחס ${eq('1 : 2')}. כמה מקבל כל אחד? <span class="ans step">10 ו־20</span></li>
<li>${eq('18 : 3 =')} <span class="ans step">6</span></li>
<li>האם ${eq('2/3 = 4/6')}? <span class="ans step">כן, מצמצמים את 4/6 ב־2</span></li>
</ol>`},

{html:RCSS+`<div class="eyebrow">למה צריך את זה?</div><h2>מתכון למסיבה</h2>
<div class="row"><div class="col">
<p class="q">בעוגה ל־4 ילדים יש ${AC('6 ביצים')}. באים 10 ילדים. כמה ביצים צריך?</p>
<p class="step">להוסיף 6 ביצים "כי באו עוד 6 ילדים"? העוגה תתקלקל!</p>
<p class="step">צריך לשמור על <b>אותו יחס</b>: ${eq('4 : 6 = 10 : ?')}</p>
<p class="step"><b>פרופורציה</b> שומרת שהמתכון יישאר טעים, גם כשמגדילים אותו.</p>
</div></div>`},

{html:`<div class="eyebrow">מטרות השיעור</div><h1>היום נדע…</h1>
<ol>
<li class="step">מה זו <b>פרופורציה</b>: שני יחסים שווים</li>
<li class="step">לבדוק אם שני יחסים יוצרים פרופורציה</li>
<li class="step">למצוא מספר חסר בעזרת <b>טבלת העוגן</b> ו<b>חלק אחד</b></li>
<li class="step">קיצור דרך: <b>כפל בהצלבה</b>, ולבדוק</li>
</ol>`},

{html:RCSS+`<div class="eyebrow">הרעיון המרכזי</div><h2>פרופורציה = שוויון בין שני יחסים</h2>
<p style="text-align:center;font-size:4cqw;font-family:var(--display);font-weight:900">${eq(AC('3')+' : '+BL('18')+' = '+AC('5')+' : '+BL('30'))}</p>
<div class="vis" style="flex:0">${nbSvg}</div>
${RULE('שני היחסים שווים, כי <b>מחיר של מחברת אחת</b> זהה: 6 ש״ח. זה ה"חלק האחד" של הפרופורציה.')}`},

{html:RCSS+`<div class="eyebrow">פותרים יחד · שלב 1 מתוך 4</div><h2>קוראים ומסמנים</h2>
<p class="q"><span class="hl">${AC('3 מחברות')} עולות ${BL('18 ש״ח')}</span>. כמה עולות <span class="hl">${AC('5 מחברות')}</span> (באותו מחיר)?</p>
<p class="step">יש <b>שני גדלים</b>: ${AC('מחברות')} ו${BL('מחיר')}. ויש <b>שני מצבים</b>: מה שידוע, ומה ששואלים.</p>
${RULE('בפרופורציה: <b>שורה לכל גודל</b>, <b>עמודה לכל מצב</b>. שומרים על הסדר!')}`},

{html:RCSS+`<div class="eyebrow">פותרים יחד · שלב 2 מתוך 4</div><h2>טבלת העוגן: מוצאים חלק אחד</h2>
${TBLG(NB,SIT,[[{v:'3',g:1},{v:'5',g:1},{v:'1',c:1}],[{v:'18',g:1},'',{v:'18 : 3 = 6',c:1}]],0)}
<p class="step">העוגן: עמודת "מה שידוע". שם ידועים <b>גם המחברות וגם המחיר</b>.</p>
${RULE('<b>חלק אחד</b> = מחיר של <b>מחברת אחת</b> = 18 : 3 = 6 ש״ח.')}`},

{html:RCSS+`<div class="eyebrow">פותרים יחד · שלב 3 מתוך 4</div><h2>ממלאים ובודקים</h2>
${TBLG(NB,SIT,[[{v:'3',g:1},{v:'5',g:1},'1'],[{v:'18',g:1},{v:'5 · 6 = 30',c:1},'6']],0)}
<p class="step"><b>בדיקה:</b> ${eq('30 : 5 = 6')} ש״ח למחברת, בשני המצבים ${GR('✓')}</p>
<p class="step"><b>תשובה:</b> 5 מחברות עולות ${GR('30 ש״ח')}.</p>
${RULE('בודקים: <b>החלק האחד זהה</b> בשני המצבים.')}`},

{html:RCSS+`<div class="eyebrow">פותרים יחד · שלב 4 מתוך 4</div><h2>קיצור דרך: כפל בהצלבה</h2>
<div class="row"><div class="vis">${cross}</div>
<div class="col"><p class="step">כותבים את שני היחסים כשברים, <b>באותו סדר</b>: מחברות למעלה, מחיר למטה.</p>
<p class="step">כופלים <b>באלכסון</b>. שתי המכפלות שוות.</p>
<p class="step">מחלקים ב־3: ${eq('x = 90 : 3 = 30')}. אותה תשובה! ${GR('✓')}</p></div></div>
${RULE('${eq("a/b = c/d")} &nbsp;←&nbsp; ${eq("a · d = b · c")}. מכנה לא יכול להיות 0.').replace('${eq("a/b = c/d")}',eq('a/b = c/d')).replace('${eq("a · d = b · c")}',eq('a · d = b · c'))}`},

{html:RCSS+`<div class="eyebrow">הטעות הנפוצה</div><h2>"הוספתי 2 מחברות, אז מוסיפים 2 ש״ח"</h2>
<p class="q">${RD('✗')} 3 מחברות ← 18 ש״ח, אז 5 מחברות ← ${eq('18 + 2 = 20')} ש״ח</p>
<p class="step">בדיקה: ${eq('20 : 5 = 4')} ש״ח למחברת, אבל קודם זה היה 6! המחיר למחברת השתנה.</p>
<p class="step">בפרופורציה <b>כופלים ומחלקים</b>, לא מוסיפים. כל מחברת נוספת מוסיפה 6 ש״ח, לא 1.</p>
${RULE('פרופורציה = <b>כפל</b>. בודקים תמיד שהחלק האחד נשאר אותו דבר.')}`},

{html:RCSS+`<div class="lvl">${stars(1)} ידע · האם זו פרופורציה?</div><h2>האם היחסים ${eq('2 : 5')} ו־${eq('6 : 15')} שווים?</h2>
<div class="pair"><div class="ex"><p class="step" data-o="2" style="text-align:center;font-size:3cqw">${eq('6 : 15 = '+GR('2 : 5'))}</p>
<p class="step" data-o="4" style="text-align:center;font-size:3cqw">${eq('2 · 15 = 30')} &nbsp; ${eq('5 · 6 = 30')} ${GR('✓')}</p></div>
<div class="ex">${W(1,'מצמצמים את '+eq('6 : 15')+': מחלקים את שניהם ב־3.',1)}${W(2,'יצא '+eq('2 : 5')+'. היחסים שווים, ולכן זו <b>פרופורציה</b>.',3)}${W(3,'בדיקה בכפל בהצלבה: שתי המכפלות שוות.',5)}</div></div>`},

{html:RCSS+`<div class="lvl">${stars(2)} יישום · מספר חסר</div><h2>מצאו את x בפרופורציה ${eq('x/18 = 2/3')}</h2>
<div class="pair"><div class="ex"><p class="step" data-o="2" style="text-align:center;font-size:3cqw">${eq('3 · x = 18 · 2')}</p>
<p class="step" data-o="4" style="text-align:center;font-size:3cqw">${eq('3x = 36 → x = '+GR('12'))}</p></div>
<div class="ex">${W(1,'כופלים באלכסון: '+eq('x · 3')+' ו־'+eq('18 · 2')+'.',1)}${W(2,'מחלקים את שני האגפים ב־3.',3)}${W(3,'בדיקה: '+eq('12/18 = 2/3')+' (מצמצמים ב־6) ✓',5)}</div></div>`},

{html:RCSS+`<div class="lvl">${stars(3)} הבנה · ניתוח טעות</div><h2>יואב: "לשתי עוגות צריך 3 ביצים, אז לשש עוגות צריך 7 ביצים."</h2>
<div class="pair"><div class="ex">
${TBLG([{h:'עוגות',col:C.acc},{h:'ביצים',col:C.ray}],[{h:'ידוע',col:C.ink},{h:'שואלים',col:C.ink}],[[{v:'2',g:1},{v:'6',g:1}],[{v:'3',g:1},{v:'3 · 3 = 9',c:1,o:4}]],0,'sm')}</div>
<div class="ex">${W(1,'יואב <b>הוסיף</b> 4 ביצים, כי הוסיפו 4 עוגות. זו הטעות!',1)}${W(2,'מ־2 עוגות ל־6 עוגות: <b>פי 3</b>. גם הביצים פי 3.',3)}${W(3,'צריך '+eq('3 · 3 = 9')+' ביצים. בדיקה: '+eq('2 : 3 = 6 : 9')+' ✓',5)}</div></div>`},

{html:RCSS+`<div class="lvl">${stars(4)} חשיבה ואוריינות · איפה משתלם?</div><h2>בחנות א׳: 3 מחברות ב־18 ש״ח. בחנות ב׳: 5 מחברות ב־28 ש״ח. איפה מחברת זולה יותר?</h2>
<div class="pair"><div class="ex">
${TBLG([{h:'מחברות',col:C.acc},{h:'מחיר',col:C.ray}],[{h:'חנות א׳',col:C.ink},{h:'חנות ב׳',col:C.ink}],[[{v:'3',g:1},{v:'5',g:1}],[{v:'18',g:1},{v:'28',g:1}]],-1,'sm')}
<p class="step" data-o="2" style="text-align:center;font-size:2.6cqw">${eq('18 : 3 = 6')} &nbsp; | &nbsp; ${eq('28 : 5 = 5.6')}</p></div>
<div class="ex">${W(1,'משווים <b>חלק אחד</b>: מחיר של מחברת אחת בכל חנות.',1)}${W(2,'בחנות א׳ 6 ש״ח, בחנות ב׳ 5.6 ש״ח.',3)}${W(3,'בחנות ב׳ זול יותר. זו <b>לא</b> פרופורציה, כי החלק האחד שונה.',4)}</div></div>`},

{html:RCSS+`<div class="eyebrow">הכלל</div><h2>פותרים פרופורציה</h2>
<ol>
<li class="step">טבלה: <b>שורה לכל גודל</b>, <b>עמודה לכל מצב</b>.</li>
<li class="step">העוגן: המצב שבו ידועים שני הגדלים. מוצאים <b>חלק אחד</b> (מחיר ליחידה).</li>
<li class="step">כופלים. או בקיצור: <b>כפל בהצלבה</b>.</li>
<li class="step">בודקים: החלק האחד זהה בשני המצבים.</li>
</ol>
<p class="step q">חוזרים לעוגה: ${eq('4/6 = 10/x')} ← ${eq('4x = 6 · 10 = 60')} ← ${eq('x = 15')}. צריך ${GR('15 ביצים')}.</p>`},

{html:RCSS+`<div class="eyebrow">עכשיו אתם · שאלה תאומה</div><h2>אותה שאלה, מספרים אחרים</h2>
<p class="q">4 עטים עולים 20 ש״ח. כמה עולים 7 עטים (באותו מחיר)?</p>
${TBLG([{h:'עטים',col:C.acc},{h:'מחיר (ש״ח)',col:C.ray}],[{h:'מה שידוע',col:C.ink},{h:'מה ששואלים',col:C.ink},{h:'עט אחד',col:C.ok}],[['','',''],['','','']])}
<p class="muted">דף העבודה, שאלה 1. פותרים בטבלה, ובודקים בכפל בהצלבה.</p>`},

{html:`<div class="eyebrow">עבודה בכיתה · 13 דקות</div><h2>דף העבודה: חלק א׳</h2>
<ul><li>שאלה 1: השאלה התאומה</li><li>שאלות 2–5: התאומות של ${stars(1)} עד ${stars(4)}</li><li>שאלות 6–7: חשיבה (מי שסיים)</li></ul>`},

{html:`<div class="eyebrow">כרטיס יציאה</div><h2>3 שאלות</h2>
<ol>
<li>האם ${eq('3 : 4')} ו־${eq('9 : 12')} יוצרים פרופורציה? <span class="ans step">כן</span></li>
<li>מצאו את x: ${eq('x/10 = 3/5')} <span class="ans step">${eq('x = 6')}</span></li>
<li>2 ק״ג תפוחים עולים 14 ש״ח. כמה עולים 5 ק״ג? <span class="ans step">35 ש״ח</span></li>
</ol>`},

{html:`<div class="eyebrow">שיעורי בית</div><h2>לפעם הבאה</h2>
<ul><li>דף העבודה של שיעור 2, חלק ב׳: 10 תרגילים</li><li>בסוף הדף יש תשובות. בדקו את עצמכם!</li></ul>`}
);

// ===== שיעור 3: קנה מידה =====
const SC=[{h:'שרטוט (ס״מ)',col:C.acc},{h:'מציאות (ס״מ)',col:C.ray}];
// סולם היחידות
const ladder=svg('0 0 620 170',`<g font-size="30" text-anchor="middle" font-weight="900">
<rect x="20" y="60" width="140" height="64" rx="12" fill="${C.chip||'#1c3352'}" stroke="${C.ray}" stroke-width="3"/><text x="90" y="102" style="fill:${C.ray}">ק״מ</text>
<rect x="240" y="60" width="140" height="64" rx="12" fill="#1c3352" stroke="${C.ok}" stroke-width="3"/><text x="310" y="102" style="fill:${C.ok}">מ׳</text>
<rect x="460" y="60" width="140" height="64" rx="12" fill="#1c3352" stroke="${C.acc}" stroke-width="3"/><text x="530" y="102" style="fill:${C.acc}">ס״מ</text>
<g class="step"><path d="M455 80 L390 80" stroke="${C.ink}" stroke-width="3" marker-end="url(#la)"/><text x="420" y="48" font-size="24" direction="ltr">: 100</text></g>
<g class="step"><path d="M235 80 L170 80" stroke="${C.ink}" stroke-width="3" marker-end="url(#la)"/><text x="200" y="48" font-size="24" direction="ltr">: 1000</text></g>
<g class="step"><path d="M170 108 L235 108" stroke="${C.muted||'#9fb3cc'}" stroke-width="3" marker-end="url(#la)"/><text x="200" y="150" font-size="22" direction="ltr" style="fill:#9fb3cc">· 1000</text>
<path d="M390 108 L455 108" stroke="#9fb3cc" stroke-width="3" marker-end="url(#la)"/><text x="420" y="150" font-size="22" direction="ltr" style="fill:#9fb3cc">· 100</text></g></g>
<defs><marker id="la" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.ink}"/></marker></defs>`);
// שרטוט מול מציאות
const scaleSvg=svg('0 0 640 260',`<g class="step"><rect x="460" y="150" width="100" height="60" fill="none" stroke="${C.acc}" stroke-width="4"/><path d="M460 150 L510 115 L560 150" fill="none" stroke="${C.acc}" stroke-width="4"/>
<line x1="460" y1="230" x2="560" y2="230" stroke="${C.acc}" stroke-width="3"/><text x="510" y="255" font-size="22" text-anchor="middle" style="fill:${C.acc};font-weight:700">5 ס״מ בשרטוט</text></g>
<g class="step"><path d="M445 175 L300 175" stroke="${C.ink}" stroke-width="3" stroke-dasharray="8 6"/><text x="372" y="160" font-size="28" text-anchor="middle" direction="ltr" style="fill:${C.ink};font-weight:900">· 100</text></g>
<g class="step"><rect x="30" y="80" width="250" height="130" fill="none" stroke="${C.ray}" stroke-width="5"/><path d="M30 80 L155 15 L280 80" fill="none" stroke="${C.ray}" stroke-width="5"/>
<line x1="30" y1="230" x2="280" y2="230" stroke="${C.ray}" stroke-width="3"/><text x="155" y="255" font-size="22" text-anchor="middle" style="fill:${C.ray};font-weight:700">500 ס״מ = 5 מ׳ במציאות</text></g>`);

SLIDES.push(
cover('l3',3,'קנה מידה = יחס בין שרטוט למציאות','משבצת ח׳ · חלק א׳','אותה טבלה: עמודת <b>קנה המידה</b> היא העוגן'),

{html:RCSS+`<div class="eyebrow">כרטיס כניסה · 5 דקות</div><h2>מחממים את המוח</h2>
<ol>
<li>${eq('4 · 20,000 =')} <span class="ans step">${eq('80,000')}</span></li>
<li>500 ס״מ = ? מטר <span class="ans step">5 מטר</span></li>
<li>3 ק״מ = ? מטר <span class="ans step">3,000 מטר</span></li>
<li>מצאו את x: ${eq('3/18 = 5/x')} <span class="ans step">${eq('x = 30')}</span></li>
</ol>`},

{html:RCSS+`<div class="eyebrow">למה צריך את זה?</div><h2>הטיול השנתי</h2>
<div class="row"><div class="col">
<p class="q">במפת הטיול המסלול נראה קצר: רק ${AC('4 ס״מ')}. כמה באמת צריך ללכת?</p>
<p class="step">המפה היא <b>הקטנה</b> של המציאות. כל ס״מ במפה הוא הרבה מטרים בשטח.</p>
<p class="step">כמה? זה כתוב על המפה: <b>קנה המידה</b>.</p>
<p class="step">גם אדריכלים, מהנדסים ומי שמשתמש ב־Waze צריכים את זה כל יום.</p>
</div></div>`},

{html:`<div class="eyebrow">מטרות השיעור</div><h1>היום נדע…</h1>
<ol>
<li class="step">לקרוא קנה מידה כמו ${eq('1 : 100')}</li>
<li class="step">למצוא אורך <b>במציאות</b>, ואורך <b>בשרטוט</b></li>
<li class="step">להמיר יחידות: ס״מ, מטר, ק״מ</li>
<li class="step">למצוא את <b>קנה המידה</b> עצמו</li>
</ol>`},

{html:RCSS+`<div class="eyebrow">הרעיון המרכזי</div><h2>מה אומר קנה המידה ${eq('1 : 100')}?</h2>
<div class="vis" style="flex:0"><div style="width:58%">${scaleSvg}</div></div>
<p class="step">כל <b>1 ס״מ</b> בשרטוט הוא <b>100 ס״מ</b> במציאות. השרטוט קטן פי 100.</p>
${RULE('קנה מידה = <b>שרטוט : מציאות</b>, תמיד <b>באותן יחידות</b>. זה יחס, ולכן זו אותה טבלת עוגן!')}`},

{html:RCSS+`<div class="eyebrow">פותרים יחד · שלב 1 מתוך 4</div><h2>קוראים ומסמנים</h2>
<p class="q">במפה בקנה מידה <span class="hl">${eq(AC('1')+' : '+BL('20,000'))}</span>, אורך מסלול הוא <span class="hl">${AC('4 ס״מ')}</span>. מה אורך המסלול <span class="hl">במציאות, במטרים</span>?</p>
<p class="step">${eq('1 : 20,000')}: כל ${AC('1 ס״מ')} במפה = ${BL('20,000 ס״מ')} במציאות.</p>
<p class="step">שואלים על <b>מציאות</b>, ו<b>במטרים</b>. נזכור להמיר בסוף!</p>
${RULE('מסמנים: קנה מידה, מה ידוע (שרטוט או מציאות), ו<b>באילו יחידות</b> מבקשים את התשובה.')}`},

{html:RCSS+`<div class="eyebrow">פותרים יחד · שלב 2 מתוך 4</div><h2>טבלת העוגן</h2>
${TBLG(SC,[{h:'קנה המידה',col:C.ok},{h:'המסלול',col:C.ink}],[[{v:'1',g:1},{v:'4',g:1}],[{v:'20,000',g:1},{v:'4 · 20,000 = 80,000',c:1}]],0)}
<p class="step">העוגן: עמודת <b>קנה המידה</b>. מ־1 ל־4 זה פי 4, ולכן גם במציאות פי 4.</p>
${RULE('<b>מציאות = שרטוט · המספר שבקנה המידה</b> (כשהשרטוט מוקטן).')}`},

{html:RCSS+`<div class="eyebrow">פותרים יחד · שלב 3 מתוך 4</div><h2>ממירים יחידות</h2>
<div class="vis" style="flex:0">${ladder}</div>
<p class="step" style="text-align:center;font-size:3cqw">${eq('80,000 ס״מ : 100 = '+GR('800 מ׳'))}</p>
${RULE('מס״מ למטר: <b>מחלקים ב־100</b>. ממטר לק״מ: <b>מחלקים ב־1000</b>. יחידה גדולה יותר ← מספר קטן יותר.')}`},

{html:RCSS+`<div class="eyebrow">פותרים יחד · שלב 4 מתוך 4</div><h2>תשובה ובדיקה</h2>
<p class="q">אורך המסלול במציאות: ${GR('800 מטר')}.</p>
<p class="step"><b>בדיקה:</b> ${eq('800 מ׳ = 80,000 ס״מ')}, ו־${eq('80,000 : 4 = 20,000')}. כלומר ${eq('4 : 80,000 = 1 : 20,000')} ${GR('✓')}</p>
<p class="step"><b>האם זה הגיוני?</b> 800 מטר זה בערך 10 דקות הליכה. מתאים למסלול! ${GR('✓')}</p>
${RULE('בודקים: מצמצמים את התשובה וחוזרים לקנה המידה, ושואלים אם המספר הגיוני.')}`},

{html:RCSS+`<div class="eyebrow">הטעות הנפוצה</div><h2>שכחו להמיר יחידות</h2>
<p class="q">${RD('✗')} ${eq('4 · 20,000 = 80,000')} ← "המסלול 80,000 מטר"</p>
<p class="step">80,000 מטר = 80 ק״מ! זה כמו מתל אביב לירושלים ברגל. לא הגיוני.</p>
<p class="step">הטעות: ${eq('80,000')} הם <b>ס״מ</b>, כי השרטוט נמדד בס״מ. צריך לחלק ב־100.</p>
${RULE('קנה המידה עובד <b>באותן יחידות</b>. ממירים רק בסוף, ושואלים: האם זה הגיוני?')}`},

{html:RCSS+`<div class="eyebrow">כל המצבים</div><h2>מה ידוע? מה עושים?</h2>
<div class="grid2">
<div class="card step"><b>ידוע השרטוט, מחפשים מציאות</b> ← <b>כופלים</b> במספר של קנה המידה<br><span class="small muted">1:100, קיר 5 ס״מ בשרטוט</span></div>
<div class="card step"><b>ידועה המציאות, מחפשים שרטוט</b> ← ממירים לס״מ ו<b>מחלקים</b><br><span class="small muted">1:100, קיר 5 מטר במציאות</span></div>
<div class="card step"><b>ידועים שניהם, מחפשים קנה מידה</b> ← אותן יחידות, ו<b>מצמצמים</b> ל־1 : ?<br><span class="small muted">חדר 6 מ׳, בשרטוט 3 ס״מ</span></div>
<div class="card step"><b>משווים שני מסלולים</b> ← ממירים את שניהם <b>לאותה יחידה</b><br><span class="small muted">מסלול במפה ומסלול בק״מ</span></div>
</div>`},

{html:RCSS+`<div class="lvl">${stars(1)} ידע · מוצאים מציאות</div><h2>בשרטוט בקנה מידה ${eq('1 : 100')} אורך קיר 5 ס״מ. מה אורכו במציאות, במטרים?</h2>
<div class="pair"><div class="ex">
${TBLG(SC,[{h:'קנה המידה',col:C.ok},{h:'הקיר',col:C.ink}],[[{v:'1',g:1},{v:'5',g:1}],[{v:'100',g:1},{v:'5 · 100 = 500',c:1,o:2}]],0,'sm')}
<p class="step" data-o="4" style="text-align:center;font-size:2.8cqw">${eq('500 ס״מ = '+GR('5 מ׳'))}</p></div>
<div class="ex">${W(1,'העוגן: קנה המידה. 1 ס״מ בשרטוט = 100 ס״מ במציאות.',1)}${W(2,'5 ס״מ בשרטוט: '+eq('5 · 100 = 500')+' ס״מ במציאות.',3)}${W(3,'ממירים: '+eq('500 : 100 = 5')+' מטר.',5)}</div></div>`},

{html:RCSS+`<div class="lvl">${stars(2)} יישום · מוצאים שרטוט</div><h2>אורך קיר במציאות 5 מטר. מה יהיה אורכו בשרטוט בקנה מידה ${eq('1 : 100')}?</h2>
<div class="pair"><div class="ex">
${TBLG(SC,[{h:'קנה המידה',col:C.ok},{h:'הקיר',col:C.ink}],[[{v:'1',g:1},{v:'500 : 100 = 5',c:1,o:4}],[{v:'100',g:1},{v:'500',c:1,o:2}]],0,'sm')}</div>
<div class="ex">${W(1,'קודם ממירים לס״מ: '+eq('5 מ׳ = 500 ס״מ')+'.',1)}${W(2,'בשרטוט הכול קטן פי 100: <b>מחלקים</b> ב־100.',3)}${W(3,'בשרטוט: '+GR('5 ס״מ')+'. בדיקה: '+eq('5 : 500 = 1 : 100')+' ✓',5)}</div></div>`},

{html:RCSS+`<div class="lvl">${stars(3)} הבנה · מוצאים קנה מידה</div><h2>אורך חדר במציאות 6 מטר. בשרטוט אורכו 3 ס״מ. מה קנה המידה?</h2>
<div class="pair"><div class="ex">
<p class="step" data-o="2" style="text-align:center;font-size:3cqw">${eq('3 ס״מ : 600 ס״מ')}</p>
<p class="step" data-o="4" style="text-align:center;font-size:3cqw">${eq('= '+GR('1 : 200'))}</p></div>
<div class="ex">${W(1,'קנה מידה = שרטוט : מציאות, <b>באותן יחידות</b>. '+eq('6 מ׳ = 600 ס״מ')+'.',1)}${W(2,'מצמצמים כך שבשרטוט יהיה 1: מחלקים את שניהם ב־3.',3)}${W(3,'קנה המידה '+eq('1 : 200')+': כל ס״מ בשרטוט = 2 מטר במציאות.',5)}</div></div>`},

{html:RCSS+`<div class="lvl">${stars(4)} חשיבה ואוריינות · משווים</div><h2>מסלול א׳: 3 ס״מ במפה בקנה מידה ${eq('1 : 50,000')}. מסלול ב׳: 1.2 ק״מ במציאות. איזה ארוך יותר, ובכמה?</h2>
<div class="pair"><div class="ex">
<p class="step" data-o="2" style="text-align:center;font-size:2.6cqw">${eq('3 · 50,000 = 150,000 ס״מ')}</p>
<p class="step" data-o="4" style="text-align:center;font-size:2.6cqw">${eq('150,000 ס״מ = 1,500 מ׳ = '+GR('1.5 ק״מ'))}</p>
<p class="step" data-o="6" style="text-align:center;font-size:2.6cqw">${eq('1.5 − 1.2 = '+GR('0.3 ק״מ'))} = 300 מטר</p></div>
<div class="ex">${W(1,'מוצאים את מסלול א׳ במציאות: כופלים ב־50,000.',1)}${W(2,'ממירים: מס״מ למטר (: 100), וממטר לק״מ (: 1000).',3)}${W(3,'עכשיו שניהם בק״מ: מסלול א׳ ארוך יותר ב־300 מטר.',5)}</div></div>`},

{html:RCSS+`<div class="eyebrow">הכלל</div><h2>קנה מידה בשלושה צעדים</h2>
<ol>
<li class="step">כותבים את קנה המידה כטבלה: <b>שרטוט : מציאות</b>, באותן יחידות (ס״מ).</li>
<li class="step">שרטוט ← מציאות: <b>כופלים</b>. מציאות ← שרטוט: <b>מחלקים</b>.</li>
<li class="step">ממירים יחידות <b>בסוף</b>, ושואלים: האם זה הגיוני?</li>
</ol>
<div class="vis step" style="flex:0">${ladder.replace(/class="step"/g,'').replace(/#la\)/g,'#lb)').replace('id="la"','id="lb"')}</div>`},

{html:RCSS+`<div class="eyebrow">עכשיו אתם · שאלה תאומה</div><h2>אותה שאלה, מספרים אחרים</h2>
<p class="q">במפה בקנה מידה ${eq('1 : 25,000')}, אורך מסלול 6 ס״מ. מה אורכו במציאות, במטרים?</p>
${TBLG(SC,[{h:'קנה המידה',col:C.ok},{h:'המסלול',col:C.ink}],[['',''],['','']])}
<p class="muted">דף העבודה, שאלה 1. אל תשכחו להמיר בסוף!</p>`},

{html:RCSS+`<div class="eyebrow">סיכום השבוע</div><h2>טבלה אחת, שלושה נושאים</h2>
<div class="grid2" style="grid-template-columns:1fr 1fr 1fr">
<div class="card step"><b style="color:var(--accent)">יחס</b><br>שורות: חלקים / כמות<br>העוגן: שלם, חלק או הפרש<br>${eq('35 : 7 = 5')} ← חלק אחד</div>
<div class="card step"><b style="color:var(--ray)">פרופורציה</b><br>שורה לכל גודל, עמודה לכל מצב<br>חלק אחד = מחיר ליחידה<br>קיצור: כפל בהצלבה</div>
<div class="card step"><b style="color:var(--ok)">קנה מידה</b><br>שורות: שרטוט / מציאות<br>העוגן: קנה המידה<br>ממירים יחידות בסוף</div>
</div>
${RULE('בכל שאלה: <b>טבלה ← עוגן ← חלק אחד ← כופלים ← בודקים</b>.')}`},

{html:`<div class="eyebrow">עבודה בכיתה · 13 דקות</div><h2>דף העבודה: חלק א׳</h2>
<ul><li>שאלה 1: השאלה התאומה</li><li>שאלות 2–5: התאומות של ${stars(1)} עד ${stars(4)}</li><li>שאלות 6–7: חשיבה (מי שסיים)</li></ul>`},

{html:`<div class="eyebrow">כרטיס יציאה</div><h2>3 שאלות, 3 מצבים</h2>
<ol>
<li>קנה מידה ${eq('1 : 200')}, בשרטוט 3 ס״מ. כמה מטר במציאות? <span class="ans step">6 מ׳</span></li>
<li>קנה מידה ${eq('1 : 1000')}, במציאות 50 מ׳. כמה ס״מ בשרטוט? <span class="ans step">5 ס״מ</span></li>
<li>בשרטוט 2 ס״מ, במציאות 10 מ׳. מה קנה המידה? <span class="ans step">${eq('1 : 500')}</span></li>
</ol>`},

{html:`<div class="eyebrow">שיעורי בית</div><h2>לפני הבוחן</h2>
<ul><li>דף העבודה של שיעור 3, חלק ב׳: 10 תרגילים</li><li>דף הסיכום של השבוע: לקרוא ולשמור</li><li>בסוף הדף יש תשובות. בדקו את עצמכם!</li></ul>`}
);
