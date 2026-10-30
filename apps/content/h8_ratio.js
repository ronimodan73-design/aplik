/*META {"id":"h8_ratio","title":"יחס, פרופורציה וקנה מידה · ערכה: רוני מודן","short":"יחס","topic":"יחס, פרופורציה וקנה מידה","glyph":"a:b","color":"#ffb020"} */
const APP={key:'h8ratio',topic:'יחס, פרופורציה וקנה מידה',sub:'כמה חלקים? כמה בחלק אחד? טבלת עוגן, פי כמה, וקנה מידה. צעד אחרי צעד, בצבעים.',
 rc:{'מוצאים את היחס':0,'שבר ← יחס':0,'חימום · כמה חלקים?':1,'חשיבה · האם ייתכן?':1,'חימום · חלק אחד':2,'שלושה חלקים':2,'חימום · כמה חלקים שווים':3,
  'נתון השלם':4,'נתון חלק':4,'נתון חלק · מוצאים חלק ושלם':4,'נתון ההפרש':4,'נתון ההפרש · מוצאים חלק':4,'היקף מלבן · מה השלם?':4,
  'פרופורציה · מחיר ליחידה':5,'פרופורציה · מספר חסר':5,'האם זו פרופורציה?':5,'פרופורציה · פי כמה?':5,'איפה משתלם?':5,
  'קנה מידה · מוצאים מציאות':6,'קנה מידה · מוצאים שרטוט':6,'קנה מידה · מוצאים קנה מידה':6,'קנה מידה · משווים':6,'המרת יחידות':6}};
document.head.insertAdjacentHTML('beforeend',`<style>
table.at{border-collapse:separate;border-spacing:0;font-family:Rubik;font-weight:700;margin:6px auto;direction:rtl}
.at th,.at td{border:2px solid var(--line);padding:6px 12px;text-align:center;font-size:22px;min-width:70px;height:48px}
.at th{background:var(--chip);font-size:17px}.at td.lab{border:none;font-size:14px;color:var(--muted);min-width:0;font-weight:500}.at th.lab{border:none;background:none}
.at .giv{background:#ffb02040;color:#ffd27a}.at .anc{box-shadow:inset 0 0 0 5px var(--ok)}.at .calc{color:var(--ok)}
.at .vv{direction:ltr;unicode-bidi:isolate;display:inline-block;white-space:nowrap}
.sq{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;align-items:flex-end}
.sq .c{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font:900 22px Rubik;color:#13233a}
.grp{display:flex;flex-direction:column;align-items:center;gap:6px;font-weight:700}
.row{display:flex;gap:20px;align-items:flex-end;justify-content:center;flex-wrap:wrap}
.bx{display:inline-flex;gap:5px;vertical-align:middle;margin:0 4px}.bx i{width:20px;height:20px;border:2px solid var(--blue);border-radius:5px}
@media (max-width:560px){.at th,.at td{padding:4px 4px;min-width:0;font-size:15px;height:40px}.at th{font-size:13px}.at td.lab{font-size:12px}.sq .c{width:34px;height:34px;font-size:17px}}
</style>`);
const gcd=(a,b)=>b?gcd(b,a%b):a;
const COL=['#ffb020','#5ec8ff','#ff7a8a'];
const C2=(t,i)=>`<b style="color:${COL[i]}">${t}</b>`;
const fmt=n=>(+(+n).toFixed(3)).toLocaleString('en-US');
const FRr=(a,b)=>`<span class="fr"><span>${a}</span><span>${b}</span></span>`;
const BX=n=>`<span class="bx">${'<i></i>'.repeat(n)}</span>`;
const PAIRS=[['דנה','נועם','מדבקות'],['מיכל','יונתן','קלפים'],['שירה','עומר','סוכריות'],['אלה','רון','גולות'],['תמר','איתי','ש״ח']];
const RATIOS=[[1,2],[1,3],[2,3],[3,4],[2,5],[3,5],[4,5],[1,4],[5,3],[3,2],[4,3],[5,2],[7,3]];
const GROUPS=[['בנים','בנות','תלמידים בכיתה'],['כלבים','חתולים','בעלי חיים במקלט'],['עטים','עפרונות','כלי כתיבה בקלמר'],['תפוחים','אגסים','פירות בסל'],['מכוניות','אופנועים','כלי רכב בחניון']];
/* ===== טבלת העוגן (מצוירת בפתרון) ===== */
function atHtml(cols,rl,rows,anc,hl){const hd=cols.map((c,i)=>`<th class="${i===anc?'anc':''}" style="color:${c.c}">${c.h}</th>`).join('');
 return `<table class="at"><tr><th class="lab"></th>${hd}</tr>${rows.map((row,ri)=>`<tr><td class="lab">${rl[ri]}</td>${row.map((c,ci)=>{const show=c.k===0||hl;
  return `<td class="${c.k===0?'giv':''}${ci===anc?' anc':''}">${show&&c.v!==''?`<span class="vv ${c.k?'calc':''} ${hl&&c.k?'rv':''}" style="--d:${.4+c.k*.9+ci*.25}s">${c.v}</span>`:''}</td>`;}).join('')}</tr>`).join('')}</table>`;}
