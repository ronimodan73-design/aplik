/*META {"id":"t9_rev1","title":"חזרה למבחן · כפל מקוצר ושווה שוקיים · ערכה: רוני מודן","short":"חזרה למבחן","topic":"חזרה למבחן: כפל מקוצר ומשולש שווה שוקיים","glyph":"(a+b)²","color":"#5ec8ff"} */
const APP={key:'t9rev1',topic:'חזרה למבחן: כפל מקוצר ומשולש שווה שוקיים',sub:'כל המיומנויות של דף החזרה, בכל רמות החשיבה. מתחילים ב"מתחילים כאן".'};
/* ===== geometry: triangle ===== */
const W=400,H=300,CM='ס״מ';
const P2=(x,y)=>({x,y});
const rad=d=>d*Math.PI/180,degOf=r=>r*180/Math.PI;
/* triangle from the two base angles B (left) and C (right); apex on top */
function tri(Bd,Cd,names){let L=P2(70,252),Rr=P2(330,252);const base=Rr.x-L.x,A=180-Bd-Cd;
 const t=base*Math.sin(rad(Cd))/Math.sin(rad(A));let T=P2(L.x+t*Math.cos(rad(Bd)),L.y-t*Math.sin(rad(Bd)));
 const top=40;if(T.y<top){const k=(L.y-top)/(L.y-T.y),cx=(L.x+Rr.x)/2;const sc=p=>P2(cx+(p.x-cx)*k,L.y-(L.y-p.y)*k);T=sc(T);L=sc(L);Rr=sc(Rr);}
 const n=names||shuf(['A','B','C']);return {a:T,l:L,r:Rr,n:{a:n[0],l:n[1],r:n[2]},B:Bd,C:Cd,A};}
const isoT=(h,names)=>tri((180-h)/2,(180-h)/2,names);
const cen=t=>P2((t.a.x+t.l.x+t.r.x)/3,(t.a.y+t.l.y+t.r.y)/3);
function sectorAt(V,P,Q,col,o={}){const r=o.r||26;let a0=degOf(Math.atan2(V.y-P.y,P.x-V.x)),a1=degOf(Math.atan2(V.y-Q.y,Q.x-V.x));let d=((a1-a0)%360+360)%360;if(d>180){[a0,a1]=[a1,a0];d=360-d;}
 const p0=[V.x+r*Math.cos(rad(a0)),V.y-r*Math.sin(rad(a0))],p1=[V.x+r*Math.cos(rad(a0+d)),V.y-r*Math.sin(rad(a0+d))];
 return {path:`<path d="M${f(V.x)} ${f(V.y)} L${f(p0[0])} ${f(p0[1])} A${r} ${r} 0 0 0 ${f(p1[0])} ${f(p1[1])} Z" fill="${col}" fill-opacity="${o.op||.85}"/>`,mid:a0+d/2,span:d};}
const TX=(x,y,t,c,o={})=>`<text x="${f(x)}" y="${f(y)}" text-anchor="middle" font-size="${o.fs||18}" font-weight="800" fill="${c}" stroke="#13233a" stroke-width="5" paint-order="stroke" direction="${o.rtl?'rtl':'ltr'}" class="${o.cls||''}" style="--d:${o.d||0}s;font-family:Rubik">${t}</text>`;
function angleMark(t,v,col,txt,o={}){const V=t[v],others=['a','l','r'].filter(k=>k!==v);const s=sectorAt(V,t[others[0]],t[others[1]],col,o);
 const rr=(o.r||26)+(s.span<45?30:22)+Math.min(14,(txt||'').length*1.6);const lx=V.x+rr*Math.cos(rad(s.mid)),ly=V.y-rr*Math.sin(rad(s.mid));
 return `<g class="${o.cls||''}" style="--d:${o.d||0}s">${s.path}${txt?TX(lx,ly+6,txt,o.tc||col):''}</g>`;}
const SIDE={al:['a','l'],ar:['a','r'],lr:['l','r']};
function ticks(t,s,n,col,o={}){const [p,q]=SIDE[s].map(k=>t[k]);const m=P2((p.x+q.x)/2,(p.y+q.y)/2),L=Math.hypot(q.x-p.x,q.y-p.y),u=P2((q.x-p.x)/L,(q.y-p.y)/L),nn=P2(-u.y,u.x);let g='';
 for(let k=0;k<n;k++){const off=(k-(n-1)/2)*8,c=P2(m.x+u.x*off,m.y+u.y*off);g+=`<line x1="${f(c.x-nn.x*10)}" y1="${f(c.y-nn.y*10)}" x2="${f(c.x+nn.x*10)}" y2="${f(c.y+nn.y*10)}" stroke="${col}" stroke-width="3.5" stroke-linecap="round"/>`;}
 return `<g class="${o.cls||''}" style="--d:${o.d||0}s">${g}</g>`;}
function sideLab(t,s,txt,col,o={}){const [p,q]=SIDE[s].map(k=>t[k]),c=cen(t);const m=P2((p.x+q.x)/2,(p.y+q.y)/2);let nn=P2(-(q.y-p.y),q.x-p.x);const L=Math.hypot(nn.x,nn.y);nn=P2(nn.x/L,nn.y/L);
 if((m.x-c.x)*nn.x+(m.y-c.y)*nn.y<0)nn=P2(-nn.x,-nn.y);const k=o.k||24+Math.min(20,txt.length*2);return TX(m.x+nn.x*k,m.y+nn.y*k+6,txt,col,{cls:o.cls,d:o.d});}
function sideCol(t,s,col,o={}){const [p,q]=SIDE[s].map(k=>t[k]);return `<line x1="${f(p.x)}" y1="${f(p.y)}" x2="${f(q.x)}" y2="${f(q.y)}" stroke="${col}" stroke-width="7" stroke-linecap="round" class="${o.cls||''}" style="--d:${o.d||0}s"/>`;}
function vLabels(t){const c=cen(t);return ['a','l','r'].map(k=>{const V=t[k],dx=V.x-c.x,dy=V.y-c.y,L=Math.hypot(dx,dy);return TX(V.x+dx/L*24,V.y+dy/L*24+7,t.n[k],'#dfe8f5',{fs:20});}).join('');}
/* AD from apex to base point D (the base midpoint) with its marks */
function segAD(t,o={}){const D=P2((t.l.x+t.r.x)/2,(t.l.y+t.r.y)/2);let g=`<g class="${o.cls||''}" style="--d:${o.d||0}s"><line x1="${f(t.a.x)}" y1="${f(t.a.y)}" x2="${f(D.x)}" y2="${f(D.y)}" stroke="${o.col||PU}" stroke-width="3.5"/>`+TX(D.x,D.y+26,o.nm||'D','#dfe8f5',{fs:20})+'</g>';
 if(o.h)g+=`<path class="${o.hc||''}" style="--d:${o.hd||0}s" d="M${f(D.x)} ${f(D.y)} h-13 v-13 h13" fill="none" stroke="${GR}" stroke-width="3"/>`;
 if(o.m)g+=`<g class="${o.mc||''}" style="--d:${o.md||0}s">${[t.l,t.r].map(P=>{const m=P2((P.x+D.x)/2,D.y);return `<line x1="${f(m.x-3)}" y1="${f(m.y-9)}" x2="${f(m.x-3)}" y2="${f(m.y+9)}" stroke="${BL}" stroke-width="3"/><line x1="${f(m.x+3)}" y1="${f(m.y-9)}" x2="${f(m.x+3)}" y2="${f(m.y+9)}" stroke="${BL}" stroke-width="3"/>`}).join('')}</g>`;
 if(o.b){const half=(P)=>sectorAt(t.a,P,D,OR,{r:34,op:.75}).path;g+=`<g class="${o.bc||''}" style="--d:${o.bd||0}s">${half(t.l)}${half(t.r)}</g>`;}
 return g;}
function svgT(t,inner,o={}){return `<svg viewBox="0 0 ${W} ${H+10}" role="img" aria-label="משולש">${o.pre||''}<polygon points="${f(t.a.x)},${f(t.a.y)} ${f(t.l.x)},${f(t.l.y)} ${f(t.r.x)},${f(t.r.y)}" fill="#ffffff08" stroke="#dfe8f5" stroke-width="3" stroke-linejoin="round" class="${o.tc||''}" style="--d:0s"/>${inner}${o.noV?'':vLabels(t)}${o.note?`<text x="${W-8}" y="${H+4}" text-anchor="end" font-size="13" fill="#9fb3cc" direction="rtl">${o.note}</text>`:''}</svg>`;}
/* names */
const ang=(t,v)=>v==='a'?`∢${t.n.l}${t.n.a}${t.n.r}`:v==='l'?`∢${t.n.a}${t.n.l}${t.n.r}`:`∢${t.n.a}${t.n.r}${t.n.l}`;
const sd=(t,s)=>t.n[SIDE[s][0]]+t.n[SIDE[s][1]];
const OPP={l:'ar',r:'al',a:'lr'};
/* ===== question helpers ===== */
const ex=(a,b)=>(a===1?'':a)+'x'+(b>0?' + '+b:b<0?' − '+(-b):'');
function mkExpr(v,x0,avoid){let a,b,n=0;do{a=R(2,5);b=v-a*x0;n++;}while((a===avoid||b===0||Math.abs(b)>90)&&n<40);return [a,b];}
/* ===== shared helpers ===== */
const INK='#dfe8f5';
const N=v=>v<0?'−'+(-v):''+v;
const NP=v=>v<0?'('+N(v)+')':''+v;
const C=(t,c)=>`<b style="color:${c}">${t}</b>`;
const CK=(lab,opts,ok,why)=>{const o=shuf(opts);return {lab,choice:o,correct:o.indexOf(ok),why};};
/* polynomial A x² + B x + C */
function PL(A,B,Cc){let s='';const add=(c,t)=>{if(!c)return;const a=Math.abs(c),body=t?(a===1?t:a+t):''+a;s+=s?(c<0?' − ':' + ')+body:(c<0?'−':'')+body;};add(A,'x²');add(B,'x');add(Cc,'');return s||'0';}
const xa=a=>a===1?'x':a+'x';
const BR=(a,b)=>'('+xa(a)+(b<0?' − '+(-b):' + '+b)+')';
const nz=(lo,hi,bad=[])=>{let v;do{v=R(lo,hi);}while(bad.includes(v));return v;};
/* area model: square of side x + b */
function sqSvg(b,o={}){const X=56,Y=44,sx=150,sb=Math.min(96,30+b*10),cl=o.anim?'rv':'',d=o.d||0,lb=o.lb||{x:'x',b:''+b},t=(x,y,s,c,dd,fs)=>`<text class="${cl}" style="--d:${dd}s;font-family:Rubik" x="${x}" y="${y}" text-anchor="middle" font-size="${fs||26}" font-weight="800" fill="${c}">${s}</text>`;
 const I=o.inner||{xx:'x²',bx:b+'x',bb:''+(b*b)};const hd=o.hide||{};
 return `<svg viewBox="0 0 ${X+sx+sb+16} ${Y+sx+sb+14}" style="max-width:360px;direction:ltr" role="img" aria-label="ריבוע">
 <rect x="${X}" y="${Y}" width="${sx}" height="${sx}" fill="${BL}" fill-opacity=".26" stroke="${BL}" stroke-width="3"/>
 <rect x="${X+sx}" y="${Y}" width="${sb}" height="${sx}" fill="${OR}" fill-opacity=".26" stroke="${OR}" stroke-width="3"/>
 <rect x="${X}" y="${Y+sx}" width="${sx}" height="${sb}" fill="${OR}" fill-opacity=".26" stroke="${OR}" stroke-width="3"/>
 <rect x="${X+sx}" y="${Y+sx}" width="${sb}" height="${sb}" fill="${GR}" fill-opacity=".3" stroke="${GR}" stroke-width="3"/>
 <text x="${X+sx/2}" y="${Y-12}" text-anchor="middle" font-size="24" font-weight="800" fill="${BL}" style="font-family:Rubik">${lb.x}</text>
 <text x="${X+sx+sb/2}" y="${Y-12}" text-anchor="middle" font-size="24" font-weight="800" fill="${OR}" style="font-family:Rubik">${lb.b}</text>
 <text x="${X-14}" y="${Y+sx/2+8}" text-anchor="end" font-size="24" font-weight="800" fill="${BL}" style="font-family:Rubik">${lb.x}</text>
 <text x="${X-14}" y="${Y+sx+sb/2+8}" text-anchor="end" font-size="24" font-weight="800" fill="${OR}" style="font-family:Rubik">${lb.b}</text>
 ${t(X+sx/2,Y+sx/2+10,hd.xx?'?':I.xx,BL,d,30)}${t(X+sx+sb/2,Y+sx/2+9,hd.bx?'?':I.bx,OR,d+.6,22)}${t(X+sx/2,Y+sx+sb/2+9,hd.bx?'?':I.bx,OR,d+1.2,22)}${t(X+sx+sb/2,Y+sx+sb/2+9,hd.bb?'?':I.bb,GR,d+1.8,22)}</svg>`;}
/* every term times every term: (x + p)(x + q) with 4 arcs */
function foilSvg(p,q,o={}){const fs=34,cw=fs*.6,sp=fs*.32,y0=110;let x=14;const A=o.anim?'drawl':'',d=o.d||0;
 const T=[{t:'(',c:INK},{t:'x',c:BL},{t:p<0?'−':'+',c:INK,s:1},{t:''+Math.abs(p),c:OR},{t:')',c:INK},{t:'(',c:INK},{t:'x',c:BL},{t:q<0?'−':'+',c:INK,s:1},{t:''+Math.abs(q),c:OR},{t:')',c:INK}];
 T.forEach(k=>{if(k.s)x+=sp;k.x=x;k.w=[...k.t].length*cw;k.cx=x+k.w/2;x+=k.w;if(k.s)x+=sp;});let W=x+14,g='';
 const arc=(a,b,col,up,dd)=>{const y=up?y0-fs*.8:y0+10,dx=b.cx-a.cx,cy=up?y-18-dx*.28:y+12+dx*.3;return `<path class="${A}" style="--d:${dd}s" d="M${f(a.cx)} ${f(y)} Q${f((a.cx+b.cx)/2)} ${f(cy)} ${f(b.cx)} ${f(y)}" fill="none" stroke="${col}" stroke-width="3.2" stroke-linecap="round"/>`;};
 g+=arc(T[1],T[6],BL,1,d)+arc(T[1],T[8],OR,1,d+.5)+arc(T[3],T[6],OR,0,d+1)+arc(T[3],T[8],GR,0,d+1.5);
 g+=T.map(k=>`<text x="${f(k.x)}" y="${y0}" font-size="${fs}" font-weight="800" fill="${k.c}" style="font-family:Rubik">${k.t}</text>`).join('');
 let H=y0+70;if(o.res!==false){const m=p+q,l=p*q,y1=y0+104;let x2=14;const Rr=[{t:'=',c:INK,s:1},{t:'x²',c:BL}];if(m)Rr.push({t:m<0?'−':'+',c:INK,s:1},{t:Math.abs(m)===1?'x':Math.abs(m)+'x',c:OR});Rr.push({t:l<0?'−':'+',c:INK,s:1},{t:''+Math.abs(l),c:GR});
  Rr.forEach(k=>{if(k.s)x2+=sp;k.x=x2;x2+=[...k.t].length*cw;if(k.s)x2+=sp;});W=Math.max(W,x2+14);H=y1+16;
  g+=`<g class="${o.anim?'rv':''}" style="--d:${d+2.1}s">${Rr.map(k=>`<text x="${f(k.x)}" y="${y1}" font-size="${fs}" font-weight="800" fill="${k.c}" style="font-family:Rubik">${k.t}</text>`).join('')}</g>`;}
 return `<svg viewBox="0 0 ${f(W)} ${H}" style="max-width:${Math.min(380,W*1.05)}px;direction:ltr" role="img" aria-label="כפל סוגריים">${g}</svg>`;}
/* rotate a triangle so the base is not always at the bottom */
function rotT(t,dg){if(!dg)return t;const c=cen(t),r=rad(dg),ro=p=>P2(c.x+(p.x-c.x)*Math.cos(r)-(p.y-c.y)*Math.sin(r),c.y+(p.x-c.x)*Math.sin(r)+(p.y-c.y)*Math.cos(r));
 let a=ro(t.a),l=ro(t.l),rr=ro(t.r);const xs=[a.x,l.x,rr.x],ys=[a.y,l.y,rr.y],mx=Math.min(...xs),my=Math.min(...ys),w=Math.max(...xs)-mx,h=Math.max(...ys)-my,s=Math.min(280/w,215/h,1.15);
 const fit=p=>P2(60+(p.x-mx)*s+(280-w*s)/2,45+(p.y-my)*s+(215-h*s)/2);return {...t,a:fit(a),l:fit(l),r:fit(rr)};}
