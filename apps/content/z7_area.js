/*META {"id":"z7_area","title":"שטח והיקף · ריבוע ומלבן · ערכה: רוני מודן","short":"שטח והיקף","topic":"שטח והיקף של ריבוע ומלבן","glyph":"S·P","color":"#4cc38a"} */
const APP={key:'z7_area',topic:'שטח והיקף של ריבוע ומלבן',sub:'היקף = הגבול מסביב. שטח = המשבצות בפנים. רואים, סופרים, ורק אז נוסחה. צעד אחרי צעד, בצבעים.'};
const C=(t,c)=>`<span style="color:${c}">${t}</span>`;
const CM='ס״מ',CM2='סמ״ר',MM='מ׳',MM2='מ״ר';
const WC=GR,HC=PU,PC=OR,SC=BL; /* רוחב ירוק, גובה סגול, היקף כתום, שטח כחול */
function CH(o){const s=shuf(o);return {choice:s.map(x=>x.t),correct:s.findIndex(x=>x.ok),diag:({sel})=>s[sel]&&!s[sel].ok&&s[sel].msg||null};}
/* ===== engine: a shape made of unit cells ===== */
const key=(x,y)=>x+','+y;
function rectCells(w,h){const c=[];for(let y=0;y<h;y++)for(let x=0;x<w;x++)c.push([x,y]);return c;}
function boundary(cells){const S=new Set(cells.map(([x,y])=>key(x,y))),E=[];
 cells.forEach(([x,y])=>{if(!S.has(key(x,y-1)))E.push([[x,y],[x+1,y]]);if(!S.has(key(x+1,y)))E.push([[x+1,y],[x+1,y+1]]);if(!S.has(key(x,y+1)))E.push([[x+1,y+1],[x,y+1]]);if(!S.has(key(x-1,y)))E.push([[x,y+1],[x,y]]);});
 /* trace into one loop */
 const nx={};E.forEach(e=>nx[key(...e[0])]=e);const out=[];let e=E.reduce((a,b)=>(b[0][1]<a[0][1]||(b[0][1]===a[0][1]&&b[0][0]<a[0][0]))?b:a);const start=key(...e[0]);
 do{out.push(e);e=nx[key(...e[1])];}while(e&&key(...e[0])!==start&&out.length<=E.length);return out;}
