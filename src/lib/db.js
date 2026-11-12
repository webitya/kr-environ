import { connectToDatabase } from './mongodb';
import Service from '@/models/Service';
import Blog from '@/models/Blog';
import Gallery from '@/models/Gallery';
import Video from '@/models/Video';
import Enquiry from '@/models/Enquiry';
import Category from '@/models/Category';
import Client from '@/models/Client';
import Product from '@/models/Product';
import Partner from '@/models/Partner';
import Certificate from '@/models/Certificate';
import Career from '@/models/Career';
import CareerApplication from '@/models/CareerApplication';
import AboutImage from '@/models/AboutImage';

// Helper to convert Mongoose doc to clean plain JSON objects (stripping BSON ObjectId and __v)
function serializeDoc(doc) {
  if (!doc) return null;
  const obj = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
  if (obj._id) {
    const idStr = obj._id.toString();
    obj._id = idStr;
    obj.id = obj.id || idStr;
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
      const sorted = (items || []).sort((a, b) => {
        const ao = a.homeOrder >= 1 && a.homeOrder <= 4 ? a.homeOrder : 999;
        const bo = b.homeOrder >= 1 && b.homeOrder <= 4 ? b.homeOrder : 999;
        if (ao !== bo) return ao - bo;
        return 0;
      });
      return sorted.map(serializeDoc);
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

    const targetId = serviceData.id || serviceData._id;
    const filter = (targetId && String(targetId).length === 24)
      ? { _id: targetId }
      : { slug: serviceData.slug };

    const { id, _id, ...cleanData } = serviceData;
    const parsedHomeOrder = Number(cleanData.homeOrder) || 0;
    cleanData.homeOrder = parsedHomeOrder >= 1 && parsedHomeOrder <= 4 ? parsedHomeOrder : 0;

    if (cleanData.homeOrder >= 1 && cleanData.homeOrder <= 4) {
      const excludeFilter = (targetId && String(targetId).length === 24)
        ? { _id: { $ne: targetId } }
        : { slug: { $ne: cleanData.slug } };
      await Service.updateMany(
        { ...excludeFilter, homeOrder: cleanData.homeOrder },
        { $set: { homeOrder: 0 } }
      );
    }

    const updated = await Service.findOneAndUpdate(
      filter,
      { $set: cleanData },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    ).lean();

    // Auto-persist category to Category collection in MongoDB
    if (cleanData.category && cleanData.category.trim()) {
      addCategory(cleanData.category.trim(), 'service').catch(() => {});
    }

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
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    ).lean();

    // Auto-persist category to Category collection in MongoDB
    if (cleanData.category && cleanData.category.trim()) {
      addCategory(cleanData.category.trim()).catch(() => {});
    }

    return serializeDoc(updated);
  } catch (err) {
    console.error('MongoDB upsertBlog error:', err.message);
    throw err;
  }
}

// ==================== CATEGORIES ====================
export async function getCategories(type = null) {
  const defaultBlogCats = [
    'Wildlife Technology',
    'Field Conservation',
    'Rescue Operations',
    'Agricultural Security',
    'Sensors & Deterrence'
  ];
  const defaultVideoCats = [
    'Product Demonstration',
    'Field Operations',
    'Training & Rescue',
    'Ranger Safety'
  ];
  const defaultServiceCats = [
    'Wildlife Deterrence & Smart Sensors',
    'Perimeter Defense & Checkpoints',
    'Capture & Rescue Technology',
    'Personnel Protection Gear',
    'Turnkey Field Consultancy'
  ];
  const defaultGalleryCats = [
    'Field Presence',
    'Government Partnership',
    'Field Operations',
    'Credentials'
  ];

  try {
    const conn = await connectToDatabase();
    if (!conn) {
      if (type === 'video') return defaultVideoCats;
      if (type === 'service') return defaultServiceCats;
      if (type === 'gallery') return defaultGalleryCats;
      return defaultBlogCats;
    }

    const query = type ? { type: { $in: [type, 'general'] } } : {};
    const [savedCats, blogCats, videoCats, serviceCats, galleryCats] = await Promise.all([
      Category.find(query).lean().catch(() => []),
      type && type !== 'blog' ? Promise.resolve([]) : Blog.distinct('category').catch(() => []),
      type && type !== 'video' ? Promise.resolve([]) : Video.distinct('category').catch(() => []),
      type && type !== 'service' ? Promise.resolve([]) : Service.distinct('category').catch(() => []),
      type && type !== 'gallery' ? Promise.resolve([]) : Gallery.distinct('category').catch(() => [])
    ]);

    let baseDefaults = defaultBlogCats;
    if (type === 'video') baseDefaults = defaultVideoCats;
    else if (type === 'service') baseDefaults = defaultServiceCats;
    else if (type === 'gallery') baseDefaults = defaultGalleryCats;
    else baseDefaults = [...defaultBlogCats, ...defaultVideoCats, ...defaultServiceCats, ...defaultGalleryCats];

    const set = new Set(baseDefaults);
    (blogCats || []).forEach((c) => {
      if (c && typeof c === 'string' && c.trim()) set.add(c.trim());
    });
    (videoCats || []).forEach((c) => {
      if (c && typeof c === 'string' && c.trim()) set.add(c.trim());
    });
    (serviceCats || []).forEach((c) => {
      if (c && typeof c === 'string' && c.trim()) set.add(c.trim());
    });
    (galleryCats || []).forEach((c) => {
      if (c && typeof c === 'string' && c.trim()) set.add(c.trim());
    });
    (savedCats || []).forEach((c) => {
      if (c && c.name && c.name.trim()) set.add(c.name.trim());
    });

    return Array.from(set).sort();
  } catch (err) {
    console.error('Error fetching categories from MongoDB:', err.message);
    if (type === 'video') return defaultVideoCats;
    if (type === 'service') return defaultServiceCats;
    if (type === 'gallery') return defaultGalleryCats;
    return defaultBlogCats;
  }
}

export async function addCategory(name, type = 'blog') {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    const trimmedName = (name || '').trim();
    if (!trimmedName) throw new Error('Category name cannot be empty');

    const slug = trimmedName
      .toLowerCase()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const cat = await Category.findOneAndUpdate(
      { slug },
      { name: trimmedName, slug, type },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    ).lean();

    return serializeDoc(cat);
  } catch (err) {
    console.error('MongoDB addCategory error:', err.message);
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

// ==================== GALLERY ====================
export const FALLBACK_GALLERY = [
  {
    id: 'gal-1',
    title: 'Forest Headquarters Jharkhand (Van Bhawan, Doranda, Ranchi)',
    category: 'Field Presence',
    imageUrl: '/img4.jpeg',
    caption: 'S. Gupta at Forest Headquarters Jharkhand coordinating regional environmental and HWC initiatives.'
  },
  {
    id: 'gal-2',
    title: 'Consultation at D.F.O. Ranchi Desk',
    category: 'Government Partnership',
    imageUrl: '/img1.jpeg',
    caption: 'Presenting statutory environmental proposals and wildlife conflict dossiers to the Divisional Forest Officer, Ranchi.'
  },
  {
    id: 'gal-3',
    title: 'Meeting with PCCF & Chief Wildlife Warden',
    category: 'Government Partnership',
    imageUrl: '/img2.jpeg',
    caption: 'High-level briefing at the Principal Chief Conservator of Forests & Chief Wildlife Warden office at Van Bhawan, Ranchi.'
  },
  {
    id: 'gal-4',
    title: 'Forestry Clearance & Dossier Presentation',
    category: 'Government Partnership',
    imageUrl: '/img3.jpeg',
    caption: 'Reviewing statutory forest clearance and wildlife proposal dossiers with state authorities.'
  },
  {
    id: 'gal-5',
    title: 'Conservation Stewardship & Plantation Initiative',
    category: 'Field Operations',
    imageUrl: '/img5.jpeg',
    caption: 'Promoting tree plantation, geo-tagging, and conservation awareness with forest department officers.'
  },
  {
    id: 'gal-6',
    title: 'Laboratory Visit – Environmental Testing & Analysis',
    category: 'Field Presence',
    imageUrl: '/img2.jpeg',
    caption: 'Informative laboratory visit exploring testing methodology and water quality assessment.'
  },
  {
    id: 'gal-7',
    title: 'Official Company Visiting Card & Registration',
    category: 'Credentials',
    imageUrl: '/visitingcard.jpeg',
    caption: 'Official registered office at Hariom Nand Tower, Kathal More, and statutory contact particulars.'
  },
  {
    id: 'gal-8',
    title: 'Key Services & Technical Brochure',
    category: 'Credentials',
    imageUrl: '/details.jpeg',
    caption: 'Comprehensive statutory clearance, GIS drone survey, and environmental monitoring capabilities.'
  }
];

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
    if (cleanData.showOnHome !== undefined) {
      cleanData.showOnHome = Boolean(cleanData.showOnHome);
    }

    let doc;
    if (id && id.length === 24) {
      doc = await Gallery.findByIdAndUpdate(
        id,
        { $set: cleanData },
        { returnDocument: 'after', runValidators: true }
      ).lean();
    } else {
      doc = await Gallery.create(cleanData);
    }

    // Auto-persist category to Category collection in MongoDB
    if (cleanData.category && cleanData.category.trim()) {
      addCategory(cleanData.category.trim(), 'gallery').catch(() => {});
    }

    return serializeDoc(doc);
  } catch (err) {
    console.error('MongoDB upsertGallery error:', err.message);
    throw err;
  }
}

