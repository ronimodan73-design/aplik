// TITLE: ז׳ · נובמבר · מספרים מכוונים וגאומטריה
// BAR: כיתה ז׳ · נובמבר · 15 שיעורים
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
const W=(n,t)=>`<div class="card what"><b>מה עשינו? שלב ${n}:</b> ${t.replace(/−?\d+(\.\d+)?°|−\d+/g,m=>eq(m))}</div>`;
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

/* ===== נובמבר ז׳ · עזרים נוספים: עמודות רווח/חוב, משולשים, קריעת פינות, מרובע, הזזה ===== */
const GCSS=`<style>
.tear{transition:transform 1.9s cubic-bezier(.55,0,.35,1) var(--d,0s);transform:var(--from)}
.trig.shown ~ .tear{transform:var(--to)}
.fadein{opacity:0;transition:opacity .5s ease-out var(--d,0s)}
.trig.shown ~ .fadein{opacity:1}
.sm{display:flex;justify-content:center}.sm>svg{max-height:var(--mh,15cqw);width:auto;max-width:100%}
.gone{transition:opacity .5s ease-out var(--d,0s)}
.trig.shown ~ .gone{opacity:.15}
</style>`;
const TXT=(x,y,t,o={})=>`<text x="${x}" y="${y}" font-size="${o.fs||26}" text-anchor="${o.a||'middle'}" direction="${o.dir||'ltr'}" style="fill:${o.col||C.ink};font-weight:${o.w||700}" ${o.cls?`class="${o.cls}"`:''}>${t}</text>`;

/* עמודות רווח (ירוק) מול חוב (אדום): זוגות מתבטלים, מה שנשאר הוא התשובה */
function bars(p,n,o={}){const m=Math.max(p,n),u=Math.min(46,640/m),x0=110,y1=40,y2=40+u+24,h=u-6;let g='';
 g+=TXT(60,y1+h/2+9,o.pl||'רווח',{dir:'rtl',col:POS,fs:22});g+=TXT(60,y2+h/2+9,o.nl||'חוב',{dir:'rtl',col:NEG,fs:22});
 g+=`<g class="step">`;for(let i=0;i<p;i++)g+=`<rect class="pop" x="${x0+i*u}" y="${y1}" width="${u-6}" height="${h}" rx="6" fill="${POS}" style="--d:${(i*.06).toFixed(2)}s"/>`;g+=TXT(x0+p*u+40,y1+h/2+9,'+'+(p*(o.k||1)),{col:POS})+`</g>`;
 g+=`<g class="step">`;for(let i=0;i<n;i++)g+=`<rect class="pop" x="${x0+i*u}" y="${y2}" width="${u-6}" height="${h}" rx="6" fill="${NEG}" style="--d:${(i*.06).toFixed(2)}s"/>`;g+=TXT(x0+n*u+40,y2+h/2+9,M+(n*(o.k||1)),{col:NEG})+`</g>`;
 g+=`<g class="step trig"></g>`;const z=Math.min(p,n);
 for(let i=0;i<z;i++)g+=`<rect class="lit" x="${x0+i*u-2}" y="${y1-4}" width="${u-2}" height="${y2-y1+h+8}" rx="8" style="fill:#0f1b2d;opacity:.82;--d:${(.1+i*.08).toFixed(2)}s"/>`;
 const r=p-n;g+=TXT(x0+z*u/2,y2+h+42,'זוגות שמתאפסים',{dir:'rtl',col:DST,fs:22,cls:'lit'});
 if(r!==0)g+=TXT(x0+z*u+Math.abs(r)*u/2,y2+h+42,(r>0?'+':M)+Math.abs(r*(o.k||1)),{col:r>0?POS:NEG,fs:30,cls:'lit'});
 return svg(`0 0 800 ${y2+h+60}`,g);}

/* משולש עם סימני שוויון צלעות (ticks) וקשתות */
function tri(P,o={}){const [A,B,Cc]=P;let g=`<polygon points="${P.map(p=>p.join(',')).join(' ')}" fill="${o.fill||'none'}" stroke="${o.col||C.ray}" stroke-width="4" stroke-linejoin="round"/>`;
 const sides=[[A,B],[B,Cc],[Cc,A]];
 (o.ticks||[0,0,0]).forEach((k,i)=>{if(!k)return;const [p,q]=sides[i],mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2,dx=q[0]-p[0],dy=q[1]-p[1],L=Math.hypot(dx,dy),nx=-dy/L*11,ny=dx/L*11,tx=dx/L*7,ty=dy/L*7;
  for(let j=0;j<k;j++){const off=(j-(k-1)/2);g+=`<line x1="${mx+off*tx-nx}" y1="${my+off*ty-ny}" x2="${mx+off*tx+nx}" y2="${my+off*ty+ny}" stroke="${DST}" stroke-width="4"/>`;}});
 (o.labels||[]).forEach((t,i)=>{if(!t)return;const p=P[i],cx=(A[0]+B[0]+Cc[0])/3,cy=(A[1]+B[1]+Cc[1])/3,dx=p[0]-cx,dy=p[1]-cy,L=Math.hypot(dx,dy);g+=TXT(p[0]+dx/L*26,p[1]+dy/L*26+9,t,{fs:26});});
 (o.sideLabels||[]).forEach((t,i)=>{if(!t)return;const [p,q]=sides[i],mx=(p[0]+q[0])/2,my=(p[1]+q[1])/2,cx=(A[0]+B[0]+Cc[0])/3,cy=(A[1]+B[1]+Cc[1])/3,dx=mx-cx,dy=my-cy,L=Math.hypot(dx,dy);g+=TXT(mx+dx/L*30,my+dy/L*30+8,t,{fs:22,col:DST,dir:/[א-ת]/.test(t)?'rtl':'ltr'});});
 if(o.right!=null){const v=P[o.right],a=P[(o.right+1)%3],b=P[(o.right+2)%3],u=(p)=>{const dx=p[0]-v[0],dy=p[1]-v[1],L=Math.hypot(dx,dy);return [dx/L*22,dy/L*22];},[ax,ay]=u(a),[bx,by]=u(b);
  g+=`<path d="M${v[0]+ax} ${v[1]+ay} L${v[0]+ax+bx} ${v[1]+ay+by} L${v[0]+bx} ${v[1]+by}" fill="none" stroke="${C.ink}" stroke-width="3"/>`;}
 return g;}
const deg=r=>r*180/Math.PI;
function angInfo(V,U,W){let tu=deg(Math.atan2(U[1]-V[1],U[0]-V[0])),tw=deg(Math.atan2(W[1]-V[1],W[0]-V[0]));let d=((tw-tu)%360+360)%360;return d<=180?{start:tu,sweep:d}:{start:tw,sweep:360-d};}
const sectorPath=(r,s)=>{const a=s*Math.PI/180;return `M0 0 L${r} 0 A${r} ${r} 0 0 1 ${(r*Math.cos(a)).toFixed(2)} ${(r*Math.sin(a)).toFixed(2)}Z`;};
function arcAt(V,U,W,col,r=40){const {start,sweep}=angInfo(V,U,W);return `<path d="${sectorPath(r,sweep)}" transform="translate(${V[0]} ${V[1]}) rotate(${start})" fill="${col}" opacity=".85"/>`;}

/* קורעים את שלוש הפינות ומניחים אותן על ישר: 180° */
function tearTri(){const A=[110,330],B=[470,330],Cc=[300,95],P=[640,330],cols=[POS,C.ray,DST],V=[A,B,Cc],N2=[[B,Cc],[Cc,A],[A,B]];let g='';
 g+=`<line x1="530" y1="330" x2="770" y2="330" stroke="${C.ink}" stroke-width="4"/>`+TXT(650,385,'ישר = 180°',{dir:'rtl',col:DST,fs:24,cls:'fadein'}).replace('class="fadein"','class="fadein" style="--d:2s"');
 g+=tri([A,B,Cc],{labels:['A','B','C']});
 V.forEach((v,i)=>g+=arcAt(v,N2[i][0],N2[i][1],cols[i],44));
 g+=`<g class="step trig"></g>`;let cum=180;
 V.forEach((v,i)=>{const {start,sweep}=angInfo(v,N2[i][0],N2[i][1]);g+=`<path class="tear" d="${sectorPath(54,sweep)}" fill="${cols[i]}" stroke="#0f1b2d" stroke-width="2" style="--from:translate(${v[0]}px,${v[1]}px) rotate(${start}deg);--to:translate(${P[0]}px,${P[1]}px) rotate(${cum}deg);--d:${(i*.5).toFixed(1)}s"/>`;cum+=sweep;});
 return svg('0 50 800 360',g);}

/* מרובע = שני משולשים */
function quadSplit(){const Q=[[120,320],[560,330],[640,120],[230,90]];let g=`<polygon points="${Q.map(p=>p.join(',')).join(' ')}" fill="none" stroke="${C.ray}" stroke-width="4"/>`;
 ['A','B','C','D'].forEach((t,i)=>{const p=Q[i];g+=TXT(p[0]+(i==0||i==3?-22:24),p[1]+(i<2?32:-12),t);});
 g+=`<g class="step"><polygon points="${[Q[0],Q[1],Q[2]].map(p=>p.join(',')).join(' ')}" fill="${POS}" opacity=".35"/>${TXT(450,270,'180°',{col:POS,fs:30})}</g>`;
 g+=`<g class="step"><polygon points="${[Q[0],Q[2],Q[3]].map(p=>p.join(',')).join(' ')}" fill="${DST}" opacity=".35"/>${TXT(320,170,'180°',{col:DST,fs:30})}</g>`;
 g+=`<line x1="${Q[0][0]}" y1="${Q[0][1]}" x2="${Q[2][0]}" y2="${Q[2][1]}" stroke="${C.ink}" stroke-width="3" stroke-dasharray="10 8"/>`;
 return svg('0 70 800 290',g);}

/* רשת ברביע הראשון + הזזה של משולש */
function gridShift(P,dx,dy,o={}){const u=42,ox=60,oy=360,X=x=>ox+x*u,Y=y=>oy-y*u,nx=o.nx||12,ny=o.ny||8;let g='';
 for(let i=0;i<=nx;i++)g+=`<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(ny)}" stroke="${C.line}" stroke-width="1.5"/>`+TXT(X(i),Y(0)+28,i,{fs:18,w:500});
 for(let j=0;j<=ny;j++)g+=`<line x1="${X(0)}" y1="${Y(j)}" x2="${X(nx)}" y2="${Y(j)}" stroke="${C.line}" stroke-width="1.5"/>`+(j?TXT(X(0)-18,Y(j)+7,j,{fs:18,w:500}):'');
 g+=`<line x1="${X(0)}" y1="${Y(0)}" x2="${X(nx)+14}" y2="${Y(0)}" stroke="${C.ink}" stroke-width="3"/><line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(ny)-14}" stroke="${C.ink}" stroke-width="3"/>`;
 const pts=p=>p.map(q=>`${X(q[0])},${Y(q[1])}`).join(' ');
 g+=`<polygon points="${pts(P)}" fill="${C.ray}" fill-opacity=".3" stroke="${C.ray}" stroke-width="3"/>`;
 (o.names||[]).forEach((t,i)=>g+=TXT(X(P[i][0])-14,Y(P[i][1])-10,t,{fs:20}));
 g+=`<g class="step trig"></g>`;
 g+=`<polygon class="mv" points="${pts(P)}" fill="${DST}" fill-opacity=".45" stroke="${DST}" stroke-width="3" style="--tx:${dx*u}px;--ty:${-dy*u}px"/>`;
 const a=P[0];g+=`<g class="lit" style="--d:1.9s"><line x1="${X(a[0])}" y1="${Y(a[1])}" x2="${X(a[0]+dx)}" y2="${Y(a[1]+dy)}" stroke="${POS}" stroke-width="4" stroke-dasharray="8 6"/><circle cx="${X(a[0]+dx)}" cy="${Y(a[1]+dy)}" r="7" fill="${POS}"/></g>`;
 return svg(`0 0 ${X(nx)+30} ${oy+40}`,g);}

/* ===== זווית כסיבוב · צמודות · שיקוף · סיבוב ===== */
const RCSS=`<style>.rr{transform-box:view-box;transition:rotate 1.8s cubic-bezier(.5,0,.3,1) var(--d,0s)}
.trig.shown ~ .rr{rotate:var(--r)}
.fl{transform-box:view-box;transition:scale 1.6s cubic-bezier(.5,0,.3,1)}
.trig.shown ~ .fl{scale:-1 1}</style>`;
function arcPath(cx,cy,r,a0,a1){const p=a=>[cx+r*Math.cos(a*Math.PI/180),cy-r*Math.sin(a*Math.PI/180)];const [x0,y0]=p(a0),[x1,y1]=p(a1);return `M${x0} ${y0}A${r} ${r} 0 ${Math.abs(a1-a0)>180?1:0} 0 ${x1} ${y1}`;}
/* קרן מסתובבת סביב קודקוד: זווית = כמות הסיבוב */
function turnRay(deg){const V=[400,250],L=230;let g=`<line x1="${V[0]}" y1="${V[1]}" x2="${V[0]+L}" y2="${V[1]}" stroke="${C.ray}" stroke-width="7" stroke-linecap="round"/>`;
 g+=`<line x1="${V[0]}" y1="${V[1]}" x2="${V[0]+L}" y2="${V[1]}" stroke="${C.ray}" stroke-width="3" stroke-dasharray="6 6" opacity=".5"/>`;
 g+=`<g class="step trig"></g><g class="rr" style="transform-origin:${V[0]}px ${V[1]}px;--r:${-deg}deg"><line x1="${V[0]}" y1="${V[1]}" x2="${V[0]+L}" y2="${V[1]}" stroke="${DST}" stroke-width="7" stroke-linecap="round"/><circle cx="${V[0]+L}" cy="${V[1]}" r="9" fill="${DST}"/></g>`;
 g+=`<path class="lit" style="--d:1.2s" d="${arcPath(V[0],V[1],70,0,deg)}" fill="none" stroke="${OPP}" stroke-width="5"/>`;
 g+=`<circle cx="${V[0]}" cy="${V[1]}" r="8" fill="${C.ink}"/>`+TXT(V[0]+110*Math.cos(deg/2*Math.PI/180),V[1]-110*Math.sin(deg/2*Math.PI/180)+10,deg+'°',{col:OPP,fs:30,cls:'lit'});
 return svg('120 0 560 290',g);}
/* זוויות צמודות על ישר */
function adjPair(a){const V=[400,240],L=280,r=a*Math.PI/180;let g=`<line x1="${V[0]-L}" y1="${V[1]}" x2="${V[0]+L}" y2="${V[1]}" stroke="${C.ink}" stroke-width="5"/>`;
 g+=`<line x1="${V[0]}" y1="${V[1]}" x2="${V[0]+220*Math.cos(r)}" y2="${V[1]-220*Math.sin(r)}" stroke="${C.ray}" stroke-width="5"/>`;
 g+=`<g class="step"><path d="${arcPath(V[0],V[1],60,0,a)}" fill="none" stroke="${POS}" stroke-width="6"/>${TXT(V[0]+95*Math.cos(r/2),V[1]-95*Math.sin(r/2)+10,a+'°',{col:POS,fs:28})}</g>`;
 g+=`<g class="step"><path d="${arcPath(V[0],V[1],80,a,180)}" fill="none" stroke="${DST}" stroke-width="6"/>${TXT(V[0]+115*Math.cos((a+180)/2*Math.PI/180),V[1]-115*Math.sin((a+180)/2*Math.PI/180)+10,(180-a)+'°',{col:DST,fs:28})}</g>`;
 g+=`<g class="step">${TXT(V[0],V[1]+45,a+'° + '+(180-a)+'° = 180°',{fs:28})}</g>`;
 return svg('100 0 600 300',g);}
/* רשת ברביע הראשון */
function grid1(nx,ny){const u=42,ox=60,oy=30+ny*u+20,X=x=>ox+x*u,Y=y=>oy-y*u;let g='';
 for(let i=0;i<=nx;i++)g+=`<line x1="${X(i)}" y1="${Y(0)}" x2="${X(i)}" y2="${Y(ny)}" stroke="${C.line}" stroke-width="1.5"/>`+TXT(X(i),Y(0)+28,i,{fs:18,w:500});
 for(let j=0;j<=ny;j++)g+=`<line x1="${X(0)}" y1="${Y(j)}" x2="${X(nx)}" y2="${Y(j)}" stroke="${C.line}" stroke-width="1.5"/>`+(j?TXT(X(0)-18,Y(j)+7,j,{fs:18,w:500}):'');
 g+=`<line x1="${X(0)}" y1="${Y(0)}" x2="${X(nx)+14}" y2="${Y(0)}" stroke="${C.ink}" stroke-width="3"/><line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(ny)-14}" stroke="${C.ink}" stroke-width="3"/>`;
 return {g,X,Y,W:X(nx)+30,H:oy+40};}
/* שיקוף בישר אנכי x=m: הצורה "מתהפכת" */
function gridReflect(P,m,names=[]){const G=grid1(10,5),pts=p=>p.map(q=>`${G.X(q[0])},${G.Y(q[1])}`).join(' ');let g=G.g;
 g+=`<line x1="${G.X(m)}" y1="${G.Y(0)}" x2="${G.X(m)}" y2="${G.Y(5)}" stroke="${OPP}" stroke-width="4" stroke-dasharray="12 8"/>`+TXT(G.X(m),G.Y(5)-10,'x = '+m,{col:OPP,fs:20});
 g+=`<polygon points="${pts(P)}" fill="${C.ray}" fill-opacity=".3" stroke="${C.ray}" stroke-width="3"/>`;
 names.forEach((t,i)=>g+=TXT(G.X(P[i][0])-14,G.Y(P[i][1])-10,t,{fs:20}));
 g+=`<g class="step trig"></g><polygon class="fl" style="transform-origin:${G.X(m)}px 0px" points="${pts(P)}" fill="${DST}" fill-opacity=".45" stroke="${DST}" stroke-width="3"/>`;
 return svg(`0 0 ${G.W} ${G.H}`,g);}
/* סיבוב סביב נקודה O בזווית deg (חיובי = נגד כיוון השעון) */
function gridRotate(P,O,deg,names=[]){const G=grid1(7,6),pts=p=>p.map(q=>`${G.X(q[0])},${G.Y(q[1])}`).join(' ');let g=G.g;
 g+=`<polygon points="${pts(P)}" fill="${C.ray}" fill-opacity=".3" stroke="${C.ray}" stroke-width="3"/>`;
 names.forEach((t,i)=>g+=TXT(G.X(P[i][0])+14,G.Y(P[i][1])-10,t,{fs:20}));
 g+=`<g class="step trig"></g><polygon class="rr" style="transform-origin:${G.X(O[0])}px ${G.Y(O[1])}px;--r:${-deg}deg" points="${pts(P)}" fill="${DST}" fill-opacity=".45" stroke="${DST}" stroke-width="3"/>`;
 g+=`<circle cx="${G.X(O[0])}" cy="${G.Y(O[1])}" r="8" fill="${OPP}"/>`+TXT(G.X(O[0])-16,G.Y(O[1])+26,'O',{col:OPP,fs:22});
 return svg(`0 0 ${G.W} ${G.H}`,g);}
