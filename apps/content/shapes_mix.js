/*META {"id":"shapes_mix","title":"שטח, היקף וזוויות · מלבן, ריבוע, משולש ומעגל · ערכה: רוני מודן","short":"שטח והיקף","topic":"שטח, היקף, זוויות ויחסי הכלה","glyph":"S·P","color":"#ffb020"} */
/* אפליקציה משולבת: מלבן וריבוע (שטח, היקף), יחסי הכלה, סכום זוויות במשולש ובמרובע, שטח משולש, מעגל (רדיוס, קוטר, היקף, שטח עם π).
   צבעים קבועים: רוחב ירוק, גובה סגול, היקף כתום, שטח כחול, רדיוס ורוד, זווית צהובה. כל פתרון נחשף בהנפשה. */
const APP={key:'shapes_mix',topic:'שטח, היקף, זוויות ויחסי הכלה',sub:'מלבן, ריבוע, משולש ומעגל. רואים בציור, מבינים למה, ורק אז נוסחה. כל פתרון מוצג בהנפשה, צעד אחרי צעד.'};
const C=(t,c)=>`<span style="color:${c}">${t}</span>`;
const CM='ס״מ',CM2='סמ״ר',MM='מ׳',MM2='מ״ר',DG='°';
const WC=GR,HC=PU,PC=OR,SC=BL,RC=RD,AN='#ffd27a';
const CK=(lab,opts,ok,why)=>{const o=shuf(opts);return {lab,choice:o,correct:o.indexOf(ok),why};};
const SH=(o,k)=>{const s=shuf(o);return {choice:s,correct:s.indexOf(o[k])};};
function CH(o){const s=shuf(o);return {choice:s.map(x=>x.t),correct:s.findIndex(x=>x.ok),diag:({sel})=>s[sel]&&!s[sel].ok&&s[sel].msg||null};}
const NB='<div style="font-size:13px;opacity:.75;text-align:right">השרטוט אינו לפי קנה מידה</div>';
/* ===== משבצות: צורה מתאי יחידה (מילוי וגבול מונפשים) ===== */
const key=(x,y)=>x+','+y;
function rectCells(w,h){const c=[];for(let y=0;y<h;y++)for(let x=0;x<w;x++)c.push([x,y]);return c;}
function boundary(cells){const S=new Set(cells.map(([x,y])=>key(x,y))),E=[];
 cells.forEach(([x,y])=>{if(!S.has(key(x,y-1)))E.push([[x,y],[x+1,y]]);if(!S.has(key(x+1,y)))E.push([[x+1,y],[x+1,y+1]]);if(!S.has(key(x,y+1)))E.push([[x+1,y+1],[x,y+1]]);if(!S.has(key(x-1,y)))E.push([[x,y+1],[x,y]]);});
 const nx={};E.forEach(e=>nx[key(...e[0])]=e);const out=[];let e=E.reduce((a,b)=>(b[0][1]<a[0][1]||(b[0][1]===a[0][1]&&b[0][0]<a[0][0]))?b:a);const start=key(...e[0]);
 do{out.push(e);e=nx[key(...e[1])];}while(e&&key(...e[0])!==start&&out.length<=E.length);return out;}
function G(o){const cells=o.cells||rectCells(o.w,o.h),mx=Math.max(...cells.map(c=>c[0]))+1,my=Math.max(...cells.map(c=>c[1]))+1;
 const u=Math.min(34,Math.floor(250/Math.max(mx,my))),pad=34,W=mx*u+pad*2,H=my*u+pad*2+(o.count?34:0),X=x=>pad+x*u,Y=y=>pad+y*u;
 let s=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${Math.min(360,W*1.3)}px;direction:ltr;font-family:Rubik" role="img" aria-label="צורה על משבצות">`;
 cells.forEach(([x,y],i)=>{const d=o.fillAnim?(o.d0||.4)+i*(o.step||Math.min(.35,6/cells.length)):0;
  s+=`<rect x="${X(x)+1.5}" y="${Y(y)+1.5}" width="${u-3}" height="${u-3}" rx="3" fill="${o.fill?SC:'#ffffff'}" fill-opacity="${o.fill?.42:.05}" stroke="#2c4566" stroke-width="1" ${o.fillAnim?`class="rv" style="--d:${f(d)}s"`:''}/>`;
  if(o.fillAnim&&o.num)s+=`<text x="${X(x)+u/2}" y="${Y(y)+u/2+5}" text-anchor="middle" font-size="${u>26?13:10}" fill="#dfe8f5" class="rv" style="--d:${f(d)}s">${i+1}</text>`;});
 const B=boundary(cells);
 if(o.peri)B.forEach((e,i)=>{const d=o.periAnim?(o.p0||.3)+i*(o.pstep||Math.min(.3,6/B.length)):0;
   s+=`<line x1="${X(e[0][0])}" y1="${Y(e[0][1])}" x2="${X(e[1][0])}" y2="${Y(e[1][1])}" stroke="${PC}" stroke-width="5" stroke-linecap="round" ${o.periAnim?`class="rv" style="--d:${f(d)}s"`:''}/>`;
   if(o.periAnim&&o.num){const mxp=(X(e[0][0])+X(e[1][0]))/2,myp=(Y(e[0][1])+Y(e[1][1]))/2,dx=e[1][1]-e[0][1],dy=-(e[1][0]-e[0][0]);s+=`<text x="${f(mxp+dx*13)}" y="${f(myp+dy*13+4)}" text-anchor="middle" font-size="11" fill="${PC}" font-weight="700" class="rv" style="--d:${f(d)}s">${i+1}</text>`;}});
 else s+=`<polygon points="${B.map(e=>X(e[0][0])+','+Y(e[0][1])).join(' ')}" fill="none" stroke="#dfe8f5" stroke-width="2.5"/>`;
 if(o.lw!=null)s+=`<text x="${X(mx/2)}" y="${Y(0)-10}" text-anchor="middle" font-size="16" font-weight="800" fill="${WC}">${o.lw}</text>`;
 if(o.lh!=null)s+=`<text x="${X(mx)+8}" y="${Y(my/2)+6}" text-anchor="start" font-size="16" font-weight="800" fill="${HC}">${o.lh}</text>`;
 if(o.count){const n=o.count==='S'?cells.length:B.length,col=o.count==='S'?SC:PC,lbl=o.count==='S'?'שטח':'היקף',t0=o.count==='S'?(o.d0||.4):(o.p0||.3),st=o.count==='S'?(o.step||Math.min(.35,6/cells.length)):(o.pstep||Math.min(.3,6/n));
  for(let i=1;i<=n;i++)s+=`<g class="rv" style="--d:${f(t0+(i-1)*st)}s"><rect x="${W/2-70}" y="${H-32}" width="140" height="28" rx="14" fill="#13233a" stroke="${col}" stroke-width="2"/><text x="${W/2}" y="${H-12}" text-anchor="middle" font-size="16" font-weight="800" fill="${col}" direction="rtl">${lbl}: ${i} / ${n}</text></g>`;}
 return s+'</svg>';}
/* ===== מלבן סכמטי (מספרים גדולים) · ra = סימני זווית ישרה ===== */
function Rs(a,b,o={}){const k=Math.min(220/Math.max(a,b),26),w=Math.max(60,a*k),h=Math.max(44,b*k),W=w+90,H=h+70,x=45,y=34;
 let s=`<svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:300px;direction:ltr;font-family:Rubik" role="img" aria-label="מלבן">`;
 s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${o.fill?SC:'#ffffff'}" fill-opacity="${o.fill?.35:.05}" stroke="${o.peri?PC:'#dfe8f5'}" stroke-width="${o.peri?5:2.5}" ${o.anim?'class="drawl"':''}/>`;
 if(o.ra)[[x,y,1,1],[x+w,y,-1,1],[x+w,y+h,-1,-1],[x,y+h,1,-1]].forEach(([cx,cy,sx,sy],i)=>{s+=`<path d="M${cx+sx*14} ${cy} L${cx+sx*14} ${cy+sy*14} L${cx} ${cy+sy*14}" fill="none" stroke="${AN}" stroke-width="2.5" ${o.anim?`class="rv" style="--d:${.4+i*.35}s"`:''}/>`;});
 if(o.sq)s+=[[x+w/2,y],[x+w/2,y+h],[x,y+h/2],[x+w,y+h/2]].map(([cx,cy],i)=>i<2?`<line x1="${cx}" y1="${cy-7}" x2="${cx}" y2="${cy+7}" stroke="#ffb020" stroke-width="3"/>`:`<line x1="${cx-7}" y1="${cy}" x2="${cx+7}" y2="${cy}" stroke="#ffb020" stroke-width="3"/>`).join('');
 if(o.lw!==false)s+=`<text x="${x+w/2}" y="${y-10}" text-anchor="middle" font-size="16" font-weight="800" fill="${WC}" direction="rtl">${o.lw!=null?o.lw:a+' '+(o.u||CM)}</text>`;
 if(o.lh!==false)s+=`<text x="${x+w+8}" y="${y+h/2+6}" text-anchor="start" font-size="16" font-weight="800" fill="${HC}" direction="rtl">${o.lh!=null?o.lh:b+' '+(o.u||CM)}</text>`;
 if(o.mid)s+=`<text x="${x+w/2}" y="${y+h/2+6}" text-anchor="middle" font-size="16" font-weight="800" fill="${o.midc||SC}" direction="rtl" ${o.anim?'class="rv" style="--d:1.1s"':''}>${o.mid}</text>`;
 return s+'</svg>';}