/* שאלה "טבלה": מוסיפים ציור, דרך פתרון, כלל ושלבי "איפה טעיתי?" */
function T(q){const g=(r,c)=>q.giv.some(([a,b])=>a===r&&b===c);
 const rows=[q.r.map((v,i)=>({v,k:g(0,i)?0:1})),q.q.map((v,i)=>({v:g(1,i)||q.ratio||q.why?v:(i===q.anc?v:`${q.r[i]} · ${q.part} = ${v}`),k:g(1,i)?0:2}))];
 q.dia=hl=>hl?atHtml(q.cols,['יחס (חלקים)','כמות'],rows,q.anc,true):'';
 if(q.ratio){q.lines=[`מצמצמים: מחלקים את שתי הכמויות ב־${M(q.part)}.`,M(q.q[0]+' : '+q.q[1]+' = '+q.r[0]+' : '+q.r[1])];q.rule='מחלקים את שתי הכמויות באותו מספר.';
  q.work=[{t:`מה המספר הגדול ביותר שמחלק את ${M(q.q[0])} וגם את ${M(q.q[1])}?`,ans:[{label:'',val:q.part}],why:'מחפשים את המחלק המשותף <b>הגדול ביותר</b>, כדי שהיחס יהיה מצומצם.'},
   {t:M(q.q[0]+' : '+q.part+' = ?'),ans:[{label:'',val:q.r[0]}],why:'מחלקים את הכמות הראשונה במחלק המשותף.'},{t:M(q.q[1]+' : '+q.part+' = ?'),ans:[{label:'',val:q.r[1]}],why:'מחלקים גם את הכמות השנייה באותו מספר.'}];}
 else if(q.why){const s=q.r[2],N=q.q[2];q.lines=[`מספר החלקים: ${M(q.r[0]+' + '+q.r[1]+' = '+s)}.`,q.part?`חלק אחד: ${M(N+' : '+s+' = '+q.part)} ✓ כן, ייתכן.`:`${M(N+' : '+s)} לא יוצא מספר שלם, ולכן לא ייתכן.`];
  q.rule='אפשר לחלק לפי יחס רק אם השלם מתחלק ב<b>מספר החלקים</b>.';
  q.work=[{t:`כמה חלקים יש? ${M(q.r[0]+' + '+q.r[1]+' = ?')}`,ans:[{label:'',val:s}],why:'מספר החלקים = <b>מחברים</b> את מספרי היחס.'},
   {t:`האם ${M(N+' : '+s)} יוצא מספר שלם?`,choice:['כן','לא'],correct:q.part?0:1,why:`בודקים בלוח הכפל: האם ${M(N)} מתחלק ב־${M(s)} בלי שארית?`}];}
 else{const A=q.anc,h=q.cols[A].h,steps=[];
  if(q.rect)steps.push({t:`אורך + רוחב = חצי היקף: ${M(q.rect+' : 2 = ?')}`,ans:[{label:'',val:q.rect/2}],why:'בהיקף יש <b>שני</b> אורכים ו<b>שני</b> רוחבים. אורך + רוחב = חצי ההיקף.'});
  steps.push({t:'באיזו עמודה ידועים <b>גם</b> החלקים <b>וגם</b> הכמות? (העוגן)',choice:q.cols.map(c=>c.h),correct:A,why:'העוגן = העמודה שבה ידועים גם מספר החלקים וגם הכמות.'});
  if(!g(0,A)){const ex=h==='הפרש'?q.r[0]+' − '+q.r[1]:q.r.slice(0,-1).join(' + ');steps.push({t:`כמה חלקים בעמודת ${h}? ${M(ex+' = ?')}`,ans:[{label:'',val:q.r[A]}],why:h==='הפרש'?'הפרש = <b>מחסרים</b> את מספרי היחס.':'השלם = <b>מחברים</b> את כל מספרי היחס.'});}
  steps.push({t:`חלק אחד: ${M(q.q[A]+' : '+q.r[A]+' = ?')}`,ans:[{label:'',val:q.part}],why:`מחלקים את הכמות ב<b>מספר החלקים</b> של העוגן (${M(q.r[A])}), לא במספר האנשים.`});
  q.ans.forEach(a=>{const i=q.cols.findIndex(c=>c.h===a.label);steps.push({t:`${a.label}: ${M(q.r[i]+' · '+q.part+' = ?')}`,ans:[{label:'',val:q.q[i]}],why:'כופלים את מספר החלקים בגודל של חלק אחד.'});});
  q.work=steps;q.lines=[`העוגן: עמודת <b>${h}</b>. שם ידועים ${M(q.r[A])} חלקים וגם ${M(q.q[A])}.`,`חלק אחד: ${M(q.q[A]+' : '+q.r[A]+' = '+q.part)}`,'כופלים את החלק האחד בכל עמודה, ובודקים.'];
  q.rule=q.rect?'אורך + רוחב = <b>חצי</b> היקף.':'עוגן ← חלק אחד ← כופלים.';}
 const d=q.diag;if(d)q.diag=({vals})=>d(vals);return q;}
/* "פיצוח שאלה": שלבים קצרים לפני שפותרים */
const CK=(lab,opts,ok,why)=>{const o=shuf(opts);return {lab,choice:o,correct:o.indexOf(ok),why};};
const GIV=['היחס והשלם','היחס וכמות של צד אחד','היחס וההפרש'],FIRST=['סופרים כמה חלקים בשלם','מוצאים ערך של חלק אחד','מחשבים כמה חלקים בהפרש'];
const CRK=(g,a,aOpts,f)=>[CK('מה נתון?',GIV,g,'קוראים שוב: איזה מספר כתוב בשאלה חוץ מהיחס?'),CK('מה מבקשים?',aOpts,a,'קוראים את סוף השאלה: מה שואלים?'),CK('מה עושים קודם?',FIRST,f,'קודם צריך להגיע ל<b>חלק אחד</b>. איך מגיעים אליו מהנתון?')];
/* ===== יחס ===== */
function genWhole(){const [a,b]=pick(RATIOS),[n1,n2,u]=pick(PAIRS),k=R(2,9),T0=(a+b)*k;
 return T({kind:'נתון השלם',crack:CRK('היחס והשלם','כמה מקבל כל אחד',['כמה מקבל כל אחד','מה השלם','מה היחס'],'סופרים כמה חלקים בשלם'),text:`${C2(n1,0)} ו${C2(n2,1)} מתחלקים ב־${M(T0)} ${u} ביחס ${M(a+' : '+b)} (${n1} : ${n2}). כמה מקבל כל אחד?`,
 cols:[{h:n1,c:COL[0]},{h:n2,c:COL[1]},{h:'שלם',c:PU}],r:[a,b,a+b],q:[a*k,b*k,T0],giv:[[0,0],[0,1],[1,2]],anc:2,part:k,
 ans:[{label:n1,col:COL[0],val:a*k},{label:n2,col:COL[1],val:b*k}],diag:([x,y])=>{
  if(x===T0/2&&y===T0/2)return 'חילקתם ל<b>שני אנשים</b>. מחלקים ב<b>מספר החלקים</b>: '+M(a+' + '+b+' = '+(a+b))+'.';
  if(x===a&&y===b)return 'כתבתם את <b>החלקים</b>, לא את <b>הכמות</b>. צריך למצוא כמה שווה חלק אחד.';
  if(x===b*k&&y===a*k)return 'החשבון נכון, אבל <b>הסדר הפוך</b>! הראשון ביחס הוא הראשון בשאלה.';
  if(x+y===T0)return 'הסכום נכון, אבל זה לא ביחס '+M(a+' : '+b)+'. בדקו: האם הצמצום מחזיר ליחס?';return null;}});}
function genPart(withWhole){const [a,b]=pick(RATIOS),[g1,g2,w]=pick(GROUPS),k=R(2,9),first=Math.random()<.5,known=first?0:1,kv=(first?a:b)*k;
 const ans=[{label:first?g2:g1,col:COL[first?1:0],val:(first?b:a)*k}];if(withWhole)ans.push({label:'שלם',col:PU,val:(a+b)*k});
 return T({kind:withWhole?'נתון חלק · מוצאים חלק ושלם':'נתון חלק',crack:CRK('היחס וכמות של צד אחד',withWhole?'הצד השני וגם השלם':'הצד השני',['הצד השני','השלם','הצד השני וגם השלם'],'מוצאים ערך של חלק אחד'),text:`היחס בין ${C2(g1,0)} ל${C2(g2,1)} הוא ${M(a+' : '+b)}. יש ${M(kv)} ${first?g1:g2}. כמה ${first?g2:g1} יש?`+(withWhole?` וכמה ${w} בסך הכול?`:''),
 cols:[{h:g1,c:COL[0]},{h:g2,c:COL[1]},{h:'שלם',c:PU}],r:[a,b,a+b],q:[a*k,b*k,(a+b)*k],giv:[[0,0],[0,1],[1,known]],anc:known,part:k,ans,diag:([x])=>{const o=first?b:a,m=first?a:b;
   if(x===kv*o)return 'כפלתם את '+M(kv)+' ב־'+M(o)+'. קודם מוצאים <b>חלק אחד</b>: '+M(kv+' : '+m+' = '+k)+'.';
   if(x===kv+(o-m))return 'הוספתם את ההפרש בחלקים. אבל חלק אחד שווה '+M(k)+', לא 1!';
   if(x===(a+b)*k)return 'זה <b>השלם</b>, לא החלק השני.';return null;}});}
