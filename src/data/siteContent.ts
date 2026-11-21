export interface MediaPlatformLink {
  platform: 'YouTube' | 'Instagram' | 'LinkedIn';
  label: string;
  url: string;
}

export interface FeaturedAppearance {
  id: string;
  series: string;
  title: string;
  organization: string;
  category: string;
  summary: string;
  youtubeId?: string;
  links: MediaPlatformLink[];
}

export interface SiteChapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  status: 'populated' | 'ready';
}

export const FEATURED_APPEARANCES: FeaturedAppearance[] = [
  {
    id: 'thub-founder-talks-protein-box',
    series: 'T-Hub Founder Talks Series',
    title: 'Protein Box',
    organization: 'T-Hub Hyderabad',
    category: 'Founder Interview · Video Feature',
    summary:
      'Utpal Ghosh featured on the T-Hub Founder Talks Series spotlighting Protein Box and the entrepreneurial journey across the innovation ecosystem.',
    youtubeId: '78YO_mNN0NE',
    links: [
      {
        platform: 'YouTube',
        label: 'Watch on YouTube',
        url: 'https://youtu.be/78YO_mNN0NE?feature=shared',
      },
      {
        platform: 'Instagram',
        label: 'View Instagram Reel',
        url: 'https://www.instagram.com/reel/C3t4aPaqsLL/?igsh=MXZrcm1wYzdndXo5Ng==',
      },
      {
        platform: 'LinkedIn',
        label: 'Read on LinkedIn',
        url: 'https://www.linkedin.com/posts/thubhyd_thubfoundertalks-innovatewiththub-innovationecosystem-activity-7167035421749600256-9h59?utm_source=share&utm_medium=member_desktop',
      },
    ],
  },
];

export const SITE_CHAPTERS: SiteChapter[] = [
  {
    id: 'featured-media',
    number: '01',
    title: 'Founder Talks & Media',
    subtitle: 'T-Hub Founder Talks · Protein Box · Video & Social Releases',
    summary:
      'Live with the T-Hub Founder Talks Series feature on Protein Box across YouTube, Instagram, and LinkedIn.',
    status: 'populated',
  },
  {
    id: 'ventures',
    number: '02',
    title: 'Ventures & Protein Box',
    subtitle: 'Company Overview · Vision · Milestones',
    summary:
      'Ready for your uploaded story, product visuals, company milestones, and leadership overview.',
    status: 'ready',
  },
  {
    id: 'biography',
    number: '03',
    title: 'Biography & Leadership',
    subtitle: 'Portrait · Background · Speaking & Advisory',
    summary:
      'Ready for official portraits, biographical copy, credentials, and speaking engagements.',
    status: 'ready',
  },
  {
    id: 'gallery',
    number: '04',
    title: 'Gallery & Press Archive',
    subtitle: 'Photography · Publications · Appearances',
    summary:
      'Ready for uploaded event photography, press clippings, podcasts, and additional media files.',
    status: 'ready',
  },
];