/* ===== משולש לפי זוויות (A בבסיס שמאל, B בבסיס ימין) · lab=[A,B,C] · sum = שורת סכום מונפשת ===== */
function T(A,B,o={}){const L=200,ra=A*Math.PI/180,rb=B*Math.PI/180,ac=L*Math.sin(rb)/Math.sin(ra+rb),P0=[[0,0],[L,0],[ac*Math.cos(ra),-ac*Math.sin(ra)]];
 const xs=P0.map(p=>p[0]),ys=P0.map(p=>p[1]),mnx=Math.min(...xs),mny=Math.min(...ys),k=Math.min(240/(Math.max(...xs)-mnx),150/(-mny||1),1.3);
 const P=P0.map(([x,y])=>[30+(x-mnx)*k,24+(y-mny)*k]),H=Math.max(...P.map(p=>p[1]))+(o.sum?54:24),W=Math.max(...P.map(p=>p[0]))+30;
 const cx=(P[0][0]+P[1][0]+P[2][0])/3,cy=(P[0][1]+P[1][1]+P[2][1])/3,cols=o.cols||[GR,PU,AN],lab=o.lab||['','',''];
 let s=`<svg viewBox="0 0 ${f(W)} ${f(H)}" style="width:100%;max-width:300px;direction:ltr;font-family:Rubik" role="img" aria-label="משולש"><polygon points="${P.map(p=>f(p[0])+','+f(p[1])).join(' ')}" fill="#ffffff0d" stroke="#dfe8f5" stroke-width="2.5" ${o.an?'class="drawl"':''}/>`;
 P.forEach((p,i)=>{const q1=P[(i+1)%3],q2=P[(i+2)%3],a1=Math.atan2(q1[1]-p[1],q1[0]-p[0]),a2=Math.atan2(q2[1]-p[1],q2[0]-p[0]),r=22,cr=(q1[0]-p[0])*(q2[1]-p[1])-(q1[1]-p[1])*(q2[0]-p[0]);
  const d=o.an?`class="rv" style="--d:${.5+i*.5}s"`:'';
  if(o.right===i)s+=`<path d="M${f(p[0]+16*Math.cos(a1))} ${f(p[1]+16*Math.sin(a1))} L${f(p[0]+16*Math.cos(a1)+16*Math.cos(a2))} ${f(p[1]+16*Math.sin(a1)+16*Math.sin(a2))} L${f(p[0]+16*Math.cos(a2))} ${f(p[1]+16*Math.sin(a2))}" fill="none" stroke="${cols[i]}" stroke-width="3" ${d}/>`;
  else s+=`<path d="M${f(p[0]+r*Math.cos(a1))} ${f(p[1]+r*Math.sin(a1))} A${r} ${r} 0 0 ${cr>0?1:0} ${f(p[0]+r*Math.cos(a2))} ${f(p[1]+r*Math.sin(a2))} L${f(p[0])} ${f(p[1])} Z" fill="${cols[i]}" fill-opacity=".45" stroke="${cols[i]}" stroke-width="2" ${d}/>`;
  if(lab[i]!=='')s+=`<text x="${f(p[0]+(cx-p[0])*.42)}" y="${f(p[1]+(cy-p[1])*.42+6)}" text-anchor="middle" font-size="17" font-weight="900" fill="${cols[i]}" ${d}>${lab[i]}</text>`;});
 if(o.sum)s+=`<text x="${f(W/2)}" y="${f(H-14)}" text-anchor="middle" font-size="17" font-weight="800" fill="#f3f6fb" class="rv" style="--d:${o.an?2:0}s">${o.sum}</text>`;
 return s+'</svg>'+NB;}
/* ===== מרובע כללי עם תוויות זוויות ===== */
function Q(lab,o={}){const P=[[30,150],[250,160],[215,40],[75,25]],cx=142,cy=94,cols=[GR,PU,OR,AN];
 let s=`<svg viewBox="0 0 280 ${o.sum?215:185}" style="width:100%;max-width:300px;direction:ltr;font-family:Rubik" role="img" aria-label="מרובע"><polygon points="${P.map(p=>p.join(',')).join(' ')}" fill="#ffffff0d" stroke="#dfe8f5" stroke-width="2.5" ${o.an?'class="drawl"':''}/>`;
 P.forEach((p,i)=>{const d=o.an?`class="rv" style="--d:${.4+i*.45}s"`:'';s+=`<circle cx="${f(p[0]+(cx-p[0])*.16)}" cy="${f(p[1]+(cy-p[1])*.16)}" r="9" fill="${cols[i]}" fill-opacity=".5" ${d}/><text x="${f(p[0]+(cx-p[0])*.4)}" y="${f(p[1]+(cy-p[1])*.4+6)}" text-anchor="middle" font-size="17" font-weight="900" fill="${cols[i]}" ${d}>${lab[i]}</text>`;});
 if(o.sum)s+=`<text x="140" y="200" text-anchor="middle" font-size="17" font-weight="800" fill="#f3f6fb" class="rv" style="--d:${o.an?2.2:0}s">${o.sum}</text>`;
 return s+'</svg>'+NB;}
/* ===== שטח משולש: בסיס וגובה, ובהנפשה המלבן שמסביב ===== */
function TA(b,h,hl){const k=Math.min(220/b,130/h,24),w=b*k,hh=h*k,x=40,y=30,cx=x+w*.35;
 let s=`<svg viewBox="0 0 ${f(w+90)} ${f(hh+70)}" style="width:100%;max-width:300px;direction:ltr;font-family:Rubik" role="img" aria-label="משולש עם בסיס וגובה">`;
 if(hl)s+=`<rect x="${x}" y="${y}" width="${f(w)}" height="${f(hh)}" fill="none" stroke="${SC}" stroke-width="2" stroke-dasharray="6 5" class="rv" style="--d:.3s"/><polygon points="${x},${f(y+hh)} ${f(cx)},${y} ${x},${y}" fill="${SC}" fill-opacity=".18" class="rv" style="--d:1s"/><polygon points="${f(x+w)},${f(y+hh)} ${f(cx)},${y} ${f(x+w)},${y}" fill="${SC}" fill-opacity=".18" class="rv" style="--d:1.4s"/>`;
 s+=`<polygon points="${x},${f(y+hh)} ${f(x+w)},${f(y+hh)} ${f(cx)},${y}" fill="${SC}" fill-opacity=".45" stroke="#dfe8f5" stroke-width="2.5"/><line x1="${f(cx)}" y1="${y}" x2="${f(cx)}" y2="${f(y+hh)}" stroke="${HC}" stroke-width="3" stroke-dasharray="5 4"/><path d="M${f(cx)} ${f(y+hh-12)} h12 v12" fill="none" stroke="${HC}" stroke-width="2"/>`;
 s+=`<text x="${f(x+w/2)}" y="${f(y+hh+24)}" text-anchor="middle" font-size="16" font-weight="800" fill="${WC}" direction="rtl">בסיס ${b}</text><text x="${f(cx+8)}" y="${f(y+hh/2)}" text-anchor="end" font-size="16" font-weight="800" fill="${HC}" direction="rtl">גובה ${h}</text>`;
 if(hl)s+=`<text x="${f(x+w/2)}" y="${f(y-9)}" text-anchor="middle" font-size="14" font-weight="800" fill="${SC}" class="rv" style="--d:1.9s" direction="rtl">חצי מלבן</text>`;
 return s+'</svg>';}
/* ===== מעגל: m='r'|'d'|'none' · an = הנפשה ===== */
function CD(o={}){const m=o.m||'r',lab=o.lab!=null?o.lab:'',c=m==='d'?HC:RC,an=o.an?'class="drawl"':'';let seg='',tx='';
 if(m==='r'){seg=`<line x1="110" y1="110" x2="190" y2="110" stroke="${c}" stroke-width="6" stroke-linecap="round" ${an}/>`;tx=`<text x="150" y="100" fill="${c}" font-size="20" font-weight="900" text-anchor="middle" font-family="Rubik">${lab}</text>`;}
 if(m==='d'){seg=`<line x1="30" y1="110" x2="190" y2="110" stroke="${c}" stroke-width="6" stroke-linecap="round" ${an}/>`;tx=`<text x="110" y="100" fill="${c}" font-size="20" font-weight="900" text-anchor="middle" font-family="Rubik">${lab}</text>`;}
 return `<svg viewBox="0 0 220 220" style="display:block;margin:0 auto;width:100%;max-width:210px" role="img" aria-label="מעגל"><circle cx="110" cy="110" r="80" fill="${o.fill?SC:'none'}" fill-opacity="${o.fill?.3:0}" stroke="${o.ring?PC:'#8aa0bf'}" stroke-width="${o.ring?6:3}" ${o.an&&o.ring?'class="drawl"':''} ${o.an&&o.fill?'':''}/>${o.hole?`<circle cx="110" cy="110" r="${o.hole}" fill="#13233a" stroke="#8aa0bf" stroke-width="3"/>`:''}${seg}<circle cx="110" cy="110" r="5" fill="#f3f6fb"/><text x="104" y="132" fill="#f3f6fb" font-size="15" font-weight="800" font-family="Rubik">O</text>${tx}</svg>`;}
