import mongoose from 'mongoose';

const CareerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job or internship title is required'],
    trim: true
  },
  slug: {
    type: String,
    trim: true
  },
  department: {
    type: String,
    default: 'Environmental & Forestry',
    trim: true
  },
  employmentType: {
    type: String,
    enum: ['Full-Time', 'Internship', 'Contract', 'Part-Time'],
    default: 'Full-Time'
  },
  location: {
    type: String,
    default: 'Ranchi, Jharkhand',
    trim: true
  },
  experience: {
    type: String,
    default: 'Freshers / 0–2 Years',
    trim: true
  },
  qualification: {
    type: String,
    default: 'B.Sc / M.Sc Environmental Science, Forestry, GIS or B.Tech',
    trim: true
  },
  stipendOrSalary: {
    type: String,
    default: '',
    trim: true
  },
  summary: {
    type: String,
    default: '',
    trim: true
  },
  responsibilities: {
    type: [String],
    default: []
  },
  deadline: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: String,
    enum: ['open', 'closed'],
    default: 'open'
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  strict: false
});

export default mongoose.models.Career || mongoose.model('Career', CareerSchema);

