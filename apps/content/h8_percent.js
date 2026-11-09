/*META {"id":"h8_percent","title":"אחוזים · ערכה: רוני מודן","short":"אחוזים","topic":"אחוזים","glyph":"%","color":"#4fd18b"} */
/* אחוזים · משבצת ח׳ פרק 5 (ספר א, עמ׳ 245–269) · יסוד מארגן אחד לכל השאלות: טבלת האחוזים 100% | 1% | החלק */
const APP={key:'h8pct',topic:'אחוזים',total:25,sub:'טבלה אחת פותרת הכול: 100% ← 1% ← האחוז שמחפשים. צעד אחרי צעד, בצבעים.',
 rc:{'אחוז ושבר':1,'כמה אחוז צבוע?':0,'מוצאים 1%':3,'אחוז מכמות':3,'נכון או לא נכון?':3,'מוצאים את השלם':4,'איזה אחוז?':3,'כמה נשאר?':3,
  'התייקרות והוזלה ככפל':5,'המחיר החדש':5,'המחיר לפני השינוי':5,'אחוז השינוי':5,'התייקרות ואז הוזלה':6,'שתי הנחות ברצף':6,'אחוז מהנותר':3,'ריבוע שגדל':6,'איפה משתלם?':5}};
document.head.insertAdjacentHTML('beforeend',`<style>
table.pt{border-collapse:separate;border-spacing:0;font-family:Rubik;font-weight:700;margin:6px auto;direction:rtl}
.pt th,.pt td{border:2px solid var(--line);padding:6px 12px;text-align:center;font-size:21px;min-width:74px;height:46px}
.pt th{background:var(--chip);font-size:16px}.pt td.lab,.pt th.lab{border:none;background:none;font-size:14px;color:var(--muted);min-width:0;font-weight:500}
.pt .giv{background:#ffb02040;color:#ffd27a}.pt .one{box-shadow:inset 0 0 0 4px var(--ok)}.pt .calc{color:var(--ok)}
.pt td.calc{font-size:17px}.pt .ask{border:3px dashed var(--blue);color:var(--blue);font-size:26px}.pt .bad{border:3px solid var(--red);background:#ff4d5e2e;color:#ffb3bb}
.pt .vv{direction:ltr;unicode-bidi:isolate;display:inline-block;white-space:nowrap}
.pgw{display:flex;flex-direction:column;align-items:center;gap:8px}.pgv{display:flex;flex-direction:column;align-items:center;gap:6px;padding:8px;border-radius:14px;background:#ffffff08}.pgg{display:flex;gap:8px}.pgg .gr{width:150px}.pgt{font-weight:700;text-align:center}
.gr{display:block;margin:0 auto;width:100%;max-width:210px;height:auto}
@media (max-width:560px){.pt th,.pt td{padding:4px 4px;min-width:0;font-size:15px;height:40px}.pt td.calc{font-size:12.5px;padding:3px 2px}.pt th{font-size:13px}.pt td.lab{font-size:12px}}
</style>`);
const fmt=n=>(+(+n).toFixed(3)).toLocaleString('en-US');
const P=n=>M(fmt(n)+'%');
const FRr=(a,b)=>`<span class="fr"><span>${a}</span><span>${b}</span></span>`;
const CK=(lab,opts,ok,why)=>{const o=shuf(opts);return {lab,choice:o,correct:o.indexOf(ok),why};};
const LOOK=ok=>CK('מה מחפשים בטבלה?',['את השלם (100%)','את החלק','את האחוז'],ok,'קוראים את סוף השאלה: מה שואלים? זה התא עם סימן השאלה.');
/* ===== טבלת האחוזים: היסוד המארגן =====
 T={h:[כותרות], p:[שורת האחוזים], v:[שורת הכמות], g:[[r,c],...] נתונים, a:[r,c] מה מחפשים, x:{'r,c':'חישוב'} */
/* הטבלה של רוני: השלם | החלק היחסי (שבר מתוך 100) | החלק המבוקש.  השלם ידוע ← כפל · השלם חסר ← חילוק */
function PT(T,hl,bad){if(T.h.length!==3||T.p[1]!=='1%'||(T.a&&T.a[0]===1&&T.a[1]===1))return PT0(T,hl,bad);
 const pc=parseFloat(T.p[2]),W=T.v[0],pa=T.v[2],G=(r,c)=>T.g.some(([a,b])=>a===r&&b===c),A=(r,c)=>T.a&&T.a[0]===r&&T.a[1]===c,F=FRr(pc,100);
 const td=(cls,txt)=>`<td class="${cls}">${txt!==''?`<span class="vv">${txt}</span>`:''}</td>`;
 const B=(r,c)=>bad&&bad.r===r&&bad.c===c;
 const c0=B(1,0)?td('bad',fmt(bad.val)):G(1,0)?td('giv',fmt(W)):hl?td('calc',`${fmt(pa)} : ${F} = ${fmt(W)}`):td('ask','?');
 const c1=B(0,2)?td('bad',FRr(fmt(bad.val),100)):G(0,2)?td('giv one',F):hl?td('calc one',`${FRr(fmt(pa),fmt(W))} = ${F}`):td('ask one',FRr('?',100));
 const c2=B(1,2)?td('bad',fmt(bad.val)):G(1,2)?td('giv',fmt(pa)):hl?td('calc',`${fmt(W)} · ${F} = ${fmt(pa)}`):td('ask','?');
 const h0=T.h[0]==='השלם'?'השלם':'השלם ('+T.h[0]+')',h2=T.h[2]==='החלק'?'החלק המבוקש':'החלק ('+T.h[2]+')';
 return `<table class="pt"><tr><th>${h0}</th><th>החלק היחסי (שבר)</th><th>${h2}</th></tr><tr>${c0}${c1}${c2}</tr></table>`;}
/* מוחשי: 100 משבצות, כל משבצת = 1% */
function PG(T,hl){if(T.h.length!==3||T.p[1]!=='1%')return '';const pc=parseFloat(T.p[2]),W=T.v[0],pa=T.v[2],one=W/100,wk=T.g.some(([a,b])=>a===1&&b===0);
 const SZ=x=>x.replace('class="gr"','class="gr" style="width:150px;height:150px"');const g=pc<=100?SZ(GRID(pc,{anim:hl?1:0,d:.2,st:.02})):SZ(GRID(100,{anim:hl?1:0,d:.2,st:.01}))+SZ(GRID(pc-100,{anim:hl?1:0,d:1.4,st:.03,col:OR}));
 return `<div class="pgv"><div class="pgt">${wk||hl?M(fmt(W)):'?'} = ${M('100')} משבצות</div><div class="pgg">${g}</div>${hl?`<div class="pgt rv" style="--d:1.6s">משבצת = ${M(fmt(one))} ← ${M(pc+' · '+fmt(one)+' = '+fmt(pa))}</div>`:''}</div>`;}
function PT0(T,hl,bad){const cell=(r,c)=>{const raw=r?T.v[c]:T.p[c],key=r+','+c,isG=T.g.some(([a,b])=>a===r&&b===c),isA=T.a&&T.a[0]===r&&T.a[1]===c,one=T.p[c]==='1%';
  let cls=isG?'giv':'',txt='';
  if(bad&&bad.r===r&&bad.c===c){cls='bad';txt=fmt(bad.val);}
  else if(isG)txt=r?fmt(raw):raw;
  else if(hl){cls='calc';txt=T.x&&T.x[key]?T.x[key]:(r?fmt(raw):raw);}
  else if(isA){cls='ask';txt='?';}
  return `<td class="${cls}${one?' one':''}">${txt!==''?`<span class="vv">${txt}</span>`:''}</td>`;};
 return `<table class="pt"><tr><th class="lab"></th>${T.h.map(h=>`<th>${h}</th>`).join('')}</tr>${['אחוזים','כמות'].map((l,r)=>`<tr><td class="lab">${l}</td>${T.h.map((_,c)=>cell(r,c)).join('')}</tr>`).join('')}</table>`;}
