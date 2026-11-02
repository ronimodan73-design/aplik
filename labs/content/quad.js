/*META {"id":"quad","title":"מעבדת המרובעים: מקבילית, מלבן, מעוין, ריבוע, טרפז, דלתון","icon":"🔷"} */
const LAB={hide:true,tip:'🖐 גוררים את הקודקודים A B C D – והשם והתכונות מתעדכנים לבד. כפתורים בכותרת מדליקים צלעות, מקבילות, זוויות ואלכסונים. 🎬 "משפחת המרובעים" מראה איך כל צורה נולדת מהקודמת.',refresh:()=>draw()};
const U=40,OX=40,OY=490,GX=17,GY=11,E=1e-6;
const X=x=>OX+x*U,Y=y=>OY-y*U;
const PRE={
 'מרובע כללי':[[3,2],[12,3],[13,9],[5,8]],
 'טרפז':[[3,2],[14,2],[12,8],[4,8]],
 'טרפז שווה שוקיים':[[3,2],[14,2],[11,8],[6,8]],
 'מקבילית':[[3,2],[11,2],[14,8],[6,8]],
 'מלבן':[[3,2],[12,2],[12,8],[3,8]],
 'מעוין':[[4,2],[9,2],[12,6],[7,6]],
 'ריבוע':[[5,2],[11,2],[11,8],[5,8]],
 'דלתון':[[8,1],[12,6],[8,10],[4,6]]};
const NAMES=['מרובע כללי','טרפז','מקבילית','מלבן','מעוין','ריבוע','דלתון'];
let P=PRE['מקבילית'].map(p=>[...p]),SH={s:true,p:true,a:false,d:false},chal=null,cap='';
const L=['A','B','C','D'];
const sub=(a,b)=>[a[0]-b[0],a[1]-b[1]],cr=(u,v)=>u[0]*v[1]-u[1]*v[0],dt=(u,v)=>u[0]*v[0]+u[1]*v[1],l2=u=>dt(u,u),eq=(a,b)=>Math.abs(a-b)<E;
function info(Q=P){
 const s=[0,1,2,3].map(i=>sub(Q[(i+1)%4],Q[i])),len=s.map(v=>Math.sqrt(l2(v)));
 const cv=[0,1,2,3].map(i=>cr(s[i],s[(i+1)%4])),convex=cv.every(c=>c>E)||cv.every(c=>c<-E);
 const p1=Math.abs(cr(s[0],s[2]))<E,p2=Math.abs(cr(s[1],s[3]))<E;
 const ang=[0,1,2,3].map(i=>{const u=sub(Q[(i+1)%4],Q[i]),v=sub(Q[(i+3)%4],Q[i]);return Math.acos(Math.max(-1,Math.min(1,dt(u,v)/Math.sqrt(l2(u)*l2(v)))))*180/Math.PI;});
 const right=[0,1,2,3].map(i=>Math.abs(dt(sub(Q[(i+1)%4],Q[i]),sub(Q[(i+3)%4],Q[i])))<E);
 const d1=sub(Q[2],Q[0]),d2=sub(Q[3],Q[1]);
 const dEq=eq(l2(d1),l2(d2)),dPerp=Math.abs(dt(d1,d2))<E,dBis=eq(Q[0][0]+Q[2][0],Q[1][0]+Q[3][0])&&eq(Q[0][1]+Q[2][1],Q[1][1]+Q[3][1]);
 const allEq=len.every(x=>eq(x,len[0])),par=p1&&p2,rect=par&&right[0],rh=allEq,sq=rect&&rh;
 const kite=(eq(len[0],len[3])&&eq(len[1],len[2]))||(eq(len[0],len[1])&&eq(len[2],len[3]));
 const trap=(p1!==p2),legs=p1?[len[1],len[3]]:[len[0],len[2]],isoT=trap&&eq(legs[0],legs[1]),rtT=trap&&right.some(x=>x);
 let names=[];if(convex){if(sq)names.push('ריבוע');if(rect)names.push('מלבן');if(rh)names.push('מעוין');if(par)names.push('מקבילית');if(kite)names.push('דלתון');if(trap)names.push('טרפז');if(!names.length)names.push('מרובע כללי');}
 let main=names[0]||'';if(trap){main=isoT?'טרפז שווה שוקיים':rtT?'טרפז ישר זווית':'טרפז';}
 return {s,len,convex,p1,p2,ang,right,d1,d2,dEq,dPerp,dBis,names,main,par,trap};}
