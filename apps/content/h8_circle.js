/*META {"id":"h8_circle","title":"מעגל ועיגול · ערכה: רוני מודן","short":"מעגל","topic":"מעגל ועיגול","glyph":"π","color":"#5ec8ff"} */
/* מעגל ועיגול · יסוד מארגן אחד לכל השאלות: "כרטיס המעגל" רדיוס | קוטר | היקף | שטח. התשובות עם π, כמו בספר (25π). */
const APP={key:'h8circle',topic:'מעגל ועיגול',total:25,sub:'כרטיס אחד פותר הכול: קודם רדיוס וקוטר, אחר כך היקף ושטח. התשובות עם π.',
 rc:{'מעגל או עיגול?':0,'מה הקטע?':1,'מרדיוס לקוטר':1,'מקוטר לרדיוס':1,'היקף מרדיוס':3,'היקף מקוטר':3,'מההיקף לרדיוס':3,'גלגל מסתובב':3,
  'שטח מרדיוס':4,'שטח מקוטר':4,'מהשטח לרדיוס':4,'היקף וגם שטח':4,'חצי עיגול':4,'הרדיוס גדל':5,'טבעת':4,'כמה סיבובים':3,'איזו פיצה גדולה יותר?':4}};
document.head.insertAdjacentHTML('beforeend',`<style>
table.ct{border-collapse:separate;border-spacing:0;font-family:Rubik;font-weight:700;margin:6px auto;direction:rtl}
.ct th,.ct td{border:2px solid var(--line);padding:6px 10px;text-align:center;font-size:21px;min-width:66px;height:44px}
.ct th{background:var(--chip);font-size:15px}.ct .giv{background:#ffb02040;color:#ffd27a}.ct .calc{color:var(--ok)}.ct td.calc{font-size:16px}
.ct .ask{border:3px dashed var(--blue);color:var(--blue);font-size:26px}.ct .bad{border:3px solid var(--red);background:#ff4d5e2e;color:#ffb3bb}
.ct .vv{direction:ltr;unicode-bidi:isolate;display:inline-block;white-space:nowrap}
.cd{display:block;margin:0 auto;width:100%;max-width:230px;height:auto}
@keyframes rollw{from{transform:translateX(0) rotate(0)}to{transform:translateX(var(--L)) rotate(360deg)}}
.roll{transform-box:fill-box;transform-origin:center;animation:rollw 2.6s ease-in-out forwards;animation-delay:var(--d,0s)}
@media (max-width:560px){.ct th,.ct td{padding:4px 4px;min-width:0;font-size:16px;height:40px}.ct th{font-size:12px}.ct td.calc{font-size:12.5px}}
</style>`);
const fmt=n=>(+(+n).toFixed(3)).toLocaleString('en-US');
const PI=c=>M(fmt(c)+'π');
const CK=(lab,opts,ok,why)=>{const o=shuf(opts);return {lab,choice:o,correct:o.indexOf(ok),why};};
const RC=OR,DC=BL,PC=GR,AC=PU; /* צבע קבוע: רדיוס כתום, קוטר כחול, היקף ירוק, שטח סגול */
/* ===== כרטיס המעגל: היסוד המארגן =====
 K={v:[r,d,P,A] (P,A כמקדם של π), g:[אינדקסים נתונים], a:אינדקס מבוקש, x:{i:'חישוב'}, show:[אילו עמודות להציג] } */
const KH=[['רדיוס r',RC],['קוטר d',DC],['היקף',PC],['שטח',AC]];
function CT(K,hl,bad){const cols=K.show||[0,1,2,3],val=i=>i>=2?fmt(K.v[i])+'π':fmt(K.v[i]);
 return `<table class="ct"><tr>${cols.map(i=>`<th style="color:${KH[i][1]}">${KH[i][0]}</th>`).join('')}</tr><tr>${cols.map(i=>{let cls='',t='';
  if(bad&&bad.i===i){cls='bad';t=i>=2?fmt(bad.val)+'π':fmt(bad.val);}
  else if(K.g.includes(i)){cls='giv';t=val(i);}
  else if(hl){cls='calc';t=K.x&&K.x[i]?K.x[i]:val(i);}
  else if(K.a===i){cls='ask';t='?';}
  return `<td class="${cls}">${t?`<span class="vv">${t}</span>`:''}</td>`;}).join('')}</tr></table>`;}
/* ציור המעגל: m='r' רדיוס, 'd' קוטר, 'ch' מיתר; lab=תווית; fill=עיגול צבוע */
function CD(o={}){const m=o.m||'r',lab=o.lab!=null?o.lab:'',c=m==='d'?DC:m==='ch'?'#ffd27a':RC;let seg='',tx='';
 if(m==='r'){seg=`<line x1="110" y1="110" x2="190" y2="110" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`;tx=`<text x="150" y="100" fill="${c}" font-size="20" font-weight="900" text-anchor="middle" font-family="Rubik" direction="ltr">${lab}</text>`;}
 if(m==='d'){seg=`<line x1="30" y1="110" x2="190" y2="110" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`;tx=`<text x="110" y="100" fill="${c}" font-size="20" font-weight="900" text-anchor="middle" font-family="Rubik" direction="ltr">${lab}</text>`;}
 if(m==='ch'){seg=`<line x1="41" y1="150" x2="179" y2="150" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`;tx='';}
 return `<svg class="cd" viewBox="0 0 220 220" role="img" aria-label="מעגל"><circle cx="110" cy="110" r="80" fill="${o.fill?'#c084fc33':'none'}" stroke="${o.ring===false?'#4a6283':PC}" stroke-width="${o.fill?3:5}"/>${o.hole?`<circle cx="110" cy="110" r="${o.hole}" fill="#13233a" stroke="${PC}" stroke-width="3"/>`:''}${o.half?`<rect x="20" y="110" width="180" height="100" fill="#13233a"/><line x1="30" y1="110" x2="190" y2="110" stroke="${DC}" stroke-width="4"/>`:''}${seg}<circle cx="110" cy="110" r="5" fill="#f3f6fb"/><text x="104" y="132" fill="#f3f6fb" font-size="15" font-weight="800" font-family="Rubik">O</text>${tx}</svg>`;}