/* טעות ← התא שלו בטבלה נצבע באדום */
const RED=(q,x,msg)=>`${msg}<div style="margin-top:6px">${PT(q.T,false,{r:q.T.a[0],c:q.T.a[1],val:x})}</div>`;
const tab=q=>{q.dia=hl=>`<div class="pgw">${PG(q.T,hl)}${PT(q.T,hl)}</div>`;return q;};
/* כל טעות בשאלת טבלה: התא שלה נצבע באדום, גם בלי הודעה מיוחדת */
const DX=q=>{const d=q.diag;q.diag=o=>(d&&d(o))||RED(q,o.vals[0],'בודקים בטבלה: קודם 1%, ואז כופלים.');return q;};
const KS=n=>R(2,n);
const EASY=[10,50,25,20],MID=[5,10,15,20,25,30,40,50,60,70,75,80,90],ALL=[5,10,12,15,20,25,30,35,40,45,60,65,70,75,80,85,90];
/* ===== ★ ידע ===== */
const FRP=[[1,2,50],[1,4,25],[3,4,75],[1,5,20],[2,5,40],[3,5,60],[4,5,80],[1,10,10],[3,10,30],[7,10,70],[9,10,90],[1,20,5],[1,25,4],[1,50,2]];
function genRep(){const [a,b,p]=pick(FRP),f=100/b;
 return {kind:'אחוז ושבר',text:`כמה אחוזים הם ${FRr(a,b)}?`,ans:[{label:'%',col:GR,val:p}],
 work:[{t:`מרחיבים למכנה 100: ${M(b+' · ? = 100')}`,ans:[{label:'',val:f}],why:'אחוז = <b>מתוך 100</b>. מחפשים פי כמה להרחיב.'},{t:`גם המונה: ${M(a+' · '+f+' = ?')}`,ans:[{label:'',val:p}],why:'מרחיבים <b>גם</b> את המונה באותו מספר.'}],
 lines:[`${FRr(a,b)} = ${FRr(a+' · '+f,b+' · '+f)} = ${FRr(p,100)}`,`${FRr(p,100)} = ${P(p)}`],rule:'אחוז = מתוך 100. מרחיבים את השבר למכנה 100.',
 diag:({vals:[x]})=>x===a*10+b||x===Number(''+a+b)?'כתבתם את המספרים של השבר. אחוז = <b>מתוך 100</b>: מרחיבים את המכנה ל־100.':x===b?'זה המכנה. מרחיבים את השבר כך שהמכנה יהיה 100.':null};}
const GRID=(n,o={})=>`<svg class="gr" viewBox="0 0 212 212" role="img" aria-label="${n} משבצות צבועות מתוך 100">${Array.from({length:100},(_,i)=>{const x=1+(i%10)*21,y=1+Math.floor(i/10)*21,on=i<n;
 return `<rect${on&&o.anim?` class="rv" style="--d:${(o.d||0)+i*(o.st||.035)}s"`:''} x="${x}" y="${y}" width="19" height="19" rx="3" fill="${on?(o.col||GR):'#24364f'}"/>`;}).join('')}</svg>`;
function genShade(){const n=pick([5,10,15,20,25,30,35,40,45,50,60,64,70,75,80,90,12,8,3]);
 return {kind:'כמה אחוז צבוע?',text:`בריבוע יש ${M(100)} משבצות. כמה אחוזים מהריבוע צבועים בירוק?`,dia:()=>GRID(n),ans:[{label:'%',col:GR,val:n}],
 work:[{t:'כמה משבצות צבועות? (סופרים שורות של 10)',ans:[{label:'',val:n}],why:'כל שורה מלאה = 10 משבצות. סופרים שורות, ואז את מה שנשאר.'},{t:`${M(n)} מתוך ${M(100)} = ?%`,ans:[{label:'%',val:n}],why:'מתוך 100 ← המספר הוא האחוז.'}],
 lines:[`צבועות ${M(n)} משבצות מתוך ${M(100)}.`,`${FRr(n,100)} = ${P(n)}`],rule:'מתוך 100 משבצות: מספר המשבצות הצבועות = האחוז.',
 diag:({vals:[x]})=>x===100-n?'ספרתם את המשבצות <b>הלבנות</b>. שאלו על הצבועות בירוק.':null};}
function genOnePct(){const k=KS(9),W=100*k;
 return tab({kind:'מוצאים 1%',text:`כמה הם ${P(1)} מ־${M(fmt(W))}?`,ans:[{label:'1% =',col:GR,val:k}],
 T:{h:['השלם','1%'],p:['100%','1%'],v:[W,k],g:[[0,0],[1,0],[0,1]],a:[1,1],x:{'1,1':`${fmt(W)} : 100 = ${k}`}},
 work:[{t:`1% = השלם : 100 ← ${M(fmt(W)+' : 100 = ?')}`,ans:[{label:'',val:k}],why:'100% מתחלקים ל־100 חלקים שווים. כל חלק = 1%.'}],
 lines:[`השלם = ${P(100)} = ${M(fmt(W))}`,`${P(1)} = ${M(fmt(W)+' : 100 = '+k)}`],rule:'1% = השלם : 100.',
 diag:({vals:[x]})=>{if(x===W*100)return '<b>כפלתם</b> ב־100. כדי להגיע ל־1% <b>מחלקים</b> ב־100.';if(x===W)return 'זה כל השלם (100%). מחלקים אותו ל־100 חלקים.';return null;}});}
function genPctOf(lv){const p=pick(lv===1?EASY:MID),k=KS(lv===1?6:9),W=100*k,a=p*k,[who,what]=pick([['בבית הספר','תלמידים'],['בחנות','ספרים'],['בפרדס','עצים'],['באולם','צופים'],['בספרייה','ספרים']]);
 const q=tab({kind:'אחוז מכמות',crack:lv>1?[LOOK('את החלק')]:null,text:`${who} ${M(fmt(W))} ${what}. כמה הם ${P(p)} מה${what}?`,ans:[{label:what,col:GR,val:a}],
 T:{h:['השלם','1%','החלק'],p:['100%','1%',p+'%'],v:[W,k,a],g:[[0,0],[1,0],[0,1],[0,2]],a:[1,2],x:{'1,1':`${fmt(W)} : 100 = ${k}`,'1,2':`${k} · ${p} = ${fmt(a)}`}},
 work:[{t:`1%: ${M(fmt(W)+' : 100 = ?')}`,ans:[{label:'',val:k}],why:'קודם תמיד <b>1%</b>: מחלקים את השלם ב־100.'},{t:`${P(p)}: ${M(k+' · '+p+' = ?')}`,ans:[{label:'',val:a}],why:`${P(p)} = ${M(p)} פעמים 1%.`}],
 lines:[`${P(1)} = ${M(fmt(W)+' : 100 = '+k)}`,`${P(p)} = ${M(k+' · '+p+' = '+fmt(a))}`],rule:'קודם 1% (מחלקים ב־100), ואז כופלים באחוז.'});
 q.diag=({vals:[x]})=>{if(x===W*p)return RED(q,x,'כפלתם באחוז, אבל שכחתם לחלק ב־100. קודם <b>1%</b>.');if(x===W-p||x===W+p)return RED(q,x,'אחוז הוא לא מספר שמוסיפים או מורידים. מוצאים <b>1%</b> וכופלים.');if(x===k)return RED(q,x,'זה רק <b>1%</b>. עכשיו כופלים ב־'+M(p)+'.');if(x===W-a)return RED(q,x,'זה מה ש<b>נשאר</b>. שאלו על '+P(p)+'.');return null;};return DX(q);}
