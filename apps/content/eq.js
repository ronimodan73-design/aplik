/*META {"id":"eq","title":"משוואות עם נעלם אחד · ערכה: רוני מודן","short":"משוואות","topic":"משוואות עם נעלם אחד","glyph":"x=?","color":"#5ec8ff"} */
const APP={key:'eq',topic:'משוואות עם נעלם אחד',sub:'מאזניים, פעולות הפוכות, x בשני הצדדים וסוגריים. צעד אחרי צעד, בצבעים.',
 rc:{'צעד אחד':2,'האם זה פתרון?':6,'שני צעדים':3,'x בשני הצדדים':4,'סוגריים':5,'סוגריים ו־x בשני הצדדים':5,'מינוס לפני סוגריים':5,'חשבתי על מספר':3,'מוצאים את הטעות':7,'משוואה עם שברים':3,'היקף מלבן':3}};
const N=v=>v<0?'−'+(-v):''+v;
const fx=a=>a===1?'x':a===-1?'−x':N(a)+'x';
const lin=(a,b)=>{let s=a?fx(a):'';if(b)s+=a?(b<0?' − '+(-b):' + '+b):N(b);return s||'0';};
const FRh=(a,b)=>`<span class="fr"><span>${a}</span><span>${b}</span></span>`;
const opS=b=>b<0?'+ '+(-b):'− '+b;           // operation that cancels "+b"
const gcdE=(a,b)=>b?gcdE(b,a%b):Math.abs(a);
const ECSS=`<style>.eqs{direction:ltr;display:grid;grid-template-columns:auto auto auto;gap:6px 14px;justify-content:center;align-items:center;font-family:Rubik;font-weight:800;font-size:28px}.eqs .l{text-align:right}.eqs .r{text-align:left}.eqs .op{color:#c084fc;font-size:20px;text-align:center}.eqs .nt{grid-column:1/-1;direction:rtl;text-align:center;font:600 16px Heebo;color:#9fb3cc}.eqs .fin{color:#4fd18b}</style>`;
function cz(s){s=''+s;if(s.startsWith('<'))return s;return s.split(' ').map(t=>/x/.test(t)?`<span style="color:${BL}">${t}</span>`:/\d/.test(t)?`<span style="color:${OR}">${t}</span>`:`<span style="color:#dfe8f5">${t}</span>`).join(' ');}
function eqHtml(st,o={}){const A=o.anim?'rv':'';let h=ECSS+'<div class="eqs">';
 st.forEach((s,i)=>{const d=i*.9,last=i===st.length-1&&o.anim;
  h+=`<span class="l ${A}" style="--d:${d}s">${last?`<span class="fin">${s.L}</span>`:cz(s.L)}</span><span class="${A}" style="--d:${d}s;color:#dfe8f5">=</span><span class="r ${A}" style="--d:${d}s">${last?`<span class="fin">${s.R}</span>`:cz(s.R)}</span>`;
  if(s.op)h+=`<span class="op ${A}" style="--d:${d+.45}s">${s.op}</span><span></span><span class="op ${A}" style="--d:${d+.45}s">${s.op}</span>`;
  if(s.nt)h+=`<span class="nt ${A}" style="--d:${d+.45}s">${s.nt}</span>`;});
 return h+'</div>';}

/* "איפה טעיתי?": שלבי הפתרון מתוך שלבי המאזניים */
function WK(st){const num=r=>{const t=String(r).replace(/[−–]/g,'-').trim();return /^-?\d+(\.\d+)?$/.test(t)?+t:null;},out=[];
 for(let k=1;k<st.length;k++){const a=st[k-1],b=st[k],v=num(b.R);if(v==null||String(a.R)===String(b.R))continue;
  const act=a.op?`עושים ${M(a.op)} בשני הצדדים`:(a.nt||'מסדרים');
  const why=a.nt?a.nt+'. בדקו כל איבר ואת הסימן שלו.':/^:/.test(a.op||'')?'מחלקים את <b>שני</b> הצדדים. בחילוק: סימנים שווים ← פלוס, סימנים שונים ← מינוס.':/^·/.test(a.op||'')?'כופלים את <b>שני</b> הצדדים באותו מספר.':'מה שעושים בצד אחד, עושים <b>גם</b> בצד השני. בדקו את החשבון ואת הסימן.';
  out.push({t:`${M(a.L+' = '+a.R)}<br>${act}:  ${M(b.L+' = ?')}`,ans:[{label:'',val:v}],why});}
 return out.length?out:undefined;}
