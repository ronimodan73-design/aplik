/*META {"id":"y10_sys2","title":"6 הטריקים של המערכות · ערכה: רוני מודן","short":"6 טריקים","topic":"6 הטריקים של המערכות","glyph":"x²+y²","color":"#c084fc"} */
const APP={key:'y10_sys2',topic:'6 הטריקים של המערכות',sub:'מערכות ממעלה שנייה (5 יח"ל): מזהים את הטריק, נזהרים מהמוקשים, ופותרים צ׳יק צ׳ק.'};
document.head.insertAdjacentHTML('beforeend',`<style>
.an{display:flex;flex-direction:column;align-items:center;gap:7px;font-size:20px;min-height:150px}
.an .hl{background:#ffb02022;border:2px solid #ffb020;border-radius:10px;padding:2px 10px}
.an .x{color:#ff7a8a}.an .v{color:#4fd18b}
.st{position:relative;display:inline-block}.st::after{content:'';position:absolute;left:-2px;top:52%;height:3px;width:0;background:#ff7a8a;border-radius:2px;animation:stk .5s ease-out forwards;animation-delay:var(--d,0s)}
@keyframes stk{to{width:calc(100% + 4px)}}
.fly{display:inline-block;color:#ffb020;animation:fly 1s ease-in-out both;animation-delay:var(--d,0s)}
@keyframes fly{from{transform:translateY(-40px) scale(1.25);opacity:0}to{transform:none;opacity:1}}
.bx{display:inline-block;border:2px solid transparent;border-radius:7px;padding:0 5px;color:#c084fc;animation:bxa .6s both;animation-delay:var(--d,0s)}
@keyframes bxa{to{border-color:#c084fc;background:#c084fc22}}
.sy{display:block;width:max-content;max-width:100%;margin:6px 0 8px auto;direction:ltr;text-align:left;border-left:3px solid #9fb3cc;padding:4px 12px;margin:4px 0;font:700 20px Rubik;line-height:1.9}
.tk{display:grid;grid-template-columns:1fr 1fr;gap:6px;width:100%;max-width:330px}.tk div{background:#1c3352;border-radius:10px;padding:6px 8px;font-size:15px}
</style>`);
/* ===== helpers ===== */
const N=v=>v<0?'−'+(-v):''+v;
const C=(t,c)=>`<span style="color:${c}">${t}</span>`;
const nz=(a,b)=>{let v;do v=R(a,b);while(!v);return v;};
const FR=(a,b)=>`<span class="fr"><span>${a}</span><span>${b}</span></span>`;
const tm=(c,v,first)=>{if(!c)return '';const a=Math.abs(c),body=(a===1&&v?'':a)+v;return first?(c<0?'−':'')+body:(c<0?' − ':' + ')+body;};
const ex=(...ts)=>{let s='',f=true;ts.forEach(([c,v])=>{if(!c)return;s+=tm(c,v,f);f=false;});return s||'0';};
const fx=(c,v,first)=>first?(c<0?'−':'')+FR(Math.abs(c),v):(c<0?' − ':' + ')+FR(Math.abs(c),v);
const P=(x,y)=>'('+N(x)+' ; '+N(y)+')';
const SYS=(a,b)=>`<div class="sy">${M(a)}<br>${M(b)}</div>`;
const L=(h,d,c='')=>`<div class="rv ${c}" style="--d:${d}s">${h}</div>`;
const CH=o=>{const s=shuf(o);return {choice:s.map(x=>x.t),correct:s.findIndex(x=>x.ok),diag:({sel})=>s[sel]&&!s[sel].ok&&s[sel].msg||null};};
const CK=(lab,o,why)=>{const s=shuf(o);return {lab,choice:s.map(x=>x[0]),correct:s.findIndex(x=>x[1]),why};};
const TR=['🔁 מבודדים ומציבים','✂️ ה־xy נעלם','🎁 ריבוע מוסתר','📦 x² הוא נעלם חדש','🔄 שבר הופך לנעלם','➖ מחסירים משוואות'];
const TRW=['יש משוואה קווית ← מבודדים ממנה נעלם ומציבים.',`יש ${M('xy')} בשתי המשוואות ← פותחים סוגריים ומציבים.`,`${M('x² + 2xy + y² = (x + y)²')} ← מוציאים שורש.`,`יש רק ${M('x²')} ו־${M('y²')} ← ${M('X = x² , Y = y²')}.`,'הנעלם במכנה ← מסמנים את השבר כנעלם חדש.',`${M('x² + y²')} מופיע בשתיהן ← מחסירים והוא נעלם.`];
const trickCK=k=>{const o=shuf([0,1,2,3,4,5].filter(i=>i!==k)).slice(0,2);return CK('איזה טריק?',shuf([[TR[k],1],...o.map(i=>[TR[i],0])]),TRW[k]);};
/* ===== ★ basics ===== */
function sysOf(k){
 if(k===0){const a=nz(-3,3),c=R(2,12),d=R(5,40);return SYS(ex([1,'x'],[a,'y'])+' = '+c,'x² + xy = '+d);}
 if(k===1){const a=nz(-5,5),b=nz(-5,5),p=R(6,60);return SYS(`(${ex([1,'x'],[a,''])})(${ex([1,'y'],[b,''])}) = ${p+R(5,40)}`,'xy = '+p);}
 if(k===2){const s=R(3,9),a=R(2,5),b=R(2,5);return SYS(`x² + 2xy + y² = ${s*s}`,ex([a,'x'],[b,'y'])+' = '+R(5,30));}
 if(k===3){const a=R(2,7),b=R(2,7),c=R(2,7),d=nz(-6,6);return SYS(ex([a,'x²'],[b,'y²'])+' = '+R(20,90),ex([c,'x²'],[d,'y²'])+' = '+R(5,60));}
 if(k===4){const p=R(2,20),q=nz(-15,15),r=R(2,20),s=nz(-15,15);return SYS(fx(p,'x',1)+fx(q,'y')+' = '+R(1,9),fx(r,'x',1)+fx(s,'y')+' = '+R(1,9));}
 const p=nz(-8,8),r=R(5,40);return SYS(ex([1,'x²'],[1,'y²'],[p,'x'])+' = '+(r+R(1,20)),'x² + y² = '+r);}
function gTrick(){const k=R(0,5);const opts=shuf([k,...shuf([0,1,2,3,4,5].filter(i=>i!==k)).slice(0,3)]);
 return {kind:'איזה טריק?',rc:0,text:`${sysOf(k)}איזה טריק הכי מהיר כאן?`,choice:opts.map(i=>TR[i]),correct:opts.indexOf(k),lines:[TRW[k]],rule:'קודם מזהים את הטריק, ורק אז פותרים.',
  diag:({sel})=>{const w=opts[sel];return w===0&&k===2?'אפשר גם לבודד, אבל יש טריק מהיר יותר: x² + 2xy + y² = (x + y)².':w===0&&k!==0?'אין כאן משוואה קווית פשוטה לבודד ממנה.':'רמז: '+TRW[k];}};}