function genTF(){const t=R(0,2);
 if(t===0){const p=pick([150,200,120,300]),W=pick([40,60,80,90]);const big=Math.random()<.5;
  return {kind:'נכון או לא נכון?',text:`נכון או לא נכון? ${P(p)} מ־${M(W)} ${big?'הם יותר':'הם פחות'} מ־${M(W)}.`,choice:['נכון','לא נכון'],correct:big?0:1,
  work:[{t:`${P(p)} גדול מ־${P(100)}?`,choice:['כן','לא'],correct:0,why:'100% = כל השלם. יותר מ־100% = יותר מהשלם.'}],
  lines:[`${P(100)} מ־${M(W)} = ${M(W)} (כל השלם).`,`${P(p)} > ${P(100)} ← התוצאה <b>יותר</b> מ־${M(W)}. ${big?'נכון.':'לא נכון.'}`],rule:'יותר מ־100% ← יותר מהשלם. פחות מ־100% ← פחות מהשלם.',
  diag:()=>'זוכרים: 100% = כל השלם. כמה זה '+P(p)+'?'};}
 const p=pick(MID),k=KS(8),W=100*k,a=p*k,ok=Math.random()<.5,wr=pick([W/p,p,a*10,a+k].filter(v=>v!==a&&Number.isInteger(v))),sh=ok?a:wr;
 return tab({kind:'נכון או לא נכון?',text:`נכון או לא נכון? ${P(p)} מ־${M(fmt(W))} הם ${M(fmt(sh))}.`,choice:['נכון','לא נכון'],correct:ok?0:1,
 T:{h:['השלם','1%','החלק'],p:['100%','1%',p+'%'],v:[W,k,a],g:[[0,0],[1,0],[0,2]],a:[1,2],x:{'1,1':`${fmt(W)} : 100 = ${k}`,'1,2':`${k} · ${p} = ${fmt(a)}`}},
 work:[{t:`1%: ${M(fmt(W)+' : 100 = ?')}`,ans:[{label:'',val:k}],why:'קודם 1%.'},{t:`${P(p)}: ${M(k+' · '+p+' = ?')}`,ans:[{label:'',val:a}],why:'כופלים באחוז.'},{t:`יצא ${M(fmt(a))}. הטענה נכונה?`,choice:['נכון','לא נכון'],correct:ok?0:1,why:'משווים את מה שיצא למספר שבטענה.'}],
 lines:[`${P(1)} = ${M(k)} ← ${P(p)} = ${M(k+' · '+p+' = '+fmt(a))}`,ok?'יצא אותו מספר ← <b>נכון</b>.':`יצא ${M(fmt(a))}, לא ${M(fmt(sh))} ← <b>לא נכון</b>.`],rule:'לא מנחשים: מחשבים 1%, כופלים, ומשווים.',
 diag:()=>'חשבו קודם: כמה זה '+P(1)+'? ואז כמה זה '+P(p)+'?'});}
/* ===== ★★ הבנה ===== */
const WHOLE=[['תלמידים','הגיעו לטיול','שכבה'],['עצים','הם עצי לימון','פרדס'],['עובדים','מגיעים באוטובוס','מפעל'],['ספרים','הם ספרי קריאה','ספרייה'],['צופים','הם ילדים','אולם']];
function genWhole(){const p=pick(MID),k=KS(9),W=100*k,a=p*k,[n,verb,all]=pick(WHOLE);
 const q=tab({kind:'מוצאים את השלם',crack:[LOOK('את השלם (100%)')],text:`${M(fmt(a))} ${n} ${verb}. הם ${P(p)} מכל ה${n} ב${all}. כמה ${n} יש ב${all}?`,ans:[{label:n,col:GR,val:W}],
 T:{h:['השלם','1%','החלק'],p:['100%','1%',p+'%'],v:[W,k,a],g:[[0,0],[0,1],[0,2],[1,2]],a:[1,0],x:{'1,1':`${fmt(a)} : ${p} = ${k}`,'1,0':`${k} · 100 = ${fmt(W)}`}},
 work:[{t:`1%: ${M(fmt(a)+' : '+p+' = ?')}`,ans:[{label:'',val:k}],why:`${M(fmt(a))} הם ${P(p)} ← מחלקים ב־${M(p)} ומקבלים 1%.`},{t:`100%: ${M(k+' · 100 = ?')}`,ans:[{label:'',val:W}],why:'השלם = 100 פעמים 1%.'}],
 lines:[`${M(fmt(a))} = ${P(p)} ← ${P(1)} = ${M(fmt(a)+' : '+p+' = '+k)}`,`${P(100)} = ${M(k+' · 100 = '+fmt(W))}`],rule:'נתון החלק ← מחלקים באחוז (1%) ← כופלים ב־100.'});
 q.diag=({vals:[x]})=>{if(Math.abs(x-a*p/100)<1e-9)return RED(q,x,'חישבתם '+P(p)+' מ־'+M(fmt(a))+'. אבל '+M(fmt(a))+' הם כבר <b>החלק</b>! מחפשים את <b>השלם</b>.');if(x===a+p||x===a*p)return RED(q,x,'קודם 1%: מחלקים את החלק באחוז: '+M(fmt(a)+' : '+p)+'.');if(x===k)return RED(q,x,'זה <b>1%</b>. השלם = 100%: עוד כפל ב־100.');if(x<a)return RED(q,x,'השלם תמיד <b>גדול</b> מהחלק!');return null;};return DX(q);}
function genWhatPct(){const p=pick(MID),k=KS(9),W=100*k,a=p*k,[who,n,what]=pick([['בבית הספר','תלמידים','הולכים ברגל'],['בשכונה','בתים','הם בתים עם גינה'],['בחנות','ספרים','הם ספרי ילדים'],['בפרדס','עצים','הם עצי תפוז']]);
 const q=tab({kind:'איזה אחוז?',crack:[LOOK('את האחוז')],text:`${who} ${M(fmt(W))} ${n}. ${M(fmt(a))} מהם ${what}. איזה אחוז מה${n} ${what}?`,ans:[{label:'%',col:GR,val:p}],
 T:{h:['השלם','1%','החלק'],p:['100%','1%',p+'%'],v:[W,k,a],g:[[0,0],[1,0],[0,1],[1,2]],a:[0,2],x:{'1,1':`${fmt(W)} : 100 = ${k}`,'0,2':`${fmt(a)} : ${k} = ${p}%`}},
 work:[{t:`1%: ${M(fmt(W)+' : 100 = ?')}`,ans:[{label:'',val:k}],why:'קודם 1% מהשלם.'},{t:`כמה פעמים 1% נכנס בחלק? ${M(fmt(a)+' : '+k+' = ?')}`,ans:[{label:'%',val:p}],why:'כל '+M(k)+' '+n+' = 1%. סופרים כמה כאלה יש בחלק.'}],
 lines:[`${P(1)} = ${M(fmt(W)+' : 100 = '+k)}`,`${M(fmt(a)+' : '+k+' = '+p)} ← ${P(p)}`],rule:'1% מהשלם ← מחלקים את החלק ב־1%.'});
 q.diag=({vals:[x]})=>{if(x===a)return RED(q,x,'זו <b>הכמות</b>, לא האחוז. כמה פעמים '+M(k)+' (1%) נכנס ב־'+M(fmt(a))+'?');if(x===100-p)return RED(q,x,'זה האחוז של <b>האחרים</b>. שאלו על אלה ש'+what+'.');return null;};return DX(q);}
function genRemain(){const p=pick(MID),k=KS(8),W=100*k,r=100-p,[n,verb]=pick([['פרחים','נבלו'],['ספרים','נמכרו'],['כרטיסים','נמכרו'],['בלונים','התפוצצו']]);
 const q=tab({kind:'כמה נשאר?',crack:[CK('מה מחפשים?',['כמה נשאר','כמה '+verb,'כמה היו בהתחלה'],'כמה נשאר','קוראים את סוף השאלה.'),CK('איזה אחוז נשאר?',[r+'%',p+'%','100%'],r+'%','מהשלם (100%) מורידים את מה ש'+verb+'.')],text:`היו ${M(fmt(W))} ${n}. ${P(p)} מהם ${verb}. כמה ${n} נשארו?`,ans:[{label:n,col:GR,val:r*k}],
 T:{h:['השלם','1%','נשאר'],p:['100%','1%',r+'%'],v:[W,k,r*k],g:[[0,0],[1,0],[0,1],[0,2]],a:[1,2],x:{'1,1':`${fmt(W)} : 100 = ${k}`,'1,2':`${k} · ${r} = ${fmt(r*k)}`}},
 work:[{t:`איזה אחוז נשאר? ${M('100 − '+p+' = ?')}`,ans:[{label:'%',val:r}],why:'השלם = 100%. מורידים את מה ש'+verb+'.'},{t:`1%: ${M(fmt(W)+' : 100 = ?')}`,ans:[{label:'',val:k}],why:'מחלקים את השלם ב־100.'},{t:`${P(r)}: ${M(k+' · '+r+' = ?')}`,ans:[{label:'',val:r*k}],why:'כופלים באחוז שנשאר.'}],
 lines:[`נשאר: ${M('100% − '+p+'% = '+r+'%')}`,`${P(1)} = ${M(k)} ← ${P(r)} = ${M(k+' · '+r+' = '+fmt(r*k))}`],rule:'מה נשאר? קודם 100% פחות האחוז, ואז מחשבים.'});
 q.diag=({vals:[x]})=>x===p*k?RED(q,x,'זה מה ש<b>'+verb+'</b>. שאלו כמה <b>נשארו</b>.'):x===W-p?RED(q,x,'הורדתם את המספר '+M(p)+'. אבל '+P(p)+' הם לא '+M(p)+' '+n+'!'):null;return DX(q);}
