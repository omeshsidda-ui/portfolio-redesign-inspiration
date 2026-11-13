import React from 'react';
import { ArrowUpRight, Award, Github, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import PageHeader, { chipClass, eyebrowClass, fadeUp } from '../components/PageHeader';
import portfolioData from '../data/portfolio.json';
import {
  computeProjectStats,
  isValidExternalHref,
  parseProjectDetails,
  ProjectItem,
  ProjectLinks,
  slugifyTitle,
} from '../utils/portfolioLogic';

function ProjectLinkButtons({ links, compact = false }: { links?: ProjectLinks; compact?: boolean }) {
  const items = [
    isValidExternalHref(links?.live) && { href: links!.live!, label: 'Live', Icon: ArrowUpRight },
    isValidExternalHref(links?.github) && { href: links!.github!, label: 'Source', Icon: Github },
    isValidExternalHref(links?.company) && { href: links!.company!, label: 'Company', Icon: Globe },
  ].filter(Boolean) as { href: string; label: string; Icon: React.ComponentType<{ className?: string }> }[];

  if (!items.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map(({ href, label, Icon }, idx) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            idx !== 0 || compact
              ? 'inline-flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2 text-xs font-bold uppercase tracking-widest text-neutral-700 transition-colors hover:border-neutral-900 hover:text-neutral-900'
              : 'inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800'
          }
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </a>
      ))}
    </div>
  );
}

export default function ProjectsPage({ onBackHome }: { onBackHome: () => void }) {
  const projects = portfolioData.projects as ProjectItem[];
  const featured = projects.filter((p) => p.category === 'Featured');
  const moreProjects = projects.filter((p) => p.category !== 'Featured');
  const stats = computeProjectStats(projects);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <main className="mx-auto max-w-screen-xl px-6 pb-32 pt-32 md:px-12 lg:px-24">
        <PageHeader
          eyebrow="Selected Works"
          title="Projects"
          lede="Production-minded builds across AI, computer vision, real-time systems and full-stack platforms. Each one starts with a real problem."
          stats={stats}
          onBackHome={onBackHome}
        />

        <section className="mt-20">
          <h2 className={eyebrowClass}>Featured</h2>
          <ol>
            {featured.map((project, idx) => {
              const { award, highlights } = parseProjectDetails(project.details);
              return (
                <motion.li
                  key={project.title}
                  id={slugifyTitle(project.title)}
                  {...fadeUp}
                  className="scroll-mt-24 grid gap-10 border-b border-neutral-200 py-14 md:py-20 lg:grid-cols-12 lg:gap-16"
                >
                  <div className="lg:col-span-5">
                    <span className="font-mono text-xs text-neutral-300 tabular-nums">
                      {(idx + 1).toString().padStart(2, '0')} /{' '}
                      {featured.length.toString().padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
                      {project.title}
                    </h3>
                    <p className="mt-4 text-lg font-medium text-neutral-600 md:text-xl">
                      {project.description}
                    </p>

                    {award && (
                      <p className="mt-6 inline-flex items-start gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900 ring-1 ring-inset ring-amber-200">
                        <Award className="mt-0.5 h-4 w-4 shrink-0" />
                        {award}
                      </p>
                    )}

                    {Boolean(project.tags?.length) && (
                      <ul className="mt-8 flex flex-wrap gap-2">
                        {project.tags!.map((tag) => (
                          <li key={tag} className={chipClass}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-8">
                      <ProjectLinkButtons links={project.links} />
                    </div>
                  </div>

                  <div className="lg:col-span-7">
                    <div className="grid gap-8 sm:grid-cols-2">
                      {project.problemStatement && (
                        <div>
                          <h4 className={`mb-2 ${eyebrowClass}`}>The Problem</h4>
                          <p className="text-sm leading-relaxed text-neutral-600">
                            {project.problemStatement}
                          </p>
                        </div>
                      )}
                      {project.motivation && (
                        <div>
                          <h4 className={`mb-2 ${eyebrowClass}`}>The Approach</h4>
                          <p className="text-sm leading-relaxed text-neutral-600">
                            {project.motivation}
                          </p>
                        </div>
                      )}
                    </div>

                    {Boolean(highlights.length) && (
                      <div className="mt-10 rounded-2xl border border-neutral-200 p-6 md:p-8">
                        <h4 className={`mb-5 ${eyebrowClass}`}>Highlights</h4>
                        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
                          {highlights.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-relaxed text-neutral-700">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-900" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </section>

        {Boolean(moreProjects.length) && (
          <section className="mt-24">
            <div className="mb-8 flex items-end justify-between border-b border-neutral-200 pb-4">
              <h2 className="text-2xl font-black uppercase tracking-tight md:text-4xl">
                More Projects
              </h2>
              <span className={eyebrowClass}>{moreProjects.length} builds</span>
            </div>

            <ul className="grid gap-6 md:grid-cols-2">
              {moreProjects.map((project) => {
                const { highlights } = parseProjectDetails(project.details);
                return (
                  <motion.li
                    key={project.title}
                    id={slugifyTitle(project.title)}
                    {...fadeUp}
                    className="scroll-mt-24 flex flex-col rounded-2xl border border-neutral-200 p-6 transition-shadow hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)] md:p-8"
                  >
                    <h3 className="text-2xl font-black tracking-tight md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mt-1 font-medium text-neutral-600">{project.description}</p>

                    {Boolean(highlights.length) && (
                      <ul className="mt-5 space-y-2">
                        {highlights.slice(0, 3).map((item) => (
                          <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-neutral-600">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-400" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}

                    {Boolean(project.tags?.length) && (
                      <ul className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-neutral-100">
                        {project.tags!.map((tag) => (
                          <li key={tag} className={chipClass}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-6 pt-2">
                      <ProjectLinkButtons links={project.links} compact />
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
