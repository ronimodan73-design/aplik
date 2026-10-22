#!/usr/bin/env python3
"""מקליט פרק בנוי ל-MP4 אנכי עם פסקול, פריים אחר פריים (סנכרון מושלם).
שימוש: python3 record.py <file.html> <out.mp4> [fps]"""
import asyncio,sys,os,base64,tempfile,subprocess
from playwright.async_api import async_playwright
src,out=os.path.abspath(sys.argv[1]),os.path.abspath(sys.argv[2]); FPS=int(sys.argv[3]) if len(sys.argv)>3 else 25
tmp=tempfile.mkdtemp()
async def main():
  async with async_playwright() as p:
    b=await p.chromium.launch(); pg=await b.new_page(viewport={'width':540,'height':960},device_scale_factor=2)
    await pg.goto('file://'+src+'?rec=1&frames=1'); await pg.wait_for_timeout(500)
    ff=subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','image2pipe','-framerate',str(FPS),'-i','-','-vf','scale=1080:1920','-c:v','libx264','-pix_fmt','yuv420p','-crf','20',tmp+'/v.mp4'],stdin=subprocess.PIPE)
    done=False; n=0
    while not done:
      done=await pg.evaluate(f'V.step({1/FPS})')
      ff.stdin.write(await pg.screenshot(type='jpeg',quality=90)); n+=1
    for _ in range(FPS):  # שנייה אחרונה קפואה
      await pg.evaluate(f'V.step({1/FPS})'); ff.stdin.write(await pg.screenshot(type='jpeg',quality=90))
    ff.stdin.close(); ff.wait()
    dur=n/FPS+1.2; wav=await pg.evaluate(f'V.renderAudio({dur})')
    open(tmp+'/a.wav','wb').write(base64.b64decode(wav)); await b.close()
asyncio.run(main())
subprocess.run(['ffmpeg','-y','-loglevel','error','-i',tmp+'/v.mp4','-i',tmp+'/a.wav','-c:v','copy','-af','loudnorm=I=-16:TP=-1.5','-c:a','aac','-b:a','128k','-shortest','-movflags','+faststart',out],check=True)
print(out)