/* ===== יחסי הכלה: מרובעים ⊃ מלבנים ⊃ ריבועים ===== */
function VN(an,mark){const d=i=>an?`class="rv" style="--d:${.3+i*.7}s"`:'',pos={quad:[40,40],rect:[60,82],sq:[150,135]};
 let s=`<svg viewBox="0 0 300 200" style="width:100%;max-width:320px;font-family:Rubik" role="img" aria-label="מרובעים, בתוכם מלבנים, ובתוכם ריבועים">`;
 s+=`<g ${d(0)}><rect x="6" y="6" width="288" height="188" rx="18" fill="${AN}" fill-opacity=".12" stroke="${AN}" stroke-width="3"/><text x="280" y="30" text-anchor="start" font-size="16" font-weight="800" fill="${AN}" direction="rtl">מרובעים</text></g>`;
 s+=`<g ${d(1)}><rect x="40" y="44" width="240" height="140" rx="16" fill="${GR}" fill-opacity=".14" stroke="${GR}" stroke-width="3"/><text x="268" y="68" text-anchor="start" font-size="16" font-weight="800" fill="${GR}" direction="rtl">מלבנים</text></g>`;
 s+=`<g ${d(2)}><rect x="96" y="96" width="120" height="78" rx="14" fill="${SC}" fill-opacity=".2" stroke="${SC}" stroke-width="3"/><text x="204" y="120" text-anchor="start" font-size="16" font-weight="800" fill="${SC}" direction="rtl">ריבועים</text></g>`;
 if(mark){const [x,y]=pos[mark];s+=`<text x="${x}" y="${y+12}" font-size="26" ${an?'class="rv" style="--d:2.6s"':''}>⭐</text>`;}
 return s+'</svg>';}
const RN=()=>{let w,h;do{w=R(2,7);h=R(2,6);}while(w===h);return [w,h];};
/* ======================= ★ ידע: מזהים ======================= */
const SIT=[['גדר סביב גינה','P'],['דשא שמכסה את הגינה','S'],['שטיח לחדר','S'],['פס קישוט סביב תמונה','P'],['סרט סביב מתנה','P'],['אריחים לרצפה','S'],['צבע לקיר','S'],['ריצה מסביב למגרש','P'],['מפה שמכסה שולחן','S'],['מסגרת לחלון','P']];
function gWhich(){const [t,k]=pick(SIT);
 return {kind:'שטח או היקף?',rc:0,text:`מה צריך לחשב בשביל: <b>${t}</b>?`,...CH([{t:`${C('היקף',PC)}: מה שמסביב`,ok:k==='P',msg:`כאן מכסים את כל מה שבפנים, ולכן זה <b>${C('שטח',SC)}</b>.`},{t:`${C('שטח',SC)}: מה שבפנים`,ok:k==='S',msg:`כאן הולכים רק לאורך הגבול, ולכן זה <b>${C('היקף',PC)}</b>.`}]),
  dia:hl=>G({w:5,h:3,fill:k==='S',fillAnim:hl&&k==='S',peri:k==='P',periAnim:hl&&k==='P'}),
  lines:[k==='P'?`${t}: הולכים <b>מסביב</b> ← ${C('היקף',PC)}.`:`${t}: מכסים את <b>כל מה שבפנים</b> ← ${C('שטח',SC)}.`],rule:'מסביב (גבול) = היקף. מכסה את הפנים = שטח.'};}
function gCount(){const [w,h]=RN(),ask=pick(['S','P']),S=w*h,P=2*(w+h);
 return {kind:ask==='S'?'סופרים שטח':'סופרים היקף',rc:ask==='S'?2:1,text:`כל משבצת היא ${M('1 '+CM)} על ${M('1 '+CM)}. ${ask==='S'?'כמה משבצות יש <b>בפנים</b>? מה <b>השטח</b>?':'כמה צעדים של משבצת יש <b>מסביב</b>? מה <b>ההיקף</b>?'}`,
  ans:[{label:ask==='S'?'שטח =':'היקף =',col:ask==='S'?SC:PC,val:ask==='S'?S:P,unit:ask==='S'?CM2:CM}],
  dia:hl=>G({w,h,fill:hl&&ask==='S',fillAnim:hl&&ask==='S',num:hl,peri:hl&&ask==='P',periAnim:hl&&ask==='P',count:hl?ask:null}),
  lines:ask==='S'?[`בכל שורה ${C(w,WC)} משבצות, ויש ${C(h,HC)} שורות.`,`${M(C(w,WC)+' · '+C(h,HC)+' = '+S)} ← השטח ${M(S)} ${CM2}`]:[`סופרים את הצלעות הקטנות מסביב: ${M(C(w,WC)+' + '+C(h,HC)+' + '+C(w,WC)+' + '+C(h,HC)+' = '+P)}`,`ההיקף ${M(P)} ${CM}`],
  rule:ask==='S'?'שטח = כמה משבצות יש בפנים.':'היקף = כמה צעדים יש מסביב, לאורך הגבול.',
  diag:({vals:[v]})=>ask==='S'&&v===P?'ספרתם את <b>הגבול</b> מסביב, וזה ההיקף. השטח הוא המשבצות <b>בפנים</b>.':ask==='P'&&v===S?'ספרתם את המשבצות <b>בפנים</b>, וזה השטח. ההיקף הוא הצעדים <b>מסביב</b>.':ask==='P'&&v===w+h?'ספרתם רק שתי צלעות. הולכים <b>מסביב לכל הצורה</b>: 4 צלעות.':null};}
const INC=[
 ['כל ריבוע הוא מלבן.',1,'sq','לריבוע יש 4 זוויות ישרות, בדיוק כמו למלבן. הוא מלבן מיוחד: כל צלעותיו שוות.'],
 ['כל מלבן הוא ריבוע.',0,'rect','במלבן הצלעות לא חייבות להיות שוות. למשל מלבן 5 על 2 אינו ריבוע.'],
 ['כל מלבן הוא מרובע.',1,'rect','למלבן יש 4 צלעות ו־4 זוויות, ולכן הוא מרובע.'],
 ['כל מרובע הוא מלבן.',0,'quad','מלבן חייב 4 זוויות ישרות. יש מרובעים שהזוויות שלהם אינן ישרות.'],
 ['יש מלבנים שהם ריבועים.',1,'sq','מלבן שכל צלעותיו שוות הוא ריבוע.'],
 ['ריבוע הוא מלבן שכל צלעותיו שוות.',1,'sq','זו בדיוק ההגדרה: 4 זוויות ישרות, וגם 4 צלעות שוות.'],
 ['בכל מלבן כל הזוויות ישרות.',1,'rect','למלבן 4 זוויות של 90°.'],
 ['מרובע עם 4 זוויות ישרות הוא תמיד ריבוע.',0,'rect','4 זוויות ישרות = מלבן. הוא ריבוע רק אם גם כל הצלעות שוות.'],
 ['כל ריבוע הוא מרובע.',1,'sq','ריבוע נמצא בתוך המלבנים, והמלבנים בתוך המרובעים.']];
function gIncl(){const [t,ok,mk,why]=pick(INC),o=['נכון','לא נכון'];
 return {kind:'יחסי הכלה: נכון או לא?',rc:4,text:`נכון או לא נכון? <b>${t}</b>`,choice:o,correct:ok?0:1,dia:hl=>VN(hl,hl?mk:null),
  lines:[why,'בציור: הריבועים בתוך המלבנים, והמלבנים בתוך המרובעים.'],trick:'"כל" = בלי יוצא מן הכלל. מספיקה דוגמה אחת נגדית כדי שזה לא נכון.',rule:'כל ריבוע הוא מלבן. לא כל מלבן הוא ריבוע.',
  diag:()=>ok?'בדקו בציור: הריבועים נמצאים <b>בתוך</b> המלבנים.':'חפשו דוגמה אחת נגדית. למשל: מלבן 5 על 2.'};}
function gInclShape(){const t=pick(['sq','rect','quad']),a=R(3,9),b=(()=>{let x;do{x=R(2,10);}while(x===a);return x;})();
 const desc=t==='sq'?`4 זוויות של ${M('90'+DG)}, וכל הצלעות ${M(a+' '+CM)}`:t==='rect'?`4 זוויות של ${M('90'+DG)}, וצלעות ${M(a)}, ${M(b)}, ${M(a)}, ${M(b)} ${CM}`:`זוויות ${M('80'+DG)}, ${M('100'+DG)}, ${M('90'+DG)}, ${M('90'+DG)}`;
 const o=['ריבוע (ולכן גם מלבן)','מלבן שאינו ריבוע','מרובע שאינו מלבן'],ok=o[{sq:0,rect:1,quad:2}[t]];
 return {kind:'איזו צורה?',rc:4,text:`למרובע יש ${desc}. מה הוא?`,choice:o,correct:o.indexOf(ok),dia:hl=>VN(hl,hl?t:null),
  work:[{t:'יש לו 4 זוויות ישרות?',choice:['כן','לא'],correct:t==='quad'?1:0,why:'בודקים קודם את הזוויות: 4 זוויות ישרות = מלבן.'},...(t==='quad'?[]:[{t:'כל הצלעות שוות?',choice:['כן','לא'],correct:t==='sq'?0:1,why:'מלבן שכל צלעותיו שוות = ריבוע.'}])],
  lines:t==='quad'?['יש זוויות שאינן ישרות ← <b>לא מלבן</b>.','הוא נשאר במרובעים, מחוץ למלבנים.']:t==='rect'?['4 זוויות ישרות ← <b>מלבן</b>.','הצלעות לא כולן שוות ← <b>לא ריבוע</b>.']:['4 זוויות ישרות ← <b>מלבן</b>.','וגם כל הצלעות שוות ← <b>ריבוע</b>. ריבוע הוא גם מלבן!'],
  rule:'קודם זוויות (מלבן?), אחר כך צלעות (ריבוע?).',diag:({sel})=>o[sel]===o[1]&&t==='sq'?'הוא מלבן, נכון. אבל כל הצלעות שוות ← הוא גם <b>ריבוע</b>.':'בודקים: 4 זוויות ישרות? וכל הצלעות שוות?'};}
