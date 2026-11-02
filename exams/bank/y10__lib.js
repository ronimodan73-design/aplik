/* כלי עזר לשאלות מחוללות של כיתה י׳ 3 יח״ל (גאומטריה אנליטית).
   מאגר "מחולל" = BANK עם gen(r) במקום qs: הפונקציה מקבלת מחולל מספרים אקראיים ומחזירה רשימת שאלות
   באותו מבנה של מאגר רגיל ({lv,t,a,r,d,lit}). בכל לחיצה על "צרי" / "שאלות אחרות" נוצרים מספרים חדשים.
   כללי מספרים: תוצאות "נקיות" (שלשות פיתגוריות, סכומים זוגיים) – כדי שתלמיד חלש לא ייתקע בחישוב. */
const G3 = {
  ri: (r, a, b) => a + Math.floor(r() * (b - a + 1)),
  pick: (r, arr) => arr[Math.floor(r() * arr.length)],
  sg: r => (r() < .5 ? -1 : 1),
  nz: (r, a, b) => { let v = 0; while (!v) v = a + Math.floor(r() * (b - a + 1)); return v; },
  N: v => String(Math.round(v * 100) / 100),               // מספר לתצוגה (המינוס מוחלף ב־− בזמן ההצגה)
  par: v => (v < 0 ? '(' + G3.N(v) + ')' : G3.N(v)),        // מספר שלילי בתוך סוגריים בתוך חישוב
  P: (n, x, y) => n + '(' + G3.N(x) + ', ' + G3.N(y) + ')',  // שם נקודה עם שיעורים
  TR: [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 6, 10], [4, 3, 5], [12, 5, 13]],
  // שרטוט מערכת צירים שמכיל את כל הנקודות ואת ראשית הצירים
  pl: (pts, o) => {
    o = o || {};
    const xs = pts.map(p => p[1]).concat(0), ys = pts.map(p => p[2]).concat(0);
    const rg = v => { let a = Math.min(...v) - 1, b = Math.max(...v) + 1; while (b - a < 6) { a--; if (b - a < 6) b++; } return [a, b]; }; // לפחות 6 יחידות בכל ציר
    return Object.assign({t: 'pl', x: o.x || rg(xs), y: o.y || rg(ys),
      pts: pts.map(p => [p[0], p[1], p[2], o.show ? 1 : 0]), w: o.w || 50, hmax: 150}, o.segs ? {segs: o.segs} : {}, o.poly ? {poly: o.poly} : {}, o.lines ? {lines: o.lines} : {});
  },
  // ערבוב בלי חזרה על אותה תבנית
  sh: (r, a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; },
  // נקודה ראשונה ונקודה שנייה במרחק שלשה פיתגורית, בתוך התחום [-8,8]
  tri: (r, neg) => {
    for (;;) {
      const [a, b, c] = G3.pick(r, G3.TR), sx = G3.sg(r), sy = G3.sg(r);
      const x1 = neg ? G3.ri(r, -5, 5) : G3.ri(r, 0, 4), y1 = neg ? G3.ri(r, -5, 5) : G3.ri(r, 0, 4);
      const x2 = x1 + (neg ? sx : 1) * a, y2 = y1 + (neg ? sy : 1) * b;
      if (Math.abs(x2) > 9 || Math.abs(y2) > 9 || (!neg && (x2 < 0 || y2 < 0))) continue;
      if (neg && x1 >= 0 && y1 >= 0 && x2 >= 0 && y2 >= 0) continue;   // ברמה "שליליים" חייב להופיע מספר שלילי
      return {x1, y1, x2, y2, a, b, c};
    }
  },
  // חישוב מרחק מלא (שורות פתרון) לשתי נקודות
  dist: (A, B, x1, y1, x2, y2) => {
    const dx = x2 - x1, dy = y2 - y1, s = dx * dx + dy * dy, d = Math.sqrt(s), whole = Number.isInteger(d);
    return {s, d, whole, txt: '{' + A + B + ' = √((' + G3.N(x2) + ' − ' + G3.par(x1) + ')² + (' + G3.N(y2) + ' − ' + G3.par(y1) + ')²) = √(' + G3.par(dx) + '² + ' + G3.par(dy) + '²) = √(' + (dx * dx) + ' + ' + (dy * dy) + ') = √' + s + (whole ? ' = ' + d : ' ≈ ' + G3.N(d)) + '}'};
  },
  midTxt: (n, x1, y1, x2, y2) => '{x = [' + G3.N(x1) + ' + ' + G3.par(x2) + '/2] = ' + G3.N((x1 + x2) / 2) + '}   {y = [' + G3.N(y1) + ' + ' + G3.par(y2) + '/2] = ' + G3.N((y1 + y2) / 2) + '}   ← {' + G3.P(n, (x1 + x2) / 2, (y1 + y2) / 2) + '}',
  // מריץ את התבניות של כל רמה (כל תבנית פעם אחת) ומחזיר רשימת שאלות
  build: (r, T) => [1, 2, 3, 4].flatMap(L => T[L].map(f => Object.assign({lv: L}, f(r)))),
};

