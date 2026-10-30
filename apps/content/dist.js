/*META {"id":"dist","title":"חוק הפילוג · ערכה: רוני מודן","short":"פילוג","topic":"חוק הפילוג","glyph":"a(b+c)","color":"#ff7a8a"} */
const APP={key:'dist',topic:'חוק הפילוג',sub:'פותחים סוגריים עם קשתות וצבעים: כל איבר בתוך הסוגריים מקבל כפל.',rc:{'פותחים סוגריים':2,'חשבון בראש עם פילוג':0,'כותבים את התשובה':2,'כופל שלילי':4,'מינוס לפני סוגריים':5,'פותחים וכונסים':6,'מוצאים את הטעות':7,'משוואה עם סוגריים':2,'שטח מלבן':1,'פילוג הפוך':1,'כופל x':2}};
const INK='#dfe8f5';
const N=v=>v<0?'−'+(-v):''+v;
const NP=v=>v<0?'('+N(v)+')':''+v;
const fX=a=>a===1?'x':a===-1?'−x':N(a)+'x';
const poly=(a,b)=>{let s=a?fX(a):'';if(b)s+=a?(b<0?' − '+(-b):' + '+b):N(b);return s||'0';};
const mT=m=>m===-1?'−':N(m);
/* expression m(ax + b) with red multiplier and arcs to every term */
function eSvg(m,a,b,o={}){const fs=38,cw=fs*.6,sp=fs*.34,y0=o.arcs===false?52:108;let x=16;
 const T=[{t:mT(m),c:RD,k:'m'},{t:'(',c:INK},{t:fX(a),c:BL,k:1},{t:b<0?'−':'+',c:INK,s:1},{t:''+Math.abs(b),c:OR,k:2},{t:')',c:INK}];
 if(o.tail)o.tail.forEach(t=>T.push({...t,s:t.s}));
 T.forEach(k=>{if(k.s)x+=sp;k.x=x;k.w=[...k.t].length*cw;k.cx=x+k.w/2;x+=k.w;if(k.s)x+=sp;});
 let W=x+16,g='',R2='';const A=o.anim?'drawl':'';
 if(o.arcs!==false){const mk=T[0];[T[2],T[4]].forEach((t,i)=>{const top=y0-fs*.78,dx=t.cx-mk.cx,cy=top-34-dx*.12;
  g+=`<path class="${A}" style="--d:${(o.d||0)+i*.6}s" d="M${f(mk.cx)} ${f(top)} Q${f((mk.cx+t.cx)/2)} ${f(cy)} ${f(t.cx)} ${f(top)}" fill="none" stroke="${RD}" stroke-width="3.5" stroke-linecap="round" marker-end="url(#ah)"/>`;});}
 g+=T.map(k=>`<text x="${f(k.x)}" y="${y0}" font-size="${fs}" font-weight="800" fill="${k.c}" style="font-family:Rubik">${k.t}</text>`).join('');
 let Hh=y0+18;
 if(o.res){const r=o.res,y1=y0+58;let x2=T[1].x;const R=[{t:'=',c:INK,s:1},{t:fX(r[0]),c:BL},{t:r[1]<0?'−':'+',c:INK,s:1},{t:''+Math.abs(r[1]),c:OR}];
  R.forEach(k=>{if(k.s)x2+=sp;k.x=x2;x2+=[...k.t].length*cw;if(k.s)x2+=sp;});W=Math.max(W,x2+16);Hh=y1+18;
  R2=`<g class="${o.anim?'rv':''}" style="--d:${(o.d||0)+1.4}s">${R.map(k=>`<text x="${f(k.x)}" y="${y1}" font-size="${fs}" font-weight="800" fill="${k.c}" style="font-family:Rubik">${k.t}</text>`).join('')}</g>`;}
 return `<svg viewBox="0 0 ${f(W)} ${Hh}" style="max-width:${Math.min(400,W*1.1)}px"><defs><marker id="ah" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10z" fill="${RD}"/></marker></defs>${g}${R2}</svg>`;}