export async function deleteGallery(idOrQuery) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    if (!idOrQuery || idOrQuery === 'undefined' || idOrQuery === 'null') {
      throw new Error('Gallery ID is required');
    }

    const isValidObjectId = typeof idOrQuery === 'string' && /^[0-9a-fA-F]{24}$/.test(idOrQuery);

    let deleted = null;
    if (isValidObjectId) {
      deleted = await Gallery.findByIdAndDelete(idOrQuery);
    }

    if (!deleted) {
      deleted = await Gallery.findOneAndDelete({
        $or: [
          ...(isValidObjectId ? [{ _id: idOrQuery }] : []),
          { id: idOrQuery },
          { imageUrl: idOrQuery },
          { title: idOrQuery }
        ]
      });
    }

    return true;
  } catch (err) {
    console.error('MongoDB deleteGallery error:', err.message);
    throw err;
  }
}

// ==================== VIDEOS ====================
const FALLBACK_VIDEOS = [
  {
    id: 'vid-1',
    title: 'ANIDERS | Patented Animal Intrusion Detection & Repellent System',
    category: 'Product Demonstration',
    thumbnail: '/img4.jpeg',
    embedUrl: 'https://www.youtube.com/embed/sKlBSzb0TUA',
    description: 'National technology showcase detailing how patented ANIDERS bio-acoustic scarecrows deter elephants and wild animals with zero injury.',
    displayOrder: 1
  },
  {
    id: 'vid-2',
    title: 'ANIDERS Nocturnal Deterrence & Animal Repellent Field Test',
    category: 'Field Operations',
    thumbnail: '/img2.jpeg',
    embedUrl: 'https://www.youtube.com/embed/LyMRKxHR184',
    description: 'Infrared night footage showing wildlife turning back upon sensor trigger at agricultural perimeters.',
    displayOrder: 2
  },
  {
    id: 'vid-3',
    title: 'Wildlife Intrusion Detection & Field Training Demonstration',
    category: 'Training & Rescue',
    thumbnail: '/img1.jpeg',
    embedUrl: 'https://www.youtube.com/embed/I41i0_dbCpw',
    description: 'Demonstration of field deployment, solar power management, and human-wildlife mitigation tactical protocols.',
    displayOrder: 3
  },
  {
    id: 'vid-4',
    title: 'Tactical Forest Ranger Safety & Deterrent Equipment Review',
    category: 'Ranger Safety',
    thumbnail: '/img3.jpeg',
    embedUrl: 'https://www.youtube.com/embed/sKlBSzb0TUA',
    description: 'Frontline beat guard and ranger demonstration of multi-mode lighting, panic sirens, and tactical safety features.',
    displayOrder: 4
  },
  {
    id: 'vid-5',
    title: 'Dynamic Bird Flight Diverter (BFD) Transmission Line Operation',
    category: 'Transmission Line Protection',
    thumbnail: '/img5.jpeg',
    embedUrl: 'https://www.youtube.com/embed/sKlBSzb0TUA',
    description: 'Field installation and aerodynamic rotation testing of CEA-compliant Bird Flight Diverters on high-voltage transmission conductors.',
    displayOrder: 5
  }
];

let videosInitPromise = null;
export async function ensureVideosInitialized() {
  if (videosInitPromise) return videosInitPromise;

  videosInitPromise = (async () => {
    try {
      const conn = await connectToDatabase();
      if (!conn) return;

      const db = conn.connection.db;
      const settingsCol = db.collection('settings');
      const marker = await settingsCol.findOne({ key: 'videos_initialized_v2' });
      if (marker) return;

      // Clean up legacy fallback demo videos once so only admin panel videos are displayed
      const demoTitles = [
        'ANIDERS | Patented Animal Intrusion Detection & Repellent System',
        'ANIDERS Nocturnal Deterrence & Animal Repellent Field Test',
        'Wildlife Intrusion Detection & Field Training Demonstration',
        'Tactical Forest Ranger Safety & Deterrent Equipment Review',
        'Dynamic Bird Flight Diverter (BFD) Transmission Line Operation'
      ];

      await Video.deleteMany({
        $or: [
          { title: { $in: demoTitles } },
          { title: { $regex: /Tactical Forest Ranger|Dynamic Bird Flight|ANIDERS|Wildlife Intrusion/i } },
          { embedUrl: 'https://www.youtube.com/embed/sKlBSzb0TUA' },
          { embedUrl: 'https://www.youtube.com/embed/LyMRKxHR184' },
          { embedUrl: 'https://www.youtube.com/embed/I41i0_dbCpw' }
        ]
      }).catch(() => {});

      await settingsCol.updateOne(
        { key: 'videos_initialized_v2' },
        { $set: { key: 'videos_initialized_v2', initializedAt: new Date() } },
        { upsert: true }
      ).catch(() => {});
    } catch (e) {
      console.error('ensureVideosInitialized error:', e.message);
    }
  })();

  return videosInitPromise;
}

export async function getVideos() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await ensureVideosInitialized();
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

    await ensureVideosInitialized();

    const targetId = videoData.id || videoData._id;
    const isValidObjectId = targetId && typeof targetId === 'string' && /^[0-9a-fA-F]{24}$/.test(targetId);

    // Auto-normalize any YouTube URL to embed format
    let embedUrl = (videoData.embedUrl || '').trim();
    if (embedUrl) {
      const ytMatch = embedUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([a-zA-Z0-9_-]{11})/);
      if (ytMatch && ytMatch[1]) {
        embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
      }
    }

    // Auto-generate high-quality thumbnail if missing
    let thumbnail = (videoData.thumbnail || '').trim();
    if (!thumbnail && embedUrl) {
      const ytMatch = embedUrl.match(/embed\/([a-zA-Z0-9_-]{11})/);
      if (ytMatch && ytMatch[1]) {
        thumbnail = `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`;
      }
    }

    const { id, _id, ...cleanData } = videoData;
    if (embedUrl) cleanData.embedUrl = embedUrl;
    if (thumbnail) cleanData.thumbnail = thumbnail;

    let updated = null;
    if (isValidObjectId) {
      updated = await Video.findByIdAndUpdate(
        targetId,
        { $set: cleanData },
        { returnDocument: 'after', runValidators: true }
      ).lean();
    }

    if (!updated) {
      // Find and update by title or embedUrl, or create
      updated = await Video.findOneAndUpdate(
        { $or: [
          ...(isValidObjectId ? [{ _id: targetId }] : []),
          ...(cleanData.embedUrl ? [{ embedUrl: cleanData.embedUrl }] : []),
          ...(cleanData.title ? [{ title: cleanData.title }] : [])
        ] },
        { $set: cleanData },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
      ).lean();
    }

    // Auto-persist category to Category collection in MongoDB
    if (cleanData.category && cleanData.category.trim()) {
      addCategory(cleanData.category.trim(), 'video').catch(() => {});
    }

    return serializeDoc(updated);
  } catch (err) {
    console.error('MongoDB upsertVideo error:', err.message);
    throw err;
  }
}

