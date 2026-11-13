import React, { useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  GitPullRequest,
  Instagram,
  Linkedin,
  X as CloseIcon,
} from 'lucide-react';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import techStackRaw from '../data/techStack.json';
import { filterFeaturedStackTools, ToolItem } from '../utils/portfolioLogic';

function XBrandIcon({ className = 'h-3 w-3' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const KAIRO_PRODUCTS = [
  {
    name: 'Kairo Cloud OS',
    url: 'https://thekairo.dev',
    host: 'thekairo.dev',
    logo: '/kairo/kairo-logo-mark.png',
    tagline: 'A cloud computer in your browser',
    description:
      'A browser-native cloud operating system with windows, a terminal, a code editor and persistent workspaces. Heavy compute runs in the cloud, not on your machine.',
  },
  {
    name: 'Kairo Orbit',
    url: 'https://orbit.thekairo.dev',
    host: 'orbit.thekairo.dev',
    logo: '/kairo/orbit-mark.png',
    tagline: 'Your Mac. Anywhere.',
    description:
      'Use your Mac from iPhone or Android: open apps, manage files, run code and commands, and hand tasks to an AI operator, from anywhere.',
  },
  {
    name: 'PAIR',
    url: 'https://pair.thekairo.dev',
    host: 'pair.thekairo.dev',
    logo: '/kairo/pair-mark.png',
    tagline: 'Better matches. Happier companions.',
    description:
      'Pet matchmaking and compatibility for dogs, cats, rabbits, birds and small pets, with pet profiles, preference-based matching and local discovery.',
  },
];

const STACK_DESCRIPTIONS: Record<string, string> = {
  'Next.js':
    'We chose Next.js 16 (App Router) for its robust server-side rendering capabilities, ensuring lightning-fast initial loads and superior SEO performance for the portfolio.',
  React:
    'React 19 serves as the foundational library, enabling a modular component architecture that makes the codebase maintainable and the UI highly interactive.',
  TypeScript:
    "TypeScript provides strict type safety, catching errors at compile-time and ensuring the application's logic is robust and self-documenting.",
  'Tailwind CSS':
    'Used for rapid, utility-first styling. It allowed us to create a completely custom design system with complex animations without fighting the stylesheet.',
  'Framer Motion':
    "Powers the fluid page transitions, the hanging ID card physics, and the subtle micro-interactions that give the site its 'premium' feel.",
  GSAP: 'GSAP handles the heavy lifting for the complex timeline-based animations, specifically determining precise scroll triggers and loading sequences.',
  'Lucide React':
    'Selected for its clean, consistent geometric stroke style that perfectly matches the minimalist industrial aesthetic of the site.',
  'Radix UI':
    'Provides the unstyled, accessible primitives for complex interactive components (like this dialog!), ensuring accessibility standards are met without compromising design.',
};

const EASE_CURVE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface HomePageProps {
  onNavigate: (path: string) => void;
  onOpenContact: () => void;
}

function HeroIdCard() {
  const cardRef = useRef<HTMLButtonElement>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 300, damping: 20, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateXNum = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const rotateYMouse = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const flipSpring = useSpring(0, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(rotateXNum, (v) => `${v}deg`);
  const rotateY = useTransform([rotateYMouse, flipSpring], ([m, f]) => {
    const mVal = typeof m === 'number' ? m : 0;
    const fVal = typeof f === 'number' ? f : 0;
    return `${mVal + fVal}deg`;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;
    mouseX.set(relX);
    mouseY.set(relY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleFlip = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    flipSpring.set(next ? 180 : 0);
  };

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={handleFlip}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label={isFlipped ? 'Flip ID Card to Front' : 'Flip ID Card to System Profile'}
      aria-pressed={isFlipped}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        rotateX,
        rotateY,
        willChange: 'transform',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="relative w-full h-full rounded-3xl cursor-pointer group bg-neutral-900 border border-neutral-800 p-1.5 shadow-2xl text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900"
    >
      <div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: 'rotateY(0deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            zIndex: isFlipped ? 10 : 20,
          }}
        >
          <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#0a0a0a] border border-white/10">
            <div className="absolute inset-0 z-10 flex items-end justify-center group-hover:scale-[1.02] transition-transform duration-500">
              <div className="relative w-full h-full">
                <img
                  src="/profile.jpg"
                  alt="R. Sai Dheeraj"
                  className="w-full h-full object-cover object-center"
                  style={{ transform: 'scale(1.05) translateY(4px)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-90" />
              </div>
            </div>

            <div className="absolute bottom-0 inset-x-0 z-40 p-6 flex flex-col justify-end pb-8 pointer-events-none">
              <div className="font-sans text-3xl md:text-4xl font-black tracking-tight text-white leading-[1.05] drop-shadow-lg">
                <div className="font-mono text-white/85 text-[10px] md:text-[11px] tracking-[0.25em] mb-3 font-semibold uppercase">
                  AI ENGINEER · FULL-STACK
                </div>
                <div>FOUNDER</div>
                <div>&amp; CEO</div>
                <div className="mt-3 flex items-center gap-2 font-mono text-white/70 text-[10px] tracking-[0.2em] font-medium uppercase">
                  <span className="inline-block w-6 h-px bg-white/60" />
                  KAIRO TECHNOLOGIES
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Face — System Profile */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            zIndex: isFlipped ? 20 : 10,
          }}
        >
          <div className="relative w-full h-full bg-[#050505] rounded-[20px] overflow-hidden border border-white/10 p-6 flex flex-col">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            <div className="flex justify-between items-center border-b border-white/10 pb-4 z-20">
              <span className="text-[10px] font-mono tracking-widest text-white/50">
                SYSTEM PROFILE
              </span>
              <div className="px-2 py-0.5 border border-white/20 text-[8px] font-mono tracking-widest text-white/70">
                VERIFIED
              </div>
            </div>

            <div className="flex flex-col gap-3.5 mt-5 z-20 flex-grow">
              <div>
                <p className="text-[8px] font-mono tracking-widest text-white/40 mb-0.5 uppercase">
                  IDENTITY
                </p>
                <p className="text-xs font-sans font-bold tracking-widest text-white uppercase">
                  SAI DHEERAJ
                </p>
              </div>

              <div>
                <p className="text-[8px] font-mono tracking-widest text-white/40 mb-0.5 uppercase">
                  ROLE
                </p>
                <p className="text-base font-sans font-black tracking-widest text-white uppercase leading-tight">
                  FOUNDER &amp; CEO
                </p>
                <p className="text-[10px] font-sans font-bold tracking-widest text-white/80 uppercase">
                  KAIRO TECHNOLOGIES (thekairo.tech)
                </p>
              </div>

              <div>
                <p className="text-[8px] font-mono tracking-widest text-white/40 mb-0.5 uppercase">
                  ENGINEERING
                </p>
                <p className="text-[10px] font-sans font-semibold tracking-widest text-white/80 uppercase">
                  AI ENGINEER · FULL-STACK
                </p>
              </div>

              <div>
                <p className="text-[8px] font-mono tracking-widest text-white/40 mb-0.5 uppercase">
                  FLAGSHIP PRODUCT
                </p>
                <p className="text-xs font-sans font-bold tracking-widest text-white uppercase">
                  KAIRO CLOUD OS (thekairo.dev)
                </p>
              </div>

              <div>
                <p className="text-[8px] font-mono tracking-widest text-white/40 mb-0.5 uppercase">
                  SPECIALIZATION
                </p>
                <p className="text-xs font-sans font-bold tracking-widest text-white uppercase leading-[1.3]">
                  CLOUD OPERATING SYSTEMS
                  <br />
                  DISTRIBUTED RUNTIMES
                  <br />
                  AI ARCHITECTURE
                </p>
              </div>

              <div className="mt-auto pt-2">
                <p className="text-[8px] font-mono tracking-widest text-white/40 mb-0.5 uppercase">
                  LOCATION
                </p>
                <p className="text-xs font-sans font-bold tracking-widest text-white uppercase">
                  KURNOOL // INDIA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default function HomePage({ onNavigate, onOpenContact }: HomePageProps) {
  const featuredTools = filterFeaturedStackTools(techStackRaw.tools as ToolItem[]);
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Section 01: Hero */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pb-[120px] pt-[80px]"
      >
        {/* Subtle Background Typography matching reference PDF */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none overflow-hidden z-0 py-24 md:py-0">
          <span className="text-[clamp(4rem,18vw,8rem)] md:text-[clamp(6rem,min(15vw,35vh),20rem)] font-black text-neutral-400/75 whitespace-nowrap tracking-tighter leading-[0.8] select-none">
            SAI DHEERAJ
          </span>
        </div>

        {/* Center Hanging 3D ID Card */}
        <div className="relative z-10 flex flex-col items-center mt-12">
          <div className="origin-top transition-all duration-500 ease-out flex justify-center">
            <div className="w-[85vw] max-w-[350px] aspect-[2/3] md:max-w-none md:w-auto md:h-[65vh] md:min-h-[450px] md:max-h-[800px] 2xl:h-[70vh]">
              <HeroIdCard />
            </div>
          </div>
        </div>

        {/* Hero Footer Bar: 01, SCROLL, HARD WORK */}
        <div className="absolute bottom-6 md:bottom-10 w-full z-20 pointer-events-none px-6 md:px-12 flex items-end justify-between">
          <div className="border border-neutral-400/60 backdrop-blur-sm rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-neutral-400 font-mono text-xs md:text-sm pointer-events-auto">
            01
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center gap-2 text-foreground font-mono">
            <span className="text-[10px] tracking-[0.3em] font-bold">SCROLL</span>
            <div className="w-[1px] h-12 bg-foreground" />
          </div>

          <div className="text-right font-mono pointer-events-auto">
            <span className="block text-[10px] uppercase tracking-wider mb-0.5 text-muted-foreground opacity-80">
              Leveled up by:
            </span>
            <span className="font-bold text-foreground text-xs md:text-sm uppercase tracking-widest">
              HARD WORK
            </span>
          </div>
        </div>
      </section>

      {/* Section 02: Mission Statement */}
      <section className="relative pt-16 pb-32 md:py-32 px-4 md:px-6 overflow-hidden bg-background">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <h2 className="text-type text-3xl md:text-5xl lg:text-7xl font-black text-primary tracking-tight leading-[1.05] mb-10 inline-block">
            <span className="text-type__content">
              I architect intelligent, scalable software systems that drive real-world impact.
            </span>
            <span className="text-type__cursor">|</span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE_CURVE }}
            className="text-lg md:text-2xl lg:text-3xl font-medium text-foreground/90 leading-relaxed max-w-4xl mx-auto mb-12 md:mb-0"
          >
            Founder &amp; CEO of{' '}
            <a
              href="https://thekairo.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary hover:underline"
            >
              Kairo Technologies
            </a>{' '}
            and maker of{' '}
            <a
              href="https://thekairo.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-primary hover:underline"
            >
              KAIRO Cloud OS
            </a>{' '}
            — an <span className="font-bold text-primary">AI Engineer &amp; Full-Stack Developer</span>{' '}
            building intelligent systems and distributed cloud infrastructure.
          </motion.p>
        </div>

        <div className="absolute left-6 md:left-12 bottom-10 border border-neutral-400/60 rounded-full w-10 h-10 md:w-12 md:h-12 items-center justify-center text-neutral-500 font-mono text-xs md:text-sm pointer-events-auto z-20 backdrop-blur-sm hidden sm:flex">
          02
        </div>

        <div className="absolute left-0 w-full md:w-auto md:left-auto md:right-12 bottom-8 md:bottom-10 z-20 pointer-events-auto flex justify-center md:block px-6 md:px-0">
          <button
            type="button"
            onClick={() => onNavigate('/about')}
            className="w-full md:w-auto inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg border border-transparent hover:bg-primary/90 hover:scale-105 transition-all duration-300 px-8 py-4 font-bold font-mono text-xs tracking-widest uppercase cursor-pointer"
          >
            EXPLORE SAI DHEERAJ
            <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Section: The Company — Kairo Technologies */}
      <section
        id="company"
        className="relative overflow-hidden border-t border-white/10 bg-[#050505] py-24 text-white md:py-32"
      >
        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-14 flex flex-col items-start justify-between gap-8 md:mb-16 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <h2 className="mb-4 flex items-center gap-2 font-mono text-sm uppercase tracking-[0.3em] text-white/50">
                <span className="h-[1px] w-8 bg-white/50" />
                The Company
              </h2>
              <h3 className="text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl">
                Kairo Technologies
              </h3>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/70 md:text-xl">
                Building technology beyond boundaries. Kairo makes software, AI-powered experiences
                and computing infrastructure that put powerful technology in more hands.
              </p>
            </div>

            <a
              href="https://thekairo.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center rounded-full border border-white/20 bg-transparent px-8 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
            >
              Visit thekairo.tech
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </a>
          </div>

          {/* Kairo Company Profile Banner */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: EASE_CURVE }}
            className="mb-8 grid items-center gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-[minmax(0,320px)_1fr] md:p-8"
          >
            <div className="relative aspect-[2116/743] w-full overflow-hidden rounded-2xl bg-black flex items-center justify-center">
              <img
                src="/kairo/kairo-technologies-dark.png"
                alt="Kairo Technologies logo"
                className="w-full h-full object-contain p-3"
              />
            </div>

            <div className="flex flex-col gap-6">
              <dl className="grid grid-cols-3 gap-6">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                    Founded
                  </dt>
                  <dd className="mt-1 text-lg font-bold">Oct 2026</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                    Founder &amp; CEO
                  </dt>
                  <dd className="mt-1 text-lg font-bold">R. Sai Dheeraj</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
                    Products
                  </dt>
                  <dd className="mt-1 text-lg font-bold tabular-nums">{KAIRO_PRODUCTS.length}</dd>
                </div>
              </dl>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/company/thekairo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
                <a
                  href="https://x.com/thekairotech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  <XBrandIcon className="h-3 w-3" /> X
                </a>
                <a
                  href="https://www.instagram.com/thekairo.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  <Instagram className="h-3.5 w-3.5" /> Instagram
                </a>
                <a
                  href="mailto:founder@thekairo.dev"
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-xs tracking-widest text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  founder@thekairo.dev
                </a>
              </div>
            </div>
          </motion.div>

          {/* 3 Product Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
            {KAIRO_PRODUCTS.map((product, idx) => (
              <motion.a
                key={product.name}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7, delay: 0.1 * idx, ease: EASE_CURVE }}
                className="group flex flex-col rounded-3xl border border-white/10 bg-white/5 p-8 transition-colors hover:border-white/30 md:p-10"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-white p-2 flex items-center justify-center">
                    <img
                      src={product.logo}
                      alt={`${product.name} logo`}
                      className="w-full h-full object-contain p-0.5"
                    />
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </div>

                <span className="mt-8 font-mono text-xs uppercase tracking-widest text-white/50">
                  Product 0{idx + 1}
                </span>
                <h4 className="mt-2 text-3xl font-black uppercase tracking-tight">
                  {product.name}
                </h4>
                <p className="mt-2 font-semibold text-white/90">{product.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-white/60">{product.description}</p>
                <span className="mt-auto pt-8 font-mono text-xs tracking-widest text-white/50 transition-colors group-hover:text-white">
                  {product.host}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Section 03: Built With This Stack */}
      <section className="py-24 pb-32 md:pb-24 bg-secondary border-t border-border relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[10px] md:text-sm font-bold tracking-[0.3em] uppercase text-muted-foreground mb-2 block">
              Powered By
            </span>
            <h2 className="text-3xl md:text-6xl font-black text-foreground tracking-tighter leading-none">
              BUILT{' '}
              <span className="underline decoration-[#ff4d29] decoration-4 underline-offset-8">
                WITH THIS
              </span>{' '}
              STACK
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-12 md:gap-y-16 items-center justify-items-center">
            {featuredTools.map((tool) => (
              <button
                key={tool.name}
                type="button"
                onClick={() => setSelectedTool(tool)}
                className="flex items-center gap-3 md:gap-4 group cursor-pointer transition-all duration-300 hover:opacity-100 hover:scale-105 opacity-90 backdrop-blur-sm bg-card p-3 md:p-4 rounded-xl border border-border hover:border-primary/50 w-full justify-center md:w-auto active:scale-95"
              >
                <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0 flex items-center justify-center">
                  {tool.icon && (
                    <img
                      src={tool.icon}
                      alt={tool.name}
                      className="w-full h-full object-contain"
                    />
                  )}
                </div>
                <span className="text-lg md:text-2xl font-bold text-foreground tracking-tight md:whitespace-nowrap">
                  {tool.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:flex absolute left-12 bottom-10 border border-neutral-400/60 rounded-full w-12 h-12 items-center justify-center text-neutral-500 font-mono text-sm pointer-events-auto z-20 backdrop-blur-sm">
          03
        </div>

        <div className="absolute left-0 w-full md:w-auto md:left-auto md:right-12 bottom-10 z-20 pointer-events-auto flex justify-center md:block px-6 md:px-0">
          <button
            type="button"
            onClick={() => onNavigate('/tech-stack')}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground shadow-lg border border-transparent hover:bg-primary/90 hover:scale-105 transition-all duration-300 font-bold font-mono text-xs tracking-widest uppercase cursor-pointer"
          >
            View Complete Stack
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Stack Detail Modal */}
        <AnimatePresence>
          {selectedTool && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center px-4"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedTool.name} details`}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedTool(null)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative bg-card border border-border w-full max-w-md p-8 rounded-2xl shadow-2xl z-10 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setSelectedTool(null)}
                  aria-label="Close Stack Details"
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-secondary transition-colors cursor-pointer"
                >
                  <CloseIcon className="w-5 h-5 text-muted-foreground" />
                </button>
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="relative w-20 h-20 p-4 bg-secondary/50 rounded-2xl border border-border flex items-center justify-center">
                    {selectedTool.icon && (
                      <img
                        src={selectedTool.icon}
                        alt={selectedTool.name}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                      {selectedTool.name}
                    </h3>
                    <div className="w-12 h-1 bg-primary mx-auto rounded-full mb-6" />
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {STACK_DESCRIPTIONS[selectedTool.name] ||
                        selectedTool.why ||
                        'A core technology used in architecting this portfolio.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* Section: Open Source */}
      <section className="relative py-24 md:py-32 bg-[#050505] text-white overflow-hidden border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-sm font-mono tracking-[0.3em] text-white/50 uppercase mb-4 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-white/50" />
                Community
              </h2>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                Open Source
              </h3>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('/open-source')}
              className="inline-flex items-center bg-transparent border border-white/20 text-white hover:bg-white hover:text-black rounded-full transition-colors px-8 h-12 text-sm font-semibold cursor-pointer"
            >
              Explore All Contributions
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Laya AI Card */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
                <Github className="w-32 h-32" />
              </div>

              <div className="relative z-10 mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <GitPullRequest className="text-white/60 w-5 h-5" />
                  <span className="font-mono text-xs tracking-widest text-white/60 uppercase">
                    System 1 LLM Engine
                  </span>
                </div>
                <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                  Laya AI
                </h4>
                <p className="text-white/70 font-medium leading-relaxed max-w-sm">
                  Built production-ready FastAPI backends, regex intent parsers, and engineered
                  multi-language temperature calibration into the routing core.
                </p>
              </div>

              <div className="relative z-10 flex gap-2 flex-wrap mt-auto">
                <span className="text-[10px] font-mono tracking-widest uppercase border border-white/20 px-3 py-1 rounded-full">
                  FastAPI
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase border border-white/20 px-3 py-1 rounded-full">
                  LLM Routing
                </span>
              </div>
            </div>

            {/* vLLM Card */}
            <div className="group relative p-8 md:p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-white/30 transition-colors flex flex-col justify-between overflow-hidden md:mt-16">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity group-hover:scale-110 duration-500">
                <Github className="w-32 h-32" />
              </div>

              <div className="relative z-10 mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <GitPullRequest className="text-white/60 w-5 h-5" />
                  <span className="font-mono text-xs tracking-widest text-white/60 uppercase">
                    High-Throughput Serving
                  </span>
                </div>
                <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
                  vLLM
                </h4>
                <p className="text-white/70 font-medium leading-relaxed max-w-sm">
                  Core performance optimization for Tensor Parallel (TP) Mixture of Experts (MoE)
                  models using torch.compile and KV cache group sizing logic.
                </p>
              </div>

              <div className="relative z-10 flex gap-2 flex-wrap mt-auto">
                <span className="text-[10px] font-mono tracking-widest uppercase border border-white/20 px-3 py-1 rounded-full">
                  PyTorch
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase border border-white/20 px-3 py-1 rounded-full">
                  Compilers
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Let's Connect CTA */}
      <section
        id="contact"
        className="relative py-32 bg-background overflow-hidden flex flex-col items-center justify-center min-h-[60vh]"
      >
        <div className="relative z-10 flex flex-col items-center justify-center space-y-12 text-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
            Let&apos;s turn ideas into real-world software
          </h2>

          <button
            type="button"
            onClick={onOpenContact}
            className="rounded-full px-10 py-6 md:px-12 md:py-7 text-xl md:text-3xl bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
          >
            <span className="flex items-center gap-4 font-semibold">
              Let&apos;s Connect
              <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />
            </span>
          </button>

          <p className="max-w-xl text-muted-foreground text-sm md:text-base leading-relaxed mt-12">
            Warning: Exploring my work may result in better ideas and higher standards.
          </p>
        </div>
      </section>
    </div>
  );
}
