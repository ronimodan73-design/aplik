# Parabola sketch SVGs for prep apps (reusable).  pg(a,b,c, shade=False, w=240, h=180, vlabel=True)
# shade=True: green where f>0 (above x-axis), red where f<0 (below). Roots + vertex labelled. LTR-safe.
import math

def _fmt(v):
    v = round(v, 2)
    return str(int(v)) if v == int(v) else str(v)

def pg(a, b, c, shade=False, w=240, h=180, vlabel=True, ylabel=False):
    f = lambda x: a*x*x + b*x + c
    xv = -b/(2*a); yv = f(xv)
    d = b*b - 4*a*c
    roots = []
    if d > 1e-9:
        r = math.sqrt(d); roots = sorted([(-b-r)/(2*a), (-b+r)/(2*a)])
    elif abs(d) <= 1e-9:
        roots = [xv]
    half = max([abs(r-xv) for r in roots] + [1.6]) + 1.4
    x0, x1 = xv-half, xv+half
    x0 = min(x0, -0.8); x1 = max(x1, 0.8)
    xs = [x0 + (x1-x0)*i/120 for i in range(121)]
    ys = [f(x) for x in xs]
    yl = min(min(ys), 0); yh = max(max(ys), 0)
    span = yh - yl or 1
    yl -= span*.08; yh += span*.12
    if a > 0: yh = min(yh, max(yv, 0) + max(abs(yv), 2)*2.2 + 1)
    else:     yl = max(yl, min(yv, 0) - max(abs(yv), 2)*2.2 - 1)
    pad = 14
    X = lambda x: pad + (x-x0)/(x1-x0)*(w-2*pad)
    Y = lambda y: pad + (yh-y)/(yh-yl)*(h-2*pad)
    clip = lambda y: max(yl, min(yh, y))
    o = [f'<svg viewBox="0 0 {w} {h}" width="{w}" direction="ltr" style="direction:ltr">']
    o.append(f'<rect x="0" y="0" width="{w}" height="{h}" rx="10" fill="#fff"/>')
    if shade:
        for sgn, col in ((1, '#22c55e'), (-1, '#ef4444')):
            pts = [(X(x), Y(clip(max(0, f(x)) if sgn > 0 else min(0, f(x))))) for x in xs]
            poly = ' '.join('%.1f,%.1f' % p for p in pts) + ' %.1f,%.1f %.1f,%.1f' % (X(x1), Y(0), X(x0), Y(0))
            o.append(f'<polygon points="{poly}" fill="{col}" fill-opacity=".38" stroke="none"/>')
    o.append(f'<line x1="4" y1="{Y(0):.1f}" x2="{w-4}" y2="{Y(0):.1f}" stroke="#111" stroke-width="1.6"/>')
    o.append(f'<text x="{w-12}" y="{Y(0)-5:.1f}" font-size="12" font-style="italic">x</text>')
    if x0 < 0 < x1:
        o.append(f'<line x1="{X(0):.1f}" y1="4" x2="{X(0):.1f}" y2="{h-4}" stroke="#111" stroke-width="1.6"/>')
        o.append(f'<text x="{X(0)+5:.1f}" y="14" font-size="12" font-style="italic">y</text>')
    seg = []
    for x, y in zip(xs, ys):
        if yl <= y <= yh: seg.append('%.1f,%.1f' % (X(x), Y(y)))
    o.append(f'<polyline points="{" ".join(seg)}" fill="none" stroke="#6d28d9" stroke-width="3"/>')
    for r in roots:
        o.append(f'<circle cx="{X(r):.1f}" cy="{Y(0):.1f}" r="4.5" fill="#f59e0b" stroke="#111"/>')
        below = a > 0
        ty = Y(0) + 17 if below else Y(0) - 8
        anc, dx = ('middle', 0) if len(roots) == 1 else (('end', -5) if r == roots[0] else ('start', 5))
        o.append(f'<text x="{X(r)+dx:.1f}" y="{ty:.1f}" font-size="13" font-weight="bold" text-anchor="{anc}" fill="#b45309">{_fmt(r)}</text>')
    if vlabel and not (len(roots) == 1):
        o.append(f'<circle cx="{X(xv):.1f}" cy="{Y(yv):.1f}" r="4" fill="#0891b2"/>')
        vy = Y(yv) + (15 if a > 0 else -8)
        vy = min(max(vy, 12), h-4)
        o.append(f'<text x="{X(xv)+6:.1f}" y="{vy:.1f}" font-size="12" fill="#0e7490">({_fmt(xv)}, {_fmt(yv)})</text>')
    o.append('</svg>')
    return ''.join(o)

