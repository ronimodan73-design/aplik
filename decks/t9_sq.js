// TITLE: ט׳ א2 · נוסחאות הכפל המקוצר | פתיחת סוגריים | פירוק לגורמים
// BAR: ט׳ א2 · ריבוע של סכום ושל הפרש · שיעור 1: פתיחת סוגריים · שיעור 2: פירוק לגורמים
const B=t=>`<span style="color:${C.ray};font-weight:700">${t}</span>`;
const G=t=>`<span style="color:${C.ok};font-weight:700">${t}</span>`;
const R=t=>`<span style="color:${C.ray2};font-weight:700">${t}</span>`;
const A=t=>`<span style="color:${C.acc};font-weight:700">${t}</span>`;
const W=(n,t)=>`<div class="card what"><b>מה עשינו? שלב ${n}:</b> ${t}</div>`;
const P=(e,n,t)=>`<div class="pair step"><div class="eqc">${eq(e)}</div>${W(n,t)}</div>`;
const START=e=>`<div class="pair"><div class="eqc" style="color:var(--ink)">${eq(e)}</div><div style="flex:1.3"></div></div>`;
const CSS=`<style>.pair{display:flex;gap:2cqw;align-items:center}.pair .card{padding:.6cqw 1.2cqw;font-size:1.55cqw}.pair>.eqc{flex:1;font-family:var(--display);font-weight:900;font-size:2.8cqw;color:var(--accent)}.pair>.card{flex:1.3}.xl{font-family:var(--display);font-weight:900;font-size:4.4cqw}
.sort{display:grid;grid-template-columns:repeat(5,1fr);gap:1.1cqw}.sort .card{text-align:center;font-size:2.5cqw;font-family:var(--display);font-weight:700}.sort .card small{display:block;font-size:1.5cqw;font-weight:400}
.chk{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4cqw}.chk .card{font-size:1.9cqw;text-align:center}.chk .card b.n{display:block;font-size:3.2cqw;color:var(--accent)}
.pc{transform-box:fill-box;transition:transform 1.6s cubic-bezier(.6,.05,.3,1);transform:var(--t)}svg:has(.asm.shown) .pc{transform:none}</style>`;
// square model: side = a + b. s,t = pixel sizes; la,lb = side labels; cells = [a², ab, ab, b²]; o.steps = pieces appear one by one
function sq(s,t,la,lb,cells,o={}){const x0=o.x0||70,y0=o.y0||60,fs=o.fs||28,cols=[C.ray,C.ok,C.ok,C.ray2];
 const rc=[[x0,y0,s,s],[x0+s,y0,t,s],[x0,y0+s,s,t],[x0+s,y0+s,t,t]];let g='';
 g+=`<g direction="ltr" font-size="${fs}" text-anchor="middle"><text x="${x0+s/2}" y="${y0-14}" style="fill:${C.ray}">${la}</text><text x="${x0+s+t/2}" y="${y0-14}" style="fill:${C.ray2}">${lb}</text>
 <text x="${x0-24}" y="${y0+s/2+10}" style="fill:${C.ray}">${la}</text><text x="${x0-24}" y="${y0+s+t/2+10}" style="fill:${C.ray2}">${lb}</text></g>`;
 g+=`<rect x="${x0}" y="${y0}" width="${s+t}" height="${s+t}" fill="none" stroke="${C.ink}" stroke-width="3"/>`;
 rc.forEach((r,i)=>{if(o.only&&!o.only.includes(i))return;const cl=o.steps?'step':'';const st=o.mv?` class="pc" style="--t:${o.mv[i]}"`:'';
  g+=`<g class="${cl}"><g${st}><rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" fill="${cols[i]}" fill-opacity=".35" stroke="${cols[i]}" stroke-width="3"/><text x="${r[0]+r[2]/2}" y="${r[1]+r[3]/2+10}" font-size="${fs}" text-anchor="middle" direction="ltr" style="fill:${C.ink};font-weight:700">${cells[i]}</text></g></g>`;});
 return g;}