function genRatio(){const [a,b]=pick(RATIOS.filter(([a,b])=>gcd(a,b)===1)),[g1,g2]=pick(GROUPS),k=R(2,8);
 return T({kind:'מוצאים את היחס',text:`יש ${M(a*k)} ${C2(g1,0)} ו־${M(b*k)} ${C2(g2,1)}. מה היחס בין ה${g1} ל${g2}? (מצומצם)`,tpl:'[] : []',
 cols:[{h:g1,c:COL[0]},{h:g2,c:COL[1]}],r:[a,b],q:[a*k,b*k],giv:[[1,0],[1,1]],anc:-1,part:k,ratio:true,
 ans:[{label:g1,col:COL[0],val:a},{label:g2,col:COL[1],val:b}],diag:([x,y])=>{
  if(x*b===y*a&&x!==a)return 'היחס שווה, אבל <b>אפשר לצמצם עוד</b>! מחלקים את שני המספרים במחלק המשותף הגדול.';
  if(x===b&&y===a)return '<b>הסדר הפוך</b>: קודם '+g1+', אחר כך '+g2+'.';return null;}});}
function genDiff(){let [a,b]=pick(RATIOS.filter(([a,b])=>a!==b));if(a<b)[a,b]=[b,a];const [g1,g2,w]=pick(GROUPS),k=R(2,8),d=(a-b)*k;
 return T({kind:'נתון ההפרש',crack:CRK('היחס וההפרש','השלם',['השלם','ההפרש','היחס'],'מחשבים כמה חלקים בהפרש'),text:`היחס בין ${C2(g1,0)} ל${C2(g2,1)} הוא ${M(a+' : '+b)}. יש ${M(d)} ${g1} יותר מ${g2}. כמה ${w} יש בסך הכול?`,
 cols:[{h:g1,c:COL[0]},{h:g2,c:COL[1]},{h:'הפרש',c:'#ffd27a'},{h:'שלם',c:PU}],r:[a,b,a-b,a+b],q:[a*k,b*k,d,(a+b)*k],giv:[[0,0],[0,1],[1,2]],anc:2,part:k,
 ans:[{label:'שלם',col:PU,val:(a+b)*k}],diag:([x])=>{
  if(x===d*(a+b))return 'כפלתם את ההפרש בסכום החלקים. קודם <b>חלק אחד</b>: '+M(d+' : '+(a-b)+' = '+k)+'.';
  if(x===d/(a+b))return 'חילקתם את ההפרש בסכום החלקים. ההפרש שייך לעמודת <b>ההפרש</b>: '+M(a+' − '+b+' = '+(a-b))+' חלקים.';
  if(x===a*k||x===b*k)return 'זה רק חלק אחד מהשלם. מה עם השני?';return null;}});}
function genRect(){const [a,b]=pick([[2,1],[3,1],[3,2],[4,1],[5,3],[4,3]]),k=R(2,6),P=2*(a+b)*k;
 return T({kind:'היקף מלבן · מה השלם?',crack:[CK('מה נתון?',['היחס וההיקף','היחס והשטח','האורך והרוחב'],'היחס וההיקף','קוראים שוב: מה כתוב חוץ מהיחס?'),CK('מה השלם בטבלה?',['חצי היקף (אורך + רוחב)','כל ההיקף','השטח'],'חצי היקף (אורך + רוחב)','בהיקף יש 2 אורכים ו־2 רוחבים. אורך + רוחב = חצי היקף.'),CK('מה עושים קודם?',['מחלקים את ההיקף ב־2','מחלקים את ההיקף ב־4','כופלים את ההיקף ביחס'],'מחלקים את ההיקף ב־2','מוצאים קודם את חצי ההיקף: זה השלם.')],text:`היקף מלבן ${M(P)} ס״מ. היחס בין ${C2('האורך',0)} ל${C2('רוחב',1)} הוא ${M(a+' : '+b)}. מה אורכי הצלעות?`,
 cols:[{h:'אורך',c:COL[0]},{h:'רוחב',c:COL[1]},{h:'חצי היקף',c:PU}],r:[a,b,a+b],q:[a*k,b*k,P/2],giv:[[0,0],[0,1],[1,2]],anc:2,part:k,rect:P,
 ans:[{label:'אורך',col:COL[0],val:a*k},{label:'רוחב',col:COL[1],val:b*k}],diag:([x,y])=>{
  if(x+y===P)return 'השתמשתם בכל ההיקף. אבל <b>אורך + רוחב = חצי היקף</b> = '+M(P+' : 2 = '+P/2)+'.';
  if(x*2===a*k&&y*2===b*k)return 'חילקתם פעמיים. השלם הוא חצי היקף: '+M(P/2)+'.';return null;}});}
function genThree(){const [a,b,c]=pick([[1,2,3],[2,3,5],[1,1,2],[3,4,5],[1,2,5]]),k=R(2,6),T0=(a+b+c)*k;
 return T({kind:'שלושה חלקים',crack:CRK('היחס והשלם','כמה מקבל כל אחד',['כמה מקבל כל אחד','מה השלם','מה היחס'],'סופרים כמה חלקים בשלם'),text:`שלושה אחים מתחלקים ב־${M(T0)} ש״ח ביחס ${M(a+' : '+b+' : '+c)}. כמה מקבל כל אחד?`,
 cols:[{h:'אח א׳',c:COL[0]},{h:'אח ב׳',c:COL[1]},{h:'אח ג׳',c:COL[2]},{h:'שלם',c:PU}],r:[a,b,c,a+b+c],q:[a*k,b*k,c*k,T0],giv:[[0,0],[0,1],[0,2],[1,3]],anc:3,part:k,
 ans:[{label:'אח א׳',col:COL[0],val:a*k},{label:'אח ב׳',col:COL[1],val:b*k},{label:'אח ג׳',col:COL[2],val:c*k}],diag:([x,y])=>{
  if(x*3===T0&&y*3===T0)return 'חילקתם לשלושה אנשים. מחלקים ב<b>מספר החלקים</b>: '+M(a+' + '+b+' + '+c+' = '+(a+b+c))+'.';return null;}});}
function genWhy(){const [a,b]=pick(RATIOS),s=a+b,N=R(15,60),ok=N%s===0,[g1,g2]=pick(GROUPS);
 return T({kind:'חשיבה · האם ייתכן?',crack:[CK('מה נתון?',GIV,'היחס והשלם','קוראים שוב: איזה מספר כתוב חוץ מהיחס?'),CK('מה בודקים?',['האם השלם מתחלק במספר החלקים','האם השלם זוגי','האם השלם גדול מהיחס'],'האם השלם מתחלק במספר החלקים','חלק אחד חייב לצאת מספר שלם.')],text:`בקבוצה ${M(N)} ${g1} ו${g2} יחד. האם ייתכן שהיחס בין ה${g1} ל${g2} הוא ${M(a+' : '+b)}?`,
 choice:[`כן, כי ${M(N)} מתחלק ב־${M(s)} (מספר החלקים)`,`לא, כי ${M(N)} לא מתחלק ב־${M(s)} (מספר החלקים)`,'כן, תמיד אפשר לחלק לפי יחס',`לא, כי ${M(N)} לא מתחלק ב־${M(a)}`],correct:ok?0:1,
 cols:[{h:g1,c:COL[0]},{h:g2,c:COL[1]},{h:'שלם',c:PU}],r:[a,b,s],q:ok?[a*N/s,b*N/s,N]:['?','?',N],giv:[[0,0],[0,1],[1,2]],anc:2,part:ok?N/s:null,why:true,
 diag:()=>'כדי לחלק לפי יחס, השלם צריך להתחלק ב<b>מספר החלקים</b>: '+M(a+' + '+b+' = '+s)+'.'});}
