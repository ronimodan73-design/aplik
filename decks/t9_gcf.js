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

{html:`<div class="eyebrow">הרעיון המרכזי</div><h2>חוק הפילוג בכיוון ההפוך</h2>
<div class="row"><div class="col">
<div class="card">חוק הפילוג: ${eq(A('a')+'(b + c) = '+A('a')+'b + '+A('a')+'c')}</div>
<div class="card step">הוצאת גורם משותף: ${eq(A('a')+'b + '+A('a')+'c = '+A('a')+'(b + c)')}</div>
<p class="step">כותבים כל איבר ככפל, מוצאים מה <b>משותף לכולם</b>, ומוציאים אותו החוצה.</p>
<p class="step muted">כתיבת ביטוי ככפל נקראת <b>פירוק לגורמים</b>.</p>
</div><div class="vis">${mainSvg}</div></div>`},

{html:`<div class="eyebrow">הטעות הנפוצה</div><h2>כשמוציאים איבר שלם, נשאר 1</h2>
<div class="row"><div class="col">
<p class="big" style="font-size:5cqw;color:var(--ink)">${eq(A('9')+' + '+A('9')+'x = ?')}</p>
<div class="card step">${R('✗')} ${eq(A('9')+'(x)')} שכחו את ה־1</div>
<div class="card step">${eq(A('9')+'·'+R('1')+' + '+A('9')+'·x = '+A('9')+'('+R('1')+' + x)')} ${G('✓')}</div>
<p class="step">במקום האיבר שהוצאנו נשאר <b>1</b>, לא 0. בדיקה: ${eq('9·1 + 9·x = 9 + 9x')} ${G('✓')}</p>
</div></div>`},

{html:`<div class="lvl">${stars(1)} ידע</div><h2>פרקו לגורמים: ${eq('7x + 7y')}</h2>
${START(eq(A('7')+'x + '+A('7')+'y'))}
${P(eq(A('7')+' ?'),1,'מחפשים מה מופיע <b>בשני</b> האיברים: '+A('7')+'.')}
${P(eq('= '+A('7')+'(x + y)'),2,'מוציאים את ה־7 החוצה. בסוגריים נשאר מה שהיה כפול בו: '+eq('x + y')+'.')}
${P(eq(G('7x + 7y ✓')),3,'בודקים בפתיחת סוגריים: '+eq('7·x + 7·y = 7x + 7y')+'.')}`},

{html:`<div class="lvl">${stars(2)} יישום</div><h2>פרקו לגורמים: ${eq('12m + 36')}</h2>
${START(eq('12m + 36'))}
${P(eq('= '+A('12')+'·m + '+A('12')+'·3'),1,'כותבים את 36 ככפל: '+eq('36 = 12·3')+'. המחלק המשותף הגדול של 12 ושל 36 הוא '+A('12')+'.')}
${P(eq('= '+A('12')+'(m + 3)'),2,'מוציאים את 12 החוצה, ובסוגריים נשאר '+eq('m + 3')+'.')}
${P(eq(G('12m + 36 ✓')),3,'בדיקה: '+eq('12·m + 12·3 = 12m + 36')+'.')}`},

{html:`<div class="lvl">${stars(3)} הבנה וניתוח טעות</div><h2>דנה כתבה: ${eq('12y³ − 36y⁵ = 4y²(3y − 9y³)')}</h2>
<p style="font-size:1.8cqw">האם דנה צודקת? האם זה <b>הגורם המשותף הגדול ביותר</b>?</p>
${P(eq(G('נכון ✓')),1,'פותחים סוגריים: '+eq('4y²·3y = 12y³')+' ו־'+eq('4y²·9y³ = 36y⁵')+'. התשובה נכונה.')}
${P(eq(R('לא הגדול')),2,'אבל בתוך הסוגריים '+eq('(3y − 9y³)')+' עוד יש גורם משותף, '+eq('3y')+'.')}
${P(eq(A('12')+'·'+PU('y³')+' − '+A('12')+'·3·'+PU('y³')+'·y²'),3,'צובעים באותו צבע את מה שמשותף לשני האיברים: '+A('12')+' ו־'+PU('y³')+'.')}
${P(eq('= '+A('12')+PU('y³')+'(1 − 3y²)'),4,'מוציאים את כל מה שצבוע: 12 (המחלק המשותף הגדול) ו־y³ (החזקה הקטנה).')}`},

{html:`<div class="lvl">${stars(4)} חשיבה ואוריינות</div><h2>חשבו בדרך הנוחה: ${eq('a²y + a³')}</h2>
<p style="font-size:1.8cqw">נתון: ${eq('a = 3.5')} , ${eq('y = 6.5')}. בלי מחשבון!</p>
${P(eq(A('a²')+'·y + '+A('a²')+'·a'),1,'כותבים כל איבר ככפל וצובעים את המשותף: '+A('a²')+' מופיע בשני האיברים, כי '+eq('a³ = a²·a')+'.')}
${P(eq('= '+A('a²')+'(y + a)'),2,'מוציאים את '+A('a²')+' החוצה.')}
${P(eq('= 12.25·10'),3,'בסוגריים: '+eq('6.5 + 3.5 = 10')+'. וגם '+eq('3.5² = 12.25')+'.')}
${P(eq('= '+G('122.5')),4,'כפל ב־10 קל. הוצאת גורם משותף הפכה חישוב קשה לקל.')}`},

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
