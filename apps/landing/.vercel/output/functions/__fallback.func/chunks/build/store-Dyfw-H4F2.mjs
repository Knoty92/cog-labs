import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const t = join(tmpdir(), "cog-labs-submissions.json");
function o() {
  existsSync(t) || writeFileSync(t, "[]", "utf-8");
}
function m() {
  o();
  try {
    return JSON.parse(readFileSync(t, "utf-8"));
  } catch {
    return [];
  }
}
function d(r) {
  o();
  const s = m(), i = { ...r, id: crypto.randomUUID(), createdAt: (/* @__PURE__ */ new Date()).toISOString() };
  return s.push(i), writeFileSync(t, JSON.stringify(s, null, 2), "utf-8"), i;
}

export { d, m };
//# sourceMappingURL=store-Dyfw-H4F2.mjs.map
