import mongoose from 'mongoose';

const SpecSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const ServiceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true, trim: true },
  category: { type: String, default: 'Wildlife Deterrence & Smart Sensors' },
  shortDescription: { type: String, required: true },
  featuredImage: { type: String, default: '' },
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
  seoTitle: { type: String, default: '' },
  metaDescription: { type: String, default: '' },
  specs: [SpecSchema],
  content: { type: String, default: '' }
}, {
  timestamps: true
});

// Prevent model overwrite during Next.js hot reload
export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);
