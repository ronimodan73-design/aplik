#!/usr/bin/env python3
"""בונה פרק לקובץ HTML אחד שעובד בלי אינטרנט.  שימוש: python3 build.py episodes/<שם>"""
import json,sys,os
H=os.path.dirname(os.path.abspath(__file__)); ep=os.path.join(H,sys.argv[1]); out=sys.argv[2] if len(sys.argv)>2 else H
m=json.load(open(os.path.join(ep,'meta.json'),encoding='utf8')); r=lambda p:open(p,encoding='utf8').read()
s=r(os.path.join(H,'template.html'))
for k,v in {'CSS':r(os.path.join(H,'engine.css')),'ENGINE':r(os.path.join(H,'engine.js')),'EPISODE':r(os.path.join(ep,'episode.js')),
  'TEACHER':r(os.path.join(ep,'teacher.html')),'TITLE_HTML':m['title_html'],'TITLE':m['title'],'SUB':m['sub'],'CREDIT':m['credit']}.items():
  s=s.replace('{{'+k+'}}',v)
f=os.path.join(out,m['file']+'.html'); open(f,'w',encoding='utf8').write(s); print(f)
