// TITLE: ז׳ · ערך מוחלט | שפה אחת לכל המינוסים
// BAR: כיתה ז׳ · מספרים מכוונים · ערך מוחלט | שפה אחת לכל המינוסים
const M='−';
const POS=C.ok, NEG=C.ray2, DST=C.acc, OPP='#c084fc';
const num=v=>(v<0?M+(-v):''+v);
const N=v=>`<span style="color:${v<0?NEG:v>0?POS:C.ink};font-weight:700">${num(v)}</span>`;
const BAR=`<span style="color:${DST};font-weight:900">|</span>`;
const AB=t=>BAR+t+BAR;
const OP=`<span style="color:${OPP};font-weight:900">${M}</span>`;
const NEGT=t=>`<span style="color:${NEG};font-weight:700">${t}</span>`;
const POST=t=>`<span style="color:${POS};font-weight:700">${t}</span>`;
const DT=t=>`<span style="color:${DST};font-weight:700">${t}</span>`;
const PUR=t=>`<span style="color:${OPP};font-weight:700">${t}</span>`;
const W=(n,t)=>`<div class="card what"><b>מה עשינו? שלב ${n}:</b> ${t.replace(/−\d+/g,m=>eq(m))}</div>`;
const P=(e,n,t)=>`<div class="pair step"><div class="eqc">${eq(e)}</div>${W(n,t)}</div>`;
const CSS=`<style>
span[dir=ltr]{white-space:nowrap}
.pair{display:flex;gap:2cqw;align-items:center}.pair .card{padding:.7cqw 1.3cqw;font-size:1.6cqw}
.pair>.eqc{flex:1;font-family:var(--display);font-weight:900;font-size:3.1cqw;color:var(--ink)}.pair>.card{flex:1.3}
.big2{font-family:var(--display);font-weight:900;font-size:4.4cqw;text-align:center}
.slide>svg{width:100%;height:auto;max-height:22cqw;flex-shrink:0}
.huge{font-family:var(--display);font-weight:900;font-size:9cqw;text-align:center;line-height:1}
.draw{stroke-dasharray:var(--L);stroke-dashoffset:var(--L);transition:stroke-dashoffset 1.1s ease-out var(--d,0s)}
.shown .draw,.shown.draw{stroke-dashoffset:0}
.lag{opacity:0;transition:opacity .35s ease-out calc(var(--d,0s) + 1s)}
.shown .lag{opacity:1}
.pop{transform-box:fill-box;transform-origin:center;scale:0;transition:scale .45s cubic-bezier(.3,1.7,.5,1) var(--d,0s)}
.shown .pop{scale:1}
.trig.shown ~ .mv{translate:var(--tx,0) var(--ty,0)}
.mv{transition:translate 1.8s cubic-bezier(.55,0,.35,1)}
.lit{opacity:0;transition:opacity .3s ease-out var(--d,0s)}
.trig.shown ~ .lit{opacity:1}
.fly{transform-box:fill-box;transform-origin:center;transition:translate 1s ease-in,rotate 1s ease-in,opacity 1s ease-in}
.trig.shown ~ .fly{translate:var(--tx) var(--ty);rotate:-35deg;opacity:.0}
.glow{transition:fill .6s ease-out .8s}
.trig.shown ~ .glow{fill:${POS}}
.two{display:grid;grid-template-columns:1fr 1fr;gap:2cqw}
.tbl{border-collapse:collapse;font-size:2.1cqw;width:100%}.tbl td,.tbl th{border:1px solid var(--line);padding:.6cqw 1.2cqw;text-align:center}.tbl th{background:var(--chip);color:var(--accent)}
.tbl td:first-child{font-family:var(--display);font-weight:900;font-size:2.8cqw}
.rule{border:.3cqw solid ${DST};border-radius:1.4cqw;padding:1.1cqw 1.8cqw;font-size:2.1cqw;background:#1a2a14}
.wrong{color:${NEG};text-decoration:line-through;text-decoration-thickness:.25cqw}
.qlist li{font-size:2.15cqw}.qlist .ans{margin-inline-start:1cqw}
</style>`;

/* ---------- number line ---------- */
const NLW=800;
function nlX(v,min,max){return 50+(v-min)/(max-min)*(NLW-100);}
function nlBase(min,max,y,o={}){let g=`<line x1="20" y1="${y}" x2="${NLW-20}" y2="${y}" stroke="${C.ink}" stroke-width="3"/>`;
 g+=`<path d="M${NLW-20} ${y-9}L${NLW-4} ${y}L${NLW-20} ${y+9}z" fill="${C.ink}"/>`;
 for(let v=min;v<=max;v++){const x=nlX(v,min,max),h=v===0?16:10;
  g+=`<line x1="${x}" y1="${y-h}" x2="${x}" y2="${y+h}" stroke="${v===0?DST:C.ink}" stroke-width="${v===0?4:2.5}"/>`;
  if(!o.only||o.only.includes(v))g+=`<text x="${x}" y="${y+46}" font-size="${v===0?30:26}" text-anchor="middle" direction="ltr" style="fill:${v<0?NEG:v>0?POS:C.ink};font-weight:${v===0?900:500}">${num(v)}</text>`;}
 return g;}
function arrowDraw(a,b,min,max,y,col,o={}){const x0=nlX(a,min,max),x1=nlX(b,min,max),L=Math.abs(x1-x0),s=Math.sign(x1-x0)||1;
 const xe=x1-s*14;
 return `<g class="${o.cls??'step'}"><line class="draw" x1="${x0}" y1="${y}" x2="${xe}" y2="${y}" stroke="${col}" stroke-width="8" stroke-linecap="round" style="--L:${L};--d:${o.d||0}s"/>
 <path class="lag" style="--d:${o.d||0}s" d="M${x1-s*22} ${y-14}L${x1+s*2} ${y}L${x1-s*22} ${y+14}z" fill="${col}"/></g>`;}
function countDots(from,to,min,max,y,col,o={}){const s=Math.sign(to-from);let g=`<g class="${o.cls??'step'}">`;let k=0;
 for(let v=from;v!==to;v+=s){k++;const xa=nlX(v,min,max),xb=nlX(v+s,min,max),xm=(xa+xb)/2;
  g+=`<circle class="pop" cx="${xb}" cy="${y}" r="9" fill="${col}" style="--d:${(k*.32).toFixed(2)}s"/>`;
  g+=`<text class="pop" x="${xm}" y="${y-28}" font-size="26" text-anchor="middle" style="fill:${DST};font-weight:700;--d:${(k*.32).toFixed(2)}s">${k}</text>`;}
 return g+`</g>`;}
const pt=(v,min,max,y,col)=>`<circle cx="${nlX(v,min,max)}" cy="${y}" r="11" fill="${col}"/>`;

/* ---------- elevator ---------- */
function elevator(){const fh=50,top=30,y=f=>top+(3-f)*fh;let g='';
 // ground band between floor 0 and -1
 g+=`<rect x="236" y="${y(0)+fh/2-4}" width="328" height="8" fill="#a0784e"/>`;
 g+=`<text x="650" y="${y(0)+fh/2+7}" font-size="20" text-anchor="middle" style="fill:#c8a27a">פני הקרקע</text>`;
 for(let f=3;f>=-3;f--){const yy=y(f);
  g+=`<rect x="240" y="${yy-fh/2+3}" width="320" height="${fh-6}" rx="6" fill="#18304e" stroke="${C.line}"/>`;
  g+=`<text x="210" y="${yy+9}" font-size="26" text-anchor="middle" direction="ltr" style="fill:${f<0?NEG:f>0?POS:C.ink};font-weight:700">${num(f)}</text>`;}
 g+=`<text x="650" y="${y(2)+8}" font-size="22" text-anchor="middle" style="fill:${POS}">קומות למעלה</text>`;
 g+=`<text x="650" y="${y(-2)+8}" font-size="22" text-anchor="middle" style="fill:${NEG}">חניון למטה</text>`;
 g+=`<g class="step trig"></g>`;
 for(let i=1;i<=3;i++){
  g+=`<rect class="lit" x="244" y="${y(i)-fh/2+6}" width="312" height="${fh-12}" rx="5" style="fill:${POS};fill-opacity:.25;--d:${(i*.55).toFixed(2)}s"/>`;
  g+=`<text class="lit" x="530" y="${y(i)+9}" font-size="26" text-anchor="middle" style="fill:${DST};font-weight:900;--d:${(i*.55).toFixed(2)}s">${i}</text>`;
  g+=`<rect class="lit" x="244" y="${y(-i)-fh/2+6}" width="312" height="${fh-12}" rx="5" style="fill:${NEG};fill-opacity:.25;--d:${(i*.55).toFixed(2)}s"/>`;
  g+=`<text class="lit" x="270" y="${y(-i)+9}" font-size="26" text-anchor="middle" style="fill:${DST};font-weight:900;--d:${(i*.55).toFixed(2)}s">${i}</text>`;}
 const car=(x,col,ty)=>`<g class="mv" style="--ty:${ty}px"><rect x="${x}" y="${y(0)-20}" width="64" height="40" rx="6" fill="${col}"/><rect x="${x+8}" y="${y(0)-13}" width="20" height="26" rx="2" fill="#0f1b2d" opacity=".55"/><rect x="${x+36}" y="${y(0)-13}" width="20" height="26" rx="2" fill="#0f1b2d" opacity=".55"/></g>`;
 g+=car(330,POS,-3*fh)+car(410,NEG,3*fh);
 return svg(`170 0 560 ${top+7*fh}`,g);}