const TASKS={"1": {"cls": [[1, "⟦|−9| =⟧", true, false], [1, "⟦|12| =⟧", true, false], [1, "⟦|0| =⟧", false, false], [2, "⟦|(−3) + (−4)| =⟧", false, false], [2, "⟦|−5| + |3| =⟧", true, false], [2, "⟦−|6| =⟧", true, false], [3, "השלימו סימן גדול, קטן או שווה: ⟦|−6| ☐ |4|⟧", true, false], [3, "השלימו סימן גדול, קטן או שווה: ⟦−|−2| ☐ |−2|⟧", false, false], [4, "מצאו את כל המספרים שהערך המוחלט שלהם 9.", true, false], [4, "צוללת בעומק ⟦−5⟧ מטרים, וציפור בגובה 3 מטרים. מי רחוקה יותר מפני הים? נמקו.", false, false]], "home": [[1, "⟦|−13| =⟧", true, true], [1, "השלימו: למספר ⟦−5⟧ המספר הנגדי הוא ___, והערך המוחלט הוא ___.", true, false], [1, "⟦|20| =⟧", false, false], [2, "⟦|(−8) + 3| =⟧", false, true], [2, "⟦−|−4| =⟧", true, false], [2, "⟦|−2| + |−6| =⟧", true, false], [3, "נועה כתבה: ⟦−|−5| = 5⟧. איפה הטעות? תקנו.", false, true], [3, "השלימו סימן גדול, קטן או שווה: ⟦|−3| ☐ −3⟧", true, false], [4, "מצאו את כל המספרים שהמרחק שלהם מ־0 הוא 6. האם יש מספר שהערך המוחלט שלו ⟦−6⟧?", true, true], [4, "k הוא מספר שלילי. האם ⟦−k⟧ חיובי או שלילי? מה ⟦|k|⟧? הדגימו עם ⟦k = −3⟧.", false, false]], "book": {"כיתה": [], "בית": []}}, "2": {"cls": [[1, "חשבו בעזרת ציר המספרים: ⟦(−3) + (+5) =⟧", true, false], [1, "חשבו בעזרת ציר המספרים: ⟦(+4) + (−6) =⟧", true, false], [1, "חשבו בעזרת ציר המספרים: ⟦(−1) + (−4) =⟧", false, false], [2, "בבוקר הטמפרטורה הייתה ⟦−6°⟧, ועד הצהריים עלתה ב־⟦9°⟧. כתבו תרגיל וחשבו.", true, false], [2, "לנועה היה חוב של 5 ₪, והיא קיבלה 3 ₪. כתבו תרגיל ומצאו מה מצבה.", true, false], [2, "צוללן נמצא בעומק 8 מטר מתחת לפני הים, ויורד עוד 3 מטר. כתבו תרגיל ומצאו איפה הוא.", false, false], [3, "מצאו את הטעות: רון פתר ⟦(−5) + (+3) = −8⟧. תקנו והסבירו.", false, false], [3, "בלי לחשב: האם התוצאה של ⟦(−8) + (+3)⟧ חיובית או שלילית? הסבירו בעזרת הציר.", true, false], [4, "השלימו: ⟦(−4) + ☐ = 1⟧", true, false], [4, "השלימו: ⟦(+2) + ☐ = (−3)⟧", false, false]], "home": [[1, "חשבו בעזרת ציר המספרים: ⟦(−3) + (+7) =⟧", true, true], [1, "חשבו בעזרת ציר המספרים: ⟦(+5) + (−8) =⟧", true, false], [1, "חשבו בעזרת ציר המספרים: ⟦(−2) + (−5) =⟧", false, false], [2, "הטמפרטורה בבוקר הייתה ⟦−5°⟧, ועד הצהריים עלתה ב־⟦8°⟧. כתבו תרגיל וחשבו את הטמפרטורה בצהריים.", true, true], [2, "מעלית נמצאת בקומה ⟦−2⟧ (חניון), ועולה 6 קומות. כתבו תרגיל ומצאו לאיזו קומה הגיעה.", true, false], [2, "לדנה חוב של 4 ₪, והיא הוציאה עוד 3 ₪. כתבו תרגיל ומצאו מה מצבה.", false, false], [3, "מצאו את הטעות: מאיה פתרה ⟦(−7) + (+3) = −10⟧. תקנו והסבירו.", false, true], [3, "האם ⟦(+6) + (−9)⟧ חיובי או שלילי? הסבירו בעזרת הציר.", true, false], [4, "השלימו: ⟦(−6) + ☐ = (−2)⟧", true, true], [4, "דני אמר: \"כשמחברים מספר שלילי, התוצאה תמיד שלילית\". האם הוא צודק? הביאו דוגמה.", false, false]], "book": {"כיתה": ["עמ׳ 66: 7(א), 8(א), 9(א)", "עמ׳ 67: 11(ב1), 11(ב2), 12"], "בית": ["עמ׳ 66: 7(ב), 8(ב), 9(ב)", "עמ׳ 67: 11(ב3)", "עמ׳ 68: 14(א), 14(ב)"]}}, "3": {"cls": [[1, "⟦(−6) + (−9) =⟧", true, false], [1, "⟦(+8) + (−13) =⟧", true, false], [1, "⟦(−14) + (+20) =⟧", false, false], [2, "השלימו: ⟦(−9) + ☐ = (−15)⟧", true, false], [2, "השלימו: ⟦☐ + (+7) = (−4)⟧", true, false], [2, "בחשבון הבנק היה חוב של 30 ₪. הופקדו 45 ₪. מה המצב בחשבון?", false, false], [3, "בלי לחשב: האם ⟦(−41) + (+38)⟧ חיובי או שלילי? נמקו בעזרת ערך מוחלט.", true, false], [3, "מצאו את הטעות: ⟦(−9) + (+4) = 5⟧. תקנו והסבירו.", false, false], [4, "רשמו שני מספרים בסימנים שונים שסכומם ⟦−15⟧.", true, false], [4, "השלימו מספר כך שהסכום יהיה שלילי: ⟦(+8) + ☐⟧. תנו שתי אפשרויות.", false, false]], "home": [[1, "⟦(−7) + (−4) =⟧", true, true], [1, "⟦(+12) + (−5) =⟧", true, false], [1, "⟦(−16) + (+9) =⟧", false, false], [2, "צוללן נמצא בעומק 15 מטר מתחת לפני הים, ועולה 6 מטר. איפה הוא עכשיו?", false, true], [2, "השלימו: ⟦(−5) + ☐ = (−12)⟧", true, false], [2, "השלימו: ⟦(+6) + ☐ = (−2)⟧", true, false], [3, "בלי לחשב: האם ⟦(−37) + (+29)⟧ חיובי או שלילי? נמקו בעזרת ערך מוחלט.", true, true], [3, "הסבירו בעזרת ערך מוחלט למה ⟦(−12) + (+12) = 0⟧.", false, false], [4, "השלימו מספר כך שהסכום יהיה חיובי: ⟦(−9) + ☐⟧", true, true], [4, "רשמו שני מספרים שליליים שסכומם ⟦−15⟧.", false, false]], "book": {"כיתה": ["עמ׳ 66: 10(א)", "עמ׳ 69: 23(א)", "עמ׳ 69: 23(ג), 23(ד), 23(ט)", "עמ׳ 70: 27(ג)"], "בית": ["עמ׳ 69: 23(ב), 23(ה), 23(ח)", "עמ׳ 66: 10(ג), 10(ה)", "עמ׳ 69: 23(ו), 23(ז), 23(י)", "עמ׳ 70: 27(ה)", "עמ׳ 71: 33(ג)"]}}, "4": {"cls": [[1, "⟦(+4) + (−6) + (+5) =⟧", true, false], [1, "⟦(−2) + (−3) + (+8) =⟧", true, false], [1, "⟦(−5) + (+1) + (−4) =⟧", false, false], [2, "בבוקר ⟦−2°⟧. הטמפרטורה עלתה ב־⟦6°⟧, ואחר כך ירדה ב־⟦7°⟧. מה הטמפרטורה?", true, false], [2, "לרון היו 15 ₪. הייתה לו הוצאה של 20 ₪, הכנסה של 8 ₪ והוצאה של 6 ₪. מה מצבו?", true, false], [2, "⟦(+7) + (−3) + (+3) + (−7) =⟧", false, false], [3, "חשבו בשתי דרכים – לפי הסדר, ובקיבוץ חיוביים לחוד ושליליים לחוד: ⟦(−6) + (+2) + (−5) + (+9)⟧", true, false], [3, "מצאו את הטעות: ⟦(−4) + (+6) + (−3) = −13⟧. תקנו.", false, false], [4, "השלימו מחובר אחד כך שהסכום יהיה 0: ⟦(−5) + (+8) + (−6) + ☐⟧", true, false], [4, "יואב טען: \"אם יש יותר מחוברים חיוביים, הסכום תמיד חיובי\". הפריכו בדוגמה.", false, false]], "home": [[1, "⟦(+2) + (−9) + (+4) =⟧", true, true], [1, "⟦(−3) + (−1) + (+6) =⟧", true, false], [1, "⟦(+5) + (−2) + (−8) + (+1) =⟧", false, false], [2, "בחשבון של גיל: הכנסה של 30 ₪, הוצאה של 25 ₪, הוצאה של 15 ₪, הכנסה של 5 ₪. מה השינוי בחשבון?", true, true], [2, "בלילה ⟦−5°⟧. הטמפרטורה עלתה ב־⟦3°⟧, עלתה ב־⟦4°⟧ וירדה ב־⟦6°⟧. מה הטמפרטורה?", true, false], [2, "מעלית בקומה 2: ירדה 4 קומות, עלתה קומה אחת וירדה 2 קומות. באיזו קומה היא?", false, false], [3, "חשבו בשתי דרכים – לפי הסדר, ובקיבוץ: ⟦(−8) + (+5) + (−2) + (+5)⟧. האם קיבלתם אותה תוצאה?", true, true], [3, "מה הכי נוח לחבר קודם ב־⟦(+17) + (−9) + (−17)⟧? חשבו ונמקו.", false, false], [4, "השלימו מחובר אחד כך שהסכום יהיה 0: ⟦(−8) + (+3) + (−4) + ☐⟧", true, true], [4, "רשמו 4 מחוברים – 2 חיוביים ו־2 שליליים – שסכומם ⟦−1⟧.", false, false]], "book": {"כיתה": ["עמ׳ 73: 38(א), 38(ג), 38(ה), 38(ז)", "עמ׳ 74: 44(א), 44(ג)"], "בית": ["עמ׳ 73: 38(ב), 38(ד), 38(ו), 38(ח), 38(ט), 38(י)", "עמ׳ 74: 44(ב), 44(ו)", "עמ׳ 73: 40, 41"]}}, "5": {"cls": [[1, "⟦3 − 8 =⟧", true, false], [1, "⟦(−4) − (+2) =⟧", true, false], [1, "איזה תרגיל חיבור שקול ל־⟦(+6) − (−3)⟧? פתרו.", false, false], [2, "בבוקר ⟦−6°⟧, בצהריים ⟦3°⟧. בכמה מעלות התחמם? כתבו תרגיל חיסור.", true, false], [2, "צוללת הייתה בעומק ⟦−40⟧ מטר ועלתה לעומק ⟦−15⟧ מטר. בכמה מטרים עלתה?", true, false], [2, "פסגה בגובה 200 מטר, ומערה בגובה ⟦−50⟧ מטר. מה הפרש הגבהים?", false, false], [3, "בלי לחשב עד הסוף: האם ⟦(−6) − (−2)⟧ חיובי או שלילי? נמקו.", true, false], [3, "מצאו את הטעות: ⟦(−3) − (−5) = −8⟧. תקנו.", false, false], [4, "מיכל אמרה: \"חיסור תמיד מקטין\". הפריכו בדוגמה.", false, false], [4, "מצאו שני מספרים שליליים כך שהראשון פחות השני הוא מספר חיובי.", true, false]], "home": [[1, "איזה תרגיל חיבור שקול ל־⟦(+4) − (−6)⟧? פתרו.", true, true], [1, "⟦2 − 9 =⟧", true, false], [1, "⟦(−5) − (+5) =⟧", false, false], [2, "בבוקר ⟦−4°⟧, בצהריים ⟦6°⟧. בכמה מעלות התחמם? כתבו תרגיל חיסור.", true, true], [2, "בירושלים ⟦4°⟧ ובחרמון ⟦−3°⟧. בכמה מעלות חם יותר בירושלים?", true, false], [2, "כתבו כתרגיל חיבור ופתרו: ⟦(−3) − (−10)⟧", false, false], [3, "למה ⟦9 − (−2)⟧ גדול מ־9? הסבירו.", false, true], [3, "בלי לחשב עד הסוף: האם ⟦(−3) − (−8)⟧ חיובי או שלילי? נמקו.", true, false], [4, "נועה טוענת: \"כשמחסרים, התוצאה תמיד קטנה מהמספר הראשון\". הביאו דוגמה נגדית.", false, true], [4, "השלימו: ⟦☐ − (−4) = 1⟧", true, false]], "book": {"כיתה": [], "בית": []}}, "6": {"cls": [[1, "כתבו בקיצור וחשבו: ⟦(+8) + (−3)⟧", true, false], [1, "כתבו בקיצור וחשבו: ⟦(−6) + (−2)⟧", true, false], [1, "כתבו בקיצור וחשבו: ⟦(+4) − (−7)⟧", false, false], [2, "כתבו בקיצור וחשבו: ⟦(−9) − (+1) + (−2)⟧", true, false], [2, "כתבו בקיצור וחשבו: ⟦(−2) + (+5) − (−3)⟧", true, false], [2, "כתבו בקיצור וחשבו: ⟦(+6) − (+2) + (−7) − (−1)⟧", false, false], [3, "בלי לחשב: האם ⟦−7 + 2 + 3⟧ חיובי או שלילי? נמקו.", true, false], [3, "מצאו את הטעות: נועם כתב ⟦5 − (−3) = 5 − 3⟧. תקנו.", false, false], [4, "כתבו את ⟦7 − 10⟧ בשתי דרכים שונות עם סוגריים.", false, false], [4, "השלימו סימן בתוך הסוגריים כך שהתוצאה תהיה 10: ⟦6 − (☐4)⟧", true, false]], "home": [[1, "כתבו בקיצור וחשבו: ⟦(+5) + (−4)⟧", true, true], [1, "כתבו בקיצור וחשבו: ⟦(+3) + (−9)⟧", true, false], [1, "כתבו בקיצור וחשבו: ⟦(−7) − (−7)⟧", false, false], [2, "כתבו בקיצור וחשבו: ⟦(−2) − (+5) + (−3)⟧", true, true], [2, "כתבו בקיצור וחשבו: ⟦(+10) − (−5) + (−6)⟧", true, false], [2, "כתבו בקיצור וחשבו: ⟦(−4) + (−4) − (−8)⟧", false, false], [3, "מה ההבדל בין ⟦9 − 4⟧ לבין ⟦9 + (−4)⟧? חשבו והסבירו.", false, true], [3, "בלי לחשב: האם ⟦−4 − 1 + 9⟧ חיובי או שלילי? נמקו.", true, false], [4, "כתבו את ⟦8 − 3⟧ בשלוש דרכים שונות עם סוגריים.", false, true], [4, "השלימו מספר: ⟦−2 − ☐ = 5⟧", true, false]], "book": {"כיתה": [], "בית": []}}, "7": {"cls": [[1, "⟦7 − 10 + 2 =⟧", true, false], [1, "⟦−3 − 4 + 9 =⟧", true, false], [1, "⟦12 − 5 − 9 + 1 =⟧", false, false], [2, "⟦−5 + 4 + 2 − 6 =⟧", true, false], [2, "ליואב היו 20 ₪. הוא הוציא 35 ₪, קיבל 12 ₪ והוציא 4 ₪. כתבו ביטוי בלי סוגריים וחשבו.", false, false], [2, "⟦−15 + 8 + 3 − 6 =⟧", true, false], [3, "סמנו את התרגילים שתוצאתם חיובית: ⟦49 − 105⟧, ⟦−110 + 220⟧, ⟦−400 + 66⟧, ⟦400 − 334⟧", true, false], [3, "מצאו את הטעות: ⟦−4 − 6 = 2⟧. תקנו.", false, false], [4, "השלימו + או − בכל ריבוע כך שהתוצאה תהיה 0: ⟦9 ☐ 4 ☐ 5⟧", false, false], [4, "כתבו ביטוי בלי סוגריים עם 4 מספרים, שתוצאתו ⟦−1⟧.", true, false]], "home": [[1, "⟦9 − 2 − 8 =⟧", true, true], [1, "⟦−8 + 3 + 1 =⟧", true, false], [1, "⟦−2 − 7 + 4 =⟧", false, false], [2, "⟦−10 + 3 + 5 − 4 =⟧", true, true], [2, "⟦15 − 20 + 8 =⟧", true, false], [2, "⟦−1 − 2 − 3 + 10 =⟧", false, false], [3, "מצאו את הטעות: ⟦−5 − 3 = −2⟧. תקנו והסבירו.", false, true], [3, "סמנו את התרגילים שתוצאתם שלילית: ⟦35 − 70⟧, ⟦−90 + 120⟧, ⟦−200 + 150⟧, ⟦300 − 250⟧", true, false], [4, "השלימו + או − בכל ריבוע כך שהתוצאה תהיה 0: ⟦7 ☐ 2 ☐ 5⟧", false, true], [4, "השלימו את המספר החסר: ⟦−6 + 4 − ☐ = −10⟧", true, false]], "book": {"כיתה": [], "בית": ["עמ׳ 99–100: משימת הסיכום"]}}, "8": {"cls": [[1, "כמה מעלות יש בסיבוב שלם?", true, false], [1, "כמה מעלות יש בחצי סיבוב?", true, false], [1, "מחוג הדקות זז מ־12 ל־6. איזה חלק מסיבוב שלם זה? כמה מעלות?", false, false], [2, "כמה מעלות זז מחוג הדקות ב־15 דקות?", true, false], [2, "כמה מעלות זז מחוג הדקות ב־20 דקות?", true, false], [2, "דלת נפתחה בשליש סיבוב. בכמה מעלות?", false, false], [3, "סווגו כל זווית: ⟦45°⟧, ⟦90°⟧, ⟦120°⟧, ⟦180°⟧", true, false], [3, "מאריכים את שתי השוקיים של זווית. האם הזווית גדלה? נמקו.", false, false], [4, "מה הזווית בין מחוגי השעון בשעה 2:00?", true, false], [4, "גלגל ענק מסתובב ⟦45°⟧ בכל דקה. כמה דקות נמשך סיבוב שלם?", false, false]], "home": [[1, "מחוג הדקות זז מ־12 ל־9. איזה חלק מסיבוב שלם זה? כמה מעלות?", true, true], [1, "כמה מעלות יש ברבע סיבוב?", true, false], [1, "כמה מעלות זז מחוג הדקות ב־5 דקות?", false, false], [2, "כמה מעלות זז מחוג הדקות ב־25 דקות?", true, true], [2, "כמה מעלות זז מחוג הדקות ב־40 דקות?", true, false], [2, "האם זווית של ⟦95°⟧ חדה, ישרה או קהה?", false, false], [3, "סווגו כל זווית: ⟦10°⟧, ⟦90°⟧, ⟦170°⟧, ⟦180°⟧", true, true], [3, "זווית של ⟦100°⟧ שורטטה בשוקיים קצרות, וזווית של ⟦60°⟧ בשוקיים ארוכות מאוד. איזו זווית גדולה יותר? נמקו.", false, false], [4, "מה הזווית בין מחוגי השעון בשעה 5:00?", true, true], [4, "רקדנית הסתובבה ⟦720°⟧. כמה סיבובים שלמים עשתה?", false, false]], "book": {"כיתה": [], "בית": []}}, "9": {"cls": [[1, "זווית אחת מזוג זוויות צמודות היא ⟦120°⟧. מהי השנייה?", true, false], [1, "מהו סכום שתי זוויות צמודות?", true, false], [1, "מהי הזווית הצמודה לזווית של ⟦35°⟧?", false, false], [2, "קרש נשען על רצפה ישרה ויוצר איתה זווית של ⟦50°⟧. מה הזווית מהצד השני של הקרש?", false, false], [2, "האם זוויות של ⟦100°⟧ ו־⟦90°⟧ יכולות להיות צמודות? נמקו.", true, false], [2, "כביש חוצה מסילת רכבת ישרה. זווית אחת ביניהם ⟦72°⟧. מה הזווית שלידה, על אותה מסילה?", true, false], [3, "שתי זוויות צמודות שוות זו לזו. מה גודל כל אחת?", true, false], [3, "האם שתי זוויות צמודות יכולות להיות שתיהן חדות? נמקו.", false, false], [4, "זווית אחת גדולה ב־⟦40°⟧ מהזווית הצמודה לה. מצאו את שתיהן.", false, false], [4, "זווית אחת גדולה פי 3 מהזווית הצמודה לה. מצאו את שתיהן.", true, false]], "home": [[1, "זווית אחת מזוג זוויות צמודות היא ⟦150°⟧. מהי השנייה?", true, true], [1, "מהי הזווית הצמודה ל־⟦90°⟧?", true, false], [1, "מהי הזווית הצמודה ל־⟦45°⟧?", false, false], [2, "מוט נשען על קיר ישר ויוצר איתו זווית של ⟦70°⟧. מה הזווית מהצד השני של המוט?", true, true], [2, "האם זוויות של ⟦70°⟧ ו־⟦110°⟧ יכולות להיות צמודות? נמקו.", true, false], [2, "הזווית הצמודה לזווית חדה – היא חדה או קהה? נמקו.", false, false], [3, "זווית שווה לזווית הצמודה לה. איזו זווית היא?", true, true], [3, "האם שתי זוויות צמודות יכולות להיות שתיהן קהות? נמקו.", false, false], [4, "זווית אחת גדולה ב־⟦20°⟧ מהזווית הצמודה לה. מצאו את שתיהן.", false, true], [4, "זווית אחת גדולה פי 2 מהזווית הצמודה לה. מצאו את שתיהן.", true, false]], "book": {"כיתה": [], "בית": []}}, "10": {"cls": [[1, "אורכי הצלעות במשולש: 5 ס״מ, 5 ס״מ, 5 ס״מ. סווגו אותו לפי צלעותיו.", true, false], [1, "הזוויות במשולש: ⟦40°⟧, ⟦50°⟧, ⟦90°⟧. סווגו אותו לפי זוויותיו.", true, false], [1, "במשולש שווה שוקיים ABC השוקיים הן AB ו־AC. מהו הבסיס, ומהי זווית הראש?", false, false], [2, "היקף משולש שווה שוקיים הוא 30 ס״מ, והבסיס 8 ס״מ. מה אורך כל שוק?", true, false], [2, "במשולש שווה שוקיים השוקיים 9 ס״מ והבסיס 4 ס״מ. מה ההיקף?", true, false], [2, "היקף משולש שווה צלעות הוא 27 ס״מ. מה אורך כל צלע?", false, false], [3, "האם משולש שווה צלעות הוא גם משולש שווה שוקיים? נמקו.", true, false], [3, "האם משולש קהה־זווית יכול להיות שווה שוקיים? סרטטו דוגמה.", false, false], [4, "היקף משולש שווה שוקיים 20 ס״מ, ואחת הצלעות 8 ס״מ. מצאו שתי אפשרויות לאורכי הצלעות.", true, false], [4, "היקף משולש שווה שוקיים 17 ס״מ, ואחת הצלעות 5 ס״מ. מצאו שתי אפשרויות לאורכי הצלעות.", false, false]], "home": [[1, "אורכי הצלעות: 6 ס״מ, 6 ס״מ, 6 ס״מ. סווגו לפי צלעות.", true, true], [1, "אורכי הצלעות: 3, 4, 6 ס״מ. סווגו לפי צלעות.", true, false], [1, "הזוויות: ⟦30°⟧, ⟦40°⟧, ⟦110°⟧. סווגו לפי זוויות.", false, false], [2, "היקף משולש שווה שוקיים הוא 26 ס״מ, והבסיס 6 ס״מ. מה אורך כל שוק?", true, true], [2, "התמרור \"תן זכות קדימה\" הוא משולש שווה צלעות. כל צלע 90 ס״מ. מה היקף התמרור?", true, false], [2, "היקף משולש שווה שוקיים 25 ס״מ, וכל שוק 9 ס״מ. מה אורך הבסיס?", false, false], [3, "האם משולש חד־זווית יכול להיות שווה שוקיים? סרטטו דוגמה.", true, true], [3, "האם משולש שונה צלעות יכול להיות גם שווה שוקיים? נמקו.", false, false], [4, "היקף משולש שווה שוקיים 22 ס״מ, ואחת הצלעות 6 ס״מ. מצאו שתי אפשרויות לאורכי הצלעות.", true, true], [4, "סרטטו משולש שהוא גם קהה־זווית וגם שווה שוקיים. סמנו את השוקיים, הבסיס וזווית הראש.", false, false]], "book": {"כיתה": [], "בית": []}}, "11": {"cls": [[1, "שתי זוויות במשולש: ⟦55°⟧ ו־⟦75°⟧. מהי הזווית השלישית?", true, false], [1, "מהו סכום הזוויות במשולש?", true, false], [1, "שתי זוויות במשולש: ⟦49°⟧ ו־⟦85°⟧. מהי השלישית?", false, false], [2, "במשולש ישר־זווית, זווית חדה אחת ⟦28°⟧. מהי הזווית החדה השנייה?", true, false], [2, "במשולש שווה שוקיים זווית בסיס אחת ⟦70°⟧. מהן שתי הזוויות האחרות?", true, false], [2, "מה גודל כל זווית במשולש שווה צלעות? (רמז: כל זוויותיו שוות)", false, false], [3, "במשולש שווה שוקיים זווית הראש ⟦110°⟧. מה גודל כל זווית בסיס?", true, false], [3, "במשולש ABC: ⟦∠A = 70°⟧, ⟦∠B = 50°⟧. CD חוצה את הזווית C. מהי הזווית ACD?", false, false], [4, "במשולש שווה שוקיים אחת הזוויות ⟦40°⟧. מצאו את שתי האפשרויות לזוויות המשולש.", true, false], [4, "האם ייתכן משולש שווה שוקיים שבו זווית בסיס היא ⟦95°⟧? נמקו.", false, false]], "home": [[1, "שתי זוויות במשולש: ⟦65°⟧ ו־⟦45°⟧. מהי הזווית השלישית?", true, true], [1, "שתי זוויות במשולש: ⟦113°⟧ ו־⟦36°⟧. מהי השלישית?", true, false], [1, "שתי זוויות במשולש: ⟦90°⟧ ו־⟦20°⟧. מהי השלישית?", false, false], [2, "במשולש ישר־זווית, זווית חדה אחת ⟦40°⟧. מהי הזווית החדה השנייה?", true, true], [2, "משולש ישר־זווית הוא גם שווה שוקיים. מה גודל זוויות הבסיס?", true, false], [2, "במשולש שווה שוקיים זווית בסיס ⟦65°⟧. מהן שתי הזוויות האחרות?", false, false], [3, "במשולש שווה שוקיים זווית הראש ⟦80°⟧. מה גודל כל זווית בסיס?", true, true], [3, "רגלי סולם פתוח שוות באורכן, וכל רגל יוצרת עם הרצפה זווית של ⟦70°⟧. מה הזווית בין הרגליים למעלה?", false, false], [4, "במשולש שווה שוקיים אחת הזוויות ⟦70°⟧. מצאו את שתי האפשרויות לזוויות המשולש.", true, true], [4, "במשולש ישר־זווית, זווית חדה אחת גדולה פי 2 מהזווית החדה השנייה. מצאו את זוויות המשולש.", false, false]], "book": {"כיתה": [], "בית": []}}, "12": {"cls": [[1, "מהו סכום הזוויות במרובע?", true, false], [1, "שלוש זוויות במרובע: ⟦80°⟧, ⟦100°⟧, ⟦70°⟧. מהי הרביעית?", true, false], [1, "מה גודל כל זווית בריבוע? בדקו שהסכום ⟦360°⟧.", false, false], [2, "לעפיפון 4 זוויות. שתיים מהן ⟦120°⟧, ואחת ⟦70°⟧. מהי הרביעית?", true, false], [2, "שלוש פינות של מגרש: ⟦90°⟧, ⟦85°⟧, ⟦95°⟧. מהי הרביעית? האם המגרש מלבני?", true, false], [2, "במרובע שתי זוויות של ⟦75°⟧, ושתי הזוויות האחרות שוות זו לזו. מה גודלן?", false, false], [3, "במרובע שלוש זוויות שוות, והרביעית ⟦30°⟧. מה גודל כל אחת מהשלוש?", true, false], [3, "הסבירו למה סכום הזוויות במרובע הוא ⟦360°⟧.", false, false], [4, "האם ייתכן מרובע שכל זוויותיו חדות? נמקו.", false, false], [4, "הסבירו: מרובע שיש בו 3 זוויות ישרות הוא מלבן.", true, false]], "home": [[1, "שלוש זוויות במרובע: ⟦90°⟧, ⟦90°⟧, ⟦110°⟧. מהי הרביעית?", true, true], [1, "שלוש זוויות במרובע: ⟦120°⟧, ⟦60°⟧, ⟦120°⟧. מהי הרביעית?", true, false], [1, "שלוש זוויות במרובע: ⟦100°⟧, ⟦100°⟧, ⟦100°⟧. מהי הרביעית?", false, false], [2, "לעפיפון 4 זוויות. שתיים מהן ⟦115°⟧, ואחת ⟦50°⟧. מהי הרביעית?", true, true], [2, "במרובע זווית אחת ⟦50°⟧, השנייה גדולה ממנה ב־⟦30°⟧, והשלישית ⟦120°⟧. מהי הרביעית?", true, false], [2, "במרובע שתי זוויות של ⟦65°⟧, ושתי הזוויות האחרות שוות זו לזו. מה גודלן?", false, false], [3, "במרובע שלוש זוויות שוות, והרביעית ⟦120°⟧. מה גודל כל אחת מהשלוש?", true, true], [3, "האם ייתכן מרובע שזוויותיו ⟦100°⟧, ⟦100°⟧, ⟦100°⟧, ⟦70°⟧? נמקו.", false, false], [4, "האם ייתכן מרובע ששלוש מזוויותיו קהות? תנו דוגמה או נמקו.", true, true], [4, "האם ייתכן מרובע שבו שלוש זוויות חדות? תנו דוגמה או נמקו.", false, false]], "book": {"כיתה": [], "בית": []}}, "13": {"cls": [[1, "השלימו: צורות חופפות הן צורות ש…", true, false], [1, "שני ריבועים, לכל אחד צלע של 3 ס״מ. האם הם חופפים? נמקו.", true, false], [1, "הזיזו את ⟦B(2, 3)⟧ 4 יחידות ימינה.", false, false], [2, "קודקודי משולש: ⟦(2, 1)⟧, ⟦(5, 1)⟧, ⟦(2, 4)⟧. הזיזו אותו יחידה ימינה ו־2 יחידות למעלה.", true, false], [2, "הנקודה ⟦(6, 5)⟧ הוזזה 4 יחידות שמאלה ו־2 יחידות למטה. לאן הגיעה?", true, false], [2, "הזיזו את ⟦C(5, 6)⟧ 2 יחידות למטה ויחידה ימינה.", false, false], [3, "שני מלבנים ששטח כל אחד 12 סמ״ר. האם הם בהכרח חופפים? תנו דוגמה.", true, false], [3, "צורה הוזזה. האם האורכים והזוויות שלה השתנו? מה זה אומר על הצורה החדשה?", false, false], [4, "משולש הוזז: ⟦A(2, 1)⟧ עבר ל־⟦A′(5, 3)⟧. לאן עבר ⟦B(4, 2)⟧? נמקו.", true, false], [4, "הנקודה ⟦A(2, 2)⟧ עברה ל־⟦A′(5, 6)⟧. תארו את ההזזה.", false, false]], "home": [[1, "הזיזו את ⟦A(2, 1)⟧ 2 יחידות ימינה ו־3 יחידות למעלה.", true, true], [1, "הזיזו את ⟦D(4, 5)⟧ 3 יחידות שמאלה.", true, false], [1, "הזיזו את ⟦C(5, 6)⟧ 2 יחידות למטה.", false, false], [2, "קודקודי משולש: ⟦(1, 1)⟧, ⟦(3, 1)⟧, ⟦(1, 4)⟧. הזיזו אותו 3 יחידות ימינה ויחידה למעלה.", true, true], [2, "הנקודה ⟦(6, 5)⟧ הוזזה 3 יחידות שמאלה ו־2 יחידות למטה. לאן הגיעה?", true, false], [2, "בטפט, פרח שנמצא ב־⟦(2, 1)⟧ חוזר כל 3 יחידות ימינה. איפה נמצא הפרח הרביעי?", false, false], [3, "משולש הוזז. האם הזוויות שלו השתנו? נמקו.", true, true], [3, "ציור הוגדל פי 2. האם הוא חופף לציור המקורי? נמקו.", false, false], [4, "משולש הוזז: ⟦A(1, 2)⟧ עבר ל־⟦A′(3, 5)⟧. לאן עבר ⟦B(4, 2)⟧? נמקו.", true, true], [4, "מלבן שקודקודיו ⟦(1, 1)⟧, ⟦(4, 1)⟧, ⟦(4, 3)⟧, ⟦(1, 3)⟧ הוזז כך ש־⟦(1, 1)⟧ עבר ל־⟦(3, 4)⟧. מצאו את שאר הקודקודים.", false, false]], "book": {"כיתה": [], "בית": []}}, "14": {"cls": [[1, "האות p הפכה לאות q. איזו טרנספורמציה זו?", true, false], [1, "שקפו את ⟦A(1, 3)⟧ בישר ⟦x = 4⟧.", true, false], [1, "שקפו את ⟦B(4, 1)⟧ בישר ⟦x = 6⟧.", false, false], [2, "שקפו את המשולש ⟦(2, 1)⟧, ⟦(3, 1)⟧, ⟦(2, 3)⟧ בישר ⟦x = 5⟧.", true, false], [2, "שקפו את ⟦(2, 1)⟧ בישר האופקי ⟦y = 3⟧.", true, false], [2, "לאן עוברת בשיקוף נקודה שנמצאת על ישר השיקוף?", false, false], [3, "האם הצורה המשתקפת חופפת לצורה המקורית? נמקו.", false, false], [3, "על חזית אמבולנס המילה כתובה הפוך. למה? באיזו טרנספורמציה מדובר?", true, false], [4, "הנקודה ⟦(1, 4)⟧ עברה ל־⟦(7, 4)⟧. הציעו שתי טרנספורמציות שונות שעושות זאת.", true, false], [4, "הנקודה ⟦A(1, 4)⟧ שוקפה ל־⟦A′(9, 4)⟧. מהו ישר השיקוף?", false, false]], "home": [[1, "שקפו את ⟦A(3, 2)⟧ בישר ⟦x = 5⟧.", true, true], [1, "שקפו את ⟦(2, 4)⟧ בישר ⟦x = 4⟧.", true, false], [1, "שקפו את ⟦(6, 2)⟧ בישר האופקי ⟦y = 4⟧.", false, false], [2, "שקפו את המשולש ⟦(1, 2)⟧, ⟦(2, 2)⟧, ⟦(1, 5)⟧ בישר ⟦x = 4⟧.", true, true], [2, "שקפו את הריבוע ⟦(1, 1)⟧, ⟦(3, 1)⟧, ⟦(3, 3)⟧, ⟦(1, 3)⟧ בישר ⟦x = 4⟧.", true, false], [2, "שקפו את ⟦(3, 5)⟧ בישר ⟦x = 4⟧.", false, false], [3, "מסתכלים במראה על האות b. איזו אות רואים? האם היא חופפת ל־b? נמקו.", true, true], [3, "האם שיקוף יכול להחליף בין \"ימין\" ל\"שמאל\" של צורה? הסבירו בדוגמה.", false, false], [4, "הנקודה ⟦(3, 2)⟧ עברה ל־⟦(7, 2)⟧. הציעו שתי טרנספורמציות שונות שעושות זאת.", true, true], [4, "מלבן שקודקודיו ⟦(0, 0)⟧, ⟦(4, 0)⟧, ⟦(4, 2)⟧, ⟦(0, 2)⟧ שוקף בישר ⟦x = 4⟧. מה השטח של שני המלבנים יחד?", false, false]], "book": {"כיתה": [], "בית": []}}, "15": {"cls": [[1, "המחוג הגדול של שעון זז מ־12 ל־3. איזו טרנספורמציה זו? בכמה מעלות?", true, false], [1, "המחוג הגדול של שעון זז מ־12 ל־9 בכיוון השעון. בכמה מעלות הסתובב?", true, false], [1, "האם מרכז הסיבוב זז בסיבוב?", false, false], [2, "סובבו את ⟦A(5, 2)⟧ ב־⟦90°⟧ נגד כיוון השעון סביב ⟦O(2, 2)⟧.", true, false], [2, "סובבו את ⟦(3, 1)⟧ ב־⟦90°⟧ נגד כיוון השעון סביב ⟦(1, 1)⟧.", true, false], [2, "האם צורה מסובבת חופפת לצורה המקורית? נמקו.", false, false], [3, "סובבו את ⟦(7, 3)⟧ ב־⟦180°⟧ סביב ⟦(4, 3)⟧.", true, false], [3, "סובבו את ⟦(3, 5)⟧ ב־⟦180°⟧ סביב ⟦(3, 3)⟧.", false, false], [4, "מסובבים צורה 4 פעמים ב־⟦90°⟧ באותו כיוון סביב אותה נקודה. איפה תהיה הצורה? נמקו.", false, false], [4, "הנקודה ⟦(5, 3)⟧ סובבה סביב ⟦(3, 3)⟧ והגיעה ל־⟦(3, 5)⟧. איזה סיבוב זה?", true, false]], "home": [[1, "המחוג הגדול של שעון זז מ־12 ל־6. איזו טרנספורמציה זו? בכמה מעלות?", true, true], [1, "המחוג הגדול של שעון זז מ־12 ל־3. בכמה מעלות הסתובב?", true, false], [1, "כמה מעלות יש בסיבוב שלם?", false, false], [2, "סובבו את ⟦A(4, 2)⟧ ב־⟦90°⟧ נגד כיוון השעון סביב ⟦O(2, 2)⟧.", true, true], [2, "סובבו את ⟦(5, 3)⟧ ב־⟦180°⟧ סביב ⟦(3, 3)⟧.", true, false], [2, "סובבו את ⟦(2, 4)⟧ ב־⟦90°⟧ בכיוון השעון סביב ⟦(2, 2)⟧.", false, false], [3, "סובבו את ⟦(5, 4)⟧ ב־⟦180°⟧ סביב ⟦(3, 4)⟧.", true, true], [3, "בסיבוב של ⟦180°⟧ סביב ⟦(3, 3)⟧, האם יש נקודה שלא זזה? איזו?", false, false], [4, "מסובבים צורה פעמיים ב־⟦90°⟧ נגד כיוון השעון סביב אותה נקודה. איזה סיבוב אחד עושה אותו דבר?", false, true], [4, "הנקודה ⟦(5, 2)⟧ סובבה סביב ⟦(2, 2)⟧ והגיעה ל־⟦(2, 5)⟧. איזה סיבוב זה?", true, false]], "book": {"כיתה": [], "בית": []}}};
const TQCSS=`<style>.tq{padding-inline-start:2.4cqw;margin:.4cqw 0}.tq li{break-inside:avoid;font-size:1.6cqw;line-height:1.35;margin:0 0 .35cqw}
.tq .mb{display:inline-block;border:1.5px solid #f5b83d;color:#f5b83d;border-radius:.4cqw;padding:0 .4cqw;font-size:1.25cqw;font-weight:800;margin-inline-end:.3cqw}
.tq .tw{color:#8fe3b5;font-size:1.05cqw;font-weight:700}.bk{font-size:1.4cqw;margin:.2cqw 0 .5cqw}</style>`;
const tqx=t=>t.replace(/⟦(.*?)⟧/g,(m,x)=>eq(x));
const TSL=n=>{const d=TASKS[n];return [['cls','בכיתה','כיתה','פותרים בזוגות. מתחילים במשימות שמסומנות חובה.'],['home','בבית','בית','פותרים לבד. כותבים בדף כמה זמן לקח.']].map(([k,w,bw,note])=>
 H(`משימות ${w} · שיעור ${n}`,`${w}: 10 משימות מהדף`,TQCSS+`<p class="bk">${note}${d.book[bw].length?` &nbsp;<b>וגם בספר:</b> ${d.book[bw].join(' · ')}`:''}</p><ol class="tq">${d[k].map(([l,t,m,tw])=>`<li>${m?'<span class="mb">חובה</span>':''}${stars(l)} ${tqx(t)}${tw?' <span class="tw">(כמו הדוגמה בשיעור)</span>':''}</li>`).join('')}</ol>`));};
