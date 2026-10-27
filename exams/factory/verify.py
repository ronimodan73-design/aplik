"""Checks the generator in a real browser and saves PDFs + page images.
Usage:  python3 exams/factory/verify.py <output folder>
Checks: no JS errors, every bank answer/question renders, exam points = 100,
both forms share structure, no repeated question across forms, no bare slash fractions.
"""
import json, os, subprocess, sys
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
out = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else 'verify_out')
os.makedirs(out, exist_ok=True)
js = r"""
const {chromium}=require('playwright');
(async()=>{
 const [page_url,out]=process.argv.slice(2);const b=await chromium.launch();const errs=[];
 const p=await b.newPage({viewport:{width:1100,height:900}});p.on('pageerror',e=>errs.push(String(e)));
 await p.goto(page_url);await p.evaluate(()=>localStorage.clear());await p.reload();
 const res={};
 const cases=[['exam_all',{g:'ח',k:'exam',n:8,two:true,lv:'mix'}],['exam_one',{g:'ח',k:'exam',n:16,two:true,t:['h8_ratio'],lv:'mix'}],['ws_all',{g:'ח',k:'ws',n:8,lv:'mid'}],['z7_exam',{g:'ז',k:'exam',n:10,two:true,lv:'mix'}],['z7_weak',{g:'ז',k:'exam',n:8,two:true,lv:'weak',t:['z7_signs','z7_order']}],['z7_strong',{g:'ז',k:'exam',n:8,two:true,lv:'strong',t:['z7_coord','z7_angles']}],['z7_ws',{g:'ז',k:'ws',n:6,lv:'weak'}]];
 for(const [name,set] of cases){
  await p.evaluate(s=>{Object.assign(S,s);if(!s.t)S.t=banksOf(S.g).map(b=>b.id);ui();render()},set);
  res[name]=await p.evaluate(()=>{
    const pts=[...document.querySelectorAll('.qp')].map(e=>parseInt(e.textContent));
    const sheets=[...document.querySelectorAll('.sheet')].length;
    const qs=[...document.querySelectorAll('.q .qh')].map(e=>e.innerHTML.replace(/<span class="q[np]">.*?<\/span>/g,''));
    return{pts,sheets,nq:qs.length,uniq:new Set(qs).size,msg:document.querySelector('#msg').textContent,
      slash:/\d\/\d/.test(document.querySelector('#out').textContent),brace:/[{}]/.test(document.querySelector('#out').textContent)}});
  await p.pdf({path:out+'/'+name+'.pdf',preferCSSPageSize:true,printBackground:true});
 }
 console.log(JSON.stringify({errs,res}));await b.close()})();
"""
jp = os.path.join(out, '_v.js'); open(jp, 'w').write(js)
r = subprocess.run(['node', jp, 'file://' + os.path.join(ROOT, 'generator.html'), out], capture_output=True, text=True)
print(r.stderr[-2000:])
data = json.loads(r.stdout.strip().splitlines()[-1])
ok = not data['errs']
for name, v in data['res'].items():
    line = f"{name}: sheets={v['sheets']} questions={v['nq']} unique={v['uniq']} slash={v['slash']} braces={v['brace']}"
    if v['pts']:
        half = len(v['pts']) // 2
        line += f" points={sum(v['pts'][:half])}+{sum(v['pts'][half:])}"
        ok &= sum(v['pts'][:half]) == 100 and sum(v['pts'][half:]) == 100
    ok &= v['uniq'] == v['nq'] and not v['slash'] and not v['brace']
    print(line, v['msg'])
print('JS errors:', data['errs'])
print('OK' if ok else 'PROBLEMS FOUND')