function genFrac(){const [a,s]=pick([[3,8],[2,5],[3,7],[1,4],[5,9],[2,7],[4,9],[3,5]]),[from,g1,g2]=pick([['מהתלמידים בכיתה','בנים','בנות'],['מבעלי החיים במקלט','כלבים','חתולים'],['מהפירות בסל','תפוחים','אגסים'],['מכלי הכתיבה בקלמר','עטים','עפרונות']]),b=s-a;
 return {kind:'שבר ← יחס',crack:[CK('מה השבר אומר?',['חלק מתוך השלם','חלק מול חלק','פי כמה'],'חלק מתוך השלם','המכנה = השלם, המונה = החלק.'),CK('מה מבקשים?',['חלק מול חלק (יחס)','חלק מתוך השלם (שבר)','השלם'],'חלק מול חלק (יחס)','יחס משווה בין שני החלקים.')],text:`${FRr(a,s)} ${from} הם ${C2(g1,0)}, והשאר ${C2(g2,1)}. מה היחס בין ה${g1} ל${g2}?`,tpl:'[] : []',
 ans:[{label:g1,col:COL[0],val:a},{label:g2,col:COL[1],val:b}],
 work:[{t:`השבר ${FRr(a,s)}: כמה חלקים יש בשלם?`,ans:[{label:'',val:s}],why:'המכנה (המספר למטה) = כל החלקים, השלם.'},{t:`כמה חלקים ל${g2}? ${M(s+' − '+a+' = ?')}`,ans:[{label:'',val:b}],why:`מהשלם מורידים את החלקים של ה${g1}.`}],
 lines:[`${FRr(a,s)} = ${M(a)} חלקים מתוך ${M(s)} חלקים (השלם).`,`ה${g2}: ${M(s+' − '+a+' = '+b)} חלקים.`,`היחס: ${M(a+' : '+b)}`],rule:'שבר = חלק מתוך השלם. יחס = חלק מול חלק.',
 diag:({vals:[x,y]})=>{if(x===a&&y===s)return 'כתבתם <b>חלק : שלם</b> (זה השבר). ביחס משווים <b>חלק מול חלק</b>: ה'+g2+' הם '+M(s+' − '+a+' = '+b)+' חלקים.';if(x===b&&y===a)return '<b>הסדר הפוך</b>: קודם '+g1+', אחר כך '+g2+'.';return null;}};}
function genDiffPart(){let [a,b]=pick(RATIOS.filter(([a,b])=>a!==b));if(a<b)[a,b]=[b,a];const [n1,n2,u]=pick(PAIRS),k=R(2,8),d=(a-b)*k;
 return T({kind:'נתון ההפרש · מוצאים חלק',crack:CRK('היחס וההפרש','כמה יש לצד אחד',['כמה יש לצד אחד','השלם','ההפרש'],'מחשבים כמה חלקים בהפרש'),text:`${C2(n1,0)} ו${C2(n2,1)} התחלקו ב${u} ביחס ${M(a+' : '+b)}. ל${n1} יש ${M(d)} ${u} יותר מאשר ל${n2}. כמה ${u} יש ל${n2}?`,
 cols:[{h:n1,c:COL[0]},{h:n2,c:COL[1]},{h:'הפרש',c:'#ffd27a'}],r:[a,b,a-b],q:[a*k,b*k,d],giv:[[0,0],[0,1],[1,2]],anc:2,part:k,
 ans:[{label:n2,col:COL[1],val:b*k}],diag:([x])=>{
  if(x===d*b)return 'כפלתם את ההפרש. קודם <b>חלק אחד</b>: ההפרש הוא '+M(a-b)+' חלקים, ולכן '+M(d+' : '+(a-b)+' = '+k)+'.';
  if(x===a*k)return 'זה החלק של '+n1+'. שאלו על '+n2+'.';
  if(x===d)return 'זה ההפרש, לא החלק של '+n2+'.';return null;}});}
/* ===== חימום ===== */
function genWarm(t){
 if(t==='c'){const [a,b]=pick([[1,2],[2,3],[3,4],[2,5],[1,3],[3,5],[4,5]]);
  return {kind:'חימום · כמה חלקים?',text:`היחס הוא ${M(a+' : '+b)}. כמה חלקים יש בסך הכול?`,ans:[{label:'חלקים',col:PU,val:a+b}],
  lines:[`${M(a+' + '+b+' = '+(a+b))} חלקים`],rule:'מספר החלקים = מחברים את המספרים של היחס.',work:[{t:M(a+' + '+b+' = ?'),ans:[{label:'',val:a+b}],why:'את החלקים <b>מחברים</b>.'}],
  diag:({vals:[x]})=>x===a*b?'<b>כפלתם</b>. את החלקים <b>מחברים</b>: '+M(a+' + '+b)+'.':null};}
 if(t==='a'){const n=R(2,5),k=R(2,6),T0=n*k;
  return {kind:'חימום · חלק אחד',text:`${M(T0)} מדבקות מתחלקות ל־${M(n)} חלקים שווים ${BX(n)}. כמה מדבקות יש בחלק אחד?`,ans:[{label:'בחלק אחד',col:COL[1],val:k}],
  lines:[M(T0+' : '+n+' = '+k),`בדיקה: ${M(n+' · '+k+' = '+T0)} ✓`],rule:'חלק אחד = הכמות : מספר החלקים.',work:[{t:M(T0+' : '+n+' = ?'),ans:[{label:'',val:k}],why:`חושבים: ${M(n)} כפול כמה נותן ${M(T0)}?`}],
  diag:({vals:[x]})=>x===T0*n?'<b>כפלתם</b>. מחלקים את '+M(T0)+' ל־'+M(n)+' חלקים: '+M(T0+' : '+n)+'.':x===T0-n?'<b>חיסרתם</b>. מחלקים: '+M(T0+' : '+n)+'.':null};}
 const k=R(2,9),n=R(2,5);
 return {kind:'חימום · כמה חלקים שווים',text:`בחלק אחד יש ${M(k)} מדבקות. כמה מדבקות יש ב־${M(n)} חלקים ${BX(n)}?`,ans:[{label:'מדבקות',col:COL[0],val:k*n}],
  lines:[M(n+' · '+k+' = '+k*n)],rule:'כמה חלקים · כמה בחלק אחד.',work:[{t:M(n+' · '+k+' = ?'),ans:[{label:'',val:k*n}],why:`יש ${M(n)} חלקים, ובכל אחד ${M(k)} ← כופלים.`}],
  diag:({vals:[x]})=>x===k+n?'<b>חיברתם</b>. יש '+M(n)+' חלקים, ובכל אחד '+M(k)+': '+M(n+' · '+k)+'.':null};}