function gSqrt(){const k=R(3,12),z=Math.random()<.5,s=z?k*k:k*k;
 return {kind:'מוקש: ±',rc:5,text:`${M('x² = '+s)}. מה x?`,...CH([{t:M('x = '+k+' או x = −'+k),ok:1},{t:M('x = '+k),msg:`💣 גם ${M('(−'+k+')² = '+s)}! יש שני פתרונות.`},{t:M('x = −'+k),msg:`גם ${M(k+'² = '+s)}. שני פתרונות: ±${k}.`},{t:M('x = '+s/2),msg:'שורש זה לא חלקי 2. איזה מספר בריבוע נותן '+s+'?'}]),
  lines:[M(k+'² = '+s+' , (−'+k+')² = '+s),M('x = ±'+k)],rule:`${M('x² = a')} (a חיובי) ← ${M('x = ±√a')}: שני פתרונות.`};}
function gIsolate(){const a=nz(-6,6),c=nz(-12,15),useY=Math.random()<.6;
 const e=useY?ex([a,'x'],[1,'y'])+' = '+N(c):ex([1,'x'],[a,'y'])+' = '+N(c),v=useY?'y':'x',o=useY?'x':'y';
 return {kind:'מבודדים נעלם',rc:1,text:`בודדו את ${M(v)} מהמשוואה ${M(e)}. כתבו: ${M(v+' = (מקדם) · '+o+' + (מספר)')}`,tpl:`${v} = [] ${o} + []`,
  ans:[{label:'המקדם של '+o,col:BL,val:-a,neg:true},{label:'המספר',col:OR,val:c,neg:true}],
  work:[{t:`מעבירים את ${M(tm(a,o,true))} לצד ימין. מה הסימן שלו שם?`,choice:[M(tm(-a,o,true)),M(tm(a,o,true))],correct:0,why:'מעבירים אגף ← הסימן מתהפך.'},{t:`${M(v+' = '+N(c)+tm(-a,o))}. מה המקדם של ${M(o)}?`,ans:[{label:'',val:-a}],why:'המקדם כולל את הסימן שלו.'},{t:'ומה המספר?',ans:[{label:'',val:c}],why:'המספר נשאר כמו שהוא.'}],
  lines:[M(v+' = '+N(c)+tm(-a,o))],rule:'מבודדים: מעבירים אגף ← הסימן מתהפך.',diag:({vals:[p,q]})=>p===a?'💣 שכחתם להפוך סימן כשהעברתם אגף.':null};}
function gCount(){const x0=R(0,5),y0=R(0,5),neg=Math.random()<.15,X=x0*x0,Y=neg?-R(1,9):y0*y0;const cnt=neg?0:(X?2:1)*(Y?2:1);
 return {kind:'כמה פתרונות?',rc:6,text:`פתרנו ומצאנו: ${M('x² = '+X)} ו־${M('y² = '+N(Y))}. כמה פתרונות (זוגות) יש למערכת?`,ans:[{label:'מספר הפתרונות',col:PU,val:cnt,neg:true}],
  work:neg?[{t:`האם יש מספר שבריבוע נותן ${M(N(Y))}?`,choice:['לא, ריבוע תמיד ≥ 0','כן'],correct:0,why:'ריבוע של מספר אף פעם לא שלילי.'},{t:'אז כמה פתרונות?',ans:[{label:'',val:0}],why:'אם ל־y אין ערך, אין אף זוג.'}]:
   [{t:`כמה ערכים יש ל־x? ${M('x² = '+X)}`,ans:[{label:'',val:X?2:1}],why:X?'± ← שני ערכים.':'רק 0 בריבוע נותן 0 ← ערך אחד.'},{t:`כמה ערכים ל־y? ${M('y² = '+Y)}`,ans:[{label:'',val:Y?2:1}],why:Y?'± ← שני ערכים.':'רק 0 ← ערך אחד.'},{t:'כל x עם כל y. כמה זוגות?',ans:[{label:'',val:cnt}],why:'כופלים: מספר ה־x · מספר ה־y.'}],
  lines:neg?['ל־y² שלילי אין פתרון ← 0 פתרונות.']:[`x: ${X?M('±'+x0):M('0')} , y: ${Y?M('±'+y0):M('0')}`,`זוגות: ${M((X?2:1)+' · '+(Y?2:1)+' = '+cnt)}`],rule:'כל ערך חיובי של x² או y² נותן ± ← עד 4 פתרונות.',
  diag:({vals:[v]})=>v===2&&cnt===4?'💣 יש ± גם ל־x וגם ל־y: 2 · 2 = 4.':v===1&&cnt>1?'שכחתם את ה־±.':null};}
function gTrapPair(){const a=nz(-5,6);let b;do b=nz(-5,6);while(b===a||b===-a);const s=a+b;
 return {kind:'מוקש: זוגות',rc:2,text:`${SYS('x + y = '+N(s),'xy = '+N(a*b))}מצאנו ${M('x = '+N(a))} או ${M('x = '+N(b))}. מה הפתרונות?`,...CH([{t:M(P(a,b)+' , '+P(b,a)),ok:1},{t:M(P(a,a)+' , '+P(b,b)),msg:'💣 כל x מקבל y <b>משלו</b>: מציבים ב־'+M('y = '+N(s)+' − x')+'.'},{t:M(P(a,b)),msg:'יש שני ערכים ל־x ← שני זוגות.'},{t:M(P(a,b)+' , '+P(-a,-b)),msg:'הצבנו בקווית? בדקו: '+M('y = '+N(s)+' − x')+'.'}]),
  lines:[`${M('x = '+N(a))} ← ${M('y = '+N(s)+' − '+(a<0?'('+N(a)+')':a)+' = '+N(b))}`,`${M('x = '+N(b))} ← ${M('y = '+N(a))}`],rule:'כל x מציבים בקווית ומקבלים את ה־y שלו. התשובה: זוגות.'};}
