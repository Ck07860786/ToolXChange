// app/api/tools/approved/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Tool from '@/models/toolModel';

export async function GET(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  // optional: filter by availability or other params
  const availability = searchParams.get('availability');

  // build filter: only accepted tools
  const filter = { status: 'Approved' };
  if (availability === 'true' || availability === 'false') {
    filter.availability = availability === 'true';
  }

  const tools = await Tool.find(filter).select('name description rentalRate availability images rating');
  return NextResponse.json({ tools });
}