/* o: {cells, w, h, showCells, fillAnim, peri, periAnim, count:'S'|'P', lw, lh (labels), lab:[...]} */
function G(o){const cells=o.cells||rectCells(o.w,o.h),mx=Math.max(...cells.map(c=>c[0]))+1,my=Math.max(...cells.map(c=>c[1]))+1;
 const u=Math.min(34,Math.floor(250/Math.max(mx,my))),pad=34,W=mx*u+pad*2,H=my*u+pad*2+(o.count?34:0);
 const X=x=>pad+x*u,Y=y=>pad+y*u;
 let s=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${Math.min(360,W*1.3)}px;direction:ltr;font-family:Rubik" role="img" aria-label="צורה על משבצות">`;
 cells.forEach(([x,y],i)=>{const d=o.fillAnim?(o.d0||.4)+i*(o.step||Math.min(.35,6/cells.length)):0;
  s+=`<rect x="${X(x)+1.5}" y="${Y(y)+1.5}" width="${u-3}" height="${u-3}" rx="3" fill="${o.fill?SC:'#ffffff'}" fill-opacity="${o.fill?.42:.05}" stroke="#2c4566" stroke-width="1" ${o.fillAnim?`class="rv" style="--d:${f(d)}s"`:''}/>`;
  if(o.fillAnim&&o.num)s+=`<text x="${X(x)+u/2}" y="${Y(y)+u/2+5}" text-anchor="middle" font-size="${u>26?13:10}" fill="#dfe8f5" class="rv" style="--d:${f(d)}s">${i+1}</text>`;});
 if(o.peri){const B=boundary(cells);B.forEach((e,i)=>{const d=o.periAnim?(o.p0||.3)+i*(o.pstep||Math.min(.3,6/B.length)):0;
   s+=`<line x1="${X(e[0][0])}" y1="${Y(e[0][1])}" x2="${X(e[1][0])}" y2="${Y(e[1][1])}" stroke="${PC}" stroke-width="5" stroke-linecap="round" ${o.periAnim?`class="rv" style="--d:${f(d)}s"`:''}/>`;
   if(o.periAnim&&o.num){const mxp=(X(e[0][0])+X(e[1][0]))/2,myp=(Y(e[0][1])+Y(e[1][1]))/2,dx=e[1][1]-e[0][1],dy=-(e[1][0]-e[0][0]);s+=`<text x="${f(mxp+dx*13)}" y="${f(myp+dy*13+4)}" text-anchor="middle" font-size="11" fill="${PC}" font-weight="700" class="rv" style="--d:${f(d)}s">${i+1}</text>`;}});}
 else s+=`<polygon points="${boundary(cells).map(e=>X(e[0][0])+','+Y(e[0][1])).join(' ')}" fill="none" stroke="#dfe8f5" stroke-width="2.5"/>`;
 if(o.peri&&o.periAnim){const B=boundary(cells),st=o.pstep||Math.min(.3,6/B.length),t0=o.p0||.3,pth='M'+B.map(e=>X(e[0][0])+' '+Y(e[0][1])).join(' L')+' Z';
  s+=`<g opacity="0"><set attributeName="opacity" to="1" begin="${f(t0)}s" fill="freeze"/><animateMotion path="${pth}" dur="${f(B.length*st)}s" begin="${f(t0)}s" rotate="auto" fill="freeze"/><g transform="scale(-1,1)"><circle r="${u>26?15:12}" fill="#fff7ed" stroke="${PC}" stroke-width="2.5"/><text text-anchor="middle" dominant-baseline="central" font-size="${u>26?20:15}">🐜</text></g></g>`;}
 
 (o.lab||[]).forEach(l=>{s+=`<text x="${f(l.x!=null?X(l.x):0)}" y="${f(l.y!=null?Y(l.y):0)}" text-anchor="${l.ta||'middle'}" font-size="16" font-weight="800" fill="${l.c}" ${l.d!=null?`class="rv" style="--d:${l.d}s"`:''}>${l.t}</text>`;});
 if(o.lw!=null)s+=`<text x="${X(mx/2)}" y="${Y(0)-10}" text-anchor="middle" font-size="16" font-weight="800" fill="${WC}">${o.lw}</text>`;
 if(o.lh!=null)s+=`<text x="${X(mx)+8}" y="${Y(my/2)+6}" text-anchor="start" font-size="16" font-weight="800" fill="${HC}">${o.lh}</text>`;
 if(o.count){const n=o.count==='S'?cells.length:boundary(cells).length,col=o.count==='S'?SC:PC,lbl=o.count==='S'?'שטח':'היקף',t0=o.count==='S'?(o.d0||.4):(o.p0||.3),st=o.count==='S'?(o.step||Math.min(.35,6/cells.length)):(o.pstep||Math.min(.3,6/n));
  for(let i=1;i<=n;i++)s+=`<g class="rv" style="--d:${f(t0+(i-1)*st)}s"><rect x="${W/2-70}" y="${H-32}" width="140" height="28" rx="14" fill="#13233a" stroke="${col}" stroke-width="2"/><text x="${W/2}" y="${H-12}" text-anchor="middle" font-size="16" font-weight="800" fill="${col}" direction="rtl">${lbl}: ${i} / ${n}</text></g>`;}
 return s+'</svg>';}
/* schematic rectangle (no grid) for bigger numbers */
function Rs(a,b,o={}){const k=Math.min(220/Math.max(a,b),26),w=Math.max(60,a*k),h=Math.max(44,b*k),W=w+90,H=h+70,x=45,y=34;
 let s=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:300px;direction:ltr;font-family:Rubik" role="img" aria-label="מלבן">`;
 s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${o.fill?SC:'#ffffff'}" fill-opacity="${o.fill?.35:.05}" stroke="${o.peri?PC:'#dfe8f5'}" stroke-width="${o.peri?5:2.5}" ${o.anim?'class="drawl"':''}/>`;
 if(o.sq)s+=[[x+w/2,y],[x+w/2,y+h],[x,y+h/2],[x+w,y+h/2]].map(([cx,cy],i)=>i<2?`<line x1="${cx}" y1="${cy-7}" x2="${cx}" y2="${cy+7}" stroke="#ffb020" stroke-width="3"/>`:`<line x1="${cx-7}" y1="${cy}" x2="${cx+7}" y2="${cy}" stroke="#ffb020" stroke-width="3"/>`).join('');
 s+=`<text x="${x+w/2}" y="${y-10}" text-anchor="middle" font-size="16" font-weight="800" fill="${WC}" direction="rtl">${o.lw!=null?o.lw:a+' '+(o.u||CM)}</text>`;
 s+=`<text x="${x+w+8}" y="${y+h/2+6}" text-anchor="start" font-size="16" font-weight="800" fill="${HC}" direction="rtl">${o.lh!=null?o.lh:b+' '+(o.u||CM)}</text>`;
 if(o.mid)s+=`<text x="${x+w/2}" y="${y+h/2+6}" text-anchor="middle" font-size="16" font-weight="800" fill="${o.midc||SC}" direction="rtl">${o.mid}</text>`;
 return s+'</svg>';}