def pf(f, x0, x1, y0, y1, w=240, h=190, pts=(), mode=None, grid=True):
    """General function sketch. pts: list of (x,label,color) points marked on curve.
    mode='mirror' highlights y-axis as a mirror + horizontal dashed links between paired points;
    mode='rotate' highlights origin + dashed link through origin."""
    pad = 14
    X = lambda x: pad + (x-x0)/(x1-x0)*(w-2*pad)
    Y = lambda y: pad + (y1-y)/(y1-y0)*(h-2*pad)
    o = [f'<svg viewBox="0 0 {w} {h}" width="{w}" direction="ltr" style="direction:ltr"><rect width="{w}" height="{h}" rx="10" fill="#fff"/>']
    if grid:
        for i in range(math.ceil(x0), math.floor(x1)+1):
            o.append(f'<line x1="{X(i):.1f}" y1="{pad}" x2="{X(i):.1f}" y2="{h-pad}" stroke="#eef0f4"/>')
        for j in range(math.ceil(y0), math.floor(y1)+1):
            o.append(f'<line x1="{pad}" y1="{Y(j):.1f}" x2="{w-pad}" y2="{Y(j):.1f}" stroke="#eef0f4"/>')
    o.append(f'<line x1="4" y1="{Y(0):.1f}" x2="{w-4}" y2="{Y(0):.1f}" stroke="#111" stroke-width="1.5"/>')
    if mode == 'mirror':
        o.append(f'<line x1="{X(0):.1f}" y1="4" x2="{X(0):.1f}" y2="{h-4}" stroke="#ec4899" stroke-width="5" stroke-opacity=".45"/>')
    o.append(f'<line x1="{X(0):.1f}" y1="4" x2="{X(0):.1f}" y2="{h-4}" stroke="#111" stroke-width="1.5"/>')
    o.append(f'<text x="{w-12}" y="{Y(0)-5:.1f}" font-size="12" font-style="italic">x</text><text x="{X(0)+5:.1f}" y="14" font-size="12" font-style="italic">y</text>')
    seg, segs = [], []
    for i in range(241):
        x = x0 + (x1-x0)*i/240; y = f(x)
        if y0-0.5 <= y <= y1+0.5: seg.append('%.1f,%.1f' % (X(x), Y(max(y0, min(y1, y)))))
        elif seg: segs.append(seg); seg = []
    if seg: segs.append(seg)
    for s in segs: o.append(f'<polyline points="{" ".join(s)}" fill="none" stroke="#6d28d9" stroke-width="3"/>')
    P = [(x, f(x), lab, col) for x, lab, col in pts]
    if mode and len(P) >= 2:
        for k in range(0, len(P)-1, 2):
            a, b = P[k], P[k+1]
            o.append(f'<line x1="{X(a[0]):.1f}" y1="{Y(a[1]):.1f}" x2="{X(b[0]):.1f}" y2="{Y(b[1]):.1f}" stroke="{a[3]}" stroke-width="2" stroke-dasharray="5 4"/>')
    if mode == 'rotate':
        o.append(f'<circle cx="{X(0):.1f}" cy="{Y(0):.1f}" r="7" fill="none" stroke="#ec4899" stroke-width="3"/>')
    for x, y, lab, col in P:
        o.append(f'<circle cx="{X(x):.1f}" cy="{Y(y):.1f}" r="5" fill="{col}" stroke="#111"/>')
        if lab:
            anc = 'end' if x < 0 else 'start'; dx = -7 if x < 0 else 7
            o.append(f'<text x="{X(x)+dx:.1f}" y="{Y(y)+4:.1f}" font-size="12" font-weight="bold" text-anchor="{anc}" fill="{col}">{lab}</text>')
    o.append('</svg>')
    return ''.join(o)

