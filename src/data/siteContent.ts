export interface MediaPlatformLink {
  platform: 'YouTube' | 'Instagram' | 'LinkedIn';
  label: string;
  url: string;
}

export interface FeaturedTalk {
  id: string;
  series: string;
  title: string;
  organization: string;
  category: string;
  summary: string;
  youtubeId: string;
  links: MediaPlatformLink[];
}

export interface FounderReel {
  id: string;
  title: string;
  context: string;
  duration: string;
  summary: string;
  videoSrc: string;
  posterSrc: string;
}

export interface MealPillar {
  number: string;
  title: string;
  items: string;
  detail: string;
}

export interface MilestoneItem {
  period: string;
  title: string;
  organization: string;
  detail: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Meal Kits & Eats' | 'Community & Recognition';
  caption: string;
  src: string;
  aspect: 'landscape' | 'portrait';
}

export interface LeaderProfile {
  name: string;
  role: string;
  organization: string;
  location: string;
  credentials: string;
}

export interface OfficialDocument {
  id: string;
  title: string;
  subtitle: string;
  pages: string;
  href: string;
}

export const FOUNDER_PROFILE = {
  name: 'Utpal Ghosh',
  role: 'Founder & CEO',
  company: 'Healthcode Protein Box Pvt. Ltd.',
  brand: 'Protein Box',
  tagline: 'Eat Like A Pro',
  motto: 'You have the will... we have the meal... and we deliver it fresh too.',
  partOfSpeech: 'noun',
  definition:
    "The venture builder who creates from zero-to-1 and amplifies it to '10' exponentially.",
  quote: 'He fails fast, recovers faster and re-builds fastest.',
  incubation: 'T-Hub Hyderabad · Lab 32 (Cohort 10)',
  cities: ['Goa', 'Hyderabad', 'Nagpur', 'Kolkata', 'Pune'],
  portraitSrc: './assets/extracted/utpal_portrait.jpg',
  contact: {
    personalEmail: 'utpalghoshofficial@gmail.com',
    companyEmail: 'reach.out@protein-box.com',
    primaryPhone: '+91 8850916053',
    secondaryPhone: '+91 9923095991',
    website: 'https://www.protein-box.com',
    websiteLabel: 'www.protein-box.com',
  },
};

export const FEATURED_TALK: FeaturedTalk = {
  id: 'thub-founder-talks-protein-box',
  series: 'T-Hub Founder Talks Series',
  title: 'Protein Box',
  organization: 'T-Hub Hyderabad',
  category: 'Founder Interview · Video Feature',
  summary:
    'Utpal Ghosh joins the T-Hub Founder Talks Series to discuss building Protein Box, making freshly prepared high-protein nutrition accessible, and scaling within India’s innovation ecosystem.',
  youtubeId: '78YO_mNN0NE',
  links: [
    {
      platform: 'YouTube',
      label: 'Watch full episode on YouTube',
      url: 'https://youtu.be/78YO_mNN0NE?feature=shared',
    },
    {
      platform: 'Instagram',
      label: 'Watch feature reel on Instagram',
      url: 'https://www.instagram.com/reel/C3t4aPaqsLL/?igsh=MXZrcm1wYzdndXo5Ng==',
    },
    {
      platform: 'LinkedIn',
      label: 'Read T-Hub announcement on LinkedIn',
      url: 'https://www.linkedin.com/posts/thubhyd_thubfoundertalks-innovatewiththub-innovationecosystem-activity-7167035421749600256-9h59?utm_source=share&utm_medium=member_desktop',
    },
  ],
};

