import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import portfolioData from '../data/portfolio.json';

const TIMELINE_ITEMS = [
  {
    period: '2024 → PRESENT',
    phase: 'THE FOUNDATION',
    title: 'B.Tech in Computer Science & Engineering',
    description:
      'Started my Computer Science degree at GPCET, building a solid grounding in algorithms, systems and software design.',
  },
  {
    period: '2025',
    phase: 'FULL-STACK & AI',
    title: 'Building Real-World Systems',
    description:
      'Moved from classroom projects to full-stack applications and AI integrations: computer vision, voice pipelines and cloud backends.',
  },
  {
    period: 'JAN 2026 → FEB 2026',
    phase: 'ROOTED LABS',
    title: 'Software Developer Intern',
    description:
      'Completed an intensive software development internship, shipping production features and working in an engineering team.',
  },
  {
    period: 'FEBRUARY 2026',
    phase: '1ST PLACE WINNER',
    title: 'Syntax2Code Hackathon',
    description:
      'Led a 5-person team to win the Syntax2Code Industry Simulation Hackathon with StakeUp, earning a 6-month internship offer.',
  },
  {
    period: 'JULY 2026 → PRESENT',
    phase: 'RMJ IT SOLUTIONS',
    title: 'Team Lead Intern',
    description:
      'Leading MicroIntern, an AI-powered skill assessment and recruitment platform, as technical lead, from system architecture to AI integration.',
  },
  {
    period: 'JULY 2026 → SEPT 2026',
    phase: 'VENSORA AI',
    title: 'Consultancy Project',
    description:
      'Architected an Enterprise AI Customer Connect Platform with real-time voice (Asterisk, STT/TTS) and LangGraph.',
  },
  {
    period: 'AUGUST 2026 → PRESENT',
    phase: 'SYNC AI',
    title: 'AI Engineer',
    description:
      'Building next-generation intelligent systems and architecting scalable AI pipelines.',
  },
  {
    period: 'SEPTEMBER 2026',
    phase: 'OPEN SOURCE',
    title: 'Upstream Contributor',
    description:
      'Contributed to vLLM (Tensor Parallel MoE collectives, hybrid-model KV cache sizing) and Laya AI (cross-lingual calibration, FastAPI server).',
  },
  {
    period: 'OCTOBER 2026 → PRESENT',
    phase: 'KAIRO TECHNOLOGIES',
    title: 'Founder & CEO',
    description:
      'Founded Kairo Technologies (thekairo.tech) and lead its products: Kairo Cloud OS (thekairo.dev), Kairo Orbit (orbit.thekairo.dev) and PAIR (pair.thekairo.dev).',
  },
];

interface AboutPageProps {
  onBackHome: () => void;
  onOpenContact: () => void;
}