const NAMES=[['A','B','C'],['P','Q','R'],['D','E','F'],['G','H','J'],['W','X','Y'],['N','O','P']];
const legsT=(t,o={})=>ticks(t,'al',1,o.c||INK,o)+ticks(t,'ar',1,o.c||INK,o);

/* ================= כפל מקוצר ================= */
const RK={sum:'ריבוע של סכום: '+M('(a + b)² = a² + 2ab + b²'),dif:'ריבוע של הפרש: '+M('(a − b)² = a² − 2ab + b²'),mul:'סכום כפול הפרש: '+M('(a + b)(a − b) = a² − b²'),mid:'האיבר האמצעי הוא <b>פעמיים</b> המכפלה: '+M('2 · a · b')+'.',minus:'מינוס לפני סוגריים הופך את הסימן של <b>כל</b> איבר בפנים.'};
const FORMS=['(a + b)² = a² + 2ab + b²','(a − b)² = a² − 2ab + b²','(a + b)(a − b) = a² − b²'];
/* ★ חלק של מודל השטח */
function gAreaPart(){const b=nz(2,9,[3]),k=pick(['bx','bb','xx']);
 const L={bx:['הכתום',OR],bb:['הירוק',GR],xx:['הכחול',BL]}[k];
 const base={kind:'מודל השטח · חלק',rc:1,dia:h=>sqSvg(b,{hide:h?{}:{[k]:1}}),text:`צלע הריבוע היא ${M('x + '+b)}. מה השטח של <b style="color:${L[1]}">המלבן ${L[0]}</b>?`,rule:'שטח מלבן = אורך · רוחב. כל חלק בצבע שלו.',trick:'מסתכלים על שתי הצלעות של החלק <b>הצבעוני</b> בלבד.'};
 if(k==='bx')return {...base,tpl:'[] x',ans:[{label:'המקדם של x',col:OR,val:b}],work:[{t:`הצלעות של המלבן הכתום: ${M(b)} ו־${M('x')}. ${M(b+' · x = ? x')}`,ans:[{label:'',val:b}],why:'כופלים את שתי הצלעות של המלבן הכתום.'}],lines:[`הצלעות: ${C(M(b),OR)} ו־${C(M('x'),BL)}`,`השטח: ${M(b+' · x = '+b+'x')}`],diag:({vals:[v]})=>v===b*b?'זה המלבן הירוק. לכתום יש צלע אחת x.':v===2*b?'זה שני המלבנים הכתומים יחד. שואלים על <b>אחד</b>.':null};
 if(k==='bb')return {...base,ans:[{label:'השטח',col:GR,val:b*b}],work:[{t:`הריבוע הירוק: ${M(b+' · '+b+' = ?')}`,ans:[{label:'',val:b*b}],why:`הריבוע הירוק הוא ${M(b)} על ${M(b)}: כופלים, לא מחברים.`}],lines:[`הצלעות: ${M(b)} ו־${M(b)}`,`השטח: ${M(b+' · '+b+' = '+b*b)}`],diag:({vals:[v]})=>v===2*b?`חיברתם ${M(b+' + '+b)}. שטח = <b>כפל</b> הצלעות.`:null};
 const o=shuf(['x²','2x','x','x + x']);return {...base,choice:o.map(M),correct:o.indexOf('x²'),work:[{t:`${M('x · x = ?')}`,choice:o.map(M),correct:o.indexOf('x²'),why:`${M('x · x')} זה x בריבוע: ${M('x²')}. ${M('2x')} זה ${M('x + x')}.`}],lines:[`הצלעות: ${M('x')} ו־${M('x')}`,`השטח: ${M('x · x = x²')}`],diag:({sel})=>o[sel]==='2x'||o[sel]==='x + x'?`${M('x · x')} הוא <b>כפל</b>: ${M('x²')}. ${M('2x')} זה חיבור.`:null};}
/* ★ כל הריבוע */
function gArea(){const b=nz(2,9,[3]),good=PL(1,2*b,b*b),o=[good];[PL(1,0,b*b),PL(1,b,b*b),PL(1,2*b,2*b),PL(0,2,2*b)].forEach(z=>{if(!o.includes(z)&&o.length<4)o.push(z);});const o2=shuf(o);
 return {kind:'מודל השטח · כל הריבוע',rc:1,dia:h=>sqSvg(b,{anim:h,hide:h?{}:{xx:1,bx:1,bb:1}}),text:`צלע הריבוע היא ${M('x + '+b)}. מה השטח, ${M('(x + '+b+')²')}?`,choice:o2.map(M),correct:o2.indexOf(good),
  work:[{t:`הכחול: ${M('x · x = ? x²')}`,ans:[{label:'',val:1}],why:`${M('x · x = x²')}, כלומר ${M('1x²')}.`},{t:`שני הכתומים יחד: ${M(b+'x + '+b+'x = ? x')}`,ans:[{label:'',val:2*b}],why:'יש <b>שני</b> מלבנים כתומים!'},{t:`הירוק: ${M(b+' · '+b+' = ?')}`,ans:[{label:'',val:b*b}],why:'צלע כפול צלע.'}],
  lines:[M(`${C('x²',BL)} + ${C(b+'x',OR)} + ${C(b+'x',OR)} + ${C(b*b,GR)}`),`${M('(x + '+b+')² = '+good)}`],rule:RK.sum,trick:'יש <b>שני</b> מלבנים כתומים ← '+M('2 · '+b+'x'),
  diag:({sel})=>{const s=o2[sel];return s===PL(1,0,b*b)?'שכחתם את <b>המלבנים הכתומים</b>! הריבוע הוא לא רק כחול וירוק.':s===PL(1,b,b*b)?'יש <b>שני</b> מלבנים כתומים, לא אחד.':s===PL(1,2*b,2*b)?`הירוק הוא ${M(b+' · '+b)}, לא ${M(b+' + '+b)}.`:'שטח הריבוע = סכום ארבעת החלקים.';}};}
/* ★ התאמה בין ביטוי לפיתוח */
function gMatch(){const b=nz(2,9,[4]),k=pick([0,1,2,3]);
 const E=[`(x + ${b})²`,`(x − ${b})²`,`(x + ${b})(x − ${b})`,`(${b} − x)(${b} + x)`][k];
 const good=[PL(1,2*b,b*b),PL(1,-2*b,b*b),PL(1,0,-b*b),b*b+' − x²'][k];
 const pool=[PL(1,2*b,b*b),PL(1,-2*b,b*b),PL(1,0,-b*b),b*b+' − x²',PL(1,0,b*b),PL(1,-2*b,-b*b),PL(1,b,b*b)];
 const o=[good];shuf(pool).forEach(z=>{if(!o.includes(z)&&o.length<4)o.push(z);});const o2=shuf(o);const fi=k<2?k:2;
 return {kind:'איזה פיתוח מתאים?',rc:[1,2,3,3][k],dia:h=>k===3?'':foilSvg(k===0?b:k===1?-b:b,k===0?b:-b,{anim:h,res:h}),text:`מהו הפיתוח של ${M(E)}?`,choice:o2.map(M),correct:o2.indexOf(good),
  work:[{t:'איזו נוסחה מתאימה?',choice:FORMS.map(M),correct:fi,why:k<2?'שני סוגריים <b>זהים</b> בריבוע ← ריבוע של '+(k?'הפרש':'סכום')+'.':'אותם מספרים, פעם פלוס ופעם מינוס ← סכום כפול הפרש.'},
   ...(k<2?[{t:`האיבר האמצעי: ${M('2 · x · '+b+' = ? x')}`,ans:[{label:'',val:2*b}],why:RK.mid}]:[]),{t:`${M(b+'² = ?')}`,ans:[{label:'',val:b*b}],why:`${M(b+'² = '+b+' · '+b)}.`}],
  lines:k<2?[`${M(E+' = x² '+(k?'−':'+')+' 2 · x · '+b+' + '+b+'²')}`,`${M('= '+good)}`]:[`${M(E+' = '+(k===3?b+'² − x²':'x² − '+b+'²'))}`,`${M('= '+good)}`],rule:RK[['sum','dif','mul','mul'][k]],
  trick:k===1?'האמצעי מינוס, האחרון <b>תמיד פלוס</b>.':k>=2?'אין איבר אמצעי. מי <b>ראשון</b> בסוגריים – ראשון בתשובה.':'אל תשכחו את האיבר האמצעי '+M('2ab')+'.',
  diag:({sel})=>{const s=o2[sel];return s===PL(1,0,b*b)?'חסר האיבר האמצעי '+M('2 · x · '+b)+'.':s===PL(1,-2*b,-b*b)?M('(−'+b+')² = +'+b*b)+': האיבר האחרון חיובי.':s===PL(1,b,b*b)?RK.mid:(s===PL(1,0,-b*b)&&k===3)||(s===b*b+' − x²'&&k===2)?'מי ראשון? '+M(k===3?b:'x')+' ← הריבוע שלו בא ראשון.':'בדקו איזו נוסחה מתאימה: יש מינוס? הסוגריים זהים?';}};}
/* ★★ פיתוח מלא בהקלדה */
function gExpand(){const k=pick([0,1,2,0,1]),a=Math.random()<.35?pick([2,3]):1,b=nz(1,9,[4]),sb=k===1?-b:b;
 const E=k<2?BR(a,sb)+'²':BR(a,b)+BR(a,-b);const A=a*a,B=k<2?2*a*sb:0,Cc=k<2?b*b:-b*b;
 const tpl=k<2?'[] x² &nbsp; [] x &nbsp; []':'[] x² &nbsp; []';const ans=k<2?[{label:'המקדם של x²',col:BL,val:A},{label:'המקדם של x',col:OR,val:B,neg:true},{label:'המספר',col:GR,val:Cc,neg:true}]:[{label:'המקדם של x²',col:BL,val:A},{label:'המספר',col:GR,val:Cc,neg:true}];
 const w1={t:`האיבר הראשון בריבוע: ${M('('+xa(a)+')² = ? x²')}`,ans:[{label:'',val:A}],why:a>1?`גם המספר עולה בריבוע: ${M('('+a+'x)² = '+a+' · '+a+' · x² = '+A+'x²')}.`:M('x · x = x²')+'.'};
 const work=k<2?[w1,{t:`האמצעי: ${M('2 · '+xa(a)+' · '+NP(sb)+' = ? x')}`,ans:[{label:'',val:B}],why:RK.mid+(k?' ועם הסימן: פלוס כפול מינוס = מינוס.':'')},{t:`האחרון: ${M(NP(sb)+'² = ?')}`,ans:[{label:'',val:Cc}],why:'מספר בריבוע הוא תמיד <b>חיובי</b>.'}]:[w1,{t:`${M(b+'² = ?')} ובתשובה עם מינוס`,ans:[{label:'',val:Cc}],why:'בסכום כפול הפרש: הראשון בריבוע <b>פחות</b> השני בריבוע.'}];
 return {kind:k===2?'סכום כפול הפרש':'פיתוח ריבוע',rc:[1,2,3][k],dia:h=>a===1?foilSvg(k===0?b:k===1?-b:b,k===0?b:-b,{anim:h,res:h}):'',text:`פתחו: ${M(E)}. כתבו כל מקדם <b>עם הסימן שלו</b>.`,tpl,ans,work,
  lines:[`נוסחה: ${M(FORMS[k])}`,k<2?M(E+' = '+(a>1?'('+a+'x)²':'x²')+(k?' − ':' + ')+'2 · '+xa(a)+' · '+b+' + '+b+'²'):M(E+' = '+(a>1?'('+a+'x)²':'x²')+' − '+b+'²'),`${M('= '+PL(A,B,Cc))}`],rule:RK[['sum','dif','mul'][k]],trick:k<2?RK.mid:'אין איבר אמצעי: '+M('+'+b+'x − '+b+'x = 0'),
  diag:({vals})=>{const [p,q,r]=vals;if(k<2){if(q===0)return 'חסר <b>האיבר האמצעי</b>!';if(Math.abs(q)===a*b)return RK.mid;if(p===a&&a>1)return `גם ${M(a)} עולה בריבוע: ${M('('+a+'x)² = '+A+'x²')}.`;if(r===-b*b)return 'מינוס בריבוע = <b>פלוס</b>. האחרון חיובי.';if(q===-B)return 'בדקו את הסימן של האיבר האמצעי.';}else{if(q===b*b)return 'בסכום כפול הפרש התשובה עם <b>מינוס</b>: '+M('x² − '+b*b)+'.';if(p===a&&a>1)return `גם ${M(a)} עולה בריבוע.`;}return null;}};}
/* ★★ השלמת החסר */
function gMissing(){const k=pick([0,1,2,3]);let b,tpl,ans,work,lines,E,rc;
 if(k===0){b=nz(3,12,[5,3]);tpl=`(x + []) ² = x² + [] x + ${b*b}`;ans=[{label:'מספר בסוגריים',col:OR,val:b},{label:'האיבר האמצעי',col:OR,val:2*b}];rc=1;
  work=[{t:`איזה מספר בריבוע נותן ${M(b*b)}? ${M('?² = '+b*b)}`,ans:[{label:'',val:b}],why:'מחפשים מספר שכפול עצמו נותן את האיבר האחרון.'},{t:`האמצעי: ${M('2 · x · '+b+' = ? x')}`,ans:[{label:'',val:2*b}],why:RK.mid}];lines=[`${M(b+' · '+b+' = '+b*b)} ← בסוגריים ${M(b)}`,`האמצעי: ${M('2 · x · '+b+' = '+2*b+'x')}`];}
 else if(k===1){b=nz(2,11,[7,3]);tpl=`(x − []) ² = x² − ${2*b}x + []`;ans=[{label:'מספר בסוגריים',col:OR,val:b},{label:'האיבר האחרון',col:GR,val:b*b}];rc=2;
  work=[{t:`מהאמצעי: ${M('2 · x · ? = '+2*b+'x')}. ${M(2*b+' : 2 = ?')}`,ans:[{label:'',val:b}],why:'האיבר האמצעי הוא <b>פעמיים</b> המספר ← מחלקים ב־2.'},{t:`האחרון: ${M(b+'² = ?')}`,ans:[{label:'',val:b*b}],why:'מעלים בריבוע. מינוס בריבוע = פלוס.'}];lines=[`${M(2*b+' : 2 = '+b)} ← בסוגריים ${M(b)}`,`האחרון: ${M(b+'² = '+b*b)}`];}
 else if(k===2){const a=pick([2,4,5]);b=nz(1,7,[4]);tpl=`([] x − ${b}) ² = ${a*a}x² − [] x + ${b*b}`;ans=[{label:'המקדם בסוגריים',col:BL,val:a},{label:'האיבר האמצעי',col:OR,val:2*a*b}];rc=2;
  work=[{t:`איזה מספר בריבוע נותן ${M(a*a)}?`,ans:[{label:'',val:a}],why:`${M('('+a+'x)² = '+a*a+'x²')}.`},{t:`האמצעי: ${M('2 · '+a+'x · '+b+' = ? x')}`,ans:[{label:'',val:2*a*b}],why:RK.mid}];lines=[`${M('('+a+'x)² = '+a*a+'x²')}`,`האמצעי: ${M('2 · '+a+'x · '+b+' = '+2*a*b+'x')}`];}
 else{b=nz(2,12,[8]);tpl=`(x + ${b})(x − []) = x² − []`;ans=[{label:'מספר בסוגריים',col:OR,val:b},{label:'המספר',col:GR,val:b*b}];rc=3;
  work=[{t:'בסכום כפול הפרש, המספרים בשני הסוגריים…',choice:['שווים','שונים','אחד כפול השני'],correct:0,why:'אותו מספר: פעם פלוס, פעם מינוס.'},{t:`${M(b+'² = ?')}`,ans:[{label:'',val:b*b}],why:'הראשון בריבוע פחות השני בריבוע.'}];lines=[`אותו מספר בשני הסוגריים: ${M(b)}`,`${M('(x + '+b+')(x − '+b+') = x² − '+b*b)}`];}
 return {kind:'משלימים את החסר',rc,text:'השלימו את המספרים החסרים, כך שהשוויון יהיה נכון.',tpl,ans,work,lines,rule:[RK.sum,RK.dif,RK.dif,RK.mul][k],trick:k===1?'מהאמצעי ← מחלקים ב־2.':k===3?'אותו מספר בשני הסוגריים.':'האחרון = המספר בריבוע.',
  diag:({vals:[p,q]})=>k===1&&p===2*b?'האמצעי הוא <b>פעמיים</b> המספר: מחלקים ב־2.':k===0&&q===b?RK.mid:k===0&&p*2===b*b?'מחפשים מספר שכפול <b>עצמו</b> נותן '+M(b*b)+'.':k===3&&q===2*b?'בסכום כפול הפרש: '+M(b+' · '+b)+', לא '+M(b+' + '+b)+'.':null};}