const RN=()=>{let w,h;do{w=R(2,7);h=R(2,6);}while(w===h);return [w,h];};
/* ===== ★ ידע: סופרים וזיהוי ===== */
function gCount(){const [w,h]=RN(),ask=pick(['S','P']),S=w*h,P=2*(w+h);
 return {kind:ask==='S'?'סופרים שטח':'סופרים היקף',rc:ask==='S'?2:1,text:`כל משבצת היא ${M('1 '+CM)} על ${M('1 '+CM)}. ${ask==='S'?'כמה משבצות יש <b>בפנים</b>? מה <b>השטח</b>?':'כמה צעדים של משבצת יש <b>מסביב</b>? מה <b>ההיקף</b>?'}`,
  ans:[{label:ask==='S'?'שטח =':'היקף =',col:ask==='S'?SC:PC,val:ask==='S'?S:P,unit:ask==='S'?CM2:CM}],
  dia:hl=>G({w,h,fill:hl&&ask==='S',fillAnim:hl&&ask==='S',num:hl,peri:hl&&ask==='P',periAnim:hl&&ask==='P',count:hl?ask:null}),
  lines:ask==='S'?[`בכל שורה ${C(w,WC)} משבצות, ויש ${C(h,HC)} שורות.`,`${M(C(w,WC)+' · '+C(h,HC)+' = '+S)} ← השטח ${M(S)} ${CM2}`]:[`סופרים את הצלעות הקטנות מסביב: ${M(C(w,WC)+' + '+C(h,HC)+' + '+C(w,WC)+' + '+C(h,HC)+' = '+P)}`,`ההיקף ${M(P)} ${CM}`],
  rule:ask==='S'?'שטח = כמה משבצות יש בפנים.':'היקף = כמה צעדים יש מסביב, לאורך הגבול.',
  diag:({vals:[v]})=>ask==='S'&&v===P?'ספרתם את <b>הגבול</b> מסביב, וזה ההיקף. השטח הוא המשבצות <b>בפנים</b>.':ask==='P'&&v===S?'ספרתם את המשבצות <b>בפנים</b>, וזה השטח. ההיקף הוא הצעדים <b>מסביב</b>.':ask==='P'&&v===w+h?'ספרתם רק שתי צלעות. הולכים <b>מסביב לכל הצורה</b>: 4 צלעות.':null};}
const SIT=[['גדר סביב גינה','P'],['דשא שמכסה את הגינה','S'],['שטיח לחדר','S'],['פס קישוט סביב תמונה','P'],['סרט סביב מתנה מרובעת','P'],['אריחים לרצפה','S'],['צבע לקיר','S'],['ריצה מסביב למגרש','P'],['מפה שמכסה שולחן','S'],['מסגרת לחלון','P']];
function gWhich(){const [t,k]=pick(SIT);
 return {kind:'שטח או היקף?',rc:0,text:`מה צריך לחשב בשביל: <b>${t}</b>?`,...CH([{t:`${C('היקף',PC)}: מה שמסביב`,ok:k==='P',msg:`כאן מכסים את כל מה שבפנים, ולכן זה <b>${C('שטח',SC)}</b>.`},{t:`${C('שטח',SC)}: מה שבפנים`,ok:k==='S',msg:`כאן הולכים רק לאורך הגבול, ולכן זה <b>${C('היקף',PC)}</b>.`}]),
  dia:hl=>G({w:5,h:3,fill:k==='S',fillAnim:hl&&k==='S',peri:k==='P',periAnim:hl&&k==='P'}),
  lines:[k==='P'?`${t}: הולכים <b>מסביב</b> ← ${C('היקף',PC)}.`:`${t}: מכסים את <b>כל מה שבפנים</b> ← ${C('שטח',SC)}.`],rule:'מסביב (גבול) = היקף. מכסה את הפנים = שטח.'};}
function gUnit(){const k=pick(['P','S']);
 return {kind:'יחידות',rc:6,text:`באיזו יחידה כותבים <b>${k==='P'?'היקף':'שטח'}</b> של מלבן שצלעותיו נמדדות בסנטימטרים?`,...CH([{t:CM+' (סנטימטר)',ok:k==='P',msg:`שטח מודדים במשבצות של ${M('1 '+CM)} על ${M('1 '+CM)} ← <b>${CM2}</b> (סנטימטר רבוע).`},{t:CM2+' (סנטימטר רבוע)',ok:k==='S',msg:`היקף הוא אורך, כמו חוט מסביב ← <b>${CM}</b>.`}]),
  dia:hl=>hl?G({w:3,h:2,fill:k==='S',peri:k==='P'}):'',lines:[k==='P'?`היקף הוא <b>אורך</b> ← ${CM}.`:`שטח הוא <b>מספר משבצות</b> של ${M('1 '+CM)} על ${M('1 '+CM)} ← ${CM2}.`],rule:`היקף ב־${CM}, שטח ב־${CM2}.`};}
