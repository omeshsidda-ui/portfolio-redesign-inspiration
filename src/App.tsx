/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { AudioProvider } from './context/AudioContext';
import AboutPage from './pages/AboutPage';
import CertificationsPage from './pages/CertificationsPage';
import ExperiencePage from './pages/ExperiencePage';
import HackathonsPage from './pages/HackathonsPage';
import HomePage from './pages/HomePage';
import OpenSourcePage from './pages/OpenSourcePage';
import ProjectsPage from './pages/ProjectsPage';
import TechStackPage from './pages/TechStackPage';

function normalizePathname(rawPath: string): string {
  const clean = rawPath.split('#')[0].split('?')[0].replace(/\/+$/, '');
  return clean || '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() =>
    normalizePathname(window.location.pathname)
  );
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePathname(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    if (window.location.hash === '#contact') {
      setContactOpen(true);
    }
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (target: string) => {
    if (target === '/#contact' || target === '#contact') {
      setContactOpen(true);
      return;
    }
    const nextPath = normalizePathname(target);
    window.history.pushState({}, '', nextPath);
    setCurrentPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/projects':
        return <ProjectsPage onBackHome={() => navigate('/')} />;
      case '/open-source':
        return <OpenSourcePage onBackHome={() => navigate('/')} />;
      case '/experience':
        return <ExperiencePage onBackHome={() => navigate('/')} />;
      case '/certifications':
        return <CertificationsPage onBackHome={() => navigate('/')} />;
      case '/hackathons':
        return <HackathonsPage onBackHome={() => navigate('/')} />;
      case '/tech-stack':
        return <TechStackPage onBackHome={() => navigate('/')} />;
      case '/about':
        return (
          <AboutPage
            onBackHome={() => navigate('/')}
            onOpenContact={() => setContactOpen(true)}
          />
        );
      default:
        return (
          <HomePage
            onNavigate={navigate}
            onOpenContact={() => setContactOpen(true)}
          />
        );
    }
  };

  return (
    <AudioProvider>
      <div className="min-h-screen flex flex-col relative bg-background text-foreground">
        <Navbar
          currentPath={currentPath}
          onNavigate={navigate}
          onOpenContact={() => setContactOpen(true)}
        />
        <div className="flex-1">{renderPage()}</div>
        <Footer />
        <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      </div>
    </AudioProvider>
  );
}