const RED=(q,x,msg)=>`${msg}<div style="margin-top:6px">${CT(q.K,false,{i:q.K.a,val:x})}</div>`;
const kard=q=>{const f=q.fig||{};q.dia=hl=>`<div style="display:flex;flex-direction:column;align-items:center;gap:2px;width:100%"><div style="width:100%;max-width:170px">${CD(f)}</div>${CT(q.K,hl)}</div>`;return q;};
const DX=q=>{const d=q.diag;q.diag=o=>(d&&d(o))||RED(q,o.vals[0],'בודקים בכרטיס: קודם רדיוס וקוטר, ואז הנוסחה.');return q;};
const card=(r,a,g,x,show)=>({v:[r,2*r,2*r,r*r],g,a,x,show});
const PIT=[{label:'',col:PC,val:0}];
const piAns=(v,col)=>({tpl:'[] π',ans:[{label:'מקדם של π',col:col||PC,val:v}]});
/* ===== ★ רדיוס וקוטר ===== */
function genRtoD(){const r=R(2,15);
 const q=kard({kind:'מרדיוס לקוטר',fig:{m:'d',lab:'?'},text:`הרדיוס של המעגל הוא ${M(r)} ס״מ. מה אורך הקוטר?`,ans:[{label:'ס״מ',col:DC,val:2*r}],K:card(r,1,[0],{1:`2 · ${r} = ${2*r}`},[0,1]),
 work:[{t:`קוטר = 2 רדיוסים: ${M('2 · '+r+' = ?')}`,ans:[{label:'ס״מ',val:2*r}],why:'הקוטר עובר דרך המרכז: רדיוס אחד לכל צד.'}],
 lines:[`קוטר = רדיוס + רדיוס`,`${M(r+' + '+r+' = '+2*r)} ס״מ`],rule:'קוטר = 2 · רדיוס.'});
 q.diag=({vals:[x]})=>x*2===r?RED(q,x,'הפוך! הקוטר <b>גדול</b> מהרדיוס: פי 2.'):x===r?RED(q,x,'זה הרדיוס. הקוטר = 2 רדיוסים.'):null;return DX(q);}
function genDtoR(){const r=R(2,15);
 const q=kard({kind:'מקוטר לרדיוס',fig:{m:'r',lab:'?'},text:`הקוטר של המעגל הוא ${M(2*r)} ס״מ. מה אורך הרדיוס?`,ans:[{label:'ס״מ',col:RC,val:r}],K:card(r,0,[1],{0:`${2*r} : 2 = ${r}`},[1,0]),
 work:[{t:`רדיוס = חצי קוטר: ${M(2*r+' : 2 = ?')}`,ans:[{label:'ס״מ',val:r}],why:'הקוטר הוא שני רדיוסים ← מחלקים ב־2.'}],
 lines:[`רדיוס = חצי קוטר`,`${M(2*r+' : 2 = '+r)} ס״מ`],rule:'רדיוס = קוטר : 2.'});
 q.diag=({vals:[x]})=>x===4*r?RED(q,x,'כפלתם. הרדיוס <b>קטן</b> מהקוטר: מחלקים ב־2.'):x===2*r?RED(q,x,'זה הקוטר. הרדיוס הוא חצי ממנו.'):null;return DX(q);}
function genName(){const m=pick(['r','d','ch']),nm={r:'רדיוס',d:'קוטר',ch:'מיתר'}[m],opts=['רדיוס','קוטר','מיתר'];
 return {kind:'מה הקטע?',dia:()=>CD({m}),text:'איך נקרא הקטע הצבוע במעגל?',choice:opts,correct:opts.indexOf(nm),
 work:[{t:'האם הקטע עובר דרך המרכז O?',choice:['כן','לא'],correct:m==='ch'?1:0,why:'מסתכלים על הנקודה O באמצע.'},{t:'הקטע מתחיל במרכז, או עובר מצד לצד?',choice:['מתחיל במרכז','עובר מצד לצד'],correct:m==='r'?0:1,why:'רדיוס מתחיל במרכז. קוטר ומיתר עוברים מצד לצד.'}],
 lines:[m==='r'?'מהמרכז O אל המעגל ← <b>רדיוס</b>.':m==='d'?'מצד לצד, דרך המרכז O ← <b>קוטר</b>.':'מצד לצד, <b>לא</b> דרך המרכז ← <b>מיתר</b>.'],rule:'רדיוס: מהמרכז. קוטר: מצד לצד דרך המרכז. מיתר: מצד לצד, לא דרך המרכז.',
 diag:()=>'בודקים: הקטע עובר דרך המרכז O? מתחיל בו?'};}
const CVD=[['גדר מסביב לגינה עגולה','היקף'],['דשא שמכסה גינה עגולה','שטח'],['סרט שמקיף עוגה עגולה','היקף'],['מפה שמכסה שולחן עגול','שטח'],['ריצה סביב מסלול עגול','היקף'],['צבע לצביעת שלט עגול','שטח'],['חוט סביב צלחת','היקף'],['שטיח עגול לחדר','שטח']];
function genCvsD(){const [s,ok]=pick(CVD),opts=['היקף (אורך הקו של המעגל)','שטח (כל העיגול מבפנים)'],c=ok==='היקף'?0:1;
 return {kind:'מעגל או עיגול?',dia:()=>CD({fill:ok==='שטח',m:'none'}),text:`${s}: מחשבים היקף או שטח?`,choice:opts,correct:c,
 work:[{t:'מודדים קו מסביב, או מכסים את כל מה שבפנים?',choice:['קו מסביב','מכסים מבפנים'],correct:c,why:'קו מסביב = מעגל ← היקף. מכסים = עיגול ← שטח.'}],
 lines:[ok==='היקף'?'הולכים <b>מסביב</b> על הקו ← <b>היקף</b> (המעגל).':'מכסים את <b>כל מה שבפנים</b> ← <b>שטח</b> (העיגול).'],rule:'מעגל = הקו מסביב ← היקף. עיגול = כל מה שבפנים ← שטח.',
 diag:()=>'שואלים את עצמנו: הולכים על הקו מסביב, או מכסים את מה שבפנים?'};}