/* ===== ★★ יישום: מחשבים ===== */
function gCalc(sq){sq=sq!=null?sq:Math.random()<.35;const a=R(3,12),b=sq?a:(()=>{let t;do{t=R(2,10);}while(t===a);return t;})(),ask=pick(['P','S']),P=2*(a+b),S=a*b,sh=sq?'ריבוע':'מלבן';
 return {kind:(ask==='P'?'היקף ':'שטח ')+sh,rc:sq?5:(ask==='P'?4:3),text:`חשבו את ${ask==='P'?'<b>ההיקף</b>':'<b>השטח</b>'} של ה${sh}.`,ans:[{label:ask==='P'?'היקף =':'שטח =',col:ask==='P'?PC:SC,val:ask==='P'?P:S,unit:ask==='P'?CM:CM2}],
  work:[{t:`מה מחשבים כאן?`,choice:ask==='P'?['היקף ← מחברים את הצלעות מסביב','שטח ← רוחב כפול גובה']:['היקף ← מחברים את הצלעות מסביב','שטח ← רוחב כפול גובה'],correct:ask==='P'?0:1,why:'היקף = הגבול מסביב (מחברים). שטח = מה שבפנים (כופלים).'},ask==='P'?{t:sq?`${M('4 · '+a+' = ?')}`:`${M(a+' + '+b+' + '+a+' + '+b+' = ?')}`,ans:[{label:'',val:P}],why:sq?'לריבוע <b>4</b> צלעות שוות.':'למלבן <b>4</b> צלעות: שני רוחבים ושני גבהים.'}:{t:`${M(a+' · '+b+' = ?')}`,ans:[{label:'',val:S}],why:'בשטח <b>כופלים</b>. בדקו בלוח הכפל.'}],
  dia:hl=>Rs(a,b,{sq,fill:hl&&ask==='S',peri:hl&&ask==='P',anim:hl,mid:hl?(ask==='S'?M(a+' · '+b+' = '+S):''):''}),
  lines:sq?(ask==='P'?[`בריבוע 4 צלעות שוות: ${M('4 · '+C(a,WC)+' = '+P)} ${CM}`]:[`${M(C(a,WC)+' · '+C(a,HC)+' = '+S)} ${CM2}`]):(ask==='P'?[`מסביב: ${M(C(a,WC)+' + '+C(b,HC)+' + '+C(a,WC)+' + '+C(b,HC)+' = '+P)} ${CM}`,`או בקיצור: ${M('2 · ('+a+' + '+b+') = '+P)}`]:[`שטח = רוחב · גובה: ${M(C(a,WC)+' · '+C(b,HC)+' = '+S)} ${CM2}`]),
  rule:ask==='P'?(sq?'היקף ריבוע = 4 · צלע.':'היקף מלבן = סכום 4 הצלעות.'):(sq?'שטח ריבוע = צלע · צלע.':'שטח מלבן = רוחב · גובה.'),
  diag:({vals:[v]})=>ask==='P'&&v===S?'חישבתם <b>שטח</b>. היקף = <b>מחברים</b> את כל הצלעות מסביב.':ask==='S'&&v===P?'חישבתם <b>היקף</b>. שטח = <b>כופלים</b> רוחב · גובה.':ask==='P'&&v===a+b?'חיברתם רק 2 צלעות. למלבן יש <b>4</b> צלעות.':ask==='S'&&v===a+b?'<b>חיברתם</b>. בשטח <b>כופלים</b>: רוחב · גובה.':null};}
function gBoth(){const [w,h]=RN();
 return {kind:'שטח וגם היקף',rc:7,text:`למלבן רוחב ${M(w+' '+CM)} וגובה ${M(h+' '+CM)}. חשבו גם את ההיקף וגם את השטח.`,ans:[{label:'היקף =',col:PC,val:2*(w+h),unit:CM},{label:'שטח =',col:SC,val:w*h,unit:CM2}],
  dia:hl=>G({w,h,fill:hl,peri:hl,lw:w,lh:h}),lines:[`${C('היקף',PC)}: ${M(w+' + '+h+' + '+w+' + '+h+' = '+2*(w+h))} ${CM}`,`${C('שטח',SC)}: ${M(w+' · '+h+' = '+w*h)} ${CM2}`],rule:'היקף = מחברים את הצלעות. שטח = כופלים רוחב · גובה.',
  diag:({vals:[p,s]})=>p===w*h&&s===2*(w+h)?'<b>החלפתם</b>! מחברים בשביל היקף, וכופלים בשביל שטח.':null};}