const D=st=>h=>h?eqHtml(st,{anim:true}):eqHtml([{L:st[0].L,R:st[0].R}]);
/* balance scale */
function bal(L,R,o={}){const tilt=o.tilt||0;return `<svg viewBox="0 0 400 190" style="max-width:380px"><polygon points="200,92 176,176 224,176" fill="#2b4466"/><g transform="rotate(${tilt} 200 92)"><line x1="50" y1="92" x2="350" y2="92" stroke="#dfe8f5" stroke-width="6" stroke-linecap="round"/>
 <line x1="80" y1="92" x2="80" y2="112" stroke="#9fb3cc" stroke-width="2"/><line x1="320" y1="92" x2="320" y2="112" stroke="#9fb3cc" stroke-width="2"/>
 <rect x="18" y="112" width="124" height="44" rx="10" fill="#1c3352" stroke="${BL}" stroke-width="2"/><rect x="258" y="112" width="124" height="44" rx="10" fill="#1c3352" stroke="${OR}" stroke-width="2"/>
 <text x="80" y="143" text-anchor="middle" font-size="24" font-weight="800" fill="${BL}" style="font-family:Rubik">${L}</text><text x="320" y="143" text-anchor="middle" font-size="24" font-weight="800" fill="${OR}" style="font-family:Rubik">${R}</text></g>${o.extra||''}</svg>`;}
const chk=(expr,val,res)=>`בדיקה: ${M(expr.replace(/(\d)x/g,'$1 · x').replace(/−x/g,'−1 · x').replace(/x/g,val<0?'('+N(val)+')':''+val)+' = '+res)} <span class="v">✓</span>`;
/* ★ one step */
function g1(t){t=t||pick(['add','sub','mul','div']);let L,Rv,x0,a,op,line,diag;
 if(t==='add'){a=R(2,15);x0=R(1,12);L='x + '+a;Rv=x0+a;op='− '+a;line=`מבטלים את ${M('+ '+a)}: <b>מחסירים</b> ${M(a)} משני הצדדים.`;diag=v=>v===Rv+a?'<b>חיברתם</b>. הפעולה ההפוכה לחיבור היא <b>חיסור</b>.':null;}
 if(t==='sub'){a=R(2,12);x0=R(a+1,a+15);L='x − '+a;Rv=x0-a;op='+ '+a;line=`מבטלים את ${M('− '+a)}: <b>מוסיפים</b> ${M(a)} לשני הצדדים.`;diag=v=>v===Rv-a?'<b>חיסרתם</b>. הפעולה ההפוכה לחיסור היא <b>חיבור</b>.':null;}
 if(t==='mul'){a=R(2,9);x0=R(1,12);L=a+'x';Rv=a*x0;op=': '+a;line=`${M(a+'x')} זה ${M(a+' · x')}. מבטלים את הכפל: <b>מחלקים</b> ב־${M(a)}.`;diag=v=>v===Rv-a?'<b>חיסרתם</b>. בין '+M(a)+' ל־x יש <b>כפל</b> ← מחלקים.':v===Rv*a?'<b>כפלתם</b>. ההפך מכפל הוא <b>חילוק</b>.':null;}
 if(t==='div'){a=R(2,6);const k=R(1,9);x0=a*k;L=FRh('x',a);Rv=k;op='· '+a;line=`x מחולק ב־${M(a)}. מבטלים את החילוק: <b>כופלים</b> ב־${M(a)}.`;diag=v=>v===k/a||v===k-a?'ההפך מחילוק הוא <b>כפל</b>: '+M(k+' · '+a)+'.':null;}
 const st=[{L,R:''+Rv,op},{L:'x',R:''+x0}];
 return {kind:'צעד אחד',dia:D(st),work:WK(st),text:'מצאו את x.',ans:[{label:'x =',col:PU,val:x0}],lines:[line,`${M('x = '+x0)}`],rule:'פעולה הפוכה: חיבור ↔ חיסור, כפל ↔ חילוק. מה שעושים בצד אחד עושים גם בשני.',diag:({vals:[v]})=>diag(v)};}
