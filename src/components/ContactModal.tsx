import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Mail, Phone, ExternalLink } from 'lucide-react';
import { FOUNDER_PROFILE } from '../data/siteContent';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SUBJECT_OPTIONS = [
  'Speaking & Founder Talks',
  'Partnerships & Distribution',
  'Press & Media Feature',
  'Investor Relations',
  'General Correspondence',
] as const;

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState<(typeof SUBJECT_OPTIONS)[number]>(SUBJECT_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyValue = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // Clipboard API unavailable in restricted context
    }
  };

  const handleOpenEmailClient = (e: React.FormEvent) => {
    e.preventDefault();
    const compiledSubject = encodeURIComponent(
      `[utpalghoshofficial] ${subject}${senderName.trim() ? ` — ${senderName.trim()}` : ''}`
    );
    const compiledBody = encodeURIComponent(
      `${message.trim()}\n\n— ${senderName.trim() || 'Sent via utpalghoshofficial'}`
    );
    window.location.href = `mailto:${FOUNDER_PROFILE.contact.personalEmail}?subject=${compiledSubject}&body=${compiledBody}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg bg-white rounded-xl border border-black/[0.09] shadow-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-black/[0.08] flex items-center justify-between">
          <div>
            <h2
              id="contact-dialog-title"
              className="font-editorial text-2xl font-medium text-[#141413]"
            >
              Connect with Utpal Ghosh
            </h2>
            <p className="text-xs text-[#6E6D68] mt-0.5">
              Founder & CEO · Healthcode Protein Box Pvt. Ltd.
            </p>
          </div>

          <button
            type="button"
            aria-label="Close contact modal"
            onClick={onClose}
            className="w-9 h-9 rounded-md inline-flex items-center justify-center text-[#575652] hover:text-[#141413] hover:bg-black/5 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Direct Static Channels */}
        <div className="px-6 py-4 bg-[#FAFAF8] border-b border-black/[0.08] space-y-2.5 text-xs">
          <div className="flex items-center justify-between gap-3">
            <a
              href={`mailto:${FOUNDER_PROFILE.contact.personalEmail}`}
              className="inline-flex items-center gap-2 text-[#141413] hover:text-[#8A6200] transition-colors truncate"
            >
              <Mail className="w-3.5 h-3.5 shrink-0 text-[#6E6D68]" />
              <span className="truncate">{FOUNDER_PROFILE.contact.personalEmail}</span>
            </a>
            <button
              type="button"
              onClick={() => copyValue('personalEmail', FOUNDER_PROFILE.contact.personalEmail)}
              className="inline-flex items-center gap-1 text-[#575652] hover:text-[#141413] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedKey === 'personalEmail' ? (
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

          <div className="flex items-center justify-between gap-3">
            <a
              href={`tel:${FOUNDER_PROFILE.contact.primaryPhone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-2 text-[#141413] hover:text-[#8A6200] transition-colors tabular-nums"
            >
              <Phone className="w-3.5 h-3.5 shrink-0 text-[#6E6D68]" />
              <span>
                {FOUNDER_PROFILE.contact.primaryPhone} · {FOUNDER_PROFILE.contact.secondaryPhone}
              </span>
            </a>
            <button
              type="button"
              onClick={() => copyValue('phone', FOUNDER_PROFILE.contact.primaryPhone)}
              className="inline-flex items-center gap-1 text-[#575652] hover:text-[#141413] whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copiedKey === 'phone' ? (
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
        </div>

        {/* Compose Mailto Email */}
        <form onSubmit={handleOpenEmailClient} className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="contact-sender-name"
                className="block text-xs font-medium text-[#4A4945] mb-1.5"
              >
                Your Name
              </label>
              <input
                id="contact-sender-name"
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="Full name"
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAF8] border border-black/12 rounded-md text-[#141413] placeholder:text-[#8C8B85] focus:outline-none focus:border-[#141413]"
              />
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="block text-xs font-medium text-[#4A4945] mb-1.5"
              >
                Topic
              </label>
              <select
                id="contact-subject"
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value as (typeof SUBJECT_OPTIONS)[number])
                }
                className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAF8] border border-black/12 rounded-md text-[#141413] focus:outline-none focus:border-[#141413]"
              >
                {SUBJECT_OPTIONS.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="block text-xs font-medium text-[#4A4945] mb-1.5"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your note—this opens directly in your email client addressed to utpalghoshofficial@gmail.com."
              className="w-full px-3.5 py-2.5 text-sm bg-[#FAFAF8] border border-black/12 rounded-md text-[#141413] placeholder:text-[#8C8B85] focus:outline-none focus:border-[#141413] resize-none"
            />
          </div>

          <div className="pt-1 flex items-center justify-between gap-3">
            <a
              href={FOUNDER_PROFILE.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#575652] hover:text-[#141413] transition-colors"
            >
              <span>{FOUNDER_PROFILE.contact.websiteLabel}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#575652] hover:text-[#141413] transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-medium bg-[#141413] text-[#F9F9F8] rounded-md hover:bg-[#2C2B29] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                Compose Email
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
