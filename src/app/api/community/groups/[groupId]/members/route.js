import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CommunityGroup from '@/models/CommunityGroup';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(request, { params }) {
  const { userId } = getAuth(request);
  if (!userId) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  const { groupId } = params;
  await dbConnect();
  const group = await CommunityGroup.findById(groupId);
  if (!group) return NextResponse.json({ error: 'Group not found.' }, { status: 404 });
  if (!group.members.includes(userId)) {
    group.members.push(userId);
    await group.save();
  }
  return NextResponse.json({ ok: true, group });
}