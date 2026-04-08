// src/scripts/reading-history.ts
// Records article visits in localStorage for "Recently Read" feature

import { get, set } from "./storage";

export interface HistoryEntry {
  title: string;
  href: string;
  img: string;
  ts: number;
}

const KEY = "history";
const MAX_ENTRIES = 30;

function load(): HistoryEntry[] {
  return get<HistoryEntry[]>(KEY) ?? [];
}

export function recordVisit(entry: Omit<HistoryEntry, "ts">): void {
  const list = load();
  // Remove duplicate if exists
  const filtered = list.filter(e => e.href !== entry.href);
  // Prepend new entry
  filtered.unshift({ ...entry, ts: Date.now() });
  // Cap at MAX_ENTRIES
  if (filtered.length > MAX_ENTRIES) filtered.length = MAX_ENTRIES;
  set(KEY, filtered);
}

export function getHistory(limit = 5): HistoryEntry[] {
  return load().slice(0, limit);
}

export function clearHistory(): void {
  set(KEY, []);
}