/* ===== ★★ היקף ===== */
function genPerimR(){const r=R(2,12);
 const q=kard({kind:'היקף מרדיוס',fig:{m:'r',lab:r},text:`רדיוס המעגל ${M(r)} ס״מ. מה ההיקף? (כתבו עם <span class="m">π</span>)`,...piAns(2*r),K:card(r,2,[0],{1:`2 · ${r} = ${2*r}`,2:`${2*r} · π = ${2*r}π`},[0,1,2]),
 work:[{t:`קודם הקוטר: ${M('2 · '+r+' = ?')}`,ans:[{label:'ס״מ',val:2*r}],why:'היקף = π · קוטר. אז קודם מוצאים את הקוטר.'},{t:`היקף = קוטר · π = <span class="m">?π</span>`,ans:[{label:'π',val:2*r}],why:'כופלים את הקוטר ב־π.'}],
 lines:[`קוטר = ${M('2 · '+r+' = '+2*r)}`,`היקף = ${M(2*r+' · π = '+2*r+'π')} ס״מ`],trick:'היקף = <span class="m">2 · π · r</span>. לא לשכוח את ה־2!',rule:'היקף = π · קוטר = <span class="m">2 · π · r</span>.'});
 q.diag=({vals:[x]})=>x===r?RED(q,x,'שכחתם את ה־<b>2</b>. היקף = π · <b>קוטר</b>, והקוטר = '+M(2*r)+'.'):x===r*r?RED(q,x,'זה השטח (r · r). ההיקף הוא <b>הקו מסביב</b>: π · קוטר.'):null;return DX(q);}
function genPerimD(){const r=R(2,12);
 const q=kard({kind:'היקף מקוטר',fig:{m:'d',lab:2*r},text:`קוטר המעגל ${M(2*r)} ס״מ. מה ההיקף? (כתבו עם <span class="m">π</span>)`,...piAns(2*r),K:card(r,2,[1],{2:`${2*r} · π = ${2*r}π`},[1,2]),
 work:[{t:`היקף = קוטר · π = <span class="m">?π</span>`,ans:[{label:'π',val:2*r}],why:'הקוטר כבר נתון ← כופלים ב־π.'}],
 lines:[`היקף = קוטר · π = ${M(2*r+' · π = '+2*r+'π')} ס״מ`],trick:'נתון קוטר? לא כופלים שוב ב־2!',rule:'היקף = π · קוטר.'});
 q.diag=({vals:[x]})=>x===4*r?RED(q,x,'זה המוקש! כפלתם ב־2 עוד פעם. '+M(2*r)+' הוא כבר <b>הקוטר</b>.'):x===r?RED(q,x,'חילקתם ב־2. היקף = π · <b>קוטר</b>, והקוטר נתון: '+M(2*r)+'.'):null;return DX(q);}
function genRfromP(){const r=R(2,12);
 const q=kard({kind:'מההיקף לרדיוס',fig:{m:'r',lab:'?'},text:`היקף המעגל הוא ${PI(2*r)} ס״מ. מה הרדיוס?`,ans:[{label:'ס״מ',col:RC,val:r}],K:card(r,0,[2],{1:`${2*r}π : π = ${2*r}`,0:`${2*r} : 2 = ${r}`},[2,1,0]),
 work:[{t:`היקף = קוטר · π ← הקוטר = ?`,ans:[{label:'ס״מ',val:2*r}],why:`${PI(2*r)} = קוטר · π ← הקוטר הוא המספר שליד π.`},{t:`רדיוס = ${M(2*r+' : 2 = ?')}`,ans:[{label:'ס״מ',val:r}],why:'רדיוס = חצי קוטר.'}],
 lines:[`${PI(2*r)} = קוטר · π ← קוטר = ${M(2*r)}`,`רדיוס = ${M(2*r+' : 2 = '+r)} ס״מ`],trick:'המספר שליד π בהיקף הוא הקוטר, לא הרדיוס!',rule:'היקף ← קוטר ← רדיוס.'});
 q.diag=({vals:[x]})=>x===2*r?RED(q,x,'זה <b>הקוטר</b>. הרדיוס הוא חצי ממנו.'):null;return DX(q);}
function genWheel(){const r=pick([10,15,20,25,30,35,40]),[w,v]=pick([['גלגל של אופניים','מתקדם'],['גלגל של עגלה','מתקדם'],['חישוק','מתגלגל']]);
 const q=kard({kind:'גלגל מסתובב',crack:[CK('סיבוב אחד של גלגל = ?',['ההיקף','השטח','הקוטר'],'ההיקף','בסיבוב אחד הגלגל "פורש" על הרצפה את כל הקו שמסביבו.')],fig:{m:'r',lab:r},text:`ל${w} רדיוס של ${M(r)} ס״מ. כמה ס״מ הוא ${v} בסיבוב אחד? (כתבו עם <span class="m">π</span>)`,...piAns(2*r),K:card(r,2,[0],{1:`2 · ${r} = ${2*r}`,2:`${2*r}π`},[0,1,2]),
 work:[{t:`הקוטר: ${M('2 · '+r+' = ?')}`,ans:[{label:'ס״מ',val:2*r}],why:'קודם הקוטר.'},{t:'סיבוב אחד = היקף = <span class="m">?π</span>',ans:[{label:'π',val:2*r}],why:'היקף = π · קוטר.'}],
 lines:['סיבוב אחד = <b>ההיקף</b> של הגלגל.',`היקף = ${M(2*r+' · π = '+2*r+'π')} ס״מ`],trick:'סיבוב אחד = היקף אחד.',rule:'סיבוב = היקף = π · קוטר.'});
 q.diag=({vals:[x]})=>x===r*r?RED(q,x,'חישבתם שטח. בסיבוב הגלגל עובר את <b>הקו מסביב</b> ← היקף.'):x===r?RED(q,x,'שכחתם את ה־2: היקף = π · <b>קוטר</b>.'):null;return DX(q);}
