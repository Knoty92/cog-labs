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
    } catch { setErrorMsg("Service unavailable. Try again later."); setFormState("error"); }
  };

  return (
    <div class="min-h-screen">
      {/* ===== HEADER ===== */}
      <header class="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div class="flex items-center gap-2.5">
          <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-200">
            <svg width="18" height="18" viewBox="0 0 40 40" fill="none">
              <path d="M20 4 L22 14 L32 10 L34 20 L40 22 L36 30 L40 38 L32 36 L30 44 L20 40 L18 46 L12 40 L8 44 L6 34 L0 30 L4 22 L0 14 L8 10 L10 4 Z" fill="white" opacity="0.9"/>
              <circle cx="20" cy="26" r="8" fill="white" opacity="0.6"/>
            </svg>
          </div>
          <span class="text-lg font-bold tracking-tight">Cog <span class="font-light text-gray-400">Labs</span></span>
        </div>
        <nav class="flex gap-8 text-sm font-medium">
          <a href="#services" class="text-gray-500 hover:text-gray-900 transition">Services</a>
          <a href="#contact" class="text-gray-500 hover:text-gray-900 transition">Contact</a>
        </nav>
      </header>

      {/* ===== HERO ===== */}
      <section class="relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-transparent to-transparent pointer-events-none" />
        <div class="px-6 pt-16 pb-24 max-w-4xl mx-auto text-center relative">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 text-sm font-medium mb-8 border border-indigo-100 shadow-sm">
            <span class="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse" />
            Advanced Software Studio
          </div>
          <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-4 leading-tight">
            We build the cogs
            <br />
            <span class="gradient-sunset">that run the machine</span>
          </h1>
          <p class="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
            Full-stack development studio. We design and build <span class="text-indigo-600 font-medium">web apps</span>, 
            <span class="text-pink-600 font-medium"> mobile apps</span>, <span class="text-amber-600 font-medium"> backend systems</span>, 
            and <span class="text-cyan-600 font-medium"> APIs</span>. From MVP to enterprise — clean code, solid architecture, shipped on time.
          </p>
          <div class="flex gap-4 justify-center flex-wrap">
            <a href="#contact" class="btn-primary text-sm">🚀 Start a project</a>
            <a href="#services" class="btn-secondary text-sm">See what we build →</a>
          </div>

          {/* Trust badges */}
          <div class="mt-16 flex items-center justify-center gap-8 text-xs text-gray-400 font-medium tracking-wide">
            <span>React · Solid.js · Vue</span>
            <span class="w-1 h-1 rounded-full bg-gray-300" />
            <span>Node.js · Go · Python</span>
            <span class="w-1 h-1 rounded-full bg-gray-300" />
            <span>AWS · GCP · Azure</span>
          </div>
        </div>
      </section>

      {/* ===== LOGO SHOWCASE ===== */}
      <section class="px-6 py-16 max-w-4xl mx-auto text-center">
        <div class="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-50/80">
          <p class="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-6">The Cog Labs Identity</p>
          <div class="flex items-center justify-center gap-6 flex-wrap">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 60' width='180' height='60'%3E%3Cpath d='M30 8 L32 16 L40 12 L42 22 L48 24 L44 30 L48 36 L40 34 L38 42 L30 38 L28 44 L22 38 L16 42 L14 34 L6 30 L10 24 L6 18 L14 14 L16 6 L22 10 Z' fill='none' stroke='%236366f1' stroke-width='2.5'/%3E%3Ccircle cx='27' cy='25' r='8' fill='%236366f1' opacity='0.15'/%3E%3Ccircle cx='27' cy='25' r='3' fill='%236366f1'/%3E%3Ctext x='48' y='32' font-family='Inter,sans-serif' font-size='24' font-weight='700' fill='%230f0f23'%3ECog%3C/text%3E%3Ctext x='98' y='32' font-family='Inter,sans-serif' font-size='24' font-weight='300' fill='%239ca3af'%3ELabs%3C/text%3E%3C/svg%3E"
              alt="Cog Labs" class="h-12" />
            <span class="text-3xl text-gray-200 hidden md:inline">|</span>
            <div class="flex items-center gap-3">
              <span class="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm font-bold tracking-widest">CLASS</span>
              <span class="text-gray-400 text-sm tracking-wide">Advanced Software Studio</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" class="px-6 py-20 max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-sm font-semibold text-indigo-600 tracking-widest uppercase mb-3">What We Do</p>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Full-cycle development</h2>
          <p class="text-gray-500 max-w-md mx-auto">From concept to production — we handle everything.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-5">
          {[
            { title: "Web Apps", desc: "SPA, SSR, static. React, Solid.js, Vue. Responsive, accessible, fast.", color: "from-indigo-500 to-blue-500", tag: "tag-purple" },
            { title: "Backend & APIs", desc: "Node.js, Go, Python. REST, GraphQL, WebSockets. Scalable to any load.", color: "from-emerald-500 to-teal-500", tag: "tag-emerald" },
            { title: "Mobile Apps", desc: "Cross-platform with React Native or Flutter. Native feel, single codebase.", color: "from-pink-500 to-rose-500", tag: "tag-pink" },
            { title: "System Design", desc: "Microservices, event-driven, cloud-native. Architecture you can trust.", color: "from-amber-500 to-orange-500", tag: "tag-amber" },
            { title: "MVP Studio", desc: "Idea to working product in weeks. Lean, focused, ship fast.", color: "from-cyan-500 to-blue-500", tag: "tag-cyan" },
            { title: "DevOps & Cloud", desc: "CI/CD, Docker, Kubernetes, AWS/GCP/Azure. Infra as code.", color: "from-purple-500 to-violet-500", tag: "tag-rose" },
          ].map((s) => (
            <div class="card group relative overflow-hidden">
              <div class={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color} opacity-60`} />
              <div class="flex items-center gap-3 mb-3">
                <div class={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                  {s.title[0]}
                </div>
                <h3 class="text-lg font-semibold">{s.title}</h3>
              </div>
              <p class="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      <section class="px-6 py-20 section-gradient-1">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16">
            <p class="text-sm font-semibold text-pink-600 tracking-widest uppercase mb-3">How We Work</p>
            <h2 class="text-3xl md:text-4xl font-bold mb-4">From idea to production</h2>
          </div>
          <div class="grid md:grid-cols-4 gap-6">
            {[
              { num: "01", title: "Discovery", desc: "We learn your business, goals, and users. Define scope and roadmap.", color: "from-indigo-500 to-blue-500" },
              { num: "02", title: "Design", desc: "Architecture, UX, UI. Wireframes, prototypes, tech stack decisions.", color: "from-purple-500 to-pink-500" },
              { num: "03", title: "Build", desc: "Agile sprints, daily updates. You see progress every week.", color: "from-pink-500 to-rose-500" },
              { num: "04", title: "Ship", desc: "Deploy, monitor, iterate. We don't disappear after launch.", color: "from-amber-500 to-orange-500" },
            ].map((step) => (
              <div class="text-center">
                <div class={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-4 text-white text-lg font-bold shadow-lg shadow-${step.color.split(' ')[0].replace('from-','').replace('to-','')}/20`}>
                  {step.num}
                </div>
                <h3 class="font-semibold mb-2">{step.title}</h3>
                <p class="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT ===== */}
      <section id="contact" class="px-6 py-24 max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <p class="text-sm font-semibold text-amber-600 tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 class="text-3xl md:text-4xl font-bold mb-4 gradient-ocean">Tell us about your project</h2>
          <p class="text-gray-500">We'll get back within 24 hours. Usually faster.</p>
        </div>

        {formState() === "done" ? (
          <div class="card text-center py-12">
            <div class="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-5 text-2xl shadow-lg shadow-emerald-200">
              ✨
            </div>
            <h3 class="text-xl font-semibold mb-2">Message sent! 🎉</h3>
            <p class="text-gray-500 mb-6">We'll review your project and get back shortly.</p>
            <button onClick={() => setFormState("idle")} class="btn-primary text-sm">Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} class="card !p-8">
            <div class="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label class="block text-sm font-medium mb-1.5 text-gray-700" for="name">Name *</label>
                <input id="name" value={name()} onInput={(e) => setName(e.currentTarget.value)} required class="input-field" placeholder="John Doe" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1.5 text-gray-700" for="email">Email *</label>
                <input id="email" type="email" value={email()} onInput={(e) => setEmail(e.currentTarget.value)} required class="input-field" placeholder="john@example.com" />
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label class="block text-sm font-medium mb-1.5 text-gray-700" for="phone">Phone</label>
                <input id="phone" type="tel" value={phone()} onInput={(e) => setPhone(e.currentTarget.value)} class="input-field" placeholder="+420 777 123 456" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1.5 text-gray-700" for="company">Company</label>
                <input id="company" value={company()} onInput={(e) => setCompany(e.currentTarget.value)} class="input-field" placeholder="Your s.r.o." />
              </div>
            </div>
            <div class="mb-5">
              <label class="block text-sm font-medium mb-1.5 text-gray-700" for="service">Service</label>
              <select id="service" value={service()} onChange={(e) => setService(e.currentTarget.value)} class="input-field bg-white">
                <option value="general">💬 General inquiry</option>
                <option value="web">🌐 Web application</option>
                <option value="mobile">📱 Mobile app</option>
                <option value="backend">⚙️ Backend / API</option>
                <option value="mvp">🚀 MVP</option>
                <option value="consulting">🧠 Consulting</option>
                <option value="other">🔧 Other</option>
              </select>
            </div>
            <div class="mb-5">
              <label class="block text-sm font-medium mb-1.5 text-gray-700" for="message">Message *</label>
              <textarea id="message" rows={5} value={message()} onInput={(e) => setMessage(e.currentTarget.value)} required
                placeholder="Tell us about your project, timeline, and budget..."
                class="input-field resize-y" />
            </div>
            {errorMsg() && <p class="text-red-500 text-sm mb-4">{errorMsg()}</p>}
            <button type="submit" disabled={formState() === "sending"}
              class="btn-primary text-sm w-full flex items-center justify-center gap-2 disabled:opacity-50">
              {formState() === "sending" ? "⏳ Sending..." : "🚀 Send inquiry"}
            </button>
          </form>
        )}
      </section>

      {/* ===== FOOTER ===== */}
      <footer class="section-gradient-2 px-6 py-12 text-center">
        <div class="max-w-2xl mx-auto">
          <div class="inline-flex items-center gap-2 mb-6">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-900/30">
              <svg width="14" height="14" viewBox="0 0 40 40" fill="none">
                <path d="M20 4 L22 14 L32 10 L34 20 L40 22 L36 30 L40 38 L32 36 L30 44 L20 40 L18 46 L12 40 L8 44 L6 34 L0 30 L4 22 L0 14 L8 10 L10 4 Z" fill="white" opacity="0.9"/>
                <circle cx="20" cy="26" r="8" fill="white" opacity="0.6"/>
              </svg>
            </div>
            <span class="text-lg font-bold text-white">Cog <span class="font-light text-gray-400">Labs</span></span>
          </div>
          <p class="text-gray-400 text-sm mb-6">Advanced Software Studio — CLASS</p>
          <div class="flex items-center justify-center gap-6 text-xs text-gray-500">
            <span>© 2026 Cog Labs</span>
            <span class="w-1 h-1 rounded-full bg-gray-700" />
            <a href="https://github.com/Knoty92/cog-labs" class="hover:text-gray-300 transition">GitHub</a>
            <span class="w-1 h-1 rounded-full bg-gray-700" />
            <span>Build. Ship. Repeat.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
