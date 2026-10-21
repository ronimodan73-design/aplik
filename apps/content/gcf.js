/*META {"id":"gcf","title":"הוצאת גורם משותף · ערכה: רוני מודן","short":"גורם משותף","topic":"הוצאת גורם משותף","glyph":"ab+ac","color":"#4fd18b"} */
const APP={key:'gcf',topic:'הוצאת גורם משותף',sub:'מוצאים מה משותף, מחלקים מתחת לכל איבר, וכותבים סוגריים.',rc:{'מוצאים את הגורם המשותף':1,'מפרקים לגורמים':2,'כותבים את הפירוק':2,'כשנשאר 1':6,'x הוא הגורם':4,'מספר וגם x':5,'נשאר 1 גם עם x':6,'גורם שלילי':2,'האם הפירוק מלא?':1,'מוצאים את הטעות':7,'שלושה איברים':2}};
const N=v=>v<0?'−'+(-v):''+v;
const gcd=(a,b)=>b?gcd(b,a%b):Math.abs(a);
const SUP=['','','²','³','⁴'];
const xp=p=>p===0?'':'x'+SUP[p];
const mono=(c,p,first=true)=>{const s=c<0?'−':(first?'':'+');const a=Math.abs(c);const body=(a===1&&p>0?'':a)+xp(p);return first?(c<0?'−'+body:body):body;};
const term=(c,p,first)=>first?mono(c,p,true):(c<0?' − ':' + ')+mono(Math.abs(c),p,true);
const expr=ts=>ts.map((t,i)=>term(t[0],t[1],i===0)).join('');
const COLS=[BL,OR,GR];
const CSS=`<style>.gk{direction:ltr;display:flex;flex-direction:column;align-items:center;gap:10px;font-family:Rubik;font-weight:800}.gr{display:flex;align-items:center;gap:10px;font-size:30px}.gfr{display:inline-flex;flex-direction:column;align-items:center;font-size:24px;line-height:1.15}.gfr span:first-child{border-bottom:3px solid currentColor;padding:0 6px}.geq{font-size:24px;color:#dfe8f5}.gop{color:#dfe8f5}.gF{color:${RD}}</style>`;
/* terms ts=[[c,p],...], factor F=[g,q] */
function gHtml(ts,F,o={}){const [g,q]=F,fs=mono(g,q,true),ins=ts.map(([c,p])=>[c/g,p-q]);const cl=o.anim?'rv':'';
 let h=CSS+`<div class="gk"><div class="gr">${ts.map((t,i)=>(i?`<span class="gop">${t[0]<0?'−':'+'}</span>`:'')+`<span style="color:${COLS[i]}">${i?mono(Math.abs(t[0]),t[1]):mono(t[0],t[1])}</span>`).join('')}</div>`;
 if(o.div)h+=`<div class="gr ${cl}" style="--d:${(o.d||0)}s">${ts.map((t,i)=>`<span class="gfr" style="color:${COLS[i]}"><span>${mono(t[0],t[1])}</span><span class="gF">${fs}</span></span><span class="geq">=</span><span style="color:${COLS[i]};font-size:26px">${mono(ins[i][0],ins[i][1])}</span>`).join('<span style="width:14px"></span>')}</div>`;
 if(o.res)h+=`<div class="gr ${cl}" style="--d:${(o.d||0)+.9}s"><span class="gop">=</span><span class="gF">${fs==='1'?'':fs}</span><span class="gop">(</span>${ins.map((t,i)=>(i?`<span class="gop">${t[0]<0?'−':'+'}</span>`:'')+`<span style="color:${COLS[i]}">${i?mono(Math.abs(t[0]),t[1]):mono(t[0],t[1])}</span>`).join('')}<span class="gop">)</span></div>`;
 return h+'</div>';}
