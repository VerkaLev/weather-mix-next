import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(`https://ipapi.co/auto/json/`);
  const data = await res.json();

  return NextResponse.json({
    city: data.city,
    country: data.country_name,
    lat: data.latitude,
    lon: data.longitude,
  });
}
