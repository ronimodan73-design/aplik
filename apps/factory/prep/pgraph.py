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