const RU={gcd:'הגורם המשותף הגדול ביותר: המספר הגדול ביותר שמחלק את כל המספרים.',div:'מוציאים גורם משותף: <b>מחלקים מתחת לכל איבר</b> בגורם, והתוצאות נכנסות לסוגריים.',one:'איבר שמתחלק בעצמו ← נשאר <b>1</b> (לא 0!).',x:'אם בכל איבר יש x ← גם x הוא גורם משותף (מוציאים את החזקה הקטנה).',chk:'בודקים בפילוג: פותחים את הסוגריים וצריך לקבל את הביטוי המקורי.'};
function pair(){let a,b;do{a=R(1,7);b=R(1,9);}while(a===b||gcd(a,b)!==1);return [a,b];}
const divLines=(ts,F)=>{const fs=mono(F[0],F[1]);return [`הגורם המשותף: <b style="color:${RD}">${M(fs)}</b>`,...ts.map((t,i)=>`<b style="color:${COLS[i]}">${M(mono(t[0],t[1])+' : '+fs+' = '+mono(t[0]/F[0],t[1]-F[1]))}</b>`),`תשובה: ${M(fs+'('+expr(ts.map(([c,p])=>[c/F[0],p-F[1]]))+')')}`];};
/* ★ */
function gNum(){const g=R(2,7),[a,b]=pair(),ts=[[g*a,1],[g*b,0]];
 return {kind:'מוצאים את הגורם המשותף',dia:h=>gHtml(ts,[g,0],h?{div:1,res:1,anim:1,d:.3}:{}),text:`מהו <b style="color:${RD}">הגורם המשותף הגדול ביותר</b> של ${M(expr(ts))}?`,ans:[{label:'הגורם',col:RD,val:g}],
  lines:[`המספרים: ${M(g*a)} ו־${M(g*b)}.`,`המספר הגדול ביותר שמחלק את שניהם: <b style="color:${RD}">${M(g)}</b>`],rule:RU.gcd,
  diag:({vals:[v]})=>v>1&&g%v===0&&v<g?M(v)+' הוא גורם משותף, אבל <b>לא הגדול ביותר</b>. נסו מספר גדול יותר.':((g*a)%v||(g*b)%v)?M(v)+' לא מחלק את שני המספרים.':null};}
function gPick(){const g=R(2,6),[a,b]=pair(),ts=[[g*a,1],[g*b,0]],good=`${g}(${expr([[a,1],[b,0]])})`;
 const opts=[good];[`${g}(${expr([[a,1],[g*b,0]])})`,`${g}(${expr([[g*a,1],[b,0]])})`,`${g*a}(x + ${b})`,`${g}(${a}x)`].forEach(o=>{if(!opts.includes(o)&&opts.length<4)opts.push(o);});const o2=shuf(opts);
 return {kind:'מפרקים לגורמים',dia:h=>gHtml(ts,[g,0],h?{div:1,res:1,anim:1,d:.3}:{}),text:`הוציאו גורם משותף: ${M(expr(ts))}`,choice:o2.map(M),correct:o2.indexOf(good),lines:divLines(ts,[g,0]),rule:RU.div,
  diag:()=>'מחלקים <b>כל</b> איבר בגורם המשותף, ובודקים בפילוג.'};}
/* ★★ */
function gFill(){const g=R(2,8),[a,b0]=pair(),b=Math.random()<.7?b0:-b0,ts=[[g*a,1],[g*b,0]];
 return {kind:'כותבים את הפירוק',dia:h=>gHtml(ts,[g,0],h?{div:1,res:1,anim:1,d:.3}:{}),text:'הוציאו גורם משותף (הגדול ביותר). את המספר האחרון כתבו עם הסימן שלו.',tpl:'[] ( [] x &nbsp; [] )',
  ans:[{label:'הגורם',col:RD,val:g},{label:'מקדם x',col:BL,val:a},{label:'המספר',col:OR,val:b,neg:true}],lines:divLines(ts,[g,0]),rule:RU.div,
  diag:({vals:[F,p,q]})=>F===g&&p===g*a?'את '+M(g*a+'x')+' צריך <b>לחלק</b> ב־'+M(g)+'. מה יוצא?':F===g&&q===-b?'שמרו על הסימן: '+M(N(g*b)+' : '+g+' = '+N(b))+'.':F>1&&g%F===0&&F<g?'יש גורם משותף <b>גדול יותר</b> מ־'+M(F)+'.':null};}
