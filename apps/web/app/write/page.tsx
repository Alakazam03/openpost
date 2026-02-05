export default function WritePage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Write a post</h2>
          <span className="text-xs text-slate-500">0 / 3000</span>
        </div>
        <textarea
          className="mt-4 h-80 w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-brand-500"
          placeholder="Share your update, story, or announcement..."
          maxLength={3000}
        />
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1">#buildinpublic</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">#hiring</span>
          <span className="rounded-full bg-slate-100 px-3 py-1">#productlaunch</span>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <label className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-600">
            Upload image
            <input className="mt-2 block w-full text-xs" type="file" accept="image/*" />
          </label>
          <label className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-600">
            Upload PDF carousel
            <input className="mt-2 block w-full text-xs" type="file" accept="application/pdf" />
          </label>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="rounded-full bg-brand-500 px-4 py-2 text-sm text-white">
            Post now
          </button>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm">
            Schedule
          </button>
          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm">
            Save draft
          </button>
        </div>
      </div>
      <aside className="card p-6">
        <h3 className="text-sm font-semibold text-slate-700">Preview</h3>
        <div className="mt-4 space-y-2 text-sm text-slate-700">
          <p>Line breaks show here.</p>
          <p>Keep it short, clear, and skimmable.</p>
        </div>
        <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
          Scheduling uses your timezone and default post time from settings.
        </div>
      </aside>
    </section>
  );
}
