import React, { useState } from 'react';
import { ArrowLeft, Folder, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import portfolioData from '../data/portfolio.json';

interface CertificateItem {
  title: string;
  img: string;
  thumbnail?: string;
  issuer: string;
}

export default function CertificationsPage({ onBackHome }: { onBackHome: () => void }) {
  const certMap = portfolioData.certificationsData as Record<string, CertificateItem[]>;
  const categories = Object.keys(certMap);
  const totalCount = Object.values(certMap).reduce((sum, list) => sum + list.length, 0);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [previewImg, setPreviewImg] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24 max-w-screen-xl mx-auto">
        <button
          type="button"
          onClick={onBackHome}
          className="mb-12 -ml-4 inline-flex items-center px-4 py-2 text-sm font-medium text-neutral-700 hover:text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </button>

        <div className="mb-4">
          <p className="text-xs font-black tracking-[0.3em] text-neutral-400 uppercase mb-4">
            Credentials &amp; Training
          </p>
          <h1 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none text-neutral-900">
            {selectedCategory || 'Certifications'}
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-b border-neutral-200 py-4 mb-12 mt-8 gap-4">
          <span className="text-xs font-black tracking-[0.3em] text-neutral-400 uppercase">
            {selectedCategory
              ? `${certMap[selectedCategory].length} Credentials`
              : `${categories.length} Categories · ${totalCount} Certifications`}
          </span>

          {selectedCategory && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 text-xs font-black tracking-[0.3em] text-neutral-900 uppercase hover:text-primary transition-colors group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Index
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {selectedCategory ? (
            <motion.div
              key="certificates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {certMap[selectedCategory].map((cert, idx) => (
                <button
                  key={cert.title + idx}
                  type="button"
                  onClick={() => setPreviewImg(cert.img)}
                  className="group flex flex-col text-left cursor-pointer"
                >
                  <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden bg-neutral-100 mb-6 border border-neutral-200 group-hover:border-primary transition-colors duration-500 flex items-center justify-center p-4">
                    <img
                      src={cert.thumbnail || cert.img}
                      alt={cert.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-neutral-900 group-hover:text-primary transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-sm font-medium text-neutral-500 mt-2 tracking-wide uppercase">
                    {cert.issuer}
                  </p>
                </button>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="folders"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group aspect-square bg-neutral-50 hover:bg-neutral-900 border border-neutral-200 rounded-3xl p-8 flex flex-col items-center justify-center gap-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
                >
                  <Folder className="w-24 h-24 text-neutral-300 group-hover:text-white group-hover:scale-110 transition-all duration-500" />
                  <div className="text-center">
                    <h3 className="text-xl font-black tracking-tight text-neutral-900 group-hover:text-white transition-colors duration-500">
                      {cat}
                    </h3>
                    <p className="text-sm font-medium text-neutral-500 group-hover:text-neutral-400 mt-2">
                      {certMap[cat].length} Certificates
                    </p>
                  </div>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {previewImg && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Certificate Preview"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewImg(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl bg-neutral-900/95 border border-white/10 p-4 md:p-8 rounded-3xl w-full h-[85vh] flex flex-col items-center justify-center shadow-2xl z-10"
            >
              <button
                type="button"
                onClick={() => setPreviewImg(null)}
                aria-label="Close Certificate Preview"
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-3 rounded-full bg-black/60 hover:bg-black text-white border border-white/10 transition-all hover:scale-110 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={previewImg}
                alt="Certificate Full View"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