function gCheck(){const a=R(2,6),b=R(1,12),x0=R(1,9),c=a*x0+b,k=Math.random()<.5?x0:x0+pick([1,-1]),ok=k===x0,lv=a*k+b;
 return {kind:'האם זה פתרון?',dia:D([{L:lin(a,b),R:''+c}]),text:`האם ${M('x = '+k)} הוא פתרון של המשוואה?`,choice:[`כן, כי ${M(a+' · '+k+' + '+b+' = '+c)}`,`לא, כי ${M(a+' · '+k+' + '+b+' = '+lv)} ולא ${M(c)}`],correct:ok?0:1,
  lines:[`מציבים ${M('x = '+k)}: ${M(a+' · '+k+' + '+b+' = '+lv)}`,ok?`${M(lv+' = '+c)} ← <b>כן</b>, פתרון.`:`${M(lv+' ≠ '+c)} ← <b>לא</b> פתרון.`],rule:'פתרון = מספר שאחרי ההצבה שני הצדדים שווים.',diag:()=>'הציבו את המספר במקום x וחשבו את הצד השמאלי.'};}
/* ★★ two steps */
function g2(t){t=t==null?R(0,3):t;const a=R(2,6);let x0=R(1,10),b=R(1,15),L,c,st,l1;
 if(t===3){const k=R(1,8);x0=a*k;c=k+b;L=FRh('x',a)+' + '+b;st=[{L,R:''+c,op:'− '+b},{L:FRh('x',a),R:''+k,op:'· '+a},{L:'x',R:''+x0}];l1=`מחסירים ${M(b)}, ואז כופלים ב־${M(a)}.`;}
 else{if(t===1){x0=R(Math.ceil((b+1)/a),12);}c=t===1?a*x0-b:a*x0+b;L=t===0?lin(a,b):t===1?lin(a,-b):b+' + '+a+'x';const bb=t===1?-b:b;
  st=[{L,R:''+c,op:opS(bb)},{L:a+'x',R:''+(c-bb),op:': '+a},{L:'x',R:''+x0}];l1=`קודם מבטלים את ${M((bb<0?'− ':'+ ')+Math.abs(bb))}, ואז מחלקים ב־${M(a)}.`;}
 return {kind:'שני צעדים',dia:D(st),work:WK(st),text:'מצאו את x.',ans:[{label:'x =',col:PU,val:x0}],lines:[l1,`${M('x = '+x0)}`],rule:'שני צעדים: קודם מבטלים חיבור/חיסור, אחר כך כפל/חילוק.',
  diag:({vals:[v]})=>t<3&&v===a*x0?'שכחתם את הצעד השני: <b>לחלק</b> ב־'+M(a)+'.':t<3&&v===c/a-b?'קודם מבטלים את החיבור/החיסור, <b>ואחר כך</b> מחלקים.':t===0&&v===(c+b)/a?'מבטלים '+M('+ '+b)+' בחיסור, לא בחיבור.':null};}
