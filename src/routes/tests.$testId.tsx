import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, X } from "lucide-react";
import { MARKS, TESTS } from "@/data/tests";
import { Button } from "@/components/ui/button";
import { KEYS, logActivity, useStored, type TestAttempt } from "@/lib/store";

export const Route = createFileRoute("/tests/$testId")({
  loader: ({ params }) => {
    const test = TESTS.find((t) => t.id === params.testId && !t.premium);
    if (!test) throw notFound();
    return { test };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.test.title} — CETdesk` : "Mock test — CETdesk" },
      { name: "description", content: "Timed MHT-CET pattern mock test with instant solutions." },
      { property: "og:title", content: loaderData ? `${loaderData.test.title} — CETdesk` : "Mock test — CETdesk" },
      { property: "og:description", content: "Timed MHT-CET pattern mock test with instant solutions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-5 py-24 text-center">
      <p className="font-display text-4xl">This test is locked or doesn't exist.</p>
      <Button asChild variant="highlight" className="mt-6"><Link to="/tests">Back to tests</Link></Button>
    </div>
  ),
  component: TestRunner,
});

function TestRunner() {
  const { test } = Route.useLoaderData();
  const [answers, setAnswers] = useState<(number | null)[]>(() => test.questions.map(() => null));
  const [idx, setIdx] = useState(0);
  const [left, setLeft] = useState(test.minutes * 60);
  const [submitted, setSubmitted] = useState(false);
  const [, setAttempts] = useStored<TestAttempt[]>(KEYS.attempts, []);

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => setLeft((s) => (s <= 1 ? 0 : s - 1)), 1000);
    return () => clearInterval(t);
  }, [submitted]);

  const result = useMemo(() => {
    const by: Record<string, { score: number; max: number }> = {};
    let score = 0, max = 0;
    test.questions.forEach((q, i) => {
      const m = MARKS[q.subject];
      const row = (by[q.subject] ??= { score: 0, max: 0 });
      row.max += m;
      max += m;
      if (answers[i] === q.answer) { row.score += m; score += m; }
    });
    return { score, max, by };
  }, [answers, test]);

  const submit = () => {
    if (submitted) return;
    setSubmitted(true);
    logActivity();
    setAttempts((p) => [...p, { testId: test.id, title: test.title, score: result.score, max: result.max, bySubject: result.by, date: new Date().toISOString() }]);
  };

  useEffect(() => { if (left === 0) submit(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [left]);

  const q = test.questions[idx] ?? test.questions[0]!;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-14 animate-rise">
        <p className="eyebrow">{test.title} · result</p>
        <p className="mt-3 font-display text-7xl">{result.score}<span className="text-muted-foreground">/{result.max}</span></p>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {Object.entries(result.by).map(([s, v]) => (
            <div key={s} className="paper-card-soft p-4">
              <p className="eyebrow">{s}</p>
              <p className="mt-1 font-display text-3xl">{v.score}/{v.max}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-12 font-display text-3xl">Solutions</h2>
        <ol className="mt-4 space-y-4">
          {test.questions.map((qq, i) => {
            const ok = answers[i] === qq.answer;
            return (
              <li key={i} className="paper-card-soft p-5">
                <p className="flex items-start gap-2">
                  {ok ? <Check className="mt-1 size-4 shrink-0 text-success" /> : <X className="mt-1 size-4 shrink-0 text-destructive" />}
                  <span><span className="font-mono text-xs text-muted-foreground">Q{i + 1} · {qq.subject}</span><br />{qq.q}</span>
                </p>
                <p className="mt-3 text-sm">Answer: <span className="mark font-medium">{qq.options[qq.answer]}</span>{answers[i] !== null && !ok && <span className="text-muted-foreground"> · you chose {qq.options[answers[i]!]}</span>}</p>
                <p className="mt-1 text-sm text-muted-foreground">{qq.explain}</p>
              </li>
            );
          })}
        </ol>
        <div className="mt-8 flex gap-3">
          <Button asChild variant="highlight"><Link to="/dashboard">View dashboard</Link></Button>
          <Button asChild variant="outline"><Link to="/tests">More tests</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <div className="flex items-center justify-between">
        <p className="eyebrow">{test.title}</p>
        <p className={`font-mono text-2xl ${left < 120 ? "text-destructive" : ""}`}>{mm}:{ss}</p>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-[1fr_220px]">
        <div className="paper-card p-7">
          <p className="font-mono text-xs text-muted-foreground">Q{idx + 1} of {test.questions.length} · {q.subject} · +{MARKS[q.subject]}</p>
          <p className="mt-4 text-xl leading-relaxed">{q.q}</p>
          <div className="mt-6 grid gap-3">
            {q.options.map((o, i) => (
              <button key={i} onClick={() => setAnswers((a) => a.map((v, j) => (j === idx ? i : v)))} className={`flex items-center gap-3 rounded-md border-[1.5px] px-4 py-3 text-left transition-all ${answers[idx] === i ? "border-ink bg-accent shadow-hard-sm" : "border-ink/20 hover:border-ink"}`}>
                <span className="font-mono text-xs">{String.fromCharCode(65 + i)}</span>{o}
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-between">
            <Button variant="outline" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>Previous</Button>
            {idx < test.questions.length - 1 ? <Button onClick={() => setIdx(idx + 1)}>Next</Button> : <Button variant="highlight" onClick={submit}>Submit test</Button>}
          </div>
        </div>
        <aside className="paper-card-soft h-fit p-4">
          <p className="eyebrow">Palette</p>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {test.questions.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`aspect-square rounded font-mono text-xs border ${i === idx ? "border-ink border-2" : "border-ink/20"} ${answers[i] !== null ? "bg-accent" : ""}`}>{i + 1}</button>
            ))}
          </div>
          <Button variant="highlight" className="mt-4 w-full" onClick={submit}>Submit</Button>
          <p className="mt-3 text-xs text-muted-foreground">No negative marking — never leave a question blank.</p>
        </aside>
      </div>
    </div>
  );
}
