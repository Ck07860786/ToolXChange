// app/api/tools/approved/route.js
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Tool from '@/models/toolModel';

export async function GET(request) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const availabilityParam = searchParams.get('availability');  
  // try both lowercase and camelCase for backwards-compat
  const rawPincode = searchParams.get('pincode') ?? searchParams.get('pinCode');

  // build base filter: only approved tools
  const filter = { status: 'Approved' };

  // optional availability filter
  if (availabilityParam === 'true' || availabilityParam === 'false') {
    filter.availability = availabilityParam === 'true';
  }

  // optional pincode filter
  if (rawPincode) {
    const pin = parseInt(rawPincode, 10);
    if (!isNaN(pin)) {
      filter.pinCode = pin;
    }
  }

  // fetch only the fields you need
  const tools = await Tool
    .find(filter)
    // include pinCode in the returned doc if you want to verify it
    .select('name description rentalRate availability images rating pinCode');

  return NextResponse.json({ tools });
}
