const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1100,height:900}});
await p.goto('file://'+process.cwd()+'/exams/generator.html');await p.evaluate(()=>localStorage.clear());await p.reload();
await p.evaluate(()=>{Object.assign(S,{g:'ח',k:'ws',t:['h8_pythag'],n:10,lv:'mix',key:true,cls:'ט׳ א1, א2',yr:'תשפ״ז'});ui();render();});
const html=await p.evaluate(()=>{
 document.querySelectorAll('.panel').forEach(e=>e.remove());
 document.querySelectorAll('script').forEach(e=>e.remove());
 document.querySelectorAll('.lvl.brk,.q.brk').forEach(e=>e.classList.remove('brk'));
 const st=document.createElement('style');st.textContent='.kt td:last-child{white-space:normal!important;text-align:right!important}';document.head.appendChild(st);
 document.querySelectorAll('meta[name=viewport]').forEach(m=>m.remove());const mv=document.createElement('meta');mv.name='viewport';mv.content='width=830';document.head.appendChild(mv);
 document.querySelectorAll('.key h2').forEach(h=>h.textContent=h.textContent.replace('תשובות למורה','תשובות לבדיקה עצמית'));
 document.querySelectorAll('.sheet').forEach(sh=>{sh.innerHTML=sh.innerHTML.replace(/תשובות למורה/g,'תשובות לבדיקה עצמית')});
 const shs=document.querySelectorAll('.sheet');if(shs.length>1)shs[shs.length-1].classList.add('noprint');
 const msg=document.createElement('div');msg.className='noprint';msg.setAttribute('dir','rtl');
 msg.style.cssText='max-width:190mm;margin:12px auto;padding:14px 18px;border:2px solid #1a4d45;border-radius:12px;background:#eef5f3;font-family:Rubik,Arial;font-size:17px;line-height:1.6;color:#1f2433';
 msg.innerHTML='<b>תלמידים יקרים,</b><br>לפניכם דף עבודה במשפט פיתגורס. פתרו בדף או במחברת, והציגו את דרך החישוב.<br>זכרו: פיתגורס <b>רק במשולש ישר זווית</b>. ניצב² + ניצב² = יתר².<br>בסוף הדף (במסך) יש תשובות. פתרו קודם לבד, ורק אחר כך בדקו את עצמכם.<br>בהצלחה! 💪<br><b>רוני</b> · ערכה: רוני מודן · שחקים'+
 '<div style="margin-top:10px"><button onclick="window.print()" style="font:inherit;font-weight:700;padding:8px 18px;border-radius:10px;border:0;background:#1a4d45;color:#fff;cursor:pointer">🖨️ הדפסה</button></div>';
 document.body.insertBefore(msg,document.body.firstChild);
 document.title='דף עבודה · משפט פיתגורס · ערכה: רוני מודן · שחקים';
 return '<!DOCTYPE html>\n'+document.documentElement.outerHTML;});
require('fs').writeFileSync('share/h8/ws_pythag.html',html);
const q=await p.evaluate(()=>document.querySelectorAll('.q').length);
const p2=await b.newPage({viewport:{width:420,height:900}});await p2.goto('file://'+process.cwd()+'/share/h8/ws_pythag.html');await p2.waitForTimeout(500);
await p2.screenshot({path:'/tmp/ws_phone.png',fullPage:false});await p2.pdf({path:'/tmp/ws.pdf',preferCSSPageSize:true,printBackground:true});
console.log('questions',q);await b.close()})();
