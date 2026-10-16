import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/SiteShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/premium")({
  head: () => ({
    meta: [
      { title: "CETdesk Premium — Full MHT-CET mocks for ₹79/month" },
      { name: "description", content: "Unlock full-length memory-based PYQs, CET-level full mocks and chapter tests for ₹79 a month." },
      { property: "og:title", content: "CETdesk Premium — Full MHT-CET mocks" },
      { property: "og:description", content: "Full-length PYQs and CET-level mocks for ₹79/month." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Premium,
});

function Premium() {
  return (
    <>
      <PageHeader eyebrow="Premium" title={<>The full exam, <span className="italic mark">every week</span>.</>}>
        The planner, guidance and starter mocks stay free forever. Premium is for when you're ready for full-length practice.
      </PageHeader>
      <div className="mx-auto grid max-w-4xl gap-6 px-5 md:grid-cols-2">
        <div className="paper-card-soft p-8">
          <p className="eyebrow">Free</p>
          <p className="mt-2 font-display text-6xl">₹0</p>
          <ul className="mt-6 space-y-3">
            {["Weightage-first study planner", "Chapter checklist & weak-topic flags", "Progress dashboard & streaks", "Full guidance hub", "2 starter mock tests"].map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0" />{f}</li>)}
          </ul>
          <Button asChild variant="outline" className="mt-8 w-full"><Link to="/planner">Start free</Link></Button>
        </div>
        <div className="paper-card p-8">
          <div className="flex items-center justify-between"><p className="eyebrow">Premium</p><span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">Most chosen</span></div>
          <p className="mt-2 font-display text-6xl">₹79<span className="text-2xl text-muted-foreground">/month</span></p>
          <ul className="mt-6 space-y-3">
            {["Everything in Free", "Memory-based PYQs (2022–2025), full length", "New CET-level full mock every week", "Chapter-wise tests for every chapter", "Detailed solutions & time-per-question analysis", "Cancel anytime"].map((f) => <li key={f} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0" />{f}</li>)}
          </ul>
          <Button variant="highlight" className="mt-8 w-full" disabled>Payments opening soon</Button>
        </div>
      </div>
    </>
  );
}
