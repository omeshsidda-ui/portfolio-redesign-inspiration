import React, { useState } from 'react';
import { Mail, MessageCircle, Phone, Send, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { ContactFormInput, validateContactForm } from '../utils/portfolioLogic';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState<ContactFormInput>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormInput, string>>>({});
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setIsSending(true);
    setStatus('idle');
    await new Promise((resolve) => setTimeout(resolve, 350));
    setIsSending(false);
    setStatus('success');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-dialog-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-4xl w-[95vw] max-h-[90vh] bg-background border border-border text-foreground p-0 overflow-hidden rounded-[2rem] shadow-2xl z-10 flex flex-col"
          >
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
              <button
                type="button"
                onClick={onClose}
                aria-label="Close Contact Modal"
                className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 md:p-16 relative z-10 flex flex-col items-center overflow-y-auto custom-scrollbar">
              <h2
                id="contact-dialog-title"
                className="text-4xl md:text-6xl font-black mb-4 text-center tracking-tighter uppercase text-foreground"
              >
                Let&apos;s Talk
              </h2>
              <p className="text-muted-foreground mb-12 text-center text-sm md:text-lg max-w-lg leading-relaxed">
                Choose your preferred way to connect. I&apos;m always open to discussing new
                projects and ideas.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                <a
                  href="https://wa.me/919908918853"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-card border border-border hover:border-[#25D366] transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MessageCircle className="w-8 h-8 md:w-10 md:h-10 text-[#25D366]" />
                  </div>
                  <span className="font-bold text-xl text-foreground group-hover:text-[#25D366] transition-colors">
                    WhatsApp
                  </span>
                  <span className="text-xs text-muted-foreground mt-2 font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity uppercase">
                    Instant Chat
                  </span>
                </a>

                <a
                  href="tel:+919908918853"
                  className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-card border border-border hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
                  </div>
                  <span className="font-bold text-xl text-foreground group-hover:text-blue-500 transition-colors">
                    Call Me
                  </span>
                  <span className="text-xs text-muted-foreground mt-2 font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity uppercase">
                    Personal Line
                  </span>
                </a>

                <a
                  href="mailto:founder@thekairo.dev"
                  className="group relative flex flex-col items-center justify-center p-8 rounded-3xl bg-card border border-border hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-16 h-16 md:w-20 md:h-20 mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                    Email
                  </span>
                  <span className="text-xs text-muted-foreground mt-2 font-mono tracking-wider opacity-60 group-hover:opacity-100 transition-opacity uppercase">
                    Send Message
                  </span>
                </a>
              </div>

              <div className="w-full mt-16 pt-12 border-t border-border/50">
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-12 text-center md:text-left">
                  Direct Message
                </h3>

                <form onSubmit={handleSubmit} noValidate className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="relative group">
                      <label
                        htmlFor="name"
                        className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full bg-transparent border-b border-border pb-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                      {errors.name && (
                        <p className="mt-2 text-xs text-red-600 font-medium">{errors.name}</p>
                      )}
                    </div>

                    <div className="relative group">
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full bg-transparent border-b border-border pb-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                      />
                      {errors.email && (
                        <p className="mt-2 text-xs text-red-600 font-medium">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="relative group">
                    <label
                      htmlFor="subject"
                      className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What are we building?"
                      className="w-full bg-transparent border-b border-border pb-3 text-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                    {errors.subject && (
                      <p className="mt-2 text-xs text-red-600 font-medium">{errors.subject}</p>
                    )}
                  </div>

                  <div className="relative group">
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2"
                    >
                      Project Details / Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project timeline, goals, or architecture needs..."
                      className="w-full bg-transparent border-b border-border pb-3 text-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                    {errors.message && (
                      <p className="mt-2 text-xs text-red-600 font-medium">{errors.message}</p>
                    )}
                  </div>

                  {status === 'success' && (
                    <div
                      role="status"
                      className="p-6 bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl"
                    >
                      <p className="text-[#15803d] font-medium text-base md:text-lg text-center">
                        Thank you! Your message has been sent successfully.
                      </p>
                    </div>
                  )}

                  <div className="flex justify-center md:justify-start">
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full md:w-auto inline-flex items-center justify-center rounded-full px-10 py-5 bg-primary text-primary-foreground text-sm md:text-base font-bold tracking-widest uppercase transition-all duration-300 hover:scale-105 cursor-pointer disabled:opacity-50"
                    >
                      {isSending ? (
                        'Sending...'
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-3 h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
