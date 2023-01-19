/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.plu457.life',
  generateRobotsTxt: true,
  sitemapSize: 7000,
};
