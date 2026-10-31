"""Solved-exercises page builder: exercise → animated answer right below, trick emphasized. No buttons.
Usage: python3 apps/solved/build_solved.py  →  apps/y10_sys2_solved.html"""
import os
HERE=os.path.dirname(os.path.abspath(__file__));APPS=os.path.dirname(HERE)
fonts=open(os.path.join(APPS,'factory','fonts.css'),encoding='utf-8').read()
def m(t): return f'<span class="m">{t}</span>'
def k(t): return f'<span class="k">{t}</span>'          # the trick – glows
def fly(t): return f'<span class="fly">{t}</span>'      # lands in place
def st(t): return f'<span class="st">{t}</span>'        # struck out
def fr(a,b): return f'<span class="fr"><span>{a}</span><span>{b}</span></span>'
import re
def mm(t): return re.sub(r'([A-Za-z0-9²(][A-Za-z0-9²()=+−:.,; ]*[A-Za-z0-9²)])',lambda g:m(g.group(1)),t)
def sys(a,b): return f'<div class="sy">{a}<br>{b}</div>'
# each exercise: (number, system html, clue text, [(line html, note)], answer)
T=[
('🔁 מבודדים ומציבים','יש משוואה <b>קווית</b> (בלי ריבועים) ← מבודדים ממנה ומציבים בשנייה.',[
 ('לדוגמה',sys(k('x + y = 7'),'x² + y² = 25'),'🔍 משוואה בלי ריבועים ← ממנה מבודדים',[
  (m(k('y = 7 − x')),'מבודדים: x עובר אגף ← הסימן מתהפך'),
  (m('x² + ('+fly(k('7 − x'))+')² = 25'),'מציבים במקום y ← נשאר נעלם אחד'),
  (m('x² + 49 − 14x + x² = 25'),'פותחים ריבוע: לא 49 − x²!'),
  (m('x² − 7x + 12 = 0'),'מסדרים ומחלקים ב־2'),
  (m('x = 3 , x = 4'),'מכפלה 12, סכום 7'),
  (m('x = 3 ← y = 4 , x = 4 ← y = 3'),'מציבים בקווית: כל x מקבל y משלו')],'(3 ; 4) , (4 ; 3)'),
 ('לדוגמה',sys(k('y − x = 1'),'x² + y² = 13'),'🔍 שוב משוואה קווית ← מבודדים את y',[
  (m(k('y = x + 1')),'מבודדים'),
  (m('x² + ('+fly(k('x + 1'))+')² = 13'),'מציבים'),
  (m('2x² + 2x + 1 = 13 ← x² + x − 6 = 0'),'פותחים, מסדרים ומחלקים ב־2'),
  (m('x = 2 , x = −3'),'מכפלה −6, סכום −1'),
  (m('x = 2 ← y = 3 , x = −3 ← y = −2'),'y = x + 1')],'(2 ; 3) , (−3 ; −2)')]),
('✂️ ה־xy נעלם','אותו <b>xy</b> בשתי המשוואות ← פותחים סוגריים ומציבים את xy.',[
 ('תרגיל 22',sys(m('(x + 2)(y − 1) = 60'),m(k('xy')+' = 60')),'🔍 xy נתון! והוא יופיע כשנפתח סוגריים',[
  (m(k('xy')+' − x + 2y − 2 = 60'),'פותחים: כל איבר כפול כל איבר'),
  (m(fly(k('60'))+' − x + 2y − 2 = 60'),'מציבים xy = 60'),
  (m(st('60')+' − x + 2y − 2 = '+st('60')+' ← −x + 2y = 2'),'60 מתבטל ← משוואה קווית!'),
  (m('x = 2y − 2'),'מבודדים – כמו בטריק 1'),
  (m('(2y − 2)y = 60 ← y² − y − 30 = 0'),'מציבים ב־xy = 60 ומחלקים ב־2'),
  (m('y = 6 ← x = 10 , y = −5 ← x = −12'),'x = 2y − 2')],'(10 ; 6) , (−12 ; −5)'),
 ('לדוגמה',sys(m('(x + 1)(y + 2) = 40'),m(k('xy')+' = 24')),'🔍 xy נתון ← פותחים ומציבים',[
  (m(k('xy')+' + 2x + y + 2 = 40'),'פותחים סוגריים'),
  (m(fly(k('24'))+' + 2x + y + 2 = 40 ← 2x + y = 14'),'מציבים xy = 24 ← קווית'),
  (m('y = 14 − 2x'),'מבודדים'),
  (m('x(14 − 2x) = 24 ← x² − 7x + 12 = 0'),'מציבים ב־xy = 24'),
  (m('x = 3 ← y = 8 , x = 4 ← y = 6'),'y = 14 − 2x')],'(3 ; 8) , (4 ; 6)')]),
('🎁 ריבוע מוסתר','רואים <b>x² + 2xy + y²</b> ← זה (x + y)² ← מוציאים שורש.',[
 ('תרגיל 19',sys(m(k('x² + 2xy + y²')+' = 64'),m('2x + 3y = 19')),'🔍 x² + 2xy + y² ← נוסחת כפל מקוצר',[
  (m(k('(x + y)²')+' = 64'),'x² + 2xy + y² = (x + y)²'),
  (m('x + y = 8')+'  או  '+m('x + y = −8'),'שורש ← שני מקרים!'),
  (m('x + y = 8 , 2x + 3y = 19 ← y = 3 , x = 5'),'מקרה 1: קווית'),
  (m('x + y = −8 , 2x + 3y = 19 ← y = 35 , x = −43'),'מקרה 2: קווית')],'(5 ; 3) , (−43 ; 35)')]),
('📦 x² הוא נעלם חדש','יש <b>רק x² ו־y²</b> (בלי x או y לבד) ← X = x², Y = y².',[
 ('תרגיל 29',sys(m(k('x²')+' + '+k('y²')+' = 13'),m(k('x²')+' − '+k('y²')+' = 5')),'🔍 רק ריבועים! אין x לבד',[
  (m(k('X')+' + '+k('Y')+' = 13 , X − Y = 5'),'X = x² , Y = y² ← קווית'),
  (m('2X = 18 ← X = 9 , Y = 4'),'מחברים: Y מתבטל'),
  (m('x² = 9 ← x = ±3 , y² = 4 ← y = ±2'),'חוזרים: שורש ← ±')],'(3 ; 2) , (3 ; −2) , (−3 ; 2) , (−3 ; −2)'),
 ('תרגיל 31',sys(m('3'+k('x²')+' + 2'+k('y²')+' = 11'),m('4'+k('x²')+' − 3'+k('y²')+' = −8')),'🔍 רק x² ו־y²',[
  (m('3'+k('X')+' + 2'+k('Y')+' = 11 , 4X − 3Y = −8'),'X = x² , Y = y²'),
  (m('9X + 6Y = 33 , 8X − 6Y = −16'),'כופלים ב־3 וב־2'),
  (m('17X = 17 ← X = 1 , Y = 4'),'מחברים: Y מתבטל'),
  (m('x = ±1 , y = ±2'),'שורש ← ±')],'(1 ; 2) , (1 ; −2) , (−1 ; 2) , (−1 ; −2)')]),
('🔄 שבר הופך לנעלם','הנעלם <b>במכנה</b> ← השבר כולו הופך לנעלם חדש.',[
 ('תרגיל 37',sys(m(k(fr(16,'x'))+' − '+k(fr(12,'y'))+' = 5'),m(k(fr(10,'x'))+' − '+k(fr(8,'y'))+' = 3')),'🔍 x ו־y במכנה',[
  (m(k(fr(1,'x'))+' = a , '+k(fr(1,'y'))+' = b'),'השבר = נעלם חדש'),
  (m('16a − 12b = 5 , 10a − 8b = 3'),'מערכת קווית'),
  (m('32a − 24b = 10 , 30a − 24b = 9'),'כופלים ב־2 וב־3'),
  (m('2a = 1 ← a = 0.5 , b = 0.25'),'מחסירים, ומציבים'),
  (m('x = 1 : 0.5 = 2 , y = 1 : 0.25 = 4'),'חוזרים מ־a ל־x!')],'(2 ; 4)'),
 ('תרגיל 43',sys(m(fr(20,k('x + y'))+' + '+fr(10,k('x − y'))+' = 7'),m(fr(50,k('x + y'))+' + '+fr(8,k('x − y'))+' = 9')),'🔍 אותם מכנים חוזרים',[
  (m(k(fr(1,'x + y'))+' = a , '+k(fr(1,'x − y'))+' = b'),'כל שבר = נעלם'),
  (m('20a + 10b = 7 , 50a + 8b = 9'),'מערכת קווית'),
  (m('80a + 40b = 28 , 250a + 40b = 45 ← a = 0.1 , b = 0.5'),'כופלים ב־4 וב־5, מחסירים'),
  (m('x + y = 10 , x − y = 2'),'חוזרים: 1 : 0.1 = 10 , 1 : 0.5 = 2'),
  (m('2x = 12 ← x = 6 , y = 4'),'מחברים')],'(6 ; 4)')]),
('➖ מחסירים משוואות','אותו <b>x² + y²</b> בשתי המשוואות ← מחסירים והוא נעלם.',[
 ('תרגיל 45',sys(m(k('x² + y²')+' − 20y = −36'),m(k('x² + y²')+' = 36')),'🔍 x² + y² פעמיים',[
  (m(st('x² + y²')+' − 20y − '+st('(x² + y²)')+' = −36 − 36'),'מחסירים ← x² + y² מתבטל'),
  (m('−20y = −72 ← y = 3.6'),'משוואה קווית'),
  (m('x² = 36 − 12.96 = 23.04 ← x = ±4.8'),'מציבים בשנייה ← ±')],'(4.8 ; 3.6) , (−4.8 ; 3.6)'),
 ('תרגיל 47',sys(m(k('(x − 1)²')+' + (y + 2)² = 17'),m(k('(x − 1)²')+' + (y + 5)² = 32')),'🔍 (x − 1)² פעמיים',[
  (m(st('(x − 1)²')+' + (y + 5)² − '+st('(x − 1)²')+' − (y + 2)² = 15'),'מחסירים ← (x − 1)² מתבטל'),
  (m('(y + 5)² − (y + 2)² = 15 ← 6y + 21 = 15'),'פותחים: y² מתבטל גם הוא!'),
  (m('y = −1 ← (x − 1)² + 1 = 17'),'מציבים'),
  (m('x − 1 = ±4 ← x = 5 , x = −3'),'שורש ← ±')],'(5 ; −1) , (−3 ; −1)')])]
