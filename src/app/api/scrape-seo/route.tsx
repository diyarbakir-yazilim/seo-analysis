/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { SeoData } from '@/types/SeoData';
import puppeteer from 'puppeteer';


export async function POST(request: Request) {
  try {
    const { url }: { url: string } = await request.json();

    if (!url) {
      return NextResponse.json({ message: 'URL is required' }, { status: 400 });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return NextResponse.json({ message: 'Invalid URL format' }, { status: 400 });
    }

    let browser;
    const startTime = Date.now();
    
    try {
      // Launch browser with more options
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu'
        ]
      });

      const page = await browser.newPage();
      
      // Set viewport for mobile optimization check
      await page.setViewport({ width: 1920, height: 1080 });
      
      // Set user agent
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      // Track redirects
      const redirects: Array<{ from: string; to: string; status: number }> = [];
      
      page.on('response', response => {
        if (response.status() >= 300 && response.status() < 400) {
          redirects.push({
            from: response.url(),
            to: response.headers()['location'] || '',
            status: response.status()
          });
        }
      });

      // Navigate to the page
      const navigationStart = Date.now();
      const response = await page.goto(url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      const loadTime = Date.now() - navigationStart;

      // Check SSL
      const ssl = url.startsWith('https://');

      // Extract comprehensive SEO data
      const seoData = await page.evaluate(() => {
        // Helper function to get meta content
        const getMeta = (name: string): string | null => {
          const meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
          return meta ? meta.getAttribute('content') : null;
        };

        // Helper function to get structured data
        const getStructuredData = () => {
          const scripts = document.querySelectorAll('script[type="application/ld+json"]');
          const data: any[] = [];
          scripts.forEach(script => {
            try {
              data.push(JSON.parse(script.textContent || ''));
            } catch (e) {
              // Skip invalid JSON
            }
          });
          return data;
        };

        // Helper function to extract headings hierarchy
        const getHeadings = () => {
          const headings: Array<{ level: string; text: string }> = [];
          const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
          headingElements.forEach(heading => {
            headings.push({
              level: heading.tagName.toLowerCase(),
              text: heading.textContent?.trim() || ''
            });
          });
          return headings;
        };

        // Helper function to get all links
        const getLinks = () => {
          const links: Array<{ href: string; text: string; title: string | null }> = [];
          const linkElements = document.querySelectorAll('a[href]');
          linkElements.forEach(link => {
            const href = (link as HTMLAnchorElement).href;
            if (href) {
              links.push({
                href,
                text: link.textContent?.trim() || '',
                title: link.getAttribute('title')
              });
            }
          });
          return links;
        };

        // Extract social media links
        const getSocialMediaLinks = () => {
          const socialPlatforms = ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'tiktok', 'pinterest'];
          const socialLinks: Array<{ platform: string; url: string }> = [];
          
          document.querySelectorAll('a[href]').forEach(link => {
            const href = (link as HTMLAnchorElement).href.toLowerCase();
            socialPlatforms.forEach(platform => {
              if (href.includes(platform)) {
                socialLinks.push({ platform, url: (link as HTMLAnchorElement).href });
              }
            });
          });
          
          return socialLinks;
        };

        // Extract contact information
        const getContactInfo = () => {
          const text = document.body.innerText;
          const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
          const phones = text.match(/[\+]?[1-9][\d]{0,15}/g) || [];
          
          return {
            emails: [...new Set(emails)],
            phones: [...new Set(phones)],
            addresses: [] // Could be enhanced with address extraction
          };
        };

        // Extract business information from structured data
        const getBusinessInfo = () => {
          const structuredData = getStructuredData();
          let businessInfo = {
            name: null as string | null,
            type: null as string | null,
            address: null as string | null,
            phone: null as string | null,
            website: null as string | null
          };

          structuredData.forEach(item => {
            if (item['@type'] === 'Organization' || item['@type'] === 'LocalBusiness') {
              businessInfo.name = item.name || null;
              businessInfo.type = item['@type'] || null;
              businessInfo.phone = item.telephone || null;
              businessInfo.website = item.url || null;
              if (item.address) {
                businessInfo.address = typeof item.address === 'string' ? item.address : JSON.stringify(item.address);
              }
            }
          });

          return businessInfo;
        };

        // Detect technology stack
        const getTechStack = () => {
          const techStack: string[] = [];
          
          // Check for common frameworks/libraries
          if ((window as any)?.React) techStack.push('React');
          if ((window as any)?.Vue) techStack.push('Vue.js');
          if ((window as any)?.angular) techStack.push('Angular');
          if ((window as any)?.jQuery) techStack.push('jQuery');
          if (document.querySelector('script[src*="next"]')) techStack.push('Next.js');
          if (document.querySelector('script[src*="gatsby"]')) techStack.push('Gatsby');
          if (document.querySelector('script[src*="nuxt"]')) techStack.push('Nuxt.js');
          
          // Check for analytics
          if (document.querySelector('script[src*="google-analytics"]') || document.querySelector('script[src*="gtag"]')) {
            techStack.push('Google Analytics');
          }
          if (document.querySelector('script[src*="facebook.net"]')) techStack.push('Facebook Pixel');
          
          return techStack;
        };

        // Check mobile optimization
        const getMobileOptimized = () => {
          const viewport = getMeta('viewport');
          const hasViewport = viewport && viewport.includes('width=device-width');
          const hasResponsiveCSS = document.querySelector('link[href*="responsive"]') !== null;
          return Boolean(hasViewport || hasResponsiveCSS);
        };

        // Get schema types
        const getSchemaTypes = () => {
          const structuredData = getStructuredData();
          const types: string[] = [];
          structuredData.forEach(item => {
            if (item['@type']) {
              types.push(item['@type']);
            }
          });
          return [...new Set(types)];
        };

        // Calculate content readability
        const getContentReadability = () => {
          const text = document.body.innerText;
          const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
          const words = text.split(/\s+/).filter(w => w.length > 0);
          const syllables = words.reduce((acc, word) => {
            return acc + Math.max(1, word.toLowerCase().match(/[aeiouy]+/g)?.length || 1);
          }, 0);

          const avgWordsPerSentence = sentences.length > 0 ? words.length / sentences.length : 0;
          const avgSyllablesPerWord = words.length > 0 ? syllables / words.length : 0;
          
          // Flesch Reading Ease Score
          const fleschScore = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);

          return {
            fleschScore: Math.round(fleschScore),
            averageWordsPerSentence: Math.round(avgWordsPerSentence * 100) / 100,
            averageSentencesPerParagraph: 0 // Could be enhanced
          };
        };

        const links = getLinks();
        const headings = getHeadings();

        return {
          // Basic page info
          title: document.title,
          url: window.location.href,

          // Meta tags for SEO
          description: getMeta('description'),
          keywords: getMeta('keywords'),
          author: getMeta('author'),
          
          // Open Graph data
          ogTitle: getMeta('og:title'),
          ogDescription: getMeta('og:description'),
          ogImage: getMeta('og:image'),
          ogType: getMeta('og:type'),
          
          // Twitter Card data
          twitterTitle: getMeta('twitter:title'),
          twitterDescription: getMeta('twitter:description'),
          twitterImage: getMeta('twitter:image'),
          
          // Content analysis
          headings,
          wordCount: document.body.innerText.split(/\s+/).length,
          
          // Main content extraction
          mainContent: document.querySelector('main')?.innerText || 
                      document.querySelector('article')?.innerText || 
                      document.body.innerText.substring(0, 2000),
          
          // Structured data
          structuredData: getStructuredData(),
          
          // Links analysis
          internalLinks: links.filter(link => link.href.includes(window.location.hostname)),
          externalLinks: links.filter(link => !link.href.includes(window.location.hostname)),
          
          // Technical SEO
          lang: document.documentElement.lang,
          charset: document.characterSet,
          
          // Performance hints
          imagesCount: document.querySelectorAll('img').length,
          scriptsCount: document.querySelectorAll('script').length,
          
          // Enhanced data
          canonicalUrl: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null,
          viewport: getMeta('viewport'),
          robots: getMeta('robots'),
          sitemap: null, // Could be enhanced by checking robots.txt
          favicon: document.querySelector('link[rel="icon"]')?.getAttribute('href') || null,
          themeColor: getMeta('theme-color'),
          totalLinks: links.length,
          altTextMissing: document.querySelectorAll('img:not([alt])').length,
          h1Count: headings.filter(h => h.level === 'h1').length,
          metaRefresh: getMeta('refresh'),
          contentSecurityPolicy: getMeta('content-security-policy'),
          socialMediaLinks: getSocialMediaLinks(),
          contactInfo: getContactInfo(),
          businessInfo: getBusinessInfo(),
          techStack: getTechStack(),
          mobileOptimized: getMobileOptimized(),
          schemaTypes: getSchemaTypes(),
          contentReadability: getContentReadability(),
          
          // Timestamp
          scrapedAt: new Date().toISOString()
        };
      });

      // Get performance metrics
      const performanceMetrics = await page.metrics();
      const pageSpeed = performanceMetrics.TaskDuration || 0;

      // Take screenshot
      const screenshot = await page.screenshot({ 
        encoding: 'base64', 
        fullPage: false,
        clip: { x: 0, y: 0, width: 1200, height: 800 }
      });

      const result: SeoData & { performance: any; screenshot: string } = {
        ...seoData,
        pageSpeed,
        ssl,
        redirects,
        loadTime,
        performance: performanceMetrics,
        screenshot: `data:image/png;base64,${screenshot}`
      };

      return NextResponse.json(result);

    } catch (error) {
      console.error('Scraping error:', error);
      return NextResponse.json(
        { 
          message: 'Error scraping the website', 
          error: error instanceof Error ? error.message : 'Unknown error' 
        },
        { status: 500 }
      );
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  } catch (error) {
    return NextResponse.json(
      { 
        message: 'Invalid request', 
        error: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 400 }
    );
  }
}
