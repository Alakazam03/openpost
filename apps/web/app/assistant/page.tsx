const options = [
  { label: 'Thought leadership', value: 'thought_leadership' },
  { label: 'Personal story', value: 'personal_story' },
  { label: 'Hiring post', value: 'hiring' },
  { label: 'Product launch', value: 'product_launch' },
  { label: 'Job search', value: 'job_search' }
];

export default function AssistantPage() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.3fr,1fr]">
      <div className="card p-6">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <p className="text-sm text-slate-600">
          Generate a draft and edit it before posting.
        </p>
        <div className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500">Post type</label>
            <select className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm">
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Tone</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Professional', 'Casual', 'Bold', 'Friendly'].map((tone) => (
                <button
                  key={tone}
                  className="rounded-full border border-slate-200 px-4 py-1 text-xs"
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500">Context</label>
            <textarea
              className="mt-2 h-32 w-full resize-none rounded-xl border border-slate-200 p-3 text-sm"
              placeholder="What should the post be about?"
            />
          </div>
        </div>
        <button className="mt-6 rounded-full bg-brand-500 px-4 py-2 text-sm text-white">
          Generate draft
        </button>
      </div>
      <aside className="card p-6">
        <h3 className="text-sm font-semibold text-slate-700">Editable output</h3>
        <textarea
          className="mt-4 h-80 w-full resize-none rounded-xl border border-slate-200 p-3 text-sm"
          placeholder="Your AI draft appears here. Edit freely."
        />
        <div className="mt-4 text-xs text-slate-500">
          AI drafts never auto-publish. You stay in control.
        </div>
      </aside>
    </section>
  );
}