/* ===== ★★ trick 1, 2, 3 ===== */
function gSub(){let a,b;do{a=nz(-5,6);b=nz(-5,6);}while(a===b||a+b===0);const s=a+b,q=a*a+b*b,lo=Math.min(a,b),hi=Math.max(a,b);
 return {kind:'מבודדים ומציבים',rc:1,text:`${SYS('x + y = '+N(s),'x² + y² = '+q)}מה הפתרונות?`,...CH([{t:M(P(a,b)+' , '+P(b,a)),ok:1},{t:M(P(a,b)),msg:'💣 יש שני ערכים ל־x ← שני זוגות.'},{t:M(P(a,a)+' , '+P(b,b)),msg:'💣 כל x עם ה־y שלו: '+M('y = '+N(s)+' − x')+'.'},{t:M(P(-a,-b)+' , '+P(-b,-a)),msg:'בדקו את הסימנים: '+M('x + y = '+N(s))+'.'}]),
  crack:[trickCK(0),CK('מאיזו משוואה מבודדים?',[['מהקווית x + y = '+N(s),1],['מהריבועית',0]],'מבודדים תמיד מהמשוואה הקווית: זה הכי קל.')],
  work:[{t:`מבודדים: ${M('y = ? − x')}`,ans:[{label:'',val:s}],why:'מעבירים את x לצד ימין.'},{t:`מציבים, פותחים ומחלקים ב־2: ${M('x² − '+(s<0?'('+N(s)+')':s)+'x + ? = 0')} <small>(המספר)</small>`,ans:[{label:'',val:a*b}],why:`${M('x² + ('+N(s)+' − x)² = '+q)} ← ${M('2x² − '+(2*s<0?'('+N(2*s)+')':2*s)+'x + '+(s*s-q)+' = 0')} ← מחלקים ב־2.`},{t:'הפתרון הקטן של x:',ans:[{label:'x =',val:lo}],why:'מפרקים לגורמים או בנוסחת השורשים.'},{t:'הפתרון הגדול של x:',ans:[{label:'x =',val:hi}],why:'שני מספרים שסכומם '+N(s)+' ומכפלתם '+N(a*b)+'.'},{t:`כש־${M('x = '+N(lo))}, מה y?`,ans:[{label:'y =',val:s-lo}],why:'מציבים בקווית: '+M('y = '+N(s)+' − x')+'.'}],
  lines:[M('y = '+N(s)+' − x'),M('x² + ('+N(s)+' − x)² = '+q),M('x² '+(s<0?'+ '+(-s):'− '+s)+'x '+(a*b<0?'− '+(-a*b):'+ '+a*b)+' = 0'),`${M('x = '+N(lo))} או ${M('x = '+N(hi))}`,M(P(lo,s-lo)+' , '+P(hi,s-hi))],rule:'קווית + ריבועית ← מבודדים מהקווית ומציבים בריבועית.'};}
function gXY(){const x0=nz(-6,8),y0=nz(-6,8),a=nz(-5,5),b=nz(-5,5),p=x0*y0,c=(x0+a)*(y0+b),k=c-p-a*b;
 return {kind:'ה־xy נעלם',rc:3,text:`${SYS(`(${ex([1,'x'],[a,''])})(${ex([1,'y'],[b,''])}) = ${N(c)}`,'xy = '+N(p))}פותחים סוגריים ומציבים את xy. כתבו את המשוואה הקווית:`,tpl:'[] x + [] y = []',
  ans:[{label:'המקדם של x',col:BL,val:b,neg:true},{label:'המקדם של y',col:GR,val:a,neg:true},{label:'המספר',col:OR,val:k,neg:true}],
  crack:[trickCK(1),CK('מה יקרה ל־xy?',[['מציבים במקומו '+N(p)+' והוא נעלם',1],['מחלקים בו',0],['מעלים בריבוע',0]],'יש xy בשתי המשוואות ← מחליפים אותו במספר.')],
  work:[{t:`פותחים: ${M('xy + (?)x + ...')} מה המקדם של x?`,ans:[{label:'',val:b}],why:`x כפול ${M(N(b))} ← המקדם של x הוא המספר שבסוגריים <b>של y</b>.`},{t:'מה המקדם של y?',ans:[{label:'',val:a}],why:`y כפול ${M(N(a))} (מהסוגריים של x).`},{t:`המספר: ${M(N(a)+' · '+(b<0?'('+N(b)+')':b)+' = ?')}`,ans:[{label:'',val:a*b}],why:'מינוס כפול מינוס = פלוס.'},{t:`מציבים ${M('xy = '+N(p))} ומעבירים את המספרים: ${M(N(c)+' − '+(p<0?'('+N(p)+')':p)+' − '+(a*b<0?'('+N(a*b)+')':a*b)+' = ?')}`,ans:[{label:'',val:k}],why:'מעבירים אגף ← הסימן מתהפך.'}],
  lines:[M('xy'+tm(b,'x')+tm(a,'y')+tm(a*b,'')+' = '+N(c)),`${M('xy = '+N(p))} ← ${M(N(p)+tm(b,'x')+tm(a,'y')+tm(a*b,'')+' = '+N(c))}`,M(ex([b,'x'],[a,'y'])+' = '+N(k))+' ← קווית! ממשיכים בטריק 1.'],rule:`${M('(x + a)(y + b)')} עם ${M('xy')} נתון ← פותחים, מציבים ${M('xy')}, ונשארת משוואה קווית.`,
  diag:({vals:[u,v]})=>u===a&&v===b&&a!==b?'💣 החלפתם: x נכפל במספר שבסוגריים <b>של y</b>.':null};}
function gHidden(){let x0,y0;do{x0=nz(-4,7);y0=nz(-4,7);}while(x0+y0<3);const s=x0+y0,a=R(2,5);let b;do b=R(1,5);while(b===a);
 return {kind:'ריבוע מוסתר',rc:4,text:`${SYS('x² + 2xy + y² = '+s*s,ex([a,'x'],[b,'y'])+' = '+N(a*x0+b*y0))}מה אפשר לדעת על ${M('x + y')}?`,...CH([{t:M('x + y = '+s+' או x + y = −'+s),ok:1},{t:M('x + y = '+s),msg:`💣 גם ${M('(−'+s+')² = '+s*s)}. שני מקרים!`},{t:M('x + y = '+s*s),msg:'זה (x + y)². צריך להוציא שורש.'},{t:M('x + y = '+(s*s/2)),msg:'שורש, לא חצי.'}]),
  crack:[trickCK(2)],
  work:[{t:`${M('x² + 2xy + y²')} זה בעצם:`,choice:[M('(x + y)²'),M('(x − y)²'),M('x² + y²')],correct:0,why:'נוסחת הכפל המקוצר: (x + y)² = x² + 2xy + y².'},{t:`${M('(x + y)² = '+s*s)} ← ${M('x + y')} יכול להיות:`,choice:[M('±'+s),M(''+s)],correct:0,why:'💣 שורש ← שני מקרים: חיובי ושלילי.'}],
  lines:[M('(x + y)² = '+s*s),`${M('x + y = '+s)} או ${M('x + y = −'+s)}`,'כל מקרה + הקווית ← מערכת קווית קטנה.'],rule:`${M('x² + 2xy + y² = (x + y)²')} ← שורש ← שני מקרים (±).`};}