/* ===== ★★★ יישום: שינוי באחוזים ===== */
const ITEMS=['מעיל','שעון','טלפון','כיסא','תיק','שולחן'];
const mul=(p,up)=>+((up?100+p:100-p)/100).toFixed(2);
function genMult(){const p=pick([5,10,15,20,25,30,40,50,60,8,12,75]),up=Math.random()<.5,m=mul(p,up),opts=shuf([...new Set([m,+(p/100).toFixed(2),mul(p,!up),+(up?1+p/10:p/10).toFixed(2)])]),ci=opts.indexOf(m);
 return {kind:'התייקרות והוזלה ככפל',dia:hl=>{const S=x=>x.replace('class="gr"','class="gr" style="width:130px;height:130px"');return `<div class="pgv"><div class="pgg">${up?S(GRID(100))+S(GRID(p,{anim:1,d:.3,st:.05,col:OR})):S(GRID(100-p,{anim:1,d:.2,st:.02}))}</div><div class="pgt">${up?M('100% + '+p+'% = '+(100+p)+'%'):M('100% − '+p+'% = '+(100-p)+'%')}${hl?' ← '+M('· '+m):''}</div></div>`;},text:`${up?'התייקרות':'הוזלה'} של ${P(p)}. בכמה כופלים את המחיר הישן כדי לקבל את המחיר החדש?`,choice:opts.map(v=>M(fmt(v))),correct:ci,
 work:[{t:`המחיר החדש באחוזים: ${M('100 '+(up?'+':'−')+' '+p+' = ?')}`,ans:[{label:'%',val:up?100+p:100-p}],why:'המחיר הישן = 100%. '+(up?'בהתייקרות <b>מוסיפים</b>.':'בהוזלה <b>מורידים</b>.')},{t:`${P(up?100+p:100-p)} כמספר עשרוני = ?`,choice:opts.map(v=>fmt(v)),correct:ci,why:'מחלקים ב־100: '+P(100)+' = 1.'}],
 lines:[`הישן = ${P(100)} ← החדש = ${M('100% '+(up?'+':'−')+' '+p+'% = '+(up?100+p:100-p)+'%')}`,`${P(up?100+p:100-p)} = ${M(fmt(m))} ← כופלים ב־${M(fmt(m))}`],rule:'התייקרות: 100% + האחוז. הוזלה: 100% − האחוז. ואז מחלקים ב־100.',
 diag:({sel})=>sel>=0&&opts[sel]===+(p/100).toFixed(2)?'זה רק <b>השינוי</b>. המחיר החדש כולל גם את המחיר הישן (100%).':sel>=0&&opts[sel]===mul(p,!up)?'הפוך! '+(up?'התייקרות ← יותר מ־1.':'הוזלה ← פחות מ־1.'):null};}
function genNewPrice(){const p=pick(MID.filter(v=>v<=60)),k=KS(9),B=100*k,up=Math.random()<.5,n=up?100+p:100-p,it=pick(ITEMS);
 const q=tab({kind:'המחיר החדש',crack:[CK('מה ה־100%?',['המחיר הישן','המחיר החדש','השינוי'],'המחיר הישן','האחוז מחושב תמיד מהמחיר <b>הישן</b>.'),CK('המחיר החדש באחוזים?',[n+'%',p+'%','100%'],n+'%',(up?'התייקרות: 100% + ':'הוזלה: 100% − ')+p+'%.')],text:`${it} עלה ${M(fmt(B))} ש״ח. המחיר ${up?'התייקר':'הוזל'} ב־${P(p)}. מה המחיר החדש?`,ans:[{label:'ש״ח',col:GR,val:n*k}],
 T:{h:['לפני','1%','אחרי'],p:['100%','1%',n+'%'],v:[B,k,n*k],g:[[0,0],[1,0],[0,1],[0,2]],a:[1,2],x:{'1,1':`${fmt(B)} : 100 = ${k}`,'1,2':`${k} · ${n} = ${fmt(n*k)}`}},
 work:[{t:`המחיר החדש באחוזים: ${M('100 '+(up?'+':'−')+' '+p+' = ?')}`,ans:[{label:'%',val:n}],why:'הישן = 100%.'},{t:`1%: ${M(fmt(B)+' : 100 = ?')}`,ans:[{label:'',val:k}],why:'מחלקים את המחיר הישן ב־100.'},{t:`${P(n)}: ${M(k+' · '+n+' = ?')}`,ans:[{label:'ש״ח',val:n*k}],why:'כופלים באחוז של המחיר החדש.'}],
 lines:[`אחרי = ${M('100% '+(up?'+':'−')+' '+p+'% = '+n+'%')}`,`${P(1)} = ${M(fmt(B)+' : 100 = '+k)} ← ${P(n)} = ${M(k+' · '+n+' = '+fmt(n*k))} ש״ח`],rule:'הישן = 100%. החדש = 100% ± השינוי.'});
 q.diag=({vals:[x]})=>{if(x===p*k)return RED(q,x,'זה רק <b>השינוי</b> ('+P(p)+'). המחיר החדש = '+P(n)+'.');if(x===(up?B+p:B-p))return RED(q,x,(up?'הוספתם':'הורדתם')+' '+M(p)+' ש״ח. אבל '+P(p)+' הם לא '+M(p)+' ש״ח! קודם 1%.');if(x===(up?100-p:100+p)*k)return RED(q,x,'הפוך! '+(up?'התייקרות ← המחיר <b>עולה</b>.':'הוזלה ← המחיר <b>יורד</b>.'));return null;};return DX(q);}
