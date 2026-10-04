import { ADULT, FEE, KIDS, PRODUCTS, type Category, type Product, type Zone } from './data';

export const MAX_QTY = 10;

export interface CartLine {
  id: number;
  size: number;
  qty: number;
}

export function getProduct(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function sizesFor(p: Product): number[] {
  return p.cat === 'kids' ? KIDS : ADULT;
}

export function isCategory(v: string | null | undefined): v is Category {
  return v === 'all' || v === 'everyday' || v === 'eid' || v === 'printed' || v === 'kids';
}

/** True when a hex colour is dark enough to need light text on top of it. */
export function isDark(hex: string): boolean {
  const n = parseInt(hex.slice(1), 16);
  return 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255) < 140;
}

export function inkFor(hex: string): string {
  return isDark(hex) ? '#F5EDE0' : '#2A1A14';
}

export function relatedProducts(p: Product, count = 4): Product[] {
  const others = PRODUCTS.filter((x) => x.id !== p.id);
  return [...others.filter((x) => x.cat === p.cat), ...others.filter((x) => x.cat !== p.cat)].slice(0, count);
}

export type SortKey = 'pop' | 'low' | 'high';

export function filterProducts(opts: { cat: Category; q: string; size: string; sort: SortKey }): Product[] {
  let list = PRODUCTS.filter((p) => opts.cat === 'all' || p.cat === opts.cat);
  const q = opts.q.trim().toLowerCase();
  if (q) {
    list = list.filter(
      (p) =>
        p.en.toLowerCase().includes(q) ||
        p.bn.includes(q) ||
        p.col.some((c) => c.toLowerCase().includes(q)) ||
        p.fab.includes(q),
    );
  }
  if (opts.size !== 'any') {
    const z = Number(opts.size);
    list = list.filter((p) => sizesFor(p).includes(z));
  }
  if (opts.sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
  if (opts.sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
  return list;
}

export function cartTotals(cart: CartLine[], zone: Zone) {
  const count = cart.reduce((a, c) => a + c.qty, 0);
  const subtotal = cart.reduce((a, c) => a + (getProduct(c.id)?.price ?? 0) * c.qty, 0);
  const fee = FEE[zone];
  return { count, subtotal, fee, total: subtotal + fee };
}

/** Normalises a Bangladeshi mobile number to 11 digits (01XXXXXXXXX), or null if invalid. */
export function normalisePhone(input: string): string | null {
  let d = input.replace(/\D/g, '');
  if (d.startsWith('880')) d = d.slice(2);
  return /^01\d{9}$/.test(d) ? d : null;
}

export function formatPhone(d: string): string {
  return d.length === 11 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}