/* ---------- thermometers ---------- */
function thermo(){const y=v=>200-v*16;let g='';
 const tube=(x,val,col,name)=>{let s=`<rect x="${x-14}" y="${y(10)-8}" width="28" height="${y(-10)-y(10)+16}" rx="14" fill="#18304e" stroke="${C.line}"/>`;
  for(let v=-10;v<=10;v+=2)s+=`<line x1="${x+16}" y1="${y(v)}" x2="${x+(v===0?34:26)}" y2="${y(v)}" stroke="${v===0?DST:C.muted}" stroke-width="${v===0?3:1.5}"/>`;
  s+=`<text x="${x}" y="${y(-10)+52}" font-size="24" text-anchor="middle" style="font-weight:700">${name}</text>`;
  const h=Math.abs(val)*16,top=val>0?y(val):y(0);
  s+=`<g class="step"><rect x="${x-8}" y="${top}" width="16" height="${h}" rx="6" fill="${col}"/>
   <text x="${x-62}" y="${y(val)+9}" font-size="28" text-anchor="middle" direction="ltr" style="fill:${col};font-weight:900">${val>0?'+':''}${num(val)}°</text></g>`;
  return s;};
 g+=`<line x1="120" y1="${y(0)}" x2="680" y2="${y(0)}" stroke="${DST}" stroke-width="2" stroke-dasharray="8 8"/><text x="400" y="${y(0)-10}" font-size="22" text-anchor="middle" style="fill:${DST}">0°</text>`;
 g+=tube(260,8,POS,'במדבר')+tube(540,-8,NEG,'בחרמון');
 g+=`<g class="step"><path d="M210 ${y(0)}V${y(8)}" stroke="${DST}" stroke-width="5"/><path d="M590 ${y(0)}V${y(-8)}" stroke="${DST}" stroke-width="5"/>
  <text x="170" y="${y(4)+9}" font-size="30" text-anchor="middle" style="fill:${DST};font-weight:900">8</text><text x="630" y="${y(-4)+9}" font-size="30" text-anchor="middle" style="fill:${DST};font-weight:900">8</text></g>`;
 return svg('0 0 800 420',g);}

/* ---------- timeline ---------- */
function timeline(){let g=`<line x1="40" y1="120" x2="760" y2="120" stroke="${C.line}" stroke-width="6" stroke-linecap="round"/>`;
 const ev=(x,yr,t1,t2,col,d)=>`<g class="step"><circle class="pop" cx="${x}" cy="120" r="18" fill="${col}"/>
  <text x="${x}" y="80" font-size="26" text-anchor="middle" style="fill:${col};font-weight:900">${yr}</text>
  <text x="${x}" y="176" font-size="22" text-anchor="middle" style="font-weight:700">${t1}</text>
  <text x="${x}" y="206" font-size="20" text-anchor="middle" style="fill:${C.muted}">${t2}</text></g>`;
 g+=ev(660,'לפני כ־2000 שנה','סין: מקלות חשבון','אדומים לרווח, שחורים לחוב',NEG);
 g+=ev(400,'המאה ה־7','הודו: ברהמגופטה','חוקים ל"רכוש" ול"חוב"',POS);
 g+=ev(140,'1841','גרמניה: וירשטראס','הסימן | | – "הגודל, בלי הכיוון"',DST);
 return svg('0 0 800 240',g);}

/* ---------- split machine: -5 -> direction + distance ---------- */
function splitter(v){const s=v<0;let g='';
 g+=`<rect x="80" y="215" width="270" height="135" rx="16" fill="#18304e" stroke="${NEG}" stroke-width="3"/><text x="215" y="385" font-size="26" text-anchor="middle" style="fill:${NEG};font-weight:700">כיוון</text>`;
 g+=`<rect x="450" y="215" width="270" height="135" rx="16" fill="#18304e" stroke="${DST}" stroke-width="3"/><text x="585" y="385" font-size="26" text-anchor="middle" style="fill:${DST};font-weight:700">מרחק מ־0</text>`;
 g+=`<g class="step trig"></g>`;
 g+=`<text class="mv" x="350" y="120" font-size="90" text-anchor="middle" style="fill:${NEG};font-weight:900;--tx:-135px;--ty:190px">${M}</text>`;
 g+=`<text class="mv" x="440" y="120" font-size="90" text-anchor="middle" style="fill:${C.ink};font-weight:900;--tx:145px;--ty:195px">5</text>`;
 g+=`<text class="lit" x="215" y="338" font-size="22" text-anchor="middle" style="--d:1.9s">שמאלה / למטה</text>`;
 return svg('0 0 800 400',g).replace('<svg ','<svg style="max-height:30cqw" ');}

/* ---------- machine: bars throw the sign away ---------- */
function machine(){let g='';
 g+=`<text x="230" y="150" font-size="130" text-anchor="middle" style="fill:${DST};font-weight:900">|</text>`;
 g+=`<text x="450" y="150" font-size="130" text-anchor="middle" style="fill:${DST};font-weight:900">|</text>`;
 g+=`<g class="step trig"></g>`;
 g+=`<text class="fly" x="300" y="145" font-size="110" text-anchor="middle" style="fill:${NEG};font-weight:900;--tx:-60px;--ty:-150px">${M}</text>`;
 g+=`<text class="glow mv" x="370" y="145" font-size="110" text-anchor="middle" style="fill:${C.ink};font-weight:900;--tx:-30px">5</text>`;
 g+=`<g class="step"><text x="560" y="140" font-size="96" text-anchor="middle" style="font-weight:900">=</text><text class="pop" x="660" y="145" font-size="110" text-anchor="middle" style="fill:${POS};font-weight:900">5</text></g>`;
 g+=`<text class="lit" x="330" y="34" font-size="26" text-anchor="middle" style="fill:${NEG};--d:.9s">הכיוון נזרק</text>`;
 return svg('0 0 800 200',g);}

/* ---------- zero pairs (chips) for (-6)+2 ---------- */
function chips(){let g='';const r=24;
 for(let i=0;i<6;i++){const x=620-i*72;g+=`<g><circle cx="${x}" cy="60" r="${r}" fill="${NEG}"/><text x="${x}" y="70" font-size="30" text-anchor="middle" direction="ltr" style="fill:#0f1b2d;font-weight:900">${M}</text></g>`;}
 g+=`<g class="step trig"></g>`;
 for(let i=0;i<2;i++){const x=620-i*72;g+=`<g><circle cx="${x}" cy="140" r="${r}" fill="${POS}"/><text x="${x}" y="150" font-size="30" text-anchor="middle" style="fill:#0f1b2d;font-weight:900">+</text></g>`;}
 // cover rectangles that fade IN over the zero pairs (makes them vanish)
 for(let i=0;i<2;i++){const x=620-i*72;g+=`<rect class="lit" x="${x-r-6}" y="30" width="${2*r+12}" height="140" style="fill:var(--stage);--d:.4s"/>`;
  g+=`<text class="lit" x="${x}" y="110" font-size="24" text-anchor="middle" style="fill:${DST};--d:.6s">0</text>`;}
 return svg('0 0 800 200',g);}

const L1=-8,L2=8;
const mainSvg=svg('0 50 800 180',
 nlBase(-6,6,170)+pt(-5,-6,6,170,NEG)+pt(5,-6,6,170,POS)+
 arrowDraw(0,-5,-6,6,110,NEG)+countDots(0,-5,-6,6,110,NEG)+
 arrowDraw(0,5,-6,6,110,POS)+countDots(0,5,-6,6,110,POS));

/* ---------- double rotation: -(-3)=3 ---------- */
const SPIN_CSS=`<style>
.spin{transform-box:view-box;transition:rotate 1.6s cubic-bezier(.6,.05,.3,1)}
.t1.shown ~ .spin1{rotate:180deg}
.t2.shown ~ .spin1{rotate:360deg}
.t2.shown ~ .spin2{rotate:180deg}
.l1,.l2{opacity:0;transition:opacity .45s ease-out var(--d,1.4s)}
.t1.shown ~ .l1{opacity:1}
.t2.shown ~ .l2{opacity:1}
.t2.shown ~ .dim1{opacity:.3}
.t2.shown ~ .hide1{opacity:0}
.fly1{transform-box:fill-box;transform-origin:center;transition:translate 1s ease-in,rotate 1s ease-in,opacity 1s ease-in}
.t1.shown ~ .fly1{translate:-40px -140px;rotate:-40deg;opacity:0}
.pulse{transform-box:fill-box;transform-origin:center;transition:scale .5s cubic-bezier(.3,1.7,.5,1)}
.t2.shown ~ .pulse{scale:1.25}
</style>`;
function arrowAt(x0,x1,y,col){return `<line x1="${x0}" y1="${y}" x2="${x1-16}" y2="${y}" stroke="${col}" stroke-width="9" stroke-linecap="round"/><path d="M${x1-26} ${y-15}L${x1} ${y}L${x1-26} ${y+15}z" fill="${col}"/>`;}
function doubleSpin(){const mn=-5,mx=5,Y=190,AY=135,x0=nlX(0,mn,mx),x3=nlX(3,mn,mx),xm3=nlX(-3,mn,mx);let g=nlBase(mn,mx,Y);
 g+=`<circle cx="${x3}" cy="${Y}" r="11" fill="${POS}"/>`;
 g+=`<g class="step t1"></g><g class="step t2"></g><circle cx="${xm3}" cy="${Y}" r="11" fill="${NEG}" class="l1"/>`;
 g+=`<g class="spin spin1" style="transform-origin:${x0}px ${AY}px">${arrowAt(x0,x3,AY,DST)}</g>`;
 g+=`<path class="l1 dim1" style="--d:0s" d="M${x0+40} ${AY-30} A 90 70 0 0 0 ${x0-40} ${AY-30}" fill="none" stroke="${OPP}" stroke-width="4" stroke-dasharray="8 7"/>`;
 g+=`<text class="l1 dim1" x="${xm3}" y="40" font-size="30" text-anchor="middle" direction="ltr" style="fill:${NEG};font-weight:900">${M}3</text>`;
 g+=`<text class="l1 dim1" x="${xm3}" y="74" font-size="22" text-anchor="middle" direction="rtl" style="fill:${OPP}">סיבוב 1: הנגדי של 3</text>`;
 g+=`<text class="l2" x="${x3}" y="40" font-size="30" text-anchor="middle" direction="ltr" style="fill:${POS};font-weight:900">${M}(${M}3) = 3</text>`;
 g+=`<text class="l2" x="${x3}" y="74" font-size="22" text-anchor="middle" direction="rtl" style="fill:${OPP}">סיבוב 2: חזרנו!</text>`;
 return svg('0 0 800 250',g);}
