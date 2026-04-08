// src/scripts/storage.ts
// Unified localStorage manager with "ba_" prefix to avoid collisions

const PREFIX = "ba_";

export function get<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function set(key: string, value: unknown): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // quota exceeded or private mode — silently ignore
  }
}

export function remove(key: string): void {
  localStorage.removeItem(PREFIX + key);
}
