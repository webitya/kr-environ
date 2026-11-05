export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/admin-login', '/api/']
    },
    sitemap: 'https://www.krenviron.in/sitemap.xml'
  };
}

