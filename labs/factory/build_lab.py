"""מפעל המעבדות של רוני: כלי לוח שהמורה שולט/ת בהם.
שימוש:  python3 labs/factory/build_lab.py labs/content/<id>.js
קובץ התוכן מתחיל בהערת META (JSON עם id, title, icon) ומגדיר LAB ופונקציה start().
המפעל מוסיף: כותרת, כפתורי מסך מלא, הדפסה והסתר תוצאות, עזרי גרירה ואנימציה,
צבעים קבועים, ביטויים מתמטיים משמאל לימין, וקרדיט "ערכה: רוני מודן · שחקים".
פלט: labs/<id>_lab.html
"""
import json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__)); LABS = os.path.dirname(HERE)
src = open(sys.argv[1], encoding='utf-8').read()
meta = json.loads(re.search(r'/\*META(.*?)\*/', src, re.S).group(1))
shell = open(os.path.join(HERE, 'lab_shell.html'), encoding='utf-8').read()
out = shell.replace('/*CONTENT*/', src, 1).replace('/*TITLE*/', meta['title']).replace('/*ICON*/', meta.get('icon', '📐'))
path = os.path.join(LABS, meta['id'] + '_lab.html')
open(path, 'w', encoding='utf-8').write(out)
print('built', path, len(out))
