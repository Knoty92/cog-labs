import { createSignal, createResource, Show, For } from "solid-js";

const USER = "cock";
const PASS = "brothers";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  service: string;
  createdAt: string;
};

export default function Admin() {
  const [authed, setAuthed] = createSignal(false);
  const [loginUser, setLoginUser] = createSignal("");
  const [loginPass, setLoginPass] = createSignal("");
  const [loginError, setLoginError] = createSignal("");

  const [submissions, { refetch }] = createResource<Submission[]>(async () => {
    const res = await fetch("/api/contact");
    const json = await res.json();
    return json.data || [];
  });

  const handleLogin = (e: Event) => {
    e.preventDefault();
    if (loginUser() === USER && loginPass() === PASS) {
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  return (
    <div class="min-h-screen bg-gray-50">
      <Show when={authed()} fallback={
        <div class="min-h-screen flex items-center justify-center p-6">
          <div class="bg-white rounded-2xl shadow-sm p-8 w-full max-w-sm">
            <div class="text-center mb-8">
              <div class="text-xl font-bold mb-1">Cog <span class="font-light text-gray-500">Labs</span></div>
              <div class="text-sm text-gray-400">Admin Panel</div>
            </div>
            <form onSubmit={handleLogin} class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-1" for="luser">Username</label>
                <input id="luser" value={loginUser()} onInput={(e) => setLoginUser(e.currentTarget.value)}
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-400 outline-none text-sm" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1" for="lpass">Password</label>
                <input id="lpass" type="password" value={loginPass()} onInput={(e) => setLoginPass(e.currentTarget.value)}
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-purple-400 outline-none text-sm" />
              </div>
              {loginError() && <p class="text-red-500 text-sm">{loginError()}</p>}
              <button type="submit" class="w-full gradient-bg text-white font-medium py-2.5 rounded-lg text-sm">
                Sign in
              </button>
            </form>
          </div>
        </div>
      }>
        <div class="max-w-5xl mx-auto p-6">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h1 class="text-2xl font-bold">Inquiries</h1>
              <p class="text-sm text-gray-500">{submissions()?.length || 0} submissions</p>
            </div>
            <button onClick={refetch} class="px-4 py-2 rounded-lg border border-gray-200 text-sm font-medium hover:bg-gray-50 transition">
              Refresh
            </button>
          </div>

          <Show when={submissions.loading}>
            <div class="text-center py-12 text-gray-400">Loading...</div>
          </Show>
          <Show when={!submissions.loading && submissions()?.length === 0}>
            <div class="text-center py-12">
              <div class="text-4xl mb-4">📭</div>
              <p class="text-gray-500">No inquiries yet.</p>
            </div>
          </Show>
          <Show when={submissions() && submissions()!.length > 0}>
            <div class="space-y-4">
              <For each={submissions()}>
                {(s) => (
                  <div class="bg-white rounded-xl p-6 border border-gray-100">
                    <div class="flex items-start justify-between mb-4">
                      <div>
                        <h3 class="font-semibold">{s.name}</h3>
                        <div class="text-sm text-gray-500">
                          <a href={`mailto:${s.email}`} class="text-purple-600 hover:underline">{s.email}</a>
                          {s.phone && <span> · {s.phone}</span>}
                        </div>
                      </div>
                      <div class="text-right text-xs text-gray-400">
                        <div>{new Date(s.createdAt).toLocaleDateString("cs-CZ")}</div>
                        <div class="mt-1">
                          <span class="px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 text-xs font-medium capitalize">{s.service}</span>
                        </div>
                      </div>
                    </div>
                    {s.company && <div class="text-sm text-gray-500 mb-3">Company: {s.company}</div>}
                    <p class="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-lg p-4">{s.message}</p>
                  </div>
                )}
              </For>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
}