function swallow(){const mn=-5,mx=5,Y=300,AY=250,x0=nlX(0,mn,mx),x3=nlX(3,mn,mx),xm3=nlX(-3,mn,mx);let g='';
 g+=`<g direction="ltr" font-size="96" text-anchor="middle" style="font-weight:900">`;
 g+=`<text x="230" y="120" style="fill:${OPP}">${M}</text><text x="300" y="120" style="fill:${DST}">|</text><text x="470" y="120" style="fill:${DST}">|</text><text x="410" y="120">3</text></g>`;
 g+=nlBase(mn,mx,Y);
 g+=`<g class="step t1"></g><g class="step t2"></g>`;
 g+=`<text class="fly1" x="350" y="120" font-size="96" text-anchor="middle" style="fill:${NEG};font-weight:900">${M}</text>`;
 g+=`<text class="pulse" x="230" y="120" font-size="96" text-anchor="middle" style="fill:${OPP};font-weight:900;opacity:0">${M}</text>`;
 g+=`<text class="l1 hide1" x="640" y="80" font-size="26" text-anchor="middle" direction="rtl" style="fill:${DST};--d:.8s">הקווים בלעו</text><text class="l1 hide1" x="640" y="114" font-size="26" text-anchor="middle" direction="rtl" style="fill:${DST};--d:.8s">את המינוס שבפנים</text>`;
 g+=`<g class="l1 spin spin2" style="--d:.9s;transform-origin:${x0}px ${AY}px">${arrowAt(x0,x3,AY,DST)}</g>`;
 g+=`<text class="l1 dim1" x="${x3}" y="${AY-28}" font-size="26" text-anchor="middle" direction="rtl" style="fill:${DST};--d:1.2s">מרחק 3</text>`;
 g+=`<circle class="l2" cx="${xm3}" cy="${Y}" r="12" fill="${NEG}"/>`;
 g+=`<text class="l2" x="640" y="80" font-size="26" text-anchor="middle" direction="rtl" style="fill:${OPP}">המינוס שבחוץ:</text><text class="l2" x="640" y="114" font-size="26" text-anchor="middle" direction="rtl" style="fill:${OPP}">סיבוב אחד בלבד</text>`;
 g+=`<text class="l2" x="${xm3}" y="${AY-28}" font-size="30" text-anchor="middle" direction="ltr" style="fill:${NEG};font-weight:900">${M}|${M}3| = ${M}3</text>`;
 return svg('0 0 800 360',g).replace('<svg ','<svg style="max-height:28cqw" ');}
function submarine(){const y=d=>80+d*42,ax=170;let g='';
 g+=`<rect x="${ax}" y="${y(0)}" width="600" height="${y(6.4)-y(0)}" fill="#12385c" opacity=".55"/>`;
 g+=`<path d="M${ax} ${y(0)} q25 -14 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" fill="none" stroke="#5ec8ff" stroke-width="4"/>`;
 g+=`<text x="${ax+300}" y="${y(0)-18}" font-size="24" text-anchor="middle" style="fill:#5ec8ff">פני הים · 0</text>`;
 g+=`<line x1="${ax}" y1="${y(0)}" x2="${ax}" y2="${y(6.2)}" stroke="${C.ink}" stroke-width="3"/>`;
 for(let d=0;d<=6;d++){g+=`<line x1="${ax-10}" y1="${y(d)}" x2="${ax+10}" y2="${y(d)}" stroke="${C.ink}" stroke-width="2.5"/><text x="${ax-22}" y="${y(d)+9}" font-size="24" text-anchor="end" direction="ltr" style="fill:${d?NEG:C.ink};font-weight:700">${d?M+d:'0'}</text>`;}
 const sx=330,sy=y(5);
 g+=`<g><ellipse cx="${sx}" cy="${sy}" rx="70" ry="24" fill="#ffd166"/><rect x="${sx-8}" y="${sy-46}" width="34" height="26" rx="6" fill="#ffd166"/><circle cx="${sx-30}" cy="${sy}" r="7" fill="#0f1b2d"/><circle cx="${sx}" cy="${sy}" r="7" fill="#0f1b2d"/><circle cx="${sx+30}" cy="${sy}" r="7" fill="#0f1b2d"/></g>`;
 g+=`<g class="step"><line x1="${sx+100}" y1="${y(0)}" x2="${sx+100}" y2="${y(5)}" stroke="${DST}" stroke-width="6"/><line x1="${sx+86}" y1="${y(0)}" x2="${sx+114}" y2="${y(0)}" stroke="${DST}" stroke-width="5"/><line x1="${sx+86}" y1="${y(5)}" x2="${sx+114}" y2="${y(5)}" stroke="${DST}" stroke-width="5"/>
  <text x="${sx+250}" y="${y(2)}" font-size="30" text-anchor="middle" direction="ltr" style="fill:${DST};font-weight:900">|${M}5| = 5</text>
  <text x="${sx+250}" y="${y(2)+36}" font-size="24" text-anchor="middle" direction="rtl" style="fill:${DST}">המרחק: 5 מטרים</text></g>`;
 g+=`<g class="step"><line x1="${ax+16}" y1="${y(5)}" x2="${sx-80}" y2="${y(5)}" stroke="${OPP}" stroke-width="4" stroke-dasharray="8 6"/><circle cx="${ax}" cy="${y(5)}" r="11" fill="${OPP}"/>
  <text x="${sx+250}" y="${y(4.3)}" font-size="30" text-anchor="middle" direction="ltr" style="fill:${OPP};font-weight:900">${M}|${M}5| = ${M}5</text>
  <text x="${sx+250}" y="${y(4.3)+36}" font-size="24" text-anchor="middle" direction="rtl" style="fill:${OPP}">המיקום: מתחת לפני הים</text></g>`;
 return svg('0 0 800 370',g);}

/* ===== lesson 2: one language for every minus ===== */
const colOf=v=>v<0?NEG:v>0?POS:C.ink;
const PN=v=>`(${v>0?'+':''}${num(v)})`;
const PNc=v=>`<span style="color:${colOf(v)};font-weight:700">${PN(v)}</span>`;
const SUB=`<span style="color:${OPP};font-weight:900"> ${M} </span>`;
const L2CSS=`<style>
.out1{transition:opacity .4s}
.t1.shown ~ .out1{opacity:0}
.mv1{transition:translate 1.2s cubic-bezier(.55,0,.35,1)}
.t1.shown ~ .mv1{translate:var(--tx) var(--ty,0px)}
</style>`;
function walker(a,b,min,max,o={}){const s=a+b,Y=175,y1=118,y2=72;let g=nlBase(min,max,Y,{only:o.only});
 const mid=(p,q)=>(nlX(p,min,max)+nlX(q,min,max))/2;
 g+=`<g class="step">${arrowDraw(0,a,min,max,y1,colOf(a),{cls:''})}<text x="${mid(0,a)}" y="${y1-20}" font-size="26" text-anchor="middle" direction="ltr" style="fill:${colOf(a)};font-weight:900">${PN(a)}</text></g>`;
 g+=`<g class="step"><line x1="${nlX(a,min,max)}" y1="${y1}" x2="${nlX(a,min,max)}" y2="${y2}" stroke="${C.muted}" stroke-width="2" stroke-dasharray="5 5"/>${arrowDraw(a,s,min,max,y2,colOf(b),{cls:''})}<text x="${mid(a,s)}" y="${y2-20}" font-size="26" text-anchor="middle" direction="ltr" style="fill:${colOf(b)};font-weight:900">${PN(b)}</text></g>`;
 g+=`<g class="step"><line x1="${nlX(s,min,max)}" y1="${y2}" x2="${nlX(s,min,max)}" y2="${Y}" stroke="${DST}" stroke-width="2" stroke-dasharray="5 5"/><circle class="pop" cx="${nlX(s,min,max)}" cy="${Y}" r="13" fill="${DST}"/></g>`;
 return svg('0 20 800 205',g);}