const fmt=x=>Math.abs(x-Math.round(x))<0.05?String(Math.round(x)):'≈'+x.toFixed(1);
function groups(vals){const g=[];vals.forEach((v,i)=>{let k=g.findIndex(G=>eq(vals[G[0]],v));if(k<0)g.push([i]);else g[k].push(i);});const r=Array(vals.length).fill(-1);let c=0;g.forEach(G=>{if(G.length>1){G.forEach(i=>r[i]=c);c++;}});return r;}
const hc=()=>(hidCls()||(chal&&!ST.revealed))?'hid':'';
const SC=[COL.green,COL.purple,COL.pink,COL.teal],AC=[COL.gold,COL.pink,COL.teal,COL.green];
function ticks(a,b,n,col){const mx=(X(a[0])+X(b[0]))/2,my=(Y(a[1])+Y(b[1]))/2,dx=X(b[0])-X(a[0]),dy=Y(b[1])-Y(a[1]),L0=Math.hypot(dx,dy),ux=dx/L0,uy=dy/L0,nx=-uy,ny=ux;let s='';
 for(let k=0;k<n;k++){const o=(k-(n-1)/2)*7;s+=`<line x1="${mx+ux*o-nx*9}" y1="${my+uy*o-ny*9}" x2="${mx+ux*o+nx*9}" y2="${my+uy*o+ny*9}" stroke="${col}" stroke-width="3.5"/>`;}return s;}
function arrows(a,b,n,col){const mx=(X(a[0])+X(b[0]))/2,my=(Y(a[1])+Y(b[1]))/2,dx=X(b[0])-X(a[0]),dy=Y(b[1])-Y(a[1]),L0=Math.hypot(dx,dy),ux=dx/L0,uy=dy/L0,nx=-uy,ny=ux;let s='';
 for(let k=0;k<n;k++){const o=(k-(n-1)/2)*11+26;const tx=mx+ux*o,ty=my+uy*o;s+=`<polyline points="${tx-ux*10+nx*8},${ty-uy*10+ny*8} ${tx},${ty} ${tx-ux*10-nx*8},${ty-uy*10-ny*8}" fill="none" stroke="${col}" stroke-width="3.5"/>`;}return s;}