function gOne(){const g=R(2,9),a=R(2,6),ts=[[g*a,1],[g,0]];
 return {kind:'כשנשאר 1',dia:h=>gHtml(ts,[g,0],h?{div:1,res:1,anim:1,d:.3}:{}),text:`השלימו: ${M(expr(ts)+' = '+g+'(  x +  )')}`,tpl:`${g} ( [] x + [] )`,ans:[{label:'מקדם x',col:BL,val:a},{label:'המספר',col:OR,val:1}],lines:divLines(ts,[g,0]),rule:RU.one,
  diag:({vals:[p,q]})=>q===0?M(g+' : '+g+' = 1')+'. איבר שמתחלק בעצמו ← נשאר <b>1</b>, לא 0!':p===g*a?'מחלקים גם את '+M(g*a+'x')+' ב־'+M(g)+'.':null};}
/* ★★★ */
function gX(){const ts=Math.random()<.5?[[1,2],[R(2,9)*(Math.random()<.7?1:-1),1]]:[[1,3],[R(2,9),2]];const F=[1,ts[1][1]];
 const inn=ts.map(([c,p])=>[c,p-F[1]]),good=mono(1,F[1])+'('+expr(inn)+')';
 const opts=[good];[mono(1,F[1])+'('+expr([[1,ts[0][1]],[ts[1][0],ts[1][1]]])+')',mono(1,F[1])+'('+expr([[1,1],[ts[1][0],1]])+')',expr([[ts[1][0],0]])+'(x'+SUP[F[1]]+' + x)'].forEach(o=>{if(!opts.includes(o)&&opts.length<4)opts.push(o);});const o2=shuf(opts);
 return {kind:'x הוא הגורם',dia:()=>gHtml(ts,F),text:`הוציאו גורם משותף: ${M(expr(ts))}`,choice:o2.map(M),correct:o2.indexOf(good),lines:divLines(ts,F),rule:RU.x,diag:()=>'בכל איבר יש x. מחלקים כל איבר ב־'+M(mono(1,F[1]))+'.'};}
function gNX(){const g=R(2,6),[a,b0]=pair(),b=Math.random()<.75?b0:-b0,ts=[[g*a,2],[g*b,1]];
 return {kind:'מספר וגם x',dia:h=>gHtml(ts,[g,1],h?{div:1,res:1,anim:1,d:.3}:{}),text:'הוציאו את הגורם המשותף הגדול ביותר (מספר וגם x).',tpl:'[] x ( [] x &nbsp; [] )',
  ans:[{label:'מספר בגורם',col:RD,val:g},{label:'מקדם x',col:BL,val:a},{label:'המספר',col:OR,val:b,neg:true}],lines:divLines(ts,[g,1]),rule:RU.x+' '+RU.div,
  diag:({vals:[F,p,q]})=>F===g&&p===g*a?'מחלקים את '+M(mono(g*a,2))+' ב־'+M(g+'x')+': יוצא '+M(a+'x')+'.':F<g&&g%F===0?'יש מספר משותף <b>גדול יותר</b>.':null};}
function gOneX(){const g=R(2,7),a=R(2,6),ts=[[g*a,2],[g,1]];
 return {kind:'נשאר 1 גם עם x',dia:h=>gHtml(ts,[g,1],h?{div:1,res:1,anim:1,d:.3}:{}),text:`השלימו: ${M(expr(ts)+' = '+g+'x(  x +  )')}`,tpl:`${g}x ( [] x + [] )`,ans:[{label:'מקדם x',col:BL,val:a},{label:'המספר',col:OR,val:1}],lines:divLines(ts,[g,1]),rule:RU.one,
  diag:({vals:[p,q]})=>q===0||q===g?M(g+'x : '+g+'x = 1')+'. נשאר <b>1</b>!':null};}
/* ★★★★ */
function gNeg(){const g=R(2,6),[a,b]=pair(),ts=[[-g*a,1],[-g*b,0]],good=`−${g}(${expr([[a,1],[b,0]])})`;const opts=shuf([good,`−${g}(${expr([[a,1],[-b,0]])})`,`${g}(${expr([[-a,1],[b,0]])})`,`−${g}(${expr([[-a,1],[-b,0]])})`]);
 return {kind:'גורם שלילי',dia:h=>gHtml(ts,[-g,0],h?{div:1,res:1,anim:1,d:.3}:{}),text:`הוציאו את ${M('−'+g)} כגורם משותף: ${M(expr(ts))}`,choice:opts.map(M),correct:opts.indexOf(good),lines:divLines(ts,[-g,0]),rule:'מחלקים במספר שלילי: מינוס חלקי מינוס = פלוס.',diag:()=>'חלקו כל איבר ב־'+M('−'+g)+'. מינוס חלקי מינוס = <b>פלוס</b>.'};}