export async function deleteVideo(idOrQuery, title = '') {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    // Guarantee initialized marker is saved so count reaching 0 never resurrects default videos
    try {
      const db = conn.connection.db;
      await db.collection('settings').updateOne(
        { key: 'videos_initialized' },
        { $set: { key: 'videos_initialized', initializedAt: new Date() } },
        { upsert: true }
      );
    } catch (e) {}

    if (!idOrQuery && !title) {
      throw new Error('Video ID or title is required');
    }

    const isValidObjectId = typeof idOrQuery === 'string' && /^[0-9a-fA-F]{24}$/.test(idOrQuery);

    let deleted = null;
    if (isValidObjectId) {
      deleted = await Video.findByIdAndDelete(idOrQuery);
    }

    if (!deleted) {
      const orConditions = [];
      if (isValidObjectId) orConditions.push({ _id: idOrQuery });
      if (idOrQuery && idOrQuery !== 'undefined' && idOrQuery !== 'null') {
        orConditions.push({ id: idOrQuery });
        orConditions.push({ embedUrl: idOrQuery });
        orConditions.push({ title: idOrQuery });
      }
      if (title && title.trim()) {
        orConditions.push({ title: title.trim() });
      }

      if (orConditions.length > 0) {
        deleted = await Video.findOneAndDelete({ $or: orConditions });
      }
    }

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

export async function deleteEnquiry(idOrQuery) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    if (!idOrQuery || idOrQuery === 'undefined' || idOrQuery === 'null') {
      throw new Error('Enquiry ID is required');
    }

    const isValidObjectId = typeof idOrQuery === 'string' && /^[0-9a-fA-F]{24}$/.test(idOrQuery);

    let deleted = null;
    if (isValidObjectId) {
      deleted = await Enquiry.findByIdAndDelete(idOrQuery);
    }

    if (!deleted) {
      deleted = await Enquiry.findOneAndDelete({
        $or: [
          ...(isValidObjectId ? [{ _id: idOrQuery }] : []),
          { id: idOrQuery }
        ]
      });
    }

    return true;
  } catch (err) {
    console.error('MongoDB deleteEnquiry error:', err.message);
    throw err;
  }
}

// ==================== CLIENTS ====================
export async function getClients() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const items = await Client.find().sort({ displayOrder: 1, createdAt: 1 }).lean();
      return (items || []).map(serializeDoc);
    }
  } catch (err) {
    console.error('Error fetching clients from MongoDB:', err.message);
  }
  return [];
}

export async function upsertClient(clientData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    const { id, _id, ...cleanData } = clientData;

    let doc;
    if (id && id.length === 24) {
      doc = await Client.findByIdAndUpdate(
        id,
        { $set: cleanData },
        { returnDocument: 'after', runValidators: true }
      ).lean();
    } else {
      doc = await Client.create(cleanData);
    }

    return serializeDoc(doc);
  } catch (err) {
    console.error('MongoDB upsertClient error:', err.message);
    throw err;
  }
}

export async function deleteClient(id) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');
    await Client.findByIdAndDelete(id);
    return true;
  } catch (err) {
    console.error('MongoDB deleteClient error:', err.message);
    throw err;
  }
}

