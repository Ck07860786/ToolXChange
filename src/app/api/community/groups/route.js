import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import CommunityGroup from '@/models/CommunityGroup';
import { getAuth } from '@clerk/nextjs/server';

export async function GET() {
  await dbConnect();
  const groups = await CommunityGroup.find().sort({ createdAt: -1 });
  return NextResponse.json(groups);
}

export async function POST(request) {
  const { userId } = getAuth(request);
  if (!userId) return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  const { name, description } = await request.json();
  await dbConnect();
  const group = await CommunityGroup.create({ name, description, members: [userId] });
  return NextResponse.json(group, { status: 201 });
}