/* ★★★ פותחים ומחסירים */
function gDiff(){const k=pick([0,1,2,3]),b=nz(3,9,[]);let E,P,Q,tpl,ans,work;
 if(k===0){E=`(x + ${b})² − x²`;P=2*b;Q=b*b;}else if(k===1){E=`(x − ${b})² − x²`;P=-2*b;Q=b*b;}else if(k===2){E=`(x + ${b})² − (x − ${b})²`;P=4*b;Q=0;}else{E=`(x + ${b})(x − ${b}) − x²`;P=0;Q=-b*b;}
 if(k===2){tpl='[] x';ans=[{label:'המקדם של x',col:OR,val:P}];work=[{t:`פותחים את הראשון: ${M('(x + '+b+')² = x² + ? x + '+b*b)}`,ans:[{label:'',val:2*b}],why:RK.mid},{t:`המינוס לפני ${M('(x − '+b+')²')} הופך הכול: ${M('− x² + ? x − '+b*b)}`,ans:[{label:'',val:2*b}],why:RK.minus},{t:`${M(2*b+'x + '+2*b+'x = ? x')}`,ans:[{label:'',val:P}],why:'מחברים את האיברים עם x. x² ו־'+M(b*b)+' מתקזזים.'}];}
 else if(k===3){tpl='[]';ans=[{label:'התוצאה',col:GR,val:Q,neg:true}];work=[{t:`${M('(x + '+b+')(x − '+b+') = x² − ?')}`,ans:[{label:'',val:b*b}],why:RK.mul},{t:`${M('x² − '+b*b+' − x² = ?')}`,ans:[{label:'',val:Q}],why:M('x² − x² = 0')+', נשאר רק המספר.'}];}
 else{tpl='[] x &nbsp; []';ans=[{label:'המקדם של x',col:OR,val:P,neg:true},{label:'המספר',col:GR,val:Q}];work=[{t:`האמצעי של ${M('(x '+(k?'−':'+')+' '+b+')²')}: ${M('? x')}`,ans:[{label:'',val:P}],why:RK.mid+(k?' עם מינוס.':'')},{t:`האחרון: ${M(NP(k?-b:b)+'² = ?')}`,ans:[{label:'',val:Q}],why:'מספר בריבוע – חיובי.'}];}
 return {kind:'פותחים ומפשטים',rc:k===2?5:k===3?3:k?2:1,text:`פשטו: ${M(E)}`,tpl,ans,work,lines:[k===3?M(E+' = x² − '+b*b+' − x²'):k===2?M('(x + '+b+')² = x² + '+2*b+'x + '+b*b)+'<br>'+M('−(x − '+b+')² = −x² + '+2*b+'x − '+b*b):M(E+' = '+PL(1,P,Q)+' − x²'),`${M('= '+PL(0,P,Q))}`],rule:k===2?RK.minus:RK[['sum','dif','sum','mul'][k]],trick:k===2?'מינוס לפני סוגריים ← <b>כל</b> סימן מתהפך.':'קודם פותחים, אחר כך '+M('x² − x² = 0'),
  diag:({vals:[p,q]})=>k===2&&p===0?'המינוס לפני הסוגריים השני הופך גם את '+M('−'+2*b+'x')+' ל־'+M('+'+2*b+'x')+'.':k<2&&Math.abs(p)===b?RK.mid:k<2&&q===-b*b?'מספר בריבוע הוא חיובי.':k===3&&p===b*b?'בסכום כפול הפרש יש <b>מינוס</b>: '+M('x² − '+b*b)+'.':null};}
/* ★★★ השורה השגויה */
function errSet(){const s=pick([1,-1]),b=nz(2,7,[5]),c=nz(2,8,[b,5]);const P=s*2*b,L1=`(x ${s>0?'+':'−'} ${b})² − (x + ${c})(x − ${c})`;
 const ok=[L1,`= ${PL(1,P,b*b)} − (x² − ${c*c})`,`= ${PL(1,P,b*b)} − x² + ${c*c}`,`= ${PL(0,P,b*b+c*c)}`];const e=pick([2,2,3,4]),L=ok.slice();let why;
 if(e===2){if(Math.random()<.5){L[1]=`= x² + ${b*b} − (x² − ${c*c})`;L[2]=`= x² + ${b*b} − x² + ${c*c}`;L[3]=`= ${b*b+c*c}`;why='שכחו את האיבר האמצעי: '+M('(a ± b)² ≠ a² + b²');}else{L[1]=`= ${PL(1,s*b,b*b)} − (x² − ${c*c})`;L[2]=`= ${PL(1,s*b,b*b)} − x² + ${c*c}`;L[3]=`= ${PL(0,s*b,b*b+c*c)}`;why='האיבר האמצעי הוא <b>פעמיים</b>: '+M('2 · '+b+' = '+2*b);}}
 else if(e===3){L[2]=`= ${PL(1,P,b*b)} − x² − ${c*c}`;L[3]=`= ${PL(0,P,b*b-c*c)}`;why='המינוס לפני הסוגריים הופך גם את '+M('−'+c*c)+' ל־'+M('+'+c*c)+'.';}
 else{const w=b*b-c*c===b*b+c*c?1:b*b-c*c;L[3]=`= ${PL(0,P,w)}`;why=M(b*b+' + '+c*c+' = '+(b*b+c*c))+'. טעות בחיבור המספרים.';}
 return {s,b,c,P,L,e,why,ok};}
function errDia(L){return `<div style="direction:ltr;text-align:left;font:700 19px Rubik;line-height:1.9;padding:4px 10px">${L.map((l,i)=>`<div><span style="color:#9fb3cc;font-size:15px">שורה ${i+1}&nbsp;&nbsp;</span>${M(l)}</div>`).join('')}</div>`;}
function gErrLine(){const z=errSet(),o=['שורה 2','שורה 3','שורה 4'];
 return {kind:'מוצאים את השורה השגויה',rc:z.e===3?5:4,dia:()=>errDia(z.L),text:'מאיה פישטה את הביטוי. באחת השורות יש טעות. באיזו?',choice:o,correct:z.e-2,
  work:[{t:'בודקים את שורה 2: פתחו את הסוגריים הראשונים. האם יצא כמו אצל מאיה?',choice:['כן','לא'],correct:z.e===2?1:0,why:'בודקים את האיבר האמצעי: '+M('2 · '+b0(z)+' · x')},{t:'בודקים את שורה 3: האם המינוס הפך את <b>כל</b> הסימנים בסוגריים?',choice:['כן','לא'],correct:z.e===3?1:0,why:RK.minus}],
  lines:[`הטעות בשורה ${z.e}: ${z.why}`,`הנכון: ${M(z.ok[z.e-1])}`],rule:'בודקים שורה אחרי שורה: נוסחה ← מינוס לפני סוגריים ← כינוס.',trick:'שני מוקשים: האיבר האמצעי, ומינוס לפני סוגריים.',diag:()=>'פתחו בעצמכם בטיוטה, והשוו שורה אחרי שורה.'};}
const b0=z=>z.b;
function gErrFix(){const z=errSet();const T=z.b*z.b+z.c*z.c;
 return {kind:'מתקנים ומפשטים עד הסוף',rc:5,dia:()=>errDia([z.L[0]]),text:'פשטו נכון עד הסוף.',tpl:'[] x &nbsp; []',ans:[{label:'המקדם של x',col:OR,val:z.P,neg:true},{label:'המספר',col:GR,val:T}],
  work:[{t:`פותחים: ${M('(x '+(z.s>0?'+':'−')+' '+z.b+')² = x² + ? x + '+z.b*z.b)} <small>(עם הסימן)</small>`,ans:[{label:'',val:z.P}],why:RK.mid},{t:`${M('(x + '+z.c+')(x − '+z.c+') = x² − ?')}`,ans:[{label:'',val:z.c*z.c}],why:RK.mul},{t:`אחרי המינוס: ${M(z.b*z.b+' + '+z.c*z.c+' = ?')}`,ans:[{label:'',val:T}],why:'מינוס כפול מינוס = פלוס: '+M('−(−'+z.c*z.c+') = +'+z.c*z.c)}],
  lines:z.ok.slice(1).map(l=>M(l)),rule:RK.minus,trick:'מינוס לפני סוגריים ← '+M('−(x² − '+z.c*z.c+') = −x² + '+z.c*z.c),
  diag:({vals:[p,q]})=>q===z.b*z.b-z.c*z.c?'המינוס לפני הסוגריים הופך את '+M('−'+z.c*z.c)+' ל־<b>פלוס</b>.':Math.abs(p)===z.b?RK.mid:q===z.c*z.c?'שכחתם את '+M(z.b*z.b)+' מהריבוע.':null};}
/* ★★★ חידות מספרים */
function gPuzzle(){const k=pick([0,1,2]);let x0,kk,Nn,txt,eqs,good,work,lines;
 if(k===0){do{kk=pick([1,2,3,5]);x0=R(4,20);}while((kk===1&&(x0===13||x0===7)));Nn=2*kk*x0+kk*kk;txt=`ריבוע המספר הגדול מ־x ב־${M(kk)} גדול ב־${M(Nn)} מריבוע x. מהו x?`;good=`(x + ${kk})² − x² = ${Nn}`;eqs=[good,`(x + ${kk})² = ${Nn}`,`x² − (x + ${kk})² = ${Nn}`,`x² + ${kk}² = ${Nn}`];
  work=[{t:`פותחים: ${M('(x + '+kk+')² − x² = ? x + '+kk*kk)}`,ans:[{label:'',val:2*kk}],why:RK.mid+' ו־'+M('x² − x² = 0')},{t:`${M(2*kk+'x = '+Nn+' − '+kk*kk+' = ?')}`,ans:[{label:'',val:2*kk*x0}],why:'מעבירים את המספר לצד השני ומחליפים סימן.'},{t:`${M('x = '+2*kk*x0+' : '+2*kk+' = ?')}`,ans:[{label:'x =',val:x0}],why:'מחלקים את שני הצדדים.'}];
  lines=[M(good),M(2*kk+'x + '+kk*kk+' = '+Nn),M(2*kk+'x = '+2*kk*x0)+' ← '+M('x = '+x0),`בדיקה: ${M((x0+kk)+'² − '+x0+'² = '+(x0+kk)**2+' − '+x0*x0+' = '+Nn)} ✓`];}
 else if(k===1){do{kk=pick([2,4,5]);x0=R(6,20);}while(x0<=kk);Nn=2*kk*x0-kk*kk;txt=`ריבוע המספר x גדול ב־${M(Nn)} מריבוע המספר הקטן מ־x ב־${M(kk)}. מהו x?`;good=`x² − (x − ${kk})² = ${Nn}`;eqs=[good,`(x − ${kk})² − x² = ${Nn}`,`x² − x − ${kk}² = ${Nn}`,`(x − ${kk})² = ${Nn}`];
  work=[{t:`${M('(x − '+kk+')² = x² − ? x + '+kk*kk)}`,ans:[{label:'',val:2*kk}],why:RK.mid},{t:`אחרי המינוס: ${M('x² − x² + '+2*kk+'x − '+kk*kk+' = '+Nn)}. ${M(2*kk+'x = ?')}`,ans:[{label:'',val:2*kk*x0}],why:RK.minus+' אחר כך מעבירים '+M(kk*kk)+' ומחליפים סימן.'},{t:`${M('x = ?')}`,ans:[{label:'x =',val:x0}],why:'מחלקים ב־'+M(2*kk)+'.'}];
  lines=[M(good),M('x² − x² + '+2*kk+'x − '+kk*kk+' = '+Nn),M(2*kk+'x = '+2*kk*x0)+' ← '+M('x = '+x0),`בדיקה: ${M(x0+'² − '+(x0-kk)+'² = '+x0*x0+' − '+(x0-kk)**2+' = '+Nn)} ✓`];}
 else{kk=R(1,4);x0=R(kk+3,13);Nn=x0*x0-kk*kk;txt=`מכפלת המספר הגדול מ־x ב־${M(kk)} במספר הקטן מ־x ב־${M(kk)} היא ${M(Nn)}. מהו x (חיובי)?`;good=`(x + ${kk})(x − ${kk}) = ${Nn}`;eqs=[good,`(x + ${kk})² = ${Nn}`,`x + ${kk} · x − ${kk} = ${Nn}`,`(x − ${kk})² = ${Nn}`];
  work=[{t:`${M('(x + '+kk+')(x − '+kk+') = x² − ?')}`,ans:[{label:'',val:kk*kk}],why:RK.mul},{t:`${M('x² = '+Nn+' + '+kk*kk+' = ?')}`,ans:[{label:'',val:x0*x0}],why:'מעבירים את המספר לצד השני ומחליפים סימן.'},{t:`איזה מספר חיובי בריבוע נותן ${M(x0*x0)}?`,ans:[{label:'x =',val:x0}],why:'מחפשים מספר שכפול עצמו נותן '+M(x0*x0)+'.'}];
  lines=[M(good),M('x² − '+kk*kk+' = '+Nn),M('x² = '+x0*x0)+' ← '+M('x = '+x0),`בדיקה: ${M((x0+kk)+' · '+(x0-kk)+' = '+Nn)} ✓`];}
 const eo=[...new Set(eqs)];
 return {kind:'חידת מספרים',rc:k===2?3:k?2:1,text:txt,crack:[CK('מה המשוואה?',eo.map(M),M(good),'מתרגמים מילה אחרי מילה: "המספר הגדול מ־x ב־'+kk+'" = '+M('x + '+kk)+'. "גדול ב־" = הגדול פחות הקטן.'),CK('מה עושים קודם?',['פותחים סוגריים עם נוסחה','מחלקים ב־2','מוציאים שורש מכל צד'],'פותחים סוגריים עם נוסחה','קודם פותחים סוגריים, ואז פותרים משוואה רגילה.')],
  ans:[{label:'x =',col:PU,val:x0}],work,lines,rule:'מילים ← משוואה ← פותחים סוגריים ← פותרים ← בודקים.',trick:'"גדול ב־" ← הגדול <b>פחות</b> הקטן.',diag:({vals:[v]})=>v===-x0?'מבקשים x חיובי.':null};}
