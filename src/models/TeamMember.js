import mongoose from 'mongoose';

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team member name is required'],
    trim: true
  },
  designation: {
    type: String,
    default: '',
    trim: true
  },
  role: {
    type: String,
    default: '',
    trim: true
  },
  photoUrl: {
    type: String,
    default: '',
    trim: true
  },
  qualifications: {
    type: String,
    default: '',
    trim: true
  },
  experience: {
    type: String,
    default: '',
    trim: true
  },
  bio: {
    type: String,
    default: '',
    trim: true
  },
  highlights: {
    type: [String],
    default: []
  },
  displayOrder: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  strict: false
});

export default mongoose.models.TeamMember || mongoose.model('TeamMember', TeamMemberSchema);