const T=(y,html,cl='step',fs=27)=>`<text class="${cl}" x="900" y="${y}" font-size="${fs}" text-anchor="start" direction="rtl">${html}</text>`;
const L=t=>`<tspan direction="ltr" unicode-bidi="isolate">${t}</tspan>`;
// lesson 1 main animation: (x + 3)², x = 200px, 3 = 90px
const main1b=svg('0 0 920 400',sq(200,90,'x','3',['x²','3x','3x','9'],{only:[]})+
 T(70,`שטח הריבוע הגדול: ${L('(x + 3)²')}`,'')+
 `<g class="step">${sq(200,90,'x','3',['x²','3x','3x','9'],{only:[0]}).replace(/<g direction[\s\S]*?<\/g>/,'').replace(/<rect x="70" y="60" width="290"[^>]*\/>/,'')}<text x="900" y="130" font-size="27" text-anchor="start" direction="rtl">ריבוע כחול: ${L('x · x = x²')}</text></g>`+
 `<g class="step">${sq(200,90,'x','3',['x²','3x','3x','9'],{only:[1,2]}).replace(/<g direction[\s\S]*?<\/g>/,'').replace(/<rect x="70" y="60" width="290"[^>]*\/>/,'')}<text x="900" y="190" font-size="27" text-anchor="start" direction="rtl">שני מלבנים ירוקים: ${L('3 · x = 3x')} כל אחד</text></g>`+
 `<g class="step">${sq(200,90,'x','3',['x²','3x','3x','9'],{only:[3]}).replace(/<g direction[\s\S]*?<\/g>/,'').replace(/<rect x="70" y="60" width="290"[^>]*\/>/,'')}<text x="900" y="250" font-size="27" text-anchor="start" direction="rtl">ריבוע אדום: ${L('3 · 3 = 9')}</text></g>`+
 `<g class="step"><text x="900" y="320" font-size="34" font-weight="900" text-anchor="end" direction="ltr"><tspan style="fill:${C.ink}">(x + 3)² = </tspan><tspan style="fill:${C.ray}">x²</tspan><tspan style="fill:${C.ink}"> + </tspan><tspan style="fill:${C.ok}">6x</tspan><tspan style="fill:${C.ink}"> + </tspan><tspan style="fill:${C.ray2}">9</tspan></text></g>`+
 `<g class="step"><text x="900" y="375" font-size="26" text-anchor="end" direction="ltr" style="fill:${C.ok}">3x + 3x = 6x</text></g>`);
// error picture: only x² and 9 → empty rectangles
const err1=svg('0 0 400 380',sq(200,90,'x','3',['x²','','','9'],{only:[0,3]})+
 `<g class="step"><rect x="270" y="60" width="90" height="200" fill="none" stroke="${C.acc}" stroke-width="4" stroke-dasharray="10 7"/><rect x="70" y="260" width="200" height="90" fill="none" stroke="${C.acc}" stroke-width="4" stroke-dasharray="10 7"/><text x="315" y="170" font-size="40" text-anchor="middle" style="fill:${C.acc}">?</text><text x="170" y="318" font-size="40" text-anchor="middle" style="fill:${C.acc}">?</text></g>`);
// garden: side x, add 2
const garden=svg('0 0 400 380',sq(220,80,'x','2',['ישן','2x','2x','4'],{fs:26}));
// lesson 2: assemble pieces into a square (x + 4)²
const asm=svg('0 0 920 400',sq(200,100,'x','4',['x²','4x','4x','16'],{mv:['translate(0px,0px)','translate(210px,-20px)','translate(550px,-200px)','translate(510px,-20px)']}).replace(/<g direction[\s\S]*?<\/g>/,'').replace(/<rect x="70" y="60" width="300"[^>]*\/>/,'')+
 `<g class="step asm"><rect x="70" y="60" width="300" height="300" fill="none" stroke="${C.acc}" stroke-width="5"/></g>`+
 `<g class="step" direction="ltr" font-size="30" text-anchor="middle"><text x="170" y="44" style="fill:${C.ray}">x</text><text x="320" y="44" style="fill:${C.ray2}">4</text><text x="40" y="170" style="fill:${C.ray}">x</text><text x="40" y="320" style="fill:${C.ray2}">4</text></g>`+
 `<g class="step"><text x="900" y="380" font-size="32" font-weight="900" text-anchor="end" direction="ltr"><tspan style="fill:${C.ray}">x²</tspan><tspan style="fill:${C.ink}"> + </tspan><tspan style="fill:${C.ok}">8x</tspan><tspan style="fill:${C.ink}"> + </tspan><tspan style="fill:${C.ray2}">16</tspan><tspan style="fill:${C.ink}"> = </tspan><tspan style="fill:${C.acc}">(x + 4)²</tspan></text></g>`);