export const FOUNDER_REELS: FounderReel[] = [
  {
    id: 'on2cook-partnership',
    title: 'Kitchen Automation & Pan-India Scaling with On2Cook',
    context: 'Strategic Partnership · Goa to Mumbai & Pan-India',
    duration: '1:34',
    summary:
      'Utpal Ghosh shares how visiting On2Cook’s Ahmedabad Experience Center and collaborating with founder Sanandan led to deploying automated cooking technology across Protein Box outlets—starting in Goa, expanding to Mumbai, and scaling pan-India.',
    videoSrc: './assets/aistudio/da4faf57-db95-4764-a300-a419068e6266_9bddbf48.mov',
    posterSrc: './assets/posters/on2cook_poster.jpg',
  },
  {
    id: 'healthy-food-niche',
    title: 'Why Healthy Food & High Protein Is an Enduring Business',
    context: 'Founder Perspective · Market Thesis',
    duration: '0:36',
    summary:
      'A concise take on why clean nutrition, high-protein meals, and millet-forward menus represent one of India’s most durable, high-conviction consumer opportunities.',
    videoSrc: './assets/aistudio/1493cefa-836d-4904-8c03-e62371fe2e83_135243d1.mov',
    posterSrc: './assets/posters/healthy_food_poster.jpg',
  },
];

export const PROTEIN_BOX_MODEL = {
  problem:
    'Fitness centers and health awareness are growing rapidly across Indian cities, yet everyday food awareness and reliable access to freshly prepared, macro-balanced healthy meals remain scarce.',
  solution:
    'Protein Box bridges that gap with freshly cooked, high-protein meals delivered daily—alongside specialized diet plans covering clinical diets, therapeutic meals, senior citizen care, and kids’ healthy meal boxes.',
};

export const MEAL_PILLARS: MealPillar[] = [
  {
    number: '01',
    title: 'Healthy & Fresh',
    items: 'Fresh Salads · Healthy Lunch Boxes',
    detail: 'Daily prepared whole-ingredient bowls and lunch boxes built for clean everyday nutrition.',
  },
  {
    number: '02',
    title: 'Performance & Recovery',
    items: 'Post-Workout Meals · Pro Athlete Meals',
    detail: 'Macro-calibrated nutrition trusted by national and international athletes and bodybuilders.',
  },
  {
    number: '03',
    title: 'Everyday Essentials',
    items: 'Corporate Meals · Kids Meals · Specialized Diets',
    detail: 'Tailored subscriptions for busy professionals, schools, senior care, and clinical or therapeutic needs.',
  },
  {
    number: '04',
    title: 'Power Shakes & Grills',
    items: '100% Natural High-Protein Shakes · Grilled High-Protein Meals',
    detail: 'No-added-sugar natural shakes and freshly grilled high-protein platters designed for flavor and fuel.',
  },
];

export const RECOGNITION_MILESTONES: MilestoneItem[] = [
  {
    period: '2023',
    title: 'Incubated at T-Hub Hyderabad — Lab 32, Cohort 10',
    organization: 'T-Hub Startup Incubation Center',
    detail: 'Shortlisted and incubated under T-Hub’s flagship Lab 32 program in Hyderabad.',
  },
  {
    period: 'Apr 2023',
    title: 'Top 400 Start-ups in India (6,000+ Applications)',
    organization: 'IDFC Bank · Money Control · CNBC-TV18',
    detail: 'Selected for the Leap to Unicorn Bootcamp conducted by IDFC Bank with Money Control and CNBC-TV18.',
  },
  {
    period: 'Season 2',
    title: 'Qualified for Shark Tank India — Second Round',
    organization: 'Shark Tank India',
    detail: 'Advanced to the second round of Shark Tank India Season 2 with the Protein Box model.',
  },
  {
    period: '2022–23',
    title: 'Top 100 Start-up Proposals Nationwide',
    organization: 'Tata Social Enterprise Challenge & IIM Kolkata',
    detail: 'Ranked amongst the top 100 startup proposals evaluated by TSEC and IIM Kolkata.',
  },
  {
    period: 'Govt. of India',
    title: '100 Selected Partners — Traffic Rewards Program',
    organization: 'Launched by Hon. Union Minister Nitin Gadkari',
    detail: 'Chosen as one of 100 national brand partners for the Government of India’s Traffic Rewards initiative.',
  },
  {
    period: 'Apr 2022',
    title: 'Featured Health Food Brand',
    organization: 'Money Control News Portal',
    detail: 'Highlighted in Money Control’s April 2022 edition covering emerging Indian health food brands.',
  },
];

