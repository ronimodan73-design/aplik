/* פרק: שלוש הדלתות של היחס · ח׳ א2 · ערכה: רוני מודן */
const {on,off,cap,mth,L,ratio,$}=V, R=ratio(2,3);
const sp=(c,t)=>`<span class="${c}">${t}</span>`;
V.cups([{name:'נועה',color:'#db2777',tint:'#fce7f3',count:2},{name:'איתי',color:'#2563eb',tint:'#dbeafe',count:3}]);
V.table([{h:'נועה',cls:'n'},{h:'איתי',cls:'i'},{h:'שלם'},{h:'הפרש',hidden:1}],['יחס<br>(חלקים)','כמות']);
V.ops(); V.fracScale(2,3,5);
V.tracker([['דלת 1','נתון חלק'],['דלת 2','נתון השלם'],['דלת 3','נתון ההפרש']]);
$('keyrow').innerHTML='🔑 המפתח: כמה בחלק אחד?';
const ratioRow=()=>{V.tset(0,0,'2');V.tset(0,1,'3');V.tset(0,2,'5')};
const all=[0,1,2,3,4];
const bub=()=>{const b=$('bub');b.innerHTML='נועה קיבלה 10?<br>אז לי מגיע 11!';b.style.left=(V.gc[1]-150)+'px';b.style.top='405px';const s=$('stamp');s.style.left=(V.gc[1]-45)+'px';s.style.top='330px'};
bub();

