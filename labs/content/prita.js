/*META {"id":"prita","title":"מעבדת הפריטה: שלם פחות שבר","icon":"🍫"} */
const LAB={hide:true,tip:'🔪 התלמיד גורר את הסכין (האצבע או העכבר) דרך העיגול המסומן, וכל חיתוך מחלק אותו לעוד חלק שווה, עד שיש חלקים כמו המכנה. אחר כך לוחצים על החלקים שמורידים. אפשר גם ללחוץ על העיגול.',refresh:()=>out()};
const X0=30,Y=150,H=80,GAP=16,MAXW=5;
let W=3,n=3,d=4,step=0,chal=null;
/* שבר בטקסט (HTML): מונה מעל מכנה */
const fr=(a,b,c)=>`<span class="fr ${c||''}"><span class="nu">${a}</span><span class="de">${b}</span></span>`;
/* שמות החלקים בעברית: רבע אחד / 3 רבעים */
const ONE=['','','חצי','שליש','רבע','חמישית','שישית','שביעית','שמינית','תשיעית','עשירית'],MANY=['','','חצאים','שלישים','רבעים','חמישיות','שישיות','שביעיות','שמיניות','תשיעיות','עשיריות'];
const parts=(k,b)=>k===1?(b<5?ONE[b]+' אחד':ONE[b]+' אחת'):k+' '+MANY[b];
const wholes=k=>k===1?'שלם אחד':k+' שלמים';
const mx=(w,a,b,c)=>a===0?`<span class="${c||''}">${w}</span>`:`<span class="mx ${c||''}">${w>0?w:''}${fr(a,b)}</span>`;
/* שבר בתוך השרטוט */
function sf(x,y,a,b,col,fs=30){return `<text x="${x}" y="${y-6}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${col}">${a}</text><line x1="${x-fs*.45}" y1="${y}" x2="${x+fs*.45}" y2="${y}" stroke="${col}" stroke-width="3"/><text x="${x}" y="${y+fs}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${col}">${b}</text>`;}
const BW=()=>Math.min(130,(700-GAP*(W-1))/W);
const bx=i=>X0+i*(BW()+GAP);
let shape='circle',rem=new Set(),cut=0;
/* מיקום השלם ה־i לפי הצורה */
function geo(i){const w=BW();if(shape==='line'){const u=Math.min(140,700/W),x=X0+i*u;return {x,w:u,cx:x+u/2,cy:Y+H/2,u};}
 const x=bx(i);return {x,w,cx:x+w/2,cy:Y+H/2,r:Math.min(w/2-4,62)};}
function wedgeP(cx,cy,r,a0,a1){const p=a=>`${cx+r*Math.sin(a)},${cy-r*Math.cos(a)}`;return `M${cx},${cy} L${p(a0)} A${r},${r} 0 ${a1-a0>Math.PI?1:0} 1 ${p(a1)} Z`;}
/* חלק k מתוך d של השלם ה־i (k=-1 = השלם כולו) */
function piece(i,k,dd,fill,op,stroke,extra,id){const g=geo(i),ID=id?`id="${id}" style="cursor:pointer"`:'';
 if(shape==='circle'){if(k<0)return `<circle ${ID} cx="${g.cx}" cy="${g.cy}" r="${g.r}" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="3" ${extra||''}/>`;
  const a0=2*Math.PI*k/dd,a1=2*Math.PI*(k+1)/dd;return `<path ${ID} d="${wedgeP(g.cx,g.cy,g.r,a0,a1)}" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="2.5" ${extra||''}/>`;}
 if(shape==='line'){const x1=k<0?g.x:g.x+k*g.u/dd,x2=k<0?g.x+g.u:g.x+(k+1)*g.u/dd;
  return `<line x1="${x1+3}" y1="${g.cy}" x2="${x2-3}" y2="${g.cy}" stroke="${fill}" stroke-opacity="${op<.5?.35:1}" stroke-width="16" stroke-linecap="round" ${extra||''}/>`+(id?`<rect ${ID} x="${x1}" y="${g.cy-26}" width="${x2-x1}" height="52" fill="transparent"/>`:'');}
 if(k<0)return `<rect ${ID} x="${g.x}" y="${Y}" width="${g.w}" height="${H}" rx="10" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="3" ${extra||''}/>`;
 const pw=g.w/dd;return `<rect ${ID} x="${g.x+k*pw+2}" y="${Y}" width="${pw-4}" height="${H}" rx="6" fill="${fill}" fill-opacity="${op}" stroke="${stroke}" stroke-width="2" ${extra||''}/>`;}
