import React from 'react';
import { Calendar, Clock, MapPin, Shield, Users } from 'lucide-react';
import { motion } from 'motion/react';
import PageHeader, { chipClass, eyebrowClass, fadeUp } from '../components/PageHeader';
import portfolioData from '../data/portfolio.json';
import {
  cleanAchievementLabel,
  computeHackathonStats,
  HackathonItem,
  parseHackathonPlace,
} from '../utils/portfolioLogic';

function MedalSvg({ place }: { place: number }) {
  const palette =
    place === 1
      ? { ring: '#b8902f', fill: '#e9cf7e', ink: '#5a430f', label: 'Gold' }
      : place === 2
        ? { ring: '#8d9297', fill: '#d9dcdf', ink: '#3d4145', label: 'Silver' }
        : { ring: '#9a5b2e', fill: '#d9a172', ink: '#4e2a10', label: 'Bronze' };

  return (
    <svg
      viewBox="0 0 120 150"
      className="h-full w-full"
      role="img"
      aria-label={`${palette.label} medal`}
    >
      <path d="M38 0 L60 52 L82 0 Z" fill="#1d2840" opacity="0.9" />
      <path d="M48 0 L60 30 L72 0 Z" fill="#b5442c" />
      <circle cx="60" cy="96" r="46" fill={palette.fill} stroke={palette.ring} strokeWidth="5" />
      <circle
        cx="60"
        cy="96"
        r="36"
        fill="none"
        stroke={palette.ring}
        strokeWidth="1.5"
        strokeDasharray="2 4"
      />
      <text
        x="60"
        y="110"
        textAnchor="middle"
        fontSize="40"
        fontWeight="700"
        fill={palette.ink}
        fontFamily="Georgia, serif"
      >
        {place || '★'}
      </text>
    </svg>
  );
}

const PLACE_RING_CLASS: Record<number, string> = {
  1: 'bg-amber-50 text-amber-800 ring-amber-200',
  2: 'bg-slate-100 text-slate-700 ring-slate-200',
  3: 'bg-orange-50 text-orange-800 ring-orange-200',
};

export default function HackathonsPage({ onBackHome }: { onBackHome: () => void }) {
  const hackathons = portfolioData.hackathons as HackathonItem[];
  const stats = computeHackathonStats(hackathons);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <main className="mx-auto max-w-screen-xl px-6 pb-32 pt-32 md:px-12 lg:px-24">
        <PageHeader
          eyebrow="Competition Record"
          title="Hackathons"
          lede="Time-boxed builds under pressure: designing the architecture, leading the team and shipping a working product before the clock runs out."
          stats={stats}
          onBackHome={onBackHome}
        />

        <ol className="mt-4">
          {hackathons.map((item, idx) => {
            const place = parseHackathonPlace(item.achievement);
            const metaItems = [
              item.role && { Icon: Shield, text: item.role },
              item.team && { Icon: Users, text: item.team },
              item.timeframe && { Icon: Clock, text: item.timeframe },
            ].filter(Boolean) as {
              Icon: React.ComponentType<{ className?: string }>;
              text: string;
            }[];

            return (
              <motion.li
                key={item.title}
                {...fadeUp}
                className="grid gap-8 border-b border-neutral-200 py-14 md:grid-cols-12 md:gap-12 md:py-20"
              >
                <aside className="flex items-start gap-5 md:col-span-3 md:flex-col md:gap-6">
                  <div className="h-20 w-16 shrink-0 md:h-28 md:w-[5.5rem]">
                    <MedalSvg place={place} />
                  </div>
                  <div className="space-y-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-widest ring-1 ring-inset ${
                        PLACE_RING_CLASS[place] ?? 'bg-neutral-100 text-neutral-700 ring-neutral-200'
                      }`}
                    >
                      {cleanAchievementLabel(item.achievement)}
                    </span>
                    <p className="flex items-center gap-2 font-mono text-xs text-neutral-500">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.date}
                    </p>
                    <p className="flex items-start gap-2 text-xs leading-relaxed text-neutral-500">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      {item.institution}
                    </p>
                  </div>
                </aside>

                <div className="md:col-span-9">
                  <span className="font-mono text-xs text-neutral-300 tabular-nums">
                    {(idx + 1).toString().padStart(2, '0')} /{' '}
                    {hackathons.length.toString().padStart(2, '0')}
                  </span>
                  <h2 className="mt-2 text-3xl font-black uppercase leading-[0.95] tracking-tight md:text-5xl">
                    {item.title}
                  </h2>

                  {metaItems.length > 0 && (
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
                      {metaItems.map(({ Icon, text }) => (
                        <li
                          key={text}
                          className="flex items-center gap-2 text-sm font-medium text-neutral-600"
                        >
                          <Icon className="h-4 w-4 text-neutral-500" />
                          {text}
                        </li>
                      ))}
                    </ul>
                  )}

                  {item.project && (
                    <div className="mt-8 rounded-2xl bg-neutral-950 px-6 py-5 text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/50">
                        Project Built
                      </p>
                      <p className="mt-1 text-lg font-bold md:text-xl">{item.project}</p>
                    </div>
                  )}

                  <p className="mt-8 max-w-3xl text-lg leading-relaxed text-neutral-700 md:text-xl">
                    {item.description}
                  </p>

                  {Boolean(item.contributions?.length || item.technologies?.length) && (
                    <div className="mt-10 grid gap-10 lg:grid-cols-5">
                      {Boolean(item.contributions?.length) && (
                        <section
                          className={
                            item.technologies?.length ? 'lg:col-span-3' : 'lg:col-span-5'
                          }
                        >
                          <h3 className={`mb-4 ${eyebrowClass}`}>Key Contributions</h3>
                          <ul
                            className={`grid gap-x-8 gap-y-3 ${
                              item.technologies?.length ? '' : 'sm:grid-cols-2'
                            }`}
                          >
                            {item.contributions!.map((contrib) => (
                              <li
                                key={contrib}
                                className="flex gap-3 text-sm leading-relaxed text-neutral-600"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
                                {contrib}
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}

                      {Boolean(item.technologies?.length) && (
                        <section className="lg:col-span-2">
                          <h3 className={`mb-4 ${eyebrowClass}`}>Tech Stack</h3>
                          <ul className="flex flex-wrap gap-2">
                            {item.technologies!.map((tech) => (
                              <li key={tech} className={chipClass}>
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </section>
                      )}
                    </div>
                  )}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </main>
    </div>
  );
}
