// app/api/tools/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Tool from '@/models/toolModel';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const ownerId = searchParams.get('ownerId');
  if (!ownerId) {
    return NextResponse.json({ error: 'ownerId required' }, { status: 400 });
  }
  const tools = await Tool.find({ ownerId });
  return NextResponse.json({ tools });
}