function gRD(){const r=R(2,15),up=Math.random()<.5;
 return up?{kind:'מרדיוס לקוטר',rc:8,text:`רדיוס המעגל ${M(r+' '+CM)}. מה הקוטר?`,ans:[{label:'קוטר =',col:HC,val:2*r,unit:CM}],dia:hl=>CD({m:hl?'d':'r',lab:hl?2*r:r,an:hl}),
  work:[{t:`קוטר = 2 רדיוסים: ${M('2 · '+r+' = ?')}`,ans:[{label:'',val:2*r}],why:'הקוטר עובר דרך המרכז: רדיוס לכל צד.'}],lines:[`קוטר = רדיוס + רדיוס`,`${M(C(r,RC)+' + '+C(r,RC)+' = '+2*r)} ${CM}`],rule:'קוטר = 2 · רדיוס.',
  diag:({vals:[v]})=>v*2===r?'הפוך! הקוטר <b>גדול</b> מהרדיוס, פי 2.':null}
 :{kind:'מקוטר לרדיוס',rc:8,text:`קוטר המעגל ${M(2*r+' '+CM)}. מה הרדיוס?`,ans:[{label:'רדיוס =',col:RC,val:r,unit:CM}],dia:hl=>CD({m:hl?'r':'d',lab:hl?r:2*r,an:hl}),
  work:[{t:`רדיוס = חצי קוטר: ${M(2*r+' : 2 = ?')}`,ans:[{label:'',val:r}],why:'הקוטר הוא שני רדיוסים ← מחלקים ב־2.'}],lines:['רדיוס = חצי קוטר',`${M(2*r+' : 2 = '+r)} ${CM}`],rule:'רדיוס = קוטר : 2.',
  diag:({vals:[v]})=>v===4*r?'כפלתם. הרדיוס <b>קטן</b> מהקוטר ← מחלקים ב־2.':null};}
function gAngRect(){const t=pick(['one','sum','sqsum']);const val=t==='one'?90:360,sh=t==='sqsum'?'ריבוע':'מלבן';
 return {kind:'זוויות במלבן',rc:6,text:t==='one'?`כמה מעלות יש בכל זווית של <b>מלבן</b>?`:`מה <b>סכום</b> 4 הזוויות ב${sh}?`,ans:[{label:t==='one'?'זווית =':'סכום =',col:AN,val,unit:DG}],
  dia:hl=>Rs(4,t==='sqsum'?4:2.6,{ra:1,anim:hl,lw:false,lh:false,sq:t==='sqsum',mid:hl&&t!=='one'?M('90 + 90 + 90 + 90 = 360'):''}),
  work:t==='one'?[{t:'במלבן כל הזוויות ישרות. זווית ישרה = ?',ans:[{label:'°',val:90}],why:'זווית ישרה = 90°.'}]:[{t:'כל זווית ישרה = ?',ans:[{label:'°',val:90}],why:'זווית ישרה = 90°.'},{t:`${M('4 · 90 = ?')}`,ans:[{label:'°',val:360}],why:'4 זוויות ישרות.'}],
  lines:t==='one'?['במלבן 4 זוויות <b>ישרות</b> ← כל אחת '+M('90'+DG)+'.']:[`4 זוויות ישרות: ${M('90 + 90 + 90 + 90 = 360'+DG)}`,'כמו בכל מרובע: סכום הזוויות '+M('360'+DG)+'.'],rule:'במלבן (וגם בריבוע) כל זווית 90°, והסכום 360°.',
  diag:({vals:[v]})=>v===180?'180° זה סכום הזוויות ב<b>משולש</b>. במרובע 4 זוויות ← 360°.':null};}
/* ======================= ★★ יישום: מחשבים ======================= */
function gCalc(sq){sq=sq!=null?sq:Math.random()<.35;const a=R(3,12),b=sq?a:(()=>{let t;do{t=R(2,10);}while(t===a);return t;})(),ask=pick(['P','S']),P=2*(a+b),S=a*b,sh=sq?'ריבוע':'מלבן';
 return {kind:(ask==='P'?'היקף ':'שטח ')+sh,rc:sq?3:(ask==='P'?1:2),text:`חשבו את ${ask==='P'?'<b>ההיקף</b>':'<b>השטח</b>'} של ה${sh}.`,ans:[{label:ask==='P'?'היקף =':'שטח =',col:ask==='P'?PC:SC,val:ask==='P'?P:S,unit:ask==='P'?CM:CM2}],
  work:[{t:'מה מחשבים כאן?',choice:['היקף ← מחברים את הצלעות מסביב','שטח ← רוחב כפול גובה'],correct:ask==='P'?0:1,why:'היקף = הגבול מסביב (מחברים). שטח = מה שבפנים (כופלים).'},ask==='P'?{t:sq?M('4 · '+a+' = ?'):M(a+' + '+b+' + '+a+' + '+b+' = ?'),ans:[{label:'',val:P}],why:sq?'לריבוע <b>4</b> צלעות שוות.':'למלבן 4 צלעות: שני רוחבים ושני גבהים.'}:{t:M(a+' · '+b+' = ?'),ans:[{label:'',val:S}],why:'בשטח <b>כופלים</b>.'}],
  dia:hl=>Rs(a,b,{sq,fill:hl&&ask==='S',peri:hl&&ask==='P',anim:hl,mid:hl&&ask==='S'?M(a+' · '+b+' = '+S):''}),
  lines:sq?(ask==='P'?[`בריבוע 4 צלעות שוות: ${M('4 · '+C(a,WC)+' = '+P)} ${CM}`]:[`${M(C(a,WC)+' · '+C(a,HC)+' = '+S)} ${CM2}`]):(ask==='P'?[`מסביב: ${M(C(a,WC)+' + '+C(b,HC)+' + '+C(a,WC)+' + '+C(b,HC)+' = '+P)} ${CM}`,`או בקיצור: ${M('2 · ('+a+' + '+b+') = '+P)}`]:[`שטח = רוחב · גובה: ${M(C(a,WC)+' · '+C(b,HC)+' = '+S)} ${CM2}`]),
  rule:ask==='P'?(sq?'היקף ריבוע = 4 · צלע.':'היקף מלבן = סכום 4 הצלעות.'):(sq?'שטח ריבוע = צלע · צלע.':'שטח מלבן = רוחב · גובה.'),
  diag:({vals:[v]})=>ask==='P'&&v===S?'חישבתם <b>שטח</b>. היקף = <b>מחברים</b> את כל הצלעות.':ask==='S'&&v===P?'חישבתם <b>היקף</b>. שטח = <b>כופלים</b> רוחב · גובה.':ask==='P'&&v===a+b?'חיברתם רק 2 צלעות. יש <b>4</b>.':ask==='S'&&v===a+b?'<b>חיברתם</b>. בשטח <b>כופלים</b>.':null};}
function gTriAng(){let a,b,c;do{a=R(3,12)*5;b=R(3,16)*5;c=180-a-b;}while(c<25||c>130);
 return {kind:'זווית חסרה במשולש',rc:5,crack:[CK('מה סכום הזוויות במשולש?',['180°','360°','90°'],'180°','בכל משולש: 3 זוויות ביחד = 180°.')],text:`במשולש שתי זוויות: ${M(a+DG)} ו־${M(b+DG)}. מה הזווית השלישית?`,ans:[{label:'זווית =',col:AN,val:c,unit:DG}],
  dia:hl=>T(a,b,{lab:[a+DG,b+DG,hl?c+DG:'?'],an:hl,sum:hl?`${a} + ${b} + ${c} = 180°`:''}),
  work:[{t:M(a+' + '+b+' = ?'),ans:[{label:'°',val:a+b}],why:'קודם מחברים את מה שנתון.'},{t:M('180 − '+(a+b)+' = ?'),ans:[{label:'°',val:c}],why:'מה שחסר עד 180°.'}],
  lines:[`${M(C(a,GR)+' + '+C(b,PU)+' = '+(a+b))}`,`${M('180 − '+(a+b)+' = '+C(c,AN))}${DG}`,`בדיקה: ${M(a+' + '+b+' + '+c+' = 180')} ✓`],trick:'משולש = 180°. לא 360°!',rule:'סכום הזוויות במשולש = 180°.',
  diag:({vals:[v]})=>v===360-a-b?'זה המוקש! השתמשתם ב־360°. ב<b>משולש</b> הסכום הוא <b>180°</b>.':v===a+b?'זה סכום שתי הזוויות. עכשיו מורידים מ־180°.':null};}