/* כלי עזר לשיפוע ולמשוואת הישר. שיפוע נשמר כשבר [מונה, מכנה] ומוצג מצומצם: [3/4], −[1/2], 2 */
Object.assign(G3, {
  gcd: (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a || 1; },
  fr: (n, d) => { d = d || 1; if (d < 0) { n = -n; d = -d; } const g = G3.gcd(n, d); n /= g; d /= g; return d === 1 ? String(n) : (n < 0 ? '-' : '') + '[' + Math.abs(n) + '/' + d + ']'; },
  // האיבר mx במשוואה (1x ← x, −1x ← −x, 0 ← ריק)
  mx: (n, d) => { d = d || 1; if (d < 0) { n = -n; d = -d; } const g = G3.gcd(n, d); n /= g; d /= g; if (!n) return '';
    return d === 1 ? (n === 1 ? '' : n === -1 ? '-' : String(n)) + 'x' : (n < 0 ? '-' : '') + '[' + Math.abs(n) + '/' + d + ']x'; },
  // משוואת ישר y = mx + b (b מספר שלם)
  eq: (n, d, b) => { const t = G3.mx(n, d); return 'y = ' + (t ? t + (b > 0 ? ' + ' + b : b < 0 ? ' − ' + (-b) : '') : G3.N(b)); },
  // חישוב שיפוע מלא בין שתי נקודות
  slope: (x1, y1, x2, y2) => '{m = [y₂ − y₁/x₂ − x₁] = [' + G3.N(y2) + ' − ' + G3.par(y1) + '/' + G3.N(x2) + ' − ' + G3.par(x1) + '] = [' + G3.N(y2 - y1) + '/' + G3.N(x2 - x1) + ']' + (G3.fr(y2 - y1, x2 - x1) === '[' + (y2 - y1) + '/' + (x2 - x1) + ']' ? '' : ' = ' + G3.fr(y2 - y1, x2 - x1)) + '}',
  // משוואת ישר דרך נקודה ושיפוע (m = n/d), בשיטת y − y₁ = m(x − x₁). מחזיר טקסט פתרון; b חייב לצאת שלם
  thru: (n, d, x1, y1) => { d = d || 1; const c = n * x1 / d, b = y1 - c;   // c = m·x₁ (שלם בבנייה)
    return '{y − ' + G3.par(y1) + ' = ' + G3.fr(n, d) + '(x − ' + G3.par(x1) + ')} ← {y − ' + G3.par(y1) + ' = ' + G3.mx(n, d) + (c > 0 ? ' − ' + c : c < 0 ? ' + ' + (-c) : '') + '} ← {' + G3.eq(n, d, b) + '}'; },
});

/* כלי עזר לנקודות מפגש */
Object.assign(G3, {
  sgn: v => (v > 0 ? ' + ' + v : v < 0 ? ' − ' + (-v) : ''),                       // "+ 3" / "− 3" / ריק
  rhs: (m, b) => (G3.mx(m) ? G3.mx(m) + G3.sgn(b) : G3.N(b)),                     // אגף ימין של y = mx + b
  at: (m, b, x) => (m === 1 && !b ? '{y = ' + G3.N(x) + '}' : '{y = ' + (m === 1 ? '' : m === -1 ? '−' : m + ' · ') + G3.par(x) + G3.sgn(b) + ' = ' + G3.N(m * x + b) + '}'),  // הצבה
  // חיתוך עם ציר x (b מתחלק ב־m בבנייה)
  xcut: (m, b) => '{0 = ' + G3.rhs(m, b) + '} ← ' + (G3.mx(m) === 'x' ? '' : '{' + G3.mx(m) + ' = ' + G3.N(-b) + '} ← ') + '{x = ' + G3.N(-b / m) + '} ← {(' + G3.N(-b / m) + ', 0)}',
  // נקודת מפגש של שני ישרים (פתרון שלם בבנייה)
  meet: (m1, b1, m2, b2, n) => { const x = (b2 - b1) / (m1 - m2), y = m1 * x + b1;
    return '{' + G3.rhs(m1, b1) + ' = ' + G3.rhs(m2, b2) + '} ← {' + G3.mx(m1 - m2) + ' = ' + G3.N(b2 - b1) + '} ← {x = ' + G3.N(x) + '} · ' + G3.at(m1, b1, x) + ' ← {' + G3.P(n || 'P', x, y) + '}'; },
});
