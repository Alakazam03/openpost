const dailyMetrics = {
  postureScore: 78,
  focusMinutes: 126,
  slouchAlerts: 4,
  streakDays: 6
};

const trend = [72, 75, 77, 74, 79, 81, 78];


const scoringComparison = {
  input: 'head=14°, shoulder=5°, lean=8°',
  v1: 69.8,
  v2: 73.6
};

const roadmapStepReview = [
  'Ship usefulness first: score + alert loop before account complexity.',
  'Keep notifications trustable: debounce and cooldown by default.',
  'Measure retention from day 1: track D1 and D7 active monitor sessions.'
];

export default function DashboardPage() {
  const max = Math.max(...trend);

  return (
    <section className="space-y-6">
      <div className="card p-6">
        <h2 className="text-xl font-semibold">Posture Command Center</h2>
        <p className="mt-2 text-sm text-slate-600">
          Desktop-first posture coaching MVP: monitor score, nudge at the right time, and build a
          measurable streak.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Live posture score" value={`${dailyMetrics.postureScore}/100`} />
        <MetricCard label="Focused minutes" value={`${dailyMetrics.focusMinutes}m`} />
        <MetricCard label="Slouch alerts" value={`${dailyMetrics.slouchAlerts}`} />
        <MetricCard label="Streak" value={`${dailyMetrics.streakDays} days`} />
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold">7-day score trend</h3>
        <div className="mt-4 flex items-end gap-2">
          {trend.map((point, index) => (
            <div key={index} className="flex flex-1 flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-brand-300"
                style={{ height: `${Math.max((point / max) * 160, 16)}px` }}
              />
              <span className="text-xs text-slate-500">D{index + 1}</span>
            </div>
          ))}
        </div>
      </div>


      <div className="card p-6">
        <h3 className="text-lg font-semibold">Model comparison test (v1 vs v2)</h3>
        <p className="mt-2 text-sm text-slate-600">
          Sample input {scoringComparison.input}. v2 keeps scores more stable with confidence and
          baseline calibration.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <MetricCard label="Scoring v1" value={`${scoringComparison.v1}`} />
          <MetricCard label="Scoring v2" value={`${scoringComparison.v2}`} />
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-lg font-semibold">Indie hacker review · Step 1</h3>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {roadmapStepReview.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="card p-4">
      <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
