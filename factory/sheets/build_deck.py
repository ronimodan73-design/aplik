# -*- coding: utf-8 -*-
"""Phone deck: the same 14 lessons, one question per screen, swipe, answer reveal."""
import json, sys, os, base64
sys.path.insert(0, os.path.dirname(__file__))
from content import L, LV
from diagrams import render
from build_sheets import m, FONTS, LOGO, STARS

def data():
    out = []
    for l in L:
        qs = []
        for key, nm in (('cls', 'בכיתה'), ('home', 'בבית')):
            for i, qq in enumerate(l[key]):
                qs.append(dict(sec=nm, n=i + 1, lv=f'{STARS[i]} {LV[i]}', t=m(qq['t']), a=m(qq['a']),
                               d=render(qq['d'], True) if qq['d'] else ''))
        out.append(dict(n=l['n'], title=l['title'], unit=l['unit'], rule=m(l['rule']), qs=qs))
    return out

CSS = FONTS + r"""
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html,body{margin:0;height:100%}
body{font-family:'Heebo','Rubik',Arial,sans-serif;background:#f3f5f8;color:#16202c;direction:rtl;overscroll-behavior:none}
.m{direction:ltr;unicode-bidi:isolate;display:inline-block;white-space:nowrap;font-family:'Rubik'}
.m i{font-family:'Times New Roman',serif;font-style:italic;font-size:1.1em}
header{position:sticky;top:0;background:#16202c;color:#fff;display:flex;align-items:center;gap:10px;padding:10px 12px;z-index:3}
header img{height:30px;background:#fff;border-radius:6px;padding:2px 4px}
header .t{flex:1;font-family:'Rubik';font-weight:700;font-size:15px;line-height:1.2;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical}
header button{font:inherit;font-weight:700;font-size:14px;border:0;border-radius:10px;padding:7px 9px;white-space:nowrap;background:#ffc928;color:#16202c}
main{max-width:640px;margin:0 auto;padding:14px 14px 90px}
.unit{font-family:'Rubik';color:#5b6472;font-weight:700;font-size:14px;margin:14px 4px 6px}
.ls{display:flex;align-items:center;gap:12px;width:100%;text-align:right;background:#fff;border:2px solid #dde3ea;border-radius:16px;padding:14px;margin:0 0 10px;font:inherit;font-size:18px;color:inherit}
.ls b{font-family:'Rubik';font-size:15px;min-width:34px;height:34px;border-radius:50%;background:#16202c;color:#fff;display:flex;align-items:center;justify-content:center}
.rule{background:#fff7d6;border:2px solid #f0d36b;border-radius:16px;padding:14px;font-size:18px;line-height:1.5;margin-bottom:12px}
.rule b{font-family:'Rubik'}
.tabs{display:flex;gap:8px;margin-bottom:12px}
.tabs button{flex:1;font:inherit;font-family:'Rubik';font-weight:700;font-size:17px;padding:10px;border-radius:12px;border:2px solid #16202c;background:#fff;color:#16202c}
.tabs button.on{background:#16202c;color:#fff}
.card{background:#fff;border-radius:20px;box-shadow:0 2px 12px rgba(0,0,0,.08);padding:18px;min-height:52vh;display:flex;flex-direction:column;gap:14px;touch-action:pan-y}
.card .top{display:flex;justify-content:space-between;align-items:center;font-family:'Rubik';font-weight:700;color:#5b6472;font-size:15px}
.lv{border:2px solid #16202c;border-radius:10px;padding:2px 8px;color:#16202c;font-size:14px}
.q{font-size:21px;line-height:1.55}
.dgw{display:flex;justify-content:center}
.dgw svg{width:100%;max-width:340px;height:auto}
.ansb{font:inherit;font-family:'Rubik';font-weight:700;font-size:17px;border:2px dashed #1a7f5a;color:#1a7f5a;background:#f0faf5;border-radius:14px;padding:12px;margin-top:auto}
.ans{font-size:19px;line-height:1.5;background:#e8f7ef;border-radius:14px;padding:12px;border-right:5px solid #1a7f5a}
.dots{display:flex;justify-content:center;gap:6px;margin:12px 0}
.dots i{width:9px;height:9px;border-radius:50%;background:#c9d1da}.dots i.on{background:#16202c;width:22px;border-radius:6px}
nav{position:fixed;bottom:0;left:0;right:0;display:flex;gap:10px;padding:10px 14px calc(10px + env(safe-area-inset-bottom));background:rgba(243,245,248,.96);border-top:1px solid #dde3ea;max-width:640px;margin:0 auto}
nav button{flex:1;font:inherit;font-family:'Rubik';font-weight:700;font-size:18px;padding:13px;border-radius:14px;border:0;background:#16202c;color:#fff}
nav button.s{background:#fff;color:#16202c;border:2px solid #16202c}
nav button:disabled{opacity:.35}
.foot{text-align:center;font-size:13px;color:#5b6472;margin-top:18px}
.hint{text-align:center;font-size:14px;color:#5b6472}
.links{display:flex;gap:8px;margin:6px 0 4px}
.links a{flex:1;text-align:center;font-family:'Rubik';font-weight:700;font-size:15px;text-decoration:none;background:#fff;border:2px solid #16202c;color:#16202c;border-radius:12px;padding:10px}
"""

