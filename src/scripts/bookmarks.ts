// src/scripts/bookmarks.ts
// Article bookmarking — localStorage-based "save for later"

import { get, set } from "./storage";

export interface BookmarkEntry {
  title: string;
  href: string;
  img: string;
  tag: string;
  ts: number;
}

const KEY = "bookmarks";
const MAX = 100;

function load(): BookmarkEntry[] {
  return get<BookmarkEntry[]>(KEY) ?? [];
}

export function isBookmarked(href: string): boolean {
  return load().some(e => e.href === href);
}

export function toggle(entry: Omit<BookmarkEntry, "ts">): boolean {
  const list = load();
  const idx = list.findIndex(e => e.href === entry.href);
  if (idx >= 0) {
    list.splice(idx, 1);
    set(KEY, list);
    return false; // removed
  }
  list.unshift({ ...entry, ts: Date.now() });
  if (list.length > MAX) list.length = MAX;
  set(KEY, list);
  return true; // added
}

export function getAll(): BookmarkEntry[] {
  return load();
}

export function getCount(): number {
  return load().length;
}

export function clearAll(): void {
  set(KEY, []);
}