/* ===== ז׳ · נובמבר · 10 שיעורים · מבנה קבוע לכל שיעור =====
   שער (נושא + מטרות + למה) · כניסה · מושגים · רעיון · טעות נפוצה · 4 רמות · תרגול · יציאה */
const LCSS=`<style>.lay{display:grid;grid-template-columns:1fr 1.2fr;gap:1.6cqw;align-items:center}
.lay svg{width:100%;height:auto;max-height:23cqw}.lay .pair{flex-direction:column;align-items:stretch;gap:.25cqw;margin-bottom:.7cqw}
.lay .pair>.eqc{font-size:2.3cqw}.lay .pair .card{font-size:1.45cqw;padding:.5cqw 1cqw}
.src{display:none;font-size:1.15cqw;font-weight:600;color:#9fb3cf;border:1px solid #2b4466;border-radius:.6cqw;padding:.05cqw .6cqw;margin-inline-start:.8cqw;vertical-align:middle}
.gl li{font-size:1.9cqw;margin:.3cqw 0}.why{border-inline-start:.4cqw solid ${DST};padding:.4cqw 1.2cqw;font-size:1.8cqw;margin-top:1cqw}
.tbl td.d{text-align:right;font-size:1.7cqw}.slide{position:relative}.tomenu{position:absolute;top:.8cqw;left:1cqw;font-size:1.25cqw;padding:.3cqw .9cqw;border-radius:1cqw;border:1px solid #2b4466;background:#14243b;color:#cfe0f5;cursor:pointer;z-index:5}.tbl td.t{font-size:1.9cqw}</style>`;
const fx=t=>String(t).replace(/(<[^>]*>)|(−?\d+(\.\d+)?°)/g,(m,tag)=>tag?tag:eq(m));
const LAY=(pic,steps)=>`<div class="lay"><div>${steps}</div><div>${pic}</div></div>`;
const DEG=v=>`<bdi dir="ltr" style="color:${colOf(v)};font-weight:800;unicode-bidi:isolate">${num(v)}°</bdi>`;
const SRC=t=>`<span class="src">${t}</span>`;
const MOD=n=>SRC('מאגר המודל: '+n);
const SUP=SRC('שאלה משלימה');
const BANK=SRC('מאגר השליטה (אין בוחן במודל)');
const ADPT=SRC('מותאם ממאגר המודל: ברביע הראשון');
const A1=MOD('חיבור מספרים מכוונים – על ציר המספרים'),A2=MOD('חיבור מספרים מכוונים'),A3=MOD('השלם את החסר – חיבור מכוונים'),A4=MOD('חיבור מספרים בשרשרת'),A5=MOD('חישוב השינוי בין מספרים מכוונים');
const H=(eyebrow,title,body)=>({html:CSS+LCSS+GCSS+L2CSS+SPIN_CSS+`<button type="button" class="tomenu" data-to="lmenu">☰ בחירת שיעור</button><div class="eyebrow">${eyebrow}</div><h2>${title}</h2>${body}`});
const E=x=>eq(x);
const add=(a,b)=>PNc(a)+' + '+PNc(b);
const Q=(e,a)=>`<li>${e} <span class="ans step">${a}</span></li>`;
const QX=(e,a)=>`<li>${e}${e.includes('class="src"')?'':SUP} <span class="ans step">${a}</span></li>`;
const COV=(id,n,t,sub,idea,goals,why)=>({html:CSS+LCSS+`<button type="button" class="tomenu" data-to="lmenu">☰ בחירת שיעור</button><div class="cover row" id="${id}"><div class="col"><div class="num" style="font-size:6cqw">שיעור ${n}</div><h1 style="font-size:4.6cqw">${t}</h1><p class="muted">${sub}</p>
<p style="font-size:2.1cqw"><b>הרעיון:</b> ${fx(idea)}</p><ul class="gl">${goals.map(g=>`<li class="step">היום נדע ${fx(g)}</li>`).join('')}</ul><div class="why step"><b>למה צריך את זה?</b> ${fx(why)}</div></div></div>`});
const TERMS=rows=>H('מושגים','מושגים מתמטיים חשובים',`<table class="tbl"><tr><th>מושג</th><th>מה זה אומר?</th><th>דוגמה</th></tr>${rows.map(r=>`<tr class="step"><td class="t">${r[0]}</td><td class="d">${fx(r[1])}</td><td>${r[2]||''}</td></tr>`).join('')}</table>`);
const ENTRY=(items,pre='')=>H('כרטיס כניסה · 5 דקות','נזכרים במה שכבר יודעים',pre+`<ol class="qlist">${items.join('')}</ol>`);
const EXIT=items=>H('כרטיס יציאה · לבד','שלוש שאלות',`<ol class="qlist">${items.join('')}</ol>`);
const PRAC=(rule,extra='',mo=[])=>H('תרגול','תרגול בכיתה ובבית',`<ul><li class="step"><b>בכיתה:</b> 10 משימות בדף "משימות לכיתה ולבית", בכל הרמות. מתחילים במשימות שמסומנות <b>חובה</b>. פותרים בזוגות.</li><li class="step"><b>בבית:</b> עוד 10 משימות באותו דף, בכל הרמות. ליד משימה שכתוב בה "כמו הדוגמה בשיעור" – חוזרים לדוגמה הפתורה מהמצגת.</li>${extra}<li class="step"><b>במודל:</b> ${mo.length?mo.map(x=>'"'+x+'"').join(' · '):'אין בוחן לנושא הזה. מתרגלים בדף.'}</li></ul><div class="rule step">${fx(rule)}</div>`);
const LV=(n,name,tag,title,body)=>H(stars(n)+' '+name+tag,title,body);