// ==================== PRODUCTS ====================
const FALLBACK_PRODUCTS = [
  {
    id: 'prod-1',
    title: 'Dynamic Solar-Powered LED Bird Flight Diverter',
    slug: 'dynamic-solar-led-bird-flight-diverter',
    category: 'Bird Diverters & Avian Protection',
    modelCode: 'KR-BFD-SLED-100',
    shortDescription: 'CEA and MoEFCC compliant dynamic rotating bird flight diverter equipped with autonomous solar-charged high-intensity micro-LEDs for zero-light, heavy fog, and twilight flight conditions.',
    featuredImage: '/img2.jpeg',
    price: 'GeM Listed / Bulk Utility Tender Supply',
    status: 'published',
    displayOrder: 1,
    specs: [
      { label: 'Flashing Mechanism', value: 'Autonomous solar-charged high-intensity flashing LED strobe (30-50 fpm)' },
      { label: 'Visibility Range', value: '1,200m daylight (retro-reflective) / 800m night (active LED)' },
      { label: 'Conductor Compatibility', value: 'Fits overhead conductors & OPGW from 9mm to 45mm OD' },
      { label: 'Wind Resistance', value: 'Tested and certified up to 160 km/h wind gusts' },
      { label: 'Dielectric Insulation', value: 'Non-tracking, UV-stabilized polymeric insulation > 35kV/mm' },
      { label: 'Mounting Hardware', value: 'Corona-free helical armor clamp with vibration damping elastomer' },
      { label: 'Compliance Standard', value: 'Central Electricity Authority (CEA), MoEFCC & WII Guidelines' },
      { label: 'Operating Temp', value: '-20°C to +70°C all-weather endurance' }
    ],
    features: [
      'Dual Day/Night Warning: High-index retro-reflective disc for bright sunlight + active solar LED for dawn, dusk, fog, and night',
      'No Conductor Damage: Helical armor-grip interface eliminates conductor fatigue, chafing, and fretting wear',
      'GIB Conservation Certified: Meets guidelines mandated by the Supreme Court High-Powered Committee on GIB conservation',
      'Zero Maintenance: Hermetically sealed IP68 electronics package with 10+ years design life'
    ],
    applications: [
      '400kV, 220kV, 132kV, and 66kV transmission corridors across Thar Desert & Kutch',
      'Overhead lines crossing National Parks, Important Bird Areas (IBAs), and river estuaries',
      'Renewable wind and solar power high-tension evacuation lines'
    ],
    compliance: 'CEA Technical Specifications for Bird Flight Diverters, MoEFCC Wildlife Conservation Division, Supreme Court GIB Directives',
    content: 'High-voltage transmission corridors passing through Important Bird Areas (IBAs), wetland fringes, and Great Indian Bustard (GIB) sanctuaries pose catastrophic collision hazards to large avian species. The KR-BFD-SLED-100 is engineered to comply with the Supreme Court of India directives and CEA technical specifications. It features an aerodynamically balanced rotating disc with prism-grade retro-reflective yellow-orange vinyl and autonomous solar-powered amber/white micro-LED strobe beacons that discharge 30-50 flashes per minute during twilight and night. Constructed from UV-stabilized polycarbonate with high-dielectric elastomer gripping jaws, it withstands 160 km/h wind gusts without corona discharge or conductor slippage.'
  },
  {
    id: 'prod-2',
    title: 'Dynamic 3D Reflective Bird Flight Diverter (Mechanical Flapper)',
    slug: 'dynamic-reflective-bird-flight-diverter',
    category: 'Bird Diverters & Avian Protection',
    modelCode: 'KR-BFD-DYN-3D',
    shortDescription: 'Dynamic 3D double-disc mechanical bird deflector designed to spin and oscillate in winds as low as 3 km/h, delivering maximum optical glare and movement deterrence.',
    featuredImage: '/details.jpeg',
    price: 'State Transmission Utility Framework Rate',
    status: 'published',
    displayOrder: 2,
    specs: [
      { label: 'Disc Diameter', value: '180mm high-impact UV-resistant polyolefin disc' },
      { label: 'Reflective Surface', value: 'Diamond Grade Micro-Prismatic Retroreflective Sheeting' },
      { label: 'Color Configuration', value: 'Dual-sided Fluorescent Yellow / Safety Orange with Glow Ring' },
      { label: 'Starting Wind Speed', value: 'Rotates smoothly at breeze as low as 3.2 km/h' },
      { label: 'Swivel Bearing', value: 'Marine-grade 316 stainless steel swivel bearing, > 450N load' },
      { label: 'Life Expectancy', value: '12+ years UV and ozone exposure without embrittlement' },
      { label: 'Installation Method', value: 'Hotline installation compatible using insulated shotgun stick' }
    ],
    features: [
      'Continuous Kinetic Movement: Prevents avian habituation through unpredictable rotating flicker',
      'Corona Resistant: Smooth-radius hardware prevents electrical discharge on high-voltage spans',
      'Lightweight Aerodynamic Body: Negligible wind load on OPGW fiber-optic earth wires'
    ],
    applications: [
      'High-voltage transmission lines crossing agricultural tracts, migratory flyways, and state power grids',
      'PowerGrid, JUSNL, BSPTCL, and private transmission lines'
    ],
    compliance: 'Central Electricity Authority (CEA) Technical Guidelines for Bird Flight Diverters',
    content: 'The KR-BFD-DYN-3D mechanical bird flight diverter employs high-contrast fluorescent yellow-orange warning flags embedded with diamond-grade prismatic reflective sheeting. The dynamic swivel assembly rotates under gentle convective air currents, producing an erratic flickering reflection that triggers the avian visual warning reflex at distances over 1 kilometer. Designed for installation on overhead earth wires (OPGW) and phase conductors across power utilities like JUSNL, BSPTCL, and private solar transmission corridors.'
  },
  {
    id: 'prod-3',
    title: 'Spiral Conductor Bird Deflector & Vibration Damper',
    slug: 'spiral-conductor-bird-deflector-damper',
    category: 'Bird Diverters & Avian Protection',
    modelCode: 'KR-BFD-SPIRAL-80',
    shortDescription: 'Impact-resistant helicoidal PVC bird deflector that coils securely around the overhead conductor to increase visual wire diameter and dampen aeolian wind vibrations.',
    featuredImage: '/img5.jpeg',
    price: 'Bulk Pack per Kilometer Contract',
    status: 'published',
    displayOrder: 3,
    specs: [
      { label: 'Material', value: 'High-impact rigid outdoor PVC with UV inhibitors' },
      { label: 'Overall Length', value: '800mm to 1,200mm helicoidal spiral profile' },
      { label: 'Visual Profile Increase', value: 'From 12mm wire to > 65mm apparent visual profile' },
      { label: 'Color', value: 'Bright Fluorescent Yellow / Safety Orange with Glow In Dark stripe' },
      { label: 'Installation Tool', value: 'Snap-on spiral helical winding without tools or loose bolts' },
      { label: 'Weather Resistance', value: 'Resistance to UV degradation, acid rain, and ozone tracking' }
    ],
    features: [
      'Fast Snap-On Installation: Wraps around energized or de-energized lines in under 30 seconds',
      'Dual Vibration Control: Prevents galloping and fatigue breakage at line suspensions',
      'Economical High-Density Spacing: Enables dense 5m to 10m spacing intervals in high-collision zones'
    ],
    applications: [
      'Rural 33kV & 11kV distribution lines, OPGW cables, renewable wind and solar evacuation lines'
    ],
    compliance: 'MoEFCC Wildlife Guidelines for Power Distribution Lines',
    content: 'A rugged, cost-effective bird deflector specifically designed for medium and high-voltage transmission and distribution lines. The helically wound pre-formed PVC spiral effectively increases the apparent profile of conductors by over 400%, allowing approaching raptors, cranes, and storks to identify the wire barrier in time. The spiral also acts as an aerodynamic spoiler, significantly reducing aeolian line vibrations caused by steady winds.'
  },
  {
    id: 'prod-4',
    title: 'ANIDERS (Animal Intrusion Detection and Repellent System)',
    slug: 'aniders-animal-intrusion-detection-system',
    category: 'Wildlife Deterrence & Smart Sensors',
    modelCode: 'KR-ANIDERS-GEN3',
    shortDescription: 'Autonomous solar-powered electronic bio-acoustic scarecrow that automatically senses approaching wildlife and safely repels them without electric shocks or physical injury.',
    featuredImage: '/details.jpeg',
    price: 'Available on GeM / Official Forest Dept Quote',
    status: 'published',
    displayOrder: 4,
    specs: [
      { label: 'Detection Technologies', value: 'Dual PIR Motion Sensor + High-Frequency Doppler Radar' },
      { label: 'Detection Distance', value: 'Up to 30 meters with 120° hemispherical field of view' },
      { label: 'Deterrence Modes', value: '30+ randomized bio-acoustic sirens, predatory calls, and LED strobe bursts' },
      { label: 'Power Unit', value: 'Integrated 10W Monocrystalline Solar Panel + 12V LiFePO4 battery pack' },
      { label: 'Monsoon Autonomy', value: 'Up to 10 consecutive cloudy / rain days without direct sunlight' },
      { label: 'Enclosure Rating', value: 'IP67 Weatherproof, UV-stabilized heavy-duty polymer' },
      { label: 'Target Animals', value: 'Elephants, wild boars, nilgai, leopards, deer, tigers, bears' },
      { label: 'Field Efficacy', value: 'Proven conflict reduction across forest fringes and agricultural belts' }
    ],
    features: [
      'Strictly Non-Lethal: Zero electric shock, zero projectiles, zero toxicity to wildlife or humans',
      'Anti-Habituation Intelligence: Randomizes audio frequencies and flashing cadences on every trigger',
      'Plug & Play Field Installation: Mounts to wooden poles, bamboo stakes, or trees in under 15 minutes',
      'Field-Tested Reliability: Adopted for human-wildlife conflict mitigation across forest divisions'
    ],
    applications: [
      'Elephant corridors and sugarcane farm fringes bordering protected reserves',
      'Forest village agricultural boundaries, fruit orchards, highway crossings'
    ],
    compliance: 'Forest Department & Wildlife Conservation Field Verified',
    content: 'ANIDERS stands for Animal Intrusion Detection and Repellent System, supplied across Eastern India by KR Environ Solutions. ANIDERS acts as an intelligent electronic watchman. Utilizing passive infrared (PIR) and microwave Doppler radar sensors, it senses the entry of large animals (elephants, wild boars, blue bulls/nilgai, leopards, tigers) up to 30 meters away. Upon detection, it automatically triggers an algorithmic sequence of randomized acoustic distress sounds, ultrasonic sirens, and strobing flashlights. Over 30 variable patterns guarantee that animals never grow habituated to the device, safeguarding crops and fringe habitats safely.'
  },
  {
    id: 'prod-5',
    title: 'Smart Stick Forester (Solar Ranger Tactical Patrol Baton)',
    slug: 'smart-stick-forester',
    category: 'Frontline Ranger Gear',
    modelCode: 'KR-SSF-PRO',
    shortDescription: 'Multi-functional tactical safety and patrol baton for frontline forest guards featuring solar recharging, non-lethal self-defense electroshock deterrent, 120dB SOS siren, and tactical torch.',
    featuredImage: '/img4.jpeg',
    price: 'State Forest Framework Contract',
    status: 'published',
    displayOrder: 5,
    specs: [
      { label: 'Body Construction', value: 'Aerospace Grade 6061-T6 Anodized Hardened Aluminum Alloy' },
      { label: 'Defensive Deterrent', value: 'Non-lethal high-voltage low-amperage electrical arc for emergency animal repulsion' },
      { label: 'Distress Siren', value: '120dB high-pitch panic alarm audible up to 1,500 meters' },
      { label: 'Flashlight Unit', value: 'Cree 800-lumen multi-mode LED (High Beam, Patrol Low, SOS Strobe)' },
      { label: 'Battery & Power', value: '6,000mAh rechargeable lithium cell + integrated solar panel + USB-C' },
      { label: 'Power Bank Output', value: '5V / 2.1A output for recharging handheld radios, smartphones & GPS units' },
      { label: 'Weight & Length', value: '1.1 kg lightweight balanced ergonomically, 110cm patrol length' },
      { label: 'Durability', value: 'Mil-spec drop tested to 2 meters, IP66 splash & dust resistant' }
    ],
    features: [
      'Frontline Ranger Lifeline: Gives isolated guards the capability to defend themselves and call for reinforcements instantly',
      'Solar Self-Sustaining: Recharges during daylight patrols while attached to backpack or carried in hand',
      'Non-Lethal Wildlife Safety: Deters wild animals through sharp electrical snap and visible arc without inflicting permanent injury'
    ],
    applications: [
      'Tiger reserve foot patrols, anti-poaching squads, night ambush operations, trek guides, wildlife rescue teams'
    ],
    compliance: 'Field-tested across tiger reserves and wildlife divisions in India',
    content: 'Frontline forest rangers and anti-poaching squads trek tens of kilometers on foot every day through dense, remote jungles inhabited by dangerous predators and poachers. The Smart Stick Forester replaces archaic wooden lathis with an aerospace-grade tactical survival device. Built from anodized aluminum alloy, the baton integrates a high-voltage, non-lethal micro-current stun probe for emergency defense against aggressive animals, a deafening 120dB acoustic distress siren heard up to 1.5 km away, an ultra-bright 800-lumen LED searchlight with SOS strobe, an emergency power bank for mobile/radio recharge, and a built-in solar panel for perpetual charging in deep forests.'
  },
  {
    id: 'prod-6',
    title: 'KyNet Humane Animal Rescue Net Gun',
    slug: 'kynet-humane-animal-rescue-net-gun',
    category: 'Humane Capture & Rescue',
    modelCode: 'KR-KYNET-50',
    shortDescription: 'Handheld pneumatic net capture launcher designed for the humane, instantaneous capture and safe containment of leopards, stray primates, aggressive canines, and wild boars without chemical sedation.',
    featuredImage: '/img3.jpeg',
    price: 'Municipal & Forest Dept Authorized Supply',
    status: 'published',
    displayOrder: 6,
    specs: [
      { label: 'Propulsion System', value: 'Quick-release 16g/24g CO2 cylinder or compressed pneumatic canister' },
      { label: 'Effective Capture Range', value: '15 meters to 25 meters accurate line of fire' },
      { label: 'Net Dimensions', value: '4.2m x 4.2m (18 sq.m) high-tensile knotless ballistic nylon mesh' },
      { label: 'Deployment Speed', value: 'Instantaneous capture (< 0.25 seconds deployment velocity)' },
      { label: 'Corner Weights', value: 'Rubberized soft-weighted safety corner capsules preventing animal trauma' },
      { label: 'Trigger Mechanism', value: 'Ergonomic dual-stage electronic safety trigger with laser sighting beam' },
      { label: 'Reusability', value: 'Net can be retrieved, repacked, and ready for redeployment in under 5 minutes' },
      { label: 'Weight', value: '3.8 kg portable handheld system with shoulder harness' }
    ],
    features: [
      'Zero Chemical Tranquilizer Hazard: Avoids drug overdose, hyperthermia, and delayed reaction risks',
      'Frontline Officer Safety: Keeps rescuers at a safe 20-meter standoff distance',
      'Humane Knotless Ballistic Net: Does not cut animal skin, teeth, or paws during entanglement'
    ],
    applications: [
      'Urban leopard rescues, rapid response monkey containment, veterinary rescue circles, rabies control squads'
    ],
    compliance: 'Standard Operating Procedure (SOP) compliant for humane animal rescue in human habitations',
    content: 'Chemical darting of urban leopards and aggressive wildlife in crowded Indian settlements involves severe hazards: tranquilizers take 10 to 25 minutes to take effect, during which terrified animals frequently attack bystanders or drown in wells. KyNet is a pneumatic animal rescue net launcher supplied by KR Environ Solutions. Triggered electronically or via compressed pneumatic cartridge, KyNet instantly launches an 18-square-meter knotless ballistic nylon net with perimeter corner weights at a velocity that immobilizes the animal safely within 15 to 25 meters in under 2 seconds. The reusable net avoids lacerations, allowing veterinary squads to immediately secure and transport the animal.'
  },
  {
    id: 'prod-7',
    title: 'Re-Pulse Smart Wildlife Intrusion Shock Mat',
    slug: 'repulse-mat-smart-deterrent',
    category: 'Perimeter Security & Ground Deterrents',
    modelCode: 'KR-REPULSE-MAT',
    shortDescription: 'Heavy-duty pulsed ground shock mat for perimeter trenches, agricultural gateways, and railway approaches that delivers a safe, startling micro-current pulse preventing elephant access.',
    featuredImage: '/img5.jpeg',
    price: 'Custom Corridor Installation Quote',
    status: 'published',
    displayOrder: 7,
    specs: [
      { label: 'Material', value: 'Heavy-duty vulcanized drive-over resistant neoprene rubber' },
      { label: 'Dimensions', value: 'Available in modular 2m x 1m, 3m x 1.5m, and 5m x 2m interlocking modules' },
      { label: 'Pulse Output', value: 'Safe non-lethal micro-current pulse (tested to BIS safety limits)' },
      { label: 'Drive-Over Capacity', value: 'Rated for 25-ton heavy tractor and truck roll-over' },
      { label: 'Power Source', value: '12V Solar Energizer unit with automatic earth-fault sensing' },
      { label: 'Protection Level', value: '100% waterproof IP68 submersible operational capacity' }
    ],
    features: [
      'Zero Tree Branch Faults: Ground-level positioning eliminates foliage shorts',
      'Safe Micro-Current: Instills learned avoidance in elephants without physical harm',
      'Tractor Compatible: Vehicles roll over safely without cutting perimeter protection'
    ],
    applications: [
      'Farm gateways, railway track wildlife approaches, forest guest house perimeters, granary storehouse entrances'
    ],
    compliance: 'BIS Electrical Safety Compliant, Forest Department Non-Lethal Barrier Standards',
    content: 'Traditional electric fencing along elephant corridors often suffers from tree branch shorts, wire cutting, or lethal illegal hooking. The Re-Pulse Smart Wildlife Intrusion Mat provides a ground-level, non-lethal deterrent barrier. Designed from heavy-duty vulcanized industrial rubber embedded with conductive stainless steel grids, it discharges a safe, non-lethal pulsed micro-current shock that deters elephants and wild boars the moment their footpads touch the surface. Trucks and tractors can drive over the mat without causing damage, making it ideal for agricultural entry gates and railway crossings.'
  },
  {
    id: 'prod-8',
    title: 'Anti-Poaching 4G Cellular Trail Camera & AI Sentinel',
    slug: 'anti-poaching-4g-trail-camera',
    category: 'Wildlife Monitoring & AI Sentinels',
    modelCode: 'KR-CAM-4G-AI',
    shortDescription: 'Ultra-fast 0.2s motion trigger trail camera with 4G LTE cloud telemetry, invisible 940nm black infrared night vision, and solar battery module for remote forest surveillance.',
    featuredImage: '/img1.jpeg',
    price: 'Forest Division Batch Supply',
    status: 'published',
    displayOrder: 8,
    specs: [
      { label: 'Trigger Speed', value: '0.2 seconds lightning motion capture' },
      { label: 'Camera Resolution', value: '30 Megapixel stills & 4K Ultra-HD video with audio' },
      { label: 'Night Vision Range', value: '30 meters with completely invisible 940nm no-glow black LEDs' },
      { label: 'Detection Field', value: '120° wide-angle multi-zone PIR sensor' },
      { label: 'Telemetry', value: '4G LTE high-speed cellular with cloud server and email/MMS instant delivery' },
      { label: 'Battery Autonomy', value: 'Integrated 12V solar panel + 8 AA backup batteries (up to 6 months standby)' },
      { label: 'Ruggedness', value: 'IP66 waterproof camouflage casing with locking security bracket' }
    ],
    features: [
      'Covert Anti-Poaching Alert: Instantly sends photographic proof of human intrusion to the DFO smartphone',
      'Zero Light Disturbance: Invisible 940nm illumination does not disturb wildlife circadian rhythm',
      'Live Remote Setting Control: Modify camera settings and trigger sensitivities over SMS/cloud app'
    ],
    applications: [
      'Critical wildlife corridors, anti-poaching checkpoints, salt lick monitoring, wildlife census survey lines'
    ],
    compliance: 'MoEFCC Wildlife Camera Trap Guidelines',
    content: 'Covert surveillance in remote tiger and elephant reserves requires rugged camera traps capable of transmitting live alerts to control rooms. The KR-CAM-4G-AI is equipped with an ultra-responsive 0.2-second trigger speed, 30MP crystal-clear photography, and 4K video recording. Featuring 940nm stealth black infrared LEDs, it operates with complete invisibility in pitch darkness—no glow that could alert poachers or frighten wildlife. Built-in 4G LTE multi-network roaming SIM transmits intruder alerts, poacher photos, and wildlife sightings to mobile phones and forest command centers in real time.'
  },
  {
    id: 'prod-9',
    title: 'Smart Self-Watering Planters & Eco Pots',
    slug: 'self-watering-smart-planters',
    category: 'Eco & Smart Green Solutions',
    modelCode: 'KR-SWP-SERIES',
    shortDescription: 'Sub-irrigation self-watering pots with detachable transparent water reservoir base, capillary wicking technology, and UV-stabilized recyclable virgin polymer.',
    featuredImage: '/visitingcard.jpeg',
    price: 'Corporate & Green Office Bulk Packs',
    status: 'published',
    displayOrder: 9,
    specs: [
      { label: 'Irrigation Mechanism', value: 'Capillary Wicking Sub-Irrigation System' },
      { label: 'Watering Frequency', value: 'Refill required only once every 10 to 14 days' },
      { label: 'Reservoir Base', value: 'Detachable crystal-clear transparent viewing base for water level monitoring' },
      { label: 'Material', value: '100% Recyclable UV-stabilized virgin polymer (BPA-free & non-toxic)' },
      { label: 'Available Sizes', value: '4-inch Desktop, 6-inch Floor/Shelf, 8-inch & 10-inch Architectural Planters' },
      { label: 'Color Finishes', value: 'Poetic Black, Pearl White, Muted Cream, Slate Grey, Forest Green, Terra Cotta' },
      { label: 'Drainage Control', value: 'Integrated aeration barrier preventing root waterlogging and fungus' }
    ],
    features: [
      'Zero Guesswork Plant Care: Transparent reservoir lets anyone see exactly when to add water',
      'Root Rot Prevention: Bottom-up capillary uptake keeps the root crown ventilated and oxygenated',
      'Mess-Free & Spill-Proof: No messy overflow saucers or stained floorboards'
    ],
    applications: [
      'Corporate office workstations, hotel lobbies, eco-conscious residences, institutional botanical decor, corporate gifting'
    ],
    compliance: 'BPA-Free, RoHS Recyclable Polymer Certified',
    content: 'Our flagship self-watering planters simplify plant care for homeowners, offices, and green infrastructure projects. Traditional potted plants fail due to root rot from overwatering or desiccation from underwatering. This capillary sub-irrigation system mimics natural groundwater hydrology: plants draw only the exact amount of moisture their root systems require from the bottom reservoir via high-absorption capillary wicks. The detachable clear-view reservoir base allows users to visually inspect water levels at a glance, extending refill intervals to 10–14 days. Crafted from UV-treated recyclable high-density polymer that resists color fading, cracking, and water leakage.'
  },
  {
    id: 'prod-10',
    title: 'Eco Hydrating Pen (Sub-Surface Soil Moisture Indicator)',
    slug: 'hydrating-pen-moisture-indicator',
    category: 'Eco & Smart Green Solutions',
    modelCode: 'KR-HYDRO-PEN',
    shortDescription: 'Battery-free visual soil moisture sensor pen that accurately monitors root-zone hydration through optical capillary color-shifting indicators.',
    featuredImage: '/logo.jpeg',
    price: 'Retail & Bulk Green Kits',
    status: 'published',
    displayOrder: 10,
    specs: [
      { label: 'Sensing Mechanism', value: 'Micro-porous capillary moisture-reactive optical core' },
      { label: 'Power Requirement', value: '100% Battery-free & passive mechanical chemical operation' },
      { label: 'Response Time', value: 'Instantaneous visual indication of root moisture status' },
      { label: 'Readout Interface', value: 'Vivid Blue (Optimal Moisture) / Pure White (Time to Water)' },
      { label: 'Stem Length', value: '150mm & 250mm depths for small desktop to large floor pots' },
      { label: 'Durability', value: 'Replaceable core cartridge with 12-month operational lifespan' }
    ],
    features: [
      'Saves Plant Lives: Completely removes root moisture guesswork for indoor and greenhouse plants',
      'Eco-Friendly Zero Battery: No electronic waste, no charging cables needed',
      'Universal Compatibility: Functions across soil, coco-peat, perlite, and vermiculite mediums'
    ],
    applications: [
      'Indoor potted gardens, nursery propagation tables, green office maintenance, bonsai and exotic plant care'
    ],
    compliance: 'Non-toxic, Eco-safe soil contact certified',
    content: 'The Eco Hydrating Pen is a precision plant care diagnostic tool. Over 70% of indoor plant mortality is caused by inaccurate surface-soil guesswork: the top layer may look dry while root zones remain suffocated in water. Inserted directly into the potting mix near the root cluster, the Hydrating Pen utilizes treated micro-porous optical core material that turns vivid blue when adequate moisture is present at root level and shifts to pure white when roots require watering. It requires no batteries, electricity, or maintenance.'
  },
  {
    id: 'prod-11',
    title: 'Modular Vertical Garden & Living Wall System',
    slug: 'modular-vertical-garden-system',
    category: 'Eco & Smart Green Solutions',
    modelCode: 'KR-VERT-WALL',
    shortDescription: 'Engineered modular living green wall system with integrated self-watering drip channels for commercial building facades, urban cooling, and corporate interior air purification.',
    featuredImage: '/img1.jpeg',
    price: 'Per Square Meter Turnkey Supply & Installation',
    status: 'published',
    displayOrder: 11,
    specs: [
      { label: 'Module Material', value: 'Heavy-duty recycled polypropylene with UV radiation stabilizers' },
      { label: 'System Type', value: 'Interlocking modular panels with automated timed micro-drip manifold' },
      { label: 'Plant Density', value: '36 to 48 plants per square meter for dense tropical foliage coverage' },
      { label: 'Water Efficiency', value: 'Closed-loop recirculation system conserving up to 75% irrigation water' },
      { label: 'Load Weight', value: '18-22 kg per m² (fully planted and saturated with lightweight medium)' },
      { label: 'Acoustic & Thermal Rating', value: 'Reduces ambient ambient sound by 7dB; reduces wall surface temp by up to 5°C' }
    ],
    features: [
      'Turnkey Modular Assembly: Fast, clean installation on concrete, brick, or steel support framework',
      'Low Maintenance Automated Irrigation: Programmable digital timer feeds water and nutrients directly to roots',
      'Air-Purifying Bio-Filter: Absorbs carbon emissions, dust particulates (PM2.5/PM10), and ambient formaldehyde'
    ],
    applications: [
      'Commercial building facades, IT park atriums, government office corridors, airport lounges, sustainable green infrastructure'
    ],
    compliance: 'IGBC Green Building Credits Compatible, GRIHA Standard',
    content: 'Rapid urbanization has reduced urban green cover, worsening ambient air quality and building heat gain. KR Environ Solutions delivers turnkey Modular Vertical Living Wall installations. Each lightweight, interlocking module features engineered multi-pocket planters with root-retaining felt and sub-irrigation channels. Capable of housing diverse air-purifying foliage like Nephrolepis ferns, Philodendrons, Syngoniums, and Aglaonemas, the living wall acts as a bio-filter that removes airborne VOCs, reduces interior temperatures by 3–5°C, and dampens ambient noise.'
  },
  {
    id: 'prod-12',
    title: 'Air-Purifying & Vastu Indoor Ecosystem Planters',
    slug: 'air-purifying-vastu-ecosystem-planters',
    category: 'Eco & Smart Green Solutions',
    modelCode: 'KR-ECO-TRIO',
    shortDescription: 'Curated NASA-approved air-purifying plants (Snake Plant, Golden Pothos, Jade, ZZ) paired with designer self-watering pots for healthy workspaces and clean indoor air.',
    featuredImage: '/img4.jpeg',
    price: 'Institutional & Corporate Subscription Sets',
    status: 'published',
    displayOrder: 12,
    specs: [
      { label: 'Included Botanical Varieties', value: 'Sansevieria (Snake), Golden Pothos (Money Plant), Jade Plant, ZZ Plant' },
      { label: 'Air Purification Benchmark', value: 'Removes formaldehyde, benzene, trichloroethylene, and airborne micro-dust' },
      { label: 'Planter Included', value: 'Premium Self-Watering Pots with sub-irrigation capillary reservoirs' },
      { label: 'Growing Medium', value: 'Sterilized pathogen-free coco-peat, vermiculite, and active bio-char mix' },
      { label: 'Maintenance Requirement', value: 'Minimal light tolerant (50–100 foot-candles); watered once every 12 days' },
      { label: 'Packaging', value: 'Specially engineered breathable corrugated transit box ensuring 100% plant arrival vitality' }
    ],
    features: [
      '24/7 Oxygen Emission: Snake plant features Crassulacean Acid Metabolism (CAM), generating night oxygen',
      'Stress Reduction & Biophilic Design: Clinically shown to improve workplace focus, productivity, and mood',
      'Effortless Upkeep: Ideal for conference rooms, executive suites, reception counters, and homes'
    ],
    applications: [
      'Government ministry suites, executive boardrooms, healthcare reception spaces, green building projects'
    ],
    compliance: 'NASA Clean Air Study Approved Botanical Selections',
    content: 'Indoor air within enclosed offices and buildings can be 2 to 5 times more polluted than outdoor air due to synthetic carpets, paint VOCs, and carbon dioxide buildup. Our curated Air-Purifying & Vastu Eco-Sets combine scientifically validated NASA Clean Air Study botanical varieties with signature self-watering planters. Featuring resilient varieties such as Sansevieria trifasciata (Snake Plant, which releases oxygen at night), Epipremnum aureum (Golden Pothos, which absorbs xylene and benzene), and Crassula ovata (Lucky Jade Plant for positive Vastu energy). Pre-planted in nutrient-rich organic soil-less potting substrate with balanced slow-release bio-fertilizers.'
  }
];

