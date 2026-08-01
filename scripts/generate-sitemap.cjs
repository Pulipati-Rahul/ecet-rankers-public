const fs = require('fs');
const path = require('path');

const siteUrl = 'https://ecetrankers.in';
const routes = [
  '',
  '/practice',
  '/mock-tests',
  '/previous-papers',
  '/ts-ecet-preparation',
  '/ts-ecet-mock-test',
  '/ts-ecet-practice-questions',
  '/ts-ecet-previous-papers',
  '/ts-ecet-syllabus',
  '/cse-ecet',
  '/ece-ecet',
  '/eee-ecet',
  '/civil-ecet',
  '/mechanical-ecet',
  '/about',
  '/contact',
  '/privacy',
  '/terms'
];

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : route.includes('ecet') ? '0.8' : '0.5'}</priority>
  </url>`).join('\n')}
</urlset>`;

const destPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(destPath, sitemapContent.trim());
console.log(`Sitemap generated successfully at ${destPath}`);