function gCircP(){const r=R(2,12);
 return {kind:'היקף מעגל מרדיוס',rc:9,text:`רדיוס המעגל ${M(r+' '+CM)}. מה ההיקף? (כתבו עם <span class="m">π</span>)`,tpl:'[] π',ans:[{label:'המספר לפני π',col:PC,val:2*r}],dia:hl=>CD({m:'r',lab:r,ring:hl,an:hl}),
  work:[{t:`קודם הקוטר: ${M('2 · '+r+' = ?')}`,ans:[{label:CM,val:2*r}],why:'היקף = π · קוטר.'},{t:'היקף = קוטר · π = <span class="m">?π</span>',ans:[{label:'π',val:2*r}],why:'כופלים את הקוטר ב־π.'}],
  lines:[`קוטר = ${M('2 · '+C(r,RC)+' = '+2*r)}`,`היקף = ${M(2*r+' · π = '+C(2*r+'π',PC))} ${CM}`],trick:'היקף = <span class="m">2 · π · r</span>. לא לשכוח את ה־2!',rule:'היקף מעגל = π · קוטר = <span class="m">2 · π · r</span>.',
  diag:({vals:[v]})=>v===r?'שכחתם את ה־<b>2</b>: היקף = π · <b>קוטר</b>.':v===r*r?'זה השטח. ההיקף הוא <b>הקו</b> מסביב.':null};}
function gCircA(){const r=R(2,12);
 return {kind:'שטח עיגול מרדיוס',rc:10,text:`רדיוס העיגול ${M(r+' '+CM)}. מה השטח? (כתבו עם <span class="m">π</span>)`,tpl:'[] π',ans:[{label:'המספר לפני π',col:SC,val:r*r}],dia:hl=>CD({m:'r',lab:r,fill:1,an:hl}),
  work:[{t:M(r+' · '+r+' = ?'),ans:[{label:'',val:r*r}],why:'שטח = <span class="m">π · r · r</span>. קודם רדיוס כפול רדיוס.'},{t:'שטח = <span class="m">?π</span>',ans:[{label:'π',val:r*r}],why:'כופלים ב־π.'}],
  lines:['שטח = <span class="m">π · r · r</span>',`${M(C(r,RC)+' · '+C(r,RC)+' · π = '+C(r*r+'π',SC))} ${CM2}`],trick:'שטח = <span class="m">r · r · π</span>, לא <span class="m">2 · r</span>!',rule:'שטח עיגול = <span class="m">π · r · r</span>.',
  diag:({vals:[v]})=>v===2*r&&r!==2?'זה המוקש! 2 · r הוא הקוטר. בשטח: <b>r · r</b>.':null};}
/* ======================= ★★★ הבנה: הפוך ======================= */
function gRevS(){const [w,h]=[R(2,9),R(2,9)],S=w*h;
 return {kind:'מוצאים צלע מהשטח',rc:2,text:`שטח המלבן ${M(S+' '+CM2)}, והרוחב ${M(w+' '+CM)}. מה הגובה?`,ans:[{label:'גובה =',col:HC,val:h,unit:CM}],work:[{t:`${M(w+' · ? = '+S)}. מה הפעולה ההפוכה לכפל?`,choice:['חילוק','חיסור','חיבור'],correct:0,why:'ההפך מכפל הוא <b>חילוק</b>.'},{t:M(S+' : '+w+' = ?'),ans:[{label:'',val:h}],why:`${M(w)} כפול כמה נותן ${M(S)}?`}],
  dia:hl=>hl&&S<=48?G({w,h,fill:1,fillAnim:1,lw:w,lh:h,step:.08}):Rs(w,h,{lh:'?',mid:M(S+' '+CM2)}),
  lines:[M(C(w,WC)+' · ? = '+S),`מחלקים: ${M(S+' : '+w+' = '+C(h,HC))}`,`בדיקה: ${M(w+' · '+h+' = '+S)} ✓`],rule:'נתון שטח ורוחב ← גובה = שטח : רוחב.',
  diag:({vals:[v]})=>v===S-w?'<b>חיסרתם</b>. ההפך מכפל הוא <b>חילוק</b>.':null};}
function gRevP(){const [w,h]=RN(),P=2*(w+h);
 return {kind:'מוצאים צלע מההיקף',rc:1,text:`היקף המלבן ${M(P+' '+CM)}, והרוחב ${M(w+' '+CM)}. מה הגובה?`,ans:[{label:'גובה =',col:HC,val:h,unit:CM}],work:[{t:`שני רוחבים: ${M('2 · '+w+' = ?')}`,ans:[{label:'',val:2*w}],why:'יש <b>שני</b> רוחבים שווים.'},{t:`לשני הגבהים נשאר: ${M(P+' − '+2*w+' = ?')}`,ans:[{label:'',val:2*h}],why:'מורידים מההיקף את שני הרוחבים.'},{t:`גובה אחד: ${M(2*h+' : 2 = ?')}`,ans:[{label:'',val:h}],why:'שני גבהים שווים ← מחלקים ב־2.'}],
  dia:hl=>Rs(w,h,{lh:hl?h+' '+CM:'?',peri:hl,anim:hl}),lines:[`שני רוחבים: ${M('2 · '+C(w,WC)+' = '+2*w)}`,`נשאר: ${M(P+' − '+2*w+' = '+2*h)}`,`גובה אחד: ${M(2*h+' : 2 = '+C(h,HC))}`],
  rule:'נתון היקף ורוחב ← מורידים 2 רוחבים, ומחלקים את מה שנשאר ב־2.',diag:({vals:[v]})=>v===P-w?'הורדתם רק רוחב <b>אחד</b>. יש 2.':v===P-2*w?'זה סכום <b>שני</b> הגבהים. מחלקים ב־2.':null};}
const gRev=()=>Math.random()<.5?gRevS():gRevP();
function gSqRev(){const a=R(2,12),t=pick(['P','S']),P=4*a,S=a*a;
 return {kind:t==='P'?'ריבוע: מהיקף לצלע':'ריבוע: משטח לצלע',rc:3,text:`${t==='P'?`היקף הריבוע ${M(P+' '+CM)}`:`שטח הריבוע ${M(S+' '+CM2)}`}. מה אורך הצלע?`,ans:[{label:'צלע =',col:WC,val:a,unit:CM}],
  work:t==='P'?[{t:M(P+' : 4 = ?'),ans:[{label:'',val:a}],why:'4 צלעות שוות.'}]:[{t:`איזה מספר כפול עצמו נותן ${M(S)}?`,ans:[{label:'',val:a}],why:'שטח ריבוע = צלע · צלע.'}],
  dia:hl=>Rs(a,a,{sq:1,lw:hl?a:'?',lh:hl?a:'?',peri:hl&&t==='P',fill:hl&&t==='S',anim:hl}),lines:t==='P'?[`4 צלעות שוות: ${M(P+' : 4 = '+a)}`,`בדיקה: ${M('4 · '+a+' = '+P)} ✓`]:[`${M(a+' · '+a+' = '+S)}`,`הצלע ${M(a)} ${CM}`],
  rule:t==='P'?'צלע ריבוע = היקף : 4.':'מחפשים מספר שכפול עצמו נותן את השטח.',diag:({vals:[v]})=>t==='P'&&v===P/2?'לריבוע <b>4</b> צלעות. מחלקים ב־4.':t==='S'&&v===S/2?'מחפשים מספר שכפול <b>עצמו</b> נותן '+S+'.':t==='S'&&v===S/4?'חילקתם ב־4 כמו בהיקף. בשטח: צלע · צלע.':null};}
function gQuadAng(){let a,b,c,d;do{a=R(10,30)*5;b=R(10,30)*5;c=R(10,30)*5;d=360-a-b-c;}while(d<45||d>160);
 return {kind:'זווית חסרה במרובע',rc:6,crack:[CK('מה סכום הזוויות במרובע?',['360°','180°','90°'],'360°','מרובע = 2 משולשים ← 2 · 180° = 360°.')],text:`במרובע שלוש זוויות: ${M(a+DG)}, ${M(b+DG)}, ${M(c+DG)}. מה הזווית הרביעית?`,ans:[{label:'זווית =',col:AN,val:d,unit:DG}],
  dia:hl=>Q([a+DG,b+DG,c+DG,hl?d+DG:'?'],{an:hl,sum:hl?`${a} + ${b} + ${c} + ${d} = 360°`:''}),
  work:[{t:M(a+' + '+b+' + '+c+' = ?'),ans:[{label:'°',val:a+b+c}],why:'מחברים את 3 הזוויות הנתונות.'},{t:M('360 − '+(a+b+c)+' = ?'),ans:[{label:'°',val:d}],why:'מה שחסר עד 360°.'}],
  lines:[M(a+' + '+b+' + '+c+' = '+(a+b+c)),M('360 − '+(a+b+c)+' = '+C(d,AN))+DG],trick:'מרובע = 360°. משולש = 180°.',rule:'סכום הזוויות במרובע = 360°.',
  diag:({vals:[v]})=>v===180-a-b-c||v===a+b+c-180?'השתמשתם ב־180°. ב<b>מרובע</b> הסכום <b>360°</b>.':v===a+b+c?'זה הסכום של 3 הזוויות. מורידים מ־360°.':null};}