/* ===== ★★★ הבנה: הפוך ===== */
function gRevS(){const [w,h]=[R(2,9),R(2,9)],S=w*h;
 return {kind:'מוצאים צלע מהשטח',rc:3,text:`שטח המלבן ${M(S+' '+CM2)}, והרוחב ${M(w+' '+CM)}. מה הגובה?`,ans:[{label:'גובה =',col:HC,val:h,unit:CM}],work:[{t:`${M(w+' · ? = '+S)}. מה הפעולה ההפוכה לכפל?`,choice:['חילוק','חיסור','חיבור'],correct:0,why:'ההפך מכפל הוא <b>חילוק</b>.'},{t:`${M(S+' : '+w+' = ?')}`,ans:[{label:'',val:h}],why:`חושבים: ${M(w)} כפול כמה נותן ${M(S)}?`}],
  dia:hl=>hl&&S<=48?G({w,h,fill:1,fillAnim:1,lw:w,lh:'?',step:.08}):Rs(w,h,{lh:'?',mid:M(S+' '+CM2)}),
  lines:[`${M(C(w,WC)+' · ? = '+S)}`,`איזה מספר כפול ${w} נותן ${S}? מחלקים: ${M(S+' : '+w+' = '+h)}`,`בדיקה: ${M(w+' · '+h+' = '+S)} ✓`],rule:'נתון שטח ורוחב ← גובה = שטח : רוחב.',
  diag:({vals:[v]})=>v===S-w?'<b>חיסרתם</b>. בשטח כופלים, ולכן ההפך הוא <b>חילוק</b>: שטח : רוחב.':v===S*w?'כפלתם. מחפשים מספר ש־'+w+' כפול אותו נותן '+S+' ← <b>מחלקים</b>.':null};}
function gRevP(){const [w,h]=RN(),P=2*(w+h);
 return {kind:'מוצאים צלע מההיקף',rc:4,text:`היקף המלבן ${M(P+' '+CM)}, והרוחב ${M(w+' '+CM)}. מה הגובה?`,ans:[{label:'גובה =',col:HC,val:h,unit:CM}],work:[{t:`למלבן שני רוחבים: ${M('2 · '+w+' = ?')}`,ans:[{label:'',val:2*w}],why:'יש <b>שני</b> רוחבים שווים.'},{t:`מה נשאר לשני הגבהים? ${M(P+' − '+2*w+' = ?')}`,ans:[{label:'',val:2*h}],why:'מורידים מההיקף את שני הרוחבים.'},{t:`גובה אחד: ${M(2*h+' : 2 = ?')}`,ans:[{label:'',val:h}],why:'נשארו <b>שני</b> גבהים שווים ← מחלקים ב־2.'}],
  dia:hl=>Rs(w,h,{lh:'?',peri:hl}),lines:[`שני רוחבים: ${M('2 · '+C(w,WC)+' = '+2*w)}`,`מה שנשאר לשני הגבהים: ${M(P+' − '+2*w+' = '+2*h)}`,`גובה אחד: ${M(2*h+' : 2 = '+h)}`,`בדיקה: ${M(w+' + '+h+' + '+w+' + '+h+' = '+P)} ✓`],
  rule:'נתון היקף ורוחב ← מורידים 2 רוחבים, ומחלקים את מה שנשאר ב־2.',
  diag:({vals:[v]})=>v===P-w?'הורדתם רק רוחב <b>אחד</b>. יש 2 רוחבים, ואחרי זה עוד 2 גבהים.':v===P-2*w?`זה הסכום של <b>שני</b> הגבהים. מחלקים ב־2.`:v===P/2?'חציתם את ההיקף, אבל עוד לא הורדתם את הרוחב.':null};}
function gSqRev(){const a=R(2,12),t=pick(['P','S']),P=4*a,S=a*a;
 return {kind:t==='P'?'ריבוע: מהיקף לצלע':'ריבוע: משטח לצלע',rc:5,text:`${t==='P'?`היקף הריבוע ${M(P+' '+CM)}`:`שטח הריבוע ${M(S+' '+CM2)}`}. מה אורך הצלע?`,ans:[{label:'צלע =',col:WC,val:a,unit:CM}],
  dia:hl=>Rs(a,a,{sq:1,lw:'?',lh:'?',peri:hl&&t==='P',fill:hl&&t==='S'}),lines:t==='P'?[`בריבוע 4 צלעות שוות: ${M(P+' : 4 = '+a)}`,`בדיקה: ${M('4 · '+a+' = '+P)} ✓`]:[`מחפשים מספר שכפול עצמו נותן ${S}: ${M(a+' · '+a+' = '+S)}`,`הצלע ${M(a)} ${CM}`],
  rule:t==='P'?'צלע ריבוע = היקף : 4.':'שטח ריבוע = צלע · צלע ← מחפשים מספר שכפול עצמו נותן את השטח.',
  diag:({vals:[v]})=>t==='P'&&v===P/2?'בריבוע יש <b>4</b> צלעות שוות, לא 2. מחלקים ב־4.':t==='S'&&v===S/2?`חילקתם ב־2. מחפשים מספר שכפול <b>עצמו</b> נותן ${S}.`:t==='S'&&v===S/4?'חילקתם ב־4, כמו בהיקף. בשטח מחפשים צלע · צלע.':null};}
