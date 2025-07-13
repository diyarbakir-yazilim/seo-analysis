/* eslint-disable @typescript-eslint/no-explicit-any */

export interface SeoData {
  title: string;
  url: string;
  description: string | null;
  keywords: string | null;
  author: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  ogType: string | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: string | null;
  headings: Array<{ level: string; text: string }>;
  wordCount: number;
  mainContent: string;
  structuredData: any[];
  internalLinks: Array<{ href: string; text: string; title: string | null }>;
  externalLinks: Array<{ href: string; text: string; title: string | null }>;
  lang: string;
  charset: string;
  imagesCount: number;
  scriptsCount: number;
  scrapedAt: string;
  // Enhanced data
  canonicalUrl: string | null;
  viewport: string | null;
  robots: string | null;
  sitemap: string | null;
  favicon: string | null;
  themeColor: string | null;
  pageSpeed: number;
  totalLinks: number;
  altTextMissing: number;
  h1Count: number;
  metaRefresh: string | null;
  contentSecurityPolicy: string | null;
  ssl: boolean;
  redirects: Array<{ from: string; to: string; status: number }>;
  socialMediaLinks: Array<{ platform: string; url: string }>;
  contactInfo: {
    emails: string[];
    phones: string[];
    addresses: string[];
  };
  businessInfo: {
    name: string | null;
    type: string | null;
    address: string | null;
    phone: string | null;
    website: string | null;
  };
  techStack: string[];
  loadTime: number;
  mobileOptimized: boolean;
  schemaTypes: string[];
  contentReadability: {
    fleschScore: number;
    averageWordsPerSentence: number;
    averageSentencesPerParagraph: number;
  };
}