/* ===== פרופורציה ===== */
const ITEMS=[['מחברות','מחברת'],['עטים','עט'],['ק״ג תפוחים','ק״ג'],['כרטיסים','כרטיס'],['יוגורטים','יוגורט']];
const tbl=(cols,rl,rows,ks,anc)=>hl=>atHtml(cols,rl,rows.map((row,ri)=>row.map((v,ci)=>({v,k:ks[ri][ci]}))),anc,hl);
function genUnit(small){const [it,one]=pick(ITEMS),n1=R(2,small?4:6),u=R(2,small?6:9);let n2=R(2,small?8:12);if(n2===n1)n2++;const p1=n1*u;
 return {kind:'פרופורציה · מחיר ליחידה',crack:[CK('מה מבקשים?',['מחיר של כמות אחרת','מחיר של פריט אחד','כמה פריטים'],'מחיר של כמות אחרת','קוראים את סוף השאלה.'),CK('מה עושים קודם?',['מוצאים מחיר של פריט אחד','מוסיפים את ההפרש בפריטים','כופלים את כל המחיר'],'מוצאים מחיר של פריט אחד','בפרופורציה מגיעים קודם ל<b>אחד</b>.')],text:`${M(n1)} ${it} עולים ${M(p1)} ש״ח. כמה עולים ${M(n2)} ${it} (באותו מחיר)?`,ans:[{label:'מחיר (ש״ח)',col:COL[1],val:n2*u}],
 dia:tbl([{h:'ידוע',c:'#f3f6fb'},{h:'שואלים',c:'#f3f6fb'},{h:one+' 1',c:GR}],[it,'מחיר (ש״ח)'],[[n1,n2,1],[p1,`${n2} · ${u} = ${n2*u}`,`${p1} : ${n1} = ${u}`]],[[0,0,1],[0,2,1]],0),
 work:[{t:`מחיר של ${one} אחד: ${M(p1+' : '+n1+' = ?')}`,ans:[{label:'',val:u}],why:`מחלקים את המחיר במספר ה${it}.`},{t:`${M(n2)} ${it}: ${M(n2+' · '+u+' = ?')}`,ans:[{label:'',val:n2*u}],why:'כופלים את מחיר היחידה במספר שקונים.'}],
 lines:[`מחיר של ${one} אחד: ${M(p1+' : '+n1+' = '+u)}`,`כופלים: ${M(n2+' · '+u+' = '+n2*u)}`],rule:'מחיר של אחד ← כופלים. לא מוסיפים!',
 diag:({vals:[x]})=>{if(x===p1+(n2-n1))return '<b>הוספתם</b> במקום לכפול. מחיר של '+one+' אחד הוא '+M(u)+', לא 1.';if(x===p1*n2)return 'כפלתם את כל המחיר. קודם מוצאים מחיר של '+one+' אחד: '+M(p1+' : '+n1)+'.';return null;}};}
function genMissing(){const [a0,b0]=pick(RATIOS),k1=R(2,6);let k2=R(2,9);if(k2===k1)k2++;const a=a0*k1,b=b0*k1,c=a0*k2,x=b0*k2;
 return {kind:'פרופורציה · מספר חסר',text:`מצאו את x: ${M(FRr(a,b)+' = '+FRr(c,'x'))}`,ans:[{label:'x =',col:COL[0],val:x}],
 work:[{t:`כפל בהצלבה: ${M(b+' · '+c+' = ?')}`,ans:[{label:'',val:b*c}],why:'בהצלבה כופלים <b>באלכסון</b>: המכנה של שבר אחד כפול המונה של השני.'},{t:`${M(a+'x = '+b*c)} ← ${M('x = '+b*c+' : '+a+' = ?')}`,ans:[{label:'x =',val:x}],why:`מחלקים את שני הצדדים ב־${M(a)}.`}],
 lines:[`כפל בהצלבה: ${M(a+' · x = '+b+' · '+c)}`,`${M(a+'x = '+b*c)} ← מחלקים ב־${M(a)}: ${M('x = '+x)}`],rule:'בפרופורציה: כפל בהצלבה. המכפלות באלכסון שוות.',
 diag:({vals:[y]})=>{if(y===b+(c-a))return 'הוספתם את ההפרש. בפרופורציה <b>כופלים</b>: כפל בהצלבה.';if(y*b===a*c)return 'כפלתם בהצלבה לא נכון: x עומד מול '+M(a)+', ולכן '+M(a+' · x = '+b+' · '+c)+'.';return null;}};}
function genIsProp(){const [a,b]=pick(RATIOS),k=R(2,6),ok=Math.random()<.5,c=a*k,d=ok?b*k:b*k+pick([1,-1]);
 return {kind:'האם זו פרופורציה?',text:`האם היחסים ${M(a+' : '+b)} ו־${M(c+' : '+d)} יוצרים פרופורציה?`,choice:['כן, היחסים שווים','לא, היחסים לא שווים'],correct:ok?0:1,
 work:[{t:`כפל בהצלבה: ${M(a+' · '+d+' = ?')}`,ans:[{label:'',val:a*d}],why:'כופלים באלכסון.'},{t:M(b+' · '+c+' = ?'),ans:[{label:'',val:b*c}],why:'וגם את האלכסון השני.'},{t:'המכפלות שוות?',choice:['כן ← פרופורציה','לא ← לא פרופורציה'],correct:ok?0:1,why:'פרופורציה רק אם שתי המכפלות <b>שוות</b>.'}],
 lines:[`כפל בהצלבה: ${M(a+' · '+d+' = '+a*d)} ו־${M(b+' · '+c+' = '+b*c)}`,ok?'המכפלות שוות ← <b>כן</b>, זו פרופורציה.':'המכפלות שונות ← <b>לא</b>, זו לא פרופורציה.'],rule:'פרופורציה ← המכפלות בהצלבה שוות.',
 diag:()=>'בדקו בכפל בהצלבה, או צמצמו את שני היחסים.'};}
function genTrap(){const [x1,y1]=pick([[2,3],[3,5],[2,5],[4,3],[3,2]]),fc=R(2,5),[g1,g2]=pick([['עוגות','ביצים'],['כוסות לימונדה','כפות סוכר'],['שעות','עמודים'],['חולצות','כפתורים']]);
 return {kind:'פרופורציה · פי כמה?',crack:[CK('מה עושים קודם?',['בודקים פי כמה גדל','בודקים בכמה גדל','מחברים את המספרים'],'בודקים פי כמה גדל','בפרופורציה שואלים «פי כמה», לא «כמה יותר».')],text:`ל־${M(x1)} ${g1} צריך ${M(y1)} ${g2}. כמה ${g2} צריך ל־${M(x1*fc)} ${g1}?`,ans:[{label:g2,col:COL[1],val:y1*fc}],
 dia:tbl([{h:'ידוע',c:'#f3f6fb'},{h:'שואלים',c:'#f3f6fb'}],[g1,g2],[[x1,x1*fc],[y1,`${y1} · ${fc} = ${y1*fc}`]],[[0,0],[0,2]],0),
 work:[{t:`פי כמה גדל מספר ה${g1}? ${M(x1*fc+' : '+x1+' = ?')}`,ans:[{label:'פי',val:fc}],why:'שואלים "<b>פי כמה</b>?" ולכן מחלקים, לא מחסרים.'},{t:`גם ה${g2} גדלים פי ${M(fc)}: ${M(y1+' · '+fc+' = ?')}`,ans:[{label:'',val:y1*fc}],why:'בפרופורציה שתי הכמויות גדלות <b>פי אותו מספר</b>.'}],
 lines:[`מ־${M(x1)} ל־${M(x1*fc)}: <b>פי ${fc}</b>.`,`ולכן גם ${g2}: ${M(y1+' · '+fc+' = '+y1*fc)}`],rule:'שואלים "פי כמה?", לא "כמה יותר?"',
 diag:({vals:[x]})=>x===y1+(x1*fc-x1)?'<b>הוספתם</b> '+M(x1*fc-x1)+' כמו שהוסיפו '+g1+'. אבל הגדילו פי '+M(fc)+', ולכן גם '+g2+' פי '+M(fc)+'.':null};}
