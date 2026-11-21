# -*- coding: utf-8 -*-
"""Exact-measure geometry diagrams (SVG, units = mm). Black on white, print-safe."""
import math

INK = '#111'
FS = 3.7          # label font size (mm) ~ 10.5pt
SW = 0.45         # line width (mm)

def rad(a): return a * math.pi / 180
def pt(o, d, r): return (o[0] + r * math.cos(rad(d)), o[1] + r * math.sin(rad(d)))
def ang_of(o, p): return math.degrees(math.atan2(p[1] - o[1], p[0] - o[0])) % 360

class Fig:
    """Math coordinates (y up). Rendered by fitting into box (w,h) mm."""
    def __init__(s): s.items = []; s.pts = []
    def line(s, a, b, w=SW, dash=None):
        s.items.append(('line', a, b, w, dash)); s.pts += [a, b]
    def poly(s, P):
        for i in range(len(P)): s.line(P[i], P[(i + 1) % len(P)])
    def text(s, p, t, size=FS, bold=False):
        s.items.append(('text', p, t, size, bold)); s.pts.append(p)
    def arc(s, o, d1, d2, r, n=1):
        # CCW from d1 to d2 (degrees, math orientation)
        s.items.append(('arc', o, d1 % 360, (d2 - d1) % 360, r, n))
    def angle(s, o, d1, d2, label, r=None, right=False):
        """Mark angle at o from direction d1 CCW to d2 and put label on bisector."""
        span = (d2 - d1) % 360
        if right:
            k = 3.2
            a, b = pt(o, d1, k), pt(o, d2, k)
            c = (a[0] + b[0] - o[0], a[1] + b[1] - o[1])
            s.line(a, c, SW * .8); s.line(c, b, SW * .8)
            return
        r = r or (6.5 if span > 70 else 8 if span > 40 else 10)
        s.arc(o, d1, d2, r)
        if label is not None:
            dist = max(r + 4.2, 4.6 / math.sin(rad(min(span, 179) / 2)))
            s.text(pt(o, d1 + span / 2, dist), label)
    def tick(s, a, b, n=1):
        m = ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
        d = ang_of(a, b) + 90
        for i in range(n):
            off = (i - (n - 1) / 2) * 1.3
            c = pt(m, d - 90, off)
            s.line(pt(c, d, 1.8), pt(c, d + 180, 1.8), SW * .9)
    def dot(s, p, r=0.8):
        s.items.append(('dot', p, r)); s.pts.append(p)

    def svg(s, box_w, box_h, pad=4.5):
        xs = [p[0] for p in s.pts]; ys = [p[1] for p in s.pts]
        x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)
        k = min((box_w - 2 * pad) / max(x1 - x0, 1e-6), (box_h - 2 * pad) / max(y1 - y0, 1e-6))
        k = min(k, 1.0)  # coordinates are already mm: never enlarge beyond 1:1
        W = (x1 - x0) * k + 2 * pad; H = (y1 - y0) * k + 2 * pad
        T = lambda p: ((p[0] - x0) * k + pad, (y1 - p[1]) * k + pad)
        out = []
        for it in s.items:
            if it[0] == 'line':
                a, b = T(it[1]), T(it[2])
                da = f' stroke-dasharray="{it[4]}"' if it[4] else ''
                out.append(f'<line x1="{a[0]:.2f}" y1="{a[1]:.2f}" x2="{b[0]:.2f}" y2="{b[1]:.2f}" stroke="{INK}" stroke-width="{it[3]}" stroke-linecap="round"{da}/>')
            elif it[0] == 'arc':
                _, o, d1, span, r, n = it
                for j in range(n):
                    rr = r + j * 1.1
                    a, b = T(pt(o, d1, rr)), T(pt(o, d1 + span, rr))
                    large = 1 if span > 180 else 0
                    # math CCW == screen sweep-flag 0 (y flipped)
                    out.append(f'<path d="M{a[0]:.2f} {a[1]:.2f} A{rr:.2f} {rr:.2f} 0 {large} 0 {b[0]:.2f} {b[1]:.2f}" fill="none" stroke="{INK}" stroke-width="{SW*.85}"/>')
            elif it[0] == 'text':
                p = T(it[1])
                w = ' font-weight="700"' if it[4] else ''
                out.append(f'<text x="{p[0]:.2f}" y="{p[1] + it[3]*0.36:.2f}" font-size="{it[3]}" text-anchor="middle" direction="ltr"{w}>{it[2]}</text>')
            elif it[0] == 'dot':
                p = T(it[1]); out.append(f'<circle cx="{p[0]:.2f}" cy="{p[1]:.2f}" r="{it[2]}" fill="{INK}"/>')
        return (f'<svg class="dg" direction="ltr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W:.2f} {H:.2f}" '
                f'width="{W:.2f}mm" height="{H:.2f}mm" font-family="Rubik, Heebo, Arial" fill="{INK}">'
                + ''.join(out) + '</svg>')

