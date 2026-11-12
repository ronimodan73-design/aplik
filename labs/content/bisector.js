/*META {"id":"bisector","title":"מעבדת חוצה הזווית","icon":"📐"} */
const LAB={hide:true,tip:'🖐 קובעים את הזווית בעיגול הצהוב הגדול או בכפתורי + / −. התלמיד גורר את קו הקיפול הסגול (העיגול הקטן בקצה) ולוחץ "📄 קפלו את הדף": כשהזרוע המקופלת נופלת בדיוק על הזרוע השנייה, מצאנו את חוצה הזווית.',refresh:()=>draw()};
const V={x:380,y:385},AR=300,FR=250;
let A=80,f=24,fold=null,chal=null;
const rad=d=>d*Math.PI/180,deg=r=>r*180/Math.PI;
const pt=(phi,r)=>({x:V.x+r*Math.cos(rad(phi)),y:V.y-r*Math.sin(rad(phi))});
const ok=()=>Math.abs(2*f-A)<0.01;
const showV=()=>!(ST.hide&&!ST.revealed);
function wedge(p1,p2,r){const s=pt(p1,r),e=pt(p2,r),lg=Math.abs(p2-p1)>180?1:0,sw=p2>p1?0:1;return `M${V.x},${V.y}L${s.x},${s.y}A${r},${r} 0 ${lg} ${sw} ${e.x},${e.y}Z`;}
function lab(phi,r,txt,col,fs=22){const m=pt(phi,r);return `<text x="${m.x}" y="${m.y+7}" text-anchor="middle" font-size="${fs}" font-weight="800" fill="${col}" paint-order="stroke" stroke="#fff" stroke-width="5">${txt}</text>`;}
function draw(){const v=showV(),pA=pt(0,AR),pC=pt(A,AR),pD=pt(f,FR),good=ok();let s='';
 /* שתי הזוויות שהקיפול יוצר */
 s+=`<path d="${wedge(0,f,70)}" fill="${COL.blue}" fill-opacity=".22" stroke="${COL.blue}" stroke-width="3"/>`;
 s+=`<path d="${wedge(f,A,92)}" fill="${COL.pink}" fill-opacity=".18" stroke="${COL.pink}" stroke-width="3"/>`;
 /* דף מתקפל (אנימציה) */
 if(fold!==null)s+=`<path d="${wedge(f,fold,AR)}" fill="#fde68a" fill-opacity=".55" stroke="${COL.gold}" stroke-width="2"/><line x1="${V.x}" y1="${V.y}" x2="${pt(fold,AR).x}" y2="${pt(fold,AR).y}" stroke="${COL.green}" stroke-width="5" stroke-dasharray="12 7" stroke-linecap="round"/>`;
 s+=`<line x1="${V.x}" y1="${V.y}" x2="${pA.x}" y2="${pA.y}" stroke="${COL.ink}" stroke-width="5" stroke-linecap="round"/><line x1="${V.x}" y1="${V.y}" x2="${pC.x}" y2="${pC.y}" stroke="${COL.ink}" stroke-width="5" stroke-linecap="round"/>`;
 /* קו הקיפול / חוצה הזווית */
 s+=`<line x1="${V.x}" y1="${V.y}" x2="${pD.x}" y2="${pD.y}" stroke="${good?COL.green:COL.purple}" stroke-width="${good?7:5}" stroke-dasharray="${good?'':'14 8'}" stroke-linecap="round"/>`;
 s+=lab(f/2,48+(f<22?30:0),v?f+'°':'?',COL.blue)+lab(f+(A-f)/2,122,v?(A-f)+'°':'?',COL.pink);
 if(good)s+=`<text x="${V.x+(A>120?120:-40)}" y="${V.y-(A>120?250:270)}" text-anchor="middle" font-size="24" font-weight="800" class="he" fill="${COL.green}">✔ חוצה זווית</text>`;
 /* שמות הנקודות */
 const nm=(p,t,dx,dy)=>`<text x="${p.x+dx}" y="${p.y+dy}" text-anchor="middle" font-size="24" font-weight="800" fill="${COL.ink}">${t}</text>`;
 s+=nm(V,'B',-6,34)+nm(pA,'A',20,8)+nm(pC,'C',Math.cos(rad(A))*22,-14)+nm(pD,'D',Math.cos(rad(f))*24+4,-16);
 s+=`<circle id="hC" cx="${pC.x}" cy="${pC.y}" r="18" fill="${COL.gold}" stroke="${COL.ink}" stroke-width="3" style="cursor:grab"/>`;
 s+=`<circle id="hD" cx="${pD.x}" cy="${pD.y}" r="14" fill="${COL.purple}" stroke="#fff" stroke-width="3" style="cursor:grab"/>`;
 const msg=good?'מצאתם את חוצה הזווית! שתי הזוויות שוות':fold!==null?'':`גררו את קו הקיפול הסגול, ואז לחצו "📄 קפלו את הדף"`;
 s+=`<text x="380" y="440" text-anchor="middle" font-size="22" font-weight="700" class="he" fill="${good?COL.green:COL.ink}">${msg}</text>`;
 $('#sv').innerHTML=s;out();}