/* ===== ★★★★ חשיבה ואוריינות ===== */
function gSameP(){const P=pick([12,16,20,24]),half=P/2,opts=[];for(let w=1;w<half;w++){const h=half-w;if(w<=h)opts.push([w,h]);}
 const sel=shuf(opts).slice(0,Math.min(3,opts.length)),best=sel.reduce((a,b)=>a[0]*a[1]>=b[0]*b[1]?a:b);
 return {kind:'אותו היקף, שטח אחר',rc:7,text:`לכל המלבנים האלה היקף ${M(P+' '+CM)}. לאיזה מהם <b>השטח הגדול ביותר</b>?`,...CH(sel.map(([w,h])=>({t:M(w+' '+CM+' על '+h+' '+CM),ok:w===best[0],msg:`השטח שלו ${M(w+' · '+h+' = '+w*h)}. חשבו גם את האחרים.`}))),
  dia:hl=>hl?G({w:best[1],h:best[0],fill:1,peri:1}):'',lines:sel.map(([w,h])=>`${M(w+' · '+h+' = '+w*h)}`).concat([`אותו היקף לא אומר אותו שטח. ככל שהמלבן קרוב יותר לריבוע, השטח גדול יותר.`]),rule:'מלבנים עם אותו היקף יכולים להיות בעלי שטחים שונים.'};}
function gL(){const W=R(4,6),H=R(4,6),cw=R(1,W-2),ch=R(1,H-2),cells=rectCells(W,H).filter(([x,y])=>!(x>=W-cw&&y<ch)),S=cells.length,ask=pick(['S','S','P']),Pp=boundary(cells).length;
 return {kind:ask==='S'?'צורה מורכבת: שטח':'צורה מורכבת: היקף',rc:ask==='S'?8:1,text:`כל משבצת היא ${M('1 '+CM)} על ${M('1 '+CM)}. מה ${ask==='S'?'<b>השטח</b>':'<b>ההיקף</b>'} של הצורה?`,ans:[{label:ask==='S'?'שטח =':'היקף =',col:ask==='S'?SC:PC,val:ask==='S'?S:Pp,unit:ask==='S'?CM2:CM}],
  dia:hl=>G({cells,fill:hl&&ask==='S',peri:hl&&ask==='P',periAnim:hl&&ask==='P',num:hl&&ask==='P'}),
  lines:ask==='S'?[`דרך א׳: המלבן השלם ${M(W+' · '+H+' = '+W*H)}, פחות החלק החסר ${M(cw+' · '+ch+' = '+cw*ch)}`,`${M(W*H+' − '+cw*ch+' = '+S)} ${CM2}`,`דרך ב׳: מחלקים לשני מלבנים ומחברים את השטחים.`]:[`הולכים מסביב וסופרים כל צעד: ${M(Pp)} ${CM}`,`גילוי: ההיקף שווה להיקף המלבן השלם ${M('2 · ('+W+' + '+H+') = '+2*(W+H))}! הפינה שנחתכה רק "הוזזה פנימה".`],
  rule:ask==='S'?'צורה מורכבת: מחלקים למלבנים, או מחסרים את החלק החסר מהמלבן השלם.':'היקף צורה מורכבת: הולכים מסביב לכל הגבול.',
  diag:({vals:[v]})=>ask==='S'&&v===W*H?'זה שטח המלבן <b>השלם</b>. צריך להוריד את החלק החסר בפינה.':ask==='P'&&v===S?'ספרתם משבצות בפנים (שטח). היקף = צעדים מסביב.':null};}
