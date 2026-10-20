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
menu('ח׳ א2 · השבוע',[{id:'l1',n:1,t:'יחס: חלקים שווים וטבלת העוגן',d:'שיעור 45 דק׳'}]),

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
