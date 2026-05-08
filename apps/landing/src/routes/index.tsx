import { createSignal } from "solid-js";

export default function Home() {
  const [formState, setFormState] = createSignal<"idle" | "sending" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = createSignal("");
  const [name, setName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [phone, setPhone] = createSignal("");
  const [company, setCompany] = createSignal("");
  const [message, setMessage] = createSignal("");
  const [service, setService] = createSignal("general");

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setFormState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name(), email: email(), phone: phone(), company: company(), message: message(), service: service() }),
      });
      const json = await res.json();
      if (!res.ok) { setErrorMsg(json.error || "Something went wrong"); setFormState("error"); return; }
      setFormState("done");
      setName(""); setEmail(""); setPhone(""); setCompany(""); setMessage(""); setService("general");
    } catch { setErrorMsg("Service unavailable"); setFormState("error"); }
  };

  return (
    <div class="min-h-screen bg-[#0a0a0f]">
      {/* ===== HEADER ===== */}
      <header class="px-6 py-5 flex items-center justify-between max-w-6xl mx-auto border-b border-[#1a1a28]">
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-lg bg-[#1a1a28] flex items-center justify-center border border-[#2a2a3a]">
            <svg width="16" height="16" viewBox="0 0 40 40" fill="none">
              <path d="M20 4 L22 14 L32 10 L34 20 L40 22 L36 30 L40 38 L32 36 L30 44 L20 40 L18 46 L12 40 L8 44 L6 34 L0 30 L4 22 L0 14 L8 10 L10 4 Z" fill="#6366f1" opacity="0.8"/>
              <circle cx="20" cy="26" r="8" fill="#6366f1" opacity="0.3"/>
            </svg>
          </div>
          <span class="text-base font-semibold text-[#f1f5f9]">Cog <span class="font-light text-[#64748b]">Labs</span></span>
        </div>
        <nav class="flex gap-8 text-sm">
          <a href="#services" class="text-[#64748b] hover:text-[#f1f5f9] transition-colors">Services</a>
          <a href="#contact" class="text-[#64748b] hover:text-[#f1f5f9] transition-colors">Contact</a>
        </nav>
      </header>

      {/* ===== HERO ===== */}
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 grid-lines pointer-events-none" />
        <div class="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div class="px-6 pt-24 pb-28 max-4xl mx-auto text-center relative">
          <div class="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-[#111118] border border-[#1e1e2a] text-xs text-[#64748b] mb-8 tracking-wide">
            <span class="w-2 h-2 rounded-full bg-emerald-500" />
            Advanced Software Studio
          </div>
          <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-5 leading-tight text-[#f1f5f9]">
            We build the cogs<br />
            <span class="gradient-text">that run the machine</span>
          </h1>
          <p class="text-base text-[#64748b] max-w-xl mx-auto mb-10 leading-relaxed">
            Full-stack development studio. Web apps, mobile apps, backend systems, and APIs.
            From MVP to enterprise.
          </p>
          <div class="flex gap-4 justify-center">
            <a href="#contact" class="btn-primary">Start a project</a>
            <a href="#services" class="btn-secondary">View services</a>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" class="px-6 py-20 max-w-6xl mx-auto">
        <div class="mb-16 max-w-xl">
          <p class="text-xs font-semibold text-[#6366f1] tracking-widest uppercase mb-3">Services</p>
          <h2 class="text-3xl font-bold text-[#f1f5f9] mb-3">Full-cycle development</h2>
          <p class="text-sm text-[#64748b]">From concept to production.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-4">
          {[
            { title: "Web Applications", desc: "SPA, SSR, static. React, Solid.js, Vue. Responsive, accessible, performant." },
            { title: "Backend & APIs", desc: "Node.js, Go, Python. REST, GraphQL, WebSockets. Scalable architecture." },
            { title: "Mobile Applications", desc: "Cross-platform. React Native, Flutter. Native experience, single codebase." },
            { title: "System Architecture", desc: "Microservices, event-driven, cloud-native design. Built to scale." },
            { title: "MVP Development", desc: "Idea to working product in weeks. Lean, focused, designed for iteration." },
            { title: "DevOps & Infrastructure", desc: "CI/CD, Docker, Kubernetes. AWS, GCP, Azure. Infrastructure as code." },
          ].map((s) => (
            <div class="card">
              <div class="w-6 h-6 rounded bg-[#1a1a28] flex items-center justify-center mb-3">
                <svg width="12" height="12" viewBox="0 0 40 40" fill="none">
                  <path d="M20 4 L22 14 L32 10 L34 20 L40 22 L36 30 L40 38 L32 36 L30 44 L20 40 L18 46 L12 40 L8 44 L6 34 L0 30 L4 22 L0 14 L8 10 L10 4 Z" fill="#6366f1" opacity="0.6"/>
                  <circle cx="20" cy="26" r="8" fill="#6366f1" opacity="0.2"/>
                </svg>
              </div>
              <h3 class="text-sm font-semibold text-[#f1f5f9] mb-1.5">{s.title}</h3>
              <p class="text-xs text-[#64748b] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section class="px-6 py-20 border-t border-[#1a1a28]">
        <div class="max-w-6xl mx-auto">
          <div class="mb-16 max-w-xl">
            <p class="text-xs font-semibold text-[#6366f1] tracking-widest uppercase mb-3">Process</p>
            <h2 class="text-3xl font-bold text-[#f1f5f9] mb-3">How we work</h2>
            <p class="text-sm text-[#64748b]">From idea to production.</p>
          </div>
          <div class="grid md:grid-cols-4 gap-4">
            {[
              { num: "01", title: "Discovery", desc: "We learn your business, define scope, outline roadmap." },
              { num: "02", title: "Design", desc: "Architecture, UX, wireframes, tech stack decisions." },
              { num: "03", title: "Build", desc: "Agile sprints. You see progress every week." },
              { num: "04", title: "Ship", desc: "Deploy, monitor, iterate. We stay after launch." },
            ].map((step) => (
              <div class="card">
                <div class="text-[#6466f1] text-xs font-bold mb-2 tracking-wider">{step.num}</div>
                <h3 class="text-sm font-semibold text-[#f1f5f9] mb-1.5">{step.title}</h3>
                <p class="text-xs text-[#64748b] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" class="px-6 py-20 max-w-lg mx-auto">
        <div class="mb-10">
          <p class="text-xs font-semibold text-[#6366f1] tracking-widest uppercase mb-3">Contact</p>
          <h2 class="text-3xl font-bold text-[#f1f5f9] mb-3">Start a project</h2>
          <p class="text-sm text-[#64748b]">We'll get back within 24 hours.</p>
        </div>

        {formState() === "done" ? (
          <div class="card text-center py-12">
            <div class="text-3xl mb-3">✓</div>
            <h3 class="text-base font-semibold text-[#f1f5f9] mb-2">Message sent</h3>
            <p class="text-xs text-[#64748b] mb-5">We'll review and get back to you shortly.</p>
            <button onClick={() => setFormState("idle")} class="btn-primary text-xs">Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} class="card !p-6 space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-medium text-[#94a3b8] mb-1" for="name">Name</label>
                <input id="name" value={name()} onInput={(e) => setName(e.currentTarget.value)} required class="input-field" placeholder="John Doe" />
              </div>
              <div>
                <label class="block text-xs font-medium text-[#94a3b8] mb-1" for="email">Email</label>
                <input id="email" type="email" value={email()} onInput={(e) => setEmail(e.currentTarget.value)} required class="input-field" placeholder="john@example.com" />
              </div>
            </div>
            <div>
              <label class="block text-xs font-medium text-[#94a3b8] mb-1" for="service">Service</label>
              <select id="service" value={service()} onChange={(e) => setService(e.currentTarget.value)} class="input-field text-sm">
                <option value="general">General inquiry</option>
                <option value="web">Web application</option>
                <option value="mobile">Mobile app</option>
                <option value="backend">Backend / API</option>
                <option value="mvp">MVP</option>
                <option value="consulting">Consulting</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium text-[#94a3b8] mb-1" for="message">Message</label>
              <textarea id="message" rows={4} value={message()} onInput={(e) => setMessage(e.currentTarget.value)} required
                placeholder="Tell us about your project, timeline, and budget..."
                class="input-field resize-y" />
            </div>
            {errorMsg() && <p class="text-red-400 text-xs">{errorMsg()}</p>}
            <button type="submit" disabled={formState() === "sending"} class="btn-primary w-full text-xs disabled:opacity-50">
              {formState() === "sending" ? "Sending..." : "Send inquiry"}
            </button>
          </form>
        )}
      </section>

      {/* ===== FOOTER ===== */}
      <footer class="px-6 py-8 border-t border-[#1a1a28]">
        <div class="max-w-6xl mx-auto flex items-center justify-between text-xs text-[#475569]">
          <span>© 2026 Cog Labs</span>
          <div class="flex items-center gap-4">
            <span class="tracking-[0.2em] text-[#6366f1]/50">CLASS</span>
            <span>Build. Ship. Repeat.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