function draw(){const I=info();let s='';
 for(let x=0;x<=GX;x++)s+=`<line x1="${X(x)}" y1="${Y(0)}" x2="${X(x)}" y2="${Y(GY)}" stroke="${COL.grid}"/>`;
 for(let y=0;y<=GY;y++)s+=`<line x1="${X(0)}" y1="${Y(y)}" x2="${X(GX)}" y2="${Y(y)}" stroke="${COL.grid}"/>`;
 const pts=P.map(p=>X(p[0])+','+Y(p[1])).join(' ');
 s+=`<polygon points="${pts}" fill="#dbeafe" fill-opacity=".55" stroke="${COL.ink}" stroke-width="4" stroke-linejoin="round"/>`;
 if(SH.d){const c1=COL.red,c2='#334155';s+=`<line x1="${X(P[0][0])}" y1="${Y(P[0][1])}" x2="${X(P[2][0])}" y2="${Y(P[2][1])}" stroke="${c1}" stroke-width="3" stroke-dasharray="9 6"/><line x1="${X(P[1][0])}" y1="${Y(P[1][1])}" x2="${X(P[3][0])}" y2="${Y(P[3][1])}" stroke="${c2}" stroke-width="3" stroke-dasharray="9 6"/>`;
  const den=cr(I.d1,I.d2);if(Math.abs(den)>E){const t=cr(sub(P[1],P[0]),I.d2)/den,M0=[P[0][0]+I.d1[0]*t,P[0][1]+I.d1[1]*t];s+=`<circle cx="${X(M0[0])}" cy="${Y(M0[1])}" r="5" fill="${COL.ink}"/>`;
   if(I.dPerp){const u=I.d1.map(v=>v/Math.sqrt(l2(I.d1))),w=I.d2.map(v=>v/Math.sqrt(l2(I.d2))),k=14;const q=(a,b)=>`${X(M0[0]+a[0]*k/U+b[0]*k/U)},${Y(M0[1]+a[1]*k/U+b[1]*k/U)}`;s+=`<polyline points="${X(M0[0]+u[0]*k/U)},${Y(M0[1]+u[1]*k/U)} ${q(u,w)} ${X(M0[0]+w[0]*k/U)},${Y(M0[1]+w[1]*k/U)}" fill="none" stroke="${COL.blue}" stroke-width="3"/>`;}
   if(I.dBis){s+=ticks(P[0],M0,1,c1)+ticks(M0,P[2],1,c1)+ticks(P[1],M0,2,c2)+ticks(M0,P[3],2,c2);}}}
 if(SH.s){const g=groups(I.len);for(let i=0;i<4;i++){if(g[i]>=0)s+=ticks(P[i],P[(i+1)%4],g[i]+1,SC[g[i]]);
   const a=P[i],b=P[(i+1)%4],mx=(X(a[0])+X(b[0]))/2,my=(Y(a[1])+Y(b[1]))/2,cx=P.reduce((t,p)=>t+X(p[0]),0)/4,cy=P.reduce((t,p)=>t+Y(p[1]),0)/4,dd=Math.hypot(mx-cx,my-cy)||1;
   s+=`<text x="${mx+(mx-cx)/dd*30}" y="${my+(my-cy)/dd*30+8}" text-anchor="middle" font-size="22" font-weight="800" fill="${g[i]>=0?SC[g[i]]:COL.ink}" class="${hc()}">${fmt(I.len[i])}</text>`;}}
 if(SH.p){if(I.p1){s+=arrows(P[0],P[1],1,COL.orange)+arrows(P[3],P[2],1,COL.orange);}if(I.p2){s+=arrows(P[0],P[3],2,COL.blue)+arrows(P[1],P[2],2,COL.blue);}}
 if(SH.a){const g=groups(I.ang.map(a=>Math.round(a*10)/10));for(let i=0;i<4;i++){const v=P[i],u=sub(P[(i+1)%4],v),w=sub(P[(i+3)%4],v),nu=u.map(t=>t/Math.sqrt(l2(u))),nw=w.map(t=>t/Math.sqrt(l2(w))),col=g[i]>=0?AC[g[i]]:'#64748b';
   if(I.right[i]){const k=0.45;s+=`<polyline points="${X(v[0]+nu[0]*k)},${Y(v[1]+nu[1]*k)} ${X(v[0]+nu[0]*k+nw[0]*k)},${Y(v[1]+nu[1]*k+nw[1]*k)} ${X(v[0]+nw[0]*k)},${Y(v[1]+nw[1]*k)}" fill="none" stroke="${col}" stroke-width="3.5"/>`;}
   else{const r=0.7,a0=[v[0]+nu[0]*r,v[1]+nu[1]*r],a1=[v[0]+nw[0]*r,v[1]+nw[1]*r],sw=cr(nu,nw)>0?0:1;s+=`<path d="M${X(a0[0])},${Y(a0[1])} A${r*U},${r*U} 0 0 ${sw} ${X(a1[0])},${Y(a1[1])}" fill="none" stroke="${col}" stroke-width="4"/>`;}
   const bx=nu[0]+nw[0],by=nu[1]+nw[1],bl=Math.hypot(bx,by)||1;s+=`<text x="${X(v[0]+bx/bl*1.45)}" y="${Y(v[1]+by/bl*1.45)+7}" text-anchor="middle" font-size="19" font-weight="800" fill="${col}" class="${hc()}">${fmt(I.ang[i])}°</text>`;}}
 P.forEach((p,i)=>{const cx=P.reduce((t,q)=>t+q[0],0)/4,cy=P.reduce((t,q)=>t+q[1],0)/4,dx=p[0]-cx,dy=p[1]-cy,dl=Math.hypot(dx,dy)||1;
  s+=`<text x="${X(p[0]+dx/dl*0.75)}" y="${Y(p[1]+dy/dl*0.75)+9}" text-anchor="middle" font-size="26" font-weight="900" fill="${COL.ink}">${L[i]}</text><circle id="h${L[i]}" cx="${X(p[0])}" cy="${Y(p[1])}" r="13" fill="${COL.gold}" stroke="${COL.ink}" stroke-width="2.5" style="cursor:grab"/>`;});
 if(cap)s+=`<rect x="${X(0)+6}" y="8" width="${GX*U-12}" height="48" rx="12" fill="#fff7ed" stroke="${COL.orange}" stroke-width="2"/><text x="${X(GX/2)}" y="41" text-anchor="middle" font-size="24" font-weight="800" fill="${COL.ink}" style="direction:rtl;unicode-bidi:plaintext">${cap}</text>`;
 $('#sv').innerHTML=s;side(I);}
