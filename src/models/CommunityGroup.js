import mongoose from 'mongoose';

const CommunityGroupSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  members: [{ type: String }], // store Clerk user IDs
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.CommunityGroup || mongoose.model('CommunityGroup', CommunityGroupSchema);