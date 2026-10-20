import { connectToDatabase } from './mongodb';
import Service from '@/models/Service';
import Blog from '@/models/Blog';
import Project from '@/models/Project';
import Gallery from '@/models/Gallery';
import Video from '@/models/Video';
import Enquiry from '@/models/Enquiry';

// Helper to convert Mongoose doc to clean plain JSON objects (stripping BSON ObjectId and __v)
function serializeDoc(doc) {
  if (!doc) return null;
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
  if (obj._id) {
    obj.id = obj.id || obj._id.toString();
  }
  delete obj.__v;
  return JSON.parse(JSON.stringify(obj));
}

// Kept for backward compatibility with existing route imports; database is persistent in MongoDB
export async function seedMongoDBIfNeeded() {
  return;
}

// ==================== SERVICES ====================
export async function getServices() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const items = await Service.find().sort({ createdAt: -1 }).lean();
      return (items || []).map(serializeDoc);
    }
  } catch (err) {
    console.error('Error fetching services from MongoDB:', err.message);
  }
  return [];
}

export async function getServiceBySlug(slug) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const item = await Service.findOne({ slug }).lean();
      if (item) return serializeDoc(item);
    }
  } catch (err) {
    console.error('Error fetching service by slug:', err.message);
  }
  return null;
}

export async function upsertService(serviceData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    const filter = serviceData.id && serviceData.id.length === 24
      ? { _id: serviceData.id }
      : { slug: serviceData.slug };

    const { id, _id, ...cleanData } = serviceData;

    const updated = await Service.findOneAndUpdate(
      filter,
      { $set: cleanData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    return serializeDoc(updated);
  } catch (err) {
    console.error('MongoDB upsertService error:', err.message);
    throw err;
  }
}

export async function deleteService(idOrSlug) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    if (idOrSlug && idOrSlug.length === 24) {
      await Service.findByIdAndDelete(idOrSlug);
    } else {
      await Service.findOneAndDelete({ slug: idOrSlug });
    }
    return true;
  } catch (err) {
    console.error('MongoDB deleteService error:', err.message);
    throw err;
  }
}

// ==================== BLOGS ====================
export async function getBlogs() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const items = await Blog.find().sort({ createdAt: -1 }).lean();
      return (items || []).map(serializeDoc);
    }
  } catch (err) {
    console.error('Error fetching blogs from MongoDB:', err.message);
  }
  return [];
}

export async function getBlogBySlug(slug) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const item = await Blog.findOne({ slug }).lean();
      if (item) return serializeDoc(item);
    }
  } catch (err) {
    console.error('Error fetching blog by slug:', err.message);
  }
  return null;
}

export async function upsertBlog(blogData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    const filter = blogData.id && blogData.id.length === 24
      ? { _id: blogData.id }
      : { slug: blogData.slug };

    const { id, _id, ...cleanData } = blogData;

    const updated = await Blog.findOneAndUpdate(
      filter,
      { $set: cleanData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    return serializeDoc(updated);
  } catch (err) {
    console.error('MongoDB upsertBlog error:', err.message);
    throw err;
  }
}

export async function deleteBlog(idOrSlug) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    if (idOrSlug && idOrSlug.length === 24) {
      await Blog.findByIdAndDelete(idOrSlug);
    } else {
      await Blog.findOneAndDelete({ slug: idOrSlug });
    }
    return true;
  } catch (err) {
    console.error('MongoDB deleteBlog error:', err.message);
    throw err;
  }
}

// ==================== PROJECTS ====================
export async function getProjects() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const items = await Project.find().sort({ createdAt: -1 }).lean();
      return (items || []).map(serializeDoc);
    }
  } catch (err) {
    console.error('Error fetching projects from MongoDB:', err.message);
  }
  return [];
}

export async function getProjectBySlug(slug) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const item = await Project.findOne({ slug }).lean();
      if (item) return serializeDoc(item);
    }
  } catch (err) {
    console.error('Error fetching project by slug:', err.message);
  }
  return null;
}

export async function upsertProject(projectData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    const filter = projectData.id && projectData.id.length === 24
      ? { _id: projectData.id }
      : { slug: projectData.slug };

    const { id, _id, ...cleanData } = projectData;

    const updated = await Project.findOneAndUpdate(
      filter,
      { $set: cleanData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    return serializeDoc(updated);
  } catch (err) {
    console.error('MongoDB upsertProject error:', err.message);
    throw err;
  }
}

export async function deleteProject(idOrSlug) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    if (idOrSlug && idOrSlug.length === 24) {
      await Project.findByIdAndDelete(idOrSlug);
    } else {
      await Project.findOneAndDelete({ slug: idOrSlug });
    }
    return true;
  } catch (err) {
    console.error('MongoDB deleteProject error:', err.message);
    throw err;
  }
}

// ==================== GALLERY ====================
export async function getGallery() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const items = await Gallery.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
      return (items || []).map(serializeDoc);
    }
  } catch (err) {
    console.error('Error fetching gallery from MongoDB:', err.message);
  }
  return [];
}

export async function upsertGallery(galleryData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    const { id, _id, ...cleanData } = galleryData;

    let doc;
    if (id && id.length === 24) {
      doc = await Gallery.findByIdAndUpdate(
        id,
        { $set: cleanData },
        { new: true, runValidators: true }
      ).lean();
    } else {
      doc = await Gallery.create(cleanData);
    }

    return serializeDoc(doc);
  } catch (err) {
    console.error('MongoDB upsertGallery error:', err.message);
    throw err;
  }
}

export async function deleteGallery(id) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');
    await Gallery.findByIdAndDelete(id);
    return true;
  } catch (err) {
    console.error('MongoDB deleteGallery error:', err.message);
    throw err;
  }
}

// ==================== VIDEOS ====================
export async function getVideos() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const items = await Video.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
      return (items || []).map(serializeDoc);
    }
  } catch (err) {
    console.error('Error fetching videos from MongoDB:', err.message);
  }
  return [];
}

export async function upsertVideo(videoData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    const { id, _id, ...cleanData } = videoData;

    let doc;
    if (id && id.length === 24) {
      doc = await Video.findByIdAndUpdate(
        id,
        { $set: cleanData },
        { new: true, runValidators: true }
      ).lean();
    } else {
      doc = await Video.create(cleanData);
    }

    return serializeDoc(doc);
  } catch (err) {
    console.error('MongoDB upsertVideo error:', err.message);
    throw err;
  }
}

export async function deleteVideo(id) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');
    await Video.findByIdAndDelete(id);
    return true;
  } catch (err) {
    console.error('MongoDB deleteVideo error:', err.message);
    throw err;
  }
}

// ==================== ENQUIRIES ====================
export async function getEnquiries() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const items = await Enquiry.find().sort({ createdAt: -1 }).lean();
      return (items || []).map(serializeDoc);
    }
  } catch (err) {
    console.error('Error fetching enquiries from MongoDB:', err.message);
  }
  return [];
}

export async function createEnquiry(enquiryData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    const doc = await Enquiry.create({
      ...enquiryData,
      date: new Date()
    });
    return serializeDoc(doc);
  } catch (err) {
    console.error('MongoDB createEnquiry error:', err.message);
    throw err;
  }
}

export async function deleteEnquiry(id) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');
    await Enquiry.findByIdAndDelete(id);
    return true;
  } catch (err) {
    console.error('MongoDB deleteEnquiry error:', err.message);
    throw err;
  }
}