/* ---------- שיעור 1 · ערך מוחלט ---------- */
const TOM=`<button type="button" class="tomenu" data-to="lmenu">☰ בחירת שיעור</button>`;
const SA=[
COV('l0',1,'ערך מוחלט – המרחק מ־0','כיתה ז׳ · מספרים מכוונים','ערך מוחלט עונה על השאלה "כמה רחוק מ־0?" ולא על "לאיזה כיוון?"',
 ['מה זה <b>ערך מוחלט</b>: כמה רחוק מספר מ־0','לחשב ערך מוחלט, גם כשבתוך הקווים יש תרגיל','להבדיל בין '+eq(AB(N(-3)))+' לבין '+eq(OP+AB('3'))],
 'בשיעורים הבאים נחבר ונחסר מספרים מכוונים. כדי לדעת איזה מספר "חזק" יותר, משווים ערכים מוחלטים.'),

{html:CSS+LCSS+TOM+`<div class="eyebrow">כרטיס כניסה · 5 דקות</div><h2>נזכרים במספרים מכוונים</h2>
<ol class="qlist">
<li>סמנו על ציר המספרים את ${eq(N(-4))} ואת ${eq(N(4))}. כמה צעדים כל אחד מ־0? <span class="ans step">שניהם 4 צעדים</span></li>
<li>מהו המספר הנגדי של ${eq(N(-6))}? <span class="ans step">${eq('6')}</span></li>
<li>איזה מספר גדול יותר: ${eq(N(-7))} או ${eq(N(-2))}? <span class="ans step">${eq(N(-2))}, כי הוא ימינה יותר על הציר</span></li>
<li>${eq('('+N(-3)+') + 3 =')} <span class="ans step">${eq('0')} – זוג אפס</span></li>
</ol>`},

{html:CSS+LCSS+TOM+`<div class="eyebrow">נזכרים · מספרים נגדיים</div><h2>חץ מ־0 אל 3 מסתובב חצי סיבוב</h2>
${svg('0 0 800 230',nlBase(-5,5,150)+`<g class="rot" data-rot="rotate(180deg)" style="transform-origin:${nlX(0,-5,5)}px 150px"><line x1="${nlX(0,-5,5)}" y1="150" x2="${nlX(3,-5,5)-16}" y2="150" stroke="${DST}" stroke-width="8" stroke-linecap="round"/><path d="M${nlX(3,-5,5)-24} 136L${nlX(3,-5,5)} 150L${nlX(3,-5,5)-24} 164z" fill="${DST}"/></g>
<text class="step" x="${nlX(0,-5,5)}" y="70" font-size="28" text-anchor="middle" style="fill:${DST};font-weight:700">סיבוב 180° סביב 0</text>`)}
<p class="step">${eq('3')} ו־${eq(N(-3))} הם <b>מספרים נגדיים</b>: הם נמצאים <b>באותו מרחק</b> מ־0, אבל <b>בצדדים שונים</b>.</p>
<p class="step">${eq('3 + ('+N(-3)+') = 0')}</p>`},

{html:CSS+LCSS+TOM+`<div class="eyebrow">למה יש מינוס בכלל?</div><h2>מספר מכוון מספר לנו שני דברים בבת אחת</h2>
<p class="huge" dir="ltr"><span style="color:${NEG}">${M}</span>3</p>
<div class="two">
<div class="card step" style="border-color:${NEG}"><b style="color:${NEG}">הסימן אומר לאיזה כיוון</b><br>מעל או מתחת ל־0, רווח או חוב, למעלה או למטה</div>
<div class="card step" style="border-color:${DST}"><b style="color:${DST}">המספר אומר כמה</b><br>כמה צעדים, כמה קומות, כמה מעלות</div>
</div>
<p class="step big2">${eq(N(-3))} במעלית = "3 קומות, ${NEGT('למטה')}"</p>`},

{html:CSS+LCSS+TOM+`<div class="eyebrow">למה צריך את זה?</div><h2>שתי מעליות יוצאות מקומה 0. מי נסעה יותר?</h2>
<div class="row"><div class="vis" style="flex:1.4">${elevator()}</div>
<div class="col">
<p class="step">${POST('הירוקה')} עלתה לקומה ${eq(N(3))}</p>
<p class="step">${NEGT('האדומה')} ירדה לקומה ${eq(N(-3))}</p>
<p class="step" style="font-size:2.6cqw;font-weight:900;color:${DST}">שתיהן נסעו 3 קומות!</p>
<p class="step">הסימן אמר <b>לאן</b>. המספר אמר <b>כמה</b>.</p>
</div></div>`},

{html:CSS+LCSS+TOM+`<div class="eyebrow">לפעמים הכיוון לא מעניין אותנו</div><h2>במדבר +8°, בחרמון ${eq(N(-8))}°. איפה רחוק יותר מ־0°?</h2>
<div class="row"><div class="vis" style="flex:1.3">${thermo()}</div>
<div class="col">
<p class="step">בשני המקומות: ${DT('8 מעלות')} מ־0°.</p>
<div class="card step"><b>בבנק:</b> חוב של ${eq(N(-500))} ₪.<br>"כמה כסף אני חייבת?" ← ${DT('500 ₪')}</div>
<p class="step">שאלה על <b>הגודל בלבד</b>, בלי הכיוון.</p>
</div></div>`},

{html:CSS+LCSS+TOM+`<div class="eyebrow">איך זה נולד?</div><h2>אנשים הבינו מזמן: כמות לחוד, כיוון לחוד</h2>
${timeline()}
<p class="step">ערך <b>מוחלט</b> = הגודל <b>בלי הכיוון</b>. מה שנשאר הוא <b>המרחק מ־0</b>.</p>`},

{html:CSS+LCSS+TOM+`<div class="eyebrow">המשפט של היום</div><h2>כל מספר מכוון = כיוון + מרחק</h2>
${splitter(-5)}
<p class="step big2">הסימן הוא ${NEGT('הכיוון')}. הערך המוחלט הוא ${DT('המרחק')}.</p>`},



{html:CSS+LCSS+TOM+`<div class="eyebrow">מה עושים היום בכיתה?</div><h2>מסלול השיעור</h2>
<ol>
<li>כרטיס כניסה ותזכורת: מספרים נגדיים</li>
<li>למה צריך ערך מוחלט? מעליות, טמפרטורות, בנק</li>
<li>הרעיון המרכזי: מרחק על ציר המספרים</li>
<li>שתי טעויות שכדאי להכיר</li>
<li>4 דוגמאות פתורות ${stars(1)} עד ${stars(4)}</li>
<li>תרגול בכיתה וכרטיס יציאה</li>
</ol>`},

{html:CSS+LCSS+TOM+`<div class="eyebrow">הרעיון המרכזי</div><h2>ערך מוחלט = המרחק של מספר מ־0</h2>
${mainSvg}
<p class="step big2">${eq(AB(N(-5))+' = 5')} &nbsp; וגם &nbsp; ${eq(AB(N(5))+' = 5')}</p>
<div class="rule step">הערך המוחלט של מספר הוא <b>המרחק שלו מ־0</b> על ציר המספרים. כותבים אותו בין שני קווים: ${eq(AB('a'))}</div>`},

TERMS([['מספרים נגדיים','שני מספרים באותו מרחק מ־0, בצדדים שונים של 0',eq('3')+' ו־'+eq(N(-3))],
 ['ערך מוחלט','המרחק של מספר מ־0 על ציר המספרים',eq(AB(N(-5))+' = 5')],
 ['הסימן של מספר מכוון','אומר לאיזה כיוון: ימינה (חיובי) או שמאלה (שלילי) מ־0',eq(N(-5))+': שמאלה'],
 ['מינוס לפני ערך מוחלט','"הנגדי של" הערך המוחלט; פועל אחרי הקווים',eq(OP+AB('3')+' = '+N(-3))]]),

{html:CSS+LCSS+TOM+`<div class="eyebrow">מה הקווים עושים?</div><h2>הקווים זורקים את הכיוון ושומרים את הגודל</h2>
${machine()}
<p class="step">קוראים: "הערך המוחלט של מינוס 5".</p>
<p class="step">ומה עם ${eq(AB('5'))}? אין כיוון שלילי לזרוק, ולכן ${eq(AB('5')+' = 5')}. וגם ${eq(AB('0')+' = 0')}.</p>`},

{html:CSS+LCSS+TOM+`<div class="eyebrow">שלושה דברים שתמיד נכונים</div><h2>מרחק לא יכול להיות שלילי</h2>
<ol>
<li class="step">הערך המוחלט של מספר הוא <b>תמיד חיובי או 0</b>. אין מרחק שלילי.</li>
<li class="step">לשני <b>מספרים נגדיים</b> יש אותו ערך מוחלט: ${eq(AB(N(7))+' = '+AB(N(-7))+' = 7')}</li>
<li class="step">רק למספר 0 יש ערך מוחלט 0: ${eq(AB('0')+' = 0')}</li>
</ol>`},

{html:CSS+LCSS+TOM+`<div class="eyebrow">טעות נפוצה 1</div><h2>"ערך מוחלט = מוחקים את המינוס"?</h2>
<p class="big2">${eq(AB('('+N(-5)+') + 2'))}</p>
<p class="step big2"><span class="wrong">${eq('5 + 2 = 7')}</span> <span style="color:${NEG}">✗</span></p>
${P('('+N(-5)+') + 2 = '+N(-3),1,'קודם מחשבים <b>בתוך</b> הקווים, כמו בסוגריים.')}
${P(AB(N(-3))+' = 3',2,'רק עכשיו ערך מוחלט: המרחק של −3 מ־0.')}
<div class="rule step">הקווים הם כמו סוגריים: <b>קודם מחשבים בפנים</b>, ורק בסוף לוקחים את המרחק.</div>`},

{html:CSS+LCSS+TOM+`<div class="eyebrow">טעות נפוצה 2 · המינוס שבחוץ</div><h2>קוראים כל ביטוי בקול</h2>
<table class="tbl">
<tr><th>הביטוי</th><th>קוראים</th><th>הערך</th></tr>
<tr class="step"><td>${eq(AB('3'))}</td><td>הערך המוחלט של 3</td><td class="ans">${eq('3')}</td></tr>
<tr class="step"><td>${eq(AB(N(-3)))}</td><td>הערך המוחלט של מינוס 3</td><td class="ans">${eq('3')}</td></tr>
<tr class="step"><td>${eq(OP+AB('3'))}</td><td>${PUR('הנגדי של')} הערך המוחלט של 3</td><td>${eq(N(-3))}</td></tr>
<tr class="step"><td>${eq(OP+AB(N(-3)))}</td><td>${PUR('הנגדי של')} הערך המוחלט של מינוס 3</td><td>${eq(N(-3))}</td></tr>
</table>
<p class="step">${PUR('המינוס שבחוץ')} פועל <b>אחרי</b> הקווים. קודם המרחק, ואחר כך הנגדי.</p>`},
{html:CSS+LCSS+TOM+SPIN_CSS+`<div class="eyebrow">למה מינוס מינוס זה פלוס?</div><h2>כל מינוס = "הנגדי של" = חצי סיבוב סביב 0</h2>
${doubleSpin()}
<div class="rule step">שני סיבובים מחזירים למקום. לכן ${eq(OP+'('+N(-3)+') = 3')}: הנגדי של הנגדי.</div>`},

{html:CSS+LCSS+TOM+SPIN_CSS+`<div class="eyebrow">ולמה ${eq(OP+AB(N(-3)))} לא יוצא פלוס?</div><h2>הקווים בולעים את המינוס שבפנים</h2>
${swallow()}
<div class="rule step">שני המינוסים לא נפגשים: קודם הקווים, ואז נשאר מינוס <b>אחד</b>.</div>`},

{html:CSS+LCSS+TOM+`<div class="eyebrow">למה בכלל לשים מינוס לפני ערך מוחלט?</div><h2>צוללת ירדה 5 מטרים</h2>
${submarine()}
<p class="step">הערך המוחלט נותן ${DT('מרחק')}. המינוס שבחוץ ${PUR('מחזיר כיוון')}: למטה.</p>`},


{html:CSS+LCSS+TOM+`<div class="lvl">${stars(1)} ידע</div><h2>חשבו: ${eq(AB(N(-7)))}</h2>
${svg('0 0 800 170',nlBase(-8,1,120)+pt(-7,-8,1,120,NEG)+arrowDraw(0,-7,-8,1,70,NEG,{cls:'step'})+countDots(0,-7,-8,1,70,NEG,{cls:'step'}))}
${P(AB(N(-7)),1,'קוראים: "הערך המוחלט של מינוס 7". שואלים: כמה רחוק −7 מ־0?')}
${P('7 צעדים',2,'סופרים את הצעדים מ־0 עד −7 על הציר.')}
${P(AB(N(-7))+' = 7',3,'המרחק הוא 7. מרחק תמיד חיובי.')}`},

{html:CSS+LCSS+TOM+`<div class="lvl">${stars(2)} יישום</div><h2>חשבו: ${eq(AB('('+N(-6)+') + 2'))}</h2>
${chips()}
${P('('+N(-6)+') + 2 = '+N(-4),1,'קודם בתוך הקווים: 2 זוגות אפס נעלמים, נשארים 4 אדומים.')}
${P(AB(N(-4))+' = 4',2,'עכשיו ערך מוחלט: המרחק של −4 מ־0 הוא 4.')}
<p class="step">שימו לב: התשובה היא ${eq('4')}, ולא <span class="wrong">${eq('6 + 2 = 8')}</span>.</p>`},

{html:CSS+LCSS+TOM+`<div class="lvl">${stars(3)} הבנה ונימוק · ניתוח טעות</div><h2>דניאל כתב: ${eq(OP+AB(N(-8))+' = 8')}. איפה הטעות?</h2>
${P(AB(N(-8))+' = 8',1,'קודם מה שבתוך הקווים: המרחק של −8 מ־0 הוא 8.')}
${P(OP+AB(N(-8))+' = '+N(-8),2,'המינוס <b>שבחוץ</b> הוא "הנגדי של". הנגדי של 8 הוא −8.')}
<div class="rule step">הטעות של דניאל: הוא חשב "מינוס ומינוס זה פלוס". אבל הקווים כבר "בלעו" את המינוס שבפנים, ונשאר רק מינוס אחד: ${PUR('הנגדי של 8')}.</div>`},

{html:CSS+LCSS+TOM+`<div class="lvl">${stars(4)} חשיבה מסדר גבוה</div><h2>מצאו את <u>כל</u> המספרים שהמרחק שלהם מ־0 הוא 4</h2>
${svg('0 0 800 180',nlBase(-6,6,130)+arrowDraw(0,4,-6,6,80,POS,{cls:'step'})+arrowDraw(0,-4,-6,6,80,NEG,{cls:'step'}))}
${P(AB('4')+' = 4',1,'הולכים 4 צעדים ימינה מ־0.')}
${P(AB(N(-4))+' = 4',2,'אפשר ללכת 4 צעדים גם שמאלה! יש שני מספרים כאלה, והם נגדיים.')}
${P(BAR+'?'+BAR+' = '+N(-2),3,'ויש מספר שהערך המוחלט שלו −2? <b>אין!</b> מרחק לא יכול להיות שלילי.')}`},

{html:CSS+LCSS+TOM+`<div class="eyebrow">תרגול בכיתה · חלק א׳ · כמו בדף</div><h2>חשבו</h2>
<div class="two"><ol class="qlist">
<li>${stars(1)} ${eq(AB(N(-9))+' =')} <span class="ans step">${eq('9')}</span></li>
<li>${stars(1)} ${eq(AB('12')+' =')} <span class="ans step">${eq('12')}</span></li>
<li>${stars(1)} ${eq(AB('0')+' =')} <span class="ans step">${eq('0')}</span></li>
</ol><ol class="qlist" start="4">
<li>${stars(2)} ${eq(AB('('+N(-3)+') + ('+N(-4)+')')+' =')} <span class="ans step">${eq('7')}</span></li>
<li>${stars(2)} ${eq(AB(N(-5))+' + '+AB('3')+' =')} <span class="ans step">${eq('8')}</span></li>
<li>${stars(2)} ${eq(OP+AB('6')+' =')} <span class="ans step">${eq(N(-6))}</span></li>
</ol></div>`},

{html:CSS+LCSS+TOM+`<div class="eyebrow">תרגול בכיתה · חלק ב׳ · כמו בדף</div><h2>חושבים ומנמקים</h2>
<ol class="qlist" start="7">
<li>${stars(3)} השלימו סימן גדול, קטן או שווה: &nbsp; ${eq(AB(N(-6))+' &nbsp;☐&nbsp; '+AB('4'))} <span class="ans step">${eq(AB(N(-6))+' &gt; '+AB('4'))}, כי 6 גדול מ־4</span></li>
<li>${stars(3)} השלימו סימן גדול, קטן או שווה: &nbsp; ${eq(OP+AB(N(-2))+' &nbsp;☐&nbsp; '+AB(N(-2)))} <span class="ans step">${eq(OP+AB(N(-2))+' &lt; '+AB(N(-2)))}, כי ${eq(N(-2))} קטן מ־2</span></li>
<li>${stars(4)} מצאו את כל המספרים שהערך המוחלט שלהם 9. <span class="ans step">${eq('9')} ו־${eq(N(-9))}</span></li>
<li>${stars(4)} <b>אוריינות:</b> צוללת בעומק ${eq(N(-5))} מטרים, וציפור בגובה 3 מטרים. מי רחוקה יותר מפני הים? נמקו. <span class="ans step">הצוללת: ${eq(AB(N(-5))+' = 5')}, ו־5 גדול מ־3</span></li>
</ol>`},



PRAC('ערך מוחלט = המרחק מ־0 · תמיד חיובי או 0','',['ערך מוחלט ומספר נגדי','השוואת מספרים']),
...TSL(1),

{html:CSS+LCSS+TOM+`<div class="eyebrow">מה לקחנו מהשיעור?</div><h2>הכלל</h2>
<div class="rule">כל מספר מכוון = ${NEGT('כיוון')} + ${DT('מרחק')}.<br>הערך המוחלט ${eq(AB('a'))} הוא <b>המרחק של a מ־0</b>, ולכן הוא תמיד חיובי או 0.</div>
<ul>
<li class="step">בתוך הקווים יש תרגיל? <b>קודם מחשבים בפנים.</b></li>
<li class="step">מינוס <b>מחוץ</b> לקווים? זה ${PUR('"הנגדי של"')}, והוא פועל בסוף.</li>
</ul>`},

{html:CSS+LCSS+TOM+`<div class="eyebrow">כרטיס יציאה</div><h2>שלוש שאלות, בלי עזרה</h2>
<ol class="qlist">
<li>${eq(AB(N(-11))+' =')} <span class="ans step">${eq('11')}</span></li>
<li>${eq(AB('('+N(-8)+') + 3')+' =')} <span class="ans step">${eq('5')}</span></li>
<li>נועה כתבה: ${eq(OP+AB(N(-4))+' = 4')}. האם צדקה? נמקו. <span class="ans step">לא. ${eq(AB(N(-4))+' = 4')}, והנגדי של 4 הוא ${eq(N(-4))}.</span></li>
</ol>`}
];

