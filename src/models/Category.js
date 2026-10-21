import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  type: { type: String, default: 'blog' }, // 'blog' | 'service' | 'general'
}, {
  timestamps: true
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