function genBefore(){const p=pick([10,20,25,30,40,50,15,5]),k=KS(9),B=100*k,up=Math.random()<.5,n=up?100+p:100-p,A=n*k,it=pick(ITEMS);
 const q=tab({kind:'המחיר לפני השינוי',crack:[CK('מה ה־100%?',['המחיר לפני','המחיר אחרי','השינוי'],'המחיר לפני','100% = המחיר <b>לפני</b>. אותו מחפשים!'),CK(`${M(fmt(A))} ש״ח הם כמה אחוזים?`,[n+'%','100%',p+'%'],n+'%','המחיר אחרי ה'+(up?'התייקרות':'הוזלה')+' = 100% '+(up?'+':'−')+' '+p+'%.')],
 text:`אחרי ${up?'התייקרות':'הוזלה'} של ${P(p)}, ${it} עולה ${M(fmt(A))} ש״ח. כמה עלה ה${it} לפני ה${up?'התייקרות':'הוזלה'}?`,ans:[{label:'ש״ח',col:GR,val:B}],
 T:{h:['לפני','1%','אחרי'],p:['100%','1%',n+'%'],v:[B,k,A],g:[[0,0],[0,1],[0,2],[1,2]],a:[1,0],x:{'1,1':`${fmt(A)} : ${n} = ${k}`,'1,0':`${k} · 100 = ${fmt(B)}`}},
 work:[{t:`המחיר אחרי באחוזים: ${M('100 '+(up?'+':'−')+' '+p+' = ?')}`,ans:[{label:'%',val:n}],why:'לפני = 100%.'},{t:`1%: ${M(fmt(A)+' : '+n+' = ?')}`,ans:[{label:'',val:k}],why:`${M(fmt(A))} ש״ח הם ${P(n)} ← מחלקים ב־${M(n)}.`},{t:`100%: ${M(k+' · 100 = ?')}`,ans:[{label:'ש״ח',val:B}],why:'המחיר לפני = 100%.'}],
 lines:[`${M(fmt(A))} ש״ח = ${P(n)}`,`${P(1)} = ${M(fmt(A)+' : '+n+' = '+k)} ← ${P(100)} = ${M(k+' · 100 = '+fmt(B))} ש״ח`],trick:'לא מורידים '+p+'% מהמחיר החדש! המחיר החדש = '+n+'%.',rule:'המחיר החדש = '+n+'% ← 1% ← 100%.'});
 const wrong=A*(up?100-p:100+p)/100;
 q.diag=({vals:[x]})=>{if(Math.abs(x-wrong)<1e-9)return RED(q,x,'זה המוקש! '+(up?'הורדתם':'הוספתם')+' '+P(p)+' מהמחיר <b>החדש</b>. האחוזים מחושבים מהמחיר <b>הישן</b>. המחיר החדש = '+P(n)+'.');if(x===(up?A-p:A+p))return RED(q,x,P(p)+' הם לא '+M(p)+' ש״ח. המחיר החדש = '+P(n)+' ← מוצאים 1%.');if(x===A)return RED(q,x,'זה המחיר <b>אחרי</b>. שאלו על המחיר לפני.');return null;};return DX(q);}
function genChangePct(){const p=pick([5,10,15,20,25,30,40,50,60,12,8]),k=KS(9),B=100*k,up=Math.random()<.5,A=(up?100+p:100-p)*k,d=p*k,it=pick(ITEMS);
 const q=tab({kind:'אחוז השינוי',crack:[CK('מה ה־100%?',['המחיר הישן','המחיר החדש','ההפרש'],'המחיר הישן','האחוז מחושב תמיד מהמחיר <b>הישן</b>.'),CK('מה עושים קודם?',['מחשבים בכמה ש״ח השתנה','מחלקים את החדש בישן','מחסרים 100'],'מחשבים בכמה ש״ח השתנה','קודם השינוי בש״ח, ואז כמה אחוזים הוא.')],
 text:`מחיר ה${it} ${up?'עלה':'ירד'} מ־${M(fmt(B))} ש״ח ל־${M(fmt(A))} ש״ח. בכמה אחוזים ${up?'התייקר':'הוזל'}?`,ans:[{label:'%',col:GR,val:p}],
 T:{h:['לפני','1%','השינוי'],p:['100%','1%',p+'%'],v:[B,k,d],g:[[0,0],[1,0],[0,1]],a:[0,2],x:{'1,1':`${fmt(B)} : 100 = ${k}`,'1,2':`${up?fmt(A)+' − '+fmt(B):fmt(B)+' − '+fmt(A)} = ${fmt(d)}`,'0,2':`${fmt(d)} : ${k} = ${p}%`}},
 work:[{t:`השינוי בש״ח: ${M(up?fmt(A)+' − '+fmt(B)+' = ?':fmt(B)+' − '+fmt(A)+' = ?')}`,ans:[{label:'ש״ח',val:d}],why:'גדול פחות קטן.'},{t:`1% מהמחיר הישן: ${M(fmt(B)+' : 100 = ?')}`,ans:[{label:'',val:k}],why:'האחוז מחושב מהמחיר <b>הישן</b>.'},{t:`${M(fmt(d)+' : '+k+' = ?')}`,ans:[{label:'%',val:p}],why:'כמה פעמים 1% נכנס בשינוי.'}],
 lines:[`השינוי: ${M(up?fmt(A)+' − '+fmt(B)+' = '+fmt(d):fmt(B)+' − '+fmt(A)+' = '+fmt(d))} ש״ח`,`${P(1)} מהישן = ${M(k)} ← ${M(fmt(d)+' : '+k+' = '+p)} ← ${P(p)}`],trick:'משווים לישן! 1% מהמחיר הישן, לא מהחדש.',rule:'השינוי בש״ח ← 1% מהישן ← מחלקים.'});
 q.diag=({vals:[x]})=>{const w=Math.round(d/A*1000)/10;if(Math.abs(x-w)<.11&&w!==p)return RED(q,x,'חישבתם 1% מהמחיר <b>החדש</b>. האחוז תמיד מהמחיר <b>הישן</b>: '+M(fmt(B)+' : 100 = '+k)+'.');if(x===d)return RED(q,x,'זה השינוי <b>בש״ח</b>. כמה אחוזים זה?');if(x===(up?100+p:100-p))return RED(q,x,'זה המחיר החדש באחוזים. שאלו בכמה אחוזים <b>השתנה</b>.');return null;};return DX(q);}
/* ===== ★★★★ חשיבה מסדר גבוה ===== */
const UD=[[1000,10],[2000,10],[3000,10],[500,20],[1000,20],[1500,20],[200,50],[400,50],[600,50],[400,25],[800,25],[1200,25]];
function genUpDown(){const [B,p]=pick(UD),A1=B*(100+p)/100,o=A1/100,A2=A1-o*p,it=pick(ITEMS);
 return {kind:'התייקרות ואז הוזלה',crack:[CK('ממה מחשבים את ההוזלה?',['מהמחיר אחרי ההתייקרות','מהמחיר הראשון','מההפרש'],'מהמחיר אחרי ההתייקרות','ההוזלה באה <b>אחרי</b> ההתייקרות, ולכן מחושבת מהמחיר החדש.')],
 text:`${it} עלה ${M(fmt(B))} ש״ח. הוא התייקר ב־${P(p)}, ואחר כך הוזל ב־${P(p)}. מה המחיר בסוף?`,ans:[{label:'ש״ח',col:GR,val:A2}],
 dia:hl=>PT({h:['לפני','1%','אחרי'],p:['100%','1%',(100+p)+'%'],v:[B,B/100,A1],g:[[0,0],[1,0],[0,1],[0,2]],a:[1,2],x:{'1,1':`${fmt(B)} : 100 = ${B/100}`,'1,2':`${B/100} · ${100+p} = ${fmt(A1)}`}},hl),
 work:[{t:`אחרי ההתייקרות: ${P(100+p)} מ־${M(fmt(B))} = ?`,ans:[{label:'ש״ח',val:A1}],why:`1% = ${M(B/100)}, כופלים ב־${M(100+p)}.`},{t:`1% מהמחיר <b>החדש</b>: ${M(fmt(A1)+' : 100 = ?')}`,ans:[{label:'',val:o}],why:'ההוזלה מחושבת מהמחיר <b>אחרי</b> ההתייקרות.'},{t:`ההוזלה: ${M(fmt(o)+' · '+p+' = ?')}`,ans:[{label:'ש״ח',val:o*p}],why:'כמה ש״ח מורידים.'},{t:`בסוף: ${M(fmt(A1)+' − '+fmt(o*p)+' = ?')}`,ans:[{label:'ש״ח',val:A2}],why:'מורידים את ההוזלה מהמחיר החדש.'}],
 lines:[`התייקרות: ${M(fmt(B))} ← ${M(fmt(A1))} ש״ח`,`הוזלה של ${P(p)} מ־${M(fmt(A1))}: ${M(fmt(o)+' · '+p+' = '+fmt(o*p))} ש״ח`,`בסוף: ${M(fmt(A1)+' − '+fmt(o*p)+' = '+fmt(A2))} ש״ח ← <b>פחות</b> מ־${M(fmt(B))}!`],
 trick:`עלייה של ${p}% וירידה של ${p}% לא מחזירות למחיר הראשון!`,rule:'כל שינוי מחושב מהמחיר שהיה ממש לפניו.',
 diag:({vals:[x]})=>x===B?'זה המוקש! ההוזלה מחושבת מהמחיר <b>הגבוה</b> ('+M(fmt(A1))+'), ולכן מורידים יותר ממה שהוסיפו.':x===A1?'זה המחיר אחרי ההתייקרות. עוד לא הוזלתם.':null};}
