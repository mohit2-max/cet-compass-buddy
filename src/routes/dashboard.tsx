import { createFileRoute, Link } from "@tanstack/react-router";
import { Flag, Flame } from "lucide-react";
import { PageHeader } from "@/components/SiteShell";
import { CHAPTERS, subjectsFor } from "@/data/syllabus";
import { DEFAULT_PROFILE, KEYS, daysUntil, streakFrom, useStored, type ChapterState, type Profile, type TestAttempt } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your MHT-CET Progress — CETdesk" },
      { name: "description", content: "Track your MHT-CET streak, syllabus completion, mock scores and weak chapters." },
      { property: "og:title", content: "Your MHT-CET Progress — CETdesk" },
      { property: "og:description", content: "Streaks, completion and weak chapters at a glance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [profile] = useStored<Profile>(KEYS.profile, DEFAULT_PROFILE);
  const [chapters] = useStored<Record<string, ChapterState>>(KEYS.chapters, {});
  const [activity] = useStored<string[]>(KEYS.activity, []);
  const [attempts] = useStored<TestAttempt[]>(KEYS.attempts, []);

  const subjects = subjectsFor(profile.stream);
  const mine = CHAPTERS.filter((c) => subjects.includes(c.subject));
  const done = mine.filter((c) => chapters[c.id] === "done").length;
  const weak = mine.filter((c) => chapters[c.id] === "weak");
  const pct = Math.round((done / mine.length) * 100);

  // Last 10 weeks heatmap
  const cells = Array.from({ length: 70 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (69 - i));
    return activity.includes(d.toISOString().slice(0, 10));
  });

  return (
    <>
      <PageHeader eyebrow="Dashboard" title={<>How you're <span className="italic mark">really</span> doing.</>}>
        Saved on this device. Update chapters in the planner and take mocks to fill this in.
      </PageHeader>
      <div className="mx-auto max-w-6xl space-y-6 px-5">
        <div className="grid gap-5 md:grid-cols-4">
          <Stat label="Days to exam" value={daysUntil(profile.examDate)} />
          <Stat label="Day streak" value={<span className="inline-flex items-center gap-2">{streakFrom(activity)}<Flame className="size-7" /></span>} />
          <Stat label="Syllabus done" value={`${pct}%`} />
          <Stat label="Mocks taken" value={attempts.length} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="paper-card-soft p-6">
            <p className="eyebrow">Subject completion</p>
            <div className="mt-5 space-y-5">
              {subjects.map((s) => {
                const list = mine.filter((c) => c.subject === s);
                const d = list.filter((c) => chapters[c.id] === "done").length;
                return (
                  <div key={s}>
                    <div className="flex justify-between"><span className="font-display text-2xl">{s}</span><span className="font-mono text-sm">{d}/{list.length}</span></div>
                    <div className="mt-2 h-3 overflow-hidden rounded-sm border border-ink"><div className="h-full bg-accent" style={{ width: `${(d / list.length) * 100}%` }} /></div>
                  </div>
                );
              })}
            </div>
            <p className="eyebrow mt-10">Activity · last 10 weeks</p>
            <div className="mt-3 grid grid-flow-col grid-rows-7 gap-1">
              {cells.map((on, i) => <span key={i} className={`size-3.5 rounded-[3px] border border-ink/15 ${on ? "bg-ink" : ""}`} />)}
            </div>
          </div>

          <div className="space-y-6">
            <div className="paper-card-soft p-6">
              <p className="eyebrow">Weak chapters</p>
              {weak.length === 0 ? (
                <p className="mt-3 text-sm text-muted-foreground">Flag chapters as weak in the planner — they'll be pushed to the front of your plan.</p>
              ) : (
                <ul className="mt-3 space-y-2">{weak.map((c) => <li key={c.id} className="flex items-center gap-2"><Flag className="size-3.5 text-destructive" />{c.name}<span className="ml-auto font-mono text-xs text-muted-foreground">{c.subject}</span></li>)}</ul>
              )}
            </div>
            <div className="paper-card-soft p-6">
              <p className="eyebrow">Recent mocks</p>
              {attempts.length === 0 ? (
                <div className="mt-3"><p className="text-sm text-muted-foreground">No attempts yet.</p><Button asChild variant="highlight" size="sm" className="mt-3"><Link to="/tests">Take a free mock</Link></Button></div>
              ) : (
                <ul className="mt-3 divide-y divide-ink/10">
                  {attempts.slice(-6).reverse().map((a, i) => (
                    <li key={i} className="flex items-center justify-between py-2.5">
                      <span><span className="text-sm">{a.title}</span><span className="block font-mono text-[10px] text-muted-foreground">{new Date(a.date).toLocaleDateString("en-IN")}</span></span>
                      <span className="font-display text-2xl">{a.score}/{a.max}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="paper-card p-5">
      <p className="eyebrow">{label}</p>
      <p className="mt-2 font-display text-5xl">{value}</p>
    </div>
  );
}
