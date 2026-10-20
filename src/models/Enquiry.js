import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  organization: { type: String, default: '' },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, default: 'General Consultation' },
  message: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'contacted', 'resolved'], default: 'pending' },
  date: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.models.Enquiry || mongoose.model('Enquiry', EnquirySchema);