function gDouble(){const [w,h]=RN(),nm=pick(['נועה','איתי','מאיה','יואב','דניאל']);
 return {kind:'מוצאים את הטעות',rc:7,text:`${nm} אומר/ת: ״אם מכפילים את הרוחב וגם את הגובה של מלבן פי 2, גם השטח גדל פי 2.״ בדקו עם מלבן ${M(w+' על '+h)}. מה נכון?`,...CH([{t:'השטח גדל פי 4',ok:1},{t:`${nm} צודק/ת: פי 2`,msg:`בדקו: ${M(w+' · '+h+' = '+w*h)}, ואחרי ההכפלה ${M(2*w+' · '+2*h+' = '+4*w*h)}. זה פי 4!`},{t:'השטח לא משתנה',msg:'הצלעות גדלו, ולכן גם השטח גדל. בדקו בחישוב.'},{t:'השטח גדל פי 8',msg:`${M(4*w*h+' : '+w*h+' = 4')}. פי 4, לא פי 8.`}]),
  dia:hl=>hl?G({w:2*w,h:2*h,fill:1,lab:[]}):'',lines:[`לפני: ${M(w+' · '+h+' = '+w*h)}`,`אחרי: ${M(2*w+' · '+2*h+' = '+4*w*h)}`,`${M(4*w*h+' : '+w*h+' = 4')} ← פי 4: נכנסים 4 עותקים של המלבן הקטן.`],rule:'מכפילים את שתי הצלעות פי 2 ← השטח גדל פי 4 (וההיקף פי 2).'};}
const WORD=[
 ()=>{const a=R(6,15),b=R(3,9),pr=pick([5,10,20]),P=2*(a+b);return {kind:'בעיה מילולית',rc:4,text:`גינה מלבנית באורך ${M(a+' '+MM)} וברוחב ${M(b+' '+MM)}. רוצים להקיף אותה בגדר. מטר גדר עולה ${M(pr)} ש״ח. כמה תעלה הגדר?`,ans:[{label:'מחיר =',col:PC,val:P*pr,unit:'ש״ח'}],
  dia:hl=>Rs(a,b,{u:MM,peri:hl}),lines:[`גדר = <b>מסביב</b> ← ${C('היקף',PC)}: ${M(a+' + '+b+' + '+a+' + '+b+' = '+P)} ${MM}`,`${M(P+' · '+pr+' = '+P*pr)} ש״ח`],rule:'גדר = היקף. אחר כך כופלים במחיר למטר.',
  diag:({vals:[v]})=>v===a*b*pr?`חישבתם לפי <b>שטח</b>. גדר הולכת מסביב ← היקף.`:v===P?'זה אורך הגדר. עכשיו כופלים במחיר של מטר.':null};},
 ()=>{const a=R(3,8),b=R(2,6);return {kind:'בעיה מילולית',rc:3,text:`רצפה של חדר מלבני היא ${M(a+' '+MM)} על ${M(b+' '+MM)}. כל אריח הוא ${M('1 '+MM)} על ${M('1 '+MM)}. כמה אריחים צריך?`,ans:[{label:'אריחים =',col:SC,val:a*b,unit:''}],
  dia:hl=>G({w:a,h:b,fill:hl,fillAnim:hl,num:hl}),lines:[`אריחים מכסים את <b>כל הרצפה</b> ← ${C('שטח',SC)}`,`${M(a+' · '+b+' = '+a*b)} אריחים`],rule:'מכסים את הפנים ← שטח.',
  diag:({vals:[v]})=>v===2*(a+b)?'חישבתם <b>היקף</b>. אריחים מכסים את כל הרצפה ← שטח.':null};},
 ()=>{const a=R(4,10);return {kind:'בעיה מילולית',rc:5,text:`מסגרת לתמונה ריבועית שצלעה ${M(a+' '+CM)}. כמה סנטימטרים של פס זהב צריך כדי להקיף את כל התמונה?`,ans:[{label:'אורך =',col:PC,val:4*a,unit:CM}],
  dia:hl=>Rs(a,a,{sq:1,peri:hl}),lines:[`פס מסביב ← ${C('היקף',PC)}`,`ריבוע: ${M('4 · '+a+' = '+4*a)} ${CM}`],rule:'מסביב ← היקף. ריבוע: 4 · צלע.',
  diag:({vals:[v]})=>v===a*a?'חישבתם שטח. פס מסביב ← היקף.':v===2*a?'ספרתם רק 2 צלעות. לריבוע יש 4.':null};}];
function gWord(){return pick(WORD)();}
/* ===== levels ===== */
const LAD=[
 [{g:gWhich,n:5,h:2},{g:gUnit,n:3,h:2},{g:()=>{const q=gCount();return q;},n:6,h:1},{g:gCount,n:6,h:0}],
 [{g:()=>gCalc(false),n:6,h:2},{g:()=>gCalc(true),n:5,h:1},{g:gBoth,n:5,h:1},{g:()=>gCalc(),n:4,h:0}],
 [{g:gRevS,n:6,h:2},{g:gRevP,n:6,h:1},{g:gSqRev,n:8,h:0}],
 [{g:gWord,n:6,h:1},{g:gL,n:5,h:1},{g:gSameP,n:5,h:0},{g:gDouble,n:4,h:0}]];
