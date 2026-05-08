import { createComponent, isServer, getRequestEvent, delegateEvents } from 'solid-js/web';
import { a as au } from '../nitro/nitro.mjs';
import { createSignal, onCleanup, children, createMemo, getOwner, sharedConfig, createRenderEffect, on, useContext, runWithOwner, createContext, untrack, Show, createRoot, startTransition, resetErrorBoundaries, batch, createComponent as createComponent$1 } from 'solid-js';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:async_hooks';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'solid-js/web/storage';

function re() {
  let e = /* @__PURE__ */ new Set();
  function t(n) {
    return e.add(n), () => e.delete(n);
  }
  let r = false;
  function o(n, a) {
    if (r) return !(r = false);
    const s = { to: n, options: a, defaultPrevented: false, preventDefault: () => s.defaultPrevented = true };
    for (const i of e) i.listener({ ...s, from: i.location, retry: (h) => {
      h && (r = true), i.navigate(n, { ...a, resolve: false });
    } });
    return !s.defaultPrevented;
  }
  return { subscribe: t, confirm: o };
}
let M;
function z() {
  (!window.history.state || window.history.state._depth == null) && window.history.replaceState({ ...window.history.state, _depth: window.history.length - 1 }, ""), M = window.history.state._depth;
}
isServer || z();
function xe(e) {
  return { ...e, _depth: window.history.state && window.history.state._depth };
}
function Oe(e, t) {
  let r = false;
  return () => {
    const o = M;
    z();
    const n = o == null ? null : M - o;
    if (r) {
      r = false;
      return;
    }
    n && t(n) ? (r = true, window.history.go(-n)) : e();
  };
}
const Ue = /^(?:[a-z0-9]+:)?\/\//i, Fe = /^\/+|(\/)\/+$/g, oe = "http://sr";
function B(e, t = false) {
  const r = e.replace(Fe, "$1");
  return r ? t || /^[?#]/.test(r) ? r : "/" + r : "";
}
function D(e, t, r) {
  if (Ue.test(t)) return;
  const o = B(e), n = r && B(r);
  let a = "";
  return !n || t.startsWith("/") ? a = o : n.toLowerCase().indexOf(o.toLowerCase()) !== 0 ? a = o + n : a = n, (a || "/") + B(t, !a);
}
function ke(e, t) {
  return B(e).replace(/\/*(\*.*)?$/g, "") + B(t);
}
function ae(e) {
  const t = {};
  return e.searchParams.forEach((r, o) => {
    o in t ? Array.isArray(t[o]) ? t[o].push(r) : t[o] = [t[o], r] : t[o] = r;
  }), t;
}
function qe(e, t, r) {
  const [o, n] = e.split("/*", 2), a = o.split("/").filter(Boolean), s = a.length;
  return (i) => {
    const h = i.split("/").filter(Boolean), c = h.length - s;
    if (c < 0 || c > 0 && n === void 0 && !t) return null;
    const d = { path: s ? "" : "/", params: {} }, y = (m) => r === void 0 ? void 0 : r[m];
    for (let m = 0; m < s; m++) {
      const g = a[m], b = g[0] === ":", u = b ? h[m] : h[m].toLowerCase(), l = b ? g.slice(1) : g.toLowerCase();
      if (b && K(u, y(l))) d.params[l] = u;
      else if (b || !K(u, l)) return null;
      d.path += `/${u}`;
    }
    if (n) {
      const m = c ? h.slice(-c).join("/") : "";
      if (K(m, y(n))) d.params[n] = m;
      else return null;
    }
    return d;
  };
}
function K(e, t) {
  const r = (o) => o === e;
  return t === void 0 ? true : typeof t == "string" ? r(t) : typeof t == "function" ? t(e) : Array.isArray(t) ? t.some(r) : t instanceof RegExp ? t.test(e) : false;
}
function je(e) {
  const [t, r] = e.pattern.split("/*", 2), o = t.split("/").filter(Boolean);
  return o.reduce((n, a) => n + (a.startsWith(":") ? 2 : 3), o.length - (r === void 0 ? 0 : 1));
}
function se(e) {
  const t = /* @__PURE__ */ new Map(), r = getOwner();
  return new Proxy({}, { get(o, n) {
    return t.has(n) || runWithOwner(r, () => t.set(n, createMemo(() => e()[n]))), t.get(n)();
  }, getOwnPropertyDescriptor() {
    return { enumerable: true, configurable: true };
  }, ownKeys() {
    return Reflect.ownKeys(e());
  }, has(o, n) {
    return n in e();
  } });
}
function ie(e) {
  let t = /(\/?\:[^\/]+)\?/.exec(e);
  if (!t) return [e];
  let r = e.slice(0, t.index), o = e.slice(t.index + t[0].length);
  const n = [r, r += t[1]];
  for (; t = /^(\/\:[^\/]+)\?/.exec(o); ) n.push(r += t[1]), o = o.slice(t[0].length);
  return ie(o).reduce((a, s) => [...a, ...n.map((i) => i + s)], []);
}
const Be = 100, Ie = createContext(), ce = createContext();
function _e(e, t = "") {
  const { component: r, preload: o, load: n, children: a, info: s } = e, i = !a || Array.isArray(a) && !a.length, h = { key: e, component: r, preload: o || n, info: s };
  return ue(e.path).reduce((c, d) => {
    for (const y of ie(d)) {
      const m = ke(t, y);
      let g = i ? m : m.split("/*", 1)[0];
      g = g.split("/").map((b) => b.startsWith(":") || b.startsWith("*") ? b : encodeURIComponent(b)).join("/"), c.push({ ...h, originalPath: d, pattern: g, matcher: qe(g, !i, e.matchFilters) });
    }
    return c;
  }, []);
}
function We(e, t = 0) {
  return { routes: e, score: je(e[e.length - 1]) * 1e4 - t, matcher(r) {
    const o = [];
    for (let n = e.length - 1; n >= 0; n--) {
      const a = e[n], s = a.matcher(r);
      if (!s) return null;
      o.unshift({ ...s, route: a });
    }
    return o;
  } };
}
function ue(e) {
  return Array.isArray(e) ? e : [e];
}
function le(e, t = "", r = [], o = []) {
  const n = ue(e);
  for (let a = 0, s = n.length; a < s; a++) {
    const i = n[a];
    if (i && typeof i == "object") {
      i.hasOwnProperty("path") || (i.path = "");
      const h = _e(i, t);
      for (const c of h) {
        r.push(c);
        const d = Array.isArray(i.children) && i.children.length === 0;
        if (i.children && !d) le(i.children, c.pattern, r, o);
        else {
          const y = We([...r], o.length);
          o.push(y);
        }
        r.pop();
      }
    }
  }
  return r.length ? o : o.sort((a, s) => s.score - a.score);
}
function I(e, t) {
  for (let r = 0, o = e.length; r < o; r++) {
    const n = e[r].matcher(t);
    if (n) return n;
  }
  return [];
}
function De(e, t, r) {
  const o = new URL(oe), n = createMemo((d) => {
    const y = e();
    try {
      return new URL(y, o);
    } catch {
      return console.error(`Invalid path ${y}`), d;
    }
  }, o, { equals: (d, y) => d.href === y.href }), a = createMemo(() => n().pathname), s = createMemo(() => n().search, true), i = createMemo(() => n().hash), h = () => "", c = on(s, () => ae(n()));
  return { get pathname() {
    return a();
  }, get search() {
    return s();
  }, get hash() {
    return i();
  }, get state() {
    return t();
  }, get key() {
    return h();
  }, query: r ? r(c) : se(c) };
}
let C;
function Te() {
  return C;
}
function $e(e, t, r, o = {}) {
  const { signal: [n, a], utils: s = {} } = e, i = s.parsePath || ((f) => f), h = s.renderPath || ((f) => f), c = s.beforeLeave || re(), d = D("", o.base || "");
  if (d === void 0) throw new Error(`${d} is not a valid base path`);
  d && !n().value && a({ value: d, replace: true, scroll: false });
  const [y, m] = createSignal(false);
  let g;
  const b = (f, p) => {
    p.value === u() && p.state === v() || (g === void 0 && m(true), C = f, g = p, startTransition(() => {
      g === p && (l(g.value), w(g.state), resetErrorBoundaries(), isServer || E[1]((R) => R.filter((x) => x.pending)));
    }).finally(() => {
      g === p && batch(() => {
        C = void 0, f === "navigate" && pe(g), m(false), g = void 0;
      });
    }));
  }, [u, l] = createSignal(n().value), [v, w] = createSignal(n().state), A = De(u, v, s.queryWrapper), P = [], E = createSignal(isServer ? we() : []), q = createMemo(() => typeof o.transformUrl == "function" ? I(t(), o.transformUrl(A.pathname)) : I(t(), A.pathname)), H = () => {
    const f = q(), p = {};
    for (let R = 0; R < f.length; R++) Object.assign(p, f[R].params);
    return p;
  }, fe = s.paramsWrapper ? s.paramsWrapper(H, t) : se(H), V = { pattern: d, path: () => d, outlet: () => null, resolvePath(f) {
    return D(d, f);
  } };
  return createRenderEffect(on(n, (f) => b("native", f), { defer: true })), { base: V, location: A, params: fe, isRouting: y, renderPath: h, parsePath: i, navigatorFactory: me, matches: q, beforeLeave: c, preloadRoute: ge, singleFlight: o.singleFlight === void 0 ? true : o.singleFlight, submissions: E };
  function de(f, p, R) {
    untrack(() => {
      if (typeof p == "number") {
        p && (s.go ? s.go(p) : console.warn("Router integration does not support relative routing"));
        return;
      }
      const x = !p || p[0] === "?", { replace: _, resolve: O, scroll: W, state: U } = { replace: false, resolve: !x, scroll: true, ...R }, F = O ? f.resolvePath(p) : D(x && A.pathname || "", p);
      if (F === void 0) throw new Error(`Path '${p}' is not a routable path`);
      if (P.length >= Be) throw new Error("Too many redirects");
      const J = u();
      if (F !== J || U !== v()) if (isServer) {
        const X = getRequestEvent();
        X && (X.response = { status: 302, headers: new Headers({ Location: F }) }), a({ value: F, replace: _, scroll: W, state: U });
      } else c.confirm(F, R) && (P.push({ value: J, replace: _, scroll: W, state: v() }), b("navigate", { value: F, state: U }));
    });
  }
  function me(f) {
    return f = f || useContext(ce) || V, (p, R) => de(f, p, R);
  }
  function pe(f) {
    const p = P[0];
    p && (a({ ...f, replace: p.replace, scroll: p.scroll }), P.length = 0);
  }
  function ge(f, p) {
    const R = I(t(), f.pathname), x = C;
    C = "preload";
    for (let _ in R) {
      const { route: O, params: W } = R[_];
      O.component && O.component.preload && O.component.preload();
      const { preload: U } = O;
      p && U && runWithOwner(r(), () => U({ params: W, location: { pathname: f.pathname, search: f.search, hash: f.hash, query: ae(f), state: null, key: "" }, intent: "preload" }));
    }
    C = x;
  }
  function we() {
    const f = getRequestEvent();
    return f && f.router && f.router.submission ? [f.router.submission] : [];
  }
}
function Ke(e, t, r, o) {
  const { base: n, location: a, params: s } = e, { pattern: i, component: h, preload: c } = o().route, d = createMemo(() => o().path);
  h && h.preload && h.preload();
  const y = c ? c({ params: s, location: a, intent: C || "initial" }) : void 0;
  return { parent: t, pattern: i, path: d, outlet: () => h ? createComponent$1(h, { params: s, location: a, data: y, get children() {
    return r();
  } }) : r(), resolvePath(g) {
    return D(n.path(), g, d());
  } };
}
const he = (e) => (t) => {
  const { base: r } = t, o = children(() => t.children), n = createMemo(() => le(o(), t.base || ""));
  let a;
  const s = $e(e, n, () => a, { base: r, singleFlight: t.singleFlight, transformUrl: t.transformUrl });
  return e.create && e.create(s), createComponent(Ie.Provider, { value: s, get children() {
    return createComponent(Me, { routerState: s, get root() {
      return t.root;
    }, get preload() {
      return t.rootPreload || t.rootLoad;
    }, get children() {
      return [(a = getOwner()) && null, createComponent(Ne, { routerState: s, get branches() {
        return n();
      } })];
    } });
  } });
};
function Me(e) {
  const t = e.routerState.location, r = e.routerState.params, o = createMemo(() => e.preload && untrack(() => {
    e.preload({ params: r, location: t, intent: Te() || "initial" });
  }));
  return createComponent(Show, { get when() {
    return e.root;
  }, keyed: true, get fallback() {
    return e.children;
  }, children: (n) => createComponent(n, { params: r, location: t, get data() {
    return o();
  }, get children() {
    return e.children;
  } }) });
}
function Ne(e) {
  if (isServer) {
    const n = getRequestEvent();
    if (n && n.router && n.router.dataOnly) {
      ze(n, e.routerState, e.branches);
      return;
    }
    n && ((n.router || (n.router = {})).matches || (n.router.matches = e.routerState.matches().map(({ route: a, path: s, params: i }) => ({ path: a.originalPath, pattern: a.pattern, match: s, params: i, info: a.info }))));
  }
  const t = [];
  let r;
  const o = createMemo(on(e.routerState.matches, (n, a, s) => {
    let i = a && n.length === a.length;
    const h = [];
    for (let c = 0, d = n.length; c < d; c++) {
      const y = a && a[c], m = n[c];
      s && y && m.route.key === y.route.key ? h[c] = s[c] : (i = false, t[c] && t[c](), createRoot((g) => {
        t[c] = g, h[c] = Ke(e.routerState, h[c - 1] || e.routerState.base, G(() => o()[c + 1]), () => {
          var _a;
          const b = e.routerState.matches();
          return (_a = b[c]) != null ? _a : b[0];
        });
      }));
    }
    return t.splice(n.length).forEach((c) => c()), s && i ? s : (r = h[0], h);
  }));
  return G(() => o() && r)();
}
const G = (e) => () => createComponent(Show, { get when() {
  return e();
}, keyed: true, children: (t) => createComponent(ce.Provider, { value: t, get children() {
  return t.outlet();
} }) });
function ze(e, t, r) {
  const o = new URL(e.request.url), n = I(r, new URL(e.router.previousUrl || e.request.url).pathname), a = I(r, o.pathname);
  for (let s = 0; s < a.length; s++) {
    (!n[s] || a[s].route !== n[s].route) && (e.router.dataOnly = true);
    const { route: i, params: h } = a[s];
    i.preload && i.preload({ params: h, location: t.location, intent: "preload" });
  }
}
function He([e, t], r, o) {
  return [e, o ? (n) => t(o(n)) : t];
}
function Ve(e) {
  let t = false;
  const r = (n) => typeof n == "string" ? { value: n } : n, o = He(createSignal(r(e.get()), { equals: (n, a) => n.value === a.value && n.state === a.state }), void 0, (n) => (!t && e.set(n), sharedConfig.registry && !sharedConfig.done && (sharedConfig.done = true), n));
  return e.init && onCleanup(e.init((n = e.get()) => {
    t = true, o[1](r(n)), t = false;
  })), he({ signal: o, create: e.create, utils: e.utils });
}
function Je(e, t, r) {
  return e.addEventListener(t, r), () => e.removeEventListener(t, r);
}
function Xe(e, t) {
  const r = e && document.getElementById(e);
  r ? r.scrollIntoView() : t && window.scrollTo(0, 0);
}
function Ge(e) {
  const t = new URL(e);
  return t.pathname + t.search;
}
function Qe(e) {
  let t;
  const r = { value: e.url || (t = getRequestEvent()) && Ge(t.request.url) || "" };
  return he({ signal: [() => r, (o) => Object.assign(r, o)] })(e);
}
const Ye = /* @__PURE__ */ new Map();
function Ze(e = true, t = false, r = "/_server", o) {
  return (n) => {
    const a = n.base.path(), s = n.navigatorFactory(n.base);
    let i, h;
    function c(u) {
      return u.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function d(u) {
      if (u.defaultPrevented || u.button !== 0 || u.metaKey || u.altKey || u.ctrlKey || u.shiftKey) return;
      const l = u.composedPath().find((q) => q instanceof Node && q.nodeName.toUpperCase() === "A");
      if (!l || t && !l.hasAttribute("link")) return;
      const v = c(l), w = v ? l.href.baseVal : l.href;
      if ((v ? l.target.baseVal : l.target) || !w && !l.hasAttribute("state")) return;
      const P = (l.getAttribute("rel") || "").split(/\s+/);
      if (l.hasAttribute("download") || P && P.includes("external")) return;
      const E = v ? new URL(w, document.baseURI) : new URL(w);
      if (!(E.origin !== window.location.origin || a && E.pathname && !E.pathname.toLowerCase().startsWith(a.toLowerCase()))) return [l, E];
    }
    function y(u) {
      const l = d(u);
      if (!l) return;
      const [v, w] = l, A = n.parsePath(w.pathname + w.search + w.hash), P = v.getAttribute("state");
      u.preventDefault(), s(A, { resolve: false, replace: v.hasAttribute("replace"), scroll: !v.hasAttribute("noscroll"), state: P ? JSON.parse(P) : void 0 });
    }
    function m(u) {
      const l = d(u);
      if (!l) return;
      const [v, w] = l;
      o && (w.pathname = o(w.pathname)), n.preloadRoute(w, v.getAttribute("preload") !== "false");
    }
    function g(u) {
      clearTimeout(i);
      const l = d(u);
      if (!l) return h = null;
      const [v, w] = l;
      h !== v && (o && (w.pathname = o(w.pathname)), i = setTimeout(() => {
        n.preloadRoute(w, v.getAttribute("preload") !== "false"), h = v;
      }, 20));
    }
    function b(u) {
      if (u.defaultPrevented) return;
      let l = u.submitter && u.submitter.hasAttribute("formaction") ? u.submitter.getAttribute("formaction") : u.target.getAttribute("action");
      if (!l) return;
      if (!l.startsWith("https://action/")) {
        const w = new URL(l, oe);
        if (l = n.parsePath(w.pathname + w.search), !l.startsWith(r)) return;
      }
      if (u.target.method.toUpperCase() !== "POST") throw new Error("Only POST forms are supported for Actions");
      const v = Ye.get(l);
      if (v) {
        u.preventDefault();
        const w = new FormData(u.target, u.submitter);
        v.call({ r: n, f: u.target }, u.target.enctype === "multipart/form-data" ? w : new URLSearchParams(w));
      }
    }
    delegateEvents(["click", "submit"]), document.addEventListener("click", y), e && (document.addEventListener("mousemove", g, { passive: true }), document.addEventListener("focusin", m, { passive: true }), document.addEventListener("touchstart", m, { passive: true })), document.addEventListener("submit", b), onCleanup(() => {
      document.removeEventListener("click", y), e && (document.removeEventListener("mousemove", g), document.removeEventListener("focusin", m), document.removeEventListener("touchstart", m)), document.removeEventListener("submit", b);
    });
  };
}
function et(e) {
  if (isServer) return Qe(e);
  const t = () => {
    const o = window.location.pathname.replace(/^\/+/, "/") + window.location.search, n = window.history.state && window.history.state._depth && Object.keys(window.history.state).length === 1 ? void 0 : window.history.state;
    return { value: o + window.location.hash, state: n };
  }, r = re();
  return Ve({ get: t, set({ value: o, replace: n, scroll: a, state: s }) {
    n ? window.history.replaceState(xe(s), "", o) : window.history.pushState(s, "", o), Xe(decodeURIComponent(window.location.hash.slice(1)), a), z();
  }, init: (o) => Je(window, "popstate", Oe(o, (n) => {
    if (n) return !r.confirm(n);
    {
      const a = t();
      return !r.confirm(a.value, { state: a.state });
    }
  })), create: Ze(e.preload, e.explicitLinks, e.actionBase, e.transformUrl), utils: { go: (o) => window.history.go(o), beforeLeave: r } })(e);
}
function it() {
  return createComponent(et, { root: (e) => e.children, get children() {
    return createComponent(au, {});
  } });
}

export { it as default };
//# sourceMappingURL=app-B3PzYtlh.mjs.map
