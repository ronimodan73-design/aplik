// Roni's "smart scratchpad check" — Cloudflare Worker (free plan).
// Holds the secret Gemini key (GEMINI_KEY secret), checks the student's scratchpad image
// against the KNOWN correct solution steps sent by the app, and answers in friendly Hebrew.
// Settings (Worker → Settings → Variables): GEMINI_KEY (secret), MODEL (e.g. gemini-2.5-flash),
// DAILY_LIMIT (e.g. 300). Optional KV binding "COUNTER" for the daily cap.
const ORIGINS = ['https://ronimodan73-design.github.io', 'https://htmlpreview.github.io'];
const cors = o => ({ 'Access-Control-Allow-Origin': ORIGINS.includes(o) ? o : ORIGINS[0], 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Content-Type': 'application/json; charset=utf-8' });
const out = (o, obj, st = 200) => new Response(JSON.stringify(obj), { status: st, headers: cors(o) });
const PROMPT = (q) => `את/ה מורה למתמטיקה סבלני/ת לתלמידי חטיבת ביניים מתקשים.
מצורפת תמונה של טיוטה שתלמיד כתב באצבע או במחברת. השאלה: ${q.text}
שלבי הפתרון הנכון (ידועים ובטוחים):
${(q.steps || []).map((s, i) => `${i + 1}. ${s}`).join('\n')}
התשובה הנכונה: ${q.answer || ''}
משימה: השווה את מה שכתוב בטיוטה לשלבים הנכונים, ומצא את השלב הראשון שבו התלמיד כנראה טעה.
כללים: עברית פשוטה, משפט אחד או שניים, חם ועדין. אל תכתוב "טעית" – כתוב "בוא נבדוק את..." / "נראה לי ש...".
אל תגלה את התשובה הסופית. אם הטיוטה לא קריאה או ריקה – אמור זאת בעדינות והצע ללחוץ "איפה טעיתי?".
כפל כותבים בנקודה (·). החזר JSON בלבד: {"step": מספר השלב שבו הטעות או 0 אם הכול נראה נכון או -1 אם לא קריא, "msg": "ההודעה לתלמיד"}`;
export default {
  async fetch(req, env) {
    const o = req.headers.get('Origin') || '';
    if (req.method === 'OPTIONS') return new Response(null, { headers: cors(o) });
    if (req.method !== 'POST' || !ORIGINS.includes(o)) return out(o, { step: -1, msg: 'לא זמין כרגע.' }, 403);
    let body; try { body = await req.json(); } catch (e) { return out(o, { step: -1, msg: 'משהו השתבש. נסו שוב.' }, 400); }
    const img = String(body.img || '').replace(/^data:image\/\w+;base64,/, '');
    if (!img || img.length > 3_000_000) return out(o, { step: -1, msg: 'התמונה גדולה מדי או ריקה.' }, 400);
    // daily cap (Israel day)
    const limit = +(env.DAILY_LIMIT || 300), day = new Date(Date.now() + 2 * 3600e3).toISOString().slice(0, 10);
    if (env.COUNTER) { const n = +(await env.COUNTER.get(day) || 0); if (n >= limit) return out(o, { step: -1, msg: 'הבדיקה החכמה סיימה להיום 🙂 אפשר להשתמש ב"איפה טעיתי?".' }); await env.COUNTER.put(day, String(n + 1), { expirationTtl: 172800 }); }
    const model = env.MODEL || 'gemini-2.5-flash';
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_KEY },
      body: JSON.stringify({ contents: [{ parts: [{ text: PROMPT(body.q || {}) }, { inline_data: { mime_type: body.mime || 'image/png', data: img } }] }],
        generationConfig: { temperature: 0.2, responseMimeType: 'application/json' } })
    });
    if (!r.ok) return out(o, { step: -1, msg: 'הבדיקה החכמה לא זמינה כרגע. נסו "איפה טעיתי?".' }, 502);
    const j = await r.json();
    let ans; try { ans = JSON.parse(j.candidates[0].content.parts[0].text); } catch (e) { ans = { step: -1, msg: 'לא הצלחתי לקרוא. נסו לכתוב גדול וברור, או לחצו "איפה טעיתי?".' }; }
    return out(o, { step: +ans.step || 0, msg: String(ans.msg || '').slice(0, 400) });
  }
};
