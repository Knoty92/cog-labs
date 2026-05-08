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
        body: JSON.stringify({
          name: name(),
          email: email(),
          phone: phone(),
          company: company(),
          message: message(),
          service: service(),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error || "Something went wrong");
        setFormState("error");
        return;
      }
      setFormState("done");
      setName(""); setEmail(""); setPhone(""); setCompany(""); setMessage(""); setService("general");
    } catch {
      setErrorMsg("Service unavailable. Please try again later.");
      setFormState("error");
    }
  };

  return (
    <div class="min-h-screen">
      {/* Header */}
      <header class="px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <div class="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 60 60">
            <path d="M30 5 L33 18 L44 13 L47 26 L58 28 L54 40 L64 50 L54 56 L56 68 L44 64 L40 76 L30 72 L26 80 L20 72 L12 76 L10 64 L0 60 L4 48 L-4 38 L4 30 L0 18 L12 14 L16 4 Z"
              fill="none" stroke="url(#g)" stroke-width="4" stroke-linejoin="round"/>
            <circle cx="30" cy="44" r="12" fill="none" stroke="url(#g)" stroke-width="4"/>
            <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#667eea"/><stop offset="100%" stop-color="#764ba2"/></linearGradient></defs>
          </svg>
          <span class="text-xl font-bold">Cog <span class="font-light text-gray-500">Labs</span></span>
        </div>
        <nav class="flex gap-6 text-sm font-medium text-gray-600">
          <a href="#services" class="hover:text-gray-900 transition">Services</a>
          <a href="#contact" class="hover:text-gray-900 transition">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section class="px-6 py-24 max-w-4xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-purple-700 text-sm font-medium mb-8">
          <span class="w-2 h-2 rounded-full bg-purple-500" />
          Advanced Software Studio
        </div>
        <h1 class="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          We build the cogs
          <br />
          <span class="gradient-text">that run the machine</span>
        </h1>
        <p class="text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Full-stack development studio. We design and build web apps, mobile apps, backend systems, and APIs.
          From MVP to enterprise — clean code, solid architecture, shipped on time.
        </p>
        <div class="flex gap-4 justify-center">
          <a href="#contact" class="btn-primary text-sm">Start a project</a>
          <a href="#services" class="px-6 py-3 rounded-lg border border-gray-200 text-sm font-medium text-gray-700 hover:border-gray-300 transition">
            See services
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" class="px-6 py-20 max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <p class="text-sm font-semibold text-purple-600 tracking-widest uppercase mb-3">What We Do</p>
          <h2 class="text-3xl md:text-4xl font-bold">Full-cycle development</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          {[
            { title: "Web Apps", desc: "React, Solid.js, Next.js. Fast, responsive, accessible single-page and multi-page applications." },
            { title: "Backend & APIs", desc: "Node.js, Go, Python. REST, GraphQL, WebSockets. Scalable architectures for any load." },
            { title: "Mobile Apps", desc: "Cross-platform with React Native or Flutter. Native feel, single codebase." },
            { title: "System Design", desc: "Architecture consulting, microservices, event-driven systems, cloud infrastructure." },
            { title: "MVP Studio", desc: "From idea to working product in weeks. Lean, focused, ship fast." },
            { title: "DevOps & Cloud", desc: "CI/CD pipelines, Docker, Kubernetes, AWS/GCP/Azure. Infrastructure as code." },
          ].map((s) => (
            <div class="card hover:shadow-md transition">
              <h3 class="text-lg font-semibold mb-2">{s.title}</h3>
              <p class="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" class="px-6 py-20 max-w-2xl mx-auto">
        <div class="text-center mb-12">
          <p class="text-sm font-semibold text-purple-600 tracking-widest uppercase mb-3">Get In Touch</p>
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Tell us about your project</h2>
          <p class="text-gray-500">We'll get back to you within 24 hours.</p>
        </div>

        {formState() === "done" ? (
          <div class="card text-center py-12">
            <div class="text-4xl mb-4">✅</div>
            <h3 class="text-xl font-semibold mb-2">Message sent!</h3>
            <p class="text-gray-500 mb-6">We'll review your project and get back to you shortly.</p>
            <button onClick={() => setFormState("idle")} class="btn-primary text-sm">Send another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} class="space-y-5">
            <div class="grid md:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium mb-1.5" for="name">Name *</label>
                <input id="name" value={name()} onInput={(e) => setName(e.currentTarget.value)} required
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1.5" for="email">Email *</label>
                <input id="email" type="email" value={email()} onInput={(e) => setEmail(e.currentTarget.value)} required
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition text-sm" />
              </div>
            </div>
            <div class="grid md:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-medium mb-1.5" for="phone">Phone</label>
                <input id="phone" type="tel" value={phone()} onInput={(e) => setPhone(e.currentTarget.value)}
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1.5" for="company">Company</label>
                <input id="company" value={company()} onInput={(e) => setCompany(e.currentTarget.value)}
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition text-sm" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1.5" for="service">Service</label>
              <select id="service" value={service()} onChange={(e) => setService(e.currentTarget.value)}
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition text-sm bg-white">
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
              <label class="block text-sm font-medium mb-1.5" for="message">Message *</label>
              <textarea id="message" rows={5} value={message()} onInput={(e) => setMessage(e.currentTarget.value)} required placeholder="Tell us about your project, timeline, and budget..."
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 outline-none transition text-sm resize-y" />
            </div>
            {errorMsg() && (
              <p class="text-red-500 text-sm">{errorMsg()}</p>
            )}
            <button type="submit" disabled={formState() === "sending"}
              class="btn-primary text-sm w-full disabled:opacity-50">
              {formState() === "sending" ? "Sending..." : "Send inquiry"}
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer class="px-6 py-8 border-t border-gray-100">
        <div class="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-400">
          <span>© 2026 Cog Labs — Advanced Software Studio</span>
          <span class="font-medium">CLASS</span>
        </div>
      </footer>
    </div>
  );
}