function genBest(){const [it,one]=pick(ITEMS),n1=R(2,5),n2=R(3,8),ua=R(3,9),ub=ua+pick([1,-1]),p1=n1*ua,p2=n2*ub;
 return {kind:'איפה משתלם?',crack:[CK('איך משווים?',['מחיר של פריט אחד בכל חנות','המחיר הכולל','מספר הפריטים'],'מחיר של פריט אחד בכל חנות','כמויות שונות ← משווים מחיר ל<b>אחד</b>.')],text:`בחנות א׳: ${M(n1)} ${it} ב־${M(p1)} ש״ח. בחנות ב׳: ${M(n2)} ${it} ב־${M(p2)} ש״ח. איפה ${one} אחד זול יותר?`,choice:['בחנות א׳','בחנות ב׳','המחיר זהה'],correct:ua<ub?0:1,
 dia:tbl([{h:'חנות א׳',c:'#f3f6fb'},{h:'חנות ב׳',c:'#f3f6fb'}],[it,'מחיר (ש״ח)'],[[n1,n2],[p1,p2]],[[0,0],[0,0]],-1),
 work:[{t:`חנות א׳: ${M(p1+' : '+n1+' = ?')}`,ans:[{label:'',val:ua}],why:'מחיר ל'+one+' אחד = המחיר : הכמות.'},{t:`חנות ב׳: ${M(p2+' : '+n2+' = ?')}`,ans:[{label:'',val:ub}],why:'מחיר ל'+one+' אחד = המחיר : הכמות.'},{t:'איפה מחיר היחידה קטן יותר?',choice:['בחנות א׳','בחנות ב׳'],correct:ua<ub?0:1,why:'משווים מחיר של <b>'+one+' אחד</b>.'}],
 lines:[`חנות א׳: ${M(p1+' : '+n1+' = '+ua)} ש״ח ל${one}`,`חנות ב׳: ${M(p2+' : '+n2+' = '+ub)} ש״ח ל${one}`,`זול יותר: <b>${ua<ub?'חנות א׳':'חנות ב׳'}</b>`],rule:'משווים חלק אחד: מחיר ליחידה.',
 diag:()=>'אל תשוו את המחיר הכולל. מחשבים מחיר ל'+one+' <b>אחד</b> בכל חנות.'};}
/* ===== קנה מידה ===== */
function genReal(big){const k=big?pick([10000,20000,25000,50000,100000]):pick([100,200,500,1000]),d=R(2,9),cm=d*k,useKm=cm>=100000,v=useKm?cm/100000:cm/100,u=useKm?'ק״מ':'מטר',dv=useKm?100000:100;
 return {kind:'קנה מידה · מוצאים מציאות',crack:[CK('מה מבקשים?',['מרחק במציאות','מרחק במפה','קנה המידה'],'מרחק במציאות','קוראים את סוף השאלה.'),CK('מפה ← מציאות. מה עושים?',['כופלים בקנה המידה','מחלקים בקנה המידה','מחברים'],'כופלים בקנה המידה','במציאות הכול גדול יותר ← כופלים.')],text:`במפה בקנה מידה ${M('1 : '+fmt(k))} המרחק ${M(d)} ס״מ. מה המרחק במציאות, ב${u}?`,ans:[{label:u,col:COL[1],val:v,dec:true}],
 dia:tbl([{h:'קנה המידה',c:GR},{h:'המרחק',c:'#f3f6fb'}],['שרטוט (ס״מ)','מציאות (ס״מ)'],[[1,d],[fmt(k),`${d} · ${fmt(k)} = ${fmt(cm)}`]],[[0,0],[0,2]],0),
 work:[{t:`שרטוט ← מציאות: <b>כופלים</b>. ${M(d+' · '+fmt(k)+' = ?')} ס״מ`,ans:[{label:'ס״מ',val:cm}],why:'במציאות הכול <b>גדול יותר</b> ← כופלים בקנה המידה.'},{t:`ממירים ל${u}: ${M(fmt(cm)+' : '+fmt(dv)+' = ?')}`,ans:[{label:u,val:v}],why:useKm?'ס״מ ← ק״מ: מחלקים ב־100,000.':'ס״מ ← מטר: מחלקים ב־100.'}],
 lines:[`שרטוט ← מציאות: <b>כופלים</b>. ${M(d+' · '+fmt(k)+' = '+fmt(cm))} ס״מ`,`ממירים: ${M(fmt(cm)+' : '+fmt(dv)+' = '+fmt(v))} ${u}`],rule:'כופלים ← ממירים בסוף ← האם זה הגיוני?',
 diag:({vals:[x]})=>{if(x===cm)return 'זה <b>בס״מ</b>! צריך להמיר ל'+u+'.';if(Math.abs(x-cm/100)<1e-9&&useKm)return 'זה במטרים. ביקשו ק״מ: עוד '+M(': 1000')+'.';if(x===d/k||x===cm/1000)return 'בדקו את ההמרה: ס״מ ← מטר זה '+M(': 100')+', מטר ← ק״מ זה '+M(': 1000')+'.';return null;}};}
function genDraw(){const k=pick([50,100,200,500,1000]),d=R(2,9),m=d*k/100;
 return {kind:'קנה מידה · מוצאים שרטוט',crack:[CK('מה עושים קודם?',['ממירים את המציאות לס״מ','מחלקים מיד בקנה המידה','כופלים בקנה המידה'],'ממירים את המציאות לס״מ','קנה מידה רק באותן יחידות: ס״מ.'),CK('מציאות ← שרטוט. מה עושים?',['מחלקים בקנה המידה','כופלים בקנה המידה','מחסרים'],'מחלקים בקנה המידה','השרטוט קטן יותר ← מחלקים.')],text:`אורך במציאות ${M(fmt(m))} מטר. מה האורך בשרטוט בקנה מידה ${M('1 : '+fmt(k))}, בס״מ?`,ans:[{label:'ס״מ',col:COL[0],val:d}],
 dia:tbl([{h:'קנה המידה',c:GR},{h:'האורך',c:'#f3f6fb'}],['שרטוט (ס״מ)','מציאות (ס״מ)'],[[1,`${fmt(m*100)} : ${fmt(k)} = ${d}`],[fmt(k),fmt(m*100)]],[[0,2],[0,1]],0),
 work:[{t:`קודם ממירים לס״מ: ${M(fmt(m)+' · 100 = ?')}`,ans:[{label:'ס״מ',val:m*100}],why:'מטר ← ס״מ: כופלים ב־100.'},{t:`מציאות ← שרטוט: <b>מחלקים</b>. ${M(fmt(m*100)+' : '+fmt(k)+' = ?')}`,ans:[{label:'ס״מ',val:d}],why:'השרטוט <b>קטן יותר</b> ← מחלקים בקנה המידה.'}],
 lines:[`קודם ממירים לס״מ: ${M(fmt(m)+' מ׳ = '+fmt(m*100)+' ס״מ')}`,`מציאות ← שרטוט: <b>מחלקים</b>. ${M(fmt(m*100)+' : '+fmt(k)+' = '+d)} ס״מ`],rule:'ממירים לס״מ ← מחלקים ← בודקים.',
 diag:({vals:[x]})=>{if(Math.abs(x-m/k)<1e-9)return 'שכחתם להמיר קודם <b>לס״מ</b>: '+M(fmt(m)+' מ׳ = '+fmt(m*100)+' ס״מ')+'.';if(x===m*k||x===m*100*k)return 'מציאות ← שרטוט: <b>מחלקים</b>, לא כופלים. השרטוט קטן יותר!';return null;}};}
