"""Factory check gate: python3 apps/factory/verify.py <id> <out_dir>
Stress-tests every question generator, then clicks through the app at phone size and saves
screenshots: menu, every explanation card, a wrong answer + "הראו לי" per level, a full graded
test (with 3 deliberate mistakes) and the report. Prints problems and console errors."""
import asyncio, sys, os
from playwright.async_api import async_playwright
ID, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)
URL = 'file://' + os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ID + '.html')
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(); pg = await b.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=2)
        errs = []; pg.on('pageerror', lambda e: errs.append(str(e))); pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
        await pg.goto(URL); await pg.wait_for_timeout(400)
        await pg.screenshot(path=f'{OUT}/00_menu.png', full_page=True)
        bad = await pg.evaluate('''()=>{const bad=[];const gens=[...TEST.flat(),...WARM,...LEVELS.map(l=>l.g).filter(Boolean),...LEVELS.flatMap(l=>(l.ladder||[]).map(e=>e.g))];
          gens.forEach((g,gi)=>{for(let i=0;i<300;i++){let q;try{q=g();}catch(e){bad.push('gen'+gi+' throws '+e.message);break;}
            if(q.ans)q.ans.forEach(a=>{if(!Number.isFinite(a.val)||(!a.neg&&a.val<=0)||(!a.dec&&!Number.isInteger(a.val)))bad.push(q.kind+' ans '+a.val)});
            if(q.choice&&(q.correct==null||q.correct<0||q.correct>=q.choice.length))bad.push(q.kind+' bad correct');
            if(q.choice&&new Set(q.choice).size!==q.choice.length)bad.push(q.kind+' duplicate choices');
            if(!q.rule||!q.lines)bad.push(q.kind+' missing rule/lines');
            if(q.ask&&(q.ask.correct==null||q.ask.correct<0||new Set(q.ask.choice).size!==q.ask.choice.length))bad.push(q.kind+' bad ask');
            (q.steps||[]).forEach((st,k)=>{if(st.ans)st.ans.forEach(a=>{if(!Number.isFinite(a.val)||(!a.neg&&a.val<=0)||(!a.dec&&!Number.isInteger(a.val)))bad.push(q.kind+' step'+k+' ans '+a.val)});
              if(st.choice&&(st.correct==null||st.correct<0||st.correct>=st.choice.length||new Set(st.choice).size!==st.choice.length))bad.push(q.kind+' step'+k+' bad choice');
              if(!st.rule||!st.lines||!st.text)bad.push(q.kind+' step'+k+' missing parts');});
            if(q.check&&!q.check())bad.push(q.kind+' self-check failed');}});return [...new Set(bad)].slice(0,15)}''')
        print('generator problems:', bad)
        n = await pg.evaluate('RECAP.length')
        await pg.click('#go-recap')
        async def answer(right):
            q = await pg.evaluate('({c:curQ().choice?curQ().correct:null,n:curQ().choice?curQ().choice.length:0,v:curQ().ans?curQ().ans.map(a=>a.val):null})')
            if q['v']:
                for j, v in enumerate(q['v']): await pg.locator('input').nth(j).fill(str(v if right else v + 1))
            if q['c'] is not None: await pg.click(f'[data-c="{q["c"] if right else (q["c"]+1)%q["n"]}"]')
            await pg.click('#chk'); await pg.wait_for_timeout(150)
        chk_info = []
        for i in range(n):
            await pg.wait_for_timeout(5200); await pg.screenshot(path=f'{OUT}/r{i}.png', full_page=True); await pg.click('#nx'); await pg.wait_for_timeout(200)
            if await pg.evaluate("S.mode!=='chk'"): chk_info.append(f'card{i}:NO-CHECK'); continue
            first = True
            while await pg.evaluate("S.mode==='chk'&&!!S.q&&S.i<S.n&&!!document.querySelector('#chk')"):
                if first and i == 0:   # deliberate mistake on the first card: feedback + stabilization question
                    await answer(False); await pg.screenshot(path=f'{OUT}/c0_wrong.png', full_page=True)
                    await answer(True); first = False
                else:
                    await answer(True)
                    while await pg.evaluate('S.stepNext'): await pg.click('#chk'); await pg.wait_for_timeout(100); await answer(True)
                await pg.click('#chk'); await pg.wait_for_timeout(150)
            chk_info.append(f'card{i}:{await pg.inner_text(".big")}')
            if i == 0: await pg.screenshot(path=f'{OUT}/c0_end.png', full_page=True)
            await pg.click('#cn'); await pg.wait_for_timeout(200)
        print('understanding checks:', chk_info)
        print('after explanations →', await pg.evaluate('S.mode'))
        for L in range(4):
            await pg.evaluate(f"start({L})"); await pg.wait_for_timeout(200)
            if await pg.locator('.askbox').count():
                await pg.screenshot(path=f'{OUT}/L{L+1}_ask.png', full_page=True); await pg.click('#show'); await pg.wait_for_timeout(200)
            for j in range(await pg.locator('input').count()): await pg.locator('input').nth(j).fill('1')
            if await pg.locator('[data-c]').count():
                c = await pg.evaluate('curQ().correct'); k = await pg.locator('[data-c]').count(); await pg.click(f'[data-c="{(c+1)%k}"]')
            await pg.click('#chk'); await pg.wait_for_timeout(250); await pg.click('#show'); await pg.wait_for_timeout(4500)
            await pg.screenshot(path=f'{OUT}/L{L+1}.png', full_page=True)
        await pg.click('#home'); await pg.click('#go-test'); await pg.fill('#nm', 'בדיקה'); await pg.click('#go')
        for i in range(16):
            await pg.wait_for_timeout(120); right = i not in (5, 9, 13)
            q = await pg.evaluate('({c:S.q.choice?S.q.correct:null,n:S.q.choice?S.q.choice.length:0,v:S.q.ans?S.q.ans.map(a=>a.val):null})')
            if q['v']:
                for j, v in enumerate(q['v']): await pg.locator('input').nth(j).fill(str(v if right else v + 1))
            if q['c'] is not None: await pg.click(f'[data-c="{q["c"] if right or q["v"] else (q["c"]+1)%q["n"]}"]')
            await pg.click('#chk'); await pg.wait_for_timeout(100); await pg.click('#chk')
        await pg.wait_for_timeout(500); await pg.screenshot(path=f'{OUT}/report.png', full_page=True)
        print('report text has grade:', 'ציון' in await pg.inner_text('#view'))
        print('errors:', errs); await b.close()
asyncio.run(main())
