import { T, type Lang } from './data';

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';

export function makeI18n(lang: Lang) {
  const t = T[lang];
  /** Index into [English, Bangla] pairs. */
  const li = lang === 'en' ? 0 : 1;
  const num = (n: number | string) =>
    lang === 'bn' ? String(n).replace(/\d/g, (d) => BN_DIGITS[Number(d)]) : String(n);
  const tk = (n: number) => '৳' + num(n.toLocaleString('en-US'));
  const date = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  return { lang, t, li, num, tk, date };
}

export type I18n = ReturnType<typeof makeI18n>;
