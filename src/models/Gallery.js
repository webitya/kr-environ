import mongoose from 'mongoose';

const GallerySchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'Equipment' },
  imageUrl: { type: String, required: true },
  caption: { type: String, default: '' },
  displayOrder: { type: Number, default: 0 }
}, {
  timestamps: true,
  strict: false
});

export default mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