function gFull(){const g=R(2,4),h=R(2,3),[a,b]=pair(),ts=[[g*h*a,1],[g*h*b,0]],full=Math.random()<.5;const shown=full?`${g*h}(${expr([[a,1],[b,0]])})`:`${g}(${expr([[h*a,1],[h*b,0]])})`;
 return {kind:'האם הפירוק מלא?',dia:h=>gHtml(ts,[g*h,0],h?{div:1,res:1,anim:1,d:.3}:{}),text:`תלמיד כתב: ${M(expr(ts)+' = '+shown)}. האם הוציא את הגורם המשותף <b>הגדול ביותר</b>?`,
  choice:['כן, בתוך הסוגריים אין יותר גורם משותף','לא, בתוך הסוגריים יש עוד גורם משותף','לא, הפירוק לא נכון בכלל'],correct:full?0:1,
  lines:[full?`בתוך הסוגריים ${M(a)} ו־${M(b)}: אין גורם משותף ← <b>מלא</b>.`:`בתוך הסוגריים ${M(h*a)} ו־${M(h*b)}: אפשר להוציא עוד ${M(h)}!`,`הפירוק המלא: ${M(g*h+'('+expr([[a,1],[b,0]])+')')}`],rule:'בודקים את הסוגריים: אם יש בהם עוד גורם משותף ← הפירוק לא מלא.',diag:()=>'הסתכלו על המספרים <b>בתוך</b> הסוגריים: יש להם עוד גורם משותף?'};}
function gErr(){const g=R(2,9),a=R(2,6),ts=[[g*a,1],[g,0]],wrong=`${g}(${a}x)`;
 return {kind:'מוצאים את הטעות',dia:h=>gHtml(ts,[g,0],h?{div:1,res:1,anim:1,d:.3}:{}),text:`תלמיד כתב: ${M(expr(ts)+' = '+wrong)}. מה הטעות?`,choice:['שכח את ה־1 בסוגריים','הגורם המשותף לא נכון','אין טעות','צריך להוציא x'],correct:0,
  lines:[`${M(g+' : '+g+' = 1')}`,`הנכון: ${M(g+'('+a+'x + 1)')}`,`בדיקה: ${M(g+' · '+a+'x + '+g+' · 1 = '+expr(ts))} ✓`],rule:RU.one+' '+RU.chk,diag:()=>'בדקו בפילוג: '+M(g+' · '+a+'x')+' נותן רק איבר אחד. איפה ה־'+M(g)+'?'};}
function gThree(){const g=R(2,5),[a,b]=pair(),c=R(1,7),ts=[[g*a,2],[g*b,1],[g*c,0]],good=`${g}(${expr([[a,2],[b,1],[c,0]])})`;const opts=shuf([good,`${g}x(${expr([[a,1],[b,0],[c,0]])})`,`${g}(${expr([[a,2],[b,1],[g*c,0]])})`,`${g}(${expr([[a,2],[b,1]])})`]);
 return {kind:'שלושה איברים',dia:h=>gHtml(ts,[g,0],h?{div:1,res:1,anim:1,d:.3}:{}),text:`הוציאו גורם משותף: ${M(expr(ts))}`,choice:opts.map(M),correct:opts.indexOf(good),lines:divLines(ts,[g,0]),rule:RU.div+' (לכל האיברים!)',diag:()=>'במספר '+M(g*c)+' אין x, לכן x הוא <b>לא</b> גורם משותף. מחלקים כל אחד מ־3 האיברים.'};}
/* ===== levels ===== */
const LEVELS=[
 {n:1,t:'מוצאים מה משותף',d:'הגורם הגדול ביותר, פירוק ראשון',g:()=>Math.random()<.5?gNum():gPick()},
 {n:2,t:'כותבים את הפירוק',d:'מחלקים מתחת לכל איבר, נשאר 1',g:()=>Math.random()<.7?gFill():gOne()},
 {n:3,t:'גם x משותף',d:'x, ומספר וגם x',g:()=>pick([gX,gNX,gOneX])()},
 {n:4,t:'חשיבה ואוריינות',d:'שלילי, פירוק מלא?, טעויות, 3 איברים',g:()=>pick([gNeg,gFull,gErr,gThree])()}];
