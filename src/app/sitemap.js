import { getServices, getBlogs, getProducts } from '@/lib/db';

export default async function sitemap() {
  const baseUrl = 'https://www.krenviron.in';

  let services = [];
  let blogs = [];
  let products = [];

  try {
    [services, blogs, products] = await Promise.all([
      getServices().catch(() => []),
      getBlogs().catch(() => []),
      getProducts().catch(() => [])
    ]);
  } catch (e) {}

  const staticRoutes = [
    '',
    '/about-us',
    '/services',
    '/products',
    '/clients',
    '/partners',
    '/certificates',
    '/gallery',
    '/videos',
    '/blog',
    '/careers',
    '/contact-us',
    '/privacy-policy',
    '/terms-and-conditions'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8
  }));

  const serviceRoutes = (services || []).map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: s.updatedAt || new Date(),
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  const productRoutes = (products || []).map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  const blogRoutes = (blogs || []).map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: b.updatedAt || new Date(),
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...productRoutes,
    ...blogRoutes
  ];
}