/* ★★★ */
function g3both(){const a=R(3,8),c=R(1,a-1),x0=pick([R(1,10),-R(1,4)]),b=R(-9,12)||5,d=(a-c)*x0+b,k=a-c;
 const st=[{L:lin(a,b),R:lin(c,d),op:'− '+fx(c)},{L:lin(k,b),R:''+d,op:opS(b)},{L:fx(k),R:''+(d-b),op:k===1?'':': '+k},...(k===1?[]:[{L:'x',R:N(x0)}])];
 return {kind:'x בשני הצדדים',dia:D(st),work:WK(st),text:'מצאו את x. (רמז: מעבירים את כל ה־x לצד אחד)',ans:[{label:'x =',col:PU,val:x0,neg:true}],
  lines:[`מחסירים ${M(fx(c))} משני הצדדים ← ה־x רק בצד שמאל.`,`מבטלים את המספר, ואז מחלקים.`,chk(lin(a,b),x0,a*x0+b)+' וגם '+M(c+' · ('+N(x0)+') '+(d<0?'− '+(-d):'+ '+d)+' = '+(a*x0+b))],rule:'x בשני הצדדים: מעבירים את כל ה־x לצד אחד (פעולה הפוכה), ואת המספרים לצד השני.',
  diag:({vals:[v]})=>Math.abs(v-(d+b)/k)<1e-9?'כשמעבירים מספר לצד השני, <b>הסימן מתהפך</b>.':Math.abs(v-(d-b)/(a+c))<1e-9?'כשמעבירים '+M(fx(c))+' לצד השני, <b>מחסירים</b> אותו (לא מוסיפים).':null};}
function g3dist(){const m=R(2,6),b=pick([1,-1])*R(1,8),x0=R(-3,10)||4,c=m*(x0+b),mb=m*b;
 const st=[{L:m+'('+lin(1,b)+')',R:''+c,nt:'פותחים סוגריים: קשת לכל איבר'},{L:lin(m,mb),R:''+c,op:opS(mb)},{L:m+'x',R:''+(c-mb),op:': '+m},{L:'x',R:N(x0)}];
 return {kind:'סוגריים',dia:D(st),work:WK(st),text:'מצאו את x.',ans:[{label:'x =',col:PU,val:x0,neg:true}],lines:[`פותחים סוגריים: ${M(m+' · x = '+m+'x')} ו־${M(m+' · '+(b<0?'('+N(b)+')':b)+' = '+N(mb))}`,`ואז פותרים כמו משוואה בשני צעדים.`],rule:'קודם פותחים סוגריים (קשת לכל איבר), ואז פותרים.',
  diag:({vals:[v]})=>Math.abs(v-(c-b)/m)<1e-9?'פתחתם רק קשת אחת: גם '+M(N(b))+' מקבל כפל ב־'+M(m)+'.':null};}
function g3distBoth(){const m=R(3,6),c=R(1,m-1),b=R(1,6),x0=R(1,9),k=m-c,d=k*x0+m*b;
 const st=[{L:m+'('+lin(1,b)+')',R:lin(c,d),nt:'פותחים סוגריים'},{L:lin(m,m*b),R:lin(c,d),op:'− '+fx(c)},{L:lin(k,m*b),R:''+d,op:'− '+m*b},{L:fx(k),R:''+(d-m*b),op:k===1?'':': '+k},...(k===1?[]:[{L:'x',R:''+x0}])];
 return {kind:'סוגריים ו־x בשני הצדדים',dia:D(st),work:WK(st),text:'מצאו את x.',ans:[{label:'x =',col:PU,val:x0,neg:true}],lines:['1. פותחים סוגריים. 2. מעבירים x לצד אחד. 3. מבטלים מספר. 4. מחלקים.',chk(m+'(x + '+b+')',x0,m*(x0+b))],rule:'סדר קבוע: סוגריים ← x לצד אחד ← מספרים לצד השני ← מחלקים.',
  diag:({vals:[v]})=>Math.abs(v-(d-b)/k)<1e-9?'פתחתם רק קשת אחת: גם '+M(b)+' מקבל כפל ב־'+M(m)+'.':null};}
