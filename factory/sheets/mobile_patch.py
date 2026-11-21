# Adds a phone layer to the WOW decks: readable portrait layout + swipe. Idempotent.
import sys, re
CSS = """/*MOBILE-LAYER*/
@media (max-width:700px) and (orientation:portrait){
 body{overflow:hidden}
 .stageWrap{display:block;position:relative;overflow:hidden}
 .stage{position:absolute;top:0;right:0;bottom:0;width:calc(100% * 2.15);max-width:none;aspect-ratio:auto;background:transparent;border:0;border-radius:0}
 .slide{left:auto;right:0;width:calc(100% / 2.15);padding:3.2cqw 3cqw 6cqw;overflow-y:auto;box-sizing:border-box;background:var(--stage);border:1px solid var(--line);border-radius:14px;-webkit-overflow-scrolling:touch}
 .row{flex-direction:column;align-items:stretch;flex:none}
 .vis{flex:none;width:100%}
 .vis svg{width:100%;max-height:80cqw}
 .slide table{width:100%;table-layout:fixed}
 .slide table th,.slide table td{width:auto!important;padding:.8cqw 1cqw!important;white-space:normal}
 .slide table td:last-child,.slide table th:last-child{width:38%!important}
 .slide table th{font-size:2cqw!important}
 .slide table td{font-size:1.8cqw!important}
 .slide table td:last-child,.slide table td:last-child *{white-space:nowrap!important;font-size:1.55cqw!important}
 .slide table td:first-child,.slide table th:first-child{width:22%!important}
 .grid2{grid-template-columns:1fr}
 .hint{font-size:11px}
 .nav button{font-size:17px;padding:10px 22px}
}
"""
JS = """<script>/*MOBILE-LAYER*/(function(){let x0=null,y0=0;const st=document.getElementById('stage');
st.addEventListener('touchstart',e=>{x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
st.addEventListener('touchend',e=>{if(x0===null)return;const dx=e.changedTouches[0].clientX-x0,dy=e.changedTouches[0].clientY-y0;x0=null;
 if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.3){e.preventDefault();(dx<0?document.getElementById('next'):document.getElementById('prev')).click();}},{passive:false});
st.addEventListener('click',e=>{if(window.__sw){e.stopPropagation();}},true);})();</script>"""
for f in sys.argv[1:]:
    s = open(f, encoding='utf-8').read()
    if '/*MOBILE-LAYER*/' in s: print('skip', f); continue
    i = s.index('</style>', s.index('/* Layout:'))
    s = s[:i] + CSS + s[i:]
    s = s.replace('</script>', '</script>' + JS, 1) if False else s.rstrip()
    s = s + '\n' + JS + '\n'
    open(f, 'w', encoding='utf-8').write(s); print('ok', f)