/* ===== ★★★ trick 4, 5 ===== */
function gSquares(){const x0=R(1,5),y0=R(1,5),X=x0*x0,Y=y0*y0;let a,b,c,d;do{a=R(1,5);b=nz(-5,5);c=R(1,5);d=nz(-5,5);}while(a*d-b*c===0||(a===c&&b===d));
 const e1=a*X+b*Y,e2=c*X+d*Y;
 return {kind:'x² הוא נעלם חדש',rc:6,text:`${SYS(ex([a,'x²'],[b,'y²'])+' = '+N(e1),ex([c,'x²'],[d,'y²'])+' = '+N(e2))}מצאו את ${M('x²')} ואת ${M('y²')}.`,tpl:'x² = [] , y² = []',
  ans:[{label:'x² =',col:PU,val:X},{label:'y² =',col:GR,val:Y}],
  crack:[trickCK(3),CK('כמה פתרונות יכולים להיות בסוף?',[['עד 4',1],['תמיד 1',0],['תמיד 2',0]],'x = ±… ו־y = ±… ← 2 · 2 = 4.')],
  work:[{t:`מסמנים ${M('X = x² , Y = y²')}: ${M(ex([a,'X'],[b,'Y'])+' = '+N(e1))}. זו מערכת:`,choice:['קווית רגילה','ריבועית'],correct:0,why:'X ו־Y בחזקה 1 ← מערכת קווית.'},{t:`${M('X = ?')}`,ans:[{label:'X =',val:X}],why:'מבטלים את Y: כופלים את המשוואות ומחסירים.'},{t:`אז ${M('x = ±?')}`,ans:[{label:'',val:x0}],why:'💣 x² = '+X+' ← x = ±'+x0+'.'},{t:`ו־${M('Y = ?')}`,ans:[{label:'Y =',val:Y}],why:'מציבים את X באחת המשוואות.'}],
  lines:[`${M('X = x² , Y = y²')} ← מערכת קווית`,M('X = '+X+' , Y = '+Y),`${M('x = ±'+x0+' , y = ±'+y0)} ← 4 פתרונות`],rule:`רק ${M('x²')} ו־${M('y²')} ← ${M('X = x² , Y = y²')} ← קווית ← בסוף ± ← עד 4 פתרונות.`,
  diag:({vals:[u,v]})=>u===x0&&v===y0?'💣 זה x ו־y. שאלנו על x² ו־y² (X ו־Y).':null};}
function fracSys(){const X=[1,2,4,5,-1,-2,-4,-5,10],x0=pick(X);let y0;do y0=pick(X);while(y0===x0);let k1,k2,k3,k4;do{k1=nz(-4,5);k2=nz(-4,5);k3=nz(-4,5);k4=nz(-4,5);}while(k1*k4-k2*k3===0);
 const p=k1*x0,q=k2*y0,r=k3*x0,s=k4*y0;return {x0,y0,p,q,r,s,c1:k1+k2,c2:k3+k4};}
function gFrac(){const o=fracSys(),{x0,y0,p,q,r,s,c1,c2}=o;
 return {kind:'שבר הופך לנעלם',rc:7,text:`${SYS(fx(p,'x',1)+fx(q,'y')+' = '+N(c1),fx(r,'x',1)+fx(s,'y')+' = '+N(c2))}מצאו את x ואת y.`,tpl:'x = [] , y = []',
  ans:[{label:'x =',col:BL,val:x0,neg:true},{label:'y =',col:GR,val:y0,neg:true}],
  crack:[trickCK(4),CK('מה מסמנים?',[[M(FR(1,'x')+' = a , '+FR(1,'y')+' = b'),1],[M('a = x , b = y'),0],[M('a = x²'),0]],'השבר עצמו הופך לנעלם חדש.')],
  work:[{t:`${M(FR(1,'x')+' = a , '+FR(1,'y')+' = b')}: ${M(ex([p,'a'],[q,'b'])+' = '+N(c1))}. מה a? <small>(אפשר עשרוני, למשל 0.25)</small>`,ans:[{label:'a =',val:1/x0,dec:true}],why:'פותרים מערכת קווית רגילה ב־a ו־b.'},{t:'מה b?',ans:[{label:'b =',val:1/y0,dec:true}],why:'מציבים את a באחת המשוואות.'},{t:`💣 חוזרים ל־x: ${M('x = 1 : a = ?')}`,ans:[{label:'x =',val:x0}],why:'a הוא לא x! x = 1 : a.'},{t:`${M('y = 1 : b = ?')}`,ans:[{label:'y =',val:y0}],why:'y = 1 : b.'}],
  lines:[M(ex([p,'a'],[q,'b'])+' = '+N(c1)+' , '+ex([r,'a'],[s,'b'])+' = '+N(c2)),M('a = '+N(+(1/x0).toFixed(4))+' , b = '+N(+(1/y0).toFixed(4))),M('x = '+N(x0)+' , y = '+N(y0))],rule:`נעלם במכנה ← ${M(FR(1,'x')+' = a')} ← מערכת קווית ← בסוף חוזרים: ${M('x = 1 : a')}.`,
  diag:({vals:[u,v]})=>Math.abs(u-1/x0)<1e-9?'💣 זה a. חוזרים: x = 1 : a.':null};}
function gBack(){const x0=pick([2,4,5,10,-2,-4,-5,8]),a=1/x0,w=Math.random()<.5;
 return {kind:'מוקש: חוזרים מ־a',rc:8,text:`סימנו ${M(FR(1,w?'x':'(x + 3)')+' = a')} ומצאנו ${M('a = '+N(+a.toFixed(4)))}. מה x?`,ans:[{label:'x =',col:BL,val:w?x0:x0-3,neg:true}],
  work:w?[{t:`${M('x = 1 : a = 1 : '+N(+a.toFixed(4))+' = ?')}`,ans:[{label:'x =',val:x0}],why:'💣 a הוא לא x. הופכים: x = 1 : a.'}]:[{t:`קודם: ${M('x + 3 = 1 : a = ?')}`,ans:[{label:'',val:x0}],why:'הופכים את a.'},{t:`${M('x = '+N(x0)+' − 3 = ?')}`,ans:[{label:'x =',val:x0-3}],why:'מעבירים את 3.'}],
  lines:w?[M('x = 1 : '+N(+a.toFixed(4))+' = '+N(x0))]:[M('x + 3 = 1 : '+N(+a.toFixed(4))+' = '+N(x0)),M('x = '+N(x0-3))],rule:'אחרי טריק השבר: חוזרים לנעלם המקורי (הופכים), ובודקים שהמכנה לא 0.',
  diag:({vals:[v]})=>Math.abs(v-a)<1e-9?'💣 זה a, לא x.':null};}
function gTrapDen(){const k=R(2,9);
 return {kind:'מוקש: מכנה 0',rc:8,text:`במערכת יש ${M(FR(k,'x − 2'))}. בסוף הפתרון יצא ${M('x = 2')}. מה עושים?`,...CH([{t:'פוסלים: אי אפשר לחלק ב־0',ok:1},{t:'זה פתרון רגיל',msg:`💣 x = 2 נותן מכנה ${M('2 − 2 = 0')}. חילוק ב־0 אסור!`},{t:'מעגלים ל־x = 3',msg:'לא משנים פתרונות. בודקים אם הוא מותר.'},{t:'מחלקים ב־'+k,msg:'הבעיה היא המכנה: x − 2 = 0.'}]),
  lines:[M('x − 2 = 2 − 2 = 0'),'חילוק ב־0 אסור ← הפתרון נפסל.'],rule:'בשאלות עם שברים: בסוף בודקים שאף מכנה לא יוצא 0.'};}
