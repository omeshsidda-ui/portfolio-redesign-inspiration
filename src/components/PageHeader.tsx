import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const eyebrowClass = 'text-[10px] font-black uppercase tracking-[0.25em] text-neutral-400';
export const chipClass =
  'rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 font-mono text-xs text-neutral-700';

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
};

interface StatItem {
  label: string;
  value: number | string;
}

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  lede: string;
  stats: StatItem[];
  onBackHome: () => void;
}

export default function PageHeader({ eyebrow, title, lede, stats, onBackHome }: PageHeaderProps) {
  return (
    <>
      <button
        type="button"
        onClick={onBackHome}
        className="-ml-4 mb-12 inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors cursor-pointer"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </button>

      <header className="flex flex-col gap-8">
        <div>
          <p className="mb-4 text-xs font-black uppercase tracking-[0.3em] text-neutral-400">
            {eyebrow}
          </p>
          <h1 className="text-[14vw] font-black uppercase leading-[0.85] tracking-tighter md:text-[8vw] xl:text-[7.5rem]">
            {title}
          </h1>
        </div>
        <p className="max-w-2xl text-base font-medium leading-relaxed text-neutral-500 md:text-lg">
          {lede}
        </p>
      </header>

      <dl className="mt-14 grid grid-cols-2 gap-px border-y border-neutral-200 bg-neutral-200 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white px-4 py-6 md:px-6">
            <dt className={eyebrowClass}>{stat.label}</dt>
            <dd className="mt-2 text-4xl font-black tabular-nums tracking-tight md:text-5xl">
              {stat.value.toString().padStart(2, '0')}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