/* area model: rectangle m by (x + b) */
function rSvg(m,b,o={}){const H0=40,h=Math.min(150,30+m*16),wx=170,wb=Math.min(150,24+b*12),X=56,Y=H0,d=o.d||0,cl=o.anim?'rv':'';
 return `<svg viewBox="0 0 ${X+wx+wb+20} ${Y+h+20}" style="max-width:400px">
 <rect x="${X}" y="${Y}" width="${wx}" height="${h}" fill="${BL}" fill-opacity=".28" stroke="${BL}" stroke-width="3"/>
 <rect x="${X+wx}" y="${Y}" width="${wb}" height="${h}" fill="${OR}" fill-opacity=".28" stroke="${OR}" stroke-width="3"/>
 <text x="${X+wx/2}" y="${Y-12}" text-anchor="middle" font-size="26" font-weight="800" fill="${BL}" style="font-family:Rubik">x</text>
 <text x="${X+wx+wb/2}" y="${Y-12}" text-anchor="middle" font-size="26" font-weight="800" fill="${OR}" style="font-family:Rubik">${b}</text>
 <text x="${X-14}" y="${Y+h/2+9}" text-anchor="end" font-size="28" font-weight="800" fill="${RD}" style="font-family:Rubik">${m}</text>
 <text class="${cl}" style="--d:${d}s;font-family:Rubik" x="${X+wx/2}" y="${Y+h/2+10}" text-anchor="middle" font-size="28" font-weight="800" fill="${BL}">${o.hide?'?':m+'x'}</text>
 <text class="${cl}" style="--d:${d+.6}s;font-family:Rubik" x="${X+wx+wb/2}" y="${Y+h/2+10}" text-anchor="middle" font-size="26" font-weight="800" fill="${OR}">${o.hide?'?':m*b}</text></svg>`;}
const steps=(m,a,b)=>[`<b style="color:${RD}">${M(NP(m))}</b> כפול <b style="color:${BL}">${M(fX(a))}</b>: ${M(NP(m)+' · '+fX(a).replace(/^−/,'(−')+(a<0?')':'')+' = '+fX(m*a))}`,`<b style="color:${RD}">${M(NP(m))}</b> כפול <b style="color:${OR}">${M(N(b))}</b>: ${M(NP(m)+' · '+NP(b)+' = '+N(m*b))}`,`ביחד: ${M(poly(m*a,m*b))}`];
const RU={base:'כל איבר בתוך הסוגריים מקבל כפל: <b>קשת לכל איבר</b>.',sign:'כפל: אותם סימנים ← פלוס. סימנים שונים ← מינוס.',minus:'מינוס לפני סוגריים = כפול (−1): כל איבר בפנים מחליף סימן.',col:'פותחים סוגריים, ואז מחברים איברים דומים (x עם x, מספר עם מספר).'};
const C=(t,c)=>`<span style="color:${c}">${t}</span>`;
const WP=(m,a,b)=>[{t:`קשת 1: ${C('הכופל',RD)} כפול ${C('האיבר עם x',BL)}: ${M(NP(m)+' · '+fX(a).replace(/^−/,'(−')+(a<0?')':'')+' = ?')} <small>(רק המספר שלפני x)</small>`,ans:[{label:'',val:m*a}],why:'כפל סימנים: <b>מינוס כפול מינוס = פלוס</b>, מינוס כפול פלוס = מינוס.'},
 {t:`קשת 2: ${C('הכופל',RD)} כפול ${C('המספר',OR)}: ${M(NP(m)+' · '+NP(b)+' = ?')}`,ans:[{label:'',val:m*b}],why:`גם ${C('המספר',OR)} מקבל כפל, <b>עם הסימן שלו</b>. מינוס כפול מינוס = פלוס.`}];
