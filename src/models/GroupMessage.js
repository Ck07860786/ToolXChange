import mongoose from 'mongoose';

const GroupMessageSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'CommunityGroup', required: true },
  authorId: { type: String, required: true }, // Clerk user ID
  authorName: { type: String, required: true },
  text: { type: String, required: true },
  sentAt: { type: Date, default: Date.now }
});

export default mongoose.models.GroupMessage || mongoose.model('GroupMessage', GroupMessageSchema);