import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true, trim: true },
  category: { type: String, default: 'Wildlife Technology' },
  author: { type: String, default: 'Sarika Gupta, Proprietor' },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  featuredImage: { type: String, default: '' },
  excerpt: { type: String, required: true },
  content: { type: String, default: '' },
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
  seoTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' }
}, {
  timestamps: true
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