/* ===== ★★★★ trick 6 + mines ===== */
function gSubtr(){let x0,y0,p;do{x0=nz(-5,5);y0=nz(-5,5);p=nz(-8,8);}while(Math.abs(x0)===Math.abs(y0));const r=x0*x0+y0*y0,c1=r+p*x0;
 return {kind:'מחסירים משוואות',rc:9,text:`${SYS(ex([1,'x²'],[1,'y²'],[p,'x'])+' = '+N(c1),'x² + y² = '+r)}מצאו את x ואת y (חיובי).`,tpl:'x = [] , y = ± []',
  ans:[{label:'x =',col:BL,val:x0,neg:true},{label:'y = ±',col:GR,val:Math.abs(y0)}],
  crack:[trickCK(5),CK('מה נעלם כשמחסירים?',[[M('x² + y²'),1],[M('x'),0],['שום דבר',0]],'x² + y² מופיע בשתי המשוואות ← מחסירים והוא נעלם.')],
  work:[{t:`מחסירים (עליונה פחות תחתונה): ${M(tm(p,'x',true)+' = ?')}`,ans:[{label:'',val:c1-r}],why:`${M(N(c1)+' − '+r)}. x² + y² נמחק.`},{t:`${M('x = ?')}`,ans:[{label:'x =',val:x0}],why:'מחלקים ב־'+N(p)+'.'},{t:`מציבים: ${M('y² = '+r+' − '+(x0<0?'('+N(x0)+')':x0)+'² = ?')}`,ans:[{label:'y² =',val:y0*y0}],why:'💣 (מינוס)² = פלוס.'},{t:`${M('y = ±?')}`,ans:[{label:'',val:Math.abs(y0)}],why:'שורש ← ±.'}],
  lines:[M(tm(p,'x',true)+' = '+N(c1)+' − '+r+' = '+N(c1-r)),M('x = '+N(x0)),M('y² = '+r+' − '+x0*x0+' = '+y0*y0),`${M('y = ±'+Math.abs(y0))} ← ${M(P(x0,Math.abs(y0))+' , '+P(x0,-Math.abs(y0)))}`],rule:`אותו ${M('x² + y²')} בשתי המשוואות ← מחסירים ← נשארת משוואה קווית.`,
  diag:({vals:[u,v]})=>u===-x0?'בדקו את הסימן בחילוק.':v===y0*y0?'זה y². צריך שורש.':null};}
function gTrapDiv(){const k=nz(-6,7),nm=pick(['נועה','איתי','מאיה','יואב','עידו']);
 return {kind:'מוקש: חילוק בנעלם',rc:10,text:`${nm} פתר: ${M('xy = '+(k<0?'('+N(k)+')':k)+'x')} ← חילק ב־x ← ${M('y = '+N(k))}. מה הוא פספס?`,...CH([{t:`את הפתרון ${M('x = 0')}`,ok:1},{t:'שום דבר, זה נכון',msg:'💣 אם x = 0, החילוק ב־x אסור, ו־x = 0 הוא פתרון!'},{t:`את ${M('y = '+N(-k))}`,msg:'הבעיה היא החילוק ב־x, לא הסימן.'},{t:'היה צריך לחלק ב־y',msg:'לא מחלקים בנעלם בכלל.'}]),
  lines:[M('xy − '+(k<0?'('+N(k)+')':k)+'x = 0'),`${M('x(y '+(k<0?'+ '+(-k):'− '+k)+') = 0')} ← ${M('x = 0')} או ${M('y = '+N(k))}`],rule:'לא מחלקים בנעלם! מעבירים אגף ומוציאים גורם משותף ← שני מקרים.'};}
function gTrapPM(){const k=R(2,9),m=nz(-4,4);
 return {kind:'מוקש: ±',rc:5,text:`${SYS('x² = '+k*k,'y = x '+(m<0?'− '+(-m):'+ '+m))}כמה פתרונות יש למערכת?`,ans:[{label:'מספר הפתרונות',col:PU,val:2}],
  work:[{t:`${M('x² = '+k*k)} ← כמה ערכים ל־x?`,ans:[{label:'',val:2}],why:'💣 ± ← שני ערכים.'},{t:'לכל x יש y אחד (מהמשוואה השנייה). כמה זוגות?',ans:[{label:'',val:2}],why:'y נקבע לפי x ← זוג לכל x.'}],
  lines:[`${M('x = ±'+k)}`,M(P(k,k+m)+' , '+P(-k,-k+m))],rule:`${M('x² = a')} ← ±. כל x מציבים ומקבלים y משלו.`,diag:({vals:[v]})=>v===1?'💣 שכחתם את ה־±.':v===4?'y נקבע לפי x: לכל x יש y אחד בלבד.':null};}
/* ===== levels ===== */
const LAD=[
 [{g:gTrick,n:6,h:2},{g:gSqrt,n:4,h:2},{g:gIsolate,n:4,h:1},{g:gCount,n:3,h:1},{g:gTrapPair,n:3,h:0}],
 [{g:gSub,n:7,h:1},{g:gXY,n:7,h:1},{g:gHidden,n:6,h:0}],
 [{g:gSquares,n:7,h:1},{g:gFrac,n:7,h:1},{g:gBack,n:3,h:0},{g:gTrapDen,n:3,h:0}],
 [{g:gSubtr,n:6,h:1},{g:gTrapDiv,n:3,h:0},{g:gTrapPM,n:3,h:0},{g:gSquares,n:2,h:0},{g:gFrac,n:2,h:0},{g:gSub,n:2,h:0},{g:gXY,n:2,h:0}]];
const LEVELS=[
 {n:1,t:'מזהים את הטריק',d:'איזה טריק? ← ± ← מבודדים ← כמה פתרונות',ladder:LAD[0]},
 {n:2,t:'מבודדים · ה־xy נעלם · ריבוע מוסתר',d:'טריקים 1, 2, 3',ladder:LAD[1]},
 {n:3,t:'x² נעלם חדש · שבר הופך לנעלם',d:'טריקים 4, 5 ומוקש המכנה',ladder:LAD[2]},
 {n:4,t:'מחסירים · כל המוקשים',d:'טריק 6, חילוק בנעלם, ± ושאלות מבחן',ladder:LAD[3]}];
