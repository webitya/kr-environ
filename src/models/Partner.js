import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Partner or organization name is required'],
    trim: true 
  },
  category: { 
    type: String, 
    default: 'Technology & Hardware Alliance',
    trim: true 
  },
  logoUrl: { 
    type: String, 
    required: [true, 'Partner logo image URL is required'],
    trim: true 
  },
  websiteUrl: { 
    type: String, 
    default: '',
    trim: true 
  },
  description: { 
    type: String, 
    default: '',
    trim: true 
  },
  collaborationType: {
    type: String,
    default: 'Strategic Implementation & Supply',
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

export default mongoose.models.Partner || mongoose.model('Partner', PartnerSchema);