/* ★★★★ מי גדול יותר? */
function gCmp(){const k=pick([0,0,3]);
 if(k===0){let n,d;do{n=pick([15,20,30,35,40,45,60,70,80,90]);d=R(1,4);}while(d===1&&(n===25||n===50));const opts=[`${M(n+' · '+n)}, גדול ב־${M(d*d)}`,`${M((n-d)+' · '+(n+d))}, גדול ב־${M(d*d)}`,`${M(n+' · '+n)}, גדול ב־${M(d===2?2:2*d)}`,'הם שווים'];const correct=0;
  return {kind:'מי גדול יותר?',rc:3,text:`בלי מחשבון: מי גדול יותר, ${M(n+' · '+n)} או ${M((n-d)+' · '+(n+d))}? ובכמה?`,choice:opts,correct,
   crack:[CK('איך כותבים את '+M((n-d)+' · '+(n+d))+'?',[M('('+n+' − '+d+')('+n+' + '+d+')'),M('('+n+' − '+d+')²'),M(n+' · '+n+' − '+d)],M('('+n+' − '+d+')('+n+' + '+d+')'),'שני המספרים במרחק שווה מ־'+M(n)+' ← סכום כפול הפרש.')],
   work:[{t:`${M('('+n+' − '+d+')('+n+' + '+d+') = '+n+'² − ?')}`,ans:[{label:'',val:d*d}],why:RK.mul},{t:`ולכן ${M(n+' · '+n)} גדול ב־?`,ans:[{label:'',val:d*d}],why:'ההפרש הוא בדיוק '+M(d+'²')+'.'}],lines:[`${M((n-d)+' · '+(n+d)+' = ('+n+' − '+d+')('+n+' + '+d+') = '+n+'² − '+d+'²')}`,`${M(n*n+' − '+d*d+' = '+(n*n-d*d))} ← ${M(n+' · '+n)} גדול ב־${M(d*d)}`],rule:RK.mul,trick:'מספרים במרחק שווה מאמצע ← סכום כפול הפרש.',diag:({sel})=>sel===2?'ההפרש הוא בדיוק '+M(d+'² = '+d*d)+'.':sel===3?'בדקו עם הנוסחה: '+M('(a − b)(a + b) = a² − b²')+'.':'מכפלת שני מספרים "סביב" '+M(n)+' תמיד <b>קטנה</b> מ־'+M(n+'²')+'.'};}
 if(k===1){const n=pick([20,30,40,50,60,70]),d=R(1,3);return {kind:'חשבון בראש · סכום כפול הפרש',rc:3,text:`חשבו בראש: ${M((n-d)+' · '+(n+d))}`,ans:[{label:'התשובה',col:GR,val:n*n-d*d}],
   work:[{t:`${M((n-d)+' · '+(n+d)+' = ('+n+' − '+d+')('+n+' + '+d+')')}. ${M(n+'² = ?')}`,ans:[{label:'',val:n*n}],why:'כופלים את המספר העגול בעצמו.'},{t:`${M(d+'² = ?')}`,ans:[{label:'',val:d*d}],why:'מעלים בריבוע.'},{t:`${M(n*n+' − '+d*d+' = ?')}`,ans:[{label:'',val:n*n-d*d}],why:'הראשון בריבוע <b>פחות</b> השני בריבוע.'}],
   lines:[M((n-d)+' · '+(n+d)+' = '+n+'² − '+d+'²'),M(n*n+' − '+d*d+' = '+(n*n-d*d))],rule:RK.mul,trick:'מחפשים את המספר <b>באמצע</b>: '+M(n)+'.',diag:({vals:[v]})=>v===n*n?'שכחתם להחסיר '+M(d+'²')+'.':v===n*n-2*d?'מחסירים '+M(d+'²')+', לא '+M('2 · '+d)+'.':null};}
 if(k===2){const n=pick([20,30,40,50,60,70,80]),d=pick([1,1,2]),s=pick([1,-1]),v=n+s*d,res=v*v;return {kind:'חשבון בראש · ריבוע',rc:0,text:`חשבו בראש: ${M(v+'²')} (רמז: ${M(v+' = '+n+(s>0?' + ':' − ')+d)})`,ans:[{label:'התשובה',col:GR,val:res}],
   work:[{t:`${M(n+'² = ?')}`,ans:[{label:'',val:n*n}],why:'האיבר הראשון בריבוע.'},{t:`האמצעי: ${M('2 · '+n+' · '+d+' = ?')}`,ans:[{label:'',val:2*n*d}],why:RK.mid},{t:`${M(n*n+(s>0?' + ':' − ')+2*n*d+' + '+d*d+' = ?')}`,ans:[{label:'',val:res}],why:s>0?'מחברים את שלושת החלקים.':'בהפרש: האמצעי עם מינוס, האחרון עם פלוס.'}],
   lines:[M(v+'² = ('+n+(s>0?' + ':' − ')+d+')²'),M('= '+n*n+(s>0?' + ':' − ')+2*n*d+' + '+d*d+' = '+res)],rule:s>0?RK.sum:RK.dif,trick:'לא רק '+M(n+'² + '+d+'²')+': יש גם אמצעי!',diag:({vals:[x]})=>x===n*n+d*d?'חסר האיבר האמצעי '+M('2 · '+n+' · '+d)+'.':x===n*n+s*n*d+d*d?RK.mid:null};}
 const d=R(2,5);return {kind:'מה תמיד נכון?',rc:3,text:`לכל מספר n: ${M('n · n')} גדול מ־${M('(n − '+d+')(n + '+d+')')} ב־?`,ans:[{label:'גדול ב־',col:GR,val:d*d}],
  work:[{t:`${M('(n − '+d+')(n + '+d+') = n² − ?')}`,ans:[{label:'',val:d*d}],why:RK.mul}],lines:[M('(n − '+d+')(n + '+d+') = n² − '+d*d),M('n² − (n² − '+d*d+') = '+d*d)],rule:RK.mul,trick:'בודקים עם מספר: '+M('n = 10')+'.',diag:({vals:[x]})=>x===2*d?'זה '+M('2 · '+d)+'. צריך '+M(d+'²')+'.':null};}
/* ★★★★ נכון או לא נכון – כפל מקוצר */
const TFK=[['(x + 6)² = x² + 36','לכל x.',0,'חסר האיבר האמצעי '+M('12x')+'. בדיקה עם '+M('x = 1')+': '+M('49 ≠ 37')+'.'],['(x − 8)² = (8 − x)²','לכל x.',1,M('x − 8')+' ו־'+M('8 − x')+' הם מספרים נגדיים, והריבוע שלהם שווה.'],['(x + 7)(x − 7)','קטן מ־'+M('x²')+' לכל x.',1,M('(x + 7)(x − 7) = x² − 49')+': תמיד קטן ב־'+M('49')+'.'],['(3x)² = 3x²','לכל x.',0,M('(3x)² = 9x²')+'. גם '+M('3')+' עולה בריבוע.'],['x² − 81 = (x − 9)²','לכל x.',0,M('(x − 9)² = x² − 18x + 81')+', ואילו '+M('x² − 81 = (x + 9)(x − 9)')+'.'],['(x + 2)² − (x − 2)² = 8x','לכל x.',1,M('x² + 4x + 4 − x² + 4x − 4 = 8x')+'.'],['(−x − 5)² = (x + 5)²','לכל x.',1,M('−x − 5')+' הוא הנגדי של '+M('x + 5')+', והריבוע שלהם שווה.'],['(a − b)² = a² − b²','לכל a ו־b.',0,'חסר האיבר '+M('−2ab')+'. בדיקה: '+M('(5 − 3)² = 4')+', אבל '+M('25 − 9 = 16')+'.']];
function gTFk(){const [e,tl,ok,why]=pick(TFK);return {kind:'נכון או לא נכון? · כפל מקוצר',rc:4,text:`${M(e)} ${tl}`,choice:['נכון','לא נכון'],correct:ok?0:1,
  work:[{t:'מציבים מספר בשני הצדדים. האם יוצא שווה?',choice:['כן','לא'],correct:ok?0:1,why}],lines:[`<b>${ok?'נכון':'לא נכון'}</b>: ${why}`],rule:'בודקים עם הנוסחה, ומציבים מספר לבדיקה.',trick:'מספיקה דוגמה אחת שלא מתאימה ← לא נכון.',diag:()=>'הציבו x = 1 בשני הצדדים והשוו.'};}

/* ================= משולש שווה שוקיים ================= */
const RI={sum:'סכום הזוויות במשולש 180°. זוויות הבסיס שוות.',head:'זווית הראש היא <b>בין</b> השוקיים. הבסיס <b>מולה</b>.',three:'במשולש שווה שוקיים: גובה לבסיס = תיכון לבסיס = חוצה זווית הראש.'};
/* ★ שוקיים, בסיס, ראש – גם מסובב */
function gPartsR(){const nm=pick(NAMES),t=rotT(isoT(pick([40,50,70,80,100,120]),nm),pick([0,90,180,270,60,-60,135,-135])),k=pick(['head','base','legs','bases']);
 const opts={base:[sd(t,'lr'),sd(t,'al'),sd(t,'ar')],head:[ang(t,'a'),ang(t,'l'),ang(t,'r')],legs:[`${sd(t,'al')} ו־${sd(t,'ar')}`,`${sd(t,'al')} ו־${sd(t,'lr')}`,`${sd(t,'ar')} ו־${sd(t,'lr')}`],bases:[`${ang(t,'l')} ו־${ang(t,'r')}`,`${ang(t,'a')} ו־${ang(t,'l')}`,`${ang(t,'a')} ו־${ang(t,'r')}`]}[k];
 const o2=shuf(opts),Q={head:'מהי <b>זווית הראש</b>?',base:'מהו <b>הבסיס</b>?',legs:'מהן <b>השוקיים</b>?',bases:'מהן <b>זוויות הבסיס</b>?'}[k];
 return {kind:'שוקיים, בסיס, ראש',rc:6,dia:h=>svgT(t,legsT(t,{c:h?OR:INK})+(h?sideCol(t,'lr',BL)+angleMark(t,'a',PU,''):'')),text:`הקווים הקטנים מסמנים צלעות שוות. ${Q}`,choice:o2.map(x=>M(x)),correct:o2.indexOf(opts[0]),
  work:[{t:'מה מוצאים קודם?',choice:['את השוקיים (הצלעות המסומנות)','את הצלע התחתונה','את הזווית הגדולה'],correct:0,why:'הבסיס לא תמיד למטה! מתחילים מהסימונים.'}],
  lines:[`${C('השוקיים',OR)}: ${M(sd(t,'al'))} ו־${M(sd(t,'ar'))}. ${C('הבסיס',BL)}: ${M(sd(t,'lr'))}.`,`${C('זווית הראש',PU)} – בין השוקיים: ${M(ang(t,'a'))}. זוויות הבסיס: ${M(ang(t,'l'))}, ${M(ang(t,'r'))}.`],rule:RI.head,trick:'הבסיס לא תמיד למטה. מוצאים קודם את <b>השוקיים</b>.',diag:()=>'מצאו את הצלעות עם הקווים הקטנים: אלה השוקיים. הקודקוד ביניהן = זווית הראש.'};}
/* ★ זווית בסיס שנייה */
function gBaseEq(){const b=pick([35,40,55,65,70,80]),t=rotT(isoT(180-2*b,pick(NAMES)),pick([0,0,180,90]));
 return {kind:'זוויות הבסיס שוות',rc:7,dia:()=>svgT(t,legsT(t)+angleMark(t,'l',OR,b+'°')+angleMark(t,'r',OR,'?')),text:`${M(sd(t,'al')+' = '+sd(t,'ar'))}, ${M(ang(t,'l')+' = '+b+'°')}. מצאו את ${M(ang(t,'r'))}.`,ans:[{label:ang(t,'r'),col:OR,val:b,lt:1}],
  work:[{t:`${M(ang(t,'r'))} היא…`,choice:['זווית בסיס','זווית הראש'],correct:0,why:'היא יושבת על הבסיס, מול השוק.'},{t:'זוויות הבסיס שוות. כמה מעלות?',ans:[{label:'',val:b}],why:'במשולש שווה שוקיים זוויות הבסיס <b>שוות</b>.'}],lines:[`${M(ang(t,'l'))} ו־${M(ang(t,'r'))} הן זוויות הבסיס ← שוות.`,M(ang(t,'r')+' = '+b+'°')],rule:'במשולש שווה שוקיים זוויות הבסיס שוות.',diag:({vals:[x]})=>x===180-2*b?'זו זווית הראש. שואלים על זווית <b>בסיס</b>.':null};}
/* ★★ זווית בסיס מזווית ראש, ולהפך */
function gBase(){const b=pick([25,35,40,50,55,65,70]),h=180-2*b,t=rotT(isoT(h,pick(NAMES)),pick([0,0,90,180]));
 return {kind:'מוצאים זווית בסיס',rc:7,dia:()=>svgT(t,legsT(t)+angleMark(t,'a',PU,h+'°')+angleMark(t,'l',OR,'?')),text:`${M(sd(t,'al')+' = '+sd(t,'ar'))}, ${M(ang(t,'a')+' = '+h+'°')}. מצאו את ${M(ang(t,'l'))}.`,ans:[{label:ang(t,'l'),col:OR,val:b,lt:1}],
  work:[{t:`לשתי זוויות הבסיס יחד: ${M(`180° − ${h}° = ?`)}`,ans:[{label:'',val:180-h}],why:'סכום הזוויות במשולש 180°.'},{t:`כל אחת: ${M(`${180-h} : 2 = ?`)}`,ans:[{label:'',val:b}],why:'יש <b>שתי</b> זוויות בסיס שוות ← מחלקים ב־2.'}],lines:[M(`180° − ${h}° = ${180-h}°`),M(`${180-h}° : 2 = ${b}°`)],rule:RI.sum,trick:'מחסירים את הראש, ואז <b>מחלקים ב־2</b>.',
  diag:({vals:[x]})=>x===180-h?'זה <b>שתי</b> זוויות הבסיס יחד. מחלקים ב־2.':x===h?'רק זוויות הבסיס שוות זו לזו.':null};}
function gHead(){const b=pick([25,35,45,55,60,65,80]),h=180-2*b,t=rotT(isoT(h,pick(NAMES)),pick([0,0,90,270]));
 return {kind:'מוצאים זווית ראש',rc:7,dia:()=>svgT(t,legsT(t)+angleMark(t,'r',OR,b+'°')+angleMark(t,'a',PU,'?')),text:`${M(sd(t,'al')+' = '+sd(t,'ar'))}, ${M(ang(t,'r')+' = '+b+'°')}. מצאו את ${M(ang(t,'a'))}.`,ans:[{label:ang(t,'a'),col:PU,val:h,lt:1}],
  work:[{t:`זווית הבסיס השנייה ${M(ang(t,'l'))}:`,ans:[{label:'',val:b}],why:'זוויות הבסיס שוות.'},{t:`${M(`180° − ${b}° − ${b}° = ?`)}`,ans:[{label:'',val:h}],why:'מחסירים <b>שתי</b> זוויות בסיס.'}],lines:[M(`${ang(t,'l')} = ${b}°`),M(`180° − ${b}° − ${b}° = ${h}°`)],rule:RI.sum,trick:'מחסירים את זווית הבסיס <b>פעמיים</b>.',
  diag:({vals:[x]})=>x===180-b?'חיסרתם רק זווית בסיס אחת. יש <b>שתיים</b>.':null};}
/* ★★ חצי בסיס / חצי זווית */
function gHalf(){const nm=pick(NAMES),h=pick([40,50,60,70,80,100,110]),t=isoT(h,nm),k=Math.random()<.5,base=2*R(3,12),F='M';
 if(k)return {kind:'גובה לבסיס · חצי בסיס',rc:9,dia:()=>svgT(t,legsT(t)+segAD(t,{h:1,nm:F})+sideLab(t,'lr',''+base,BL,{k:44})),text:`${M(sd(t,'al')+' = '+sd(t,'ar'))}, ${M(t.n.a+F)} גובה לבסיס, ${M(sd(t,'lr')+' = '+base)} ${CM}. מצאו את ${M(t.n.l+F)}.`,ans:[{label:t.n.l+F,col:BL,val:base/2,unit:CM,lt:1}],
  work:[{t:'הגובה לבסיס הוא גם…',choice:['תיכון לבסיס','שוק','קטע מקביל לבסיס'],correct:0,why:RI.three},{t:`${M(base+' : 2 = ?')}`,ans:[{label:'',val:base/2}],why:'תיכון מגיע ל<b>אמצע</b> הבסיס.'}],lines:['הגובה לבסיס הוא גם תיכון ← '+M(F)+' אמצע הבסיס.',M(base+' : 2 = '+base/2)+' '+CM],rule:RI.three,trick:'גובה לבסיס ← גם תיכון ← חצי בסיס.',diag:({vals:[x]})=>x===base?'זה כל הבסיס. מחלקים ב־2.':null};
 return {kind:'גובה לבסיס · חצי זווית',rc:9,dia:()=>svgT(t,legsT(t)+segAD(t,{h:1,nm:F})+angleMark(t,'a',PU,h+'°',{r:22})),text:`${M(sd(t,'al')+' = '+sd(t,'ar'))}, ${M(t.n.a+F)} גובה לבסיס, ${M(ang(t,'a')+' = '+h+'°')}. מצאו את ${M('∢'+t.n.l+t.n.a+F)}.`,ans:[{label:'∢'+t.n.l+t.n.a+F,col:OR,val:h/2,lt:1}],
  work:[{t:'הגובה לבסיס הוא גם…',choice:['חוצה זווית הראש','שוק','קטע מקביל לבסיס'],correct:0,why:RI.three},{t:`${M(h+' : 2 = ?')}`,ans:[{label:'',val:h/2}],why:'חוצה זווית מחלק אותה לשני חלקים שווים.'}],lines:['הגובה לבסיס הוא גם חוצה זווית הראש.',M(h+'° : 2 = '+h/2+'°')],rule:RI.three,trick:'גובה לבסיס ← גם חוצה זווית ← חצי זווית.',diag:({vals:[x]})=>x===90?'90° היא הזווית ליד '+M(F)+'.':x===h?'מחלקים את זווית הראש ב־2.':null};}
