// TITLE: ט׳ א2 · היקף ושטח בדלתון עם פיתגורס
// BAR: ט׳ א2 · דלתון: היקף ושטח · משפט פיתגורס במשולשים שבתוך הדלתון
const B=t=>`<span style="color:${C.ray};font-weight:700">${t}</span>`;
const R=t=>`<span style="color:${C.ray2};font-weight:700">${t}</span>`;
const A=t=>`<span style="color:${C.acc};font-weight:700">${t}</span>`;
const G=t=>`<span style="color:${C.ok};font-weight:700">${t}</span>`;
const W=(n,t)=>`<div class="card what"><b>מה עשינו? שלב ${n}:</b> ${t}</div>`;
const P=(e,n,t)=>`<div class="pair step"><div class="eqc">${eq(e)}</div>${W(n,t)}</div>`;
const FR=(a,b)=>`<span class="fr"><span>${a}</span><span>${b}</span></span>`;
const CSS=`<style>.pair{display:flex;gap:1.6cqw;align-items:center}.pair .card{padding:.5cqw 1.1cqw;font-size:1.45cqw}.pair>.eqc{flex:1.15;font-family:var(--display);font-weight:900;font-size:1.85cqw;color:var(--accent)}.pair>.card{flex:1.4}
.slide span[dir=ltr]{white-space:nowrap}.fr{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;margin:0 .3em}.fr>span:last-child{border-top:.15em solid currentColor}
.big{font-family:var(--display);font-weight:900;font-size:3.6cqw}.tools{display:grid;grid-template-columns:repeat(3,1fr);gap:1.4cqw}.tools .card{font-size:1.7cqw}.tools .card b{display:block;color:var(--accent);font-size:2.1cqw}</style>`;
const PT=(x,y,k,dx,dy)=>`<circle cx="${x}" cy="${y}" r="5" fill="${C.ink}"/><text x="${x+dx}" y="${y+dy}" font-size="24" style="fill:${C.ink}">${k}</text>`;
const LB=(x,y,t,col,cl='',fs=22)=>`<text class="${cl}" x="${x}" y="${y}" font-size="${fs}" text-anchor="middle" direction="ltr" style="fill:${col};font-weight:700">${t}</text>`;
// kite drawn to scale. p = AM, q = MC, h = BM = MD.  o.lab = {AM,MC,BM,MD,AB,BC}, o.tri = highlight triangle 'ABM' | 'CBM', o.ra = right angle
function kiteN(p,q,h,o={}){const s=Math.min(330/(p+q),330/(2*h)),cx=200,top=30;
 const Ap=[cx,top],M=[cx,top+p*s],Cp=[cx,top+(p+q)*s],Bp=[cx-h*s,M[1]],Dp=[cx+h*s,M[1]];
 const seg=(a,b,col,w=5,da='')=>`<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" ${da?`stroke-dasharray="${da}"`:''}/>`;
 const poly=(pts,col,cl='')=>`<polygon class="${cl}" points="${pts.map(t=>t.join(',')).join(' ')}" fill="${col}" fill-opacity=".35" stroke="none"/>`;
 let g='';const lab=o.lab||{};
 if(o.tri==='ABM')g+=poly([Ap,Bp,M],C.ray,o.triStep?'step':'');
 if(o.tri==='CBM')g+=poly([Cp,Bp,M],C.ray2,o.triStep?'step':'');
 if(o.tri==='both')g+=poly([Ap,Bp,M],C.ray,'step')+poly([Cp,Bp,M],C.ray2,'step');
 g+=seg(Ap,Bp,C.ray)+seg(Ap,Dp,C.ray)+seg(Bp,Cp,C.ray2)+seg(Dp,Cp,C.ray2);
 if(o.diag!==false)g+=seg(Ap,Cp,C.acc,3.5)+seg(Bp,Dp,C.ok,3.5,'9 6');
 if(o.ra!==false&&o.diag!==false)g+=`<path d="M${cx} ${M[1]-13} H${cx+13} V${M[1]}" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`;
 const mid=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];
 const put=(k,pt,dx,dy,col)=>{if(lab[k]==null)return;const v=lab[k],cl=Array.isArray(v)?v[1]:'',t=Array.isArray(v)?v[0]:v;g+=LB(pt[0]+dx,pt[1]+dy,t,col,cl);};
 put('AM',mid(Ap,M),-22,8,C.acc);put('MC',mid(M,Cp),-24,8,C.acc);put('BM',mid(Bp,M),0,-10,C.ok);put('MD',mid(M,Dp),0,-10,C.ok);
 put('AB',mid(Ap,Bp),-24,-4,C.ray);put('AD',mid(Ap,Dp),26,-4,C.ray);put('BC',mid(Bp,Cp),-30,4,C.ray2);put('DC',mid(Dp,Cp),30,4,C.ray2);
 g+=PT(...Ap,'A',-8,-10)+PT(...Bp,'B',-28,8)+PT(...Cp,'C',-8,30)+PT(...Dp,'D',12,8);
 if(o.diag!==false)g+=`<text x="${cx+8}" y="${M[1]+26}" font-size="20" style="fill:${C.ink}">M</text>`;
 return svg(`-40 0 480 ${Cp[1]+45}`,g);}
