# Inline the Rubik/Heebo fonts so the app works with no internet.
import sys,base64,os
FD=os.environ.get('FONTS','/tmp/claude-0/-home-claude/ca6028b6-cd78-5f55-815e-769f2353631b/scratchpad/fonts')
src,out=sys.argv[1],sys.argv[2]
ff=''
for fam,pk in [('Rubik','rubik'),('Heebo','heebo')]:
  for sub,rng in [('hebrew','U+0307-0308,U+0590-05FF,U+200C-2010,U+20AA,U+25CC,U+FB1D-FB4F'),('latin','U+0000-00FF,U+2000-206F,U+2190-2193,U+2212,U+2215,U+20AC,U+2122,U+FEFF,U+FFFD')]:
    b=base64.b64encode(open(f'{FD}/fontsource-variable-{pk}-5.3.0/files/{pk}-{sub}-wght-normal.woff2','rb').read()).decode()
    ff+=f"@font-face{{font-family:'{fam}';font-weight:300 900;font-display:block;src:url(data:font/woff2;base64,{b}) format('woff2');unicode-range:{rng}}}\n"
open(out,'w',encoding='utf-8').write(open(src,encoding='utf-8').read().replace('/*FONTS*/',ff,1))
print('ok',os.path.getsize(out))
