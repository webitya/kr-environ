import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true, trim: true },
  location: { type: String, default: '' },
  category: { type: String, default: 'Field Deployment' },
  date: { type: String, default: '' },
  client: { type: String, default: '' },
  featuredImage: { type: String, default: '' },
  overview: { type: String, default: '' },
  results: { type: String, default: '' },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, {
  timestamps: true,
  strict: false
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
