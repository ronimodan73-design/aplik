/*META {"id":"prita","title":"מעבדת הפריטה: שלם פחות שבר","icon":"🍫"} */
const LAB={hide:true,tip:'🖐 קבעו את התרגיל בכפתורי + / − (או גררו את העיגול הצהוב כדי לשנות את מספר השלמים). לחצו "➡ צעד הבא" וגלו יחד עם הכיתה למה פורטים שלם אחד.',refresh:()=>out()};
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
function draw(){const w=BW(),L=W-1;let s='';
 s+=`<text x="380" y="52" text-anchor="middle" font-size="40" font-weight="800" fill="${COL.ink}">${W}  −</text>`+sf(440,44,n,d,COL.red,30)+`<text x="490" y="52" font-size="40" font-weight="800" fill="${COL.ink}">=  ?</text>`;
 for(let i=0;i<W;i++){const last=i===L,x=bx(i);
  if(last&&step>=1){const pw=w/d;
   for(let k=0;k<d;k++){const gone=step>=2&&k>=d-n;
    s+=`<rect id="p${k}" x="${x+k*pw+2}" y="${Y}" width="${pw-4}" height="${H}" rx="6" fill="${gone?COL.red:COL.purple}" fill-opacity="${gone&&step>=3?0.12:0.85}" stroke="${gone?COL.red:COL.purple}" stroke-width="2" ${gone&&step>=3?'stroke-dasharray="6 5"':''} style="transition:all .6s"/>`;
    if(gone&&step>=3)s+=`<line x1="${x+k*pw+8}" y1="${Y+8}" x2="${x+(k+1)*pw-8}" y2="${Y+H-8}" stroke="${COL.red}" stroke-width="4"/>`;}
   s+=sf(x+w/2,Y+H+40,d,d,COL.purple,26);
  }else{s+=`<rect x="${x}" y="${Y}" width="${w}" height="${H}" rx="10" fill="${COL.green}" fill-opacity=".85" stroke="${last&&step===0?COL.gold:COL.green}" stroke-width="${last&&step===0?6:2}"/>`;
   for(let g=1;g<4;g++)s+=`<line x1="${x+g*w/4}" y1="${Y+6}" x2="${x+g*w/4}" y2="${Y+H-6}" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>`;
   s+=`<text x="${x+w/2}" y="${Y+H+40}" text-anchor="middle" font-size="28" font-weight="800" fill="${COL.green}">1</text>`;}}
 const hx=bx(L)+w+14;s+=`<circle id="hd" cx="${Math.min(hx,740)}" cy="${Y+H/2}" r="16" fill="${COL.gold}" stroke="${COL.ink}" stroke-width="3" style="cursor:grab"/>`;
 const msg=[`יש לנו ${wholes(W)}. צריך להוריד ${parts(n,d)}, אבל השלמים לא חתוכים!`,
  `פורטים שלם אחד: חותכים אותו ל־${d} חלקים שווים. שלם אחד = ${d} ${MANY[d]}`,
  `מורידים ${parts(n,d)} (באדום)`,
  L>0?`נשארו ${wholes(L)} ועוד ${parts(d-n,d)}`:`לא נשארו שלמים. נשארו ${parts(d-n,d)}`][step];
 s+=`<text x="380" y="${Y+H+110}" text-anchor="middle" font-size="24" font-weight="700" class="he" fill="${COL.ink}">${msg}</text>`;
 if(step>=3){const A=L>0?`${L}`:'';s+=`<text x="${A?345:380}" y="${Y+H+180}" text-anchor="middle" font-size="44" font-weight="800" fill="${COL.blue}">${A}</text>`+sf(A?395:380,Y+H+170,d-n,d,COL.blue,32);}
 $('#sv').innerHTML=s;out();}
