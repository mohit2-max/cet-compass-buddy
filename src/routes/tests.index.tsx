import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Lock } from "lucide-react";
import { PageHeader } from "@/components/SiteShell";
import { TESTS } from "@/data/tests";

export const Route = createFileRoute("/tests/")({
  head: () => ({
    meta: [
      { title: "MHT-CET Mock Tests & PYQs — CETdesk" },
      { name: "description", content: "Timed MHT-CET pattern mock tests with instant solutions and subject-wise analysis." },
      { property: "og:title", content: "MHT-CET Mock Tests & PYQs — CETdesk" },
      { property: "og:description", content: "CET-pattern mocks with a real timer and instant solutions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Tests,
});

function Tests() {
  return (
    <>
      <PageHeader eyebrow="Mock tests" title={<>Practice like it's <span className="italic mark">exam day</span>.</>}>
        Real CET pattern: Physics & Chemistry 1 mark, Maths 2 marks, no negative marking. Attempt every question — always.
      </PageHeader>
      <div className="mx-auto grid max-w-6xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-3">
        {TESTS.map((t) => {
          const body = (
            <>
              <div className="flex items-start justify-between">
                <p className="eyebrow">{t.kind}</p>
                {t.premium ? <span className="flex items-center gap-1 rounded-full bg-ink px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-paper"><Lock className="size-3" />Premium</span> : <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">Free</span>}
              </div>
              <p className="mt-6 font-display text-3xl leading-tight">{t.title}</p>
              <p className="mt-4 flex items-center gap-1.5 text-sm text-muted-foreground"><Clock className="size-3.5" />{t.minutes} min</p>
            </>
          );
          return t.premium ? (
            <Link key={t.id} to="/premium" className="paper-card-soft p-6 opacity-80 transition-opacity hover:opacity-100">{body}</Link>
          ) : (
            <Link key={t.id} to="/tests/$testId" params={{ testId: t.id }} className="paper-card p-6 transition-transform hover:-translate-y-1">{body}</Link>
          );
        })}
      </div>
    </>
  );
}