out=[]
for ti,(name,how,exs) in enumerate(T):
    out.append(f'<section><h2>{name}</h2><p class="how">{how}</p>')
    for (num,sy,clue,lines,ans) in exs:
        ls=''.join(f'<div class="ln"><div class="eq">{l}</div><div class="nt">← {mm(n)}</div></div>' for l,n in lines)
        out.append(f'<div class="ex"><div class="num">{num}</div>{sy}<div class="clue ln">{mm(clue)}</div>{ls}<div class="ln ans">✅ {m(ans)}</div></div>')
    out.append('</section>')
html=f'''<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>6 הטריקים – תרגילים פתורים · ערכה: רוני מודן</title><style>{fonts}
:root{{--bg:#0f1b2d;--card:#13233a;--ink:#f3f6fb;--muted:#9fb3cc;--acc:#ffb020;--red:#ff7a8a;--ok:#4fd18b}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--ink);font-family:Heebo,Rubik,sans-serif;direction:rtl}}
main{{max-width:620px;margin:0 auto;padding:14px 12px 40px}}h1{{font:900 26px Heebo;margin:6px 0}}.sub{{color:var(--muted);margin:0 0 10px}}
h2{{font:800 22px Heebo;margin:26px 0 4px;color:var(--acc)}}.how{{margin:0 0 10px;font-size:17px}}
.ex{{background:var(--card);border:1px solid #2b4466;border-radius:16px;padding:12px;margin:12px 0}}
.num{{display:inline-block;background:#1c3352;border-radius:999px;padding:2px 12px;font-size:14px;color:var(--muted)}}
.m{{direction:ltr;unicode-bidi:isolate;font-family:Rubik;font-weight:700;white-space:nowrap}}
.sy{{display:block;width:max-content;max-width:100%;margin:8px 0 8px auto;direction:ltr;text-align:left;border-left:3px solid #9fb3cc;padding:4px 12px;font:700 21px Rubik;line-height:1.9}}
.fr{{display:inline-flex;flex-direction:column;vertical-align:middle;text-align:center;line-height:1.15;margin:0 2px}}.fr>span:first-child{{border-bottom:2px solid currentColor;padding:0 3px}}
.ln{{opacity:0;transform:translateY(8px);transition:opacity .5s,transform .5s}}.ln.on{{opacity:1;transform:none}}
.eq{{direction:ltr;text-align:center;font:700 18px Rubik;margin-top:8px;overflow-x:auto}}.nt{{text-align:center;color:var(--acc);font-weight:700;font-size:15px}}
.clue{{background:#ffb02022;border:2px solid var(--acc);border-radius:10px;padding:6px 10px;font-weight:800;text-align:center;margin:6px 0}}
.ans{{overflow-x:auto;text-align:center;font-size:19px;margin-top:10px;color:var(--ok)}}
.k{{border-radius:6px;padding:0 3px;transition:background .4s,box-shadow .4s}}.glow .k,.on .k{{background:#ffb02033;box-shadow:0 0 0 2px var(--acc);animation:gl 1s ease-in-out 3 alternate}}
@keyframes gl{{to{{box-shadow:0 0 12px 3px var(--acc)}}}}
.fly{{display:inline-block}}.on .fly{{animation:fly 1s ease-in-out both .3s}}@keyframes fly{{from{{transform:translateY(-36px) scale(1.3);opacity:0}}}}
.st{{position:relative;display:inline-block}}.st::after{{content:'';position:absolute;left:-2px;right:-2px;top:52%;height:3px;background:var(--red);transform:scaleX(0);transform-origin:left}}.on .st::after{{animation:stk .5s ease-out .5s forwards}}@keyframes stk{{to{{transform:scaleX(1)}}}}
.tap{{text-align:center;color:var(--muted);font-size:13px;margin-top:6px}}footer{{text-align:center;color:var(--muted);font-size:14px;margin-top:24px}}
</style></head><body><main><h1>6 הטריקים של המערכות</h1><p class="sub">תרגיל ← מתחתיו הפתרון נכתב לבד, והטריק מודגש. נגיעה בתרגיל = לצפות שוב.</p>
{''.join(out)}<footer><b>ערכה: רוני מודן · שחקים</b> · © כל הזכויות שמורות</footer></main>
<script>
function fit(){{document.querySelectorAll('.eq,.ans,.sy').forEach(e=>{{let f=parseFloat(getComputedStyle(e).fontSize);e.style.fontSize='';f=parseFloat(getComputedStyle(e).fontSize);while(e.scrollWidth>e.clientWidth+1&&f>11){{f-=1;e.style.fontSize=f+'px';}}}});}}
fit();addEventListener('resize',fit);
function play(ex){{const L=[...ex.querySelectorAll('.ln')],sy=ex.querySelector('.sy');L.forEach(l=>l.classList.remove('on'));sy.classList.remove('glow');void ex.offsetWidth;
 clearTimeout(ex._t1);(ex._ts||[]).forEach(clearTimeout);sy.classList.add('glow');ex._ts=L.map((l,i)=>setTimeout(()=>l.classList.add('on'),600+i*1700));}}
const io=new IntersectionObserver(es=>es.forEach(e=>{{if(e.isIntersecting&&!e.target._p){{e.target._p=1;play(e.target);}}}}),{{threshold:.35}});
document.querySelectorAll('.ex').forEach(ex=>{{io.observe(ex);ex.onclick=()=>play(ex);}});
</script></body></html>'''
open(os.path.join(APPS,'y10_sys2_solved.html'),'w',encoding='utf-8').write(html);print('built',len(html))