LEVELS.forEach(l=>l.g=()=>pick(l.ladder).g());
const TEST=[[gTrick,gSqrt,gIsolate,gCount],[gSub,gXY,gHidden,gTrapPair],[gSquares,gFrac,gBack,gTrapDen],[gSubtr,gTrapDiv,gTrapPM,gTrick]];
const WARM=[gSqrt,gTrick,gIsolate,gCount,gSqrt,gTrick,gTrapPair,gBack];
/* ===== animated explanation: 6 tricks + 5 mines ===== */
const RECAP=[
 {h:'6 טריקים, וזהו!',d:2.6,svg:()=>`<div class="an"><div class="tk">${TR.map((t,i)=>`<div class="rv" style="--d:${.2+i*.35}s">${t}</div>`).join('')}</div></div>`,
  says:['לא פותרים בכוח.','מזהים טריק ← פותרים צ׳יק צ׳ק.'],what:'קודם הטריק, אחר כך החשבון.'},
 {h:'🔁 טריק 1: מבודדים ומציבים',d:3.3,svg:()=>`<div class="an">${L(M('x + y = 7'),.2)}${L(M('x² + y² = 25'),.5)}${L(M('y = 7 − x'),1.1,'hl')}${L(M('x² + (<span class="fly" style="--d:1.9s">7 − x</span>)² = 25'),1.7)}${L(M('x² − 7x + 12 = 0 ← x = 3 , 4'),2.8)}</div>`,
  says:['מבודדים מהמשוואה הקווית.','מציבים בשנייה ← משוואה ריבועית.'],what:'קווית ← מבודדים ← מציבים'},
 {h:'💣 מוקש: זוגות',d:2.8,svg:()=>`<div class="an">${L(M('x = 3 ← y = 7 − 3 = 4'),.3,'v')}${L(M('x = 4 ← y = 7 − 4 = 3'),.9,'v')}${L(M('(3 ; 4) , (4 ; 3)')+' ✓',1.6)}${L('<s>'+M('(3 ; 3)')+'</s> ✗',2.2,'x')}</div>`,
  says:['כל x מקבל y משלו!','מציבים כל x בקווית.'],what:'התשובה: זוגות (x ; y)'},
 {h:'✂️ טריק 2: ה־xy נעלם',d:3.4,svg:()=>`<div class="an">${L(M('(x + 2)(y − 1) = 60'),.2)}${L(M('xy = 60'),.5)}${L(M('<span class="st" style="--d:1.7s">xy</span> − x + 2y − 2 = 60'),1)}${L(M('<b style="color:#ffb020">60</b> − x + 2y − 2 = 60'),2.3)}${L(M('−x + 2y = 2')+' ← קווית! 🎉',3)}</div>`,
  says:['פותחים סוגריים.',`מציבים ${M('xy = 60')} ← ה־xy נעלם!`],what:'נשארת קווית ← טריק 1'},
 {h:'🎁 טריק 3: ריבוע מוסתר',d:2.9,svg:()=>`<div class="an">${L(M('x² + 2xy + y² = 64'),.2)}${L(M('(x + y)² = 64'),1,'hl')}${L(M('x + y = 8'),1.8,'v')}${L(M('x + y = −8'),2.3,'v')}</div>`,
  says:[M('x² + 2xy + y² = (x + y)²'),'שורש ← שני מקרים: 8 או −8.'],what:`${M('(x + y)²')} ← ±`},
 {h:'💣 מוקש: שוכחים ±',d:2.9,svg:()=>`<div class="an">${L(M('x² = 16'),.2)}${L(M('x = 4')+' 💣',.8,'x')}${L(M('(−4)² = 16')+' גם!',1.5)}${L(M('x = 4')+' או '+M('x = −4')+' ✓',2.2,'v')}</div>`,
  says:['גם שלילי בריבוע יוצא חיובי.'],what:M('x² = 16 ← x = ±4')},
 {h:'📦 טריק 4: x² הוא נעלם חדש',d:3.4,svg:()=>`<div class="an">${L(M('x² + y² = 13'),.2)}${L(M('x² − y² = 5'),.5)}${L(M('<span class="bx" style="--d:1.2s">X</span> + <span class="bx" style="--d:1.4s">Y</span> = 13 , X − Y = 5'),1)}${L(M('2X = 18 ← X = 9 , Y = 4'),2.1)}${L(M('x = ±3 , y = ±2')+' ← 4 פתרונות!',2.9,'v')}</div>`,
  says:[`${M('X = x² , Y = y²')} ← מערכת קווית.`,'בסוף ± ← עד 4 פתרונות.'],what:`רק ${M('x² , y²')} ← ${M('X , Y')}`},
 {h:'🔄 טריק 5: שבר הופך לנעלם',d:3.2,svg:()=>`<div class="an">${L(M(FR(16,'x')+' − '+FR(12,'y')+' = 5'),.2)}${L(M(FR(10,'x')+' − '+FR(8,'y')+' = 3'),.5)}${L(M(FR(1,'x')+' = a , '+FR(1,'y')+' = b'),1.1,'hl')}${L(M('16a − 12b = 5 , 10a − 8b = 3'),1.8)}${L(M('a = 0.5 , b = 0.25'),2.6)}</div>`,
  says:['השבר הופך לנעלם חדש.','מקבלים מערכת קווית רגילה.'],what:`נעלם במכנה ← ${M(FR(1,'x')+' = a')}`},
 {h:'💣 מוקש: a זה לא x',d:3,svg:()=>`<div class="an">${L(M('a = 0.5'),.2)}${L(M('x = 0.5')+' 💣',.8,'x')}${L(M('x = 1 : 0.5 = 2')+' ✓',1.5,'v')}${L('ובודקים: אף מכנה לא 0 ✋',2.3)}</div>`,
  says:[`חוזרים: ${M('x = 1 : a')}.`,'מכנה 0 ← פוסלים את הפתרון.'],what:'חוזרים מ־a ל־x ובודקים'},
 {h:'➖ טריק 6: מחסירים משוואות',d:3,svg:()=>`<div class="an">${L(M('x² + y² − 2x = 8'),.2)}${L(M('x² + y² = 10'),.5)}${L('<span class="st" style="--d:1.5s">'+M('x² + y²')+'</span> נעלם ← '+M('−2x = −2'),1)}${L(M('x = 1 ← y² = 9 ← y = ±3'),2.3,'v')}</div>`,
  says:[`אותו ${M('x² + y²')} בשתיהן.`,'מחסירים ← נשארת קווית.'],what:`${M('x² + y²')} כפול ← מחסירים`},
 {h:'💣 מוקש: לא מחלקים בנעלם',d:2.9,svg:()=>`<div class="an">${L(M('xy = 3x'),.2)}${L(M('y = 3')+' 💣 איבדנו פתרון!',.8,'x')}${L(M('xy − 3x = 0'),1.5)}${L(M('x(y − 3) = 0 ← x = 0')+' או '+M('y = 3'),2.2,'v')}</div>`,
  says:['לא מחלקים ב־x!','מוציאים גורם משותף ← שני מקרים.'],what:`${M('x(…) = 0')} ← שני מקרים`}];
