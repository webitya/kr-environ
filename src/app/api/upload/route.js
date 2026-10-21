import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with environment variables and secure credentials
function getCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'fjdmukyv';
  const apiKey = process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '116643283675257';
  const apiSecret = process.env.CLOUDINARY_API_SECRET || 'UX70B7MNFKNgfxLakSywBT9GKSs';

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
  });

  return cloudinary;
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const targetFolder = formData.get('folder') || 'kr-environ';

    if (!file) {
      return NextResponse.json({ success: false, error: 'No image file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const mime = file.type || 'image/jpeg';
    const base64Data = `data:${mime};base64,${buffer.toString('base64')}`;

    const cld = getCloudinary();
    const result = await cld.uploader.upload(base64Data, {
      folder: targetFolder,
      resource_type: 'image'
    });

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      publicId: result.public_id,
      format: result.format,
      width: result.width,
      height: result.height,
      source: 'cloudinary'
    });
  } catch (err) {
    console.error('Cloudinary upload error:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Cloudinary upload failed' },
      { status: 500 }
    );
  }
}
