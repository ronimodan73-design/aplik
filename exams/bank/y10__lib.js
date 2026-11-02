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
    return Object.assign({t: 'pl', x: rg(xs), y: rg(ys),
      pts: pts.map(p => [p[0], p[1], p[2], o.show ? 1 : 0]), w: o.w || 50, hmax: 150}, o.segs ? {segs: o.segs} : {}, o.poly ? {poly: o.poly} : {});
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