function cutLine(i,k){const g=geo(i);if(shape==='circle'){const a=2*Math.PI*k/d;return `<line x1="${g.cx}" y1="${g.cy}" x2="${g.cx+g.r*Math.sin(a)}" y2="${g.cy-g.r*Math.cos(a)}" stroke="${COL.ink}" stroke-width="4" stroke-dasharray="7 5"/>`;}
 const x=g.x+k*g.w/d,y1=shape==='line'?g.cy-24:Y-12,y2=shape==='line'?g.cy+24:Y+H+12;return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${COL.ink}" stroke-width="4" stroke-dasharray="7 5"/>`;}
function draw(){const L=W-1;if(step===0){rem=new Set();}let s='';
 s+=`<text x="380" y="52" text-anchor="middle" font-size="40" font-weight="800" fill="${COL.ink}">${W}  −</text>`+sf(440,44,n,d,COL.red,30)+`<text x="490" y="52" font-size="40" font-weight="800" fill="${COL.ink}">=  ?</text>`;
 const g0=geo(0),bot=shape==='circle'?g0.cy+g0.r:shape==='line'?Y+H/2+44:Y+H;
 if(shape==='line'){const gL=geo(W);s+=`<line x1="${X0-10}" y1="${g0.cy}" x2="${gL.x+14}" y2="${g0.cy}" stroke="${COL.ink}" stroke-width="3"/>`;
  for(let j=0;j<=W;j++){const x=geo(j).x;s+=`<line x1="${x}" y1="${g0.cy-18}" x2="${x}" y2="${g0.cy+18}" stroke="${COL.ink}" stroke-width="4"/><text x="${x}" y="${g0.cy+48}" text-anchor="middle" font-size="26" font-weight="800" fill="${COL.ink}">${j}</text>`;}}
 for(let i=0;i<W;i++){const g=geo(i),last=i===L,ly=shape==='line'?g.cy-50:bot+40;
  if(last&&step>=1){
   if(step===1&&cut!==d){const bad=cut>d,cc=bad?COL.red:COL.purple;
    if(cut<=1)s+=piece(i,-1,1,cc,.85,COL.gold,'stroke-width="6"','cw0');else for(let k=0;k<cut;k++)s+=piece(i,k,cut,cc,.85,'#fff','','cw'+k);
    s+=`<text x="${g.cx}" y="${shape==='line'?g.cy-34:Y-14}" text-anchor="middle" font-size="30">🔪</text>`;}
   else for(let k=0;k<d;k++){const gone=rem.has(k);s+=piece(i,k,d,gone?COL.red:COL.purple,gone?.15:.85,gone?COL.red:COL.purple,gone?'stroke-dasharray="6 5"':'',step<3&&!gone?'p'+k:'');}
   if(cut===d)s+=shape==='line'?sf(g.cx,ly-18,d,d,COL.purple,24):sf(g.cx,ly-8,d,d,COL.purple,26);
  }else{s+=piece(i,-1,1,COL.green,.85,last&&step===0?COL.gold:COL.green,last&&step===0?'stroke-width="6"':'',last&&step===0?'whole':'');
   if(last&&step===0)s+=`<text x="${g.cx}" y="${shape==='line'?g.cy-34:Y-14}" text-anchor="middle" font-size="30">🔪</text>`;
   if(shape!=='line')s+=`<text x="${g.cx}" y="${ly}" text-anchor="middle" font-size="28" font-weight="800" fill="${COL.green}">1</text>`;}}
 const gh=geo(L),hx=shape==='line'?geo(W).x+34:gh.x+gh.w+16;
 s+=`<circle id="hd" cx="${Math.min(hx,742)}" cy="${g0.cy}" r="16" fill="${COL.gold}" stroke="${COL.ink}" stroke-width="3" style="cursor:grab"/>`;
 const msg=[`צריך להוריד ${parts(n,d)}. קחו את הסכין 🔪 וחתכו את השלם המסומן`,
  (cut===d?`מצוין! ${d} חלקים, כמו המכנה. לחצו על ${n===1?'חלק אחד':n+' חלקים'} כדי להוריד`:cut>d?`חתכתם ל־${cut} חלקים: יותר מדי! צריך ${d}. לחצו "↩ בטל חיתוך"`:`חתכתם ל־${cut===1?'חלק אחד':cut+' חלקים'}. המכנה ${d}, אז צריך ${d} חלקים. חתכו עוד עם הסכין`),
  `הורדנו ${rem.size} מתוך ${n}. ${rem.size<n?'לחצו על עוד חלק':''}`,
  L>0?`נשארו ${wholes(L)} ועוד ${parts(d-n,d)}`:`לא נשארו שלמים. נשארו ${parts(d-n,d)}`][step];
 s+=`<text x="380" y="${bot+90}" text-anchor="middle" font-size="24" font-weight="700" class="he" fill="${COL.ink}">${msg}</text>`;
 if(step>=3){const A=L>0?`${L}`:'';s+=`<text x="${A?345:380}" y="${bot+160}" text-anchor="middle" font-size="44" font-weight="800" fill="${COL.blue}">${A}</text>`+sf(A?395:380,bot+150,d-n,d,COL.blue,32);}
 $('#sv').innerHTML=s;out();}
function out(){const H2=hidCls(),L=W-1;
 card('dims',`<div class="ctl"><b class="green">שלמים</b><button class="lt" id="wm">−</button><span class="big green">${W}</span><button class="lt" id="wp">+</button></div>
  <div class="ctl"><b class="red">מונה</b><button class="lt" id="nm">−</button><span class="big red">${n}</span><button class="lt" id="np">+</button></div>
  <div class="ctl"><b class="purple">מכנה</b><button class="lt" id="dm">−</button><span class="big purple">${d}</span><button class="lt" id="dp">+</button></div>
  <div class="ctl"><button id="bNext">➡ צעד הבא</button><button class="lt" id="bRe">🔁 מההתחלה</button><span class="tip">צעד ${step+1} מתוך 4</span></div>
  ${step===1&&cut!==d?`<div class="ctl"><button id="bCut">🔪 עוד חיתוך</button><button class="lt" id="bUn">↩ בטל חיתוך</button><span class="big ${cut>d?'red':'purple'}">${cut} / ${d}</span></div>`:''}
  <div class="ctl"><b>צורה</b><button class="${shape==='rect'?'on':'lt'}" id="sR">🍫 מלבן</button><button class="${shape==='circle'?'on':'lt'}" id="sC">🍕 עיגול</button><button class="${shape==='line'?'on':'lt'}" id="sL">📏 ציר מספרים</button></div>`);
 [['sR','rect'],['sC','circle'],['sL','line']].forEach(([id,v])=>$('#'+id).onclick=()=>{if(!ST.busy&&shape!==v){shape=v;step=0;ST.revealed=false;draw();}});
 const set=(w2,n2,d2)=>{if(ST.busy)return;d2=Math.max(2,Math.min(10,d2));n2=Math.max(1,Math.min(d2-1,n2));w2=Math.max(1,Math.min(MAXW,w2));
  if(w2!==W||n2!==n||d2!==d){W=w2;n=n2;d=d2;step=0;ST.revealed=false;draw();}};
 $('#wm').onclick=()=>set(W-1,n,d);$('#wp').onclick=()=>set(W+1,n,d);$('#nm').onclick=()=>set(W,n-1,d);$('#np').onclick=()=>set(W,n+1,d);
 $('#dm').onclick=()=>set(W,n,d-1);$('#dp').onclick=()=>set(W,n,d+1);
 $('#bNext').onclick=next;if($('#bCut')){$('#bCut').onclick=addCut;$('#bUn').onclick=undoCut;}$('#bRe').onclick=()=>{if(!ST.busy){step=0;ST.revealed=false;draw();}};
 let t=`<div class="big">התרגיל: ${M(`${C(W,'green')} − ${fr(n,d,'red')}`)}</div>`;
 if(step>=1&&cut===d)t+=`<div class="big" style="font-size:26px">1. פורטים שלם: ${M(`${C(W,'green')} = ${L>0?C(L,'green')+' + ':''}${fr(d,d,'purple')}`)}</div>`;
 if(step>=2)t+=`<div class="big" style="font-size:26px">2. מחסרים: ${M(`${fr(d,d,'purple')} − ${fr(n,d,'red')} = <span class="${H2}">${fr(d-n,d,'blue')}</span>`)}</div>`;
 if(step>=3)t+=`<div class="big okbox" style="font-size:28px">התשובה: <span class="${H2}">${M(`${C(W,'green')} − ${fr(n,d,'red')} = ${mx(L,d-n,d,'blue')}`)}</span></div>
   <div class="tip">בדיקה: ${M(`${mx(L,d-n,d)} + ${fr(n,d)} = ${W}`)}</div>`;
 if(step>=3&&H2)t+=`<button class="noprint" id="bReveal" style="margin-top:8px">👀 גלו את התשובה</button>`;
 card('out',t);if($('#bReveal'))$('#bReveal').onclick=()=>{ST.revealed=true;out();};
 if(step>=3)card('why',`<div class="big purple" style="font-size:24px">למה פורטים?</div><div>אי אפשר להוריד ${fr(n,d,'red')} משלם שלא חתוך. לכן פורטים <b>שלם אחד</b> ל־${M(fr(d,d,'purple'))}, באותו מכנה כמו השבר שמורידים. את שאר השלמים לא נוגעים.</div><div class="badbox">⚠️ טעות נפוצה: ${M(`${W} − ${fr(n,d)} = ${mx(W-1,n,d)}`)} (מעתיקים את השבר שמורידים). צריך לבדוק כמה חלקים <b>נשארו</b> בשלם שפרטנו: ${M(`${d} − ${n} = ${d-n}`)}</div>`);
 else if($('#why'))$('#why').remove();
 if(chal)chalCard();}
/* התלמיד חותך: כל לחיצה על העיגול מוסיפה חיתוך, עד שיש חלקים כמספר המכנה */
function doCut(){if(ST.busy||step!==0)return;step=1;cut=1;draw();}
function addCut(){if(ST.busy||step!==1||cut===d||cut>=12)return;cut++;draw();}
function undoCut(){if(ST.busy||step!==1)return;cut=Math.max(1,cut-1);draw();}
function takeOne(k){if(ST.busy||step<1||step>2||rem.has(k)||rem.size>=n)return;rem.add(k);step=rem.size>=n?3:2;draw();}
function next(){if(ST.busy)return;if(step>=3){step=0;draw();return;}
 if(step===0){doCut();return;}
 if(step===1&&cut!==d){if(cut>d){cut=d;draw();return;}const m=d-cut;seq(m,Math.min(2600,m*380),()=>{cut++;draw();});return;}
 const need=[];for(let k=d-1;k>=0&&rem.size+need.length<n;k--)if(!rem.has(k))need.push(k);
 seq(need.length,Math.max(800,need.length*450),i=>{rem.add(need[i]);step=2;draw();},()=>{step=3;draw();});}
/* אתגר לכיתה: תרגיל חדש + 4 תשובות, נבדק לבד */
function newChal(){const W2=R(2,5),d2=R(2,9),n2=R(1,d2-1),L=W2-1,ok=`${L}|${d2-n2}|${d2}`;
 const raw=[[L,d2-n2,d2],[L,n2,d2],[W2,d2-n2,d2],[L,d2-n2,d2+1],[W2-2,d2-n2,d2],[L,1,d2]];
 const seen=new Set(),opts=[];for(const o of raw){const k=o.join('|');if(o[0]<0||o[1]<1||o[1]>=o[2]||seen.has(k))continue;seen.add(k);opts.push(o);}
 while(opts.length<4){const o=[L,R(1,d2-1),d2],k=o.join('|');if(!seen.has(k)){seen.add(k);opts.push(o);}}
 chal={W:W2,n:n2,d:d2,ok,opts:opts.slice(0,4).sort(()=>Math.random()-.5),res:''};chalCard();}
function chalCard(){const c=chal;
 card('chal',`<div class="big" style="font-size:24px">🎯 פתרו: ${M(`${C(c.W,'green')} − ${fr(c.n,c.d,'red')} = ?`)}</div>
  <div class="ctl">${c.opts.map((o,i)=>`<button class="lt" id="o${i}" style="font-size:24px">${M(mx(o[0],o[1],o[2]))}</button>`).join('')}</div>
  <div id="chs">${c.res}</div><button class="lt noprint" id="bAll" style="margin-top:8px">הפתרון</button>
  <button class="lt noprint" id="bShow" style="margin-top:8px">🍫 הראו לי בשרטוט</button>`,'chal');
 c.opts.forEach((o,i)=>$('#o'+i).onclick=()=>{const good=o.join('|')===c.ok;
  c.res=good?'<div class="okbox">✅ <b>מצוין!</b> פרטתם שלם אחד והורדתם נכון.</div>':`<div class="badbox">❌ עוד לא. פרטו שלם אחד ל־${M(fr(c.d,c.d))}, ובדקו כמה חלקים נשארו בו: ${M(`${c.d} − ${c.n}`)}</div>`;chalCard();});
 $('#bAll').onclick=()=>{c.res=`<div class="tip">${M(`${c.W} = ${c.W-1>0?(c.W-1)+' + ':''}${fr(c.d,c.d)}`)} ← ${M(`${fr(c.d,c.d)} − ${fr(c.n,c.d)} = ${fr(c.d-c.n,c.d)}`)} ← התשובה ${M(mx(c.W-1,c.d-c.n,c.d))}</div>`;chalCard();};
 $('#bShow').onclick=()=>{if(ST.busy)return;W=c.W;n=c.n;d=c.d;step=0;ST.revealed=false;draw();};}
function start(){svgSize(760,450);
 const st=document.createElement('style');st.textContent='.fr{display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;line-height:1;margin:0 3px;font-size:.8em}.fr .nu{border-bottom:3px solid currentColor;padding:0 4px 2px}.fr .de{padding-top:2px}.mx{display:inline-flex;align-items:center;gap:1px}';document.head.appendChild(st);
 tool('bC','🎯 אתגר לכיתה',newChal,{lt:1});
 tool('bS','➡ צעד הבא',next,{lt:1});
 /* 🔪 סכין: גוררים קו דרך השלם המסומן, ובסוף הגרירה הוא נחתך לעוד חלק */
 let kn=null,swiped=false;
 const canCut=()=>!ST.busy&&(step===0||(step===1&&cut!==d));
 $('#sv').addEventListener('pointerdown',e=>{if(e.target.id==='hd'||!canCut())return;kn={a:svgPt(e)};e.preventDefault();});
 window.addEventListener('pointermove',e=>{if(!kn)return;const b=svgPt(e);kn.b=b;let k=$('#knife');
  if(!k){$('#sv').insertAdjacentHTML('beforeend','<g id="knife" style="pointer-events:none"><line id="kl" stroke="#1f2937" stroke-width="5" stroke-dasharray="10 7" stroke-linecap="round"/><text id="kt" font-size="44" text-anchor="middle">🔪</text></g>');}
  const l=$('#kl');l.setAttribute('x1',kn.a.x);l.setAttribute('y1',kn.a.y);l.setAttribute('x2',b.x);l.setAttribute('y2',b.y);
  const t=$('#kt');t.setAttribute('x',b.x);t.setAttribute('y',b.y+14);});
 window.addEventListener('pointerup',()=>{if(!kn)return;const {a,b}=kn;kn=null;if($('#knife'))$('#knife').remove();if(!b)return;
  const g=geo(W-1),r=shape==='circle'?g.r:shape==='line'?26:H/2,cy=g.cy,cx=g.cx;
  const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy);if(len<r*.9)return;
  const t=Math.max(0,Math.min(1,((cx-a.x)*dx+(cy-a.y)*dy)/(len*len))),dist=Math.hypot(a.x+t*dx-cx,a.y+t*dy-cy);
  if(dist>(shape==='circle'?r*.75:Math.max(r,g.w/2)))return;
  swiped=true;setTimeout(()=>swiped=false,350);
  if(step===0){doCut();addCut();}else addCut();});
 $('#sv').addEventListener('click',e=>{if(swiped)return;const id=e.target.id||'';if(id==='whole')doCut();else if(/^cw\d+$/.test(id))addCut();else if(/^p\d+$/.test(id))takeOne(+id.slice(1));});
 draggable(['hd'],(id,p)=>{const u=shape==='line'?Math.min(140,700/W):Math.min(130,(700-GAP*(W-1))/W)+GAP,k=Math.round((p.x-X0)/u);const w2=Math.max(1,Math.min(MAXW,k));if(w2!==W){W=w2;step=0;ST.revealed=false;draw();}});
 draw();}
