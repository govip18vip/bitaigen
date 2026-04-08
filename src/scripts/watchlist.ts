// src/scripts/watchlist.ts
// Crypto watchlist — localStorage-based coin favorites

import { get, set } from "./storage";

interface WatchlistData {
  coins: string[];
  lastVisit: number;
  lastPrices: Record<string, number>;
}

const KEY = "watchlist";

function load(): WatchlistData {
  return get<WatchlistData>(KEY) ?? { coins: [], lastVisit: 0, lastPrices: {} };
}

function save(data: WatchlistData): void {
  set(KEY, data);
}

export function getCoins(): string[] {
  return load().coins;
}

export function isWatched(symbol: string): boolean {
  return load().coins.includes(symbol.toUpperCase());
}

export function toggle(symbol: string): boolean {
  const s = symbol.toUpperCase();
  const data = load();
  const idx = data.coins.indexOf(s);
  if (idx >= 0) {
    data.coins.splice(idx, 1);
    delete data.lastPrices[s];
    save(data);
    return false; // removed
  }
  data.coins.push(s);
  save(data);
  return true; // added
}

export function getLastPrices(): Record<string, number> {
  return load().lastPrices;
}

export function updateLastPrices(prices: Record<string, number>): void {
  const data = load();
  for (const [sym, price] of Object.entries(prices)) {
    if (data.coins.includes(sym.toUpperCase())) {
      data.lastPrices[sym.toUpperCase()] = price;
    }
  }
  data.lastVisit = Date.now();
  save(data);
}

export function getLastVisit(): number {
  return load().lastVisit;
}
