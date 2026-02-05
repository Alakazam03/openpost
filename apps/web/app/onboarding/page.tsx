export default function OnboardingPage() {
  return (
    <section className="card mx-auto max-w-2xl p-8 text-center">
      <h2 className="text-2xl font-semibold">Connect your LinkedIn</h2>
      <p className="mt-4 text-sm text-slate-600">
        We only ask for permissions needed to publish your posts. No DMs, no analytics,
        no extra access.
      </p>
      <ul className="mt-6 space-y-2 text-left text-sm text-slate-700">
        <li>• Create and schedule LinkedIn posts</li>
        <li>• Upload images and PDF carousels</li>
        <li>• Manage drafts and scheduled posts</li>
      </ul>
      <button className="mt-8 rounded-full bg-brand-500 px-6 py-2 text-sm text-white">
        Connect LinkedIn
      </button>
    </section>
  );
}
