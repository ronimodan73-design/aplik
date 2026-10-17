// TITLE: ט׳ א2 · הוצאת גורם משותף
// BAR: ט׳ א2 · פירוק לגורמים: הוצאת גורם משותף · אפשר גם אחרת עמ׳ 129–131
const A=t=>`<span style="color:${C.acc};font-weight:700">${t}</span>`;
const B=t=>`<span style="color:${C.ray}">${t}</span>`;
const G=t=>`<span style="color:${C.ok}">${t}</span>`;
const R=t=>`<span style="color:${C.ray2}">${t}</span>`;
const PU=t=>`<span style="color:#c084fc;font-weight:700">${t}</span>`;
const W=(n,t)=>`<div class="card what"><b>מה עשינו? שלב ${n}:</b> ${t}</div>`;
const P=(e,n,t)=>`<div class="pair step"><div class="eqc">${e}</div>${W(n,t)}</div>`;
const START=e=>`<div class="pair"><div class="eqc" style="color:var(--ink)">${e}</div><div style="flex:1.25"></div></div>`;
const CSS=`<style>span[dir=ltr]{white-space:nowrap}.pair{display:flex;gap:2cqw;align-items:center}.pair .card{padding:.8cqw 1.4cqw;font-size:1.65cqw}.pair>.eqc{flex:1;font-family:var(--display);font-weight:900;font-size:3.3cqw;color:var(--accent)}.pair>.card{flex:1.25}</style>`;
const FR=(n,d,col)=>`<span class="fr"><span class="n">${n}</span><span class="d" style="color:${col||C.acc}">${d}</span></span>`;
const DIVROW=(cells)=>`<div class="divrow" dir="ltr">${cells.join('')}</div>`;
const DV=(n,d,r)=>`<span class="dv">${FR(n,d)}<span class="eqs">=</span><span class="res">${r}</span></span>`;
const OPS=o=>`<span class="op">${o}</span>`;
const DCSS=`<style>.divrow{display:flex;gap:3cqw;align-items:center;justify-content:center;font-family:var(--display);font-weight:900;font-size:3.6cqw}.fr{display:inline-flex;flex-direction:column;align-items:center;line-height:1.15}.fr .n{border-bottom:.35cqw solid var(--ink);padding:0 .6cqw}.dv{display:inline-flex;align-items:center;gap:.8cqw}.res{color:var(--ok)}.op{color:var(--ink)}.big2{font-family:var(--display);font-weight:900;font-size:4.2cqw;text-align:center}</style>`;
const EX=(lvl,title,expr,f,divs,ops,final,whatTxt,check)=>({html:DCSS+`<div class="lvl">${lvl}</div><h2>${title}</h2>
<p class="big2" dir="ltr">${expr}</p>
<div class="step">${DIVROW(divs.flatMap((d,i)=>i?[OPS(ops[i-1]),d]:[d]))}</div>
<p class="step big2" dir="ltr">${final}</p>
<div class="card what step"><b>מה עשינו?</b> ${whatTxt}</div>
<p class="step" style="text-align:center">בדיקה: ${eq(check)} ✓</p>`});
const mainSvg=svg('0 0 520 330',`<defs><marker id="mA" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="${C.acc}"/></marker></defs>
<g direction="ltr" font-size="42" text-anchor="middle">
 <text x="200" y="60">5x</text><text x="262" y="60">+</text><text x="325" y="60">10</text>
 <g class="step"><text x="150" y="145" style="fill:${C.acc};font-weight:700">5</text><text x="176" y="145">·</text><text x="202" y="145" style="fill:${C.ray}">x</text><text x="252" y="145">+</text><text x="302" y="145" style="fill:${C.acc};font-weight:700">5</text><text x="328" y="145">·</text><text x="354" y="145" style="fill:${C.ok}">2</text></g>
 <g class="step"><path d="M150 160 L160 205" stroke="${C.acc}" stroke-width="4" fill="none" marker-end="url(#mA)"/><path d="M300 160 Q240 190 176 210" stroke="${C.acc}" stroke-width="4" fill="none" marker-end="url(#mA)"/>
  <text x="115" y="245">=</text><text x="160" y="245" style="fill:${C.acc};font-weight:700">5</text><text x="190" y="245">(</text><text x="222" y="245" style="fill:${C.ray}">x</text><text x="260" y="245">+</text><text x="298" y="245" style="fill:${C.ok}">2</text><text x="328" y="245">)</text></g>
 <g class="step"><text x="235" y="315" font-size="34" style="fill:${C.ok}">= 5x + 10 ✓</text></g>
</g>
<g class="step"><text x="440" y="315" font-size="28" text-anchor="middle" style="fill:${C.ok}">בדיקה</text></g>`);

