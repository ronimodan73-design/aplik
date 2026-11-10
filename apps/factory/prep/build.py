# Builds exam-prep apps: python3 build.py  (run from this folder)
# engine.html = shared engine; <slug>.js = content (D.summary, D.tips, D.flash, R questions, D.svg, D.know)
import os
APPS=[('yachas','prep_ratio','יחס','יחס'),('pilug','prep_pilug','חוק הפילוג','פילוג'),('achuzim','prep_percent','אחוזים','אחוזים'),('maagal','prep_circle','מעגל ועיגול','מעגל'),('zaviot','prep_angles','זוויות מתאימות ומתחלפות','זוויות')]
e=open('engine.html').read()
for src,slug,full,short in APPS:
  d=open(src+'.js').read()+"\nD.Q=R.map(function(r){return {t:r[0],l:r[1],q:r[2],o:r[3],e:r[4],d:r[5]};});\nif(!D.svg)D.svg={};\n"
  h=e.replace('/*DATA*/',d).replace('/*TITLE*/',full+' – הכנה למבחן')
  head=f'<link rel="manifest" href="{slug}.webmanifest">\n<link rel="apple-touch-icon" href="icon-{slug}-180.png">\n<meta name="apple-mobile-web-app-capable" content="yes">\n<meta name="apple-mobile-web-app-title" content="{short}">\n<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">\n<meta name="theme-color" content="#1e1b4b">\n'
  h=h.replace('<style>',head+'<style>',1).replace('<div class="foot">ערכה: רוני מודן</div>','<div class="foot">ערכה: רוני מודן · שחקים</div>').replace('home();\n</script>',"home();\nif('serviceWorker' in navigator){navigator.serviceWorker.register('../sw.js',{scope:'../'}).catch(()=>{});}\n</script>")
  open(os.path.join('..','..',slug+'.html'),'w').write(h)
print('built',len(APPS))