const LEVELS=[
 {n:1,t:'רואים וסופרים',d:'שטח או היקף? ← יחידות ← סופרים משבצות וצעדים',ladder:LAD[0]},
 {n:2,t:'מחשבים',d:'שטח מלבן ← ריבוע ← גם וגם',ladder:LAD[1]},
 {n:3,t:'הפוך: מוצאים צלע',d:'מהשטח ← מההיקף ← ריבוע',ladder:LAD[2]},
 {n:4,t:'חשיבה ואוריינות',d:'בעיות מילוליות ← צורה מורכבת ← אותו היקף ← טעויות',ladder:LAD[3]}];
LEVELS.forEach(l=>l.g=()=>pick(l.ladder).g());
const TEST=[[gWhich,gCount,gUnit,gCount],[()=>gCalc(false),()=>gCalc(true),gBoth,()=>gCalc(false)],[gRevS,gRevP,gSqRev,gRevS],[gWord,gL,gSameP,gDouble]];
const WARM=[gWhich,gCount,gWhich,gCount,gUnit,gCount,gWhich,gCount];
/* ===== animated explanation ===== */
const RECAP=[
 {h:'למה צריך את זה?',d:1.4,svg:()=>G({w:6,h:4,fill:1,fillAnim:1,d0:2.2,step:.05,peri:1,periAnim:1,pstep:.08,lab:[{x:3,y:-0.35,t:'🌱',c:'#fff'}]}),
  says:[`גדר מסביב לגינה ← ${C('היקף',PC)}`,`דשא בפנים ← ${C('שטח',SC)}`],what:'מסביב = היקף. בפנים = שטח.'},
 {h:`${'היקף'}: הולכים מסביב`,d:3.2,svg:()=>G({w:6,h:4,peri:1,periAnim:1,num:1,count:'P',p0:.4,pstep:.28}),
  says:[`${M(C('6',WC)+' + '+C('4',HC)+' + '+C('6',WC)+' + '+C('4',HC)+' = 20')} ${CM}`],what:'היקף = כמה צעדים מסביב.'},
 {h:`${'שטח'}: ממלאים את הפנים`,d:3.4,svg:()=>G({w:6,h:4,fill:1,fillAnim:1,num:1,count:'S',d0:.4,step:.2}),
  says:[`סופרים משבצות: ${M('24')} ${CM2}`],what:'שטח = כמה משבצות בפנים.'},
 {h:'מהספירה לנוסחה: שטח',d:1.4,svg:()=>G({w:6,h:4,fill:1,lw:'6',lh:'4'}),
  says:[`${C('4',HC)} שורות של ${C('6',WC)}`,`${M(C('6',WC)+' · '+C('4',HC)+' = 24')}`],what:`שטח = ${C('רוחב',WC)} · ${C('גובה',HC)}`},
 {h:'מהספירה לנוסחה: היקף',d:1.4,svg:()=>G({w:6,h:4,peri:1,lw:'6',lh:'4'}),
  says:[`2 ${C('רוחבים',WC)} + 2 ${C('גבהים',HC)}`,`${M('6 + 4 + 6 + 4 = 20')}`],what:'היקף מחברים. שטח כופלים.'},
 {h:'ריבוע: כל הצלעות שוות',d:1.4,svg:()=>G({w:4,h:4,fill:1,peri:1,lw:'4',lh:'4'}),
  says:[`${C('היקף',PC)} = 4 · צלע = ${M('16')} ${CM}`,`${C('שטח',SC)} = צלע · צלע = ${M('16')} ${CM2}`],what:'16 צעדים ≠ 16 משבצות.'},
 {h:'יחידות: ס״מ או סמ״ר?',d:1.4,svg:()=>G({w:1,h:1,fill:1,peri:1,lab:[{x:.5,y:-0.4,t:'1 '+CM,c:WC},{x:1.6,y:.62,t:'1 '+CM,c:HC,ta:'start'}]}),
  says:[`${C('היקף',PC)} = אורך ← ${CM}`,`${C('שטח',SC)} = משבצות ← ${CM2}`],what:'כל תשובה עם יחידה מתאימה.'},
 {h:'הטעות הנפוצה',d:1.4,svg:()=>G({w:5,h:3,fill:1,peri:1,lw:'5',lh:'3'}),
  says:[`היקף ${M('= 5 · 3')} <span class="x">✗</span> כפלו במקום לחבר!`,`${C('היקף',PC)} ${M('= 5 + 3 + 5 + 3 = 16')} <span class="v">✓</span>`],what:'מסביב ← מחברים. בפנים ← כופלים.'},
 {h:'צורה מורכבת',d:1.4,svg:()=>G({cells:rectCells(5,4).filter(([x,y])=>!(x>=3&&y<2)),fill:1}),
  says:[`מחלקים לשני מלבנים:`,`${M('3 · 4 + 2 · 2 = 12 + 4 = 16')}`],what:'צורה קשה ← כמה מלבנים.'}];