function chipsGen(p,n){const r=22,x=i=>660-i*64;let g='';
 for(let i=0;i<p;i++)g+=`<circle cx="${x(i)}" cy="55" r="${r}" fill="${POS}"/><text x="${x(i)}" y="65" font-size="28" text-anchor="middle" style="fill:#0f1b2d;font-weight:900">+</text>`;
 for(let i=0;i<n;i++)g+=`<circle cx="${x(i)}" cy="125" r="${r}" fill="${NEG}"/><text x="${x(i)}" y="135" font-size="28" text-anchor="middle" direction="ltr" style="fill:#0f1b2d;font-weight:900">${M}</text>`;
 g+=`<text x="745" y="64" font-size="22" text-anchor="middle" direction="ltr" style="fill:${POS}">${PN(p)}</text><text x="745" y="134" font-size="22" text-anchor="middle" direction="ltr" style="fill:${NEG}">${PN(-n)}</text>`;
 g+=`<g class="step trig"></g>`;
 for(let i=0;i<Math.min(p,n);i++){g+=`<rect class="lit" x="${x(i)-r-5}" y="26" width="${2*r+10}" height="130" style="fill:var(--stage);--d:${(.15+i*.18).toFixed(2)}s"/><text class="lit" x="${x(i)}" y="98" font-size="24" text-anchor="middle" style="fill:${DST};font-weight:700;--d:${(.25+i*.18).toFixed(2)}s">0</text>`;}
 return svg('0 0 800 170',g);}
/* arrow of b turns around: "the opposite of b" */
function spinOne(b,min,max){const Y=170,AY=118,x0=nlX(0,min,max),xb=nlX(b,min,max);let g=nlBase(min,max,Y);
 g+=`<g class="step t1"></g>`;
 g+=`<g class="spin spin1" style="transform-origin:${x0}px ${AY}px">${arrowAt(x0,xb,AY,colOf(b))}</g>`;
 g+=`<text class="out1" x="${xb}" y="${AY-28}" font-size="28" text-anchor="middle" direction="ltr" style="fill:${colOf(b)};font-weight:900">${PN(b)}</text>`;
 g+=`<text class="l1" x="${nlX(-b,min,max)}" y="${AY-28}" font-size="28" text-anchor="middle" direction="ltr" style="fill:${colOf(-b)};font-weight:900">${PN(-b)}</text>`;
 g+=`<text class="l1" x="${x0}" y="42" font-size="24" text-anchor="middle" direction="rtl" style="fill:${OPP}">המינוס הפך את הכיוון: הנגדי של ${b<0?'⁦'+num(b)+'⁩':b}</text>`;
 return svg('0 15 800 205',g);}
function threeMinus(){let g='';const cols=[[650,'7 − 3','פחות'],[400,'−3','מינוס 3'],[150,'−x','?']];
 g+=`<g class="step t1"></g><g class="step t2"></g>`;
 cols.forEach(([x,e,l],i)=>{g+=`<text x="${x}" y="90" font-size="64" text-anchor="middle" direction="ltr" style="font-weight:900;fill:${C.ink}">${e.replace('−',`<tspan style="fill:${OPP}">−</tspan>`)}</text>`;
  g+=`<text class="out1" x="${x}" y="150" font-size="28" text-anchor="middle" style="fill:${C.muted}">${l}</text>`;
  g+=`<text class="l1" x="${x}" y="150" font-size="28" text-anchor="middle" style="fill:${OPP};font-weight:700;--d:${(.3+i*.35).toFixed(2)}s">הנגדי של</text>`;});
 const tr=[[650,'7 + (−3)'],[400,'הנגדי של 3'],[150,'הנגדי של x']];
 tr.forEach(([x,t],i)=>g+=`<text class="l2" x="${x}" y="200" font-size="26" text-anchor="middle" direction="${i?'rtl':'ltr'}" style="fill:${DST};--d:${(.2+i*.3).toFixed(2)}s">${t}</text>`);
 return svg('0 20 800 200',g);}
function boxSub(){let g='';const mn=-5,mx=5,Y=280,AY=230,x0=nlX(0,mn,mx);
 g+=`<text x="300" y="110" font-size="96" text-anchor="middle" style="fill:${OPP};font-weight:900">${M}</text>`;
 g+=`<rect x="345" y="35" width="170" height="100" rx="14" fill="none" stroke="${C.ink}" stroke-width="4" stroke-dasharray="10 8"/>`;
 g+=`<text x="680" y="42" font-size="32" text-anchor="middle" direction="rtl" style="fill:${C.ink};font-weight:700">מציבים: x =</text>`;
 g+=nlBase(mn,mx,Y);
 g+=`<g class="step t1"></g><g class="step t2"></g>`;
 g+=`<text class="out1" x="430" y="105" font-size="56" text-anchor="middle" style="fill:${C.muted};font-style:italic">x</text>`;
 g+=`<text class="mv1" x="680" y="110" font-size="64" text-anchor="middle" direction="ltr" style="fill:${NEG};font-weight:900;--tx:-250px">(${M}3)</text>`;
 g+=`<g class="l1 spin spin2" style="--d:1.1s;transform-origin:${x0}px ${AY}px">${arrowAt(x0,nlX(-3,mn,mx),AY,NEG)}</g>`;
 g+=`<text class="l2" x="${nlX(3,mn,mx)}" y="${AY-30}" font-size="30" text-anchor="middle" direction="ltr" style="fill:${POS};font-weight:900;--d:1.4s">−(−3) = 3</text>`;
 return svg('0 0 800 340',g).replace('<svg ','<svg style="max-height:28cqw" ');}

const SEC=(n,t,sub)=>({html:`<div class="cover row"><div class="col"><div class="num" style="font-size:9cqw">נושא ${n}</div><h1>${t}</h1><p class="muted">${sub}</p></div></div>`});
const LVL=(topic,qs)=>({html:CSS+`<div class="eyebrow">${topic} · שאלות בכל רמות החשיבה</div><h2>עכשיו אתם: מ־${stars(1)} עד ${stars(4)}</h2>
<ol class="qlist" style="gap:1.8cqw">${qs.map((q,i)=>`<li style="font-size:2.45cqw"><b style="color:${C.acc}">${stars(i+1)} ${['ידע','יישום','הבנה ונימוק','חשיבה מסדר גבוה'][i]}:</b> ${q[0]} <span class="ans step">${q[1]}</span></li>`).join('')}</ol>`});

