import mongoose from 'mongoose';

const toolSchema = new mongoose.Schema({
  ownerId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  images: [
    {
      public_id: String,
      url: String,
    }
  ],
  availability: {
    type: Boolean,
    default: false,
  },
  rentalRate: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending',
  },
}, { timestamps: true });

export default mongoose.models.Tool || mongoose.model('Tool', toolSchema);
