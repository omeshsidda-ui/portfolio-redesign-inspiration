import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useAudio } from '../context/AudioContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenContact?: () => void;
}

export function SoundButton({ className = '' }: { className?: string }) {
  const { isPlaying, togglePlay } = useAudio();

  return (
    <button
      type="button"
      onClick={togglePlay}
      aria-label={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
      className={`relative p-2 rounded-full border transition-all duration-300 group overflow-hidden flex items-center justify-center w-10 h-10 cursor-pointer ${
        isPlaying
          ? 'bg-neutral-900/10 border-neutral-900/30 text-neutral-900'
          : 'bg-transparent border-foreground/20 text-foreground hover:bg-foreground/5'
      } ${className}`}
    >
      {isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-30 pointer-events-none">
          {[0.6, 0.8, 0.5, 0.9, 0.7].map((dur, idx) => (
            <div
              key={idx}
              className="w-[2px] bg-current animate-music-bar"
              style={{ animationDuration: `${dur}s`, height: '50%' }}
            />
          ))}
        </div>
      )}
      <div className="relative z-10">
        {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
      </div>
    </button>
  );
}

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-8 h-8 flex flex-col justify-center items-end gap-1.5 overflow-hidden group cursor-pointer">
      <motion.span
        animate={isOpen ? { rotate: 45, y: 8, width: '100%' } : { rotate: 0, y: 0, width: '100%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="h-[2px] bg-foreground block origin-center rounded-full"
      />
      <motion.span
        animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-3/4 h-[2px] bg-foreground block rounded-full group-hover:w-full transition-all duration-300"
      />
      <motion.span
        animate={isOpen ? { rotate: -45, y: -8, width: '100%' } : { rotate: 0, y: 0, width: '50%' }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="h-[2px] bg-foreground block origin-center rounded-full group-hover:w-full transition-all duration-300"
      />
    </div>
  );
}

const NAV_ITEMS = [
  { name: 'Projects', href: '/projects' },
  { name: 'Open Source', href: '/open-source' },
  { name: 'Experience', href: '/experience' },
  { name: 'Certifications', href: '/certifications' },
  { name: 'Hackathons', href: '/hackathons' },
  { name: 'Tech Stack', href: '/tech-stack' },
  { name: 'About me', href: '/about' },
];

export default function Navbar({ currentPath, onNavigate, onOpenContact }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const isHome = currentPath === '/';

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate(href);
  };

  const handleContactAction = () => {
    setMenuOpen(false);
    if (onOpenContact) {
      onOpenContact();
    } else {
      onNavigate('/#contact');
    }
  };

  return (
    <nav className="absolute top-0 z-50 w-full transition-all duration-300 ease-in-out py-6 md:py-8 bg-transparent">
      <div className="container relative z-50 mx-auto px-6 md:px-12 flex items-center justify-between">
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="text-xl md:text-2xl font-bold tracking-widest uppercase hover:opacity-80 transition-opacity text-foreground whitespace-nowrap shrink-0"
        >
          SAI DHEERAJ
        </a>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center space-x-6">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleLinkClick(e, item.href)}
              className={`transition-colors text-sm font-medium tracking-wide mr-4 whitespace-nowrap shrink-0 ${
                currentPath === item.href
                  ? 'text-primary font-semibold'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              {item.name}
            </a>
          ))}

          <SoundButton />

          <button
            type="button"
            onClick={handleContactAction}
            className="rounded-full px-8 py-2.5 text-sm font-bold tracking-wide transition-all bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl border-transparent cursor-pointer whitespace-nowrap shrink-0"
          >
            CONTACT
          </button>
        </div>

        {/* Mobile Nav Controls */}
        <div className="xl:hidden flex items-center gap-3">
          <SoundButton className="w-9 h-9" />
          <button
            type="button"
            className="text-foreground outline-none cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
          >
            <HamburgerIcon isOpen={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 xl:hidden pt-28 pb-12 px-8 bg-background flex flex-col overflow-y-auto"
          >
            <div className="flex flex-col space-y-6 md:space-y-8 items-center my-auto relative z-10">
              {[...(!isHome ? [{ name: 'Home', href: '/' }] : []), ...NAV_ITEMS].map((item, idx) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground/50 hover:text-foreground transition-all block hover:scale-110"
                  >
                    {item.name}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="pt-6"
              >
                <button
                  type="button"
                  onClick={handleContactAction}
                  className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-primary hover:scale-110 transition-transform cursor-pointer"
                >
                  CONTACT
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