/* ---------- שיעור 1 ---------- */
const S1=[
COV('l1',2,'חיבור מספרים מכוונים','כיתה ז׳ · מספרים מכוונים','לחבר מספר = לזוז על ציר המספרים: מחברים מספר חיובי – זזים ימינה; מחברים מספר שלילי – זזים שמאלה.',
 ['לחבר מספרים מכוונים בעזרת תזוזה על ציר המספרים','לספר כל תרגיל חיבור כסיפור של הכנסה וחוב','לבדוק תשובה: האם זזתי לכיוון הנכון?'],
 'בכרטיס הקפיטריה של נועה יש 3 ₪. היא קונה כריך ב־5 ₪, והקפיטריה מרשה לה להיכנס לחוב. כמה יש לה עכשיו? '+E(add(3,-5)+' = ?')),
ENTRY([Q('איזה מספר גדול יותר: '+E(N(-2))+' או '+E(N(-6))+'?',E(N(-2))+', כי הוא מימין ל־'+E(N(-6))+' על הציר'),Q(E(AB(N(-5))+' ='),E('5')+', המרחק מ־0'),Q('מהו המספר הנגדי ל־'+E('4')+'?',E(N(-4))+': אותו מרחק מ־0, בצד השני'),Q('לנועה חוב של 3 ₪. איזה מספר מתאר אותו?',E(N(-3)))],svg('0 105 800 115',nlBase(-6,6,140))),
TERMS([['מספר חיובי','מספר גדול מ־0. על ציר המספרים: מימין ל־0',E(N(3))],['מספר שלילי','מספר קטן מ־0. על ציר המספרים: משמאל ל־0',E(N(-3))],['מספרים מכוונים','המספרים החיוביים, המספרים השליליים והמספר 0 (שאינו חיובי ואינו שלילי)',E(N(-2)+', 0, '+N(5))],['מחוברים וסכום','בתרגיל חיבור, המספרים שמחברים הם המחוברים, והתוצאה היא הסכום',E(add(3,-5)+' = '+N(-2))]]),
H('הרעיון המרכזי','לחבר = לזוז על הציר',`<div class="two"><div class="rule step" style="border-color:${POS}">מחברים ${POST('מספר חיובי')}: זזים <b>ימינה</b></div><div class="rule step" style="border-color:${NEG}">מחברים ${NEGT('מספר שלילי')}: זזים <b>שמאלה</b></div></div>`+
 LAY(walker(3,-5,-6,6),P(add(3,-5),1,'המחובר הראשון: לנועה יש 3 ₪. עומדים על 3.')+P(PNc(-5),2,'המחובר השני שלילי: הוצאה של 5 ₪. זזים 5 צעדים שמאלה.'))+P(add(3,-5)+' = '+N(-2),3,'נחתנו על −2: לנועה חוב של 2 ₪.')),
H('הטעות הנפוצה','חוב ועוד חוב – חוב גדול יותר',`<p class="step"><span class="wrong">${E(add(-3,-5)+' = 8')}</span></p>`+LAY(walker(-3,-5,-9,3),P(PNc(-3),1,'מתחילים בחוב של 3 ₪.')+P(PNc(-5),2,'מוסיפים עוד חוב של 5 ₪: זזים 5 צעדים שמאלה.'))+P(add(-3,-5)+' = '+N(-8),3,'שני חובות יחד = חוב גדול יותר: −8. מי שהוסיף חוב לא יכול להתעשר.')),
LV(1,'ידע',A1,E(add(-2,6)+' = ?'),LAY(walker(-2,6,-4,6),P(PNc(-2),1,'עומדים על −2: חוב של 2 ₪.')+P(PNc(6),2,'המחובר השני חיובי: הכנסה של 6 ₪. זזים 6 צעדים ימינה.'))+P(add(-2,6)+' = 4',3,'נחתנו על 4: החזרנו את החוב, ונשארו 4 ₪.')),
LV(2,'יישום',A1,'הטמפרטורה בבוקר הייתה '+DEG(-7)+'. עד הצהריים היא עלתה ב־'+DEG(4)+'. מה הטמפרטורה בצהריים?',LAY(walker(-7,4,-8,2),P(add(-7,4),1,'כותבים תרגיל: מתחילים ב־−7, ו"עלתה" היא תוספת של 4.')+P(PNc(4),2,'זזים 4 צעדים ימינה.'))+P(add(-7,4)+' = '+N(-3),3,'התוצאה −3, כלומר בצהריים 3 מעלות מתחת לאפס: חם יותר מבבוקר.')),
LV(3,'הבנה ונימוק · מצאו את הטעות',SUP,'יואב פתר: '+E(add(-6,2)+' = '+N(-8)),LAY(walker(-6,2,-9,1),P(PNc(2),1,'המחובר השני חיובי, ולכן זזים ימינה. יואב זז שמאלה.')+P(add(-6,2)+' = '+N(-4),2,'התשובה הנכונה: −4. חוב של 6 ₪, מחזירים 2 ₪: נשאר חוב של 4 ₪.'))+P(N(-8),3,'בדיקה: כשמחברים מספר חיובי, התוצאה מימין למחובר הראשון. −8 נמצא משמאל ל־−6, ולכן התשובה של יואב לא יכולה להיות נכונה.')),
LV(4,'חשיבה',A3,'השלימו: '+E(PNc(-3)+' + ☐ = 2'),LAY(walker(-3,5,-5,4),P(PNc(-3),1,'מתחילים ב־−3 ורוצים להגיע ל־2.')+P(PNc(5),2,'סופרים צעדים: מ־−3 עד 2 יש 5 צעדים ימינה, ולכן ☐ = +5.'))+P(add(-3,5)+' = 2',3,'בודקים: חוב של 3 ₪ והכנסה של 5 ₪: נשארים 2 ₪. ✔')+`<p class="step"><b>אתגר:</b> כתבו שני תרגילי חיבור <b>שונים</b> שהסכום שלהם ${E(N(-1))}.</p>`),
PRAC('מחברים מספר חיובי – ימינה · מחברים מספר שלילי – שמאלה','',['חיבור מספרים מכוונים – על ציר המספרים']),
...TSL(2),
EXIT([QX(E(add(4,-9)+' =')+MOD('פעולות במספרים מכוונים'),E(N(-5))),QX(E(add(-4,-3)+' =')+A1,E(N(-7))),QX('לדני היה חוב של 2 ₪, והוא קיבל 5 ₪. כתבו תרגיל ופתרו.',E(add(-2,5)+' = 3')+': נשארו לו 3 ₪')])
];

/* ---------- שיעור 2 ---------- */
const S2=[
COV('l2',3,'כללי הסימנים בחיבור','כיתה ז׳ · מספרים מכוונים','מהציר נולד קיצור דרך: מחברים או מחסרים את הערכים המוחלטים (שיעור 1), ובוחרים סימן.',
 ['לחבר שני מספרים באותו סימן בלי לצייר ציר','לחבר שני מספרים בסימנים שונים בלי לצייר ציר','להסביר כל כלל בעזרת הציר'],'איך נחשב '+E(add(-48,-27))+'? לצייר ציר עד −75 ייקח שעה. היום נגלה קיצור דרך.'),
ENTRY([Q(E(add(4,-6)+' ='),E(N(-2))),Q(E(add(-3,-2)+' ='),E(N(-5))),Q(E(AB(N(-7))+' ='),E('7')),Q('למי ערך מוחלט גדול יותר: ל־'+E(N(-7))+' או ל־'+E('3')+'?','ל־'+E(N(-7))+', כי 7 גדול מ־3')],svg('0 105 800 115',nlBase(-8,6,140))),
TERMS([['ערך מוחלט','המרחק של מספר מ־0 על ציר המספרים',E(AB(N(-7))+' = 7')],['מחוברים באותו סימן','מחברים את הערכים המוחלטים, ולתוצאה הסימן המשותף',E(add(-3,-4)+' = '+N(-7))],['מחוברים בסימנים שונים','מחסרים את הערך המוחלט הקטן מהגדול, ולתוצאה הסימן של המחובר שערכו המוחלט גדול יותר',E(add(-7,3)+' = '+N(-4))],['מספרים נגדיים','הסכום שלהם 0',E(add(-20,20)+' = 0')]]),
H('הרעיון המרכזי','שני המקרים על הציר',`<div class="two"><div>${walker(-3,-4,-8,2)}<div class="card step"><b>אותו סימן:</b> שני החצים לאותו כיוון. ${E('3 + 4 = 7')}, הסימן מינוס: ${E(N(-7))}</div></div><div>${walker(-7,3,-8,2)}<div class="card step"><b>סימנים שונים:</b> החצים בכיוונים הפוכים. ${E('7 − 3 = 4')}, הסימן של −7: ${E(N(-4))}</div></div></div><p class="step">בדיקה על הציר: לאיזה צד מצביע החץ הארוך יותר? לשם תצא התשובה.</p>`),
H('הטעות הנפוצה','מחברים את הערכים המוחלטים גם כשהסימנים שונים',`<p class="step"><span class="wrong">${E(add(-7,3)+' = '+N(-10))}</span></p>${P(E('7 − 3'),1,'הסימנים שונים, ולכן מחסרים את הערכים המוחלטים: 7 − 3 = 4.')}${P(add(-7,3)+' = '+N(-4),2,'חוב של 7 ₪, מחזירים 3 ₪: נשאר חוב של 4 ₪, לא 10.')}`),
LV(1,'ידע',MOD('פעולות במספרים מכוונים'),E(add(-5,-3)+' = ?'),P(E('5 + 3 = 8'),1,'אותו סימן: מחברים את הערכים המוחלטים.')+P(add(-5,-3)+' = '+N(-8),2,'הסימן המשותף הוא מינוס: −8.')+P(N(-8),3,'בדיקה בסיפור: חוב של 5 ₪ ועוד חוב של 3 ₪ = חוב של 8 ₪.')),
LV(2,'יישום',SUP,'צוללן נמצא בעומק 12 מטר מתחת לפני הים. הוא עולה 5 מטר. איפה הוא עכשיו?',LAY(walker(-12,5,-13,1),P(add(-12,5),1,'מתחת לפני הים: −12. עולה: +5.')+P(E('12 − 5 = 7'),2,'סימנים שונים: מחסרים את הערכים המוחלטים.'))+P(add(-12,5)+' = '+N(-7),3,'לערך המוחלט של −12 יש יותר, ולכן הסימן מינוס: הצוללן בעומק 7 מטר.')),
LV(3,'הבנה ונימוק',SUP,'בלי לחשב: האם '+E(add(-23,15))+' חיובי או שלילי?',P(E(AB(N(-23))+' = 23'),1,'משווים ערכים מוחלטים: 23 לעומת 15.')+P(E('23 > 15'),2,'הערך המוחלט של −23 גדול יותר, ולכן הסכום שלילי.')+P(add(-23,15)+' = '+N(-8),3,'ועכשיו מחשבים: 23 − 15 = 8, והסימן מינוס: −8.')),
LV(4,'חשיבה',A3,'השלימו מספר כך שהסכום יהיה חיובי: '+E(PNc(-6)+' + ☐'),P(E('☐ > 6'),1,'צריך מחובר חיובי שהערך המוחלט שלו גדול מ־6.')+P(add(-6,7)+' = 1',2,'למשל 7: הסכום 1.')+P(E(add(-6,6)+' = 0'),3,'ומה עם 6? הסכום 0, והוא לא חיובי. לכן צריך מספר גדול מ־6.')),
PRAC('אותו סימן – מחברים ערכים מוחלטים · סימנים שונים – מחסרים, והסימן של הערך המוחלט הגדול','',['חיבור מספרים מכוונים','השלם את החסר – חיבור מכוונים']),
...TSL(3),
EXIT([QX(E(add(-8,-5)+' =')+A2,E(N(-13))),QX(E(add(-10,7)+' =')+MOD('פעולות במספרים מכוונים'),E(N(-3))),QX('רשמו שני מספרים שסכומם '+E(N(-15))+'.'+MOD('פעולות במספרים מכוונים'),'למשל '+E(add(-10,-5)))])
];

