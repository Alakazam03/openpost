const upcomingPosts = [
  {
    id: '1',
    content: 'Shipping OpenLinkedIn this week. Excited to help creators schedule faster.',
    scheduledAt: 'Tomorrow · 9:00 AM',
    status: 'Scheduled'
  },
  {
    id: '2',
    content: 'Hiring a founding engineer to build lightweight creator tools.',
    scheduledAt: 'Friday · 10:30 AM',
    status: 'Scheduled'
  }
];

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="card p-6">
        <h2 className="text-lg font-semibold">Scheduled posts</h2>
        <p className="text-sm text-slate-600">
          Upcoming LinkedIn posts. Edit or delete before they go live.
        </p>
        <div className="mt-6 space-y-4">
          {upcomingPosts.map((post) => (
            <div key={post.id} className="rounded-xl border border-slate-200 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-slate-500">{post.scheduledAt}</p>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-700">
                  {post.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-800">{post.content}</p>
              <div className="mt-4 flex gap-3 text-sm">
                <button className="rounded-full border border-slate-200 px-3 py-1">Edit</button>
                <button className="rounded-full border border-slate-200 px-3 py-1 text-rose-600">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
