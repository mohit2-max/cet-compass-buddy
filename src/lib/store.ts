import { useCallback, useEffect, useState } from "react";
import type { Stream } from "@/data/syllabus";

const EVT = "cetdesk-store";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** localStorage-backed state, synced across components and hydration-safe. */
export function useStored<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setValue(read(key, initial));
    setReady(true);
    const onSync = (e: Event) => {
      if ((e as CustomEvent).detail === key) setValue(read(key, initial));
    };
    window.addEventListener(EVT, onSync);
    return () => window.removeEventListener(EVT, onSync);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const resolved = typeof next === "function" ? (next as (p: T) => T)(read(key, initial)) : next;
      localStorage.setItem(key, JSON.stringify(resolved));
      setValue(resolved);
      window.dispatchEvent(new CustomEvent(EVT, { detail: key }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  return [value, set, ready] as const;
}

export type Profile = { stream: Stream; examDate: string; hoursPerDay: number; target: number };
export const DEFAULT_PROFILE: Profile = { stream: "PCM", examDate: "2027-04-15", hoursPerDay: 6, target: 99 };

export type ChapterState = "todo" | "done" | "weak";
export type TestAttempt = { testId: string; title: string; score: number; max: number; date: string; bySubject: Record<string, { score: number; max: number }> };

export const KEYS = {
  profile: "cetdesk.profile",
  chapters: "cetdesk.chapters",
  activity: "cetdesk.activity",
  attempts: "cetdesk.attempts",
  tasks: "cetdesk.tasks",
};

export const today = () => new Date().toISOString().slice(0, 10);

export function logActivity() {
  const days = read<string[]>(KEYS.activity, []);
  const t = today();
  if (!days.includes(t)) {
    localStorage.setItem(KEYS.activity, JSON.stringify([...days, t]));
    window.dispatchEvent(new CustomEvent(EVT, { detail: KEYS.activity }));
  }
}

export function streakFrom(days: string[]): number {
  const set = new Set(days);
  let n = 0;
  const d = new Date();
  if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  while (set.has(d.toISOString().slice(0, 10))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function daysUntil(date: string): number {
  const ms = new Date(date + "T00:00:00").getTime() - new Date(today() + "T00:00:00").getTime();
  return Math.max(0, Math.round(ms / 86400000));
}