function g3minus(){const b=R(1,8),x0=R(1,9),c=R(b+x0+1,b+x0+15),d=c-x0-b,cb=c-b;
 const st=[{L:c+' − (x + '+b+')',R:''+d,nt:'מינוס לפני סוגריים: כל איבר מחליף סימן'},{L:c+' − x − '+b,R:''+d},{L:cb+' − x',R:''+d,op:'− '+cb},{L:'−x',R:N(d-cb),op:': (−1)'},{L:'x',R:''+x0}];
 return {kind:'מינוס לפני סוגריים',dia:D(st),work:WK(st),text:'מצאו את x.',ans:[{label:'x =',col:PU,val:x0,neg:true}],lines:[`${M('−(x + '+b+') = −x − '+b)}`,`${M(c+' − '+b+' = '+cb)}`,`${M('−x = '+N(d-cb))} ← ${M('x = '+x0)}`],rule:`מינוס לפני סוגריים: כל איבר בפנים מחליף סימן. ואם יוצא ${M('−x = 5')} ← ${M('x = −5')}.`,
  diag:({vals:[v]})=>v===-x0?'הגעתם ל־'+M('−x = '+N(d-cb))+'? מחלקים ב־‎(−1): '+M('x = '+x0)+'.':v===c-d+b?'המינוס הופך <b>גם</b> את '+M(b)+'.':null};}
/* ★★★★ */
function gThink(){const a=R(2,6),b=R(1,12),x0=R(2,12),two=Math.random()<.5;const c=two?a*(x0+b):a*x0+b;
 const txt=two?`הוספתי לו ${M(b)}, ואת התוצאה כפלתי ב־${M(a)}`:`כפלתי אותו ב־${M(a)} והוספתי ${M(b)}`;const eq=two?a+'(x + '+b+')':lin(a,b);
 return {kind:'חשבתי על מספר',dia:h=>h?eqHtml(two?[{L:eq,R:''+c,op:': '+a},{L:'x + '+b,R:''+(x0+b),op:'− '+b},{L:'x',R:''+x0}]:[{L:eq,R:''+c,op:'− '+b},{L:a+'x',R:''+(c-b),op:': '+a},{L:'x',R:''+x0}],{anim:true}):'',
  text:`חשבתי על מספר. ${txt}, וקיבלתי ${M(c)}. על איזה מספר חשבתי?`,ans:[{label:'המספר',col:PU,val:x0}],lines:[`המספר = x. המשוואה: ${M(eq+' = '+c)}`,`${M('x = '+x0)}`],rule:'מתרגמים את הסיפור למשוואה: "המספר" = x, "כפלתי" = ·, "הוספתי" = +.',
  diag:({vals:[v]})=>!two&&v===(c+b)/a?'"הוספתי" ← כדי לבטל, <b>מחסירים</b>.':two&&v===c/a+b?'"הוספתי" ← כדי לבטל, <b>מחסירים</b>.':null};}
function gErrEq(){const a=R(2,6),k=pick([0,1,2]),b=k===0?a*R(1,3):R(2,12),x0=R(1,9),c=a*x0+b;
 const s1=k===0?`${a}x = ${c+b}`:`${a}x = ${c-b}`,v1=k===0?c+b:c-b,s2=k===1?`x = ${v1*a}`:`x = ${v1/a}`;
 const show=`<div style="direction:ltr;text-align:center;font:800 22px Rubik;line-height:1.7">${lin(a,b)} = ${c}<br><span style="color:${BL}">שלב 1:</span> ${s1}<br><span style="color:${OR}">שלב 2:</span> ${s2}</div>`;
 return {kind:'מוצאים את הטעות',dia:()=>show,text:'תלמיד פתר את המשוואה. איפה הטעות?',choice:['בשלב 1: הסימן לא התהפך','בשלב 2: כפל במקום לחלק','אין טעות'],correct:k,
  lines:[`נכון: ${M(a+'x = '+(c-b))} ← ${M('x = '+x0)}`,chk(lin(a,b),x0,c)],rule:'מעבירים צד ← פעולה הפוכה. בודקים בהצבה!',diag:()=>'בדקו כל שלב: האם עשו את <b>הפעולה ההפוכה</b>?'};}
