import React from 'react';
import { ArrowUpRight, Globe, Mail, MapPin, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import PageHeader, { chipClass, eyebrowClass, fadeUp } from '../components/PageHeader';
import portfolioData from '../data/portfolio.json';
import { computeExperienceStats, ExperienceItem } from '../utils/portfolioLogic';

function formatHost(url: string) {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

export default function ExperiencePage({ onBackHome }: { onBackHome: () => void }) {
  const experience = portfolioData.experience as ExperienceItem[];
  const stats = computeExperienceStats(experience);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <main className="mx-auto max-w-screen-xl px-6 pb-32 pt-32 md:px-12 lg:px-24">
        <PageHeader
          eyebrow="Career & Leadership"
          title="Experience"
          lede="Founding Kairo Technologies, leading engineering teams, and architecting production AI and cloud systems."
          stats={stats}
          onBackHome={onBackHome}
        />

        <ol className="mt-12">
          {experience.map((item, idx) => {
            const isFounder = /founder/i.test(item.role);
            const rec = item.recommendation;
            const websiteHref = item.website
              ? item.website.startsWith('http')
                ? item.website
                : `https://${item.website}`
              : undefined;

            return (
              <motion.li
                key={item.company + item.role}
                {...fadeUp}
                className="grid gap-8 border-b border-neutral-200 py-14 md:grid-cols-12 md:gap-12 md:py-20"
              >
                <div className="md:col-span-4">
                  <span className="font-mono text-xs text-neutral-400 tabular-nums">
                    {(idx + 1).toString().padStart(2, '0')} · {item.duration}
                  </span>
                  <h2 className="mt-3 text-3xl font-black uppercase tracking-tight md:text-4xl">
                    {item.company}
                  </h2>
                  <p className="mt-2 text-lg font-semibold text-neutral-700">{item.role}</p>

                  {item.location && (
                    <p className="mt-4 flex items-center gap-2 text-xs font-mono text-neutral-500">
                      <MapPin className="h-3.5 w-3.5" />
                      {item.location}
                    </p>
                  )}

                  <div className="mt-6 flex flex-wrap gap-2">
                    {websiteHref && item.website && (
                      <a
                        href={websiteHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 font-mono text-xs text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900"
                      >
                        <Globe className="h-3 w-3" /> {formatHost(item.website)}
                      </a>
                    )}
                    {item.officialEmail && (
                      <a
                        href={`mailto:${item.officialEmail}`}
                        className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-3 py-1.5 font-mono text-xs text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900"
                      >
                        <Mail className="h-3 w-3" /> {item.officialEmail}
                      </a>
                    )}
                  </div>
                </div>

                <div className="md:col-span-8">
                  <p className="max-w-3xl text-lg leading-relaxed text-neutral-700 md:text-xl">
                    {item.description}
                  </p>

                  <div className="mt-10 grid gap-10 lg:grid-cols-5">
                    {Boolean(item.responsibilities?.length) && (
                      <section className="lg:col-span-3">
                        <h3 className={`mb-4 ${eyebrowClass}`}>What I Did</h3>
                        <ul className="space-y-3">
                          {item.responsibilities!.map((resp) => (
                            <li key={resp} className="flex gap-3 text-sm leading-relaxed text-neutral-600">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {Boolean(item.skills?.length) && (
                      <section className="lg:col-span-2">
                        <h3 className={`mb-4 ${eyebrowClass}`}>Key Areas</h3>
                        <ul className="flex flex-wrap gap-2">
                          {item.skills!.map((skill) => (
                            <li key={skill} className={chipClass}>
                              {skill}
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}
                  </div>

                  {rec && (
                    <figure className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <p className={eyebrowClass}>
                          {isFounder ? "Founder's Note" : 'Recommendation'}
                        </p>
                        {rec.letterUrl && (
                          <a
                            href={rec.letterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-500 transition-colors hover:text-neutral-900"
                          >
                            {isFounder ? 'Read more' : 'View letter'}{' '}
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <blockquote className="mt-4 flex gap-4">
                        <Quote className="h-6 w-6 shrink-0 fill-neutral-200 text-neutral-200" />
                        <p className="text-base leading-relaxed text-neutral-700 md:text-lg">
                          {rec.quote}
                        </p>
                      </blockquote>
                      <figcaption className="mt-6 border-t border-neutral-200 pt-4 pl-10">
                        <span className="block text-sm font-bold">{rec.author}</span>
                        <span className="block text-xs text-neutral-500">{rec.title}</span>
                      </figcaption>
                    </figure>
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