export const ATHLETE_PARTNERS = [
  {
    name: 'Pearl Colvalcar',
    discipline: 'National & International Sailor',
    note: 'Nutrition partner for national and international competitive sailing.',
  },
  {
    name: 'Baba Safi Pathan',
    discipline: 'Ranji Baroda Player · RCB Net Bowler',
    note: 'Daily performance nutrition supporting national-level cricket.',
  },
  {
    name: 'Rohit Salgaonkar',
    discipline: 'Mr. Goa (Inter-Collegiate) 2021–22',
    note: 'Trusted meal partner for competitive physique and bodybuilding athletes.',
  },
];

export const GYM_AND_SPACE_PARTNERS = [
  'SPL Fitness Hub',
  "Kevin's Akhada",
  'Fitness Bar',
  "Basilio's 7 Health Club",
  'A Hospitality',
  'Stint Studio',
];

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: 'meal-kit-flatlay',
    title: 'Complete Subscription Meal Kit',
    category: 'Meal Kits & Eats',
    caption: 'Protein Box Eat Clean subscription packaging with 100% natural shake, fresh meal box, and dietician-curated plan guide.',
    src: './assets/extracted/snapshot_14.jpg',
    aspect: 'portrait',
  },
  {
    id: 'macro-meal-box',
    title: 'Macro-Labelled Delivery & Natural Shake',
    category: 'Meal Kits & Eats',
    caption: 'Freshly packed Protein Box meal with custom calorie and macro card alongside a 100% natural smoothie.',
    src: './assets/extracted/snapshot_05.jpg',
    aspect: 'landscape',
  },
  {
    id: 'signature-bags',
    title: 'Eat Clean · Daily Dispatch Bags',
    category: 'Meal Kits & Eats',
    caption: 'Daily batch dispatch for monthly subscription and corporate meal plans across partner cities.',
    src: './assets/extracted/snapshot_08.jpg',
    aspect: 'portrait',
  },
  {
    id: 'fresh-bowl-shake',
    title: 'High-Protein Bowl & Berry Shake',
    category: 'Meal Kits & Eats',
    caption: 'Fresh broccoli, lean protein bowl, and no-added-sugar natural smoothie prepared to order.',
    src: './assets/extracted/snapshot_09.jpg',
    aspect: 'portrait',
  },
  {
    id: 'mushroom-sandwich',
    title: 'Cheesy Corn Spinach Mushroom Sandwich',
    category: 'Meal Kits & Eats',
    caption: 'Whole-grain grilled sandwich packed with fresh spinach, sweet corn, and mushrooms.',
    src: './assets/extracted/snapshot_15.jpg',
    aspect: 'landscape',
  },
  {
    id: 'sprout-bhel',
    title: 'Sprout Bhel',
    category: 'Meal Kits & Eats',
    caption: 'High-protein sprouted legumes tossed with crisp red cabbage, tomatoes, and fresh herbs.',
    src: './assets/extracted/snapshot_17.jpg',
    aspect: 'landscape',
  },
  {
    id: 'corn-bhel',
    title: 'Corn Bhel',
    category: 'Meal Kits & Eats',
    caption: 'Light, nutrient-dense savory sweet corn bowl prepared fresh for midday energy.',
    src: './assets/extracted/snapshot_18.jpg',
    aspect: 'landscape',
  },
  {
    id: 'watermelon-wonder',
    title: 'PB Watermelon Wonder',
    category: 'Meal Kits & Eats',
    caption: 'Hydrating 100% natural watermelon blend crafted with zero refined sugar.',
    src: './assets/extracted/snapshot_19.jpg',
    aspect: 'landscape',
  },
  {
    id: 'athlete-partners',
    title: 'National & International Athlete Partners',
    category: 'Community & Recognition',
    caption: 'Protein Box serving sailor Pearl Colvalcar, cricketer Baba Safi Pathan, and Mr. Goa Rohit Salgaonkar.',
    src: './assets/extracted/snapshot_03.jpg',
    aspect: 'landscape',
  },
  {
    id: 'traffic-rewards',
    title: 'Traffic Rewards Launch — Govt. of India Initiative',
    category: 'Community & Recognition',
    caption: 'Selected among 100 national partners at the Traffic Rewards launch graced by Hon. Union Minister Nitin Gadkari.',
    src: './assets/extracted/snapshot_07.jpg',
    aspect: 'landscape',
  },
  {
    id: 'doctors-conference',
    title: 'Protein Box at Doctors Conference',
    category: 'Community & Recognition',
    caption: 'Presenting clinical, therapeutic, and everyday clean nutrition boxes to medical professionals.',
    src: './assets/extracted/snapshot_04.jpg',
    aspect: 'landscape',
  },
  {
    id: 'gym-tieups',
    title: 'Fitness & Co-Working Ecosystem Tie-Ups',
    category: 'Community & Recognition',
    caption: 'Active partnerships with gyms and co-working spaces across Goa and Nagpur.',
    src: './assets/extracted/snapshot_02.jpg',
    aspect: 'landscape',
  },
];

