import React from 'react';
import { ArrowUpRight, GitCommit, Github } from 'lucide-react';
import { motion } from 'motion/react';
import PageHeader, { chipClass, eyebrowClass, fadeUp } from '../components/PageHeader';
import portfolioData from '../data/portfolio.json';
import {
  computeOpenSourceStats,
  OpenSourceProject,
  resolveGitHubReferenceLinks,
} from '../utils/portfolioLogic';

function GitHubRefDisplay({ text, repo }: { text: string; repo?: string }) {
  const segments = resolveGitHubReferenceLinks(text, repo);
  return (
    <>
      {segments.map((seg, idx) =>
        seg.type === 'link' && seg.href ? (
          <a
            key={idx}
            href={seg.href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-neutral-400 underline-offset-2 transition-colors hover:text-neutral-950 hover:decoration-neutral-950"
          >
            {seg.text}
          </a>
        ) : (
          <span key={idx}>{seg.text}</span>
        )
      )}
    </>
  );
}

export default function OpenSourcePage({ onBackHome }: { onBackHome: () => void }) {
  const openSource = portfolioData.openSource as OpenSourceProject[];
  const stats = computeOpenSourceStats(openSource);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <main className="mx-auto max-w-screen-xl px-6 pb-32 pt-32 md:px-12 lg:px-24">
        <PageHeader
          eyebrow="Upstream Contributions"
          title="Open Source"
          lede="Merged pull requests, compiler optimizations and core routing improvements in production open-source AI infrastructure."
          stats={stats}
          onBackHome={onBackHome}
        />

        <div className="mt-16 divide-y divide-neutral-200">
          {openSource.map((item, projectIdx) => {
            const repoUrl = item.links?.github;
            return (
              <section
                key={item.project}
                className="grid gap-12 py-16 md:py-24 lg:grid-cols-12 lg:gap-16"
              >
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-28">
                    <span className="font-mono text-xs text-neutral-400">
                      0{projectIdx + 1} · {item.role} · {item.duration}
                    </span>
                    <h2 className="mt-3 text-4xl font-black uppercase tracking-tight md:text-5xl">
                      {item.project}
                    </h2>
                    <p className="mt-3 text-lg font-medium text-neutral-700">{item.description}</p>
                    <p className="mt-4 text-sm leading-relaxed text-neutral-500">{item.details}</p>

                    {Boolean(item.tags?.length) && (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {item.tags!.map((tag) => (
                          <li key={tag} className={chipClass}>
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}

                    {repoUrl && (
                      <div className="mt-8">
                        <a
                          href={repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-neutral-800"
                        >
                          <Github className="h-4 w-4" />
                          View Repository
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                <ol className="space-y-8 lg:col-span-8">
                  {(item.contributions ?? []).map((contrib, cIdx) => (
                    <motion.li
                      key={contrib.title}
                      {...fadeUp}
                      className="rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.25)] md:p-10"
                    >
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-mono text-xs text-neutral-500">
                          {String.fromCharCode(65 + projectIdx)}.{cIdx + 1}
                        </span>
                        <span className="rounded-full bg-neutral-900/5 px-3 py-1 font-mono text-xs text-neutral-700">
                          <GitHubRefDisplay text={contrib.issue} repo={repoUrl} />
                        </span>
                      </div>

                      <h3 className="mt-4 text-2xl font-black tracking-tight md:text-3xl">
                        {contrib.title}
                      </h3>

                      <div className="mt-8 grid gap-8 md:grid-cols-2">
                        <div className="md:col-span-2">
                          <h4 className={`mb-2 ${eyebrowClass}`}>What I Built</h4>
                          <p className="leading-relaxed text-neutral-800">{contrib.whatIDid}</p>
                        </div>

                        <div className="border-t border-neutral-200 pt-6">
                          <h4 className={`mb-2 ${eyebrowClass}`}>The Problem</h4>
                          <p className="text-sm leading-relaxed text-neutral-600">
                            {contrib.whyIDidIt}
                          </p>
                        </div>

                        <div className="border-t border-neutral-200 pt-6">
                          <h4 className={`mb-2 ${eyebrowClass}`}>Technical Rationale</h4>
                          <p className="text-sm leading-relaxed text-neutral-600">
                            {contrib.whyIChooseThis}
                          </p>
                        </div>
                      </div>

                      {Boolean(contrib.commits?.length) && (
                        <ul className="mt-8 divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-neutral-50">
                          {contrib.commits!.map((commit) => (
                            <li
                              key={commit.id + commit.message}
                              className="flex flex-col gap-1 px-4 py-3 font-mono text-xs sm:flex-row sm:items-center sm:gap-4"
                            >
                              <span className="flex shrink-0 items-center gap-2 font-semibold text-neutral-900">
                                <GitCommit className="h-4 w-4 text-neutral-500" />
                                <span>
                                  <GitHubRefDisplay text={commit.id} repo={repoUrl} />
                                </span>
                              </span>
                              <span className="min-w-0 break-words text-neutral-600">
                                {commit.message}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
