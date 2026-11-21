# -*- coding: utf-8 -*-
"""Builds the printable practice sheets (one HTML that is also the phone page) + PDF."""
import re, base64, sys, os, json
sys.path.insert(0, os.path.dirname(__file__))
from content import L, LV
from diagrams import render, numline

FONTS = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'fonts.css')).read()
LOGO = 'data:image/png;base64,' + base64.b64encode(open(os.path.join(os.path.dirname(__file__), 'logo_s.png'), 'rb').read()).decode()
STARS = ['★', '★★', '★★★', '★★★★']

def m(t):
    def rep(mm):
        s = mm.group(1)
        s = re.sub(r'(?<![A-Za-z])([xy])(?![A-Za-z])', r'<i>\1</i>', s)
        return f'<span class="m">{s}</span>'
    return re.sub(r'\$(.+?)\$', rep, t)

CSS = FONTS + r"""
:root{--ink:#16202c;--mut:#4a5563;--rule:#9aa3ad}
*{box-sizing:border-box}
html,body{margin:0;padding:0}
body{font-family:'Heebo','Rubik',Arial,sans-serif;color:var(--ink);direction:rtl;background:#e9edf1}
.m{direction:ltr;unicode-bidi:isolate;display:inline-block;white-space:nowrap;font-family:'Rubik',sans-serif}
.m i{font-family:'Times New Roman',serif;font-style:italic;font-size:1.1em}
.page{width:210mm;height:297mm;margin:0 auto 6mm;background:#fff;padding:8mm 10mm 6mm;display:flex;flex-direction:column;overflow:hidden;position:relative;box-shadow:0 1px 8px rgba(0,0,0,.15)}
.hd{display:flex;align-items:center;gap:5mm;border-bottom:.5mm solid var(--ink);padding-bottom:2mm}
.hd img{height:15mm;width:auto}
.hd .tt{flex:1}
.hd .unit{font-family:'Rubik';font-size:10.5pt;color:var(--mut);font-weight:500}
.hd h1{font-family:'Rubik';font-weight:800;font-size:22pt;margin:.5mm 0 0;line-height:1.1}
.hd .ln{font-family:'Rubik';font-weight:700;font-size:11pt}
.name{display:flex;gap:2mm;align-items:flex-end;font-size:12.5pt;margin:2mm 0 2mm}
.name u{display:inline-block;width:80mm;border-bottom:.3mm solid var(--ink);text-decoration:none;height:6mm}
.rule{border:.4mm solid var(--ink);border-radius:2.5mm;padding:2mm 3.5mm;font-size:12pt;font-weight:600;line-height:1.45}
.rule b{font-family:'Rubik';font-weight:800}
.help{margin-top:2mm}
.help .cap{font-size:9.5pt;color:var(--mut)}
.help svg{display:block}
svg{direction:ltr}
svg text{unicode-bidi:plaintext}
.body{flex:1;display:flex;flex-direction:column;min-height:0}
.sec{font-family:'Rubik';font-weight:800;font-size:13pt;margin:2.4mm 0 .6mm;padding:.5mm 0;border-bottom:.35mm solid var(--ink);display:flex;gap:3mm;align-items:baseline}
.sec small{font-weight:400;font-size:9.5pt;color:var(--mut)}
.q{display:flex;gap:4mm;flex:var(--g) 0 auto;min-height:0;padding-top:1.2mm}
.qt{flex:1;display:flex;flex-direction:column;min-width:0}
.qx{font-size:12.5pt;line-height:1.38;display:flex;gap:2mm}
.qn{flex:none;font-family:'Rubik';font-weight:800;width:6.4mm;height:6.4mm;border:.35mm solid var(--ink);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10.5pt;margin-top:.4mm}
.lv{font-family:'Rubik';font-weight:700;font-size:9.5pt;border:.3mm solid var(--ink);border-radius:1.5mm;padding:0 1.4mm;margin-left:1.5mm;white-space:nowrap;vertical-align:1px}
.w{flex:1 1 0;min-height:16mm;overflow:hidden;margin-right:8.4mm}
.w div{height:8mm;border-bottom:.25mm solid var(--rule)}
.dg{flex:none;align-self:flex-start;max-width:62mm}
.q.grid .dg{max-width:none}
.q.grid .w{visibility:hidden}
.ft{display:flex;justify-content:space-between;font-size:8.5pt;color:var(--mut);border-top:.25mm solid var(--rule);padding-top:1.3mm;margin-top:2mm}
.ans h1{font-family:'Rubik';font-weight:800;font-size:20pt;margin:1mm 0 1mm}
.ans .intro{font-size:11pt;color:var(--mut);margin-bottom:2mm}
.ak{columns:2;column-gap:7mm;flex:1;column-fill:balance}
.ak section{break-inside:avoid;margin-bottom:2.2mm;border:.3mm solid var(--rule);border-radius:2mm;padding:1.4mm 2.4mm}
.ak h3{font-family:'Rubik';font-size:10.5pt;margin:0 0 .6mm}
.ak .k{font-size:9.6pt;line-height:1.38;display:flex;gap:1.2mm}
.ak .k b{font-family:'Rubik';flex:none;min-width:12mm}
.bar{position:sticky;top:0;z-index:5;background:#16202c;color:#fff;padding:8px 10px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:flex-start;font-family:'Rubik'}
.bar b{font-size:15px;margin-left:auto}
.bar a,.bar button{font:inherit;font-size:15px;font-weight:700;background:#ffc928;color:#16202c;border:0;border-radius:10px;padding:8px 12px;text-decoration:none;cursor:pointer}
.bar .wa{background:#25d366;color:#fff}
.bar .s{background:#fff}
#pages{padding-top:6mm}
@page{size:A4;margin:0}
@media print{body{background:#fff}.bar{display:none}#pages{padding:0}.page{margin:0;box-shadow:none;break-after:page;zoom:1!important}}
"""