const area2=svg('0 0 340 340',`<rect x="40" y="40" width="260" height="260" fill="${C.ok}" fill-opacity=".25" stroke="${C.ok}" stroke-width="4"/><text x="170" y="182" font-size="30" text-anchor="middle" direction="ltr" style="fill:${C.ink}">4x² + 20x + 25</text><text x="170" y="28" font-size="30" text-anchor="middle" style="fill:${C.acc}">?</text>`);
// why 2ab: generic square, two equal rectangles
const why2=svg('0 0 920 400',sq(200,110,'a','b',['a²','a · b','a · b','b²'])+
 `<g class="step"><rect x="270" y="60" width="110" height="200" fill="none" stroke="${C.acc}" stroke-width="6"/><circle cx="325" cy="95" r="18" fill="${C.acc}"/><text x="325" y="103" font-size="24" text-anchor="middle" style="fill:#0f1b2d;font-weight:900">1</text></g>`+
 `<g class="step"><rect x="70" y="260" width="200" height="110" fill="none" stroke="${C.acc}" stroke-width="6"/><circle cx="105" cy="290" r="18" fill="${C.acc}"/><text x="105" y="298" font-size="24" text-anchor="middle" style="fill:#0f1b2d;font-weight:900">2</text></g>`+
 T(90,`מלבן 1: אורך ${L('a')}, רוחב ${L('b')} → שטח ${L('a · b')}`)+
 T(160,`מלבן 2: בדיוק אותו מלבן → שוב ${L('a · b')}`)+
 T(230,`שני מלבנים זהים: ${L('a · b + a · b')}`)+
 `<g class="step"><text x="900" y="310" font-size="40" font-weight="900" text-anchor="end" direction="ltr" style="fill:${C.ok}">= 2 · a · b = 2ab</text></g>`+
 T(375,`ה־2 סופר את <tspan style="fill:${C.acc};font-weight:700">מספר המלבנים</tspan>`));