/* ★★ איזו משוואה נכונה + פתרון */
function eqSet(){let b,a1,c1,x0,h,a2,c2;do{x0=R(6,25);b=R(45,75);h=180-2*b;a1=R(1,3);c1=b-a1*x0;a2=R(1,4);c2=h-a2*x0;}while(!c1||!c2||Math.abs(c1)>60||Math.abs(c2)>90||(a1===2&&c1===5));return {b,h,x0,a1,c1,a2,c2,eB:ex(a1,c1),eH:ex(a2,c2)};}
function gEqWhich(){const z=eqSet(),nm=pick(NAMES),t=isoT(z.h,nm);const good=`2(${z.eB}) + (${z.eH}) = 180`,opts=shuf([good,`(${z.eB}) + (${z.eH}) = 180`,`(${z.eB}) + 2(${z.eH}) = 180`,`${z.eB} = ${z.eH}`]);
 return {kind:'איזו משוואה נכונה?',rc:7,dia:()=>svgT(t,legsT(t)+angleMark(t,'l',OR,z.eB)+angleMark(t,'r',OR,z.eB)+angleMark(t,'a',PU,z.eH)),text:`${M(sd(t,'al')+' = '+sd(t,'ar'))}. כל זווית בסיס ${M('('+z.eB+')°')}, זווית הראש ${M('('+z.eH+')°')}. איזו משוואה נכונה?`,choice:opts.map(M),correct:opts.indexOf(good),
  work:[{t:'כמה זוויות בסיס יש במשולש?',ans:[{label:'',val:2}],why:'שתי זוויות בסיס שוות ← הביטוי שלהן מופיע <b>פעמיים</b>.'},{t:'כמה פעמים מופיעה זווית הראש?',ans:[{label:'',val:1}],why:'יש רק זווית ראש אחת.'}],
  lines:['בסיס + בסיס + ראש = 180°',M(good)],rule:RI.sum,trick:'זווית הבסיס נכנסת למשוואה <b>פעמיים</b>.',diag:({sel})=>opts[sel].startsWith('(')&&!opts[sel].includes('2(')?'יש <b>שתי</b> זוויות בסיס: הביטוי שלהן פעמיים.':opts[sel].includes('+ 2(')?'זווית הראש אחת. זוויות הבסיס – שתיים.':'זווית הראש לא שווה לזווית הבסיס.'};}
function gEqSolve(){const z=eqSet(),nm=pick(NAMES),t=isoT(z.h,nm),A=2*z.a1+z.a2,Bc=2*z.c1+z.c2;
 return {kind:'פותרים ומוצאים זוויות',rc:7,dia:()=>svgT(t,legsT(t)+angleMark(t,'l',OR,z.eB)+angleMark(t,'r',OR,z.eB)+angleMark(t,'a',PU,z.eH)),text:`${M(sd(t,'al')+' = '+sd(t,'ar'))}. זוויות הבסיס ${M('('+z.eB+')°')}, זווית הראש ${M('('+z.eH+')°')}. מצאו את x ואת הזוויות.`,
  ans:[{label:'x =',col:PU,val:z.x0,unit:''},{label:'זווית בסיס',col:OR,val:z.b},{label:'זווית הראש',col:PU,val:z.h}],
  work:[{t:`${M('2('+z.eB+') + ('+z.eH+') = 180')} ← כמה x יש? ${M('? x')}`,ans:[{label:'',val:A}],why:'פותחים סוגריים ומחברים x עם x: '+M('2 · '+z.a1+' + '+z.a2)},{t:`${M(A+'x = 180 '+(Bc<0?'+ '+(-Bc):'− '+Bc)+' = ?')}`,ans:[{label:'',val:A*z.x0}],why:'מספר שעובר צד מחליף סימן.'},{t:`${M('x = ?')}`,ans:[{label:'x =',val:z.x0}],why:'מחלקים ב־'+M(A)+'.'},{t:`זווית בסיס: ${M(z.a1+' · '+z.x0+(z.c1<0?' − ':' + ')+Math.abs(z.c1)+' = ?')}`,ans:[{label:'',val:z.b}],why:'מציבים את x בביטוי.'},{t:`זווית הראש: ${M(z.a2+' · '+z.x0+(z.c2<0?' − ':' + ')+Math.abs(z.c2)+' = ?')}`,ans:[{label:'',val:z.h}],why:'מציבים את x בביטוי של זווית הראש.'}],
  lines:[M('2('+z.eB+') + ('+z.eH+') = 180'),M(A+'x '+(Bc<0?'− '+(-Bc):'+ '+Bc)+' = 180')+' ← '+M('x = '+z.x0),`זוויות: ${M(z.b+'°, '+z.b+'°, '+z.h+'°')}`,`בדיקה: ${M(z.b+' + '+z.b+' + '+z.h+' = 180')} ✓`],rule:RI.sum,trick:'x הוא לא הזווית! מציבים אותו בביטוי.',
  diag:({vals:[x,y,w]})=>x===z.x0&&(y!==z.b||w!==z.h)?'את x מצאתם! עכשיו <b>מציבים</b> אותו בכל ביטוי.':y+y+w!==180?'בדקו: בסיס + בסיס + ראש = 180°.':null};}
/* ★★★ פי / ב־ */
function gTimes(){const k=pick([0,1,2,3]);let b,h,txt,eq;
 if(k===0){const m=pick([2,3,7]);b=180/(m+2);h=m*b;txt=`זווית הראש גדולה <b>פי ${m}</b> מכל זווית בסיס`;eq=`x + x + ${m}x = 180`;}
 else if(k===1){const m=pick([2,4]);h=180/(2*m+1);b=m*h;txt=`כל זווית בסיס גדולה <b>פי ${m}</b> מזווית הראש`;eq=`x + ${m}x + ${m}x = 180`;}
 else if(k===2){const d=pick([15,45,60,90]);b=(180-d)/3;h=b+d;txt=`זווית הראש גדולה ב־${M(d+'°')} מכל זווית בסיס`;eq=`x + x + x + ${d} = 180`;}
 else{const d=pick([15,30,45]);b=(180+d)/3;h=b-d;txt=`זווית הראש קטנה ב־${M(d+'°')} מכל זווית בסיס`;eq=`x + x + x − ${d} = 180`;}
 const nm=pick(NAMES),t=isoT(h,nm);const mm=k<2?eq.match(/(\d+)x/)[1]:eq.match(/(\d+) =/)[1];
 const opts=[[eq,`x + ${mm}x = 180`,'x + x + x = 180'],[eq,`x + ${mm}x = 180`,`x + x + ${mm}x = 180`],[eq,`x + x + ${mm} = 180`,`x + x + x − ${mm} = 180`],[eq,`x + x − ${mm} = 180`,`x + x + x + ${mm} = 180`]][k];
 return {kind:'בעיה מילולית · זוויות',rc:7,dia:()=>svgT(t,legsT(t)+angleMark(t,'l',OR,'?')+angleMark(t,'r',OR,'?')+angleMark(t,'a',PU,'?')),text:`במשולש שווה שוקיים ${txt}. מצאו את כל הזוויות.`,
  crack:[CK('מה המשוואה?',opts.map(M),M(eq),'מסמנים ב־x את הזווית הקטנה יותר, ובונים את הכול ממנה. זווית הבסיס – פעמיים!')],
  ans:[{label:'זווית בסיס',col:OR,val:b},{label:'זווית הראש',col:PU,val:h}],work:[{t:`${M(eq)} ← ${M('x = ?')}`,ans:[{label:'x =',val:k===1?h:b}],why:'מחברים את כל ה־x ומחלקים.'},{t:'זווית בסיס:',ans:[{label:'',val:b}],why:k===1?'זווית בסיס = '+M(eq.split(' + ')[1])+': מציבים את x.':'זווית הבסיס היא x.'},{t:'זווית הראש:',ans:[{label:'',val:h}],why:'180° פחות שתי זוויות הבסיס.'}],
  lines:[M(eq),k===1?M('x = '+h)+' ← בסיס '+M(b+'°'):M('x = '+b),`הזוויות: ${M(b+'°, '+b+'°, '+h+'°')}`,`בדיקה: ${M(b+' + '+b+' + '+h+' = 180')} ✓`],rule:'"פי" ← כופלים את x. "ב־" ← מוסיפים או מחסירים. ואז: סכום 180°.',trick:'זווית הבסיס נכנסת <b>פעמיים</b>.',
  diag:({vals:[x,y]})=>x+x+y!==180?'בדקו: בסיס + בסיס + ראש = 180°.':null};}
/* two triangles: g at the base | g at the head */
function twoSvg(g){const one=(cx,bd,lab,which)=>{let w=80,h=w*Math.tan(rad(bd));if(h>150){w*=150/h;h=150;}const L=P2(cx-w,200),Rr=P2(cx+w,200),A=P2(cx,200-h);const t={a:A,l:L,r:Rr,n:{a:'',l:'',r:''}};
 const mk=v=>angleMark(t,v,OR,g+'°',{r:22});const marks=which==='b'?mk('l')+mk('r'):mk('a');
 return `<polygon points="${f(A.x)},${f(A.y)} ${f(L.x)},${f(L.y)} ${f(Rr.x)},${f(Rr.y)}" fill="#ffffff08" stroke="${INK}" stroke-width="3"/>${ticks(t,'al',1,INK)+ticks(t,'ar',1,INK)}${marks}${TX(cx,236,lab,'#9fb3cc',{fs:18,rtl:1})}`;};
 return `<svg viewBox="0 0 400 248" role="img" aria-label="שתי אפשרויות">${one(300,g<90?g:45,g<90?'בבסיס':'',g<90?'b':'x')}${one(105,(180-g)/2,'בראש','a')}</svg>`;}
/* ★★★★ שתי אפשרויות */
function gTwoOpt(){let g;do{g=pick([20,30,40,50,80,84,110,120,130,36,44,56,76]);}while(g===70||g===100);const ac=g<90;const nm=pick(NAMES);
 const A=`${g}°, ${g}°, ${180-2*g}°`,B=`${g}°, ${(180-g)/2}°, ${(180-g)/2}°`;const opts=[`רק ${A}`,`רק ${B}`,`שתי האפשרויות: ${A} או ${B}`,'אין משולש כזה'];
 const t1=isoT(ac?180-2*g:g,nm),t2=isoT(g,nm);
 return {kind:'זווית אחת נתונה · כל האפשרויות',rc:8,dia:h=>h&&ac?twoSvg(g):svgT(t2,legsT(t2)),
  text:`במשולש שווה שוקיים אחת הזוויות היא ${M(g+'°')}. מה יכולות להיות הזוויות?`,choice:opts.map(o=>o.replace(/(\d+°(, \d+°)+)/g,x=>M(x))),correct:ac?2:1,
  crack:[CK('הזווית '+M(g+'°')+' יכולה להיות…',['זווית בסיס או זווית הראש','רק זווית הראש','רק זווית בסיס'],ac?'זווית בסיס או זווית הראש':'רק זווית הראש',ac?'לא כתוב איזו זווית היא ← בודקים את שתי האפשרויות.':`שתי זוויות של ${g}° הן יותר מ־180° ← היא רק זווית הראש.`)],
  work:[{t:`אם ${M(g+'°')} זווית בסיס: זווית הראש ${M('180° − 2 · '+g+'° = ?')}`,ans:[{label:'',val:180-2*g}],why:ac?'יש שתי זוויות בסיס של '+M(g+'°')+'.':'יוצא מספר שלילי ← אי אפשר! ולכן היא לא זווית בסיס.'},{t:`אם ${M(g+'°')} זווית הראש: כל זווית בסיס ${M('(180° − '+g+'°) : 2 = ?')}`,ans:[{label:'',val:(180-g)/2}],why:'שתי זוויות הבסיס שוות ← מחלקים ב־2.'}],
  lines:ac?[`${M(g+'°')} זווית בסיס ← ${M(A)}`,`${M(g+'°')} זווית הראש ← ${M(B)}`,'יש <b>שתי</b> אפשרויות.']:[`זווית בסיס? ${M(g+' + '+g+' = '+2*g)} – יותר מ־180° ✗`,`ולכן היא זווית הראש ← ${M(B)}`],rule:'זווית חדה ← בודקים אם היא בסיס ואם היא ראש. זווית ישרה או קהה ← רק זווית הראש.',trick:'לא כתוב איזו זווית ← בודקים <b>את שתי האפשרויות</b>.',
  diag:({sel})=>sel===3?'יש משולש! בדקו שוב עם 180°.':ac?'זווית חדה יכולה להיות גם זווית בסיס וגם זווית הראש.':'בדקו: אם '+M(g+'°')+' בבסיס, שתי הזוויות יחד הן יותר מ־180°.'};}
/* ★★★ פיתגורס בשלבים */
const TRIP=[[5,12,13],[12,5,13],[8,15,17],[15,8,17],[9,12,15],[12,9,15],[12,16,20],[16,12,20],[7,24,25]];
function gPyth(){const [hb,hh,s]=pick(TRIP),k=pick(['hb','h','area','per','leg']),nm=pick(NAMES),F='M',base=2*hb;const B=degOf(Math.atan(hh/hb)),t=tri(B,B,nm);
 const dia=hl=>svgT(t,legsT(t)+segAD(t,{h:1,nm:F})+TX((3*t.l.x+t.r.x)/4,t.l.y+28,''+base,BL)+(k!=='leg'?sideLab(t,'al',''+s,OR):'')+(k==='leg'?TX(t.a.x-22,t.a.y*.3+t.l.y*.7,''+hh,PU):'')+(hl&&k!=='leg'?TX(t.a.x-20,t.a.y*.3+t.l.y*.7,'h',PU):''),{note:'השרטוט אינו לפי קנה מידה'});
 const g0=`${M(sd(t,'al')+' = '+sd(t,'ar')+(k==='leg'?'':' = '+s))}${k==='leg'?'':' '+CM}, ${M(sd(t,'lr')+' = '+base)} ${CM}, ${M(t.n.a+F)} גובה לבסיס${k==='leg'?', '+M(t.n.a+F+' = '+hh)+' '+CM:''}.`;
 const wHB={t:`${M(t.n.l+F)} = חצי בסיס: ${M(base+' : 2 = ?')}`,ans:[{label:'',val:hb}],why:'הגובה לבסיס הוא גם תיכון ← '+M(F)+' באמצע הבסיס.'};
 const wH={t:`פיתגורס במשולש ${M(t.n.a+t.n.l+F)}: ${M('h² = '+s+'² − '+hb+'² = ?')}`,ans:[{label:'',val:hh*hh}],why:`היתר הוא <b>השוק</b> ${M(s)} (מול הזווית הישרה) ← מחסירים: ${M(s*s+' − '+hb*hb)}.`};
 const wH2={t:`${M('h = √'+hh*hh+' = ?')}`,ans:[{label:'',val:hh}],why:'מחפשים מספר שבריבוע נותן '+M(hh*hh)+'.'};
 const L0=[`${M(t.n.l+F+' = '+base+' : 2 = '+hb)} (הגובה לבסיס הוא גם תיכון)`,`${M('h² + '+hb+'² = '+s+'²')} ← ${M('h² = '+(s*s-hb*hb))} ← ${M('h = '+hh)}`];
 const crk=[CK('במשולש '+M(t.n.a+t.n.l+F)+', מהו היתר?',[`השוק ${M(sd(t,'al'))}`,`הגובה ${M(t.n.a+F)}`,`חצי הבסיס ${M(t.n.l+F)}`],`השוק ${M(sd(t,'al'))}`,'היתר מול הזווית הישרה. הזווית הישרה ליד '+M(F)+'.')];
 const R0={rc:10,dia,rule:'גובה לבסיס ← חצי בסיס ← פיתגורס (השוק היא היתר) ← שטח = בסיס · גובה : 2.',trick:'השוק היא <b>היתר</b>. משתמשים ב<b>חצי</b> בסיס.'};
 if(k==='hb')return {...R0,kind:'פיתגורס · שלב 1: חצי בסיס',text:g0+` מצאו את ${M(t.n.l+F)}.`,ans:[{label:t.n.l+F,col:BL,val:hb,unit:CM,lt:1}],work:[wHB],lines:[L0[0]],diag:({vals:[x]})=>x===base?'זה כל הבסיס. מחלקים ב־2.':null};
 if(k==='h')return {...R0,kind:'פיתגורס · שלב 2: הגובה',text:g0+` מצאו את הגובה ${M(t.n.a+F)}.`,crack:crk,ans:[{label:t.n.a+F,col:PU,val:hh,unit:CM,lt:1}],work:[wHB,wH,wH2],lines:L0,diag:({vals:[x]})=>x*x===s*s+hb*hb?'השוק היא היתר! מחסירים, לא מחברים.':x*x===s*s-base*base||Math.abs(x*x-(s*s-base*base))<1?'משתמשים ב<b>חצי</b> בסיס.':null};
 if(k==='area')return {...R0,kind:'פיתגורס · שלב 3: שטח',text:g0+` מצאו את שטח המשולש ${M(t.n.a+t.n.l+t.n.r)}.`,crack:[...crk,CK('מה צריך כדי לחשב שטח?',['בסיס וגובה','שתי שוקיים','שוק ובסיס'],'בסיס וגובה','שטח משולש = בסיס · גובה : 2.')],ans:[{label:'השטח',col:GR,val:hb*hh,unit:'סמ״ר'}],work:[wHB,wH,wH2,{t:`${M(base+' · '+hh+' : 2 = ?')}`,ans:[{label:'',val:hb*hh}],why:'שטח = בסיס · <b>גובה</b> : 2. לא השוק!'}],lines:[...L0,`שטח: ${M(base+' · '+hh+' : 2 = '+hb*hh)} סמ״ר`],diag:({vals:[x]})=>x===base*s/2?'השתמשתם בשוק. בשטח משתמשים ב<b>גובה</b>.':x===base*hh?'שכחתם לחלק ב־2.':x===hb*hh/2?'בסיס כולו: '+M(base)+', לא חצי.':null};
 if(k==='per')return {...R0,kind:'פיתגורס · שלב 4: היקף',text:g0+` מצאו את היקף המשולש ${M(t.n.a+t.n.l+F)}.`,crack:crk,ans:[{label:'ההיקף',col:GR,val:hb+hh+s,unit:CM}],work:[wHB,wH,wH2,{t:`${M(hb+' + '+hh+' + '+s+' = ?')}`,ans:[{label:'',val:hb+hh+s}],why:'היקף = סכום שלוש הצלעות של המשולש הקטן: חצי בסיס, גובה ושוק.'}],lines:[...L0,`היקף: ${M(hb+' + '+hh+' + '+s+' = '+(hb+hh+s))} ${CM}`],diag:({vals:[x]})=>x===base+hh+s?'במשולש הקטן יש רק <b>חצי</b> בסיס.':x===2*s+base?'זה ההיקף של המשולש הגדול.':null};
 return {...R0,kind:'פיתגורס · מוצאים שוק',text:g0+` מצאו את אורך השוק ${M(sd(t,'al'))}.`,crack:[CK('במשולש '+M(t.n.a+t.n.l+F)+', מה מחפשים?',['את היתר','ניצב'],'את היתר','השוק מול הזווית הישרה ← יתר.')],ans:[{label:sd(t,'al'),col:OR,val:s,unit:CM,lt:1}],work:[wHB,{t:`${M(sd(t,'al')+'² = '+hb+'² + '+hh+'² = ?')}`,ans:[{label:'',val:s*s}],why:'מחפשים את היתר ← <b>מחברים</b> את ריבועי הניצבים.'},{t:`${M('√'+s*s+' = ?')}`,ans:[{label:'',val:s}],why:'מספר שבריבוע נותן '+M(s*s)+'.'}],lines:[L0[0],`${M(sd(t,'al')+'² = '+hb+'² + '+hh+'² = '+s*s)} ← ${M(sd(t,'al')+' = '+s)}`],diag:({vals:[x]})=>x*x===base*base+hh*hh?'משתמשים ב<b>חצי</b> בסיס.':null};}
