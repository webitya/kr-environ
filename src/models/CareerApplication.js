import mongoose from 'mongoose';

const CareerApplicationSchema = new mongoose.Schema({
  careerId: {
    type: String,
    default: '',
    trim: true
  },
  careerTitle: {
    type: String,
    required: [true, 'Applied position title is required'],
    trim: true
  },
  department: {
    type: String,
    default: '',
    trim: true
  },
  applicantName: {
    type: String,
    required: [true, 'Applicant full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Applicant email is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Applicant phone number is required'],
    trim: true
  },
  collegeOrUniversity: {
    type: String,
    default: '',
    trim: true
  },
  qualification: {
    type: String,
    default: '',
    trim: true
  },
  passingYear: {
    type: String,
    default: '',
    trim: true
  },
  city: {
    type: String,
    default: '',
    trim: true
  },
  experienceSummary: {
    type: String,
    default: '',
    trim: true
  },
  resumeUrl: {
    type: String,
    default: '',
    trim: true
  },
  coverNote: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'Reviewed', 'Shortlisted', 'Rejected'],
    default: 'New'
  }
}, {
  timestamps: true,
  strict: false
});

export default mongoose.models.CareerApplication || mongoose.model('CareerApplication', CareerApplicationSchema);