// main animation: kite inside the rectangle of its diagonals; each inner triangle has an equal twin outside
function halfRect(){const p=4,q=10,h=6,s=24,cx=200,top=20;const Ap=[cx,top],M=[cx,top+p*s],Cp=[cx,top+(p+q)*s],Bp=[cx-h*s,M[1]],Dp=[cx+h*s,M[1]];
 const TL=[Bp[0],top],TR=[Dp[0],top],BL=[Bp[0],Cp[1]],BR=[Dp[0],Cp[1]];
 const poly=(pts,col,op)=>`<polygon points="${pts.map(t=>t.join(',')).join(' ')}" fill="${col}" fill-opacity="${op}" stroke="${col}" stroke-width="2"/>`;
 const pairs=[[[Ap,Bp,M],[Ap,Bp,TL],C.ray],[[Ap,Dp,M],[Ap,Dp,TR],'#b48cff'],[[Cp,Bp,M],[Cp,Bp,BL],C.ray2],[[Cp,Dp,M],[Cp,Dp,BR],C.ok]];
 let g=`<rect class="step" x="${TL[0]}" y="${top}" width="${2*h*s}" height="${(p+q)*s}" fill="none" stroke="${C.ink}" stroke-width="3" stroke-dasharray="10 7"/>`;
 pairs.forEach(([a,b,col])=>g+=`<g class="step">${poly(a,col,.55)}${poly(b,col,.22)}</g>`);
 g+=`<line x1="${Ap[0]}" y1="${Ap[1]}" x2="${Bp[0]}" y2="${Bp[1]}" stroke="${C.ink}" stroke-width="5"/><line x1="${Ap[0]}" y1="${Ap[1]}" x2="${Dp[0]}" y2="${Dp[1]}" stroke="${C.ink}" stroke-width="5"/><line x1="${Bp[0]}" y1="${Bp[1]}" x2="${Cp[0]}" y2="${Cp[1]}" stroke="${C.ink}" stroke-width="5"/><line x1="${Dp[0]}" y1="${Dp[1]}" x2="${Cp[0]}" y2="${Cp[1]}" stroke="${C.ink}" stroke-width="5"/>
 <line x1="${Ap[0]}" y1="${Ap[1]}" x2="${Cp[0]}" y2="${Cp[1]}" stroke="${C.acc}" stroke-width="4"/><line x1="${Bp[0]}" y1="${Bp[1]}" x2="${Dp[0]}" y2="${Dp[1]}" stroke="${C.acc}" stroke-width="4"/>`;
 g+=LB(cx+30,Cp[1]-60,'d₁',C.acc,'',26)+LB(cx+75,M[1]-10,'d₂',C.acc,'',26);
 g+=PT(...Ap,'A',-8,-6)+PT(...Bp,'B',-30,8)+PT(...Cp,'C',-8,28)+PT(...Dp,'D',12,8);
 return svg(`-10 0 420 ${Cp[1]+40}`,g);}