function out(){const H2=hidCls(),L=W-1;
 card('dims',`<div class="ctl"><b class="green">שלמים</b><button class="lt" id="wm">−</button><span class="big green">${W}</span><button class="lt" id="wp">+</button></div>
  <div class="ctl"><b class="red">מונה</b><button class="lt" id="nm">−</button><span class="big red">${n}</span><button class="lt" id="np">+</button></div>
  <div class="ctl"><b class="purple">מכנה</b><button class="lt" id="dm">−</button><span class="big purple">${d}</span><button class="lt" id="dp">+</button></div>
  <div class="ctl"><button id="bNext">➡ צעד הבא</button><button class="lt" id="bRe">🔁 מההתחלה</button><span class="tip">צעד ${step+1} מתוך 4</span></div>`);
 const set=(w2,n2,d2)=>{if(ST.busy)return;d2=Math.max(2,Math.min(10,d2));n2=Math.max(1,Math.min(d2-1,n2));w2=Math.max(1,Math.min(MAXW,w2));
  if(w2!==W||n2!==n||d2!==d){W=w2;n=n2;d=d2;step=0;ST.revealed=false;draw();}};
 $('#wm').onclick=()=>set(W-1,n,d);$('#wp').onclick=()=>set(W+1,n,d);$('#nm').onclick=()=>set(W,n-1,d);$('#np').onclick=()=>set(W,n+1,d);
 $('#dm').onclick=()=>set(W,n,d-1);$('#dp').onclick=()=>set(W,n,d+1);
 $('#bNext').onclick=next;$('#bRe').onclick=()=>{if(!ST.busy){step=0;ST.revealed=false;draw();}};
 let t=`<div class="big">התרגיל: ${M(`${C(W,'green')} − ${fr(n,d,'red')}`)}</div>`;
 if(step>=1)t+=`<div class="big" style="font-size:26px">1. פורטים שלם: ${M(`${C(W,'green')} = ${L>0?C(L,'green')+' + ':''}${fr(d,d,'purple')}`)}</div>`;
 if(step>=2)t+=`<div class="big" style="font-size:26px">2. מחסרים: ${M(`${fr(d,d,'purple')} − ${fr(n,d,'red')} = <span class="${H2}">${fr(d-n,d,'blue')}</span>`)}</div>`;
 if(step>=3)t+=`<div class="big okbox" style="font-size:28px">התשובה: <span class="${H2}">${M(`${C(W,'green')} − ${fr(n,d,'red')} = ${mx(L,d-n,d,'blue')}`)}</span></div>
   <div class="tip">בדיקה: ${M(`${mx(L,d-n,d)} + ${fr(n,d)} = ${W}`)}</div>`;
 if(step>=3&&H2)t+=`<button class="noprint" id="bReveal" style="margin-top:8px">👀 גלו את התשובה</button>`;
 card('out',t);if($('#bReveal'))$('#bReveal').onclick=()=>{ST.revealed=true;out();};
 if(step>=3)card('why',`<div class="big purple" style="font-size:24px">למה פורטים?</div><div>אי אפשר להוריד ${fr(n,d,'red')} משלם שלא חתוך. לכן פורטים <b>שלם אחד</b> ל־${M(fr(d,d,'purple'))}, באותו מכנה כמו השבר שמורידים. את שאר השלמים לא נוגעים.</div><div class="badbox">⚠️ טעות נפוצה: ${M(`${W} − ${fr(n,d)} = ${mx(W-1,n,d)}`)} (מעתיקים את השבר שמורידים). צריך לבדוק כמה חלקים <b>נשארו</b> בשלם שפרטנו: ${M(`${d} − ${n} = ${d-n}`)}</div>`);
 else if($('#why'))$('#why').remove();
 if(chal)chalCard();}
function next(){if(ST.busy)return;if(step>=3){step=0;draw();return;}
 step++;const w=BW(),x=bx(W-1);
 if(step===1){step=0;draw();const g=$('#sv');let cuts='';ST.busy=true;
  seq(d-1,Math.min(2400,(d-1)*380),i=>{cuts+=`<line x1="${x+(i+1)*w/d}" y1="${Y-12}" x2="${x+(i+1)*w/d}" y2="${Y+H+12}" stroke="${COL.ink}" stroke-width="4" stroke-dasharray="7 5"/>`;
    g.insertAdjacentHTML('beforeend',`<line x1="${x+(i+1)*w/d}" y1="${Y-12}" x2="${x+(i+1)*w/d}" y2="${Y+H+12}" stroke="${COL.ink}" stroke-width="4" stroke-dasharray="7 5"/>`);
    g.insertAdjacentHTML('beforeend',`<text x="${x+(i+1)*w/d}" y="${Y-20}" text-anchor="middle" font-size="22">✂️</text>`);},
   ()=>{ST.busy=true;setTimeout(()=>{ST.busy=false;step=1;draw();},500);});return;}
 if(step===2){step=1;draw();ST.busy=true;
  seq(n,Math.max(900,n*450),i=>{const el=$('#p'+(d-1-i));if(el){el.setAttribute('fill',COL.red);el.setAttribute('stroke',COL.red);}},
   ()=>{ST.busy=true;setTimeout(()=>{ST.busy=false;step=2;draw();},400);});return;}
 if(step===3){step=2;draw();ST.busy=true;
  seq(n,Math.max(900,n*400),i=>{const el=$('#p'+(d-1-i));if(el){el.style.transform='translateY(-40px)';el.setAttribute('fill-opacity','.15');}},
   ()=>{ST.busy=true;setTimeout(()=>{ST.busy=false;step=3;draw();},500);});}}
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
 draggable(['hd'],(id,p)=>{const w=Math.min(130,(700-GAP*(W-1))/W),k=Math.round((p.x-X0)/(w+GAP));const w2=Math.max(1,Math.min(MAXW,k));if(w2!==W){W=w2;step=0;ST.revealed=false;draw();}});
 draw();}