def question(qq, i, sec, big=False):
    g = qq['grow']
    dg = render(qq['d'], big) if qq['d'] else ''
    cls = 'q grid' if qq['d'] and qq['d'][0] == 'grid' else 'q'
    return (f'<div class="{cls}" style="--g:{g}"><div class="qt"><div class="qx"><span class="qn">{i+1}</span>'
            f'<div><span class="lv">{STARS[i]} {LV[i]}</span>{m(qq["t"])}</div></div><div class="w"></div></div>{dg}</div>')

def page(l, total, pn, parts=(('cls', 'בכיתה'), ('home', 'בבית')), suffix=''):
    help_ = ''
    if l['helper'] == 'numline':
        help_ = f'<div class="help"><span class="cap">ציר מספרים לעזרה</span>{numline()}</div>'
    secs = ''
    for key, nm in parts:
        secs += f'<div class="sec">{nm}</div>' + ''.join(question(qq, i, key, len(parts) == 1) for i, qq in enumerate(l[key]))
    return f'''<section class="page" id="L{l["n"]}{suffix}">
<div class="hd"><div class="tt"><div class="unit">{l["unit"]} · מתמטיקה ז׳</div><h1>{l["title"]}</h1><div class="ln">שיעור {l["n"]}</div></div><img src="{LOGO}" alt="שחקים"></div>
<div class="name">שם: <u></u></div>
<div class="rule"><b>זוכרים:</b> {m(l["rule"])}</div>{help_}
<div class="body">{secs}</div>
<div class="ft"><span>ערכה: רוני מודן · שחקים</span><span>שיעור {l["n"]} · {"·".join(nm for _, nm in parts)} · עמוד {1 if suffix != "b" else 2} מתוך {2 if suffix else 1}</span></div>
</section>'''

def pages_for(l):
    return 2 if l.get('split') else 1

def answers(pn, total, part):
    items = ''
    for l in part:
        rows = ''
        for key, nm in (('cls', 'בכיתה'), ('home', 'בבית')):
            for i, qq in enumerate(l[key]):
                rows += f'<div class="k"><b>{nm} {i+1}</b><span>{m(qq["a"])}</span></div>'
        items += f'<section><h3>שיעור {l["n"]} · {l["title"]}</h3>{rows}</section>'
    return f'''<section class="page ans">
<div class="hd"><div class="tt"><div class="unit">מתמטיקה ז׳</div><h1>תשובות לבדיקה עצמית</h1></div><img src="{LOGO}" alt="שחקים"></div>
<div class="intro">פותרים קודם לבד, ורק אחר כך בודקים. בשאלות "תנו דוגמה" יש עוד תשובות נכונות.</div>
<div class="ak">{items}</div>
<div class="ft"><span>ערכה: רוני מודן · שחקים</span><span>תשובות · עמוד {pn - sum(pages_for(l) for l in L)} מתוך 2</span></div>
</section>'''

JS = r"""
<script>
(function(){
 const MM=96/25.4, LH=8*MM;
 function fill(){
  document.querySelectorAll('.w').forEach(w=>{w.innerHTML='';});
  document.querySelectorAll('.w').forEach(w=>{const n=Math.max(0,Math.floor((w.clientHeight+1)/LH));w.innerHTML='<div></div>'.repeat(n);w.dataset.n=n;});
 }
 function fit(){const p=document.querySelector('.page');if(!p)return;const z=Math.min(1,(innerWidth-8)/(210*MM));
  document.querySelectorAll('.page').forEach(e=>e.style.zoom=z);}
 window.__fill=fill;
 addEventListener('load',()=>{fill();fit();});addEventListener('resize',fit);
 addEventListener('beforeprint',()=>document.querySelectorAll('.page').forEach(e=>e.style.zoom=1));
 addEventListener('afterprint',fit);
 const sh=document.getElementById('share');if(sh)sh.onclick=()=>{const u=location.href.split('#')[0];
  if(navigator.share)navigator.share({title:document.title,url:u}).catch(()=>{});else location.href='https://wa.me/?text='+encodeURIComponent(document.title+'\n'+u);};
})();
</script>"""

def build(out_html, pdf_name='practice.pdf', deck_name='deck.html'):
    total = sum(pages_for(l) for l in L) + 2
    half = 7
    body = ''; pn = 1
    for l in L:
        if l.get('split'):
            body += page(l, total, pn, (('cls', 'בכיתה'),), 'a') + page(l, total, pn + 1, (('home', 'בבית'),), 'b'); pn += 2
        else:
            body += page(l, total, pn); pn += 1
    body += answers(pn, total, L[:half]) + answers(pn + 1, total, L[half:])
    bar = (f'<div class="bar"><b>תרגול מתמטיקה ז׳ · שחקים</b>'
           f'<button class="s" onclick="print()">🖨️ הדפסה</button>'
           f'<a href="{pdf_name}" download>⬇️ קובץ להדפסה</a>'
           f'<a href="{deck_name}">📱 מצגת לטלפון</a>'
           f'<button class="wa" id="share">שיתוף</button></div>')
    html = (f'<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">'
            f'<meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<title>תרגול מתמטיקה ז׳ · שיעורים 1–14 · שחקים</title><style>{CSS}</style></head>'
            f'<body>{bar}<div id="pages">{body}</div>{JS}</body></html>')
    open(out_html, 'w', encoding='utf-8').write(html)
    return html

if __name__ == '__main__':
    build(sys.argv[1])
