// TITLE: ט׳ א2 · פירוק לגורמים: הפרש ריבועים
// BAR: ט׳ א2 · פירוק לגורמים לפי הנוסחה a² − b² = (a + b)(a − b) · אפשר גם אחרת עמ׳ 152–154
const A=t=>`<span style="color:${C.acc};font-weight:700">${t}</span>`;
const B=t=>`<span style="color:${C.ray};font-weight:700">${t}</span>`;
const R=t=>`<span style="color:${C.ray2};font-weight:700">${t}</span>`;
const G=t=>`<span style="color:${C.ok};font-weight:700">${t}</span>`;
const W=(n,t)=>`<div class="card what"><b>מה עשינו? שלב ${n}:</b> ${t}</div>`;
const P=(e,n,t)=>`<div class="pair step"><div class="eqc">${eq(e)}</div>${W(n,t)}</div>`;
const START=e=>`<div class="pair"><div class="eqc" style="color:var(--ink)">${eq(e)}</div><div style="flex:1.25"></div></div>`;
const CSS=`<style>.pair{display:flex;gap:2cqw;align-items:center}.pair .card{padding:.7cqw 1.3cqw;font-size:1.6cqw}.pair>.eqc{flex:1;font-family:var(--display);font-weight:900;font-size:3cqw;color:var(--accent)}.pair>.card{flex:1.3}.xl{font-family:var(--display);font-weight:900;font-size:4.6cqw}
.mvp{transform-box:fill-box;transform-origin:center;transition:transform 1.8s cubic-bezier(.6,.05,.3,1)}svg:has(.mvT.shown) .mvp{transform:translate(200px,-120px) rotate(90deg)}
svg:has(.cutS.shown) .corner{fill-opacity:0}svg:has(.fin.shown) .initlab{opacity:0}.initlab{transition:opacity .4s}.corner{transition:fill-opacity .6s}
.chk{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4cqw}.chk .card{font-size:2cqw;text-align:center}.chk .card b{display:block;font-size:3.2cqw;color:var(--accent)}
.sort{display:grid;grid-template-columns:repeat(4,1fr);gap:1.2cqw}.sort .card{text-align:center;font-size:2.6cqw;font-family:var(--display);font-weight:700}.sort .card small{display:block;font-size:1.6cqw;font-weight:400}</style>`;
const ORD=['x','−','+','·','(',')'];
// main animation: a=6, b=2, unit = 40
const grid=`<pattern id="u40" width="40" height="40" patternUnits="userSpaceOnUse" x="40" y="50"><path d="M40 0H0V40" fill="none" stroke="#0f1b2d" stroke-width="2"/></pattern>`;
const mainSvg=svg('0 0 920 360',`<defs>${grid}</defs>
<g class="initlab" direction="ltr" font-size="30" text-anchor="middle"><text x="160" y="335" style="fill:${C.ray}">a = 6</text><text x="16" y="175" style="fill:${C.ray}">a</text></g>
<rect x="40" y="50" width="240" height="160" fill="${C.ray}" fill-opacity=".55"/><rect x="40" y="50" width="240" height="160" fill="url(#u40)"/>
<g class="mvp"><rect x="40" y="210" width="160" height="80" fill="${C.ok}" fill-opacity=".6"/><rect x="40" y="210" width="160" height="80" fill="url(#u40)"/></g>
<rect class="corner" x="200" y="210" width="80" height="80" fill="${C.ray2}" fill-opacity=".75"/>
<text x="910" y="70" font-size="27" text-anchor="start" direction="rtl">שטח הריבוע הגדול: <tspan direction="ltr" style="fill:${C.ray}">6² = 36</tspan> משבצות</text>
<g class="step cutS"><rect x="200" y="210" width="80" height="80" fill="none" stroke="${C.ray2}" stroke-width="4" stroke-dasharray="10 7"/><text x="240" y="262" font-size="30" text-anchor="middle" direction="ltr" style="fill:${C.ray2}">b²</text><text x="292" y="262" font-size="26" direction="ltr" style="fill:${C.ray2}">b = 2</text></g>
<g class="step"><text x="910" y="130" font-size="27" text-anchor="start" direction="rtl">מורידים ריבוע קטן: <tspan direction="ltr" style="fill:${C.ray2}">36 − 4 = 32</tspan> משבצות</text></g>
<g class="step"><line x1="40" y1="210" x2="200" y2="210" stroke="${C.acc}" stroke-width="6" stroke-dasharray="12 8"/></g>
<g class="step mvT"><text x="910" y="190" font-size="27" text-anchor="start" direction="rtl">מזיזים את החלק הירוק ומקבלים מלבן</text></g>
<g class="step fin" direction="ltr" font-size="30" text-anchor="middle"><path d="M40 35 H360" stroke="${C.acc}" stroke-width="3"/><text x="200" y="27" style="fill:${C.acc}">a + b = 8</text><path d="M25 50 V210" stroke="${C.acc}" stroke-width="3"/><text x="0" y="0" transform="translate(14 130) rotate(-90)" font-size="26" style="fill:${C.acc}">a − b = 4</text></g>
<g class="step"><text x="910" y="250" font-size="27" text-anchor="start" direction="rtl">שטח המלבן: <tspan direction="ltr" style="fill:${C.acc}">8 · 4 = 32</tspan> משבצות. אותו שטח!</text></g>
<g class="step"><text x="910" y="320" font-size="36" font-weight="900" text-anchor="end" direction="ltr" style="fill:${C.ok}">a² − b² = (a + b)(a − b)</text></g>`);
// reorder: the step order in DOM = cut, (dummy), cutline, text2..., so build order explicitly
const gardenSvg=svg('0 -10 300 300',`<rect x="20" y="20" width="250" height="250" fill="${C.ok}" fill-opacity=".45" stroke="${C.ok}" stroke-width="3"/><rect x="80" y="80" width="150" height="150" fill="${C.ray}" fill-opacity=".7"/><g direction="ltr" font-size="24" text-anchor="middle"><text x="145" y="10" style="fill:${C.ok}">25</text><text x="155" y="162" style="fill:#0f1b2d">15</text></g>`);
const SLIDES=[
menu('ט׳ א2 · אלגברה',[{id:'l1',n:1,t:'פירוק לגורמים לפי הנוסחה a² − b²',d:'שיעור כפול · 90 דק׳'}]),
cover('l1',1,'הפרש ריבועים','אפשר גם אחרת · עמ׳ 152–154',`ריבוע פחות ריבוע = ${eq('(סכום)·(הפרש)')} של השורשים: ${eq('a² − b² = (a + b)(a − b)')}`),
{html:CSS+`<div class="eyebrow">כרטיס כניסה · 5 דקות</div><h2>נזכרים במה שכבר יודעים</h2>
<ol>
<li>פתחו סוגריים: ${eq('(x + 5)(x − 5) =')} <span class="ans step">${eq('x² − 5x + 5x − 25 = x² − 25')}</span></li>
<li>חשבו: ${eq('6² =')} <span class="ans step">36</span> &nbsp; ${eq('(3x)² =')} <span class="ans step">${eq('9x²')}</span></li>
<li>איזה ביטוי בריבוע נותן ${eq('49x²')}? <span class="ans step">${eq('7x')}, כי ${eq('7x · 7x = 49x²')}</span></li>
<li>הוציאו גורם משותף: ${eq('4x + 12 =')} <span class="ans step">${eq('4(x + 3)')}</span></li>
</ol>`},
{html:CSS+`<div class="eyebrow">למה צריך את זה?</div><h2>קסם: אני כופלת בראש מהר יותר ממחשבון</h2>
<p class="xl" style="text-align:center">${eq('29 · 31 = ?')}</p>
<p class="step xl" style="text-align:center;color:var(--ok)">899</p>
<p class="step">איך עשיתי את זה בשנייה? בסוף השיעור גם אתם תדעו.</p>`},
{html:`<div class="eyebrow">מטרות השיעור</div><h1>היום נדע…</h1>
<ol>
<li class="step">לזהות ביטוי שהוא <b>ריבוע פחות ריבוע</b></li>
<li class="step">למצוא את <b>a</b> ואת <b>b</b>: מה בריבוע נותן כל איבר</li>
<li class="step">לפרק לגורמים: ${eq('a² − b² = (a + b)(a − b)')}</li>
<li class="step">לבדוק את עצמנו בפתיחת סוגריים</li>
</ol>`},
{html:`<div class="eyebrow">מסלול השיעור · 90 דקות</div><h2>מה עושים היום בכיתה</h2>
<div class="grid2">
<div class="card">כרטיס כניסה וקסם · 10 דק׳</div><div class="card">למה הנוסחה נכונה? · 10 דק׳</div>
<div class="card">מתי מותר להשתמש בה, ואיך? · 9 דק׳</div><div class="card">טעות נפוצה ו־4 דוגמאות פתורות · 23 דק׳</div>
<div class="card">תרגול בדף: 10 משימות · 27 דק׳</div><div class="card">כרטיס יציאה, שיעורי בית ופתרון הקסם · 11 דק׳</div>
</div>`},
{html:CSS+`<div class="eyebrow">הרעיון המרכזי · למה זה נכון?</div><h2>ריבוע פחות ריבוע הופך למלבן</h2><div style="flex:1;min-height:0;display:flex;align-items:center">${mainSvg}</div>`},
{html:CSS+`<div class="eyebrow">מתי מותר להשתמש בנוסחה?</div><h2>3 בדיקות לפני שמפרקים</h2>
<div class="chk"><div class="card"><b>1</b>יש <b style="display:inline;font-size:inherit">שני</b> איברים בלבד</div><div class="card step"><b>2</b>ביניהם <b style="display:inline;font-size:inherit">מינוס</b></div><div class="card step"><b>3</b>כל איבר הוא <b style="display:inline;font-size:inherit">ריבוע</b> של משהו</div></div>
<p class="step">מיינו: אפשר לפרק לפי הנוסחה? (מתוך עמ׳ 153, תרגיל 65)</p>
<div class="sort"><div class="card step">${eq('x² − y²')}<small>${G('כן')}</small></div><div class="card step">${eq('25 + c²')}<small>${R('לא – פלוס')}</small></div><div class="card step">${eq('9x² − 16')}<small>${G('כן')}</small></div><div class="card step">${eq('4n² + 16k²')}<small>${R('לא – פלוס')}</small></div></div>`},
{html:CSS+`<div class="eyebrow">השיטה</div><h2>שלושה צעדים ובדיקה</h2>
<ol>
<li class="step">${B('a')} = מה בריבוע נותן את <b>האיבר הראשון</b></li>
<li class="step">${R('b')} = מה בריבוע נותן את <b>האיבר השני</b></li>
<li class="step">כותבים: ${eq('('+B('a')+' + '+R('b')+')('+B('a')+' − '+R('b')+')')} — פעם <b>פלוס</b> ופעם <b>מינוס</b></li>
<li class="step">בודקים: פותחים סוגריים. האיברים האמצעיים מבטלים זה את זה וחוזרים לביטוי המקורי</li>
</ol>`},
{html:CSS+`<div class="eyebrow">הטעות הנפוצה</div><h2>${eq('(x − 8)²')} זה לא ${eq('x² − 64')}</h2>
<p class="xl" style="text-align:center">${eq('x² − 64 = '+R('(x − 8)²')+' ✗')}</p>
<p class="step">בודקים: ${eq('(x − 8)² = (x − 8)(x − 8) = x² − 16x + 64')}. זה ביטוי אחר!</p>
<p class="step xl" style="text-align:center">${eq('x² − 64 = '+G('(x + 8)(x − 8)')+' ✓')}</p>
<div class="card step what"><b>לזכור:</b> בפירוק של הפרש ריבועים יש <b>סוגריים אחד עם פלוס ואחד עם מינוס</b>.</div>`},
{html:CSS+`<div class="lvl">${stars(1)} ידע</div><h2>פרקו לגורמים: ${eq('x² − 49')}</h2>
${START('x² − 49')}
${P('= '+B('x')+'² − '+R('7')+'²',1,'בדקנו: שני איברים, מינוס ביניהם, כל איבר ריבוע. '+eq('49 = 7²'))}
${P(B('a = x')+' , '+R('b = 7'),2,'מצאנו את a (מהאיבר הראשון) ואת b (מהאיבר השני)')}
${P('= ('+B('x')+' + '+R('7')+')('+B('x')+' − '+R('7')+')',3,'כתבנו סכום כפול הפרש')}
${P(G('x² − 7x + 7x − 49 = x² − 49 ✓'),4,'בדקנו בפתיחת סוגריים: '+eq('−7x')+' ו־'+eq('+7x')+' מתבטלים')}`},
{html:CSS+`<div class="lvl">${stars(2)} יישום</div><h2>פרקו לגורמים: ${eq('16x² − 25')}</h2>
${START('16x² − 25')}
${P('= ('+B('4x')+')² − '+R('5')+'²',1,'שורש של המספר וגם של האות: '+eq('4x · 4x = 16x²')+', ו־'+eq('5 · 5 = 25'))}
${P(B('a = 4x')+' , '+R('b = 5'),2,'a הוא '+eq('4x')+' ולא '+eq('16x')+'!')}
${P('= ('+B('4x')+' + '+R('5')+')('+B('4x')+' − '+R('5')+')',3,'כתבנו סכום כפול הפרש')}
${P(G('16x² − 20x + 20x − 25 ✓'),4,'בדקנו בפתיחת סוגריים')}`},
{html:CSS+`<div class="lvl">${stars(3)} הבנה ונימוק · מוצאים טעות</div><h2>דנה כתבה: ${eq('16 − x² = (x + 4)(x − 4)')}<br>האם דנה צודקת?</h2>
${P('(x + 4)(x − 4) = '+R('x² − 16'),1,'בדקנו את דנה בפתיחת סוגריים: יצא '+eq('x² − 16')+' ולא '+eq('16 − x²'))}
${P(B('a = 4')+' , '+R('b = x'),2,'הטעות: דנה החליפה את הסדר. a הוא תמיד מה שבריבוע נותן את <b>האיבר הראשון</b>')}
${P('16 − x² = ('+B('4')+' + '+R('x')+')('+B('4')+' − '+R('x')+')',3,'כתבנו את הפירוק הנכון')}
${P(G('16 − 4x + 4x − x² = 16 − x² ✓'),4,'בדקנו שחזרנו לביטוי המקורי')}`},
{html:CSS+`<style>.g4 .pair>.eqc{font-size:2.4cqw}</style><div class="lvl">${stars(4)} חשיבה ואוריינות</div><h2>גינה ריבועית שצלעה 25 מ׳. בתוכה בריכה ריבועית שצלעה 15 מ׳. מה שטח הדשא?</h2>
<div class="row g4"><div class="col">
${P('25² − 15²',1,'שטח הדשא = הריבוע הגדול פחות הריבוע הקטן')}
${P('= ('+B('25')+' + '+R('15')+')('+B('25')+' − '+R('15')+')',2,'זה הפרש ריבועים, אז מפרקים')}
${P('= 40 · 10 = '+G('400'),3,'כפל קל בראש. התשובה: 400 מ״ר')}
${P(G('625 − 225 = 400 ✓'),4,'בדקנו בדרך הארוכה')}
</div><div class="vis" style="flex:.5">${gardenSvg}</div></div>`},
{html:`<div class="eyebrow">תרגול בכיתה · 27 דקות</div><h2>דף "משימות לכיתה ולבית" · חלק א׳</h2>
<ul>
<li>10 משימות בכל הרמות: ${stars(1)} עד ${stars(4)}</li>
<li class="step">מתחילים במשימות שמסומנות <b>חובה</b> (1, 2, 4, 5, 7, 9)</li>
<li class="step">כל תשובה בודקים בפתיחת סוגריים, ואז בתשובות בסוף הדף</li>
<li class="step">סיימתם? ספר עמ׳ 153, תרגיל 63: סעיפים 2, 4–8</li>
</ul>`},
{html:`<div class="eyebrow">כרטיס יציאה</div><h2>3 שאלות · לבד</h2>
<ol>
<li>פרקו: ${eq('x² − 100 =')} <span class="ans step">${eq('(x + 10)(x − 10)')}</span></li>
<li>פרקו: ${eq('4x² − 1 =')} <span class="ans step">${eq('(2x + 1)(2x − 1)')}</span></li>
<li>אפשר לפרק את ${eq('x² + 9')} לפי הנוסחה? נמקו. <span class="ans step">לא. יש פלוס בין האיברים, והנוסחה רק להפרש</span></li>
</ol>`},
{html:`<div class="eyebrow">שיעורי בית</div><h2>דף "משימות לכיתה ולבית" · חלק ב׳</h2>
<ul>
<li>10 משימות. <b>חובה:</b> 1, 2, 4, 5, 7, 9</li>
<li>המשימה הראשונה בכל רמה בנויה <b>כמו הדוגמה בשיעור</b></li>
<li>רשות: ספר עמ׳ 153, תרגיל 64: סעיפים 2–6</li>
</ul>`},
{html:CSS+`<div class="eyebrow">פתרון הקסם</div><h2>איך כפלתי ${eq('29 · 31')} בשנייה?</h2>
<p class="step xl" style="text-align:center">${eq('29 · 31 = ('+B('30')+' − '+R('1')+')('+B('30')+' + '+R('1')+')')}</p>
<p class="step xl" style="text-align:center">${eq('= '+B('30')+'² − '+R('1')+'² = 900 − 1 = '+G('899'))}</p>
<p class="step">עכשיו אתם: ${eq('21 · 19 = ?')} <span class="ans step">${eq('20² − 1² = 399')}</span></p>`}
];
