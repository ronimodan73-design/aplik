"""בדיקת מעבדה: python3 labs/factory/verify_lab.py <id> <תיקיית צילומים>
טוען בלי אינטרנט במחשב ובטלפון, לוחץ על כל כפתור בכותרת, גורר כל עיגול שאפשר לגרור,
ובודק: אין שגיאות, אין גלילה לרוחב בטלפון, וכל ביטוי מתמטי נקרא משמאל לימין."""
import sys, os
from playwright.sync_api import sync_playwright
id_, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
url = 'file://' + os.path.abspath(f'labs/{id_}_lab.html')
BIDI = '''()=>{const o=[];document.querySelectorAll('.m').forEach(b=>{const w=document.createTreeWalker(b,NodeFilter.SHOW_TEXT);let n=[];while(w.nextNode())if(w.currentNode.length)n.push(w.currentNode);if(!n.length)return;const r=document.createRange(),f=n[0],l=n[n.length-1];r.setStart(f,0);r.setEnd(f,1);const a=r.getBoundingClientRect();r.setStart(l,l.length-1);r.setEnd(l,l.length);const z=r.getBoundingClientRect();if(Math.abs(a.top-z.top)<5&&a.left>z.left+1)o.push(b.textContent)});return o}'''
bad = []
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1280, 'height': 800}); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e))); pg.route('http*://**', lambda r: r.abort())
    pg.goto(url); pg.wait_for_timeout(400); pg.screenshot(path=f'{out}/0_start.png')
    for k, h in enumerate(pg.locator('#sv [id][style*="grab"]').all()):
        bx = h.bounding_box()
        if not bx: continue
        pg.mouse.move(bx['x'] + bx['width'] / 2, bx['y'] + bx['height'] / 2); pg.mouse.down()
        pg.mouse.move(bx['x'] + 60, bx['y'] + 40, steps=6); pg.mouse.up(); pg.wait_for_timeout(200)
    ids = pg.eval_on_selector_all('#tools button', 'bs=>bs.map(b=>b.id)')
    for i, bid in enumerate(ids):
        pg.click('#' + bid); pg.wait_for_timeout(3600); pg.screenshot(path=f'{out}/{i+1}_{bid}.png')
        bad += pg.evaluate(BIDI)
    pg.click('#bHide') if pg.locator('#bHide').is_visible() else None
    pg.wait_for_timeout(300); pg.screenshot(path=f'{out}/9_hide.png')
    m = b.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=2); m.route('http*://**', lambda r: r.abort())
    m.goto(url); m.wait_for_timeout(400); m.screenshot(path=f'{out}/phone.png', full_page=True)
    sw = m.evaluate('document.documentElement.scrollWidth')
    print('buttons:', ids); print('errors:', errs); print('phone width:', sw, 'OK' if sw <= 392 else 'TOO WIDE'); print('reversed math:', bad)
    b.close()