const TD=[[1000,10],[2000,10],[500,20],[1000,20],[2500,20],[400,50],[800,50],[800,25],[1600,25]];
function genTwoDisc(){const [B,p]=pick(TD),A1=B*(100-p)/100,A2=A1*(100-p)/100,it=pick(ITEMS);
 return {kind:'שתי הנחות ברצף',crack:[CK('הנחה של '+p+'% ועוד '+p+'%, זה כמו?',['שתי הנחות נפרדות: כל אחת מהמחיר שלפניה',`הנחה אחת של ${2*p}%`,'אין הנחה'],'שתי הנחות נפרדות: כל אחת מהמחיר שלפניה','ההנחה השנייה מחושבת מהמחיר <b>אחרי</b> ההנחה הראשונה.')],
 text:`${it} עלה ${M(fmt(B))} ש״ח. הוא הוזל ב־${P(p)}, ואחר כך הוזל שוב ב־${P(p)}. מה המחיר אחרי שתי ההוזלות?`,ans:[{label:'ש״ח',col:GR,val:A2}],
 dia:hl=>PT({h:['לפני','1%','אחרי'],p:['100%','1%',(100-p)+'%'],v:[B,B/100,A1],g:[[0,0],[1,0],[0,1],[0,2]],a:[1,2],x:{'1,1':`${fmt(B)} : 100 = ${B/100}`,'1,2':`${B/100} · ${100-p} = ${fmt(A1)}`}},hl),
 work:[{t:`הוזלה ראשונה: ${P(100-p)} מ־${M(fmt(B))} = ?`,ans:[{label:'ש״ח',val:A1}],why:`1% = ${M(B/100)}, כופלים ב־${M(100-p)}.`},{t:`הוזלה שנייה: 1% מ־${M(fmt(A1))} = ?`,ans:[{label:'',val:A1/100}],why:'ההנחה השנייה מחושבת מהמחיר <b>החדש</b>.'},{t:`${P(100-p)}: ${M(fmt(A1/100)+' · '+(100-p)+' = ?')}`,ans:[{label:'ש״ח',val:A2}],why:'שוב נשאר '+P(100-p)+'.'}],
 lines:[`הוזלה ראשונה: ${M(fmt(B))} ← ${M(fmt(A1))} ש״ח`,`הוזלה שנייה: ${P(100-p)} מ־${M(fmt(A1))} = ${M(fmt(A2))} ש״ח`],trick:`${p}% ועוד ${p}% זה לא ${2*p}%!`,rule:'כל הנחה מחושבת מהמחיר שהיה ממש לפניה.',
 diag:({vals:[x]})=>x===B*(100-2*p)/100?'זה המוקש! הורדתם '+P(2*p)+' בבת אחת. ההנחה השנייה מחושבת מ־'+M(fmt(A1))+', לא מ־'+M(fmt(B))+'.':x===A1?'זה המחיר אחרי הוזלה <b>אחת</b>. היו שתיים.':null};}
function genOfRest(){let B,p1,p2,rest;for(let t=0;t<99;t++){B=pick([1000,2000,4000,5000,8000]);p1=pick([40,50,60,70,75,80]);p2=pick([20,25,40,50]);rest=B*(100-p1)/100;if(Number.isInteger(rest*p2/100)&&Number.isInteger(rest/100))break;}
 const x2=rest*p2/100,[nm,th1,th2]=pick([['עמית','מחשב','מדפסת'],['דניאל','טלפון','אוזניות'],['יואב','שולחן','כיסא']]);
 return {kind:'אחוז מהנותר',crack:[CK(`ה־${p2}% הם מתוך מה?`,['מהכסף שנשאר','מכל הכסף','מהמחשב'],'מהכסף שנשאר','"מהסכום שנותר" ← ה־100% החדש הוא מה ש<b>נשאר</b>.')],
 text:`${nm} קיבל ${M(fmt(B))} ש״ח. ב־${P(p1)} מהסכום קנה ${th1}. ב־${P(p2)} <b>מהסכום שנותר</b> קנה ${th2}. מה היה המחיר של ה${th2}?`,ans:[{label:'ש״ח',col:GR,val:x2}],
 dia:hl=>PT({h:['השלם','1%','נותר'],p:['100%','1%',(100-p1)+'%'],v:[B,B/100,rest],g:[[0,0],[1,0],[0,1],[0,2]],a:[1,2],x:{'1,1':`${fmt(B)} : 100 = ${fmt(B/100)}`,'1,2':`${fmt(B/100)} · ${100-p1} = ${fmt(rest)}`}},hl),
 work:[{t:`נותר באחוזים: ${M('100 − '+p1+' = ?')}`,ans:[{label:'%',val:100-p1}],why:'מה שלא הוציא על ה'+th1+'.'},{t:`הסכום שנותר: ${P(100-p1)} מ־${M(fmt(B))} = ?`,ans:[{label:'ש״ח',val:rest}],why:`1% = ${M(fmt(B/100))}.`},{t:`ה${th2}: ${P(p2)} מ־${M(fmt(rest))} = ?`,ans:[{label:'ש״ח',val:x2}],why:'עכשיו ה־100% הוא <b>הנותר</b>: 1% = '+M(fmt(rest)+' : 100')+'.'}],
 lines:[`נותר: ${P(100-p1)} מ־${M(fmt(B))} = ${M(fmt(rest))} ש״ח`,`ה${th2}: ${P(p2)} מ־${M(fmt(rest))} = ${M(fmt(rest/100)+' · '+p2+' = '+fmt(x2))} ש״ח`],trick:'"מהסכום שנותר" ← ה־100% החדש הוא הנותר, לא כל הכסף.',rule:'מחשבים קודם כמה נשאר, ורק ממנו את האחוז השני.',
 diag:({vals:[x]})=>x===B*p2/100?'זה המוקש! חישבתם '+P(p2)+' מ<b>כל</b> הכסף. כתוב "<b>מהסכום שנותר</b>": '+M(fmt(rest))+' ש״ח.':x===rest?'זה הסכום שנותר. עכשיו מחשבים ממנו '+P(p2)+'.':null};}