export async function getProducts() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const items = await Product.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
      if (items && items.length > 0) {
        return items.map(serializeDoc);
      } else {
        for (const p of FALLBACK_PRODUCTS) {
          const { id, ...clean } = p;
          await Product.findOneAndUpdate(
            { slug: clean.slug },
            { $set: clean },
            { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
          ).catch(() => {});
        }
        const seeded = await Product.find().sort({ displayOrder: 1, createdAt: -1 }).lean();
        if (seeded && seeded.length > 0) return seeded.map(serializeDoc);
      }
    }
  } catch (err) {
    console.error('Error fetching products from MongoDB:', err.message);
  }
  return FALLBACK_PRODUCTS;
}

export async function getProductBySlug(slug) {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const item = await Product.findOne({ slug }).lean();
      if (item) return serializeDoc(item);
    }
  } catch (err) {
    console.error('Error fetching product by slug:', err.message);
  }
  const fallback = FALLBACK_PRODUCTS.find(p => p.slug === slug);
  return fallback || null;
}

export async function upsertProduct(productData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    const targetId = productData.id || productData._id;
    const isValidObjectId = targetId && typeof targetId === 'string' && /^[0-9a-fA-F]{24}$/.test(targetId);
    const filter = isValidObjectId
      ? { _id: targetId }
      : { slug: productData.slug };

    const { id, _id, ...cleanData } = productData;

    const updated = await Product.findOneAndUpdate(
      filter,
      { $set: cleanData },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    ).lean();

    return serializeDoc(updated);
  } catch (err) {
    console.error('MongoDB upsertProduct error:', err.message);
    throw err;
  }
}

