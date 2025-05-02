// app/api/location-to-pincode/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lng');
  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing lat or lon' }, { status: 400 });
  }

  try {
    const url = [
      'https://nominatim.openstreetmap.org/reverse',
      `?format=json`,
      `&lat=${encodeURIComponent(lat)}`,
      `&lon=${encodeURIComponent(lon)}`,
      `&zoom=18`,
      `&addressdetails=1`,
    ].join('');

    const nominatimRes = await fetch(url, {
      headers: { 'User-Agent': 'MyToolLocator/1.0 (your.email@example.com)' }
    });
    if (!nominatimRes.ok) throw new Error(`Nominatim ${nominatimRes.status}`);

    const data = await nominatimRes.json();
    const pincode = data.address?.postcode;
    if (!pincode) {
      return NextResponse.json({ error: 'Postal code not found' }, { status: 404 });
    }
    return NextResponse.json({ pincode });
  } catch (err) {
    console.error('Reverse‑geocode (Nominatim) error:', err);
    return NextResponse.json({ error: err.message || 'Geocoding failed' }, { status: 500 });
  }
}
