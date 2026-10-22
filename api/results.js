import { list, get } from "@vercel/blob";

async function readText(stream) {
  const chunks = [];
  const reader = stream.getReader();
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  return Buffer.concat(chunks.map((c) => Buffer.from(c))).toString("utf8");
}

export default async function handler(req, res) {
  const key = (req.query && req.query.key) || "";
  if (!process.env.RESULTS_KEY || key !== process.env.RESULTS_KEY) {
    return res.status(401).json({ error: "열람 키가 맞지 않아요" });
  }
  try {
    const blobs = [];
    for (const prefix of ["signups/", "responses/"]) {
      let cursor;
      do {
        const page = await list({ prefix, cursor, limit: 1000 });
        blobs.push(...page.blobs);
        cursor = page.hasMore ? page.cursor : undefined;
      } while (cursor);
    }

    const rows = [];
    const batch = 20;
    for (let i = 0; i < blobs.length; i += batch) {
      const part = await Promise.all(
        blobs.slice(i, i + batch).map(async (b) => {
          try {
            const r = await get(b.pathname, { access: "private", useCache: false });
            if (!r || !r.stream) return null;
            const row = JSON.parse(await readText(r.stream));
            if (!row.kind) row.kind = b.pathname.startsWith("signups/") ? "signup" : "feedback";
            return row;
          } catch {
            return null;
          }
        })
      );
      rows.push(...part.filter(Boolean));
    }
    rows.sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ count: rows.length, rows });
  } catch (e) {
    console.error("results failed", e);
    return res.status(500).json({ error: "결과를 불러오지 못했어요" });
  }
}
