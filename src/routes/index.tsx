import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarCheck, ClipboardList, Compass, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroDesk from "@/assets/hero-desk.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CETdesk — Prepare for MHT-CET without the chaos" },
      { name: "description", content: "A calm study planner, CET-pattern mock tests and honest guidance for MHT-CET PCM & PCB aspirants." },
      { property: "og:title", content: "CETdesk — Prepare for MHT-CET without the chaos" },
      { property: "og:description", content: "Planner, mock tests and honest guidance for MHT-CET aspirants." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PROBLEMS: [string, string][] = [
  ["“I wasted 11th & 12th. Is it too late?”", "Start where you are. The planner builds a day-by-day path from your exam date — high-weightage chapters first."],
  ["“Boards or CET — what do I focus on?”", "80% of CET is 12th syllabus. The same chapters serve both, so we sequence them to cover boards and CET together."],
  ["“I know theory but CET questions feel different.”", "CET rewards speed, not depth. Timed mocks in the exact pattern — 1 mark PC, 2 marks Maths, no negative marking."],
  ["“Which lectures and books do I trust?”", "A short, opinionated guidance hub — what toppers actually used, and what to skip."],
];

function Index() {
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-14 pb-16 md:grid-cols-[1.1fr_1fr] md:pt-20">
        <div className="animate-rise">
          <p className="eyebrow">For MHT-CET 2027 · PCM & PCB</p>
          <h1 className="mt-4 font-display text-6xl leading-[0.98] md:text-7xl">
            Prepare for CET <br />
            <span className="italic mark">without</span> the chaos.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            One quiet desk for your syllabus, your daily plan and your mocks. Built from what aspirants actually struggle with.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="highlight" size="lg">
              <Link to="/planner">Build my plan <ArrowRight /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/tests">Take a free mock</Link>
            </Button>
          </div>
        </div>
        <div className="paper-card overflow-hidden animate-rise" style={{ animationDelay: "120ms" }}>
          <img src={heroDesk} alt="Ink illustration of a study desk with books and a notebook of equations" width={1280} height={960} className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="border-y border-ink/15 bg-card/60">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 md:grid-cols-4">
          {[["150", "questions in 180 min"], ["200", "total marks (PCM)"], ["0", "negative marking"], ["80%", "weightage from 12th"]].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-4xl">{n}</p>
              <p className="eyebrow mt-1">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <p className="eyebrow">What we heard on r/mht_cet</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl md:text-5xl">Real worries. Straight answers.</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {PROBLEMS.map(([q, a]) => (
            <div key={q} className="paper-card-soft p-6">
              <p className="font-display text-2xl italic">{q}</p>
              <p className="mt-3 text-muted-foreground">{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5">
        <div className="grid gap-5 md:grid-cols-4">
          {[
            { to: "/planner", icon: CalendarCheck, t: "Planner", d: "Exam-date countdown, weekly targets, chapter checklist." },
            { to: "/tests", icon: ClipboardList, t: "Mock tests", d: "CET-pattern timer, instant solutions, subject breakdown." },
            { to: "/guidance", icon: Compass, t: "Guidance", d: "Strategy, resources, last-month plan, mindset." },
            { to: "/dashboard", icon: LineChart, t: "Dashboard", d: "Streaks, completion and weak chapters at a glance." },
          ].map(({ to, icon: Icon, t, d }) => (
            <Link key={to} to={to} className="paper-card group p-6 transition-transform hover:-translate-y-1">
              <Icon className="size-6" />
              <p className="mt-6 font-display text-3xl">{t}</p>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              <ArrowRight className="mt-6 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-5">
        <div className="paper-card flex flex-col items-start justify-between gap-6 bg-ink p-10 text-paper md:flex-row md:items-center">
          <div>
            <p className="font-display text-4xl">Serious about 99+?</p>
            <p className="mt-2 opacity-70">Full-length memory-based PYQs and CET-level mocks with Premium.</p>
          </div>
          <Button asChild variant="highlight" size="lg">
            <Link to="/premium">See Premium · ₹79/mo</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
