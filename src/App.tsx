import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  Menu,
  X,
  Check,
  Play,
  ExternalLink,
} from 'lucide-react';
import { FEATURED_APPEARANCES, SITE_CHAPTERS } from './data/siteContent';

const INQUIRY_TOPICS = [
  'Speaking & Media',
  'Venture & Partnership',
  'Press Inquiry',
  'General Correspondence',
] as const;

type InquiryTopic = (typeof INQUIRY_TOPICS)[number];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);
  const [videoThumbError, setVideoThumbError] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<InquiryTopic>('Speaking & Media');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const primaryFeature = FEATURED_APPEARANCES[0];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setInquiryOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleInquirySubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const resetInquiryForm = () => {
    setName('');
    setEmail('');
    setTopic('Speaking & Media');
    setMessage('');
    setSubmitted(false);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-[#141413] flex flex-col">
      {/* Top Bar Contract: 3 zones — Wordmark | 4 Nav Links | 1 Primary Action */}
      <header className="sticky top-0 z-40 bg-[#F9F9F8]/92 backdrop-blur-sm border-b border-black/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="font-editorial text-2xl font-medium tracking-[-0.01em] text-[#141413] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413] rounded-sm"
          >
            Utpal Ghosh
          </a>

          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-8 text-sm text-[#575652]"
          >
            <button
              type="button"
              onClick={() => scrollToSection('featured-media')}
              className="hover:text-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413] rounded-sm"
            >
              Media
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('ventures')}
              className="hover:text-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413] rounded-sm"
            >
              Ventures
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('biography')}
              className="hover:text-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413] rounded-sm"
            >
              Biography
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('archive')}
              className="hover:text-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413] rounded-sm"
            >
              Archive
            </button>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setInquiryOpen(true);
              }}
              className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium tracking-[0.02em] bg-[#141413] text-[#F9F9F8] rounded-md hover:bg-[#2C2B29] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F9F8]"
            >
              Contact
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#141413] rounded-md hover:bg-black/5 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-black/[0.08] bg-[#F9F9F8] px-6 py-5">
            <nav className="flex flex-col gap-3 text-base text-[#141413]">
              <button
                type="button"
                onClick={() => scrollToSection('featured-media')}
                className="text-left py-2 border-b border-black/[0.06] flex items-center justify-between cursor-pointer"
              >
                <span>Founder Talks & Media</span>
                <span className="text-xs text-[#6E6D68] tabular-nums">01</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('ventures')}
                className="text-left py-2 border-b border-black/[0.06] flex items-center justify-between cursor-pointer"
              >
                <span>Ventures & Protein Box</span>
                <span className="text-xs text-[#6E6D68] tabular-nums">02</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('biography')}
                className="text-left py-2 border-b border-black/[0.06] flex items-center justify-between cursor-pointer"
              >
                <span>Biography</span>
                <span className="text-xs text-[#6E6D68] tabular-nums">03</span>
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('archive')}
                className="text-left py-2 border-b border-black/[0.06] flex items-center justify-between cursor-pointer"
              >
                <span>Archive</span>
                <span className="text-xs text-[#6E6D68] tabular-nums">04</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSubmitted(false);
                  setInquiryOpen(true);
                }}
                className="mt-2 w-full py-3 px-4 text-sm font-medium bg-[#141413] text-[#F9F9F8] rounded-md cursor-pointer"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </header>

      <main id="top" className="flex-1">
        {/* Hero Split */}
        <section className="max-w-[1280px] mx-auto px-6 md:px-10 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-6 flex flex-col justify-between py-2">
              <div>
                <p className="text-xs text-[#6E6D68] tracking-[0.04em] mb-5">
                  Official Website <span aria-hidden="true" className="mx-1.5">·</span> Founder, Protein Box
                </p>

                <h1
                  className="font-editorial text-[clamp(2.75rem,5vw,4.5rem)] leading-[1.03] tracking-[-0.02em] font-medium text-[#141413] max-w-xl"
                  style={{ textWrap: 'balance' }}
                >
                  Utpal Ghosh
                </h1>

                <p className="mt-6 text-base md:text-[17px] leading-[1.7] text-[#4A4945] max-w-[52ch]">
                  Official digital home for ventures, founder talks, press appearances, and ongoing
                  work—featuring Protein Box and conversations across India’s innovation ecosystem.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-black/[0.08] flex flex-wrap items-center gap-6">
                <button
                  type="button"
                  onClick={() => scrollToSection('featured-media')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-[#141413] text-[#F9F9F8] rounded-md hover:bg-[#2C2B29] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F9F8]"
                >
                  <span>Watch Founder Talks</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setInquiryOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 py-2 text-sm text-[#4A4945] hover:text-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413] rounded-sm"
                >
                  <span>Direct Inquiry</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-full h-full min-h-[340px] md:min-h-[460px] rounded-xl overflow-hidden bg-[#ECEAE5] border border-black/[0.07]">
                {!heroImageError ? (
                  <img
                    src="/src/assets/images/editorial_light_monolith_1795301949731.jpg"
                    alt="Warm sunlight casting architectural shadows across a limestone gallery space"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImageError(true)}
                    className="w-full h-full object-cover lg:absolute lg:inset-0"
                  />
                ) : (
                  <div className="w-full h-full min-h-[340px] md:min-h-[460px] flex flex-col items-center justify-center p-10 bg-gradient-to-br from-[#ECEAE5] to-[#DDDAD2] text-center">
                    <span className="font-editorial text-3xl text-[#141413]">Utpal Ghosh</span>
                    <span className="mt-2 text-xs text-[#6E6D68]">Official Website</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Full-width overview strip below the hero split */}
          <div className="mt-12 pt-8 border-t border-black/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div>
              <p className="text-xs text-[#6E6D68]">Featured Venture</p>
              <p className="mt-1 text-sm font-medium text-[#141413]">Protein Box</p>
            </div>
            <div>
              <p className="text-xs text-[#6E6D68]">Latest Feature</p>
              <p className="mt-1 text-sm font-medium text-[#141413]">T-Hub Founder Talks</p>
            </div>
            <div>
              <p className="text-xs text-[#6E6D68]">Published Channels</p>
              <p className="mt-1 text-sm font-medium text-[#141413]">YouTube · Instagram · LinkedIn</p>
            </div>
            <div>
              <p className="text-xs text-[#6E6D68]">Official Handle</p>
              <p className="mt-1 text-sm font-medium text-[#141413]">utpalghoshofficial</p>
            </div>
          </div>
        </section>

        {/* Featured Media — T-Hub Founder Talks Series: Protein Box */}
        <section
          id="featured-media"
          className="scroll-mt-16 border-t border-black/[0.08] bg-white"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-black/[0.08]">
              <div>
                <p className="text-xs text-[#6E6D68] mb-3">
                  01 <span aria-hidden="true" className="mx-1.5">·</span> {primaryFeature.organization}{' '}
                  <span aria-hidden="true" className="mx-1.5">·</span> {primaryFeature.category}
                </p>
                <h2
                  className="font-editorial text-3xl md:text-5xl font-medium tracking-[-0.015em] text-[#141413]"
                  style={{ textWrap: 'balance' }}
                >
                  {primaryFeature.series} — {primaryFeature.title}
                </h2>
              </div>

              <a
                href={primaryFeature.links[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#141413] hover:text-[#4A4945] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Open on YouTube</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Embedded Video Player */}
              <div className="lg:col-span-7">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#141413] border border-black/[0.08]">
                  {activeVideoId === primaryFeature.youtubeId && primaryFeature.youtubeId ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${primaryFeature.youtubeId}?autoplay=1&rel=0`}
                      title={`${primaryFeature.series} — ${primaryFeature.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveVideoId(primaryFeature.youtubeId ?? null)}
                      className="group relative w-full h-full flex flex-col items-center justify-center text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white bg-gradient-to-br from-[#1D1C1A] to-[#111110]"
                      aria-label={`Play ${primaryFeature.series} — ${primaryFeature.title}`}
                    >
                      {!videoThumbError && primaryFeature.youtubeId && (
                        <img
                          src={`https://img.youtube.com/vi/${primaryFeature.youtubeId}/hqdefault.jpg`}
                          alt={`${primaryFeature.series} — ${primaryFeature.title} video preview`}
                          referrerPolicy="no-referrer"
                          onError={() => setVideoThumbError(true)}
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
                      <div className="relative z-10 flex flex-col items-center text-center px-6">
                        <span className="w-16 h-16 rounded-full bg-white text-[#141413] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </span>
                        <span className="mt-5 font-editorial text-2xl md:text-3xl text-white font-medium">
                          {primaryFeature.series}: {primaryFeature.title}
                        </span>
                        <span className="mt-1.5 text-xs text-white/80 tracking-[0.02em]">
                          Play YouTube Feature
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Editorial Context & Official Platform Links */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full">
                <div>
                  <p className="text-base leading-[1.75] text-[#4A4945]">
                    {primaryFeature.summary}
                  </p>

                  <div className="mt-8 pt-6 border-t border-black/[0.08]">
                    <p className="text-xs text-[#6E6D68] mb-4">Official Media Platforms</p>
                    <div className="divide-y divide-black/[0.08] border-t border-b border-black/[0.08]">
                      {primaryFeature.links.map((item) => (
                        <a
                          key={item.platform}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-4 flex items-center justify-between gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413] rounded-sm"
                        >
                          <div>
                            <span className="block text-sm font-medium text-[#141413] group-hover:text-[#3A3936]">
                              {item.platform}
                            </span>
                            <span className="block text-xs text-[#6E6D68] mt-0.5">
                              {item.label}
                            </span>
                          </div>
                          <ExternalLink className="w-4 h-4 text-[#6E6D68] group-hover:text-[#141413] transition-colors shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Site Sections Index — Ready for Incoming Content */}
        <section id="ventures" className="scroll-mt-16 border-t border-black/[0.08] bg-[#F9F9F8]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-4">
                <p className="text-xs text-[#6E6D68] mb-3">Site Directory</p>
                <h2
                  className="font-editorial text-3xl md:text-4xl font-medium tracking-[-0.015em] text-[#141413]"
                  style={{ textWrap: 'balance' }}
                >
                  Expanding the official archive.
                </h2>
                <p className="mt-4 text-sm leading-[1.7] text-[#575652] max-w-[38ch]">
                  Your T-Hub Founder Talks coverage for Protein Box is live above. Additional
                  ventures, biographical notes, portraits, and press files will populate the
                  chapters alongside it.
                </p>
              </div>

              <div className="lg:col-span-8 divide-y divide-black/[0.08] border-t border-b border-black/[0.08]">
                {SITE_CHAPTERS.map((chapter) => (
                  <div
                    key={chapter.id}
                    id={chapter.id === 'gallery' ? 'archive' : chapter.id === 'biography' ? 'biography' : undefined}
                    className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 scroll-mt-24"
                  >
                    <div className="flex items-baseline gap-5 md:gap-8">
                      <span className="text-xs text-[#6E6D68] tabular-nums shrink-0">
                        {chapter.number}
                      </span>
                      <div>
                        <h3 className="font-editorial text-2xl font-medium text-[#141413]">
                          {chapter.title}
                        </h3>
                        <p className="mt-1 text-xs text-[#6E6D68]">{chapter.subtitle}</p>
                        <p className="mt-2.5 text-sm leading-[1.65] text-[#4A4945] max-w-[56ch]">
                          {chapter.summary}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs text-[#575652] whitespace-nowrap shrink-0 pl-9 sm:pl-0">
                      {chapter.status === 'populated' ? 'Published' : 'Ready for upload'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Correspondence Band */}
        <section className="border-t border-black/[0.08] bg-white">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-xs text-[#6E6D68] mb-3">Correspondence</p>
              <h2
                className="font-editorial text-3xl md:text-4xl font-medium tracking-[-0.015em] text-[#141413] max-w-xl"
                style={{ textWrap: 'balance' }}
              >
                Speaking invitations, press, and direct inquiries.
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setInquiryOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium bg-[#141413] text-[#F9F9F8] rounded-md hover:bg-[#2C2B29] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer self-start md:self-auto"
            >
              <span>Open Inquiry Form</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-black/[0.08] bg-[#F9F9F8]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6E6D68]">
          <p>© {new Date().getFullYear()} Utpal Ghosh. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a
              href={primaryFeature.links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141413] transition-colors"
            >
              YouTube
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={primaryFeature.links[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141413] transition-colors"
            >
              Instagram
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={primaryFeature.links[2].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141413] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>

      {/* Inquiry Modal */}
      {inquiryOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inquiry-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px]"
          onClick={(e) => {
            if (e.target === e.currentTarget) setInquiryOpen(false);
          }}
        >
          <div className="w-full max-w-lg bg-white rounded-xl border border-black/[0.08] shadow-xl overflow-hidden">
            <div className="px-6 py-5 border-b border-black/[0.08] flex items-center justify-between">
              <div>
                <h2
                  id="inquiry-modal-title"
                  className="font-editorial text-2xl font-medium text-[#141413]"
                >
                  Direct Inquiry
                </h2>
                <p className="text-xs text-[#6E6D68] mt-0.5">Utpal Ghosh Official</p>
              </div>
              <button
                type="button"
                aria-label="Close inquiry dialog"
                onClick={() => setInquiryOpen(false)}
                className="w-9 h-9 inline-flex items-center justify-center rounded-md text-[#575652] hover:text-[#141413] hover:bg-black/5 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center">
                <div className="w-10 h-10 rounded-full bg-[#141413] text-[#F9F9F8] inline-flex items-center justify-center mb-4">
                  <Check className="w-5 h-5" />
                </div>
                <h3 className="font-editorial text-2xl font-medium text-[#141413]">
                  Message Prepared
                </h3>
                <p className="mt-2 text-sm text-[#575652] max-w-sm mx-auto leading-relaxed">
                  Thank you, {name}. Your {topic.toLowerCase()} note has been recorded in this
                  preview. Official email routing can be connected once your contact details are
                  provided.
                </p>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={resetInquiryForm}
                    className="px-4 py-2 text-xs font-medium text-[#4A4945] border border-black/15 rounded-md hover:bg-black/5 transition-colors cursor-pointer"
                  >
                    Send Another
                  </button>
                  <button
                    type="button"
                    onClick={() => setInquiryOpen(false)}
                    className="px-5 py-2 text-xs font-medium bg-[#141413] text-[#F9F9F8] rounded-md hover:bg-[#2C2B29] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-xs font-medium text-[#4A4945] mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F9F9F8] border border-black/12 rounded-md text-[#141413] placeholder:text-[#8C8B85] focus:outline-none focus:border-[#141413]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="inquiry-email"
                      className="block text-xs font-medium text-[#4A4945] mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="inquiry-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 text-sm bg-[#F9F9F8] border border-black/12 rounded-md text-[#141413] placeholder:text-[#8C8B85] focus:outline-none focus:border-[#141413]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-topic"
                    className="block text-xs font-medium text-[#4A4945] mb-1.5"
                  >
                    Subject
                  </label>
                  <select
                    id="inquiry-topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value as InquiryTopic)}
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F9F9F8] border border-black/12 rounded-md text-[#141413] focus:outline-none focus:border-[#141413]"
                  >
                    {INQUIRY_TOPICS.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="inquiry-message"
                    className="block text-xs font-medium text-[#4A4945] mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="inquiry-message"
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Share details regarding your inquiry..."
                    className="w-full px-3.5 py-2.5 text-sm bg-[#F9F9F8] border border-black/12 rounded-md text-[#141413] placeholder:text-[#8C8B85] focus:outline-none focus:border-[#141413] resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setInquiryOpen(false)}
                    className="px-4 py-2.5 text-xs font-medium text-[#575652] hover:text-[#141413] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-xs font-medium bg-[#141413] text-[#F9F9F8] rounded-md hover:bg-[#2C2B29] transition-colors cursor-pointer"
                  >
                    Send Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
