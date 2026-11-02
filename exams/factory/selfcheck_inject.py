"""מוסיף לדף עבודה לתלמידים בדיקה עצמית במסך: ליד כל שאלה כפתור "בדקו אותי",
התלמיד רואה את התשובה הנכונה, מסמן "צדקתי ✓" או "טעיתי ✗", ובראש הדף מוצג הניקוד שלו.
לא מופיע בהדפסה. שימוש: python3 exams/factory/selfcheck_inject.py share/h8/ws_*.html"""
import sys
CSS='''<style id="sc-css">.sc{margin:2mm 0 1mm}.sc button{font:700 14px Arial,sans-serif;border-radius:9px;border:2px solid #1a4d45;background:#fff;color:#1a4d45;padding:6px 12px;cursor:pointer}
.sc .ans{display:none;margin-top:6px;border:2px dashed #1a4d45;border-radius:10px;padding:8px 10px;background:#eef5f3;font-size:15px}
.sc.open .ans{display:block}.sc .mk{margin-top:6px;display:flex;gap:8px}.sc .mk button.ok{border-color:#1b7f3b;color:#1b7f3b}.sc .mk button.no{border-color:#b00020;color:#b00020}
.sc .mk button.on.ok{background:#1b7f3b;color:#fff}.sc .mk button.on.no{background:#b00020;color:#fff}.sc .tip{font-size:13px;color:#555;margin-top:4px}
#sc-score{position:sticky;top:0;z-index:9;max-width:190mm;margin:6px auto;background:#1a4d45;color:#fff;border-radius:10px;padding:8px 14px;font:700 16px Arial,sans-serif;text-align:center}
@media print{.sc,#sc-score{display:none!important}}</style>'''
JS='''<script id="sc-js">(function(){const key=[...document.querySelectorAll('.kt tr')].slice(1);const A={};key.forEach(r=>{const c=r.querySelectorAll('td');if(c.length>=3)A[c[0].textContent.replace('*','').trim()]=c[c.length-1].innerHTML;});
const qs=[...document.querySelectorAll('.q')];const res={};const bar=document.createElement('div');bar.id='sc-score';document.body.insertBefore(bar,document.body.children[1]||null);
const up=()=>{const v=Object.values(res),ok=v.filter(x=>x).length;bar.textContent=v.length?`✓ צדקתי ב־${ok} מתוך ${v.length} שבדקתי · ${qs.length} שאלות בדף`:`פותרים, ואז לוחצים "בדקו אותי" ליד כל שאלה 👀`;};
qs.forEach(q=>{const n=(q.querySelector('.qn')||{}).textContent;if(!n||!A[n])return;const d=document.createElement('div');d.className='sc';
d.innerHTML=`<button type="button" class="see">👀 בדקו אותי</button><div class="ans"><b>התשובה הנכונה:</b> ${A[n]}<div class="mk"><button type="button" class="ok">✓ צדקתי</button><button type="button" class="no">✗ טעיתי</button></div><div class="tip">טעיתם? קראו שוב את השיטה בראש הדף, ונסו לפתור שוב.</div></div>`;
d.querySelector('.see').onclick=()=>{d.classList.toggle('open');};
d.querySelector('.ok').onclick=e=>{res[n]=true;e.target.classList.add('on');d.querySelector('.no').classList.remove('on');up();};
d.querySelector('.no').onclick=e=>{res[n]=false;e.target.classList.add('on');d.querySelector('.ok').classList.remove('on');up();};
const ln=q.querySelector('.lines');(ln||q).insertAdjacentElement(ln?'beforebegin':'beforeend',d);});up();})();</script>'''
for p in sys.argv[1:]:
    s=open(p,encoding='utf-8').read()
    if 'id="sc-js"' in s: print('skip',p); continue
    s=s.replace('</head>',CSS+'</head>',1).replace('</body>',JS+'</body>',1)
    s=s.replace('בסוף הדף (במסך) יש תשובות. פתרו קודם לבד, ורק אחר כך בדקו את עצמכם.','ליד כל שאלה יש כפתור "בדקו אותי": פתרו קודם לבד, ורק אחר כך בדקו את עצמכם.')
    open(p,'w',encoding='utf-8').write(s);print('ok',p)
