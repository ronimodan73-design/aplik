import sys,base64,re,os
FD='/tmp/claude-0/-home-claude/ca6028b6-cd78-5f55-815e-769f2353631b/scratchpad/fonts'
src=open('t9_gcf.html',encoding='utf-8').read()
content=open(sys.argv[1],encoding='utf-8').read()
title=re.search(r'// TITLE: (.*)',content).group(1); bar=re.search(r'// BAR: (.*)',content).group(1)
head,rest=src.split('/* ===== CONTENT ===== */',1)
engine=rest[rest.index('/* ===== ENGINE ===== */'):]
head=re.sub(r'<title>.*?</title>',f'<title>{title}</title>',head)
head=re.sub(r'<span class="t">.*?</span>',f'<span class="t">{bar}</span>',head,count=1)
ff=''
for fam,pk,fn in [('Rubik','rubik','rubik'),('Heebo','heebo','heebo')]:
  for sub,rng in [('hebrew','U+0307-0308,U+0590-05FF,U+200C-2010,U+20AA,U+25CC,U+FB1D-FB4F'),('latin','U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD')]:
    b=base64.b64encode(open(f"{FD}/fontsource-variable-{pk}-5.3.0/files/{fn}-{sub}-wght-normal.woff2","rb").read()).decode()
    ff+=f"@font-face{{font-family:'{fam}';font-weight:300 900;font-display:block;src:url(data:font/woff2;base64,{b}) format('woff2');unicode-range:{rng}}}\n"
head=re.sub(r'<link rel="preconnect"[^>]*>\s*<link rel="stylesheet"[^>]*>','',head)
head=head.replace('<style>','<style>\n'+ff,1)
head=head.replace('<b>ערכה: רוני מודן</b>','<b>ערכה: רוני מודן · שחקים</b>')
head=head.replace('<button id="cp" type="button">העתקת קישור</button>','')
engine=re.sub(r"document.getElementById\('cp'\).onclick=.*\n",'',engine)
out='<!doctype html>\n<html lang="he" dir="rtl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">\n'+head+'/* ===== CONTENT ===== */\n'+content+'\n'+engine
open(sys.argv[2],'w',encoding='utf-8').write(out);print(len(out))