/* ---------- שיעור 3 ---------- */
const S3=[
COV('l3',4,'חיבור של כמה מחוברים','כיתה ז׳ · מספרים מכוונים','מקבצים: מחברים לחוד את המחוברים החיוביים ולחוד את השליליים, ואז מחשבים פעם אחת.',
 ['לחבר כמה מספרים מכוונים','לקבץ: חיוביים לחוד, שליליים לחוד','להסביר למה מותר לשנות את הסדר'],'ליואב החודש: קיבל 6 ₪, הוציא 4 ₪, קיבל 2 ₪, הוציא 5 ₪. כמה השתנה הסכום שלו?'),
ENTRY([Q(E(add(-6,-3)+' ='),E(N(-9))),Q(E(add(8,-11)+' ='),E(N(-3))),Q(E(add(-5,5)+' ='),E('0')),Q('ב־'+E('4 + 9 + 6')+', מה הכי נוח לחבר קודם?',E('4 + 6 = 10')+', ואז 9: 19')]),
TERMS([['חוק החילוף בחיבור','סדר המחוברים לא משנה את הסכום',E('a + b = b + a')],['חוק הקיבוץ בחיבור','מותר לחבר קודם כל זוג מחוברים',E('(a + b) + c = a + (b + c)')],['קיבוץ','בגלל שני החוקים, מותר לחבר לחוד את החיוביים ולחוד את השליליים. מזיזים כל מחובר יחד עם הסימן שבתוך הסוגריים שלו',E(PNc(6)+' + '+PNc(2)+' ; '+PNc(-4)+' + '+PNc(-5))]]),
H('הרעיון המרכזי','הכנסות לחוד, הוצאות לחוד',`<div class="sm">${bars(8,9,{pl:'הכנסה',nl:'הוצאה'})}</div>`+P(E('6 + 2 = 8'),1,'כל ההכנסות יחד: 8.')+P(E('4 + 5 = 9'),2,'כל ההוצאות יחד: 9.')+P(add(8,-9)+' = '+N(-1),3,'זוגות של הכנסה והוצאה מתאפסים. נשארה הוצאה של 1: הסכום −1.')),
H('הטעות הנפוצה','מתעלמים מהסימנים',`<p class="step"><span class="wrong">${E(PNc(-4)+' + '+PNc(6)+' + '+PNc(-5)+' + '+PNc(2)+' = 17')}</span></p>${P(E('4 + 6 + 5 + 2 = 17'),1,'כאן חיברו את כל הערכים המוחלטים, כאילו כל המחוברים חיוביים.')}${P(E(N(-1)),2,'אבל −4 ו־−5 שליליים! קודם ממיינים לפי סימן, ורק אחר כך מחברים.')}`),
LV(1,'ידע',A4,E(PNc(3)+' + '+PNc(-7)+' + '+PNc(5)+' = ?'),P(E('3 + 5 = 8'),1,'החיוביים: 3 ו־5, יחד 8.')+P(E(N(-7)),2,'השליליים: רק −7.')+P(add(8,-7)+' = 1',3,'סימנים שונים: 8 − 7 = 1, והסימן פלוס: הסכום 1.')),
LV(2,'יישום',A4,'מה השינוי בחשבון של דנה?',`<p>הפקדה של 20 ₪, משיכה של 30 ₪, משיכה של 10 ₪, הפקדה של 15 ₪.</p><div class="sm">${bars(7,8,{k:5,pl:'הכנסות',nl:'הוצאות'})}</div>`+P(E('20 + 15 = 35'),1,'הפקדות (הכנסות): 35.')+P(E('30 + 10 = 40'),2,'משיכות (הוצאות): 40.')+P(add(35,-40)+' = '+N(-5),3,'השינוי: −5. בחשבון יש עכשיו 5 ₪ פחות מקודם.')),
LV(3,'הבנה ונימוק',A4,'שני תלמידים פתרו '+E(PNc(-9)+' + '+PNc(4)+' + '+PNc(-1)+' + '+PNc(6))+' בשתי דרכים. מי צודק?',P(E(N(-5)+' → '+N(-6)+' → 0'),1,'נועם חישב לפי הסדר, צעד אחר צעד: −5, אחר כך −6, ובסוף 0.')+P(E('10 − 10 = 0'),2,'שירה קיבצה: חיוביים 4 + 6 = 10, שליליים 9 + 1 = 10.')+P(E('0'),3,'שניהם צודקים: לפי חוק החילוף וחוק הקיבוץ, הסדר לא משנה את הסכום.')),
LV(4,'חשיבה',A3,'השלימו מחובר אחד כך שהסכום יהיה 0: '+E(PNc(-7)+' + '+PNc(3)+' + '+PNc(-2)+' + ☐'),P(E(add(3,-9)+' = '+N(-6)),1,'מחשבים את מה שידוע: חיובי 3, שליליים 9: יחד −6.')+P(E('☐ = +6'),2,'כדי להגיע ל־0 צריך את המספר הנגדי ל־−6, כלומר +6.')+P(E(add(-6,6)+' = 0'),3,'בדיקה: סכום של מספרים נגדיים הוא 0. ✔')),
PRAC('חיוביים לחוד · שליליים לחוד · ואז חשבון אחד','',['חיבור מספרים בשרשרת','חיבור מספרים מכוונים – נכון/לא נכון']),
...TSL(4),
EXIT([QX(E('−5 + 4 + 2 − 6 =')+MOD('פעולות במספרים מכוונים'),E(N(-5))),QX(E(PNc(4)+' + '+PNc(-4)+' + '+PNc(-9)+' + '+PNc(1)+' =')+A4,E(N(-8))),QX('בבוקר '+DEG(-3)+'. הטמפרטורה עלתה ב־5 מעלות, ואחר כך ירדה ב־4 מעלות. מה הטמפרטורה?',E(PNc(-3)+' + '+PNc(5)+' + '+PNc(-4)+' = '+N(-2))+', כלומר '+DEG(-2))])
];

/* ---------- שיעור 4 ---------- */
const S4=[
COV('l4',5,'חיסור הוא חיבור של המספר הנגדי','כיתה ז׳ · מספרים מכוונים','לחסר מספר = לחבר את המספר הנגדי לו: '+E('a − b = a + ('+M+'b)'),
 ['להפוך כל תרגיל חיסור לתרגיל חיבור של המספר הנגדי','לחסר מספר שלילי','להסביר למה ההפרש בין 5 ל־−3 הוא 8'],'בבוקר היו '+DEG(-3)+' ובצהריים '+DEG(5)+'. בכמה מעלות התחמם? '+E('5 − '+PNc(-3)+' = ?')),
ENTRY([Q('מהו המספר הנגדי ל־'+E('5')+'? ול־'+E(N(-4))+'?',E(N(-5))+' ו־'+E('4')),Q(E(add(2,-5)+' ='),E(N(-3))),Q(E(add(3,4)+' ='),E('7')),Q(E('9 − 4 =')+' וגם '+E(add(9,-4)+' =')+'. מה שמתם לב?','שניהם 5')]),
TERMS([['מספרים נגדיים','שני מספרים באותו מרחק מ־0, משני צדדיו. סכומם 0. המספר הנגדי ל־0 הוא 0',E('5')+' ו־'+E(N(-5))],['חיסור','לחסר מספר = לחבר את המספר הנגדי לו',E('a − b = a + ('+M+'b)')],['הפרש','התוצאה של תרגיל חיסור',E('5 − '+PNc(-3)+' = 8')]]),
H('הרעיון המרכזי','לחסר = לחבר את המספר הנגדי',`<div class="two"><div>${spinOne(5,-6,6)}${P(E('2 − 5 = 2 + '+PNc(-5)+' = '+N(-3)),1,'מחסרים 5 = מחברים את המספר הנגדי, −5.')}</div><div>${spinOne(-4,-6,6)}${P(E('3 − '+PNc(-4)+' = 3 + 4 = 7'),2,'מחסרים −4 = מחברים את המספר הנגדי, 4. מוחקים חוב, ולכן יש יותר.')}</div></div>`),
H('הטעות הנפוצה','מתעלמים מהסימן של המחוסר',`<p class="step"><span class="wrong">${E('3 − '+PNc(-4)+' = '+N(-1))}</span></p>${P(E('3 − 4'),1,'כאן חישבו 3 − 4, כאילו מחסרים 4.')}${P(E('3 + 4 = 7'),2,'אבל מחסרים −4! מחברים את המספר הנגדי לו, 4, והתוצאה 7.')}`),
LV(1,'ידע',MOD('פעולות במספרים מכוונים'),'איזה תרגיל חיבור שקול ל־'+E(PNc(2)+' − '+PNc(-5))+'? פתרו.',P(E(PNc(2)+' + '+PNc(5)),1,'המספר הנגדי ל־−5 הוא 5. מחברים אותו.')+P(E('2 + 5 = 7'),2,'אותו סימן: מחברים.')+P(E(PNc(2)+' − '+PNc(-5)+' = 7'),3,'בדיקה בסיפור: מוחקים חוב של 5 ₪, ולכן יש 5 ₪ יותר.')),
LV(2,'יישום',A5,'בבוקר '+DEG(-3)+', בצהריים '+DEG(5)+'. בכמה מעלות התחמם?',P(E('5 − '+PNc(-3)),1,'השינוי = הטמפרטורה בסוף פחות הטמפרטורה בהתחלה.')+P(E('5 + 3'),2,'מחסרים −3 = מחברים 3.')+P(E('5 + 3 = 8'),3,'התחמם ב־8 מעלות: 3 מעלות עד 0, ועוד 5 מעלות עד 5.')),
LV(3,'הבנה ונימוק',SUP,'למה '+E('7 − '+PNc(-3))+' גדול מ־7?',P(E('7 + 3'),1,'לחסר −3 = לחבר 3.')+P(E('7 + 3 = 10'),2,'חיברנו מספר חיובי, ולכן התוצאה גדלה.')+P(E('10 > 7'),3,'כמו למחוק חוב: מי שמוחקים לו חוב נשאר עם יותר.')),
LV(4,'חשיבה',SUP,'דני טוען: "כשמחסרים, התוצאה תמיד קטנה". האם הוא צודק?',P(E('4 − '+PNc(-1)),1,'מחפשים דוגמה נגדית: מחסרים מספר שלילי.')+P(E('4 + 1 = 5'),2,'התוצאה 5, גדולה מ־4.')+P(E('5 > 4'),3,'דני טועה: כשמחסרים מספר שלילי, התוצאה גדלה.')),
PRAC('לחסר מספר = לחבר את המספר הנגדי לו','',['חישוב השינוי בין מספרים מכוונים']),
...TSL(5),
EXIT([QX(E(PNc(-4)+' − '+PNc(5)+' ='),E(N(-9))),QX(E('6 − '+PNc(-2)+' ='),E('8')),QX(E(PNc(-3)+' − '+PNc(-7)+' ='),E(PNc(-3)+' + '+PNc(7)+' = 4'))])
];

/* ---------- שיעור 5 ---------- */
const S5=[
COV('l5',6,'השמטת סוגריים וכתיבה מקוצרת','כיתה ז׳ · מספרים מכוונים','כותבים בלי סוגריים: סימן לפני סוגריים וסימן בתוכם הופכים לסימן אחד.',
 ['לכתוב תרגיל בלי סוגריים','לבחור את הסימן הנכון כשמשמיטים סוגריים','להסביר למה חיסור של מספר שלילי הופך לחיבור: '+E(M+'('+M+'3) = 3')],'בספר ובמבחן כותבים '+E(M+'3 + 8 − 2')+' ולא '+E(PNc(-3)+' − '+PNc(-8)+' + '+PNc(-2))+'. צריך לדעת לעבור מכתיב לכתיב בלי לטעות.'),
ENTRY([Q(E(PNc(-5)+' − '+PNc(2)+' ='),E(N(-7))),Q(E('1 − '+PNc(-6)+' ='),E('7')),Q('מהו המספר הנגדי למספר הנגדי ל־'+E('3')+'?',E('3'))]),
TERMS([['הנגדי של הנגדי','מספר שלוקחים את המספר הנגדי לו פעמיים חוזר להיות הוא עצמו',E(M+'('+M+'3) = 3')],['כתיבה מקוצרת','משמיטים סוגריים ומשאירים סימן אחד בין המספרים',E(add(5,-8)+' = 5 − 8')],['סימן לפני סוגריים וסימן בתוכם','שני סימנים שווים: +   ·   שני סימנים שונים: −',E('7 − ('+M+'2) = 7 + 2')]]),
H('הרעיון המרכזי','המספר הנגדי למספר הנגדי',doubleSpin()+P(E(M+'3'),1,'פעם אחת: המספר הנגדי ל־3 הוא −3.')+P(E(M+'('+M+'3) = 3'),2,'פעם שנייה: המספר הנגדי ל־−3 הוא 3. חזרנו!')+P(E('7 − '+PNc(-3)+' = 7 + 3'),3,'לכן מינוס לפני סוגריים ומינוס בתוכם נכתבים כפלוס.')),
H('הטעות הנפוצה','משמיטים סוגריים ושוכחים מינוס',`<p class="step"><span class="wrong">${E('4 − '+PNc(-6)+' = 4 − 6')}</span></p>${P(E('4 − '+PNc(-6)),1,'מחסרים −6 = מחברים את המספר הנגדי לו, 6.')}${P(E('4 + 6 = 10'),2,'נכון: 4 + 6 = 10.')}`),
LV(1,'ידע',SUP,'כתבו בקיצור וחשבו: '+E(add(7,-2)),P(E('7 − 2'),1,'פלוס לפני סוגריים ומינוס בתוכם: סימנים שונים, ולכן מינוס.')+P(E('7 − 2 = 5'),2,'מחשבים: 5.')+P(E('5'),3,'בדיקה: הכנסה של 7 וחוב של 2: נשאר 5.')),
LV(2,'יישום',SUP,'כתבו בקיצור וחשבו: '+E(PNc(-3)+' − '+PNc(4)+' + '+PNc(-1)),P(E(M+'3 − 4 − 1'),1,'בכל מקום: סימן לפני סוגריים וסימן בתוכם הופכים לסימן אחד.')+P(E('3 + 4 + 1 = 8'),2,'שלושה מחוברים שליליים: מחברים את הערכים המוחלטים.')+P(E(N(-8)),3,'התוצאה −8.')),
LV(3,'הבנה ונימוק',SUP,'מה ההבדל בין '+E('5 − 3')+' לבין '+E('5 + ('+M+'3)')+'?',P(E('5 − 3 = 2'),1,'חיסור: 2.')+P(E('5 + ('+M+'3) = 2'),2,'חיבור של המספר הנגדי: גם 2.')+P(E('5 − 3 = 5 + ('+M+'3)'),3,'אין הבדל בתוצאה: אלה שתי דרכים לכתוב את אותו דבר.')),
LV(4,'חשיבה',SUP,'כתבו את '+E('6 − 2')+' בשלוש דרכים שונות עם סוגריים',P(E('(+6) + ('+M+'2)'),1,'דרך 1: מחברים מספר שלילי.')+P(E('(+6) − (+2)'),2,'דרך 2: מחסרים מספר חיובי.')+P(E('('+M+'2) + (+6)'),3,'דרך 3: מחליפים את סדר המחוברים. בכולן התוצאה 4.')),
PRAC('סימן לפני סוגריים וסימן בתוכם: שווים – פלוס · שונים – מינוס','',[]),
...TSL(6),
EXIT([QX('כתבו בקיצור וחשבו: '+E(add(9,-4)),E('9 − 4 = 5')),QX('כתבו בקיצור וחשבו: '+E(PNc(-2)+' − '+PNc(-7)),E(M+'2 + 7 = 5')),QX('כתבו בקיצור וחשבו: '+E(add(-5,-3)),E(M+'5 − 3 = '+N(-8)))])
];

/* ---------- שיעור 6 ---------- */
const S6=[
COV('l6',7,'חישוב ביטויים בלי סוגריים','כיתה ז׳ · מספרים מכוונים','בביטוי של חיבור וחיסור בלי סוגריים, כל מספר שייך לו הסימן שלפניו.',
 ['לקרוא כל מספר יחד עם הסימן שלפניו','לחשב ביטוי ארוך בלי סוגריים','לבדוק את התשובה בקיבוץ לפי סימנים'],'כך כתובים התרגילים במבחן: '+E(M+'7 + 3 − 5 + 10')+'. אין סוגריים, ויש הרבה מספרים. מאיפה מתחילים?'),
ENTRY([Q('כתבו בקיצור: '+E(add(4,-9)),E('4 − 9')),Q(E('4 − 9 ='),E(N(-5))),Q(E(M+'3 − 2 ='),E(N(-5)))]),
TERMS([['ביטוי חשבוני','מספרים ופעולות. בביטוי של חיבור וחיסור, כל מספר שייך לו הסימן שלפניו',E(M+'7 + 3 − 5')],['קיבוץ','מחברים לחוד את המספרים עם +, ולחוד את המספרים עם −, ואז מחשבים',E('13 − 12 = 1')],['לפי הסדר','אפשר גם לחשב צעד אחר צעד, לפי סדר הכתיבה של התרגיל',E('8 − 3 − 6 = 5 − 6 = '+N(-1))]]),
H('הרעיון המרכזי','כל מספר לוקח את הסימן שלפניו',`<div class="sm">${bars(13,12,{pl:'עם +',nl:'עם −'})}</div>`+P(E(N(-7)+', +3, '+N(-5)+', +10'),1,'מסמנים לכל מספר את הסימן שלפניו: −7, +3, −5, +10.')+P(E('3 + 10 = 13')+' ; '+E('7 + 5 = 12'),2,'עם פלוס: 13. עם מינוס: 12.')+P(E(M+'7 + 3 − 5 + 10 = 1'),3,'13 − 12 = 1.')),
H('הטעות הנפוצה','מחסרים את כל מה שאחרי המינוס',`<p class="step"><span class="wrong">${E('3 − 5 + 10 = 3 − 15')}</span></p>${P(E(N(-5)+' , +10'),1,'המינוס שייך רק ל־5. ל־10 יש פלוס משלו.')}${P(E('3 − 5 + 10 = 8'),2,'עם פלוס: 3 + 10 = 13. עם מינוס: 5. 13 − 5 = 8.')}`),
LV(1,'ידע',SUP,E('8 − 3 − 6 = ?'),P(E('8'),1,'עם פלוס: 8.')+P(E('3 + 6 = 9'),2,'עם מינוס: 3 ו־6, יחד 9.')+P(E('8 − 9 = '+N(-1)),3,'9 גדול מ־8, ולכן התוצאה שלילית: −1.')),
LV(2,'יישום',SUP,E(M+'12 + 5 + 4 − 2 = ?'),`<div class="sm">${bars(9,14,{pl:'עם +',nl:'עם −'})}</div>`+P(E('5 + 4 = 9'),1,'עם פלוס: 9.')+P(E('12 + 2 = 14'),2,'עם מינוס: 14.')+P(E('9 − 14 = '+N(-5)),3,'התוצאה −5.')),
LV(3,'מצאו את הטעות',SUP,'נועה כתבה: '+E(M+'6 − 4 = '+N(-2)),P(E(N(-6)+' , '+N(-4)),1,'שני המספרים עם מינוס: −6 ו־−4.')+P(E('6 + 4 = 10'),2,'אותו סימן: מחברים את הערכים המוחלטים. נועה חיסרה אותם.')+P(E(M+'6 − 4 = '+N(-10)),3,'התשובה הנכונה: −10.')),
LV(4,'חשיבה',SUP,'השלימו + או − בכל ריבוע, כך שהתוצאה תהיה 0: '+E('5 ☐ 3 ☐ 8'),P(E('5 + 3 = 8'),1,'מחפשים מספרים שיחד שווים ל־8.')+P(E('5 + 3 − 8 = 0'),2,'עם פלוס 8, עם מינוס 8: מתאפסים.')+P(E('✔'),3,'בודקים את שאר האפשרויות: 5 − 3 + 8 = 10, 5 − 3 − 8 = −6, 5 + 3 + 8 = 16. רק הראשונה נותנת 0.')),
PRAC('כל מספר + הסימן שלפניו · קיבוץ לפי סימנים','<li class="step">משימת הסיכום בספר, <b>עמודים 99–100</b>.</li>',[]),
...TSL(7),
EXIT([QX(E(M+'4 + 9 − 2 ='),E('3')),QX(E(M+'1 − 6 + 3 ='),E(N(-4))),QX(E('10 − 15 + 5 ='),E('0'))])
];