def deg(v): return f'{v}°'

# ---------- figure builders ----------
def adjacent(a):
    f = Fig(); O = (0, 0); L = 24
    f.line((-L, 0), (L, 0)); f.line(O, pt(O, a, L)); f.dot(O)
    f.angle(O, 0, a, deg(a)); f.angle(O, a, 180, '?')
    return f

def vertical(a, mode):
    f = Fig(); O = (0, 0); L = 22
    f.line(pt(O, 0, L), pt(O, 180, L)); f.line(pt(O, a, L), pt(O, a + 180, L)); f.dot(O)
    f.angle(O, 0, a, deg(a), r=6.5 if mode == 'all' else None)
    f.angle(O, 180, 180 + a, '?', r=6.5 if mode == 'all' else None)
    if mode == 'all':
        f.angle(O, a, 180, '?', r=9.5); f.angle(O, 180 + a, 360, '?', r=9.5)
    return f

def triangle(B_ang, C_ang, base=34):
    """Triangle with base BC horizontal; returns fig and points (A,B,C)."""
    A_ang = 180 - B_ang - C_ang
    B = (0, 0); C = (base, 0)
    AB = base * math.sin(rad(C_ang)) / math.sin(rad(A_ang))
    A = pt(B, B_ang, AB)
    f = Fig(); f.poly([A, B, C])
    return f, A, B, C

def mark_tri(f, A, B, C, labA, labB, labC, rightAt=None):
    for P, Q, R, lab, nm in ((A, B, C, labA, 'A'), (B, C, A, labB, 'B'), (C, A, B, labC, 'C')):
        d1, d2 = ang_of(P, Q), ang_of(P, R)
        if (d2 - d1) % 360 > 180: d1, d2 = d2, d1
        if rightAt == nm: f.angle(P, d1, d2, None, right=True)
        elif lab is not None: f.angle(P, d1, d2, lab)

def right_tri(a):
    # right angle at B (left), acute a at C (right), ? at A (top)
    f, A, B, C = triangle(90, a, base=38)
    mark_tri(f, A, B, C, '?', None, deg(a), rightAt='B')
    return f

def iso(apex, mode):
    b = (180 - apex) / 2
    f, A, B, C = triangle(b, b, base=30 if apex < 60 else 36)
    f.tick(A, B); f.tick(A, C)
    if mode == 'apex': mark_tri(f, A, B, C, deg(apex), '?', '?')
    else: mark_tri(f, A, B, C, '?', deg(int(b)), '?')
    return f

def equi(mode):
    f, A, B, C = triangle(60, 60, base=28)
    for P, Q in ((A, B), (B, C), (C, A)): f.tick(P, Q)
    if mode == 'in': mark_tri(f, A, B, C, '?', '?', '?')
    elif mode == 'side':
        f.text(((A[0]+B[0])/2 - 6, (A[1]+B[1])/2 + 2.5), '?')
        f.text(((A[0]+C[0])/2 + 6, (A[1]+C[1])/2 + 2.5), '?')
        f.text(((B[0]+C[0])/2, -5.5), '?')
    else:
        D = (C[0] + 16, 0); f.line(C, D, dash='1.4 1.1')
        f.angle(C, 0, ang_of(C, A), '?')
        if mode == 'ext2': f.angle(C, ang_of(C, A), 180, '?')
    return f

def tri(b, c):
    f, A, B, C = triangle(b, c, base=38)
    mark_tri(f, A, B, C, '?', deg(b), deg(c))
    return f

def quad(angles, mask):
    """Convex quadrilateral with interior angles [V0..V3] (CCW), solved exactly."""
    best = None
    for s0 in [1.0+0.05*i for i in range(9)]:
        for s1 in [0.6+0.05*j for j in range(13)]:
            d = [0.0]
            for i in (1, 2, 3): d.append(d[-1] + 180 - angles[i])
            u = [(math.cos(rad(x)), math.sin(rad(x))) for x in d]
            rx = -(s0 * u[0][0] + s1 * u[1][0]); ry = -(s0 * u[0][1] + s1 * u[1][1])
            det = u[2][0] * u[3][1] - u[3][0] * u[2][1]
            if abs(det) < 1e-9: continue
            s2 = (rx * u[3][1] - u[3][0] * ry) / det
            s3 = (u[2][0] * ry - rx * u[2][1]) / det
            S = [s0, s1, s2, s3]
            if min(S) <= 0.55: continue
            score = max(S) / min(S)
            if best is None or score < best[0]: best = (score, S, u)
    _, S, u = best
    sc = 32 / max(S[0], 1)
    V = [(0.0, 0.0)]
    for i in range(3): V.append((V[-1][0] + S[i] * sc * u[i][0], V[-1][1] + S[i] * sc * u[i][1]))
    f = Fig(); f.poly(V)
    for i in range(4):
        P, nx, pv = V[i], V[(i + 1) % 4], V[(i - 1) % 4]
        d1, d2 = ang_of(P, nx), ang_of(P, pv)
        if mask == 'diag': continue
        f.angle(P, d1, d2, deg(angles[i]) if mask[i] else '?')
    if mask == 'diag': f.line(V[0], V[2], dash='1.4 1.1')
    # self-check of the construction
    for i in range(4):
        P, nx, pv = V[i], V[(i + 1) % 4], V[(i - 1) % 4]
        got = (ang_of(P, pv) - ang_of(P, nx)) % 360
        assert abs(got - angles[i]) < 0.01, (angles, i, got)
    return f

