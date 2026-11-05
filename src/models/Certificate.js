import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Certificate title is required'],
    trim: true 
  },
  pdfUrl: { 
    type: String, 
    default: '',
    trim: true 
  },
  pdfLink: { 
    type: String, 
    default: '',
    trim: true 
  },
  imageUrl: { 
    type: String, 
    default: '',
    trim: true 
  },
  issuingAuthority: { 
    type: String, 
    default: 'Government / Statutory Authority',
    trim: true 
  },
  certificateNumber: { 
    type: String, 
    default: '',
    trim: true 
  },
  issueDate: { 
    type: String, 
    default: '',
    trim: true 
  },
  validUntil: {
    type: String,
    default: '',
    trim: true
  },
  description: { 
    type: String, 
    default: '',
    trim: true 
  },
  category: {
    type: String,
    default: 'Statutory Certification',
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

export default mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