function genSquare(){const area=Math.random()<.5,p=area?pick([10,20,30,50]):pick([10,20,40,50,60,25]),a=area?10:pick([5,10,20,40]),na=a*(100+p)/100;
 if(!area){return {kind:'ריבוע שגדל',crack:[CK('מה ה־100%?',['ההיקף הישן','ההיקף החדש','הצלע החדשה'],'ההיקף הישן','משווים תמיד לישן.')],text:`צלע של ריבוע היא ${M(a)} ס״מ. מגדילים כל צלע ב־${P(p)}. בכמה אחוזים גדל <b>ההיקף</b>?`,ans:[{label:'%',col:GR,val:p}],
  work:[{t:`צלע חדשה: ${P(100+p)} מ־${M(a)} = ?`,ans:[{label:'ס״מ',val:na,dec:true}],why:'כל צלע גדלה.'},{t:`היקף ישן: ${M('4 · '+a+' = ?')}`,ans:[{label:'ס״מ',val:4*a}],why:'בריבוע 4 צלעות שוות.'},{t:`היקף חדש: ${M('4 · '+fmt(na)+' = ?')}`,ans:[{label:'ס״מ',val:4*na,dec:true}],why:'4 צלעות חדשות.'},{t:`ההיקף גדל ב־${M(fmt(4*na-4*a))} ס״מ. מ־${M(4*a)} זה כמה אחוזים?`,ans:[{label:'%',val:p}],why:'1% מההיקף הישן = '+M(fmt(4*a/100))+'.'}],
  lines:[`צלע: ${M(a)} ← ${M(fmt(na))} ס״מ. היקף: ${M(4*a)} ← ${M(fmt(4*na))} ס״מ.`,`ההיקף גדל ב־${P(p)}, <b>בדיוק כמו הצלע</b>.`],trick:'ההיקף גדל באותו אחוז כמו הצלע.',rule:'מחשבים ישן וחדש, ומשווים לישן.',
  diag:({vals:[x]})=>x===4*p?'כפלתם את האחוז ב־4. אבל גם ההיקף הישן גדול פי 4! חשבו את שני ההיקפים.':null};}
 const A0=a*a,A1=na*na,g=A1-A0;
 return {kind:'ריבוע שגדל',crack:[CK('מה ה־100%?',['השטח הישן','השטח החדש','הצלע הישנה'],'השטח הישן','משווים תמיד לישן.')],text:`צלע של ריבוע היא ${M(a)} ס״מ. מגדילים כל צלע ב־${P(p)}. בכמה אחוזים גדל <b>השטח</b>?`,ans:[{label:'%',col:GR,val:g}],
 work:[{t:`צלע חדשה: ${P(100+p)} מ־${M(a)} = ?`,ans:[{label:'ס״מ',val:na}],why:'כל צלע גדלה.'},{t:`שטח ישן: ${M(a+' · '+a+' = ?')}`,ans:[{label:'סמ״ר',val:A0}],why:'שטח ריבוע = צלע · צלע.'},{t:`שטח חדש: ${M(na+' · '+na+' = ?')}`,ans:[{label:'סמ״ר',val:A1}],why:'צלע חדשה · צלע חדשה.'},{t:`גדל ב־${M(g)} סמ״ר מתוך ${M(100)}. כמה אחוזים?`,ans:[{label:'%',val:g}],why:'השטח הישן הוא בדיוק 100 ← 1% = 1 סמ״ר.'}],
 lines:[`שטח: ${M(a+' · '+a+' = '+A0)} ← ${M(na+' · '+na+' = '+A1)} סמ״ר`,`גדל ב־${M(g)} מתוך ${M(100)} ← ${P(g)}, <b>לא</b> ${P(p)}!`],trick:`השטח לא גדל ב־${p}%! כל צלע גדלה, והשטח = צלע · צלע.`,rule:'מחשבים שטח ישן וחדש, ומשווים לישן.',
 diag:({vals:[x]})=>x===p?'זה המוקש! הצלע גדלה ב־'+P(p)+', אבל השטח = צלע · צלע ← גדל יותר. חשבו את שני השטחים.':x===2*p?'כמעט! חשבו בדיוק: '+M(na+' · '+na)+'. יש עוד חתיכה קטנה בפינה.':null};}
function genDeal(){let B1,p1,B2,p2,F1,F2;for(let t=0;t<99;t++){B1=100*R(2,6);B2=100*R(2,6);p1=pick([10,20,25,30,40,50]);p2=pick([10,20,25,30,40,50]);F1=B1*(100-p1)/100;F2=B2*(100-p2)/100;if(F1!==F2&&p1!==p2&&(p1>p2)!==(F1<F2))break;}
 const it=pick(['מכנסי ג׳ינס','נעלי ספורט','מעיל']);
 return {kind:'איפה משתלם?',crack:[CK('מה משווים?',['את המחיר אחרי ההנחה','את אחוז ההנחה','את המחיר לפני ההנחה'],'את המחיר אחרי ההנחה','משלמים את המחיר <b>הסופי</b>, לא את האחוז.')],
 text:`${it}: בחנות א׳ ${M(fmt(B1))} ש״ח בהנחה של ${P(p1)}. בחנות ב׳ ${M(fmt(B2))} ש״ח בהנחה של ${P(p2)}. איפה משלמים פחות?`,choice:['בחנות א׳','בחנות ב׳'],correct:F1<F2?0:1,
 dia:hl=>`<div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:center">${PT({h:['א׳ לפני','א׳ אחרי'],p:['100%',(100-p1)+'%'],v:[B1,F1],g:[[0,0],[1,0],[0,1]],a:[1,1],x:{'1,1':`${B1/100} · ${100-p1} = ${fmt(F1)}`}},hl)}${PT({h:['ב׳ לפני','ב׳ אחרי'],p:['100%',(100-p2)+'%'],v:[B2,F2],g:[[0,0],[1,0],[0,1]],a:[1,1],x:{'1,1':`${B2/100} · ${100-p2} = ${fmt(F2)}`}},hl)}</div>`,
 work:[{t:`חנות א׳: ${P(100-p1)} מ־${M(fmt(B1))} = ?`,ans:[{label:'ש״ח',val:F1}],why:`1% = ${M(B1/100)}.`},{t:`חנות ב׳: ${P(100-p2)} מ־${M(fmt(B2))} = ?`,ans:[{label:'ש״ח',val:F2}],why:`1% = ${M(B2/100)}.`},{t:'איפה המחיר הסופי קטן יותר?',choice:['בחנות א׳','בחנות ב׳'],correct:F1<F2?0:1,why:'משווים את מה ש<b>משלמים</b>.'}],
 lines:[`חנות א׳: ${M(fmt(F1))} ש״ח · חנות ב׳: ${M(fmt(F2))} ש״ח`,`משלמים פחות ב<b>${F1<F2?'חנות א׳':'חנות ב׳'}</b>, למרות ש${p1>p2?'בחנות א׳':'בחנות ב׳'} ההנחה באחוזים גדולה יותר.`],trick:'הנחה גדולה באחוזים ≠ מחיר קטן. משווים את המחיר הסופי.',rule:'מחשבים מחיר סופי בכל חנות, ומשווים.',
 diag:()=>'בחרתם לפי אחוז ההנחה. אבל משלמים את המחיר <b>הסופי</b>: חשבו אותו בכל חנות.'};}
/* ===== חימום ===== */
const WARM=[genOnePct,genOnePct,()=>genPctOf(1),genShade,genRep,()=>genPctOf(1),genOnePct,genShade];
/* ===== שלבים: 25 שאלות בכל שלב ===== */
const LAD=[
 [{g:genShade,n:5,h:2},{g:genRep,n:5,h:2},{g:genOnePct,n:5,h:2},{g:()=>genPctOf(1),n:5,h:1},{g:genTF,n:5,h:1}],
 [{g:()=>genPctOf(2),n:7,h:1},{g:genWhole,n:6,h:1},{g:genWhatPct,n:6,h:1},{g:genRemain,n:6,h:1}],
 [{g:genMult,n:5,h:1},{g:genNewPrice,n:6,h:1},{g:genBefore,n:7,h:1},{g:genChangePct,n:7,h:0}],
 [{g:genUpDown,n:6,h:1},{g:genTwoDisc,n:6,h:1},{g:genOfRest,n:5,h:0},{g:genSquare,n:4,h:0},{g:genDeal,n:4,h:0}]];
const LEVELS=[
 {n:1,t:'מה זה אחוז?',d:'משבצות ← שבר ← 1% ← אחוז מכמות',ladder:LAD[0]},
 {n:2,t:'החלק, השלם והאחוז',d:'אחוז מכמות ← מוצאים את השלם ← איזה אחוז? ← כמה נשאר?',ladder:LAD[1]},
 {n:3,t:'התייקרות והוזלה',d:'כפל ב־1.2 ← המחיר החדש ← המחיר לפני ← אחוז השינוי',ladder:LAD[2]},
 {n:4,t:'חשיבה ושאלות מפמ״ר',d:'עלייה וירידה ← שתי הנחות ← אחוז מהנותר ← ריבוע ← איפה משתלם?',ladder:LAD[3]}];