/* ===== ★★★ שטח ===== */
function genAreaR(){const r=R(2,12);
 const q=kard({kind:'שטח מרדיוס',fig:{m:'r',lab:r,fill:1},text:`רדיוס העיגול ${M(r)} ס״מ. מה השטח? (כתבו עם <span class="m">π</span>)`,...piAns(r*r,AC),K:card(r,3,[0],{3:`${r} · ${r} · π = ${r*r}π`},[0,3]),
 work:[{t:`r · r = ${M(r+' · '+r+' = ?')}`,ans:[{label:'',val:r*r}],why:'שטח = <span class="m">π · r · r</span>. קודם רדיוס כפול רדיוס.'},{t:'שטח = <span class="m">?π</span>',ans:[{label:'π',val:r*r}],why:'כופלים ב־π.'}],
 lines:[`שטח = <span class="m">π · r · r</span>`,`${M(r+' · '+r+' · π = '+r*r+'π')} סמ״ר`],trick:'שטח = <span class="m">r · r · π</span>. לא <span class="m">2 · r</span>!',rule:'שטח עיגול = <span class="m">π · r · r</span>.'});
 q.diag=({vals:[x]})=>x===2*r&&r!==2?RED(q,x,'זה המוקש! חישבתם 2 · r (זה הקוטר, להיקף). בשטח: <b>r · r</b> = '+M(r+' · '+r)+'.'):x===4*r*r?RED(q,x,'השתמשתם בקוטר במקום ברדיוס. בשטח: <b>רדיוס · רדיוס</b>.'):null;return DX(q);}
function genAreaD(){const r=R(2,10);
 const q=kard({kind:'שטח מקוטר',crack:[CK('מה נתון?',['הקוטר','הרדיוס','השטח'],'הקוטר','קוראים: "קוטר".'),CK('מה עושים קודם?',['מוצאים את הרדיוס','כופלים קוטר · קוטר','כופלים ב־π'],'מוצאים את הרדיוס','בשטח צריך <b>רדיוס</b>.')],fig:{m:'d',lab:2*r,fill:1},text:`קוטר העיגול ${M(2*r)} ס״מ. מה השטח? (כתבו עם <span class="m">π</span>)`,...piAns(r*r,AC),K:card(r,3,[1],{0:`${2*r} : 2 = ${r}`,3:`${r} · ${r} · π = ${r*r}π`},[1,0,3]),
 work:[{t:`רדיוס: ${M(2*r+' : 2 = ?')}`,ans:[{label:'ס״מ',val:r}],why:'בשטח צריך רדיוס. רדיוס = חצי קוטר.'},{t:`${M(r+' · '+r+' = ?')}`,ans:[{label:'',val:r*r}],why:'רדיוס · רדיוס.'},{t:'שטח = <span class="m">?π</span>',ans:[{label:'π',val:r*r}],why:'כופלים ב־π.'}],
 lines:[`רדיוס = ${M(2*r+' : 2 = '+r)}`,`שטח = ${M(r+' · '+r+' · π = '+r*r+'π')} סמ״ר`],trick:'נתון קוטר? קודם מחלקים ב־2. השטח צריך רדיוס!',rule:'קוטר ← רדיוס ← <span class="m">π · r · r</span>.'});
 q.diag=({vals:[x]})=>x===4*r*r?RED(q,x,'זה המוקש! כפלתם <b>קוטר · קוטר</b>. קודם רדיוס: '+M(2*r+' : 2 = '+r)+'.'):x===2*r?RED(q,x,'זה ההיקף. השטח = <span class="m">π · r · r</span>.'):null;return DX(q);}
function genRfromA(){const r=R(2,12);
 const q=kard({kind:'מהשטח לרדיוס',fig:{m:'r',lab:'?',fill:1},text:`שטח העיגול הוא ${PI(r*r)} סמ״ר. מה הרדיוס?`,ans:[{label:'ס״מ',col:RC,val:r}],K:card(r,0,[3],{0:`? · ? = ${r*r} ← ${r}`},[3,0]),
 work:[{t:`r · r = ${M(r*r)}. איזה מספר כפול עצמו נותן ${M(r*r)}?`,ans:[{label:'ס״מ',val:r}],why:'מחפשים בלוח הכפל: מספר · אותו מספר.'}],
 lines:[`${PI(r*r)} = <span class="m">r · r · π</span> ← ${M('r · r = '+r*r)}`,`${M(r+' · '+r+' = '+r*r)} ← רדיוס = ${M(r)} ס״מ`],trick:'לא מחלקים ב־2! מחפשים מספר שכפול עצמו נותן '+r*r+'.',rule:'שטח ← <span class="m">r · r</span> ← איזה מספר כפול עצמו?'});
 q.diag=({vals:[x]})=>x*2===r*r?RED(q,x,'זה המוקש! חילקתם ב־2. בשטח r · r, אז מחפשים מספר <b>כפול עצמו</b>.'):x===r*r?RED(q,x,'זה r · r. הרדיוס הוא המספר שכפול עצמו נותן '+M(r*r)+'.'):null;return DX(q);}
function genBoth(){const r=R(2,10);
 const q=kard({kind:'היקף וגם שטח',fig:{m:'r',lab:r,fill:1},text:`רדיוס העיגול ${M(r)} ס״מ. מצאו את ההיקף ואת השטח (עם <span class="m">π</span>).`,ans:[{label:'היקף (המספר לפני π)',col:PC,val:2*r},{label:'שטח (המספר לפני π)',col:AC,val:r*r}],K:card(r,2,[0],{1:`2 · ${r} = ${2*r}`,2:`${2*r}π`,3:`${r} · ${r} · π = ${r*r}π`},[0,1,2,3]),
 work:[{t:`היקף = π · קוטר = <span class="m">?π</span>`,ans:[{label:'π',val:2*r}],why:`קוטר = ${M(2*r)}.`},{t:`שטח = <span class="m">π · r · r</span> = <span class="m">?π</span>`,ans:[{label:'π',val:r*r}],why:`${M(r+' · '+r)}.`}],
 lines:[`היקף = ${M('2 · '+r+' · π = '+2*r+'π')} ס״מ`,`שטח = ${M(r+' · '+r+' · π = '+r*r+'π')} סמ״ר`],trick:'היקף = <span class="m">2 · r · π</span> (קו). שטח = <span class="m">r · r · π</span> (בפנים).',rule:'היקף: π · קוטר. שטח: <span class="m">π · r · r</span>.'});
 q.K.a=2;q.diag=({vals:[x,y]})=>x===r*r&&y===2*r?'החלפתם! <b>היקף</b> = הקו = π · קוטר. <b>שטח</b> = בפנים = <span class="m">π · r · r</span>.':null;return DX(q);}
