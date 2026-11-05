import mongoose from 'mongoose';

const SpecSchema = new mongoose.Schema({
  label: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, index: true, trim: true },
  category: { type: String, default: 'Wildlife Deterrence & Smart Sensors', trim: true },
  shortDescription: { type: String, default: '' },
  featuredImage: { type: String, default: '' },
  price: { type: String, default: 'Custom Forest Dept Quote' },
  status: { type: String, enum: ['published', 'draft'], default: 'published' },
  specs: [SpecSchema],
  displayOrder: { type: Number, default: 0 },
  content: { type: String, default: '' }
}, {
  timestamps: true,
  strict: false
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);