/* ★★★★ מה קורה לשטח? */
function gScale(){const ctx=pick([['גג של בית בובות','בסיס'],['מפרש של סירה','בסיס'],['חתיכת פיצה משולשת','בסיס'],['תמרור משולש','בסיס']]),b=2*R(3,8),h=R(3,9),k=pick([0,1,2,2,3]),m=R(2,5),m2=nz(2,4,[m]);
 const W2={0:[m,1],1:[1,m],2:[m,m],3:[m,m2]}[k],F=W2[0]*W2[1],txt={0:`מגדילים <b>רק את הבסיס</b> פי ${M(m)}`,1:`מגדילים <b>רק את הגובה</b> פי ${M(m)}`,2:`מגדילים <b>גם את הבסיס וגם את הגובה</b> פי ${M(m)}`,3:`מגדילים את הבסיס פי ${M(m)} ואת הגובה פי ${M(m2)}`}[k];
 const A0=b*h/2,A1=b*W2[0]*h*W2[1]/2;
 return {kind:'מה קורה לשטח?',rc:11,text:`${ctx[0]} בצורת משולש שווה שוקיים: בסיס ${M(b)}, גובה ${M(h)}. ${txt}. פי כמה גדל השטח?`,
  crack:[CK('מה צריך לחשב?',['את השטח לפני ואחרי','רק את השטח אחרי','את ההיקף'],'את השטח לפני ואחרי','משווים: השטח החדש לעומת הישן.')],ans:[{label:'פי',col:GR,val:F}],
  work:[{t:`השטח המקורי: ${M(b+' · '+h+' : 2 = ?')}`,ans:[{label:'',val:A0}],why:'שטח = בסיס · גובה : 2.'},{t:`השטח החדש: ${M((b*W2[0])+' · '+(h*W2[1])+' : 2 = ?')}`,ans:[{label:'',val:A1}],why:'מחשבים עם הבסיס והגובה <b>החדשים</b>.'},{t:`${M(A1+' : '+A0+' = ?')}`,ans:[{label:'',val:F}],why:'פי כמה = מחלקים חדש בישן.'}],
  lines:[`לפני: ${M(b+' · '+h+' : 2 = '+A0)}`,`אחרי: ${M((b*W2[0])+' · '+(h*W2[1])+' : 2 = '+A1)}`,`${M(A1+' : '+A0+' = '+F)} ← גדל פי ${M(F)}${k===2?` (${M(m+' · '+m+' = '+F)})`:''}`],rule:'שטח = בסיס · גובה : 2. מגדילים את שניהם ← השטח גדל פי <b>מכפלת</b> ההגדלות.',trick:k>=2?'שתי הגדלות ← <b>כופלים</b> אותן: '+M(W2[0]+' · '+W2[1]):'רק צלע אחת גדלה ← השטח גדל באותו פי.',
  diag:({vals:[x]})=>x===W2[0]+W2[1]?'<b>כופלים</b> את ההגדלות, לא מחברים.':x===m&&k>=2?'גם הבסיס וגם הגובה גדלו ← השטח גדל פי '+M(W2[0]+' · '+W2[1])+'.':null};}
/* ★★★ טענה ונימוק */
const RS=['נתון','הגדרת תיכון','הגדרת גובה','הגדרת חוצה זווית','במשולש שווה שוקיים, הגובה לבסיס, התיכון לבסיס וחוצה זווית הראש מתלכדים','זוויות הבסיס שוות'];
function gReason(){const nm=pick(NAMES),Fv='K',t=isoT(pick([40,50,60,70,80]),nm),giv=pick(['b','m','h']),A=t.n.a,L=t.n.l,Rr=t.n.r,nmG={b:'חוצה זווית הראש',m:'תיכון לבסיס',h:'גובה לבסיס'}[giv];
 const NG={b:'חוצה זווית הראש',m:'תיכון לבסיס',h:'גובה לבסיס'},claims=[[M(L+A+' = '+Rr+A),'',0]];['b','m','h'].filter(z=>z!==giv).forEach(z=>claims.push([M(A+Fv),NG[z],4],[M(A+Fv),NG[z],4]));
 claims.push(giv==='m'?[M(L+Fv+' = '+Fv+Rr),'',1]:giv==='h'?[M('∢'+A+Fv+L+' = 90°'),'',2]:[M('∢'+L+A+Fv+' = ∢'+Fv+A+Rr),'',3]);
 const [cm,ct,ri]=pick(claims);
 return {kind:'טענה ונימוק',rc:9,dia:()=>svgT(t,legsT(t)+segAD(t,{nm:Fv,h:giv==='h',m:giv==='m',b:giv==='b'})),text:`נתון: ${M(L+A+' = '+Rr+A)}, ${M(A+Fv)} ${nmG}. מה הנימוק לטענה: ${cm}${ct?' '+ct:''}?`,choice:RS.slice(0,5),correct:ri,choiceLab:'הנימוק:',
  work:[{t:'האם הטענה כתובה בנתונים?',choice:['כן','לא'],correct:ri===0?0:1,why:ri===0?'מה שכתוב בנתון – הנימוק הוא "נתון".':'הטענה לא כתובה בנתון ← צריך משפט או הגדרה.'}],
  lines:[`הנימוק: <b>${RS[ri]}</b>`],rule:RI.three+' תיכון ← חוצה את הצלע. גובה ← 90°.',trick:'קודם בודקים: האם זה <b>נתון</b>?',diag:({sel})=>sel===0?'זה לא כתוב בנתונים.':ri===0?'הטענה כתובה בנתונים!':'חשבו: זה נובע מהגדרה (תיכון / גובה / חוצה) או מ"שלושה באחד"?'};}
/* ★★★ סדרו את ההוכחה */
function gOrder(){const nm=pick(NAMES),Fv='T',t=isoT(pick([50,60,70,80]),nm),A=t.n.a,L=t.n.l,Rr=t.n.r,v=pick(['m','b','h']);
 const S={m:[['תיכון לבסיס','גובה לבסיס',`∢${A+Fv+L} = 90°`,'הגדרת גובה']],b:[['חוצה זווית הראש','תיכון לבסיס',`${L+Fv} = ${Fv+Rr}`,'הגדרת תיכון']],h:[['גובה לבסיס','חוצה זווית הראש',`∢${L+A+Fv} = ∢${Fv+A+Rr}`,'הגדרת חוצה זווית']]}[v][0];
 const rows=[[`${M(L+A+' = '+Rr+A)}`,'נתון'],[`${M(A+Fv)} ${S[0]}`,'נתון'],[`${M(A+Fv)} ${S[1]}`,'במשולש שווה שוקיים – שלושה באחד'],[`${M(S[2])}`,S[3]]];
 const lab=['א','ב','ג','ד'],ord=shuf([0,1,2,3]);const show=ord.map((r,i)=>({l:lab[i],r}));const pos=r=>lab[ord.indexOf(r)];
 const good=[0,1,2,3].map(pos).join(', '),o0=[good,[3,0,1,2].map(pos).join(', '),[2,0,1,3].map(pos).join(', '),[0,3,2,1].map(pos).join(', ')],o=shuf(o0);
 return {kind:'מסדרים הוכחה',rc:9,dia:()=>`<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;justify-content:center"><div style="width:220px">${svgT(t,legsT(t)+segAD(t,{nm:Fv,[v]:1}))}</div><div style="font-size:17px;line-height:1.7;text-align:right">${show.map(s=>`<div><b>${s.l}.</b> ${rows[s.r][0]} <span style="color:#9fb3cc">(${rows[s.r][1]})</span></div>`).join('')}</div></div>`,
  text:`נתון: ${M(L+A+' = '+Rr+A)}, ${M(A+Fv)} ${S[0]}. צריך להוכיח: ${M(S[2])}. מה הסדר הנכון?`,choice:o,correct:o.indexOf(good),
  work:[{t:'במה מתחילים הוכחה?',choice:['בנתונים','במה שצריך להוכיח','במשפט'],correct:0,why:'קודם כותבים את מה שנתון.'},{t:'ומה בסוף?',choice:['מה שצריך להוכיח','נתון','משפט'],correct:0,why:'השורה האחרונה = מה שרצינו להוכיח.'}],
  lines:[`הסדר: ${good}`,'נתונים ← משפט "שלושה באחד" ← הגדרה ← מה שצריך להוכיח.'],rule:'הוכחה: נתונים ← משפט ← הגדרה ← מה שצריך להוכיח.',trick:'מה שצריך להוכיח – תמיד <b>אחרון</b>.',diag:({sel})=>o[sel]===o0[1]?'מה שצריך להוכיח בא <b>בסוף</b>.':o[sel]===o0[2]?'משפט בא <b>אחרי</b> הנתונים שהוא משתמש בהם.':'כל שורה נשענת על השורות שלפניה.'};}
/* ★★★★ נכון / לא נכון – שווה שוקיים */
const TFI=[['זווית בסיס במשולש שווה שוקיים יכולה להיות 90°.',0,'שתי זוויות בסיס של 90° הן כבר 180°.'],['זווית הראש במשולש שווה שוקיים יכולה להיות 90°.',1,'למשל '+M('90°, 45°, 45°')+'.'],['במשולש שווה שוקיים, התיכון לשוק הוא תמיד גם הגובה לשוק.',0,'זה נכון רק במשולש שווה צלעות. "שלושה באחד" – רק לבסיס.'],['כל משולש שווה צלעות הוא גם שווה שוקיים.',1,'יש בו שתי צלעות שוות (ואפילו שלוש).'],['זווית בסיס במשולש שווה שוקיים תמיד חדה.',1,'שתי זוויות בסיס שוות, וסכומן פחות מ־180° ← כל אחת פחות מ־90°.'],['אם במשולש שווה שוקיים זווית אחת היא 60°, כל זוויותיו 60°.',1,'בסיס '+M('60°')+' ← ראש '+M('60°')+'. ראש '+M('60°')+' ← בסיס '+M('(180° − 60°) : 2 = 60°')+'.']];
function gTFi(){const [s,ok,why]=pick(TFI);return {kind:'נכון או לא נכון? · שווה שוקיים',rc:8,text:s,choice:['נכון','לא נכון'],correct:ok?0:1,work:[{t:'האם אפשר למצוא דוגמה שלא מתאימה?',choice:['כן','לא'],correct:ok?1:0,why},{t:'הזוויות במשולש מסתכמות ב־',ans:[{label:'',val:180}],why:'בודקים כל טענה עם 180°.'}],lines:[`<b>${ok?'נכון':'לא נכון'}</b>: ${why}`],rule:'בודקים עם 180° ועם דוגמה.',trick:'מספיקה דוגמה אחת שלא מתאימה ← לא נכון.',diag:()=>'נסו עם מספרים: האם הזוויות מסתכמות ב־180°?'};}

const NU=g=>()=>{const q=g();(q.ans||[]).forEach(a=>{if(a.unit===undefined)a.unit='';});return q;};
gAreaPart=NU(gAreaPart);gExpand=NU(gExpand);gMissing=NU(gMissing);gDiff=NU(gDiff);gErrFix=NU(gErrFix);gPuzzle=NU(gPuzzle);gCmp=NU(gCmp);gScale=NU(gScale);
/* ===== levels: ladder (הראה לי לפני כל סוג חדש) ===== */
const LEVELS=[
 {n:1,t:'★ ידע: נוסחאות ומושגים',d:'מודל השטח, התאמת פיתוח, שוקיים ובסיס',ladder:[{g:gAreaPart,n:4,h:2},{g:gArea,n:3,h:1},{g:gMatch,n:5,h:1},{g:gPartsR,n:5,h:1},{g:gBaseEq,n:3,h:1}]},
 {n:2,t:'★★ יישום: פותחים ומחשבים',d:'פיתוח, השלמת חסר, זוויות, משוואה',ladder:[{g:gExpand,n:5,h:1},{g:gMissing,n:4,h:1},{g:gBase,n:2,h:1},{g:gHead,n:2,h:1},{g:gHalf,n:2,h:1},{g:gEqWhich,n:2,h:1},{g:gEqSolve,n:3,h:1}]},
 {n:3,t:'★★★ הבנה ונימוק',d:'שורה שגויה, חידות, פיתגורס, טענה ונימוק',ladder:[{g:gDiff,n:3,h:1},{g:gErrLine,n:3,h:1},{g:gErrFix,n:2,h:0},{g:gPuzzle,n:3,h:1},{g:gPyth,n:3,h:1},{g:gReason,n:2,h:1},{g:gOrder,n:2,h:1},{g:gTimes,n:2,h:1}]},
 {n:4,t:'★★★★ חשיבה ואוריינות',d:'מי גדול יותר, כל האפשרויות, מה קורה לשטח',ladder:[{g:gCmp,n:5,h:1},{g:gTFk,n:3,h:0},{g:gTwoOpt,n:4,h:1},{g:gScale,n:4,h:1},{g:gTFi,n:2,h:0},{g:gPyth,n:2,h:0}]}];
const TEST=[[gArea,gMatch,gPartsR,gBaseEq],[gExpand,gMissing,gBase,gEqSolve],[gDiff,gPuzzle,gPyth,gReason],[gCmp,gTwoOpt,gScale,gTimes]];
const WARM=[gAreaPart,gMatch,gDS1,gPartsR,gBase,gEqWhich,gHead,gWhich];

