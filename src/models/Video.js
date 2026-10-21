import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, default: 'Product Demonstration', trim: true },
  thumbnail: { type: String, default: '' },
  embedUrl: { type: String, required: true },
  description: { type: String, default: '' },
  displayOrder: { type: Number, default: 0 }
}, {
  timestamps: true,
  strict: false
});

export default mongoose.models.Video || mongoose.model('Video', VideoSchema);
