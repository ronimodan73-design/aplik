# מפעל המעבדות של רוני – כלי לוח שהמורה שולט/ת בהם
מעבדה חדשה = קובץ תוכן אחד בתיקייה labs/content (השרטוט, הכפתורים והאתגרים).
המפעל מוסיף לבד: כותרת, מסך מלא (גם במקש F), הדפסה, "הסתר תוצאות" לניחוש,
עזרי גרירה ואנימציה בצעדים, צבעים קבועים, ביטויים מתמטיים שנקראים משמאל לימין,
עבודה בלי אינטרנט, וקרדיט "ערכה: רוני מודן · שחקים".

בנייה:  python3 labs/factory/build_lab.py labs/content/<id>.js   →  labs/<id>_lab.html
בדיקה:  python3 labs/factory/verify_lab.py <id> <תיקיית צילומים>
        (בלי אינטרנט, מחשב וטלפון, לוחץ על כל כפתור, גורר כל עיגול, בודק שגיאות וכיוון ביטויים)
קישור:  https://htmlpreview.github.io/?https://github.com/ronimodan73-design/aplik/blob/main/labs/<id>_lab.html
אחרי בנייה: להוסיף כרטיס בדף המורים teachers.html.

## חוזה קובץ התוכן
- שורה ראשונה: /*META {"id":"area","title":"מעבדת ...","icon":"📐"} */
- const LAB={hide:true|false, tip:'הוראה קצרה למורה', refresh:()=>...}  (refresh נקרא כשלוחצים "הסתר תוצאות")
- function start(){ svgSize(w,h); tool(...); draggable([...],fn); draw(); }

## עזרים מהמפעל
- $ / $$ בחירת אלמנטים · M(t) ביטוי מתמטי משמאל לימין · C(t,'green') טקסט צבוע
- COL: green purple orange blue red pink teal gold ink grid (אותם צבעים תמיד: צלע ירוק/סגול, היקף כתום, שטח כחול, טעות אדום)
- tool(id, label, fn, {lt}) כפתור בכותרת · card(id, html, cls) כרטיס בצד (נוצר פעם אחת ומתעדכן)
- svgSize(w,h) · svgPt(ev) · draggable(ids, (id,point)=>...) – כל עיגול גרירה: style="cursor:grab"
- seq(n, totalMs, step(i), done) אנימציה בצעדים (חוסם כפתורים בזמן ריצה)
- ST.hide / ST.revealed / hidCls() לטשטוש תוצאות במצב ניחוש · pick, R
- מחלקות: .big .okbox .badbox .chal .tip .hid .noprint

## כללי פדגוגיה קבועים
1. המורה שולט/ת: גרירה + כפתורי +/− (לוח מגע ועכבר).
2. רואים לפני נוסחה: אנימציה שמראה למה (סופרים, ממלאים, מזיזים).
3. כל מספר באותו צבע כמו החלק שלו בשרטוט.
4. "הסתר תוצאות" כדי שהכיתה תנחש לפני שמגלים.
5. אתגר לכיתה שנבדק לבד, עם "כל האפשרויות".

מעבדות במפעל: area (שטח והיקף), axes (ציר מספרים ומערכת צירים: רביע 1 / 2 רביעים / 4 רביעים).
מעבדות ישנות (נבנו לפני המפעל, עובדות כמו שהן): angles_lab, directed_lab, ratio_lab.
