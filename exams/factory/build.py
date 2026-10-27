"""Roni's exam & worksheet generator.
Usage:  python3 exams/factory/build.py
Reads every bank file in exams/bank/*.js and builds one self-contained page:
exams/generator.html (fonts, logo and all question banks inside, works offline).
"""
import base64, glob, os
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
shell = open(os.path.join(HERE, 'shell.html'), encoding='utf-8').read()
fonts = open(os.path.join(HERE, 'fonts.css'), encoding='utf-8').read()
logo = 'data:image/png;base64,' + base64.b64encode(open(os.path.join(HERE, 'logo_s.png'), 'rb').read()).decode()
banks = sorted(glob.glob(os.path.join(ROOT, 'bank', '*.js')))
src = '\n'.join(open(p, encoding='utf-8').read() for p in banks)
diagrams = open(os.path.join(HERE, 'diagrams.js'), encoding='utf-8').read()
out = shell.replace('/*FONTS*/', fonts, 1).replace('/*DIAGRAMS*/', diagrams, 1).replace('/*BANKS*/', src, 1).replace('/*LOGO*/', logo)
open(os.path.join(ROOT, 'generator.html'), 'w', encoding='utf-8').write(out)
print('built exams/generator.html with', len(banks), 'banks:', ', '.join(os.path.basename(p) for p in banks))
