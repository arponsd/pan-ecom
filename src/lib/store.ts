'use client';

import { useMemo, useSyncExternalStore } from 'react';
import { MAX_QTY, type CartLine } from './catalog';
import type { Lang, PayMethod, Zone } from './data';
import { makeI18n } from './i18n';

export interface PlacedOrder {
  id: string;
  placedAt: string;
  total: number;
  pay: PayMethod;
  phone: string;
  zone: Zone;
  items: CartLine[];
}

interface Persisted {
  lang: Lang;
  cart: CartLine[];
  zone: Zone;
  orders: PlacedOrder[];
  lastOrderId: string | null;
  loggedIn: boolean;
  userPhone: string;
}

export interface ShopState extends Persisted {
  /** False during server render and hydration; true once localStorage has been read. */
  hydrated: boolean;
  toast: string;
  sizeGuideOpen: boolean;
}

const KEY = 'panjabishop_v1';

const defaults: Persisted = {
  lang: 'en',
  cart: [],
  zone: 'in',
  orders: [],
  lastOrderId: null,
  loggedIn: false,
  userPhone: '01711000000',
};

const serverState: ShopState = { ...defaults, hydrated: false, toast: '', sizeGuideOpen: false };

let state: ShopState | null = null;
const listeners = new Set<() => void>();
let toastTimer: ReturnType<typeof setTimeout> | undefined;

function isCartLine(v: unknown): v is CartLine {
  const c = v as CartLine;
  return !!c && Number.isInteger(c.id) && Number.isInteger(c.size) && Number.isInteger(c.qty) && c.qty >= 1;
}

function readStorage(): Partial<Persisted> {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}') as Partial<Persisted>;
    const out: Partial<Persisted> = {};
    if (raw.lang === 'en' || raw.lang === 'bn') out.lang = raw.lang;
    if (raw.zone === 'in' || raw.zone === 'out') out.zone = raw.zone;
    if (Array.isArray(raw.cart)) out.cart = raw.cart.filter(isCartLine).map((c) => ({ ...c, qty: Math.min(c.qty, MAX_QTY) }));
    if (Array.isArray(raw.orders)) out.orders = raw.orders.filter((o) => o && typeof o.id === 'string');
    if (typeof raw.lastOrderId === 'string') out.lastOrderId = raw.lastOrderId;
    if (typeof raw.loggedIn === 'boolean') out.loggedIn = raw.loggedIn;
    if (typeof raw.userPhone === 'string') out.userPhone = raw.userPhone;
    return out;
  } catch {
    return {};
  }
}

function writeStorage(s: ShopState) {
  const { lang, cart, zone, orders, lastOrderId, loggedIn, userPhone } = s;
  try {
    localStorage.setItem(KEY, JSON.stringify({ lang, cart, zone, orders, lastOrderId, loggedIn, userPhone }));
  } catch {
    // Storage can be unavailable (private mode, quota); the shop still works for this visit.
  }
}

function getState(): ShopState {
  if (!state) {
    state = { ...serverState, ...readStorage(), hydrated: true };
    window.addEventListener('storage', (e) => {
      if (e.key !== KEY || !state) return;
      state = { ...state, ...readStorage() };
      listeners.forEach((l) => l());
    });
  }
  return state;
}

function setState(patch: Partial<ShopState> | ((s: ShopState) => Partial<ShopState>)) {
  const cur = getState();
  state = { ...cur, ...(typeof patch === 'function' ? patch(cur) : patch) };
  writeStorage(state);
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useShop(): ShopState {
  return useSyncExternalStore(subscribe, getState, () => serverState);
}

export function useI18n() {
  const { lang } = useShop();
  return useMemo(() => makeI18n(lang), [lang]);
}

export const actions = {
  setLang: (lang: Lang) => setState({ lang }),
  setZone: (zone: Zone) => setState({ zone }),

  addToCart: (id: number, size: number, qty: number) =>
    setState((s) => {
      const idx = s.cart.findIndex((c) => c.id === id && c.size === size);
      if (idx === -1) return { cart: [...s.cart, { id, size, qty: Math.min(qty, MAX_QTY) }] };
      return { cart: s.cart.map((c, i) => (i === idx ? { ...c, qty: Math.min(c.qty + qty, MAX_QTY) } : c)) };
    }),
  setQty: (index: number, qty: number) =>
    setState((s) => ({
      cart: s.cart.map((c, i) => (i === index ? { ...c, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : c)),
    })),
  removeLine: (index: number) => setState((s) => ({ cart: s.cart.filter((_, i) => i !== index) })),

  placeOrder: (order: Omit<PlacedOrder, 'id' | 'placedAt'>): string => {
    const taken = new Set(getState().orders.map((o) => o.id));
    let id: string;
    do id = 'PS-' + (51000 + Math.floor(Math.random() * 8999));
    while (taken.has(id));
    const placed: PlacedOrder = { ...order, id, placedAt: new Date().toISOString() };
    setState((s) => ({ orders: [placed, ...s.orders], lastOrderId: id, cart: [] }));
    return id;
  },

  signIn: (phone: string) => setState({ loggedIn: true, userPhone: phone }),
  signOut: () => setState({ loggedIn: false }),

  openSizeGuide: () => setState({ sizeGuideOpen: true }),
  closeSizeGuide: () => setState({ sizeGuideOpen: false }),

  showToast: (toast: string) => {
    clearTimeout(toastTimer);
    setState({ toast });
    toastTimer = setTimeout(() => setState({ toast: '' }), 2600);
  },
  hideToast: () => {
    clearTimeout(toastTimer);
    setState({ toast: '' });
  },
};
