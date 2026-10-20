import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
import path from 'path';

// Configure Cloudinary if credentials are provided in .env.local
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const hasCloudinary = Boolean(cloudName && apiKey && apiSecret);

if (hasCloudinary) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. If full Cloudinary credentials exist, upload to Cloudinary
    if (hasCloudinary) {
      const mime = file.type || 'image/jpeg';
      const base64Data = `data:${mime};base64,${buffer.toString('base64')}`;
      
      const result = await cloudinary.uploader.upload(base64Data, {
        folder: 'kr-environ',
        resource_type: 'image'
      });

      return NextResponse.json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
        source: 'cloudinary'
      });
    }

    // 2. Fallback: Save locally into public/uploads for instant local development
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    try {
      await fs.mkdir(uploadsDir, { recursive: true });
    } catch (e) {
      // directory exists
    }

    const cleanFilename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(uploadsDir, cleanFilename);
    await fs.writeFile(filePath, buffer);

    const localUrl = `/uploads/${cleanFilename}`;
    return NextResponse.json({
      success: true,
      url: localUrl,
      source: 'local',
      note: 'Saved locally. Add CLOUDINARY_API_KEY & CLOUDINARY_API_SECRET in .env.local for live Cloudinary storage.'
    });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Image upload failed' },
      { status: 500 }
    );
  }
}
