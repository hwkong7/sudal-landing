import { put } from "@vercel/blob";

const MAX_BYTES = 8000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "POST만 받아요" });
  }
  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
    // 봇 방지용 숨은 칸이 채워져 있으면 저장하지 않고 성공처럼 응답
    if (body.website) return res.status(200).json({ ok: true });

    const kind = body.kind === "feedback" ? "feedback" : "signup";
    const ref = typeof body.ref === "string" ? body.ref.slice(0, 80) : "";
    let record;

    if (kind === "signup") {
      const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 120) : "";
      if (!EMAIL.test(email)) return res.status(400).json({ error: "이메일 주소를 확인해 주세요" });
      if (body.consent !== true) return res.status(400).json({ error: "개인정보 수집·이용 동의가 필요해요" });
      const os = Array.isArray(body.os) ? body.os.filter((o) => o === "Windows" || o === "macOS") : [];
      record = {
        kind,
        submittedAt: new Date().toISOString(),
        email,
        os,
        beta: body.beta === true,
        consent: true,
        from: typeof body.from === "string" ? body.from.slice(0, 20) : "",
        ref,
      };
    } else {
      const answers = body.answers && typeof body.answers === "object" ? body.answers : null;
      if (!answers) return res.status(400).json({ error: "응답 내용이 비어 있어요" });
      record = { kind, submittedAt: new Date().toISOString(), answers, ref };
    }

    const json = JSON.stringify(record);
    if (json.length > MAX_BYTES) return res.status(413).json({ error: "내용이 너무 길어요" });

    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    await put(`${kind === "signup" ? "signups" : "responses"}/${id}.json`, json, {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
    });
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("save failed", e);
    return res.status(500).json({ error: "저장하지 못했어요. 잠시 후 다시 시도해 주세요." });
  }
}