function out(){const H=hidCls(),good=ok();
 card('dims',`<div class="ctl"><b class="orange">הזווית ∢ABC</b><button class="lt" id="am">−</button><span class="big orange">${A}°</span><button class="lt" id="ap">+</button></div>
  <div class="ctl"><button id="bFold">📄 קפלו את הדף</button><button class="lt" id="bNew">🔁 קיפול חדש</button></div>`);
 const setA=a=>{if(ST.busy)return;a=Math.max(20,Math.min(170,a));if(a!==A){A=a;f=Math.min(Math.round(A*.3),A-4);fold=null;ST.revealed=false;draw();}};
 $('#am').onclick=()=>setA(A-2);$('#ap').onclick=()=>setA(A+2);$('#bFold').onclick=doFold;
 $('#bNew').onclick=()=>{if(!ST.busy){f=Math.max(4,Math.round(A*(Math.random()<.5?.25:.7)));fold=null;ST.revealed=false;draw();}};
 let t=`<div class="big">${M(`∢ABD = <span class="blue ${H}">${f}°</span>`)} &nbsp; ${M(`∢DBC = <span class="pink ${H}">${A-f}°</span>`)}</div>`;
 if(!good)t+=`<div class="tip">${f<A-f?'החלק הכחול קטן יותר':'החלק הכחול גדול יותר'}: ההפרש ${M(`<span class="${H}">${Math.abs(A-2*f)}°</span>`)}. הזיזו את קו הקיפול.</div>`;
 else t+=`<div class="big okbox" style="font-size:26px">${M(`${C(A+'°','orange')} : 2 = <span class="${H}">${C(A/2+'°','green')}</span>`)}</div>
  <div class="tip">בדיקה: ${M(`${A/2}° + ${A/2}° = ${A}°`)}</div>
  <div style="margin-top:6px"><b class="green">חוצה זווית</b> הוא קרן שיוצאת מקודקוד הזווית ומחלקת אותה לשתי זוויות שוות. כאן ${M('BD')} חוצה את ${M('∢ABC')}, ולכן ${M('∢ABD = ∢DBC')}.</div>`;
 if(H&&(good||f))t+=`<button class="noprint" id="bReveal" style="margin-top:8px">👀 גלו את המספרים</button>`;
 card('out',t);if($('#bReveal'))$('#bReveal').onclick=()=>{ST.revealed=true;draw();};
 if(chal)chalCard();}
/* קיפול: הזרוע BA מסתובבת סביב קו הקיפול עד 2·f */
function doFold(){if(ST.busy)return;const end=2*f;fold=0;
 seq(16,1500,i=>{fold=end*(i+1)/16;draw();},()=>{const dlt=2*f-A;
  if(Math.abs(dlt)<0.01){fold=null;draw();return;}
  draw();const m=dlt>0?`הדף המקופל עבר את הזרוע השנייה ב־${dlt}°. הזיזו את קו הקיפול אחורה`:`חסרות ${-dlt}° עד הזרוע השנייה. הזיזו את קו הקיפול קדימה`;
  $('#sv').insertAdjacentHTML('beforeend',`<text x="380" y="440" text-anchor="middle" font-size="22" font-weight="700" class="he" fill="${COL.red}">${m}</text>`);});}
/* אתגר לכיתה */
function newChal(){const t=R(0,2),W=2*R(12,80),h=W/2;let q,ans,opts;
 if(t===0){q=`הזווית ${M('∢ABC = '+W+'°')}. ${M('BD')} חוצה אותה. כמה מעלות ${M('∢ABD')}?`;ans=h;opts=[h,W,2*W,h+10];}
 else if(t===1){q=`${M('BD')} חוצה את ${M('∢ABC')}, ו־${M('∢ABD = '+h+'°')}. כמה מעלות ${M('∢ABC')}?`;ans=W;opts=[W,h,h+2,W+10];}
 else{q=`${M('BD')} חוצה את ${M('∢ABC')}, ו־${M('∢DBC = '+h+'°')}. כמה מעלות ${M('∢ABD')}?`;ans=h;opts=[h,W,180-h,h/2];}
 opts=[...new Set(opts.filter(x=>x>0&&x<360&&Number.isInteger(x)))];while(opts.length<4){const x=ans+2*R(-8,8);if(x>0&&!opts.includes(x))opts.push(x);}
 chal={q,ans,W,opts:opts.slice(0,4).sort(()=>Math.random()-.5),res:''};chalCard();}
function chalCard(){const c=chal;
 card('chal',`<div style="font-size:22px;font-weight:700">🎯 ${c.q}</div><div class="ctl">${c.opts.map((o,i)=>`<button class="lt" id="o${i}" style="font-size:24px">${o}°</button>`).join('')}</div><div>${c.res}</div>
  <button class="lt noprint" id="bShow" style="margin-top:8px">📐 הראו לי בשרטוט</button>`,'chal');
 c.opts.forEach((o,i)=>$('#o'+i).onclick=()=>{c.res=o===c.ans?'<div class="okbox">✅ <b>נכון!</b> חוצה זווית מחלק אותה לשתי זוויות שוות.</div>':`<div class="badbox">❌ עוד לא. חוצה הזווית יוצר שתי זוויות <b>שוות</b>, וביחד הן כל הזווית. ${o===c.W*2||o===c.W/2?'בדקו: האם צריך לחלק ב־2 או לכפול ב־2?':''}</div>`;chalCard();});
 $('#bShow').onclick=()=>{if(ST.busy)return;A=Math.min(170,c.W);f=A/2;fold=null;ST.revealed=true;draw();};}
function start(){svgSize(760,455);
 tool('bC','🎯 אתגר לכיתה',newChal,{lt:1});
 draggable(['hC','hD'],(id,p)=>{let a=deg(Math.atan2(V.y-p.y,p.x-V.x));if(a<-30)a+=360;
  if(id==='hC'){a=Math.max(20,Math.min(170,2*Math.round(a/2)));if(a!==A){A=a;f=Math.min(f,A-4);fold=null;draw();}}
  else{a=Math.max(2,Math.min(A-2,a));if(Math.abs(2*a-A)<3)a=A/2;else a=Math.round(a);if(a!==f){f=a;fold=null;draw();}}});
 draw();}
