import sys, asyncio, json
from playwright.async_api import async_playwright
async def main(html, pdf, shots):
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width': 1000, 'height': 1200})
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.goto('file://' + html); await pg.wait_for_timeout(1200)
        await pg.emulate_media(media='print')
        await pg.evaluate('document.querySelectorAll(".page").forEach(e=>e.style.zoom=1);window.__fill()')
        rep = await pg.evaluate('''()=>[...document.querySelectorAll('.page')].map((p,i)=>{
          const ws=[...p.querySelectorAll('.w')].map(w=>+w.dataset.n);
          const body=p.querySelector('.body,.ak');
          const qs=[...p.querySelectorAll('.q')].map(q=>{const r=q.getBoundingClientRect(),pr=p.getBoundingClientRect();return r.bottom<=pr.bottom-1});
          const ft=p.querySelector('.ft').getBoundingClientRect(), pr=p.getBoundingClientRect();
          return {i:i+1, lines:ws, overflow:p.scrollHeight>p.clientHeight+1, ftInside:ft.bottom<=pr.bottom+0.5,
                  akOverflow: p.querySelector('.ak')? p.querySelector('.ak').scrollWidth>p.querySelector('.ak').clientWidth+2 : false,
                  gap: Math.round(pr.bottom-ft.bottom), over: Math.round((p.scrollHeight-p.clientHeight)/3.78)}})''')
        await pg.pdf(path=pdf, prefer_css_page_size=True, print_background=True)
        print(json.dumps({'errs': errs, 'pages': rep}, ensure_ascii=False))
        await b.close()
asyncio.run(main(*sys.argv[1:4]))
