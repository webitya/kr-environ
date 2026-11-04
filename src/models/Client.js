import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Client or organization name is required'],
    trim: true 
  },
  logoUrl: { 
    type: String, 
    required: [true, 'Client logo image URL is required'],
    trim: true 
  },
  websiteUrl: { 
    type: String, 
    default: '',
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

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);

