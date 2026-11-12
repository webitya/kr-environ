import mongoose from 'mongoose';

const AboutImageSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  strict: false
});

export default mongoose.models.AboutImage || mongoose.model('AboutImage', AboutImageSchema);