function gTriArea(){let b,h;do{b=R(3,14);h=R(2,10);}while((b*h)%2);
 return {kind:'שטח משולש',rc:7,text:`למשולש בסיס ${M(b+' '+CM)} וגובה ${M(h+' '+CM)}. מה השטח?`,ans:[{label:'שטח =',col:SC,val:b*h/2,unit:CM2}],dia:hl=>TA(b,h,hl),
  work:[{t:`המלבן שמסביב: ${M(b+' · '+h+' = ?')}`,ans:[{label:'',val:b*h}],why:'משולש = חצי מהמלבן שמסביבו.'},{t:`חצי: ${M(b*h+' : 2 = ?')}`,ans:[{label:'',val:b*h/2}],why:'מחלקים ב־2.'}],
  lines:[`המלבן שמסביב: ${M(C(b,WC)+' · '+C(h,HC)+' = '+b*h)}`,`המשולש הוא חצי: ${M(b*h+' : 2 = '+C(b*h/2,SC))} ${CM2}`],trick:'לא לשכוח לחלק ב־2!',rule:'שטח משולש = (בסיס · גובה) : 2.',
  diag:({vals:[v]})=>v===b*h?'זה המוקש! זה השטח של <b>כל המלבן</b>. המשולש הוא חצי ← מחלקים ב־2.':v===b+h?'חיברתם. בשטח <b>כופלים</b> ומחלקים ב־2.':null};}
function gCircD(){const r=R(2,10),wa=Math.random()<.55;
 return wa?{kind:'שטח עיגול מקוטר',rc:10,crack:[CK('מה נתון?',['הקוטר','הרדיוס','השטח'],'הקוטר','קוראים: "קוטר".'),CK('מה עושים קודם?',['מוצאים את הרדיוס','כופלים קוטר · קוטר','כופלים ב־π'],'מוצאים את הרדיוס','בשטח צריך <b>רדיוס</b>.')],
  text:`קוטר העיגול ${M(2*r+' '+CM)}. מה השטח? (כתבו עם <span class="m">π</span>)`,tpl:'[] π',ans:[{label:'המספר לפני π',col:SC,val:r*r}],dia:hl=>CD({m:hl?'r':'d',lab:hl?r:2*r,fill:1,an:hl}),
  work:[{t:`רדיוס: ${M(2*r+' : 2 = ?')}`,ans:[{label:CM,val:r}],why:'רדיוס = חצי קוטר.'},{t:M(r+' · '+r+' = ?'),ans:[{label:'',val:r*r}],why:'רדיוס · רדיוס.'},{t:'שטח = <span class="m">?π</span>',ans:[{label:'π',val:r*r}],why:'כופלים ב־π.'}],
  lines:[`רדיוס = ${M(2*r+' : 2 = '+C(r,RC))}`,`שטח = ${M(r+' · '+r+' · π = '+C(r*r+'π',SC))} ${CM2}`],trick:'נתון קוטר? קודם מחלקים ב־2!',rule:'קוטר ← רדיוס ← <span class="m">π · r · r</span>.',
  diag:({vals:[v]})=>v===4*r*r?'זה המוקש! כפלתם <b>קוטר · קוטר</b>. קודם רדיוס.':null}
 :{kind:'היקף מעגל מקוטר',rc:9,text:`קוטר המעגל ${M(2*r+' '+CM)}. מה ההיקף? (כתבו עם <span class="m">π</span>)`,tpl:'[] π',ans:[{label:'המספר לפני π',col:PC,val:2*r}],dia:hl=>CD({m:'d',lab:2*r,ring:hl,an:hl}),
  work:[{t:'היקף = קוטר · π = <span class="m">?π</span>',ans:[{label:'π',val:2*r}],why:'הקוטר כבר נתון.'}],lines:[`היקף = ${M(2*r+' · π = '+C(2*r+'π',PC))} ${CM}`],trick:'נתון קוטר? לא כופלים שוב ב־2!',rule:'היקף = π · קוטר.',
  diag:({vals:[v]})=>v===4*r?'זה המוקש! '+M(2*r)+' הוא כבר <b>הקוטר</b>.':null};}
/* ======================= ★★★★ חשיבה ומפמ״ר ======================= */
function gSameP(){const P=pick([12,16,20,24]),half=P/2,opts=[];for(let w=1;w<half;w++){const h=half-w;if(w<=h)opts.push([w,h]);}
 const sel=shuf(opts).slice(0,3),best=sel.reduce((a,b)=>a[0]*a[1]>=b[0]*b[1]?a:b);
 return {kind:'אותו היקף, שטח אחר',rc:2,text:`לכל המלבנים האלה היקף ${M(P+' '+CM)}. לאיזה מהם <b>השטח הגדול ביותר</b>?`,...CH(sel.map(([w,h])=>({t:M(w+' '+CM+' על '+h+' '+CM),ok:w===best[0],msg:`השטח שלו ${M(w+' · '+h+' = '+w*h)}. חשבו גם את האחרים.`}))),
  dia:hl=>hl?G({w:best[1],h:best[0],fill:1,fillAnim:1,step:.06,peri:1}):'',lines:sel.map(([w,h])=>M(w+' · '+h+' = '+w*h)).concat(['אותו היקף ≠ אותו שטח. ככל שהמלבן קרוב לריבוע, השטח גדול יותר.']),rule:'מלבנים עם אותו היקף יכולים להיות בעלי שטחים שונים.'};}
function gL(){const W=R(4,6),H=R(4,6),cw=R(1,W-2),ch=R(1,H-2),cells=rectCells(W,H).filter(([x,y])=>!(x>=W-cw&&y<ch)),S=cells.length,ask=pick(['S','S','P']),Pp=boundary(cells).length;
 return {kind:ask==='S'?'צורה מורכבת: שטח':'צורה מורכבת: היקף',rc:ask==='S'?2:1,text:`כל משבצת היא ${M('1 '+CM)} על ${M('1 '+CM)}. מה ${ask==='S'?'<b>השטח</b>':'<b>ההיקף</b>'} של הצורה?`,ans:[{label:ask==='S'?'שטח =':'היקף =',col:ask==='S'?SC:PC,val:ask==='S'?S:Pp,unit:ask==='S'?CM2:CM}],
  dia:hl=>G({cells,fill:hl&&ask==='S',fillAnim:hl&&ask==='S',step:.06,peri:hl&&ask==='P',periAnim:hl&&ask==='P',num:hl&&ask==='P'}),
  lines:ask==='S'?[`המלבן השלם ${M(W+' · '+H+' = '+W*H)}, פחות הפינה החסרה ${M(cw+' · '+ch+' = '+cw*ch)}`,`${M(W*H+' − '+cw*ch+' = '+S)} ${CM2}`]:[`הולכים מסביב וסופרים כל צעד: ${M(Pp)} ${CM}`,`גילוי: זה שווה להיקף המלבן השלם ${M('2 · ('+W+' + '+H+') = '+2*(W+H))}!`],
  rule:ask==='S'?'צורה מורכבת: מחסרים את החלק החסר מהמלבן השלם, או מחלקים למלבנים.':'היקף צורה מורכבת: הולכים מסביב לכל הגבול.',
  diag:({vals:[v]})=>ask==='S'&&v===W*H?'זה המלבן <b>השלם</b>. מורידים את הפינה החסרה.':ask==='P'&&v===S?'ספרתם משבצות (שטח). היקף = צעדים מסביב.':null};}
function gInclThink(){const t=pick(['ps','ps','three','claim']);
 if(t==='ps'){const a=R(3,9),o=[`${a} ו־${a}`,`${a-1} ו־${a+1}`,`${a-2} ו־${a+2}`];
  return {kind:'גם שטח וגם היקף: איזו צורה?',rc:4,crack:[CK('מה נתון?',['שטח והיקף של מלבן','רק שטח','רק צלעות'],'שטח והיקף של מלבן','קוראים את השאלה: גם שטח וגם היקף.')],
   text:`למלבן שטח ${M(a*a+' '+CM2)} והיקף ${M(4*a+' '+CM)}. אילו צלעות יש לו, ואיזו צורה זו?`,...SH([`${a} ו־${a}: ריבוע (שהוא גם מלבן)`,`${a-1} ו־${a+1}: מלבן שאינו ריבוע`,'אי אפשר לדעת'],0),dia:hl=>hl?Rs(a,a,{sq:1,fill:1,peri:1,anim:1}):Rs(4,2.6,{lw:'?',lh:'?'}),
   work:[{t:`חצי היקף = רוחב + גובה = ${M(4*a+' : 2 = ?')}`,ans:[{label:'',val:2*a}],why:'בהיקף יש 2 רוחבים ו־2 גבהים.'},{t:`אילו שני מספרים: סכומם ${2*a} ומכפלתם ${a*a}?`,...SH(o,0),why:`בודקים: ${M((a-1)+' · '+(a+1)+' = '+(a*a-1))}, אבל ${M(a+' · '+a+' = '+a*a)} ✓`}],
   lines:[`רוחב + גובה = ${M(2*a)}, רוחב · גובה = ${M(a*a)}`,`רק ${M(a+' ו־'+a)} מתאימים ← כל הצלעות שוות ← <b>ריבוע</b>.`,'וריבוע הוא גם מלבן, אז אין סתירה!'],rule:'ריבוע הוא מלבן מיוחד: כל צלעותיו שוות.',
   diag:()=>`בדקו את המכפלה: ${M((a-1)+' · '+(a+1)+' = '+(a*a-1))}, לא ${M(a*a)}.`};}
 if(t==='three'){const o=['90°, והוא מלבן','90°, והוא בהכרח ריבוע','180°, והוא מלבן'],q3=SH(o,0);
  return {kind:'3 זוויות ישרות',rc:6,text:'למרובע יש <b>3 זוויות ישרות</b>. מה הזווית הרביעית, ואיזו צורה זו?',...q3,dia:hl=>Rs(4,2.6,{ra:1,anim:hl,lw:false,lh:false,mid:hl?M('360 − 270 = 90'):''}),
   work:[{t:M('90 + 90 + 90 = ?'),ans:[{label:'°',val:270}],why:'3 זוויות ישרות.'},{t:M('360 − 270 = ?'),ans:[{label:'°',val:90}],why:'סכום הזוויות במרובע 360°.'}],
   lines:[M('360 − 270 = 90'+DG)+' ← גם הרביעית ישרה.','4 זוויות ישרות ← <b>מלבן</b>. ריבוע? רק אם הצלעות שוות, וזה לא נתון.'],rule:'4 זוויות ישרות = מלבן. ריבוע צריך גם צלעות שוות.',
   diag:({sel})=>q3.choice[sel]===o[1]?'הזווית 90° נכון. אבל על הצלעות לא ידוע דבר ← לא בהכרח ריבוע.':'סכום הזוויות במרובע 360°.'};}
 const nm=pick(['נועה','איתי','מאיה','יואב']),o=[`${nm} טועה: לריבוע 4 זוויות ישרות, ולכן הוא מלבן`,`${nm} צודק/ת: במלבן הצלעות חייבות להיות שונות`,'אף אחד לא יודע'];
 return {kind:'מוצאים את הטעות',rc:4,text:`${nm} אומר/ת: ״ריבוע הוא <b>לא</b> מלבן, כי כל הצלעות שלו שוות.״ מה נכון?`,...SH(o,0),dia:hl=>VN(hl,hl?'sq':null),
  lines:['מלבן = מרובע עם 4 זוויות ישרות. אין דרישה שהצלעות יהיו שונות.','לריבוע 4 זוויות ישרות ← הוא <b>מלבן</b> (מיוחד).'],rule:'כל ריבוע הוא מלבן.',diag:()=>'בודקים בהגדרה: מה צריך כדי להיות מלבן? רק 4 זוויות ישרות.'};}