export const LEADERSHIP_TEAM: LeaderProfile[] = [
  {
    name: 'Utpal Ghosh',
    role: 'Founder & CEO',
    organization: 'Healthcode Protein Box Pvt. Ltd.',
    location: 'Goa · Hyderabad · Nagpur · Kolkata · Pune',
    credentials: 'Venture builder leading product vision, automation strategy, and multi-city expansion; T-Hub Lab 32 founder.',
  },
  {
    name: 'Debopriya Chakroborty',
    role: 'Co-Founder',
    organization: 'Healthcode Protein Box Pvt. Ltd.',
    location: 'Ahmedabad · Goa · Nagpur · Pune',
    credentials: 'CEO, Antrapreneur The Business Incubator · beVisioneers: The Mercedes-Benz Fellowship · BIT Mesra.',
  },
  {
    name: 'Varun Chawla',
    role: 'Mentor & Investor',
    organization: 'Build3 · 91Springboard',
    location: 'Pernem, Goa',
    credentials: 'Founder of 91Springboard, Build3, and Startup Eco-ashram · Cornell University.',
  },
  {
    name: 'Jerry Austin',
    role: 'Director (Customer Experience)',
    organization: 'Healthcode Protein Box Pvt. Ltd.',
    location: 'North Goa, India',
    credentials: 'Head of Operations overseeing kitchen execution, service quality, and customer retention.',
  },
];

export const OFFICIAL_DOCUMENTS: OfficialDocument[] = [
  {
    id: 'protein-box-snapshot',
    title: 'Protein Box — Brand Snapshot & Highlights',
    subtitle: 'Founder profile, national milestones, athlete nutrition & meal showcase',
    pages: '5 pages · PDF',
    href: './assets/aistudio/Protein_Box_Snapshot_832636f4.pdf',
  },
  {
    id: 'founder-business-card',
    title: 'Utpal Ghosh — Founder Card & Meal Overview',
    subtitle: 'Problem, solution, specialized diet plans & 4 meal categories',
    pages: '3 pages · PDF',
    href: './assets/aistudio/UJG_Business_Card_PB_014943b5.pdf',
  },
  {
    id: 'leadership-team-deck',
    title: 'Protein Box — Leadership & Advisory Team',
    subtitle: 'Founders, investors, operational leadership & company contacts',
    pages: '6 pages · PDF',
    href: './assets/aistudio/Protein_Box_Leadership_Team_123a3c7b.pdf',
  },
];