/* ===== animated explanation ===== */
const T0=()=>isoT(40,['A','B','C']);
const RECAP=[
 {h:'למה צריך כפל מקוצר?',d:2.4,svg:()=>sqSvg(4,{anim:true,d:.3,lb:{x:'20',b:'1'},inner:{xx:'400',bx:'20',bb:'1'}}),says:[`${M('21² = (20 + 1)²')}`,`${M('400 + 20 + 20 + 1 = 441')} <span class="v">✓</span>`],what:'מספר קשה ← חלקים קלים.'},
 {h:'ריבוע של סכום',d:2.4,svg:()=>sqSvg(3,{anim:true,d:.3}),says:[`${M('(x + 3)² = x² + 3x + 3x + 9')}`,`${M('= x² + 6x + 9')}`],def:`${M('(a + b)² = a² + 2ab + b²')}`,what:'<b>שני</b> מלבנים כתומים ← 2ab.'},
 {h:'ריבוע של הפרש',d:2.8,svg:()=>foilSvg(-4,-4,{anim:true,d:.3}),says:[`כל איבר כופל כל איבר: 4 קשתות.`,`${M('(−4) · (−4) = +16')}`],def:`${M('(a − b)² = a² − 2ab + b²')}`,what:'האמצעי מינוס, האחרון <b>פלוס</b>.'},
 {h:'סכום כפול הפרש',d:2.8,svg:()=>foilSvg(5,-5,{anim:true,d:.3}),says:[`${M('+5x − 5x = 0')} ← אין איבר אמצעי`],def:`${M('(a + b)(a − b) = a² − b²')}`,what:'ראשון בריבוע <b>פחות</b> שני בריבוע.'},
 {h:'הטעות הנפוצה',d:1.8,svg:()=>sqSvg(4,{anim:true,d:.3}),says:[`${M('(x + 4)² = x² + 16')} <span class="x">✗</span> איפה הכתומים?`,`${M('(x + 4)² = x² + 8x + 16')} <span class="v">✓</span>`],what:'לא שוכחים את האיבר האמצעי.'},
 {h:'מינוס לפני סוגריים',d:1,says:[`${M('− (x² − 9) = − x² + 9')}`,'המינוס הופך את הסימן של <b>כל</b> איבר.'],what:'קודם סוגריים, אחר כך המינוס.'},
 {h:'שווה שוקיים: המושגים',d:2,svg:()=>{const t=rotT(T0(),90);return svgT(t,legsT(t,{c:OR,cls:'rv',d:.3})+sideCol(t,'al',OR,{cls:'rv',d:.6})+sideCol(t,'ar',OR,{cls:'rv',d:.6})+sideCol(t,'lr',BL,{cls:'rv',d:1.1})+angleMark(t,'a',PU,'',{cls:'rv',d:1.6}));},
  says:[`${C('זווית הראש',PU)} – <b>בין</b> ${C('השוקיים',OR)}.`,`${C('הבסיס',BL)} מולה – גם כשהוא לא למטה.`],what:'מוצאים קודם את השוקיים.'},
 {h:'זוויות במשולש שווה שוקיים',d:1.8,svg:()=>{const t=T0();return svgT(t,legsT(t)+angleMark(t,'a',PU,'40°',{cls:'rv',d:.3})+angleMark(t,'l',OR,'70°',{cls:'rv',d:.9})+angleMark(t,'r',OR,'70°',{cls:'rv',d:1.4}));},says:[`${M('180° − 40° = 140°')} ← ${M('140° : 2 = 70°')}`,'זווית הבסיס נכנסת למשוואה <b>פעמיים</b>.'],what:'בסיס + בסיס + ראש = 180°.'},
 {h:'זווית אחת – שתי אפשרויות',d:1.6,svg:()=>twoSvg(50),
  says:[`${M('50°')} בבסיס ← ${M('50°, 50°, 80°')}`,`${M('50°')} בראש ← ${M('50°, 65°, 65°')}`],what:'זווית חדה ← בודקים <b>שתי</b> אפשרויות.'},
 {h:'שלושה באחד',d:2.6,svg:()=>{const t=T0();return svgT(t,legsT(t)+segAD(t,{h:1,m:1,b:1,cls:'rv',d:.2,hc:'rv',hd:.9,mc:'rv',md:1.5,bc:'rv',bd:2.1}));},says:['מהראש אל הבסיס:','<b>גובה</b> = <b>תיכון</b> = <b>חוצה זווית</b>.'],what:'אחד מהשלושה ← כל השלושה.'},
 {h:'פיתגורס בשווה שוקיים',d:2,svg:()=>{const B=degOf(Math.atan(12/5)),t=tri(B,B,['A','B','C']);return svgT(t,legsT(t)+segAD(t,{h:1,cls:'rv',d:.3})+sideLab(t,'al','13',OR,{cls:'rv',d:.8})+TX((t.l.x*3+t.r.x)/4,t.l.y+28,'5',BL,{cls:'rv',d:1.2})+TX(t.a.x-20,t.a.y*.3+t.l.y*.7,'12',PU,{cls:'rv',d:1.7}));},
  says:[`חצי בסיס ${M('5')}, שוק ${M('13')} (היתר)`,`${M('h² = 13² − 5² = 144')} ← ${M('h = 12')}`],what:'שטח = בסיס · גובה : 2.'},
 {h:'מה קורה לשטח?',d:2,svg:()=>{const t=isoT(50,['A','B','C']),m=(p,q)=>P2((p.x+q.x)/2,(p.y+q.y)/2),A1=m(t.a,t.l),A2=m(t.a,t.r),A3=m(t.l,t.r),pg=(p,c,d)=>`<polygon class="rv" style="--d:${d}s" points="${[p[0],p[1],p[2]].map(z=>f(z.x)+','+f(z.y)).join(' ')}" fill="${c}" fill-opacity=".45" stroke="#13233a" stroke-width="2"/>`;
   return svgT(t,pg([t.a,A1,A2],BL,.3)+pg([A1,t.l,A3],OR,.8)+pg([A2,A3,t.r],GR,1.3)+pg([A1,A2,A3],PU,1.8),{noV:1});},says:['בסיס פי 2 וגובה פי 2 ← <b>4</b> משולשים קטנים.',`${M('2 · 2 = 4')}, ${M('3 · 3 = 9')}`],what:'שניהם גדלים ← כופלים את ההגדלות.'}];
RECAP[5].chk=[()=>{let q;for(let i=0;i<30;i++){q=gDiff();if(q.kind==='פותחים ומפשטים'&&q.rc===5)break;}return q;},gErrFix];
RECAP[4].chk=[gArea,gTFk];
RECAP[0].chk=[gAreaPart,gMatch];
/* 35 שאלות בכל שלב */
/* ================= הפרש ריבועים: סכום כפול הפרש (35 שאלות) ================= */
const DSW=b=>({t:'אותם מספרים, פעם פלוס ופעם מינוס. איזו נוסחה?',choice:FORMS.map(M),correct:2,why:'סכום כפול הפרש ← '+M('a² − b²')+'. אין איבר אמצעי.'});
/* ★ x² − ? */
function gDS1(){const b=nz(2,12,[]);return {kind:'הפרש ריבועים · משלימים',rc:3,text:`השלימו: ${M('(x + '+b+')(x − '+b+') = x² − ?')}`,ans:[{label:'?',col:GR,val:b*b}],
 work:[DSW(b),{t:`${M(b+'² = ?')}`,ans:[{label:'',val:b*b}],why:M(b+'² = '+b+' · '+b)+'.'}],
 lines:[M('(x + '+b+')(x − '+b+') = x² − '+b+'²'),M('= x² − '+b*b)],rule:RK.mul,trick:'אין איבר אמצעי: '+M('+'+b+'x − '+b+'x = 0'),
 diag:({vals:[v]})=>v===2*b?'זה '+M(b+' + '+b)+'. צריך '+M(b+' · '+b)+'.':v===b?'גם המספר עולה בריבוע: '+M(b+'²')+'.':null};}
/* ★ בחירת פיתוח */
function gDS2(){const b=nz(2,11,[]),rev=Math.random()<.35;const E=rev?`(${b} − x)(${b} + x)`:`(x − ${b})(x + ${b})`;const good=rev?b*b+' − x²':PL(1,0,-b*b);
 const o0=[good,PL(1,0,b*b),PL(1,-2*b,b*b),rev?PL(1,0,-b*b):b*b+' − x²'];const o=shuf(o0);
 return {kind:'הפרש ריבועים · איזה פיתוח?',rc:3,text:`מהו הפיתוח של ${M(E)}?`,choice:o.map(M),correct:o.indexOf(good),
  work:[DSW(b),{t:'מי ראשון בתשובה?',choice:[rev?M(b+'²'):M('x²'),rev?M('x²'):M(b+'²')],correct:0,why:'מי שראשון בסוגריים – ראשון בתשובה, ואחריו <b>מינוס</b>.'}],
  lines:[M(E+' = '+(rev?b+'² − x²':'x² − '+b+'²')),M('= '+good)],rule:RK.mul,trick:'סכום כפול הפרש ← תמיד <b>מינוס</b> בתשובה.',
  diag:({sel})=>{const s=o[sel];return s===PL(1,0,b*b)?'בסכום כפול הפרש יש <b>מינוס</b> בין הריבועים.':s===PL(1,-2*b,b*b)?'זה '+M('(x − '+b+')²')+'. כאן הסוגריים <b>שונים</b>.':'מי ראשון בסוגריים? הוא ראשון בתשובה.';}};}
/* ★★ פיתוח עם מקדם */
function gDS3(){const a=pick([2,3,4,5]),b=nz(1,9,[]);const E=`(${a}x + ${b})(${a}x − ${b})`;
 return {kind:'הפרש ריבועים · פותחים',rc:3,text:`פתחו: ${M(E)}. כתבו כל מקדם <b>עם הסימן שלו</b>.`,tpl:'[] x² &nbsp; []',ans:[{label:'המקדם של x²',col:BL,val:a*a},{label:'המספר',col:GR,val:-b*b,neg:true}],
  work:[DSW(b),{t:`${M('('+a+'x)² = ? x²')}`,ans:[{label:'',val:a*a}],why:'גם '+M(a)+' עולה בריבוע: '+M(a+' · '+a+' = '+a*a)+'.'},{t:`${M(b+'² = ?')} ובתשובה עם מינוס`,ans:[{label:'',val:-b*b}],why:'הראשון בריבוע <b>פחות</b> השני בריבוע.'}],
  lines:[M(E+' = ('+a+'x)² − '+b+'²'),M('= '+PL(a*a,0,-b*b))],rule:RK.mul,trick:'שימו לב: '+M('('+a+'x)² = '+a*a+'x²')+', לא '+M(a+'x²')+'.',
  diag:({vals:[p,q]})=>p===a?'גם '+M(a)+' עולה בריבוע: '+M('('+a+'x)² = '+a*a+'x²')+'.':q===b*b?'בסכום כפול הפרש התשובה עם <b>מינוס</b>.':p===2*a?M('('+a+'x)²')+' זה '+M(a+' · '+a)+', לא '+M(a+' + '+a)+'.':null};}
/* ★★ השלמת חסר */
function gDS4(){const k=pick([0,1]);const b=nz(3,12,[]);
 if(k===0)return {kind:'הפרש ריבועים · משלימים את החסר',rc:3,text:'השלימו את המספרים החסרים, כך שהשוויון יהיה נכון.',tpl:`(x + ${b})(x − []) = x² − []`,ans:[{label:'מספר בסוגריים',col:OR,val:b},{label:'המספר',col:GR,val:b*b}],
  work:[{t:'בסכום כפול הפרש, המספרים בשני הסוגריים…',choice:['שווים','שונים','אחד כפול השני'],correct:0,why:'אותו מספר: פעם פלוס, פעם מינוס.'},{t:`${M(b+'² = ?')}`,ans:[{label:'',val:b*b}],why:'הראשון בריבוע פחות השני בריבוע.'}],
  lines:[`אותו מספר בשני הסוגריים: ${M(b)}`,M('(x + '+b+')(x − '+b+') = x² − '+b*b)],rule:RK.mul,trick:'אותו מספר בשני הסוגריים.',diag:({vals:[p,q]})=>q===2*b?M(b+' · '+b)+', לא '+M(b+' + '+b)+'.':null};
 return {kind:'הפרש ריבועים · משלימים את החסר',rc:3,text:'השלימו את המספר החסר, כך שהשוויון יהיה נכון.',tpl:`(x − []) (x + []) = x² − ${b*b}`,ans:[{label:'בסוגריים הראשונים',col:OR,val:b},{label:'בסוגריים השניים',col:OR,val:b}],
  work:[{t:`איזה מספר בריבוע נותן ${M(b*b)}?`,ans:[{label:'',val:b}],why:'מחפשים מספר שכפול <b>עצמו</b> נותן '+M(b*b)+'.'}],
  lines:[M(b+' · '+b+' = '+b*b),M('(x − '+b+')(x + '+b+') = x² − '+b*b)],rule:RK.mul,trick:'מחפשים מספר שכפול עצמו נותן את המספר.',diag:({vals:[p]})=>p*2===b*b?'מחפשים מספר שכפול <b>עצמו</b>, לא פעמיים.':null};}
/* ★★★ פירוק: הפרש ריבועים ← סכום כפול הפרש */
function gDS5(){const a=pick([1,1,1,2,3,4,5]),b=nz(2,11,[]);const E=PL(a*a,0,-b*b);
 if(a===1)return {kind:'הפרש ריבועים · מפרקים לגורמים',rc:3,text:`כתבו כמכפלה (פרקו לגורמים): ${M(E)}`,tpl:'(x + []) (x − [])',ans:[{label:'',col:OR,val:b},{label:'',col:OR,val:b}],
  work:[{t:`${M('x²')} הוא הריבוע של x. ${M(b*b)} הוא הריבוע של ?`,ans:[{label:'',val:b}],why:M(b+' · '+b+' = '+b*b)+'.'}],
  lines:[M(E+' = x² − '+b+'²'),M('= (x + '+b+')(x − '+b+')')],rule:'הפרש ריבועים: '+M('a² − b² = (a + b)(a − b)'),trick:'קוראים את הנוסחה <b>מימין לשמאל</b>.',diag:({vals:[p]})=>p===b*b?'צריך את המספר שבריבוע נותן '+M(b*b)+', לא את '+M(b*b)+' עצמו.':p*2===b*b?'מספר כפול <b>עצמו</b>, לא פעמיים.':null};
 return {kind:'הפרש ריבועים · מפרקים לגורמים',rc:3,text:`כתבו כמכפלה (פרקו לגורמים): ${M(E)}`,tpl:`([] x + ${b}) ([] x − ${b})`,ans:[{label:'',col:BL,val:a},{label:'',col:BL,val:a}],
  work:[{t:`${M(a*a+'x²')} הוא הריבוע של ? x`,ans:[{label:'',val:a}],why:M('('+a+'x)² = '+a*a+'x²')+'.'}],
  lines:[M(E+' = ('+a+'x)² − '+b+'²'),M('= ('+a+'x + '+b+')('+a+'x − '+b+')')],rule:'הפרש ריבועים: '+M('a² − b² = (a + b)(a − b)'),trick:'מחפשים מה עלה בריבוע: '+M(a*a+'x² = ('+a+'x)²'),diag:({vals:[p]})=>p===a*a?'צריך את המקדם שבריבוע נותן '+M(a*a)+'.':null};}
/* ★★★ שני הפרשי ריבועים */
function gDS6(){let b,c;do{b=nz(2,9,[]);c=nz(2,9,[b]);}while(false);const E=`(x + ${b})(x − ${b}) − (x + ${c})(x − ${c})`,res=c*c-b*b;
 return {kind:'הפרש ריבועים · פותחים ומפשטים',rc:3,text:`פשטו: ${M(E)}`,tpl:'[]',ans:[{label:'התוצאה',col:GR,val:res,neg:true}],
  work:[{t:`${M('(x + '+b+')(x − '+b+') = x² − ?')}`,ans:[{label:'',val:b*b}],why:RK.mul},{t:`${M('(x + '+c+')(x − '+c+') = x² − ?')}`,ans:[{label:'',val:c*c}],why:RK.mul},{t:`${M('x² − '+b*b+' − (x² − '+c*c+') = ?')}`,ans:[{label:'',val:res}],why:RK.minus}],
  lines:[M('= x² − '+b*b+' − (x² − '+c*c+')'),M('= x² − '+b*b+' − x² + '+c*c),M('= '+N(res))],rule:RK.minus,trick:'מינוס לפני סוגריים ← '+M('−(x² − '+c*c+') = −x² + '+c*c),
  diag:({vals:[v]})=>v===-b*b-c*c?'המינוס לפני הסוגריים הופך את '+M('−'+c*c)+' ל־<b>פלוס</b>.':v===-res?'בדקו את הסדר: '+M('−'+b*b+' + '+c*c)+'.':null};}