const SLIDES=[
cover('l1',1,'היקף ושטח בדלתון','דלתון · משפט פיתגורס',`הדלתון הוא בדיוק חצי מהמלבן שנבנה על האלכסונים שלו, ולכן ${eq('S = '+FR('d₁ · d₂','2'))}. פיתגורס עוזר לנו למצוא את מה שחסר.`),

{html:CSS+`<div class="eyebrow">כרטיס כניסה · 5 דקות</div><h2>נזכרים במה שכבר יודעים</h2>
<div class="row"><div class="col"><ol>
<li>במשולש ישר־זווית הניצבים הם 6 ו־8. מה אורך היתר? <span class="ans step">${eq('√(36 + 64) = √100 = 10')}</span></li>
<li>במשולש ישר־זווית היתר הוא 13 וניצב אחד הוא 5. מה אורך הניצב השני? <span class="ans step">${eq('√(169 − 25) = √144 = 12')}</span></li>
<li>שטח משולש שהבסיס שלו 10 והגובה 4? <span class="ans step">${eq('(10 · 4) : 2 = 20')}</span></li>
<li>השלימו: בדלתון האלכסון הראשי ____ לאלכסון השני ו____ אותו. <span class="ans step">מאונך · חוצה</span></li>
</ol></div><div class="vis" style="flex:.6">${kiteDiag()}</div></div>`},

{html:CSS+`<div class="eyebrow">למה בכלל צריך את זה?</div><h2>בונים עפיפון לקראת יום ההולדת</h2>
<div class="row"><div class="col">
<div class="card step">${A('כמה נייר לקנות?')} זה ${A('השטח')}: כמה מקום הנייר מכסה בפנים.</div>
<div class="card step">${B('כמה סרט צריך למסגרת?')} זה ${B('ההיקף')}: האורך מסביב.</div>
<div class="card step">ומה אם יודעים רק את אורך המוטות ואת מקום החיבור, אבל לא את אורך הצלעות? ${G('כאן נכנס פיתגורס.')}</div>
</div><div class="vis" style="flex:.7">${kiteN(5,16,12,{lab:{}})}</div></div>`},

{html:`<div class="eyebrow">המטרות שלנו</div><h2>היום נדע…</h2><ul>
<li>לחשב ${B('היקף')} של דלתון: שני זוגות של צלעות שוות</li>
<li class="step">להסביר ${A('למה')} השטח הוא מכפלת האלכסונים חלקי 2</li>
<li class="step">למצוא צלע או קטע של אלכסון בעזרת ${G('פיתגורס')}, כי האלכסונים מאונכים</li>
<li class="step">לבחור לבד: מתי צריך היקף, מתי שטח ומתי פיתגורס</li></ul>`},

{html:CSS+`<div class="eyebrow">רעיון 1 · היקף</div><h2>היקף = שני זוגות של צלעות שוות</h2>
<div class="row"><div class="col">
<div class="card step">בדלתון ${B('AB = AD')} ו־${R('CB = CD')}.</div>
<div class="card step">לכן לא צריך לחבר 4 מספרים שונים: ${eq('P = 2 · AB + 2 · BC')}</div>
<div class="card step big">${eq('P = 2 · ('+B('a')+' + '+R('b')+')')}</div>
<div class="card step">דוגמה: צלעות של 13 ו־20 ס״מ, ולכן ${eq('P = 2 · (13 + 20) = 66')} ס״מ.</div>
</div><div class="vis" style="flex:.7">${kiteN(5,16,12,{diag:false,lab:{AB:'13',AD:'13',BC:'20',DC:'20'}})}</div></div>`},

{html:CSS+`<div class="eyebrow">רעיון 2 · שטח · למה זה עובד?</div><h2>הדלתון הוא בדיוק חצי מלבן</h2>
<div class="row"><div class="col">
${W(1,'בנינו מלבן סביב הדלתון. האורך שלו הוא האלכסון '+A('d₁')+' והרוחב שלו הוא האלכסון '+A('d₂')).replace('card what','card what step')}
${W(2,'האלכסונים מאונכים, ולכן הם חותכים את הדלתון ל־4 משולשים ישרי זווית.').replace('card what','card what step')}
${W(3,'לכל משולש בתוך הדלתון יש "תאום" שווה לו מחוץ לדלתון, באותו צבע.').replace('card what','card what step')}
${W(4,'בפנים חצי מלבן ובחוץ החצי השני. לכן '+A(eq('S = '+FR('d₁ · d₂','2')))).replace('card what','card what step')}
</div><div class="vis" style="flex:.75">${halfRect()}</div></div>`},

{html:CSS+`<div class="eyebrow">רעיון 3 · איפה פיתגורס?</div><h2>4 משולשים ישרי זווית, ולכל אחד יש יתר</h2>
<div class="row"><div class="col">
<div class="card step">הזווית ב־M ישרה, ולכן כל צלע של הדלתון היא ${B('יתר')} במשולש ישר־זווית.</div>
<div class="card step">${A('חצאי האלכסונים')} הם ה${A('ניצבים')}: ${eq('AM')}, ${eq('MC')} ו־${eq('BM = MD')}.</div>
<div class="tools step">
<div class="card"><b>יש ניצבים</b>מוצאים צלע: ${eq('AB² = AM² + BM²')}</div>
<div class="card"><b>יש צלע וניצב</b>מוצאים קטע של אלכסון: ${eq('AM² = AB² − BM²')}</div>
<div class="card"><b>יש את כל האלכסון</b>זוכרים: ${eq('BM = BD : 2')}</div></div>
</div><div class="vis" style="flex:.6">${kiteN(5,16,12,{tri:'both',lab:{AM:'ניצב',BM:'ניצב'}}).replace('>ניצב<','>AM<').replace('>ניצב<','>BM<')}</div></div>`},

{html:CSS+`<div class="eyebrow">הטעות הנפוצה</div><h2>דני חישב: "השטח של הדלתון הוא ${eq('13 · 20 = 260')}"</h2>
<div class="row"><div class="col">
<div class="card step">${R('✗')} דני כפל ${R('שתי צלעות')}. ככה מחשבים שטח של מלבן, ודלתון הוא לא מלבן.</div>
<div class="card step">${R('✗')} טעות נוספת: כופלים את האלכסונים ${R('ושוכחים לחלק ב־2')}. ככה מקבלים את שטח המלבן כולו.</div>
<div class="card step">${G('✓')} את השטח מחשבים מה${A('אלכסונים')}: ${eq('(21 · 24) : 2 = 252')}</div>
<div class="card step">כלל זהב: ${B('צלעות')} משמשות להיקף, ${A('אלכסונים')} משמשים לשטח.</div>
</div><div class="vis" style="flex:.7">${kiteN(5,16,12,{lab:{AB:'13',BC:'20',AM:'5',MC:'16',BM:'12',MD:'12'}})}</div></div>`},

{html:CSS+`<div class="lvl">${stars(1)} ידע</div><h2>בדלתון: ${eq('AC = 12')}, ${eq('BD = 8')}, והצלעות הן 5 ו־9. מצאו את השטח ואת ההיקף.</h2>
<div class="row"><div class="col">
${P('S = (12 · 8) : 2',1,'בשטח משתמשים ב'+A('אלכסונים')+': כפלנו אותם וחילקנו ב־2')}
${P(G('S = 48'),2,'השטח הוא 48 סמ״ר')}
${P('P = 2 · (5 + 9)',3,'בהיקף משתמשים ב'+B('צלעות')+': שני זוגות שווים')}
${P(G('P = 28'),4,'ההיקף הוא 28 ס״מ')}
</div><div class="vis" style="flex:.55">${kiteN(2,10,4,{lab:{AB:'5',AD:'5',BC:'9',DC:'9'}})}</div></div>`},

{html:CSS+`<div class="lvl">${stars(2)} יישום</div><h2>${eq('AM = 5')}, ${eq('MC = 16')}, ${eq('BM = 12')}. מצאו את ההיקף ואת השטח.</h2>
<div class="row"><div class="col">
${P('AB = √(5² + 12²) = √169 = 13',1,'פיתגורס במשולש '+B('ABM')+': הצלע AB היא היתר')}
${P('BC = √(16² + 12²) = √400 = 20',2,'פיתגורס במשולש '+R('CBM')+': הצלע BC היא היתר')}
${P('P = 2 · (13 + 20) = 66',3,'היקף: שני זוגות של צלעות שוות')}
${P('AC = 21 , BD = 24',4,'חיברנו '+eq('5 + 16')+'. את BM הכפלנו ב־2, כי האלכסון הראשי חוצה את BD')}
${P(G('S = (21 · 24) : 2 = 252'),5,'שטח מהאלכסונים')}
</div><div class="vis" style="flex:.5">${kiteN(5,16,12,{tri:'both',lab:{AM:'5',MC:'16',BM:'12',AB:['13','step'],BC:['20','step']}})}</div></div>`},

{html:CSS+`<div class="lvl">${stars(3)} הבנה ונימוק</div><h2>${eq('AB = 10')}, ${eq('BC = 17')}, ${eq('BD = 16')}. יעל אומרת: "אי אפשר לחשב את השטח, כי לא נתון ${eq('AC')}". האם היא צודקת?</h2>
<div class="row"><div class="col">
${P('BM = 16 : 2 = 8',1,'האלכסון הראשי חוצה את BD')}
${P('AM = √(10² − 8²) = 6',2,'פיתגורס הפוך: הפעם מחפשים '+A('ניצב')+', ולכן מחסרים')}
${P('MC = √(17² − 8²) = 15',3,'אותו דבר במשולש '+R('CBM'))}
${P('AC = 6 + 15 = 21',4,'בנינו את האלכסון החסר')}
${P(G('S = (21 · 16) : 2 = 168'),5,R('יעל טועה')+': פיתגורס השלים לנו את הנתון שחסר')}
</div><div class="vis" style="flex:.5">${kiteN(6,15,8,{tri:'both',lab:{AB:'10',BC:'17',BM:'8',MD:'8',AM:['6','step'],MC:['15','step']}})}</div></div>`},

{html:CSS+`<div class="lvl">${stars(4)} חשיבה ואוריינות</div><h2 style="font-size:2.5cqw">עידו בונה עפיפון: מוט ארוך ${eq('AC = 63')} ס״מ, מוט קצר ${eq('BD = 40')} ס״מ, והחיבור 15 ס״מ מ־${eq('A')}. יש לו נייר בגודל ${eq('30 · 40')} ס״מ ו־1.5 מ׳ סרט. זה מספיק?</h2>
<div class="row"><div class="col">
${P('S = (63 · 40) : 2 = 1260',1,'נייר = '+A('שטח')+'. הגיליון הוא '+eq('30 · 40 = 1200')+' סמ״ר')}
${P('AB = √(15² + 20²) = 25',2,'סרט = '+B('היקף')+'. את הצלעות מוצאים בפיתגורס, עם '+eq('BM = 20'))}
${P('BC = √(48² + 20²) = 52',3,eq('MC = 63 − 15 = 48'))}
${P('P = 2 · (25 + 52) = 154',4,'ההיקף יוצא 154 ס״מ, ו־1.5 מ׳ הם 150 ס״מ')}
${P(R('לא מספיק'),5,'חסרים לו 60 סמ״ר נייר ו־4 ס״מ סרט')}
</div><div class="vis" style="flex:.42">${kiteN(15,48,20,{lab:{AM:'15',MC:'48',BM:'20',MD:'20'}})}</div></div>`},

{html:`<div class="eyebrow">תרגול בכיתה · עכשיו אתם</div><h2>4 שאלות, מהקלה לקשה</h2><ol>
<li>${stars(1)} האלכסונים הם 14 ו־10. מה השטח? <span class="ans step">${eq('(14 · 10) : 2 = 70')}</span></li>
<li>${stars(2)} ${eq('AM = 9')}, ${eq('MC = 16')}, ${eq('BM = 12')}. מצאו את ההיקף. <span class="ans step">${eq('AB = 15 , BC = 20 , P = 70')}</span></li>
<li>${stars(3)} ${eq('AB = 13')}, ${eq('BD = 24')}, ${eq('MC = 9')}. מצאו את השטח. <span class="ans step">${eq('AM = 5 , AC = 14 , S = 168')}</span></li>
<li>${stars(4)} שטח הדלתון הוא 60 סמ״ר ו־${eq('AC = 15')}. מה אורך ${eq('BD')}? <span class="ans step">${eq('BD = (60 · 2) : 15 = 8')}</span></li></ol>`},

{html:`<div class="eyebrow">כרטיס יציאה</div><h2>3 שאלות · לבד</h2><ol>
<li>הצלעות של דלתון הן 6 ו־11. מה ההיקף? <span class="ans step">${eq('2 · (6 + 11) = 34')}</span></li>
<li>${eq('AM = 8')}, ${eq('BM = 6')}. מה אורך ${eq('AB')}? <span class="ans step">${eq('√(64 + 36) = 10')}</span></li>
<li>מיכל אמרה: "שטח דלתון שאלכסוניו 10 ו־6 הוא 60". צודקת? נמקו. <span class="ans step">לא. היא שכחה לחלק ב־2, והשטח הוא 30</span></li></ol>`},

{html:`<div class="eyebrow">שיעורי בית</div><h2>מתרגלים בבית</h2><ul>
<li>${stars(1)} האלכסונים הם 18 ו־12. מצאו את השטח.</li>
<li>${stars(2)} ${eq('AM = 7')}, ${eq('MC = 10')}, ${eq('BM = 24')}. מצאו את ההיקף ואת השטח.</li>
<li>${stars(3)} ${eq('AB = 17')}, ${eq('BC = 25')}, ${eq('BD = 30')}. מצאו את ${eq('AC')} ואת השטח.</li>
<li>${stars(4)} לעפיפון צלעות של 15 ו־20 ס״מ, והמוט הקצר הוא 24 ס״מ. כמה סרט צריך? כמה נייר צריך?</li></ul>`}
];