function genFindScale(){const k=pick([50,100,200,250,500,1000]),d=R(2,6),m=d*k/100;
 return {kind:'קנה מידה · מוצאים קנה מידה',crack:[CK('מה עושים קודם?',['ממירים לאותן יחידות','מחלקים מטרים בס״מ','כופלים'],'ממירים לאותן יחידות','קנה מידה רק באותן יחידות.')],text:`בשרטוט אורך ${M(d)} ס״מ, ובמציאות ${M(fmt(m))} מטר. מה קנה המידה? כתבו ${M('1 : ?')}`,ans:[{label:'1 : ?',col:COL[1],val:k}],
 work:[{t:`אותן יחידות: ${M(fmt(m)+' · 100 = ?')} ס״מ`,ans:[{label:'',val:m*100}],why:'קנה מידה רק <b>באותן יחידות</b>: מטר ← ס״מ כופלים ב־100.'},{t:`מצמצמים ל־${M('1 : ?')}: ${M(fmt(m*100)+' : '+d+' = ?')}`,ans:[{label:'',val:k}],why:`מחלקים את שני המספרים ב־${M(d)}, כדי שבשרטוט יהיה 1.`}],
 lines:[`אותן יחידות: ${M(fmt(m)+' מ׳ = '+fmt(m*100)+' ס״מ')}`,`${M(d+' : '+fmt(m*100))} ← מחלקים את שניהם ב־${M(d)}: ${M('1 : '+fmt(k))}`],rule:'אותן יחידות ← מצמצמים ל־1 : ?',
 diag:({vals:[x]})=>Math.abs(x-m/d)<1e-9?'שכחתם להמיר <b>לס״מ</b>. קנה מידה רק באותן יחידות!':null};}
function genConvert(){const t=pick([['cm','m'],['m','km'],['km','m'],['m','cm']]),NM={cm:'ס״מ',m:'מטר',km:'ק״מ'};let v,a,op,big;
 if(t[0]==='cm'){v=R(2,90)*100;a=v/100;op=': 100';}else if(t[0]==='m'&&t[1]==='km'){v=R(1,40)*500;a=v/1000;op=': 1000';}else if(t[0]==='km'){v=pick([1,2,3,1.5,2.5,4,0.5]);a=v*1000;op='· 1000';}else{v=R(2,30);a=v*100;op='· 100';}
 big=op[0]===':';const wrong=big?v*(t[0]==='cm'?100:1000):v/(t[0]==='km'?1000:100);
 return {kind:'המרת יחידות',text:`${M(fmt(v))} ${NM[t[0]]} = ? ${NM[t[1]]}`,ans:[{label:NM[t[1]],col:COL[1],val:a,dec:true}],
 work:[{t:`עוברים ליחידה ${big?'גדולה':'קטנה'} יותר. מה עושים?`,choice:['מחלקים','כופלים'],correct:big?0:1,why:'יחידה גדולה יותר ← מספר קטן יותר ← <b>מחלקים</b>. יחידה קטנה יותר ← <b>כופלים</b>.'},{t:M(fmt(v)+' '+op+' = ?'),ans:[{label:NM[t[1]],val:a}],why:'בודקים את מספר האפסים.'}],
 lines:[M(fmt(v)+' '+op+' = '+fmt(a))],rule:'יחידה גדולה יותר ← מחלקים. קטנה יותר ← כופלים.',
 diag:({vals:[x]})=>Math.abs(x-wrong)<1e-9?'הפוך! '+(big?'ליחידה גדולה יותר מחלקים.':'ליחידה קטנה יותר כופלים.'):null};}
function genCompare(){const k=pick([10000,20000,50000]),d=R(2,8),A=d*k/100000;let B=+(A+pick([-.4,-.3,-.2,.2,.3,.5])).toFixed(1);if(B<=0)B=+(A+.3).toFixed(1);
 const dk=+Math.abs(A-B).toFixed(3),diff=Math.round(dk*1000);
 return {kind:'קנה מידה · משווים',crack:[CK('מה עושים קודם?',['מוצאים את מסלול א׳ במציאות','מחסרים את המספרים כמו שהם','מחלקים ב־1000'],'מוצאים את מסלול א׳ במציאות','משווים רק דברים מאותו סוג: מציאות מול מציאות.'),CK('באיזו יחידה משווים?',['באותה יחידה לשניהם','ס״מ מול ק״מ','לא משנה'],'באותה יחידה לשניהם','משווים רק באותה יחידה!')],text:`מסלול א׳: ${M(d)} ס״מ במפה בקנה מידה ${M('1 : '+fmt(k))}. מסלול ב׳: ${M(B)} ק״מ במציאות. בכמה מטרים הארוך ארוך יותר?`,ans:[{label:'מטר',col:COL[1],val:diff}],
 work:[{t:`מסלול א׳ במציאות: ${M(d+' · '+fmt(k)+' = ?')} ס״מ`,ans:[{label:'ס״מ',val:d*k}],why:'שרטוט ← מציאות: כופלים בקנה המידה.'},{t:`בק״מ: ${M(fmt(d*k)+' : 100,000 = ?')}`,ans:[{label:'ק״מ',val:A}],why:'ס״מ ← ק״מ: מחלקים ב־100,000.'},
  {t:`ההפרש: ${M(fmt(Math.max(A,B))+' − '+fmt(Math.min(A,B))+' = ?')} ק״מ`,ans:[{label:'ק״מ',val:dk}],why:'גדול פחות קטן.'},{t:`במטרים: ${M(fmt(dk)+' · 1000 = ?')}`,ans:[{label:'מטר',val:diff}],why:'ק״מ ← מטר: כופלים ב־1000.'}],
 lines:[`מסלול א׳: ${M(d+' · '+fmt(k)+' = '+fmt(d*k))} ס״מ = ${M(fmt(A))} ק״מ`,`ההפרש: ${M(fmt(Math.max(A,B))+' − '+fmt(Math.min(A,B))+' = '+fmt(dk))} ק״מ = ${M(diff)} מטר`],rule:'משווים רק באותה יחידה!',
 diag:({vals:[x]})=>Math.abs(x-dk)<1e-9?'זה ההפרש <b>בק״מ</b>. ביקשו מטרים: '+M('· 1000')+'.':null};}