const SLIDES=[
menu('כיתה ז׳ · מספרים מכוונים',[{id:'l1',n:1,t:'ערך מוחלט – המרחק מ־0',d:'שיעור 1'},{id:'l2',n:2,t:'שפה אחת לכל המינוסים',d:'שיעור 2 · חיבור, חיסור, סוגריים, הצבה'}]),
cover('l1',1,'ערך מוחלט','כיתה ז׳ · מספרים מכוונים','ערך מוחלט עונה על השאלה "כמה רחוק מ־0?" ולא על "לאיזה כיוון?"'),

{html:CSS+`<div class="eyebrow">כרטיס כניסה · 5 דקות</div><h2>נזכרים במספרים מכוונים</h2>
<ol class="qlist">
<li>סמנו על ציר המספרים את ${eq(N(-4))} ואת ${eq(N(4))}. כמה צעדים כל אחד מ־0? <span class="ans step">שניהם 4 צעדים</span></li>
<li>מהו המספר הנגדי של ${eq(N(-6))}? <span class="ans step">${eq('6')}</span></li>
<li>איזה מספר גדול יותר: ${eq(N(-7))} או ${eq(N(-2))}? <span class="ans step">${eq(N(-2))}, כי הוא ימינה יותר על הציר</span></li>
<li>${eq('('+N(-3)+') + 3 =')} <span class="ans step">${eq('0')} – זוג אפס</span></li>
</ol>`},

{html:CSS+`<div class="eyebrow">נזכרים · מספרים נגדיים</div><h2>חץ מ־0 אל 3 מסתובב חצי סיבוב</h2>
${svg('0 0 800 230',nlBase(-5,5,150)+`<g class="rot" data-rot="rotate(180deg)" style="transform-origin:${nlX(0,-5,5)}px 150px"><line x1="${nlX(0,-5,5)}" y1="150" x2="${nlX(3,-5,5)-16}" y2="150" stroke="${DST}" stroke-width="8" stroke-linecap="round"/><path d="M${nlX(3,-5,5)-24} 136L${nlX(3,-5,5)} 150L${nlX(3,-5,5)-24} 164z" fill="${DST}"/></g>
<text class="step" x="${nlX(0,-5,5)}" y="70" font-size="28" text-anchor="middle" style="fill:${DST};font-weight:700">סיבוב 180° סביב 0</text>`)}
<p class="step">${eq('3')} ו־${eq(N(-3))} הם <b>מספרים נגדיים</b>: הם נמצאים <b>באותו מרחק</b> מ־0, אבל <b>בצדדים שונים</b>.</p>
<p class="step">${eq('3 + ('+N(-3)+') = 0')}</p>`},

{html:CSS+`<div class="eyebrow">למה יש מינוס בכלל?</div><h2>מספר מכוון מספר לנו שני דברים בבת אחת</h2>
<p class="huge" dir="ltr"><span style="color:${NEG}">${M}</span>3</p>
<div class="two">
<div class="card step" style="border-color:${NEG}"><b style="color:${NEG}">הסימן אומר לאיזה כיוון</b><br>מעל או מתחת ל־0, רווח או חוב, למעלה או למטה</div>
<div class="card step" style="border-color:${DST}"><b style="color:${DST}">המספר אומר כמה</b><br>כמה צעדים, כמה קומות, כמה מעלות</div>
</div>
<p class="step big2">${eq(N(-3))} במעלית = "3 קומות, ${NEGT('למטה')}"</p>`},

{html:CSS+`<div class="eyebrow">למה צריך את זה?</div><h2>שתי מעליות יוצאות מקומה 0. מי נסעה יותר?</h2>
<div class="row"><div class="vis" style="flex:1.4">${elevator()}</div>
<div class="col">
<p class="step">${POST('הירוקה')} עלתה לקומה ${eq(N(3))}</p>
<p class="step">${NEGT('האדומה')} ירדה לקומה ${eq(N(-3))}</p>
<p class="step" style="font-size:2.6cqw;font-weight:900;color:${DST}">שתיהן נסעו 3 קומות!</p>
<p class="step">הסימן אמר <b>לאן</b>. המספר אמר <b>כמה</b>.</p>
</div></div>`},

{html:CSS+`<div class="eyebrow">לפעמים הכיוון לא מעניין אותנו</div><h2>במדבר +8°, בחרמון ${eq(N(-8))}°. איפה רחוק יותר מ־0°?</h2>
<div class="row"><div class="vis" style="flex:1.3">${thermo()}</div>
<div class="col">
<p class="step">בשני המקומות: ${DT('8 מעלות')} מ־0°.</p>
<div class="card step"><b>בבנק:</b> חוב של ${eq(N(-500))} ₪.<br>"כמה כסף אני חייבת?" ← ${DT('500 ₪')}</div>
<p class="step">שאלה על <b>הגודל בלבד</b>, בלי הכיוון.</p>
</div></div>`},

{html:CSS+`<div class="eyebrow">איך זה נולד?</div><h2>אנשים הבינו מזמן: כמות לחוד, כיוון לחוד</h2>
${timeline()}
<p class="step">"<b>מוחלט</b>" = <b>משוחרר מהכיוון</b>. מה שנשאר הוא <b>המרחק מ־0</b>.</p>`},

{html:CSS+`<div class="eyebrow">המשפט של היום</div><h2>כל מספר מכוון = כיוון + מרחק</h2>
${splitter(-5)}
<p class="step big2">הסימן הוא ${NEGT('הכיוון')}. הערך המוחלט הוא ${DT('המרחק')}.</p>`},

{html:CSS+`<div class="eyebrow">היום נדע…</div><h2>המטרות שלנו</h2>
<ul>
<li class="step">היום נדע מה זה <b>ערך מוחלט</b>: כמה רחוק מספר מ־0.</li>
<li class="step">היום נדע לחשב ערך מוחלט, גם כשבתוך הקווים יש <b>תרגיל חיבור</b>.</li>
<li class="step">היום נדע להבדיל בין ${eq(AB(N(-3)))} לבין ${eq(OP+AB('3'))}.</li>
</ul>`},

{html:CSS+`<div class="eyebrow">מה עושים היום בכיתה?</div><h2>מסלול השיעור</h2>
<ol>
<li>כרטיס כניסה ותזכורת: מספרים נגדיים</li>
<li>למה צריך ערך מוחלט? מעליות, טמפרטורות, בנק</li>
<li>הרעיון המרכזי: מרחק על ציר המספרים</li>
<li>שתי טעויות שכדאי להכיר</li>
<li>4 דוגמאות פתורות ${stars(1)} עד ${stars(4)}</li>
<li>תרגול בכיתה וכרטיס יציאה</li>
</ol>`},

{html:CSS+`<div class="eyebrow">הרעיון המרכזי</div><h2>ערך מוחלט = המרחק של מספר מ־0</h2>
${mainSvg}
<p class="step big2">${eq(AB(N(-5))+' = 5')} &nbsp; וגם &nbsp; ${eq(AB(N(5))+' = 5')}</p>
<div class="rule step">הערך המוחלט של מספר הוא <b>המרחק שלו מ־0</b> על ציר המספרים. כותבים אותו בין שני קווים: ${eq(AB('a'))}</div>`},

{html:CSS+`<div class="eyebrow">מה הקווים עושים?</div><h2>הקווים זורקים את הכיוון ושומרים את הגודל</h2>
${machine()}
<p class="step">קוראים: "הערך המוחלט של מינוס 5".</p>
<p class="step">ומה עם ${eq(AB('5'))}? אין כיוון שלילי לזרוק, ולכן ${eq(AB('5')+' = 5')}. וגם ${eq(AB('0')+' = 0')}.</p>`},

{html:CSS+`<div class="eyebrow">שלושה דברים שתמיד נכונים</div><h2>מרחק לא יכול להיות שלילי</h2>
<ol>
<li class="step">הערך המוחלט של מספר הוא <b>תמיד חיובי או 0</b>. אין מרחק שלילי.</li>
<li class="step">לשני <b>מספרים נגדיים</b> יש אותו ערך מוחלט: ${eq(AB(N(7))+' = '+AB(N(-7))+' = 7')}</li>
<li class="step">רק למספר 0 יש ערך מוחלט 0: ${eq(AB('0')+' = 0')}</li>
</ol>`},

{html:CSS+`<div class="eyebrow">טעות נפוצה 1</div><h2>"ערך מוחלט = מוחקים את המינוס"?</h2>
<p class="big2">${eq(AB('('+N(-5)+') + 2'))}</p>
<p class="step big2"><span class="wrong">${eq('5 + 2 = 7')}</span> <span style="color:${NEG}">✗</span></p>
${P('('+N(-5)+') + 2 = '+N(-3),1,'קודם מחשבים <b>בתוך</b> הקווים, כמו בסוגריים.')}
${P(AB(N(-3))+' = 3',2,'רק עכשיו ערך מוחלט: המרחק של −3 מ־0.')}
<div class="rule step">הקווים הם כמו סוגריים: <b>קודם מחשבים בפנים</b>, ורק בסוף לוקחים את המרחק.</div>`},

{html:CSS+`<div class="eyebrow">טעות נפוצה 2 · המינוס שבחוץ</div><h2>קוראים כל ביטוי בקול</h2>
<table class="tbl">
<tr><th>הביטוי</th><th>קוראים</th><th>הערך</th></tr>
<tr class="step"><td>${eq(AB('3'))}</td><td>הערך המוחלט של 3</td><td class="ans">${eq('3')}</td></tr>
<tr class="step"><td>${eq(AB(N(-3)))}</td><td>הערך המוחלט של מינוס 3</td><td class="ans">${eq('3')}</td></tr>
<tr class="step"><td>${eq(OP+AB('3'))}</td><td>${PUR('הנגדי של')} הערך המוחלט של 3</td><td>${eq(N(-3))}</td></tr>
<tr class="step"><td>${eq(OP+AB(N(-3)))}</td><td>${PUR('הנגדי של')} הערך המוחלט של מינוס 3</td><td>${eq(N(-3))}</td></tr>
</table>
<p class="step">${PUR('המינוס שבחוץ')} פועל <b>אחרי</b> הקווים. קודם המרחק, ואחר כך הנגדי.</p>`},
{html:CSS+SPIN_CSS+`<div class="eyebrow">למה מינוס מינוס זה פלוס?</div><h2>כל מינוס = "הנגדי של" = חצי סיבוב סביב 0</h2>
${doubleSpin()}
<div class="rule step">שני סיבובים מחזירים למקום. לכן ${eq(OP+'('+N(-3)+') = 3')}: הנגדי של הנגדי.</div>`},

{html:CSS+SPIN_CSS+`<div class="eyebrow">ולמה ${eq(OP+AB(N(-3)))} לא יוצא פלוס?</div><h2>הקווים בולעים את המינוס שבפנים</h2>
${swallow()}
<div class="rule step">שני המינוסים לא נפגשים: קודם הקווים, ואז נשאר מינוס <b>אחד</b>.</div>`},

{html:CSS+`<div class="eyebrow">למה בכלל לשים מינוס לפני ערך מוחלט?</div><h2>צוללת ירדה 5 מטרים</h2>
${submarine()}
<p class="step">הערך המוחלט נותן ${DT('מרחק')}. המינוס שבחוץ ${PUR('מחזיר כיוון')}: למטה.</p>`},


{html:CSS+`<div class="lvl">${stars(1)} ידע</div><h2>חשבו: ${eq(AB(N(-7)))}</h2>
${svg('0 0 800 170',nlBase(-8,1,120)+pt(-7,-8,1,120,NEG)+arrowDraw(0,-7,-8,1,70,NEG,{cls:'step'})+countDots(0,-7,-8,1,70,NEG,{cls:'step'}))}
${P(AB(N(-7)),1,'קוראים: "הערך המוחלט של מינוס 7". שואלים: כמה רחוק −7 מ־0?')}
${P('7 צעדים',2,'סופרים את הצעדים מ־0 עד −7 על הציר.')}
${P(AB(N(-7))+' = 7',3,'המרחק הוא 7. מרחק תמיד חיובי.')}`},

{html:CSS+`<div class="lvl">${stars(2)} יישום</div><h2>חשבו: ${eq(AB('('+N(-6)+') + 2'))}</h2>
${chips()}
${P('('+N(-6)+') + 2 = '+N(-4),1,'קודם בתוך הקווים: 2 זוגות אפס נעלמים, נשארים 4 אדומים.')}
${P(AB(N(-4))+' = 4',2,'עכשיו ערך מוחלט: המרחק של −4 מ־0 הוא 4.')}
<p class="step">שימו לב: התשובה היא ${eq('4')}, ולא <span class="wrong">${eq('6 + 2 = 8')}</span>.</p>`},

{html:CSS+`<div class="lvl">${stars(3)} הבנה ונימוק · ניתוח טעות</div><h2>דניאל כתב: ${eq(OP+AB(N(-8))+' = 8')}. איפה הטעות?</h2>
${P(AB(N(-8))+' = 8',1,'קודם מה שבתוך הקווים: המרחק של −8 מ־0 הוא 8.')}
${P(OP+AB(N(-8))+' = '+N(-8),2,'המינוס <b>שבחוץ</b> הוא "הנגדי של". הנגדי של 8 הוא −8.')}
<div class="rule step">הטעות של דניאל: הוא חשב "מינוס ומינוס זה פלוס". אבל הקווים כבר "בלעו" את המינוס שבפנים, ונשאר רק מינוס אחד: ${PUR('הנגדי של 8')}.</div>`},

{html:CSS+`<div class="lvl">${stars(4)} חשיבה מסדר גבוה</div><h2>מצאו את <u>כל</u> המספרים שהמרחק שלהם מ־0 הוא 4</h2>
${svg('0 0 800 180',nlBase(-6,6,130)+arrowDraw(0,4,-6,6,80,POS,{cls:'step'})+arrowDraw(0,-4,-6,6,80,NEG,{cls:'step'}))}
${P(AB('4')+' = 4',1,'הולכים 4 צעדים ימינה מ־0.')}
${P(AB(N(-4))+' = 4',2,'אפשר ללכת 4 צעדים גם שמאלה! יש שני מספרים כאלה, והם נגדיים.')}
${P(BAR+'?'+BAR+' = '+N(-2),3,'ויש מספר שהערך המוחלט שלו −2? <b>אין!</b> מרחק לא יכול להיות שלילי.')}`},

{html:CSS+`<div class="eyebrow">תרגול בכיתה · חלק א׳</div><h2>חשבו</h2>
<div class="two"><ol class="qlist">
<li>${stars(1)} ${eq(AB(N(-9))+' =')} <span class="ans step">${eq('9')}</span></li>
<li>${stars(1)} ${eq(AB('12')+' =')} <span class="ans step">${eq('12')}</span></li>
<li>${stars(1)} ${eq(AB('0')+' =')} <span class="ans step">${eq('0')}</span></li>
<li>${stars(2)} ${eq(AB('('+N(-3)+') + ('+N(-4)+')')+' =')} <span class="ans step">${eq('7')}</span></li>
</ol><ol class="qlist" start="5">
<li>${stars(2)} ${eq(AB('('+N(-10)+') + 4')+' =')} <span class="ans step">${eq('6')}</span></li>
<li>${stars(2)} ${eq(AB(N(-5))+' + '+AB('3')+' =')} <span class="ans step">${eq('8')}</span></li>
<li>${stars(2)} ${eq(OP+AB('6')+' =')} <span class="ans step">${eq(N(-6))}</span></li>
<li>${stars(2)} ${eq(OP+AB(N(-1))+' =')} <span class="ans step">${eq(N(-1))}</span></li>
</ol></div>`},

{html:CSS+`<div class="eyebrow">תרגול בכיתה · חלק ב׳</div><h2>חושבים ומנמקים</h2>
<ol class="qlist">
<li>${stars(3)} השלימו סימן גדול, קטן או שווה: &nbsp; ${eq(AB(N(-6))+' &nbsp;☐&nbsp; '+AB('4'))} <span class="ans step">${eq(AB(N(-6))+' &gt; '+AB('4'))}, כי 6 גדול מ־4</span></li>
<li>${stars(3)} השלימו סימן גדול, קטן או שווה: &nbsp; ${eq(OP+AB(N(-2))+' &nbsp;☐&nbsp; '+AB(N(-2)))} <span class="ans step">${eq(OP+AB(N(-2))+' &lt; '+AB(N(-2)))}, כי ${eq(N(-2))} קטן מ־2</span></li>
<li>${stars(3)} נכון או לא נכון? "הערך המוחלט של מספר תמיד גדול מהמספר." <span class="ans step">לא נכון: ${eq(AB('5')+' = 5')}, שווה ולא גדול</span></li>
<li>${stars(4)} מצאו את כל המספרים שהערך המוחלט שלהם 9. <span class="ans step">${eq('9')} ו־${eq(N(-9))}</span></li>
<li>${stars(4)} <b>אוריינות:</b> צוללת בעומק ${eq(N(-5))} מטרים, וציפור בגובה 3 מטרים. מי רחוקה יותר מפני הים? נמקו. <span class="ans step">הצוללת: ${eq(AB(N(-5))+' = 5')}, ו־5 גדול מ־3</span></li>
</ol>`},

{html:CSS+`<div class="eyebrow">כרטיס יציאה</div><h2>שלוש שאלות, בלי עזרה</h2>
<ol class="qlist">
<li>${eq(AB(N(-11))+' =')} <span class="ans step">${eq('11')}</span></li>
<li>${eq(AB('('+N(-8)+') + 3')+' =')} <span class="ans step">${eq('5')}</span></li>
<li>נועה כתבה: ${eq(OP+AB(N(-4))+' = 4')}. האם צדקה? נמקו. <span class="ans step">לא. ${eq(AB(N(-4))+' = 4')}, והנגדי של 4 הוא ${eq(N(-4))}.</span></li>
</ol>`},

{html:CSS+`<div class="eyebrow">שיעורי בית</div><h2>חשבו ונמקו</h2>
<div class="two"><ol class="qlist">
<li>${eq(AB(N(-15))+' =')}</li>
<li>${eq(AB('7')+' =')}</li>
<li>${eq(AB('('+N(-2)+') + ('+N(-6)+')')+' =')}</li>
<li>${eq(AB('('+N(-9)+') + 5')+' =')}</li>
<li>${eq(AB(N(-3))+' + '+AB(N(-4))+' =')}</li>
<li>${eq(OP+AB('6')+' =')}</li>
</ol><ol class="qlist" start="7">
<li>${eq(OP+AB(N(-10))+' =')}</li>
<li>סדרו מהקטן לגדול: ${eq(AB(N(-5))+',  '+N(-3)+',  '+AB('2')+',  0')}</li>
<li>מצאו את כל המספרים שהמרחק שלהם מ־0 הוא 12.</li>
<li>הסבירו במילים: למה אין מספר שהערך המוחלט שלו ${eq(N(-1))}?</li>
</ol></div>`},

{html:CSS+`<div class="eyebrow">מה לקחנו מהשיעור?</div><h2>הכלל</h2>
<div class="rule">כל מספר מכוון = ${NEGT('כיוון')} + ${DT('מרחק')}.<br>הערך המוחלט ${eq(AB('a'))} הוא <b>המרחק של a מ־0</b>, ולכן הוא תמיד חיובי או 0.</div>
<ul>
<li class="step">בתוך הקווים יש תרגיל? <b>קודם מחשבים בפנים.</b></li>
<li class="step">מינוס <b>מחוץ</b> לקווים? זה ${PUR('"הנגדי של"')}, והוא פועל בסוף.</li>
</ul>`},
cover('l2',2,'שפה אחת לכל המינוסים','כיתה ז׳ · חיבור, חיסור, סוגריים, ערך מוחלט והצבה','שני משפטים במקום כל החוקים: "כל מינוס = הנגדי של" · "קודם מה שבפנים"'),

{html:CSS+`<div class="eyebrow">כרטיס כניסה · 5 דקות</div><h2>נזכרים</h2>
<ol class="qlist">
<li>מהו הנגדי של ${eq(N(6))}? ומהו הנגדי של ${eq(N(-6))}? <span class="ans step">${eq(N(-6))} ו־${eq('6')}</span></li>
<li>${eq(AB(N(-9))+' =')} <span class="ans step">${eq('9')}</span></li>
<li>${eq(PNc(4)+' + '+PNc(-4)+' =')} <span class="ans step">${eq('0')} – זוג אפס</span></li>
<li>${eq(PNc(-2)+' + '+PNc(-3)+' =')} <span class="ans step">${eq(PNc(-5))}</span></li>
</ol>`},

{html:CSS+`<div class="eyebrow">היום נדע…</div><h2>המטרות שלנו</h2>
<ul>
<li class="step">היום נדע לקרוא <b>כל מינוס</b> באותה דרך: "הנגדי של".</li>
<li class="step">היום נדע לחבר ולחסר מספרים מכוונים, ולפתוח מינוס לפני סוגריים.</li>
<li class="step">היום נדע להציב מספר שלילי בתוך ביטוי, בלי להתבלבל.</li>
</ul>`},

{html:CSS+L2CSS+SPIN_CSS+`<div class="eyebrow">למה מתבלבלים?</div><h2>למינוס יש שלושה שמות. בעצם יש לו רק אחד</h2>
${threeMinus()}
<p class="step">בכל מקום שיש מינוס, קוראים: ${PUR('"הנגדי של"')}.</p>`},

{html:CSS+`<div class="eyebrow">השפה שלנו · מכאן ועד כיתה ט׳</div><h2>שני משפטים במקום כל החוקים</h2>
<div class="rule step" style="font-size:2.8cqw">1. כל מינוס = ${PUR('הנגדי של')}</div>
<div class="rule step" style="font-size:2.8cqw">2. ${DT('קודם מה שבפנים')}: סוגריים וקווי ערך מוחלט</div>
<div class="card step"><b>השגרה:</b> קוראים בקול ← מתרגמים לחיבור ← רק אז מחשבים.</div>`},

{html:CSS+SPIN_CSS+`<div class="eyebrow">מינוס מינוס</div><h2>הנגדי של הנגדי = חוזרים לעצמנו</h2>
${doubleSpin()}
${P('3 → '+N(-3)+' → 3',1,'פעם אחת הנגדי: עוברים לצד השני. פעם שנייה: חוזרים בדיוק למקום.')}
${P(OP+'('+N(-7)+') = 7',2,'הנגדי של הנגדי של 7 הוא 7 עצמו.')}
${P(OP+'('+OP+'x) = x',3,'זה נכון לכל מספר: הנגדי של הנגדי של x הוא x.')}`},

SEC(1,'חיבור מספרים מכוונים','אותו כיוון · כיוונים הפוכים'),
{html:CSS+`<div class="eyebrow">1 · חיבור · אותו כיוון</div><h2>חיבור = הולכים צעד אחרי צעד</h2>
${walker(-4,-3,-9,1)}
${P(PNc(-4)+' + '+PNc(-3),1,'שני הצעדים שמאלה: 4 ועוד 3.')}
${P(PNc(-4)+' + '+PNc(-3)+' = '+PNc(-7),2,'אותו כיוון: המרחקים מתחברים, והכיוון נשאר.')}`},

{html:CSS+`<div class="eyebrow">1 · חיבור · כיוונים הפוכים</div><h2>ירוק ואדום נפגשים: זוג אפס נעלם</h2>
${chipsGen(6,4)}
${P(PNc(6)+' + '+PNc(-4),1,'4 זוגות אפס נעלמים.')}
${P(PNc(6)+' + '+PNc(-4)+' = '+PNc(2),2,'נשארו 2 ירוקים. מנצח מי שרחוק יותר מ־0.')}`},

LVL('נושא 1 · חיבור',[
[`${eq(PNc(-6)+' + '+PNc(-9)+' =')}`,`${eq(PNc(-15))}`],
[`${eq(PNc(8)+' + '+PNc(-13)+' =')}`,`${eq(PNc(-5))}`],
[`בלי לחשב: ${eq(PNc(-47)+' + '+PNc(29))} חיובי או שלילי? נמקו.`,`שלילי, כי ${eq(AB(N(-47)))} גדול מ־${eq(AB('29'))}`],
[`בבוקר ${eq(N(-4))}°, ועד הצהריים הטמפרטורה עלתה ב־9°. כתבו תרגיל וחשבו.`,`${eq(PNc(-4)+' + '+PNc(9)+' = '+PNc(5))}°`]]),
SEC(2,'חיסור מספרים מכוונים','פחות = ועוד הנגדי · מינוס מינוס'),
{html:CSS+L2CSS+SPIN_CSS+`<div class="eyebrow">2 · חיסור</div><h2>"פחות" = ועוד ${PUR('הנגדי של')}</h2>
${spinOne(2,-5,7)}
${P('5'+SUB+'2',1,'קוראים: "5 ועוד הנגדי של 2".')}
${P('5 + '+PNc(-2)+' = 3',2,'עכשיו זה חיבור רגיל: 5 ימינה, 2 שמאלה.')}`},

{html:CSS+L2CSS+SPIN_CSS+`<div class="eyebrow">2 · חיסור של מספר שלילי</div><h2>${eq('5'+SUB+PNc(-2))}: הנגדי של הנגדי</h2>
${spinOne(-2,-5,9)}
${P('5'+SUB+PNc(-2),1,'קוראים: "5 ועוד הנגדי של מינוס 2".')}
${P('5 + '+PNc(2)+' = 7',2,'הנגדי של −2 הוא 2. שני מינוסים, שני סיבובים: חזרנו לפלוס.')}`},

{html:CSS+`<div class="eyebrow">2 · זהירות!</div><h2>${eq(PNc(-3)+SUB+'5')}: כאן אין "מינוס מינוס"</h2>
${walker(-3,-5,-10,1)}
${P(PNc(-3)+' + '+PNc(-5),1,'מתרגמים: ועוד הנגדי של 5.')}
${P(PNc(-3)+' + '+PNc(-5)+' = '+PNc(-8),2,'אותו כיוון: שני חובות. התוצאה שלילית!')}
<div class="rule step">מינוס הופך לפלוס <b>רק כשהוא פועל על מינוס</b>, כלומר הנגדי של הנגדי.</div>`},

LVL('נושא 2 · חיסור',[
[`${eq('3'+SUB+'8 =')}`,`${eq('3 + '+PNc(-8)+' = '+N(-5))}`],
[`${eq(PNc(-2)+SUB+PNc(-7)+' =')}`,`${eq(PNc(-2)+' + 7 = 5')}`],
[`תמר כתבה: ${eq(PN(-4)+' − 6 = '+PN(2))}. מה הטעות?`,`אין כאן מינוס מינוס: ${eq(PNc(-4)+' + '+PNc(-6)+' = '+PNc(-10))}`],
[`מצאו שני מספרים שליליים ${eq('a')} ו־${eq('b')} כך ש־${eq('a'+SUB+'b')} חיובי.`,`למשל ${eq(PNc(-2)+SUB+PNc(-5)+' = 3')}`]]),
SEC(3,'מינוס לפני סוגריים','הנגדי של כל מה שבפנים'),
{html:CSS+`<div class="eyebrow">3 · מינוס לפני סוגריים</div><h2>הנגדי של <u>כל</u> מה שבפנים</h2>
<p class="big2">${eq(OP+'('+N(-4)+' + 1)')}</p>
${P(N(-4)+' + 1 = '+N(-3),1,'קודם מה שבפנים: −4 ועוד 1.')}
${P(OP+'('+N(-3)+') = 3',2,'עכשיו המינוס שבחוץ: הנגדי של −3 הוא 3.')}
<div class="card step"><b>דרך שנייה, שנצטרך בכיתה ח׳:</b> הנגדי של כל איבר: ${eq('4 + ('+N(-1)+') = 3')}. אותה תשובה!</div>`},

LVL('נושא 3 · מינוס לפני סוגריים',[
[`${eq(OP+'('+N(7)+') =')}`,`${eq(N(-7))}`],
[`${eq(OP+'('+N(-3)+' + 8) =')}`,`${eq(OP+'(5) = '+N(-5))}`],
[`נכון או לא? ${eq(OP+'('+OP+'('+N(-4)+')) = 4')}`,`לא נכון: שלושה סיבובים, ולכן ${eq(N(-4))}`],
[`השלימו: ${eq(OP+'(☐ + 2) = 5')}`,`${eq('☐ = '+N(-7))}, כי ${eq(N(-7)+' + 2 = '+N(-5))}`]]),
SEC(4,'ערך מוחלט','מרחק מ־0 · מינוס בפנים ומינוס בחוץ'),
{html:CSS+SPIN_CSS+`<div class="eyebrow">4 · מינוס לפני ערך מוחלט</div><h2>הקווים קודם, המינוס שבחוץ בסוף</h2>
${swallow()}
<div class="rule step">${eq(OP+AB(N(-3))+' = '+N(-3))}: קודם המרחק, ואחר כך הנגדי.</div>`},

LVL('נושא 4 · ערך מוחלט',[
[`${eq(AB(N(-12))+' =')}`,`${eq('12')}`],
[`${eq(AB('('+N(-9)+') + 4')+' =')}`,`${eq(AB(N(-5))+' = 5')}`],
[`סדרו מהקטן לגדול: ${eq(OP+AB(N(-6))+',  '+AB(N(-2))+',  '+N(-3))}`,`${eq(OP+AB(N(-6))+' &lt; '+N(-3)+' &lt; '+AB(N(-2)))}`],
[`מצאו את כל ה־${eq('x')} כך ש־${eq(AB('x')+' = 7')}. ויש ${eq('x')} כך ש־${eq(AB('x')+' = '+N(-7))}?`,`${eq('7')} ו־${eq(N(-7))}. ל־${eq(N(-7))} אין: מרחק אינו שלילי`]]),
SEC(5,'הצבה','מציבים בסוגריים וקוראים בקול'),
{html:CSS+L2CSS+SPIN_CSS+`<div class="eyebrow">5 · הצבה</div><h2>${eq(OP+'x')} הוא <u>לא</u> בהכרח שלילי!</h2>
${boxSub()}
<p class="step">${eq(OP+'x')} = "הנגדי של x". כש־x שלילי, ${eq(OP+'x')} חיובי.</p>`},

{html:CSS+`<div class="eyebrow">5 · הצבה · ${eq('x = '+N(-4))}</div><h2>מציבים בסוגריים, קוראים בקול</h2>
<table class="tbl">
<tr><th>הביטוי</th><th>מציבים וקוראים</th><th>התוצאה</th></tr>
<tr class="step"><td>${eq(OP+'x')}</td><td>הנגדי של ${eq(PNc(-4))}</td><td>${eq('4')}</td></tr>
<tr class="step"><td>${eq(AB('x'))}</td><td>המרחק של ${eq(PNc(-4))} מ־0</td><td>${eq('4')}</td></tr>
<tr class="step"><td>${eq(OP+AB('x'))}</td><td>הנגדי של המרחק</td><td>${eq(N(-4))}</td></tr>
<tr class="step"><td>${eq('x + 6')}</td><td>${eq(PNc(-4)+' + 6')}</td><td>${eq('2')}</td></tr>
<tr class="step"><td>${eq('6'+SUB+'x')}</td><td>${eq('6')} ועוד הנגדי של ${eq(PNc(-4))}</td><td>${eq('10')}</td></tr>
</table>`},

LVL('נושא 5 · הצבה',[
[`${eq('x = '+N(-5))}: ${eq(OP+'x =')}`,`${eq('5')}`],
[`${eq('x = '+N(-5))}: ${eq('3'+SUB+'x =')}`,`${eq('3 + 5 = 8')}`],
[`${eq('a = '+N(-1))}, ${eq('b = 4')}: ${eq(AB('a'+SUB+'b')+' =')}`,`${eq(AB(PNc(-1)+' + '+PNc(-4))+' = '+AB(N(-5))+' = 5')}`],
[`מצאו ${eq('x')} כך ש־${eq('x'+SUB+'('+OP+'x) = 10')}.`,`${eq('x = 5')}: ${eq('5 + 5 = 10')}`]]),
{html:CSS+`<div class="eyebrow">טעויות נפוצות</div><h2>איפה השפה שלנו מצילה אותנו?</h2>
<table class="tbl">
<tr><th>כתבו</th><th>קוראים נכון</th><th>נכון</th></tr>
<tr class="step"><td><span class="wrong">${eq(N(-3)+' − 5 = 8')}</span></td><td>הנגדי של 3 ועוד הנגדי של 5</td><td>${eq(N(-8))}</td></tr>
<tr class="step"><td><span class="wrong">${eq('5 − ('+N(-2)+') = 3')}</span></td><td>5 ועוד הנגדי של מינוס 2</td><td>${eq('7')}</td></tr>
<tr class="step"><td><span class="wrong">${eq('−|−3| = 3')}</span></td><td>הנגדי של המרחק 3</td><td>${eq(N(-3))}</td></tr>
<tr class="step"><td>"${eq('−x')} תמיד שלילי"</td><td>הנגדי של x</td><td>אם ${eq('x = '+N(-4))}: ${eq('4')}</td></tr>
</table>`},

{html:CSS+`<div class="lvl">${stars(1)} ידע</div><h2>חשבו: ${eq(PNc(-7)+SUB+'4')}</h2>
${walker(-7,-4,-12,1)}
${P(PNc(-7)+' + '+PNc(-4),1,'מתרגמים: ועוד הנגדי של 4.')}
${P(PNc(-7)+' + '+PNc(-4)+' = '+PNc(-11),2,'אותו כיוון: 7 ועוד 4 צעדים שמאלה.')}`},

{html:CSS+`<div class="lvl">${stars(2)} יישום</div><h2>חשבו: ${eq('6'+SUB+PNc(-9))}</h2>
${walker(6,9,-1,16,{only:[0,5,6,10,15]})}
${P('6 + '+PNc(9),1,'קוראים: 6 ועוד הנגדי של מינוס 9, כלומר ועוד 9.')}
${P('6 + '+PNc(9)+' = 15',2,'אותו כיוון: 6 ועוד 9.')}`},

{html:CSS+`<div class="lvl">${stars(3)} הבנה ונימוק · ניתוח טעות</div><h2>ליאור כתב: ${eq(OP+'('+N(-5)+' + 2) = '+N(-7))}. מה הטעות?</h2>
${P(N(-5)+' + 2 = '+N(-3),1,'קודם מה שבפנים: −5 ועוד 2. ליאור דילג על השלב הזה.')}
${P(OP+'('+N(-3)+') = 3',2,'הנגדי של −3 הוא 3.')}
<div class="rule step">ליאור "הוריד את הסוגריים" וחיבר את המרחקים. הכלל: <b>קודם מה שבפנים</b>, ורק אז הנגדי.</div>`},

{html:CSS+`<div class="lvl">${stars(4)} חשיבה מסדר גבוה · הצבה</div><h2>${eq('a = '+N(-2))}, &nbsp; ${eq('b = '+N(-5))}. חשבו:</h2>
${P('a'+SUB+'b = '+PNc(-2)+' + 5 = 3',1,'מציבים בסוגריים: −2 ועוד הנגדי של −5.')}
${P(AB('a + b')+' = '+AB(N(-7))+' = 7',2,'קודם בפנים: −2 ועוד −5 הם −7. המרחק: 7.')}
${P(OP+AB('b')+SUB+'a = '+N(-5)+' + 2 = '+N(-3),3,'הנגדי של המרחק של b הוא −5. ועוד הנגדי של a, כלומר 2.')}`},

{html:CSS+`<div class="eyebrow">תרגול בכיתה</div><h2>קוראים בקול, מתרגמים, מחשבים</h2>
<div class="two"><ol class="qlist">
<li>${stars(1)} ${eq(PNc(-8)+' + '+PNc(-5)+' =')} <span class="ans step">${eq(N(-13))}</span></li>
<li>${stars(1)} ${eq(PNc(9)+' + '+PNc(-12)+' =')} <span class="ans step">${eq(N(-3))}</span></li>
<li>${stars(2)} ${eq('4'+SUB+'10 =')} <span class="ans step">${eq(N(-6))}</span></li>
<li>${stars(2)} ${eq(PNc(-6)+SUB+PNc(-6)+' =')} <span class="ans step">${eq('0')}</span></li>
<li>${stars(2)} ${eq(OP+'('+N(-8)+' + 3) =')} <span class="ans step">${eq('5')}</span></li>
</ol><ol class="qlist" start="6">
<li>${stars(2)} ${eq(OP+AB(N(-7))+' + 10 =')} <span class="ans step">${eq('3')}</span></li>
<li>${stars(3)} ${eq('x = '+N(-3))}: ${eq(OP+'x + '+AB('x')+' =')} <span class="ans step">${eq('6')}</span></li>
<li>${stars(3)} ${eq('x = '+N(-3))}: ${eq('1'+SUB+'x =')} <span class="ans step">${eq('4')}</span></li>
<li>${stars(4)} מצאו מספר ${eq('x')} כך ש־${eq(OP+'x')} גדול מ־${eq('x')}. <span class="ans step">כל מספר שלילי, למשל ${eq(N(-1))}</span></li>
</ol></div>`},

{html:CSS+`<div class="eyebrow">כרטיס יציאה</div><h2>שלוש שאלות, בלי עזרה</h2>
<ol class="qlist">
<li>${eq(PNc(-4)+SUB+'6 =')} <span class="ans step">${eq(N(-10))}</span></li>
<li>${eq('2'+SUB+PNc(-7)+' =')} <span class="ans step">${eq('9')}</span></li>
<li>${eq('x = '+N(-5))}. נועה אמרה: "${eq('−x')} שלילי, כי יש בו מינוס". צדקה? נמקו. <span class="ans step">לא. ${eq('−x')} = הנגדי של ${eq(N(-5))} = 5, חיובי.</span></li>
</ol>`},

{html:CSS+`<div class="eyebrow">שיעורי בית</div><h2>קוראים בקול לפני שמחשבים</h2>
<div class="two"><ol class="qlist">
<li>${eq(PNc(-9)+' + '+PNc(-6)+' =')}</li>
<li>${eq(PNc(15)+' + '+PNc(-20)+' =')}</li>
<li>${eq('3'+SUB+'11 =')}</li>
<li>${eq(PNc(-5)+SUB+'5 =')}</li>
<li>${eq('8'+SUB+PNc(-4)+' =')}</li>
<li>${eq(PNc(-10)+SUB+PNc(-3)+' =')}</li>
</ol><ol class="qlist" start="7">
<li>${eq(OP+'('+N(-6)+' + 2) =')}</li>
<li>${eq(OP+AB(N(-12))+' + 4 =')}</li>
<li>הציבו ${eq('x = '+N(-2))}: ${eq(OP+'x')}, &nbsp; ${eq(AB('x'))}, &nbsp; ${eq('5'+SUB+'x')}</li>
<li>הסבירו במילים: מתי ${eq('−x')} הוא מספר חיובי?</li>
</ol></div>`},

{html:CSS+`<div class="eyebrow">מה לקחנו מהשיעור?</div><h2>השפה שלנו</h2>
<div class="rule">1. כל מינוס = ${PUR('הנגדי של')} &nbsp;·&nbsp; 2. ${DT('קודם מה שבפנים')}</div>
<ul>
<li class="step"><b>חיבור:</b> אותו כיוון? המרחקים מתחברים. כיוונים הפוכים? זוגות אפס נעלמים.</li>
<li class="step"><b>חיסור:</b> "פחות" = ועוד הנגדי.</li>
<li class="step"><b>מינוס מינוס:</b> הנגדי של הנגדי, שני סיבובים, ולכן פלוס.</li>
<li class="step"><b>הצבה:</b> מציבים בסוגריים, וקוראים בקול.</li>
</ul>`}

];