const TPL='[] x &nbsp; []';
const ansP=(A,B)=>[{label:'המקדם של x',col:BL,val:A,neg:true},{label:'המספר',col:OR,val:B,neg:true}];
const dgP=(m,a,b)=>({vals:[p,q]})=>p===m*a&&q===b?'פתחתם רק קשת אחת! גם '+M(N(b))+' מקבל כפל ב־'+M(N(m))+'.':p===a&&q===m*b?'גם '+M(fX(a))+' מקבל כפל ב־'+M(N(m))+'.':p===m*a&&q===-m*b?'טעות בסימן של המספר: '+M(NP(m)+' · '+NP(b)+' = '+N(m*b))+'.':p===-m*a&&q===m*b?'טעות בסימן של x: '+M(NP(m)+' · '+NP(a)+' = '+N(m*a))+'.':p===m+a?'<b>חיברתם</b> את '+M(N(m))+'. בפילוג <b>כופלים</b>.':null;
/* ★ */
function gPick(){const m=R(2,6),a=pick([1,1,1,2]),b=Math.random()<.75?R(1,9):-R(1,9),good=poly(m*a,m*b);
 const opts=[good];[poly(m*a,b),poly(a,m*b),poly(m*a,-m*b),poly(m*a,m+b),poly(m+a,m*b)].forEach(o=>{if(!opts.includes(o)&&opts.length<4)opts.push(o);});const o2=shuf(opts);
 return {kind:'פותחים סוגריים',dia:h=>eSvg(m,a,b,{anim:true,res:h?[m*a,m*b]:null}),text:'פתחו את הסוגריים. איזו תשובה נכונה?',choice:o2.map(M),correct:o2.indexOf(good),work:WP(m,a,b),lines:steps(m,a,b),rule:RU.base,
  diag:({sel})=>{const s=o2[sel];return s===poly(m*a,b)?'פתחתם רק קשת אחת! גם '+M(N(b))+' מקבל כפל.':s===poly(a,m*b)?'גם '+M(fX(a))+' מקבל כפל.':s===poly(m*a,-m*b)?'בדקו את הסימן של המספר.':'בדקו: קשת אחת לכל איבר, ובכל קשת <b>כופלים</b>.';}};}
function gMental(){const m=R(3,9),base=pick([10,20,30,100]),dd=R(1,4),neg=Math.random()<.4,n=neg?base-dd:base+dd,ans=m*n;
 return {kind:'חשבון בראש עם פילוג',text:`חשבו בראש: ${M(m+' · '+n)} (רמז: ${M(n+' = '+base+(neg?' − ':' + ')+dd)})`,ans:[{label:'התשובה',col:GR,val:ans}],work:[{t:`${M(m+' · '+base+' = ?')}`,ans:[{label:'',val:m*base}],why:'כופלים את החלק העגול.'},{t:`${M(m+' · '+dd+' = ?')}`,ans:[{label:'',val:m*dd}],why:`גם ${M(dd)} מקבל כפל ב־${M(m)}!`},{t:`${M(m*base+(neg?' − ':' + ')+m*dd+' = ?')}`,ans:[{label:'',val:ans}],why:neg?'היה מינוס בפירוק, אז מחסירים.':'מחברים את שני החלקים.'}],
  lines:[`${M(m+' · ('+base+(neg?' − ':' + ')+dd+')')}`,`${M(m+' · '+base+' = '+m*base)} ו־${M(m+' · '+dd+' = '+m*dd)}`,`${M(m*base+(neg?' − ':' + ')+m*dd+' = '+ans)}`],rule:'מפרקים מספר "עגול" + קטן, וכופלים כל חלק. ככה מחשבים בראש!',
  diag:({vals:[v]})=>v===m*base+dd||v===m*base-dd?'שכחתם לכפול גם את '+M(dd)+' ב־'+M(m)+'.':null};}
/* ★★ */
function gFill(){const m=R(2,9),a=pick([1,1,2,3]),b=pick([1,-1])*R(1,9);
 return {kind:'כותבים את התשובה',dia:h=>eSvg(m,a,b,{anim:true,res:h?[m*a,m*b]:null}),text:'פתחו את הסוגריים. כתבו את המספר <b>עם הסימן שלו</b> (למשל ‎−8).',tpl:TPL,ans:ansP(m*a,m*b),work:WP(m,a,b),lines:steps(m,a,b),rule:RU.base,diag:dgP(m,a,b)};}
/* ★★★ */
function gNeg(){const m=-R(2,7),a=pick([1,1,2,-1]),b=pick([1,-1])*R(1,9);
 return {kind:'כופל שלילי',dia:h=>eSvg(m,a,b,h?{anim:true,res:[m*a,m*b]}:{arcs:false}),text:'פתחו את הסוגריים. זהירות עם הסימנים!',tpl:TPL,ans:ansP(m*a,m*b),work:WP(m,a,b),lines:[...steps(m,a,b)],rule:RU.sign,diag:dgP(m,a,b),dia2:1};}