const yn=(b,t)=>`<div style="font-size:19px;margin:3px 0">${b?'✅':'⬜'} ${t}</div>`;
function side(I){const h=hc();
 const nm=I.convex?`<div class="big ${h}" style="font-size:30px">זה: ${I.main}</div>`+(I.names.length>1?`<div class="${h}" style="font-size:18px">וגם: ${I.names.filter(n=>n!==I.names[0]&&!(I.trap&&n==='טרפז')).join(' · ')||'—'}</div>`:''):`<div class="badbox big">⚠️ הצלעות נחתכות – גררו קודקוד חזרה</div>`;
 card('nm',nm);
 const sum=I.ang.map(a=>fmt(a).replace('≈','')).join('+');
 card('props',`<div style="font-weight:800;font-size:20px">התכונות של הצורה:</div><div class="${h}">`+
  `<div style="font-weight:800;color:${COL.orange};margin-top:4px">צלעות</div>`+yn(I.p1&&I.p2,'שני זוגות צלעות נגדיות מקבילות')+yn(I.p1!==I.p2,'רק זוג אחד של צלעות מקבילות')+yn(I.len.every(x=>eq(x,I.len[0])),'כל הצלעות שוות')+yn(eq(I.len[0],I.len[2])&&eq(I.len[1],I.len[3]),'צלעות נגדיות שוות')+
  `<div style="font-weight:800;color:${COL.gold};margin-top:4px">זוויות</div>`+yn(I.right.every(x=>x),'כל הזוויות ישרות (90°)')+yn(eq(I.ang[0],I.ang[2])&&eq(I.ang[1],I.ang[3]),'זוויות נגדיות שוות')+
  `<div style="font-weight:800;color:${COL.red};margin-top:4px">אלכסונים</div>`+yn(I.dBis,'חוצים זה את זה')+yn(I.dEq,'שווים באורכם')+yn(I.dPerp,'מאונכים זה לזה')+
  `<div style="margin-top:6px;font-size:18px">סכום הזוויות: ${M(sum+' = 360')}</div></div>`);}
function setP(Q){P=Q.map(p=>[...p]);}
function morph(T,ms,done){const S=P.map(p=>[...p]),n=ms<1000?7:14;seq(n,ms,i=>{const t=(i+1)/n,e=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;P=S.map((p,k)=>[p[0]+(T[k][0]-p[0])*e,p[1]+(T[k][1]-p[1])*e]);draw();},()=>{setP(T);draw();done&&done();});}
function family(){chal=null;const ch=$('#chal');if(ch)ch.remove();SH.s=SH.p=SH.a=true;syncT();
 const F=[['מרובע כללי','מתחילים: מרובע כללי – אין שום דבר מיוחד'],['טרפז','➕ זוג אחד של צלעות מקבילות → טרפז'],['מקבילית','➕ עוד זוג מקבילות → מקבילית'],['מלבן','➕ זווית ישרה → מלבן (כל הזוויות 90°)'],[null,'➕ כל הצלעות שוות → ריבוע! מלבן מיוחד']];
 const SQ=[[3,2],[9,2],[9,8],[3,8]];let k=0;const go=()=>{if(k>=F.length){setTimeout(()=>{cap='ריבוע הוא גם מלבן, גם מעוין, גם מקבילית';draw();},900);return;}const [n,c]=F[k++];cap=c;morph(n?PRE[n]:SQ,1500,()=>setTimeout(go,1700));};
 const ST0=ST.hide;ST.revealed=true;go();}