const SLIDES=[
menu('ט׳ א2 · נוסחאות הכפל המקוצר',[{id:'l1',n:1,t:'פתיחת סוגריים: ריבוע של סכום ושל הפרש',d:'דף העבודה · רמה א, תרגילים 1–6'},{id:'l2',n:2,t:'פירוק לגורמים: מזהים ריבוע שלם',d:'דף העבודה · רמות ב–ג, תרגילים 7–30'}]),
// ================= LESSON 1 =================
cover('l1',1,'פתיחת סוגריים בריבוע','נוסחאות הכפל המקוצר',`ריבוע של סכום הוא לא רק שני ריבועים, יש גם את שני המלבנים שביניהם: ${eq('(a + b)² = a² + 2ab + b²')}`),
{html:`<div class="eyebrow">כרטיס כניסה · 5 דקות</div><h2>נזכרים במה שכבר יודעים</h2>
<ol>
<li>חשבו: ${eq('7² =')} <span class="ans step">49</span> &nbsp; ${eq('(−4)² =')} <span class="ans step">16</span> &nbsp; ${eq('(3x)² =')} <span class="ans step">${eq('9x²')}</span></li>
<li>פתחו סוגריים: ${eq('3(x + 5) =')} <span class="ans step">${eq('3x + 15')}</span></li>
<li>פתחו סוגריים: ${eq('(x + 2)(x + 3) =')} <span class="ans step">${eq('x² + 3x + 2x + 6 = x² + 5x + 6')}</span></li>
<li>מה פירוש ${eq('(x + 5)²')}? <span class="ans step">${eq('(x + 5)(x + 5)')}: הסוגריים כפול עצמם</span></li>
</ol>`},
{html:CSS+`<div class="eyebrow">למה צריך את זה?</div><h2>אתגר: מי מחשב מהר יותר, אתם או המחשבון?</h2>
<p class="xl" style="text-align:center">${eq('51² = ?')}</p>
<p class="step xl" style="text-align:center">${eq('(50 + 1)² = 2500 + 100 + 1 = '+G('2601'))}</p>
<p class="step">בסוף השיעור תבינו מאיפה הגיע ה־100. וזה גם הבסיס לפירוק לגורמים בשיעור הבא.</p>`},
{html:`<div class="eyebrow">מטרות השיעור</div><h1>היום נדע…</h1>
<ol>
<li class="step">מה פירוש ${eq('(a + b)²')}, ולמה התשובה היא <b>לא</b> ${eq('a² + b²')}</li>
<li class="step">לראות בציור של ריבוע מאיפה מגיע האיבר האמצעי ${eq('2ab')}</li>
<li class="step">לפתוח סוגריים של ריבוע של סכום ושל הפרש</li>
<li class="step">לבדוק את עצמנו בכפל של הסוגריים</li>
</ol>`},
{html:`<div class="eyebrow">מה עושים היום בכיתה</div><h2>מסלול השיעור</h2>
<div class="grid2">
<div class="card">1. כרטיס כניסה ואתגר</div><div class="card">2. הריבוע שמתפרק ל־4 חלקים</div>
<div class="card">3. הנוסחה, והטעות שכולם עושים</div><div class="card">4. ארבע דוגמאות פתורות, מ־${stars(1)} עד ${stars(4)}</div>
<div class="card">5. תרגול בדף: תרגילים 1–6</div><div class="card">6. כרטיס יציאה ושיעורי בית</div>
</div>`},
{html:CSS+`<div class="eyebrow">הרעיון המרכזי · למה זה נכון?</div><h2>ריבוע שצלעו ${eq('x + 3')} מתפרק ל־4 חלקים</h2><div style="flex:1;min-height:0;display:flex;align-items:center">${main1b}</div>`},
{html:CSS+`<div class="eyebrow">הנוסחה</div><h2>שתי נוסחאות, אותו ציור</h2>
<p class="xl" style="text-align:center">${eq('(a + b)² = '+B('a²')+' + '+G('2ab')+' + '+R('b²'))}</p>
<p class="step xl" style="text-align:center">${eq('(a − b)² = '+B('a²')+' − '+G('2ab')+' + '+R('b²'))}</p>
<ol>
<li class="step">${B('ריבוע של הראשון')}</li>
<li class="step">${G('פעמיים הראשון כפול השני')}. הסימן שלו הוא הסימן שבסוגריים</li>
<li class="step">${R('ריבוע של השני')}. תמיד פלוס, כי ריבוע אף פעם לא שלילי</li>
</ol>`},
{html:CSS+`<div class="eyebrow">מאיפה מגיע ה־2ab?</div><h2>2ab = שני מלבנים זהים</h2><div style="flex:1;min-height:0;display:flex;align-items:center">${why2}</div>`},
{html:CSS+`<div class="eyebrow">איך מחשבים את האיבר האמצעי?</div><h2>שואלים 3 שאלות</h2>
<p class="xl" style="text-align:center">${eq('(x + 5)²')}</p>
${P('a = '+B('x'),1,'מי <b>הראשון</b> בסוגריים? '+eq(B('x')))}
${P('b = '+R('5'),2,'מי <b>השני</b> בסוגריים? '+eq(R('5')))}
${P(G('2 · ')+B('x')+G(' · ')+R('5')+' = '+G('10x'),3,'האמצעי: <b>פעמיים</b> הראשון כפול השני')}
${P('x² + '+G('10x')+' + 25',4,'ריבוע של הראשון, האמצעי, ריבוע של השני')}`},
{html:CSS+`<div class="eyebrow">מתי יש 2ab ומתי אין?</div><h2>יש ריבוע ⇐ יש 2ab. תמיד.</h2>
<div class="chk">
<div class="card">${eq('(x + 5)²')}<br>${eq('= (x + 5)(x + 5)')}<b class="n step">${eq('+10x')}</b><span class="step">יש 2ab, עם <b>פלוס</b></span></div>
<div class="card step">${eq('(x − 5)²')}<br>${eq('= (x − 5)(x − 5)')}<b class="n step">${eq('−10x')}</b><span class="step">יש 2ab, עם <b>מינוס</b></span></div>
<div class="card step">${eq('(x + 5)(x − 5)')}<br>${eq('+5x − 5x = 0')}<b class="n step">${eq('x² − 25')}</b><span class="step">אין 2ab: האמצעיים <b>מתבטלים</b> (הפרש ריבועים)</span></div>
</div>
<div class="card step what"><b>לזכור:</b> סוגריים <b>בריבוע</b> (אותם סוגריים פעמיים) ⇐ תמיד יש איבר אמצעי ${eq('2ab')}. רק כשהסימנים בסוגריים הפוכים, הוא נעלם.</div>`},
{html:CSS+`<div class="eyebrow">הטעות הנפוצה</div><h2>${eq('(x + 3)²')} זה <span style="color:var(--ray2)">לא</span> ${eq('x² + 9')}</h2>
<div class="row"><div class="col">
<p class="xl">${eq('(x + 3)² = '+R('x² + 9')+' ✗')}</p>
<p class="step">בציור: ${eq('x² + 9')} ממלא רק את הפינות. <b>שני המלבנים חסרים!</b></p>
<p class="step xl">${eq('(x + 3)² = '+G('x² + 6x + 9')+' ✓')}</p>
<div class="card step what"><b>בדיקה עם מספר:</b> ${eq('x = 1')}: ${eq('(1 + 3)² = 16')}, אבל ${eq('1 + 9 = 10')}. לא שווה!</div>
</div><div class="vis" style="flex:.7">${err1}</div></div>`},
{html:CSS+`<div class="lvl">${stars(1)} ידע</div><h2>פתחו סוגריים: ${eq('(x + 6)²')}</h2>
${START('(x + 6)²')}
${P(B('a = x')+' , '+R('b = 6'),1,'זיהינו מי הראשון ומי השני בסוגריים')}
${P('= '+B('x²')+' + '+G('2 · x · 6')+' + '+R('6²'),2,'כתבנו לפי הנוסחה: ריבוע, פעמיים מכפלה, ריבוע')}
${P('= '+B('x²')+' + '+G('12x')+' + '+R('36'),3,'חישבנו כל איבר')}
${P(G('(x + 6)(x + 6) = x² + 6x + 6x + 36 ✓'),4,'בדקנו בכפל סוגריים. שני ה־'+eq('6x')+' הם שני המלבנים')}`},
{html:CSS+`<div class="lvl">${stars(2)} יישום</div><h2>פתחו סוגריים: ${eq('(2x − 7)²')}</h2>
${START('(2x − 7)²')}
${P(B('a = 2x')+' , '+R('b = 7'),1,'הראשון הוא '+eq('2x')+', כולל המקדם. הסימן מינוס, אז האמצעי יהיה מינוס')}
${P('= '+B('(2x)²')+' − '+G('2 · 2x · 7')+' + '+R('7²'),2,'שמנו סוגריים סביב '+eq('2x')+', כדי לא לשכוח לרבע גם את ה־2')}
${P('= '+B('4x²')+' − '+G('28x')+' + '+R('49'),3,'חישבנו: '+eq('(2x)² = 4x²')+', ולא '+eq('2x²'))}
${P(G('(2 − 7)² = 25 = 4 − 28 + 49 ✓'),4,'בדקנו בהצבה '+eq('x = 1')+' בשני הצדדים: יצא אותו מספר')}`},
{html:CSS+`<div class="lvl">${stars(3)} הבנה ונימוק · מוצאים טעות</div><h2>יוסי כתב: ${eq('(x − 5)² = x² − 25')}. האם יוסי צודק?</h2>
${P('(1 − 5)² = 16 ≠ '+R('−24'),1,'בדקנו בהצבה '+eq('x = 1')+': משמאל 16, מימין '+eq('1 − 25 = −24')+'. יוסי טועה')}
${P(R('x² − 25'),2,'הטעות: יוסי ריבע רק את הקצוות ושכח את '+G('2ab')+'. גם הסימן של 25 שגוי: ריבוע תמיד חיובי')}
${P('(x − 5)² = '+B('x²')+' − '+G('10x')+' + '+R('25'),3,'כתבנו את הפתיחה הנכונה לפי הנוסחה')}
${P(G('1 − 10 + 25 = 16 ✓'),4,'בדקנו שוב עם '+eq('x = 1')+': עכשיו יוצא 16')}`},
{html:CSS+`<div class="lvl">${stars(4)} חשיבה ואוריינות</div><h2>לגינה ריבועית צלע של ${eq('x')} מטרים. הגדילו כל צלע ב־2 מ׳. בכמה גדל השטח?</h2>
<div class="row"><div class="col">
${P('(x + 2)²',1,'שטח הגינה החדשה: ריבוע שצלעו '+eq('x + 2'))}
${P('= x² + 4x + 4',2,'פתחנו סוגריים לפי הנוסחה')}
${P(G('4x + 4'),3,'הורדנו את השטח הישן '+eq('x²')+'. התוספת: '+eq('4x + 4')+' מ״ר')}
${P(G('12² − 10² = 44 ✓'),4,'בדקנו עם '+eq('x = 10')+': '+eq('4 · 10 + 4 = 44'))}
</div><div class="vis" style="flex:.55">${garden}</div></div>`},
{html:`<div class="eyebrow">תרגול בכיתה</div><h2>דף העבודה · רמה א: תרגילים 1–6</h2>
<ul>
<li>פותחים סוגריים לפי שלושת השלבים: ריבוע, פעמיים מכפלה, ריבוע</li>
<li class="step">שימו לב לסימן: בתרגילים 3, 4 ו־6 האיבר האמצעי <b>מינוס</b></li>
<li class="step">בתרגילים 5–6 יש מקדם: ${eq('(2x)²')} ו־${eq('(3x)²')}</li>
<li class="step">כל תשובה בודקים בהצבה של ${eq('x = 1')}</li>
</ul>`},
{html:`<div class="eyebrow">כרטיס יציאה</div><h2>3 שאלות · לבד</h2>
<ol>
<li>פתחו סוגריים: ${eq('(x + 9)² =')} <span class="ans step">${eq('x² + 18x + 81')}</span></li>
<li>פתחו סוגריים: ${eq('(3x − 1)² =')} <span class="ans step">${eq('9x² − 6x + 1')}</span></li>
<li>למה ${eq('(x + 4)² ≠ x² + 16')}? <span class="ans step">חסר האיבר ${eq('8x')}: שני המלבנים שבציור</span></li>
</ol>`},
{html:`<div class="eyebrow">שיעורי בית</div><h2>לקראת השיעור הבא</h2>
<ul>
<li>לסיים בדף את תרגילים 1–6, עם בדיקה בהצבה במחברת</li>
<li>חשבו בראש בעזרת הנוסחה: ${eq('31²')} ו־${eq('49²')}</li>
<li>בשיעור הבא נלך <b>בכיוון ההפוך</b>: נקבל ${eq('x² + 6x + 9')} ונגלה מאיזה ריבוע הוא הגיע</li>
</ul>`},
// ================= LESSON 2 =================
cover('l2',2,'פירוק לגורמים: ריבוע שלם','נוסחאות הכפל המקוצר',`הולכים בכיוון ההפוך: מזהים שני ריבועים בקצוות ובודקים שהאמצעי הוא ${eq('2ab')}. אז ${eq('a² ± 2ab + b² = (a ± b)²')}`),
{html:`<div class="eyebrow">כרטיס כניסה · 5 דקות</div><h2>נזכרים בשיעור הקודם</h2>
<ol>
<li>פתחו סוגריים: ${eq('(x + 5)² =')} <span class="ans step">${eq('x² + 10x + 25')}</span></li>
<li>פתחו סוגריים: ${eq('(2x − 3)² =')} <span class="ans step">${eq('4x² − 12x + 9')}</span></li>
<li>מה בריבוע נותן ${eq('64')}? ${eq('25x²')}? <span class="ans step">${eq('8')} , ${eq('5x')}</span></li>
<li>חשבו: ${eq('2 · 3x · 4 =')} <span class="ans step">${eq('24x')}</span></li>
</ol>`},
{html:CSS+`<div class="eyebrow">חימום מהיר</div><h2>מי ריבוע של משהו?</h2>
<div class="sort"><div class="card">${eq('49')}<small class="step">${G('כן: 7²')}</small></div><div class="card">${eq('9x²')}<small class="step">${G('כן: (3x)²')}</small></div><div class="card">${eq('20')}<small class="step">${R('לא')}</small></div><div class="card">${eq('25y²')}<small class="step">${G('כן: (5y)²')}</small></div><div class="card">${eq('8x²')}<small class="step">${R('לא: 8 לא ריבוע')}</small></div></div>
<p class="step">בפירוק נצטרך לזהות ריבועים מהר. זה הצעד הראשון בכל תרגיל.</p>`},
{html:CSS+`<div class="eyebrow">למה צריך את זה?</div><h2>כל החלקים על השולחן. איזה ריבוע הם בונים?</h2>
<p class="xl" style="text-align:center">${eq('x² + 6x + 9 = (?)²')}</p>
<p class="step">פתיחת סוגריים היא פירוק של ריבוע לחלקים. <b>פירוק לגורמים הוא הרכבה חזרה</b>.</p>
<p class="step">ובהמשך השנה, בפתרון משוואות ריבועיות, פירוק כזה יחסוך לנו הרבה עבודה.</p>`},
{html:`<div class="eyebrow">מטרות השיעור</div><h1>היום נדע…</h1>
<ol>
<li class="step">לזהות ביטוי שהוא <b>ריבוע שלם</b></li>
<li class="step">למצוא את ${eq('a')} ואת ${eq('b')} מתוך שני הריבועים שבקצוות</li>
<li class="step">לבדוק שהאיבר האמצעי הוא באמת ${eq('2ab')}</li>
<li class="step">לפרק, גם כשהסדר הפוך וגם עם שני משתנים</li>
</ol>`},
{html:`<div class="eyebrow">מה עושים היום בכיתה</div><h2>מסלול השיעור</h2>
<div class="grid2">
<div class="card">1. כרטיס כניסה וחימום</div><div class="card">2. מרכיבים ריבוע מחלקים</div>
<div class="card">3. מתכון של 3 בדיקות, וטעות נפוצה</div><div class="card">4. ארבע דוגמאות פתורות, מ־${stars(1)} עד ${stars(4)}</div>
<div class="card">5. תרגול בדף: תרגילים 7–14, 27–28</div><div class="card">6. כרטיס יציאה ושיעורי בית</div>
</div>`},
{html:CSS+`<div class="eyebrow">הרעיון המרכזי</div><h2>מרכיבים את ${eq('x² + 8x + 16')} לריבוע</h2>
<p style="margin:0">ה־${G('8x')} מתחלק לשני מלבנים של ${G('4x')}. לחצו והחלקים יתחברו:</p>
<div style="flex:1;min-height:0;display:flex;align-items:center">${asm}</div>`},
{html:CSS+`<div class="eyebrow">המתכון</div><h2>3 בדיקות לפני שמפרקים</h2>
<div class="chk"><div class="card"><b class="n">1</b>בשני <b>הקצוות</b> יש ריבועים: מוצאים את ${B('a')} ואת ${R('b')}</div><div class="card step"><b class="n">2</b>בודקים: האיבר האמצעי הוא ${eq(G('2 · a · b'))}?</div><div class="card step"><b class="n">3</b>הסימן של האמצעי קובע את הסימן בסוגריים</div></div>
<p class="step" style="text-align:center;font-family:var(--display);font-weight:900;font-size:3cqw">${eq(B('9x²')+' − '+G('30x')+' + '+R('25')+' &nbsp;→&nbsp; 2 · '+B('3x')+' · '+R('5')+' = '+G('30x')+' ✓ &nbsp;→&nbsp; ('+B('3x')+' − '+R('5')+')²')}</p>
<div class="card step what"><b>אם הסדר מבולגן</b> (כמו ${eq('25 + 10x + x²')}): קודם מסדרים לפי החזקות, ואז בודקים.</div>`},
{html:CSS+`<style>.tb{width:100%;border-collapse:collapse;font-size:2.1cqw;text-align:center}.tb td,.tb th{border:2px solid var(--line);padding:.6cqw}.tb th{color:var(--accent)}</style><div class="eyebrow">בדיקה 2 · שלב אחרי שלב</div><h2>האמצעי שווה ל־${eq('2 · a · b')}? רק אז זה ריבוע שלם</h2>
<table class="tb"><tr><th>הביטוי</th><th>${eq('a')}</th><th>${eq('b')}</th><th>${eq('2 · a · b')}</th><th>האמצעי בביטוי</th><th>ריבוע שלם?</th></tr>
<tr class="step"><td>${eq('x² + 6x + 9')}</td><td>${eq(B('x'))}</td><td>${eq(R('3'))}</td><td>${eq('2 · '+B('x')+' · '+R('3')+' = '+G('6x'))}</td><td>${eq(G('6x'))}</td><td>${G('כן')}: ${eq('(x + 3)²')}</td></tr>
<tr class="step"><td>${eq('4x² − 12x + 9')}</td><td>${eq(B('2x'))}</td><td>${eq(R('3'))}</td><td>${eq('2 · '+B('2x')+' · '+R('3')+' = '+G('12x'))}</td><td>${eq(G('−12x'))}</td><td>${G('כן')}: ${eq('(2x − 3)²')}</td></tr>
<tr class="step"><td>${eq('x² + 10x + 9')}</td><td>${eq(B('x'))}</td><td>${eq(R('3'))}</td><td>${eq('2 · '+B('x')+' · '+R('3')+' = '+G('6x'))}</td><td>${eq(R('10x'))}</td><td>${R('לא')}</td></tr>
</table>`},
{html:CSS+`<div class="eyebrow">הטעות הנפוצה</div><h2>לא כל ביטוי עם שני ריבועים הוא ריבוע שלם</h2>
<p class="xl" style="text-align:center">${eq('x² + 10x + 9 = '+R('(x + 3)²')+' ✗')}</p>
<p class="step">בודקים את האמצעי: ${eq('2 · x · 3 = '+G('6x'))}, אבל בביטוי כתוב ${eq(R('10x'))}.</p>
<p class="step">לכן ${eq('x² + 10x + 9')} <b>אינו</b> ריבוע שלם, ואי אפשר לפרק אותו לפי הנוסחה.</p>
<div class="card step what"><b>לזכור:</b> בדיקה 2 היא החשובה ביותר. בלי האמצעי הנכון אין ריבוע שלם.</div>`},
{html:CSS+`<div class="lvl">${stars(1)} ידע</div><h2>פרקו לגורמים: ${eq('x² − 16x + 64')}</h2>
${START('x² − 16x + 64')}
${P(B('a = x')+' , '+R('b = 8'),1,'מצאנו את הריבועים בקצוות: '+eq('x² = x · x')+', '+eq('64 = 8 · 8'))}
${P(G('2 · x · 8 = 16x')+' ✓',2,'בדקנו שהאמצעי הוא פעמיים המכפלה')}
${P('= ('+B('x')+' − '+R('8')+')²',3,'האמצעי מינוס, לכן מינוס בסוגריים')}
${P(G('(x − 8)² = x² − 16x + 64 ✓'),4,'בדקנו בפתיחת סוגריים')}`},
{html:CSS+`<div class="lvl">${stars(2)} יישום</div><h2>פרקו לגורמים: ${eq('9x² + 42x + 49')}</h2>
${START('9x² + 42x + 49')}
${P(B('a = 3x')+' , '+R('b = 7'),1,'שורש של המספר וגם של האות: '+eq('3x · 3x = 9x²')+'. לא '+eq('9x')+'!')}
${P(G('2 · 3x · 7 = 42x')+' ✓',2,'בדקנו את האיבר האמצעי')}
${P('= ('+B('3x')+' + '+R('7')+')²',3,'האמצעי פלוס, לכן פלוס בסוגריים')}
${P(G('9x² + 42x + 49 ✓'),4,'בדקנו בפתיחת סוגריים')}`},
{html:CSS+`<div class="lvl">${stars(3)} הבנה ונימוק</div><h2>נועה אמרה: ${eq('16x² + 12x + 9')} הוא ריבוע שלם. האם היא צודקת?</h2>
${P(B('a = 4x')+' , '+R('b = 3'),1,'בקצוות יש ריבועים: '+eq('16x² = (4x)²')+', '+eq('9 = 3²'))}
${P('2 · 4x · 3 = '+G('24x')+' ≠ '+R('12x'),2,'בדקנו את האמצעי: צריך '+eq('24x')+', וכתוב '+eq('12x'))}
${P(R('נועה טועה'),3,'הביטוי אינו ריבוע שלם. שני ריבועים בקצוות לא מספיקים')}
${P(G('16x² + 24x + 9 = (4x + 3)²'),4,'תיקנו: כך נראה הריבוע השלם עם אותם קצוות')}`},
{html:CSS+`<div class="lvl">${stars(4)} חשיבה ואוריינות</div><h2>שטח ריבוע הוא ${eq('4x² + 20x + 25')} סמ״ר (${eq('x')} חיובי). מה אורך הצלע? מה ההיקף?</h2>
<div class="row"><div class="col">
${P(B('a = 2x')+' , '+R('b = 5'),1,'בקצוות ריבועים. בדקנו את האמצעי: '+eq('2 · 2x · 5 = 20x')+' ✓')}
${P('= (2x + 5)²',2,'פירקנו לגורמים: זה ריבוע שלם')}
${P(G('2x + 5'),3,'שטח ריבוע = צלע בריבוע, לכן הצלע היא '+eq('2x + 5')+' ס״מ')}
${P(G('8x + 20'),4,'היקף = ארבע צלעות שוות: '+eq('4(2x + 5) = 8x + 20')+' ס״מ')}
</div><div class="vis" style="flex:.45">${area2}</div></div>`},
{html:`<div class="eyebrow">תרגול בכיתה</div><h2>דף העבודה · רמה ב–ג</h2>
<ul>
<li>תרגילים 7–14: מפרקים לפי 3 הבדיקות</li>
<li class="step">תרגיל 27: איזה מקדם הופך את הביטוי לריבוע שלם? רמז: בדיקה 2</li>
<li class="step">תרגיל 28: מוצאים את הטעות. מה בריבוע נותן ${eq('4x²')}?</li>
<li class="step">כל פירוק בודקים בפתיחת סוגריים</li>
</ul>`},
{html:`<div class="eyebrow">כרטיס יציאה</div><h2>3 שאלות · לבד</h2>
<ol>
<li>פרקו: ${eq('x² − 10x + 25 =')} <span class="ans step">${eq('(x − 5)²')}</span></li>
<li>פרקו: ${eq('16x² + 24x + 9 =')} <span class="ans step">${eq('(4x + 3)²')}</span></li>
<li>האם ${eq('x² + 8x + 4')} ריבוע שלם? נמקו. <span class="ans step">לא. ${eq('2 · x · 2 = 4x')}, ולא ${eq('8x')}</span></li>
</ol>`},
{html:`<div class="eyebrow">שיעורי בית</div><h2>דף העבודה · להשלים ולהגיש</h2>
<ul>
<li>תרגילים 15–26 (שימו לב לסדר הפוך ולשני משתנים)</li>
<li>תרגיל 29: מהשטח לאורך הצלע, כמו בדוגמה ${stars(4)}</li>
<li>תרגיל 30: כרטיס יציאה, בונים טרינום משלכם ובודקים</li>
<li>לפני ההגשה: בדקתם סימנים וצירפתם דרך פתרון ובדיקה לכל תרגיל</li>
</ul>`}
];
