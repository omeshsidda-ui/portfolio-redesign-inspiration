import React, { useState } from 'react';
import {
  ArrowLeft,
  Cpu,
  Database,
  GitMerge,
  Lock,
  MapPin,
  ScanFace,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import techStackRaw from '../data/techStack.json';
import { ToolCategory, ToolItem } from '../utils/portfolioLogic';

const LUCIDE_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Database,
  GitMerge,
  ShieldCheck,
  Lock,
  ScanFace,
  MapPin,
  Cpu,
  Terminal,
};

function ToolIconView({ tool, size = 24 }: { tool: ToolItem; size?: number }) {
  if (tool.isLucide && tool.slug) {
    const IconComp = LUCIDE_ICON_MAP[tool.slug] || Cpu;
    return <IconComp className="w-6 h-6 text-neutral-700" />;
  }
  if (tool.inlineSvg) {
    return (
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill={`#${tool.color || '171717'}`}
        className="shrink-0"
      >
        <path d={tool.inlineSvg} />
      </svg>
    );
  }
  if (tool.icon) {
    return (
      <img
        src={tool.icon}
        alt={tool.name}
        width={size}
        height={size}
        className="object-contain shrink-0"
      />
    );
  }
  return <Terminal className="w-6 h-6 text-neutral-700" />;
}

export default function TechStackPage({ onBackHome }: { onBackHome: () => void }) {
  const categories = techStackRaw.toolCategories as ToolCategory[];
  const [selected, setSelected] = useState<{ tool: ToolItem; cat: ToolCategory } | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-screen-xl px-6 pb-32 pt-32 md:px-12 lg:px-24">
        <button
          type="button"
          onClick={onBackHome}
          className="-ml-4 mb-12 inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </button>

        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-primary/50" />
            <span className="text-[11px] font-bold tracking-[0.4em] uppercase text-primary/70">
              Technical Arsenal
            </span>
          </div>
          <h1 className="text-[12vw] md:text-[7vw] leading-[0.85] font-black tracking-tighter uppercase text-foreground mb-8">
            TECHNOLOGY
            <br />
            <span className="text-primary">STACK</span>
          </h1>
          <p className="text-lg lg:text-2xl font-light text-muted-foreground max-w-2xl border-l border-primary/30 pl-6 leading-relaxed">
            The tools and frameworks I use to build scalable, high-performance systems and AI
            products. Click any tool to inspect why I chose it, how it helps, and how it scales.
          </p>
        </header>

        <div className="space-y-16">
          {categories.map((cat, idx) => (
            <motion.section
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: idx * 0.03 }}
              className="border-t border-neutral-200 pt-10"
            >
              <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-8 gap-2">
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-mono text-xs font-black tracking-[0.35em] uppercase"
                    style={{ color: cat.accent }}
                  >
                    {cat.number}
                  </span>
                  <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
                    {cat.label}
                  </h2>
                </div>
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                  {cat.tools.length} Tools
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.tools.map((tool) => (
                  <button
                    key={tool.name}
                    type="button"
                    onClick={() => setSelected({ tool, cat })}
                    className="group flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-5 text-left transition-all duration-300 hover:border-neutral-900 hover:shadow-md cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <ToolIconView tool={tool} size={26} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-base text-neutral-900 group-hover:text-black">
                        {tool.name}
                      </h3>
                      <p className="mt-1 text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                        {tool.why}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>

      {/* Tool Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-8"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(16px)' }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.tool.name} technical breakdown`}
          >
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl bg-background border border-border"
            >
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-10">
                  <div className="w-20 h-20 rounded-xl flex items-center justify-center flex-shrink-0 bg-secondary/40 border border-border/60">
                    <ToolIconView tool={selected.tool} size={40} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground mb-3 border border-border px-3 py-1 rounded-full">
                      {selected.cat.number} — {selected.cat.label}
                    </span>
                    <h3 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-foreground leading-none">
                      {selected.tool.name}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 border-y border-border/50 py-8 my-8">
                  {[
                    { label: 'Why I chose it', content: selected.tool.why },
                    { label: 'How it helps', content: selected.tool.helpful },
                    { label: 'Scalability', content: selected.tool.scale },
                  ]
                    .filter((row) => row.content)
                    .map(({ label, content }) => (
                      <div key={label} className="space-y-3">
                        <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                          {label}
                        </p>
                        <p className="text-sm font-medium text-foreground/85 leading-relaxed">
                          {content}
                        </p>
                      </div>
                    ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                    {selected.cat.tools.length} Tools in {selected.cat.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:text-background hover:bg-foreground transition-colors duration-300 px-6 py-3 border border-foreground cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