const SLIDES=[
menu('ט׳ א2 · אלגברה',[{id:'l1',n:1,t:'הוצאת גורם משותף',d:'שיעור 45 דק׳'}]),
cover('l1',1,'הוצאת גורם משותף','אפשר גם אחרת · עמ׳ 129–131','לפרק לגורמים = לכתוב ביטוי ככפל, בעזרת חוק הפילוג בכיוון ההפוך'),

{html:CSS+`<div class="eyebrow">כרטיס כניסה · 5 דקות</div><h2>נזכרים בחוק הפילוג</h2>
<div class="row"><div class="col">
<ol>
<li>${eq(A('5')+'(x + 2) =')} <span class="ans step">${eq('5x + 10')}</span></li>
<li>${eq(A('3a')+'(a − 4) =')} <span class="ans step">${eq('3a² − 12a')}</span></li>
<li>${eq(A('−2')+'(x − 3) =')} <span class="ans step">${eq('−2x + 6')}</span></li>
<li>מהו המחלק המשותף הגדול של 12 ושל 18? <span class="ans step">6</span></li>
</ol></div>
<div class="vis">${dist('5',['x','+ 2'],'5x + 10')}</div></div>`},

{html:`<div class="eyebrow">למה צריך את זה?</div><h2>חשבו בלי מחשבון</h2>
<div class="col" style="justify-content:center">
<p class="big" style="font-size:5cqw;color:var(--ink)">${eq(A('35')+'·13.7 + '+A('35')+'·6.3 = ?')}</p>
<p class="step">ה־${A('35')} מופיע <b>בשני האיברים</b>. הוא <b>גורם משותף</b>.</p>
<p class="step big" style="font-size:4.4cqw;color:var(--ink)">${eq('= '+A('35')+'·(13.7 + 6.3)')}</p>
<p class="step big" style="font-size:4.4cqw">${eq('= '+A('35')+'·20 = '+G('700'))}</p>
</div>`},

{html:`<div class="eyebrow">מטרות השיעור</div><h1>היום נדע…</h1>
<ol>
<li class="step">לזהות <b>גורם משותף</b> שמופיע בכל האיברים</li>
<li class="step">להוציא אותו אל מחוץ לסוגריים, כלומר <b>לפרק לגורמים</b></li>
<li class="step">למצוא את <b>הגורם המשותף הגדול ביותר</b></li>
<li class="step">לבדוק את עצמנו בעזרת פתיחת סוגריים</li>
</ol>`},

{html:`<div class="eyebrow">מסלול השיעור</div><h2>מה עושים היום בכיתה</h2>
<div class="grid2">
<div class="card">כרטיס כניסה · 5 דק׳</div><div class="card">רעיון ודוגמאות · 15 דק׳</div>
<div class="card">תרגול בספר · 18 דק׳</div><div class="card">כרטיס יציאה · 7 דק׳</div>
</div>`},

{html:DCSS+`<div class="eyebrow">הרעיון המרכזי</div><h2>חוק הפילוג בכיוון ההפוך</h2>
<p class="big2" dir="ltr">${A('5')}x + 10</p>
<div class="step">${DIVROW([DV('5x','5','x'),OPS('+'),DV('10','5','2')])}</div>
<p class="step big2" dir="ltr">= ${A('5')}(x + 2)</p>
<div class="card what step"><b>השיטה:</b> 1. מוצאים גורם משותף. 2. מחלקים בו <b>כל</b> איבר (מתחת לאיבר). 3. התוצאות נכנסות לסוגריים.</div>`},

{html:DCSS+`<div class="eyebrow">הטעות הנפוצה</div><h2>כשמחלקים איבר בעצמו, יוצא 1</h2>
<p class="big2" dir="ltr">${A('9')} + 9x</p>
<div class="step">${DIVROW([DV('9','9',R('1')),OPS('+'),DV('9x','9','x')])}</div>
<p class="step big2" dir="ltr">= ${A('9')}(${R('1')} + x)</p>
<div class="card step">${R('✗')} ${eq('9(x)')}: שכחו את ה־1. כי ${eq('9 : 9 = 1')}, ולא 0!</div>`},

EX(`${stars(1)} ידע`,'פרקו לגורמים: '+eq('7x + 7y'),A('7')+'x + '+A('7')+'y','7',[DV('7x','7','x'),DV('7y','7','y')],['+'],'= '+A('7')+'(x + y)','1. מוצאים מה משותף: '+A('7')+'. 2. מחלקים <b>כל איבר</b> ב־7 (מתחת). 3. מה שיצא נכנס לסוגריים.','7·x + 7·y = 7x + 7y'),

EX(`${stars(2)} יישום`,'פרקו לגורמים: '+eq('12m + 36'),A('12')+'m + 36','12',[DV('12m','12','m'),DV('36','12','3')],['+'],'= '+A('12')+'(m + 3)','המחלק המשותף הגדול של 12 ושל 36 הוא '+A('12')+'. מחלקים כל איבר ב־12, והתוצאות נכנסות לסוגריים.','12·m + 12·3 = 12m + 36'),

EX(`${stars(3)} הבנה`,'פרקו לגורמים: '+eq('12y³ − 36y⁵'),A('12y³')+' − 36y⁵','12y³',[DV('12y³','12y³','1'),DV('36y⁵','12y³','3y²')],['−'],'= '+A('12y³')+'(1 − 3y²)','מספרים: המחלק המשותף הגדול 12. אותיות: החזקה הקטנה '+A('y³')+'. מחלקים כל איבר ב־'+A('12y³')+'. שימו לב: '+eq('12y³ : 12y³ = 1')+', לא 0!','12y³·1 − 12y³·3y² = 12y³ − 36y⁵'),

EX(`${stars(4)} חשיבה`,'חשבו בדרך הנוחה ('+eq('a = 3.5')+', '+eq('y = 6.5')+')',A('a²')+'y + a³','a²',[DV('a²y','a²','y'),DV('a³','a²','a')],['+'],'= '+A('a²')+'(y + a) = 12.25·10 = '+G('122.5'),'מוציאים '+A('a²')+' בעזרת חילוק כל איבר. בסוגריים '+eq('6.5 + 3.5 = 10')+', ו־'+eq('3.5² = 12.25')+'. כפל ב־10 קל!','a²·y + a²·a = a²y + a³'),

{html:`<div class="eyebrow">עוד מקרה</div><h2>הוצאת גורם שלילי</h2>
<div class="row"><div class="col">
<p class="big" style="font-size:4.6cqw;color:var(--ink)">${eq(A('−2a')+'b + 6ac')}</p>
<p class="step big" style="font-size:4.6cqw;color:var(--ink)">${eq('= '+A('−2a')+'(b '+R('−')+' 3c)')}</p>
<p class="step">כשמוציאים גורם <b>שלילי</b>, ${R('כל סימן בתוך הסוגריים מתהפך')}.</p>
<p class="step">בדיקה: ${eq('−2a·b = −2ab')} ו־${eq('−2a·(−3c) = +6ac')} ${G('✓')}</p>
</div></div>`},

{html:`<div class="eyebrow">הכלל</div><h2>הגורם המשותף הגדול ביותר</h2>
<div class="card">המחלק המשותף הגדול של <b>המספרים</b></div>
<div class="card step">כפול כל <b>אות</b> שמופיעה בכל האיברים, <b>בחזקה הקטנה ביותר</b></div>
<div class="card step what"><b>תמיד בודקים:</b> פותחים סוגריים וחוזרים לביטוי המקורי.</div>`},

{html:`<div class="eyebrow">תרגול בכיתה · 18 דקות</div><h2>אפשר גם אחרת</h2>
<ul>
<li>${stars(1)} עמ׳ 129, תרגיל 7: סעיפים 1–6</li>
<li>${stars(2)} עמ׳ 129, תרגיל 9: סעיפים 1–8</li>
<li>${stars(3)} עמ׳ 130, תרגיל 12: סעיפים 6–10 (הגורם המשותף הגדול ביותר)</li>
<li>${stars(3)} עמ׳ 130, תרגיל 14: סעיפים 1–4</li>
</ul>
<p class="muted">סיימתם? בדקו כל תשובה בפתיחת סוגריים.</p>`},

{html:`<div class="eyebrow">כרטיס יציאה</div><h2>פרקו לגורמים</h2>
<ol>
<li>${eq('6a + 6b =')} <span class="ans step">${eq('6(a + b)')}</span></li>
<li>${eq('8x − 12 =')} <span class="ans step">${eq('4(2x − 3)')}</span></li>
<li>${eq('x³ + x² =')} <span class="ans step">${eq('x²(x + 1)')}</span></li>
</ol>`},

{html:`<div class="eyebrow">שיעורי בית</div><h2>אפשר גם אחרת</h2>
<ul>
<li>עמ׳ 129, תרגיל 10: סעיפים 1–12</li>
<li>עמ׳ 131, תרגיל 15: סעיפים א–ב (חשבו בדרך הנוחה)</li>
<li>עמ׳ 131, תרגיל 17: סעיפים 1–6</li>
<li>${stars(4)} אתגר: עמ׳ 131, תרגיל 18: סעיפים 1–3</li>
</ul>`}
];