export async function deleteProduct(idOrSlug) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    if (!idOrSlug || idOrSlug === 'undefined' || idOrSlug === 'null') {
      throw new Error('Product identifier is required');
    }

    const isValidObjectId = typeof idOrSlug === 'string' && /^[0-9a-fA-F]{24}$/.test(idOrSlug);

    let deleted = null;
    if (isValidObjectId) {
      deleted = await Product.findByIdAndDelete(idOrSlug);
    }

    if (!deleted) {
      deleted = await Product.findOneAndDelete({
        $or: [
          ...(isValidObjectId ? [{ _id: idOrSlug }] : []),
          { slug: idOrSlug },
          { id: idOrSlug },
          { title: idOrSlug }
        ]
      });
    }

    return true;
  } catch (err) {
    console.error('MongoDB deleteProduct error:', err.message);
    throw err;
  }
}

// ==================== PARTNERS ====================
const FALLBACK_PARTNERS = [
  {
    id: 'part-1',
    name: 'Yugantar Bharati analytical & Environmental Engineering Laboratory, Ranchi',
    category: 'Analytical & Environmental Testing Laboratory',
    logoUrl: '/details.jpeg',
    websiteUrl: '',
    collaborationType: 'Statutory Lab Testing, Ambient Air, Water & Soil Baseline Analysis',
    description: 'NABL-accredited and statutory environmental engineering laboratory based in Ranchi, Jharkhand. Partnered for comprehensive baseline environmental monitoring, industrial stack emissions, effluent testing, and ambient air/noise testing for EIA/EMP, Consent to Establish (CTE), and Consent to Operate (CTO) compliance.',
    displayOrder: 1
  },
  {
    id: 'part-2',
    name: 'PRAKRITIS Technology, New Delhi',
    category: 'Environmental Technology & Engineering Solutions',
    logoUrl: '/logo.jpeg',
    websiteUrl: '',
    collaborationType: 'Technology Alliance, Sustainable Engineering & Emission Abatement',
    description: 'Advanced green technology and environmental engineering partner headquartered in New Delhi. Collaborating on sustainable pollution control systems, industrial emission abatement, clean engineering designs, and statutory environmental clearance advisory.',
    displayOrder: 2
  },
  {
    id: 'part-3',
    name: 'Naman Enterprises, Ranchi',
    category: 'GIS Mapping & Survey Logistics Partner',
    logoUrl: '/img1.jpeg',
    websiteUrl: '',
    collaborationType: 'Large-Format GIS Cadastral Plotting & Field Documentation Logistics',
    description: 'Specialized GIS cartographic and documentation logistics partner in Ranchi. Supporting field forest demarcation, Survey of India topo-sheet reproduction, geo-referenced cadastral map plotting, and statutory clearance dossier preparation for forest and mining proposals.',
    displayOrder: 3
  },
  {
    id: 'part-4',
    name: 'Arcturus Engineering Private Limited, New Delhi',
    category: 'Heavy Engineering & Infrastructure Consultancy',
    logoUrl: '/img2.jpeg',
    websiteUrl: '',
    collaborationType: 'Civil-Environmental Infrastructure Assessments & Project DPRs',
    description: 'Premier infrastructure and heavy engineering consultancy firm headquartered in New Delhi. Partnered on linear infrastructure clearances, environmental impact studies, detailed project reports (DPR), and structural engineering compliance for major development projects.',
    displayOrder: 4
  }
];