function gCircScale(){const k=pick([2,3]),wa=Math.random()<.6,o=[`פי ${k*k}`,`פי ${k}`,`פי ${2*k}`].filter((x,i,a)=>a.indexOf(x)===i),okv=`פי ${wa?k*k:k}`;
 return {kind:'הרדיוס גדל',rc:wa?10:9,crack:[CK('איך בודקים?',['מחשבים עם רדיוס לדוגמה, לפני ואחרי','מנחשים','מחברים'],'מחשבים עם רדיוס לדוגמה, לפני ואחרי','בוחרים רדיוס קל, למשל 1.')],
  text:`הרדיוס של עיגול גדל <b>פי ${k}</b>. פי כמה גדל ה${wa?'<b>שטח</b>':'<b>היקף</b>'}?`,choice:o,correct:o.indexOf(okv),
  dia:hl=>`<div style="display:flex;gap:8px;justify-content:center;align-items:center"><div style="width:70px">${CD({fill:wa,ring:!wa,m:'none'})}</div><div style="width:${70*k}px;max-width:190px" ${hl?'class="rv" style="--d:.6s"':''}>${CD({fill:wa,ring:!wa,m:'none'})}</div></div>`,
  work:[{t:`רדיוס 1: ${wa?'השטח':'ההיקף'} = <span class="m">?π</span>`,ans:[{label:'π',val:wa?1:2}],why:wa?'1 · 1 · π.':'2 · 1 · π.'},{t:`רדיוס ${k}: ${wa?'השטח':'ההיקף'} = <span class="m">?π</span>`,ans:[{label:'π',val:wa?k*k:2*k}],why:wa?M(k+' · '+k):M('2 · '+k)},{t:'פי כמה?',choice:o,correct:o.indexOf(okv),why:'משווים אחרי ולפני.'}],
  lines:wa?[`רדיוס 1 ← ${M('π')}. רדיוס ${k} ← ${M(k*k+'π')}`,`השטח גדל <b>פי ${k*k}</b>, כי r · r.`]:[`רדיוס 1 ← ${M('2π')}. רדיוס ${k} ← ${M(2*k+'π')}`,`ההיקף גדל <b>פי ${k}</b>, כמו הרדיוס.`],
  trick:wa?`רדיוס פי ${k} ← שטח פי ${k*k}!`:`רדיוס פי ${k} ← היקף פי ${k}.`,rule:'מנסים רדיוס לדוגמה, ומשווים לפני ואחרי.',
  diag:({sel})=>wa&&o[sel]===`פי ${k}`?'זה המוקש! בשטח יש r · r, ולכן הוא גדל פי '+k*k+'.':'חשבו עם רדיוס 1 ועם רדיוס '+k+'.'};}
function gDouble(){const [w,h]=RN(),nm=pick(['נועה','איתי','מאיה','יואב','דניאל']);
 return {kind:'מכפילים צלעות',rc:2,text:`${nm} אומר/ת: ״אם מכפילים את הרוחב וגם את הגובה של מלבן פי 2, גם השטח גדל פי 2.״ בדקו עם מלבן ${M(w+' על '+h)}. מה נכון?`,...CH([{t:'השטח גדל פי 4',ok:1},{t:`${nm} צודק/ת: פי 2`,msg:`${M(w+' · '+h+' = '+w*h)}, ואחרי ${M(2*w+' · '+2*h+' = '+4*w*h)}. זה פי 4!`},{t:'השטח לא משתנה',msg:'הצלעות גדלו, ולכן גם השטח.'},{t:'השטח גדל פי 8',msg:`${M(4*w*h+' : '+w*h+' = 4')}.`}]),
  dia:hl=>hl?G({w:2*w,h:2*h,fill:1,fillAnim:1,step:.03}):'',lines:[`לפני: ${M(w+' · '+h+' = '+w*h)}`,`אחרי: ${M(2*w+' · '+2*h+' = '+4*w*h)}`,`${M(4*w*h+' : '+w*h+' = 4')} ← פי 4.`],rule:'שתי הצלעות פי 2 ← השטח פי 4 (וההיקף פי 2).'};}
const WORD=[
 ()=>{const a=R(6,15),b=R(3,9),pr=pick([5,10,20]),P=2*(a+b);return {kind:'בעיה מילולית: גדר',rc:1,crack:[CK('גדר מסביב = ?',['היקף','שטח'],'היקף','גדר הולכת מסביב.')],text:`גינה מלבנית באורך ${M(a+' '+MM)} וברוחב ${M(b+' '+MM)}. מקיפים אותה בגדר. מטר גדר עולה ${M(pr)} ש״ח. כמה תעלה הגדר?`,ans:[{label:'מחיר =',col:PC,val:P*pr,unit:'ש״ח'}],
  work:[{t:`אורך הגדר (היקף): ${M(a+' + '+b+' + '+a+' + '+b+' = ?')}`,ans:[{label:MM,val:P}],why:'גדר = היקף.'},{t:M(P+' · '+pr+' = ?'),ans:[{label:'ש״ח',val:P*pr}],why:'כופלים במחיר למטר.'}],
  dia:hl=>Rs(a,b,{u:MM,peri:hl,anim:hl}),lines:[`גדר ← ${C('היקף',PC)}: ${M(P)} ${MM}`,`${M(P+' · '+pr+' = '+P*pr)} ש״ח`],rule:'גדר = היקף, ואחר כך כופלים במחיר.',diag:({vals:[v]})=>v===a*b*pr?'חישבתם לפי <b>שטח</b>. גדר ← היקף.':v===P?'זה אורך הגדר. עכשיו כופלים במחיר.':null};},
 ()=>{const a=R(3,8),b=R(2,6);return {kind:'בעיה מילולית: אריחים',rc:2,crack:[CK('אריחים לרצפה = ?',['שטח','היקף'],'שטח','מכסים את כל הרצפה.')],text:`רצפה של חדר היא ${M(a+' '+MM)} על ${M(b+' '+MM)}. כל אריח ${M('1 '+MM)} על ${M('1 '+MM)}. כמה אריחים צריך?`,ans:[{label:'אריחים =',col:SC,val:a*b,unit:''}],
  work:[{t:M(a+' · '+b+' = ?'),ans:[{label:'',val:a*b}],why:'אריחים מכסים ← שטח.'}],dia:hl=>G({w:a,h:b,fill:hl,fillAnim:hl,num:hl}),lines:[`מכסים את <b>כל הרצפה</b> ← ${C('שטח',SC)}`,`${M(a+' · '+b+' = '+a*b)} אריחים`],rule:'מכסים את הפנים ← שטח.',diag:({vals:[v]})=>v===2*(a+b)?'חישבתם <b>היקף</b>. אריחים ← שטח.':null};},
 ()=>{const r=pick([10,20,25,30,35]);return {kind:'בעיה מילולית: גלגל',rc:9,crack:[CK('סיבוב אחד של גלגל = ?',['ההיקף','השטח','הרדיוס'],'ההיקף','בסיבוב הגלגל "פורש" על הרצפה את הקו שמסביבו.')],text:`לגלגל אופניים רדיוס ${M(r+' '+CM)}. כמה ס״מ הוא מתקדם בסיבוב אחד? (עם <span class="m">π</span>)`,tpl:'[] π',ans:[{label:'המספר לפני π',col:PC,val:2*r}],
  work:[{t:`הקוטר: ${M('2 · '+r+' = ?')}`,ans:[{label:CM,val:2*r}],why:'קודם הקוטר.'},{t:'סיבוב = היקף = <span class="m">?π</span>',ans:[{label:'π',val:2*r}],why:'היקף = π · קוטר.'}],dia:hl=>CD({m:'r',lab:r,ring:hl,an:hl}),lines:['סיבוב אחד = <b>היקף</b> הגלגל.',`${M(2*r+' · π = '+2*r+'π')} ${CM}`],rule:'סיבוב = היקף = π · קוטר.',diag:({vals:[v]})=>v===r*r?'חישבתם שטח. בסיבוב עוברים את <b>הקו מסביב</b>.':v===r?'שכחתם את ה־2.':null};}];
