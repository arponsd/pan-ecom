'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { formatPhone, normalisePhone } from '@/lib/catalog';
import { ORDERS } from '@/lib/data';
import { actions, useI18n, useShop } from '@/lib/store';

type Tab = 'orders' | 'addr' | 'profile';

export function AccountView() {
  const { loggedIn, hydrated } = useShop();
  return (
    <section className="mx-auto flex max-w-[1040px] flex-col gap-7 px-[clamp(16px,4vw,40px)] py-[clamp(32px,6vw,64px)]">
      {!hydrated ? <div className="min-h-[50vh]" aria-busy="true" /> : loggedIn ? <Dashboard /> : <SignIn />}
    </section>
  );
}

function SignIn() {
  const { t } = useI18n();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [err, setErr] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const p = normalisePhone(phone);
    if (!p) return setErr(t.errPhone);
    if (!otpSent) {
      setErr('');
      return setOtpSent(true);
    }
    if (!/^\d{6}$/.test(otp)) return setErr(t.errOtp);
    actions.signIn(p);
  };

  return (
    <form noValidate onSubmit={submit} className="mx-auto flex w-full max-w-[440px] flex-col gap-4 rounded-[2px] border border-line bg-paper p-[clamp(24px,4vw,40px)]">
      <h1 className="m-0 font-serif text-[32px] leading-[1.15] font-medium text-maroon-deep">{t.loginTitle}</h1>
      <p className="m-0 text-[15px] leading-normal text-muted">{t.loginSub}</p>
      <label className="field-label">
        {t.phone}
        <input
          className="field bg-white"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setErr('');
          }}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={16}
          placeholder="01XXXXXXXXX"
          readOnly={otpSent}
        />
      </label>
      {otpSent && (
        <label className="field-label">
          {t.otp}
          <input
            className="field bg-white font-mono text-lg font-semibold tracking-[.4em]"
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, '').slice(0, 6));
              setErr('');
            }}
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="••••••"
            autoFocus
          />
          <span className="text-xs font-normal">{t.otpHint}</span>
        </label>
      )}
      {err && (
        <div role="alert" className="text-[13px] leading-[1.4] font-medium text-danger">
          {err}
        </div>
      )}
      <button type="submit" className="btn-primary px-5 py-[15px]">
        {otpSent ? t.verify : t.sendCode}
      </button>
    </form>
  );
}

function Dashboard() {
  const { orders: placed, userPhone } = useShop();
  const { lang, t, li, num, tk, date } = useI18n();
  const [tab, setTab] = useState<Tab>('orders');

  const today = new Date().toDateString();
  const orders = [
    ...placed.map((o) => ({
      id: o.id,
      date: new Date(o.placedAt).toDateString() === today ? t.today : date(o.placedAt),
      total: o.total,
      status: 1 as const,
      phone: o.phone,
    })),
    ...ORDERS.map((o) => ({ ...o, date: o.date[li] })),
  ];
  const phoneText = num(formatPhone(userPhone));
  const tabs: [Tab, string][] = [
    ['orders', t.tabOrders],
    ['addr', t.tabAddr],
    ['profile', t.tabProfile],
  ];
  const addresses = [
    {
      label: t.home,
      isDefault: true,
      line: lang === 'en' ? 'House 12, Road 5, Dhanmondi, Dhaka 1205' : 'বাসা ১২, রোড ৫, ধানমন্ডি, ঢাকা ১২০৫',
    },
    {
      label: t.office,
      isDefault: false,
      line: lang === 'en' ? 'Level 4, 22 Kemal Ataturk Avenue, Banani, Dhaka 1213' : 'লেভেল ৪, ২২ কামাল আতাতুর্ক অ্যাভিনিউ, বনানী, ঢাকা ১২১৩',
    },
  ];
  const label = 'text-xs leading-none text-muted';

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="text-[15px] leading-none text-muted">{t.hi}</div>
          <h1 className="m-0 font-serif text-[clamp(32px,5vw,46px)] leading-[1.1] font-medium text-maroon-deep">{t.userName}</h1>
        </div>
        <button type="button" onClick={actions.signOut} className="py-2 text-sm leading-none font-medium text-muted underline underline-offset-[3px] hover:text-maroon">
          {t.signOut}
        </button>
      </div>

      <div role="tablist" className="flex flex-wrap gap-7 border-b border-line">
        {tabs.map(([k, l]) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={`border-b-2 py-3 text-[15px] leading-none font-semibold whitespace-nowrap ${
              tab === k ? 'border-maroon text-maroon' : 'border-transparent text-muted hover:text-maroon'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === 'orders' && (
        <div role="tabpanel" className="flex flex-col gap-3">
          {orders.map((o) => (
            <div key={o.id} className="flex flex-wrap items-center justify-between gap-x-7 gap-y-3.5 rounded-[2px] border border-line bg-paper px-5 py-[18px]">
              <div className="flex flex-wrap gap-x-8 gap-y-3.5">
                <div className="flex flex-col gap-1">
                  <span className={label}>{t.orderId}</span>
                  <span className="font-mono text-[15px] leading-[1.2] font-semibold">{o.id}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className={label}>{t.date}</span>
                  <span className="text-[15px] leading-[1.2] font-medium">{o.date}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className={label}>{t.total}</span>
                  <span className="text-[15px] leading-[1.2] font-semibold">{tk(o.total)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className={label}>{t.status}</span>
                  <span className={`text-[15px] leading-[1.2] font-semibold ${o.status === 4 ? 'text-success' : 'text-maroon'}`}>{t[`st${o.status}`]}</span>
                </div>
              </div>
              <Link href={`/track?id=${o.id}&phone=${o.phone}`} className="btn-outline px-[18px] py-[11px] text-sm">
                {t.track}
              </Link>
            </div>
          ))}
        </div>
      )}

      {tab === 'addr' && (
        <div role="tabpanel" className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-3.5">
          {addresses.map((a) => (
            <div key={a.label} className="flex flex-col gap-2 rounded-[2px] border border-line bg-paper p-5">
              <div className="flex items-center justify-between gap-2.5">
                <span className="text-[15px] leading-[1.2] font-semibold">{a.label}</span>
                {a.isDefault && (
                  <span className="rounded-full border border-maroon px-2 py-1 text-[11px] leading-none font-semibold tracking-[.08em] text-maroon uppercase">
                    {t.defaultAddr}
                  </span>
                )}
              </div>
              <div className="text-sm leading-[1.55] text-muted">{a.line}</div>
              <div className="text-sm leading-[1.4] text-muted">{phoneText}</div>
            </div>
          ))}
        </div>
      )}

      {tab === 'profile' && (
        <div role="tabpanel" className="flex max-w-[520px] flex-col gap-3.5">
          {[
            [t.name, t.userName],
            [t.phone, phoneText],
            [t.usualSize, num(42)],
          ].map(([l, v]) => (
            <label key={l} className="field-label">
              {l}
              <input className="field" value={v} readOnly />
            </label>
          ))}
        </div>
      )}
    </>
  );
}
