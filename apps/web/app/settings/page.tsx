export default function SettingsPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
      <div className="card p-6">
        <h2 className="text-lg font-semibold">Settings</h2>
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500">Timezone</label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm">
              <option>America/Los_Angeles</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Default post time</label>
            <input
              type="time"
              className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm"
              defaultValue="09:00"
            />
          </div>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm text-rose-600">
            Disconnect LinkedIn
          </button>
        </div>
      </div>
      <aside className="card p-6">
        <h3 className="text-sm font-semibold text-slate-700">LinkedIn connection</h3>
        <p className="mt-4 text-sm text-slate-600">
          Status: Connected. Your tokens are securely stored on the server.
        </p>
        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
          We never post without your confirmation.
        </div>
      </aside>
    </section>
  );
}