/* ---------- שיעור 7 ---------- */
const tEq=[[90,250],[250,250],[170,111]],tIs=[[330,250],[480,250],[405,90]],tSc=[[560,250],[760,250],[620,130]];
const typesSvg=svg('0 60 800 240',tri(tEq,{ticks:[1,1,1]})+tri(tIs,{ticks:[0,1,1],col:DST})+tri(tSc,{col:C.ray2})+TXT(170,290,'שווה צלעות',{dir:'rtl',fs:22})+TXT(405,290,'שווה שוקיים',{dir:'rtl',fs:22,col:DST})+TXT(660,290,'שונה צלעות',{dir:'rtl',fs:22,col:C.ray2}));
const isoSvg=svg('0 40 800 330',tri([[250,320],[550,320],[400,80]],{ticks:[0,2,2],col:DST,labels:['B','C','A'],sideLabels:['בסיס','שוק','שוק']})+arcAt([400,80],[250,320],[550,320],OPP,38)+`<g class="step">${arcAt([250,320],[550,320],[400,80],POS,40)}${arcAt([550,320],[400,80],[250,320],POS,40)}</g>`);
const S7=[
COV('l9',10,'סוגי משולשים · משולש שווה שוקיים','כיתה ז׳ · גאומטריה','לכל משולש שני שמות: אחד לפי הצלעות שלו ואחד לפי הזוויות שלו.',
 ['למיין משולש לפי הצלעות שלו','למיין משולש לפי הזוויות שלו','את החלקים של משולש שווה שוקיים'],'גג של בית, תמרור "תן זכות קדימה", סולם פתוח: מהנדסים בוחרים משולש לפי התכונות שלו.'),
ENTRY([Q('זווית של '+E('90°')+' נקראת…','זווית ישרה'),Q('זווית הגדולה מ־'+E('0°')+' וקטנה מ־'+E('90°')+' נקראת…','זווית חדה'),Q('זווית הגדולה מ־'+E('90°')+' וקטנה מ־'+E('180°')+' נקראת…','זווית קהה')]),
TERMS([['משולש שווה צלעות','משולש שכל שלוש צלעותיו שוות',E('5, 5, 5')],['משולש שווה שוקיים','משולש שיש בו לפחות שתי צלעות שוות. השוקיים: הצלעות השוות. הבסיס: הצלע השלישית',E('7, 7, 5')],['משולש שונה צלעות','משולש שאין בו שתי צלעות שוות',E('3, 4, 6')],['לפי זוויות','חד־זווית: כל זוויותיו חדות · ישר־זווית: יש בו זווית ישרה · קהה־זווית: יש בו זווית קהה','']]),
H('הרעיון המרכזי','מיון לפי צלעות · משולש שווה שוקיים',`<div class="two"><div>${typesSvg}<div class="card step">סימני השוויון על הצלעות מראים אילו צלעות שוות.</div></div><div>${isoSvg}${P('∠A',1,'זווית הראש: הזווית שבין שתי השוקיים.')}${P('∠B = ∠C',2,'זוויות הבסיס: שתי הזוויות שליד הבסיס. הן שוות זו לזו.')}</div></div>`),
H('הטעות הנפוצה','"משולש שווה צלעות אינו שווה שוקיים"',`<p class="step"><span class="wrong">משולש שווה צלעות הוא לא שווה שוקיים</span></p>${P('2 ≤ 3',1,'משולש שווה שוקיים: יש בו לפחות שתי צלעות שוות.')}${P('✔',2,'במשולש שווה צלעות יש שלוש צלעות שוות, ולכן הוא גם שווה שוקיים.')}`),
LV(1,'ידע',MOD('מיון משולשים לפי צלעות וזוויות'),'צלעות המשולש: 5 ס״מ, 5 ס״מ, 5 ס״מ. איך קוראים לו?',P('5 = 5 = 5',1,'כל שלוש הצלעות שוות.')+P('✔',2,'לפי הצלעות: משולש שווה צלעות.')+P('✔',3,'ולכן הוא גם משולש שווה שוקיים.')),
LV(2,'יישום',MOD('שווה שוקיים – הגדרות ומושגים'),'היקף משולש שווה שוקיים הוא 30 ס״מ, והבסיס 8 ס״מ. מה אורך כל שוק?',P(E('30 − 8 = 22'),1,'מורידים את הבסיס מההיקף: נשארו שתי השוקיים, 22 ס״מ.')+P(E('22 : 2 = 11'),2,'השוקיים שוות, ולכן מחלקים ב־2.')+P(E('11 + 11 + 8 = 30'),3,'בדיקה: כל שוק 11 ס״מ. ✔')),
LV(3,'הבנה ונימוק',SUP,'האם משולש ישר־זווית יכול להיות גם שווה שוקיים?',`<div class="sm">${svg('0 60 800 240',tri([[300,280],[500,280],[300,80]],{ticks:[1,0,1],right:0,col:DST}))}</div>`+P('✔',1,'משרטטים זווית ישרה, ועל שתי השוקיים שלה צלעות שוות.')+P('✔',2,'כן: זה משולש ישר־זווית שווה שוקיים.')),
LV(4,'חשיבה',SUP,'היקף משולש שווה שוקיים 20 ס״מ, ואחת הצלעות 8 ס״מ. מצאו שתי אפשרויות.',P('8, 8, 4',1,'אם 8 היא שוק: שתי השוקיים יחד 16, והבסיס 20 − 16 = 4.')+P('8, 6, 6',2,'אם 8 היא הבסיס: 20 − 8 = 12, וכל שוק 6.')+P('2',3,'יש שתי תשובות, כי לא נאמר אם הצלע של 8 ס״מ היא שוק או בסיס.')),
PRAC('לפי צלעות: שווה צלעות · שווה שוקיים · שונה צלעות — לפי זוויות: חד־זווית · ישר־זווית · קהה־זווית','',['מיון משולשים לפי צלעות וזוויות','שווה שוקיים – הגדרות ומושגים','יוצרים משולשים לפי תכונות']),
...TSL(10),
EXIT([QX('צלעות של 3, 4 ו־5 ס״מ, ויש בו זווית ישרה. תנו לו שני שמות.','שונה צלעות, ישר־זווית'),QX('במשולש שווה שוקיים: מהי זווית הראש?','הזווית שבין שתי השוקיים'),QX('שוקיים של 7 ס״מ ובסיס של 5 ס״מ. מה ההיקף?'+MOD('שווה שוקיים – הגדרות ומושגים'),E('7 + 7 + 5 = 19')+' ס״מ')])
];

/* ---------- שיעור 8 ---------- */
const S8=[
COV('l10',11,'סכום הזוויות במשולש','כיתה ז׳ · גאומטריה','בכל משולש, גדול או קטן, סכום שלוש הזוויות הוא 180°.',
 ['כמה מעלות יש בכל משולש','לגלות בניסוי שסכום הזוויות במשולש הוא 180°','למצוא זווית חסרה במשולש'],'נגר בונה גג משולש ויודע שתי זוויות. האם הוא חייב למדוד גם את השלישית? לא!'),
ENTRY([Q('כמה מעלות בזווית שטוחה (שתי השוקיים שלה יוצרות קו ישר)?',E('180°')),Q('שתי זוויות צמודות: אחת '+E('120°')+'. מה השנייה?',E('60°')),Q('איך קוראים למשולש שיש בו זווית של '+E('90°')+'?','ישר־זווית')]),
TERMS([['זווית שטוחה','זווית של 180°: שתי השוקיים שלה יוצרות קו ישר',E('180°')],['סכום הזוויות במשולש','בכל משולש סכום שלוש הזוויות הוא 180°. זה משפט',E('∠A + ∠B + ∠C = 180°')],['ניסוי והוכחה','"קריעת הפינות" מראה את המשפט. את ההוכחה נלמד בהמשך, כשנלמד על ישרים מקבילים','']]),
H('הרעיון המרכזי','ניסוי: קורעים את הפינות',`<div class="sm" style="--mh:19cqw">${tearTri()}</div>`+P('A, B, C',1,'צובעים את שלוש הזוויות של המשולש.')+P('✂',2,'"קורעים" את הפינות ומניחים אותן זו ליד זו על קו ישר.')+P(E('∠A + ∠B + ∠C = 180°'),3,'שלוש הפינות ממלאות זווית שטוחה: 180°. (את ההוכחה נלמד בהמשך.)')),
H('הטעות הנפוצה','"במשולש גדול יש יותר מעלות"',`<p class="step"><span class="wrong">במשולש גדול סכום הזוויות גדול יותר</span></p>${P(E('180°'),1,'גודל המשולש לא משנה: בכל משולש, גדול או קטן, סכום הזוויות 180°.')}`),
LV(1,'ידע',MOD('חישוב זוויות במשולש – בסיסי'),'שתי זוויות במשולש: '+E('60°')+' ו־'+E('70°')+'. מהי הזווית השלישית?',P(E('60° + 70° = 130°'),1,'מחברים את הזוויות הידועות.')+P(E('180° − 130° = 50°'),2,'מחסרים מ־180°.')+P(E('60° + 70° + 50° = 180°'),3,'בדיקה. ✔')),
LV(2,'יישום',MOD('חישוב זוויות במשולש – בסיסי'),'במשולש ישר־זווית, זווית חדה אחת היא '+E('35°')+'. מהי הזווית החדה השנייה?',P(E('90°'),1,'במשולש ישר־זווית יש זווית של 90°.')+P(E('90° + 35° = 125°'),2,'מחברים את הזוויות הידועות.')+P(E('180° − 125° = 55°'),3,'הזווית החדה השנייה: 55°.')),
LV(3,'הבנה ונימוק',MOD('זוויות בשווה שוקיים – בסיסי'),'במשולש שווה שוקיים זווית הראש '+E('100°')+'. מה גודל כל זווית בסיס?',P(E('180° − 100° = 80°'),1,'שתי זוויות הבסיס יחד: 80°.')+P(E('80° : 2 = 40°'),2,'זוויות הבסיס שוות, ולכן מחלקים ב־2.')+P(E('100° + 40° + 40° = 180°'),3,'בדיקה. ✔')),
LV(4,'חשיבה',MOD('זוויות בשווה שוקיים – שליטה (ב)'),'במשולש שווה שוקיים אחת הזוויות '+E('50°')+'. מצאו את שתי האפשרויות לזוויות המשולש.',P(E('50°, 50°, 80°'),1,'אם 50° היא זווית בסיס: גם השנייה 50°, וזווית הראש 180° − 100° = 80°.')+P(E('50°, 65°, 65°'),2,'אם 50° היא זווית הראש: לשתי זוויות הבסיס נשארו 130°, כל אחת 65°.')+P('2',3,'שתי האפשרויות נכונות, כי לא נאמר איזו זווית היא 50°.')),
PRAC('בכל משולש: '+E('∠A + ∠B + ∠C = 180°'),'',['חישוב זוויות במשולש – בסיסי','זוויות בשווה שוקיים – בסיסי']),
...TSL(11),
EXIT([QX('שתי זוויות במשולש: '+E('40°')+' ו־'+E('85°')+'. מהי השלישית?',E('55°')),QX('מה גודל כל זווית במשולש שווה צלעות? (רמז: משולש שווה צלעות הוא שווה שוקיים מכל צד, ולכן כל זוויותיו שוות)',E('180° : 3 = 60°')),QX('זווית בסיס במשולש שווה שוקיים היא '+E('70°')+'. מהי זווית הראש?',E('180° − 70° − 70° = 40°'))])
];

/* ---------- שיעור 9 ---------- */
const S9=[
COV('l11',12,'סכום הזוויות במרובע','כיתה ז׳ · גאומטריה','בכל מרובע אפשר להעביר אלכסון שמחלק אותו לשני משולשים, ולכן סכום הזוויות במרובע הוא 360°.',
 ['מהו סכום הזוויות במרובע','להסביר למה הוא 360°, בעזרת שני משולשים','למצוא זווית חסרה במרובע'],'שלוש פינות של מגרש נמדדו, ואת הרביעית קשה למדוד בגלל עץ. אפשר לחשב אותה בלי למדוד?'),
ENTRY([Q('מהו סכום הזוויות במשולש?',E('180°')),Q('שתי זוויות במשולש: '+E('90°')+' ו־'+E('45°')+'. מהי השלישית?',E('45°')),Q('כמה זוויות יש במרובע?','4')]),
TERMS([['מרובע','מצולע עם 4 צלעות ו־4 זוויות','ABCD'],['אלכסון','קטע שמחבר שני קודקודים שאינם סמוכים',E('AC')],['סכום הזוויות במרובע','בכל מרובע סכום ארבע הזוויות הוא 360°',E('2 · 180° = 360°')]]),
H('הרעיון המרכזי','מרובע = שני משולשים',`<div class="sm">${quadSplit()}</div>`+P('AC',1,'מעבירים אלכסון שנמצא בתוך המרובע. הוא מחלק את המרובע לשני משולשים.')+P(E('180° + 180°'),2,'בכל משולש סכום הזוויות 180°.')+P(E('180° + 180° = 360°'),3,'הזוויות של שני המשולשים יחד הן בדיוק הזוויות של המרובע: 360°.')),
H('הטעות הנפוצה','"גם במרובע 180°"',`<p class="step"><span class="wrong">סכום הזוויות במרובע הוא ${E('180°')}</span></p>${P(E('4 · 90° = 360°'),1,'בודקים במלבן: ארבע זוויות ישרות, 360°.')}${P(E('360°'),2,'180° זה סכום הזוויות במשולש. במרובע: 360°.')}`),
LV(1,'ידע',BANK,'שלוש זוויות במרובע: '+E('90°')+', '+E('90°')+', '+E('100°')+'. מהי הרביעית?',P(E('90° + 90° + 100° = 280°'),1,'מחברים את הזוויות הידועות.')+P(E('360° − 280° = 80°'),2,'מחסרים מ־360°.')+P(E('80°'),3,'הזווית הרביעית: 80°.')),
LV(2,'יישום',BANK,'לעפיפון 4 זוויות. שתיים מהן '+E('110°')+', ואחת '+E('80°')+'. מהי הרביעית?',P(E('110° + 110° + 80° = 300°'),1,'מחברים את שלוש הזוויות.')+P(E('360° − 300° = 60°'),2,'מחסרים מ־360°.')+P(E('60°'),3,'הזווית הרביעית: 60°.')),
LV(3,'הבנה ונימוק',BANK,'במרובע שלוש זוויות שוות, והרביעית '+E('60°')+'. מה גודל כל אחת מהשלוש?',P(E('360° − 60° = 300°'),1,'שלוש הזוויות השוות יחד: 300°.')+P(E('300° : 3 = 100°'),2,'מחלקים ב־3.')+P(E('3 · 100° + 60° = 360°'),3,'בדיקה. ✔')),
LV(4,'חשיבה',BANK,'האם ייתכן מרובע שכל ארבע הזוויות שלו קהות? נמקו.',P(E('> 90°'),1,'זווית קהה גדולה מ־90°.')+P(E('∠A + ∠B + ∠C + ∠D > 4 · 90° = 360°'),2,'ארבע זוויות קהות יחד גדולות מ־360°.')+P('✘',3,'לכן אין מרובע כזה.')),
PRAC('במרובע: סכום הזוויות '+E('360° = 2 · 180°'),'',['מרובע שהוא מלבן']),
...TSL(12),
EXIT([QX('שלוש זוויות במרובע: '+E('70°')+', '+E('120°')+', '+E('90°')+'. מהי הרביעית?',E('80°')),QX('הסבירו בעזרת שרטוט: למה במרובע 360°?','אלכסון יוצר 2 משולשים: '+E('2 · 180° = 360°')),QX('האם ייתכן מרובע עם 3 זוויות ישרות שהרביעית בו '+E('100°')+'?','לא: '+E('3 · 90° + 100° = 370°'))])
];

/* ---------- שיעור 10 ---------- */
const S10=[
COV('l12',13,'צורות חופפות · הזזה','כיתה ז׳ · גאומטריה','בהזזה כל הנקודות זזות באותו כיוון ובאותו מרחק, והצורה החדשה חופפת למקורית.',
 ['מתי שתי צורות חופפות: אותה צורה ואותו גודל','להזיז צורה על משבצות','לכתוב את שיעורי הנקודות אחרי הזזה'],'בטפט אותו פרח חוזר שוב ושוב, ובמשחק מחשב דמות זזה על המסך ולא משתנה: זו הזזה.'),
ENTRY([Q('בנקודה '+E('(3, 2)')+', מה אומר המספר הראשון?','כמה צעדים ימינה (שיעור x)'),Q('ומה אומר המספר השני?','כמה צעדים למעלה (שיעור y)'),Q('זזים מ־'+E('(1, 1)')+' 2 צעדים ימינה. לאן הגענו?',E('(3, 1)'))]),
TERMS([['צורות חופפות','צורות שאפשר להניח אחת על השנייה כך שיתלכדו בדיוק: אותה צורה ואותו גודל',E('≅')],['הזזה','כל הנקודות של הצורה זזות באותו כיוון ובאותו מרחק',E('(x, y) → (x + 4, y + 2)')],['הזזה וחפיפה','בהזזה האורכים והזוויות לא משתנים, ולכן הצורה החדשה חופפת למקורית',''],['תמונה','הנקודה החדשה מקבלת את אותה אות עם תג',E('A → A′')]]),
H('הרעיון המרכזי','הזזה: 4 ימינה ו־2 למעלה',LAY(gridShift([[1,1],[4,1],[1,3]],4,2,{names:['A','B','C']}),P('A(1, 1)',1,'בוחרים נקודה, A.')+P('A′(5, 3)',2,'מזיזים: 4 ימינה (x גדל ב־4) ו־2 למעלה (y גדל ב־2).'))+P('≅',3,'כל הנקודות זזו באותו כיוון ובאותו מרחק. האורכים והזוויות לא השתנו: המשולש החדש חופף למקורי.')),
H('הטעות הנפוצה','"אותו שטח = חופפות"'+BANK,`<p class="step"><span class="wrong">שני מלבנים ששטחם 12 סמ״ר חופפים</span></p>${P(E('3 · 4 = 12'),1,'מלבן של 3 על 4: שטח 12.')}${P(E('2 · 6 = 12'),2,'מלבן של 2 על 6: גם שטח 12.')}${P('✘',3,'אי אפשר להניח אחד על השני כך שיתלכדו. חופפות = אותה צורה ואותו גודל בדיוק.')}`),
LV(1,'ידע',ADPT,'הזיזו את '+E('A(1, 2)')+' 3 צעדים ימינה ו־2 צעדים למעלה.',P(E('1 + 3 = 4'),1,'ימינה: x גדל ב־3.')+P(E('2 + 2 = 4'),2,'למעלה: y גדל ב־2.')+P(E('A′(4, 4)'),3,'הנקודה החדשה: A′(4, 4).')),
LV(2,'יישום',ADPT,'קודקודי משולש: '+E('(1, 1)')+', '+E('(4, 1)')+', '+E('(1, 3)')+'. הזיזו אותו 2 ימינה ו־3 למעלה.',P(E('(1, 1) → (3, 4)'),1,'לכל x מוסיפים 2, ולכל y מוסיפים 3.')+P(E('(4, 1) → (6, 4)'),2,'אותה הזזה לכל קודקוד.')+P(E('(1, 3) → (3, 6)'),3,'הקודקודים החדשים: (3, 4), (6, 4), (3, 6).')),
LV(3,'הבנה ונימוק',BANK,'אחרי הזזה, האם האורכים והזוויות משתנים?',P('✘',1,'כל הנקודות זזות באותו כיוון ובאותו מרחק, ולכן האורכים והזוויות לא משתנים.')+P('≅',2,'הצורה החדשה חופפת למקורית.')+P('✘',3,'אבל כשמגדילים ציור פי 2, האורכים משתנים, והוא לא חופף לציור המקורי.')),
LV(4,'חשיבה',ADPT,'משולש הוזז: הקודקוד '+E('A(1, 1)')+' עבר ל־'+E('A′(4, 2)')+'. לאן עבר '+E('B(3, 2)')+'?',P(E('4 − 1 = 3')+' , '+E('2 − 1 = 1'),1,'מוצאים את ההזזה מ־A: 3 ימינה ו־1 למעלה.')+P(E('(3 + 3, 2 + 1)'),2,'מזיזים את B באותה הזזה.')+P(E('B′(6, 3)'),3,'B עבר ל־B′(6, 3), כי בהזזה כל הנקודות זזות באותו כיוון ובאותו מרחק.')),
PRAC('בהזזה: כל הנקודות זזות באותו כיוון ובאותו מרחק · הצורה החדשה חופפת למקורית','',[]),
...TSL(13),
EXIT([QX('הזיזו את '+E('(2, 1)')+' 3 ימינה ו־4 למעלה.',E('(5, 5)')),QX('שני ריבועים, לכל אחד צלע של 3 ס״מ. האם הם חופפים?'+BANK,'כן: כל הצלעות 3 ס״מ וכל הזוויות ישרות'),QX('האם הזזה משנה את גודל הצורה?','לא. הצורה החדשה חופפת למקורית')])
];


