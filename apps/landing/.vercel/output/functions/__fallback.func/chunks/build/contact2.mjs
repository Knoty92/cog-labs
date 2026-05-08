import { d } from './store-Dyfw-H4F.mjs';
import 'node:fs';
import 'node:path';
import 'node:os';

async function l({ request: a }) {
  try {
    const e = await a.json(), { name: s, email: r, phone: n, company: t, message: o, service: i } = e;
    if (!s || !r || !o) return Response.json({ error: "Name, email and message are required" }, { status: 400 });
    const m = d({ name: s, email: r.trim().toLowerCase(), phone: n || "", company: t || "", message: o, service: i || "general" });
    return Response.json({ data: m }, { status: 201 });
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }
}

export { l as POST };
//# sourceMappingURL=contact2.mjs.map
