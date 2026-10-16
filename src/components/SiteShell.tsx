import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/planner", label: "Planner" },
  { to: "/tests", label: "Mock Tests" },
  { to: "/guidance", label: "Guidance" },
  { to: "/dashboard", label: "Dashboard" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-baseline gap-1.5">
          <span className="font-display text-2xl">CET</span>
          <span className="font-display text-2xl italic mark">desk</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground mark" }}
            >
              {n.label}
            </Link>
          ))}
          <Link to="/premium" className="ml-3 rounded-md border-[1.5px] border-ink bg-accent px-3 py-1.5 text-sm font-medium shadow-hard-sm transition-all hover:-translate-y-0.5">
            Premium ✦
          </Link>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink/15 px-5 py-3 md:hidden">
          {[...NAV, { to: "/premium", label: "Premium ✦" } as const].map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2 text-base">
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-ink/15">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-sm text-muted-foreground md:flex-row md:justify-between">
        <p>
          <span className="font-display text-lg text-foreground">CETdesk</span> — a quiet place to prepare for MHT-CET.
        </p>
        <p>Not affiliated with the State CET Cell. Always verify dates on the official portal.</p>
      </div>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 pb-8 animate-rise">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 font-display text-5xl leading-[1.05] md:text-6xl">{title}</h1>
      {children && <div className="mt-4 max-w-2xl text-lg text-muted-foreground">{children}</div>}
    </div>
  );
}