JS = r"""
const D=__DATA__;let L=null,sec='בכיתה',k=0,shown=false;
const $=s=>document.querySelector(s), main=$('main');
function home(){L=null;history.replaceState(null,'',location.pathname);$('#ht').textContent='תרגול מתמטיקה ז׳ · שחקים';$('nav').style.display='none';
 let h='<div class="links"><a href="index.html">🖨️ דפים להדפסה</a></div>',u='';
 D.forEach(l=>{if(l.unit!==u){u=l.unit;h+=`<div class="unit">${u}</div>`;}h+=`<button class="ls" data-n="${l.n}"><b>${l.n}</b>${l.title}</button>`;});
 main.innerHTML=h+'<div class="foot">ערכה: רוני מודן · שחקים</div>';
 main.querySelectorAll('.ls').forEach(b=>b.onclick=()=>open(+b.dataset.n,'בכיתה',0));scrollTo(0,0);}
function qs(){return L.qs.filter(q=>q.sec===sec);}
function open(n,s,i){L=D.find(x=>x.n===n);sec=s;k=i;shown=false;history.replaceState(null,'','#'+n+(s==='בבית'?'b':'a')+(i+1));draw();}
function draw(){const Q=qs(),q=Q[k];$('#ht').textContent=`שיעור ${L.n} · ${L.title}`;$('nav').style.display='flex';
 main.innerHTML=`<div class="rule"><b>זוכרים:</b> ${L.rule}</div>
 <div class="tabs"><button class="${sec==='בכיתה'?'on':''}" data-s="בכיתה">בכיתה</button><button class="${sec==='בבית'?'on':''}" data-s="בבית">בבית</button></div>
 <div class="card" id="card"><div class="top"><span>שאלה ${q.n} מתוך ${Q.length}</span><span class="lv">${q.lv}</span></div>
 <div class="q">${q.t}</div>${q.d?`<div class="dgw">${q.d}</div>`:''}
 ${shown?`<div class="ans"><b>תשובה:</b> ${q.a}</div>`:'<button class="ansb" id="ab">פתרתי – הצגת תשובה</button>'}</div>
 <div class="dots">${Q.map((_,i)=>`<i class="${i===k?'on':''}"></i>`).join('')}</div>
 <div class="hint">מחליקים באצבע לשאלה הבאה</div><div class="foot">ערכה: רוני מודן · שחקים</div>`;
 main.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>open(L.n,b.dataset.s,0));
 const ab=$('#ab');if(ab)ab.onclick=()=>{shown=true;draw();};
 $('#prev').disabled=(k===0&&sec==='בכיתה');$('#next').textContent=(k===Q.length-1&&sec==='בבית')?'סיום ✓':'הבא ←';
 swipe($('#card'));}
function next(){const Q=qs();if(k<Q.length-1)open(L.n,sec,k+1);else if(sec==='בכיתה')open(L.n,'בבית',0);else home();}
function prev(){if(k>0)open(L.n,sec,k-1);else if(sec==='בבית')open(L.n,'בכיתה',qs().length-1);}
function swipe(el){let x0=null,y0=0;el.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
 el.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;
  if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)){dx<0?next():prev();}},{passive:true});}
$('#next').onclick=next;$('#prev').onclick=prev;$('#hb').onclick=home;
addEventListener('keydown',e=>{if(!L)return;if(e.key==='ArrowLeft')next();if(e.key==='ArrowRight')prev();});
$('#sh').onclick=()=>{const u=location.href.split('#')[0];if(navigator.share)navigator.share({title:document.title,url:u}).catch(()=>{});else location.href='https://wa.me/?text='+encodeURIComponent(document.title+'\n'+u);};
const mm=(location.hash||'').match(/^#(\d+)([ab])(\d+)$/);if(mm&&D.find(x=>x.n===+mm[1]))open(+mm[1],mm[2]==='b'?'בבית':'בכיתה',+mm[3]-1);else home();
"""

def build(out):
    js = JS.replace('__DATA__', json.dumps(data(), ensure_ascii=False))
    html = (f'<!doctype html><html lang="he" dir="rtl"><head><meta charset="utf-8">'
            f'<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">'
            f'<meta name="theme-color" content="#16202c"><title>תרגול מתמטיקה ז׳ · שחקים · מצגת לטלפון</title>'
            f'<style>{CSS}</style></head><body>'
            f'<header><img src="{LOGO}" alt="שחקים"><span class="t" id="ht"></span><button id="hb">☰ שיעורים</button><button id="sh">שיתוף</button></header>'
            f'<main></main><nav><button class="s" id="prev">→ הקודם</button><button id="next">הבא ←</button></nav>'
            f'<script>{js}</script></body></html>')
    open(out, 'w', encoding='utf-8').write(html)

if __name__ == '__main__':
    build(sys.argv[1])