function gFracEq(){const [a,b]=pick([[2,3],[2,4],[3,6],[2,5],[3,4],[2,6]]),L=a*b/gcdE(a,b),k=R(1,4),x0=L*k,c=x0/a+x0/b,p=L/a,q=L/b;
 const st=[{L:FRh('x',a)+' + '+FRh('x',b),R:''+c,op:'· '+L},{L:p+'x + '+q+'x',R:''+c*L},{L:(p+q)+'x',R:''+c*L,op:': '+(p+q)},{L:'x',R:''+x0}];
 return {kind:'משוואה עם שברים',dia:D(st),work:WK(st),text:'מצאו את x. (רמז: כופלים את שני הצדדים במכנה המשותף)',ans:[{label:'x =',col:PU,val:x0}],lines:[`המכנה המשותף: ${M(L)}. כופלים <b>כל איבר</b> ב־${M(L)}.`,`${M(p+'x + '+q+'x = '+c*L)} ← ${M((p+q)+'x = '+c*L)} ← ${M('x = '+x0)}`],rule:'שברים במשוואה: כופלים את <b>כל</b> האיברים במכנה המשותף, והשברים נעלמים.',
  diag:({vals:[v]})=>v===c*L?'שכחתם לכפול גם את הצד השמאלי, או לחלק בסוף.':null};}
function gPerim(){const x0=R(2,12),a=R(1,8),P=4*x0+2*a;const sv=`<svg viewBox="0 0 400 170" style="max-width:360px"><rect x="90" y="30" width="220" height="100" fill="#5ec8ff22" stroke="${BL}" stroke-width="3"/><text x="200" y="22" text-anchor="middle" font-size="22" font-weight="800" fill="${OR}" style="font-family:Rubik">x + ${a}</text><text x="78" y="88" text-anchor="end" font-size="22" font-weight="800" fill="${BL}" style="font-family:Rubik">x</text></svg>`;
 return {kind:'היקף מלבן',dia:h=>h?sv+eqHtml([{L:'2x + 2(x + '+a+')',R:''+P,nt:'פותחים סוגריים'},{L:'4x + '+2*a,R:''+P,op:'− '+2*a},{L:'4x',R:''+(4*x0),op:': 4'},{L:'x',R:''+x0}],{anim:true}):sv,
  text:`היקף המלבן ${M(P)} ס״מ. מצאו את x.`,ans:[{label:'x =',col:PU,val:x0}],lines:[`היקף = כל הצלעות: ${M('2x + 2(x + '+a+') = '+P)}`,`${M('4x + '+2*a+' = '+P)} ← ${M('x = '+x0)}`],rule:'היקף = סכום כל הצלעות. בונים משוואה ופותרים.',
  diag:({vals:[v]})=>v===(P-a)/2?'למלבן <b>4</b> צלעות: 2 של x ו־2 של x + '+a+'.':null};}
/* ===== levels ===== */
const LEVELS=[
 {n:1,t:'צעד אחד',d:'פעולה הפוכה, בדיקת פתרון',g:()=>Math.random()<.8?g1():gCheck()},
 {n:2,t:'שני צעדים',d:'מבטלים, ואז מחלקים',g:()=>g2()},
 {n:3,t:'x בשני הצדדים וסוגריים',d:'מעבירים, פותחים סוגריים',g:()=>pick([g3both,g3dist,g3distBoth,g3minus])()},
 {n:4,t:'חשיבה ואוריינות',d:'סיפור למשוואה, טעויות, שברים, היקף',g:()=>pick([gThink,gErrEq,gFracEq,gPerim])()}];