const B=[
 /* פתיחה */
 [0.2,()=>{cap('עוד 2 דקות —<br>תפתרו <span class="y">כל</span> שאלת יחס!');V.sfx('go')}],
 [2.8,()=>{V.cupsOn();cap('נועה ואיתי<br>מחלקים סוכריות')}],
 [5.0,()=>{cap('ביחס '+R);mth(sp('n','2')+':'+sp('i','3'))}],
 [7.4,()=>{mth('');cap('יחס = חלקים שווים.<br>כל כוס היא חלק אחד');V.pulse()}],
 /* הטעות */
 [10.2,()=>{on('bub');cap('איתי בטוח שהוא צודק…')}],
 [12.8,()=>{V.fill([0,1]);V.badge('bN','נועה: 10',V.gc[0],212);cap('בודקים בכוסות!<br>לנועה 10 — 5 בכל כוס')}],
 [15.2,()=>{V.fill([2,3,4],[4,4,3]);cap('ועכשיו 11 סוכריות<br>ב־3 כוסות…')}],
 [17.4,()=>{V.wobble([2,3,4]);on('stamp');V.sfx('wrong');cap('הכוסות לא שוות!<br>זה כבר לא יחס '+R)}],
 /* רק כפל וחילוק */
 [20.2,()=>{$('stage').classList.add('dim');on('ops');cap('אז מה מותר<br>לעשות ביחס?')}],
 [22.5,()=>{V.opsMark();V.sfx('wrong');cap('חיבור וחיסור —<br>מקלקלים את היחס')}],
 [25.0,()=>{V.opsGood();V.sfx('right');cap('ביחס — רק<br><span class="y">כפל וחילוק!</span>')}],
 [27.6,()=>{mth(sp('n','2')+':'+sp('i','3')+' = '+sp('n','4')+':'+sp('i','6')+' = '+sp('n','10')+':'+sp('i','15'));cap('הרחבה: כופלים את<br>שני החלקים באותו מספר')}],
 [30.4,()=>{mth(sp('n','10')+':'+sp('i','15')+' = '+sp('n','2')+':'+sp('i','3'));cap('צמצום: מחלקים את<br>שני החלקים באותו מספר')}],
 /* טבלת העוגן */
 [33.2,()=>{on('tbl');V.sfx('whoosh');cap('הכלי שלנו:<br>טבלת העוגן')}],
 [35.4,()=>{ratioRow();V.sfx('pop');mth('2 + 3 = 5');cap('שורת היחס:<br>כמה חלקים לכל אחד')}],
 [38.0,()=>{mth('');cap('שורת הכמות:<br>כמה סוכריות באמת')}],
 /* דלת 1 */
 [40.5,()=>{V.doorOpen('1','דלת 1','נתון: חלק')}],
 [43.1,()=>{off('dw');V.tset(1,0,'10','giv');V.badge('bN','נועה: 10',V.gc[0],212);V.hl([0,1]);cap('נתון: לנועה<br>10 סוכריות')}],
 [45.5,()=>{V.anchor(0);V.sfx('pop');cap('העוגן: העמודה שיש בה<br>גם יחס וגם כמות')}],
 [48.1,()=>{V.fill([0,1]);V.fac('·5');mth('10 : 2 = 5');cap('חלק אחד = 5')}],
 [50.8,()=>{V.hl([]);V.fill([2,3,4]);V.tset(1,1,'15');V.tset(1,2,'25');mth('3 · 5 = '+sp('i','15'));cap('כופלים כל חלק ב־5')}],
 [53.5,()=>{V.sfx('right');mth(sp('n','10')+' + '+sp('i','15')+' = 25 '+sp('g','✓'));cap('בדיקה: הסכום = השלם')}],
 /* דלת 2 */
 [56.0,()=>{V.doorOpen('2','דלת 2','נתון: השלם')}],
 [58.6,()=>{off('dw');V.tset(1,2,'25','giv');on('brace');V.badge('bA','יחד: 25',V.mid,236);V.hl(all);cap('נתון: יחד<br>25 סוכריות')}],
 [61.0,()=>{V.anchor(2);V.sfx('pop');cap('העוגן: עמודת השלם')}],
 [63.3,()=>{V.fill(all);V.fac('·5');mth('25 : 5 = 5');cap('חלק אחד = 5')}],
 [65.8,()=>{V.hl([]);V.tset(1,0,'10');V.tset(1,1,'15');V.sfx('right');mth('2 · 5 = '+sp('n','10')+'&emsp;&emsp;3 · 5 = '+sp('i','15'));cap('שוב נועה 10, איתי 15!')}],
 /* דלת 3 */
 [68.5,()=>{V.doorOpen('3','דלת 3','נתון: ההפרש')}],
 [71.1,()=>{off('dw');V.tcol(3,true);V.tset(0,3,'1');V.pairs([[1,2],[0,3]]);V.hl([4]);mth('3 − 2 = 1');cap('עמודת הפרש: לאיתי<br>חלק אחד יותר')}],
 [74.0,()=>{V.tset(1,3,'5','giv');V.anchor(3);V.badge('bC','עוד 5',V.cx[4],212);V.sfx('pop');cap('נתון: לאיתי<br>5 סוכריות יותר')}],
 [76.5,()=>{V.fill([4]);V.fac('·5');mth('5 : 1 = 5');cap('ההפרש הוא חלק אחד,<br>ולכן חלק אחד = 5')}],
 [77.9,()=>{V.fill([0,1,2,3])}],
 [79.6,()=>{V.hl([]);V.tset(1,0,'10');V.tset(1,1,'15');V.tset(1,2,'25');V.sfx('right');mth('');cap('שלוש דלתות —<br>אותה תשובה!')}],
 /* המפתח */
 [82.2,()=>{on('key');$('keyT').textContent='כמה בחלק אחד?';V.sfx('ding');cap('מפתח אחד<br>לשלוש הדלתות:')}],
 [85.4,()=>{off('key');on('keyrow');V.fac('·5');cap('החלק האחד הוא<br><span class="fx">גורם ההכפלה</span>')}],
 /* גורם ההכפלה בשבר */
 [88.0,()=>{on('frac','fA');cap('ועכשיו כשבר:')}],
 [90.0,()=>{on('e1','fB','fbadge','farcs');V.sfx('whoosh');cap('כופלים מונה ומכנה<br>באותו מספר: <span class="fx">5</span>')}],
 [92.6,()=>{on('e2','fC');mth(sp('n','2')+':'+sp('i','3')+' = '+sp('n','10')+':'+sp('i','15'));cap('אותו יחס בדיוק:<br>יחסים שקולים')}],
 [95.2,()=>{on('one');V.sfx('ding');cap('בעצם הכפלנו ב־1 —<br>לכן היחס לא השתנה!')}],
 /* תורכם */
 [98.2,()=>{on('qc');V.clock(10);V.sfx('go');cap('תורכם! עצרו וחשבו')}],
 ...[9,8,7,6,5,4,3,2,1,0].map((n,i)=>[99.2+i,()=>V.clock(n)]),
 [109.4,()=>{$('qh').innerHTML='בודקים יחד 👇';V.clock('');V.tset(1,2,'40','giv');V.anchor(2);V.sfx('pop');cap('נתון השלם — דלת 2.<br>העוגן: עמודת השלם')}],
 [112.0,()=>{V.fac('·8');mth('40 : 5 = 8');cap('חלק אחד = 8')}],
 [114.5,()=>{V.tset(1,1,'24');V.tset(1,0,'16');mth('3 · 8 = '+sp('i','24'));cap('לאיתי 24 סוכריות')}],
 [117.0,()=>{V.sfx('right');mth(sp('n','16')+' + '+sp('i','24')+' = 40 '+sp('g','✓'));cap('בדיקה: הסכום = השלם')}],
 /* סיום */
 [119.8,()=>{on('win');V.sfx('go');V.sfx('ding',.5)}],
];
V.run({end:126, beats:B,
 reset(){V.empty();V.hl([]);V.tclear();V.anchor(-1);V.fac('');V.opsReset();V.tcol(3,false);V.clock(10);$('qh').innerHTML='איזו דלת? איפה העוגן?'},
 chapters:[
 {t:0,name:'יחס',setup(){}},
 {t:10.2,name:'הטעות',setup(){V.cupsOn()}},
 {t:20.2,name:'רק כפל וחילוק',setup(){}},
 {t:33.2,name:'טבלת העוגן',setup(){V.cupsOn()}},
 {t:40.5,name:'דלת 1',setup(){V.cupsOn();on('tbl');ratioRow();V.door(1)}},
 {t:56.0,name:'דלת 2',setup(){V.cupsOn();on('tbl');ratioRow();V.door(2)}},
 {t:68.5,name:'דלת 3',setup(){V.cupsOn();on('tbl');ratioRow();V.door(3)}},
 {t:82.2,name:'המפתח',setup(){V.cupsOn();V.fill(all);on('tbl');ratioRow();V.tset(1,0,'10');V.tset(1,1,'15');V.tset(1,2,'25');V.door(4)}},
 {t:88.0,name:'גורם ההכפלה',setup(){$('stage').classList.add('dim');on('tbl','keyrow');ratioRow();V.tset(1,0,'10');V.tset(1,1,'15');V.tset(1,2,'25');V.fac('·5');V.door(4)}},
 {t:98.2,name:'תורכם',setup(){$('stage').classList.add('dim');on('tbl','keyrow');ratioRow()}},
 {t:119.8,name:'כל הכבוד',setup(){$('stage').classList.add('dim')}}]});
$('qq').innerHTML='סוכריות ביחס '+R+'.<br>יחד יש <span class="y">40</span> סוכריות.<br>כמה סוכריות לאיתי?';
$('win').innerHTML='<div class="big">פתחתם את<br>שלוש הדלתות!</div><div class="row">🚪 🚪 🚪</div><div class="sm">ביחס — רק כפל וחילוק<br>🔑 כמה בחלק אחד?</div>';