function family2(){chal=null;const ch=$('#chal');if(ch)ch.remove();SH.s=SH.p=SH.d=true;syncT();
 const F=[['מקבילית','מתחילים ממקבילית'],['מעוין','➕ כל הצלעות שוות → מעוין (האלכסונים מאונכים!)'],['ריבוע','➕ זווית ישרה → ריבוע'],['דלתון','דלתון: שני זוגות של צלעות סמוכות שוות']];
 let k=0;const go=()=>{if(k>=F.length)return;const [n,c]=F[k++];cap=c;morph(PRE[n],1500,()=>setTimeout(go,1800));};ST.revealed=true;go();}
function syncT(){[['tS','s'],['tP','p'],['tA','a'],['tD','d']].forEach(([i,k])=>$('#'+i).classList.toggle('on',SH[k]));}
const VAR={'מרובע כללי':()=>[[R(1,3),R(1,3)],[R(10,13),R(1,4)],[R(12,15),R(7,10)],[R(3,6),R(7,9)]],
 'טרפז':()=>{const y0=R(1,3),h=R(4,7),a=R(1,3),b=R(12,15);return [[a,y0],[b,y0],[b-R(1,4),y0+h],[a+R(2,5),y0+h]];},
 'מקבילית':()=>{const x=R(1,3),y=R(1,3),w=R(5,8),dx=R(2,4),h=R(4,7);return [[x,y],[x+w,y],[x+w+dx,y+h],[x+dx,y+h]];},
 'מלבן':()=>{const x=R(1,4),y=R(1,3),w=R(4,10),h=R(3,7);return w===h?[[x,y],[x+w+1,y],[x+w+1,y+h],[x,y+h]]:[[x,y],[x+w,y],[x+w,y+h],[x,y+h]];},
 'מעוין':()=>{const x=R(2,5),y=R(1,3),k=R(1,2);const[a,b]=pick([[3,4],[4,3]]);const s=5*k>8?5:5*k;const m=s/5;return [[x,y],[x+s,y],[x+s+a*m,y+b*m],[x+a*m,y+b*m]];},
 'ריבוע':()=>{const x=R(2,6),y=R(1,3),s=R(3,7);return pick([0,1])?[[x,y],[x+s,y],[x+s,y+s],[x,y+s]]:[[x+3,y],[x+6,y+3],[x+3,y+6],[x,y+3]];},
 'דלתון':()=>{const x=R(6,9),y=R(1,2),w=R(3,4),t=R(3,5),b=R(2,3);return [[x,y],[x+w,y+t],[x,y+t+b+R(0,1)],[x-w,y+t]];}};
function challenge(){cap='';SH.s=true;SH.p=true;SH.a=true;SH.d=false;syncT();const t=pick(Object.keys(VAR));let Q;do{Q=VAR[t]();}while(!info(Q).convex);setP(Q);ST.revealed=false;chal={};draw();
 const I=info();chal={I};card('chal',`<div class="big">🎯 איזה מרובע זה? לפי הסימנים בשרטוט</div><div class="ctl noprint" style="flex-wrap:wrap;gap:6px;margin-top:6px">${NAMES.map(n=>`<button class="ans" data-n="${n}" style="font-size:19px;font-weight:800;padding:9px 12px">${n}</button>`).join('')}</div><div id="fb" style="min-height:30px;font-size:20px;margin-top:6px"></div><button id="all" class="noprint" style="font-size:18px;margin-top:4px">👀 כל האפשרויות</button>`,'chal');$('#side').prepend($('#chal'));
 $$('#chal .ans').forEach(b=>b.onclick=()=>{const n=b.dataset.n,ok=I.names.includes(n);b.style.background=ok?COL.green:COL.red;b.style.color='#fff';
  $('#fb').innerHTML=ok?`<div class="okbox">✅ נכון! ${I.names.length>1?'יש עוד שמות נכונים – מי מוצא?':''}</div>`:`<div class="badbox">❌ לא. ${why(n,I)}</div>`;});
 $('#all').onclick=()=>{ST.revealed=true;draw();$('#fb').innerHTML=`<div class="okbox">כל השמות הנכונים: <b>${I.names.join(' · ')}</b></div>`;};}
