import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/SiteShell";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/guidance")({
  head: () => ({
    meta: [
      { title: "MHT-CET Guidance & Strategy — CETdesk" },
      { name: "description", content: "Honest MHT-CET strategy: subject-wise approach, trusted resources, last-month plan, dropper advice and mindset." },
      { property: "og:title", content: "MHT-CET Guidance & Strategy — CETdesk" },
      { property: "og:description", content: "Subject-wise strategy, resources and a last-month plan for MHT-CET." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Guidance,
});

const PRINCIPLES: [string, string][] = [
  ["Speed > depth", "CET questions are mostly direct. 150 questions in 180 minutes means ~72 seconds each. Train for speed with timed sets, not long derivations."],
  ["PYQs first, everything else later", "Solve at least the last 4 years of memory-based papers before buying any test series. They teach you what CET actually asks."],
  ["State board textbook is the base", "Especially for Chemistry — many questions come line-for-line from the 12th Maharashtra board textbook. Read it, then highlight."],
  ["Never leave a bubble empty", "There is no negative marking. An educated guess has a 25% chance; a blank has 0%."],
];

const SUBJECTS = [
  { s: "Maths", tip: "Highest marks (100 of 200). Start with confidence chapters: Pair of Straight Lines, Linear Programming, Probability Distribution, Binomial. Then Integration & Vectors — the heavy hitters. Learn shortcuts for 3D (Line & Plane)." },
  { s: "Physics", tip: "Formula-driven. Keep a one-page formula sheet per chapter and revise it daily. Rotational Dynamics, Current Electricity, Electrostatics and Semiconductors repeat every year." },
  { s: "Chemistry", tip: "Fastest section if prepared. Organic: named reactions + conversions. Inorganic: textbook tables, colours, exceptions. Physical: formula-based numericals — quick marks." },
  { s: "Biology", tip: "NCERT-style recall plus state board diagrams. Genetics, Molecular Basis of Inheritance and Biotechnology carry steady weightage. Revise from your own short notes." },
];

const PHASES: [string, string][] = [
  ["6+ months left", "Finish 12th syllabus by weightage. 1 chapter test per chapter. Weekend: one 11th chapter."],
  ["3–6 months", "Close the syllabus, start PYQs topic-wise. Mark weak chapters in the planner and revisit every Sunday."],
  ["Boards season", "Same chapters serve both. Write answers for boards; solve 30 MCQs/day so CET speed doesn't drop."],
  ["Last 30 days", "No new low-weightage chapters. One full mock every other day, analyse the day between. Sleep 7 hours."],
  ["Last 7 days", "Only formula sheets, PYQ mistakes, and 2 light mocks. Check your hall ticket, centre and shift timing."],
];

const CHANNELS: [string, string][] = [
  ["RG Lectures", "Maths concepts & CET-level tricks"],
  ["Dinesh Sir", "Maths shortcuts for CET"],
  ["Ganitank", "Maths practice & strategy"],
  ["Sovind Sir", "CET guidance & counselling"],
  ["MHT CET topper interview", "How 99.9+ scorers planned"],
];

const FAQ: [string, string][] = [
  ["I wasted 11th and 12th. Is 90+ percentile still possible?", "Yes — CET is a speed-and-recall exam built mostly on the 12th syllabus. With 6–7 focused months, high-weightage chapters first and daily PYQs, a big jump is realistic. Use the first attempt for practice and the second to go all in."],
  ["Should I drop a year?", "Only if you can honestly commit to 8+ months of daily work. Ask: what will be different this time? If the answer is 'a plan and a routine', set them up here first and test yourself for 30 days."],
  ["Boards or CET — what should I focus on?", "Both share the 12th syllabus. Until boards, study concepts in board style and keep a small daily MCQ set. After boards, switch fully to CET mocks."],
  ["Does normalization hurt me?", "Normalization adjusts for shift difficulty — you can't control it. What you can control is attempting every question accurately. Focus there."],
  ["I'm stressed and can't focus.", "You're not alone — almost every aspirant feels this. Shrink the day: 3 tasks, one chapter, one timed set. Talk to someone you trust. If thoughts get dark, call Tele-MANAS at 14416 (free, 24×7)."],
];

function Guidance() {
  return (
    <>
      <PageHeader eyebrow="Guidance" title={<>Less noise. <span className="italic mark">More marks.</span></>}>
        A short, honest guide built from topper interviews, teacher guidance and hundreds of aspirant questions.
      </PageHeader>

      <div className="mx-auto max-w-6xl space-y-20 px-5">
        <section className="grid gap-5 md:grid-cols-2">
          {PRINCIPLES.map(([t, d], i) => (
            <div key={t} className="paper-card-soft p-6">
              <p className="font-mono text-xs text-muted-foreground">0{i + 1}</p>
              <p className="mt-2 font-display text-3xl">{t}</p>
              <p className="mt-2 text-muted-foreground">{d}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="font-display text-4xl">Subject by subject</h2>
          <div className="mt-6 divide-y divide-ink/15 border-y border-ink/15">
            {SUBJECTS.map(({ s, tip }) => (
              <div key={s} className="grid gap-2 py-6 md:grid-cols-[200px_1fr]">
                <p className="font-display text-3xl italic">{s}</p>
                <p className="text-lg text-muted-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-4xl">The timeline</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-5">
            {PHASES.map(([t, d], i) => (
              <li key={t} className="paper-card p-5">
                <p className="font-mono text-xs">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-3 font-display text-2xl leading-tight">{t}</p>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl">Resources that toppers repeat</h2>
            <ul className="mt-6 space-y-3 text-lg">
              <li>— Maharashtra State Board 11th & 12th textbooks</li>
              <li>— Target Publications MHT-CET Triumph series & PYQ books</li>
              <li>— Last 4–5 years of memory-based CET papers</li>
              <li>— One test series, not five</li>
              <li>— Your own one-page formula sheets</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-4xl">Watch on YouTube</h2>
            <ul className="mt-6 divide-y divide-ink/15 border-y border-ink/15">
              {CHANNELS.map(([n, d]) => (
                <li key={n}>
                  <a href={`https://www.youtube.com/results?search_query=${encodeURIComponent(n + " MHT CET")}`} target="_blank" rel="noreferrer" className="group flex items-center justify-between py-4">
                    <span><span className="font-medium">{n}</span><span className="block text-sm text-muted-foreground">{d}</span></span>
                    <ArrowUpRight className="size-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section>
          <h2 className="font-display text-4xl">Questions aspirants keep asking</h2>
          <Accordion type="single" collapsible className="mt-6 border-t border-ink/15">
            {FAQ.map(([q, a]) => (
              <AccordionItem key={q} value={q} className="border-ink/15">
                <AccordionTrigger className="text-left font-display text-2xl font-normal hover:no-underline">{q}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </>
  );
}