/* ===== 📚 פרקים: תרגיל פתור צעד־צעד + למה זה נכון + מוקש + עכשיו אתה + 10 תרגילים ===== */
const O=t=>`<b style="color:#ffb020">${t}</b>`,F=(t,d=.4)=>`<span class="fly" style="--d:${d}s">${t}</span>`,ST=(t,d=.5)=>`<span class="st" style="--d:${d}s">${t}</span>`,BX=(t,d=.4)=>`<span class="bx" style="--d:${d}s">${t}</span>`;
const CHAPTERS=[
 {t:TR[0],d:'קווית + ריבועית',
  ex:{sys:SYS('x + y = 7','x² + y² = 25'),q:'פותרים צעד אחרי צעד:',steps:[
   {l:M('y = 7 − x'),what:'מבודדים את y מהמשוואה הקווית.',why:'במשוואה קווית קל לבודד: מעבירים את x לצד השני. עכשיו y "מתורגם" לביטוי עם x.'},
   {l:M('x² + ('+F('7 − x')+')² = 25'),what:'מציבים את הביטוי במקום y במשוואה הריבועית.',why:'y הוא אותו מספר בשתי המשוואות, אז מותר להחליף אותו בביטוי ששווה לו. נשאר נעלם אחד!'},
   {l:M('x² + '+O('49 − 14x + x²')+' = 25'),what:`פותחים את הריבוע: ${M('(7 − x)² = 49 − 14x + x²')}`,why:`${M('(7 − x)²')} זה ${M('(7 − x)(7 − x)')}. 💣 זה לא ${M('49 − x²')}!`},
   {l:M('2x² − 14x + 24 = 0 ← x² − 7x + 12 = 0'),what:'מסדרים ומחלקים את כל האיברים ב־2.',why:'מחלקים את שני הצדדים באותו מספר ← משוואה שקולה עם מספרים קטנים.'},
   {l:M('(x − 3)(x − 4) = 0 ← x = 3 או x = 4'),what:'פותרים משוואה ריבועית.',why:'מחפשים שני מספרים שמכפלתם 12 וסכומם 7: 3 ו־4.'},
   {l:M('x = 3 ← y = 7 − 3 = 4 , x = 4 ← y = 3'),what:'מציבים כל x במשוואה <b>הקווית</b>.',why:'לכל x יש y משלו. מציבים בקווית, כי שם יש y אחד בלבד.'},
   {l:M(O('(3 ; 4) , (4 ; 3)')),what:'כותבים את הפתרונות כזוגות.',why:`בדיקה: ${M('3² + 4² = 9 + 16 = 25')} ✓`}]},
  mine:{sys:SYS('x + y = 7','x² + y² = 25'),steps:[
   {l:M('x = 3 ← y² = 25 − 9 = 16 ← y = ±4')+' 💣',what:'מישהו הציב את x = 3 במשוואה <b>הריבועית</b>.',why:'בריבועית מקבלים ±, ונוצרים "פתרונות מזויפים".'},
   {l:M(ST('(3 ; −4)',.4))+' ✗ '+M('3 + (−4) = −1 ≠ 7'),what:'הזוג (3 ; −4) לא מקיים את הקווית!',why:'פתרון חייב לקיים <b>את שתי</b> המשוואות.'},
   {l:'✅ תמיד מציבים בחזרה ב<b>קווית</b>',what:'כך לכל x יוצא y אחד, הנכון.',why:'ובסוף בודקים את הזוג בשתי המשוואות.'}]},
  you:gSub,gens:[{g:gIsolate,n:3,h:2},{g:gSub,n:4,h:1},{g:gTrapPair,n:3,h:0}]},
 {t:TR[1],d:M('(x + a)(y + b)')+' ו־'+M('xy'),
  ex:{sys:SYS('(x + 2)(y − 1) = 60','xy = 60'),steps:[
   {l:M('xy − x + 2y − 2 = 60'),what:'פותחים סוגריים: כל איבר כפול כל איבר.',why:`${M('x · y = xy , x · (−1) = −x , 2 · y = 2y , 2 · (−1) = −2')}`},
   {l:M(O(F('60'))+' − x + 2y − 2 = 60'),what:`מציבים ${M('xy = 60')}.`,why:'המשוואה השנייה אומרת ש־xy הוא בדיוק 60, אז מותר להחליף אותו.'},
   {l:M(ST('60',.3)+' − x + 2y − 2 = '+ST('60',.6)+' ← −x + 2y = 2'),what:'60 מתבטל משני הצדדים.',why:'נשארה משוואה <b>קווית</b>! מכאן זה טריק 1.'},
   {l:M('x = 2y − 2'),what:'מבודדים את x.',why:`${M('−x = 2 − 2y')} ← כופלים ב־(−1).`},
   {l:M('('+F('2y − 2')+')y = 60 ← 2y² − 2y − 60 = 0'),what:`מציבים ב־${M('xy = 60')}.`,why:'x הוא אותו מספר בשתי המשוואות, אז מחליפים אותו בביטוי.'},
   {l:M('y² − y − 30 = 0 ← y = 6 או y = −5'),what:'מחלקים ב־2 ופותרים.',why:`${M('6 · (−5) = −30')} , ${M('6 + (−5) = 1')}`},
   {l:M(O('(10 ; 6) , (−12 ; −5)')),what:`${M('x = 2y − 2')} לכל y.`,why:`בדיקה: ${M('10 · 6 = 60')} ✓ , ${M('(−12) · (−5) = 60')} ✓`}]},
  mine:{steps:[
   {l:M('(x + 2)(y − 1) = xy − 1 + 2')+' 💣',what:'פתחו רק "ראשון עם ראשון ואחרון עם אחרון".',why:'בכפל שני סוגריים יש <b>4 מכפלות</b>: כל איבר כפול כל איבר.'},
   {l:M('xy − x + 2y − 2')+' ✓',what:'4 מכפלות, עם הסימנים.',why:'x · (−1) = −x : מינוס נשאר צמוד למספר שלו.'}]},
  you:gXY,gens:[{g:gXY,n:4,h:2},{g:gXY,n:3,h:1},{g:gTrick,n:3,h:0}]},
 {t:TR[2],d:M('x² + 2xy + y²'),
  ex:{sys:SYS('x² + 2xy + y² = 64','2x + 3y = 19'),steps:[
   {l:M(O('x² + 2xy + y²')+' = (x + y)²'),what:'מזהים נוסחת כפל מקוצר.',why:`${M('(x + y)(x + y) = x² + xy + xy + y² = x² + 2xy + y²')}`},
   {l:M('(x + y)² = 64'),what:'כותבים את המשוואה מחדש.',why:'זה אותו ביטוי בדיוק, רק בכתיב אחר.'},
   {l:M('x + y = 8')+' או '+M('x + y = −8'),what:'מוציאים שורש.',why:`גם ${M('8² = 64')} וגם ${M('(−8)² = 64')}. שני מקרים!`},
   {l:M('x + y = 8 , 2x + 3y = 19 ← y = 3 , x = 5'),what:'מקרה 1: מערכת קווית.',why:`כופלים ב־2: ${M('2x + 2y = 16')}, ומחסירים ← ${M('y = 3')}.`},
   {l:M('x + y = −8 , 2x + 3y = 19 ← y = 35 , x = −43'),what:'מקרה 2: אותה דרך.',why:`${M('2x + 2y = −16')} ← מחסירים ← ${M('y = 35')}.`},
   {l:M(O('(5 ; 3) , (−43 ; 35)')),what:'שני מקרים ← שני פתרונות.',why:`בדיקה: ${M('2 · (−43) + 3 · 35 = −86 + 105 = 19')} ✓`}]},
  mine:{steps:[{l:M('(x + y)² = 64 ← x + y = 8')+' 💣',what:'שכחו את המקרה השלילי.',why:'מפסידים את הפתרון (−43 ; 35)!'},{l:M('x + y = ±8')+' ✓',what:'תמיד שני מקרים אחרי שורש.',why:'כל מקרה הוא מערכת קווית קטנה.'}]},
  you:gHidden,gens:[{g:gHidden,n:4,h:1},{g:gSqrt,n:3,h:1},{g:gHidden,n:3,h:0}]},
 {t:TR[3],d:'רק '+M('x²')+' ו־'+M('y²'),
  ex:{sys:SYS('x² + y² = 13','x² − y² = 5'),steps:[
   {l:M(BX('X')+' = x² , '+BX('Y',.7)+' = y²'),what:'מסמנים נעלמים חדשים.',why:'x מופיע רק בתור x² (אין x לבד), אז x² הוא "נעלם אחד שלם".'},
   {l:M('X + Y = 13 , X − Y = 5'),what:'מקבלים מערכת קווית.',why:'אין חזקות! פותרים כמו בכיתה ט.'},
   {l:M('2X = 18 ← X = 9'),what:'מחברים את שתי המשוואות.',why:'Y ו־(−Y) מבטלים זה את זה.'},
   {l:M('Y = 13 − 9 = 4'),what:'מציבים את X.',why:'בוחרים את המשוואה הפשוטה.'},
   {l:M('x² = 9 ← x = ±3 , y² = 4 ← y = ±2'),what:'חוזרים מ־X ל־x.',why:'X הוא x² ← שורש ← שני ערכים.'},
   {l:M(O('(3 ; 2) , (3 ; −2) , (−3 ; 2) , (−3 ; −2)')),what:'כל x עם כל y ← 4 פתרונות.',why:'במשוואות יש רק ריבועים, אז כל צירוף של סימנים עובד.'}]},
  mine:{steps:[{l:M('X = 9 ← x = 9')+' 💣',what:'שכחו לחזור מ־X ל־x.',why:'X הוא x²! צריך שורש: x = ±3.'},{l:M('Y = −4 ← y² = −4')+' ✋',what:'ריבוע לא יכול להיות שלילי.',why:'אם יוצא X או Y שלילי ← אין פתרון במקרה הזה.'}]},
  you:gSquares,gens:[{g:gSquares,n:4,h:1},{g:gCount,n:3,h:1},{g:gSquares,n:3,h:0}]},
 {t:TR[4],d:'נעלם במכנה',
  ex:{sys:SYS(FR(16,'x')+' − '+FR(12,'y')+' = 5',FR(10,'x')+' − '+FR(8,'y')+' = 3'),steps:[
   {l:M(BX(FR(1,'x'))+' = a , '+BX(FR(1,'y'),.7)+' = b'),what:'מסמנים את השברים כנעלמים.',why:`${M(FR(16,'x')+' = 16 · '+FR(1,'x'))}: אותו ${M(FR(1,'x'))} חוזר בשתי המשוואות.`},
   {l:M('16a − 12b = 5 , 10a − 8b = 3'),what:'מקבלים מערכת קווית.',why:'בלי מכנים עם נעלם!'},
   {l:M('32a − 24b = 10 , 30a − 24b = 9'),what:'כופלים ב־2 וב־3.',why:'משווים את המקדמים של b כדי לבטל אותו.'},
   {l:M('2a = 1 ← a = 0.5'),what:'מחסירים.',why:'−24b מתבטל.'},
   {l:M('10 · 0.5 − 8b = 3 ← b = 0.25'),what:'מציבים את a.',why:`${M('5 − 8b = 3 ← 8b = 2')}`},
   {l:M('x = 1 : 0.5 = 2 , y = 1 : 0.25 = 4'),what:'💣 חוזרים מ־a ל־x!',why:`${M('a = '+FR(1,'x'))} ← ${M('x = '+FR(1,'a'))}`},
   {l:M(O('(2 ; 4)')),what:'בודקים.',why:`${M(FR(16,2)+' − '+FR(12,4)+' = 8 − 3 = 5')} ✓ , ואף מכנה לא 0 ✓`}]},
  mine:{steps:[{l:M('a = 0.5 ← x = 0.5')+' 💣',what:'עצרו ב־a.',why:'a הוא 1/x, לא x!'},{l:M(FR(6,'x − 2'))+' , '+M('x = 2')+' ✋',what:'פתרון שנותן מכנה 0.',why:'אסור לחלק ב־0 ← פוסלים אותו.'}]},
  you:gFrac,gens:[{g:gBack,n:3,h:2},{g:gFrac,n:4,h:1},{g:gTrapDen,n:3,h:0}]},
 {t:TR[5],d:M('x² + y²')+' בשתי המשוואות',
  ex:{sys:SYS('x² + y² − 2x = 8','x² + y² = 10'),steps:[
   {l:M('(x² + y² − 2x) − (x² + y²) = 8 − 10'),what:'מחסירים: העליונה פחות התחתונה.',why:'מחסירים שוויון משוויון ← מקבלים שוויון. כמו להוריד אותו משקל משתי כפות מאזניים.'},
   {l:M(ST('x² + y²',.4)+' − 2x − '+ST('(x² + y²)',.7)+' = −2'),what:'x² + y² מתבטל!',why:'אותו ביטוי בדיוק, פעם פלוס ופעם מינוס.'},
   {l:M('−2x = −2 ← x = 1'),what:'משוואה קווית פשוטה.',why:'מחלקים ב־(−2): מינוס חלקי מינוס = פלוס.'},
   {l:M('1² + y² = 10 ← y² = 9 ← y = ±3'),what:'מציבים x = 1 בתחתונה.',why:'בוחרים את המשוואה הקצרה. שורש ← ±.'},
   {l:M(O('(1 ; 3) , (1 ; −3)')),what:'שני פתרונות.',why:`בדיקה: ${M('1 + 9 − 2 = 8')} ✓`}]},
  mine:{steps:[{l:M('xy = 3x ← y = 3')+' 💣',what:'חילקו בנעלם x.',why:'אם x = 0 – אסור לחלק, ואיבדנו פתרון!'},{l:M('x(y − 3) = 0 ← x = 0')+' או '+M('y = 3')+' ✓',what:'מעבירים אגף ומוציאים גורם משותף.',why:'מכפלה = 0 ← אחד הגורמים 0 ← שני מקרים.'}]},
  you:gSubtr,gens:[{g:gSubtr,n:5,h:1},{g:gTrapDiv,n:3,h:0},{g:gTrapPM,n:2,h:0}]}];