/* ===== ★★★★ חשיבה מסדר גבוה ===== */
function genHalf(){const r=2*R(1,6);
 const q=kard({kind:'חצי עיגול',crack:[CK('מה מחשבים קודם?',['שטח של עיגול שלם','היקף','קוטר · 2'],'שטח של עיגול שלם','חצי עיגול = חצי מהשטח של העיגול השלם.')],fig:{m:'r',lab:r,fill:1,half:1},text:`הגינה בצורת <b>חצי עיגול</b> ברדיוס ${M(r)} מטר. מה השטח של הגינה? (עם <span class="m">π</span>)`,...piAns(r*r/2,AC),K:card(r,3,[0],{3:`${r*r}π : 2 = ${r*r/2}π`},[0,3]),
 work:[{t:`עיגול שלם: ${M(r+' · '+r+' = ?')}π`,ans:[{label:'π',val:r*r}],why:'קודם השטח של כל העיגול.'},{t:`חצי: ${M(r*r+' : 2 = ?')}π`,ans:[{label:'π',val:r*r/2}],why:'חצי עיגול = חצי מהשטח.'}],
 lines:[`עיגול שלם: ${PI(r*r)}`,`חצי עיגול: ${M(r*r+'π : 2 = '+r*r/2+'π')} מ״ר`],trick:'קודם כל העיגול, ואז מחלקים ב־2.',rule:'חצי עיגול = (<span class="m">π · r · r</span>) : 2.'});
 q.diag=({vals:[x]})=>x===r*r?RED(q,x,'זה העיגול <b>השלם</b>. הגינה היא רק חצי.'):x===r*r/4?RED(q,x,'חילקתם את הרדיוס ב־2. הרדיוס נשאר '+M(r)+'; רק את <b>השטח</b> מחלקים ב־2.'):null;return DX(q);}
function genScale(){const k=pick([2,3]),wa=Math.random()<.5,ok=wa?k*k:k,opts=[...new Set([`פי ${k*k}`,`פי ${k}`,`פי ${2*k}`,'לא משתנה'])],c=opts.indexOf(`פי ${ok}`);
 return {kind:'הרדיוס גדל',crack:[CK('איך בודקים?',['מחשבים לפני ואחרי עם רדיוס לדוגמה','מנחשים','מחברים'],'מחשבים לפני ואחרי עם רדיוס לדוגמה','בוחרים רדיוס קל, למשל 1, ומשווים.')],dia:()=>`<div style="display:flex;gap:8px;justify-content:center;align-items:center"><div style="width:${70}px">${CD({fill:wa,m:'none'})}</div><div style="width:${70*k}px;max-width:200px">${CD({fill:wa,m:'none'})}</div></div>`,
 text:`הרדיוס של עיגול גדל <b>פי ${k}</b>. פי כמה גדל ה${wa?'<b>שטח</b>':'<b>היקף</b>'}?`,choice:opts,correct:c,
 work:[{t:`רדיוס ${M(1)}: ${wa?'השטח':'ההיקף'} = <span class="m">?π</span>`,ans:[{label:'π',val:wa?1:2}],why:wa?'שטח = 1 · 1 · π.':'היקף = <span class="m">2 · 1 · π</span>.'},{t:`רדיוס ${M(k)}: ${wa?'השטח':'ההיקף'} = <span class="m">?π</span>`,ans:[{label:'π',val:wa?k*k:2*k}],why:wa?`${M(k+' · '+k)}.`:`${M('2 · '+k)}.`},{t:'פי כמה גדל?',choice:opts,correct:c,why:'משווים: אחרי : לפני.'}],
 lines:wa?[`רדיוס 1 ← שטח ${M('π')}. רדיוס ${k} ← שטח ${PI(k*k)}.`,`השטח גדל <b>פי ${k*k}</b>, כי r · r: ${M(k+' · '+k+' = '+k*k)}.`]:[`רדיוס 1 ← היקף ${PI(2)}. רדיוס ${k} ← היקף ${PI(2*k)}.`,`ההיקף גדל <b>פי ${k}</b>, בדיוק כמו הרדיוס.`],
 trick:wa?`הרדיוס פי ${k} ← השטח פי ${k*k}! (r · r)`:`הרדיוס פי ${k} ← ההיקף גם פי ${k}.`,rule:'מנסים רדיוס לדוגמה ומשווים לפני ואחרי.',
 diag:({sel})=>wa&&opts[sel]===`פי ${k}`?'זה המוקש! בשטח יש r · r, ולכן כל אחד מהם גדל פי '+M(k)+'. חשבו עם רדיוס 1 ורדיוס '+M(k)+'.':'חשבו לפני ואחרי עם רדיוס קל, למשל 1.'};}