/* ---------- שיעור 7 · זווית כמידת סיבוב ---------- */
const T1=MOD('סוגי זוויות');
const S7n=[
COV('l7',8,'זווית כמידת סיבוב','כיתה ז׳ · גאומטריה','מידת זווית אומרת כמה הסתובבה שוק אחת עד שהגיעה לשוק השנייה. סיבוב שלם הוא 360°.',
 ['למדוד זווית כחלק מסיבוב שלם','שרבע סיבוב הוא 90°, וחצי סיבוב הוא 180°','לחשב זוויות של מחוגי שעון'],'מחוגי השעון, דלת שנפתחת וגלגל ענק: כולם מסתובבים, ואת הסיבוב מודדים במעלות.'),
ENTRY([Q('איזו זווית גדולה יותר: זווית ישרה או זווית חדה?','זווית ישרה'),Q('כמה מעלות בזווית ישרה?',E('90°')),Q('איך קוראים לזווית שגדולה מ־'+E('90°')+' וקטנה מ־'+E('180°')+'?','זווית קהה')]),
TERMS([['זווית','שתי קרניים (שוקיים) שיוצאות מאותה נקודה (קודקוד)',E('∠AOB')],['מידת זווית','כמה צריך לסובב שוק אחת סביב הקודקוד עד שתגיע לשוק השנייה',E('60°')],['סיבוב שלם','סיבוב שחוזר לאותו מקום: 360°',E('360°')],['חצי סיבוב · רבע סיבוב','חצי סיבוב: 180° (זווית שטוחה). רבע סיבוב: 90° (זווית ישרה)',E('180° · 90°')]]),
H('הרעיון המרכזי','השוק מסתובבת – וזו הזווית',RCSS+`<div class="sm" style="--mh:16cqw">${turnRay(120)}</div>`+P('O',1,'הקודקוד O לא זז. השוק הכתומה מתחילה על השוק הכחולה.')+P(E('120°'),2,'השוק הכתומה מסתובבת. כמה שהיא הסתובבה – זו מידת הזווית: 120°, שליש סיבוב.')+P(E('360° : 3 = 120°'),3,'בדיקה: סיבוב שלם הוא 360°, ושליש ממנו 120°.')),
H('הטעות הנפוצה','"שוקיים ארוכות יותר = זווית גדולה יותר"',`<p class="step"><span class="wrong">אם מאריכים את השוקיים, הזווית גדלה</span></p>${P('✘',1,'מידת הזווית תלויה רק בכמה השוק הסתובבה.')}${P('✔',2,'מאריכים את השוקיים – הסיבוב לא השתנה, ולכן גם הזווית לא השתנתה.')}`),
LV(1,'ידע',SUP,'מחוג הדקות זז מ־12 ל־3. איזה חלק מסיבוב שלם? כמה מעלות?',P('¼',1,'מ־12 ל־3 זה רבע מהשעון.')+P(E('360° : 4 = 90°'),2,'רבע מסיבוב שלם.')+P(E('90°'),3,'זווית ישרה.')),
LV(2,'יישום',SUP,'כמה מעלות זז מחוג הדקות ב־10 דקות?',P(E('360° : 60 = 6°'),1,'ב־60 דקות המחוג עושה סיבוב שלם, ולכן בדקה אחת: 6°.')+P(E('10 · 6° = 60°'),2,'ב־10 דקות: פי 10.')+P(E('60°'),3,'בדיקה: 10 דקות הן שישית שעה, ו־360° : 6 = 60°.')),
LV(3,'הבנה ונימוק',T1,'סווגו לפי גודל: '+E('30°')+', '+E('90°')+', '+E('150°')+', '+E('180°'),P(E('30°'),1,'פחות מרבע סיבוב: חדה.')+P(E('90°'),2,'רבע סיבוב בדיוק: ישרה.')+P(E('150° · 180°'),3,'150° – יותר מרבע ופחות מחצי סיבוב: קהה. 180° – חצי סיבוב: שטוחה.')),
LV(4,'חשיבה',SUP,'מה הזווית בין מחוגי השעון בשעה 4:00?',P(E('360° : 12 = 30°'),1,'בין כל שני מספרים בשעון: 30°.')+P(E('4 · 30° = 120°'),2,'ב־4:00 מחוג הדקות על 12 ומחוג השעות על 4: ארבעה רווחים.')+P(E('120°'),3,'הזווית בין המחוגים: 120°, זווית קהה.')),
PRAC('מידת זווית = כמה הסתובבה השוק · סיבוב שלם 360°','',['סוגי זוויות']),
...TSL(8),
EXIT([QX('כמה מעלות בחצי סיבוב?',E('180°')),QX('כמה מעלות זז מחוג הדקות ב־5 דקות?',E('30°')),QX('האם מאריכים שוקיים משנה את הזווית? נמקו.','לא: הסיבוב לא השתנה')])
];

/* ---------- שיעור 8 · זוויות צמודות ---------- */
const T2=MOD('זיהוי וחישוב זוויות');
const S8n=[
COV('l8',9,'זוויות צמודות','כיתה ז׳ · גאומטריה','שתי זוויות צמודות יחד יוצרות חצי סיבוב, ולכן סכומן 180°.',
 ['לזהות זוויות צמודות','לחשב זווית צמודה לזווית נתונה','להסביר למה סכום זוויות צמודות הוא 180°'],'מוט שנשען על קיר ישר יוצר שתי זוויות. אם יודעים אחת, יודעים מיד את השנייה.'),
ENTRY([Q('כמה מעלות בחצי סיבוב?',E('180°')),Q('איך קוראים לזווית של '+E('180°')+'?','זווית שטוחה'),Q(E('180° − 120° =')+' ?',E('60°'))]),
TERMS([['זוויות צמודות','שתי זוויות עם קודקוד משותף ושוק משותפת, והשוקיים האחרות שלהן יוצרות קו ישר',E('∠AOB, ∠BOC')],['סכום זוויות צמודות','יחד הן זווית שטוחה, חצי סיבוב',E('α + β = 180°')],['הזווית הצמודה','כדי למצוא אותה: 180° פחות הזווית הנתונה',E('180° − 120° = 60°')]]),
H('הרעיון המרכזי','שתי צמודות = חצי סיבוב',adjPair(120)+P('120°',1,'זווית אחת: 120°.')+P('60°',2,'הזווית הצמודה לה משלימה לקו ישר.')),
H('הטעות הנפוצה','"כל שתי זוויות זו ליד זו הן צמודות"',`<p class="step"><span class="wrong">כל שתי זוויות עם שוק משותפת הן צמודות</span></p>${P('✘',1,'צריך גם שהשוקיים האחרות ייצרו קו ישר.')}${P(E('100° + 90° = 190°'),2,'לכן 100° ו־90° לא יכולות להיות צמודות: הסכום אינו 180°.')}`),
LV(1,'ידע',T2,'זווית אחת מזוג צמודות היא '+E('120°')+'. מהי השנייה?',P(E('180°'),1,'צמודות יחד: 180°.')+P(E('180° − 120° = 60°'),2,'מחסרים את הזווית הנתונה.')+P(E('120° + 60° = 180°'),3,'בדיקה. ✔')),
LV(2,'יישום',SUP,'מוט נשען על קיר ישר ויוצר איתו זווית של '+E('65°')+'. מה הזווית מהצד השני?',P('קו ישר',1,'שתי הזוויות יחד על קו ישר: צמודות.')+P(E('180° − 65° = 115°'),2,'הזווית השנייה: 115°.')+P(E('65° + 115° = 180°'),3,'בדיקה. ✔')),
LV(3,'הבנה ונימוק',SUP,'שתי זוויות צמודות שוות זו לזו. מה גודל כל אחת?',P(E('180° : 2'),1,'הן שוות, ויחד 180°: מחלקים ב־2.')+P(E('90°'),2,'כל אחת 90°.')+P('✔',3,'שתיהן זוויות ישרות.')),
LV(4,'חשיבה',SUP,'זווית אחת גדולה ב־'+E('40°')+' מהזווית הצמודה לה. מצאו את שתיהן.',P(E('180° − 40° = 140°'),1,'אם נוריד את ה־40° העודפים, נשארות שתי זוויות שוות.')+P(E('140° : 2 = 70°'),2,'הקטנה: 70°.')+P(E('70° + 40° = 110°'),3,'הגדולה: 110°. בדיקה: 70° + 110° = 180°. ✔')),
PRAC('זוויות צמודות: α + β = 180°','',['זיהוי וחישוב זוויות']),
...TSL(9),
EXIT([QX('הזווית הצמודה ל־'+E('75°')+'?',E('105°')),QX('הזווית הצמודה ל־'+E('90°')+'?',E('90°')),QX('האם '+E('100°')+' ו־'+E('90°')+' יכולות להיות צמודות?','לא: '+E('100° + 90° = 190°'))])
];

/* ---------- שיעור 13 · שיקוף ---------- */
const S13=[
COV('l13',14,'שיקוף','כיתה ז׳ · גאומטריה','בשיקוף בישר, כל נקודה עוברת לצד השני של הישר, באותו מרחק ממנו. הצורה המשתקפת חופפת למקורית.',
 ['לשקף נקודה ומשולש בישר על משבצות','למצוא את ישר השיקוף','להסביר למה הצורה המשתקפת חופפת'],'מראה, שלולית ופרפר: הצד האחד הוא בבואה של הצד השני.'),
ENTRY([Q('הזיזו את '+E('(2, 3)')+' 4 ימינה.',E('(6, 3)')),Q('מה המרחק בין '+E('(2, 3)')+' לבין '+E('(5, 3)')+'?','3 יחידות'),Q('אחרי הזזה, הצורה החדשה חופפת למקורית?','כן')]),
TERMS([['שיקוף','כל נקודה עוברת לצד השני של ישר השיקוף, באותו מרחק ממנו','b ↔ d'],['ישר השיקוף','הישר שעליו "מניחים את המראה". נקודה שעליו נשארת במקומה',E('x = 5')],['שיקוף וחפיפה','בשיקוף האורכים והזוויות לא משתנים, ולכן הצורה המשתקפת חופפת למקורית','']]),
H('הרעיון המרכזי','מניחים מראה על הישר',RCSS+LAY(gridReflect([[2,1],[4,1],[2,4]],5,['A','B','C']),P(E('x = 5'),1,'ישר השיקוף: הישר האנכי שעובר ב־5.')+P(E('A(2, 1) → A′(8, 1)'),2,'A רחוקה 3 משמאל לישר, ולכן A′ רחוקה 3 מימינו.'))+P('≅',3,'כל הנקודות עברו לצד השני באותו מרחק. המשולש "התהפך", אבל האורכים והזוויות לא השתנו: הוא חופף למקורי.')),
H('הטעות הנפוצה','"שיקוף זה כמו הזזה"',`<p class="step"><span class="wrong">בשיקוף הצורה רק זזה הצידה</span></p>${P('b → d',1,'בשיקוף הצורה מתהפכת: מה שהיה בצד ימין עובר לצד שמאל.')}${P('≠',2,'בהזזה האות b נשארת b. בשיקוף היא הופכת ל־d.')}`),
LV(1,'ידע',SUP,'שקפו את '+E('A(2, 3)')+' בישר '+E('x = 5')+'.',P(E('5 − 2 = 3'),1,'A רחוקה 3 משמאל לישר.')+P(E('5 + 3 = 8'),2,'עוברים 3 לצד השני.')+P(E('A′(8, 3)'),3,'הגובה (y) לא משתנה.')),
LV(2,'יישום',SUP,'שקפו את המשולש '+E('(1, 1), (3, 1), (1, 4)')+' בישר '+E('x = 5')+'.',P(E('(1, 1) → (9, 1)'),1,'מרחק 4 משמאל → 4 מימין.')+P(E('(3, 1) → (7, 1)'),2,'מרחק 2 משמאל → 2 מימין.')+P(E('(1, 4) → (9, 4)'),3,'הקודקודים החדשים: (9, 1), (7, 1), (9, 4).')),
LV(3,'הבנה ונימוק',BANK,'האות b הפכה לאות d. איזו טרנספורמציה זו? האם d חופפת ל־b?',P('שיקוף',1,'האות התהפכה: שיקוף.')+P('≅',2,'האורכים והזוויות לא השתנו.')+P('✔',3,'כן, היא חופפת.')),
LV(4,'חשיבה',BANK,'הנקודה '+E('(2, 5)')+' עברה ל־'+E('(8, 5)')+'. הציעו שתי טרנספורמציות שונות.',P(E('x = 5'),1,'שיקוף בישר x = 5: האמצע בין 2 ל־8 הוא 5.')+P('6 ימינה',2,'או הזזה של 6 יחידות ימינה.')+P('2',3,'שתי טרנספורמציות שונות מביאות לאותה נקודה.')),
PRAC('שיקוף: לצד השני של הישר, באותו מרחק · הצורה חופפת','',[]),
...TSL(14),
EXIT([QX('שקפו את '+E('(1, 2)')+' בישר '+E('x = 4')+'.',E('(7, 2)')),QX('לאן עוברת נקודה שנמצאת על ישר השיקוף?','היא נשארת במקומה'),QX('על חזית אמבולנס המילה כתובה הפוך. למה?'+BANK,'כדי שהנהג שלפניו יקרא אותה נכון במראה: שיקוף')])
];

/* ---------- שיעור 14 · סיבוב ---------- */
const S14=[
COV('l14',15,'סיבוב','כיתה ז׳ · גאומטריה','בסיבוב סביב נקודה, כל נקודה מסתובבת סביב מרכז הסיבוב באותה זווית. הצורה המסובבת חופפת למקורית.',
 ['לסובב נקודה וצורה על משבצות סביב נקודה','לתאר סיבוב: מרכז, זווית וכיוון','להסביר למה הצורה המסובבת חופפת'],'גלגל, מחוגי שעון ומאוורר מסתובבים סביב נקודה אחת, ולא משתנים.'),
ENTRY([Q('כמה מעלות ברבע סיבוב?',E('90°')),Q('כמה מעלות בחצי סיבוב?',E('180°')),Q('שקפו את '+E('(2, 1)')+' בישר '+E('x = 4')+'.',E('(6, 1)'))]),
TERMS([['סיבוב','כל נקודה מסתובבת סביב נקודה קבועה באותה זווית ובאותו כיוון',E('90°')],['מרכז הסיבוב','הנקודה שסביבה מסתובבים. היא לא זזה',E('O')],['כיוון','עם כיוון השעון או נגד כיוון השעון',''],['סיבוב וחפיפה','בסיבוב האורכים והזוויות לא משתנים, ולכן הצורה המסובבת חופפת למקורית','']]),
H('הרעיון המרכזי','רבע סיבוב סביב O',RCSS+LAY(gridRotate([[2,2],[5,2],[2,4]],[2,2],90,['','A','B']),P(E('O(2, 2)'),1,'מרכז הסיבוב O לא זז.')+P(E('A(5, 2) → A′(2, 5)'),2,'A רחוקה 3 ימינה מ־O. אחרי רבע סיבוב נגד כיוון השעון היא רחוקה 3 למעלה.'))+P('≅',3,'כל הנקודות הסתובבו 90° סביב O. האורכים והזוויות לא השתנו: הצורה חופפת למקורית.')),
H('הטעות הנפוצה','"מסובבים בלי מרכז קבוע"',`<p class="step"><span class="wrong">כל נקודה מסתובבת סביב עצמה</span></p>${P('O',1,'בסיבוב יש מרכז אחד קבוע, וכל הנקודות מסתובבות סביבו.')}${P('O → O',2,'רק מרכז הסיבוב נשאר במקומו.')}`),
LV(1,'ידע',BANK,'המחוג הגדול של שעון זז מ־12 ל־3. איזו טרנספורמציה זו? בכמה מעלות?',P('סיבוב',1,'המחוג מסתובב סביב מרכז השעון.')+P(E('90°'),2,'מ־12 ל־3: רבע סיבוב.')+P('↻',3,'סיבוב של 90° בכיוון השעון.')),
LV(2,'יישום',SUP,'סובבו את '+E('A(4, 1)')+' ב־'+E('90°')+' נגד כיוון השעון סביב '+E('O(1, 1)')+'.',P(E('4 − 1 = 3'),1,'A רחוקה 3 ימינה מ־O.')+P('↺',2,'אחרי רבע סיבוב נגד כיוון השעון: 3 למעלה מ־O.')+P(E('A′(1, 4)'),3,'הנקודה החדשה: (1, 4).')),
LV(3,'הבנה ונימוק',SUP,'סובבו את '+E('(6, 4)')+' ב־'+E('180°')+' סביב '+E('(4, 4)')+'.',P(E('6 − 4 = 2'),1,'הנקודה רחוקה 2 ימינה מהמרכז.')+P(E('180°'),2,'חצי סיבוב: עוברים לצד ההפוך, באותו מרחק.')+P(E('(2, 4)'),3,'2 שמאלה מהמרכז: (2, 4).')),
LV(4,'חשיבה',SUP,'מסובבים צורה פעמיים ב־'+E('180°')+' סביב אותה נקודה. איפה תהיה?',P(E('180° + 180° = 360°'),1,'שני חצאי סיבוב יחד: סיבוב שלם.')+P('↺',2,'סיבוב שלם מחזיר כל נקודה למקומה.')+P('✔',3,'הצורה חוזרת בדיוק למקום המקורי.')),
PRAC('סיבוב: מרכז קבוע · זווית · כיוון · הצורה חופפת','',[]),
...TSL(15),
EXIT([QX('סובבו את '+E('(3, 1)')+' ב־'+E('90°')+' נגד כיוון השעון סביב '+E('(1, 1)')+'.',E('(1, 3)')),QX('האם מרכז הסיבוב זז?','לא'),QX('האם צורה מסובבת חופפת למקורית? נמקו.','כן: האורכים והזוויות לא משתנים')])
];

const MENU=menu('כיתה ז׳ · לפי פריסת משרד החינוך ותוכנית בית הספר',[
 {id:'l0',n:1,t:'שיעור 1 · ערך מוחלט',d:'מספרים מכוונים'},{id:'l1',n:2,t:'שיעור 2 · חיבור = תזוזה על הציר',d:'מספרים מכוונים'},{id:'l2',n:3,t:'שיעור 3 · כללי הסימנים בחיבור',d:'מספרים מכוונים'},
 {id:'l3',n:4,t:'שיעור 4 · חיבור של כמה מחוברים',d:'מספרים מכוונים'},{id:'l4',n:5,t:'שיעור 5 · חיסור = חיבור של המספר הנגדי',d:'מספרים מכוונים'},
 {id:'l5',n:6,t:'שיעור 6 · השמטת סוגריים',d:'מספרים מכוונים'},{id:'l6',n:7,t:'שיעור 7 · ביטויים בלי סוגריים',d:'מספרים מכוונים'},
 {id:'l7',n:8,t:'שיעור 8 · זווית כמידת סיבוב',d:'גאומטריה'},{id:'l8',n:9,t:'שיעור 9 · זוויות צמודות',d:'גאומטריה'},
 {id:'l9',n:10,t:'שיעור 10 · סוגי משולשים',d:'גאומטריה'},{id:'l10',n:11,t:'שיעור 11 · סכום הזוויות במשולש',d:'גאומטריה'},
 {id:'l11',n:12,t:'שיעור 12 · סכום הזוויות במרובע',d:'גאומטריה'},{id:'l12',n:13,t:'שיעור 13 · צורות חופפות והזזה',d:'גאומטריה'},
 {id:'l13',n:14,t:'שיעור 14 · שיקוף',d:'גאומטריה'},{id:'l14',n:15,t:'שיעור 15 · סיבוב',d:'גאומטריה'}]);
MENU.html=MENU.html.replace('נושאי השבוע','נושאי נובמבר').replace('<h1>','<h1 id="lmenu">');MENU.html=`<style>.menu{display:grid;grid-template-columns:1fr 1fr;gap:.7cqw}.menu button{padding:.35cqw .9cqw;font-size:1.4cqw}</style>`+MENU.html;
['l7','l8','l9','l10','l11','l12','l13','l14'].forEach(id=>{MENU.html=MENU.html.replace(`<button type="button" data-to="${id}">`,`<button type="button" class="geo" data-to="${id}">`);});
MENU.html=`<style>.menu button.geo{border-color:#2fbf71;background:#0f2a1f}.menu button.geo .chip{background:#2fbf71;color:#05210f}.menu button.geo small{color:#8fe3b5}</style>`+MENU.html;
const SLIDES=[MENU,...SA,...S1,...S2,...S3,...S4,...S5,...S6,...S7n,...S8n,...S7,...S8,...S9,...S10,...S13,...S14];