export default function AboutPage({ onBackHome, onOpenContact }: AboutPageProps) {
  const totalCerts = Object.values(portfolioData.certificationsData).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  const summaryStats = [
    { value: 3, label: 'Kairo Products' },
    { value: portfolioData.projects.length, label: 'Projects Built' },
    { value: portfolioData.experience.length, label: 'Roles & Ventures' },
    { value: portfolioData.hackathons.length, label: 'Hackathons' },
    { value: totalCerts, label: 'Certifications' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-screen-xl px-6 pb-32 pt-32 md:px-12 lg:px-24">
        <button
          type="button"
          onClick={onBackHome}
          className="-ml-4 mb-12 inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </button>

        {/* Intro Hero */}
        <section className="pb-20 border-b border-border">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-[14vw] md:text-[9vw] leading-[0.82] font-black tracking-tighter uppercase text-foreground mb-10"
          >
            SAI
            <br />
            DHEERAJ
          </motion.h1>

          <div className="flex flex-wrap gap-8 md:gap-12 text-xs md:text-sm uppercase tracking-[0.2em] font-medium text-muted-foreground border-l border-primary/30 pl-6 md:pl-8">
            <p>
              Founder &amp; CEO
              <br />
              <span className="text-foreground font-bold">Kairo Technologies</span>
            </p>
            <p>
              AI Engineer
              <br />
              <span className="text-foreground font-bold">Full-Stack</span>
            </p>
            <p>
              Based in
              <br />
              <span className="text-foreground font-bold">Kurnool, India</span>
            </p>
          </div>
        </section>

        {/* About Narrative */}
        <section className="py-20 border-b border-border grid gap-12 lg:grid-cols-12 items-start">
          <div className="lg:col-span-4">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-6">
              01 · About Me
            </p>
            <div className="relative aspect-[4/5] w-full max-w-sm rounded-3xl overflow-hidden border border-border bg-neutral-100">
              <img
                src="/about_me_photo.jpg"
                alt="R. Sai Dheeraj"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6 text-lg md:text-2xl font-light tracking-tight text-muted-foreground leading-relaxed">
            <p>
              I&apos;m the{' '}
              <strong className="text-foreground font-semibold">
                Founder &amp; CEO of Kairo Technologies
              </strong>{' '}
              — and an{' '}
              <strong className="text-foreground font-semibold">
                AI Engineer &amp; Full-Stack Developer
              </strong>{' '}
              at heart.
            </p>
            <p>
              I started{' '}
              <strong className="text-foreground font-semibold">
                Kairo Technologies (
                <a
                  href="https://thekairo.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  thekairo.tech
                </a>
                )
              </strong>{' '}
              on a simple belief: what you can build should depend on your vision, not the machine
              you can afford. Our flagship,{' '}
              <strong className="text-foreground font-semibold">
                KAIRO Cloud OS (
                <a
                  href="https://thekairo.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  thekairo.dev
                </a>
                )
              </strong>
              , is a browser-native cloud operating system that puts workstation-grade computing and
              intelligent AI tools within reach of anyone with a browser. Alongside it we build{' '}
              <strong className="text-foreground font-semibold">
                Kairo Orbit (
                <a
                  href="https://orbit.thekairo.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  orbit.thekairo.dev
                </a>
                )
              </strong>
              , which puts your Mac in your pocket, and{' '}
              <strong className="text-foreground font-semibold">
                PAIR (
                <a
                  href="https://pair.thekairo.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-4"
                >
                  pair.thekairo.dev
                </a>
                )
              </strong>
              , a pet matchmaking platform.
            </p>
            <p className="text-base md:text-xl mt-2">
              My favourite work happens beneath the interface —{' '}
              <strong className="text-foreground font-semibold">
                how systems communicate, how cloud runtimes orchestrate workloads, how AI behaves at
                scale, and how every piece comes together into something reliable
              </strong>
              .
            </p>

            <dl className="mt-10 grid grid-cols-2 sm:grid-cols-5 gap-6 border-t border-border pt-8">
              {summaryStats.map((stat) => (
                <div key={stat.label}>
                  <dd className="text-3xl lg:text-5xl font-black tracking-tighter text-foreground tabular-nums">
                    {stat.value.toString().padStart(2, '0')}
                  </dd>
                  <dt className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {stat.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Timeline Journey */}
        <section className="py-20 border-b border-border">
          <div className="mb-14">
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">
              02 · Career Trajectory
            </p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              The Journey
            </h2>
          </div>

          <ol className="relative border-l border-neutral-200 ml-3 space-y-12">
            {TIMELINE_ITEMS.map((item, idx) => (
              <motion.li
                key={item.title + idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
                className="relative pl-8 md:pl-12"
              >
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-neutral-900 ring-4 ring-white" />
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono uppercase tracking-widest text-neutral-400">
                  <span>{item.period}</span>
                  <span>·</span>
                  <span className="text-neutral-900 font-bold">{item.phase}</span>
                </div>
                <h3 className="mt-2 text-2xl md:text-3xl font-black tracking-tight text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm md:text-base leading-relaxed text-neutral-600">
                  {item.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </section>

        {/* Ready to Build CTA */}
        <section className="pt-20 text-center flex flex-col items-center">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted-foreground mb-4">
            03 · What&apos;s Next
          </p>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8">
            Ready to Build
          </h2>
          <p className="max-w-xl text-muted-foreground text-base md:text-lg mb-10">
            Have an ambitious product, AI system, or cloud architecture challenge? Let&apos;s turn
            it into production software.
          </p>
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center gap-3 rounded-full bg-primary px-10 py-5 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:scale-105 cursor-pointer"
          >
            Start a Conversation
            <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      </main>
    </div>
  );
}
