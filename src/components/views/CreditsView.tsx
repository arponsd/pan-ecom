'use client';

import Image from 'next/image';
import { pageTitle } from '@/components/OrderParts';
import { ALL_PHOTOS } from '@/lib/photos';
import { useI18n } from '@/lib/store';

export function CreditsView() {
  const { t } = useI18n();
  return (
    <section className="mx-auto flex max-w-[860px] flex-col gap-6 px-[clamp(16px,4vw,40px)] py-[clamp(32px,6vw,64px)]">
      <div className="flex flex-col gap-2.5">
        <h1 className={pageTitle}>{t.credits}</h1>
        <p className="m-0 text-[15px] leading-[1.55] text-muted">{t.creditsSub}</p>
      </div>
      <ul className="m-0 flex list-none flex-col border-t border-line p-0">
        {ALL_PHOTOS.map(({ src, credit }) => (
          <li key={src} className="flex items-center gap-4 border-b border-line py-4">
            <div className="relative aspect-[3/4] w-14 flex-none overflow-hidden rounded-[2px] bg-line">
              <Image src={src} alt="" fill sizes="56px" className="object-cover" />
            </div>
            <div className="flex min-w-0 flex-col gap-1 text-sm leading-[1.4]">
              <div className="font-semibold">“{credit.title}”</div>
              <div className="text-muted">{credit.author}</div>
              <div className="flex flex-wrap gap-x-4 gap-y-1">
                <a href={credit.licenseUrl} target="_blank" rel="noopener noreferrer license" className="link font-medium">
                  {t.creditsLicense}: {credit.license}
                </a>
                <a href={credit.sourceUrl} target="_blank" rel="noopener noreferrer" className="link font-medium">
                  {t.creditsSource}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