function gMinus(){const a=pick([1,1,2,3]),b=pick([1,-1])*R(1,9);
 return {kind:'מינוס לפני סוגריים',dia:h=>eSvg(-1,a,b,h?{anim:true,res:[-a,-b]}:{arcs:false}),text:'פתחו את הסוגריים.',tpl:TPL,ans:ansP(-a,-b),work:[{t:'מינוס לפני סוגריים זה כמו לכפול ב־…?',choice:[M('(−1)'),M('0'),M('(+1)')],correct:0,why:'המינוס שלפני הסוגריים = כפול ‎(−1): כל איבר בפנים <b>מחליף סימן</b>.'},...WP(-1,a,b)],lines:['מינוס לפני סוגריים = כפול ‎(−1).',...steps(-1,a,b)],rule:RU.minus,
  diag:({vals:[p,q]})=>p===-a&&q===b?'המינוס פועל על <b>כל</b> האיברים: גם המספר מחליף סימן.':p===a?'המינוס שלפני הסוגריים הופך גם את '+M(fX(a))+'.':null};}
function gCollect(){const m=R(2,5),a=pick([1,1,2]),b=pick([1,-1])*R(1,8);let c;do{c=pick([1,-1])*R(1,6);}while(m*a+c===0);const d=pick([1,-1])*R(1,9);const A=m*a+c,B=m*b+d;
 const tail=[{t:c<0?'−':'+',c:INK,s:1},{t:fX(Math.abs(c)),c:BL},{t:d<0?'−':'+',c:INK,s:1},{t:''+Math.abs(d),c:OR}];
 return {kind:'פותחים וכונסים',dia:()=>eSvg(m,a,b,{tail,arcs:true}),text:'פתחו סוגריים, ואז כנסו איברים דומים.',tpl:TPL,ans:ansP(A,B),work:[...WP(m,a,b),{t:`${C('x עם x',BL)}: ${M(N(m*a)+(c<0?' − ':' + ')+Math.abs(c)+' = ?')}`,ans:[{label:'',val:A}],why:'מכנסים רק איברים עם x ביחד. חושבים על ציר המספרים.'},{t:`${C('מספר עם מספר',OR)}: ${M(N(m*b)+(d<0?' − ':' + ')+Math.abs(d)+' = ?')}`,ans:[{label:'',val:B}],why:'מספר עם מספר, עם הסימנים. חושבים על ציר המספרים.'}],
  lines:[`פותחים: ${M(poly(m*a,m*b))}`,`כל הביטוי: ${M(poly(m*a,m*b)+(c<0?' − ':' + ')+fX(Math.abs(c))+(d<0?' − ':' + ')+Math.abs(d))}`,`<b style="color:${BL}">x עם x</b>: ${M(N(m*a)+(c<0?' − ':' + ')+Math.abs(c)+' = '+N(A))} · <b style="color:${OR}">מספר עם מספר</b>: ${M(N(m*b)+(d<0?' − ':' + ')+Math.abs(d)+' = '+N(B))}`,`תשובה: ${M(poly(A,B))}`],rule:RU.col,
  diag:({vals:[p,q]})=>p===a+c?'קודם פותחים סוגריים: '+M(N(m)+' · '+fX(a)+' = '+fX(m*a))+'.':q===b+d?'גם המספר בסוגריים מקבל כפל: '+M(m+' · '+NP(b)+' = '+N(m*b))+'.':null};}
/* ★★★★ */
function gErr(){const k=pick([0,1,2]);let m,a=1,b,wrong,good;
 if(k===0){m=R(2,6);b=R(2,9);wrong=poly(m,b);}else if(k===1){m=-R(2,6);b=-R(2,9);wrong=poly(m,-(m*b));}else{m=R(2,6);b=R(2,9);wrong=poly(m+1,m+b);}
 good=poly(m*a,m*b);const opts=['שכחו לכפול את האיבר השני','טעות בסימן: מינוס כפול מינוס זה פלוס','חיברו במקום לכפול','אין טעות'];
 return {kind:'מוצאים את הטעות',dia:h=>eSvg(m,a,b,h?{anim:true,res:[m*a,m*b]}:{arcs:false}),text:`תלמיד כתב: ${M(mT(m)+'('+poly(a,b)+') = '+wrong)}. מה הטעות?`,choice:opts,correct:k,lines:[`הפתרון הנכון: ${M(good)}`,...steps(m,a,b).slice(0,2)],rule:RU.base+' '+RU.sign,
  diag:()=>'פתחו בעצמכם עם קשתות, והשוו לתשובה של התלמיד.'};}