class Cv:
    """Animated canvas. Uses engine CSS classes: dp (drop-in), ap (fade-in), dr (draw line), pu (pulse)."""
    def __init__(s, x0, x1, y0, y1, w=300, h=230, ticks=True):
        s.x0, s.x1, s.y0, s.y1, s.w, s.h, s.p = x0, x1, y0, y1, w, h, 16
        s.o = [f'<svg viewBox="0 0 {w} {h}" width="{w}" direction="ltr" style="direction:ltr;overflow:visible"><rect width="{w}" height="{h}" rx="10" fill="#fff"/>']
        for i in range(math.ceil(x0), math.floor(x1)+1):
            s.o.append(f'<line x1="{s.X(i):.1f}" y1="{s.p}" x2="{s.X(i):.1f}" y2="{h-s.p}" stroke="#eef0f4"/>')
        for j in range(math.ceil(y0), math.floor(y1)+1):
            s.o.append(f'<line x1="{s.p}" y1="{s.Y(j):.1f}" x2="{w-s.p}" y2="{s.Y(j):.1f}" stroke="#eef0f4"/>')
        s.o.append(f'<line x1="4" y1="{s.Y(0):.1f}" x2="{w-4}" y2="{s.Y(0):.1f}" stroke="#111" stroke-width="1.5"/><line x1="{s.X(0):.1f}" y1="4" x2="{s.X(0):.1f}" y2="{h-4}" stroke="#111" stroke-width="1.5"/>')
        s.o.append(f'<text x="{w-12}" y="{s.Y(0)-5:.1f}" font-size="12" font-style="italic">x</text><text x="{s.X(0)+5:.1f}" y="13" font-size="12" font-style="italic">y</text>')
        if ticks:
            for i in range(math.ceil(x0), math.floor(x1)+1):
                if i: s.o.append(f'<text x="{s.X(i):.1f}" y="{s.Y(0)+13:.1f}" font-size="9" fill="#9ca3af" text-anchor="middle">{i}</text>')
    def X(s, x): return s.p + (x-s.x0)/(s.x1-s.x0)*(s.w-2*s.p)
    def Y(s, y): return s.p + (s.y1-y)/(s.y1-s.y0)*(s.h-2*s.p)
    def pt(s, x, y, col, d, lab=None, side=1, pulse=False):
        lx = s.X(x) + 8*side; anc = 'start' if side > 0 else 'end'
        t = f'<text x="{lx:.1f}" y="{s.Y(y)-6:.1f}" font-size="12" font-weight="bold" fill="{col}" text-anchor="{anc}">{lab}</text>' if lab else ''
        c = f'<circle cx="{s.X(x):.1f}" cy="{s.Y(y):.1f}" r="5.5" fill="{col}" stroke="#111"' + (f' class="pu" style="animation-delay:{d+.8}s"' if pulse else '') + '/>'
        s.o.append(f'<g class="dp" style="animation-delay:{d}s">{c}{t}</g>')
    def curve(s, f, d, dur=2.2, col='#6d28d9'):
        pts = []
        for i in range(201):
            x = s.x0 + (s.x1-s.x0)*i/200; y = f(x)
            if s.y0 - .3 <= y <= s.y1 + .3: pts.append('%.1f,%.1f' % (s.X(x), s.Y(max(s.y0, min(s.y1, y)))))
        s.o.append(f'<polyline pathLength="1" class="dr" points="{" ".join(pts)}" fill="none" stroke="{col}" stroke-width="3.5" style="animation-delay:{d}s;animation-duration:{dur}s"/>')
    def shade(s, f, d):
        xs = [s.x0 + (s.x1-s.x0)*i/160 for i in range(161)]
        for sg, col in ((1, '#22c55e'), (-1, '#ef4444')):
            pts = ['%.1f,%.1f' % (s.X(x), s.Y(max(s.y0, min(s.y1, max(0, f(x)) if sg > 0 else min(0, f(x)))))) for x in xs]
            s.o.append(f'<polygon class="ap" style="animation-delay:{d}s" points="{" ".join(pts)} {s.X(s.x1):.1f},{s.Y(0):.1f} {s.X(s.x0):.1f},{s.Y(0):.1f}" fill="{col}" fill-opacity=".38"/>')
    def xaxis_hl(s, d):
        s.o.append(f'<line class="ap" style="animation-delay:{d}s" x1="4" y1="{s.Y(0):.1f}" x2="{s.w-4}" y2="{s.Y(0):.1f}" stroke="#f59e0b" stroke-width="7" stroke-opacity=".55"/>')
    def text(s, x, y, t, col, d, size=13):
        s.o.append(f'<text class="ap" style="animation-delay:{d}s" x="{s.X(x):.1f}" y="{s.Y(y):.1f}" font-size="{size}" font-weight="bold" fill="{col}" text-anchor="middle">{t}</text>')
    def svg(s): return ''.join(s.o) + '</svg>'

def _cv_mv(s, x, y, x2, y2, col, d, lab=None, lab2=None, side=1):
    """point that appears at (x,y) then slides to (x2,y2) with a dashed guide line."""
    dx, dy = s.X(x2)-s.X(x), s.Y(y2)-s.Y(y)
    s.o.append(f'<line class="ap" style="animation-delay:{d}s" x1="{s.X(x):.1f}" y1="{s.Y(y):.1f}" x2="{s.X(x2):.1f}" y2="{s.Y(y2):.1f}" stroke="{col}" stroke-width="2" stroke-dasharray="5 4"/>')
    s.o.append(f'<g class="ap" style="animation-delay:{d}s"><circle class="mv" style="--dx:{dx:.1f}px;--dy:{dy:.1f}px;animation-delay:{d+.4}s" cx="{s.X(x):.1f}" cy="{s.Y(y):.1f}" r="5.5" fill="{col}" stroke="#111"/></g>')
    if lab2:
        anc = 'start' if side > 0 else 'end'
        s.o.append(f'<text class="ap" style="animation-delay:{d+1.5}s" x="{s.X(x2)+8*side:.1f}" y="{s.Y(y2)+4:.1f}" font-size="12" font-weight="bold" fill="{col}" text-anchor="{anc}">{lab2}</text>')
Cv.mv = _cv_mv