def grid(n=5, u=5.2):
    W = 2 * n * u + 16; o = n * u + 6
    s = [f'<svg class="dg" direction="ltr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {W}" width="{W}mm" height="{W}mm" font-family="Rubik, Heebo, Arial" fill="{INK}">']
    for i in range(-n, n + 1):
        x = o + i * u
        s.append(f'<line x1="{x}" y1="{o-n*u}" x2="{x}" y2="{o+n*u}" stroke="#8a8a8a" stroke-width="0.18"/>')
        s.append(f'<line x1="{o-n*u}" y1="{x}" x2="{o+n*u}" y2="{x}" stroke="#8a8a8a" stroke-width="0.18"/>')
    a = o + n * u + 3.5
    s.append(f'<line x1="{o-n*u-2}" y1="{o}" x2="{a}" y2="{o}" stroke="{INK}" stroke-width="0.45"/>')
    s.append(f'<line x1="{o}" y1="{o+n*u+2}" x2="{o}" y2="{o-n*u-3.5}" stroke="{INK}" stroke-width="0.45"/>')
    s.append(f'<path d="M{a} {o} l-2 -1.1 v2.2z M{o} {o-n*u-3.5} l-1.1 2 h2.2z" fill="{INK}"/>')
    s.append(f'<text x="{a+1.2}" y="{o+3.4}" font-size="3.4" font-style="italic" font-family="Times New Roman">x</text>')
    s.append(f'<text x="{o+1.6}" y="{o-n*u-2.2}" font-size="3.4" font-style="italic" font-family="Times New Roman">y</text>')
    for i in range(-n, n + 1):
        if i == 0: continue
        t = str(i).replace('-', '−')
        if i != -1: s.append(f'<text x="{o+i*u}" y="{o+3.6}" font-size="2.5" text-anchor="middle">{t}</text>')
        else: s.append(f'<text x="{o+i*u-0.6}" y="{o+3.6}" font-size="2.5" text-anchor="middle">{t}</text>')
        s.append(f'<text x="{o-1.2}" y="{o-i*u+0.9}" font-size="2.5" text-anchor="end">{t}</text>')
    s.append(f'<text x="{o-1.4}" y="{o+3.9}" font-size="2.5" text-anchor="end">0</text>')
    s.append('</svg>')
    return ''.join(s)

def numline(n=10, u=8.6):
    W = 2 * n * u + 12; o = n * u + 6
    s = [f'<svg class="nl" direction="ltr" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} 12" width="{W}mm" height="12mm" font-family="Rubik, Heebo, Arial" fill="{INK}">']
    s.append(f'<line x1="2" y1="4" x2="{W-2}" y2="4" stroke="{INK}" stroke-width="0.4"/>')
    s.append(f'<path d="M{W-1} 4 l-2.4 -1.3 v2.6z M1 4 l2.4 -1.3 v2.6z" fill="{INK}"/>')
    for i in range(-n, n + 1):
        x = o + i * u; h = 2 if i else 3
        s.append(f'<line x1="{x}" y1="{4-h}" x2="{x}" y2="{4+h}" stroke="{INK}" stroke-width="{0.5 if i==0 else 0.3}"/>')
        s.append(f'<text x="{x}" y="10.4" font-size="3" text-anchor="middle"{" font-weight=\"700\"" if i==0 else ""}>{str(i).replace("-", "−")}</text>')
    s.append('</svg>')
    return ''.join(s)

def render(d, big=False):
    k = d[0]
    if k == 'grid': return grid(u=6.6)
    f = {'adj': lambda: adjacent(d[1]), 'vert': lambda: vertical(d[1], d[2]),
         'right': lambda: right_tri(d[1]), 'iso': lambda: iso(d[1], d[2]),
         'equi': lambda: equi(d[1]), 'tri': lambda: tri(d[1], d[2]),
         'quad': lambda: quad(d[1], d[2])}[k]()
    return f.svg(72, 46, pad=4) if big else f.svg(62, 30, pad=3.5)