/* ===== שלבים ===== */
const LAD=[
 [{g:genRatio,n:4,h:2},{g:genWhole,n:4,h:2},{g:()=>genUnit(true),n:4,h:1},{g:genIsProp,n:4,h:1},{g:genConvert,n:4,h:0}],
 [{g:()=>genPart(false),n:4,h:2},{g:()=>genPart(true),n:4,h:1},{g:()=>genUnit(false),n:4,h:1},{g:genMissing,n:4,h:1},{g:()=>genReal(false),n:4,h:0}],
 [{g:genDiff,n:4,h:1},{g:genThree,n:4,h:1},{g:genTrap,n:4,h:1},{g:genWhy,n:4,h:0},{g:genDraw,n:2,h:0},{g:genFindScale,n:2,h:0}],
 [{g:genRect,n:4,h:1},{g:genBest,n:4,h:1},{g:genFrac,n:4,h:0},{g:genDiffPart,n:4,h:0},{g:genCompare,n:2,h:0},{g:()=>genReal(true),n:2,h:0}]];
const LEVELS=[
 {n:1,t:'יחס, שלם ומחיר ליחידה',d:'מוצאים יחס ← נתון השלם ← מחיר ליחידה ← המרות',ladder:LAD[0]},
 {n:2,t:'נתון חלק, מספר חסר, מפה',d:'איפה העוגן? ← כפל בהצלבה ← שרטוט ← מציאות',ladder:LAD[1]},
 {n:3,t:'הפרש, שלושה חלקים, פי כמה',d:'עמודת הפרש ← יחס של 3 ← לא מוסיפים, כופלים',ladder:LAD[2]},
 {n:4,t:'חשיבה ואוריינות',d:'היקף מלבן ← איפה משתלם? ← שבר ויחס ← משווים מסלולים',ladder:LAD[3]}];
LEVELS.forEach(l=>l.g=()=>pick(l.ladder).g());
const TEST=[[genRatio,genWhole,()=>genUnit(true),genIsProp],[()=>genPart(false),()=>genPart(true),()=>genUnit(false),genMissing],[genDiff,genThree,genTrap,genWhy],[genRect,genBest,genFrac,genDiffPart]];
const WARM=['c','c','a','a','b','b','a','b'].map(t=>()=>genWarm(t));
/* ===== הסבר מונפש: קצר, ויזואלי, רעיון אחד בכל כרטיס ===== */
const sq=(n,col,o={})=>Array.from({length:n},(_,i)=>`<span class="c rv" style="background:${col};--d:${(o.d||0)+i*(o.st||.25)}s">${o.t!=null?o.t:''}</span>`).join('');
const RECAP=[
 {h:'מה זה יחס?',d:1.8,svg:()=>`<div class="row"><div class="grp" style="color:${COL[0]}">דנה<div class="sq">${sq(2,COL[0])}</div></div><div class="grp rv" style="--d:.6s;font:900 40px Rubik">:</div><div class="grp" style="color:${COL[1]}">נועם<div class="sq">${sq(3,COL[1],{d:.9})}</div></div></div>`,
  says:[`${M('2 : 3')} ← על כל ${C2('2',0)} של דנה, ${C2('3',1)} לנועם.`],what:'יחס = "על כל", לא "כמה יותר".'},
 {h:'כמה חלקים?',d:1.8,svg:()=>`<div class="sq">${sq(2,COL[0])}${sq(3,COL[1],{d:.6})}</div>`,
  says:[`${M('2 + 3 = 5')} חלקים`],what:'מחברים את מספרי היחס.'},
 {h:'חלק אחד',d:2,svg:()=>`<div class="say rv">${M('20')} מדבקות ← ${M('5')} חלקים</div><div class="sq">${sq(5,'#9fb3cc',{d:.6,t:'4'})}</div>`,
  says:[`${M('20 : 5 = 4')} בכל חלק`],what:'הכמות : מספר החלקים.'},
 {h:'כופלים',d:2.2,svg:()=>`<div class="row"><div class="grp" style="color:${COL[0]}">דנה<div class="sq">${sq(2,COL[0],{t:'4'})}</div></div><div class="grp" style="color:${COL[1]}">נועם<div class="sq">${sq(3,COL[1],{d:.6,t:'4'})}</div></div></div>`,
  says:[`דנה ${C2(M('2 · 4 = 8'),0)} · נועם ${C2(M('3 · 4 = 12'),1)}`],what:'מספר החלקים · חלק אחד.'},
 {h:'טבלת העוגן',d:2.4,svg:()=>atHtml([{h:'דנה',c:COL[0]},{h:'נועם',c:COL[1]},{h:'שלם',c:PU}],['יחס (חלקים)','כמות'],[[{v:2,k:0},{v:3,k:0},{v:5,k:1}],[{v:8,k:2},{v:12,k:2},{v:20,k:0}]],2,true),
  says:['העוגן: ידועים <b>גם</b> חלקים <b>וגם</b> כמות.'],what:'טבלה ← עוגן ← חלק אחד ← כופלים.'},
 {h:'פרופורציה: פי כמה?',d:1.6,svg:()=>atHtml([{h:'ידוע',c:'#f3f6fb'},{h:'שואלים',c:'#f3f6fb'}],['מחברות','ש״ח'],[[{v:2,k:0},{v:6,k:0}],[{v:10,k:0},{v:'10 · 3 = 30',k:2}]],0,true),
  says:[`מ־${M('2')} ל־${M('6')}: <b>פי 3</b>.`],what:'בפרופורציה כופלים, לא מוסיפים.'},
 {h:'קנה מידה',d:1.6,svg:()=>`<svg viewBox="0 0 300 110" style="width:100%;max-width:300px" role="img" aria-label="קנה מידה"><rect x="20" y="22" width="30" height="16" rx="4" fill="${OR}"/><text x="35" y="58" fill="${OR}" font-size="14" font-weight="800" text-anchor="middle" font-family="Rubik">1 ס״מ</text><rect class="rv" style="--d:.8s" x="20" y="72" width="260" height="16" rx="4" fill="${BL}"/><text class="rv" style="--d:1.2s" x="150" y="106" fill="${BL}" font-size="14" font-weight="800" text-anchor="middle" font-family="Rubik">100 ס״מ במציאות</text></svg>`,
  says:[`${M('1 : 100')} ← שרטוט ← מציאות: כופלים.`],what:'מציאות ← שרטוט: מחלקים.'},
 {h:'הטעות הנפוצה',d:.4,says:[`${M('20')} ביחס ${M('2 : 3')} ← ${M('10')} ו־${M('10')} <span class="x">✗</span>`,`נכון: ${M('8')} ו־${M('12')} <span class="v">✓</span>`],what:'בודקים: חוזרים ליחס?'}];
RECAP[0].chk=[genRatio];RECAP[1].chk=[()=>genWarm('c')];RECAP[2].chk=[()=>genWarm('a')];RECAP[3].chk=[()=>genWarm('b')];
RECAP[4].chk=[genWhole,()=>genPart(false)];RECAP[5].chk=[()=>genUnit(true),genTrap];RECAP[6].chk=[()=>genReal(false)];RECAP[7].chk=[genWhole];