const gWord=()=>pick(WORD)();
/* ======================= שלבים ======================= */
const LAD=[
 [{g:gWhich,n:3,h:2},{g:gCount,n:4,h:1},{g:gIncl,n:5,h:2},{g:gInclShape,n:3,h:1},{g:gRD,n:3,h:1},{g:gAngRect,n:2,h:1}],
 [{g:()=>gCalc(false),n:4,h:2},{g:()=>gCalc(true),n:3,h:1},{g:gTriAng,n:5,h:1},{g:gCircP,n:4,h:1},{g:gCircA,n:4,h:1}],
 [{g:gRev,n:5,h:1},{g:gSqRev,n:3,h:1},{g:gQuadAng,n:4,h:1},{g:gTriArea,n:4,h:1},{g:gCircD,n:4,h:0}],
 [{g:gWord,n:4,h:1},{g:gInclThink,n:4,h:1},{g:gSameP,n:3,h:0},{g:gL,n:3,h:0},{g:gCircScale,n:3,h:0},{g:gDouble,n:3,h:0}]];
const LEVELS=[
 {n:1,t:'רואים ומזהים',d:'שטח או היקף? ← סופרים ← יחסי הכלה ← רדיוס וקוטר ← זוויות במלבן',ladder:LAD[0]},
 {n:2,t:'מחשבים',d:'מלבן וריבוע ← זווית חסרה במשולש ← היקף ושטח של מעגל',ladder:LAD[1]},
 {n:3,t:'הפוך והבנה',d:'מוצאים צלע ← זווית חסרה במרובע ← שטח משולש ← מעגל מקוטר',ladder:LAD[2]},
 {n:4,t:'חשיבה ושאלות מפמ״ר',d:'בעיות מילוליות ← יחסי הכלה בחשיבה ← אותו היקף ← צורה מורכבת ← הרדיוס גדל',ladder:LAD[3]}];
LEVELS.forEach(l=>l.g=()=>pick(l.ladder).g());
const TEST=[[gWhich,gIncl,gRD,gCount],[()=>gCalc(false),gTriAng,gCircP,gCircA],[gRev,gQuadAng,gTriArea,gCircD],[gWord,gInclThink,gL,gCircScale]];
const WARM=[gWhich,gCount,gIncl,gRD,gWhich,gAngRect,gIncl,gCount];
/* ======================= הסבר מונפש ======================= */
const RECAP=[
 {h:'למה צריך את זה?',d:1.4,svg:()=>G({w:6,h:4,fill:1,fillAnim:1,d0:2.2,step:.05,peri:1,periAnim:1,pstep:.08}),
  says:[`גדר מסביב לגינה ← ${C('היקף',PC)}`,`דשא בפנים ← ${C('שטח',SC)}`],what:'מסביב = היקף. בפנים = שטח.'},
 {h:'היקף: הולכים מסביב',d:3.2,svg:()=>G({w:6,h:4,peri:1,periAnim:1,num:1,count:'P',p0:.4,pstep:.28}),
  says:[`${M(C('6',WC)+' + '+C('4',HC)+' + '+C('6',WC)+' + '+C('4',HC)+' = 20')} ${CM}`],what:'היקף = מחברים את כל הצלעות.'},
 {h:'שטח: ממלאים את הפנים',d:3.4,svg:()=>G({w:6,h:4,fill:1,fillAnim:1,num:1,count:'S',d0:.4,step:.2}),
  says:[`${C('4',HC)} שורות של ${C('6',WC)}: ${M('6 · 4 = 24')} ${CM2}`],what:`שטח = ${C('רוחב',WC)} · ${C('גובה',HC)}`},
 {h:'ריבוע: כל הצלעות שוות',d:1.4,svg:()=>G({w:4,h:4,fill:1,peri:1,lw:'4',lh:'4'}),
  says:[`${C('היקף',PC)} = 4 · צלע = ${M('16')} ${CM}`,`${C('שטח',SC)} = צלע · צלע = ${M('16')} ${CM2}`],what:'16 צעדים ≠ 16 משבצות.'},
 {h:'יחסי הכלה',d:2.8,svg:()=>VN(1,'sq'),says:['כל ריבוע הוא מלבן ⭐','אבל לא כל מלבן הוא ריבוע.'],what:'ריבוע = מלבן שכל צלעותיו שוות.'},
 {h:'זוויות במשולש: 180°',d:1.6,svg:()=>{const W=[[60,GR],[50,PU],[70,AN]];let a0=180,s='';W.forEach(([v,c],i)=>{const a1=a0-v,p=t=>[150+90*Math.cos(t*Math.PI/180),110-90*Math.sin(t*Math.PI/180)],[x0,y0]=p(a0),[x1,y1]=p(a1);s+=`<path class="rv" style="--d:${.3+i*.7}s" d="M150 110 L${f(x0)} ${f(y0)} A90 90 0 0 1 ${f(x1)} ${f(y1)} Z" fill="${c}" fill-opacity=".55" stroke="#13233a" stroke-width="2"/>`;a0=a1;});
   return `<svg viewBox="0 0 300 140" style="width:100%;max-width:320px;font-family:Rubik" role="img" aria-label="שלוש זוויות המשולש יוצרות יחד קו ישר">${s}<line x1="40" y1="110" x2="260" y2="110" stroke="#f3f6fb" stroke-width="3"/><text class="rv" style="--d:2.5s" x="150" y="134" text-anchor="middle" font-size="16" font-weight="800" fill="#f3f6fb">60° + 50° + 70° = 180°</text></svg>`;},
  says:['קורעים את 3 הפינות ושמים אותן זו ליד זו:','הן יוצרות <b>קו ישר</b> = 180°.'],what:'משולש: 3 זוויות = 180°.'},
 {h:'זוויות במרובע: 360°',d:1.4,svg:()=>`<svg viewBox="0 0 280 185" style="width:100%;max-width:300px" role="img" aria-label="אלכסון מחלק את המרובע לשני משולשים"><polygon points="30,150 250,160 215,40 75,25" fill="${GR}" fill-opacity=".1" stroke="#dfe8f5" stroke-width="2.5"/><polygon class="rv" style="--d:.5s" points="30,150 250,160 215,40" fill="${PU}" fill-opacity=".35"/><polygon class="rv" style="--d:1.2s" points="30,150 215,40 75,25" fill="${AN}" fill-opacity=".35"/><line class="rv" style="--d:.4s" x1="30" y1="150" x2="215" y2="40" stroke="#f3f6fb" stroke-width="3" stroke-dasharray="7 5"/></svg>`,
  says:['אלכסון מחלק מרובע ל־<b>2 משולשים</b>.',`${M('2 · 180 = 360'+DG)}`],what:'מרובע: 4 זוויות = 360°.'},
 {h:'שטח משולש: חצי מלבן',d:2.2,svg:()=>TA(8,5,1),says:['המשולש תופס בדיוק <b>חצי</b> מהמלבן שמסביבו.',`${M('8 · 5 : 2 = 20')} ${CM2}`],what:'שטח משולש = בסיס · גובה : 2.'},
 {h:'מעגל: רדיוס וקוטר',d:1.4,svg:()=>`<div style="display:flex;gap:18px;justify-content:center"><div style="width:120px">${CD({m:'r',lab:'r',an:1})}</div><div class="rv" style="--d:1s;width:120px">${CD({m:'d',lab:'d',an:1})}</div></div>`,
  says:[`${C('רדיוס',RC)}: מהמרכז אל הקו.`,`${C('קוטר',HC)} = 2 רדיוסים, דרך המרכז.`],what:'קוטר = 2 · רדיוס.'},
 {h:'היקף מעגל',d:1,svg:()=>CD({m:'d',lab:'d',ring:1,an:1}),says:['ההיקף ≈ 3.14 קטרים. למספר הזה קוראים π.',`היקף = ${M('π · d = 2 · π · r')}`],what:'קודם קוטר, ואז כופלים ב־π.'},
 {h:'שטח עיגול',d:1,svg:()=>CD({m:'r',lab:'r',fill:1,an:1}),says:[`שטח = ${M('π · r · r')}`,`רדיוס 5 ← ${M('5 · 5 · π = 25π')} ${CM2}`],what:'נתון קוטר? קודם מחלקים ב־2!'}];
RECAP[0].chk=[gWhich];RECAP[1].chk=[gCount,gRevP];RECAP[2].chk=[gCount,gRevS];RECAP[3].chk=[()=>gCalc(true),gSqRev];RECAP[4].chk=[gIncl,gInclShape];RECAP[5].chk=[gTriAng];RECAP[6].chk=[gQuadAng,gAngRect];RECAP[7].chk=[gTriArea];RECAP[8].chk=[gRD];RECAP[9].chk=[gCircP];RECAP[10].chk=[gCircA];
