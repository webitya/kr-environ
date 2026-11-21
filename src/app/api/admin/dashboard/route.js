import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  getServices,
  getBlogs,
  getGallery,
  getVideos,
  getEnquiries,
  getClients,
  getProducts,
  getPartners,
  getCertificates,
  getCareers,
  getCareerApplications,
  getAboutImages,
  getAboutPagePhoto,
  getTeamMembers
} from '@/lib/db';
import { connectToDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('kr_admin_token');
    const expectedToken = (process.env.ADMIN_SESSION_SECRET || '').trim();

    if (!expectedToken || !token || token.value !== expectedToken) {
      return NextResponse.json({ authenticated: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Ensure database connection is active
    await connectToDatabase();

    // Query all datasets in parallel directly on the server
    const [
      services,
      blogs,
      gallery,
      videos,
      enquiries,
      clients,
      products,
      partners,
      certificates,
      careers,
      careerApplications,
      aboutImages,
      aboutPagePhoto,
      team
    ] = await Promise.all([
      getServices().catch(() => []),
      getBlogs().catch(() => []),
      getGallery().catch(() => []),
      getVideos().catch(() => []),
      getEnquiries().catch(() => []),
      getClients().catch(() => []),
      getProducts().catch(() => []),
      getPartners().catch(() => []),
      getCertificates().catch(() => []),
      getCareers({ includeClosed: true }).catch(() => []),
      getCareerApplications().catch(() => []),
      getAboutImages().catch(() => []),
      getAboutPagePhoto().catch(() => null),
      getTeamMembers().catch(() => [])
    ]);

    return NextResponse.json({
      success: true,
      authenticated: true,
      services: services || [],
      blogs: blogs || [],
      gallery: gallery || [],
      videos: videos || [],
      enquiries: enquiries || [],
      clients: clients || [],
      products: products || [],
      partners: partners || [],
      certificates: certificates || [],
      careers: careers || [],
      careerApplications: careerApplications || [],
      aboutImages: aboutImages || [],
      aboutPagePhoto: aboutPagePhoto || null,
      team: team || []
    });
  } catch (err) {
    console.error('Error fetching admin dashboard bundle:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}