function genRing(){const [Rb,rs]=pick([[10,5],[5,3],[5,4],[6,4],[7,3],[8,6],[10,6],[10,8],[9,5],[6,2]]);
 const q={kind:'טבעת',crack:[CK('איך מחשבים טבעת?',['עיגול גדול פחות עיגול קטן','עיגול גדול ועוד עיגול קטן','רק העיגול הגדול'],'עיגול גדול פחות עיגול קטן','הטבעת = העיגול הגדול, בלי החור.')],dia:hl=>CD({m:'r',lab:Rb,fill:1,hole:Math.round(80*rs/Rb)}),
 text:`תבנית עוגה עגולה: הרדיוס ${M(Rb)} ס״מ, ובאמצע חור עגול ברדיוס ${M(rs)} ס״מ. מה השטח של התבנית (בלי החור)? (עם <span class="m">π</span>)`,...piAns(Rb*Rb-rs*rs,AC),
 work:[{t:`עיגול גדול: ${M(Rb+' · '+Rb+' = ?')}π`,ans:[{label:'π',val:Rb*Rb}],why:'השטח של כל העיגול.'},{t:`החור: ${M(rs+' · '+rs+' = ?')}π`,ans:[{label:'π',val:rs*rs}],why:'השטח של החור.'},{t:`${M(Rb*Rb+'π − '+rs*rs+'π = ?')}π`,ans:[{label:'π',val:Rb*Rb-rs*rs}],why:'מורידים את החור.'}],
 lines:[`גדול: ${PI(Rb*Rb)}; חור: ${PI(rs*rs)}`,`טבעת: ${M(Rb*Rb+'π − '+rs*rs+'π = '+(Rb*Rb-rs*rs)+'π')} סמ״ר`],trick:`לא ${Rb}−${rs} ואז בריבוע! קודם כל שטח, ואז מחסרים.`,rule:'טבעת = שטח גדול − שטח קטן.',
 diag:({vals:[x]})=>x===(Rb-rs)*(Rb-rs)?'זה המוקש! חיסרתם את <b>הרדיוסים</b>. מחשבים <b>שני שטחים</b>, ואז מחסרים.':x===Rb*Rb+rs*rs?'<b>חיברתם</b>. החור לא חלק מהתבנית ← מחסרים.':x===Rb*Rb?'זה כל העיגול, עם החור. מורידים את החור.':null};return q;}
function genTurns(){const d=pick([40,50,60,70,80]),n=pick([10,20,5,100,3]);
 return {kind:'כמה סיבובים',crack:[CK('סיבוב אחד = ?',['היקף אחד','קוטר אחד','שטח אחד'],'היקף אחד','בכל סיבוב הגלגל עובר את ההיקף שלו.')],dia:()=>CD({m:'d',lab:d}),
 text:`קוטר הגלגל ${M(d)} ס״מ. הגלגל הסתובב ${M(n)} סיבובים. כמה ס״מ הוא עבר? (עם <span class="m">π</span>)`,...piAns(d*n),
 work:[{t:`סיבוב אחד = היקף = <span class="m">?π</span>`,ans:[{label:'π',val:d}],why:'היקף = π · קוטר.'},{t:`${M(n)} סיבובים: ${M(d+'π · '+n+' = ?')}π`,ans:[{label:'π',val:d*n}],why:'כל סיבוב = עוד היקף.'}],
 lines:[`סיבוב = ${PI(d)}`,`${M(n)} סיבובים: ${M(d+'π · '+n+' = '+d*n+'π')} ס״מ`],trick:'סיבוב אחד = היקף אחד. כופלים במספר הסיבובים.',rule:'מרחק = היקף · מספר סיבובים.',
 diag:({vals:[x]})=>x===2*d*n?'כפלתם ב־2 מיותר: '+M(d)+' הוא כבר <b>הקוטר</b>.':x===d?'זה סיבוב <b>אחד</b>. היו '+M(n)+'.':null};}
function genPizza(){const [D1,D2,k]=pick([[30,20,2],[40,30,2],[20,10,3],[30,10,5],[40,20,3],[60,40,2]]),r1=D1/2,r2=D2/2,A1=r1*r1,A2=k*r2*r2,c=A1>A2?0:A1<A2?1:2,opts=['פיצה אחת גדולה','הפיצות הקטנות ביחד','שווה'];
 return {kind:'איזו פיצה גדולה יותר?',crack:[CK('מה משווים?',['שטח','היקף','קוטר'],'שטח','כמות הפיצה = מה שבפנים ← שטח.')],dia:()=>`<div style="display:flex;gap:10px;justify-content:center;align-items:center"><div style="width:${D1*3}px;max-width:150px">${CD({fill:1,m:'d',lab:D1})}</div><div style="display:flex;gap:4px;flex-wrap:wrap;width:${Math.min(D2*3*Math.min(k,3),170)}px">${Array.from({length:k},()=>`<div style="width:${D2*3}px;max-width:56px">${CD({fill:1,m:'none'})}</div>`).join('')}</div></div>`,
 text:`פיצה אחת בקוטר ${M(D1)} ס״מ, או ${M(k)} פיצות בקוטר ${M(D2)} ס״מ. איפה יש יותר פיצה?`,choice:opts,correct:c,
 work:[{t:`פיצה גדולה: רדיוס ${M(r1)} ← שטח = <span class="m">?π</span>`,ans:[{label:'π',val:A1}],why:`${M(r1+' · '+r1)}.`},{t:`פיצה קטנה: רדיוס ${M(r2)} ← שטח = <span class="m">?π</span>`,ans:[{label:'π',val:r2*r2}],why:`${M(r2+' · '+r2)}.`},{t:`${M(k)} קטנות: ${M(r2*r2+'π · '+k+' = ?')}π`,ans:[{label:'π',val:A2}],why:'כופלים במספר הפיצות.'},{t:'איפה יותר?',choice:opts,correct:c,why:'משווים את המספרים שליד π.'}],
 lines:[`גדולה: ${PI(A1)}; ${M(k)} קטנות: ${M(k+' · '+r2*r2+'π = '+A2+'π')}`,`יותר פיצה: <b>${opts[c]}</b>.`],trick:'משווים שטח (<span class="m">r · r · π</span>), לא קוטר!',rule:'מחשבים שטח לכל פיצה, ומשווים.',
 diag:()=>'אל תשוו קטרים. כמות הפיצה = <b>שטח</b>: <span class="m">π · r · r</span>.'};}
/* ===== חימום ===== */
const WARM=[genRtoD,genDtoR,genName,genCvsD,genRtoD,genDtoR,genName,genCvsD];
/* ===== שלבים: 25 שאלות בכל שלב ===== */
const LAD=[
 [{g:genCvsD,n:7,h:2},{g:genName,n:6,h:2},{g:genRtoD,n:6,h:2},{g:genDtoR,n:6,h:1}],
 [{g:genPerimD,n:6,h:2},{g:genPerimR,n:7,h:1},{g:genRfromP,n:6,h:1},{g:genWheel,n:6,h:1}],
 [{g:genAreaR,n:7,h:1},{g:genAreaD,n:7,h:1},{g:genRfromA,n:5,h:1},{g:genBoth,n:6,h:0}],
 [{g:genHalf,n:6,h:1},{g:genScale,n:6,h:1},{g:genRing,n:5,h:0},{g:genTurns,n:4,h:0},{g:genPizza,n:4,h:0}]];