let partnersInitPromise = null;

async function ensurePartnersInitialized() {
  if (partnersInitPromise) return partnersInitPromise;

  partnersInitPromise = (async () => {
    try {
      const conn = await connectToDatabase();
      if (!conn) return;

      const db = conn.connection.db;
      const settingsCol = db.collection('settings');
      const marker = await settingsCol.findOne({ key: 'partners_initialized' });
      if (marker) return;

      const count = await Partner.countDocuments();
      if (count === 0) {
        for (const p of FALLBACK_PARTNERS) {
          const { id, ...clean } = p;
          await Partner.create(clean).catch(() => {});
        }
      }

      await settingsCol.updateOne(
        { key: 'partners_initialized' },
        { $set: { key: 'partners_initialized', initializedAt: new Date() } },
        { upsert: true }
      ).catch(() => {});
    } catch (e) {
      console.error('ensurePartnersInitialized error:', e.message);
    }
  })();

  return partnersInitPromise;
}

export async function getPartners() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await ensurePartnersInitialized();
      const items = await Partner.find().sort({ displayOrder: 1, createdAt: 1 }).lean();
      return (items || []).map(serializeDoc);
    }
  } catch (err) {
    console.error('Error fetching partners from MongoDB:', err.message);
  }
  return FALLBACK_PARTNERS;
}

export async function upsertPartner(partnerData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    await ensurePartnersInitialized();

    const targetId = partnerData.id || partnerData._id;
    const isValidObjectId = targetId && typeof targetId === 'string' && /^[0-9a-fA-F]{24}$/.test(targetId);
    const { id, _id, ...cleanData } = partnerData;

    let updated;
    if (isValidObjectId) {
      updated = await Partner.findOneAndUpdate(
        { _id: targetId },
        { $set: cleanData },
        { returnDocument: 'after' }
      ).lean();
    } else if (targetId) {
      updated = await Partner.findOneAndUpdate(
        { name: cleanData.name },
        { $set: cleanData },
        { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
      ).lean();
    } else {
      const created = await Partner.create(cleanData);
      updated = created.toObject();
    }

    return serializeDoc(updated);
  } catch (err) {
    console.error('MongoDB upsertPartner error:', err.message);
    throw err;
  }
}

export async function deletePartner(idOrQuery) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    if (!idOrQuery || idOrQuery === 'undefined' || idOrQuery === 'null') {
      throw new Error('Partner identifier is required');
    }

    const isValidObjectId = typeof idOrQuery === 'string' && /^[0-9a-fA-F]{24}$/.test(idOrQuery);

    let deleted = null;
    if (isValidObjectId) {
      deleted = await Partner.findByIdAndDelete(idOrQuery);
    }

    if (!deleted) {
      deleted = await Partner.findOneAndDelete({
        $or: [
          ...(isValidObjectId ? [{ _id: idOrQuery }] : []),
          { id: idOrQuery },
          { name: idOrQuery }
        ]
      });
    }

    return true;
  } catch (err) {
    console.error('MongoDB deletePartner error:', err.message);
    throw err;
  }
}

// ==================== CERTIFICATES ====================
const FALLBACK_CERTIFICATES = [
  {
    id: 'cert-1',
    title: 'ISO 9001:2015 Quality Management System Certification',
    pdfUrl: 'https://drive.google.com/file/d/1v8UuX-example-iso-9001/preview',
    issuingAuthority: 'International Accredited Certification Body',
    displayOrder: 1
  },
  {
    id: 'cert-2',
    title: 'ISO 14001:2015 Environmental Management System Certification',
    pdfUrl: 'https://drive.google.com/file/d/1v8UuX-example-iso-14001/preview',
    issuingAuthority: 'International Accreditation Forum (IAF)',
    displayOrder: 2
  },
  {
    id: 'cert-3',
    title: 'Government of India MSME / Udyam Enterprise Registration',
    pdfUrl: 'https://drive.google.com/file/d/1v8UuX-example-udyam/preview',
    issuingAuthority: 'Ministry of Micro, Small and Medium Enterprises, Govt. of India',
    displayOrder: 3
  },
  {
    id: 'cert-4',
    title: 'Startup India DPIIT Recognition Certificate',
    pdfUrl: 'https://drive.google.com/file/d/1v8UuX-example-dpiit/preview',
    issuingAuthority: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
    displayOrder: 4
  },
  {
    id: 'cert-5',
    title: 'Statutory Forest & Environmental Clearance Empanelment Dossier',
    pdfUrl: 'https://drive.google.com/file/d/1v8UuX-example-forest-clearance/preview',
    issuingAuthority: 'Forest, Environment & Climate Change Department, Jharkhand',
    displayOrder: 5
  }
];

let certificatesInitPromise = null;
export async function ensureCertificatesInitialized() {
  if (certificatesInitPromise) return certificatesInitPromise;

  certificatesInitPromise = (async () => {
    try {
      const conn = await connectToDatabase();
      if (!conn) return;

      const count = await Certificate.countDocuments();
      if (count > 0) return;

      const db = conn.connection.db;
      const settingsCol = db.collection('settings');
      const marker = await settingsCol.findOne({ key: 'certificates_initialized' });
      if (marker) return;

      // Seed default certificates into MongoDB Atlas
      for (const cert of FALLBACK_CERTIFICATES) {
        const { id, ...clean } = cert;
        clean.pdfUrl = clean.pdfUrl || clean.pdfLink || '';
        clean.pdfLink = clean.pdfUrl;
        await Certificate.create(clean).catch(() => {});
      }

      await settingsCol.updateOne(
        { key: 'certificates_initialized' },
        { $set: { key: 'certificates_initialized', initializedAt: new Date() } },
        { upsert: true }
      ).catch(() => {});
    } catch (e) {
      console.error('ensureCertificatesInitialized error:', e.message);
    }
  })();

  return certificatesInitPromise;
}