const TEST=[[()=>g1('add'),()=>g1('mul'),()=>g1(pick(['sub','div'])),gCheck],[()=>g2(0),()=>g2(1),()=>g2(2),()=>g2(3)],[g3both,g3dist,g3distBoth,g3minus],[gThink,gErrEq,gFracEq,gPerim]];
const WARM=[()=>g1('add'),()=>g1('sub'),()=>g1('mul'),()=>g1('add'),gCheck,()=>g1('mul'),()=>g1('div'),()=>g2(0)];
/* ===== animated explanation ===== */
const RECAP=[
 {h:'מה זה משוואה?',d:1,svg:()=>bal('x + 3','8'),says:['משוואה היא כמו <b>מאזניים במשקל</b>: שני הצדדים שווים.',`x הוא המספר החסר. כמה זה x?`],def:'<b>משוואה:</b> שוויון עם נעלם (x). <b>פתרון:</b> המספר שהופך את השוויון לנכון.',what:'צד שמאל = צד ימין. מחפשים את x.'},
 {h:'מה שעושים בצד אחד...',d:2.2,svg:()=>'<div style="display:flex;flex-direction:column;align-items:center;width:100%">'+bal('x + 3','8',{extra:`<g class="rv" style="--d:.6s"><text x="80" y="185" text-anchor="middle" font-size="20" font-weight="800" fill="${PU}" style="font-family:Rubik">− 3</text><text x="320" y="185" text-anchor="middle" font-size="20" font-weight="800" fill="${PU}" style="font-family:Rubik">− 3</text></g>`})+`<div class="rv" style="--d:1.6s;width:100%;display:flex;justify-content:center">${bal('x','5')}</div></div>`,
  says:[`מורידים ${M('3')} <b>משני הצדדים</b>, והמאזניים נשארים במשקל.`,`${M('x = 5')} <span class="v">✓</span>`],what:'מה שעושים בצד אחד, עושים <b>גם בצד השני</b>.'},
 {h:'פעולות הפוכות',d:.4,says:[`${M('+')} ↔ ${M('−')}: ההפך מחיבור הוא חיסור.`,`${M('·')} ↔ ${M(':')}: ההפך מכפל הוא חילוק.`,`${M('3x')} זה ${M('3 · x')} ← מחלקים ב־3.`],what:'מבטלים כל פעולה עם <b>הפעולה ההפוכה</b> לה.'},
 {h:'שני צעדים',d:3.4,svg:()=>eqHtml([{L:'3x + 5',R:'20',op:'− 5'},{L:'3x',R:'15',op:': 3'},{L:'x',R:'5'}],{anim:true}),says:['קודם מבטלים את החיבור, ואחר כך את הכפל.',`בדיקה: ${M('3 · 5 + 5 = 20')} <span class="v">✓</span>`],what:'<b>חיבור/חיסור קודם</b>, ואז כפל/חילוק.'},
 {h:'x בשני הצדדים',d:3.8,svg:()=>eqHtml([{L:'5x + 2',R:'3x + 10',op:'− 3x'},{L:'2x + 2',R:'10',op:'− 2'},{L:'2x',R:'8',op:': 2'},{L:'x',R:'4'}],{anim:true}),says:['מעבירים את כל ה־x <b>לצד אחד</b> (מחסירים 3x).','ואז פותרים כרגיל.'],what:'x לצד אחד, מספרים לצד השני.'},
 {h:'עם סוגריים',d:3.8,svg:()=>eqHtml([{L:'3(x + 2)',R:'21',nt:'פותחים סוגריים: קשת לכל איבר'},{L:'3x + 6',R:'21',op:'− 6'},{L:'3x',R:'15',op:': 3'},{L:'x',R:'5'}],{anim:true}),says:[`${M('3 · x = 3x')} ו־${M('3 · 2 = 6')}`,'ואז שני צעדים רגילים.'],what:'קודם <b>פותחים סוגריים</b> (חוק הפילוג), ואז פותרים.'},
 {h:'תמיד בודקים',d:.4,says:[`פתרנו: ${M('x = 5')} במשוואה ${M('3x + 5 = 20')}.`,`מציבים: ${M('3 · 5 + 5 = 15 + 5 = 20')} <span class="v">✓</span>`,'שני הצדדים שווים ← הפתרון נכון!'],what:'מציבים את x במשוואה המקורית. <b>שווה? צדקנו.</b>'},
 {h:'הטעות הנפוצה',d:.4,says:[`${M('3x + 5 = 20')} ← מישהו כתב ${M('3x = 25')} <span class="x">✗</span>`,`ה־${M('+ 5')} עבר צד בלי להתהפך!`,`נכון: ${M('3x = 20 − 5 = 15')} <span class="v">✓</span>`],what:'מעבירים צד ← <b>הפעולה מתהפכת</b>.'}];

/* בדיקת הבנה אחרי הסבר */
RECAP[0].chk=[gCheck];RECAP[1].chk=[()=>g1('add'),()=>g1('sub')];