const LEVELS=[
 {n:1,t:'מעגל, רדיוס וקוטר',d:'מעגל או עיגול? ← רדיוס, קוטר, מיתר ← קוטר = 2 · רדיוס',ladder:LAD[0]},
 {n:2,t:'היקף',d:'היקף = π · קוטר ← מרדיוס ← חזרה לרדיוס ← גלגל',ladder:LAD[1]},
 {n:3,t:'שטח',d:'שטח = <span class="m">π · r · r</span> ← מקוטר ← חזרה לרדיוס ← היקף וגם שטח',ladder:LAD[2]},
 {n:4,t:'חשיבה ושאלות מפמ״ר',d:'חצי עיגול ← הרדיוס גדל ← טבעת ← סיבובים ← פיצה',ladder:LAD[3]}];
LEVELS.forEach(l=>l.g=()=>pick(l.ladder).g());
const TEST=[[genCvsD,genName,genRtoD,genDtoR],[genPerimD,genPerimR,genRfromP,genWheel],[genAreaR,genAreaD,genRfromA,genBoth],[genHalf,genScale,genRing,genPizza]];
/* ===== הסבר מונפש ===== */
const L3=Math.PI*60;
const RECAP=[
 {h:'מעגל ועיגול',d:1.6,svg:()=>`<div style="display:flex;gap:18px;justify-content:center"><div style="width:120px">${CD({m:'none'})}<div class="say">מעגל = <b style="color:${PC}">הקו</b></div></div><div class="rv" style="--d:.8s;width:120px">${CD({m:'none',fill:1,ring:false})}<div class="say">עיגול = <b style="color:${AC}">כל מה שבפנים</b></div></div></div>`,
  says:['קו מסביב ← <b>היקף</b>. מה שבפנים ← <b>שטח</b>.'],what:'מעגל = קו. עיגול = משטח.'},
 {h:'רדיוס וקוטר',d:1.4,svg:()=>`<div style="display:flex;gap:18px;justify-content:center"><div style="width:120px">${CD({m:'r',lab:'r'})}</div><div class="rv" style="--d:.7s;width:120px">${CD({m:'d',lab:'d'})}</div></div>`,
  says:[`<b style="color:${RC}">רדיוס</b>: מהמרכז אל הקו.`,`<b style="color:${DC}">קוטר</b> = 2 רדיוסים, דרך המרכז.`],what:'קוטר = 2 · רדיוס.'},
 {h:'מה זה π?',d:3.2,svg:()=>`<svg viewBox="0 0 300 120" style="width:100%;max-width:320px" role="img" aria-label="גלגל מתגלגל ופורש את ההיקף: קצת יותר מ־3 קטרים"><line x1="10" y1="80" x2="${10+L3}" y2="80" stroke="${PC}" stroke-width="5" class="rv" style="--d:2.6s"/><g class="roll" style="--L:${L3}px;--d:.2s"><circle cx="40" cy="50" r="30" fill="none" stroke="${PC}" stroke-width="5"/><line x1="10" y1="50" x2="70" y2="50" stroke="${DC}" stroke-width="4"/></g>${[0,1,2].map(i=>`<rect class="rv" style="--d:${3+i*.4}s" x="${10+i*60}" y="92" width="58" height="10" rx="3" fill="${DC}"/>`).join('')}<rect class="rv" style="--d:4.3s" x="190" y="92" width="${L3-180}" height="10" rx="3" fill="${RD}"/><text class="rv" style="--d:4.5s" x="150" y="118" fill="#f3f6fb" font-size="13" font-weight="800" text-anchor="middle" font-family="Rubik">3 קטרים ועוד קצת = π קטרים</text></svg>`,
  says:[`ההיקף = בערך ${M('3.14')} קטרים. למספר הזה קוראים ${M('π')}.`],what:'π = כמה קטרים נכנסים בהיקף.'},
 {h:'היקף',d:.5,svg:()=>`${CD({m:'d',lab:'d'})}`,says:[`היקף = ${M('π · d')}`,`ו־${M('d = 2 · r')} ← היקף = ${M('<span class="m">2 · π · r</span>')}`],what:'קודם קוטר, ואז כופלים ב־π.'},
 {h:'שטח: פורסים את העיגול',d:2.4,svg:()=>{const n=8,w=30,h=60;let s='';for(let i=0;i<n;i++){const x=10+i*w/1,up=i%2===0;s+=`<path class="rv" style="--d:${.3+i*.2}s" d="${up?`M${x} 75 L${x+w} 75 L${x+w/2} ${75-h} Z`:`M${x} ${75-h} L${x+w} ${75-h} L${x+w/2} 75 Z`}" fill="${up?AC:'#9b6be0'}" stroke="#13233a" stroke-width="2"/>`;}
  return `<svg viewBox="0 0 270 110" style="width:100%;max-width:320px" role="img" aria-label="פרוסות העיגול מסתדרות כמלבן: רוחב חצי היקף, גובה רדיוס">${s}<text class="rv" style="--d:2s" x="135" y="96" fill="${PC}" font-size="14" font-weight="800" text-anchor="middle" font-family="Rubik" direction="rtl">חצי היקף = π · r</text><text class="rv" style="--d:2.2s" x="262" y="50" fill="${RC}" font-size="14" font-weight="800" text-anchor="end" font-family="Rubik">r</text></svg>`;},
  says:['הפרוסות מסתדרות כמעט כמו <b>מלבן</b>.',`שטח = ${M('<span class="m">π · r · r</span>')}`],what:'שטח = <span class="m">π · r · r</span> (רדיוס כפול רדיוס).'},
 {h:'המוקש: רדיוס או קוטר?',d:.4,says:[`קוטר ${M(10)} ← שטח = ${M('10 · 10 · π')} <span class="x">✗</span>`,`קודם רדיוס ${M(5)} ← ${M('5 · 5 · π = 25π')} <span class="v">✓</span>`],what:'בודקים תמיד: נתון רדיוס או קוטר?'}];
