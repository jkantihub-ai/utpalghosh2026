import React, { useState } from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  Menu,
  X,
  Play,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  Globe,
  Copy,
  Check,
  Maximize2,
} from 'lucide-react';
import {
  FOUNDER_PROFILE,
  FEATURED_TALK,
  FOUNDER_REELS,
  PROTEIN_BOX_MODEL,
  MEAL_PILLARS,
  RECOGNITION_MILESTONES,
  ATHLETE_PARTNERS,
  GYM_AND_SPACE_PARTNERS,
  GALLERY_PHOTOS,
  LEADERSHIP_TEAM,
  OFFICIAL_DOCUMENTS,
  type GalleryPhoto,
} from './data/siteContent';
import { MediaLightbox } from './components/MediaLightbox';
import { VideoReelCard } from './components/VideoReelCard';
import { ContactModal } from './components/ContactModal';

type GalleryFilter = 'All' | GalleryPhoto['category'];

const GALLERY_FILTERS: GalleryFilter[] = [
  'All',
  'Meal Kits & Eats',
  'Community & Recognition',
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [portraitError, setPortraitError] = useState(false);
  const [videoThumbError, setVideoThumbError] = useState(false);
  const [playYoutube, setPlayYoutube] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<GalleryFilter>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const visibleGallery =
    galleryFilter === 'All'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((item) => item.category === galleryFilter);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCopy = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(key);
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#141413] flex flex-col">
      {/* Top Bar Contract: 3 zones — Wordmark | 5 Nav Links | 1 Primary CTA */}
      <header className="sticky top-0 z-40 bg-[#FAFAF8]/92 backdrop-blur-sm border-b border-black/[0.08]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 h-16 flex items-center justify-between gap-8">
          <a
            href="#about"
            className="font-editorial text-2xl font-medium tracking-[-0.01em] text-[#141413] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413] rounded-sm"
          >
            Utpal Ghosh
          </a>

          <nav
            aria-label="Primary"
            className="hidden lg:flex items-center gap-7 text-sm text-[#575652]"
          >
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="hover:text-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('talks')}
              className="hover:text-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Talks
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('protein-box')}
              className="hover:text-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Protein Box
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('recognition')}
              className="hover:text-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Recognition
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('leadership')}
              className="hover:text-[#141413] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Leadership
            </button>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="hidden lg:inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium tracking-[0.02em] bg-[#141413] text-[#FAFAF8] rounded-md hover:bg-[#2C2B29] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAFAF8]"
            >
              Connect
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-[#141413] rounded-md hover:bg-black/5 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-black/[0.08] bg-[#FAFAF8] px-6 py-5">
            <nav className="flex flex-col gap-2 text-base text-[#141413]">
              {[
                { id: 'about', label: 'About', num: '01' },
                { id: 'talks', label: 'Founder Talks & Reels', num: '02' },
                { id: 'protein-box', label: 'Protein Box', num: '03' },
                { id: 'recognition', label: 'Recognition & Impact', num: '04' },
                { id: 'leadership', label: 'Leadership Team', num: '05' },
                { id: 'contact', label: 'Decks & Contact', num: '06' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="text-left py-2.5 border-b border-black/[0.06] flex items-center justify-between cursor-pointer"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-[#6E6D68] tabular-nums">{item.num}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setContactOpen(true);
                }}
                className="mt-3 w-full py-3 px-4 text-sm font-medium bg-[#141413] text-[#FAFAF8] rounded-md cursor-pointer"
              >
                Connect
              </button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 01. Hero & Founder Profile */}
        <section
          id="about"
          className="scroll-mt-16 max-w-[1280px] mx-auto px-6 md:px-10 pt-10 pb-14 md:pt-16 md:pb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between py-2">
              <div>
                <p className="text-xs text-[#6E6D68] tracking-[0.03em] mb-4">
                  {FOUNDER_PROFILE.role}
                  <span aria-hidden="true" className="mx-2">·</span>
                  {FOUNDER_PROFILE.company}
                </p>

                <h1
                  className="font-editorial text-[clamp(2.85rem,5.2vw,4.75rem)] leading-[1.02] tracking-[-0.02em] font-medium text-[#141413]"
                  style={{ textWrap: 'balance' }}
                >
                  {FOUNDER_PROFILE.name}
                </h1>

                {/* Authentic Dictionary Definition from Protein Box Snapshot */}
                <div className="mt-7 pt-6 border-t border-black/[0.08] max-w-[58ch]">
                  <p className="font-editorial italic text-xl text-[#8A6200]">
                    {FOUNDER_PROFILE.partOfSpeech}
                  </p>
                  <p className="mt-2 text-lg md:text-[21px] leading-[1.5] text-[#141413] font-normal">
                    {FOUNDER_PROFILE.definition}
                  </p>
                  <p className="mt-3 font-editorial italic text-xl md:text-2xl text-[#575652]">
                    “{FOUNDER_PROFILE.quote}”
                  </p>
                </div>
              </div>

              <div className="mt-10 pt-7 border-t border-black/[0.08] flex flex-wrap items-center gap-5">
                <button
                  type="button"
                  onClick={() => scrollToSection('talks')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-[#141413] text-[#FAFAF8] rounded-md hover:bg-[#2C2B29] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Watch Founder Talks</span>
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="inline-flex items-center gap-1.5 py-2 text-sm font-medium text-[#4A4945] hover:text-[#141413] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Decks &amp; Direct Contact</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Founder Portrait Frame */}
            <div className="lg:col-span-5">
              <div className="h-full flex flex-col rounded-xl overflow-hidden bg-white border border-black/[0.08]">
                <div className="relative flex-1 min-h-[290px] sm:min-h-[340px] bg-white flex items-end justify-center pt-6 px-4 overflow-hidden">
                  {!portraitError ? (
                    <img
                      src={FOUNDER_PROFILE.portraitSrc}
                      alt="Utpal Ghosh holding a Protein Box 100% Natural Shake bottle"
                      referrerPolicy="no-referrer"
                      onError={() => setPortraitError(true)}
                      className="w-full h-full max-h-[380px] object-contain object-bottom"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center">
                      <span className="font-editorial text-3xl text-[#141413]">Utpal Ghosh</span>
                      <span className="mt-1 text-xs text-[#6E6D68]">Founder &amp; CEO, Protein Box</span>
                    </div>
                  )}
                </div>

                <div className="px-6 py-5 bg-[#141413] text-[#FAFAF8] flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-[#FAFAF8]">
                      {FOUNDER_PROFILE.brand} — {FOUNDER_PROFILE.tagline}
                    </p>
                    <p className="text-xs text-white/70 mt-0.5">{FOUNDER_PROFILE.incubation}</p>
                  </div>
                  <a
                    href={FOUNDER_PROFILE.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#F2B705] hover:text-[#FFD147] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>protein-box.com</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Full-Width Key Facts Strip Below Hero Split */}
          <div className="mt-12 pt-8 border-t border-black/[0.08] grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div>
              <p className="text-xs text-[#6E6D68]">Flagship Venture</p>
              <p className="mt-1 text-sm font-medium text-[#141413]">
                Protein Box · Fresh High-Protein Meals
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6E6D68]">Incubation</p>
              <p className="mt-1 text-sm font-medium text-[#141413]">
                T-Hub Hyderabad · Lab 32 (Cohort 10)
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6E6D68]">City Footprint</p>
              <p className="mt-1 text-sm font-medium text-[#141413]">
                {FOUNDER_PROFILE.cities.join(' · ')}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#6E6D68]">Direct Correspondence</p>
              <a
                href={`mailto:${FOUNDER_PROFILE.contact.personalEmail}`}
                className="mt-1 block text-sm font-medium text-[#141413] hover:text-[#8A6200] transition-colors truncate"
              >
                {FOUNDER_PROFILE.contact.personalEmail}
              </a>
            </div>
          </div>
        </section>

        {/* 02. Founder Talks & Video Reels (Dark Screening Band) */}
        <section
          id="talks"
          className="scroll-mt-16 bg-[#111110] text-[#FAFAF8] border-t border-black/[0.08]"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/[0.12]">
              <div>
                <p className="text-xs text-[#F2B705] tracking-[0.03em] mb-3">
                  01 <span aria-hidden="true" className="mx-1.5 text-white/40">·</span>{' '}
                  {FEATURED_TALK.organization}
                  <span aria-hidden="true" className="mx-1.5 text-white/40">·</span>{' '}
                  {FEATURED_TALK.category}
                </p>
                <h2
                  className="font-editorial text-3xl md:text-5xl font-medium tracking-[-0.015em] text-white"
                  style={{ textWrap: 'balance' }}
                >
                  {FEATURED_TALK.series} — {FEATURED_TALK.title}
                </h2>
              </div>

              <a
                href={FEATURED_TALK.links[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#F2B705] hover:text-[#FFD147] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Open on YouTube</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* T-Hub Founder Talks YouTube Embed + Official Links */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              <div className="lg:col-span-7">
                <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/[0.12]">
                  {playYoutube ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${FEATURED_TALK.youtubeId}?autoplay=1&rel=0`}
                      title={`${FEATURED_TALK.series} — ${FEATURED_TALK.title}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => setPlayYoutube(true)}
                      aria-label={`Play ${FEATURED_TALK.series} — ${FEATURED_TALK.title}`}
                      className="group relative w-full h-full flex flex-col items-center justify-center cursor-pointer bg-gradient-to-br from-[#1C1B19] to-[#0B0B0A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2B705]"
                    >
                      {!videoThumbError && (
                        <img
                          src={`https://img.youtube.com/vi/${FEATURED_TALK.youtubeId}/hqdefault.jpg`}
                          alt={`${FEATURED_TALK.series} — ${FEATURED_TALK.title} video thumbnail`}
                          referrerPolicy="no-referrer"
                          onError={() => setVideoThumbError(true)}
                          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-[1.02] transition-transform duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
                      <div className="relative z-10 flex flex-col items-center text-center px-6">
                        <span className="w-16 h-16 rounded-full bg-[#F2B705] text-[#111110] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                          <Play className="w-6 h-6 fill-current ml-0.5" />
                        </span>
                        <span className="mt-5 font-editorial text-2xl md:text-3xl text-white font-medium">
                          {FEATURED_TALK.series}: {FEATURED_TALK.title}
                        </span>
                        <span className="mt-1.5 text-xs text-white/80 tracking-[0.02em]">
                          Play YouTube Feature
                        </span>
                      </div>
                    </button>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between">
                <p className="text-[15px] md:text-base leading-[1.75] text-white/80 tracking-[0.01em]">
                  {FEATURED_TALK.summary}
                </p>

                <div className="mt-8 pt-6 border-t border-white/[0.12]">
                  <p className="text-xs text-white/60 mb-4">Watch &amp; Read Across Platforms</p>
                  <div className="divide-y divide-white/[0.12] border-t border-b border-white/[0.12]">
                    {FEATURED_TALK.links.map((item) => (
                      <a
                        key={item.platform}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-4 flex items-center justify-between gap-4 group"
                      >
                        <div>
                          <span className="block text-sm font-medium text-white group-hover:text-[#F2B705] transition-colors">
                            {item.platform}
                          </span>
                          <span className="block text-xs text-white/65 mt-0.5">{item.label}</span>
                        </div>
                        <ExternalLink className="w-4 h-4 text-white/55 group-hover:text-[#F2B705] transition-colors shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02B. Uploaded Founder Video Reels */}
        <section className="bg-white border-t border-black/[0.08]">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-xs text-[#6E6D68] mb-2">
                  Founder Reels <span aria-hidden="true" className="mx-1.5">·</span> Direct Video
                  Dispatches
                </p>
                <h2
                  className="font-editorial text-3xl md:text-4xl font-medium tracking-[-0.015em] text-[#141413]"
                  style={{ textWrap: 'balance' }}
                >
                  Automation, scaling, and the healthy nutrition thesis.
                </h2>
              </div>
              <p className="text-xs text-[#6E6D68] max-w-[36ch]">
                Recorded conversations covering Protein Box’s On2Cook smart-kitchen partnership and
                India’s high-protein food market.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
              {FOUNDER_REELS.map((reel, index) => (
                <VideoReelCard key={reel.id} reel={reel} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* 03. Venture Spotlight: Protein Box */}
        <section
          id="protein-box"
          className="scroll-mt-16 border-t border-black/[0.08] bg-[#FAFAF8]"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-black/[0.08]">
              <div className="lg:col-span-5">
                <p className="text-xs text-[#6E6D68] mb-3">
                  02 <span aria-hidden="true" className="mx-1.5">·</span> Flagship Venture
                  <span aria-hidden="true" className="mx-1.5">·</span> {FOUNDER_PROFILE.company}
                </p>
                <h2
                  className="font-editorial text-3xl md:text-5xl font-medium tracking-[-0.015em] text-[#141413]"
                  style={{ textWrap: 'balance' }}
                >
                  Protein Box — Eat Like A Pro
                </h2>
                <p className="mt-4 font-editorial italic text-2xl text-[#8A6200]">
                  “{FOUNDER_PROFILE.motto}”
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="pt-1">
                  <h3 className="text-xs font-semibold text-[#141413] tracking-[0.04em]">
                    The Problem
                  </h3>
                  <p className="mt-3 text-sm md:text-[15px] leading-[1.7] text-[#4A4945]">
                    {PROTEIN_BOX_MODEL.problem}
                  </p>
                </div>

                <div className="pt-1">
                  <h3 className="text-xs font-semibold text-[#141413] tracking-[0.04em]">
                    The Solution
                  </h3>
                  <p className="mt-3 text-sm md:text-[15px] leading-[1.7] text-[#4A4945]">
                    {PROTEIN_BOX_MODEL.solution}
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Meal Pillars */}
            <div className="py-12 border-b border-black/[0.08]">
              <p className="text-xs text-[#6E6D68] mb-6">Types of Meals</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {MEAL_PILLARS.map((pillar) => (
                  <div key={pillar.number} className="pt-5 border-t border-black/[0.12]">
                    <span className="text-xs text-[#8A6200] font-medium tabular-nums">
                      {pillar.number}
                    </span>
                    <h3 className="mt-2 font-editorial text-2xl font-medium text-[#141413]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-xs font-medium text-[#4A4945]">{pillar.items}</p>
                    <p className="mt-2.5 text-sm leading-[1.65] text-[#575652]">{pillar.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Authentic Meal Kits & Community Gallery with Lightbox */}
            <div className="pt-14">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
                <div>
                  <p className="text-xs text-[#6E6D68] mb-2">Visual Archive</p>
                  <h3 className="font-editorial text-3xl md:text-4xl font-medium text-[#141413]">
                    Eats, Meal Kits &amp; Highlights
                  </h3>
                </div>

                {/* Interactive Segmented Filter Controls */}
                <div
                  role="tablist"
                  aria-label="Filter gallery"
                  className="inline-flex items-center gap-1 p-1 bg-[#EFECE5] rounded-lg self-start sm:self-auto"
                >
                  {GALLERY_FILTERS.map((filter) => {
                    const active = galleryFilter === filter;
                    return (
                      <button
                        key={filter}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => {
                          setGalleryFilter(filter);
                          setLightboxIndex(null);
                        }}
                        className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-white text-[#141413] shadow-sm'
                            : 'text-[#575652] hover:text-[#141413]'
                        }`}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {visibleGallery.map((photo, idx) => (
                  <button
                    key={photo.id}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    className="group text-left bg-white rounded-xl overflow-hidden border border-black/[0.08] hover:border-black/25 transition-colors flex flex-col cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#141413]"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECEAE5]">
                      <img
                        src={photo.src}
                        alt={photo.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute top-3 right-3 w-8 h-8 rounded-md bg-black/55 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-[11px] text-[#6E6D68]">{photo.category}</p>
                        <h4 className="mt-1 font-editorial text-xl font-medium text-[#141413] leading-snug">
                          {photo.title}
                        </h4>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-[#575652] line-clamp-2">
                        {photo.caption}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 04. Recognition, Milestones & Ecosystem */}
        <section
          id="recognition"
          className="scroll-mt-16 border-t border-black/[0.08] bg-white"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
              <div className="lg:col-span-4">
                <p className="text-xs text-[#6E6D68] mb-3">
                  03 <span aria-hidden="true" className="mx-1.5">·</span> National Recognition
                </p>
                <h2
                  className="font-editorial text-3xl md:text-4xl font-medium tracking-[-0.015em] text-[#141413]"
                  style={{ textWrap: 'balance' }}
                >
                  Selected highlights and institutional milestones.
                </h2>
                <p className="mt-4 text-sm leading-[1.7] text-[#575652] max-w-[36ch]">
                  From T-Hub Hyderabad incubation and national startup selections to Government of
                  India initiatives and competitive sports nutrition.
                </p>

                {/* Gym & Co-Working Tie-Ups */}
                <div className="mt-10 pt-7 border-t border-black/[0.08]">
                  <p className="text-xs font-medium text-[#141413]">
                    Fitness &amp; Co-Working Partners
                  </p>
                  <p className="mt-1 text-xs text-[#6E6D68]">Goa · Nagpur Ecosystem</p>
                  <p className="mt-3 text-sm leading-[1.8] text-[#4A4945]">
                    {GYM_AND_SPACE_PARTNERS.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="divide-y divide-black/[0.08] border-t border-b border-black/[0.08]">
                  {RECOGNITION_MILESTONES.map((milestone, idx) => (
                    <div
                      key={milestone.title}
                      className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                    >
                      <div className="sm:col-span-3 text-xs text-[#8A6200] font-medium tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                        <span aria-hidden="true" className="mx-1.5 text-black/25">/</span>
                        {milestone.period}
                      </div>
                      <div className="sm:col-span-9">
                        <h3 className="font-editorial text-2xl font-medium text-[#141413]">
                          {milestone.title}
                        </h3>
                        <p className="mt-0.5 text-xs text-[#6E6D68]">{milestone.organization}</p>
                        <p className="mt-2 text-sm leading-[1.65] text-[#4A4945]">
                          {milestone.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Athletes Nutrition Partner Strip */}
                <div className="mt-12">
                  <p className="text-xs text-[#6E6D68] mb-5">
                    Athlete Nutrition Partnerships · National &amp; International Sportspersons
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {ATHLETE_PARTNERS.map((athlete) => (
                      <div
                        key={athlete.name}
                        className="p-5 rounded-xl bg-[#FAFAF8] border border-black/[0.07]"
                      >
                        <h4 className="font-editorial text-2xl font-medium text-[#141413]">
                          {athlete.name}
                        </h4>
                        <p className="mt-1 text-xs font-medium text-[#8A6200]">
                          {athlete.discipline}
                        </p>
                        <p className="mt-2.5 text-xs leading-relaxed text-[#575652]">
                          {athlete.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05. Leadership & Advisory Team */}
        <section
          id="leadership"
          className="scroll-mt-16 border-t border-black/[0.08] bg-[#FAFAF8]"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="max-w-2xl mb-12">
              <p className="text-xs text-[#6E6D68] mb-3">
                04 <span aria-hidden="true" className="mx-1.5">·</span> Leadership &amp; Mentorship
              </p>
              <h2
                className="font-editorial text-3xl md:text-4xl font-medium tracking-[-0.015em] text-[#141413]"
                style={{ textWrap: 'balance' }}
              >
                The team building Healthcode Protein Box.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {LEADERSHIP_TEAM.map((person) => (
                <article
                  key={person.name}
                  className="p-6 rounded-xl bg-white border border-black/[0.08] flex flex-col justify-between"
                >
                  <div>
                    <p className="text-xs font-medium text-[#8A6200]">{person.role}</p>
                    <h3 className="mt-2 font-editorial text-2xl font-medium text-[#141413]">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-xs text-[#6E6D68]">{person.organization}</p>
                    <p className="mt-4 text-sm leading-[1.65] text-[#4A4945]">
                      {person.credentials}
                    </p>
                  </div>

                  <p className="mt-6 pt-4 border-t border-black/[0.06] text-xs text-[#6E6D68]">
                    {person.location}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 06. Official Decks & Direct Static Correspondence */}
        <section
          id="contact"
          className="scroll-mt-16 border-t border-black/[0.08] bg-white"
        >
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Downloadable Official PDF Decks */}
              <div className="lg:col-span-6">
                <p className="text-xs text-[#6E6D68] mb-3">
                  05 <span aria-hidden="true" className="mx-1.5">·</span> Press &amp; Investor Kit
                </p>
                <h2
                  className="font-editorial text-3xl md:text-4xl font-medium tracking-[-0.015em] text-[#141413]"
                  style={{ textWrap: 'balance' }}
                >
                  Official decks &amp; brand documents.
                </h2>
                <p className="mt-3 text-sm leading-[1.7] text-[#575652] max-w-[48ch]">
                  Download or view the official Protein Box overview decks, founder card, and
                  leadership team profile directly.
                </p>

                <div className="mt-8 divide-y divide-black/[0.08] border-t border-b border-black/[0.08]">
                  {OFFICIAL_DOCUMENTS.map((doc) => (
                    <a
                      key={doc.id}
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-4 flex items-start justify-between gap-4 group"
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <FileText className="w-4 h-4 text-[#8A6200] mt-1 shrink-0" />
                        <div className="min-w-0">
                          <span className="block text-sm font-medium text-[#141413] group-hover:text-[#8A6200] transition-colors">
                            {doc.title}
                          </span>
                          <span className="block text-xs text-[#6E6D68] mt-0.5">
                            {doc.subtitle} · {doc.pages}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#6E6D68] group-hover:text-[#141413] shrink-0 mt-1" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Direct Contact Desk */}
              <div className="lg:col-span-6 lg:pl-6">
                <p className="text-xs text-[#6E6D68] mb-3">Direct Correspondence</p>
                <h2
                  className="font-editorial text-3xl md:text-4xl font-medium tracking-[-0.015em] text-[#141413]"
                  style={{ textWrap: 'balance' }}
                >
                  Have the will? Let’s connect.
                </h2>
                <p className="mt-3 text-sm leading-[1.7] text-[#575652] max-w-[48ch]">
                  Reach out directly for speaking invitations, franchise &amp; strategic
                  partnerships, institutional nutrition programs, or press features.
                </p>

                <div className="mt-8 divide-y divide-black/[0.08] border-t border-b border-black/[0.08]">
                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <Mail className="w-4 h-4 text-[#6E6D68] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-[#6E6D68]">Founder Email</p>
                        <a
                          href={`mailto:${FOUNDER_PROFILE.contact.personalEmail}`}
                          className="text-sm font-medium text-[#141413] hover:text-[#8A6200] transition-colors block truncate"
                        >
                          {FOUNDER_PROFILE.contact.personalEmail}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy('founderEmail', FOUNDER_PROFILE.contact.personalEmail)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#575652] hover:text-[#141413] border border-black/10 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedField === 'founderEmail' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#8A6200]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <Mail className="w-4 h-4 text-[#6E6D68] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs text-[#6E6D68]">Protein Box Desk</p>
                        <a
                          href={`mailto:${FOUNDER_PROFILE.contact.companyEmail}`}
                          className="text-sm font-medium text-[#141413] hover:text-[#8A6200] transition-colors block truncate"
                        >
                          {FOUNDER_PROFILE.contact.companyEmail}
                        </a>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy('companyEmail', FOUNDER_PROFILE.contact.companyEmail)
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#575652] hover:text-[#141413] border border-black/10 rounded-md whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      {copiedField === 'companyEmail' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#8A6200]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[#6E6D68] shrink-0" />
                      <div>
                        <p className="text-xs text-[#6E6D68]">Phone</p>
                        <div className="flex flex-wrap items-center gap-x-2 text-sm font-medium text-[#141413] tabular-nums">
                          <a
                            href={`tel:${FOUNDER_PROFILE.contact.primaryPhone.replace(/\s+/g, '')}`}
                            className="hover:text-[#8A6200] transition-colors"
                          >
                            {FOUNDER_PROFILE.contact.primaryPhone}
                          </a>
                          <span aria-hidden="true" className="text-black/25">|</span>
                          <a
                            href={`tel:${FOUNDER_PROFILE.contact.secondaryPhone.replace(/\s+/g, '')}`}
                            className="hover:text-[#8A6200] transition-colors"
                          >
                            {FOUNDER_PROFILE.contact.secondaryPhone}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-[#6E6D68] shrink-0" />
                      <div>
                        <p className="text-xs text-[#6E6D68]">Official Venture Website</p>
                        <a
                          href={FOUNDER_PROFILE.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-[#141413] hover:text-[#8A6200] transition-colors"
                        >
                          {FOUNDER_PROFILE.contact.websiteLabel}
                        </a>
                      </div>
                    </div>
                    <a
                      href={FOUNDER_PROFILE.contact.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#575652] hover:text-[#141413] inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                    >
                      <span>Visit</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="mt-7">
                  <button
                    type="button"
                    onClick={() => setContactOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium bg-[#141413] text-[#FAFAF8] rounded-md hover:bg-[#2C2B29] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Draft Direct Email</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Minimalist Static Footer */}
      <footer className="border-t border-black/[0.08] bg-[#FAFAF8]">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6E6D68]">
          <p>
            © {new Date().getFullYear()} Utpal Ghosh · Healthcode Protein Box Pvt. Ltd.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={FEATURED_TALK.links[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141413] transition-colors"
            >
              YouTube
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={FEATURED_TALK.links[1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141413] transition-colors"
            >
              Instagram
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={FEATURED_TALK.links[2].url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141413] transition-colors"
            >
              LinkedIn
            </a>
            <span aria-hidden="true">·</span>
            <a
              href={FOUNDER_PROFILE.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#141413] transition-colors"
            >
              protein-box.com
            </a>
          </div>
        </div>
      </footer>

      {/* Fullscreen Lightbox for Gallery */}
      <MediaLightbox
        photos={visibleGallery}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(nextIdx) => setLightboxIndex(nextIdx)}
      />

      {/* Static Email Composer Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}