/* ★★★★ חשבון בראש */
function gDS7(){const n=pick([20,30,40,50,60,70,80,90,100]),d=R(1,4);
 return {kind:'הפרש ריבועים · חשבון בראש',rc:3,text:`חשבו בראש, בעזרת סכום כפול הפרש: ${M((n-d)+' · '+(n+d))}`,ans:[{label:'התשובה',col:GR,val:n*n-d*d}],
  crack:[CK('איך כותבים את התרגיל?',[M('('+n+' − '+d+')('+n+' + '+d+')'),M('('+n+' − '+d+')²'),M(n+' · '+n+' − '+d)],M('('+n+' − '+d+')('+n+' + '+d+')'),'שני המספרים במרחק '+M(d)+' מ־'+M(n)+'.')],
  work:[{t:`${M(n+'² = ?')}`,ans:[{label:'',val:n*n}],why:'המספר העגול באמצע, בריבוע.'},{t:`${M(d+'² = ?')}`,ans:[{label:'',val:d*d}],why:'המרחק מהאמצע, בריבוע.'},{t:`${M(n*n+' − '+d*d+' = ?')}`,ans:[{label:'',val:n*n-d*d}],why:'הראשון בריבוע <b>פחות</b> השני בריבוע.'}],
  lines:[M((n-d)+' · '+(n+d)+' = ('+n+' − '+d+')('+n+' + '+d+')'),M('= '+n+'² − '+d+'² = '+n*n+' − '+d*d+' = '+(n*n-d*d))],rule:RK.mul,trick:'מחפשים את המספר <b>באמצע</b>.',
  diag:({vals:[v]})=>v===n*n?'שכחתם להחסיר '+M(d+'²')+'.':v===n*n-2*d?'מחסירים '+M(d+'²')+', לא '+M('2 · '+d)+'.':v===n*n+d*d?'בסכום כפול הפרש <b>מחסירים</b>.':null};}
/* ★★★★ משוואה */
function gDS8(){const b=R(1,6),x0=R(b+2,14),Nn=x0*x0-b*b;
 return {kind:'הפרש ריבועים · משוואה',rc:3,text:`פתרו (x חיובי): ${M('(x + '+b+')(x − '+b+') = '+Nn)}`,ans:[{label:'x =',col:PU,val:x0}],
  work:[{t:`${M('(x + '+b+')(x − '+b+') = x² − ?')}`,ans:[{label:'',val:b*b}],why:RK.mul},{t:`${M('x² = '+Nn+' + '+b*b+' = ?')}`,ans:[{label:'',val:x0*x0}],why:'מעבירים את המספר לצד השני ומחליפים סימן.'},{t:`איזה מספר חיובי בריבוע נותן ${M(x0*x0)}?`,ans:[{label:'x =',val:x0}],why:'מספר שכפול עצמו נותן '+M(x0*x0)+'.'}],
  lines:[M('x² − '+b*b+' = '+Nn),M('x² = '+x0*x0)+' ← '+M('x = '+x0),`בדיקה: ${M((x0+b)+' · '+(x0-b)+' = '+Nn)} ✓`],rule:RK.mul,trick:'קודם פותחים בנוסחה, אחר כך פותרים.',
  diag:({vals:[v]})=>v*v===Nn-b*b?'המינוס עובר לצד השני כ<b>פלוס</b>: '+M('x² = '+Nn+' + '+b*b)+'.':null};}
/* ★★★★ נכון או לא נכון */
const TFDS=[['x² + 25 = (x + 5)(x − 5)',0,M('(x + 5)(x − 5) = x² − 25')+'. סכום של ריבועים <b>לא</b> מתפרק כך.'],['x² − 64 = (x − 8)(x + 8)',1,'הפרש ריבועים: '+M('x² − 8² = (x − 8)(x + 8)')+'.'],['(x − 6)(x + 6) = (x − 6)²',0,M('(x − 6)² = x² − 12x + 36')+', ואילו '+M('(x − 6)(x + 6) = x² − 36')+'.'],['49 − x² = (7 − x)(7 + x)',1,M('7² − x² = (7 − x)(7 + x)')+'.'],['4x² − 9 = (4x − 3)(4x + 3)',0,M('(4x − 3)(4x + 3) = 16x² − 9')+'. נכון: '+M('(2x − 3)(2x + 3)')+'.'],['(x + 3)(x − 3) < x²',1,M('(x + 3)(x − 3) = x² − 9')+': תמיד קטן מ־'+M('x²')+' ב־'+M('9')+'.'],['x² − 10 = (x − 5)(x + 5)',0,M('(x − 5)(x + 5) = x² − 25')+', לא '+M('x² − 10')+'.'],['(5 + x)(x − 5) = x² − 25',1,'הסדר בכפל לא משנה: '+M('(x + 5)(x − 5) = x² − 25')+'.']];
function gDS9(){const [e,ok,why]=pick(TFDS);return {kind:'הפרש ריבועים · נכון או לא נכון?',rc:3,text:`${M(e)} לכל x?`,choice:['נכון','לא נכון'],correct:ok?0:1,
  work:[{t:'מציבים מספר בשני הצדדים. האם יוצא שווה?',choice:['כן','לא'],correct:ok?0:1,why}],lines:[`<b>${ok?'נכון':'לא נכון'}</b>: ${why}`],rule:RK.mul,trick:'מספיקה דוגמה אחת שלא מתאימה ← לא נכון.',diag:()=>'הציבו x = 1 בשני הצדדים והשוו.'};}
gDS1=NU(gDS1);gDS3=NU(gDS3);gDS4=NU(gDS4);gDS5=NU(gDS5);gDS6=NU(gDS6);gDS7=NU(gDS7);gDS8=NU(gDS8);
LEVELS.push({n:0,t:'🎯 הפרש ריבועים: סכום כפול הפרש',d:'מ־★ עד ★★★★: פותחים, משלימים, מפרקים, משוואה',ladder:[{g:gDS1,n:4,h:2},{g:gDS2,n:4,h:1},{g:gDS3,n:5,h:1},{g:gDS4,n:4,h:1},{g:gDS5,n:5,h:1},{g:gDS6,n:5,h:1},{g:gDS8,n:4,h:0},{g:gDS9,n:4,h:0}]});
/* ================= 🧭 איזו נוסחה מתאימה? ================= */
const WO=['ריבוע של סכום · '+M('a² + 2ab + b²'),'ריבוע של הפרש · '+M('a² − 2ab + b²'),'סכום כפול הפרש = הפרש ריבועים · '+M('a² − b²'),'אף נוסחה לא מתאימה'];
const WREASON=['יש <b>3 איברים</b>, ושני הקצוות ריבועים.','יש <b>2 איברים</b> וביניהם <b>מינוס</b>.','יש <b>2 איברים</b> וביניהם <b>פלוס</b>.','שני הסוגריים <b>זהים</b>.','אותם מספרים, פעם <b>פלוס</b> ופעם <b>מינוס</b>.','המספרים בסוגריים <b>שונים</b>.'];
function whCase(){const b=nz(2,9,[]),k=pick(['E1','E2','E3','E4','F1','F2','F3','F4','F5','F3','F1','F2']);let c;
 switch(k){case 'E1':return {k,b,E:`(x + ${b})²`,f:0,r:3,res:PL(1,2*b,b*b),why:'שני סוגריים זהים בריבוע, עם פלוס.'};
  case 'E2':return {k,b,E:`(x − ${b})²`,f:1,r:3,res:PL(1,-2*b,b*b),why:'שני סוגריים זהים בריבוע, עם מינוס.'};
  case 'E3':return Math.random()<.5?{k,b,E:`(x + ${b})(x − ${b})`,f:2,r:4,res:PL(1,0,-b*b),why:'אותו מספר, פעם פלוס ופעם מינוס.'}:{k,b,E:`(${b} − x)(${b} + x)`,f:2,r:4,res:b*b+' − x²',why:'אותם איברים, פעם פלוס ופעם מינוס.'};
  case 'E4':c=nz(2,9,[b]);return {k,b,E:`(x + ${b})(x − ${c})`,f:3,r:5,res:PL(1,b-c,-b*c),why:'המספרים בסוגריים שונים ← פותחים רגיל, כל איבר כפול כל איבר.'};
  case 'F1':return {k,b,E:PL(1,2*b,b*b),f:0,r:0,res:`(x + ${b})²`,why:`3 איברים: ${M('x²')} ו־${M(b*b+' = '+b+'²')} ריבועים, והאמצעי ${M('2 · x · '+b+' = '+2*b+'x')} ← טרינום ריבועי.`};
  case 'F2':return {k,b,E:PL(1,-2*b,b*b),f:1,r:0,res:`(x − ${b})²`,why:`3 איברים, האמצעי ${M('−2 · x · '+b+' = −'+2*b+'x')} ← טרינום ריבועי עם מינוס.`};
  case 'F3':return {k,b,E:PL(1,0,-b*b),f:2,r:1,res:`(x + ${b})(x − ${b})`,why:`2 ריבועים ומינוס ביניהם: ${M('x² − '+b+'²')} ← הפרש ריבועים.`};
  case 'F4':return {k,b,E:PL(1,0,b*b),f:3,r:2,res:'לא מתפרק בכפל מקוצר',why:'פלוס בין שני ריבועים ← <b>סכום</b> ריבועים. אין לו נוסחה בכפל מקוצר.'};
  default:return {k,b,E:PL(1,b,b*b),f:3,r:0,res:'לא טרינום ריבועי',why:`הקצוות ריבועים, אבל האמצעי צריך להיות ${M(2*b+'x')}, ולא ${M(b+'x')}.`};}}
function whWork(z){const F=z.k[0]==='F';return [{t:F?'מה רואים בביטוי?':'מה רואים בסוגריים?',choice:F?WREASON.slice(0,3):WREASON.slice(3),correct:F?z.r:z.r-3,why:z.why},...(z.k==='F1'||z.k==='F2'||z.k==='F5'?[{t:`האם האיבר האמצעי הוא ${M('2 · x · '+z.b)}?`,choice:['כן','לא'],correct:z.k==='F5'?1:0,why:M('2 · x · '+z.b+' = '+2*z.b+'x')+'.'}]:[])];}
/* ★★ זיהוי הנוסחה */
function gWhich(){const z=whCase(),F=z.k[0]==='F';
 return {kind:F?'איזו נוסחה? · מפרקים':'איזו נוסחה? · פותחים',rc:12,text:`${F?'רוצים לכתוב כמכפלה':'רוצים לפתוח סוגריים'}: ${M(z.E)}. באיזו נוסחה משתמשים?`,choice:WO,correct:z.f,work:whWork(z),
  lines:[z.why,`${M(z.E)} ← ${z.f<3||z.k==='E4'?M(z.res):z.res}`],rule:'2 איברים עם מינוס ← הפרש ריבועים. 3 איברים עם אמצעי 2ab ← טרינום ריבועי. סוגריים זהים ← ריבוע.',trick:'קודם סופרים איברים, אחר כך בודקים סימנים.',
  diag:({sel})=>sel===2&&z.f<2?'הפרש ריבועים הוא <b>2 איברים</b>. כאן '+(F?'יש 3':'הסוגריים זהים')+'.':sel<2&&z.f===2?'טרינום ריבועי הוא <b>3 איברים</b>. כאן יש '+(F?'2 איברים עם מינוס':'פלוס ומינוס בסוגריים')+'.':sel<3&&z.f===3?z.why:sel===3?'בדקו שוב: '+z.why:'בדקו את הסימן: פלוס או מינוס?'};}
/* ★★★ זיהוי + כתיבת התוצאה */
function gWhichF(){let z;do{z=whCase();}while(z.k[0]!=='F');const b=z.b;
 const pool={F1:[`(x + ${b})²`,`(x − ${b})²`,`(x + ${b})(x − ${b})`,`(x + ${2*b})²`],F2:[`(x − ${b})²`,`(x + ${b})²`,`(x + ${b})(x − ${b})`,`(x − ${2*b})²`],F3:[`(x + ${b})(x − ${b})`,`(x − ${b})²`,`(x + ${b})²`,`(x + ${b*b})(x − ${b*b})`],
  F4:['לא מתפרק בכפל מקוצר',`(x + ${b})²`,`(x + ${b})(x − ${b})`,`(x − ${b})²`],F5:['לא טרינום ריבועי',`(x + ${b})²`,`(x + ${b})(x − ${b})`,`(x + ${2*b})²`]}[z.k];
 const o=shuf(pool.slice()),lab=s=>/[x(]/.test(s)?M(s):s;
 return {kind:'איזו נוסחה? · כותבים כמכפלה',rc:12,text:`כתבו כמכפלה, אם אפשר: ${M(z.E)}`,choice:o.map(lab),correct:o.indexOf(pool[0]),work:whWork(z),
  lines:[z.why,`${M(z.E)} = ${lab(pool[0])}`],rule:'בודקים: כמה איברים? איזה סימן? האם האמצעי 2ab?',trick:'בדיקה: פותחים את התשובה וחוזרים לביטוי.',
  diag:({sel})=>{const s=o[sel];return s===`(x + ${b})²`&&z.k==='F3'?'פתחו: '+M(`(x + ${b})² = ${PL(1,2*b,b*b)}`)+'. יש בו איבר אמצעי.':s===`(x + ${b})(x − ${b})`&&z.k!=='F3'?'פתחו: '+M(`(x + ${b})(x − ${b}) = x² − ${b*b}`)+'. אין בו איבר אמצעי.':/2/.test(s)&&s.includes(''+2*b)?'בסוגריים שמים את '+M(b)+', המספר שבריבוע נותן '+M(b*b)+'.':s.includes(''+b*b+')')?'בסוגריים שמים את '+M(b)+', לא את '+M(b*b)+'.':'פתחו את התשובה שבחרתם ובדקו אם חוזרים ל־'+M(z.E)+'.';}};}
/* כרטיס הסבר: איך יודעים איזו נוסחה */
function whSvg(){const R0=[['(a + b)²','a² + 2ab + b²','ריבוע של סכום',BL],['(a − b)²','a² − 2ab + b²','ריבוע של הפרש',OR],['(a + b)(a − b)','a² − b²','הפרש ריבועים',GR]];
 return `<svg viewBox="0 0 400 250" style="max-width:380px;direction:ltr" role="img" aria-label="טבלת נוסחאות"><text x="95" y="24" text-anchor="middle" font-size="15" fill="#9fb3cc" font-weight="700" style="font-family:Rubik">מכפלה</text><text x="300" y="24" text-anchor="middle" font-size="15" fill="#9fb3cc" font-weight="700" style="font-family:Rubik">ביטוי פתוח</text>
 <text x="198" y="244" text-anchor="middle" font-size="15" fill="#9fb3cc" direction="rtl" style="font-family:Rubik">פותחים ← · → מפרקים</text>`+R0.map((r,i)=>{const y=40+i*66;return `<g class="rv" style="--d:${.3+i*.6}s"><rect x="10" y="${y}" width="170" height="52" rx="12" fill="${r[3]}" fill-opacity=".2" stroke="${r[3]}" stroke-width="2.5"/><rect x="220" y="${y}" width="170" height="52" rx="12" fill="${r[3]}" fill-opacity=".2" stroke="${r[3]}" stroke-width="2.5"/>
 <text x="95" y="${y+33}" text-anchor="middle" font-size="19" font-weight="800" fill="#dfe8f5" style="font-family:Rubik">${r[0]}</text><text x="305" y="${y+24}" text-anchor="middle" font-size="18" font-weight="800" fill="#dfe8f5" style="font-family:Rubik">${r[1]}</text><text x="305" y="${y+44}" text-anchor="middle" font-size="13" fill="${r[3]}" direction="rtl" font-weight="700" style="font-family:Rubik">${r[2]}</text><text x="200" y="${y+32}" text-anchor="middle" font-size="20" fill="#dfe8f5">⇄</text></g>`;}).join('')+'</svg>';}
RECAP.push({h:'איך יודעים איזו נוסחה?',d:2.4,svg:whSvg,says:['<b>3 איברים</b>, אמצעי '+M('2ab')+' ← טרינום ריבועי.','<b>2 איברים</b> ומינוס ← הפרש ריבועים.'],what:'סופרים איברים ← בודקים סימן.'});
RECAP[12].chk=[gWhich,gWhichF];
WARM[2]=gDS1;
LEVELS.push({n:0,t:'🧭 איזו נוסחה מתאימה?',d:'טרינום ריבועי, הפרש ריבועים, או אף נוסחה – מזהים לפני שפותרים',ladder:[{g:gWhich,n:18,h:1},{g:gWhichF,n:17,h:1}]});
APP.total=35;LEVELS.forEach(l=>{if(!l.ladder)return;const t=l.ladder.reduce((a,e)=>a+e.n,0);let left=35;l.ladder.forEach((e,i)=>{e.n=i===l.ladder.length-1?left:Math.max(1,Math.round(e.n*35/t));left-=e.n;});});