RECAP[0].chk=[genCvsD];RECAP[1].chk=[genRtoD,genDtoR];RECAP[2].chk=[genPerimD];RECAP[3].chk=[genPerimR,genPerimD];RECAP[4].chk=[genAreaR];RECAP[5].chk=[genAreaD];
/* ===== כמו במשימת ההערכה (נוסף 1.11.2026): חישוב במחשבון ובחירת יחידה. הסבר פשוט, צעד אחרי צעד ===== */
const c2=x=>Math.round(x*100)/100;
function gCalcPerim(){const D=pick([10,6,8,12,14,4,20]);const v=c2(Math.PI*D);
 return {kind:'היקף במחשבון',rc:RC_CALC,dia:()=>CD({m:'d',lab:D}),text:`קוטר המעגל ${M(D)} ס״מ. חשבו את ההיקף במחשבון (כפתור <span class="m">π</span>), עד 2 ספרות אחרי הנקודה.`,
  ans:[{label:'היקף ≈',dec:1,val:v}],
  work:[{t:`היקף = <span class="m">π</span> · קוטר = <span class="m">?π</span>`,ans:[{label:'π',val:D}],why:'הקוטר נתון ← כופלים אותו ב־π.'},{t:`במחשבון: ${M(D)} · <span class="m">π</span> ≈ ?`,ans:[{label:'',dec:1,val:v}],why:'לוחצים '+D+' × π במחשבון, ומעגלים ל־2 ספרות אחרי הנקודה.'}],
  lines:[`היקף = ${M(D+'π')}`,`במחשבון: ${M(D+'π ≈ '+v)} ס״מ`],rule:'קודם עם π, אחר כך במחשבון: 2 ספרות אחרי הנקודה.',
  diag:({vals:[x]})=>Math.abs(x-c2(Math.PI*D*D/4))<.01?'זה <b>השטח</b>. מבקשים <b>היקף</b> = π · קוטר.':Math.abs(x-c2(2*Math.PI*D))<.01?'כפלתם ב־2 עוד פעם. '+M(D)+' הוא כבר <b>הקוטר</b>.':Math.abs(x-D*3)<.01?'π הוא בערך 3.14, לא 3. משתמשים בכפתור π.':null};}
function gCalcArea(){const D=pick([10,6,8,12,4,20]),r=D/2,v=c2(Math.PI*r*r);
 return {kind:'שטח במחשבון',rc:RC_CALC,dia:()=>CD({fill:1,m:'d',lab:D}),text:`קוטר העיגול ${M(D)} ס״מ. חשבו את השטח במחשבון, עד 2 ספרות אחרי הנקודה.`,
  ans:[{label:'שטח ≈',dec:1,val:v}],
  work:[{t:`רדיוס = קוטר : 2 = ?`,ans:[{label:'',val:r}],why:'בשטח צריך <b>רדיוס</b>. מחלקים את הקוטר ב־2.'},{t:`שטח = <span class="m">π</span> · ${M(r+' · '+r)} = <span class="m">?π</span>`,ans:[{label:'π',val:r*r}],why:'רדיוס כפול רדיוס.'},{t:`במחשבון: ${M(r*r)} · <span class="m">π</span> ≈ ?`,ans:[{label:'',dec:1,val:v}],why:'כופלים ב־π במחשבון ומעגלים ל־2 ספרות.'}],
  lines:[`רדיוס ${M(r)}`,`שטח = ${M(r*r+'π ≈ '+v)} סמ״ר`],rule:'שטח: קודם רדיוס, אחר כך π · r · r, ובסוף מחשבון.',
  diag:({vals:[x]})=>Math.abs(x-c2(Math.PI*D*D))<.01?'השתמשתם בקוטר. בשטח צריך <b>רדיוס</b>: '+M(D+' : 2 = '+r)+'.':Math.abs(x-c2(Math.PI*D))<.01?'זה <b>ההיקף</b>. מבקשים <b>שטח</b>.':null};}
function gUnit(){const isA=Math.random()<.5,o=['ס״מ','סמ״ר','מ׳','מ״ר'],ok=isA?'סמ״ר':'ס״מ';
 return {kind:'איזו יחידה?',rc:RC_UNIT,dia:()=>CD({fill:isA,m:'none'}),text:`רדיוס המעגל נמדד בס״מ. באיזו יחידה כותבים את ${isA?'<b>השטח</b>':'<b>ההיקף</b>'}?`,choice:o,correct:o.indexOf(ok),
  diag:({sel})=>o[sel]==='מ׳'||o[sel]==='מ״ר'?'הרדיוס נמדד ב<b>ס״מ</b>, אז גם התשובה בס״מ.':isA?'שטח = כמה <b>משבצות</b> ← יחידה "מרובעת": סמ״ר.':'היקף = <b>קו</b> מסביב ← יחידת אורך: ס״מ.',
  lines:[isA?'שטח = משבצות ← סמ״ר':'היקף = קו ← ס״מ'],rule:'היקף (קו) ← ס״מ · שטח (משבצות) ← סמ״ר.'};}
let RC_CALC=RECAP.push({h:'מחשבון: π',d:.6,says:[`${M('10π')} ← לוחצים ${M('10')} × π`,`${M('31.4159…')} ← 2 ספרות ← ${M('≈ 31.42')}`],what:'עם π במחשבון, 2 ספרות אחרי הנקודה.'})-1;
let RC_UNIT=RECAP.push({h:'איזו יחידה?',d:.6,svg:()=>CD({fill:1,m:'none'}),says:[`היקף = <b>קו</b> מסביב ← ${M('ס״מ')}`,`שטח = <b>משבצות</b> בפנים ← ${M('סמ״ר')}`],what:'קו ← ס״מ · משבצות ← סמ״ר.'})-1;
RECAP[RC_CALC].chk=[gCalcPerim,gCalcArea];RECAP[RC_UNIT].chk=[gUnit];
LAD[2].push({g:gCalcPerim,n:3,h:2},{g:gCalcArea,n:3,h:2},{g:gUnit,n:2,h:2});
