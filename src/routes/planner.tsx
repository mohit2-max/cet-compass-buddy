import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Flag, Plus, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/SiteShell";
import { CHAPTERS, subjectsFor, type Chapter } from "@/data/syllabus";
import { DEFAULT_PROFILE, KEYS, daysUntil, logActivity, today, useStored, type ChapterState, type Profile } from "@/lib/store";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "MHT-CET Study Planner — CETdesk" },
      { name: "description", content: "Build a day-by-day MHT-CET plan from your exam date, ordered by chapter weightage." },
      { property: "og:title", content: "MHT-CET Study Planner — CETdesk" },
      { property: "og:description", content: "A weightage-first weekly plan and chapter checklist for PCM & PCB." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Planner,
});

type Task = { id: string; text: string; done: boolean; date: string };
const REVISION_DAYS = 30;

function Planner() {
  const [profile, setProfile] = useStored<Profile>(KEYS.profile, DEFAULT_PROFILE);
  const [chapters, setChapters] = useStored<Record<string, ChapterState>>(KEYS.chapters, {});
  const [tasks, setTasks] = useStored<Task[]>(KEYS.tasks, []);
  const [draft, setDraft] = useState("");

  const subjects = subjectsFor(profile.stream);
  const mine = CHAPTERS.filter((c) => subjects.includes(c.subject));
  const days = daysUntil(profile.examDate);

  const weeks = useMemo(() => {
    const pending = mine
      .filter((c) => chapters[c.id] !== "done")
      .sort((a, b) => (chapters[b.id] === "weak" ? 1 : 0) - (chapters[a.id] === "weak" ? 1 : 0) || b.std - a.std || b.weight - a.weight);
    const studyWeeks = Math.max(1, Math.floor((days - REVISION_DAYS) / 7));
    const perWeek = Math.max(1, Math.ceil(pending.length / studyWeeks));
    const out: Chapter[][] = [];
    for (let i = 0; i < pending.length; i += perWeek) out.push(pending.slice(i, i + perWeek));
    return { list: out, perWeek, studyWeeks, behind: days - REVISION_DAYS < 7 };
  }, [mine, chapters, days]);

  const cycle = (id: string) => {
    const next: Record<ChapterState, ChapterState> = { todo: "done", done: "weak", weak: "todo" };
    setChapters((p) => ({ ...p, [id]: next[p[id] ?? "todo"] }));
    logActivity();
  };

  const todays = tasks.filter((t) => t.date === today());
  const addTask = () => {
    if (!draft.trim()) return;
    setTasks((p) => [...p, { id: crypto.randomUUID(), text: draft.trim().slice(0, 140), done: false, date: today() }]);
    setDraft("");
  };

  const doneCount = mine.filter((c) => chapters[c.id] === "done").length;

  return (
    <>
      <PageHeader eyebrow="Planner" title={<>Your plan, <span className="italic mark">weightage-first</span>.</>}>
        Tell us your exam date. We order every chapter by CET weightage, keep the last 30 days for revision and mocks, and split the rest into weekly targets.
      </PageHeader>

      <div className="mx-auto grid max-w-6xl gap-6 px-5 lg:grid-cols-[320px_1fr]">
        <aside className="space-y-6">
          <div className="paper-card p-6">
            <p className="eyebrow">Countdown</p>
            <p className="mt-2 font-display text-7xl leading-none">{days}</p>
            <p className="text-sm text-muted-foreground">days to exam · {doneCount}/{mine.length} chapters done</p>

            <div className="mt-6 space-y-4 text-sm">
              <label className="block">
                <span className="eyebrow">Stream</span>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {(["PCM", "PCB"] as const).map((s) => (
                    <button key={s} onClick={() => setProfile({ ...profile, stream: s })} className={`rounded-md border-[1.5px] border-ink py-2 font-medium ${profile.stream === s ? "bg-accent shadow-hard-sm" : ""}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </label>
              <label className="block">
                <span className="eyebrow">Exam date</span>
                <input type="date" value={profile.examDate} onChange={(e) => setProfile({ ...profile, examDate: e.target.value })} className="mt-2 w-full rounded-md border-[1.5px] border-ink bg-transparent px-3 py-2" />
              </label>
              <label className="block">
                <span className="eyebrow">Hours / day · {profile.hoursPerDay}h</span>
                <input type="range" min={1} max={14} value={profile.hoursPerDay} onChange={(e) => setProfile({ ...profile, hoursPerDay: +e.target.value })} className="mt-2 w-full accent-ink" />
              </label>
              <label className="block">
                <span className="eyebrow">Target percentile</span>
                <input type="number" min={50} max={100} step={0.1} value={profile.target} onChange={(e) => setProfile({ ...profile, target: +e.target.value })} className="mt-2 w-full rounded-md border-[1.5px] border-ink bg-transparent px-3 py-2" />
              </label>
            </div>
          </div>

          <div className="paper-card-soft p-6">
            <p className="eyebrow">Today's list</p>
            <ul className="mt-3 space-y-2">
              {todays.length === 0 && <li className="text-sm text-muted-foreground">Nothing yet. Add 3 small, specific tasks.</li>}
              {todays.map((t) => (
                <li key={t.id} className="flex items-center gap-2 text-sm">
                  <button onClick={() => { setTasks((p) => p.map((x) => (x.id === t.id ? { ...x, done: !x.done } : x))); logActivity(); }} className={`grid size-5 shrink-0 place-items-center rounded border-[1.5px] border-ink ${t.done ? "bg-accent" : ""}`} aria-label="Toggle task">
                    {t.done && <Check className="size-3" />}
                  </button>
                  <span className={`flex-1 ${t.done ? "text-muted-foreground line-through" : ""}`}>{t.text}</span>
                  <button onClick={() => setTasks((p) => p.filter((x) => x.id !== t.id))} aria-label="Delete task" className="text-muted-foreground hover:text-foreground"><Trash2 className="size-3.5" /></button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex gap-2">
              <input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addTask()} placeholder="e.g. 40 PYQs · Definite Integration" className="min-w-0 flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm" />
              <Button size="icon" onClick={addTask} aria-label="Add task"><Plus /></Button>
            </div>
          </div>
        </aside>

        <section className="space-y-6">
          <div className="paper-card-soft p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-3xl">Weekly targets</h2>
              <p className="eyebrow">{weeks.perWeek} chapters / week · ~{Math.round(profile.hoursPerDay * 7 / Math.max(1, weeks.perWeek))}h each</p>
            </div>
            {weeks.behind && (
              <p className="mt-3 rounded-md bg-highlight px-3 py-2 text-sm">
                Less than 5 weeks left — skip new low-weightage chapters. Revise what you know and solve PYQs daily.
              </p>
            )}
            <ol className="mt-5 space-y-4">
              {weeks.list.slice(0, 6).map((w, i) => (
                <li key={i} className="grid gap-3 border-t border-ink/10 pt-4 md:grid-cols-[110px_1fr]">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Week {i + 1}</p>
                  <div className="flex flex-wrap gap-2">
                    {w.map((c) => (
                      <span key={c.id} className="rounded-full border border-ink/25 px-3 py-1 text-sm">
                        <span className="mr-1.5 font-mono text-[10px] text-muted-foreground">{c.subject[0]}</span>{c.name}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
              {weeks.list.length === 0 && <li className="text-muted-foreground">Every chapter is done. Now: one full mock every other day.</li>}
              {weeks.list.length > 6 && <li className="text-sm text-muted-foreground">+ {weeks.list.length - 6} more weeks, then 30 days of revision & mocks.</li>}
            </ol>
          </div>

          <div className="paper-card-soft p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-3xl">Chapter checklist</h2>
              <p className="flex items-center gap-3 text-xs text-muted-foreground">
                Tap to cycle: <span className="inline-flex items-center gap-1"><span className="size-3 rounded-sm bg-accent" />done</span>
                <span className="inline-flex items-center gap-1"><Flag className="size-3 text-destructive" />weak</span>
              </p>
            </div>
            <div className="mt-5 grid gap-8 md:grid-cols-2">
              {subjects.map((s) => {
                const list = mine.filter((c) => c.subject === s);
                const d = list.filter((c) => chapters[c.id] === "done").length;
                return (
                  <div key={s}>
                    <div className="flex items-baseline justify-between">
                      <p className="font-display text-2xl">{s}</p>
                      <p className="font-mono text-xs">{d}/{list.length}</p>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className="h-full bg-ink transition-all" style={{ width: `${(d / list.length) * 100}%` }} />
                    </div>
                    <ul className="mt-3 space-y-1">
                      {list.map((c) => {
                        const st = chapters[c.id] ?? "todo";
                        return (
                          <li key={c.id}>
                            <button onClick={() => cycle(c.id)} className="flex w-full items-center gap-2 rounded px-1.5 py-1 text-left text-sm hover:bg-secondary">
                              <span className={`grid size-4 shrink-0 place-items-center rounded-sm border-[1.5px] border-ink ${st === "done" ? "bg-accent" : ""}`}>
                                {st === "done" && <Check className="size-3" />}
                              </span>
                              <span className={`flex-1 ${st === "done" ? "text-muted-foreground line-through" : ""}`}>{c.name}</span>
                              {st === "weak" && <Flag className="size-3.5 text-destructive" />}
                              <span className="font-mono text-[10px] text-muted-foreground">{c.std}th · {"●".repeat(c.weight)}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
