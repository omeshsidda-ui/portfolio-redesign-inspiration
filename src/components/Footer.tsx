import React from 'react';
import { Github, Instagram, Linkedin, Music2 } from 'lucide-react';
import { motion } from 'motion/react';

function XIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface KairoLinkItem {
  label: string;
  short: string;
  sub: string;
  href: string;
  logo?: string;
  social?: 'linkedin' | 'x' | 'instagram';
}

const KAIRO_LINKS: KairoLinkItem[] = [
  {
    label: 'Kairo Technologies',
    short: 'thekairo.tech',
    sub: 'The Company',
    href: 'https://thekairo.tech',
    logo: '/kairo/kairo-k-mark.png',
  },
  {
    label: 'Kairo Cloud OS',
    short: 'thekairo.dev',
    sub: 'Cloud OS',
    href: 'https://thekairo.dev',
    logo: '/kairo/kairo-logo-mark.png',
  },
  {
    label: 'Kairo Orbit',
    short: 'orbit.thekairo.dev',
    sub: 'Your Mac. Anywhere.',
    href: 'https://orbit.thekairo.dev',
    logo: '/kairo/orbit-mark.png',
  },
  {
    label: 'PAIR',
    short: 'pair.thekairo.dev',
    sub: 'Pet Matchmaking',
    href: 'https://pair.thekairo.dev',
    logo: '/kairo/pair-mark.png',
  },
  {
    label: 'Kairo on LinkedIn',
    short: 'LinkedIn · Kairo',
    sub: 'Company Updates',
    href: 'https://www.linkedin.com/company/thekairo',
    social: 'linkedin',
  },
  {
    label: 'Kairo on X',
    short: '@thekairotech',
    sub: 'Official X',
    href: 'https://x.com/thekairotech',
    social: 'x',
  },
  {
    label: 'Kairo on Instagram',
    short: '@thekairo.tech',
    sub: 'Official Instagram',
    href: 'https://www.instagram.com/thekairo.tech',
    social: 'instagram',
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-[#fafafa] pt-16 md:pt-24 pb-0 overflow-hidden relative border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 mb-16 md:mb-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="space-y-4">
            <h3 className="text-lg md:text-xl font-medium text-[#fafafa]/80">Find me online:</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/SaiDheeraj-19"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 md:p-4 bg-[#262626]/50 rounded-xl hover:bg-[#262626] hover:scale-105 transition-all duration-300 border border-white/10"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/sai-dheeraj-r/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 md:p-4 bg-[#262626]/50 rounded-xl hover:bg-[#262626] hover:scale-105 transition-all duration-300 border border-white/10"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://www.instagram.com/your.saidheeraj/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-3 md:p-4 bg-[#262626]/50 rounded-xl hover:bg-[#262626] hover:scale-105 transition-all duration-300 border border-white/10"
              >
                <Instagram className="w-6 h-6" />
              </a>
            </div>

            <div className="pt-6 w-full max-w-md">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-8 bg-white/40" />
                <h4 className="text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] text-white/60">
                  Founder &amp; CEO · Kairo Technologies
                </h4>
              </div>
              <ul className="flex flex-wrap gap-3">
                {KAIRO_LINKS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${item.label} (${item.sub})`}
                      className="group relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-[#fafafa] p-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_-12px_rgba(255,255,255,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    >
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={item.label}
                          width={40}
                          height={40}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <>
                          {item.social === 'x' ? (
                            <XIcon className="h-5 w-5 text-[#171717]" />
                          ) : item.social === 'instagram' ? (
                            <Instagram className="h-6 w-6 text-[#171717]" />
                          ) : (
                            <Linkedin className="h-6 w-6 fill-current text-[#171717]" />
                          )}
                          <img
                            src="/kairo/kairo-k-mark.png"
                            alt=""
                            width={18}
                            height={18}
                            className="absolute -bottom-1.5 -right-1.5 h-[18px] w-[18px] rounded-md bg-[#fafafa] p-0.5 ring-2 ring-[#171717]"
                          />
                        </>
                      )}
                      <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#fafafa] px-2 py-1 font-mono text-[10px] text-[#171717] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                        {item.short}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-left md:text-right space-y-4 md:space-y-6">
            <p className="text-base md:text-2xl font-light text-white/60 max-w-lg leading-relaxed">
              Designed and built by <span className="text-white font-medium">R. Sai Dheeraj</span> to
              showcase AI-powered applications, real-time systems, and scalable digital products.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full relative flex flex-col justify-center items-center leading-none">
        <motion.h1
          initial={{ y: '100%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-[17vw] font-black text-[#f5f5f5] tracking-tighter leading-[0.75] select-none text-center"
        >
          SAI DHEERAJ
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
          viewport={{ once: false }}
          className="w-full py-6 md:py-8 text-center space-y-2"
        >
          <p className="text-xs md:text-sm text-neutral-500 font-mono">
            © 2026 R. Sai Dheeraj. All rights reserved.
          </p>
          <p className="text-[10px] md:text-xs text-neutral-600">
            Unauthorized use or reproduction is prohibited.
          </p>
          <p className="text-[9px] md:text-[10px] text-neutral-600 italic mt-3 flex items-center justify-center gap-1.5">
            <Music2 className="w-3 h-3" /> Background Music: &quot;Orchestral Suite No. 2 in B Minor, BWV
            1067: VII. Badinerie&quot; — J.S. Bach
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