function gEq(){const m=R(2,6),b=R(1,8),x0=R(1,9),c=m*(x0+b);
 return {kind:'משוואה עם סוגריים',dia:()=>eSvg(m,1,b,{tail:[{t:'=',c:INK,s:1},{t:''+c,c:GR}]}),text:`פתרו את המשוואה: ${M(m+'(x + '+b+') = '+c)}`,ans:[{label:'x =',col:PU,val:x0}],
  lines:[`פותחים: ${M(m+'x + '+m*b+' = '+c)}`,`${M(m+'x = '+c+' − '+m*b+' = '+(c-m*b))}`,`${M('x = '+(c-m*b)+' : '+m+' = '+x0)}`,`בדיקה: ${M(m+' · ('+x0+' + '+b+') = '+c)} ✓`],rule:'קודם פותחים סוגריים (קשתות), ואז פותרים כרגיל.',
  diag:({vals:[x]})=>x===(c-b)/m?'פתחתם רק קשת אחת: גם '+M(b)+' מקבל כפל ב־'+M(m)+'.':x===c/m-b?'גם כך אפשר! אבל בדקו את החשבון.':null};}
function gRect(){const m=R(2,6),b=R(2,9);
 return {kind:'שטח מלבן',dia:()=>rSvg(m,b,{hide:true}),text:`צלעות המלבן: ${M(m)} ו־${M('x + '+b)}. כתבו ביטוי לשטח (בלי סוגריים).`,tpl:TPL,ans:ansP(m,m*b),
  lines:[`שטח = ${M(m+'(x + '+b+')')}`,`החלק <b style="color:${BL}">הכחול</b>: ${M(m+' · x = '+m+'x')}. החלק <b style="color:${OR}">הכתום</b>: ${M(m+' · '+b+' = '+m*b)}`,`השטח: ${M(poly(m,m*b))}`],rule:'חוק הפילוג = שטח המלבן הגדול = סכום שני המלבנים הקטנים.',diag:dgP(m,1,b)};}
function gReverse(){const k=R(2,5),a=R(2,4),b=R(1,7);const goodS=k+'('+poly(a,b)+')';const opts=shuf([goodS,k+'('+poly(a,k*b)+')',(k*a)+'('+poly(1,k*b)+')',k*a+'x + '+b]);
 return {kind:'פילוג הפוך',text:`איזה ביטוי שווה ל־${M(poly(k*a,k*b))}?`,choice:opts.map(M),correct:opts.indexOf(goodS),lines:[`בודקים בפתיחה: ${M(goodS+' = '+poly(k*a,k*b))} ✓`],rule:'בודקים כל תשובה: פותחים סוגריים ומשווים.',
  diag:()=>'פתחו כל אפשרות עם קשתות, ובדקו איזו נותנת בדיוק '+M(poly(k*a,k*b))+'.'};}
function gXMul(){const b=R(2,9);const good='x² + '+b+'x';const opts=shuf([good,'x + '+b+'x','x² + '+b,'2x + '+b]);
 return {kind:'כופל x',text:`פתחו: ${M('x(x + '+b+')')}`,choice:opts.map(M),correct:opts.indexOf(good),lines:[`${M('x · x = x²')} (x בריבוע)`,`${M('x · '+b+' = '+b+'x')}`,`ביחד: ${M(good)}`],rule:'x · x = x². גם x מקבל קשת לכל איבר.',diag:()=>'זכרו: '+M('x · x = x²')+', לא 2x.'};}