const TEST=[[gNum,gPick,gNum,gPick],[gFill,gFill,gOne,gFill],[gX,gNX,gOneX,gNX],[gNeg,gFull,gErr,gThree]];
const WARM=[gNum,gNum,gPick,gNum,gPick,gOne,gFill,gPick];
/* ===== animated explanation ===== */
const RECAP=[
 {h:'למה צריך?',d:.4,says:[`בפילוג פתחנו סוגריים: ${M('3(x + 4) = 3x + 12')}`,`עכשיו <b>הפוך</b>: ${M('3x + 12 = 3(x + 4)')}`,'זה עוזר לצמצם שברים ולפתור משוואות מהר.'],what:'הוצאת גורם משותף = <b>פילוג הפוך</b>.'},
 {h:'מה זה גורם משותף?',d:.4,says:[`המחלקים של ${M('12')}: ${M('1, 2, 3, 4, 6, 12')}`,`המחלקים של ${M('18')}: ${M('1, 2, 3, 6, 9, 18')}`,`משותפים: ${M('1, 2, 3, 6')} ← הגדול ביותר: <b style="color:${RD}">${M('6')}</b>`],def:'<b>גורם משותף</b> הוא מספר שמחלק את כל המספרים. מוציאים את <b>הגדול ביותר</b>.',what:'מחפשים את המספר <b>הגדול ביותר</b> שמחלק את כולם.'},
 {h:'מחלקים מתחת לכל איבר',d:2.4,svg:()=>gHtml([[6,1],[9,0]],[3,0],{div:1,res:1,anim:1,d:.6}),says:[`הגורם המשותף: <b style="color:${RD}">3</b>`,'מחלקים כל איבר ב־3, והתוצאות נכנסות לסוגריים.'],what:'גורם ← <b>חילוק מתחת לכל איבר</b> ← סוגריים.'},
 {h:'בודקים בפילוג',d:.4,says:[`${M('3(2x + 3)')}`,`${M('3 · 2x = 6x')} ו־${M('3 · 3 = 9')}`,`${M('6x + 9')} <span class="v">✓</span> חזרנו לביטוי המקורי!`],what:'תמיד אפשר לבדוק: <b>פותחים סוגריים</b>.'},
 {h:'גם x יכול להיות גורם',d:2.4,svg:()=>gHtml([[1,2],[5,1]],[1,1],{div:1,res:1,anim:1,d:.6}),says:[`${M('x²')} זה ${M('x · x')}, ו־${M('5x')} זה ${M('5 · x')}.`,`בשניהם יש <b style="color:${RD}">x</b> ← מוציאים אותו.`],what:'x בכל האיברים ← <b>x משותף</b>.'},
 {h:'מספר וגם x',d:2.4,svg:()=>gHtml([[4,2],[6,1]],[2,1],{div:1,res:1,anim:1,d:.6}),says:[`מספר משותף: ${M('2')}. x משותף: ${M('x')}.`,`הגורם: <b style="color:${RD}">${M('2x')}</b>`],what:'מוציאים <b>גם</b> את המספר <b>וגם</b> את x.'},
 {h:'כשנשאר 1',d:2.4,svg:()=>gHtml([[6,1],[3,0]],[3,0],{div:1,res:1,anim:1,d:.6}),says:[`${M('3 : 3 = 1')}`,`ולכן: ${M('6x + 3 = 3(2x + 1)')}`],what:'איבר שמתחלק בעצמו ← <b>נשאר 1</b>, לא 0!'},
 {h:'הטעות הנפוצה',d:.4,says:[`מישהו כתב: ${M('6x + 3 = 3(2x)')} <span class="x">✗</span>`,`בדיקה: ${M('3 · 2x = 6x')}. איפה ה־3?`,`${M('3(2x + 1)')} <span class="v">✓</span>`],what:'אחרי הפירוק: <b>בודקים בפילוג</b>.'}];