function why(n,I){const e={'מקבילית':'במקבילית שני זוגות של צלעות מקבילות – בדקו את החצים.','מלבן':'במלבן כל הזוויות ישרות – יש כאן ריבוע קטן בכל פינה?','מעוין':'במעוין כל 4 הצלעות שוות – יש אותו סימון על כולן?','ריבוע':'ריבוע צריך גם 4 זוויות ישרות וגם 4 צלעות שוות.','טרפז':'בטרפז רק זוג אחד של צלעות מקבילות.','דלתון':'בדלתון שני זוגות של צלעות סמוכות (צמודות) שוות.','מרובע כללי':'יש כאן תכונה מיוחדת – חפשו חצים או סימונים.'};return e[n];}
function start(){svgSize(760,520);
 document.head.insertAdjacentHTML('beforeend','<style>.bigb{display:block;width:100%;font-size:20px;font-weight:800;padding:11px 14px;margin:6px 0;border-radius:14px;text-align:start}#acts .bigb:nth-child(1){background:#ea580c}#acts .bigb:nth-child(2){background:#7c3aed}#acts .bigb:nth-child(3){background:#dc2626}.pre{font-size:18px;font-weight:800;padding:8px 11px}</style>');
 tool('tS','📏 צלעות',()=>{SH.s=!SH.s;syncT();draw();},{lt:1});
 tool('tP','➡️ מקבילות',()=>{SH.p=!SH.p;syncT();draw();},{lt:1});
 tool('tA','📐 זוויות',()=>{SH.a=!SH.a;syncT();draw();},{lt:1});
 tool('tD','✖️ אלכסונים',()=>{SH.d=!SH.d;syncT();draw();},{lt:1});
 tool('tR','🔄 סובב',()=>{cap='';const cx=P.reduce((t,p)=>t+p[0],0)/4,cy=P.reduce((t,p)=>t+p[1],0)/4,a=Math.PI/6;const T=P.map(p=>{const dx=p[0]-cx,dy=p[1]-cy;return [Math.round((cx+dx*Math.cos(a)-dy*Math.sin(a))*1000)/1000,Math.round((cy+dx*Math.sin(a)+dy*Math.cos(a))*1000)/1000];});if(T.every(p=>p[0]>=0&&p[0]<=GX&&p[1]>=0&&p[1]<=GY))morph(T,700);});
 card('acts','<div class="noprint">'+[['aF','🎬 משפחת המרובעים (טרפז ← ריבוע)'],['aF2','🎬 מעוין ודלתון'],['aC','🎯 אתגר: איזה מרובע זה?']].map(([i,t])=>`<button class="bigb" id="${i}">${t}</button>`).join('')+
  '<div style="font-weight:800;margin-top:6px">צורה מוכנה:</div><div class="ctl" style="flex-wrap:wrap;gap:6px">'+Object.keys(PRE).map(n=>`<button class="pre" data-n="${n}">${n}</button>`).join('')+'</div></div>');
 $('#aF').onclick=()=>{if(!ST.busy)family();};$('#aF2').onclick=()=>{if(!ST.busy)family2();};$('#aC').onclick=()=>{if(!ST.busy)challenge();};
 $$('#acts .pre').forEach(b=>b.onclick=()=>{if(ST.busy)return;cap='';chal=null;const c=$('#chal');if(c)c.remove();morph(PRE[b.dataset.n],700);});
 draggable(['hA','hB','hC','hD'],(id,p)=>{const i=L.indexOf(id[1]),gx=Math.max(0,Math.min(GX,Math.round((p.x-OX)/U))),gy=Math.max(0,Math.min(GY,Math.round((OY-p.y)/U)));
  if(P[i][0]===gx&&P[i][1]===gy)return;if(P.some((q,k)=>k!==i&&q[0]===gx&&q[1]===gy))return;cap='';P[i]=[gx,gy];draw();});
 syncT();draw();}