export async function getCertificates() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await ensureCertificatesInitialized();
      const items = await Certificate.find().sort({ displayOrder: 1, createdAt: 1 }).lean();
      return (items || []).map(serializeDoc);
    }
  } catch (err) {
    console.error('Error fetching certificates from MongoDB:', err.message);
  }
  return FALLBACK_CERTIFICATES;
}

export async function upsertCertificate(certificateData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    await ensureCertificatesInitialized();

    const targetId = certificateData.id || certificateData._id;
    const isValidObjectId = targetId && typeof targetId === 'string' && /^[0-9a-fA-F]{24}$/.test(targetId);

    const pdfUrl = (certificateData.pdfUrl || certificateData.pdfLink || certificateData.imageUrl || '').trim();

    const { id, _id, originalTitle, ...cleanData } = certificateData;
    cleanData.pdfUrl = pdfUrl;
    cleanData.pdfLink = pdfUrl;

    let updated;
    if (isValidObjectId) {
      updated = await Certificate.findByIdAndUpdate(
        targetId,
        { $set: cleanData },
        { returnDocument: 'after', runValidators: true }
      ).lean();
    } else {
      const orConditions = [];
      if (originalTitle && originalTitle.trim()) orConditions.push({ title: originalTitle.trim() });
      if (cleanData.title && cleanData.title.trim()) orConditions.push({ title: cleanData.title.trim() });
      if (targetId) orConditions.push({ id: targetId });

      if (orConditions.length > 0) {
        updated = await Certificate.findOneAndUpdate(
          { $or: orConditions },
          { $set: cleanData },
          { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
        ).lean();
      } else {
        updated = await Certificate.create(cleanData);
      }
    }

    return serializeDoc(updated);
  } catch (err) {
    console.error('MongoDB upsertCertificate error:', err.message);
    throw err;
  }
}

export async function deleteCertificate(idOrQuery, title = '') {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    await ensureCertificatesInitialized();

    if (!idOrQuery && !title) {
      throw new Error('Certificate ID or title is required');
    }

    const isValidObjectId = typeof idOrQuery === 'string' && /^[0-9a-fA-F]{24}$/.test(idOrQuery);

    let deleted = null;
    if (isValidObjectId) {
      deleted = await Certificate.findByIdAndDelete(idOrQuery);
    }

    if (!deleted) {
      const orConditions = [];
      if (isValidObjectId) orConditions.push({ _id: idOrQuery });
      if (idOrQuery && idOrQuery !== 'undefined' && idOrQuery !== 'null') {
        orConditions.push({ id: idOrQuery });
        orConditions.push({ title: idOrQuery });
      }
      if (title && title.trim()) {
        orConditions.push({ title: title.trim() });
      }

      if (orConditions.length > 0) {
        deleted = await Certificate.findOneAndDelete({ $or: orConditions });
      }
    }

    return true;
  } catch (err) {
    console.error('MongoDB deleteCertificate error:', err.message);
    throw err;
  }
}

// ==================== CAREERS & STUDENT APPLICATIONS ====================
export async function getCareers({ includeClosed = false } = {}) {
  try {
    const conn = await connectToDatabase();
    if (!conn) return [];

    const query = includeClosed ? {} : { status: 'open' };
    const items = await Career.find(query).sort({ displayOrder: 1, createdAt: -1 }).lean();
    return items.map(serializeDoc);
  } catch (err) {
    console.error('Error fetching careers from MongoDB:', err.message);
    return [];
  }
}

export async function upsertCareer(careerData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    const targetId = careerData.id || careerData._id;
    const isValidObjectId = targetId && typeof targetId === 'string' && /^[0-9a-fA-F]{24}$/.test(targetId);

    const { id, _id, ...cleanData } = careerData;
    if (!cleanData.slug && cleanData.title) {
      cleanData.slug = cleanData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
    }

    let updated;
    if (isValidObjectId) {
      updated = await Career.findByIdAndUpdate(
        targetId,
        { $set: cleanData },
        { returnDocument: 'after', runValidators: true }
      ).lean();
    } else {
      updated = await Career.create(cleanData);
    }

    return serializeDoc(updated);
  } catch (err) {
    console.error('MongoDB upsertCareer error:', err.message);
    throw err;
  }
}

export async function deleteCareer(id) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');
    await Career.findByIdAndDelete(id);
    return true;
  } catch (err) {
    console.error('MongoDB deleteCareer error:', err.message);
    throw err;
  }
}

export async function getCareerApplications() {
  try {
    const conn = await connectToDatabase();
    if (!conn) return [];

    const items = await CareerApplication.find().sort({ createdAt: -1 }).lean();
    return items.map(serializeDoc);
  } catch (err) {
    console.error('Error fetching career applications from MongoDB:', err.message);
    return [];
  }
}

export async function createCareerApplication(appData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    const created = await CareerApplication.create(appData);
    return serializeDoc(created);
  } catch (err) {
    console.error('MongoDB createCareerApplication error:', err.message);
    throw err;
  }
}

export async function updateCareerApplicationStatus(id, status) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    const updated = await CareerApplication.findByIdAndUpdate(
      id,
      { $set: { status } },
      { returnDocument: 'after', runValidators: true }
    ).lean();
    return serializeDoc(updated);
  } catch (err) {
    console.error('MongoDB updateCareerApplicationStatus error:', err.message);
    throw err;
  }
}

export async function deleteCareerApplication(id) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');
    await CareerApplication.findByIdAndDelete(id);
    return true;
  } catch (err) {
    console.error('MongoDB deleteCareerApplication error:', err.message);
    throw err;
  }
}

// ==================== ABOUT US CAROUSEL IMAGES ====================
const FALLBACK_ABOUT_IMAGES = [
  {
    id: 'about-1',
    title: 'Sarika Gupta in consultation at D.F.O. Ranchi Desk',
    imageUrl: '/img1.jpeg',
    displayOrder: 0
  },
  {
    id: 'about-2',
    title: 'Institutional Forestry & Environmental Engagement',
    imageUrl: '/img2.jpeg',
    displayOrder: 1
  },
  {
    id: 'about-3',
    title: 'Conservation & Statutory Clearance Briefing',
    imageUrl: '/img3.jpeg',
    displayOrder: 2
  }
];

let aboutImagesInitPromise = null;
async function ensureAboutImagesInitialized() {
  if (aboutImagesInitPromise) return aboutImagesInitPromise;

  aboutImagesInitPromise = (async () => {
    try {
      const conn = await connectToDatabase();
      if (!conn) return;

      const count = await AboutImage.countDocuments();
      if (count > 0) return;

      const db = conn.connection.db;
      const settingsCol = db.collection('settings');
      const marker = await settingsCol.findOne({ key: 'about_images_initialized' });
      if (marker) return;

      for (const img of FALLBACK_ABOUT_IMAGES) {
        const { id, ...clean } = img;
        await AboutImage.create(clean).catch(() => {});
      }

      await settingsCol.updateOne(
        { key: 'about_images_initialized' },
        { $set: { key: 'about_images_initialized', initializedAt: new Date() } },
        { upsert: true }
      ).catch(() => {});
    } catch (e) {
      console.error('ensureAboutImagesInitialized error:', e.message);
    }
  })();

  return aboutImagesInitPromise;
}

export async function getAboutImages() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await ensureAboutImagesInitialized();
      const items = await AboutImage.find().sort({ displayOrder: 1, createdAt: 1 }).lean();
      if (items && items.length > 0) {
        return items.map(serializeDoc);
      }
      const marker = await conn.connection.db.collection('settings').findOne({ key: 'about_images_initialized' });
      if (marker) return [];
    }
  } catch (err) {
    console.error('Error fetching about images from MongoDB:', err.message);
  }
  return FALLBACK_ABOUT_IMAGES;
}

export async function upsertAboutImage(imageData) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    await ensureAboutImagesInitialized();

    const targetId = imageData.id || imageData._id;
    const isValidObjectId = targetId && typeof targetId === 'string' && /^[0-9a-fA-F]{24}$/.test(targetId);
    const { id, _id, ...cleanData } = imageData;

    let updated;
    if (isValidObjectId) {
      updated = await AboutImage.findByIdAndUpdate(
        targetId,
        { $set: cleanData },
        { returnDocument: 'after', runValidators: true }
      ).lean();
    } else {
      updated = await AboutImage.create(cleanData);
    }

    return serializeDoc(updated);
  } catch (err) {
    console.error('MongoDB upsertAboutImage error:', err.message);
    throw err;
  }
}

export async function deleteAboutImage(id) {
  try {
    const conn = await connectToDatabase();
    if (!conn) throw new Error('Database connection failed');

    await ensureAboutImagesInitialized();
    await AboutImage.findByIdAndDelete(id);
    return true;
  } catch (err) {
    console.error('MongoDB deleteAboutImage error:', err.message);
    throw err;
  }
}
