"""Roni's app factory.
Usage:  python3 apps/factory/build.py apps/content/<id>.js
The content file starts with a META comment (JSON) and defines APP, LEVELS, TEST, WARM, RECAP
(and optionally QDIA). The factory adds everything else: menu, levels, graded test, report,
offline/home-screen install, accessibility and the credit "ערכה: רוני מודן · שחקים".
Output: apps/<id>.html, apps/<id>.webmanifest, apps/icon-<id>-{180,192,512}.png
"""
import json, re, sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
APPS = os.path.dirname(HERE)
src = open(sys.argv[1], encoding='utf-8').read()
meta = json.loads(re.search(r'/\*META(.*?)\*/', src, re.S).group(1))
id_ = meta['id']
shell = open(os.path.join(HERE, 'shell.html'), encoding='utf-8').read()
fonts = open(os.path.join(HERE, 'fonts.css'), encoding='utf-8').read()
out = (shell.replace('/*FONTS*/', fonts, 1).replace('/*CONTENT*/', src, 1)
       .replace('/*TITLE*/', meta['title']).replace('/*SHORT*/', meta['short'])
       .replace('/*TOPIC*/', meta['topic']).replace('/*ID*/', id_)
       .replace('/*AIURL*/', json.load(open(os.path.join(HERE, 'config.json'), encoding='utf-8')).get('ai_url', '')))
open(os.path.join(APPS, id_ + '.html'), 'w', encoding='utf-8').write(out)
json.dump({"name": meta['topic'], "short_name": meta['short'], "lang": "he", "dir": "rtl",
           "start_url": id_ + ".html", "scope": "./", "display": "standalone",
           "background_color": "#0f1b2d", "theme_color": "#0f1b2d",
           "icons": [{"src": f"icon-{id_}-192.png", "sizes": "192x192", "type": "image/png"},
                     {"src": f"icon-{id_}-512.png", "sizes": "512x512", "type": "image/png"}]},
          open(os.path.join(APPS, id_ + '.webmanifest'), 'w', encoding='utf-8'), ensure_ascii=False)
# icon: the topic glyph on the app background
try:
    from PIL import Image, ImageDraw, ImageFont
    font = None
    for fp in ['/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', '/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf']:
        if os.path.exists(fp): font = fp
    for n in (512, 192, 180):
        S = n * 4; im = Image.new('RGB', (S, S), '#0f1b2d'); d = ImageDraw.Draw(im)
        g = meta.get('glyph', '?'); size = int(S * (0.42 if len(g) <= 2 else 0.6 / max(1, len(g)) * 2.2))
        ft = ImageFont.truetype(font, size) if font else ImageFont.load_default()
        box = d.textbbox((0, 0), g, font=ft); w, h = box[2] - box[0], box[3] - box[1]
        d.text(((S - w) / 2 - box[0], (S - h) / 2 - box[1] - S * .03), g, font=ft, fill=meta.get('color', '#ffb020'))
        d.rounded_rectangle([int(S * .25), int(S * .78), int(S * .75), int(S * .82)], S // 60, fill='#4fd18b')
        im.resize((n, n), Image.LANCZOS).save(os.path.join(APPS, f'icon-{id_}-{n}.png'))
except Exception as e:
    print('icon skipped:', e)
print('built', id_, len(out))