/* ===== levels ===== */
const LEVELS=[
 {n:1,t:'פותחים סוגריים',d:'קשת לכל איבר, חשבון בראש',g:()=>Math.random()<.75?gPick():gMental()},
 {n:2,t:'כותבים את התשובה',d:'מקדם x ומספר, עם סימן',g:gFill},
 {n:3,t:'מינוסים וכינוס',d:'כופל שלילי, מינוס לפני סוגריים',g:()=>pick([gNeg,gMinus,gCollect])()},
 {n:4,t:'חשיבה ואוריינות',d:'טעויות, משוואה, שטח, פילוג הפוך',g:()=>pick([gErr,gEq,gRect,gReverse,gXMul])()}];
const TEST=[[gPick,gPick,gMental,gPick],[gFill,gFill,gFill,gMental],[gNeg,gMinus,gCollect,gNeg],[gErr,gEq,gRect,gReverse]];
const WARM=[gMental,gPick,gPick,gMental,gPick,gFill,gFill,gPick];
/* ===== animated explanation ===== */
const RECAP=[
 {h:'למה צריך?',d:1.8,svg:()=>rSvg(7,3,{anim:true,d:.4}).replace('>x<','>10<').replace(/>7x</,'>70<').replace(/>21</,'>21<'),
  says:[`${M('7 · 13')} בראש? ${M('13 = 10 + 3')}`,`${M('70 + 21 = 91')} <span class="v">✓</span>`],what:'תרגיל קשה ← שני תרגילים קלים.'},
 {h:'מה זה חוק הפילוג?',d:1.8,svg:()=>rSvg(3,4,{anim:true,d:.4}),
  says:[`השטח: ${M('3(x + 4) = 3x + 12')}`],def:`<b>חוק הפילוג:</b> ${M('a(b + c) = a · b + a · c')}`,what:'המספר בחוץ כופל <b>כל איבר</b>.'},
 {h:'הקשתות',d:2.4,svg:()=>eSvg(3,1,4,{anim:true,d:.3,res:[3,12]}),
  says:[`<b style="color:${RD}">3</b> שולח קשת לכל איבר.`,`${M('3 · x = 3x')} ו־${M('3 · 4 = 12')}`],what:'קשת לכל איבר. בכל קשת כופלים.'},
 {h:'מינוס בתוך הסוגריים',d:2.4,svg:()=>eSvg(2,1,-5,{anim:true,d:.3,res:[2,-10]}),
  says:[`המינוס צמוד ל־5 ← ${M('−5')}`,`${M('2 · (−5) = −10')}`],what:'כל איבר הולך עם הסימן שלו.'},
 {h:'כופל שלילי',d:2.4,svg:()=>eSvg(-3,1,-2,{anim:true,d:.3,res:[-3,6]}),
  says:[`${M('−3 · x = −3x')}`,`${M('−3 · (−2) = +6')}`],def:'סימנים שווים ← פלוס. שונים ← מינוס.',what:'קודם הסימן, אחר כך המספר.'},
 {h:'מינוס לפני סוגריים',d:2.4,svg:()=>eSvg(-1,1,4,{anim:true,d:.3,res:[-1,-4]}),
  says:[`מינוס = כפול ${M('(−1)')}`,`${M('−(x + 4) = −x − 4')}`],what:'<b>כל</b> איבר מחליף סימן.'},
 {h:'פותחים וכונסים',d:1.4,svg:()=>eSvg(2,1,3,{tail:[{t:'+',c:INK,s:1},{t:'4x',c:BL}],anim:true,d:.3}),
  says:[`פותחים: ${M('2x + 6 + 4x')}`,`<b style="color:${BL}">x עם x</b> ← ${M('6x + 6')}`],what:'קודם פותחים, אחר כך כונסים.'},
 {h:'הטעות הנפוצה',d:1.4,svg:()=>eSvg(3,1,4,{arcs:false}),
  says:[`${M('3(x + 4) = 3x + 4')} <span class="x">✗</span> גם 4 מקבל כפל!`,`${M('3(x + 4) = 3x + 12')} <span class="v">✓</span>`],what:'בודקים: כל איבר קיבל קשת?'}];

/* בדיקת הבנה אחרי הסבר */
RECAP[3].chk=[()=>{let q;for(let k=0;k<40;k++){q=gFill();if(q.ans.some(a=>a.val<0))break;}return q;}];
