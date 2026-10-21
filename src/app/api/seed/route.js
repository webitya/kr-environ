import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Service from '@/models/Service';
import Blog from '@/models/Blog';
import Project from '@/models/Project';
import Gallery from '@/models/Gallery';
import Video from '@/models/Video';
import Enquiry from '@/models/Enquiry';
import Category from '@/models/Category';
import { seedMongoDBIfNeeded } from '@/lib/db';

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return NextResponse.json({
        success: false,
        message: 'Could not connect to MongoDB Atlas cluster. Please check cluster IP whitelist (0.0.0.0/0) in MongoDB Atlas.'
      }, { status: 500 });
    }

    await seedMongoDBIfNeeded();

    const [services, blogs, projects, gallery, videos, enquiries, categories] = await Promise.all([
      Service.countDocuments(),
      Blog.countDocuments(),
      Project.countDocuments(),
      Gallery.countDocuments(),
      Video.countDocuments(),
      Enquiry.countDocuments(),
      Category.countDocuments()
    ]);

    return NextResponse.json({
      success: true,
      message: 'Database connected and collections verified successfully!',
      counts: {
        services,
        blogs,
        projects,
        gallery,
        videos,
        enquiries,
        categories
      }
    });
  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 500 });
  }
}