LEVELS.forEach(l=>l.g=()=>pick(l.ladder).g());
const TEST=[[genShade,genRep,genOnePct,()=>genPctOf(1)],[()=>genPctOf(2),genWhole,genWhatPct,genRemain],[genMult,genNewPrice,genBefore,genChangePct],[genUpDown,genTwoDisc,genOfRest,genDeal]];
/* ===== הסבר מונפש: רעיון אחד בכל כרטיס ===== */
const BAR=(w,col,d,lab)=>`<rect class="rv" style="--d:${d}s" x="${290-w}" y="0" width="${w}" height="34" rx="6" fill="${col}"/><text class="rv" style="--d:${d+.3}s" x="${290-w/2}" y="23" fill="#13233a" font-size="16" font-weight="900" text-anchor="middle" font-family="Rubik">${lab}</text>`;
const RECAP=[
 {h:'מה זה אחוז?',d:4.2,svg:()=>GRID(20,{anim:1,d:.4,st:.18}),says:[`${M(20)} משבצות מתוך ${M(100)} = ${P(20)}`],what:'אחוז = כמה מתוך 100.'},
 {h:'אחוז הוא שבר',d:1.8,svg:()=>`<div class="row" style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap"><div style="width:130px">${GRID(50,{col:OR})}<div class="say">${FRr(1,2)} = ${P(50)}</div></div><div style="width:130px">${GRID(25,{col:BL})}<div class="say">${FRr(1,4)} = ${P(25)}</div></div><div style="width:130px">${GRID(10,{col:PU})}<div class="say">${FRr(1,10)} = ${P(10)}</div></div></div>`,
  says:[`${P(100)} = הכול`],what:'מרחיבים את השבר למכנה 100.'},
 {h:'אחוז = יחס = שבר',d:1.8,svg:()=>`<div style="width:150px;margin:auto">${GRID(20,{anim:1,d:.2,st:.05})}</div>`,
  says:[`${P(20)} = ${FRr(20,100)} = ${FRr(1,5)}`,`כמו יחס ${M('1 : 4')}: ${M('1')} חלק מתוך ${M('1 + 4 = 5')}`],what:'אחוז, שבר ויחס: חלק מתוך השלם.'},
 {h:'הטבלה: שלם · שבר = החלק',d:.6,svg:()=>PT({h:['השלם','1%','החלק'],p:['100%','1%','20%'],v:[300,3,60],g:[[0,0],[1,0],[0,1],[0,2]],a:[1,2],x:{'1,1':'300 : 100 = 3','1,2':'3 · 20 = 60'}},true),
  says:['השלם ידוע ← <b>כפל</b>'],what:'שלם · שבר = החלק.'},
 {h:'מוצאים את השלם',d:.6,svg:()=>PT({h:['השלם','1%','החלק'],p:['100%','1%','20%'],v:[300,3,60],g:[[0,0],[0,1],[0,2],[1,2]],a:[1,0],x:{'1,1':'60 : 20 = 3','1,0':'3 · 100 = 300'}},true),
  says:['השלם חסר ← <b>חילוק</b>'],what:'חלק : שבר = השלם.'},
 {h:'התייקרות והוזלה',d:2.6,svg:()=>`<svg viewBox="0 0 300 130" style="width:100%;max-width:320px" role="img" aria-label="מחיר ישן 100 אחוז, מחיר אחרי התייקרות 120 אחוז, מחיר אחרי הוזלה 80 אחוז">${BAR(200,'#9fb3cc',.2,'לפני: 100%')}<g transform="translate(0,46)">${BAR(240,GR,1,'התייקרות: 120%')}</g><g transform="translate(0,92)">${BAR(160,OR,1.8,'הוזלה: 80%')}</g></svg>`,
  says:[`התייקרות של ${P(20)} ← ${P(120)} ← כופלים ב־${M(1.2)}`,`הוזלה של ${P(20)} ← ${P(80)} ← כופלים ב־${M(0.8)}`],what:'המחיר הישן = 100%. תמיד!'},
 {h:'המוקש',d:.4,says:[`${M(100)} ← עלייה של ${P(10)} ← ${M(110)}`,`${M(110)} ← ירידה של ${P(10)} ← ${M(99)} <span class="x">✗ לא 100!</span>`],what:'כל שינוי מחושב מהמחיר שלפניו.'}];
RECAP[0].chk=[genShade];RECAP[1].chk=[genRep];RECAP[2].chk=[genRep,genShade];RECAP[3].chk=[()=>genPctOf(1),genPctOf];RECAP[4].chk=[genWhole];RECAP[5].chk=[genNewPrice,genMult];RECAP[6].chk=[genUpDown];
/* ===== כמו במשימת ההערכה (נוסף 1.11.2026): "קטן ברבע", "מי צודק?". הסבר פשוט, צעד אחרי צעד ===== */
function gShrink(){const [nm,div,pct]=pick([['ברבע',4,25],['בחצי',2,50],['בחמישית',5,20],['בעשירית',10,10]]),k=R(2,8),X=div*k*pick([1,2]),cut=X/div,N=X-cut;
 return {kind:'קטן ב___',rc:RC_SHR,text:`טווח הטיסה של רחפן הוא ${M(X)} ק״מ. ביום סוער הטווח קטן ${nm}. מה הטווח ביום סוער?`,
  ans:[{label:'ק״מ',val:N}],
  work:[{t:`${nm.replace('ב','')} של ${M(X)}: ${M(X+' : '+div+' = ?')}`,ans:[{label:'',val:cut}],why:`${nm.replace('ב','')} = מחלקים ב־${div} (זה ${pct}%).`},{t:`קטן ← מחסירים: ${M(X+' − '+cut+' = ?')}`,ans:[{label:'',val:N}],why:'"קטן ב..." ← מורידים את החלק מהשלם.'}],
  lines:[`${M(X+' : '+div+' = '+cut)}`,`${M(X+' − '+cut+' = '+N)} ק״מ`],rule:'"קטן ברבע": מוצאים רבע (מחלקים ב־4), ומחסירים אותו.',
  diag:({vals:[x]})=>x===cut?'זה רק החלק שירד. כמה <b>נשאר</b>? מחסירים: '+M(X+' − '+cut)+'.':x===X-div?'הורדתם '+div+'. צריך להוריד <b>'+nm.replace('ב','')+'</b> מ־'+X+': '+M(X+' : '+div)+'.':null};}
function gWhoRight(){const X=pick([16,20,24,12]),cut=X/4,N=X-cut,D=pick([N+1,N+2]);
 const s=shuf([{t:`המנהל צודק: הטווח קטן ל־${N} ק״מ, וזה פחות מ־${D}`,ok:1},{t:`המנהל טועה: הטווח נשאר ${X} ק״מ`,msg:`הטווח <b>קטן</b> ברבע: ${M(X+' : 4 = '+cut)}, ${M(X+' − '+cut+' = '+N)}.`},{t:`המנהל טועה: הטווח קטן ל־${X-4} ק״מ`,msg:`רבע זה לא 4! רבע מ־${X} = ${M(X+' : 4 = '+cut)}.`}]);
 return {kind:'מי צודק?',rc:RC_SHR,text:`רחפן יכול לטוס עד ${M(X)} ק״מ. ביום סוער הטווח קטן ברבע. לקוח גר במרחק ${M(D)} ק״מ. המנהל אומר: "ביום סוער הרחפן לא יגיע ללקוח". מה נכון?`,
  choice:s.map(x=>x.t),correct:s.findIndex(x=>x.ok),diag:({sel})=>s[sel]&&!s[sel].ok?s[sel].msg:null,
  work:[{t:`רבע מ־${M(X)}: ${M(X+' : 4 = ?')}`,ans:[{label:'',val:cut}],why:'רבע = מחלקים ב־4.'},{t:`הטווח ביום סוער: ${M(X+' − '+cut+' = ?')}`,ans:[{label:'',val:N}],why:'קטן ← מחסירים.'}],
  lines:[`טווח ביום סוער: ${M(N)} ק״מ`,`${M(N)} &lt; ${M(D)} ← לא מגיע ← המנהל צודק`],rule:'מחשבים קודם, ורק אז מחליטים מי צודק.'};}
let RC_SHR=RECAP.push({h:'"קטן ברבע"',d:.6,says:[`רבע מ־${M('16')}: ${M('16 : 4 = 4')}`,`קטן ← מחסירים: ${M('16 − 4 = 12')}`],def:'רבע = 25% · חצי = 50% · חמישית = 20%',what:'מוצאים את החלק, ומחסירים אותו.'})-1;
RECAP[RC_SHR].chk=[gShrink,gWhoRight];
LAD[2].push({g:gShrink,n:3,h:2},{g:gWhoRight,n:2,h:2});
